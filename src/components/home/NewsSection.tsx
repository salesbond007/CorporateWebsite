import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { NewsCarousel } from "@/components/home/NewsCarousel";
import { Reveal } from "@/components/ui/Reveal";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { news } from "@/lib/news";
import { localePath } from "@/i18n/path";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionary";

type Props = {
  locale: Locale;
  dict: Dictionary;
};

/** microCMS連携後、特定タグの記事から最新10件を取得する想定 */
const latestNews = news.slice(0, 10);

export function NewsSection({ locale, dict }: Props) {
  return (
    <section
      id="news"
      className="relative scroll-mt-20 bg-white py-20 md:py-28"
    >
      <Container>
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionTitle en="News" ja="ニュース" />
          <Link
            href={localePath("/news", locale)}
            className="link-arrow hover-underline shrink-0"
          >
            {dict.nav.news}一覧
          </Link>
        </div>

        <Reveal variant="up" delay={200}>
          <NewsCarousel items={latestNews} locale={locale} />
        </Reveal>
      </Container>
    </section>
  );
}
