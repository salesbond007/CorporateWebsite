import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import {
  BondServicePyramid,
  bondPyramidItems,
} from "@/components/services/BondServicePyramid";
import { AdvisoryGrowthDiagram } from "@/components/services/AdvisoryGrowthDiagram";
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

/** 事業ごとの見せ方(守り=ワインレッドの濃色、攻め=青) */
const pillars: Record<
  string,
  { role: string; en: string; anchor: string; tone: "wine" | "blue" }
> = {
  "ai-security": {
    role: "守り",
    en: "Defense",
    anchor: "security",
    tone: "wine",
  },
  "new-business-development": {
    role: "攻め",
    en: "Offense",
    anchor: "advisory",
    tone: "blue",
  },
};

const toneClass = {
  wine: {
    label: "text-brand-500",
    bar: "bg-brand-500",
    number: "text-brand-500",
    soft: "bg-brand-50",
    hover: "group-hover:text-brand-600",
    button: "bg-brand-500 group-hover:bg-brand-600",
  },
  blue: {
    label: "text-[#0046C8]",
    bar: "bg-[#0046C8]",
    number: "text-[#0046C8]",
    soft: "bg-[#EEF4FC]",
    hover: "group-hover:text-[#0046C8]",
    button: "bg-[#0046C8] group-hover:bg-[#0037B9]",
  },
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
      <section className="relative isolate overflow-hidden bg-white">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 [background-image:radial-gradient(#E6D9DD_1px,transparent_1px)] [background-size:22px_22px] [mask-image:linear-gradient(to_bottom,black,transparent_90%)]"
        />
        <Container className="pb-10 pt-10 md:pb-14 md:pt-16">
          <nav aria-label="パンくずリスト" className="text-xs text-ink/50">
            <Link href={localePath("/", locale)} className="hover:text-ink">
              ホーム
            </Link>
            <span className="mx-2">/</span>
            <span className="text-ink/80">サービス一覧</span>
          </nav>
          <div className="mt-8 grid items-end gap-8 lg:grid-cols-[minmax(0,1fr)_auto]">
            <div>
              <p className="flex animate-fade-up items-center gap-3 text-xs font-bold uppercase tracking-[0.3em] text-brand-500">
                <span aria-hidden="true" className="h-px w-8 bg-brand-500" />
                Services
              </p>
              <h1
                className="mt-4 animate-fade-up text-[clamp(2rem,5vw,3.4rem)] font-black leading-[1.25] tracking-[0.02em] text-ink"
                style={{ animationDelay: "0.1s" }}
              >
                サービス一覧
              </h1>
              <p
                className="mt-4 max-w-2xl animate-fade-up text-[15px] font-bold leading-[2] text-ink/70 md:text-base"
                style={{ animationDelay: "0.2s" }}
              >
                <span className="text-brand-500">守り</span>
                の情報セキュリティと、
                <span className="text-[#0046C8]">攻め</span>
                の経営顧問。2つの事業で、企業が安心して挑戦できる土台をつくります。
              </p>
            </div>
            {/* 事業へのジャンプ */}
            <div
              className="flex animate-fade-up flex-wrap gap-2"
              style={{ animationDelay: "0.3s" }}
            >
              {categories.map((s) => {
                const p = pillars[s.slug];
                if (!p) return null;
                const blue = p.tone === "blue";
                return (
                  <a
                    key={s.slug}
                    href={`#${p.anchor}`}
                    className={cn(
                      "group inline-flex items-center gap-2 rounded-full border bg-white px-4 py-2.5 text-sm font-black transition hover:-translate-y-0.5",
                      blue
                        ? "border-[#C9D8F2] text-[#0046C8] hover:bg-[#0046C8] hover:text-white"
                        : "border-[#EBD3DA] text-brand-500 hover:bg-brand-500 hover:text-white",
                    )}
                  >
                    <span className="text-[11px] tracking-[0.12em] opacity-70">
                      {s.number}
                    </span>
                    {s.title}
                    <span
                      aria-hidden="true"
                      className="transition-transform group-hover:translate-y-0.5"
                    >
                      ↓
                    </span>
                  </a>
                );
              })}
            </div>
          </div>
        </Container>

        {/* 流れるサービス名 */}
        <div
          className="overflow-hidden border-y border-ink/10 bg-white py-3"
          aria-hidden="true"
        >
          <div className="flex w-max animate-marquee gap-10 whitespace-nowrap text-sm font-black tracking-[0.1em] text-ink/35">
            {[0, 1].map((k) => (
              <span key={k} className="flex gap-10">
                {allChildren.map((c) => (
                  <span
                    key={`${k}-${c.slug}`}
                    className="flex items-center gap-10"
                  >
                    {c.title}
                    <span className="h-1.5 w-1.5 rounded-full bg-brand-500/50" />
                  </span>
                ))}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 事業ごと ===== */}
      {categories.map((s, ci) => {
        const p = pillars[s.slug];
        if (!p) return null;
        const t = toneClass[p.tone];
        const blue = p.tone === "blue";
        return (
          <section
            key={s.slug}
            id={p.anchor}
            className={cn(
              "relative isolate scroll-mt-20 overflow-hidden py-16 md:py-24",
              ci === 0 ? "bg-cream" : "bg-[#F4F7FC]",
            )}
          >
            <span
              aria-hidden="true"
              className={cn(
                "pointer-events-none absolute -right-4 top-4 -z-10 select-none font-display text-[clamp(8rem,22vw,16rem)] font-black leading-none",
                blue ? "text-[#0046C8]/[0.05]" : "text-brand-500/[0.05]",
              )}
            >
              {s.number}
            </span>
            <Container>
              <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-14">
                <Reveal variant="up">
                  <p
                    className={cn(
                      "flex items-center gap-3 text-xs font-bold uppercase tracking-[0.3em]",
                      t.label,
                    )}
                  >
                    <span
                      aria-hidden="true"
                      className={cn("h-px w-8", t.bar)}
                    />
                    {s.number}　{p.role} / {p.en}
                  </p>
                  <h2 className="mt-3 text-[clamp(1.75rem,3.4vw,2.6rem)] font-black leading-tight text-ink">
                    {s.title}
                  </h2>
                  <p className="mt-5 text-[15px] leading-[2] text-ink-soft">
                    {s.summary}
                  </p>
                  <p
                    className="mt-6 border-l-4 bg-white px-5 py-4 text-base font-black leading-[1.7] text-ink md:text-lg"
                    style={{ borderColor: blue ? "#0046C8" : "#7A1F3D" }}
                  >
                    {blue ? (
                      <>
                        経営の伴走と新規開拓で、
                        <span className="text-[#0046C8]">
                          事業の成長を早める
                        </span>
                      </>
                    ) : (
                      <>
                        セキュプロの2つのサービスで、
                        <span className="text-brand-500">
                          情報セキュリティ対策を完備
                        </span>
                      </>
                    )}
                  </p>
                </Reveal>
                <div>
                  {blue ? (
                    <AdvisoryGrowthDiagram />
                  ) : (
                    <BondServicePyramid
                      items={bondPyramidItems((path) =>
                        localePath(path, locale),
                      )}
                      diagramOnly
                    />
                  )}
                </div>
              </div>

              {/* サービスのカード */}
              <ul
                className={cn(
                  "mt-12 grid gap-4 md:mt-16 md:gap-5",
                  (s.children ?? []).length >= 3
                    ? "md:grid-cols-3"
                    : "md:grid-cols-2",
                )}
              >
                {(s.children ?? []).map((ch, i) => (
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
                          "group relative flex h-full flex-col overflow-hidden rounded-2xl border bg-white p-6 transition duration-300 hover:-translate-y-1 hover:shadow-[0_28px_50px_-30px_rgba(29,5,11,0.45)] md:p-7",
                          blue
                            ? "border-[#E1E8F3] hover:border-[#0046C8]/50"
                            : "border-[#EEE5E8] hover:border-brand-500/50",
                        )}
                      >
                        <div className="flex items-start justify-between gap-4">
                          <span
                            aria-hidden="true"
                            className={cn(
                              "grid h-12 w-12 place-items-center rounded-xl transition-colors duration-300",
                              blue
                                ? "bg-[#EEF4FC] text-[#0046C8] group-hover:bg-[#0046C8] group-hover:text-white"
                                : "bg-brand-50 text-brand-500 group-hover:bg-brand-500 group-hover:text-white",
                            )}
                          >
                            <ServiceIcon slug={ch.slug} />
                          </span>
                          <span
                            className={cn(
                              "font-display text-sm font-black tracking-[0.15em]",
                              t.number,
                            )}
                          >
                            {ch.number}
                          </span>
                        </div>
                        {ch.subtitle ? (
                          <p className="mt-5 text-[11px] font-bold tracking-[0.15em] text-ink-muted">
                            {ch.subtitle}
                          </p>
                        ) : null}
                        <h3
                          className={cn(
                            "mt-1 text-xl font-black text-ink transition-colors",
                            t.hover,
                          )}
                        >
                          {ch.title}
                        </h3>
                        <p className="mt-3 flex-1 text-sm leading-[1.9] text-ink-soft">
                          <Marked text={ch.summary} marks={ch.marks} />
                        </p>
                        <span
                          className={cn(
                            "mt-5 inline-flex items-center gap-2 text-sm font-bold",
                            t.label,
                          )}
                        >
                          詳しく見る
                          <span
                            aria-hidden="true"
                            className="transition-transform group-hover:translate-x-1"
                          >
                            →
                          </span>
                        </span>
                        <span
                          aria-hidden="true"
                          className={cn(
                            "absolute bottom-0 left-0 h-1 w-full origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100",
                            t.bar,
                          )}
                        />
                      </Link>
                    </li>
                  </Reveal>
                ))}
              </ul>
            </Container>
          </section>
        );
      })}

      {/* ===== お問い合わせ ===== */}
      <section className="relative isolate overflow-hidden bg-brand-500 py-16 text-white md:py-20">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-24 top-1/2 -z-10 h-[28rem] w-[28rem] -translate-y-1/2 opacity-20"
        >
          <svg viewBox="0 0 400 400" className="sv-spin h-full w-full">
            <circle
              cx="200"
              cy="200"
              r="190"
              fill="none"
              stroke="#fff"
              strokeWidth="1"
              strokeDasharray="2 8"
            />
            <circle
              cx="200"
              cy="200"
              r="140"
              fill="none"
              stroke="#fff"
              strokeWidth="1"
            />
            <circle cx="200" cy="10" r="5" fill="#fff" />
          </svg>
        </div>
        <Container className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-white/70">
              Contact
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

/** 文中の重要な言葉に、ワインレッドの下線を引く */
function Marked({ text, marks }: { text: string; marks?: string[] }) {
  if (!marks?.length) return <>{text}</>;
  // 強調する言葉は日本語の固定文言なので、そのまま区切りに使う
  const re = new RegExp(`(${marks.join("|")})`);
  return (
    <>
      {text.split(re).map((part, i) =>
        marks.includes(part) ? (
          <span
            key={i}
            className="font-bold text-ink underline decoration-brand-500 decoration-2 underline-offset-[5px]"
          >
            {part}
          </span>
        ) : (
          part
        ),
      )}
    </>
  );
}

/** サービスごとのアイコン */
function ServiceIcon({ slug }: { slug: string }) {
  const p = {
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden="true">
      {slug === "ciso" ? (
        <g {...p}>
          <path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6z" />
          <path d="M9 12l2 2 4-4" />
        </g>
      ) : slug === "security-training" ? (
        <g {...p}>
          <path d="M2.5 9L12 4.5 21.5 9 12 13.5z" />
          <path d="M6.5 11v4.5c1.5 1.5 3.5 2.2 5.5 2.2s4-.7 5.5-2.2V11" />
        </g>
      ) : slug === "web-security" ? (
        <g {...p}>
          <rect x="3" y="4" width="18" height="13" rx="2" />
          <path d="M3 8h18M9 21h6M12 17v4" />
          <rect x="10" y="11" width="4" height="3.5" rx="0.6" />
          <path d="M10.8 11v-.8a1.2 1.2 0 0 1 2.4 0v.8" />
        </g>
      ) : slug === "advisory" ? (
        <g {...p}>
          <circle cx="9" cy="8" r="3" />
          <path d="M3.5 19c.7-3.2 2.8-5 5.5-5s4.8 1.8 5.5 5" />
          <path d="M16 6.5l2 2 3.5-3.5M17 13l4 0M19 11v4" />
        </g>
      ) : (
        <g {...p}>
          <circle cx="12" cy="12" r="8" />
          <circle cx="12" cy="12" r="4.5" />
          <circle cx="12" cy="12" r="1.2" fill="currentColor" />
          <path d="M19 5l-5.5 5.5" />
        </g>
      )}
    </svg>
  );
}
