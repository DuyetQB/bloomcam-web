import { Link } from "@/i18n/navigation";
import type { BlogPost } from "@/lib/blog";

export function PostCard({
  post,
  readMore,
}: {
  post: BlogPost;
  readMore: string;
}) {
  return (
    <article className="glass flex h-full flex-col rounded-2xl p-6 transition-shadow hover:shadow-[0_0_40px_-12px_var(--glow-primary)]">
      <p className="text-xs uppercase tracking-widest text-primary">{post.categoryLabel}</p>
      <h2 className="mt-3 font-display text-2xl text-foreground">
        <Link href={`/blog/${post.slug}`} className="hover:text-primary">
          {post.title}
        </Link>
      </h2>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">{post.description}</p>
      <div className="mt-6 flex items-center justify-between text-xs text-muted">
        <time dateTime={post.date}>{post.date}</time>
        <span>{post.readingTime}</span>
      </div>
      <Link
        href={`/blog/${post.slug}`}
        className="mt-4 text-sm font-medium text-primary hover:underline"
      >
        {readMore} →
      </Link>
    </article>
  );
}
