import { getTranslations } from "next-intl/server";

export async function getFaqItems(locale: string) {
  const t = await getTranslations({ locale, namespace: "seo.faq" });
  const keys = ["what", "who", "surveillance", "how", "app", "export", "wifi", "price"] as const;

  return keys.map((key) => ({
    question: t(`items.${key}.q`),
    answer: t(`items.${key}.a`),
  }));
}

export async function getReviewItems(locale: string) {
  const t = await getTranslations({ locale, namespace: "social.testimonials" });
  return [
    { author: "Maya Chen", reviewBody: t("maya.quote"), rating: 5 },
    { author: "James Okonkwo", reviewBody: t("james.quote"), rating: 5 },
    { author: "Sofia Ruiz", reviewBody: t("sofia.quote"), rating: 5 },
  ];
}

export async function getGalleryVideoSchema(locale: string) {
  const t = await getTranslations({ locale, namespace: "gallery.items" });
  const ids = ["monstera", "succulent", "fiddle"] as const;
  const { images } = await import("@/lib/images");

  const thumbs = [images.plantGreenhouse, images.plantWindowsill, images.plantCloseup];

  return ids.map((id, i) => ({
    name: t(`${id}.title`),
    description: `${t(`${id}.title`)} — ${t(`${id}.duration`)} plant growth timelapse captured with BloomCam.`,
    thumbnail: thumbs[i],
  }));
}
