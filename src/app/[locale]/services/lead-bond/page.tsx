import type { Metadata } from "next";
import type { ReactNode } from "react";
import Image from "next/image";
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
    "セルボンド｜BtoB営業支援サービス｜新規開拓から成約までサポート",
  description:
    "営業戦略の策定からアポ獲得・商談・成約まで。BtoBに特化し、必要な営業ソリューションをワンストップで提供。最短2週間で稼働し、自走できる営業組織づくりまで伴走します。",
};

type Problem = { lines: [string, string, string]; highlight: string };

const problems: Problem[] = [
  { lines: ["早期に成果を出したいが", "営業人材が", "不足している"], highlight: "不足" },
  { lines: ["新規事業を立ち上げたが", "営業の進め方が", "決まらない"], highlight: "進め方" },
  { lines: ["営業組織を作りたいが", "何から手をつければ", "良いか分からない"], highlight: "何から" },
  { lines: ["外注を試したいが", "部分的な", "支援が多い"], highlight: "部分的な" },
  { lines: ["既存対応で手一杯で", "新規開拓まで", "手が回らない"], highlight: "新規開拓" },
];

function renderProblemLine(line: string, hl: string) {
  const idx = line.indexOf(hl);
  if (!hl || idx === -1) return line;
  return (
    <>
      {line.slice(0, idx)}
      <span className="text-sky-500">{hl}</span>
      {line.slice(idx + hl.length)}
    </>
  );
}

// Lucide-style business icons for each 課題 card.
function ProblemIcon({ index }: { index: number }) {
  const common = {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.6,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
    className: "h-14 w-14 md:h-16 md:w-16",
  };
  switch (index) {
    case 0:
      // 営業人材不足: ユーザー+×
      return (
        <svg {...common}>
          <circle cx="9" cy="8" r="3.5" />
          <path d="M3 20c0-3.8 2.8-6.5 6-6.5" />
          <path d="M15 14l6 6M21 14l-6 6" />
        </svg>
      );
    case 1:
      // 進め方が決まらない: ?マーク
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="9" />
          <path d="M9.5 9a2.5 2.5 0 1 1 3.5 2.3c-.9.4-1 1-1 1.7" />
          <circle cx="12" cy="17" r="0.7" fill="currentColor" />
        </svg>
      );
    case 2:
      // 何から手をつければ: 積み木(組織づくり)
      return (
        <svg {...common}>
          <rect x="3" y="13" width="8" height="8" rx="1" />
          <rect x="13" y="13" width="8" height="8" rx="1" />
          <rect x="8" y="3" width="8" height="8" rx="1" />
        </svg>
      );
    case 3:
      // 部分的な支援: パズルピース
      return (
        <svg {...common}>
          <path d="M14 4h6v6h-2a2 2 0 1 0 0 4h2v6h-6v-2a2 2 0 1 1-4 0v2H4v-6h2a2 2 0 1 0 0-4H4V4h6" />
        </svg>
      );
    default:
      // 手が回らない: 時計
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="9" />
          <path d="M12 7v5l3 2" />
        </svg>
      );
  }
}

type Point = {
  num: string;
  label: string;
  title: string[];
  body: string;
};

