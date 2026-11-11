import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { companyRows } from "@/components/company/CompanySection";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbJsonLd } from "@/lib/jsonld";
import { serviceCategories, site } from "@/lib/site";
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

/** 事業カードの表示(守り=濃色、攻め=白) */
const businesses = [
  { slug: "ai-security", role: "守り", en: "Defense", dark: true },
  {
    slug: "new-business-development",
    role: "攻め",
    en: "Offense",
    dark: false,
  },
];

export default function CompanyPage({
  params,
}: {
  params: { locale: string };
}) {
  if (!isLocale(params.locale)) notFound();
  const locale = params.locale;
  const services = serviceCategories.flatMap((c) => c.services);

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

      {/* メッセージ */}
      <section className="bg-white py-20 md:py-28">
        <Container className="grid items-center gap-12 lg:grid-cols-12">
          <Reveal variant="scale" className="lg:col-span-4">
            <div className="relative mx-auto aspect-square w-full max-w-[16rem] bg-cream">
              {[
                "left-0 top-0 border-l-2 border-t-2",
                "right-0 top-0 border-r-2 border-t-2",
                "bottom-0 left-0 border-b-2 border-l-2",
                "bottom-0 right-0 border-b-2 border-r-2",
              ].map((pos) => (
                <span
                  key={pos}
                  aria-hidden="true"
                  className={`absolute h-6 w-6 border-brand-500 ${pos}`}
                />
              ))}
              <div className="absolute inset-0 grid place-items-center">
                <Image
                  src="/logo-square.png"
                  alt="セールスボンド株式会社 ロゴ"
                  width={200}
                  height={200}
                  className="w-3/5 animate-float-y mix-blend-multiply"
                />
              </div>
            </div>
          </Reveal>
          <Reveal variant="up" className="lg:col-span-8">
            <p className="text-xs font-bold uppercase tracking-[0.35em] text-brand-500">
              Our Mission
            </p>
            <h2 className="mt-4 text-[clamp(1.5rem,3vw,2.25rem)] font-black leading-[1.5] text-ink [word-break:auto-phrase]">
              守りの「AI時代のセキュリティ構築」と、
              <br className="hidden md:block" />
              攻めの「事業グロースの経営顧問」を、
              <span className="text-brand-500">プロの力で。</span>
            </h2>
            <p className="mt-6 text-[15px] leading-[2.1] text-ink-soft md:text-base">
              守りが固まるから、迷わず攻められる。私たちは1社1社に本気で向き合い、企業が安心して挑戦できる土台をつくり続けます。
            </p>
          </Reveal>
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

      {/* 事業内容 */}
      <section className="bg-white py-20 md:py-28">
        <Container>
          <Reveal variant="up" className="text-center">
            <p className="text-xs font-bold uppercase tracking-[0.35em] text-brand-500">
              Business
            </p>
            <h2 className="mt-3 text-2xl font-black text-ink md:text-3xl">
              事業内容
            </h2>
          </Reveal>
          <div className="mx-auto mt-10 grid max-w-5xl gap-5 md:grid-cols-2">
            {businesses.map((b, i) => {
              const s = services.find((x) => x.slug === b.slug);
              if (!s) return null;
              return (
                <Reveal
                  key={b.slug}
                  variant="up"
                  delay={i * 120}
                  className="h-full"
                >
                  <article
                    className={cn(
                      "flex h-full flex-col p-7 md:p-9",
                      b.dark
                        ? "bg-brand-900 text-white"
                        : "border border-ink/10 bg-white text-ink",
                    )}
                  >
                    <p
                      className={cn(
                        "text-xs font-bold uppercase tracking-[0.3em]",
                        b.dark ? "text-brand-200" : "text-brand-500",
                      )}
                    >
                      {b.role} / {b.en}
                    </p>
                    <h3 className="mt-3 text-2xl font-black">{s.title}</h3>
                    <p
                      className={cn(
                        "mt-4 text-sm leading-[1.9]",
                        b.dark ? "text-white/75" : "text-ink-soft",
                      )}
                    >
                      {s.summary}
                    </p>
                    <ul
                      className="mt-6 space-y-2 border-t pt-5 text-sm font-bold"
                      style={{
                        borderColor: b.dark
                          ? "rgba(255,255,255,0.2)"
                          : undefined,
                      }}
                    >
                      {(s.children ?? [])
                        .filter((ch) => ch.href)
                        .map((ch) => (
                          <li key={ch.slug}>
                            <Link
                              href={localePath(ch.href!, locale)}
                              className={cn(
                                "group inline-flex items-center gap-2 transition-colors",
                                b.dark
                                  ? "hover:text-brand-200"
                                  : "hover:text-brand-500",
                              )}
                            >
                              {ch.title}
                              <span
                                aria-hidden="true"
                                className="transition-transform group-hover:translate-x-1"
                              >
                                →
                              </span>
                            </Link>
                          </li>
                        ))}
                    </ul>
                  </article>
                </Reveal>
              );
            })}
          </div>
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
              <div>
                <p className="text-xs font-bold tracking-[0.2em] text-brand-500">
                  CONTACT
                </p>
                <a
                  href={`mailto:${site.email}`}
                  className="mt-2 inline-block text-base font-bold text-ink hover:text-brand-600"
                >
                  {site.email}
                </a>
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
    </>
  );
}
