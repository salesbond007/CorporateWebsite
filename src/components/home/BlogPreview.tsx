import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
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
    <section className="py-24 md:py-32 bg-cream">
      <Container>
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            eyebrow="Insights"
            title="記事・お知らせ"
            description="TODO: ブログ・お知らせのリード文をここに。"
          />
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
          <p className="mt-10 text-sm text-ink-muted">
            {dict.blog.noArticles}
          </p>
        ) : null}
      </Container>
    </section>
  );
}
