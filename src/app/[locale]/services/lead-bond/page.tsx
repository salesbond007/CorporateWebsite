import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbJsonLd } from "@/lib/jsonld";
import { services } from "@/lib/site";
import { localePath } from "@/i18n/path";
import { isLocale, locales } from "@/i18n/config";

const SERVICE_SLUG = "lead-bond";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const metadata: Metadata = {
  title:
    "BtoB営業支援サービス｜戦略立案から成約まで一気通貫で伴走する営業支援",
  description:
    "営業戦略の策定からアポ獲得・商談・成約、営業DX・人材紹介まで。BtoBに特化し、必要な営業ソリューションをワンストップで提供。最短2週間で稼働し、自走できる営業組織づくりまで伴走します。",
};

type Problem = { icon: string; text: string };

const problems: Problem[] = [
  { icon: "🚀", text: "新規事業を立ち上げたが、何から営業を始めればいいか分からない" },
  { icon: "⚡", text: "採用が間に合わず、売上機会を逃している" },
  { icon: "👥", text: "既存メンバーが手一杯で、新規開拓ができない" },
  { icon: "🎯", text: "大手企業を開拓したいが、ルートもノウハウもない" },
  { icon: "📊", text: "トップセールス頼みで、再現性のある営業組織になっていない" },
  { icon: "🤖", text: "AIや営業DXを進めたいが、社内に推進できる人材がいない" },
];

type FlowPhase = { step: string; title: string };

const phases: FlowPhase[] = [
  { step: "01", title: "戦略策定" },
  { step: "02", title: "アポ獲得" },
  { step: "03", title: "商談" },
  { step: "04", title: "成約" },
  { step: "05", title: "DX / 人材紹介" },
];

type Reason = { number: string; title: string; body: string };

const reasons: Reason[] = [
  {
    number: "01",
    title: "戦略から成約まで一気通貫",
    body: "「リード獲得だけ」「商談だけ」ではなく、戦略設計から成約・仕組み化まで責任を持って伴走します。",
  },
  {
    number: "02",
    title: "大手企業の開拓実績",
    body: "エンタープライズ攻略のノウハウと人脈を保有。自社では届かない層へアプローチできます。",
  },
  {
    number: "03",
    title: "AIによる再現性の構築",
    body: "属人化しがちな営業活動を AI で型化。ノウハウが個人ではなく組織に残ります。",
  },
  {
    number: "04",
    title: "最短2週間で稼働開始",
    body: "採用・育成を待たず、即戦力チームでスピーディーに売上創出を始められます。",
  },
];

type Detail = { number: string; title: string; items: string[] };

const details: Detail[] = [
  {
    number: "01",
    title: "営業戦略策定",
    items: [
      "ターゲット顧客(ICP)の定義",
      "営業プロセス・KPI設計",
      "トークスクリプト / 提案資料作成",
      "競合分析・勝ち筋の言語化",
    ],
  },
  {
    number: "02",
    title: "アポイント獲得",
    items: [
      "ターゲットリスト作成",
      "インサイドセールス実行",
      "大手企業の決裁者アプローチ",
      "ナーチャリング・追客",
    ],
  },
  {
    number: "03",
    title: "商談実行",
    items: [
      "商談代行(オンライン / 対面)",
      "ヒアリング・提案・見積もり",
      "顧客課題に応じたソリューション提案",
    ],
  },
  {
    number: "04",
    title: "クロージング・成約",
    items: [
      "意思決定者へのアプローチ",
      "受注クロージング",
      "契約締結サポート",
    ],
  },
  {
    number: "05",
    title: "営業DX・人材紹介(オプション)",
    items: [
      "AIを活用した営業の型化",
      "SFA / CRM 導入・運用支援",
      "営業人材の紹介・採用支援",
      "ノウハウの社内移管",
    ],
  },
];

type Step = { digit: string; title: string; body: string; period: string };

