"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { AnimatedGradientBackground } from "@/components/effects/animated-gradient-background";
import { FloatingParticles } from "@/components/effects/floating-particles";
import { BloomCamDevice } from "@/components/product/bloomcam-device";
import { MagneticButton } from "@/components/shared/magnetic-button";
import { PreorderTrigger } from "@/components/preorder/preorder-trigger";
import { PremiumButton } from "@/components/shared/premium-button";

export function FinalCTA() {
  const t = useTranslations("cta");

  return (
    <section id="preorder" className="relative overflow-hidden section-padding">
      <AnimatedGradientBackground variant="cta" />
      <FloatingParticles count={16} />

      <div className="relative z-10 mx-auto flex max-w-7xl flex-col items-center text-center">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-6 text-xs font-medium uppercase tracking-[0.3em] text-highlight"
        >
          {t("eyebrow")}
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="max-w-4xl font-display text-5xl font-light leading-[1.08] tracking-tight md:text-7xl lg:text-8xl"
        >
          <span className="text-gradient-gold">{t("titleLine1")}</span>
          <br />
          <span className="text-foreground">{t("titleLine2")}</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-8 max-w-lg text-lg text-muted"
        >
          {t("subtitle")}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-10"
        >
          <MagneticButton>
            <PreorderTrigger>
              <PremiumButton href="#preorder" variant="primary" className="!px-10 !py-4 !text-base">
                {t("button")}
              </PremiumButton>
            </PreorderTrigger>
          </MagneticButton>
          <p className="mt-4 text-xs text-muted">{t("footnote")}</p>
        </motion.div>

        <div className="relative mt-20">
          <BloomCamDevice size="md" />
        </div>
      </div>
    </section>
  );
}
