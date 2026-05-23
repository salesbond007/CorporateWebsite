import type { Metadata } from "next";
import Image from "next/image";
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
    "BtoB営業支援サービス｜新規開拓から成約までサポートする営業支援",
  description:
    "営業戦略の策定からアポ獲得・商談・成約まで。BtoBに特化し、必要な営業ソリューションをワンストップで提供。最短2週間で稼働し、自走できる営業組織づくりまで伴走します。",
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
];

type Step = {
  digit: string;
  titleTop: string;
  titleBottom?: string;
  body: string;
  period?: string;
};

const steps: Step[] = [
  {
    digit: "01",
    titleTop: "無料相談・",
    titleBottom: "お問い合わせ",
    body: "まずはお気軽にお問い合わせください。",
  },
  {
    digit: "02",
    titleTop: "ヒアリング",
    body: "お持ちの課題感や改善したい点をざっくばらんにご相談ください。",
    period: "お問い合わせ後、最短即日",
  },
  {
    digit: "03",
    titleTop: "ご提案",
    body: "お伺いした課題をもとに、具体的な成果シミュレーションをご提案します。",
    period: "無料相談後、3日〜1週間前後",
  },
  {
    digit: "04",
    titleTop: "お見積り・",
    titleBottom: "ご契約",
    body: "お見積り内容をご確認いただいた後に、契約締結を実施します。",
  },
  {
    digit: "05",
    titleTop: "キックオフ",
    titleBottom: "ミーティング",
    body: "支援体制準備のため、プロジェクトの最終要件をすり合わせます。",
    period: "契約から、3日〜1週間前後",
  },
  {
    digit: "06",
    titleTop: "プロジェクト",
    titleBottom: "セットアップ",
    body: "専任チームを組成。ターゲットリスト・スクリプト・業務ツールの整備を行います。",
    period: "契約から、最短2週間",
  },
  {
    digit: "07",
    titleTop: "稼働開始・",
    titleBottom: "施策改善",
    body: "プロジェクトをスタート。週1回の定例会を実施し、成果を最大化します。",
    period: "最短2週間で稼働開始",
  },
];

function StepIcon({ index }: { index: number }) {
  const common = {
    width: 40,
    height: 40,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.6,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };
  switch (index) {
    case 0:
      return (
        <svg {...common}>
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <path d="M3 7l9 6 9-6" />
        </svg>
      );
    case 1:
      return (
        <svg {...common}>
          <path d="M4 5h16v10H9l-4 4v-4H4z" />
        </svg>
      );
    case 2:
      return (
        <svg {...common}>
          <path d="M9 18h6M10 21h4" />
          <path d="M12 3a6 6 0 00-3.5 10.9c.4.3.5.6.5 1.1h6c0-.5.1-.8.5-1.1A6 6 0 0012 3z" />
        </svg>
      );
    case 3:
      return (
        <svg {...common}>
          <path d="M7 3h8l4 4v14H7z" />
          <path d="M15 3v4h4" />
        </svg>
      );
    case 4:
      return (
        <svg {...common}>
          <path d="M6 21V4" />
          <path d="M6 4h11l-2.5 4L17 12H6" />
        </svg>
      );
    case 5:
      return (
        <svg {...common}>
          <path d="M12 3l9 5-9 5-9-5 9-5z" />
          <path d="M3 13l9 5 9-5" />
        </svg>
      );
    default:
      return (
        <svg {...common}>
          <path d="M4 19h16" />
          <path d="M7 16v-4M12 16V8M17 16v-6" />
        </svg>
      );
  }
}

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
    a: "支援範囲(戦略・アポ・商談等)や体制により変動します。貴社の課題・予算に合わせて柔軟にカスタマイズしますので、まずは無料相談でご相談ください。",
  },
];