const steps: Step[] = [
  {
    digit: "01",
    title: "お問い合わせ・無料相談",
    body: "貴社の課題・ターゲット像をオンライン(約60分)でヒアリングします。",
    period: "当日〜",
  },
  {
    digit: "02",
    title: "ご提案・お見積り",
    body: "課題に合わせた支援内容と体制、お見積りをご提示します。",
    period: "数日",
  },
  {
    digit: "03",
    title: "契約・キックオフ",
    body: "支援範囲・KPI・体制を確定し、プロジェクトの初動を設計します。",
    period: "1週間程度",
  },
  {
    digit: "04",
    title: "プロジェクト開始",
    body: "即戦力チームが稼働開始。戦略実行・アポ獲得・商談を進めます。",
    period: "最短2週間",
  },
  {
    digit: "05",
    title: "定例MTG・改善・成果創出",
    body: "定例で数値を振り返り、改善を重ねながら成果を最大化します。",
    period: "継続",
  },
];

type Faq = { q: string; a: string };

const faqs: Faq[] = [
  {
    q: "どんな業界・商材に対応できますか?",
    a: "BtoB領域を中心に、無形商材・有形商材問わず幅広く対応しています。まずは無料相談で貴社の商材・ターゲットをお聞かせください。",
  },
  {
    q: "大手企業の開拓は本当にできますか?",
    a: "エンタープライズ攻略のノウハウと人脈を活かし、決裁者・役員クラスへのアプローチを行います。貴社単独では届きにくい層への接点創出を支援します。",
  },
  {
    q: "最短どのくらいで稼働できますか?",
    a: "契約・キックオフ後、最短2週間で稼働を開始できます。採用・育成を待たずに即戦力チームで動き出せます。",
  },
  {
    q: "契約期間の縛りはありますか?",
    a: "支援内容により異なります。スポットでの単発支援から継続的な伴走まで、貴社の状況に合わせて柔軟に設計します。",
  },
  {
    q: "自社の営業チームに引き継ぎ可能ですか?",
    a: "はい。AIによる型化やノウハウの社内移管を前提に支援するため、最終的に自走できる営業組織づくりまで見据えて伴走します。",
  },
  {
    q: "費用感はどのくらいですか?",
    a: "支援範囲(戦略・アポ・商談・DX等)や体制により変動します。貴社の課題・予算に合わせて柔軟にカスタマイズしますので、まずは無料相談でご相談ください。",
  },
];

// 実績ロゴはプレースホルダー。差し替え時はここを実ロゴに置き換える。
const logoPlaceholders = Array.from({ length: 7 }, (_, i) => `LOGO ${i + 1}`);

