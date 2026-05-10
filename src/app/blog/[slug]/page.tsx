import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { JsonLd } from "@/components/seo/JsonLd";
import { articleJsonLd, breadcrumbJsonLd } from "@/lib/jsonld";
import {
  getArticleBySlug,
  getArticleSlugs,
  getArticles,
} from "@/lib/microcms";

type Params = { slug: string };

export const revalidate = 60;

export async function generateStaticParams(): Promise<Params[]> {
  const slugs = await getArticleSlugs();
  return slugs.map((slug) => ({ slug }));
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
  const article = await getArticleBySlug(params.slug);
  if (!article) notFound();

  const { contents: related } = await getArticles({
    limit: 3,
    filters: `slug[not_equals]${article.slug}`,
  });

  const date = new Date(article.publishedAt).toLocaleDateString("ja-JP", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  return (
    <>
      <JsonLd
        data={[
          articleJsonLd(article),
          breadcrumbJsonLd([
            { name: "ホーム", url: "/" },
            { name: "記事一覧", url: "/blog" },
            { name: article.title, url: `/blog/${article.slug}` },
          ]),
        ]}
      />
      <article>
        <header className="border-b border-ink-line bg-cream">
          <Container className="py-16 md:py-24">
            <p className="text-xs text-ink-muted">
              <Link href="/blog" className="hover:text-ink">
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
          <div
            className="prose-article mx-auto"
            dangerouslySetInnerHTML={{ __html: article.body }}
          />
          {article.tags && article.tags.length > 0 ? (
            <div className="max-w-prose mx-auto mt-12 flex flex-wrap gap-2">
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
        </Container>
      </article>

      {related.length > 0 ? (
        <section className="border-t border-ink-line bg-cream py-20 md:py-28">
          <Container>
            <h2 className="text-h2">関連記事</h2>
            <div className="mt-10 grid gap-8 md:grid-cols-3">
              {related.map((a) => (
                <ArticleSummary key={a.id} article={a} />
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
}: {
  article: Awaited<ReturnType<typeof getArticleBySlug>>;
}) {
  if (!article) return null;
  return (
    <Link href={`/blog/${article.slug}`} className="group block">
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
