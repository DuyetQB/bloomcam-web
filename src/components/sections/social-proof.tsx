"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { AnimatedSectionTitle } from "@/components/shared/animated-section-title";
import { GlassCard } from "@/components/shared/glass-card";
import { images } from "@/lib/images";

const testimonialConfig = [
  { key: "maya", author: "Maya Chen", avatar: images.avatar1 },
  { key: "james", author: "James Okonkwo", avatar: images.avatar2 },
  { key: "sofia", author: "Sofia Ruiz", avatar: images.avatar3 },
] as const;

const setupConfig = [
  { key: "copenhagen", image: images.setupDesk1 },
  { key: "portland", image: images.setupDesk2 },
  { key: "tokyo", image: images.setupDesk3 },
] as const;

export function SocialProof() {
  const t = useTranslations("social");

  const testimonials = testimonialConfig.map((item) => ({
    ...item,
    quote: t(`testimonials.${item.key}.quote`),
    role: t(`testimonials.${item.key}.role`),
  }));

  const setups = setupConfig.map((item) => ({
    image: item.image,
    caption: t(`setups.${item.key}`),
  }));

  return (
    <section className="section-padding">
      <div className="mx-auto max-w-7xl">
        <AnimatedSectionTitle
          eyebrow={t("eyebrow")}
          title={t("title")}
          subtitle={t("subtitle")}
        />

        <div className="mb-20 grid gap-6 md:grid-cols-3">
          {testimonials.map((item, i) => (
            <motion.div
              key={item.key}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <GlassCard className="h-full flex flex-col">
                <p className="flex-1 font-display text-xl leading-relaxed text-foreground/90">
                  &ldquo;{item.quote}&rdquo;
                </p>
                <div className="mt-8 flex items-center gap-4">
                  <div className="relative h-12 w-12 overflow-hidden rounded-full">
                    <Image src={item.avatar} alt={item.author} fill className="object-cover" sizes="48px" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{item.author}</p>
                    <p className="text-sm text-muted">{item.role}</p>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>

        <p className="mb-8 text-center text-xs uppercase tracking-[0.25em] text-muted">
          {t("creatorSetups")}
        </p>
        <div className="grid gap-4 md:grid-cols-3">
          {setups.map((setup) => (
            <motion.div
              key={setup.caption}
              whileHover={{ y: -4 }}
              className="group relative aspect-[4/5] overflow-hidden rounded-2xl"
            >
              <Image
                src={setup.image}
                alt={setup.caption}
                fill
                loading="lazy"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
              <p className="absolute bottom-4 left-4 text-sm text-accent">{setup.caption}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
