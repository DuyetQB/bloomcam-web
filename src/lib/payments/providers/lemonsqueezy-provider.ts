import type {
  CreateCheckoutInput,
  CheckoutSession,
  PaymentProvider,
} from "@/lib/payments/types";

/** Lemon Squeezy — wire LEMONSQUEEZY_API_KEY + store/variant IDs in production. */
export class LemonSqueezyPaymentProvider implements PaymentProvider {
  readonly name = "lemon_squeezy" as const;

  async createCheckoutSession(
    input: CreateCheckoutInput
  ): Promise<CheckoutSession> {
    if (!process.env.LEMONSQUEEZY_API_KEY) {
      throw new Error("LEMONSQUEEZY_API_KEY is not configured");
    }
    return {
      sessionId: `lemon_squeezy_placeholder_${Date.now()}`,
      provider: "lemon_squeezy",
      checkoutUrl: undefined,
    };
  }
}
