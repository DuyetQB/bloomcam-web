import type {
  CreateCheckoutInput,
  CheckoutSession,
  PaymentProvider,
} from "@/lib/payments/types";

/** Reservation flow — no external payment until Stripe/Polar is configured */
export class ManualPaymentProvider implements PaymentProvider {
  readonly name = "manual" as const;

  async createCheckoutSession(input: CreateCheckoutInput): Promise<CheckoutSession> {
    return {
      sessionId: `manual_${Date.now()}`,
      provider: "manual",
      expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24),
    };
  }
}
