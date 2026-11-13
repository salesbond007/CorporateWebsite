import type { Metadata } from "next";
import Image from "next/image";
import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  IconAiRush,
  IconChecksheet,
  IconListing,
  IconShadowAi,
  IconSoloIt,
} from "@/components/services/FlatIcons";
import { AiCheckForm } from "@/components/contact/AiCheckForm";
import { breadcrumbJsonLd } from "@/lib/jsonld";
import { pageMeta, pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";
import { cn } from "@/lib/cn";
import { localePath } from "@/i18n/path";
import { isLocale } from "@/i18n/config";

const PATH = "/services/ciso";
const FORM_ID = "check";

export function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Metadata {
  if (!isLocale(params.locale)) return {};
  return pageMetadata({ ...pageMeta.ciso, path: PATH, locale: params.locale });
}

/* ================================================================== 原稿 */
/*
 * 表現のルール:
 * - 「盤石」「万全」「漏洩ゼロ」は使わず、「防ぐ体制をつくる」までの表現にする。
 * - 導入実績・お客さまの声・専門家の顔写真/氏名は、実物ができてから追加する。
 * - 画面のイメージ図の数値は例示(実績ではない)。
 * 取引先対応向けのサブLPを作るときは、ファーストビューとお悩みだけを差し替える。
 */

const W2 = "#A83B57"; // やや明るいワインレッド

const worries: {
  title: ReactNode;
  Icon: (p: { className?: string }) => ReactNode;
}[] = [
  {
    title: (
      <>
        社内にセキュリティ対策の
        <mark className="bg-transparent bg-[linear-gradient(transparent_62%,#F6CCD7_62%)] text-brand-500">
          専門家がいない
        </mark>
      </>
    ),
    Icon: IconSoloIt,
  },
  {
    title: (
      <>
        生成AIで
        <mark className="bg-transparent bg-[linear-gradient(transparent_62%,#F6CCD7_62%)] text-brand-500">
          情報が漏れないか
        </mark>
        不安
      </>
    ),
    Icon: IconShadowAi,
  },
  {
    title: (
      <>
        上場審査で、
        <mark className="bg-transparent bg-[linear-gradient(transparent_62%,#F6CCD7_62%)] text-brand-500">
          責任者と体制
        </mark>
        を問われる
      </>
    ),
    Icon: IconListing,
  },
  {
    title: (
      <>
        大手企業と取引したいが、
        <mark className="bg-transparent bg-[linear-gradient(transparent_62%,#F6CCD7_62%)] text-brand-500">
          審査が壁
        </mark>
        になる
      </>
    ),
    Icon: IconChecksheet,
  },
  {
    title: (
      <>
        AI活用を進め、
        <mark className="bg-transparent bg-[linear-gradient(transparent_62%,#F6CCD7_62%)] text-brand-500">
          セキュリティが後回し
        </mark>
        に
      </>
    ),
    Icon: IconAiRush,
  },
];

/** サービス概要: プロが代行する仕事 */
const services = [
  {
    t: "責任者（社外CISO）",
    d: "社外CISOとして、御社の責任者を務めます",
    i: "person",
  },
  { t: "ルールづくり", d: "AIの使い方や社内規程を整えます", i: "doc" },
  { t: "診断・点検", d: "弱点を見える化し、優先順位をつけます", i: "chart" },
  {
    t: "取引先・審査対応",
    d: "チェックシート回答や説明を引き受けます",
    i: "check",
  },
  { t: "社員への説明", d: "決めたルールを全社員に浸透させます", i: "bell" },
  { t: "事故の初動", d: "もしもの時の判断と対応を助言します", i: "shield" },
] as const;

const flow = [
  {
    title: "無料のAI利用チェック",
    text: "オンライン30分で、気になる点を整理します",
    when: "お申し込み後",
  },
  { title: "ご提案", text: "課題と規模に合うプランをご提案します", when: "" },
  {
    title: "ご契約",
    text: "秘密保持と、診断する範囲を書面で決めます",
    when: "",
  },
  {
    title: "診断",
    text: "AIの利用状況と弱点を見える化し、優先順位をつけます",
    when: "1〜2カ月目",
  },
  {
    title: "毎月の改善",
    text: "定例で一つずつ直し、社員への説明会を経て、取引先に説明できる状態へ",
    when: "3カ月目〜",
  },
];

const faqs = [
  {
    q: "ほかのセキュリティ顧問・社外CISOとの違いは何ですか？",
    a: "AIを禁止せずに安全に使うためのルールづくり、AIツールの導入前チェック、社内で使うAIの一覧づくりまでを標準で含めています。契約後すぐに診断を行い、年1回の脆弱性診断もプランに入っています。",
  },
  {
    q: "最低契約期間はありますか？",
    a: "6カ月です。迷われる場合は、月8万円のAIセキュリティ顧問から始めて、必要に応じて社外CISOに切り替えることもできます。",
  },
  {
    q: "まだAIをほとんど使っていませんが、対象になりますか？",
    a: "はい。チェックシートへの回答、規程づくり、事故の初動など、一般的なセキュリティの責任者としての役割もすべて対象です。これからAIを導入する会社にもおすすめです。",
  },
  {
    q: "社員研修も含まれますか？",
    a: "社外CISOプランには、作ったAIルールを全社員に伝える説明会（年1回・60分）が含まれます。半日・1日の研修やなりすましメール訓練は別メニューで、人材開発支援助成金の対象になる場合があります。",
  },
  {
    q: "専門家の名前を、取引先に出してもよいですか？",
    a: "はい。社外顧問・社外CISOとして掲載いただけます。掲載するのは、専門家が実際に確認した範囲に限ります。",
  },
  {
    q: "助成金や補助金は使えますか？",
    a: "月額の料金は対象外になることが多いですが、社員研修は対象になる場合があります。対象になるかは各制度の審査で決まりますので、ご相談時に制度をご案内します。申請の代行は提携の士業が行います。",
  },
  {
    q: "事故が起きたときは、どこまで対応してもらえますか？",
    a: "社外CISOプラン以上では、初動の判断と指示を助言します。経営参画プランは緊急訪問（年2回まで）にも対応します。システムの復旧作業などは提携先をご紹介します。",
  },
];

/* ============================================================ 小さな部品 */

function Icon({
  name,
  className,
}: {
  name: "shield" | "doc" | "person" | "chart" | "check" | "bell";
  className?: string;
}) {
  const p = {
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
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
      ) : name === "doc" ? (
        <g {...p}>
          <path d="M7 3h7l4 4v14H7z" />
          <path d="M14 3v4h4M10 12h5M10 16h5" />
        </g>
      ) : name === "person" ? (
        <g {...p}>
          <circle cx="12" cy="8" r="4" />
          <path d="M4.5 21c1-4.2 4-6.5 7.5-6.5s6.5 2.3 7.5 6.5" />
        </g>
      ) : name === "chart" ? (
        <g {...p}>
          <path d="M4 20V4M4 20h16" />
          <path d="M8 16v-4M12 16V8M16 16v-6" />
        </g>
      ) : name === "check" ? (
        <g {...p}>
          <rect x="4" y="4" width="16" height="16" rx="3" />
          <path d="M8 12l3 3 5-6" />
        </g>
      ) : (
        <g {...p}>
          <path d="M6 16V11a6 6 0 0 1 12 0v5l2 2H4z" />
          <path d="M10 20a2 2 0 0 0 4 0" />
        </g>
      )}
    </svg>
  );
}

