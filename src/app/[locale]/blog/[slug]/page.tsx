import { notFound } from "next/navigation";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { FloatingNavbar } from "@/components/layout/floating-navbar";
import { Footer } from "@/components/layout/footer";
import { MarkdownContent } from "@/components/blog/markdown-content";
import { PostCard } from "@/components/blog/post-card";
import { JsonLd } from "@/components/seo/json-ld";
import { getAllSlugs, getPostBySlug, getRelatedPosts } from "@/lib/blog";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { blogPostingJsonLd, breadcrumbJsonLd } from "@/lib/seo/structured-data";

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

export function generateStaticParams() {
  return getAllSlugs();
}

export async function generateMetadata({ params }: Props) {
  const { locale, slug } = await params;
  const post = getPostBySlug(locale, slug);
  if (!post) return {};

  return buildPageMetadata({
    locale,
    page: "blogPost",
    path: `/blog/${slug}`,
    title: post.title,
    description: post.description,
  });
}

export default async function BlogPostPage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const post = getPostBySlug(locale, slug);
  if (!post) notFound();

  const t = await getTranslations("seo.blogPage");
  const related = getRelatedPosts(locale, slug);

  return (
    <>
      <JsonLd
        data={[
          blogPostingJsonLd(locale, {
            title: post.title,
            description: post.description,
            slug: post.slug,
            date: post.date,
            category: post.categoryLabel,
          }),
          breadcrumbJsonLd(locale, [
            { name: "Home", path: "" },
            { name: "Blog", path: "/blog" },
            { name: post.title, path: `/blog/${post.slug}` },
          ]),
        ]}
      />
      <FloatingNavbar />
      <main className="section-padding pt-28">
        <article className="mx-auto max-w-3xl px-6 md:px-12">
          <Link href="/blog" className="text-sm text-primary hover:underline">
            ← {t("back")}
          </Link>
          <p className="mt-8 text-xs uppercase tracking-widest text-accent">
            {post.categoryLabel}
          </p>
          <h1 className="mt-4 font-display text-4xl font-light leading-tight text-foreground md:text-5xl">
            {post.title}
          </h1>
          <p className="mt-4 text-muted">{post.description}</p>
          <div className="mt-4 flex gap-4 text-xs text-muted">
            <time dateTime={post.date}>{post.date}</time>
            <span>{post.readingTime}</span>
          </div>
          <div className="mt-12">
            <MarkdownContent content={post.content} />
          </div>
        </article>

        {related.length > 0 && (
          <aside className="mx-auto mt-24 max-w-7xl px-6 md:px-12">
            <h2 className="font-display text-2xl text-foreground">{t("related")}</h2>
            <div className="mt-8 grid gap-8 md:grid-cols-3">
              {related.map((p) => (
                <PostCard key={p.slug} post={p} readMore={t("readMore")} />
              ))}
            </div>
          </aside>
        )}
      </main>
      <Footer />
    </>
  );
}
