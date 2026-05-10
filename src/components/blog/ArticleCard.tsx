import Link from "next/link";
import Image from "next/image";
import type { Article } from "@/lib/microcms";

type Props = {
  article: Article;
  priority?: boolean;
};

export function ArticleCard({ article, priority }: Props) {
  const date = new Date(article.publishedAt).toLocaleDateString("ja-JP", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  return (
    <article className="group">
      <Link href={`/blog/${article.slug}`} className="block">
        <div className="relative aspect-[16/10] overflow-hidden rounded-xl2 bg-cream">
          {article.thumbnail ? (
            <Image
              src={article.thumbnail.url}
              alt=""
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              priority={priority}
            />
          ) : (
            <div className="absolute inset-0 grid place-items-center text-ink-muted text-sm">
              No image
            </div>
          )}
          {article.category ? (
            <span className="absolute left-3 top-3 rounded-full bg-white/95 px-3 py-1 text-xs font-semibold text-ink">
              {article.category.name}
            </span>
          ) : null}
        </div>
        <div className="mt-5">
          <p className="text-xs text-ink-muted">
            <time dateTime={article.publishedAt}>{date}</time>
          </p>
          <h3 className="mt-2 text-lg font-bold text-ink leading-snug group-hover:text-brand-600">
            {article.title}
          </h3>
          {article.description ? (
            <p className="mt-2 text-sm text-ink-soft line-clamp-2 leading-relaxed">
              {article.description}
            </p>
          ) : null}
        </div>
      </Link>
    </article>
  );
}

export function ArticleCardSkeleton() {
  return (
    <div className="group" aria-hidden="true">
      <div className="aspect-[16/10] rounded-xl2 bg-cream" />
      <div className="mt-5 space-y-2">
        <div className="h-3 w-20 rounded bg-cream" />
        <div className="h-5 w-4/5 rounded bg-cream" />
        <div className="h-4 w-full rounded bg-cream" />
      </div>
    </div>
  );
}
