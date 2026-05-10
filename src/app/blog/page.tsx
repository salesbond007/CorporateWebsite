import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { ArticleCard } from "@/components/blog/ArticleCard";
import { getArticles, isMicroCmsConfigured } from "@/lib/microcms";

export const metadata: Metadata = {
  title: "記事・お知らせ",
  description: "TODO: ブログ一覧のメタディスクリプション",
};

export const revalidate = 60;

export default async function BlogPage() {
  const { contents, totalCount } = await getArticles({ limit: 24 });

  return (
    <>
      <PageHero
        eyebrow="Insights"
        title="記事・お知らせ"
        description="TODO: ブログ・お知らせ一覧のリード文。SEO目的のキーワードを盛り込む。"
      />

      <section className="py-20 md:py-28">
        <Container>
          {!isMicroCmsConfigured() ? (
            <EmptyState
              title="CMS未接続です"
              description="microCMSの環境変数（MICROCMS_SERVICE_DOMAIN / MICROCMS_API_KEY）を設定すると、記事一覧がここに表示されます。"
            />
          ) : contents.length === 0 ? (
            <EmptyState
              title="まだ記事がありません"
              description="microCMS管理画面から記事を投稿してください。"
            />
          ) : (
            <>
              <p className="text-sm text-ink-muted">全 {totalCount} 件</p>
              <div className="mt-8 grid gap-10 md:grid-cols-2 lg:grid-cols-3">
                {contents.map((article, i) => (
                  <ArticleCard
                    key={article.id}
                    article={article}
                    priority={i < 3}
                  />
                ))}
              </div>
            </>
          )}
        </Container>
      </section>
    </>
  );
}

function EmptyState({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-xl2 border border-dashed border-ink-line p-12 text-center">
      <h2 className="text-h2">{title}</h2>
      <p className="mx-auto mt-4 max-w-md text-sm text-ink-soft leading-relaxed">
        {description}
      </p>
    </div>
  );
}
