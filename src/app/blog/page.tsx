import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { ArticleCard } from "@/components/blog/ArticleCard";
import { Pagination } from "@/components/blog/Pagination";
import { getArticles, isMicroCmsConfigured } from "@/lib/microcms";

export const metadata: Metadata = {
  title: "記事・お知らせ",
  description: "TODO: ブログ一覧のメタディスクリプション",
};

export const revalidate = 60;

const PER_PAGE = 12;

type SearchParams = { page?: string };

function parsePage(value: string | undefined): number {
  const n = Number(value);
  if (!Number.isFinite(n) || n < 1) return 1;
  return Math.floor(n);
}

export default async function BlogPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const page = parsePage(searchParams.page);
  const offset = (page - 1) * PER_PAGE;

  const { contents, totalCount } = await getArticles({
    limit: PER_PAGE,
    offset,
  });

  const totalPages = Math.max(1, Math.ceil(totalCount / PER_PAGE));

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
              <p className="text-sm text-ink-muted">
                全 {totalCount} 件 / {page} ページ目
              </p>
              <div className="mt-8 grid gap-10 md:grid-cols-2 lg:grid-cols-3">
                {contents.map((article, i) => (
                  <ArticleCard
                    key={article.id}
                    article={article}
                    priority={page === 1 && i < 3}
                  />
                ))}
              </div>
              <Pagination
                currentPage={page}
                totalPages={totalPages}
                basePath="/blog"
              />
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
