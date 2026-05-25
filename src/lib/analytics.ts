export type AnalyticsEvent =
  | "preorder_opened"
  | "preorder_step_viewed"
  | "preorder_variant_selected"
  | "preorder_checkout_started"
  | "preorder_completed"
  | "preorder_abandoned"
  | "cta_preorder_click";

type EventPayload = Record<string, string | number | boolean | undefined>;

export function trackEvent(event: AnalyticsEvent, payload?: EventPayload) {
  if (typeof window !== "undefined") {
    window.dispatchEvent(
      new CustomEvent("bloomcam:analytics", { detail: { event, payload } })
    );

    if (process.env.NEXT_PUBLIC_POSTHOG_KEY && "posthog" in window) {
      const posthog = (window as { posthog?: { capture: (e: string, p?: object) => void } })
        .posthog;
      posthog?.capture(event, payload);
    }

    if (typeof window.gtag === "function") {
      window.gtag("event", event, payload);
    }
  }

  if (process.env.NODE_ENV === "development") {
    console.info("[analytics]", event, payload);
  }
}

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}
