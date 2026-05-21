"use client";

import { useTranslations } from "next-intl";
import { AnimatedSectionTitle } from "@/components/shared/animated-section-title";

const faqKeys = ["what", "who", "surveillance", "how", "app", "export", "wifi", "price"] as const;

export function FaqSection() {
  const t = useTranslations("seo.faq");

  return (
    <section id="faq" aria-labelledby="faq-heading" className="section-padding">
      <div className="mx-auto max-w-3xl px-6 md:px-12">
        <AnimatedSectionTitle
          eyebrow={t("eyebrow")}
          title={t("title")}
          subtitle={t("subtitle")}
        />

        <div className="space-y-3">
          {faqKeys.map((key) => (
            <details
              key={key}
              className="group glass rounded-2xl px-6 py-2 open:bg-white/[0.03]"
            >
              <summary className="cursor-pointer list-none py-4 font-medium text-foreground marker:content-none [&::-webkit-details-marker]:hidden">
                <span className="flex items-center justify-between gap-4">
                  {t(`items.${key}.q`)}
                  <span className="text-primary transition-transform group-open:rotate-45">
                    +
                  </span>
                </span>
              </summary>
              <p className="pb-5 leading-relaxed text-muted">{t(`items.${key}.a`)}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
