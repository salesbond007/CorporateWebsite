import type { Metadata } from "next";
import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { JsonLd } from "@/components/seo/JsonLd";
import { AiCheckForm } from "@/components/contact/AiCheckForm";
import { breadcrumbJsonLd } from "@/lib/jsonld";
import { pageMeta, pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";
import { cn } from "@/lib/cn";
import { localePath } from "@/i18n/path";
import { isLocale } from "@/i18n/config";

/*
 * AI時代のセキュリティ研修（全社員研修＋社内CISO育成）LP
 * 文面は確定版。言い回しを変えないこと。
 * - 文面にない実績・導入企業ロゴ・お客様の声・数値は追加しない
 * - 料金の金額は表示しない（「お問い合わせください」のみ）
 * - 顧問・社外CISO・アフターフォローなどの継続サービスには触れない
 * - 「ISO42001準拠」とは書かない（「参考に」の表現を守る）
 * デザインは CISO の LP(/services/ciso)に合わせる。
 */

const PATH = "/services/security-training";
const FORM_ID = "contact";
const DOC_ID = "document";

export function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Metadata {
  if (!isLocale(params.locale)) return {};
  return pageMetadata({
    ...pageMeta.securityTraining,
    path: PATH,
    locale: params.locale,
  });
}

/* ================================================================== 文面 */

const fvLabels = [
  "オンライン完結",
  "社員向け教材は完成品でお渡し",
  "全6回・約3カ月",
];

const worries = [
  {
    head: "社員について",
    items: [
      "社員がAIに何を入力しているのか、把握できていない",
      "研修を年に1回やっても、すぐに忘れられてしまう",
      "詐欺メールやなりすましへの備えが、人によってばらばら",
    ],
  },
  {
    head: "責任者について",
    items: [
      "CISOを兼任で任されたが、何から手をつければよいかわからない",
      "AI利用のルールを作ったのに、現場で守られていない",
      "取引先から届くセキュリティのチェックシートに、自信を持って答えられない",
    ],
  },
];

const data = [
  {
    num: "86.4",
    unit: "%",
    prefix: "",
    text: "生成AIを業務で利用する企業。一方で、組織的な取り組みがない企業が27.0%",
    source: "（総務省『情報通信白書』令和8年版）",
  },
  {
    num: "29",
    unit: "%",
    prefix: "約",
    text: "AIのガイドラインを全社に整えている非上場企業。整えた企業でも、シャドーAIは約47%と減っていない",
    source: "（『AI白書2026』）",
  },
  {
    num: "9",
    unit: "割超",
    prefix: "",
    text: "CISOが兼任の企業。5割以上が、セキュリティ管理の知識不足を課題に挙げている",
    source: "（IPA）",
  },
];

const compare = [
  { item: "対象", general: "社員のみ", ours: "全社員とCISO候補" },
  {
    item: "講師",
    general: "外部講師が毎回担当",
    ours: "社内CISOが自社で教える",
  },
  { item: "期間", general: "1回きり", ours: "3カ月・6テーマ" },
  {
    item: "終了後に残るもの",
    general: "受講した事実だけ",
    ours: "CISO・教材・規程・受講記録・年間計画",
  },
];

const steps = [
  "CISO候補が講座で学ぶ",
  "社員向けの教材（動画・スライド・テスト）を受け取る",
  "自社の社員に30分で教える",
];

const reasons = [
  {
    title: "全社員研修とCISO育成を一度に進められる",
    text: "研修を別々に手配する必要はありません",
  },
  {
    title: "教材は完成品でお渡しする",
    text: "教えるのが苦手な方でも、そのまま使えます",
  },
  {
    title: "公的な基準をもとに設計している",
    text: "AI事業者ガイドライン（総務省・経済産業省）、ISO/IEC 42001を参考に、IPAのガイドラインやSCS評価制度の要求事項もふまえています",
  },
];

const curriculum = [
  ["CISOの役割、経営への報告の仕方", "AIを使うときの基本ルール"],
  [
    "情報の区分け、AIツールの審査の仕方",
    "AIに入れてはいけない情報、使ってよいツール",
  ],
  ["アカウント・端末・バックアップの管理", "パスワードと多要素認証"],
  ["詐欺メール・なりすましへの備え", "怪しいメールと送金依頼の見分け方"],
  ["事故時の初動、経営・取引先への説明", "事故に気づいたときの連絡の仕方"],
  ["取引先のチェックシート対応、年間計画", "振り返りテスト"],
];

const outcomes: { label: string; icon: IconName }[] = [
  { label: "全社員の受講記録とテスト結果", icon: "record" },
  { label: "自社版の社員研修資料", icon: "slides" },
  { label: "自社に合わせたAI利用規程", icon: "rule" },
  { label: "社内で育ったCISO", icon: "person" },
  { label: "翌年1年分のセキュリティ計画", icon: "calendar" },
];

const flow = [
  "無料相談",
  "現状のヒアリング",
  "お申し込み",
  "全6回の講座",
  "修了",
];

const faqs = [
  {
    q: "セキュリティの専門知識がなくても大丈夫ですか？",
    a: "はい。兼任の方を前提に設計しています。",
  },
  {
    q: "社員が少ない会社でも受けられますか？",
    a: "従業員50名未満の場合は、内容を調整してご提案します。",
  },
  {
    q: "AI研修を受けたばかりでも意味がありますか？",
    a: "あります。本講座はAIの「活用」ではなく「守り」に特化しているため、AI研修の内容とは重なりません。",
  },
  {
    q: "修了後に困ったときは？",
    a: "個別にご相談ください。",
  },
];

/* ============================================================ 小さな部品 */

type IconName =
  | "shield"
  | "check"
  | "doc"
  | "record"
  | "slides"
  | "rule"
  | "person"
  | "calendar"
  | "chat";

function Icon({ name, className }: { name: IconName; className?: string }) {
  const p = {
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.7,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      {name === "shield" ? (
        <g {...p}>
          <path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6z" />
          <path d="M9 12l2 2 4-4" />
        </g>
      ) : name === "check" ? (
        <g {...p}>
          <path d="M5 12.5l4.5 4.5L19 7.5" />
        </g>
      ) : name === "doc" ? (
        <g {...p}>
          <path d="M7 3h7l4 4v14H7z" />
          <path d="M14 3v4h4M12 11v6M9.5 14.5L12 17l2.5-2.5" />
        </g>
      ) : name === "record" ? (
        <g {...p}>
          <rect x="5" y="4" width="14" height="17" rx="1.5" />
          <path d="M9 4V2.8h6V4M8.5 10l1.5 1.5 3-3M8.5 16h7" />
        </g>
      ) : name === "slides" ? (
        <g {...p}>
          <rect x="3" y="4" width="18" height="12" rx="1.5" />
          <path d="M12 16v4M8 20h8M7 12l3-3 2.5 2L17 7.5" />
        </g>
      ) : name === "rule" ? (
        <g {...p}>
          <path d="M6 3h12v18H6z" />
          <path d="M9 8h6M9 12h6M9 16h3" />
        </g>
      ) : name === "person" ? (
        <g {...p}>
          <circle cx="12" cy="8" r="3.6" />
          <path d="M5 20.5c.9-3.8 3.6-6 7-6s6.1 2.2 7 6" />
          <path d="M16.5 4.5l1.8-1.3M18.8 7.5h2" />
        </g>
      ) : name === "calendar" ? (
        <g {...p}>
          <rect x="3.5" y="5" width="17" height="15.5" rx="1.5" />
          <path d="M3.5 10h17M8 3v4M16 3v4M8 14h2M12 14h2M8 17h2" />
        </g>
      ) : (
        <g {...p}>
          <path d="M4 5h16v11H9l-5 4z" />
          <path d="M8 9.5h8M8 12.5h5" />
        </g>
      )}
    </svg>
  );
}

/** 2つのCTAボタン(無料で相談する／資料をダウンロード) */
function CtaButtons({
  tone = "light",
  className,
}: {
  tone?: "light" | "dark";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4",
        className,
      )}
    >
      <a
        href={`#${FORM_ID}`}
        className={cn(
          "group inline-flex h-16 items-center justify-center gap-3 px-8 text-[17px] font-black tracking-[0.04em] transition-colors sm:min-w-[17rem]",
          tone === "light"
            ? "bg-brand-500 text-white hover:bg-[#5A142C]"
            : "bg-white text-brand-600 hover:bg-[#F5E9ED]",
        )}
      >
        <Icon name="chat" className="h-5 w-5" />
        無料で相談する
      </a>
      <a
        href={`#${DOC_ID}`}
        className={cn(
          "group inline-flex h-16 items-center justify-center gap-3 border-2 px-8 text-[17px] font-black tracking-[0.04em] transition-colors sm:min-w-[17rem]",
          tone === "light"
            ? "border-brand-500 bg-white text-brand-500 hover:bg-[#F5E9ED]"
            : "border-white text-white hover:bg-white/10",
        )}
      >
        <Icon name="doc" className="h-5 w-5" />
        資料をダウンロード
      </a>
    </div>
  );
}

