import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { NewsCarousel } from "@/components/home/NewsCarousel";
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
      className="relative scroll-mt-20 border-t border-ink-line bg-white py-16 md:py-24"
    >
      <Container>
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <p className="text-2xl md:text-3xl font-black text-ink">お知らせ</p>
          <Link
            href={localePath("/news", locale)}
            className="link-arrow shrink-0"
          >
            {dict.nav.news}
          </Link>
        </div>

        <NewsCarousel items={latestNews} locale={locale} />
      </Container>
    </section>
  );
}
