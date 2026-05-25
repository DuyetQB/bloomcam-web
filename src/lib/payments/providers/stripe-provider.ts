import type {
  CreateCheckoutInput,
  CheckoutSession,
  PaymentProvider,
  PaymentResult,
} from "@/lib/payments/types";

/**
 * Stripe adapter — activate with STRIPE_SECRET_KEY.
 * @see https://docs.stripe.com/checkout
 */
export class StripePaymentProvider implements PaymentProvider {
  readonly name = "stripe" as const;

  async createCheckoutSession(input: CreateCheckoutInput): Promise<CheckoutSession> {
    if (!process.env.STRIPE_SECRET_KEY) {
      throw new Error("STRIPE_SECRET_KEY is not configured");
    }

    // Placeholder: wire Stripe Checkout Sessions here
    return {
      sessionId: `stripe_placeholder_${Date.now()}`,
      provider: "stripe",
      checkoutUrl: undefined,
      clientSecret: undefined,
    };
  }

  async confirmPayment(sessionId: string): Promise<PaymentResult> {
    return { success: true, providerPaymentId: sessionId };
  }
}
