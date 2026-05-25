"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { Check, Lock, Package, Sparkles, Truck } from "lucide-react";
import { PreorderTrigger } from "@/components/preorder/preorder-trigger";
import { PremiumButton } from "@/components/shared/premium-button";
import {
  PRODUCT_VARIANTS,
  formatMoney,
  type ProductVariantId,
} from "@/lib/products";
import { images } from "@/lib/images";
import { cn } from "@/lib/utils";

const lifestyleShots = [
  { src: images.setupDesk1, altKey: "desk" as const },
  { src: images.plantPot, altKey: "workflow" as const },
  { src: images.plantGarden, altKey: "creator" as const },
];

export function PreorderPricingSection() {
  const t = useTranslations("pricing");
  const tPreorder = useTranslations("preorder");
  const locale = useLocale();

  return (
    <section
      id="kits"
      className="relative overflow-hidden section-padding"
      aria-labelledby="pricing-heading"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(167,196,160,0.12),transparent)]"
        aria-hidden
      />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mx-auto max-w-2xl text-center"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-4 py-1.5 text-[10px] font-medium uppercase tracking-[0.25em] text-primary">
            <Sparkles className="h-3 w-3" />
            {t("badge")}
          </span>
          <h2
            id="pricing-heading"
            className="mt-6 font-display text-4xl font-light tracking-tight text-foreground md:text-5xl lg:text-6xl"
          >
            {t("title")}
          </h2>
          <p className="mt-4 text-lg text-muted">{t("subtitle")}</p>
          <p className="mt-3 text-sm text-highlight">{t("shippingEstimate")}</p>
        </motion.div>

        <div className="mt-16 grid gap-6 lg:grid-cols-2">
          {PRODUCT_VARIANTS.map((variant, index) => {
            const price = formatMoney(variant.priceCents, locale);
            const compareAt =
              variant.compareAtCents != null
                ? formatMoney(variant.compareAtCents, locale)
                : null;

            return (
              <motion.article
                key={variant.id}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={cn(
                  "group relative flex flex-col overflow-hidden rounded-3xl border backdrop-blur-xl transition-shadow duration-500",
                  variant.highlight
                    ? "border-highlight/30 bg-surface/60 shadow-[0_24px_80px_-24px_rgba(231,182,107,0.25)]"
                    : "border-white/10 bg-surface/40 hover:border-white/20 hover:shadow-[0_20px_60px_-30px_var(--glow-primary)]"
                )}
              >
                {variant.highlight && (
                  <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-highlight/60 to-transparent" />
                )}

                <div className="p-8 pb-0">
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-primary">
                        {tPreorder(variant.badgeKey!)}
                      </p>
                      <h3 className="mt-2 font-display text-3xl text-foreground">
                        {tPreorder(variant.nameKey)}
                      </h3>
                      <p className="mt-2 max-w-sm text-sm text-muted">
                        {tPreorder(variant.taglineKey)}
                      </p>
                    </div>
                    <div className="text-right">
                      <motion.p
                        key={price}
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="font-display text-4xl text-foreground"
                      >
                        {price}
                      </motion.p>
                      {compareAt && (
                        <p className="text-sm text-muted line-through">{compareAt}</p>
                      )}
                      <p className="mt-1 text-[10px] uppercase tracking-wider text-muted">
                        {t("preorderPrice")}
                      </p>
                    </div>
                  </div>

                  <ul className="mt-8 space-y-3">
                    {variant.featureKeys.map((key) => (
                      <li
                        key={key}
                        className="flex items-start gap-3 text-sm text-muted"
                      >
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                        {tPreorder(key)}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-8 flex flex-1 flex-col justify-end p-8 pt-6">
                  <PreorderTrigger variantId={variant.id as ProductVariantId}>
                    <PremiumButton
                      href="#preorder"
                      variant={variant.highlight ? "primary" : "secondary"}
                      className="w-full"
                    >
                      {t("cta", { kit: tPreorder(variant.nameKey) })}
                    </PremiumButton>
                  </PreorderTrigger>
                </div>
              </motion.article>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-10 flex flex-wrap items-center justify-center gap-6 text-xs text-muted md:gap-10"
        >
          <span className="inline-flex items-center gap-2">
            <Package className="h-4 w-4 text-primary" />
            {t("trust.limited")}
          </span>
          <span className="inline-flex items-center gap-2">
            <Truck className="h-4 w-4 text-primary" />
            {t("trust.ships")}
          </span>
          <span className="inline-flex items-center gap-2">
            <Lock className="h-4 w-4 text-primary" />
            {t("trust.secure")}
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
          className="mt-20"
        >
          <p className="text-center text-xs font-medium uppercase tracking-[0.3em] text-muted">
            {t("lifestyle.eyebrow")}
          </p>
          <p className="mx-auto mt-3 max-w-xl text-center text-lg text-foreground/90">
            {t("lifestyle.title")}
          </p>
          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {lifestyleShots.map((shot, i) => (
              <motion.div
                key={shot.altKey}
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 24 }}
                className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-white/10"
              >
                <Image
                  src={shot.src}
                  alt={t(`lifestyle.${shot.altKey}`)}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                  priority={i === 0}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F1720]/80 via-transparent to-transparent" />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
