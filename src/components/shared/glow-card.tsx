"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface GlowCardProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: "primary" | "accent" | "highlight";
}

const glowMap = {
  primary: "from-primary/20 via-transparent to-transparent",
  accent: "from-accent/20 via-transparent to-transparent",
  highlight: "from-highlight/20 via-transparent to-transparent",
};

export function GlowCard({
  children,
  className,
  glowColor = "primary",
}: GlowCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={cn("group relative overflow-hidden rounded-2xl", className)}
    >
      <div
        className={cn(
          "pointer-events-none absolute inset-0 bg-gradient-to-br opacity-0 transition-opacity duration-500 group-hover:opacity-100",
          glowMap[glowColor]
        )}
      />
      <div className="glass-strong relative h-full rounded-2xl p-6 md:p-8 glow-ring">
        {children}
      </div>
    </motion.div>
  );
}
