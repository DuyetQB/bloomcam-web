import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { routing } from "@/i18n/routing";

export type BlogCategory =
  | "timelapse-guides"
  | "indoor-gardening"
  | "desk-setup"
  | "timelapse-photography";

export type BlogPost = {
  slug: string;
  locale: string;
  title: string;
  description: string;
  date: string;
  category: BlogCategory;
  categoryLabel: string;
  readingTime: string;
  content: string;
  tags: string[];
};

const CONTENT_DIR = path.join(process.cwd(), "content/blog");

function postsDir(locale: string) {
  return path.join(CONTENT_DIR, locale);
}

export function getAllPosts(locale: string): BlogPost[] {
  const dir = postsDir(locale);
  if (!fs.existsSync(dir)) return [];

  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".md"))
    .map((filename) => {
      const slug = filename.replace(/\.md$/, "");
      return getPostBySlug(locale, slug)!;
    })
    .filter(Boolean)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPostBySlug(locale: string, slug: string): BlogPost | null {
  const filePath = path.join(postsDir(locale), `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  const words = content.trim().split(/\s+/).length;
  const minutes = Math.max(1, Math.ceil(words / 200));

  return {
    slug,
    locale,
    title: data.title as string,
    description: data.description as string,
    date: data.date as string,
    category: data.category as BlogCategory,
    categoryLabel: data.categoryLabel as string,
    readingTime: `${minutes} min`,
    content,
    tags: (data.tags as string[]) ?? [],
  };
}

export function getRelatedPosts(locale: string, slug: string, limit = 3): BlogPost[] {
  const current = getPostBySlug(locale, slug);
  if (!current) return [];

  return getAllPosts(locale)
    .filter((p) => p.slug !== slug && p.category === current.category)
    .slice(0, limit);
}

export function getAllSlugs(): { locale: string; slug: string }[] {
  const slugs: { locale: string; slug: string }[] = [];
  for (const locale of routing.locales) {
    for (const post of getAllPosts(locale)) {
      slugs.push({ locale, slug: post.slug });
    }
  }
  return slugs;
}
