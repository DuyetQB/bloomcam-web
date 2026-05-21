"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useRef } from "react";
import { AnimatedGradientBackground } from "@/components/effects/animated-gradient-background";
import { BloomCamDevice } from "@/components/product/bloomcam-device";
import { AnimatedSectionTitle } from "@/components/shared/animated-section-title";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { images } from "@/lib/images";

const highlightKeys = ["timelapse", "tracking", "app", "setup"] as const;
const highlightImages = {
  timelapse: images.plantGarden,
  tracking: images.plantLeaves,
  app: images.plantPot,
  setup: images.setupDesk1,
};

export function ProductShowcase() {
  const t = useTranslations("product");
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 360]);

  const highlights = highlightKeys.map((key) => ({
    key,
    title: t(`highlights.${key}.title`),
    description: t(`highlights.${key}.description`),
    image: highlightImages[key],
  }));

  return (
    <section id="product" className="relative section-padding overflow-hidden">
      <AnimatedGradientBackground variant="section" />
      <div className="relative z-10 mx-auto max-w-7xl">
        <AnimatedSectionTitle
          eyebrow={t("eyebrow")}
          title={t("title")}
          subtitle={t("subtitle")}
        />

        <div ref={containerRef} className="relative mb-32 flex justify-center py-16">
          <motion.div style={{ rotate }} className="absolute h-72 w-72 rounded-full border border-primary/10" />
          <motion.div
            style={{ rotate: useTransform(scrollYProgress, [0, 1], [0, -180]) }}
            className="absolute h-96 w-96 rounded-full border border-accent/5"
          />
          <BloomCamDevice size="lg" />
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {highlights.map((item, i) => (
            <ScrollReveal key={item.key} delay={i * 0.1}>
              <motion.article
                whileHover={{ y: -6 }}
                className="group relative overflow-hidden rounded-3xl glass"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
                </div>
                <div className="p-8">
                  <h3 className="font-display text-2xl text-foreground">{item.title}</h3>
                  <p className="mt-3 leading-relaxed text-muted">{item.description}</p>
                </div>
              </motion.article>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