/** 英字ラベル + 見出し + 左だけ色の付いた線 */
function SectionHead({
  en,
  children,
  center,
}: {
  en: string;
  children: ReactNode;
  center?: boolean;
}) {
  return (
    <Reveal variant="up" className={center ? "text-center" : ""}>
      <p className="text-[clamp(2rem,4.6vw,3.2rem)] font-black uppercase leading-none tracking-[0.02em] text-brand-500">
        {en}
      </p>
      <h2 className="mt-3 text-[clamp(1.4rem,2.8vw,2.1rem)] font-black leading-[1.5] tracking-[0.03em] text-ink [word-break:auto-phrase]">
        {children}
      </h2>
      <div
        className={cn(
          "relative mt-5 h-px bg-[#E6D9DD]",
          center && "mx-auto max-w-xs",
        )}
      >
        <span
          className={cn(
            "absolute inset-y-0 -translate-y-px border-b-2 border-brand-500",
            center ? "left-1/2 w-24 -translate-x-1/2" : "left-0 w-40 md:w-56",
          )}
        />
      </div>
    </Reveal>
  );
}

function Watermark({
  children,
  className,
}: {
  children: string;
  className?: string;
}) {
  return (
    <p
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute -z-10 select-none whitespace-nowrap text-[clamp(5rem,14vw,12rem)] font-black uppercase leading-none tracking-tight text-brand-500/[0.05]",
        className,
      )}
    >
      {children}
    </p>
  );
}

