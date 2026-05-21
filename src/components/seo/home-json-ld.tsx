import { JsonLd } from "@/components/seo/json-ld";
import {
  getFaqItems,
  getGalleryVideoSchema,
  getReviewItems,
} from "@/lib/seo/faq-data";
import { buildHomeJsonLd } from "@/lib/seo/structured-data";

export async function HomeJsonLd({ locale }: { locale: string }) {
  const [faqs, reviews, videos] = await Promise.all([
    getFaqItems(locale),
    getReviewItems(locale),
    getGalleryVideoSchema(locale),
  ]);

  return <JsonLd data={buildHomeJsonLd(locale, faqs, reviews, videos)} />;
}
