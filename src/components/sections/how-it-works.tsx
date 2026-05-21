"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useTranslations } from "next-intl";
import { useRef } from "react";
import { AnimatedSectionTitle } from "@/components/shared/animated-section-title";
import { BloomCamDevice } from "@/components/product/bloomcam-device";

const stepKeys = ["place", "connect", "capture", "create"] as const;

export function HowItWorks() {
  const t = useTranslations("howItWorks");
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start center", "end center"],
  });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  const steps = stepKeys.map((key, i) => ({
    key,
    number: String(i + 1).padStart(2, "0"),
    title: t(`steps.${key}.title`),
    description: t(`steps.${key}.description`),
  }));

  return (
    <section className="section-padding">
      <div className="mx-auto max-w-7xl">
        <AnimatedSectionTitle
          eyebrow={t("eyebrow")}
          title={t("title")}
          subtitle={t("subtitle")}
        />

        <div ref={ref} className="relative grid gap-16 lg:grid-cols-2 lg:gap-24">
          <div className="relative space-y-12 lg:space-y-16">
            <div className="absolute left-[27px] top-0 hidden h-full w-px bg-white/10 lg:block">
              <motion.div
                style={{ height: lineHeight }}
                className="w-full bg-gradient-to-b from-primary via-accent to-highlight"
              />
            </div>

            {steps.map((step, i) => (
              <motion.div
                key={step.key}
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: i * 0.15, duration: 0.7 }}
                className="relative flex gap-8"
              >
                <div className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-full glass-strong font-display text-lg text-primary">
                  {step.number}
                </div>
                <div>
                  <h3 className="font-display text-2xl text-foreground md:text-3xl">
                    {step.title}
                  </h3>
                  <p className="mt-3 max-w-md leading-relaxed text-muted">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="relative"
            >
              <div className="absolute inset-0 rounded-full bg-primary/10 blur-[100px]" />
              <BloomCamDevice size="md" />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
