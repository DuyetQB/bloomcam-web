import { setRequestLocale, getTranslations } from "next-intl/server";
import { FloatingNavbar } from "@/components/layout/floating-navbar";
import { Footer } from "@/components/layout/footer";
import { PostCard } from "@/components/blog/post-card";
import { JsonLd } from "@/components/seo/json-ld";
import { getAllPosts } from "@/lib/blog";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { breadcrumbJsonLd, websiteJsonLd } from "@/lib/seo/structured-data";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  return buildPageMetadata({ locale, page: "blog", path: "/blog" });
}

export default async function BlogPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("seo.blogPage");
  const posts = getAllPosts(locale);

  return (
    <>
      <JsonLd
        data={[
          websiteJsonLd(locale),
          breadcrumbJsonLd(locale, [
            { name: "Home", path: "" },
            { name: "Blog", path: "/blog" },
          ]),
        ]}
      />
      <FloatingNavbar />
      <main className="section-padding pt-28">
        <div className="mx-auto max-w-7xl px-6 md:px-12">
          <p className="text-xs font-medium uppercase tracking-[0.25em] text-primary">
            {t("eyebrow")}
          </p>
          <h1 className="mt-4 max-w-3xl font-display text-5xl font-light text-foreground md:text-6xl">
            {t("title")}
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted">{t("subtitle")}</p>

          <div className="mt-16 grid gap-8 md:grid-cols-2">
            {posts.map((post) => (
              <PostCard key={post.slug} post={post} readMore={t("readMore")} />
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
