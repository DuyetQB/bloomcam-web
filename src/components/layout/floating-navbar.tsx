"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { LanguageSwitcher } from "@/components/layout/language-switcher";
import { PremiumButton } from "@/components/shared/premium-button";

export function FloatingNavbar() {
  const t = useTranslations("nav");
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();
  const bgOpacity = useTransform(scrollY, [0, 120], [0, 1]);
  const borderOpacity = useTransform(scrollY, [0, 120], [0, 0.15]);

  const links = [
    { href: "#product" as const, label: t("product") },
    { href: "#app" as const, label: t("app") },
    { href: "#gallery" as const, label: t("gallery") },
    { href: "#features" as const, label: t("features") },
  ];

  return (
    <>
      <motion.header
        style={{
          backgroundColor: useTransform(
            bgOpacity,
            (v) => `rgba(15, 23, 32, ${v * 0.85})`
          ),
          borderColor: useTransform(
            borderOpacity,
            (v) => `rgba(167, 196, 160, ${v})`
          ),
        }}
        className="fixed top-0 left-0 right-0 z-50 border-b border-transparent backdrop-blur-xl"
      >
        <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-6 md:h-20 md:px-12">
          <Link href="/" className="group flex shrink-0 items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/20 text-sm font-semibold text-primary">
              B
            </span>
            <span className="font-display text-lg tracking-tight text-foreground">
              Bloom<span className="text-primary">Cam</span>
            </span>
          </Link>

          <div className="hidden items-center gap-8 md:flex">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-muted transition-colors hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="hidden items-center gap-4 md:flex">
            <LanguageSwitcher />
            <PremiumButton href="#preorder" variant="primary" className="!px-6 !py-2.5 !text-xs">
              {t("preorder")}
            </PremiumButton>
          </div>

          <div className="flex items-center gap-2 md:hidden">
            <LanguageSwitcher />
            <button
              type="button"
              className="rounded-full p-2 text-muted hover:bg-white/5"
              onClick={() => setOpen(!open)}
              aria-label={t("menuToggle")}
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </nav>
      </motion.header>

      <motion.div
        initial={false}
        animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
        className="fixed top-16 left-0 right-0 z-40 overflow-hidden glass-strong md:hidden"
      >
        <div className="flex flex-col gap-4 p-6">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-lg text-foreground"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <PremiumButton href="#preorder">{t("preorderNow")}</PremiumButton>
        </div>
      </motion.div>
    </>
  );
}
