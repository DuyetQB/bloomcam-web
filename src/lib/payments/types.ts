import type { PaymentMode } from "@prisma/client";
import type { ProductVariantId } from "@/lib/products";

export type CheckoutLineItem = {
  variantId: ProductVariantId;
  variantName: string;
  quantity: number;
  unitCents: number;
};

export type CreateCheckoutInput = {
  email: string;
  locale: string;
  paymentMode: PaymentMode;
  items: CheckoutLineItem[];
  subtotalCents: number;
  totalCents: number;
  currency: string;
  metadata?: Record<string, string>;
};

export type CheckoutSession = {
  sessionId: string;
  provider: "stripe" | "polar" | "lemon_squeezy" | "paypal" | "manual";
  clientSecret?: string;
  checkoutUrl?: string;
  expiresAt?: Date;
};

export type PaymentResult = {
  success: boolean;
  providerPaymentId?: string;
  error?: string;
};

export interface PaymentProvider {
  readonly name: CheckoutSession["provider"];
  createCheckoutSession(input: CreateCheckoutInput): Promise<CheckoutSession>;
  confirmPayment?(sessionId: string): Promise<PaymentResult>;
}
