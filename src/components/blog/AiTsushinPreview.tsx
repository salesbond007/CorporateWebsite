import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { ArticleCard } from "@/components/blog/ArticleCard";
import { Reveal } from "@/components/ui/Reveal";
import { getArticlesByCategorySlug } from "@/lib/microcms";
import { localePath } from "@/i18n/path";
import type { Locale } from "@/i18n/config";

type Props = {
  locale: Locale;
  /** number of articles to show. defaults to 3 */
  limit?: number;
  /** category slug in microCMS. defaults to "ai-tsushin" */
  categorySlug?: string;
  /** section background tint. defaults to "white" */
  tone?: "white" | "cream";
};

/**
 * AI通信カテゴリの最新記事をプレビューするセクション。
 * 記事がない / microCMS未設定 の場合は何も描画しません。
 */
export async function AiTsushinPreview({
  locale,
  limit = 3,
  categorySlug = "ai-tsushin",
  tone = "white",
}: Props) {
  const { contents } = await getArticlesByCategorySlug(categorySlug, { limit });

  if (contents.length === 0) return null;

  const bg = tone === "cream" ? "bg-cream" : "bg-white";

  return (
    <section className={`${bg} py-24 md:py-32`}>
      <Container>
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-sky-700">
              AI Times
            </p>
            <p className="mt-3 text-2xl md:text-3xl font-black text-ink leading-tight">
              <span className="text-sky-600">AI</span>通信
            </p>
            <p className="mt-3 text-sm md:text-base text-ink-soft font-medium">
              AIと営業の最前線をお届けするメディア。
            </p>
          </div>
          <Link
            href={localePath("/ai-tsushin", locale)}
            className="link-arrow shrink-0"
          >
            すべての記事を見る
          </Link>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {contents.map((article, i) => (
            <Reveal key={article.id} delay={i * 100}>
              <ArticleCard article={article} locale={locale} />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
