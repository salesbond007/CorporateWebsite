import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { ArticleCard } from "@/components/blog/ArticleCard";
import { Pagination } from "@/components/blog/Pagination";
import { SearchBox } from "@/components/blog/SearchBox";
import { isMicroCmsConfigured, searchArticles } from "@/lib/microcms";

type SearchParams = { q?: string; page?: string };

const PER_PAGE = 12;

export const metadata: Metadata = {
  title: "記事検索",
  description: "TODO: 検索ページのメタディスクリプション",
  robots: { index: false, follow: true },
};

function parsePage(value: string | undefined): number {
  const n = Number(value);
  if (!Number.isFinite(n) || n < 1) return 1;
  return Math.floor(n);
}

export default async function SearchPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const q = (searchParams.q ?? "").trim();
  const page = parsePage(searchParams.page);
  const offset = (page - 1) * PER_PAGE;

  const result = q
    ? await searchArticles(q, { limit: PER_PAGE, offset })
    : { contents: [], totalCount: 0, offset: 0, limit: 0 };

  const totalPages = Math.max(1, Math.ceil(result.totalCount / PER_PAGE));

  return (
    <>
      <PageHero
        eyebrow="Search"
        title="記事を検索"
        description="キーワードを入力すると、記事タイトル・本文を横断検索します。"
      />

      <section className="py-16 md:py-20">
        <Container>
          <div className="mx-auto max-w-2xl">
            <SearchBox defaultValue={q} />
          </div>

          {!isMicroCmsConfigured() ? (
            <p className="mt-12 text-center text-sm text-ink-muted">
              CMS未接続のため検索できません。
            </p>
          ) : !q ? (
            <p className="mt-12 text-center text-sm text-ink-muted">
              キーワードを入力してください。
            </p>
          ) : result.contents.length === 0 ? (
            <div className="mt-16 rounded-xl2 border border-dashed border-ink-line p-12 text-center">
              <h2 className="text-h2">「{q}」 に一致する記事は見つかりませんでした</h2>
              <p className="mx-auto mt-4 max-w-md text-sm text-ink-soft leading-relaxed">
                別のキーワードで検索してみてください。
              </p>
            </div>
          ) : (
            <>
              <p className="mt-10 text-sm text-ink-muted">
                「{q}」 の検索結果: 全 {result.totalCount} 件 / {page} ページ目
              </p>
              <div className="mt-6 grid gap-10 md:grid-cols-2 lg:grid-cols-3">
                {result.contents.map((article, i) => (
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
                basePath={`/blog/search?q=${encodeURIComponent(q)}`}
              />
            </>
          )}
        </Container>
      </section>
    </>
  );
}
