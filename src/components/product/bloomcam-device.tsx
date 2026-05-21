"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface BloomCamDeviceProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  animate?: boolean;
}

export function BloomCamDevice({
  className,
  size = "lg",
  animate = true,
}: BloomCamDeviceProps) {
  const scale = size === "sm" ? 0.5 : size === "md" ? 0.75 : 1;

  return (
    <motion.div
      className={cn("relative", className)}
      style={{ transform: `scale(${scale})` }}
      animate={
        animate
          ? { y: [0, -14, 0], rotateY: [0, 4, 0, -4, 0] }
          : undefined
      }
      transition={
        animate
          ? { duration: 8, repeat: Infinity, ease: "easeInOut" }
          : undefined
      }
    >
      {/* Ambient glow */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="h-64 w-64 rounded-full bg-primary/25 blur-[80px] animate-pulse-glow" />
      </div>

      <svg
        viewBox="0 0 320 420"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="relative z-10 w-[280px] drop-shadow-[0_40px_80px_rgba(0,0,0,0.5)] md:w-[320px]"
        aria-label="BloomCam device"
      >
        <defs>
          <linearGradient id="bodyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#2a3845" />
            <stop offset="50%" stopColor="#1b2530" />
            <stop offset="100%" stopColor="#151e28" />
          </linearGradient>
          <linearGradient id="lensGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#5e8b7e" />
            <stop offset="100%" stopColor="#3d5f56" />
          </linearGradient>
          <linearGradient id="ringGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#a7c4a0" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#5e8b7e" stopOpacity="0.3" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Base stand */}
        <ellipse cx="160" cy="395" rx="90" ry="12" fill="#0a1018" opacity="0.6" />
        <path
          d="M120 340 L120 380 Q160 400 200 380 L200 340 Z"
          fill="url(#bodyGrad)"
          stroke="rgba(167,196,160,0.15)"
          strokeWidth="1"
        />

        {/* Main body */}
        <rect
          x="95"
          y="120"
          width="130"
          height="230"
          rx="28"
          fill="url(#bodyGrad)"
          stroke="rgba(167,196,160,0.2)"
          strokeWidth="1.5"
        />

        {/* Top accent line */}
        <rect x="130" y="135" width="60" height="3" rx="1.5" fill="#5e8b7e" opacity="0.6" />

        {/* Lens housing */}
        <circle cx="160" cy="200" r="52" fill="#151e28" stroke="rgba(167,196,160,0.25)" strokeWidth="2" />
        <circle cx="160" cy="200" r="44" fill="url(#lensGrad)" filter="url(#glow)" />
        <circle cx="160" cy="200" r="36" fill="#0f1720" opacity="0.85" />
        <circle cx="160" cy="200" r="28" fill="url(#ringGrad)" opacity="0.5" />
        <circle cx="152" cy="192" r="8" fill="rgba(255,255,255,0.15)" />

        {/* LED indicator */}
        <motion.circle
          cx="160"
          cy="280"
          r="4"
          fill="#a7c4a0"
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2, repeat: Infinity }}
        />

        {/* Side detail */}
        <rect x="98" y="200" width="4" height="60" rx="2" fill="rgba(94,139,126,0.3)" />
        <rect x="218" y="200" width="4" height="60" rx="2" fill="rgba(94,139,126,0.3)" />

        {/* Plant accent - subtle leaf silhouette */}
        <path
          d="M160 95 Q140 70 120 85 Q135 100 160 95 Q185 100 200 85 Q180 70 160 95"
          fill="rgba(167,196,160,0.15)"
          stroke="rgba(167,196,160,0.3)"
          strokeWidth="0.5"
        />
      </svg>
    </motion.div>
  );
}
