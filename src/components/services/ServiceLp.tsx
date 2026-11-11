import Image from "next/image";
import type { ReactNode } from "react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { LpHeader } from "@/components/services/LpHeader";
import { ServiceLeadForm } from "@/components/contact/ServiceLeadForm";
import type { ServiceLeadService } from "@/lib/contact";
import { site } from "@/lib/site";
import { cn } from "@/lib/cn";

type Accent = "blue" | "wine";

type Img = { src: string; width: number; height: number; alt: string };

export type ServiceLpContent = {
  accent: Accent;
  service: ServiceLeadService;
  privacyHref: string;
  hero: {
    eyebrow: string;
    /** サービス名(ページのh1) */
    title: string;
    /** キャッチコピー */
    catchCopy: ReactNode;
    lead: string;
    badges: string[];
    image: Img;
  };
  problems: { items: string[]; image: Img };
  about: { heading: ReactNode; paragraphs: string[]; points: string[] };
  features: {
    heading: string;
    items: { title: string; text: string; image?: Img }[];
  };
  plans?: {
    heading: string;
    note: string;
    items: {
      name: string;
      target: string;
      items: string[];
      recommended?: boolean;
    }[];
  };
  targets: { heading: string; items: string[] };
  flow: { title: string; text: string }[];
  faqs: { q: string; a: string }[];
  form: { heading: string; topics: string[] };
};

/** アクセントカラーごとのクラス(Tailwindが検出できるよう文字列をそのまま書く) */
const tone = {
  blue: {
    text: "text-[#0046C8]",
    solid: "bg-[#0046C8]",
    hover: "hover:bg-[#0037B9]",
    soft: "bg-[#EEF4FC]",
    pale: "bg-[#F2F8FC]",
    ring: "ring-[#D6E2F5]",
    border: "border-[#D6E2F5]",
    heroBg: "bg-gradient-to-br from-[#F2F8FC] via-white to-[#E4ECFA]",
    marker: "bg-[linear-gradient(transparent_62%,#CFE0FA_62%)]",
    shadow: "shadow-[0_16px_36px_-14px_rgba(0,70,200,0.7)]",
    cardShadow: "shadow-[0_18px_44px_-30px_rgba(0,70,200,0.45)]",
    button: "rounded-full",
  },
  wine: {
    text: "text-brand-600",
    solid: "bg-brand-500",
    hover: "hover:bg-brand-600",
    soft: "bg-brand-50",
    pale: "bg-[#FBF6F7]",
    ring: "ring-brand-100",
    border: "border-brand-100",
    heroBg: "bg-gradient-to-br from-brand-50 via-white to-[#F7E3E8]",
    marker: "bg-[linear-gradient(transparent_62%,#F3CDD6_62%)]",
    shadow: "shadow-[0_16px_36px_-14px_rgba(122,30,53,0.8)]",
    cardShadow: "shadow-[0_18px_44px_-30px_rgba(122,30,53,0.5)]",
    button: "",
  },
} as const;

const FORM_ID = "consult";

function Cta({
  accent,
  label = "無料相談を申し込む",
}: {
  accent: Accent;
  label?: string;
}) {
  const t = tone[accent];
  return (
    <a
      href={`#${FORM_ID}`}
      className={cn(
        "group inline-flex h-14 items-center justify-center gap-2 px-8 text-base font-bold text-white transition hover:-translate-y-0.5 md:h-16 md:px-10",
        t.solid,
        t.hover,
        t.shadow,
        t.button,
      )}
    >
      {label}
      <span
        aria-hidden="true"
        className="transition-transform group-hover:translate-x-1"
      >
        →
      </span>
    </a>
  );
}

function Heading({
  accent,
  en,
  children,
}: {
  accent: Accent;
  en: string;
  children: ReactNode;
}) {
  const t = tone[accent];
  return (
    <Reveal variant="up" className="text-center">
      <p className={cn("text-xs font-bold tracking-[0.2em]", t.text)}>{en}</p>
      <span
        aria-hidden="true"
        className={cn("mx-auto mt-2 block h-0.5 w-8", t.solid)}
      />
      <h2 className="mt-4 text-[clamp(1.5rem,2.8vw,2.1rem)] font-bold leading-[1.55] tracking-[0.04em] text-ink [word-break:auto-phrase]">
        {children}
      </h2>
    </Reveal>
  );
}

