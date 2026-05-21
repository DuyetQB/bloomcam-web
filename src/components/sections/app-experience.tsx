"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { AnimatedGradientBackground } from "@/components/effects/animated-gradient-background";
import { FloatingPhoneMockup } from "@/components/product/floating-phone-mockup";
import { AnimatedSectionTitle } from "@/components/shared/animated-section-title";
import { ScrollReveal } from "@/components/shared/scroll-reveal";

const featureKeys = ["library", "journal", "export", "insights"] as const;

export function AppExperience() {
  const t = useTranslations("appSection");

  const appFeatures = featureKeys.map((key) => ({
    key,
    label: t(`features.${key}.label`),
    desc: t(`features.${key}.desc`),
  }));

  return (
    <section id="app" className="relative section-padding overflow-hidden">
      <AnimatedGradientBackground variant="section" />
      <div className="relative z-10 mx-auto max-w-7xl">
        <AnimatedSectionTitle
          eyebrow={t("eyebrow")}
          title={t("title")}
          subtitle={t("subtitle")}
        />

        <div className="relative flex min-h-[500px] items-center justify-center">
          <FloatingPhoneMockup screen="timeline" className="relative z-20" delay={0} />
          <FloatingPhoneMockup
            screen="gallery"
            className="absolute left-[15%] top-1/4 z-10 hidden scale-90 opacity-80 md:block"
            delay={0.2}
          />
          <FloatingPhoneMockup
            screen="export"
            className="absolute right-[15%] top-1/3 z-10 hidden scale-90 opacity-80 md:block"
            delay={0.4}
          />
          <motion.div
            className="absolute h-[400px] w-[400px] rounded-full border border-primary/10"
            animate={{ scale: [1, 1.05, 1], opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 6, repeat: Infinity }}
          />
        </div>

        <div className="mt-20 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {appFeatures.map((f, i) => (
            <ScrollReveal key={f.key} delay={i * 0.08}>
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="glass rounded-2xl p-6 text-center md:text-left"
              >
                <div className="mb-3 h-1 w-8 rounded-full bg-primary mx-auto md:mx-0" />
                <h4 className="font-medium text-foreground">{f.label}</h4>
                <p className="mt-2 text-sm text-muted">{f.desc}</p>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
