import type {
  CreateCheckoutInput,
  CheckoutSession,
  PaymentProvider,
} from "@/lib/payments/types";

/** Polar.sh — wire POLAR_ACCESS_TOKEN + product IDs in production. */
export class PolarPaymentProvider implements PaymentProvider {
  readonly name = "polar" as const;

  async createCheckoutSession(
    input: CreateCheckoutInput
  ): Promise<CheckoutSession> {
    if (!process.env.POLAR_ACCESS_TOKEN) {
      throw new Error("POLAR_ACCESS_TOKEN is not configured");
    }
    return {
      sessionId: `polar_placeholder_${Date.now()}`,
      provider: "polar",
      checkoutUrl: undefined,
    };
  }
}
