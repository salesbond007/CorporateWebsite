import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import {
  IllAdvisory,
  IllApokomi,
  IllSecuPro,
  IllWebSecurity,
} from "@/components/illustrations/LineIllustrations";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbJsonLd } from "@/lib/jsonld";
import { serviceCategories, site } from "@/lib/site";
import { cn } from "@/lib/cn";
import { localePath } from "@/i18n/path";
import { isLocale } from "@/i18n/config";
import { pageMeta, pageMetadata } from "@/lib/seo";

export function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Metadata {
  if (!isLocale(params.locale)) return {};
  return pageMetadata({
    ...pageMeta.services,
    path: "/services",
    locale: params.locale,
  });
}

/** 事業ごとの見せ方 */
const pillars: Record<
  string,
  { role: string; anchor: string; accent: string; lead: string }
> = {
  "ai-security": {
    role: "守り",
    anchor: "security",
    accent: "#E8B9C5",
    lead: "情報セキュリティのプロ人材とホームページの対策で、企業の情報と信頼を守ります。",
  },
  "new-business-development": {
    role: "攻め",
    anchor: "advisory",
    accent: "#B9CDEE",
    lead: "経営の伴走と新規開拓で、事業の成長を早めます。",
  },
};

/** サービスごとのイラスト */
const illustrations: Record<
  string,
  (p: { accent?: string; className?: string }) => JSX.Element
> = {
  ciso: IllSecuPro,
  "web-security": IllWebSecurity,
  advisory: IllAdvisory,
  apokomi: IllApokomi,
};

