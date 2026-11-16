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
import { cn } from "@/lib/cn";

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
      <section className="relative isolate overflow-hidden bg-brand-900 text-white">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 opacity-[0.08] [background-image:linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] [background-size:72px_72px]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-24 -top-24 -z-10 h-96 w-96 animate-blob rounded-full bg-brand-500/50 blur-[110px]"
        />
        <Container className="py-16 md:py-24">
          <nav aria-label="パンくずリスト" className="text-xs text-white/60">
            <Link href={localePath("/", locale)} className="hover:text-white">
              ホーム
            </Link>
            <span className="mx-2">/</span>
            <span className="text-white/90">会社概要</span>
          </nav>
          <p
            aria-hidden="true"
            className="mt-8 animate-fade-up font-display text-[clamp(3rem,10vw,7rem)] font-black leading-none tracking-tight text-white/95"
          >
            Company
          </p>
          <h1
            className="mt-4 animate-fade-up text-xl font-bold tracking-[0.2em] text-brand-200 md:text-2xl"
            style={{ animationDelay: "0.15s" }}
          >
            会社概要
          </h1>
        </Container>
      </section>

      {/* 会社情報 */}
      <section className="bg-cream py-20 md:py-28">
        <Container>
          <Reveal variant="up" className="text-center">
            <p className="text-xs font-bold uppercase tracking-[0.35em] text-brand-500">
              Profile
            </p>
            <h2 className="mt-3 text-2xl font-black text-ink md:text-3xl">
              会社情報
            </h2>
          </Reveal>
          <Reveal
            variant="up"
            className="mx-auto mt-10 max-w-4xl overflow-hidden bg-white shadow-[0_30px_60px_-40px_rgba(29,5,11,0.35)]"
          >
            <dl>
              {companyRows.map((row, i) => (
                <div
                  key={row.label}
                  className={cn(
                    "grid gap-1 px-6 py-4 sm:grid-cols-[11rem_1fr] sm:gap-8 sm:px-10 sm:py-5",
                    i !== 0 && "border-t border-ink-line",
                  )}
                >
                  <dt className="flex items-center gap-2 text-sm font-bold tracking-[0.05em] text-ink">
                    <span
                      aria-hidden="true"
                      className="h-3 w-[3px] bg-brand-500"
                    />
                    {row.label}
                  </dt>
                  <dd className="text-sm leading-relaxed tracking-[0.03em] text-ink-soft md:text-[15px]">
                    {row.value}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </Container>
      </section>

      {/* アクセス(地図) */}
      <section id="access" className="scroll-mt-20 bg-cream py-20 md:py-28">
        <Container>
          <Reveal variant="up" className="text-center">
            <p className="text-xs font-bold uppercase tracking-[0.35em] text-brand-500">
              Access
            </p>
            <h2 className="mt-3 text-2xl font-black text-ink md:text-3xl">
              アクセス
            </h2>
          </Reveal>
          <Reveal
            variant="up"
            className="mx-auto mt-10 grid max-w-5xl overflow-hidden bg-white shadow-[0_30px_60px_-40px_rgba(29,5,11,0.35)] lg:grid-cols-[1.6fr_1fr]"
          >
            <div className="relative aspect-[4/3] w-full lg:aspect-auto lg:min-h-[380px]">
              <iframe
                src={mapEmbed}
                title="セールスボンド株式会社の所在地(Google マップ)"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0 h-full w-full border-0"
                allowFullScreen
              />
            </div>
            <div className="flex flex-col justify-center gap-5 p-7 md:p-10">
              <div>
                <p className="text-xs font-bold tracking-[0.2em] text-brand-500">
                  ADDRESS
                </p>
                <p className="mt-2 text-base font-bold leading-relaxed text-ink">
                  〒{site.address.postalCode}
                  <br />
                  {site.address.addressJa}
                </p>
              </div>
              <a
                href={mapLink}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex h-12 items-center justify-center gap-2 bg-brand-500 px-6 text-sm font-bold text-white transition hover:bg-brand-600"
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
      <section id="meeting" className="scroll-mt-20 bg-white py-20 md:py-28">
        <Container>
          <Reveal variant="up" className="text-center">
            <p className="text-xs font-bold uppercase tracking-[0.35em] text-brand-500">
              Meeting Place
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
                <article className="flex h-full flex-col overflow-hidden border border-ink/10 bg-white shadow-[0_30px_60px_-40px_rgba(29,5,11,0.35)]">
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
                    <div className="mt-auto flex flex-wrap gap-3 pt-2">
                      <a
                        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(m.query)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex h-11 items-center gap-2 bg-brand-500 px-5 text-sm font-bold text-white transition hover:bg-brand-600"
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
                          className="inline-flex h-11 items-center gap-2 border border-ink/20 px-5 text-sm font-bold text-ink transition hover:border-brand-500 hover:text-brand-600"
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