function Check({ className }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "mt-[3px] grid h-[18px] w-[18px] shrink-0 place-items-center rounded-full bg-brand-500 text-[10px] font-black text-white",
        className,
      )}
    >
      ✓
    </span>
  );
}

/* ------------------------------------- ファーストビュー: 会社を守る盾のビジュアル */

/** 御社の情報資産を盾と防御の輪で守り、外からの脅威をはね返すビジュアル */
function HeroVisual() {
  const assets = [
    { k: "AI", x: 50, y: 17 },
    { k: "顧客情報", x: 81, y: 38 },
    { k: "メール", x: 71, y: 74 },
    { k: "クラウド", x: 29, y: 74 },
    { k: "社内データ", x: 19, y: 38 },
  ];
  const threats = [
    { k: "情報漏えい", x: 13, y: 9 },
    { k: "なりすまし", x: 87, y: 9 },
    { k: "不正アクセス", x: 85, y: 91 },
    { k: "ランサムウェア", x: 15, y: 91 },
  ];
  return (
    <div className="relative mx-auto aspect-square w-[92%] max-w-[540px] sm:w-full">
      {/* 防御の輪 */}
      <div
        aria-hidden="true"
        className="absolute inset-[9%] rounded-full bg-[radial-gradient(circle,#FFFFFF_0%,#FBEFF2_60%,#F6E1E7_100%)] shadow-[0_30px_70px_-30px_rgba(122,30,53,0.55)]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-[9%] rounded-full border-[3px] border-brand-500/80"
      />
      <div
        aria-hidden="true"
        className="absolute inset-[5%] animate-spin-slow rounded-full border-2 border-dashed border-brand-500/35"
      />
      <div
        aria-hidden="true"
        className="absolute inset-[24%] rounded-full border border-brand-500/20"
      />

      {/* 中央の盾 */}
      <svg
        viewBox="0 0 200 230"
        className="absolute left-1/2 top-1/2 w-[34%] -translate-x-1/2 -translate-y-1/2 drop-shadow-[0_18px_24px_rgba(122,30,53,0.45)]"
        role="img"
        aria-label="御社を守る盾"
      >
        <path
          d="M100 6l86 32v68c0 60-38 102-86 118C52 208 14 166 14 106V38z"
          fill="#7A1E35"
        />
        <path d="M100 22l70 26v58c0 50-31 85-70 99V22z" fill="#A83B57" />
        {/* 会社のビル */}
        <rect x="70" y="78" width="60" height="78" rx="3" fill="#fff" />
        {[0, 1, 2].map((r) =>
          [0, 1, 2].map((c) => (
            <rect
              key={`${r}-${c}`}
              x={79 + c * 16}
              y={88 + r * 18}
              width="10"
              height="10"
              rx="1.5"
              fill="#7A1E35"
              opacity="0.85"
            />
          )),
        )}
        <rect x="92" y="138" width="16" height="18" fill="#7A1E35" />
        {/* 鍵 */}
        <circle cx="146" cy="162" r="24" fill="#fff" />
        <rect x="134" y="160" width="24" height="18" rx="3" fill="#7A1E35" />
        <path
          d="M139 160v-6a7 7 0 0 1 14 0v6"
          fill="none"
          stroke="#7A1E35"
          strokeWidth="4"
        />
        <circle cx="146" cy="169" r="2.6" fill="#fff" />
      </svg>

      {/* 守られている情報資産 */}
      {assets.map((a) => (
        <span
          key={a.k}
          className="absolute flex -translate-x-1/2 -translate-y-1/2 items-center gap-1.5 whitespace-nowrap rounded-md bg-white px-2.5 py-1.5 text-[11px] font-bold text-ink shadow-[0_8px_18px_-8px_rgba(60,15,25,0.45)] ring-1 ring-[#EEDFE3] md:text-xs"
          style={{ left: `${a.x}%`, top: `${a.y}%` }}
        >
          <span className="grid h-4 w-4 place-items-center rounded-full bg-[#1E8A57] text-[9px] text-white">
            ✓
          </span>
          {a.k}
        </span>
      ))}

      {/* 外からの脅威(輪ではね返される) */}
      {threats.map((t) => (
        <span
          key={t.k}
          className="absolute -translate-x-1/2 -translate-y-1/2"
          style={{ left: `${t.x}%`, top: `${t.y}%` }}
        >
          <span className="flex items-center gap-1 whitespace-nowrap rounded bg-[#3A3442] px-2 py-1 text-[10px] font-bold text-white md:text-[11px]">
            <span className="grid h-3.5 w-3.5 place-items-center rounded-full bg-[#E64A2E] text-[9px]">
              ×
            </span>
            {t.k}
          </span>
        </span>
      ))}
      {threats.map((t) => {
        const rad = Math.atan2(t.y - 50, t.x - 50);
        const d = Math.hypot(t.x - 50, t.y - 50) * 0.82;
        const x1 = 50 + d * Math.cos(rad);
        const y1 = 50 + d * Math.sin(rad);
        const x2 = 50 + 42 * Math.cos(rad);
        const y2 = 50 + 42 * Math.sin(rad);
        return (
          <svg
            key={`l-${t.k}`}
            aria-hidden="true"
            viewBox="0 0 100 100"
            className="pointer-events-none absolute inset-0 h-full w-full overflow-visible"
          >
            <line
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="#E64A2E"
              strokeWidth="0.8"
              strokeDasharray="1.6 1.4"
            />
            <circle cx={x2} cy={y2} r="1.6" fill="#E64A2E" />
          </svg>
        );
      })}

      {/* ラベル */}
      <span className="absolute bottom-[-4%] left-1/2 -translate-x-1/2 whitespace-nowrap bg-brand-500 px-4 py-2 text-xs font-bold text-white shadow-[0_10px_24px_-12px_rgba(122,30,53,0.8)] md:text-sm">
        社外CISOが、御社の情報を守る体制をつくります
      </span>
    </div>
  );
}

