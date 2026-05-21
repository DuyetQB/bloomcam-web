"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

const locales = [
  { code: "en" as const, labelKey: "en" },
  { code: "vi" as const, labelKey: "vi" },
];

export function LanguageSwitcher({ className }: { className?: string }) {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div
      className={cn(
        "flex items-center rounded-full border border-white/10 bg-white/5 p-0.5 text-xs",
        className
      )}
      role="group"
      aria-label="Language"
    >
      {locales.map(({ code, labelKey }) => (
        <button
          key={code}
          type="button"
          onClick={() => router.replace(pathname, { locale: code })}
          className={cn(
            "rounded-full px-2.5 py-1 font-medium transition-all",
            locale === code
              ? "bg-primary/25 text-primary"
              : "text-muted hover:text-foreground"
          )}
          aria-pressed={locale === code}
        >
          {labelKey === "en" ? "EN" : "VI"}
        </button>
      ))}
    </div>
  );
}