export default function SalesSupportPage({
  params,
}: {
  params: { locale: string };
}) {
  if (!isLocale(params.locale)) notFound();
  const locale = params.locale;
  const service = services.find((s) => s.slug === SERVICE_SLUG);
  if (!service) notFound();

  const contactHref = localePath("/contact", locale);

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "ホーム", url: localePath("/", locale) },
          { name: "サービス紹介", url: localePath("/services", locale) },
          {
            name: service.title,
            url: localePath(`/services/${SERVICE_SLUG}`, locale),
          },
        ])}
      />

      {/* ───── Hero ───── */}
      <section className="relative overflow-hidden bg-ink text-white">
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage:
              "radial-gradient(rgba(255,255,255,0.7) 1px, transparent 1px)",
            backgroundSize: "22px 22px",
          }}
        />
        <div
          aria-hidden="true"
          className="absolute -top-32 -right-20 h-[520px] w-[520px] rounded-full bg-brand-500/30 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="absolute -bottom-40 -left-32 h-[440px] w-[440px] rounded-full bg-brand-500/15 blur-3xl"
        />

        <Container className="relative py-20 md:py-24 lg:py-28">
          <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-7">
              <p className="inline-flex items-center gap-2 border border-white/40 bg-white/10 px-3 py-1 text-xs md:text-sm font-extrabold tracking-[0.16em] uppercase text-white backdrop-blur-sm">
                <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-yellow-300" />
                BtoB営業支援サービス
              </p>

              <h1 className="mt-6 font-display font-black leading-[1.15] tracking-tight text-white text-[clamp(2.25rem,5.5vw,4rem)]">
                その営業課題、
                <br />
                <span className="relative inline-block">
                  私たちが引き受けます
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-0 -bottom-1 h-2 bg-brand-500/90"
                  />
                </span>
                。
              </h1>

              <p className="mt-8 max-w-xl text-base md:text-lg leading-[1.95] text-white/85 font-medium">
                戦略立案から成約、DX化まで。
                <br className="hidden md:block" />
                必要なソリューションを、ワンストップで。
              </p>

              <ul className="mt-8 flex flex-wrap gap-3">
                {[
                  "戦略から成約まで一気通貫",
                  "大手企業の開拓実績",
                  "最短2週間で稼働開始",
                ].map((badge) => (
                  <li
                    key={badge}
                    className="inline-flex items-center gap-2 border border-white/25 bg-white/[0.06] px-4 py-2 text-xs md:text-sm font-bold text-white backdrop-blur-sm"
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 18 18"
                      fill="none"
                      aria-hidden="true"
                      className="shrink-0"
                    >
                      <circle cx="9" cy="9" r="8" fill="#F58220" />
                      <path
                        d="M5 9.5l3 3 5-6"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    {badge}
                  </li>
                ))}
              </ul>

              <div className="mt-10">
                <Button
                  href={contactHref}
                  size="lg"
                  className="bg-brand-500 text-white hover:bg-brand-600 shadow-[0_24px_50px_-12px_rgba(245,130,32,0.7)]"
                >
                  無料相談はこちら
                </Button>
              </div>
            </div>

            {/* Right: visual placeholder */}
            <div className="lg:col-span-5">
              <div className="relative mx-auto aspect-[4/3] w-full overflow-hidden rounded-2xl border border-white/15 bg-white/[0.04] backdrop-blur-sm">
                <div
                  aria-hidden="true"
                  className="absolute inset-0 grid place-items-center"
                >
                  <span className="text-xs font-bold tracking-[0.2em] uppercase text-white/40">
                    Image
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ───── Problems ───── */}
      <section className="bg-cream py-24 md:py-32">
        <Container>
          <div className="text-center">
            <h2 className="text-display-3 text-ink font-black leading-tight">
              こんなお悩みは
              <br className="md:hidden" />
              ありませんか?
            </h2>
          </div>

          <ul className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3 md:gap-6">
            {problems.map((p, i) => (
              <li key={p.text}>
                <Reveal delay={(i % 3) * 80} className="h-full">
                  <div className="flex h-full items-start gap-4 rounded-2xl border border-ink-line bg-white p-6 md:p-7">
                    <span aria-hidden="true" className="text-3xl leading-none">
                      {p.icon}
                    </span>
                    <p className="text-sm md:text-base font-bold leading-relaxed text-ink">
                      {p.text}
                    </p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>

          <div className="mt-14 text-center">
            <p className="text-lg md:text-xl font-black text-ink">
              その課題、すべて
              <span className="text-brand-500">ワンストップ</span>
              で解決します。
            </p>
            <div className="mt-6">
              <Button href={contactHref} size="lg">
                無料相談で課題整理から始める
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* ───── Service overview (flow) ───── */}
      <section className="bg-white py-24 md:py-32">
        <Container>
          <div className="text-center">
            <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-brand-500">
              Service
            </p>
            <h2 className="mt-3 text-display-3 text-ink font-black leading-tight">
              戦略から成約、その先まで。
              <br />
              営業のすべてを伴走。
            </h2>
          </div>

          <ol className="mt-14 flex flex-col items-stretch gap-3 lg:flex-row lg:items-center lg:gap-2">
            {phases.map((p, i) => (
              <li key={p.step} className="flex flex-1 items-center gap-2">
                <div className="flex-1 rounded-2xl border-2 border-ink bg-white px-4 py-6 text-center">
                  <p className="font-display text-2xl md:text-3xl font-black leading-none text-brand-500">
                    {p.step}
                  </p>
                  <p className="mt-3 text-sm md:text-base font-black text-ink leading-snug">
                    {p.title}
                  </p>
                </div>
                {i < phases.length - 1 ? (
                  <span aria-hidden="true" className="shrink-0 text-brand-500">
                    <svg
                      width="22"
                      height="22"
                      viewBox="0 0 22 22"
                      fill="none"
                      className="hidden lg:block"
                    >
                      <path
                        d="M4 11h13M12 5l6 6-6 6"
                        stroke="currentColor"
                        strokeWidth="2.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <svg
                      width="22"
                      height="22"
                      viewBox="0 0 22 22"
                      fill="none"
                      className="mx-auto block lg:hidden"
                    >
                      <path
                        d="M11 4v13M5 12l6 6 6-6"
                        stroke="currentColor"
                        strokeWidth="2.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                ) : null}
              </li>
            ))}
          </ol>

          <div className="mx-auto mt-12 max-w-3xl border-l-4 border-brand-500 bg-cream/60 px-6 py-6 md:px-8">
            <p className="text-base md:text-lg leading-[1.95] text-ink font-medium">
              単なる「営業代行」ではありません。
              <br className="hidden md:block" />
              戦略を描き、現場で売り、AI で型を残す。
              <span className="font-black">
                「自走できる営業組織」
              </span>
              をつくる支援サービスです。
            </p>
          </div>
        </Container>
      </section>

      {/* ───── Reasons ───── */}
      <section className="bg-cream py-24 md:py-32">
        <Container>
          <div className="text-center">
            <h2 className="text-display-3 text-ink font-black leading-tight">
              選ばれる4つの理由
            </h2>
          </div>

          <ul className="mx-auto mt-16 grid max-w-5xl gap-6 md:grid-cols-2 md:gap-8">
            {reasons.map((r, i) => (
              <li key={r.number}>
                <Reveal delay={(i % 2) * 80} className="h-full">
                  <div className="h-full rounded-2xl border-2 border-ink bg-white p-8 md:p-10">
                    <p className="font-display text-4xl md:text-5xl font-black leading-none text-brand-500">
                      {r.number}
                    </p>
                    <h3 className="mt-5 text-lg md:text-xl font-black text-ink leading-snug">
                      {r.title}
                    </h3>
                    <p className="mt-4 text-sm md:text-base leading-relaxed text-ink-soft font-medium">
                      {r.body}
                    </p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* ───── Details ───── */}
      <section className="bg-white py-24 md:py-32">
        <Container>
          <div className="text-center">
            <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-brand-500">
              Details
            </p>
            <h2 className="mt-3 text-display-3 text-ink font-black leading-tight">
              サービス内容
            </h2>
          </div>

          <ul className="mx-auto mt-12 max-w-3xl space-y-3">
            {details.map((d, i) => (
              <li key={d.number} className="rounded-2xl border border-ink-line bg-white">
                <details className="group" open={i === 0}>
                  <summary className="flex cursor-pointer list-none items-center gap-4 p-6">
                    <span className="font-display text-2xl md:text-3xl font-black leading-none text-brand-500 tabular-nums">
                      {d.number}
                    </span>
                    <span className="flex-1 text-base md:text-lg font-black text-ink leading-snug">
                      {d.title}
                    </span>
                    <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full border-2 border-ink-line text-ink-muted transition group-open:rotate-45 group-open:border-brand-500 group-open:text-brand-500">
                      +
                    </span>
                  </summary>
                  <ul className="border-t border-ink-line px-6 py-5 pl-[4.25rem] space-y-2.5">
                    {d.items.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2.5 text-sm md:text-base text-ink-soft font-medium"
                      >
                        <svg
                          width="18"
                          height="18"
                          viewBox="0 0 18 18"
                          fill="none"
                          aria-hidden="true"
                          className="mt-1 shrink-0"
                        >
                          <circle cx="9" cy="9" r="8" fill="#F58220" />
                          <path
                            d="M5 9.5l3 3 5-6"
                            stroke="white"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        {item}
                      </li>
                    ))}
                  </ul>
                </details>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* ───── Cases (logo marquee) ───── */}
      <section className="overflow-hidden bg-cream py-24 md:py-32">
        <Container>
          <div className="text-center">
            <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-brand-500">
              Clients
            </p>
            <h2 className="mt-3 text-display-3 text-ink font-black leading-tight">
              導入企業
            </h2>
          </div>
        </Container>

        {/* Marquee: items duplicated so the -50% translate loops seamlessly */}
        <div
          className="relative mt-12 overflow-hidden"
          aria-label="導入企業ロゴ一覧"
        >
          <ul className="flex w-max gap-6 md:gap-8 animate-marquee">
            {[...Array(2)].flatMap((_, dup) =>
              logoPlaceholders.map((label, i) => (
                <li
                  key={`${dup}-${i}`}
                  aria-hidden={dup === 1 ? "true" : undefined}
                  className="flex h-20 w-44 md:h-24 md:w-52 shrink-0 items-center justify-center rounded-xl border border-ink-line bg-white"
                >
                  <span className="text-xs font-bold tracking-[0.2em] uppercase text-ink-muted/60">
                    {label}
                  </span>
                </li>
              )),
            )}
          </ul>
        </div>

        <Container>
          <p className="mt-10 text-center text-xs text-ink-muted">
            ※ 掲載企業ロゴは準備中です。順次公開いたします。
          </p>
        </Container>
      </section>

      {/* ───── Flow ───── */}
      <section className="bg-white py-24 md:py-32">
        <Container>
          <div className="text-center">
            <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-brand-500">
              Flow
            </p>
            <h2 className="mt-3 text-display-3 text-ink font-black leading-tight">
              ご利用までの流れ
            </h2>
          </div>

          <ol className="mx-auto mt-14 max-w-3xl">
            {steps.map((s, i) => (
              <li key={s.digit} className="relative flex gap-5 pb-10 last:pb-0">
                {/* timeline line */}
                {i < steps.length - 1 ? (
                  <span
                    aria-hidden="true"
                    className="absolute left-6 top-12 h-[calc(100%-3rem)] w-px bg-ink-line"
                  />
                ) : null}
                <span className="relative z-10 grid h-12 w-12 shrink-0 place-items-center rounded-full bg-brand-500 font-display text-lg font-black text-white">
                  {s.digit}
                </span>
                <Reveal className="flex-1">
                  <div className="rounded-2xl border border-ink-line bg-white p-6">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <h3 className="text-base md:text-lg font-black text-ink">
                        {s.title}
                      </h3>
                      <span className="rounded-full bg-brand-50 px-3 py-1 text-xs font-bold text-brand-600">
                        {s.period}
                      </span>
                    </div>
                    <p className="mt-3 text-sm md:text-base leading-relaxed text-ink-soft font-medium">
                      {s.body}
                    </p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {/* ───── FAQ ───── */}
      <section className="bg-cream py-24 md:py-32">
        <Container>
          <div className="text-center">
            <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-brand-500">
              FAQ
            </p>
            <h2 className="mt-3 text-display-3 text-ink font-black leading-tight">
              よくあるご質問
            </h2>
          </div>

          <ul className="mx-auto mt-12 max-w-3xl space-y-3">
            {faqs.map((f) => (
              <li key={f.q} className="rounded-2xl border border-ink-line bg-white">
                <details className="group">
                  <summary className="flex cursor-pointer items-start justify-between gap-4 p-6 list-none">
                    <span className="flex gap-3">
                      <span className="font-display text-lg font-black text-brand-500">
                        Q.
                      </span>
                      <span className="text-base md:text-lg font-bold text-ink leading-snug">
                        {f.q}
                      </span>
                    </span>
                    <span className="mt-1 grid h-7 w-7 shrink-0 place-items-center rounded-full border-2 border-ink-line text-ink-muted transition group-open:rotate-45 group-open:border-brand-500 group-open:text-brand-500">
                      +
                    </span>
                  </summary>
                  <div className="border-t border-ink-line p-6 pt-5 text-sm md:text-base leading-relaxed text-ink-soft font-medium">
                    <span className="mr-2 font-display text-lg font-black text-ink-muted">
                      A.
                    </span>
                    {f.a}
                  </div>
                </details>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* ───── Final CTA ───── */}
      <section className="py-24 md:py-32">
        <Container>
          <div className="relative overflow-hidden rounded-2xl bg-ink px-8 py-16 md:px-16 md:py-20 text-white">
            <div
              aria-hidden="true"
              className="absolute -right-32 -top-32 h-96 w-96 bg-brand-500/30 blur-3xl"
            />
            <div
              aria-hidden="true"
              className="absolute -bottom-24 -left-24 h-80 w-80 bg-brand-500/20 blur-3xl"
            />

            <div className="relative text-center">
              <h2 className="font-display text-[clamp(1.75rem,4vw,3rem)] font-black leading-[1.15] tracking-tight">
                営業の課題は、
                <br className="md:hidden" />
                <span className="text-brand-500">抱え込まないでください。</span>
              </h2>
              <p className="mx-auto mt-6 max-w-xl text-sm md:text-base leading-relaxed text-white/85 font-medium">
                戦略から成約まで、まるごとお任せください。貴社の状況に最適な解決策をご提案します。
              </p>
              <div className="mt-10 flex justify-center">
                <Button
                  href={contactHref}
                  size="lg"
                  className="bg-brand-500 text-white hover:bg-brand-600 shadow-[0_18px_40px_-12px_rgba(245,130,32,0.7)] !h-14 md:w-72"
                >
                  無料相談はこちら
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
