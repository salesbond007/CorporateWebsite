import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { news, type NewsItem } from "@/lib/news";
import { localePath } from "@/i18n/path";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionary";

type Props = {
  locale: Locale;
  dict: Dictionary;
};

/** microCMS連携後、特定タグの記事から最新5件を取得する想定 */
const latestNews = news.slice(0, 5);

function NewsCard({ item, locale }: { item: NewsItem; locale: Locale }) {
  const cardContent = (
    <div className="flex h-full w-72 shrink-0 flex-col justify-between rounded-none border-2 border-ink bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_50px_-16px_rgba(29,5,11,0.45)] md:w-80">
      <div>
        {item.date ? (
          <p className="text-xs font-bold tracking-[0.1em] text-brand-600">
            {item.date}
          </p>
        ) : null}
        <h3 className="mt-3 line-clamp-3 text-base font-black leading-snug text-ink md:text-lg">
          {item.title}
        </h3>
      </div>
      <span className="mt-6 inline-flex items-center gap-1.5 text-xs font-bold text-brand-600">
        続きを読む
        <span aria-hidden="true">→</span>
      </span>
    </div>
  );

  return item.href ? (
    <Link href={localePath(item.href, locale)} className="block h-full">
      {cardContent}
    </Link>
  ) : (
    cardContent
  );
}

function NewsStrip({ locale, ariaHidden }: { locale: Locale; ariaHidden?: boolean }) {
  return (
    <div className="flex shrink-0 items-stretch gap-6 pr-6" aria-hidden={ariaHidden}>
      {latestNews.map((item, i) => (
        <NewsCard key={`${item.title}-${i}`} item={item} locale={locale} />
      ))}
    </div>
  );
}

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

        {/* PC/タブレット: ロゴと同じく横に自動スクロール */}
        <div
          className="relative mt-14 hidden overflow-hidden md:flex"
          style={{
            maskImage:
              "linear-gradient(to right, transparent, black 4%, black 96%, transparent)",
            WebkitMaskImage:
              "linear-gradient(to right, transparent, black 4%, black 96%, transparent)",
          }}
        >
          <div className="flex w-max animate-marquee">
            <NewsStrip locale={locale} />
            <NewsStrip locale={locale} ariaHidden />
          </div>
        </div>

        {/* スマホ: 横スクロール/スワイプ */}
        <div className="mt-10 -mx-6 overflow-x-auto px-6 md:hidden [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          <div className="flex w-max gap-5 pr-6">
            {latestNews.map((item, i) => (
              <NewsCard key={`${item.title}-m-${i}`} item={item} locale={locale} />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
