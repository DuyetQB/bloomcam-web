"use client";

import {
  Cloud,
  Film,
  Leaf,
  LineChart,
  Smartphone,
  Sparkles,
  Wifi,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { AnimatedGradientBackground } from "@/components/effects/animated-gradient-background";
import { AnimatedSectionTitle } from "@/components/shared/animated-section-title";
import { GlowCard } from "@/components/shared/glow-card";

const featureConfig = [
  { key: "timelapse", icon: Film, glow: "primary" as const },
  { key: "wifi", icon: Wifi, glow: "accent" as const },
  { key: "journal", icon: Leaf, glow: "primary" as const },
  { key: "mobile", icon: Smartphone, glow: "accent" as const },
  { key: "reels", icon: Sparkles, glow: "highlight" as const },
  { key: "insights", icon: LineChart, glow: "primary" as const },
  { key: "cloud", icon: Cloud, glow: "accent" as const },
];

export function FeaturesSection() {
  const t = useTranslations("features");

  const features = featureConfig.map(({ key, icon, glow }) => ({
    key,
    icon,
    glow,
    title: t(`items.${key}.title`),
    description: t(`items.${key}.description`),
  }));

  return (
    <section id="features" className="relative section-padding overflow-hidden">
      <AnimatedGradientBackground variant="section" />
      <div className="relative z-10 mx-auto max-w-7xl">
        <AnimatedSectionTitle
          eyebrow={t("eyebrow")}
          title={t("title")}
          subtitle={t("subtitle")}
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <GlowCard key={feature.key} glowColor={feature.glow}>
              <feature.icon className="mb-4 h-8 w-8 text-primary" strokeWidth={1.5} />
              <h3 className="font-display text-xl text-foreground">{feature.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                {feature.description}
              </p>
            </GlowCard>
          ))}
        </div>
      </div>
    </section>
  );
}
