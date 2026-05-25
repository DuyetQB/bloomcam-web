"use server";

import { completePreorderSchema } from "@/lib/validations/preorder";
import { CheckoutService } from "@/lib/payments/checkout-service";
import { OrderService } from "@/lib/orders/order-service";
import { preorderConfirmationEmail } from "@/lib/email/templates";
import { formatMoney, getVariant } from "@/lib/products";

export type PreorderActionResult =
  | { success: true; orderNumber: string; orderId: string }
  | { success: false; error: string; fieldErrors?: Record<string, string[]> };

export async function submitPreorder(
  raw: unknown
): Promise<PreorderActionResult> {
  const parsed = completePreorderSchema.safeParse(raw);

  if (!parsed.success) {
    return {
      success: false,
      error: "Please check your details and try again.",
      fieldErrors: parsed.error.flatten().fieldErrors as Record<string, string[]>,
    };
  }

  const data = parsed.data;

  try {
    const variant = getVariant(data.variantId);
    const variantNames: Record<string, Record<string, string>> = {
      core: { en: "BloomCam Core", vi: "BloomCam Core" },
      "studio-kit": { en: "BloomCam Studio Kit", vi: "BloomCam Studio Kit" },
    };
    const variantDisplayName =
      variantNames[data.variantId]?.[data.locale] ?? variant.id;

    const checkout = await CheckoutService.createSession({
      email: data.email,
      locale: data.locale,
      variantId: data.variantId,
      quantity: data.quantity,
      variantDisplayName,
      paymentMode: data.paymentMode,
    });

    const order = await OrderService.createPreorder(
      data,
      {
        provider: checkout.provider,
        sessionId: checkout.session.sessionId,
        subtotalCents: checkout.subtotalCents,
        totalCents: checkout.totalCents,
      },
      variantDisplayName
    );

    const { subject, html, text } = preorderConfirmationEmail({
      orderNumber: order.orderNumber,
      email: order.email,
      variantName: variantDisplayName,
      quantity: data.quantity,
      totalFormatted: formatMoney(order.totalCents, data.locale),
      locale: data.locale,
    });

    if (process.env.RESEND_API_KEY && process.env.EMAIL_FROM) {
      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: process.env.EMAIL_FROM,
          to: order.email,
          subject,
          html,
          text,
        }),
      }).catch(() => undefined);
    }

    return {
      success: true,
      orderNumber: order.orderNumber,
      orderId: order.id,
    };
  } catch (e) {
    console.error("[preorder]", e);
    return {
      success: false,
      error: "Something went wrong. Please try again in a moment.",
    };
  }
}

export async function joinWaitlist(email: string, locale: string, variantId?: string) {
  const trimmed = email.trim().toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
    return { success: false as const, error: "Invalid email" };
  }

  const db = await import("@/lib/db");

  try {
    if (!db.isDatabaseConfigured() || db.shouldFallbackPreorderToDemo()) {
      return { success: true as const };
    }

    await db.getPrisma().waitlistEntry.upsert({
      where: {
        email_variantId: { email: trimmed, variantId: variantId ?? "" },
      },
      create: { email: trimmed, locale, variantId: variantId ?? null },
      update: { locale },
    });
    await db.getPrisma().emailSubscriber.upsert({
      where: { email: trimmed },
      create: { email: trimmed, locale, source: "waitlist" },
      update: { locale },
    });
    return { success: true as const };
  } catch (error) {
    if (db.shouldFallbackPreorderToDemo(error)) {
      return { success: true as const };
    }
    return { success: false as const, error: "Could not join waitlist" };
  }
}
