import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ArticleCard, ArticleCardSkeleton } from "@/components/blog/ArticleCard";
import { getArticles } from "@/lib/microcms";

export async function BlogPreview() {
  const { contents } = await getArticles({ limit: 3 });

  return (
    <section className="py-24 md:py-32 bg-cream">
      <Container>
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            eyebrow="Insights"
            title="記事・お知らせ"
            description="TODO: ブログ・お知らせのリード文をここに。"
          />
          <Link href="/blog" className="link-arrow shrink-0">
            記事一覧を見る
          </Link>
        </div>

        <div className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {contents.length > 0
            ? contents.map((article, i) => (
                <ArticleCard key={article.id} article={article} priority={i === 0} />
              ))
            : Array.from({ length: 3 }).map((_, i) => (
                <ArticleCardSkeleton key={i} />
              ))}
        </div>

        {contents.length === 0 ? (
          <p className="mt-10 text-sm text-ink-muted">
            記事はまだありません。microCMSの設定後に表示されます。
          </p>
        ) : null}
      </Container>
    </section>
  );
}
