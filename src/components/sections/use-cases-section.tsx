import { getTranslations } from "next-intl/server";

const keys = ["lover", "creator", "desk", "garden"] as const;

export async function UseCasesSection() {
  const t = await getTranslations("seo.useCases");

  return (
    <section
      id="use-cases"
      aria-labelledby="use-cases-heading"
      className="section-padding"
    >
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <p className="text-xs font-medium uppercase tracking-[0.25em] text-primary">
          {t("eyebrow")}
        </p>
        <h2
          id="use-cases-heading"
          className="mt-4 max-w-2xl font-display text-4xl font-light text-foreground md:text-5xl"
        >
          {t("title")}
        </h2>
        <p className="mt-4 max-w-xl text-muted">{t("subtitle")}</p>

        <ul className="mt-12 grid gap-6 sm:grid-cols-2">
          {keys.map((key) => (
            <li key={key} className="glass rounded-2xl p-8">
              <h3 className="font-display text-xl text-foreground">
                {t(`items.${key}.title`)}
              </h3>
              <p className="mt-3 text-muted leading-relaxed">
                {t(`items.${key}.description`)}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
