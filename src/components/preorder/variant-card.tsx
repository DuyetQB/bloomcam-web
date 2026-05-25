"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import type { ProductVariant } from "@/lib/products";

export function VariantCard({
  variant,
  selected,
  onSelect,
}: {
  variant: ProductVariant;
  selected: boolean;
  onSelect: () => void;
}) {
  const t = useTranslations("preorder");

  return (
    <motion.button
      type="button"
      onClick={onSelect}
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.99 }}
      className={cn(
        "relative w-full overflow-hidden rounded-2xl border p-6 text-left transition-colors duration-300",
        selected
          ? "border-primary/50 bg-primary/10 shadow-[0_0_48px_-12px_var(--glow-primary)]"
          : "border-white/10 bg-surface/40 hover:border-white/20"
      )}
    >
      {variant.highlight && (
        <span className="absolute right-4 top-4 rounded-full bg-highlight/20 px-3 py-1 text-[10px] font-medium uppercase tracking-wider text-highlight">
          {t("recommended")}
        </span>
      )}
      {variant.badgeKey && (
        <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-primary">
          {t(variant.badgeKey)}
        </span>
      )}
      <h3 className="mt-2 font-display text-2xl text-foreground">{t(variant.nameKey)}</h3>
      <p className="mt-2 text-sm text-muted">{t(variant.taglineKey)}</p>
      <ul className="mt-6 space-y-2">
        {variant.featureKeys.map((key) => (
          <li key={key} className="flex items-start gap-2 text-sm text-muted">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
            {t(key)}
          </li>
        ))}
      </ul>
      {selected && (
        <motion.div
          layoutId="variant-check"
          className="absolute bottom-4 right-4 flex h-8 w-8 items-center justify-center rounded-full bg-primary"
        >
          <Check className="h-4 w-4 text-[#0F1720]" />
        </motion.div>
      )}
    </motion.button>
  );
}
