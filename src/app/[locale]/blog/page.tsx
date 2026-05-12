import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { ArticleCard } from "@/components/blog/ArticleCard";
import { Pagination } from "@/components/blog/Pagination";
import { CategoryNav } from "@/components/blog/CategoryNav";
import { SearchBox } from "@/components/blog/SearchBox";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbJsonLd } from "@/lib/jsonld";
import {
  getArticles,
  getCategories,
  isMicroCmsConfigured,
} from "@/lib/microcms";
import { localePath } from "@/i18n/path";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionary";

export const metadata: Metadata = {
  title: "メディア",
  description:
    "セールスボンドが発信するメディア。営業・マーケティング・組織開発・人材活用に関する記事・お知らせをお届けします。",
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
  params,
  searchParams,
}: {
  params: { locale: string };
  searchParams: SearchParams;
}) {
  if (!isLocale(params.locale)) notFound();
  const locale = params.locale;
  const dict = getDictionary(locale);

  const page = parsePage(searchParams.page);
  const offset = (page - 1) * PER_PAGE;

  const [articles, categories] = await Promise.all([
    getArticles({ limit: PER_PAGE, offset }),
    getCategories(),
  ]);

  const { contents, totalCount } = articles;
  const totalPages = Math.max(1, Math.ceil(totalCount / PER_PAGE));

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "ホーム", url: localePath("/", locale) },
          { name: "メディア", url: localePath("/blog", locale) },
        ])}
      />
      <PageHero
        eyebrow="Insights"
        title="メディア"
      />

      <section className="py-20 md:py-28">
        <Container>
          {!isMicroCmsConfigured() ? (
            <EmptyState
              title={dict.blog.cmsNotConnected}
              description="microCMSの環境変数（MICROCMS_SERVICE_DOMAIN / MICROCMS_API_KEY）を設定すると、記事一覧がここに表示されます。"
            />
          ) : (
            <>
              <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                <CategoryNav
                  categories={categories}
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

              {contents.length === 0 ? (
                <div className="mt-10">
                  <EmptyState
                    title={dict.blog.noArticles}
                    description="microCMS管理画面から記事を投稿してください。"
                  />
                </div>
              ) : (
                <>
                  <p className="mt-8 text-sm text-ink-muted">
                    全 {totalCount} 件 / {page} ページ目
                  </p>
                  <div className="mt-6 grid gap-10 md:grid-cols-2 lg:grid-cols-3">
                    {contents.map((article, i) => (
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
                    basePath={localePath("/blog", locale)}
                  />
                </>
              )}
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
