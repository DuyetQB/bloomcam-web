"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { images } from "@/lib/images";
import { cn } from "@/lib/utils";

interface FloatingPhoneMockupProps {
  className?: string;
  screen?: "timeline" | "gallery" | "export";
  delay?: number;
}

const screenConfig = {
  timeline: {
    gradient: "from-primary/40 via-accent/20 to-surface",
    image: images.phoneTimeline,
  },
  gallery: {
    gradient: "from-accent/30 via-primary/20 to-surface",
    image: images.phoneGallery,
  },
  export: {
    gradient: "from-highlight/30 via-primary/20 to-surface",
    image: images.phoneExport,
  },
} as const;

export function FloatingPhoneMockup({
  className,
  screen = "timeline",
  delay = 0,
}: FloatingPhoneMockupProps) {
  const t = useTranslations("appSection.screens");
  const config = screenConfig[screen];

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, rotate: -6 }}
      whileInView={{ opacity: 1, y: 0, rotate: -4 }}
      viewport={{ once: true }}
      transition={{ duration: 1, delay, ease: [0.22, 1, 0.36, 1] }}
      animate={{ y: [0, -10, 0] }}
      className={cn("relative", className)}
    >
      <div className="glass-strong relative w-[220px] overflow-hidden rounded-[2.5rem] p-3 shadow-2xl glow-ring md:w-[260px]">
        <div className="relative aspect-[9/19] overflow-hidden rounded-[2rem] bg-surface">
          <div className={cn("absolute inset-0 bg-gradient-to-b", config.gradient)} />
          <Image
            src={config.image}
            alt=""
            fill
            className="object-cover opacity-60"
            sizes="260px"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-5">
            <p className="text-[10px] uppercase tracking-widest text-accent">
              {t(`${screen}.subtitle`)}
            </p>
            <p className="mt-1 font-display text-lg text-foreground">
              {t(`${screen}.title`)}
            </p>
            <div className="mt-4 h-1 overflow-hidden rounded-full bg-white/10">
              <motion.div
                className="h-full rounded-full bg-primary"
                initial={{ width: "0%" }}
                whileInView={{ width: "72%" }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, delay: delay + 0.5 }}
              />
            </div>
          </div>
          <div className="absolute left-1/2 top-3 h-5 w-20 -translate-x-1/2 rounded-full bg-black/40" />
        </div>
      </div>
    </motion.div>
  );
}
