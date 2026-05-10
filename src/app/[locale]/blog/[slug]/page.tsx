import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { JsonLd } from "@/components/seo/JsonLd";
import { Toc } from "@/components/blog/Toc";
import { articleJsonLd, breadcrumbJsonLd } from "@/lib/jsonld";
import { buildToc } from "@/lib/toc";
import {
  getArticleBySlug,
  getArticleSlugs,
  getArticles,
} from "@/lib/microcms";
import { localePath } from "@/i18n/path";
import { isLocale, locales } from "@/i18n/config";

type Params = { slug: string; locale: string };

export const revalidate = 60;

export async function generateStaticParams() {
  const slugs = await getArticleSlugs();
  return locales.flatMap((locale) =>
    slugs.map((slug) => ({ locale, slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const article = await getArticleBySlug(params.slug);
  if (!article) return {};

  return {
    title: article.title,
    description: article.description ?? undefined,
    openGraph: {
      title: article.title,
      description: article.description ?? undefined,
      type: "article",
      publishedTime: article.publishedAt,
      modifiedTime: article.updatedAt,
      images: article.thumbnail ? [{ url: article.thumbnail.url }] : undefined,
    },
  };
}

export default async function ArticlePage({ params }: { params: Params }) {
  if (!isLocale(params.locale)) notFound();
  const locale = params.locale;
  const article = await getArticleBySlug(params.slug);
  if (!article) notFound();

  const { contents: related } = await getArticles({
    limit: 3,
    filters: `slug[not_equals]${article.slug}`,
  });

  const { html: bodyHtml, toc } = buildToc(article.body);

  const date = new Date(article.publishedAt).toLocaleDateString(
    locale === "en" ? "en-US" : "ja-JP",
    { year: "numeric", month: "2-digit", day: "2-digit" },
  );

  return (
    <>
      <JsonLd
        data={[
          articleJsonLd(article),
          breadcrumbJsonLd([
            { name: "ホーム", url: localePath("/", locale) },
            { name: "記事一覧", url: localePath("/blog", locale) },
            {
              name: article.title,
              url: localePath(`/blog/${article.slug}`, locale),
            },
          ]),
        ]}
      />
      <article>
        <header className="border-b border-ink-line bg-cream">
          <Container className="py-16 md:py-24">
            <p className="text-xs text-ink-muted">
              <Link
                href={localePath("/blog", locale)}
                className="hover:text-ink"
              >
                記事一覧
              </Link>
              <span className="mx-2">/</span>
              <time dateTime={article.publishedAt}>{date}</time>
              {article.category ? (
                <>
                  <span className="mx-2">/</span>
                  <span>{article.category.name}</span>
                </>
              ) : null}
            </p>
            <h1 className="mt-5 text-display-2 max-w-3xl">{article.title}</h1>
            {article.description ? (
              <p className="mt-6 max-w-2xl text-base md:text-lg text-ink-soft leading-relaxed">
                {article.description}
              </p>
            ) : null}
          </Container>
        </header>

        {article.thumbnail ? (
          <Container className="-mt-10 md:-mt-16">
            <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl2 bg-cream shadow-card">
              <Image
                src={article.thumbnail.url}
                alt=""
                fill
                priority
                sizes="(max-width: 1200px) 100vw, 1200px"
                className="object-cover"
              />
            </div>
          </Container>
        ) : null}

        <Container className="py-16 md:py-24">
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <div
                className="prose-article"
                dangerouslySetInnerHTML={{ __html: bodyHtml }}
              />
              {article.tags && article.tags.length > 0 ? (
                <div className="mt-12 flex flex-wrap gap-2">
                  {article.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-cream px-3 py-1 text-xs font-semibold text-ink-soft"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              ) : null}
            </div>

            {toc.length > 0 ? (
              <aside className="lg:col-span-4 lg:pl-8">
                <div className="lg:sticky lg:top-28">
                  <Toc items={toc} />
                </div>
              </aside>
            ) : null}
          </div>
        </Container>
      </article>

      {related.length > 0 ? (
        <section className="border-t border-ink-line bg-cream py-20 md:py-28">
          <Container>
            <h2 className="text-h2">関連記事</h2>
            <div className="mt-10 grid gap-8 md:grid-cols-3">
              {related.map((a) => (
                <ArticleSummary key={a.id} article={a} locale={locale} />
              ))}
            </div>
          </Container>
        </section>
      ) : null}
    </>
  );
}

function ArticleSummary({
  article,
  locale,
}: {
  article: Awaited<ReturnType<typeof getArticleBySlug>>;
  locale: import("@/i18n/config").Locale;
}) {
  if (!article) return null;
  return (
    <Link
      href={localePath(`/blog/${article.slug}`, locale)}
      className="group block"
    >
      <div className="relative aspect-[16/10] overflow-hidden rounded-xl2 bg-white">
        {article.thumbnail ? (
          <Image
            src={article.thumbnail.url}
            alt=""
            fill
            sizes="(max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : null}
      </div>
      <h3 className="mt-4 text-base font-bold leading-snug group-hover:text-brand-600">
        {article.title}
      </h3>
    </Link>
  );
}
