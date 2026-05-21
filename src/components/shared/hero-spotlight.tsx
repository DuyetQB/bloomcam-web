"use client";

import { motion } from "framer-motion";
import { useMousePosition } from "@/hooks/use-mouse-position";

export function HeroSpotlight() {
  const { x, y } = useMousePosition();

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[1] opacity-60 mix-blend-soft-light"
      style={{
        background: `radial-gradient(600px circle at ${x}px ${y}px, rgba(167, 196, 160, 0.15), transparent 40%)`,
      }}
    />
  );
}
