import type { PaymentMode } from "@prisma/client";
import type { ProductVariantId } from "@/lib/products";
import { calculateSubtotal, getVariant } from "@/lib/products";
import { LemonSqueezyPaymentProvider } from "@/lib/payments/providers/lemonsqueezy-provider";
import { ManualPaymentProvider } from "@/lib/payments/providers/manual-provider";
import { PolarPaymentProvider } from "@/lib/payments/providers/polar-provider";
import { StripePaymentProvider } from "@/lib/payments/providers/stripe-provider";
import type { CreateCheckoutInput, PaymentProvider } from "@/lib/payments/types";

export function resolvePaymentProvider(): PaymentProvider {
  const provider = process.env.PAYMENT_PROVIDER?.toLowerCase();
  if (provider === "polar" && process.env.POLAR_ACCESS_TOKEN) {
    return new PolarPaymentProvider();
  }
  if (provider === "lemonsqueezy" && process.env.LEMONSQUEEZY_API_KEY) {
    return new LemonSqueezyPaymentProvider();
  }
  if (process.env.STRIPE_SECRET_KEY) {
    return new StripePaymentProvider();
  }
  return new ManualPaymentProvider();
}

export class CheckoutService {
  static buildLineItems(variantId: ProductVariantId, quantity: number, displayName: string) {
    const variant = getVariant(variantId);
    return [
      {
        variantId,
        variantName: displayName,
        quantity,
        unitCents: variant.priceCents,
      },
    ];
  }

  static calculateTotals(variantId: ProductVariantId, quantity: number) {
    const subtotalCents = calculateSubtotal(variantId, quantity);
    return { subtotalCents, totalCents: subtotalCents };
  }

  static async createSession(params: {
    email: string;
    locale: string;
    variantId: ProductVariantId;
    quantity: number;
    variantDisplayName: string;
    paymentMode: PaymentMode;
  }) {
    const { subtotalCents, totalCents } = this.calculateTotals(
      params.variantId,
      params.quantity
    );
    const items = this.buildLineItems(
      params.variantId,
      params.quantity,
      params.variantDisplayName
    );

    const input: CreateCheckoutInput = {
      email: params.email,
      locale: params.locale,
      paymentMode: params.paymentMode,
      items,
      subtotalCents,
      totalCents,
      currency: "USD",
    };

    const provider = resolvePaymentProvider();
    const session = await provider.createCheckoutSession(input);

    return { session, provider: provider.name, subtotalCents, totalCents, items };
  }
}