/** ファーストビューの抽象ビジュアル(盾・鍵・ネットワーク) */
function FvVisual() {
  // 外周のネットワークの点
  const nodes = Array.from({ length: 10 }, (_, i) => {
    const a = (i / 10) * Math.PI * 2 - Math.PI / 2;
    const r = i % 2 === 0 ? 41 : 33;
    return { x: 50 + r * Math.cos(a), y: 50 + r * Math.sin(a) };
  });
  return (
    <div
      className="relative mx-auto aspect-square w-full max-w-[460px]"
      role="img"
      aria-label="盾と鍵を中心に、社内のネットワークを守るイメージ"
    >
      <div
        aria-hidden="true"
        className="absolute inset-[3%] animate-spin-slow rounded-full border border-dashed border-brand-500/30"
      />
      <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full">
        <circle cx="50" cy="50" r="41" fill="#FBF3F5" />
        <circle
          cx="50"
          cy="50"
          r="25"
          fill="none"
          stroke="#7A1F3D"
          strokeOpacity="0.18"
          strokeWidth="0.4"
        />
        {/* ネットワークの線 */}
        {nodes.map((n, i) => {
          const m = nodes[(i + 1) % nodes.length];
          return (
            <g key={i}>
              <line
                x1={n.x}
                y1={n.y}
                x2={m.x}
                y2={m.y}
                stroke="#7A1F3D"
                strokeOpacity="0.35"
                strokeWidth="0.35"
              />
              {i % 2 === 0 ? (
                <line
                  x1={n.x}
                  y1={n.y}
                  x2="50"
                  y2="50"
                  stroke="#7A1F3D"
                  strokeOpacity="0.14"
                  strokeWidth="0.35"
                />
              ) : null}
            </g>
          );
        })}
        {nodes.map((n, i) => (
          <circle
            key={`n-${i}`}
            cx={n.x}
            cy={n.y}
            r={i % 2 === 0 ? 2.4 : 1.5}
            fill={i % 2 === 0 ? "#7A1F3D" : "#fff"}
            stroke="#7A1F3D"
            strokeWidth="0.5"
          />
        ))}
      </svg>
      {/* 中央の盾と鍵 */}
      <svg
        viewBox="0 0 200 230"
        aria-hidden="true"
        className="absolute left-1/2 top-1/2 w-[36%] -translate-x-1/2 -translate-y-1/2"
      >
        <path
          d="M100 6l86 32v68c0 60-38 102-86 118C52 208 14 166 14 106V38z"
          fill="#7A1F3D"
        />
        <path d="M100 22l70 26v58c0 50-31 85-70 99V22z" fill="#5A142C" />
        <rect x="66" y="104" width="68" height="56" rx="6" fill="#fff" />
        <path
          d="M80 104V88a20 20 0 0 1 40 0v16"
          fill="none"
          stroke="#fff"
          strokeWidth="10"
        />
        <circle cx="100" cy="126" r="7" fill="#7A1F3D" />
        <rect x="96" y="128" width="8" height="18" rx="3" fill="#7A1F3D" />
      </svg>
    </div>
  );
}

/* ================================================================ ページ */