const points: Point[] = [
  {
    num: "01",
    label: "営業のすべてを伴走",
    title: [
      "戦略立案から成約、組織への定着まで。",
      "営業プロセスのすべてを一気通貫で支援",
    ],
    body: "戦略策定、アポ獲得、商談、クロージング、そして組織への定着まで。営業のすべての工程を一気通貫で支援することで、「点」の支援では生まれない、「線」としての成果創出を実現します。",
  },
  {
    num: "02",
    label: "課題に応じた柔軟なプラン設計",
    title: [
      "必要なときに、必要な支援だけを。",
      "課題に応じた柔軟なプラン設計",
    ],
    body: "アポイント不足にはインサイドセールスを、商談リソース不足にはフィールドセールスを。貴社の課題に応じて必要な支援だけを切り出し、組み合わせて提供する柔軟な体制を構築します。",
  },
  {
    num: "03",
    label: "大手企業/上場企業の開拓にも対応",
    title: ["大手企業/上場企業の開拓にも対応"],
    body: "立ち上げ期のスタートアップから、大手・上場企業の決裁者開拓まで対応。エンタープライズ攻略のノウハウと決裁者ネットワークを活かし、自社だけでは届かない層への接点創出も実現します。",
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

type Faq = { q: string; a: ReactNode };

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

  const faqs: Faq[] = [
    {
      q: "どんな業界・商材に対応できますか?",
      a: "BtoB領域を中心に、無形商材・有形商材問わず幅広く対応しています。まずは無料相談で貴社の商材・ターゲットをお聞かせください。",
    },
    {
      q: "大手企業の開拓は本当にできますか?",
      a: (
        <>
          弊社別サービスの
          <Link
            href={localePath("/services/sales-bond", locale)}
            className="font-bold text-sky-600 underline underline-offset-2 hover:text-sky-700"
          >
            リファボンド
          </Link>
          と組み合わせ開拓を行います。エンタープライズ攻略のノウハウと人脈を活かし、決裁者・役員クラスへのアプローチを実行。貴社単独では届きにくい層への接点創出を支援します。
        </>
      ),
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
      <section className="relative overflow-hidden bg-gradient-to-br from-sky-50 via-white to-sky-100">
        <div
          aria-hidden="true"
          className="absolute -top-32 right-[-10%] h-[480px] w-[480px] rounded-full bg-sky-200/60 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="absolute -bottom-40 -left-32 h-[420px] w-[420px] rounded-full bg-sky-300/40 blur-3xl"
        />

        <Container className="relative py-16 md:py-20 lg:py-24">
          <div className="max-w-3xl">
            <h1 className="font-display font-black leading-[1.15] tracking-tight text-ink">
              <span className="block text-[clamp(2.25rem,6vw,4.25rem)]">
                成約まで
                <span className="relative inline-block">
                  伴走
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-0 -bottom-1 h-1.5 bg-amber-400 md:h-2"
                  />
                </span>
                ！
              </span>
              <span className="mt-2 block">
                <span className="text-[clamp(1.125rem,2.8vw,1.75rem)]">
                  成長企業に選ばれる
                </span>
                <span className="text-[clamp(2rem,5vw,3.25rem)]">
                  営業支援サービス
                </span>
              </span>
            </h1>
            <p className="mt-6 text-base md:text-lg font-black text-ink-soft leading-snug">
              「戦略立案」「アポ獲得」「商談」「営業DX」など営業課題に応じて最適な支援が可能
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Button
                href={contactHref}
                size="lg"
                className="!h-[68px] w-full px-12 text-xl font-black !bg-[#0EA5E9] hover:!bg-sky-500 shadow-[0_22px_50px_-12px_rgba(14,165,233,0.85)] hover:-translate-y-1 md:!h-[80px] md:px-16 md:text-2xl sm:w-auto sm:min-w-[240px]"
              >
                資料請求
              </Button>
              <Button
                href={contactHref}
                size="lg"
                variant="secondary"
                className="!h-[68px] w-full px-12 text-xl font-black hover:-translate-y-1 md:!h-[80px] md:px-16 md:text-2xl sm:w-auto sm:min-w-[240px]"
              >
                無料相談
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* ───── Clients (logo marquee) ───── */}
      <section className="overflow-hidden border-b border-ink-line bg-white py-7 md:py-9">
        {/* Marquee: items duplicated so the -50% translate loops seamlessly */}
        <div className="relative overflow-hidden" aria-label="導入企業ロゴ一覧">
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
        </Container>

        {/* Wider than the default container so 5 cards keep reference-like width */}
        <ul className="mx-auto mt-16 grid max-w-[1440px] grid-cols-1 gap-x-5 gap-y-16 px-5 sm:grid-cols-2 lg:grid-cols-5">
            {problems.map((p, i) => (
              <li key={p.lines[0]}>
                <Reveal delay={(i % 5) * 60} className="h-full">
                  <div className="relative flex h-full flex-col items-center rounded-2xl border border-ink-line bg-white px-3 pb-5 pt-14 text-center shadow-sm">
                    {/* 課題 number badge with downward tail */}
                    <span className="absolute -top-7 left-1/2 -translate-x-1/2">
                      <span className="relative flex h-[72px] w-[72px] flex-col items-center justify-center rounded-full bg-sky-500 text-white shadow-card">
                        <span className="text-[11px] font-bold leading-none">課題</span>
                        <span className="font-display text-3xl font-black leading-none">
                          {i + 1}
                        </span>
                        <span
                          aria-hidden="true"
                          className="absolute -bottom-1 left-1/2 h-3.5 w-3.5 -translate-x-1/2 rotate-45 bg-sky-500"
                        />
                      </span>
                    </span>

                    {/* Themed business icon */}
                    <div
                      aria-hidden="true"
                      className="grid aspect-square w-full max-w-[104px] place-items-center rounded-xl bg-sky-50 text-sky-500"
                    >
                      <ProblemIcon index={i} />
                    </div>

                    {/* Title (always 3 lines) */}
                    <p className="mt-5 text-lg font-black leading-snug text-ink">
                      {p.lines.map((line, li) => (
                        <span key={li} className="block">
                          {renderProblemLine(line, p.highlight)}
                        </span>
                      ))}
                    </p>

                    {/* Down chevron */}
                    <span className="mt-auto pt-5 text-ink-line" aria-hidden="true">
                      <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
                        <path
                          d="M5 7l7 7 7-7M5 13l7 7 7-7"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                  </div>
                </Reveal>
              </li>
            ))}
        </ul>

        <Container>
          <div className="mt-16 text-center">
            <p className="text-lg md:text-xl font-black text-ink">
              その課題、すべて
              <span className="text-sky-500">ワンストップ</span>
              で解決します。
            </p>
          </div>
        </Container>
      </section>

      {/* ───── Solution ───── */}
      <section className="relative overflow-hidden bg-ink py-24 md:py-32 text-white">
        {/* Background photo + dark overlay */}
        <Image
          src="https://i.imgur.com/QMdMoAG.jpeg"
          alt=""
          aria-hidden="true"
          fill
          sizes="100vw"
          className="object-cover opacity-20"
        />
        <div aria-hidden="true" className="absolute inset-0 bg-ink/80" />
        <div
          aria-hidden="true"
          className="absolute -right-32 -top-24 h-96 w-96 rounded-full bg-sky-500/20 blur-3xl"
        />

        <Container className="relative">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            {/* Left: circular diagram */}
            <div className="relative mx-auto aspect-square w-full max-w-[420px]">
              <div
                aria-hidden="true"
                className="absolute inset-[14%] rounded-full border-2 border-dashed border-white/25"
              />
              {/* Center */}
              <div className="absolute left-1/2 top-1/2 grid h-28 w-28 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-sky-500 text-center shadow-[0_12px_40px_-8px_rgba(14,165,233,0.7)] md:h-32 md:w-32">
                <span className="font-display text-lg font-black leading-tight text-white md:text-xl">
                  セルボンド
                </span>
              </div>
              {/* Nodes */}
              {["戦略立案", "アポ獲得", "商談", "成約", "営業DX", "AI活用/定着"].map(
                (label, i, arr) => {
                  const angle = (i / arr.length) * Math.PI * 2 - Math.PI / 2;
                  const left = 50 + 38 * Math.cos(angle);
                  const top = 50 + 38 * Math.sin(angle);
                  return (
                    <div
                      key={label}
                      className="absolute -translate-x-1/2 -translate-y-1/2"
                      style={{ left: `${left}%`, top: `${top}%` }}
                    >
                      <div className="grid h-16 w-16 place-items-center rounded-full border border-white/40 bg-white/10 text-center backdrop-blur-sm md:h-[76px] md:w-[76px]">
                        <span className="px-1 text-[11px] font-bold leading-tight text-white md:text-xs">
                          {label}
                        </span>
                      </div>
                    </div>
                  );
                },
              )}
            </div>

            {/* Right: copy */}
            <div>
              <p className="text-lg font-bold text-white/90">セルボンドは</p>
              <h2 className="mt-3 font-display font-black leading-[1.4] text-white text-[clamp(1.5rem,3vw,2.5rem)]">
                <span className="relative inline-block">
                  新規開拓
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-0 -bottom-1 h-1.5 bg-amber-300"
                  />
                </span>
                から
                <span className="relative inline-block">
                  成約
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-0 -bottom-1 h-1.5 bg-amber-300"
                  />
                </span>
                、組織への定着まで営業のすべてに伴走する
              </h2>

              <span
                aria-hidden="true"
                className="mt-6 block h-1 w-16 rounded-full bg-sky-500"
              />

              <p className="mt-6 text-sm md:text-base leading-relaxed text-white/85 font-medium">
                営業は、
                <span className="font-black text-white">
                  戦略・実行・仕組み化
                </span>
                のどこか一つが欠けても成果になりません。多くの企業がそれぞれの工程を別の会社や部門に切り分けて発注し、結果として
                <span className="font-bold text-sky-300">「点」の支援</span>
                に終わってしまっています。セルボンドは、戦略立案からアポ獲得、商談、成約、そしてAIによる再現性の構築までを
                <span className="relative inline-block font-black text-sky-300">
                  一気通貫
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-0 -bottom-0.5 h-[3px] bg-amber-300"
                  />
                </span>
                で担う、
                <span className="font-black text-white">
                  BtoB特化の営業支援チーム
                </span>
                です。
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button
                  href={contactHref}
                  size="lg"
                  className="!bg-[#0EA5E9] hover:!bg-sky-500 shadow-[0_18px_40px_-12px_rgba(14,165,233,0.6)]"
                >
                  資料問い合わせ
                </Button>
                <Button
                  href={contactHref}
                  size="lg"
                  variant="ghost"
                  className="border-2 border-white/50 !text-white hover:!bg-white/10"
                >
                  無料相談
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ───── Overview (CORE + Options) ───── */}
      <section className="bg-white py-24 md:py-32">
        <Container>
          <div className="text-center">
            <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-sky-500">
              Overview
            </p>
            <h2 className="mt-3 text-display-3 text-ink font-black leading-tight">
              セルボンドの概要
            </h2>
            <p className="mx-auto mt-6 max-w-3xl text-sm md:text-base leading-relaxed text-ink-soft font-medium">
              セルボンドのコア(新規開拓〜成約)に、3つのオプションを組み合わせて提供します。
            </p>
          </div>

          {/* CORE band — main emphasis */}
          <div className="mx-auto mt-12 max-w-6xl">
            <div className="overflow-hidden rounded-3xl bg-sky-500 px-6 py-10 text-white shadow-[0_30px_60px_-20px_rgba(14,165,233,0.45)] md:px-12 md:py-14">
              <div className="flex flex-wrap items-center gap-4">
                <span className="inline-flex items-center rounded-full bg-white px-5 py-1.5 text-sm font-extrabold tracking-[0.18em] uppercase text-sky-600 md:text-base">
                  Core
                </span>
                <span className="text-xl md:text-3xl font-black">
                  <span className="relative inline-block">
                    新規開拓
                    <span
                      aria-hidden="true"
                      className="absolute inset-x-0 -bottom-1 h-1.5 bg-amber-300"
                    />
                  </span>
                  〜
                  <span className="relative inline-block">
                    成約
                    <span
                      aria-hidden="true"
                      className="absolute inset-x-0 -bottom-1 h-1.5 bg-amber-300"
                    />
                  </span>
                  までを一気通貫で支援
                </span>
              </div>
              <ol className="mt-8 flex flex-col items-stretch gap-3 md:flex-row md:items-center">
                {["戦略立案", "アポ獲得", "商談", "クロージング", "成約"].map(
                  (label, i, arr) => (
                    <li key={label} className="flex flex-1 items-center gap-2 md:gap-3">
                      <div className="flex-1 rounded-full bg-white px-4 py-3 text-center text-base font-black text-sky-700 shadow-sm md:py-4 md:text-lg">
                        {label}
                      </div>
                      {i < arr.length - 1 ? (
                        <span aria-hidden="true" className="shrink-0 text-white">
                          <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            className="hidden md:block"
                          >
                            <path
                              d="M4 12h14M13 6l6 6-6 6"
                              stroke="currentColor"
                              strokeWidth="2.2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                          <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            className="mx-auto block md:hidden"
                          >
                            <path
                              d="M12 4v14M6 13l6 6 6-6"
                              stroke="currentColor"
                              strokeWidth="2.2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </span>
                      ) : null}
                    </li>
                  ),
                )}
              </ol>
            </div>
          </div>

          {/* + connector */}
          <div className="my-8 flex justify-center md:my-10">
            <span
              aria-hidden="true"
              className="grid h-12 w-12 place-items-center rounded-full border-2 border-sky-300 bg-white font-black text-sky-500"
            >
              +
            </span>
          </div>

          {/* 3 options — secondary, smaller cards */}
          <p className="mx-auto mb-4 max-w-3xl text-center text-xs font-bold text-ink-muted md:text-sm">
            必要に応じて組み合わせ可能なオプション
          </p>
          <ul className="mx-auto grid max-w-3xl gap-3 sm:grid-cols-3">
            {(
              [
                {
                  num: "01",
                  title: "人材紹介",
                  subtitle: "アサイン型マッチング",
                  body: "実際にアサインした営業マンとの直接マッチング。エースをそのまま採用も可能。",
                  accentBorder: "border-sky-300",
                  accentBg: "bg-sky-100",
                  accentText: "text-sky-700",
                  href: undefined,
                },
                {
                  num: "02",
                  title: "営業DX",
                  subtitle: "CRM構築 / AI教育",
                  body: "SFA・CRMの構築から、AIを活用した営業教育・型化まで。自走化を加速。",
                  accentBorder: "border-sky-400",
                  accentBg: "bg-sky-200",
                  accentText: "text-sky-800",
                  href: undefined,
                },
                {
                  num: "03",
                  title: "リファボンド",
                  subtitle: "成果報酬型・決裁者紹介",
                  body: "大手決裁者への人脈紹介。完全成果報酬型のため、リスク少なく開拓が可能。",
                  accentBorder: "border-emerald-300",
                  accentBg: "bg-emerald-100",
                  accentText: "text-emerald-700",
                  href: "/services/sales-bond",
                },
              ] as const
            ).map((opt) => {
              const inner = (
                <div
                  className={`group h-full rounded-xl border ${opt.accentBorder} bg-white p-4 transition ${
                    opt.href ? "hover:-translate-y-0.5 hover:shadow-card" : ""
                  }`}
                >
                  <span
                    className={`inline-flex items-center rounded-full ${opt.accentBg} px-2 py-0.5 text-[10px] font-extrabold tracking-[0.16em] uppercase ${opt.accentText}`}
                  >
                    Option {opt.num}
                  </span>
                  <h3 className="mt-2 text-base font-black text-ink">
                    {opt.title}
                  </h3>
                  <p className={`mt-0.5 text-[11px] font-bold ${opt.accentText}`}>
                    {opt.subtitle}
                  </p>
                  <p className="mt-2 text-xs leading-relaxed text-ink-soft font-medium">
                    {opt.body}
                  </p>
                  {opt.href ? (
                    <p
                      className={`mt-3 inline-flex items-center gap-1 text-[11px] font-bold ${opt.accentText} transition group-hover:gap-2`}
                    >
                      詳しく見る
                      <span aria-hidden="true">→</span>
                    </p>
                  ) : null}
                </div>
              );
              return (
                <li key={opt.num}>
                  {opt.href ? (
                    <Link href={localePath(opt.href, locale)} className="block h-full">
                      {inner}
                    </Link>
                  ) : (
                    inner
                  )}
                </li>
              );
            })}
          </ul>
        </Container>
      </section>

      {/* ───── Features (POINT) ───── */}
      <section id="reasons" className="scroll-mt-32 bg-cream py-24 md:py-32">
        <Container>
          <div className="text-center">
            <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-sky-500">
              Features
            </p>
            <h2 className="mt-3 text-display-3 text-ink font-black leading-tight">
              セルボンドの内容 / 特徴
            </h2>
          </div>

          <div className="mt-16 space-y-16 md:space-y-24">
            {points.map((pt, i) => {
              const reverse = i % 2 === 1;
              return (
                <Reveal key={pt.num}>
                  <div className="grid items-center gap-8 md:grid-cols-12 md:gap-12">
                    {/* Image placeholder (smaller) */}
                    <div className={`md:col-span-5 ${reverse ? "md:order-2" : ""}`}>
                      <div className="grid aspect-[4/3] w-full place-items-center rounded-2xl border border-ink-line bg-white">
                        <span className="text-xs font-bold uppercase tracking-[0.2em] text-ink-muted/50">
                          Image
                        </span>
                      </div>
                    </div>

                    {/* Text */}
                    <div className={`md:col-span-7 ${reverse ? "md:order-1" : ""}`}>
                      <p className="flex items-end gap-2 text-sky-500">
                        <span className="text-sm font-extrabold uppercase tracking-[0.2em]">
                          Point
                        </span>
                        <span className="font-display text-5xl md:text-6xl font-black leading-none">
                          {pt.num}
                        </span>
                      </p>
                      <p className="mt-2 text-base md:text-lg font-black text-sky-600">
                        {pt.label}
                      </p>
                      <h3 className="mt-3 text-lg md:text-2xl font-black leading-snug text-ink">
                        {pt.title.map((t, ti) => (
                          <span key={ti} className="block">
                            {t}
                          </span>
                        ))}
                      </h3>
                      <p className="mt-4 text-sm md:text-base leading-relaxed text-ink-soft font-medium">
                        {pt.body}
                      </p>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>

          <div className="mt-16 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button
              href={contactHref}
              size="lg"
              className="!bg-[#0EA5E9] hover:!bg-sky-500 shadow-[0_18px_40px_-12px_rgba(14,165,233,0.6)]"
            >
              資料問い合わせ
            </Button>
            <Button href={contactHref} size="lg" variant="secondary">
              無料相談
            </Button>
          </div>
        </Container>
      </section>

      {/* ───── Flow ───── */}
      <section id="flow" className="scroll-mt-32 bg-white py-24 md:py-32">
        <Container>
          <div className="text-center">
            <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-sky-500">
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
                    <span className="absolute -top-5 left-1/2 grid h-10 w-10 -translate-x-1/2 place-items-center rounded-full bg-sky-500 font-display text-sm font-black text-white shadow-card">
                      {s.digit}
                    </span>
                    {/* Icon */}
                    <span className="text-sky-400" aria-hidden="true">
                      <StepIcon index={i} />
                    </span>
                    {/* Title */}
                    <h3 className="mt-4 text-lg md:text-xl font-black leading-snug text-sky-600">
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
            <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-sky-500">
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
                      <span className="font-display text-lg font-black text-sky-500">
                        Q.
                      </span>
                      <span className="text-base md:text-lg font-bold text-ink leading-snug">
                        {f.q}
                      </span>
                    </span>
                    <span className="mt-1 grid h-7 w-7 shrink-0 place-items-center rounded-full border-2 border-ink-line text-ink-muted transition group-open:rotate-45 group-open:border-sky-500 group-open:text-sky-500">
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
          <div className="relative overflow-hidden rounded-2xl bg-sky-500 px-8 py-14 md:px-16 md:py-16 text-white">
            <div
              aria-hidden="true"
              className="absolute inset-0 opacity-[0.15]"
              style={{
                backgroundImage:
                  "radial-gradient(rgba(255,255,255,0.85) 1px, transparent 1px)",
                backgroundSize: "22px 22px",
              }}
            />
            <div
              aria-hidden="true"
              className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-sky-300/40 blur-3xl"
            />
            <div
              aria-hidden="true"
              className="absolute -bottom-24 -left-24 h-80 w-80 rounded-full bg-sky-700/40 blur-3xl"
            />

            <div className="relative text-center">
              <p className="text-2xl md:text-3xl font-black text-white">
                資料請求・無料相談はこちら
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Button
                  href={contactHref}
                  size="lg"
                  className="!h-[72px] w-full px-12 text-xl font-black !bg-white !text-sky-600 hover:!bg-cream hover:-translate-y-1 shadow-[0_22px_50px_-12px_rgba(0,0,0,0.4)] md:!h-[84px] md:px-16 md:text-2xl sm:w-auto sm:min-w-[260px]"
                >
                  資料請求
                </Button>
                <Button
                  href={contactHref}
                  size="lg"
                  variant="ghost"
                  className="!h-[72px] w-full px-12 text-xl font-black border-2 border-white !text-white hover:!bg-white/15 hover:-translate-y-1 md:!h-[84px] md:px-16 md:text-2xl sm:w-auto sm:min-w-[260px]"
                >
                  無料相談
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
