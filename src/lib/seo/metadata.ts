import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { absoluteUrl, siteConfig } from "./site";

type PageKey = "home" | "blog" | "blogPost";

type BuildMetadataOptions = {
  locale: string;
  page?: PageKey;
  path?: string;
  title?: string;
  description?: string;
  image?: string;
  noIndex?: boolean;
};

export async function buildPageMetadata({
  locale,
  page = "home",
  path = "",
  title,
  description,
  image,
  noIndex = false,
}: BuildMetadataOptions): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "metadata" });

  const pageTitle =
    title ?? (page === "home" ? t("title") : t(`${page}.title`));
  const pageDescription =
    description ??
    (page === "home" ? t("description") : t(`${page}.description`));
  const canonical = absoluteUrl(locale, path);
  const ogImage = image ?? absoluteUrl(locale, "/opengraph-image");

  const languages: Record<string, string> = {
    "x-default": absoluteUrl(routing.defaultLocale, path),
  };
  for (const loc of routing.locales) {
    languages[loc] = absoluteUrl(loc, path);
  }

  const keywordsExtra =
    locale === "vi" && Array.isArray(t.raw("keywordsVi"))
      ? (t.raw("keywordsVi") as string[])
      : [];

  return {
    metadataBase: new URL(siteConfig.url),
    title: {
      default: pageTitle,
      template: `%s | ${siteConfig.name}`,
    },
    description: pageDescription,
    keywords: [...siteConfig.keywords, ...keywordsExtra],
    authors: [{ name: siteConfig.name, url: siteConfig.url }],
    creator: siteConfig.name,
    publisher: siteConfig.name,
    category: "technology",
    alternates: {
      canonical,
      languages,
    },
    robots: noIndex
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
            "max-video-preview": -1,
          },
        },
    openGraph: {
      type: page === "blogPost" ? "article" : "website",
      locale: locale === "vi" ? "vi_VN" : "en_US",
      alternateLocale: routing.locales
        .filter((l) => l !== locale)
        .map((l) => (l === "vi" ? "vi_VN" : "en_US")),
      url: canonical,
      siteName: siteConfig.name,
      title: pageTitle,
      description: pageDescription,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: pageTitle,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      site: siteConfig.twitter,
      creator: siteConfig.twitter,
      title: pageTitle,
      description: pageDescription,
      images: [ogImage],
    },
    other: {
      "ai-content-declaration": "human-crafted-product-marketing",
    },
  };
}
