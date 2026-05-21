import type { Locale } from "@/i18n/routing";

/**
 * Maps paired blog posts across locales (slugs differ per language).
 * Keep in sync with `translationKey` in each post's frontmatter.
 */
export const blogSlugByTranslationKey: Record<string, Record<Locale, string>> = {
  "plant-timelapse-guide": {
    en: "plant-timelapse-guide",
    vi: "huong-dan-timelapse-cay",
  },
  "aesthetic-desk-setup": {
    en: "aesthetic-desk-setup",
    vi: "setup-ban-lam-viec",
  },
};

export function resolvePathnameForLocale(pathname: string, targetLocale: Locale): string {
  const match = pathname.match(/^\/blog\/([^/]+)\/?$/);
  if (!match) return pathname;

  const currentSlug = decodeURIComponent(match[1]);

  for (const slugs of Object.values(blogSlugByTranslationKey)) {
    if (slugs.en === currentSlug || slugs.vi === currentSlug) {
      return `/blog/${slugs[targetLocale]}`;
    }
  }

  return "/blog";
}
