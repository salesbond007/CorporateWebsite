import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import {
  Squiggle,
  Sparkle,
  CircleScribble,
  DotsDecoration,
} from "@/components/ui/Doodle";
import { localePath } from "@/i18n/path";
import { isLocale } from "@/i18n/config";

export const metadata: Metadata = {
  title: "紹介営業パートナー登録",
  description:
    "セールスボンドの紹介営業パートナー(サポーター)制度。お持ちの人脈を活かして、企業の決裁者開拓にご協力いただける方を募集しています。登録費用無料・完全成果報酬。",
};

type Stat = {
  value: string;
  unit?: string;
  label: string;
};

const stats: Stat[] = [
  { value: "0", unit: "円", label: "登録・利用料" },
  { value: "0", unit: "件", label: "ノルマ・最低件数" },
  { value: "2", unit: "種", label: "報酬(紹介+成約)" },
  { value: "成果", label: "報酬発生のタイミング" },
];

type Benefit = {
  number: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  highlight?: boolean;
};

function IconZero() {
  return (
    <svg viewBox="0 0 48 48" className="h-12 w-12" aria-hidden="true">
      <circle cx="24" cy="24" r="20" fill="#FFE7D1" />
      <circle cx="24" cy="24" r="14" fill="none" stroke="#F58220" strokeWidth="2.5" />
      <path
        d="M14 14 L34 34"
        stroke="#F58220"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function IconShield() {
  return (
    <svg viewBox="0 0 48 48" className="h-12 w-12" aria-hidden="true">
      <path
        d="M24 4 L42 12 V24 C42 34 34 42 24 44 C14 42 6 34 6 24 V12 Z"
        fill="#FFE7D1"
      />
      <path
        d="M24 4 L42 12 V24 C42 34 34 42 24 44 C14 42 6 34 6 24 V12 Z"
        fill="none"
        stroke="#F58220"
        strokeWidth="2"
      />
      <path
        d="M16 24 L22 30 L34 18"
        stroke="#F58220"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}

function IconDoubleCoin() {
  return (
    <svg viewBox="0 0 48 48" className="h-12 w-12" aria-hidden="true">
      <circle cx="18" cy="20" r="12" fill="#FFE7D1" />
      <circle cx="18" cy="20" r="12" fill="none" stroke="#F58220" strokeWidth="2" />
      <text
        x="18"
        y="25"
        fontSize="13"
        fontWeight="900"
        fill="#F58220"
        textAnchor="middle"
      >
        ¥
      </text>
      <circle cx="32" cy="30" r="12" fill="#F58220" />
      <text
        x="32"
        y="35"
        fontSize="13"
        fontWeight="900"
        fill="#FFF"
        textAnchor="middle"
      >
        ¥
      </text>
    </svg>
  );
}

const benefits: Benefit[] = [
  {
    number: "01",
    title: "完全無料・ノルマなし",
    description:
      "登録費・月会費・成果ノルマ、すべてゼロ。動かない月があってもペナルティはありません。自分のペースで取り組める設計です。",
    icon: <IconZero />,
    highlight: true,
  },
  {
    number: "02",
    title: "個人情報は当社が保護",
    description:
      "お名前は紹介承諾後にのみ開示。連絡先(電話・メール)は当社で管理し、紹介先には一切渡しません。",
    icon: <IconShield />,
  },
  {
    number: "03",
    title: "2段階の協力金",
    description:
      "商談実施で発生する紹介協力金に加え、成約時には成約協力金を別途お支払い。1件の紹介で2回の報酬チャンスがあります。",
    icon: <IconDoubleCoin />,
  },
];

type Step = {
  number: string;
  title: string;
  description: string;
};

const steps: Step[] = [
  {
    number: "01",
    title: "登録申請",
    description: "本ページのフォームから無料で登録。",
  },
  {
    number: "02",
    title: "依頼が届く",
    description: "クライアントの開拓ニーズに合う依頼をお送りします。",
  },
  {
    number: "03",
    title: "マッチング",
    description: "お持ちの人脈から紹介先をご提案いただきます。",
  },
  {
    number: "04",
    title: "報酬受け取り",
    description: "商談実施 → 成約に応じて協力金が発生します。",
  },
];

type Persona = {
  emoji: string;
  title: string;
  body: string;
};

const personas: Persona[] = [
  {
    emoji: "01",
    title: "経営者・幹部との人脈をお持ちの方",
    body: "コンサルタント、士業、元営業役員、独立支援家。お持ちのネットワークを資産として活かせます。",
  },
  {
    emoji: "02",
    title: "副業・複業として収入を増やしたい方",
    body: "現職を続けながら、自分のペースで取り組める仕組み。月1件の紹介から始められます。",
  },
  {
    emoji: "03",
    title: "人と人をつなぐ仕事に価値を感じる方",
    body: "紹介を通じて、企業の課題解決と人のキャリアに貢献したい方。社会的意義のある活動です。",
  },
];

type Faq = { q: string; a: string };

const faqs: Faq[] = [
  {
    q: "登録に費用はかかりますか?",
    a: "いいえ、登録および活動に費用は一切かかりません。完全無料でご利用いただけます。",
  },
  {
    q: "どんな人が向いていますか?",
    a: "経営者・役員クラスとのネットワークをお持ちの方、副業・複業として収入源を増やしたい方、人と人をつなぐ仕事に関心のある方を歓迎します。",
  },
  {
    q: "個人情報は紹介先企業に公開されますか?",
    a: "ご登録いただいたお名前は、紹介を承諾されたクライアント企業のみに開示します。連絡先(メール・電話)は当社で管理し、紹介先には非公開です。",
  },
  {
    q: "ノルマや活動義務はありますか?",
    a: "ありません。ご自身のペースで、ご紹介可能なタイミングでご協力いただけます。",
  },
  {
    q: "紹介できる人数や企業に上限はありますか?",
    a: "上限はありません。ご紹介可能な人脈・企業の数だけ、報酬獲得のチャンスが広がります。",
  },
  {
    q: "報酬はいくらくらいですか?",
    a: "紹介協力金は紹介先企業の従業員数・役職により変動します。成約時には別途、成約協力金をお支払いします。詳細はご登録後にご案内します。",
  },
];

export default function PartnerContactPage({
  params,
}: {
  params: { locale: string };
}) {
  if (!isLocale(params.locale)) notFound();
  const locale = params.locale;
  const registerHref = localePath("/contact/partner/register", locale);

  return (
    <>
      <PageHero
        eyebrow="Partner Program"
        title="紹介営業パートナー登録"
        description="あなたの人脈で、企業の事業成長を加速する。お持ちのネットワークを活かして、クライアント企業の決裁者開拓にご協力いただける方を募集しています。"
      />

      {/* ───── Manifesto ───── */}
      <section className="relative overflow-hidden py-24 md:py-32">
        <div
          aria-hidden="true"
          className="absolute inset-0 dot-bg-soft opacity-60"
        />
        <Container className="relative">
          <div className="mx-auto max-w-3xl text-center">
            <p className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.22em] text-brand-500">
              <span>The idea</span>
              <Squiggle className="h-3 w-12" />
            </p>
            <h2 className="mt-6 font-display text-[clamp(2rem,5vw,3.75rem)] font-black leading-[1.15] tracking-tight text-ink">
              眠っている人脈を、
              <br className="hidden md:block" />
              <span className="relative inline-block">
                <span className="relative z-10">価値ある機会</span>
                <CircleScribble className="absolute -inset-x-2 -inset-y-2 h-[120%] w-[110%]" />
              </span>
              に。
            </h2>
            <p className="mx-auto mt-10 max-w-2xl text-base md:text-lg leading-[2] text-ink-soft font-medium">
              ビジネスは「誰を知っているか」で動きます。
              <br className="hidden md:block" />
              あなたが積み重ねてきた信頼と関係性は、
              <span className="marker font-bold">それ自体が事業資産</span>
              です。
              <br className="hidden md:block" />
              セールスボンドは、その資産をクライアント企業の成長と、あなた自身の収入へと結びつけます。
            </p>
          </div>
        </Container>
      </section>

      {/* ───── Stats ───── */}
      <section className="relative bg-ink py-20 md:py-24 text-white overflow-hidden">
        <Sparkle className="absolute left-8 top-10 h-6 w-6 opacity-60" />
        <DotsDecoration className="absolute right-12 bottom-12 h-16 w-16 opacity-50" />
        <Container className="relative">
          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
            {stats.map((s, i) => (
              <Reveal key={s.label} delay={i * 80}>
                <div className="border-l-2 border-brand-500 pl-5">
                  <p className="font-display font-black leading-none text-white text-[clamp(3rem,6vw,5rem)]">
                    {s.value}
                    {s.unit ? (
                      <span className="ml-1 text-2xl md:text-3xl text-brand-500 font-black">
                        {s.unit}
                      </span>
                    ) : null}
                  </p>
                  <p className="mt-4 text-xs font-bold uppercase tracking-[0.18em] text-white/60">
                    {s.label}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* ───── 3 Benefits — mixed layout ───── */}
      <section className="py-28 md:py-36">
        <Container>
          <div className="grid items-end gap-10 md:grid-cols-12 md:gap-12">
            <div className="md:col-span-5">
              <p className="section-label">Benefits</p>
              <h2 className="mt-4 text-display-3 text-ink font-black">
                安心して、
                <br />
                取り組める設計
              </h2>
            </div>
            <p className="md:col-span-7 text-base md:text-lg leading-[1.95] text-ink-soft font-medium">
              「副業として始めたいけれど、何かトラブルにならないか不安」「個人情報がどこまで開示されるのか心配」——そんな声に応えるため、参加者を守る仕組みを徹底しています。
            </p>
          </div>

          {/* 1 feature card + 2 smaller cards */}
          <div className="mt-14 grid gap-6 lg:grid-cols-12">
            {benefits.map((b, i) => (
              <div
                key={b.number}
                className={
                  b.highlight
                    ? "lg:col-span-12 lg:row-span-1"
                    : "lg:col-span-6"
                }
              >
                <Reveal delay={i * 100} className="h-full">
                  <div
                    className={
                      b.highlight
                        ? "relative h-full overflow-hidden rounded-xl4 bg-brand-500 p-10 md:p-12 text-white"
                        : "relative h-full overflow-hidden rounded-xl4 border-2 border-ink bg-white p-10 md:p-12"
                    }
                  >
                    <div className="flex items-start justify-between gap-6">
                      <div className="flex-1">
                        <p
                          className={
                            b.highlight
                              ? "font-display text-5xl md:text-6xl font-black leading-none text-white/90"
                              : "font-display text-5xl md:text-6xl font-black leading-none text-brand-500"
                          }
                        >
                          {b.number}
                        </p>
                        <h3
                          className={
                            b.highlight
                              ? "mt-8 text-2xl md:text-3xl font-black text-white leading-tight"
                              : "mt-8 text-2xl md:text-3xl font-black text-ink leading-tight"
                          }
                        >
                          {b.title}
                        </h3>
                        <p
                          className={
                            b.highlight
                              ? "mt-5 max-w-2xl text-base leading-relaxed text-white/90 font-medium"
                              : "mt-5 text-base leading-relaxed text-ink-soft font-medium"
                          }
                        >
                          {b.description}
                        </p>
                      </div>
                      <div
                        className={
                          b.highlight
                            ? "shrink-0 rounded-2xl bg-white/15 p-4"
                            : "shrink-0 rounded-2xl bg-brand-50 p-4"
                        }
                      >
                        {b.icon}
                      </div>
                    </div>
                  </div>
                </Reveal>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ───── Rewards — visual diagram ───── */}
      <section className="bg-cream py-28 md:py-36">
        <Container>
          <div className="text-center">
            <p className="section-label">Rewards</p>
            <h2 className="mt-4 text-display-3 text-ink font-black">
              紹介と成約、
              <span className="text-brand-500">2回</span>
              の報酬チャンス
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-base text-ink-soft leading-relaxed font-medium">
              「紹介して終わり」ではありません。商談実施から成約まで、フェーズごとに協力金をお支払いします。
            </p>
          </div>

          <div className="mt-16 grid items-stretch gap-4 md:grid-cols-[1fr_auto_1fr]">
            {/* Step A: 紹介協力金 */}
            <Reveal>
              <div className="h-full rounded-xl3 border-2 border-ink-line bg-white p-8 md:p-10">
                <div className="flex items-center gap-3">
                  <span className="grid h-9 w-9 place-items-center rounded-full bg-ink text-xs font-black text-white">
                    A
                  </span>
                  <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-ink-muted">
                    Phase 1
                  </p>
                </div>
                <h3 className="mt-6 text-2xl md:text-3xl font-black text-ink leading-tight">
                  紹介協力金
                </h3>
                <p className="mt-2 text-sm font-bold text-brand-600">
                  商談実施で発生
                </p>
                <p className="mt-5 text-sm md:text-base leading-relaxed text-ink-soft font-medium">
                  ご紹介いただいた企業との商談が成立した時点で発生する基本報酬。紹介先企業の規模・役職に応じて金額が変動します。
                </p>
              </div>
            </Reveal>

            {/* Plus connector */}
            <div className="hidden md:flex items-center justify-center">
              <div className="grid h-14 w-14 place-items-center rounded-full bg-brand-500 text-white text-2xl font-black shadow-card">
                +
              </div>
            </div>

            {/* Step B: 成約協力金 */}
            <Reveal delay={120}>
              <div className="h-full rounded-xl3 border-2 border-brand-500 bg-brand-500 p-8 md:p-10 text-white">
                <div className="flex items-center gap-3">
                  <span className="grid h-9 w-9 place-items-center rounded-full bg-white text-xs font-black text-brand-600">
                    B
                  </span>
                  <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-white/80">
                    Phase 2
                  </p>
                </div>
                <h3 className="mt-6 text-2xl md:text-3xl font-black leading-tight">
                  成約協力金
                </h3>
                <p className="mt-2 text-sm font-bold text-white/90">
                  成約時に追加で発生
                </p>
                <p className="mt-5 text-sm md:text-base leading-relaxed text-white/90 font-medium">
                  紹介先企業と当社クライアントが成約に至った場合、成果に応じた追加報酬をお支払いします。
                </p>
              </div>
            </Reveal>
          </div>

          <p className="mt-10 text-center text-xs text-ink-muted">
            ※ 具体的な金額・条件はご登録後に個別にご案内いたします。
          </p>
        </Container>
      </section>

      {/* ───── Flow — connected timeline ───── */}
      <section className="py-28 md:py-36">
        <Container>
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="section-label">Flow</p>
              <h2 className="mt-4 text-display-3 text-ink font-black">
                ご登録から報酬まで
              </h2>
            </div>
            <p className="md:max-w-sm text-sm text-ink-soft leading-relaxed font-medium">
              4ステップ。難しい手続きはありません。
            </p>
          </div>

          <div className="relative mt-16">
            {/* Connecting line */}
            <div
              aria-hidden="true"
              className="absolute left-0 right-0 top-7 hidden h-[2px] bg-ink-line lg:block"
            />

            <ol className="grid gap-10 lg:grid-cols-4">
              {steps.map((s, i) => (
                <li key={s.number} className="relative">
                  <Reveal delay={i * 80}>
                    <div className="flex flex-col items-start">
                      <div className="relative z-10 flex h-14 w-14 items-center justify-center rounded-full bg-brand-500 font-display text-lg font-black text-white shadow-card">
                        {s.number}
                      </div>
                      <h3 className="mt-6 text-lg md:text-xl font-black text-ink leading-tight">
                        {s.title}
                      </h3>
                      <p className="mt-3 text-sm md:text-base leading-relaxed text-ink-soft font-medium">
                        {s.description}
                      </p>
                    </div>
                  </Reveal>
                </li>
              ))}
            </ol>
          </div>
        </Container>
      </section>

      {/* ───── Personas ───── */}
      <section className="bg-white py-28 md:py-36 border-t border-ink-line">
        <Container>
          <div className="grid items-start gap-12 lg:grid-cols-12">
            <div className="lg:col-span-4 lg:sticky lg:top-28">
              <p className="section-label">Who</p>
              <h2 className="mt-4 text-display-3 text-ink font-black">
                こんな方が
                <br />
                活躍しています
              </h2>
              <p className="mt-6 text-base text-ink-soft leading-relaxed font-medium">
                経歴・職種は問いません。「人をつなぐ価値」を信じられる方であれば、どなたでもご参加いただけます。
              </p>
            </div>

            <ul className="lg:col-span-8 space-y-4">
              {personas.map((p, i) => (
                <li key={p.title}>
                  <Reveal delay={i * 80}>
                    <div className="group flex items-start gap-6 rounded-xl3 border border-ink-line bg-cream/40 p-8 md:p-10 transition hover:border-brand-500 hover:bg-cream">
                      <div className="shrink-0">
                        <span className="font-display text-3xl md:text-4xl font-black text-brand-500">
                          {p.emoji}
                        </span>
                      </div>
                      <div>
                        <h3 className="text-lg md:text-xl font-black text-ink leading-tight">
                          {p.title}
                        </h3>
                        <p className="mt-3 text-sm md:text-base leading-relaxed text-ink-soft font-medium">
                          {p.body}
                        </p>
                      </div>
                    </div>
                  </Reveal>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      {/* ───── FAQ ───── */}
      <section className="bg-cream py-28 md:py-36">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <p className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.22em] text-brand-500">
                <span>FAQ</span>
                <Squiggle className="h-3 w-10" />
              </p>
              <h2 className="mt-4 text-display-3 text-ink font-black">
                よくある
                <br />
                ご質問
              </h2>
              <p className="mt-6 text-sm text-ink-muted leading-relaxed">
                その他のご質問は{" "}
                <Link
                  href={localePath("/contact", locale)}
                  className="font-bold underline underline-offset-4 text-ink hover:text-brand-600"
                >
                  お問い合わせ
                </Link>
                からどうぞ。
              </p>
            </div>

            <div className="lg:col-span-8">
              <ul className="space-y-3">
                {faqs.map((f) => (
                  <li
                    key={f.q}
                    className="rounded-xl2 border border-ink-line bg-white"
                  >
                    <details className="group">
                      <summary className="flex cursor-pointer items-start justify-between gap-4 p-6 list-none">
                        <span className="flex gap-4">
                          <span
                            aria-hidden="true"
                            className="font-display text-lg font-black text-brand-500"
                          >
                            Q.
                          </span>
                          <span className="text-base md:text-lg font-bold text-ink leading-snug">
                            {f.q}
                          </span>
                        </span>
                        <span
                          aria-hidden="true"
                          className="mt-1 grid h-7 w-7 shrink-0 place-items-center rounded-full border-2 border-ink-line text-ink-muted transition group-open:rotate-45 group-open:border-brand-500 group-open:text-brand-500"
                        >
                          +
                        </span>
                      </summary>
                      <div className="border-t border-ink-line p-6 pt-5 text-sm md:text-base leading-relaxed text-ink-soft font-medium">
                        <span
                          aria-hidden="true"
                          className="mr-2 font-display text-lg font-black text-ink-muted"
                        >
                          A.
                        </span>
                        {f.a}
                      </div>
                    </details>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>

      {/* ───── CTA ───── */}
      <section className="py-28 md:py-36">
        <Container>
          <div className="relative overflow-hidden rounded-xl4 bg-ink px-8 py-20 md:px-16 md:py-24 text-white">
            <div
              aria-hidden="true"
              className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-brand-500/30 blur-3xl"
            />
            <div
              aria-hidden="true"
              className="absolute -bottom-24 -left-24 h-80 w-80 rounded-full bg-brand-500/20 blur-3xl"
            />
            <DotsDecoration className="absolute right-8 top-8 h-16 w-16 text-brand-500 opacity-70" />

            <div className="relative grid items-center gap-12 lg:grid-cols-12">
              <div className="lg:col-span-7">
                <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-brand-500">
                  Apply now / 無料登録
                </p>
                <h2 className="mt-5 font-display text-[clamp(2rem,5vw,3.5rem)] font-black leading-[1.1] tracking-tight">
                  最短3分。
                  <br />
                  あなたの人脈を、
                  <br />
                  <span className="text-brand-500">資産に変える。</span>
                </h2>
                <p className="mt-8 max-w-lg text-base md:text-lg leading-relaxed text-white/80 font-medium">
                  ご登録後、当社の担当者よりご連絡いたします。費用や継続義務はありません。
                </p>
              </div>

              <div className="lg:col-span-5 flex flex-col gap-3 lg:items-end">
                <Button
                  href={registerHref}
                  size="lg"
                  className="bg-brand-500 text-white hover:bg-brand-600 shadow-[0_18px_40px_-12px_rgba(245,130,32,0.7)]"
                >
                  無料でパートナー登録する
                </Button>
                <Button
                  href={localePath("/contact", locale)}
                  size="lg"
                  variant="ghost"
                  className="!text-white border-2 border-white/40 hover:!bg-white/10"
                >
                  まずは問い合わせる
                </Button>
                <p className="mt-3 text-xs text-white/60 lg:text-right">
                  ※ 18歳未満および高校生はご登録いただけません。
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
