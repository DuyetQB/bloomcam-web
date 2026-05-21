import { routing } from "@/i18n/routing";

export const siteConfig = {
  name: "BloomCam",
  legalName: "BloomCam Inc.",
  tagline: "Cinematic plant timelapse camera",
  defaultLocale: routing.defaultLocale,
  locales: routing.locales,
  /** Set NEXT_PUBLIC_SITE_URL in production (e.g. https://bloomcam.com) */
  url:
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
    "https://bloomcam.com",
  twitter: "@bloomcam",
  email: "hello@bloomcam.com",
  price: {
    amount: 99,
    currency: "USD",
  },
  productCategory: [
    "Plant Timelapse Camera",
    "Smart Plant Camera",
    "Indoor Gardening Gadget",
    "Lifestyle Tech",
  ],
  keywords: [
    "plant timelapse camera",
    "smart plant camera",
    "plant growth camera",
    "plant timelapse device",
    "indoor plant timelapse",
    "aesthetic desk gadget",
    "plant lover gift",
    "timelapse plant camera",
    "BloomCam",
  ],
} as const;

export function localePath(locale: string, path = ""): string {
  const normalized = path.startsWith("/") ? path : path ? `/${path}` : "";
  if (locale === routing.defaultLocale) {
    return normalized || "/";
  }
  return `/${locale}${normalized}`;
}

export function absoluteUrl(locale: string, path = ""): string {
  return `${siteConfig.url}${localePath(locale, path)}`;
}
