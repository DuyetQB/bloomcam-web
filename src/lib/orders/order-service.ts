import {
  OrderStatus,
  PaymentMode,
  PaymentProvider as DbPaymentProvider,
  Prisma,
} from "@prisma/client";
import {
  getPrisma,
  isDatabaseConfigured,
  shouldFallbackPreorderToDemo,
} from "@/lib/db";
import type { ProductVariantId } from "@/lib/products";
import type { CompletePreorderInput } from "@/lib/validations/preorder";
import { getVariant } from "@/lib/products";

function generateOrderNumber() {
  const n = Math.floor(100000 + Math.random() * 900000);
  return `BC-${n}`;
}

function mapProvider(name: string): DbPaymentProvider {
  switch (name) {
    case "stripe":
      return "STRIPE";
    case "polar":
      return "POLAR";
    case "lemon_squeezy":
      return "LEMON_SQUEEZY";
    case "paypal":
      return "PAYPAL";
    default:
      return "MANUAL";
  }
}

export type CreatedOrder = {
  id: string;
  orderNumber: string;
  totalCents: number;
  email: string;
};

export class OrderService {
  static async createPreorder(
    input: CompletePreorderInput,
    checkout: {
      provider: string;
      sessionId: string;
      subtotalCents: number;
      totalCents: number;
    },
    variantDisplayName: string
  ): Promise<CreatedOrder> {
    const variant = getVariant(input.variantId);
    const orderNumber = generateOrderNumber();

    const demoOrder = (): CreatedOrder => ({
      id: `demo_${orderNumber}`,
      orderNumber,
      totalCents: checkout.totalCents,
      email: input.email,
    });

    if (shouldFallbackPreorderToDemo()) {
      return demoOrder();
    }

    try {
      const order = await getPrisma().$transaction(async (tx) => {
      await tx.emailSubscriber.upsert({
        where: { email: input.email },
        create: {
          email: input.email,
          locale: input.locale,
          source: "preorder",
        },
        update: { locale: input.locale },
      });

      const created = await tx.preorderOrder.create({
        data: {
          orderNumber,
          status: OrderStatus.RESERVED,
          paymentMode: input.paymentMode as PaymentMode,
          paymentProvider: mapProvider(checkout.provider),
          providerSessionId: checkout.sessionId,
          subtotalCents: checkout.subtotalCents,
          totalCents: checkout.totalCents,
          currency: "USD",
          locale: input.locale,
          email: input.email,
          analyticsMeta: input.analyticsSessionId
            ? { sessionId: input.analyticsSessionId }
            : Prisma.JsonNull,
          items: {
            create: {
              variantId: input.variantId,
              variantName: variantDisplayName,
              quantity: input.quantity,
              unitCents: variant.priceCents,
              lineCents: variant.priceCents * input.quantity,
            },
          },
          shippingAddress: {
            create: {
              fullName: input.fullName,
              line1: input.line1,
              line2: input.line2 || null,
              city: input.city,
              state: input.state || null,
              postalCode: input.postalCode,
              country: input.country,
              phone: input.phone || null,
            },
          },
        },
      });

      await tx.inventoryPlaceholder.upsert({
        where: { variantId: input.variantId },
        create: {
          variantId: input.variantId,
          reserved: input.quantity,
        },
        update: {
          reserved: { increment: input.quantity },
        },
      });

      return created;
      });

      return {
        id: order.id,
        orderNumber: order.orderNumber,
        totalCents: order.totalCents,
        email: order.email,
      };
    } catch (error) {
      if (shouldFallbackPreorderToDemo(error)) {
        console.warn(
          "[preorder] Database unreachable — saved as demo order (dev). Start Postgres or set DATABASE_ENABLED=false."
        );
        return demoOrder();
      }
      throw error;
    }
  }
}
