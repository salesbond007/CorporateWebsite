import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { ArticleCard } from "@/components/blog/ArticleCard";
import { Pagination } from "@/components/blog/Pagination";
import { SearchBox } from "@/components/blog/SearchBox";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbJsonLd } from "@/lib/jsonld";
import {
  getArticlesByCategorySlug,
  isMicroCmsConfigured,
} from "@/lib/microcms";
import { localePath } from "@/i18n/path";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionary";

const CATEGORY_SLUG = "ai-tsushin";

export const metadata: Metadata = {
  title: "AI通信｜AI×営業の最前線をお届け",
  description:
    "AI通信はセールスボンドが運営する、AIと営業の最前線を伝えるメディア。AI営業ツール・営業DX・生成AI活用・自動化など、現場で使える知見を発信します。",
};

export const revalidate = 60;

const PER_PAGE = 12;

type SearchParams = { page?: string };

function parsePage(value: string | undefined): number {
  const n = Number(value);
  if (!Number.isFinite(n) || n < 1) return 1;
  return Math.floor(n);
}

export default async function AiTsushinPage({
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

  const articles = await getArticlesByCategorySlug(CATEGORY_SLUG, {
    limit: PER_PAGE,
    offset,
  });

  const { contents, totalCount } = articles;
  const totalPages = Math.max(1, Math.ceil(totalCount / PER_PAGE));

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "ホーム", url: localePath("/", locale) },
          { name: "AI通信", url: localePath("/ai-tsushin", locale) },
        ])}
      />

      {/* ───── Hero (tech-themed sky) ───── */}
      <section className="relative overflow-hidden border-b border-ink-line/40 bg-gradient-to-br from-sky-50 via-white to-cyan-50">
        <div
          aria-hidden="true"
          className="absolute -top-32 right-[-10%] h-[420px] w-[420px] rounded-full bg-sky-200/50 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="absolute -bottom-32 -left-32 h-[420px] w-[420px] rounded-full bg-cyan-100/60 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage:
              "radial-gradient(circle, #0EA5E9 1px, transparent 1px)",
            backgroundSize: "18px 18px",
          }}
        />

        <Container className="relative py-20 md:py-28">
          <div className="flex items-center gap-3">
            <span aria-hidden="true" className="block h-px w-10 bg-sky-700" />
            <p className="font-display text-[11px] font-extrabold uppercase tracking-[0.32em] text-sky-700">
              AI Times ／ N&deg; 01
            </p>
          </div>
          <h1 className="mt-6 font-display text-display-2 font-black leading-[1.05] tracking-tight text-ink">
            <span className="text-sky-600">AI</span>通信
          </h1>
          <p className="mt-4 max-w-2xl text-sm md:text-base leading-relaxed text-ink-soft font-medium">
            AIと営業の最前線を、わかりやすく届ける。営業DX・生成AI活用・自動化・現場で効く事例まで、セールスボンドが選び抜いた知見をお届けします。
          </p>
        </Container>
      </section>

      <section className="py-20 md:py-28">
        <Container>
          {!isMicroCmsConfigured() ? (
            <EmptyState
              title={dict.blog.cmsNotConnected}
              description="microCMSの環境変数（MICROCMS_SERVICE_DOMAIN / MICROCMS_API_KEY）を設定し、カテゴリ「ai-tsushin」を作成してください。"
            />
          ) : (
            <>
              <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-sky-700">
                    Articles
                  </p>
                  <p className="mt-2 text-lg font-extrabold text-ink">
                    AI通信の記事一覧
                  </p>
                </div>
                <SearchBox
                  locale={locale}
                  dict={dict}
                  className="md:max-w-md w-full"
                  size="sm"
                />
              </div>

              {contents.length === 0 ? (
                <div className="mt-12 rounded-xl2 border border-dashed border-ink-line p-12 text-center">
                  <p className="text-ink-soft">
                    記事はまだありません。microCMSでカテゴリ「ai-tsushin」を作成し、記事をそのカテゴリに紐付けてください。
                  </p>
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
                    basePath={localePath("/ai-tsushin", locale)}
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