export default function ServicesPage({
  params,
}: {
  params: { locale: string };
}) {
  if (!isLocale(params.locale)) notFound();
  const locale = params.locale;
  const categories = serviceCategories.flatMap((c) => c.services);
  const allChildren = categories.flatMap((c) => c.children ?? []);

  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "ホーム", url: localePath("/", locale) },
            { name: "サービス一覧", url: localePath("/services", locale) },
          ]),
          {
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: "セールスボンド株式会社のサービス一覧",
            itemListElement: allChildren.map((c, i) => ({
              "@type": "ListItem",
              position: i + 1,
              item: {
                "@type": "Service",
                name: c.title,
                description: c.summary,
                url: `${site.url.replace(/\/$/, "")}${localePath(c.href ?? "/services", locale)}`,
                provider: { "@type": "Organization", name: site.legalName },
                areaServed: { "@type": "Country", name: "日本" },
              },
            })),
          },
        ]}
      />

      {/* ===== ページ見出し ===== */}
      <section className="bg-white">
        <Container className="pb-12 pt-10 md:pb-16 md:pt-16">
          <nav aria-label="パンくずリスト" className="text-xs text-ink/50">
            <Link href={localePath("/", locale)} className="hover:text-ink">
              ホーム
            </Link>
            <span className="mx-2">/</span>
            <span className="text-ink/80">サービス一覧</span>
          </nav>
          <p className="mt-10 text-xs font-bold tracking-[0.3em] text-brand-500">
            SERVICE
          </p>
          <h1 className="mt-3 text-[clamp(1.9rem,4.4vw,3rem)] font-black leading-[1.3] tracking-[0.02em] text-ink">
            サービス一覧
          </h1>
          <p className="mt-5 max-w-2xl text-[15px] leading-[2] text-ink/75 md:text-base">
            守りの情報セキュリティと、攻めの経営顧問。2つの事業で、企業が安心して挑戦できる土台をつくります。
          </p>
          <ul className="mt-8 flex flex-wrap gap-x-8 gap-y-3">
            {categories.map((s) => {
              const p = pillars[s.slug];
              if (!p) return null;
              return (
                <li key={s.slug}>
                  <a
                    href={`#${p.anchor}`}
                    className="group inline-flex items-center gap-2 border-b-2 border-ink pb-1 text-[15px] font-bold text-ink transition-colors hover:border-brand-500 hover:text-brand-500"
                  >
                    <span className="text-xs text-ink/45">{s.number}</span>
                    {s.title}
                    <span
                      aria-hidden="true"
                      className="transition-transform group-hover:translate-y-0.5"
                    >
                      ↓
                    </span>
                  </a>
                </li>
              );
            })}
          </ul>
        </Container>
      </section>

      {/* ===== 事業ごと ===== */}
      {categories.map((s, ci) => {
        const p = pillars[s.slug];
        if (!p) return null;
        return (
          <section
            key={s.slug}
            id={p.anchor}
            className={cn(
              "scroll-mt-20 py-16 md:py-24",
              ci % 2 === 0 ? "bg-[#F5F4F2]" : "bg-white",
            )}
          >
            <Container>
              <Reveal variant="up" className="text-center">
                <p className="text-sm font-bold tracking-[0.2em] text-ink/45">
                  {s.number}
                  <span className="mx-2">｜</span>
                  {p.role}
                </p>
                <h2 className="mt-3 text-[clamp(1.6rem,3vw,2.2rem)] font-black text-ink">
                  {s.title}
                </h2>
                <span
                  aria-hidden="true"
                  className="mx-auto mt-4 block h-[3px] w-10"
                  style={{ backgroundColor: ci === 0 ? "#7A1F3D" : "#2F5FB3" }}
                />
                <p className="mx-auto mt-5 max-w-2xl text-[15px] leading-[2] text-ink/75">
                  {p.lead}
                </p>
              </Reveal>

              <ul className="mx-auto mt-10 grid max-w-5xl gap-6 md:mt-14 md:grid-cols-2 md:gap-8">
                {(s.children ?? []).map((ch, i) => {
                  const Ill = illustrations[ch.slug];
                  return (
                    <Reveal
                      key={ch.slug}
                      variant="up"
                      delay={i * 120}
                      className="h-full"
                    >
                      <li className="h-full">
                        <Link
                          href={ch.href ? localePath(ch.href, locale) : "#"}
                          className={cn(
                            "group flex h-full flex-col items-center px-6 pb-9 pt-10 text-center transition duration-300 hover:-translate-y-1 md:px-10",
                            ci % 2 === 0 ? "bg-white" : "bg-[#F5F4F2]",
                          )}
                        >
                          <span className="grid h-48 w-48 place-items-center rounded-full bg-[#E9E7E5] transition-transform duration-500 group-hover:scale-[1.04] md:h-56 md:w-56">
                            {Ill ? (
                              <Ill
                                accent={p.accent}
                                className="h-36 w-36 md:h-40 md:w-40"
                              />
                            ) : null}
                          </span>
                          <p className="mt-7 text-xs font-bold tracking-[0.15em] text-ink/45">
                            {ch.number}
                            {ch.subtitle ? `　${ch.subtitle}` : ""}
                          </p>
                          <h3 className="mt-2 text-[1.35rem] font-black leading-snug text-ink transition-colors group-hover:text-brand-500">
                            {ch.title}
                          </h3>
                          <p className="mt-3 flex-1 text-sm leading-[1.95] text-ink/75 [word-break:auto-phrase]">
                            {ch.summary}
                          </p>
                          <span className="mt-6 inline-flex items-center gap-2 border-b border-ink pb-0.5 text-sm font-bold text-ink transition-colors group-hover:border-brand-500 group-hover:text-brand-500">
                            詳しく見る
                            <span
                              aria-hidden="true"
                              className="transition-transform group-hover:translate-x-1"
                            >
                              →
                            </span>
                          </span>
                        </Link>
                      </li>
                    </Reveal>
                  );
                })}
              </ul>
            </Container>
          </section>
        );
      })}

      {/* ===== お問い合わせ ===== */}
      <section className="bg-brand-500 py-14 text-white md:py-16">
        <Container className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div>
            <p className="text-xs font-bold tracking-[0.3em] text-white/70">
              CONTACT
            </p>
            <p className="mt-3 text-xl font-black md:text-2xl">
              どのサービスが合うか、まずはご相談ください。
            </p>
          </div>
          <Link
            href={localePath("/contact", locale)}
            className="group inline-flex h-14 items-center gap-3 bg-white px-8 text-sm font-bold text-brand-600 transition hover:bg-brand-50"
          >
            お問い合わせ
            <span
              aria-hidden="true"
              className="transition-transform group-hover:translate-x-1"
            >
              →
            </span>
          </Link>
        </Container>
      </section>
    </>
  );
}
