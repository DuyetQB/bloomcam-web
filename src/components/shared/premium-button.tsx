"use client";

import { motion } from "framer-motion";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

interface PremiumButtonProps {
  children: React.ReactNode;
  href?: string;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
  onClick?: () => void;
}

export function PremiumButton({
  children,
  href = "#preorder",
  variant = "primary",
  className,
  onClick,
}: PremiumButtonProps) {
  const base =
    "relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full px-8 py-3.5 text-sm font-medium tracking-wide transition-all";

  const variants = {
    primary:
      "bg-primary text-[#0F1720] shadow-[0_0_40px_-8px_var(--glow-primary)] hover:shadow-[0_0_60px_-4px_var(--glow-primary)]",
    secondary:
      "glass text-foreground hover:border-accent/30 hover:bg-white/5",
    ghost: "text-muted hover:text-foreground",
  };

  const content = (
    <>
      {variant === "primary" && (
        <motion.span
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent"
          animate={{ x: ["-100%", "200%"] }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear", repeatDelay: 2 }}
        />
      )}
      <span className="relative z-10">{children}</span>
    </>
  );

  const classes = cn(base, variants[variant], className);

  if (href && !onClick) {
    return (
      <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
        <Link href={href} className={classes}>
          {content}
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.button
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      className={classes}
      onClick={onClick}
    >
      {content}
    </motion.button>
  );
}