// 導入企業ロゴ。src があれば実ロゴ、無ければプレースホルダー表示。
// 追加時はここに { name, src } を足す。
type ClientLogo = { name: string; src?: string };
const logos: ClientLogo[] = [
  { name: "導入企業ロゴ", src: "https://i.imgur.com/ksEvm8K.png" },
  { name: "導入企業ロゴ", src: "https://i.imgur.com/49U009p.png" },
  { name: "導入企業ロゴ", src: "https://i.imgur.com/Yk8CM9h.png" },
  { name: "導入企業ロゴ", src: "https://i.imgur.com/VLnqY2m.png" },
  { name: "導入企業ロゴ", src: "https://i.imgur.com/mzYHaa1.png" },
  { name: "導入企業ロゴ", src: "https://i.imgur.com/cGzkTEY.png" },
  { name: "導入企業ロゴ", src: "https://i.imgur.com/CSrtRVU.png" },
  { name: "導入企業ロゴ", src: "https://i.imgur.com/0ZZYyYI.png" },
  { name: "導入企業ロゴ", src: "https://i.imgur.com/DcgcrQR.png" },
];

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

      {/* ───── Hero (light) ───── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-cream via-white to-brand-50">
        <div
          aria-hidden="true"
          className="absolute -top-32 right-[-10%] h-[460px] w-[460px] rounded-full bg-brand-200/40 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="absolute -bottom-40 -left-32 h-[380px] w-[380px] rounded-full bg-brand-100/60 blur-3xl"
        />

        <Container className="relative py-16 md:py-20 lg:py-24">
          <div className="max-w-3xl">
            <p className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-white px-4 py-1.5 text-xs md:text-sm font-extrabold tracking-wide text-brand-600 shadow-sm">
              <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-brand-500" />
              BtoB営業支援サービス
            </p>

            <h1 className="mt-6 font-display font-black leading-[1.22] tracking-tight text-ink text-[clamp(1.875rem,4.2vw,3.25rem)]">
              短期の
              <span className="text-brand-500">成約数向上</span>
              にコミットする
              <br />
              伴走型営業支援サービス
            </h1>
            <p className="mt-5 text-base md:text-xl font-black text-ink-soft leading-snug">
              戦略の立案からアポ獲得 / 商談まで
            </p>

            <ul className="mt-8 space-y-3.5">
              {[
                "戦略立案・アポ獲得・商談・成約まで一気通貫で支援",
                "大手企業の開拓ノウハウで、再現性のある売上を創出",
              ].map((b) => (
                <li key={b} className="flex items-start gap-3">
                  <span
                    aria-hidden="true"
                    className="mt-2 h-2.5 w-2.5 shrink-0 rounded-full bg-brand-500"
                  />
                  <span className="text-base md:text-lg font-bold text-ink leading-relaxed">
                    {b}
                  </span>
                </li>
              ))}
            </ul>

            <div className="mt-10 flex flex-wrap gap-3">
              <Button
                href={contactHref}
                size="lg"
                className="!bg-[#FF8A1E] hover:!bg-brand-500 shadow-[0_18px_40px_-12px_rgba(255,138,30,0.6)]"
              >
                資料請求 / 無料相談
              </Button>
              <Button href="#service" size="lg" variant="secondary">
                サービス内容を見る
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* ───── Clients (logo marquee) ───── */}
      <section className="overflow-hidden border-b border-ink-line bg-white py-12 md:py-16">
        <Container>
          <p className="text-center text-xs font-extrabold uppercase tracking-[0.22em] text-ink-muted">
            導入企業
          </p>
        </Container>

        {/* Marquee: items duplicated so the -50% translate loops seamlessly */}
        <div
          className="relative mt-8 overflow-hidden"
          aria-label="導入企業ロゴ一覧"
        >
          <ul className="flex w-max gap-6 md:gap-8 animate-marquee">
            {[...Array(2)].flatMap((_, dup) =>
              logos.map((logo, i) => (
                <li
                  key={`${dup}-${i}`}
                  aria-hidden={dup === 1 ? "true" : undefined}
                  className="flex h-24 w-52 shrink-0 items-center justify-center rounded-xl border border-ink-line bg-white p-2.5 md:h-28 md:w-60"
                >
                  {logo.src ? (
                    <Image
                      src={logo.src}
                      alt={logo.name}
                      width={240}
                      height={110}
                      className="h-full w-full object-contain"
                    />
                  ) : (
                    <span className="text-xs font-bold tracking-[0.2em] uppercase text-ink-muted/60">
                      {logo.name}
                    </span>
                  )}
                </li>
              )),
            )}
          </ul>
        </div>
      </section>

      {/* ───── Problems ───── */}
      <section id="problems" className="scroll-mt-32 bg-cream py-24 md:py-32">
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
      <section id="service" className="scroll-mt-32 bg-white py-24 md:py-32">
        <Container>
          <div className="text-center">
            <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-brand-500">
              Service
            </p>
            <h2 className="mt-3 text-display-3 text-ink font-black leading-tight">
              戦略から成約まで、
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

          {/* Details */}
          <ul className="mx-auto mt-14 max-w-3xl space-y-3">
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
                  <ul className="space-y-2.5 border-t border-ink-line px-6 py-5 pl-[4.25rem]">
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

      {/* ───── Reasons ───── */}
      <section id="reasons" className="scroll-mt-32 bg-cream py-24 md:py-32">
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

      {/* ───── Flow ───── */}
      <section id="flow" className="scroll-mt-32 bg-white py-24 md:py-32">
        <Container>
          <div className="text-center">
            <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-brand-500">
              Support
            </p>
            <h2 className="mt-3 text-display-3 text-ink font-black leading-tight">
              支援の流れ
            </h2>
          </div>

          <ol className="mt-16 grid gap-x-5 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((s, i) => (
              <li key={s.digit}>
                <Reveal delay={(i % 4) * 60} className="h-full">
                  <div className="relative flex h-full flex-col items-center rounded-2xl border border-ink-line bg-cream/60 px-5 pb-6 pt-10 text-center">
                    {/* Number badge overlapping top edge */}
                    <span className="absolute -top-5 left-1/2 grid h-10 w-10 -translate-x-1/2 place-items-center rounded-full bg-brand-500 font-display text-sm font-black text-white shadow-card">
                      {s.digit}
                    </span>
                    {/* Icon */}
                    <span className="text-brand-400" aria-hidden="true">
                      <StepIcon index={i} />
                    </span>
                    {/* Title */}
                    <h3 className="mt-4 text-lg md:text-xl font-black leading-snug text-brand-600">
                      {s.titleTop}
                      {s.titleBottom ? (
                        <>
                          <br />
                          {s.titleBottom}
                        </>
                      ) : null}
                    </h3>
                    {/* Body */}
                    <p className="mt-3 text-sm leading-relaxed text-ink-soft font-medium">
                      {s.body}
                    </p>
                    {/* Period pill */}
                    {s.period ? (
                      <span className="mt-auto self-center rounded-md bg-white px-3 py-1.5 text-xs font-bold text-ink-muted">
                        {s.period}
                      </span>
                    ) : null}
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {/* ───── FAQ ───── */}
      <section id="faq" className="scroll-mt-32 bg-cream py-24 md:py-32">
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
                新規開拓から成約まで、まるごとお任せください。貴社の状況に最適な解決策をご提案します。
              </p>
              <div className="mt-10 flex justify-center">
                <Button
                  href={contactHref}
                  size="lg"
                  className="bg-brand-500 text-white hover:bg-brand-600 shadow-[0_18px_40px_-12px_rgba(245,130,32,0.7)] !h-14 md:w-72"
                >
                  お問い合わせ(無料)
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
