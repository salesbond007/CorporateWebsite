import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import {
  BondServicePyramid,
  bondPyramidItems,
} from "@/components/services/BondServicePyramid";
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

      {/* ===== ページ見出し(明るい背景 + 動く図) ===== */}
      <section className="relative isolate overflow-hidden bg-white">
        {/* うすい点の模様(下にいくほど消える) */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 [background-image:radial-gradient(#E6D9DD_1px,transparent_1px)] [background-size:22px_22px] [mask-image:linear-gradient(to_bottom,black,transparent_85%)]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-1/2 bg-gradient-to-b from-transparent to-cream"
        />
        <Container className="grid items-center gap-10 py-12 md:py-20 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-12">
          <div>
            <nav aria-label="パンくずリスト" className="text-xs text-ink/50">
              <Link href={localePath("/", locale)} className="hover:text-ink">
                ホーム
              </Link>
              <span className="mx-2">/</span>
              <span className="text-ink/80">サービス一覧</span>
            </nav>
            <p className="mt-8 flex animate-fade-up items-center gap-3 text-xs font-bold uppercase tracking-[0.3em] text-brand-500">
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
              className="mt-5 max-w-xl animate-fade-up text-[15px] font-bold leading-[2] text-ink/70 md:text-base"
              style={{ animationDelay: "0.2s" }}
            >
              <span className="text-brand-500">守り</span>
              の情報セキュリティと、
              <span className="text-[#0046C8]">攻め</span>
              の経営顧問。2つの事業で、企業が安心して挑戦できる土台をつくります。
            </p>

            {/* 事業へのジャンプ */}
            <div
              className="mt-8 grid animate-fade-up gap-3 sm:grid-cols-2"
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
                      "group relative flex items-center justify-between gap-3 overflow-hidden rounded-xl border bg-white px-5 py-4 lg:px-4 shadow-[0_10px_30px_-20px_rgba(29,5,11,0.35)] transition duration-300 hover:-translate-y-0.5",
                      blue
                        ? "border-[#D6E2F5] hover:border-[#0046C8]"
                        : "border-[#EEDFE3] hover:border-brand-500",
                    )}
                  >
                    <span
                      aria-hidden="true"
                      className={cn(
                        "absolute inset-y-0 left-0 w-1",
                        blue ? "bg-[#0046C8]" : "bg-brand-500",
                      )}
                    />
                    <span>
                      <span
                        className={cn(
                          "block text-[11px] font-bold tracking-[0.2em]",
                          blue ? "text-[#0046C8]" : "text-brand-500",
                        )}
                      >
                        {s.number}　{p.role} / {p.en.toUpperCase()}
                      </span>
                      <span className="mt-1 block whitespace-nowrap text-base font-black text-ink">
                        {s.title}
                      </span>
                    </span>
                    <span
                      aria-hidden="true"
                      className={cn(
                        "grid h-8 w-8 shrink-0 place-items-center rounded-full text-sm transition-transform group-hover:translate-y-0.5",
                        blue
                          ? "bg-[#EEF4FC] text-[#0046C8]"
                          : "bg-brand-50 text-brand-500",
                      )}
                    >
                      ↓
                    </span>
                  </a>
                );
              })}
            </div>
          </div>

          {/* 右: 2つの事業が成長につながる動く図 */}
          <div
            className="mx-auto w-full max-w-[30rem] animate-fade-up"
            style={{ animationDelay: "0.2s" }}
          >
            <HeroGraphic />
          </div>
        </Container>
      </section>

      {/* ===== 情報セキュリティ対策事業のサービス(図) ===== */}
      <section className="bg-cream py-20 md:py-28">
        <Container>
          <Reveal variant="up">
            <p className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.3em] text-brand-500">
              <span aria-hidden="true" className="h-px w-8 bg-brand-500" />
              Information Security Services
            </p>
            <h2 className="mt-3 text-[clamp(1.75rem,3.2vw,2.5rem)] font-black leading-tight text-ink [word-break:keep-all]">
              情報セキュリティ対策事業の
              <wbr />
              サービス
            </h2>
          </Reveal>
          <div className="mt-10 md:mt-12">
            <BondServicePyramid
              items={bondPyramidItems((path) => localePath(path, locale))}
              hideListOnMobile
            />
          </div>
        </Container>
      </section>

      {/* ===== 事業ごとのサービス ===== */}
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
              "relative isolate scroll-mt-20 overflow-hidden py-20 md:py-28",
              ci % 2 === 0 ? "bg-white" : "bg-cream",
            )}
          >
            {/* 大きな番号(背景) */}
            <span
              aria-hidden="true"
              className={cn(
                "pointer-events-none absolute -right-4 top-6 -z-10 select-none font-display text-[clamp(8rem,22vw,16rem)] font-black leading-none",
                blue ? "text-[#0046C8]/[0.05]" : "text-brand-500/[0.05]",
              )}
            >
              {s.number}
            </span>
            <Container>
              <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
                {/* 事業の説明 */}
                <Reveal variant="up" className="lg:col-span-4">
                  <div className="lg:sticky lg:top-28">
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
                    <h2 className="mt-3 text-[clamp(1.75rem,3.2vw,2.5rem)] font-black leading-tight text-ink">
                      {s.title}
                    </h2>
                    <p className="mt-5 text-[15px] leading-[2] text-ink-soft">
                      {s.summary}
                    </p>
                  </div>
                </Reveal>

                {/* サービスのカード */}
                <ul className="grid gap-4 lg:col-span-8">
                  {(s.children ?? []).map((ch, i) => (
                    <Reveal key={ch.slug} variant="up" delay={i * 120}>
                      <li>
                        <Link
                          href={ch.href ? localePath(ch.href, locale) : "#"}
                          className={cn(
                            "group relative grid grid-cols-[1fr_auto] items-center gap-5 overflow-hidden rounded-xl border bg-white p-6 transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_24px_50px_-30px_rgba(29,5,11,0.4)] md:p-8",
                            blue
                              ? "border-[#E1E8F3] hover:border-[#0046C8]/50"
                              : "border-[#EEE5E8] hover:border-brand-500/50",
                          )}
                        >
                          <div className="min-w-0">
                            <p
                              className={cn(
                                "font-display text-sm font-black tracking-[0.15em]",
                                t.number,
                              )}
                            >
                              {ch.number}
                              {ch.subtitle ? (
                                <span className="ml-3 text-[11px] font-bold tracking-[0.15em] text-ink-muted">
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
                              <Marked text={ch.summary} marks={ch.marks} />
                            </p>
                          </div>
                          <span
                            aria-hidden="true"
                            className={cn(
                              "grid h-12 w-12 shrink-0 place-items-center rounded-full border-2 transition-colors duration-300",
                              blue
                                ? "border-[#0046C8] text-[#0046C8] group-hover:bg-[#0046C8] group-hover:text-white"
                                : "border-brand-500 text-brand-500 group-hover:bg-brand-500 group-hover:text-white",
                            )}
                          >
                            <svg
                              viewBox="0 0 20 20"
                              className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                              fill="none"
                            >
                              <path
                                d="M4 10h11M11 5l5 5-5 5"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </span>
                          {/* 下の線が左からのびる */}
                          <span
                            aria-hidden="true"
                            className={cn(
                              "absolute bottom-0 left-0 h-0.5 w-full origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100",
                              t.bar,
                            )}
                          />
                          <span className="sr-only">詳しく見る</span>
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

/** ページ見出しの図: 守り(情報セキュリティ)と攻め(経営顧問)が、企業の成長を支える */
function HeroGraphic() {
  const nodes = [
    {
      x: 92,
      y: 120,
      c: "#7A1F3D",
      soft: "#F5E9ED",
      role: "守り",
      t1: "情報セキュリティ",
      t2: "対策事業",
    },
    {
      x: 308,
      y: 120,
      c: "#0046C8",
      soft: "#EEF4FC",
      role: "攻め",
      t1: "経営顧問",
      t2: "事業",
    },
  ];
  return (
    <svg
      viewBox="0 0 400 360"
      className="h-auto w-full"
      role="img"
      aria-label="守りの情報セキュリティ対策事業と、攻めの経営顧問事業の2つで、企業の持続的な成長を支える図"
    >
      {/* ゆっくり回る外周 */}
      <g className="sv-spin">
        <circle
          cx="200"
          cy="200"
          r="150"
          fill="none"
          stroke="#1F1A1C"
          strokeOpacity="0.12"
          strokeWidth="1"
          strokeDasharray="2 7"
        />
        <circle cx="350" cy="200" r="3.5" fill="#7A1F3D" />
        <circle cx="50" cy="200" r="3.5" fill="#0046C8" />
      </g>
      {/* 事業 → 成長 の流れ */}
      {nodes.map((n) => (
        <path
          key={n.role}
          d={`M${n.x} ${n.y + 52} Q ${n.x} 262 200 262`}
          fill="none"
          stroke={n.c}
          strokeWidth="2"
          strokeDasharray="4 5"
          className="rv-dash"
        />
      ))}
      {/* 成長 */}
      <g>
        <circle
          cx="200"
          cy="270"
          r="44"
          fill="#fff"
          stroke="#1F1A1C"
          strokeOpacity="0.15"
        />
        <circle
          cx="200"
          cy="270"
          r="44"
          fill="none"
          stroke="#1F1A1C"
          strokeOpacity="0.25"
          className="pf-wave"
        />
        <path
          d="M182 282l12-12 8 7 16-17"
          fill="none"
          stroke="#1F1A1C"
          strokeWidth="2.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M209 260h9v9"
          fill="none"
          stroke="#1F1A1C"
          strokeWidth="2.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <text
          x="200"
          y="336"
          textAnchor="middle"
          fontSize="13"
          fontWeight="900"
          fill="#1F1A1C"
        >
          企業の持続的な成長
        </text>
      </g>
      {/* 2つの事業 */}
      {nodes.map((n, i) => (
        <g
          key={n.t1}
          className="sv-float"
          style={{ animationDelay: `${i * 1.2}s` }}
        >
          <circle cx={n.x} cy={n.y} r="58" fill={n.soft} />
          <circle
            cx={n.x}
            cy={n.y}
            r="58"
            fill="none"
            stroke={n.c}
            strokeWidth="2"
          />
          <text
            x={n.x}
            y={n.y - 18}
            textAnchor="middle"
            fontSize="11"
            fontWeight="800"
            letterSpacing="3"
            fill={n.c}
          >
            {n.role}
          </text>
          <text
            x={n.x}
            y={n.y + 4}
            textAnchor="middle"
            fontSize="13"
            fontWeight="900"
            fill="#1F1A1C"
          >
            {n.t1}
          </text>
          <text
            x={n.x}
            y={n.y + 22}
            textAnchor="middle"
            fontSize="13"
            fontWeight="900"
            fill="#1F1A1C"
          >
            {n.t2}
          </text>
        </g>
      ))}
      {/* × */}
      <g>
        <circle
          cx="200"
          cy="120"
          r="17"
          fill="#fff"
          stroke="#1F1A1C"
          strokeOpacity="0.15"
        />
        <path
          d="M194 114l12 12M206 114l-12 12"
          stroke="#1F1A1C"
          strokeWidth="2.2"
          strokeLinecap="round"
        />
      </g>
    </svg>
  );
}
