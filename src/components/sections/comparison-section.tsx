import { getTranslations } from "next-intl/server";

const rowKeys = ["purpose", "design", "intervals", "app", "privacy"] as const;

export async function ComparisonSection() {
  const t = await getTranslations("seo.comparison");

  return (
    <section
      id="comparison"
      aria-labelledby="comparison-heading"
      className="section-padding border-t border-white/5"
    >
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <p className="text-xs font-medium uppercase tracking-[0.25em] text-primary">
          {t("eyebrow")}
        </p>
        <h2
          id="comparison-heading"
          className="mt-4 font-display text-4xl font-light text-foreground md:text-5xl"
        >
          {t("title")}
        </h2>
        <p className="mt-4 max-w-2xl text-muted">{t("subtitle")}</p>

        <div className="mt-12 overflow-x-auto">
          <table className="w-full min-w-[640px] border-collapse text-left text-sm">
            <caption className="sr-only">{t("title")}</caption>
            <thead>
              <tr className="border-b border-white/10">
                <th scope="col" className="py-4 pr-4 font-medium text-muted">
                  {t("headers.feature")}
                </th>
                <th scope="col" className="py-4 px-4 font-medium text-primary">
                  {t("headers.bloomcam")}
                </th>
                <th scope="col" className="py-4 pl-4 font-medium text-muted">
                  {t("headers.generic")}
                </th>
              </tr>
            </thead>
            <tbody>
              {rowKeys.map((key) => (
                <tr key={key} className="border-b border-white/5">
                  <th scope="row" className="py-4 pr-4 font-medium text-foreground">
                    {t(`rows.${key}.feature`)}
                  </th>
                  <td className="py-4 px-4 text-foreground">{t(`rows.${key}.bloomcam`)}</td>
                  <td className="py-4 pl-4 text-muted">{t(`rows.${key}.generic`)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
