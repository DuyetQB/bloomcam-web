"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import { X, Minus, Plus, Lock, Loader2, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePreorder } from "@/components/preorder/preorder-context";
import { VariantCard } from "@/components/preorder/variant-card";
import { OrderSummary } from "@/components/preorder/order-summary";
import { PRODUCT_VARIANTS, type ProductVariantId } from "@/lib/products";
import { completePreorderSchema, type CompletePreorderInput } from "@/lib/validations/preorder";
import { submitPreorder } from "@/server/actions/preorder";
import { trackEvent } from "@/lib/analytics";
import { cn } from "@/lib/utils";
import { BloomCamDevice } from "@/components/product/bloomcam-device";

const stepOrder = ["variant", "quantity", "shipping", "payment", "success"] as const;

export function PreorderFlow({ mode = "overlay" }: { mode?: "overlay" | "page" }) {
  const t = useTranslations("preorder");
  const locale = useLocale();
  const {
    isOpen,
    closePreorder,
    state,
    setVariantId,
    setQuantity,
    setOrderNumber,
    goNext,
    goBack,
  } = usePreorder();

  const visible = mode === "page" || isOpen;
  const stepIndex = stepOrder.indexOf(state.step);

  const form = useForm<CompletePreorderInput>({
    resolver: zodResolver(completePreorderSchema),
    defaultValues: {
      variantId: state.variantId,
      quantity: state.quantity,
      email: "",
      fullName: "",
      line1: "",
      line2: "",
      city: "",
      state: "",
      postalCode: "",
      country: "US",
      phone: "",
      paymentMode: "RESERVATION",
      acceptTerms: false,
      locale,
    },
  });

  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  useEffect(() => {
    form.setValue("variantId", state.variantId);
    form.setValue("quantity", state.quantity);
    form.setValue("locale", locale);
  }, [state.variantId, state.quantity, locale, form]);

  if (!visible) return null;

  const onSubmit = form.handleSubmit(async (data) => {
    setSubmitting(true);
    setSubmitError(null);
    trackEvent("preorder_checkout_started");

    const result = await submitPreorder(data);

    setSubmitting(false);

    if (result.success) {
      trackEvent("preorder_completed", { orderNumber: result.orderNumber });
      setOrderNumber(result.orderNumber);
    } else {
      setSubmitError(result.error);
    }
  });

  const content = (
    <div
      className={cn(
        "relative flex flex-col bg-background",
        mode === "overlay" ? "h-[100dvh] max-h-[100dvh]" : "min-h-screen"
      )}
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="mesh-blob absolute -left-1/4 top-0 h-[50vh] w-[50vw] rounded-full bg-primary/20 opacity-40" />
        <div className="mesh-blob absolute -right-1/4 bottom-0 h-[40vh] w-[40vw] rounded-full bg-accent/15 opacity-30" />
      </div>

      <header className="relative z-10 flex items-center justify-between border-b border-white/10 px-6 py-4 md:px-10">
        <div>
          <p className="text-[10px] font-medium uppercase tracking-[0.25em] text-primary">
            {t("header.eyebrow")}
          </p>
          <p className="font-display text-lg text-foreground">{t("header.title")}</p>
        </div>
        {mode === "overlay" && (
          <button
            type="button"
            onClick={closePreorder}
            className="rounded-full p-2 text-muted hover:bg-white/10 hover:text-foreground"
            aria-label={t("close")}
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </header>

      {state.step !== "success" && (
        <div className="relative z-10 px-6 pt-4 md:px-10">
          <div className="flex gap-2">
            {stepOrder.slice(0, -1).map((s, i) => (
              <div
                key={s}
                className={cn(
                  "h-1 flex-1 rounded-full transition-colors duration-500",
                  i <= stepIndex ? "bg-primary" : "bg-white/10"
                )}
              />
            ))}
          </div>
          <p className="mt-3 text-xs text-muted">
            {t(`steps.${state.step}`)} · {t("stepCounter", { current: stepIndex + 1, total: 4 })}
          </p>
        </div>
      )}

      <div className="relative z-10 flex-1 overflow-y-auto px-6 py-8 md:px-10">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1fr_320px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={state.step}
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -16 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              {state.step === "variant" && (
                <div className="space-y-6">
                  <h2 className="font-display text-3xl font-light text-foreground md:text-4xl">
                    {t("variant.title")}
                  </h2>
                  <p className="max-w-xl text-muted">{t("variant.subtitle")}</p>
                  <div className="grid gap-4 md:grid-cols-2">
                    {PRODUCT_VARIANTS.map((v) => (
                      <VariantCard
                        key={v.id}
                        variant={v}
                        selected={state.variantId === v.id}
                        onSelect={() => setVariantId(v.id as ProductVariantId)}
                      />
                    ))}
                  </div>
                  <div className="flex justify-end">
                    <button
                      type="button"
                      onClick={goNext}
                      className="rounded-full bg-primary px-8 py-3 text-sm font-medium text-[#0F1720]"
                    >
                      {t("continue")}
                    </button>
                  </div>
                </div>
              )}

              {state.step === "quantity" && (
                <div className="space-y-8">
                  <h2 className="font-display text-3xl font-light">{t("quantity.title")}</h2>
                  <div className="flex flex-col items-center gap-8 md:flex-row md:items-start">
                    <BloomCamDevice size="md" />
                    <div className="glass rounded-2xl p-8">
                      <p className="text-sm text-muted">{t("quantity.label")}</p>
                      <div className="mt-4 flex items-center gap-6">
                        <button
                          type="button"
                          onClick={() => setQuantity(Math.max(1, state.quantity - 1))}
                          className="flex h-12 w-12 items-center justify-center rounded-full border border-white/15 hover:bg-white/5"
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <motion.span
                          key={state.quantity}
                          initial={{ scale: 0.9, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          className="font-display text-5xl text-foreground"
                        >
                          {state.quantity}
                        </motion.span>
                        <button
                          type="button"
                          onClick={() => setQuantity(Math.min(5, state.quantity + 1))}
                          className="flex h-12 w-12 items-center justify-center rounded-full border border-white/15 hover:bg-white/5"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>
                      <p className="mt-4 text-xs text-muted">{t("quantity.hint")}</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <button type="button" onClick={goBack} className="rounded-full px-6 py-3 text-sm text-muted hover:text-foreground">
                      {t("back")}
                    </button>
                    <button type="button" onClick={goNext} className="rounded-full bg-primary px-8 py-3 text-sm font-medium text-[#0F1720]">
                      {t("continue")}
                    </button>
                  </div>
                </div>
              )}

              {(state.step === "shipping" || state.step === "payment") && (
                <form onSubmit={onSubmit} className="space-y-6">
                  {state.step === "shipping" && (
                    <>
                      <h2 className="font-display text-3xl font-light">{t("shipping.title")}</h2>
                      <p className="text-muted">{t("shipping.subtitle")}</p>
                      <div className="grid gap-4 sm:grid-cols-2">
                        <Field label={t("fields.email")} error={form.formState.errors.email?.message}>
                          <input {...form.register("email")} type="email" className={inputClass} />
                        </Field>
                        <Field label={t("fields.fullName")} error={form.formState.errors.fullName?.message}>
                          <input {...form.register("fullName")} className={inputClass} />
                        </Field>
                        <Field label={t("fields.line1")} className="sm:col-span-2" error={form.formState.errors.line1?.message}>
                          <input {...form.register("line1")} className={inputClass} />
                        </Field>
                        <Field label={t("fields.line2")} className="sm:col-span-2">
                          <input {...form.register("line2")} className={inputClass} />
                        </Field>
                        <Field label={t("fields.city")} error={form.formState.errors.city?.message}>
                          <input {...form.register("city")} className={inputClass} />
                        </Field>
                        <Field label={t("fields.state")}>
                          <input {...form.register("state")} className={inputClass} />
                        </Field>
                        <Field label={t("fields.postalCode")} error={form.formState.errors.postalCode?.message}>
                          <input {...form.register("postalCode")} className={inputClass} />
                        </Field>
                        <Field label={t("fields.country")} error={form.formState.errors.country?.message}>
                          <select {...form.register("country")} className={inputClass}>
                            <option value="US">United States</option>
                            <option value="CA">Canada</option>
                            <option value="GB">United Kingdom</option>
                            <option value="VN">Vietnam</option>
                            <option value="DE">Germany</option>
                            <option value="AU">Australia</option>
                          </select>
                        </Field>
                      </div>
                      <div className="flex gap-3">
                        <button type="button" onClick={goBack} className="rounded-full px-6 py-3 text-sm text-muted">
                          {t("back")}
                        </button>
                        <button
                          type="button"
                          onClick={async () => {
                            const ok = await form.trigger([
                              "email",
                              "fullName",
                              "line1",
                              "city",
                              "postalCode",
                              "country",
                            ]);
                            if (ok) goNext();
                          }}
                          className="rounded-full bg-primary px-8 py-3 text-sm font-medium text-[#0F1720]"
                        >
                          {t("continue")}
                        </button>
                      </div>
                    </>
                  )}

                  {state.step === "payment" && (
                    <>
                      <h2 className="font-display text-3xl font-light">{t("payment.title")}</h2>
                      <p className="text-muted">{t("payment.subtitle")}</p>
                      <div className="glass rounded-2xl p-6">
                        <div className="flex items-center gap-2 text-sm text-accent">
                          <Lock className="h-4 w-4" />
                          {t("payment.secure")}
                        </div>
                        <p className="mt-4 text-sm leading-relaxed text-muted">{t("payment.reservationNote")}</p>
                      </div>
                      <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-white/10 p-4">
                        <input
                          type="checkbox"
                          className="mt-1"
                          onChange={(e) => form.setValue("acceptTerms", e.target.checked, { shouldValidate: true })}
                        />
                        <span className="text-sm text-muted">{t("payment.terms")}</span>
                      </label>
                      {form.formState.errors.acceptTerms && (
                        <p className="text-sm text-red-400">{form.formState.errors.acceptTerms.message}</p>
                      )}
                      {submitError && <p className="text-sm text-red-400">{submitError}</p>}
                      <div className="flex flex-wrap gap-3">
                        <button type="button" onClick={goBack} className="rounded-full px-6 py-3 text-sm text-muted">
                          {t("back")}
                        </button>
                        <button
                          type="submit"
                          disabled={submitting}
                          className="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-3 text-sm font-medium text-[#0F1720] disabled:opacity-60"
                        >
                          {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
                          {t("payment.cta")}
                        </button>
                      </div>
                    </>
                  )}
                </form>
              )}

              {state.step === "success" && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center py-12 text-center"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 18 }}
                    className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/20"
                  >
                    <Sparkles className="h-10 w-10 text-primary" />
                  </motion.div>
                  <h2 className="mt-8 font-display text-4xl font-light text-foreground md:text-5xl">
                    {t("success.title")}
                  </h2>
                  <p className="mt-4 max-w-md text-muted">{t("success.subtitle")}</p>
                  {state.orderNumber && (
                    <p className="mt-6 rounded-full glass px-6 py-2 font-mono text-sm text-highlight">
                      {state.orderNumber}
                    </p>
                  )}
                  <button
                    type="button"
                    onClick={closePreorder}
                    className="mt-10 rounded-full bg-primary px-8 py-3 text-sm font-medium text-[#0F1720]"
                  >
                    {t("success.done")}
                  </button>
                </motion.div>
              )}
            </motion.div>
          </AnimatePresence>

          {state.step !== "success" && (
            <div className="hidden lg:block">
              <OrderSummary variantId={state.variantId} quantity={state.quantity} />
            </div>
          )}
        </div>

        {state.step !== "success" && (
          <div className="mt-8 lg:hidden">
            <OrderSummary variantId={state.variantId} quantity={state.quantity} />
          </div>
        )}
      </div>
    </div>
  );

  if (mode === "page") {
    return content;
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[200]"
        >
          <motion.div
            className="absolute inset-0 bg-background/80 backdrop-blur-xl"
            onClick={closePreorder}
          />
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 32, stiffness: 320 }}
            className="absolute inset-0"
            data-lenis-prevent
          >
            {content}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

const inputClass =
  "w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-primary/40 focus:ring-2 focus:ring-primary/20";

function Field({
  label,
  children,
  className,
  error,
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
  error?: string;
}) {
  return (
    <label className={cn("block", className)}>
      <span className="mb-2 block text-xs font-medium uppercase tracking-wider text-muted">
        {label}
      </span>
      {children}
      {error && <span className="mt-1 block text-xs text-red-400">{error}</span>}
    </label>
  );
}
