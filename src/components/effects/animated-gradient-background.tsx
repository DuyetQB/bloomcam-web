"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function AnimatedGradientBackground({
  className,
  variant = "hero",
}: {
  className?: string;
  variant?: "hero" | "section" | "cta";
}) {
  const colors =
    variant === "cta"
      ? ["#5E8B7E", "#A7C4A0", "#E7B66B", "#1B2530"]
      : variant === "section"
        ? ["#1B2530", "#5E8B7E", "#0F1720"]
        : ["#0F1720", "#5E8B7E", "#A7C4A0", "#1B2530"];

  return (
    <div className={cn("absolute inset-0 overflow-hidden", className)} aria-hidden>
      <motion.div
        className="mesh-blob absolute -left-1/4 top-0 h-[60vh] w-[60vw] rounded-full opacity-40"
        style={{ background: `radial-gradient(circle, ${colors[1]} 0%, transparent 70%)` }}
        animate={{ x: [0, 80, 0], y: [0, 40, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="mesh-blob absolute -right-1/4 top-1/4 h-[50vh] w-[50vw] rounded-full opacity-30"
        style={{ background: `radial-gradient(circle, ${colors[2] ?? colors[1]} 0%, transparent 70%)` }}
        animate={{ x: [0, -60, 0], y: [0, 60, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="mesh-blob absolute bottom-0 left-1/3 h-[40vh] w-[45vw] rounded-full opacity-25"
        style={{ background: `radial-gradient(circle, ${colors[0]} 0%, transparent 70%)` }}
        animate={{ x: [0, 40, 0], y: [0, -30, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
      />
      {variant === "cta" && (
        <motion.div
          className="mesh-blob absolute left-1/2 top-1/2 h-[70vh] w-[70vw] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-20"
          style={{
            background: `radial-gradient(circle, ${colors[3]} 0%, transparent 65%)`,
          }}
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
      )}
    </div>
  );
}
