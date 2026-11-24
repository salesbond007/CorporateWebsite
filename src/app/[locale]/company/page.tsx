import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { companyRows } from "@/components/company/CompanySection";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbJsonLd } from "@/lib/jsonld";
import { site } from "@/lib/site";
import { localePath } from "@/i18n/path";
import { isLocale } from "@/i18n/config";
import { pageMeta, pageMetadata } from "@/lib/seo";
import {
  IllAccess,
  IllCompany,
  IllProfile,
} from "@/components/illustrations/LineIllustrations";

export function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Metadata {
  if (!isLocale(params.locale)) return {};
  return pageMetadata({
    ...pageMeta.company,
    path: "/company",
    locale: params.locale,
  });
}

const MAP_QUERY = `${site.address.addressJa}`;
const mapEmbed = `https://www.google.com/maps?q=${encodeURIComponent(MAP_QUERY)}&hl=ja&z=17&output=embed`;
const mapLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(MAP_QUERY)}`;

/** 対面での打ち合わせ場所 */
const meetingPlaces = [
  {
    name: "Tokyo Innovation Base",
    postalCode: "100-0005",
    address: "東京都千代田区丸の内3丁目8-3",
    query: "Tokyo Innovation Base 東京都千代田区丸の内3丁目8-3",
    url: "https://tib.metro.tokyo.lg.jp/",
  },
  {
    name: "渋谷駅周辺",
    postalCode: "150-0043",
    address: "東京都渋谷区道玄坂1丁目10 2F-C",
    query: "東京都渋谷区道玄坂1丁目10",
    url: "",
  },
];

export default function CompanyPage({
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
          { name: "会社概要", url: localePath("/company", locale) },
        ])}
      />

      {/* ページ見出し */}
      <section className="bg-[#F7F3EE]">
        <Container className="grid items-center gap-8 py-12 md:grid-cols-[minmax(0,1fr)_auto] md:py-16">
          <div>
            <nav aria-label="パンくずリスト" className="text-xs text-ink/50">
              <Link href={localePath("/", locale)} className="hover:text-ink">
                ホーム
              </Link>
              <span className="mx-2">/</span>
              <span className="text-ink/80">会社概要</span>
            </nav>
            <p className="mt-10 text-xs font-bold tracking-[0.3em] text-brand-500">
              COMPANY
            </p>
            <h1 className="mt-3 text-[clamp(1.9rem,4.4vw,3rem)] font-black leading-[1.3] tracking-[0.04em] text-ink">
              会社概要
            </h1>
            <p className="mt-5 max-w-xl text-[15px] leading-[2] text-ink/75">
              守りの情報セキュリティと、攻めの経営顧問で、企業が安心して挑戦できる土台をつくる会社です。
            </p>
          </div>
          <div className="mx-auto grid h-56 w-56 place-items-center rounded-full bg-white md:h-72 md:w-72">
            <IllCompany className="h-44 w-44 md:h-56 md:w-56" />
          </div>
        </Container>
      </section>

      {/* 会社情報 */}
      <section className="bg-white py-16 md:py-24">
        <Container className="grid gap-10 lg:grid-cols-[17rem_minmax(0,1fr)] lg:gap-16">
          <Reveal variant="up">
            <div className="lg:sticky lg:top-28">
              <p className="text-xs font-bold tracking-[0.3em] text-brand-500">
                PROFILE
              </p>
              <h2 className="mt-2 text-2xl font-black text-ink md:text-[1.7rem]">
                会社情報
              </h2>
              <div className="mt-8 hidden h-48 w-48 place-items-center rounded-full bg-[#F1EEEA] lg:grid">
                <IllProfile className="h-32 w-32" />
              </div>
            </div>
          </Reveal>
          <Reveal variant="up">
            <dl className="border-t border-ink">
              {companyRows.map((row) => (
                <div
                  key={row.label}
                  className="grid gap-1.5 border-b border-ink/15 py-5 sm:grid-cols-[9rem_1fr] sm:gap-8 sm:py-6"
                >
                  <dt className="text-[13px] font-bold tracking-[0.1em] text-ink/55">
                    {row.label}
                  </dt>
                  <dd className="text-[15px] leading-relaxed tracking-[0.03em] text-ink">
                    {row.value}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </Container>
      </section>

      {/* アクセス(地図) */}
      <section id="access" className="scroll-mt-20 bg-[#F7F3EE] py-16 md:py-24">
        <Container className="grid gap-10 lg:grid-cols-[17rem_minmax(0,1fr)] lg:gap-16">
          <Reveal variant="up">
            <p className="text-xs font-bold tracking-[0.3em] text-brand-500">
              ACCESS
            </p>
            <h2 className="mt-2 text-2xl font-black text-ink md:text-[1.7rem]">
              アクセス
            </h2>
            <div className="mt-8 hidden h-48 w-48 place-items-center rounded-full bg-white lg:grid">
              <IllAccess className="h-32 w-32" />
            </div>
          </Reveal>
          <Reveal
            variant="up"
            className="grid bg-white md:grid-cols-[1.5fr_1fr]"
          >
            <div className="relative aspect-[4/3] w-full md:aspect-auto md:min-h-[340px]">
              <iframe
                src={mapEmbed}
                title="セールスボンド株式会社の所在地(Google マップ)"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0 h-full w-full border-0"
                allowFullScreen
              />
            </div>
            <div className="flex flex-col justify-center gap-5 p-7 md:p-9">
              <div>
                <p className="text-[13px] font-bold tracking-[0.1em] text-ink/55">
                  所在地
                </p>
                <p className="mt-2 text-[15px] font-bold leading-relaxed text-ink">
                  〒{site.address.postalCode}
                  <br />
                  {site.address.addressJa}
                </p>
              </div>
              <a
                href={mapLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-fit items-center gap-2 border-b border-ink pb-0.5 text-sm font-bold text-ink transition-colors hover:border-brand-500 hover:text-brand-500"
              >
                Google マップで開く
                <span aria-hidden="true">↗</span>
                <span className="sr-only">(新しいタブで開く)</span>
              </a>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* 対面での打ち合わせ場所 */}
      <section id="meeting" className="scroll-mt-20 bg-white py-16 md:py-24">
        <Container>
          <Reveal variant="up" className="text-center">
            <p className="text-xs font-bold tracking-[0.3em] text-brand-500">
              MEETING PLACE
            </p>
            <h2 className="mt-3 text-2xl font-black text-ink md:text-3xl">
              対面での打ち合わせ場所
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-ink-soft md:text-[15px]">
              対面でのお打ち合わせは、次の場所で承ります。
            </p>
          </Reveal>
          <div className="mx-auto mt-10 grid max-w-5xl gap-6 md:grid-cols-2">
            {meetingPlaces.map((m, i) => (
              <Reveal
                key={m.name}
                variant="up"
                delay={i * 120}
                className="h-full"
              >
                <article className="flex h-full flex-col overflow-hidden bg-[#F7F3EE]">
                  <div className="relative aspect-[4/3] w-full">
                    <iframe
                      src={`https://www.google.com/maps?q=${encodeURIComponent(m.query)}&hl=ja&z=17&output=embed`}
                      title={`${m.name}の地図(Google マップ)`}
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      className="absolute inset-0 h-full w-full border-0"
                      allowFullScreen
                    />
                  </div>
                  <div className="flex flex-1 flex-col gap-3 p-6 md:p-7">
                    <p className="text-xs font-bold tracking-[0.2em] text-brand-500">
                      {String(i + 1).padStart(2, "0")}
                    </p>
                    <h3 className="text-lg font-black text-ink">{m.name}</h3>
                    <p className="text-sm leading-relaxed text-ink-soft">
                      〒{m.postalCode}
                      <br />
                      {m.address}
                    </p>
                    <div className="mt-auto flex flex-wrap gap-6 pt-2">
                      <a
                        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(m.query)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 border-b border-ink pb-0.5 text-sm font-bold text-ink transition-colors hover:border-brand-500 hover:text-brand-500"
                      >
                        Google マップで開く
                        <span aria-hidden="true">↗</span>
                        <span className="sr-only">(新しいタブで開く)</span>
                      </a>
                      {m.url ? (
                        <a
                          href={m.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 border-b border-ink pb-0.5 text-sm font-bold text-ink transition-colors hover:border-brand-500 hover:text-brand-500"
                        >
                          施設のサイト
                          <span aria-hidden="true">↗</span>
                          <span className="sr-only">(新しいタブで開く)</span>
                        </a>
                      ) : null}
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
