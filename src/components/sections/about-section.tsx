import { getTranslations } from "next-intl/server";

export async function AboutSection() {
  const t = await getTranslations("seo.about");

  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="section-padding bg-surface/30"
    >
      <div className="mx-auto grid max-w-7xl gap-12 px-6 md:grid-cols-2 md:px-12">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.25em] text-primary">
            {t("eyebrow")}
          </p>
          <h2
            id="about-heading"
            className="mt-4 font-display text-4xl font-light text-foreground md:text-5xl"
          >
            {t("title")}
          </h2>
          <p className="mt-6 leading-relaxed text-muted">{t("p1")}</p>
          <p className="mt-4 leading-relaxed text-muted">{t("p2")}</p>
        </div>
        <aside className="glass rounded-2xl p-8">
          <h3 className="font-display text-xl text-foreground">{t("trustTitle")}</h3>
          <p className="mt-4 leading-relaxed text-muted">{t("trustBody")}</p>
        </aside>
      </div>
    </section>
  );
}