function Check({ accent }: { accent: Accent }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "mt-1 grid h-5 w-5 shrink-0 place-items-center rounded-full text-[11px] font-black text-white",
        tone[accent].solid,
      )}
    >
      ✓
    </span>
  );
}

/**
 * サービス紹介の簡易LP(CISO・セキュリティ顧問など)の共通レイアウト。
 * 課題 → サービス概要 → 特徴 → (プラン) → 対象企業 → 流れ → よくある質問 → 無料相談
 */
export function ServiceLp({ c }: { c: ServiceLpContent }) {
  const t = tone[c.accent];
  const nav = [
    { href: "#problem", label: "課題" },
    { href: "#about", label: "サービス概要" },
    { href: "#features", label: "特徴" },
    ...(c.plans ? [{ href: "#plans", label: "プラン" }] : []),
    { href: "#flow", label: "ご支援の流れ" },
    { href: "#faq", label: "よくある質問" },
    { href: `#${FORM_ID}`, label: "無料相談" },
  ];

  return (
    <div className="bg-white text-ink">
      <LpHeader
        items={nav}
        ctaHref={`#${FORM_ID}`}
        ctaLabel="無料相談を申し込む"
        accent={c.accent}
      />

      {/* ファーストビュー */}
      <section className={cn("relative isolate overflow-hidden", t.heroBg)}>
        <Container className="grid items-center gap-10 py-14 md:py-20 lg:grid-cols-[1.1fr_1fr] lg:py-24">
          <div>
            <p
              className={cn(
                "animate-fade-up text-sm font-bold tracking-[0.12em]",
                t.text,
              )}
            >
              {c.hero.eyebrow}
            </p>
            <h1
              className="mt-3 animate-fade-up text-[clamp(2.1rem,4.6vw,3.4rem)] font-black leading-[1.2] tracking-[0.02em] [word-break:auto-phrase]"
              style={{ animationDelay: "0.1s" }}
            >
              {c.hero.title}
            </h1>
            <p
              className="mt-5 animate-fade-up text-[clamp(1.35rem,2.6vw,1.9rem)] font-black leading-[1.5] [word-break:auto-phrase]"
              style={{ animationDelay: "0.2s" }}
            >
              {c.hero.catchCopy}
            </p>
            <p
              className="mt-5 max-w-xl animate-fade-up text-[15px] leading-[2] text-ink/75 md:text-base"
              style={{ animationDelay: "0.3s" }}
            >
              {c.hero.lead}
            </p>
            <ul
              className="mt-6 flex animate-fade-up flex-wrap gap-2"
              style={{ animationDelay: "0.4s" }}
            >
              {c.hero.badges.map((b) => (
                <li
                  key={b}
                  className={cn(
                    "rounded-full bg-white px-3.5 py-1.5 text-sm font-bold ring-1",
                    t.ring,
                    t.text,
                  )}
                >
                  {b}
                </li>
              ))}
            </ul>
            <div
              className="mt-9 animate-fade-up"
              style={{ animationDelay: "0.5s" }}
            >
              <Cta accent={c.accent} />
            </div>
          </div>
          <div
            className="relative mx-auto w-full max-w-[520px] animate-fade-up"
            style={{ animationDelay: "0.3s" }}
          >
            <div
              aria-hidden="true"
              className="absolute inset-[4%] rounded-full bg-white/80"
            />
            <Image
              src={c.hero.image.src}
              alt={c.hero.image.alt}
              width={c.hero.image.width}
              height={c.hero.image.height}
              priority
              className="relative mx-auto h-auto w-[86%]"
            />
          </div>
        </Container>
      </section>

      {/* 課題 */}
      <section
        id="problem"
        className={cn("scroll-mt-28 py-20 md:py-24", t.pale)}
      >
        <Container>
          <Heading accent={c.accent} en="PROBLEM">
            こんなお悩みはありませんか？
          </Heading>
          <div className="mx-auto mt-12 grid max-w-5xl items-center gap-10 md:grid-cols-[1fr_1.6fr]">
            <Image
              src={c.problems.image.src}
              alt={c.problems.image.alt}
              width={c.problems.image.width}
              height={c.problems.image.height}
              className="mx-auto h-auto w-full max-w-[260px]"
            />
            <ul className="space-y-3">
              {c.problems.items.map((p, i) => (
                <Reveal key={p} variant="up" delay={i * 70}>
                  <li className="flex gap-3 rounded-xl bg-white px-5 py-4 text-base font-bold leading-relaxed md:text-[17px]">
                    <Check accent={c.accent} />
                    {p}
                  </li>
                </Reveal>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      {/* サービス概要 */}
      <section id="about" className="scroll-mt-28 py-20 md:py-24">
        <Container>
          <Heading accent={c.accent} en="ABOUT">
            {c.about.heading}
          </Heading>
          <Reveal
            variant="up"
            className="mx-auto mt-8 max-w-3xl space-y-4 text-center text-[15px] leading-[2.05] text-ink/80 md:text-base"
          >
            {c.about.paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </Reveal>
          <Reveal
            variant="up"
            className="mx-auto mt-10 grid max-w-4xl gap-3 sm:grid-cols-3"
          >
            {c.about.points.map((p) => (
              <p
                key={p}
                className={cn(
                  "rounded-xl px-5 py-4 text-center text-base font-black leading-snug",
                  t.soft,
                  t.text,
                )}
              >
                {p}
              </p>
            ))}
          </Reveal>
          <Reveal variant="up" className="mt-12 flex justify-center">
            <Cta accent={c.accent} />
          </Reveal>
        </Container>
      </section>

      {/* 特徴・できること */}
      <section
        id="features"
        className={cn("scroll-mt-28 py-20 md:py-24", t.pale)}
      >
        <Container>
          <Heading accent={c.accent} en="FEATURES">
            {c.features.heading}
          </Heading>
          <div className="mx-auto mt-12 grid max-w-6xl gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {c.features.items.map((f, i) => (
              <Reveal
                key={f.title}
                variant="up"
                delay={(i % 3) * 100}
                className="h-full"
              >
                <article
                  className={cn(
                    "flex h-full flex-col rounded-2xl bg-white p-6 md:p-7",
                    t.cardShadow,
                  )}
                >
                  {f.image ? (
                    <Image
                      src={f.image.src}
                      alt={f.image.alt}
                      width={f.image.width}
                      height={f.image.height}
                      className="mx-auto h-32 w-auto object-contain md:h-36"
                    />
                  ) : null}
                  <p
                    className={cn(
                      "mt-5 text-xs font-bold tracking-[0.2em]",
                      t.text,
                    )}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-1 text-lg font-bold leading-snug md:text-xl">
                    {f.title}
                  </h3>
                  <p className="mt-3 text-[15px] leading-[1.95] text-ink/75">
                    {f.text}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* プラン(料金は掲載しない) */}
      {c.plans ? (
        <section id="plans" className="scroll-mt-28 py-20 md:py-24">
          <Container>
            <Heading accent={c.accent} en="PLAN">
              {c.plans.heading}
            </Heading>
            <div className="mx-auto mt-12 grid max-w-6xl gap-5 lg:grid-cols-3">
              {c.plans.items.map((p, i) => (
                <Reveal
                  key={p.name}
                  variant="up"
                  delay={i * 100}
                  className="h-full"
                >
                  <article
                    className={cn(
                      "relative flex h-full flex-col rounded-2xl border-2 bg-white p-6 md:p-8",
                      p.recommended ? cn("border-current", t.text) : t.border,
                    )}
                  >
                    {p.recommended ? (
                      <span
                        className={cn(
                          "absolute -top-3.5 left-6 rounded-full px-3 py-1 text-xs font-bold text-white",
                          t.solid,
                        )}
                      >
                        おすすめ
                      </span>
                    ) : null}
                    <h3 className="text-xl font-black text-ink">{p.name}</h3>
                    <p className="mt-2 text-sm text-ink/60">{p.target}</p>
                    <ul className="mt-5 space-y-2.5 border-t border-ink/10 pt-5">
                      {p.items.map((it) => (
                        <li
                          key={it}
                          className="flex gap-2.5 text-[15px] leading-relaxed text-ink/85"
                        >
                          <Check accent={c.accent} />
                          {it}
                        </li>
                      ))}
                    </ul>
                  </article>
                </Reveal>
              ))}
            </div>
            <p className="mx-auto mt-6 max-w-3xl text-center text-sm text-ink/60">
              {c.plans.note}
            </p>
          </Container>
        </section>
      ) : null}

      {/* 対象企業 */}
      <section className={cn("py-20 md:py-24", c.plans ? t.pale : "")}>
        <Container>
          <Heading accent={c.accent} en="FOR">
            {c.targets.heading}
          </Heading>
          <ul className="mx-auto mt-10 grid max-w-4xl gap-3 sm:grid-cols-2">
            {c.targets.items.map((it, i) => (
              <Reveal key={it} variant="up" delay={i * 70}>
                <li
                  className={cn(
                    "flex h-full gap-3 rounded-xl bg-white px-5 py-4 text-base font-bold leading-relaxed ring-1",
                    t.ring,
                  )}
                >
                  <Check accent={c.accent} />
                  {it}
                </li>
              </Reveal>
            ))}
          </ul>
        </Container>
      </section>

      {/* ご支援の流れ */}
      <section
        id="flow"
        className={cn("scroll-mt-28 py-20 md:py-24", c.plans ? "" : t.pale)}
      >
        <Container>
          <Heading accent={c.accent} en="FLOW">
            ご支援の流れ
          </Heading>
          <ol className="mx-auto mt-12 grid max-w-5xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {c.flow.map((f, i) => (
              <Reveal
                key={f.title}
                variant="up"
                delay={i * 100}
                className="h-full"
              >
                <li
                  className={cn(
                    "h-full rounded-2xl bg-white p-6 ring-1",
                    t.ring,
                  )}
                >
                  <span
                    className={cn(
                      "grid h-10 w-10 place-items-center rounded-full text-sm font-black text-white",
                      t.solid,
                    )}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="mt-4 text-base font-bold">{f.title}</p>
                  <p className="mt-2 text-sm leading-relaxed text-ink/70">
                    {f.text}
                  </p>
                </li>
              </Reveal>
            ))}
          </ol>
        </Container>
      </section>

      {/* よくある質問 */}
      <section
        id="faq"
        className={cn("scroll-mt-28 py-20 md:py-24", c.plans ? t.pale : "")}
      >
        <Container>
          <Heading accent={c.accent} en="FAQ">
            よくある質問
          </Heading>
          <div className="mx-auto mt-10 max-w-3xl space-y-3">
            {c.faqs.map((f) => (
              <details
                key={f.q}
                className="group rounded-xl bg-white ring-1 ring-ink/10"
              >
                <summary className="flex cursor-pointer list-none items-center gap-4 p-5 md:p-6 [&::-webkit-details-marker]:hidden">
                  <span className={cn("text-lg font-bold", t.text)}>Q.</span>
                  <span className="flex-1 text-[15px] font-bold md:text-base">
                    {f.q}
                  </span>
                  <span
                    aria-hidden="true"
                    className={cn(
                      "text-xl transition-transform group-open:rotate-45",
                      t.text,
                    )}
                  >
                    ＋
                  </span>
                </summary>
                <div className="flex gap-4 border-t border-ink/10 px-5 py-5 md:px-6">
                  <span className="text-lg font-bold text-ink/40">A.</span>
                  <p className="pt-0.5 text-[15px] leading-relaxed text-ink/80">
                    {f.a}
                  </p>
                </div>
              </details>
            ))}
          </div>
        </Container>
      </section>

      {/* 無料相談フォーム */}
      <section
        id={FORM_ID}
        className={cn("scroll-mt-28 py-20 md:py-24", c.plans ? "" : t.pale)}
      >
        <Container>
          <Heading accent={c.accent} en="CONTACT">
            {c.form.heading}
          </Heading>
          <Reveal
            variant="up"
            delay={150}
            className={cn(
              "mx-auto mt-10 max-w-4xl rounded-2xl border-2 bg-white p-6 md:p-10",
              t.border,
              t.cardShadow,
            )}
          >
            <ServiceLeadForm
              service={c.service}
              accent={c.accent}
              topics={c.form.topics}
              privacyHref={c.privacyHref}
            />
          </Reveal>
          <p className="mt-10 text-center text-sm text-ink/60">
            運営会社：{site.legalName}
          </p>
        </Container>
      </section>
    </div>
  );
}
