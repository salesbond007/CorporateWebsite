import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { ArticleCard, ArticleCardSkeleton } from "@/components/blog/ArticleCard";
import { Reveal } from "@/components/ui/Reveal";
import { getArticles } from "@/lib/microcms";
import { localePath } from "@/i18n/path";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionary";

type Props = {
  locale: Locale;
  dict: Dictionary;
};

export async function BlogPreview({ locale, dict }: Props) {
  const { contents } = await getArticles({ limit: 3 });

  return (
    <section className="py-28 md:py-36 bg-white">
      <Container>
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="section-label">Insights</p>
            <p className="mt-3 text-lg md:text-xl font-extrabold text-ink">
              記事・お知らせ
            </p>
            <p className="mt-4 max-w-xl text-ink font-medium leading-relaxed">
              営業・人材活用に関する考察や、最新のお知らせをお届けします。
            </p>
          </div>
          <Link
            href={localePath("/blog", locale)}
            className="link-arrow shrink-0"
          >
            {dict.nav.blog}
          </Link>
        </div>

        <div className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {contents.length > 0
            ? contents.map((article, i) => (
                <Reveal key={article.id} delay={i * 100}>
                  <ArticleCard
                    article={article}
                    locale={locale}
                    priority={i === 0}
                  />
                </Reveal>
              ))
            : Array.from({ length: 3 }).map((_, i) => (
                <ArticleCardSkeleton key={i} />
              ))}
        </div>

        {contents.length === 0 ? (
          <p className="mt-10 text-sm font-medium text-ink-muted">
            {dict.blog.noArticles}
          </p>
        ) : null}
      </Container>
    </section>
  );
}
