"use client";

import { motion } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import {
  calculateSubtotal,
  formatMoney,
  getVariant,
  type ProductVariantId,
} from "@/lib/products";

export function OrderSummary({
  variantId,
  quantity,
}: {
  variantId: ProductVariantId;
  quantity: number;
}) {
  const t = useTranslations("preorder");
  const locale = useLocale();
  const variant = getVariant(variantId);
  const subtotal = calculateSubtotal(variantId, quantity);

  return (
    <motion.aside
      layout
      className="glass-strong rounded-2xl p-6 lg:sticky lg:top-24"
    >
      <p className="text-xs font-medium uppercase tracking-[0.2em] text-primary">
        {t("summary.title")}
      </p>
      <p className="mt-2 font-display text-xl text-foreground">
        {t(variant.nameKey)}
      </p>
      <p className="text-sm text-muted">{t("summary.qty", { count: quantity })}</p>

      <div className="my-6 h-px bg-white/10" />

      <div className="flex items-end justify-between">
        <span className="text-sm text-muted">{t("summary.total")}</span>
        <motion.span
          key={subtotal}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-display text-3xl text-highlight"
        >
          {formatMoney(subtotal, locale)}
        </motion.span>
      </div>

      <p className="mt-4 text-xs leading-relaxed text-muted">{t("summary.shippingNote")}</p>
      <div className="mt-4 flex items-center gap-2 text-xs text-accent">
        <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
        {t("summary.limitedBatch")}
      </div>
    </motion.aside>
  );
}
