import { getTranslations } from "next-intl/server";

export async function SeoIntroSection() {
  const t = await getTranslations("seo.intro");

  return (
    <section
      id="about-product"
      aria-labelledby="seo-intro-heading"
      className="section-padding border-t border-white/5"
    >
      <div className="mx-auto max-w-3xl px-6 md:px-12">
        <p className="text-xs font-medium uppercase tracking-[0.25em] text-primary">
          {t("eyebrow")}
        </p>
        <h2
          id="seo-intro-heading"
          className="mt-4 font-display text-3xl font-light leading-tight text-foreground md:text-4xl"
        >
          {t("title")}
        </h2>
        <div className="mt-8 space-y-6 text-lg leading-relaxed text-muted">
          <p>{t("p1")}</p>
          <p>{t("p2")}</p>
          <p className="text-base text-muted/80">{t("p3")}</p>
        </div>
      </div>
    </section>
  );
}