/* ------------------------------------------------------------ 図・グラフ */

/* ================================================================ ページ */

export default function CisoPage({ params }: { params: { locale: string } }) {
  if (!isLocale(params.locale)) notFound();
  const locale = params.locale;
  const base = site.url.replace(/\/$/, "");
  const url = `${base}${localePath(PATH, locale)}`;

  const nav = [
    { href: "#service", label: "サービス" },
    { href: "#flow", label: "導入の流れ" },
    { href: "#faq", label: "よくある質問" },
  ];

  return (
    <div className="bg-white font-sans font-medium not-italic text-ink [&_em]:not-italic [&_em]:text-brand-500 [&_text]:[font-family:inherit]">
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "ホーム", url: localePath("/", locale) },
            { name: "サービス一覧", url: localePath("/services", locale) },
            {
              name: "セキュリティ対策事業",
              url: localePath("/services/security", locale),
            },
            {
              name: "Bond AI（CISO・セキュリティ顧問）",
              url: localePath(PATH, locale),
            },
          ]),
          {
            "@context": "https://schema.org",
            "@type": "Service",
            name: "Bond AI（AI時代のセキュリティ顧問・社外CISO）",
            alternateName: [
              "社外CISO",
              "vCISO",
              "CISO as a Service",
              "セキュリティ顧問",
              "AIセキュリティ顧問",
            ],
            serviceType: "社外CISO・セキュリティ顧問",
            description: pageMeta.ciso.description,
            url,
            areaServed: { "@type": "Country", name: "日本" },
            provider: {
              "@type": "Organization",
              name: site.legalName,
              url: base,
            },
            audience: {
              "@type": "BusinessAudience",
              audienceType: "中小・中堅企業",
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

      {/* ========== 1. ヘッダー ========== */}
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
              <span className="block text-lg font-black text-ink">Bond AI</span>
              <span className="hidden text-[10px] font-bold text-ink/55 sm:block">
                AI時代のセキュリティ顧問・社外CISO
              </span>
            </span>
          </a>
          <nav
            aria-label="ページ内メニュー"
            className="ml-auto hidden md:block"
          >
            <ul className="flex items-center gap-1">
              {nav.map((n) => (
                <li key={n.href}>
                  <a
                    href={n.href}
                    className="px-3 py-2 text-sm font-bold text-ink/80 hover:text-brand-500 lg:px-4"
                  >
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <a
            href={`#${FORM_ID}`}
            className="ml-auto inline-flex h-10 items-center rounded-full bg-[linear-gradient(100deg,#FF7A55,#E64A2E)] px-5 text-sm font-bold text-white shadow-[0_8px_18px_-10px_rgba(230,74,46,0.9)] md:ml-2"
          >
            無料相談
          </a>
        </Container>
        <nav
          aria-label="ページ内メニュー"
          className="border-t border-[#EEE5E8] md:hidden"
        >
          <ul className="flex justify-between px-3">
            {nav.map((n) => (
              <li key={n.href}>
                <a
                  href={n.href}
                  className="block px-2 py-2 text-xs font-bold text-ink/75"
                >
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      {/* ========== 2. ファーストビュー ========== */}
      <section
        id="top"
        className="relative isolate overflow-hidden bg-[linear-gradient(180deg,#FFFFFF_0%,#FBF4F6_100%)]"
      >
        {/* 六角形の模様 */}
        <svg
          aria-hidden="true"
          className="absolute inset-0 -z-10 h-full w-full opacity-[0.35]"
        >
          <defs>
            <pattern
              id="hex"
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
          <rect width="100%" height="100%" fill="url(#hex)" />
        </svg>
        <div
          aria-hidden="true"
          className="absolute -left-40 top-20 -z-10 h-96 w-96 rounded-full bg-white blur-[80px]"
        />
        <Container className="grid items-center gap-12 pb-16 pt-12 md:pb-20 md:pt-16 lg:grid-cols-[1fr_1.1fr]">
          <div>
            <p className="inline-flex items-stretch overflow-hidden rounded-lg shadow-[0_10px_24px_-14px_rgba(122,30,53,0.8)]">
              <span className="grid place-items-center bg-[#5A1528] px-3 text-white md:px-3.5">
                <Icon name="shield" className="h-6 w-6 md:h-7 md:w-7" />
              </span>
              <span className="bg-brand-500 whitespace-nowrap px-3 py-2.5 text-[clamp(0.9rem,3.9vw,1.35rem)] font-black tracking-[0.02em] sm:px-4 md:tracking-[0.04em] text-white md:px-5 md:py-3">
                社外CISO・セキュリティ顧問サービス
              </span>
            </p>
            <h1 className="mt-6 text-[clamp(2.4rem,5vw,4.1rem)] font-black leading-[1.25] tracking-[0.04em]">
              <span className="text-brand-500">AI時代</span>に必須の
              <br />
              セキュリティ対策
            </h1>
            <p className="mt-7 text-[clamp(1.1rem,1.9vw,1.45rem)] font-black leading-[1.6]">
              情報漏えいが起きてからでは、
              <span className="text-brand-500">もう遅い。</span>
            </p>
            <p className="mt-3 max-w-[34rem] text-[15px] font-bold leading-[2] text-ink/80 [word-break:auto-phrase] md:text-base">
              社員が入力したひとつの情報が、取引停止や信用の失墜につながる時代です。資格を持つ専門家が御社の責任者として、事故が起きる前に防ぐ体制をつくります。
            </p>
            <div className="mt-10">
              <BigButton
                label="無料相談"
                sub="オンライン30分・売り込みなし"
                icon="check"
                href="#check"
              />
            </div>
          </div>
          <div className="lg:-mr-10 xl:-mr-24">
            <HeroVisual />
          </div>
        </Container>
      </section>

      {/* ========== 3. お悩み ========== */}
      <section className="bg-white pt-16 md:pt-24">
        <Container>
          <Reveal variant="up" className="text-center">
            <p className="text-sm font-bold tracking-[0.15em] text-brand-500">
              PROBLEM
            </p>
            <h2 className="mt-2 text-[clamp(1.5rem,3vw,2.2rem)] font-black leading-[1.5]">
              こんな<span className="text-brand-500">お悩み</span>
              はありませんか？
            </h2>
          </Reveal>
          <ul className="mx-auto mt-12 grid max-w-6xl grid-cols-2 gap-3 md:gap-4 lg:grid-cols-5">
            {worries.map((w, i) => (
              <Reveal
                key={i}
                variant="up"
                delay={i * 70}
                className={cn("h-full", i === 4 && "col-span-2 lg:col-span-1")}
              >
                <li className="flex h-full flex-col items-center rounded-md bg-[#F7F2F4] px-4 pb-6 pt-5 text-center">
                  <span className="text-xs font-black tracking-[0.15em] text-brand-500">
                    お悩み {i + 1}
                  </span>
                  <w.Icon className="mt-3 h-24 w-auto md:h-28" />
                  <p className="mt-4 text-[15px] font-black leading-[1.6] [word-break:auto-phrase]">
                    {w.title}
                  </p>
                </li>
              </Reveal>
            ))}
          </ul>
        </Container>

        {/* 下矢印: お任せください */}
        <div className="relative mt-14 bg-[#FBF6F7]">
          <Reveal
            variant="up"
            className="bg-brand-500 py-8 text-center text-white md:py-10"
          >
            <p className="text-[clamp(1.3rem,2.8vw,2rem)] font-black leading-[1.5]">
              そのお悩み、
              <span className="inline-block">Bond AI にお任せください</span>
            </p>
            <svg
              aria-hidden="true"
              viewBox="0 0 40 24"
              className="mx-auto mt-3 h-6 w-10 animate-bounce text-white"
            >
              <path
                d="M4 4l16 16L36 4"
                fill="none"
                stroke="currentColor"
                strokeWidth="5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Reveal>
          <svg
            aria-hidden="true"
            viewBox="0 0 1440 90"
            preserveAspectRatio="none"
            className="block h-14 w-full md:h-20"
          >
            <path d="M0 0H1440L720 90Z" fill="#7A1E35" />
          </svg>
        </div>
      </section>

      {/* ========== 4. サービス概要 ========== */}
      <section
        id="service"
        className="relative isolate scroll-mt-28 overflow-hidden bg-[#FBF6F7] pt-20 md:pt-28"
      >
        <Watermark className="-right-6 top-4">Service</Watermark>
        <Container>
          <SectionHead en="Service" />
          <Reveal variant="up" className="mt-10 text-center">
            <p className="text-[clamp(1.5rem,3.2vw,2.4rem)] font-black leading-[1.5] [word-break:auto-phrase]">
              セキュリティの<span className="text-brand-500">プロ</span>が、
              <br className="hidden sm:block" />
              御社のセキュリティ対策を
              <span className="text-brand-500">まるごと代行</span>します
            </p>
            <p className="mx-auto mt-5 max-w-2xl text-[15px] font-medium leading-[2] text-ink/80">
              専任の担当者を雇わなくても大丈夫。資格を持つ専門家が、御社のセキュリティ担当として月額でつき、必要な対策をすべて引き受けます。
            </p>
          </Reveal>

          {/* 図: 中央に CISO / セキュリティ顧問、周りに代行する6つの仕事 */}
          <Reveal
            variant="up"
            className="relative isolate mt-12 overflow-hidden rounded-lg px-4 py-10 text-white md:px-10 md:py-14"
          >
            <Image
              src="/services/cards/ai-solutions.jpg"
              alt=""
              fill
              sizes="100vw"
              className="-z-20 object-cover"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 -z-10 bg-[linear-gradient(120deg,rgba(24,26,38,0.93)_0%,rgba(30,30,46,0.88)_55%,rgba(58,22,36,0.86)_100%)]"
            />
            <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_1fr]">
              <div className="relative mx-auto aspect-square w-full max-w-[480px]">
                {/* 点線の輪 */}
                <svg
                  aria-hidden="true"
                  viewBox="0 0 100 100"
                  className="absolute inset-0 h-full w-full"
                >
                  <circle
                    cx="50"
                    cy="50"
                    r="37"
                    fill="none"
                    stroke="rgba(255,255,255,0.55)"
                    strokeWidth="0.35"
                    strokeDasharray="1.2 1.4"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="46"
                    fill="none"
                    stroke="rgba(255,255,255,0.12)"
                    strokeWidth="0.3"
                  />
                </svg>
                {/* 中央 */}
                <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center text-center">
                  <Icon name="shield" className="h-14 w-14 md:h-20 md:w-20" />
                  <p className="mt-2 text-[clamp(1rem,2.4vw,1.5rem)] font-black leading-tight tracking-[0.04em]">
                    CISO
                    <br />
                    セキュリティ顧問
                  </p>
                </div>
                {/* 周りの6つ */}
                {services.map((x, i) => {
                  const ang = ((-90 + 60 * i) * Math.PI) / 180;
                  return (
                    <span
                      key={x.t}
                      className="absolute flex h-[27%] w-[27%] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full border border-white/70 bg-white/10 px-1 text-center backdrop-blur-sm"
                      style={{
                        left: `${50 + 37 * Math.cos(ang)}%`,
                        top: `${50 + 37 * Math.sin(ang)}%`,
                      }}
                    >
                      <Icon name={x.i} className="h-6 w-6 md:h-8 md:w-8" />
                      <span className="mt-1 text-[10px] font-bold leading-tight [word-break:auto-phrase] sm:text-xs md:text-[13px]">
                        {x.t}
                      </span>
                    </span>
                  );
                })}
              </div>
              <ul className="space-y-3">
                {services.map((x) => (
                  <li
                    key={x.t}
                    className="flex gap-3 border-b border-white/15 pb-3"
                  >
                    <span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full bg-brand-500">
                      <Icon name={x.i} className="h-4 w-4" />
                    </span>
                    <span>
                      <span className="block font-black">{x.t}</span>
                      <span className="block text-sm text-white/75">{x.d}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </Container>
        <div className="mt-20 md:mt-24">
          <SplitCta />
        </div>
      </section>

      {/* ========== 6. 選ばれる理由(POINT) ========== */}
      <section className="relative isolate overflow-hidden py-20 md:py-28">
        <Watermark className="-left-4 top-4">Reason</Watermark>
        <Container>
          <SectionHead en="Reason">Bond AI が選ばれる3つの理由</SectionHead>
          <div className="mt-12 space-y-8">
            {[
              {
                lead: "AIを禁止せず、",
                em: "安全に使えるルール",
                text: "入力してよい情報・ダメな情報、使ってよいツール、導入時の承認の流れまで。禁止ではなく、社員が安心して使える状態をつくります。",
                visual: "policy" as const,
              },
              {
                lead: "契約後すぐに、",
                em: "診断から始める",
                text: "最初の1〜2カ月でAIの利用状況と弱点を見える化。年1回の脆弱性診断もプランに含め、結果は専門家が分かりやすく説明します。",
                visual: "diagnosis" as const,
              },
              {
                lead: "取引先に、",
                em: "責任者として名前を出せる",
                text: "チェックシートの回答から社外CISOとしての名前の掲載まで。「専門家が責任者としてついています」と取引先に言える状態をつくります。",
                visual: "checksheet" as const,
              },
            ].map((r, i) => (
              <Reveal key={r.em} variant="up">
                <article className="relative grid items-center gap-8 overflow-hidden rounded-lg bg-white py-8 pl-0 pr-6 shadow-[0_20px_44px_-34px_rgba(0,0,0,0.4)] md:py-10 md:pr-10 lg:grid-cols-[1.05fr_1fr] lg:gap-12">
                  {/* 背景の大きな丸 */}
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full border-[40px] border-brand-500/[0.04]"
                  />
                  <div className="pl-6 lg:-ml-2 lg:pl-0">
                    <FeatureVisual kind={r.visual} />
                  </div>
                  <div className="relative pl-6 lg:pl-0">
                    <p className="text-right font-black leading-[0.85] text-ink lg:absolute lg:-top-4 lg:right-0">
                      <span className="block text-2xl tracking-[0.02em] md:text-4xl">
                        POINT
                      </span>
                      <span className="block text-6xl text-brand-500 md:text-[6.5rem]">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </p>
                    <h3 className="mt-4 text-[clamp(1.4rem,2.6vw,2rem)] font-black leading-[1.5] lg:mt-24 lg:pr-4">
                      {r.lead}
                      <br />
                      <span className="text-brand-500">{r.em}</span>
                    </h3>
                    <p className="mt-5 text-[15px] leading-[2] text-ink/80">
                      {r.text}
                    </p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* ========== 8. 監修者 ========== */}
      <section className="relative isolate overflow-hidden py-20 md:py-28">
        <Watermark className="-left-4 top-4">Expert</Watermark>
        <Container>
          <SectionHead en="Expert">サービス監修</SectionHead>
          <Reveal
            variant="up"
            className="mt-12 grid gap-8 overflow-hidden rounded-lg bg-white shadow-[0_20px_44px_-34px_rgba(0,0,0,0.4)] ring-1 ring-[#EEE5E8] md:grid-cols-[18rem_1fr] lg:grid-cols-[22rem_1fr]"
          >
            {/* 写真(後日差し替え) */}
            <div className="flex aspect-[4/3] items-center justify-center bg-[#F1ECEE] md:aspect-auto md:min-h-[24rem]">
              <span className="sr-only">岡崎 弘明の写真（準備中）</span>
            </div>
            <div className="px-6 pb-8 md:py-10 md:pr-10">
              <p className="inline-block bg-brand-500 px-3 py-1 text-xs font-bold text-white">
                BondAIセキュリティサービス監修
              </p>
              <h3 className="mt-4 flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <span className="text-[clamp(1.6rem,3vw,2.2rem)] font-black tracking-[0.06em]">
                  岡崎 弘明
                </span>
                <span className="text-sm font-bold text-ink/55">
                  おかざき ひろあき
                </span>
              </h3>
              <p className="mt-2 text-[15px] font-bold text-brand-600">
                元 株式会社帝国データバンクネットコミュニケーション 代表取締役
              </p>
              <span
                aria-hidden="true"
                className="mt-6 block h-px w-full bg-[#EEE5E8]"
              />
              <p className="mt-6 text-[15px] leading-[2] text-ink/80">
                帝国データバンクグループで、情報セキュリティのコンサルティングを手がける会社の代表取締役を務める。同社は、ISO27001（ISMS）やプライバシーマークの取得支援、情報セキュリティの意識診断などを通じて、企業の情報管理の体制づくりを支援している。
              </p>
              <p className="mt-4 border-l-4 border-brand-500 bg-[#FBF6F7] px-4 py-3 text-[15px] font-bold leading-[1.9]">
                Bond
                AIでは、お客様を担当する専門家の面談・選定と、サービス品質の確認を担う。
              </p>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* ========== 9. 導入の流れ ========== */}
      <section
        id="flow"
        className="relative isolate scroll-mt-28 overflow-hidden bg-[#FBF6F7] py-20 md:py-28"
      >
        <Watermark className="-right-6 top-4">Flow</Watermark>
        <Container>
          <SectionHead en="Flow">導入の流れ</SectionHead>
          <ol className="mt-12 grid gap-4 md:grid-cols-5">
            {flow.map((f, i) => (
              <Reveal
                key={f.title}
                variant="up"
                delay={i * 80}
                className="h-full"
              >
                <li className="relative h-full rounded-md bg-white p-5 shadow-[0_16px_34px_-28px_rgba(0,0,0,0.45)]">
                  <p className="text-xs font-black tracking-[0.15em] text-brand-500">
                    STEP {i + 1}
                  </p>
                  <p className="mt-2 text-base font-black leading-snug">
                    {f.title}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-ink/70">
                    {f.text}
                  </p>
                  {i < flow.length - 1 ? (
                    <span
                      aria-hidden="true"
                      className="absolute -right-3 top-1/2 z-10 hidden h-6 w-6 -translate-y-1/2 place-items-center rounded-full bg-brand-500 text-xs text-white md:grid"
                    >
                      ›
                    </span>
                  ) : null}
                </li>
              </Reveal>
            ))}
          </ol>
        </Container>
      </section>

      {/* ========== 10. よくある質問 ========== */}
      <section
        id="faq"
        className="relative isolate scroll-mt-28 overflow-hidden py-20 md:py-28"
      >
        <Watermark className="-left-4 top-4">FAQ</Watermark>
        <Container>
          <SectionHead en="FAQ">よくある質問</SectionHead>
          <div className="mt-10 space-y-3">
            {faqs.map((f) => (
              <details
                key={f.q}
                className="group rounded-md bg-white shadow-[0_10px_24px_-20px_rgba(0,0,0,0.45)] ring-1 ring-[#EEE5E8]"
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
        <div className="mt-20">
          <SplitCta />
        </div>
      </section>

      {/* ========== 11. 申し込み ========== */}
      <section
        id={FORM_ID}
        className="relative isolate scroll-mt-28 overflow-hidden bg-[#FBF6F7] py-20 md:py-28"
      >
        <Watermark className="-right-6 top-4">Contact</Watermark>
        <Container>
          <SectionHead en="Contact">無料相談・資料請求</SectionHead>
          <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_1.6fr] lg:gap-14">
            <div>
              <dl className="space-y-6 text-[15px] leading-[1.9] text-ink/80">
                <div>
                  <dt className="font-black text-ink">資料請求</dt>
                  <dd className="mt-1">
                    サービスの内容・料金・導入の流れをまとめた資料を、メールでお送りします。
                  </dd>
                </div>
              </dl>
            </div>
            <div className="rounded-md bg-white p-6 shadow-[0_30px_60px_-40px_rgba(0,0,0,0.45)] md:p-9">
              <AiCheckForm privacyHref={localePath("/privacy", locale)} />
            </div>
          </div>
        </Container>
      </section>

      {/* ========== 12. フッター(LP) ========== */}
      <footer className="bg-[#1C1E2A] py-12 text-white">
        <Container>
          <div className="flex flex-wrap items-center gap-3">
            <span
              className="grid h-8 w-8 place-items-center rounded-lg bg-brand-500"
              aria-hidden="true"
            >
              <Icon name="shield" className="h-4 w-4" />
            </span>
            <p className="text-base font-black">Bond AI</p>
            <p className="text-sm text-white/60">／ 運営：{site.legalName}</p>
          </div>
          <div className="mt-6 border-t border-white/15 pt-6 text-[11px] leading-[1.9] text-white/55">
            <p>
              注記：ISMSやISO/IEC
              42001などの認証は審査機関が行います。当社は取得の支援を行います。
            </p>
            <p>
              ※
              ページ内の画面・写真はイメージです。数値は例示であり、実績を示すものではありません。
            </p>
          </div>
        </Container>
      </footer>
    </div>
  );
}

/** ブラウザ風の枠 */
function Window({
  title,
  children,
  className,
}: {
  title: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-xl bg-white shadow-[0_40px_80px_-40px_rgba(60,15,25,0.45)] ring-1 ring-[#EEDFE3]",
        className,
      )}
    >
      <div className="flex items-center gap-2 border-b border-[#EEDFE3] bg-[#FBF6F7] px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#FEBC2E]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#28C840]" />
        <span className="ml-3 truncate text-[11px] font-bold text-ink/50">
          {title}
        </span>
      </div>
      {children}
    </div>
  );
}

function Pill({
  tone,
  children,
}: {
  tone: "ok" | "wait" | "ng";
  children: ReactNode;
}) {
  return (
    <span
      className={cn(
        "shrink-0 rounded-full px-2 py-0.5 text-[10px] font-bold",
        tone === "ok" && "bg-[#E3F5EC] text-[#1E8A57]",
        tone === "wait" && "bg-[#FFF3D6] text-[#9A6B00]",
        tone === "ng" && "bg-[#FBEAEE] text-[#7A1E35]",
      )}
    >
      {children}
    </span>
  );
}

/** 特長ごとの画面イメージ */
function FeatureVisual({
  kind,
}: {
  kind: "policy" | "diagnosis" | "checksheet";
}) {
  if (kind === "policy") {
    return (
      <Window title="AI利用ルール（第2版）">
        <div className="p-5 text-[12px] font-bold">
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-md bg-[#E3F5EC]/70 p-3">
              <p className="text-[#1E8A57]">○ 入力してよい</p>
              <ul className="mt-2 space-y-1 text-ink/75">
                <li>・公開済みの情報</li>
                <li>・社内向けの文章の下書き</li>
              </ul>
            </div>
            <div className="rounded-md bg-brand-50 p-3">
              <p className="text-brand-600">× 入力してはダメ</p>
              <ul className="mt-2 space-y-1 text-ink/75">
                <li>・お客さまの個人情報</li>
                <li>・取引先の機密情報</li>
              </ul>
            </div>
          </div>
          <p className="mt-4 text-ink/60">導入時の承認の流れ</p>
          <div className="mt-2 flex items-center gap-1.5 text-[11px]">
            {["社員が申請", "導入前チェック", "責任者が承認"].map((s, i) => (
              <span key={s} className="flex items-center gap-1.5">
                <span
                  className={cn(
                    "rounded-md px-2 py-1.5",
                    i === 2
                      ? "bg-brand-500 text-white"
                      : "bg-[#FBF6F7] ring-1 ring-[#EEDFE3]",
                  )}
                >
                  {s}
                </span>
                {i < 2 ? <span className="text-brand-500">›</span> : null}
              </span>
            ))}
          </div>
        </div>
      </Window>
    );
  }
  if (kind === "diagnosis") {
    const items = [
      { k: "シャドーAI（無断利用）", v: 82, p: "高" },
      { k: "入力してよい情報の基準", v: 70, p: "高" },
      { k: "AIエージェントの権限", v: 48, p: "中" },
      { k: "外から見える脆弱性", v: 36, p: "中" },
      { k: "なりすまし詐欺への備え", v: 24, p: "低" },
    ];
    return (
      <Window title="診断レポート ｜ 優先して直す点">
        <div className="p-5">
          <ul className="space-y-3">
            {items.map((it) => (
              <li key={it.k} className="text-[11px] font-bold">
                <div className="flex items-center justify-between">
                  <span>{it.k}</span>
                  <span
                    className={cn(
                      "rounded px-1.5 py-0.5 text-[10px]",
                      it.p === "高"
                        ? "bg-brand-500 text-white"
                        : it.p === "中"
                          ? "bg-[#E7C4CD] text-brand-600"
                          : "bg-[#F1ECEE] text-ink/60",
                    )}
                  >
                    優先度 {it.p}
                  </span>
                </div>
                <div className="mt-1.5 h-2 rounded-full bg-[#F1ECEE]">
                  <div
                    className="h-2 rounded-full bg-[linear-gradient(90deg,#A83B57,#7A1E35)]"
                    style={{ width: `${it.v}%` }}
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </Window>
    );
  }
  const rows = [
    { q: "AIの利用ルールを定めていますか", s: "回答済" },
    { q: "情報セキュリティの責任者は誰ですか", s: "回答済" },
    { q: "委託先のAI利用を管理していますか", s: "回答済" },
    { q: "事故時の連絡体制はありますか", s: "確認中" },
  ];
  return (
    <Window title="取引先チェックシート ｜ 回答状況">
      <div className="p-5">
        <div className="flex items-end justify-between">
          <p className="text-[11px] font-bold text-ink/55">回答の進み具合</p>
          <p className="font-display text-2xl font-black leading-none text-brand-500">
            42<span className="text-sm text-ink/45"> / 45問</span>
          </p>
        </div>
        <div className="mt-2 h-2 rounded-full bg-[#F1ECEE]">
          <div className="h-2 w-[93%] rounded-full bg-brand-500" />
        </div>
        <ul className="mt-4 divide-y divide-[#EEDFE3] rounded-lg border border-[#EEDFE3] text-[11px] font-bold">
          {rows.map((r) => (
            <li key={r.q} className="flex items-center gap-2 px-3 py-2">
              <span className="flex-1">{r.q}</span>
              <Pill tone={r.s === "回答済" ? "ok" : "wait"}>{r.s}</Pill>
            </li>
          ))}
        </ul>
        <p className="mt-3 flex items-center gap-2 rounded-md bg-brand-50 px-3 py-2 text-[11px] font-bold text-brand-600">
          <Icon name="person" className="h-4 w-4" />
          社外CISOとして名前を掲載
        </p>
      </div>
    </Window>
  );
}

/* ================================================== salescore 風の部品 */

/** 2段の文字 + 右端に白い四角のアイコンが付いたボタン */
function BigButton({
  label,
  sub,
  icon,
  href = `#${FORM_ID}`,
  tone = "wine",
}: {
  label: string;
  sub: string;
  icon: "check" | "doc";
  href?: string;
  tone?: "wine" | "accent" | "white";
}) {
  return (
    <a
      href={href}
      className={cn(
        "group relative inline-flex h-16 w-full min-w-[20rem] items-center justify-center pl-8 pr-20 transition hover:-translate-y-0.5 sm:w-auto md:min-w-[24rem]",
        tone === "wine" &&
          "bg-[linear-gradient(100deg,#6A1830,#A83B57)] text-white shadow-[0_12px_26px_-12px_rgba(122,30,53,0.8)]",
        tone === "accent" &&
          "bg-[linear-gradient(100deg,#FF7A55,#E64A2E)] text-white shadow-[0_12px_26px_-12px_rgba(230,74,46,0.8)]",
        tone === "white" &&
          "bg-white text-brand-600 shadow-[0_12px_26px_-14px_rgba(0,0,0,0.5)]",
      )}
    >
      <span className="text-center leading-tight">
        <span className="block text-[17px] font-black tracking-[0.04em]">
          {label}
        </span>
        <span
          className={cn(
            "mt-0.5 block text-[11px] font-bold",
            tone === "white" ? "text-ink/55" : "text-white/85",
          )}
        >
          {sub}
        </span>
      </span>
      <span
        aria-hidden="true"
        className={cn(
          "absolute right-2.5 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center",
          tone === "wine" && "bg-white text-brand-500",
          tone === "accent" && "bg-white text-[#E64A2E]",
          tone === "white" && "bg-brand-500 text-white",
        )}
      >
        <Icon name={icon} className="h-5 w-5" />
      </span>
    </a>
  );
}

/** 資料請求のCTA帯 */
function SplitCta() {
  return (
    <div className="flex flex-col items-center gap-4 bg-brand-500 px-6 py-12 text-white">
      <p className="text-sm font-bold md:text-base">
        セキュリティの専門家が、御社の現状と優先して手を打つべき点を無料で整理します
      </p>
      <BigButton
        label="無料相談"
        sub="オンライン30分・売り込みなし"
        icon="check"
        tone="white"
      />
    </div>
  );
}

/** 大きな英字 + 日本語(横並び) + 左だけ色の付いた線 */
function SectionHead({ en, children }: { en: string; children?: ReactNode }) {
  return (
    <Reveal variant="up">
      <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:gap-5">
        <p className="text-[clamp(2.4rem,5.6vw,3.8rem)] font-black uppercase leading-none tracking-[0.02em] text-brand-500">
          {en}
        </p>
        {children ? (
          <h2 className="pb-1 text-lg font-bold tracking-[0.04em] text-ink [word-break:auto-phrase] md:text-xl">
            {children}
          </h2>
        ) : null}
      </div>
      <div className="relative mt-5 h-px bg-[#E6D9DD]">
        <span className="absolute inset-y-0 left-0 w-56 -translate-y-px border-b-2 border-brand-500" />
      </div>
    </Reveal>
  );
}

/** 背景の大きな英字の透かし */
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
