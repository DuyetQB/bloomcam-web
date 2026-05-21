"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { Play } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRef } from "react";
import { AnimatedGradientBackground } from "@/components/effects/animated-gradient-background";
import { FloatingParticles } from "@/components/effects/floating-particles";
import { BloomCamDevice } from "@/components/product/bloomcam-device";
import { HeroSpotlight } from "@/components/shared/hero-spotlight";
import { MagneticButton } from "@/components/shared/magnetic-button";
import { PremiumButton } from "@/components/shared/premium-button";
import { FloatingPhoneMockup } from "@/components/product/floating-phone-mockup";
import { images } from "@/lib/images";

export function HeroSection() {
  const t = useTranslations("hero");
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.92]);

  return (
    <section
      ref={ref}
      aria-label={t("eyebrow")}
      className="relative flex min-h-[100dvh] flex-col items-center justify-center overflow-hidden pt-20"
    >
      <AnimatedGradientBackground variant="hero" />
      <FloatingParticles count={32} />
      <HeroSpotlight />

      <motion.div
        style={{ y, opacity }}
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
      >
        <div className="relative h-[70vh] w-full max-w-5xl overflow-hidden rounded-3xl opacity-20 md:opacity-30">
          <Image
            src={images.heroBackdrop}
            alt={t("imageAlt")}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background via-background/60 to-background" />
        </div>
      </motion.div>

      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col items-center px-6 pb-20 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="text-center"
        >
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mb-6 text-xs font-medium uppercase tracking-[0.3em] text-accent"
          >
            {t("eyebrow")}
          </motion.p>
          <h1 className="font-display text-5xl font-light leading-[1.05] tracking-tight md:text-7xl lg:text-8xl">
            <span className="text-gradient">{t("titleLine1")}</span>
            <br />
            <span className="text-foreground">{t("titleLine2")}</span>
          </h1>
          <p className="mx-auto mt-8 max-w-xl text-lg leading-relaxed text-muted md:text-xl">
            {t("subtitle")}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <MagneticButton>
            <PremiumButton href="#preorder" variant="primary">
              {t("preorder")}
            </PremiumButton>
          </MagneticButton>
          <MagneticButton>
            <PremiumButton href="#gallery" variant="secondary">
              <Play className="h-4 w-4 shrink-0 fill-current" aria-hidden />
              <span>{t("watchDemo")}</span>
            </PremiumButton>
          </MagneticButton>
        </motion.div>

        <motion.div
          style={{ scale }}
          className="relative mt-16 flex w-full items-center justify-center md:mt-8"
        >
          <BloomCamDevice className="z-20" />
          <FloatingPhoneMockup
            screen="timeline"
            className="absolute -left-4 top-1/4 z-10 hidden -rotate-12 lg:block xl:-left-16"
            delay={0.6}
          />
          <FloatingPhoneMockup
            screen="gallery"
            className="absolute -right-4 top-1/3 z-10 hidden rotate-12 lg:block xl:-right-16"
            delay={0.8}
          />
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1, duration: 0.9 }}
            className="glass absolute right-8 top-1/4 hidden max-w-[200px] rounded-2xl p-4 md:block lg:right-16"
          >
            <p className="text-[10px] uppercase tracking-widest text-primary">{t("liveGrowth")}</p>
            <p className="mt-1 font-display text-2xl text-highlight">{t("growthStat")}</p>
            <p className="text-xs text-muted">{t("growthPeriod")}</p>
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex h-10 w-6 items-start justify-center rounded-full border border-white/20 p-2"
        >
          <div className="h-2 w-1 rounded-full bg-accent/60" />
        </motion.div>
      </motion.div>
    </section>
  );
}
