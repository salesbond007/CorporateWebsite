import type { Metadata } from "next";
import Image from "next/image";
import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { JsonLd } from "@/components/seo/JsonLd";
import { CisoBeforeAfter } from "@/components/services/CisoBeforeAfter";
import { CisoIssueSlider } from "@/components/services/CisoIssueSlider";
import { LpNav } from "@/components/services/LpNav";
import {
  ReasonAiManagement,
  ReasonDocs,
  ReasonFocus,
} from "@/components/services/CisoReasonVisuals";
import { CisoServiceDiagram } from "@/components/services/CisoServiceDiagram";
import { CisoHeroVisual } from "@/components/services/CisoHeroVisual";
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

const faqs = [
  {
    q: "情報セキュリティ顧問とは、どんなサービスですか？",
    a: "社内に情報セキュリティの専門家がいない会社に、外部の専門家が顧問として入り、情報セキュリティの体制づくりを支えるサービスです。Bond AIでは、大手企業と取引したい中小企業向けに、取引先のチェックシートへの回答、AI利用ルールづくり、事故のときの手順づくりなどを、責任者（社外CISO）の立場で支援します。",
  },
  {
    q: "料金はいくらですか？",
    a: "アドバイザーは月10万円〜（税別）です。社外CISOは、会社の規模やご相談の内容に合わせてお見積もりします。まずは無料相談で、御社に必要な範囲をご案内します。",
  },
  {
    q: "個人情報漏洩やランサムウェアへの対策もできますか？",
    a: "はい。初回アセスメントで、個人情報の漏洩やランサムウェアなどのリスクを洗い出し、優先順位をつけて対策を決めます。社員がAIに入力してよい情報のルールや、事故が起きたときの連絡体制・初動の手順も整えます。",
  },
  {
    q: "社員の生成AI（ChatGPTなど）の利用も管理できますか？",
    a: "はい。AI利用ルール（使ってよいAIツール、入力してはいけない情報、導入の承認の流れ）と、社内で使うAIの一覧（AIシステム台帳）を、標準の支援に含めています。",
  },
  {
    q: "サービスの監修者はどんな人ですか？",
    a: "株式会社帝国データバンクネットコミュニケーション（株式会社帝国データバンクアクシスと合併）の元代表取締役、岡崎 弘明が監修しています。帝国データバンクグループで、情報セキュリティ関連の事業を手がける会社の代表を務めました。",
  },
  {
    q: "ほかの情報セキュリティ顧問・社外CISOとの違いは何ですか？",
    a: "サービスの種類は社外CISO（vCISO）と同じです。違いは、大手企業との取引とAIの管理に絞り、そのための支援（チェックシートの回答、取引先に出せる「情報セキュリティ体制のご案内」、取引先との打ち合わせへの同席、AI利用ルールとAIシステム台帳）を標準で入れていることです。",
  },
  {
    q: "アドバイザーと社外CISOは、何が違いますか？",
    a: "アドバイザーは相談役として助言し、判断と作業はお客さまの担当者が行います。社外CISOは責任者として判断し、作業まで引き受けます。どちらも、取引先に専門家の名前を出せます。",
  },
  {
    q: "専門家の名前を、取引先に出してもよいですか？",
    a: "はい。体制図や取引先への回答書に載せられます。載せるのは、当社が中身を確認した書類だけです。アドバイザーの場合は、平常時の助言という範囲がわかる肩書きで載せます。",
  },
  {
    q: "ISMSなどの規格をまだ取っていなくても、大丈夫ですか？",
    a: "はい。規格の取得には、準備から半年〜1年ほどかかるのが一般的です。取得の前から専門家がつき、取引先に責任者と体制を説明できるようにします。",
  },
  {
    q: "取引先の審査に通ることを約束してもらえますか？",
    a: "審査の結果をお約束することはできません。取引先の質問に答え、対策を説明できる体制を整える支援を行います。",
  },
  {
    q: "まだAIをほとんど使っていませんが、対象になりますか？",
    a: "はい。チェックシートへの回答、規程づくり、事故のときの初動など、情報セキュリティの責任者としての役割がすべて対象です。これからAIを導入する会社にもおすすめです。",
  },
  {
    q: "事故（インシデント）が起きたときは、どこまで対応してもらえますか？",
    a: "社外CISOでは、事故が起きたときに最初に何をするかの判断を含みます。アドバイザーには、事故のときの対応は含まれません。",
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

/* ------------------------------------------------------------ 図・グラフ */

/* ================================================================ ページ */

export default function CisoPage({ params }: { params: { locale: string } }) {
  if (!isLocale(params.locale)) notFound();
  const locale = params.locale;
  const base = site.url.replace(/\/$/, "");
  const url = `${base}${localePath(PATH, locale)}`;

  const nav = [
    { href: "#issue", label: "必須の時代" },
    { href: "#service", label: "サービス" },
    { href: "#structure", label: "体制づくり" },
    { href: "#reason", label: "選ばれる理由" },
    { href: "#expert", label: "サービス監修" },
    { href: "#faq", label: "よくある質問" },
    { href: `#${FORM_ID}`, label: "お申し込み" },
  ];

  return (
    <div className="bg-white font-sans font-medium not-italic text-ink [&_em]:not-italic [&_em]:text-brand-500 [&_text]:[font-family:inherit]">
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "ホーム", url: localePath("/", locale) },
            { name: "サービス一覧", url: localePath("/services", locale) },
            {
              name: "AIセキュリティ対策事業",
              url: localePath("/services/security", locale),
            },
            {
              name: "Bond AI 情報セキュリティ顧問（社外CISO）",
              url: localePath(PATH, locale),
            },
          ]),
          {
            "@context": "https://schema.org",
            "@type": "Service",
            "@id": `${url}#service`,
            name: "Bond AI 情報セキュリティ顧問（大手企業と取引したい中小企業のための社外CISO）",
            alternateName: [
              "情報セキュリティ顧問",
              "セキュリティ顧問",
              "社外CISO",
              "vCISO",
              "CISO as a Service",
              "AIセキュリティ顧問",
            ],
            serviceType: "情報セキュリティ顧問・社外CISO",
            category: "情報セキュリティ",
            description: pageMeta.ciso.description,
            keywords: pageMeta.ciso.keywords.join(", "),
            url,
            areaServed: { "@type": "Country", name: "日本" },
            availableLanguage: "ja",
            provider: {
              "@type": "Organization",
              name: site.legalName,
              url: base,
            },
            audience: {
              "@type": "BusinessAudience",
              audienceType: "大手企業と取引したい中小企業・中堅企業",
            },
            offers: {
              "@type": "Offer",
              name: "アドバイザー",
              priceCurrency: "JPY",
              priceSpecification: {
                "@type": "UnitPriceSpecification",
                minPrice: 100000,
                priceCurrency: "JPY",
                unitText: "月",
                valueAddedTaxIncluded: false,
              },
            },
            hasOfferCatalog: {
              "@type": "OfferCatalog",
              name: "情報セキュリティ顧問のプラン",
              itemListElement: [
                {
                  "@type": "Offer",
                  itemOffered: {
                    "@type": "Service",
                    name: "アドバイザー（情報セキュリティ顧問）",
                  },
                },
                {
                  "@type": "Offer",
                  itemOffered: {
                    "@type": "Service",
                    name: "社外CISO（vCISO）",
                  },
                },
              ],
            },
          },
          {
            "@context": "https://schema.org",
            "@type": "WebPage",
            "@id": url,
            url,
            name: pageMeta.ciso.title,
            description: pageMeta.ciso.description,
            inLanguage: "ja",
            about: { "@id": `${url}#service` },
            reviewedBy: {
              "@type": "Person",
              name: "岡崎 弘明",
              alternateName: "オカザキ ヒロアキ",
              jobTitle: "サービス監修",
              description:
                "株式会社帝国データバンクネットコミュニケーション（株式会社帝国データバンクアクシスと合併）元代表取締役。帝国データバンクグループで、情報セキュリティ関連の事業を手がける会社の代表を務めた。",
              knowsAbout: ["情報セキュリティ", "情報セキュリティ体制の構築"],
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
        <Container className="flex h-16 items-center gap-4 md:h-[4.5rem] xl:gap-6">
          <a href="#top" className="flex shrink-0 items-center gap-2.5">
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
              <span className="hidden text-[10px] font-bold text-ink/55 sm:block lg:hidden xl:block">
                大手企業と取引する会社の情報セキュリティ顧問
              </span>
            </span>
          </a>
          <LpNav items={nav} variant="desktop" />
          <a
            href={`#${FORM_ID}`}
            className="ml-auto inline-flex h-10 shrink-0 items-center rounded-none bg-[linear-gradient(100deg,#FF7A55,#E64A2E)] px-4 text-sm font-bold text-white shadow-[0_8px_18px_-10px_rgba(230,74,46,0.9)] sm:px-5 lg:ml-2"
          >
            無料相談
          </a>
        </Container>
        <LpNav items={nav} variant="mobile" />
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
        <Container className="grid items-center gap-6 pb-14 pt-6 md:gap-12 md:pb-20 md:pt-16 lg:grid-cols-[1fr_1.1fr]">
          <div className="min-w-0 text-center lg:text-left">
            <h1>
              <span className="block text-[clamp(0.95rem,4.4vw,1.6rem)] font-bold text-ink/85 lg:text-[clamp(1.05rem,2vw,1.6rem)]">
                <span className="underline decoration-brand-500 decoration-[3px] underline-offset-[7px]">
                  大手企業と取引したい
                </span>
                中小企業のための
              </span>
              <span className="mt-3 block whitespace-nowrap text-[clamp(1.6rem,8vw,3.3rem)] font-black leading-[1.2] tracking-[0.02em] lg:text-[clamp(2rem,3.6vw,3.3rem)]">
                情報セキュリティ<span className="text-brand-500">顧問</span>
              </span>
            </h1>
            <p className="mt-4 flex items-baseline justify-center gap-1 lg:justify-start">
              <span className="text-lg font-black">月</span>
              <span className="text-[clamp(2.4rem,4vw,3.4rem)] font-black leading-none tracking-tight text-brand-500">
                10万円
              </span>
              <span className="text-xl font-black text-brand-500">〜</span>
              <span className="ml-1 text-sm font-bold text-ink/60">
                （税別）
              </span>
            </p>
            <p className="mt-6 text-[clamp(1.05rem,1.7vw,1.35rem)] font-bold leading-[1.8] text-ink/85">
              <span className="text-brand-500">AI時代</span>に必須の
              <br className="sm:hidden" />
              情報セキュリティ体制を<span className="text-brand-500">構築</span>
              する
            </p>
            <div className="mt-10 flex justify-center lg:block">
              <BigButton label="無料相談" icon="check" href="#check" />
            </div>
          </div>
          <div className="order-first mx-auto w-full min-w-0 max-w-[520px] lg:order-none lg:-mr-6 lg:max-w-none xl:-mr-12">
            <CisoHeroVisual />
          </div>
        </Container>
      </section>

      {/* ========== 3. 情報セキュリティ対策が必須の時代に ========== */}
      <section id="issue" className="scroll-mt-28 bg-[#F3ECEE] pt-16 md:pt-24">
        <Container>
          <Reveal variant="up" className="text-center">
            <h2 className="text-[clamp(1.5rem,3vw,2.2rem)] font-black leading-[1.5]">
              <span className="text-brand-500">情報セキュリティ対策</span>が
              <br className="sm:hidden" />
              必須の時代に
            </h2>
          </Reveal>
          <div className="mx-auto mt-8 max-w-6xl md:mt-12">
            <CisoIssueSlider />
          </div>
        </Container>

        {/* 下矢印: お任せください */}
        <div className="relative mt-14 bg-[#FBF6F7]">
          <Reveal
            variant="up"
            className="bg-brand-500 py-8 text-center text-white md:py-10"
          >
            <p className="text-[clamp(1.3rem,2.8vw,2rem)] font-black leading-[1.5]">
              情報セキュリティの体制づくりは
              <br className="sm:hidden" />
              お任せください
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
        <Container>
          <Reveal variant="up" className="text-center">
            <h2 className="text-[clamp(1.5rem,3.2vw,2.4rem)] font-black leading-[1.5] [word-break:auto-phrase]">
              <span className="text-brand-500">
                大手企業と取引したい中小企業
              </span>
              に、
              <br className="hidden sm:block" />
              <span className="text-brand-500">情報セキュリティ顧問</span>を。
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-[15px] font-medium leading-[2] text-ink/80">
              当社の専門家が社外の情報セキュリティ責任者として入り、取引先に「この会社なら任せて大丈夫」と説明できる体制を、責任者ごと用意します。
            </p>
          </Reveal>

          {/* 図: 月額で任せて情報セキュリティを強化 */}
          <div className="mt-10">
            <CisoBeforeAfter />
          </div>
        </Container>

        {/* 図: サービスの全体像(4ステップ × 2プラン)。背景は横幅いっぱい */}
        <div id="structure" className="mt-14 scroll-mt-28 md:mt-20">
          <Reveal variant="fade">
            <CisoServiceDiagram />
          </Reveal>
        </div>

        <div className="mt-20 md:mt-24">
          <SplitCta />
        </div>
      </section>

      {/* ========== 5. 選ばれる理由 ========== */}
      <section
        id="reason"
        className="relative isolate scroll-mt-28 overflow-hidden bg-white py-20 md:py-28"
      >
        <Watermark className="-right-6 top-4">Reason</Watermark>
        <Container>
          <SectionHead en="Reason">選ばれる理由</SectionHead>
          <div className="mt-4 md:mt-6">
            {[
              {
                title: (
                  <>
                    大手企業・上場企業が求める水準に合わせて、
                    <span className="text-brand-500">体制を整える</span>
                  </>
                ),
                key: "f1",
                text: "チェックシートの回答、取引先に出せる「情報セキュリティ体制のご案内」など、取引の場面に合わせて支援します。",
                stat: null,
                visual: <ReasonDocs />,
              },
              {
                title: (
                  <>
                    社員のAI利用の管理まで、
                    <span className="text-brand-500">標準で含む</span>
                  </>
                ),
                key: "f2",
                text: "AI利用ルールと、社内で使うAIの一覧（AIシステム台帳）を、責任者の仕事として標準の支援に含めます。",
                stat: {
                  before: "AIの明確な責任者を決めている大手企業は",
                  num: "26.8%",
                  source: "KPMG「サイバーセキュリティサーベイ2026/27」速報",
                },
                visual: <ReasonAiManagement />,
              },
              {
                title: (
                  <>
                    必要な対策に絞り、
                    <span className="text-brand-500">
                      ムダなコストをかけない
                    </span>
                  </>
                ),
                key: "f3",
                text: "大企業と同じ規程や手続きをそのまま入れると、費用も手間もかさみます。当社は、取引先に求められる水準から逆算して、必要な対策に絞って整えます。初回アセスメントで優先順位を決めるので、やらなくてよいことにお金をかけずに済みます。",
                stat: null,
                visual: <ReasonFocus />,
              },
            ].map((r, i) => (
              <Reveal key={r.key} variant="up">
                <article
                  className={cn(
                    "grid grid-cols-[minmax(0,1fr)] items-center gap-6 py-10 md:gap-10 md:py-14 lg:grid-cols-2 lg:gap-14",
                    i > 0 && "border-t border-[#EADFE2]",
                  )}
                >
                  <div>{r.visual}</div>
                  <div>
                    <p className="flex items-baseline gap-3 font-black text-brand-500">
                      <span className="text-xs tracking-[0.24em] md:text-sm">
                        REASON
                      </span>
                      <span className="text-[2.6rem] leading-none md:text-[3.4rem]">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </p>
                    <h3 className="mt-3 text-[clamp(1.3rem,2.4vw,1.9rem)] font-black leading-[1.55] [word-break:auto-phrase]">
                      {r.title}
                    </h3>
                    <p className="mt-4 border-t border-[#EADFE2] pt-4 text-[15px] leading-[2] text-ink/80 md:mt-5 md:pt-5">
                      {r.text}
                    </p>
                    {r.stat ? (
                      <div className="mt-5 border-l-4 border-brand-500 bg-[#FBF6F7] px-4 py-3 md:mt-6 md:px-5 md:py-4">
                        <p className="text-[14px] font-bold leading-relaxed text-ink md:text-[15px]">
                          {r.stat.before}
                          <span className="mx-0.5 text-[1.6rem] font-black leading-none text-brand-500 md:text-[1.9rem]">
                            {r.stat.num}
                          </span>
                        </p>
                        <p className="mt-1.5 text-xs text-ink/60">
                          （{r.stat.source}）
                        </p>
                      </div>
                    ) : null}
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* ========== 8. 監修者 ========== */}
      <section
        id="expert"
        className="relative isolate scroll-mt-28 overflow-hidden py-20 md:py-28"
      >
        <Watermark className="-left-4 top-4">Expert</Watermark>
        <Container>
          <SectionHead en="Expert">サービス監修</SectionHead>
          <Reveal
            variant="up"
            className="mt-12 grid gap-8 overflow-hidden rounded-lg bg-white shadow-[0_20px_44px_-34px_rgba(0,0,0,0.4)] ring-1 ring-[#EEE5E8] md:grid-cols-[18rem_1fr] lg:grid-cols-[22rem_1fr]"
          >
            {/* 写真 */}
            <div className="relative aspect-[4/5] w-full bg-[#F1ECEE] md:aspect-auto md:min-h-[24rem]">
              <Image
                src="/photos/ciso/okazaki.webp"
                alt="岡崎 弘明"
                fill
                sizes="(max-width:768px) 100vw, 22rem"
                className="object-cover object-top"
              />
            </div>
            <div className="flex flex-col justify-center px-6 pb-9 md:py-12 md:pr-12">
              <h3>
                <span className="block text-[clamp(1.75rem,3vw,2.25rem)] font-black tracking-[0.08em] text-ink">
                  岡崎 弘明
                </span>
                <span className="mt-1 block text-xs font-bold tracking-[0.2em] text-ink/50">
                  （オカザキ ヒロアキ）
                </span>
              </h3>
              <p className="mt-6 border-l-[3px] border-brand-500 pl-4 leading-[1.7]">
                <span className="block text-base font-bold text-brand-500 md:text-lg">
                  元代表取締役
                </span>
                <span className="block text-base font-bold text-ink md:text-lg">
                  株式会社帝国データバンクネットコミュニケーション
                </span>
                <span className="mt-1 block text-xs text-ink/60">
                  ※株式会社帝国データバンクアクシスと合併
                </span>
              </p>
              <p className="mt-7 border-t border-[#EEE5E8] pt-7 text-[15px] leading-[2.05] text-ink/80">
                帝国データバンクグループで、情報セキュリティ関連の事業を手がける会社の代表取締役を務める。
                <br />
                サービスの監修者として、支援の品質を確認し、難しい判断の相談役を務めます。
              </p>
            </div>
          </Reveal>
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

      {/* ========== 右端に浮かぶ無料相談ボタン ========== */}
      {/* PC: 画面右端の中央に縦長のタブ */}
      <a
        href={`#${FORM_ID}`}
        className="fixed right-0 top-1/2 z-50 hidden -translate-y-1/2 flex-col items-center gap-3 bg-[linear-gradient(180deg,#FF7A55,#E64A2E)] px-3.5 py-6 text-white shadow-[0_10px_28px_-10px_rgba(230,74,46,0.9)] transition-[padding] hover:pr-5 md:flex"
      >
        <Icon name="check" className="h-5 w-5" />
        <span className="text-[15px] font-black tracking-[0.2em] [writing-mode:vertical-rl]">
          無料相談
        </span>
      </a>
      {/* スマホ: 右下に丸いボタン */}
      <a
        href={`#${FORM_ID}`}
        aria-label="無料相談"
        className="fixed bottom-4 right-4 z-50 flex h-16 w-16 flex-col items-center justify-center rounded-full bg-[linear-gradient(135deg,#FF7A55,#E64A2E)] text-white shadow-[0_10px_24px_-8px_rgba(230,74,46,0.9)] md:hidden"
      >
        <Icon name="check" className="h-5 w-5" />
        <span className="mt-0.5 text-[11px] font-black leading-none">
          無料相談
        </span>
      </a>

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
            <p className="text-base font-black">Bond AI 情報セキュリティ顧問</p>
            <p className="text-sm text-white/60">／ 運営：{site.legalName}</p>
          </div>
          <div className="mt-6 border-t border-white/15 pt-6 text-[11px] leading-[1.9] text-white/55">
            <p>
              注記：当社が認証を出すものではありません。取引先の審査の結果をお約束するものではありません。
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
  sub?: string;
  icon: "check" | "doc";
  href?: string;
  tone?: "wine" | "accent" | "white";
}) {
  return (
    <a
      href={href}
      className={cn(
        "group relative inline-flex h-16 w-full items-center justify-center pl-8 pr-20 transition hover:-translate-y-0.5 sm:w-auto sm:min-w-[20rem] md:min-w-[24rem]",
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
        {sub ? (
          <span
            className={cn(
              "mt-0.5 block text-[11px] font-bold",
              tone === "white" ? "text-ink/55" : "text-white/85",
            )}
          >
            {sub}
          </span>
        ) : null}
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
      <BigButton label="無料相談" icon="check" tone="white" />
    </div>
  );
}

/** 大きな英字 + 日本語(横並び) + 左だけ色の付いた線 */
function SectionHead({ en, children }: { en: string; children?: ReactNode }) {
  return (
    <Reveal variant="up">
      <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:gap-5">
        {en ? (
          <p className="text-[clamp(2.4rem,5.6vw,3.8rem)] font-black uppercase leading-none tracking-[0.02em] text-brand-500">
            {en}
          </p>
        ) : null}
        {children ? (
          <h2
            className={cn(
              "pb-1 font-bold tracking-[0.04em] text-ink [word-break:auto-phrase]",
              en
                ? "text-lg md:text-xl"
                : "text-[clamp(1.6rem,3vw,2.2rem)] font-black",
            )}
          >
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
