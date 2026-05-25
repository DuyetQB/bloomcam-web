import { preorderProductsJsonLd } from "@/lib/seo/structured-data";

export function PreorderJsonLd({ locale }: { locale: string }) {
  const graphs = preorderProductsJsonLd(locale);
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graphs) }}
    />
  );
}
