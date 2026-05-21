"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export function GlassCard({ children, className, hover = true }: GlassCardProps) {
  return (
    <motion.div
      whileHover={hover ? { y: -4, scale: 1.01 } : undefined}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
      className={cn(
        "glass rounded-2xl p-6 md:p-8",
        hover && "transition-shadow hover:shadow-[0_0_60px_-12px_var(--glow-primary)]",
        className
      )}
    >
      {children}
    </motion.div>
  );
}
