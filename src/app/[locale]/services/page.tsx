import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbJsonLd } from "@/lib/jsonld";
import { serviceCategories } from "@/lib/site";
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

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "ホーム", url: localePath("/", locale) },
          { name: "サービス一覧", url: localePath("/services", locale) },
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
            <span className="text-white/90">サービス一覧</span>
          </nav>
          <p
            aria-hidden="true"
            className="mt-8 animate-fade-up font-display text-[clamp(3rem,10vw,7rem)] font-black leading-none tracking-tight"
          >
            Services
          </p>
          <h1
            className="mt-4 animate-fade-up text-xl font-bold tracking-[0.2em] text-brand-200 md:text-2xl"
            style={{ animationDelay: "0.15s" }}
          >
            サービス一覧
          </h1>
          <p
            className="mt-6 max-w-2xl animate-fade-up text-sm leading-[2] text-white/80 md:text-base"
            style={{ animationDelay: "0.3s" }}
          >
            守りの「AI時代のセキュリティ構築」と、攻めの「事業グロースの経営顧問」。2つの事業で、企業が安心して挑戦できる土台をつくります。
          </p>

          {/* 事業へのジャンプ */}
          <div
            className="mt-10 grid animate-fade-up gap-3 sm:grid-cols-2 lg:max-w-3xl"
            style={{ animationDelay: "0.45s" }}
          >
            {categories.map((s) => {
              const p = pillars[s.slug];
              if (!p) return null;
              return (
                <a
                  key={s.slug}
                  href={`#${p.anchor}`}
                  className="group flex items-center justify-between gap-4 border border-white/25 bg-white/5 px-5 py-4 backdrop-blur-sm transition hover:bg-white hover:text-ink"
                >
                  <span>
                    <span className="block text-[11px] font-bold tracking-[0.25em] text-brand-200 group-hover:text-brand-500">
                      {p.role} / {p.en.toUpperCase()}
                    </span>
                    <span className="mt-1 block text-lg font-black">
                      {s.title}
                    </span>
                  </span>
                  <span
                    aria-hidden="true"
                    className="text-lg transition-transform group-hover:translate-y-0.5"
                  >
                    ↓
                  </span>
                </a>
              );
            })}
          </div>
        </Container>
      </section>

      {/* 事業ごとのサービス */}
      {categories.map((s, ci) => {
        const p = pillars[s.slug];
        if (!p) return null;
        const t = toneClass[p.tone];
        return (
          <section
            key={s.slug}
            id={p.anchor}
            className={cn(
              "scroll-mt-20 py-20 md:py-28",
              ci % 2 === 0 ? "bg-white" : "bg-cream",
            )}
          >
            <Container>
              <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
                {/* 事業の説明 */}
                <Reveal variant="up" className="lg:col-span-4">
                  <div className="lg:sticky lg:top-28">
                    <p
                      className={cn(
                        "text-xs font-bold uppercase tracking-[0.3em]",
                        t.label,
                      )}
                    >
                      {p.role} / {p.en}
                    </p>
                    <h2 className="mt-3 text-[clamp(1.75rem,3.2vw,2.5rem)] font-black leading-tight text-ink">
                      {s.title}
                    </h2>
                    <span
                      aria-hidden="true"
                      className={cn("mt-5 block h-1 w-12", t.bar)}
                    />
                    <p className="mt-5 text-[15px] leading-[2] text-ink-soft">
                      {s.summary}
                    </p>
                    {s.href ? (
                      <Link
                        href={localePath(s.href, locale)}
                        className="mt-6 inline-flex items-center gap-2 border-b border-ink/30 pb-1 text-sm font-bold text-ink transition-colors hover:border-ink"
                      >
                        {s.title}について
                        <span aria-hidden="true">→</span>
                      </Link>
                    ) : null}
                  </div>
                </Reveal>

                {/* サービスのカード */}
                <ul className="space-y-5 lg:col-span-8">
                  {(s.children ?? []).map((ch, i) => (
                    <Reveal key={ch.slug} variant="up" delay={i * 120}>
                      <li>
                        <Link
                          href={ch.href ? localePath(ch.href, locale) : "#"}
                          className="group grid overflow-hidden border border-ink/10 bg-white transition-shadow duration-500 hover:shadow-[0_30px_60px_-30px_rgba(29,5,11,0.35)]"
                        >
                          <div className="flex flex-col p-6 md:p-8">
                            <p
                              className={cn(
                                "font-display text-sm font-black tracking-[0.15em]",
                                t.number,
                              )}
                            >
                              {ch.number}
                              {ch.subtitle ? (
                                <span className="ml-3 text-xs font-bold tracking-[0.15em] text-ink-muted">
                                  {ch.subtitle}
                                </span>
                              ) : null}
                            </p>
                            <h3
                              className={cn(
                                "mt-2 text-xl font-black text-ink transition-colors md:text-2xl",
                                t.hover,
                              )}
                            >
                              {ch.title}
                            </h3>
                            <p className="mt-3 text-sm leading-[1.9] text-ink-soft md:text-[15px]">
                              {ch.summary}
                            </p>
                            <span
                              className={cn(
                                "mt-5 inline-flex items-center gap-2 self-start px-4 py-2 text-xs font-bold text-white transition-colors",
                                t.button,
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
                          </div>
                        </Link>
                      </li>
                    </Reveal>
                  ))}
                </ul>
              </div>
            </Container>
          </section>
        );
      })}

      {/* お問い合わせ */}
      <section className="bg-brand-900 py-16 text-white md:py-20">
        <Container className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-brand-200">
              Contact
            </p>
            <p className="mt-3 text-xl font-black md:text-2xl">
              どのサービスが合うか、まずはご相談ください。
            </p>
          </div>
          <Link
            href={localePath("/contact", locale)}
            className="group inline-flex h-14 items-center gap-3 bg-white px-8 text-sm font-bold text-brand-900 transition hover:bg-brand-50"
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