export default function SecurityTrainingPage({
  params,
}: {
  params: { locale: string };
}) {
  if (!isLocale(params.locale)) notFound();
  const locale = params.locale;
  const base = site.url.replace(/\/$/, "");
  const url = `${base}${localePath(PATH, locale)}`;

  const nav = [
    { href: "#mechanism", label: "しくみ" },
    { href: "#curriculum", label: "カリキュラム" },
    { href: "#price", label: "料金" },
    { href: "#faq", label: "よくある質問" },
  ];

  return (
    <div className="bg-white font-sans font-medium not-italic text-ink">
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "ホーム", url: localePath("/", locale) },
            { name: "サービス一覧", url: localePath("/services", locale) },
            {
              name: "セキュリティ対策事業",
              url: localePath("/services/security", locale),
            },
            { name: "AI時代のセキュリティ研修", url: localePath(PATH, locale) },
          ]),
          {
            "@context": "https://schema.org",
            "@type": "Service",
            name: "AI時代のセキュリティ研修（全社員研修＋社内CISO育成）",
            serviceType: "セキュリティ研修",
            description: pageMeta.securityTraining.description,
            url,
            areaServed: { "@type": "Country", name: "日本" },
            provider: {
              "@type": "Organization",
              name: site.legalName,
              url: base,
            },
          },
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqs.map((f) => ({
              "@type": "Question",
              name: f.q,
              acceptedAnswer: { "@type": "Answer", text: f.a },
            })),
          },
        ]}
      />

      {/* ========== ヘッダー ========== */}
      <header className="sticky top-0 z-40 border-b border-[#EEE5E8] bg-white/95 backdrop-blur">
        <Container className="flex h-16 items-center gap-6 md:h-[4.5rem]">
          <a href="#top" className="flex items-center gap-2.5">
            <span
              className="grid h-9 w-9 place-items-center rounded-lg bg-brand-500 text-white"
              aria-hidden="true"
            >
              <Icon name="shield" className="h-5 w-5" />
            </span>
            <span className="leading-tight">
              <span className="block whitespace-nowrap text-base font-black text-ink sm:text-lg">
                Bond AI
              </span>
              <span className="block text-[10px] font-bold text-ink/55">
                AI時代のセキュリティ研修
              </span>
            </span>
          </a>
          <nav
            aria-label="ページ内メニュー"
            className="ml-auto hidden lg:block"
          >
            <ul className="flex items-center gap-1">
              {nav.map((n) => (
                <li key={n.href}>
                  <a
                    href={n.href}
                    className="px-3 py-2 text-sm font-bold text-ink/80 hover:text-brand-500 xl:px-4"
                  >
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <a
            href={`#${FORM_ID}`}
            className="ml-auto inline-flex h-10 items-center bg-[linear-gradient(100deg,#FF7A55,#E64A2E)] px-4 text-sm font-bold text-white sm:px-5 lg:ml-2"
          >
            無料で相談する
          </a>
        </Container>
        <nav
          aria-label="ページ内メニュー"
          className="border-t border-[#EEE5E8] lg:hidden"
        >
          <ul className="flex justify-between px-3">
            {nav.map((n) => (
              <li key={n.href}>
                <a
                  href={n.href}
                  className="block px-1.5 py-2 text-xs font-bold text-ink/75"
                >
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      {/* ========== 1. FV ========== */}
      <section
        id="top"
        className="relative isolate overflow-hidden bg-[linear-gradient(180deg,#FFFFFF_0%,#FBF4F6_100%)]"
      >
        <svg
          aria-hidden="true"
          className="absolute inset-0 -z-10 h-full w-full opacity-[0.35]"
        >
          <defs>
            <pattern
              id="hex-tr"
              width="56"
              height="97"
              patternUnits="userSpaceOnUse"
              patternTransform="scale(1.4)"
            >
              <path
                d="M28 0l28 16v32L28 64 0 48V16zM28 64l28 16v17M28 64L0 80v17"
                fill="none"
                stroke="#EBDCE1"
                strokeWidth="1"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hex-tr)" />
        </svg>
        <Container className="grid items-center gap-8 pb-14 pt-8 md:pb-20 md:pt-16 lg:grid-cols-[1.15fr_1fr] lg:gap-10">
          <div className="text-center lg:text-left">
            <p className="inline-block bg-brand-500 px-4 py-2 text-sm font-bold tracking-[0.06em] text-white md:text-base">
              AI時代のセキュリティ研修
            </p>
            <h1 className="mt-6 text-[clamp(2.1rem,5vw,3.9rem)] font-black leading-[1.3] tracking-[0.03em]">
              セキュリティも、
              <br />
              <span className="text-brand-500">CISO</span>も、
              <br />
              内製化する。
            </h1>
            <p className="mx-auto mt-6 max-w-[36rem] text-[15px] font-bold leading-[2] text-ink/80 [word-break:auto-phrase] md:text-base lg:mx-0">
              AI時代の全社員セキュリティ研修と社内CISOの育成を、3カ月でひとつに。外に任せきりにしない「守り」を、自社の中につくります。
            </p>
            <CtaButtons className="mt-8 justify-center lg:justify-start" />
            <ul className="mt-6 flex flex-wrap justify-center gap-2 lg:justify-start">
              {fvLabels.map((l) => (
                <li
                  key={l}
                  className="flex items-center gap-1.5 border border-[#E6D9DD] bg-white px-3 py-1.5 text-xs font-bold text-ink/80 md:text-[13px]"
                >
                  <Icon name="check" className="h-3.5 w-3.5 text-brand-500" />
                  {l}
                </li>
              ))}
            </ul>
          </div>
          <div className="order-first lg:order-none">
            <FvVisual />
          </div>
        </Container>
      </section>

      {/* ========== 2. 問題提起 ========== */}
      <section className="bg-[#1F1A1C] py-16 text-white md:py-24">
        <Container className="max-w-3xl text-center">
          <Reveal variant="up">
            <h2 className="text-[clamp(1.4rem,3vw,2.2rem)] font-black leading-[1.6] [word-break:auto-phrase]">
              そのセキュリティ、
              <br className="sm:hidden" />
              外に任せきりになっていませんか。
            </h2>
            <span
              aria-hidden="true"
              className="mx-auto mt-6 block h-[3px] w-12 bg-brand-500"
            />
            <p className="mt-6 text-left text-[15px] leading-[2.1] text-white/85 [word-break:auto-phrase] sm:text-center md:text-base">
              専任のCISOを置けないから外部に任せる。多くの企業が、この選択をしています。しかし外部に任せている間は、社内に知識も、判断できる人も残りません。AIは毎日、社員一人ひとりが使います。だからこそ、守りは社内で回せる必要があります。
            </p>
          </Reveal>
        </Container>
      </section>

      {/* ========== 3. お悩み ========== */}
      <section className="bg-white py-16 md:py-24">
        <Container>
          <Reveal variant="up" className="text-center">
            <h2 className="text-[clamp(1.5rem,3vw,2.2rem)] font-black leading-[1.5]">
              こんな<span className="text-brand-500">お悩み</span>
              はありませんか
            </h2>
          </Reveal>
          <div className="mt-10 grid gap-5 md:grid-cols-2 md:gap-6">
            {worries.map((w, gi) => (
              <Reveal key={w.head} variant="up" delay={gi * 120}>
                <div className="h-full bg-[#F7F2F4]">
                  <p className="flex items-center gap-2 bg-brand-500 px-5 py-3 text-[15px] font-black text-white">
                    <Icon
                      name={gi === 0 ? "person" : "shield"}
                      className="h-5 w-5"
                    />
                    {w.head}
                  </p>
                  <ul className="space-y-3 p-5 md:p-6">
                    {w.items.map((t) => (
                      <li
                        key={t}
                        className="flex gap-3 bg-white px-4 py-3.5 text-[15px] font-bold leading-relaxed"
                      >
                        <span
                          aria-hidden="true"
                          className="mt-[3px] grid h-5 w-5 shrink-0 place-items-center rounded-full border-2 border-brand-500 text-brand-500"
                        >
                          <Icon name="check" className="h-3 w-3" />
                        </span>
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* ========== 4. データ ========== */}
      <section className="relative isolate overflow-hidden bg-[#FBF6F7] py-16 md:py-24">
        <Watermark className="-left-4 top-4">Data</Watermark>
        <Container>
          <SectionHead en="Data">
            ルールを作るだけでは、守りは回らない。
          </SectionHead>
          <ul className="mt-10 grid gap-4 md:mt-12 md:grid-cols-3 md:gap-5">
            {data.map((d, i) => (
              <Reveal key={d.num} variant="up" delay={i * 120}>
                <li className="flex h-full flex-col border-t-4 border-brand-500 bg-white p-6 md:p-7">
                  <p className="font-black leading-none text-brand-500">
                    {d.prefix ? (
                      <span className="mr-0.5 text-2xl">{d.prefix}</span>
                    ) : null}
                    <span className="text-[3.6rem] tracking-tight md:text-[4rem]">
                      {d.num}
                    </span>
                    <span className="ml-0.5 text-2xl">{d.unit}</span>
                  </p>
                  <p className="mt-4 flex-1 text-[15px] font-bold leading-[1.85]">
                    {d.text}
                  </p>
                  <p className="mt-4 text-[11px] leading-relaxed text-ink/55">
                    {d.source}
                  </p>
                </li>
              </Reveal>
            ))}
          </ul>
        </Container>
      </section>

      {/* ========== 5. 一般的な研修との違い ========== */}
      <section className="relative isolate overflow-hidden bg-white py-16 md:py-24">
        <Watermark className="-right-6 top-4">Compare</Watermark>
        <Container>
          <SectionHead en="Compare">
            研修で終わらせない。社内に残る研修へ。
          </SectionHead>

          {/* PC: 表 */}
          <Reveal variant="up" className="mt-10 hidden md:block">
            <table className="w-full border-collapse text-left">
              <caption className="sr-only">
                一般的なセキュリティ研修と、Bond AIの研修の比較
              </caption>
              <thead>
                <tr>
                  <th scope="col" className="w-[20%]" />
                  <th
                    scope="col"
                    className="w-[36%] bg-[#ECE8E9] px-6 py-4 text-center text-base font-black text-ink/75"
                  >
                    一般的なセキュリティ研修
                  </th>
                  <th
                    scope="col"
                    className="w-[44%] bg-brand-500 px-6 py-4 text-center text-lg font-black text-white"
                  >
                    Bond AIの研修
                  </th>
                </tr>
              </thead>
              <tbody>
                {compare.map((c) => (
                  <tr key={c.item} className="border-b border-[#E9E1DD]">
                    <th
                      scope="row"
                      className="py-5 pr-4 text-[15px] font-black"
                    >
                      {c.item}
                    </th>
                    <td className="bg-[#F6F4F4] px-6 py-5 text-center text-[15px] text-ink/70">
                      {c.general}
                    </td>
                    <td className="bg-[#F5E9ED] px-6 py-5 text-center text-base font-black text-[#5A142C]">
                      {c.ours}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Reveal>

          {/* スマホ: カード */}
          <dl className="mt-8 space-y-3 md:hidden">
            {compare.map((c) => (
              <div key={c.item} className="border border-[#E9E1DD]">
                <dt className="bg-[#F7F2F4] px-4 py-2.5 text-sm font-black">
                  {c.item}
                </dt>
                <dd className="grid grid-cols-2">
                  <p className="border-r border-[#E9E1DD] px-4 py-3 text-[13px] leading-relaxed text-ink/70">
                    <span className="block text-[10px] font-bold text-ink/50">
                      一般的なセキュリティ研修
                    </span>
                    {c.general}
                  </p>
                  <p className="bg-[#F5E9ED] px-4 py-3 text-[13px] font-black leading-relaxed text-[#5A142C]">
                    <span className="block text-[10px] font-bold text-brand-500">
                      Bond AIの研修
                    </span>
                    {c.ours}
                  </p>
                </dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      {/* ========== 6. しくみ ========== */}
      <section
        id="mechanism"
        className="relative isolate scroll-mt-28 overflow-hidden bg-[#FBF6F7] py-16 md:py-24"
      >
        <Watermark className="-left-4 top-4">Mechanism</Watermark>
        <Container>
          <SectionHead en="Mechanism">
            学ぶ。受け取る。社内で教える。
          </SectionHead>
          <ol className="mt-10 grid gap-3 md:mt-12 md:grid-cols-[1fr_auto_1fr_auto_1fr] md:items-stretch md:gap-4">
            {steps.map((s, i) => (
              <li key={s} className="contents">
                <Reveal variant="up" delay={i * 150} className="h-full">
                  <div className="flex h-full items-center gap-4 bg-white p-5 ring-1 ring-[#EEE5E8] md:flex-col md:items-start md:gap-0 md:p-7">
                    <span className="grid h-12 w-12 shrink-0 place-items-center bg-brand-500 text-lg font-black text-white md:h-14 md:w-14 md:text-xl">
                      {i + 1}
                    </span>
                    <p className="text-base font-black leading-[1.7] md:mt-5 md:text-lg">
                      {s}
                    </p>
                  </div>
                </Reveal>
                {i < steps.length - 1 ? (
                  <span
                    aria-hidden="true"
                    className="flex items-center justify-center text-brand-500"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      className="h-7 w-7 rotate-90 md:rotate-0"
                      fill="none"
                    >
                      <path
                        d="M8 4l8 8-8 8"
                        stroke="currentColor"
                        strokeWidth="2.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                ) : null}
              </li>
            ))}
          </ol>
          <Reveal variant="up">
            <p className="mt-8 border-l-4 border-brand-500 bg-white px-5 py-4 text-[15px] font-bold leading-[1.9] md:text-base">
              3カ月後には、全社員の研修が終わっていて、それを回せるCISOも育っています。
            </p>
          </Reveal>
        </Container>
      </section>

      {/* ========== 7. 選ばれる理由 ========== */}
      <section className="relative isolate overflow-hidden bg-white py-16 md:py-24">
        <Watermark className="-right-6 top-4">Reason</Watermark>
        <Container>
          <SectionHead en="Reason">選ばれる理由</SectionHead>
          <ol className="mt-10 grid gap-4 md:mt-12 md:grid-cols-3 md:gap-5">
            {reasons.map((r, i) => (
              <Reveal key={r.title} variant="up" delay={i * 120}>
                <li className="h-full border border-[#E9E1DD] bg-white p-6 md:p-7">
                  <p className="text-[2.6rem] font-black leading-none text-brand-500">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-4 text-lg font-black leading-[1.6] [word-break:auto-phrase]">
                    {r.title}
                  </h3>
                  <p className="mt-3 border-t border-[#E9E1DD] pt-3 text-[15px] leading-[1.9] text-ink/75">
                    {r.text}
                  </p>
                </li>
              </Reveal>
            ))}
          </ol>
        </Container>
      </section>

      {/* ========== 中盤のCTA ========== */}
      <section className="bg-brand-500 py-12 text-white md:py-14">
        <Container className="flex flex-col items-center gap-6 text-center">
          <p className="text-base font-bold md:text-lg">
            AI時代の全社員セキュリティ研修と社内CISOの育成を、3カ月でひとつに。
          </p>
          <CtaButtons tone="dark" className="w-full justify-center sm:w-auto" />
        </Container>
      </section>

      {/* ========== 8. カリキュラム ========== */}
      <section
        id="curriculum"
        className="relative isolate scroll-mt-28 overflow-hidden bg-[#FBF6F7] py-16 md:py-24"
      >
        <Watermark className="-left-4 top-4">Curriculum</Watermark>
        <Container>
          <SectionHead en="Curriculum">
            カリキュラム（全6回・2週に1回・オンライン）
          </SectionHead>

          {/* PC: 表 */}
          <Reveal variant="up" className="mt-10 hidden md:block">
            <table className="w-full border-collapse bg-white text-left">
              <caption className="sr-only">
                全6回のカリキュラム。回ごとに、CISO候補が学ぶことと社員に教えること
              </caption>
              <thead>
                <tr className="bg-brand-500 text-white">
                  <th
                    scope="col"
                    className="w-[9%] px-4 py-4 text-center text-sm font-black"
                  >
                    回
                  </th>
                  <th
                    scope="col"
                    className="w-[45.5%] px-6 py-4 text-sm font-black"
                  >
                    CISO候補が学ぶこと
                  </th>
                  <th
                    scope="col"
                    className="w-[45.5%] px-6 py-4 text-sm font-black"
                  >
                    社員に教えること
                  </th>
                </tr>
              </thead>
              <tbody>
                {curriculum.map(([ciso, staff], i) => (
                  <tr key={ciso} className="border-b border-[#E9E1DD]">
                    <th
                      scope="row"
                      className="px-4 py-5 text-center text-2xl font-black text-brand-500"
                    >
                      {i + 1}
                    </th>
                    <td className="px-6 py-5 text-[15px] font-bold leading-relaxed">
                      {ciso}
                    </td>
                    <td className="border-l border-[#E9E1DD] px-6 py-5 text-[15px] leading-relaxed text-ink/80">
                      {staff}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Reveal>

          {/* スマホ: カード */}
          <ol className="mt-8 space-y-3 md:hidden">
            {curriculum.map(([ciso, staff], i) => (
              <li key={ciso} className="flex bg-white ring-1 ring-[#EEE5E8]">
                <span className="grid w-12 shrink-0 place-items-center bg-brand-500 text-xl font-black text-white">
                  {i + 1}
                  <span className="sr-only">回</span>
                </span>
                <dl className="min-w-0 flex-1 divide-y divide-[#EEE5E8] text-[14px] leading-relaxed">
                  <div className="px-4 py-3">
                    <dt className="text-[11px] font-bold text-brand-500">
                      CISO候補が学ぶこと
                    </dt>
                    <dd className="mt-0.5 font-bold">{ciso}</dd>
                  </div>
                  <div className="px-4 py-3">
                    <dt className="text-[11px] font-bold text-ink/50">
                      社員に教えること
                    </dt>
                    <dd className="mt-0.5 text-ink/80">{staff}</dd>
                  </div>
                </dl>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {/* ========== 9. 修了時に残るもの ========== */}
      <section className="relative isolate overflow-hidden bg-white py-16 md:py-24">
        <Watermark className="-right-6 top-4">Outcome</Watermark>
        <Container>
          <SectionHead en="Outcome">修了時に残るもの</SectionHead>
          <ul className="mt-10 grid grid-cols-2 gap-3 md:mt-12 md:grid-cols-5 md:gap-4">
            {outcomes.map((o, i) => (
              <Reveal
                key={o.label}
                variant="up"
                delay={i * 90}
                className={cn(i === 4 && "col-span-2 md:col-span-1")}
              >
                <li className="flex h-full flex-col items-center bg-[#FBF6F7] px-3 py-6 text-center md:px-4 md:py-8">
                  <span className="grid h-14 w-14 place-items-center rounded-full bg-white text-brand-500 ring-1 ring-[#EEDFE3] md:h-16 md:w-16">
                    <Icon name={o.icon} className="h-7 w-7 md:h-8 md:w-8" />
                  </span>
                  <p className="mt-4 text-[14px] font-black leading-[1.6] [word-break:auto-phrase] md:text-[15px]">
                    {o.label}
                  </p>
                </li>
              </Reveal>
            ))}
          </ul>
        </Container>
      </section>

      {/* ========== 10. 監修者 ========== */}
      <section className="relative isolate overflow-hidden bg-[#FBF6F7] py-16 md:py-24">
        <Watermark className="-left-4 top-4">Expert</Watermark>
        <Container>
          <SectionHead en="Expert">サービス監修</SectionHead>
          <Reveal
            variant="up"
            className="mt-10 grid overflow-hidden bg-white ring-1 ring-[#EEE5E8] md:grid-cols-[16rem_1fr] lg:grid-cols-[20rem_1fr]"
          >
            {/* 顔写真の枠(後日差し替え) */}
            <div className="flex aspect-[4/3] items-center justify-center bg-[#F1ECEE] md:aspect-auto md:min-h-[18rem]">
              <span className="sr-only">岡崎 弘明の写真（準備中）</span>
            </div>
            <div className="flex flex-col justify-center px-6 py-8 md:px-10 md:py-10">
              <h3 className=" text-[clamp(1.75rem,3vw,2.25rem)] font-black tracking-[0.08em]">
                岡崎 弘明
              </h3>
              <p className="mt-5 border-l-[3px] border-brand-500 pl-4 text-base font-bold leading-[1.8] md:text-lg">
                帝国データバンクアクシス（旧
                帝国データバンクネットコミュニケーション）元代表
              </p>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* ========== 11. 料金 ========== */}
      <section
        id="price"
        className="relative isolate scroll-mt-28 overflow-hidden bg-white py-16 md:py-24"
      >
        <Watermark className="-right-6 top-4">Price</Watermark>
        <Container>
          <SectionHead en="Price">料金</SectionHead>
          <Reveal variant="up">
            <div className="mt-10 border border-[#E9E1DD] px-6 py-10 text-center md:px-10 md:py-12">
              <p className="text-[15px] font-bold text-ink/75 md:text-base">
                1社あたりCISO候補2名まで／全社員向け教材つき
              </p>
              <p className="mt-4 text-[clamp(1.4rem,3vw,2rem)] font-black text-brand-500">
                料金はお問い合わせください。
              </p>
            </div>
            <p className="mt-4 flex flex-col items-center justify-center gap-1 bg-brand-500 px-5 py-5 text-center text-white sm:flex-row sm:gap-3">
              <span className="border border-white/70 px-3 py-1 text-sm font-black tracking-[0.08em]">
                モニター企業募集中
              </span>
              <span className="text-base font-bold md:text-lg">
                先着○社は特別価格でご提供します
              </span>
            </p>
          </Reveal>
        </Container>
      </section>

      {/* ========== 12. 導入の流れ ========== */}
      <section className="relative isolate overflow-hidden bg-[#FBF6F7] py-16 md:py-24">
        <Watermark className="-left-4 top-4">Flow</Watermark>
        <Container>
          <SectionHead en="Flow">導入の流れ</SectionHead>
          <ol className="mt-10 grid gap-2 md:mt-12 md:grid-cols-5 md:gap-0">
            {flow.map((f, i) => (
              <Reveal key={f} variant="up" delay={i * 100}>
                <li
                  className={cn(
                    "relative flex h-full items-center gap-4 px-5 py-4 md:flex-col md:justify-center md:gap-2 md:px-3 md:py-6 md:text-center",
                    i === flow.length - 1
                      ? "bg-brand-500 text-white"
                      : "bg-white text-ink ring-1 ring-[#EEE5E8]",
                    i < flow.length - 1 &&
                      "md:[clip-path:polygon(0_0,calc(100%-14px)_0,100%_50%,calc(100%-14px)_100%,0_100%)]",
                  )}
                >
                  <span
                    className={cn(
                      "text-[11px] font-black tracking-[0.14em]",
                      i === flow.length - 1
                        ? "text-white/80"
                        : "text-brand-500",
                    )}
                  >
                    STEP {i + 1}
                  </span>
                  <span className="text-base font-black">{f}</span>
                </li>
              </Reveal>
            ))}
          </ol>
        </Container>
      </section>

      {/* ========== 13. よくある質問 ========== */}
      <section
        id="faq"
        className="relative isolate scroll-mt-28 overflow-hidden bg-white py-16 md:py-24"
      >
        <Watermark className="-right-6 top-4">FAQ</Watermark>
        <Container>
          <SectionHead en="FAQ">よくある質問</SectionHead>
          <div className="mt-10 space-y-3">
            {faqs.map((f) => (
              <details
                key={f.q}
                className="group bg-white ring-1 ring-[#EEE5E8]"
              >
                <summary className="flex cursor-pointer list-none items-center gap-4 p-5 md:p-6 [&::-webkit-details-marker]:hidden">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-brand-500 text-sm font-black text-white">
                    Q
                  </span>
                  <span className="flex-1 text-[15px] font-bold md:text-base">
                    {f.q}
                  </span>
                  <span
                    aria-hidden="true"
                    className="text-xl text-brand-500 transition-transform group-open:rotate-45"
                  >
                    ＋
                  </span>
                </summary>
                <div className="flex gap-4 border-t border-[#EEE5E8] px-5 py-5 md:px-6">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#F4EEF0] text-sm font-black text-brand-500">
                    A
                  </span>
                  <p className="pt-1.5 text-[15px] leading-[1.9] text-ink/80">
                    {f.a}
                  </p>
                </div>
              </details>
            ))}
          </div>
        </Container>
      </section>

      {/* ========== 14. 最後のCTA ========== */}
      <section className="relative isolate overflow-hidden bg-[#1F1A1C] py-16 text-white md:py-20">
        <Container className="flex flex-col items-center gap-8 text-center">
          <h2 className="text-[clamp(1.5rem,3.4vw,2.4rem)] font-black leading-[1.5]">
            外に頼らない守りを、
            <br className="sm:hidden" />
            今日から。
          </h2>
          <CtaButtons tone="dark" className="w-full justify-center sm:w-auto" />
        </Container>
      </section>

      {/* ========== 申し込みフォーム ========== */}
      <section
        id={FORM_ID}
        className="relative isolate scroll-mt-28 overflow-hidden bg-[#FBF6F7] py-16 md:py-24"
      >
        <span id={DOC_ID} className="absolute -top-28" aria-hidden="true" />
        <Watermark className="-right-6 top-4">Contact</Watermark>
        <Container>
          <SectionHead en="Contact">無料相談・資料ダウンロード</SectionHead>
          <div className="mx-auto mt-10 max-w-3xl bg-white p-6 ring-1 ring-[#EEE5E8] md:p-10">
            <AiCheckForm
              privacyHref={localePath("/privacy", locale)}
              product="training"
            />
          </div>
        </Container>
      </section>

      {/* ========== フッター(LP) ========== */}
      <footer className="bg-[#1C1E2A] py-12 text-white">
        <Container>
          <div className="flex items-center gap-3">
            <span
              className="grid h-8 w-8 place-items-center rounded-lg bg-brand-500"
              aria-hidden="true"
            >
              <Icon name="shield" className="h-4 w-4" />
            </span>
            <p className="text-base font-black">
              Bond AI（セールスボンド株式会社）
            </p>
          </div>
          <address className="mt-4 text-sm not-italic leading-[1.9] text-white/70">
            〒160-0023 東京都新宿区西新宿3-3-13 西新宿水間ビル2F
            <br />
            <a
              href="https://www.salesbond1962.com/ja/company"
              className="underline underline-offset-4 hover:text-white"
            >
              https://www.salesbond1962.com/ja/company
            </a>
          </address>
        </Container>
      </footer>
    </div>
  );
}
