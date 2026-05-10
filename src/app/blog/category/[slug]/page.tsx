import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { ArticleCard } from "@/components/blog/ArticleCard";
import { Pagination } from "@/components/blog/Pagination";
import { CategoryNav } from "@/components/blog/CategoryNav";
import { SearchBox } from "@/components/blog/SearchBox";
import {
  getArticles,
  getCategories,
  getCategoryBySlug,
  isMicroCmsConfigured,
} from "@/lib/microcms";

type Params = { slug: string };
type SearchParams = { page?: string };

const PER_PAGE = 12;
export const revalidate = 60;

export async function generateStaticParams(): Promise<Params[]> {
  const categories = await getCategories();
  return categories.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const category = await getCategoryBySlug(params.slug);
  if (!category) return {};
  return {
    title: `${category.name} の記事`,
    description: `${category.name} カテゴリの記事一覧。`,
  };
}

function parsePage(value: string | undefined): number {
  const n = Number(value);
  if (!Number.isFinite(n) || n < 1) return 1;
  return Math.floor(n);
}

export default async function CategoryPage({
  params,
  searchParams,
}: {
  params: Params;
  searchParams: SearchParams;
}) {
  if (!isMicroCmsConfigured()) notFound();

  const category = await getCategoryBySlug(params.slug);
  if (!category) notFound();

  const page = parsePage(searchParams.page);
  const offset = (page - 1) * PER_PAGE;

  const [articles, categories] = await Promise.all([
    getArticles({
      limit: PER_PAGE,
      offset,
      filters: `category[equals]${category.id}`,
    }),
    getCategories(),
  ]);

  const totalPages = Math.max(1, Math.ceil(articles.totalCount / PER_PAGE));

  return (
    <>
      <PageHero
        eyebrow={`Category / ${category.name}`}
        title={`${category.name} の記事`}
        description="TODO: カテゴリページのリード文。SEOキーワードを盛り込む。"
      />

      <section className="py-20 md:py-28">
        <Container>
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <CategoryNav categories={categories} currentSlug={category.slug} />
            <SearchBox className="md:max-w-md w-full" size="sm" />
          </div>

          {articles.contents.length === 0 ? (
            <div className="mt-12 rounded-xl2 border border-dashed border-ink-line p-12 text-center">
              <p className="text-ink-soft">このカテゴリの記事はまだありません。</p>
            </div>
          ) : (
            <>
              <p className="mt-8 text-sm text-ink-muted">
                全 {articles.totalCount} 件 / {page} ページ目
              </p>
              <div className="mt-6 grid gap-10 md:grid-cols-2 lg:grid-cols-3">
                {articles.contents.map((article, i) => (
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
                basePath={`/blog/category/${category.slug}`}
              />
            </>
          )}
        </Container>
      </section>
    </>
  );
}
