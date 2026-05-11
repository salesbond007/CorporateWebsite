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
import { localePath } from "@/i18n/path";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionary";

type Params = { slug: string; locale: string };
type SearchParams = { page?: string };

const PER_PAGE = 12;

// Categories are user-managed at runtime; render dynamically rather than
// statically pre-generating, so newly added categories work without rebuilds.
export const revalidate = 60;
export const dynamicParams = true;

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  try {
    const category = await getCategoryBySlug(params.slug);
    if (!category) return {};
    return {
      title: `${category.name} の記事`,
      description: `${category.name} カテゴリの記事一覧。`,
    };
  } catch {
    return {};
  }
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
  if (!isLocale(params.locale)) notFound();
  const locale = params.locale;
  const dict = getDictionary(locale);

  if (!isMicroCmsConfigured()) notFound();

  let category;
  let categories;
  try {
    category = await getCategoryBySlug(params.slug);
    categories = await getCategories();
  } catch (error) {
    console.error("[CategoryPage] failed to load category:", error);
    notFound();
  }

  if (!category) notFound();

  const page = parsePage(searchParams.page);
  const offset = (page - 1) * PER_PAGE;

  let articles;
  try {
    articles = await getArticles({
      limit: PER_PAGE,
      offset,
      filters: `category[equals]${category.id}`,
    });
  } catch (error) {
    console.error("[CategoryPage] failed to load articles:", error);
    articles = { contents: [], totalCount: 0, offset: 0, limit: PER_PAGE };
  }

  const totalPages = Math.max(1, Math.ceil(articles.totalCount / PER_PAGE));

  return (
    <>
      <PageHero
        eyebrow={`Category / ${category.name}`}
        title={`${category.name} の記事`}
      />

      <section className="py-20 md:py-28">
        <Container>
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <CategoryNav
              categories={categories ?? []}
              currentSlug={category.slug}
              locale={locale}
              dict={dict}
            />
            <SearchBox
              locale={locale}
              dict={dict}
              className="md:max-w-md w-full"
              size="sm"
            />
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
                    locale={locale}
                    priority={page === 1 && i < 3}
                  />
                ))}
              </div>
              <Pagination
                currentPage={page}
                totalPages={totalPages}
                basePath={localePath(`/blog/category/${category.slug}`, locale)}
              />
            </>
          )}
        </Container>
      </section>
    </>
  );
}
