import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbJsonLd } from "@/lib/jsonld";
import { news } from "@/lib/news";
import { localePath } from "@/i18n/path";
import { isLocale } from "@/i18n/config";

export const metadata: Metadata = {
  title: "お知らせ",
  description: "セールスボンド株式会社からのお知らせ一覧。",
};

export default function NewsPage({
  params,
}: {
  params: { locale: string };
}) {
  if (!isLocale(params.locale)) notFound();
  const locale = params.locale;

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "ホーム", url: localePath("/", locale) },
          { name: "お知らせ", url: localePath("/news", locale) },
        ])}
      />

      <section className="relative overflow-hidden border-b-2 border-ink-line bg-white">
        <div className="absolute inset-0 dot-bg opacity-60" aria-hidden="true" />
        <Container className="relative py-20 md:py-28">
          <p className="section-label !text-brand-500">News</p>
          <h1 className="mt-3 text-display-2 text-ink font-black">
            お知らせ
          </h1>
        </Container>
      </section>

      <section className="bg-white py-24 md:py-32">
        <Container>
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {news.map((item, i) => {
              const cardContent = (
                <>
                  {item.date ? (
                    <p className="text-xs font-bold tracking-[0.1em] text-brand-600 transition-colors group-hover:text-brand-100">
                      {item.date}
                    </p>
                  ) : null}
                  <h2 className="mt-3 text-lg font-black leading-snug text-ink transition-colors group-hover:text-white md:text-xl">
                    {item.title}
                  </h2>
                </>
              );
              const className =
                "group block h-full rounded-none border border-ink-line bg-white p-8 transition-all duration-300 hover:border-brand-500 hover:bg-brand-500 hover:shadow-card";
              return (
                <li key={`${item.title}-${i}`}>
                  {item.href ? (
                    <Link href={localePath(item.href, locale)} className={className}>
                      {cardContent}
                    </Link>
                  ) : (
                    <div className={className}>{cardContent}</div>
                  )}
                </li>
              );
            })}
          </ul>
        </Container>
      </section>
    </>
  );
}
