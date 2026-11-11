import type { Metadata } from "next";
import Image from "next/image";
import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { JsonLd } from "@/components/seo/JsonLd";
import { LpHeader } from "@/components/services/LpHeader";
import { ServiceLeadForm } from "@/components/contact/ServiceLeadForm";
import { breadcrumbJsonLd } from "@/lib/jsonld";
import { pageMeta, pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";
import { cn } from "@/lib/cn";
import { localePath } from "@/i18n/path";
import { isLocale } from "@/i18n/config";

const PATH = "/services/ciso";
const FORM_ID = "consult";

export function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Metadata {
  if (!isLocale(params.locale)) return {};
  return pageMetadata({ ...pageMeta.ciso, path: PATH, locale: params.locale });
}

/* ------------------------------------------------------------------ データ */

const WINE = "#7A1E35";

/** 課題(キーワードをワインレッドで強調) */
const problems: { text: ReactNode; image: string }[] = [
  {
    text: (
      <>
        社員が生成AIを
        <br />
        使っているが
        <br />
        <em>利用ルール</em>がない
      </>
    ),
    image: "/illustrations/ld-1523-wine.webp",
  },
  {
    text: (
      <>
        取引先からの
        <br />
        <em>チェックシート</em>に
        <br />
        答えられない
      </>
    ),
    image: "/illustrations/ld-1531-wine.webp",
  },
  {
    text: (
      <>
        <em>上場準備</em>で
        <br />
        セキュリティ体制の
        <br />
        整備を求められる
      </>
    ),
    image: "/illustrations/ld-742-wine.webp",
  },
  {
    text: (
      <>
        大手企業との取引で
        <br />
        <em>セキュリティの説明</em>を
        <br />
        求められる
      </>
    ),
    image: "/illustrations/ld-1538-wine.webp",
  },
  {
    text: (
      <>
        セキュリティの
        <br />
        <em>専任者</em>を
        <br />
        採用できない
      </>
    ),
    image: "/illustrations/ld-1528-wine.webp",
  },
];

/** 中央の図: 社外CISOが担う領域 */
const domains = [
  "AI利用ルール",
  "AIツール審査",
  "チェックシート",
  "権限設計",
  "攻撃への備え",
  "実態調査",
  "月次報告",
  "研修",
];

/** 6つの標準メニュー */
const menus = [
  {
    title: "AI利用の実態調査",
    text: "社員アンケートと利用ツールの洗い出しで、許可なく使われているAI（シャドーAI）を把握します。",
    image: "/illustrations/ld-1395-wine.webp",
  },
  {
    title: "AI利用ガイドライン",
    text: "入力してよい情報とだめな情報、使ってよいツール、導入時の承認の流れを決めます。",
    image: "/illustrations/ld-1817-wine.webp",
  },
  {
    title: "AIツールの導入前チェック",
    text: "利用規約、データの保存先、入力データが学習に使われるか、権限を確認し、導入してよいかを判定します。",
    image: "/illustrations/ld-1381-wine.webp",
  },
  {
    title: "取引先へのAI利用の説明",
    text: "セキュリティチェックシートのAI関連の設問への回答と、取引先向けの説明資料を作ります。",
    image: "/illustrations/ld-1498-wine.webp",
  },
  {
    title: "社内AI・AIエージェントの権限設計",
    text: "AIに渡すデータの範囲、操作の権限、利用ログの残し方を決めます。",
    image: "/illustrations/ld-1834-wine.webp",
  },
  {
    title: "AIを使った攻撃への備え",
    text: "なりすましメールやディープフェイクによる送金詐欺への注意喚起と、社内の確認手順をつくります。",
    image: "/illustrations/ld-1636-wine.webp",
  },
];

const reasons = [
  {
    lead: "セキュリティだけでなく、",
    em: "AIを安全に使える状態をつくる",
    label: "AI時代の専門家",
    text: "「セキュリティの専門家」としてだけでなく、「AIを安全に使えるようにする専門家」として伴走します。禁止するのではなく、社員がAIを安心して使える状態を目指します。",
    image: "/illustrations/ld-947-wine.webp",
  },
  {
    lead: "取引先や監査に、",
    em: "説明できるセキュリティへ",
    label: "説明責任",
    text: "セキュリティチェックシートへの回答や説明資料づくりまで支援。上場準備や大手企業・エンタープライズとの取引で求められる「説明できる状態」を整えます。",
    image: "/illustrations/ld-1498-wine.webp",
  },
  {
    lead: "専任者を採用しなくても、",
    em: "CISOの役割を月額で",
    label: "社外CISO",
    text: "セキュリティ専任者の採用は難しく、時間もかかります。社外CISOとして方針づくりから運用・報告まで引き受け、必要な体制をすぐに整えます。",
    image: "/illustrations/ld-1381-wine.webp",
  },
];

const plans = [
  {
    name: "顧問",
    target: "従業員30〜100名程度",
    items: [
      "月1回の定例（60分）",
      "メールでのご相談",
      "AI利用ガイドラインのひな形",
      "AIツール導入のご相談",
    ],
  },
  {
    name: "AI社外CISO",
    target: "従業員50〜300名程度",
    recommended: true,
    items: [
      "月1回の定例（90分）",
      "チャットでのご相談",
      "自社用のAI利用ガイドラインの作成・改定",
      "AIツールの導入前チェック",
      "セキュリティチェックシートの回答",
      "月次報告・緊急時の初動の助言",
    ],
  },
  {
    name: "AI社外CISO（経営参画）",
    target: "従業員100〜1,000名程度",
    items: [
      "月2回の定例＋経営会議への参加",
      "部門ごとのAI運用まで担当",
      "社内AI・AIエージェントの権限設計",
      "経営向けの四半期報告",
      "年1回のAI安全利用研修",
      "緊急時の初動の助言と訪問対応",
    ],
  },
];

const targets = [
  "上場準備（IPO）を進めている企業",
  "大手企業・エンタープライズとの取引を広げたいベンチャー",
  "生成AIを業務に取り入れたい・すでに使っている企業",
  "セキュリティ専任者がいない従業員50〜300名の企業",
];

const flow = [
  {
    title: "無料相談",
    text: "AIの利用状況とセキュリティの課題をお聞かせください。",
  },
  {
    title: "初回診断",
    text: "AI利用の実態調査を含め、現状とリスクを整理します。",
  },
  {
    title: "プランのご提案",
    text: "会社の規模と目的に合わせたプランをご提案します。",
  },
  {
    title: "ご契約・伴走開始",
    text: "定例とご相談対応を通じて、体制づくりを進めます。",
  },
];

/** AI検索・検索エンジン向けに、用語の定義も含めて回答する */
const faqs = [
  {
    q: "社外CISOとは何ですか？",
    a: "社外CISO（vCISO・CISO as a Service）とは、社外の専門家が最高情報セキュリティ責任者（CISO）の役割を担うサービスです。セキュリティ専任者を採用しなくても、情報セキュリティの方針づくり、体制整備、取引先や監査への説明を任せられます。",
  },
  {
    q: "セキュリティ顧問と社外CISOの違いは何ですか？",
    a: "セキュリティ顧問は、定例の打ち合わせやご相談への回答を中心とした助言型の支援です。社外CISOは、AI利用ルールの作成・改定、AIツールの導入前チェック、セキュリティチェックシートの回答、月次報告など、実務まで踏み込んで体制づくりを担う伴走型の支援です。",
  },
  {
    q: "生成AIの利用ガイドライン（AIポリシー）を作ってもらえますか？",
    a: "はい。入力してよい情報とだめな情報、使ってよいAIツール、導入時の承認の流れを決め、御社に合わせたAI利用ガイドラインを作成します。顧問プランではひな形をご提供します。",
  },
  {
    q: "上場準備（IPO）や大手企業との取引に必要なセキュリティ対応もできますか？",
    a: "はい。情報セキュリティ体制の整備や、取引先・監査に説明できる資料づくりを支援します。大手企業・エンタープライズとの取引で求められるセキュリティチェックシートへの回答も支援します。",
  },
  {
    q: "どのような企業が対象ですか？",
    a: "生成AIを業務に取り入れたい、またはすでに使っている中小〜中堅企業が主な対象です。特に、従業員50〜300名程度でセキュリティ専任者がいない企業に向いています。",
  },
  {
    q: "契約期間はどのくらいですか？",
    a: "最低契約期間は6カ月です。はじめにAI利用の実態調査を含む初回診断を行い、御社に合ったプランをご提案します。料金は内容に応じてお見積もりします。",
  },
];

/* --------------------------------------------------------------- 小さな部品 */

/** 2段組みのピル型ボタン(メイン文言 + 小さな補足 + 右端の丸アイコン) */
function Cta({
  label,
  sub,
  href = `#${FORM_ID}`,
  tone = "wine",
  className,
}: {
  label: string;
  sub?: string;
  href?: string;
  tone?: "wine" | "accent" | "white";
  className?: string;
}) {
  return (
    <a
      href={href}
      className={cn(
        "group relative inline-flex h-16 min-w-[16rem] items-center justify-center rounded-full pl-8 pr-16 text-center transition duration-300 hover:-translate-y-0.5",
        tone === "wine" &&
          "bg-[linear-gradient(100deg,#61162A,#A83B57)] text-white shadow-[0_14px_30px_-12px_rgba(122,30,53,0.8)]",
        tone === "accent" &&
          "bg-[linear-gradient(100deg,#FF8C64,#E6320A)] text-white shadow-[0_14px_30px_-12px_rgba(230,50,10,0.7)]",
        tone === "white" &&
          "bg-white text-[#7A1E35] shadow-[0_14px_30px_-14px_rgba(29,5,11,0.5)]",
        className,
      )}
    >
      <span className="leading-tight">
        <span className="block text-[17px] font-black tracking-[0.04em]">
          {label}
        </span>
        {sub ? (
          <span
            className={cn(
              "mt-0.5 block text-[11px] font-bold",
              tone === "white" ? "text-[#7A6A6F]" : "text-white/85",
            )}
          >
            {sub}
          </span>
        ) : null}
      </span>
      <span
        aria-hidden="true"
        className={cn(
          "absolute right-2 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full text-lg transition-transform duration-300 group-hover:translate-x-0.5",
          tone === "white" ? "bg-[#7A1E35] text-white" : "bg-white",
          tone === "wine" && "text-[#7A1E35]",
          tone === "accent" && "text-[#E6320A]",
        )}
      >
        →
      </span>
    </a>
  );
}

/** 大きな英字 + 日本語を横並び + 下線(左側だけワインレッド) */
function Heading({
  en,
  children,
  dark,
}: {
  en: string;
  children: ReactNode;
  dark?: boolean;
}) {
  return (
    <Reveal variant="up">
      <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:gap-5">
        <p
          className={cn(
            "font-display text-[clamp(2.6rem,6vw,4rem)] font-black uppercase leading-none tracking-[0.02em]",
            dark ? "text-white" : "text-[#7A1E35]",
          )}
        >
          {en}
        </p>
        <h2
          className={cn(
            "pb-1 text-lg font-bold tracking-[0.06em] md:text-xl",
            dark ? "text-white" : "text-[#1A1A1A]",
          )}
        >
          {children}
        </h2>
      </div>
      <div
        className={cn(
          "relative mt-5 h-px",
          dark ? "bg-white/25" : "bg-[#EEDFE3]",
        )}
      >
        <span
          className={cn(
            "absolute inset-y-0 left-0 w-56 -translate-y-px border-b-2",
            dark ? "border-white" : "border-[#7A1E35]",
          )}
        />
      </div>
    </Reveal>
  );
}

/** 背景に敷く大きな英字の透かし */
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
        "pointer-events-none absolute select-none font-display text-[clamp(5rem,14vw,12rem)] font-black uppercase leading-none tracking-tight text-[#7A1E35]/[0.05]",
        className,
      )}
    >
      {children}
    </p>
  );
}

function Check({ dark }: { dark?: boolean }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full text-[11px] font-black text-white",
        dark ? "bg-[#A83B57]" : "bg-[#7A1E35]",
      )}
    >
      ✓
    </span>
  );
}

/** ファーストビュー右側: セキュリティ管理画面風のビジュアル(イメージ) */
function SecurityDashboard() {
  const rows = [
    { name: "ChatGPT Enterprise", state: "承認済み", tone: "ok" },
    { name: "議事録AIツール", state: "審査中", tone: "wait" },
    { name: "無料の翻訳AI", state: "利用禁止", tone: "ng" },
  ] as const;
  return (
    <div className="relative">
      <div className="overflow-hidden rounded-xl bg-white shadow-[0_40px_90px_-40px_rgba(29,5,11,0.55)] ring-1 ring-[#EEDFE3]">
        <div className="flex items-center gap-2 border-b border-[#EEDFE3] bg-[#FBF6F7] px-4 py-2.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[#FF5028]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#FFC53D]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#2BC48A]" />
          <span className="ml-3 h-5 flex-1 rounded bg-white ring-1 ring-[#EEDFE3]" />
        </div>
        <div className="grid grid-cols-[4.5rem_1fr] text-[#1A1A1A]">
          <div className="space-y-3 border-r border-[#EEDFE3] bg-[#FBF6F7] p-3">
            {["方針", "AI", "審査", "回答", "報告"].map((m, i) => (
              <p
                key={m}
                className={cn(
                  "rounded-md px-2 py-1.5 text-center text-[10px] font-bold",
                  i === 2 ? "bg-[#7A1E35] text-white" : "text-[#7A6A6F]",
                )}
              >
                {m}
              </p>
            ))}
          </div>
          <div className="p-4 md:p-5">
            <p className="text-xs font-bold">AIツール 導入前チェック</p>
            <div className="mt-3 grid grid-cols-3 gap-2">
              {[
                { k: "AI利用ルール", v: "整備済", c: "text-[#7A1E35]" },
                { k: "チェックシート", v: "回答済", c: "text-[#2BA36B]" },
                { k: "シャドーAI", v: "把握", c: "text-[#E6320A]" },
              ].map((x) => (
                <div key={x.k} className="rounded-lg bg-[#FBF6F7] px-2 py-2">
                  <p className="text-[9px] font-bold text-[#7A6A6F]">{x.k}</p>
                  <p
                    className={cn(
                      "mt-0.5 text-sm font-black leading-none md:text-base",
                      x.c,
                    )}
                  >
                    {x.v}
                  </p>
                </div>
              ))}
            </div>
            <ul className="mt-4 divide-y divide-[#EEDFE3] rounded-lg ring-1 ring-[#EEDFE3]">
              {rows.map((r) => (
                <li
                  key={r.name}
                  className="flex items-center justify-between gap-2 px-3 py-2.5 text-[11px] font-bold"
                >
                  <span className="truncate">{r.name}</span>
                  <span
                    className={cn(
                      "shrink-0 rounded-full px-2 py-0.5 text-[10px]",
                      r.tone === "ok" && "bg-[#E3F5EC] text-[#1E8A57]",
                      r.tone === "wait" && "bg-[#FFF3D6] text-[#9A6B00]",
                      r.tone === "ng" && "bg-[#FBEAEE] text-[#7A1E35]",
                    )}
                  >
                    {r.state}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* 盾のカード */}
      <div className="absolute -bottom-8 -left-4 w-56 animate-float-y rounded-xl bg-white p-4 shadow-[0_24px_50px_-24px_rgba(29,5,11,0.6)] ring-1 ring-[#EEDFE3] md:-left-10">
        <p className="text-[10px] font-bold tracking-[0.15em] text-[#7A1E35]">
          REPORT
        </p>
        <div className="mt-2 flex items-center gap-3">
          <span
            className="grid h-10 w-10 place-items-center rounded-full bg-[#FBEAEE]"
            aria-hidden="true"
          >
            <svg
              viewBox="0 0 24 24"
              className="h-6 w-6"
              fill="none"
              stroke={WINE}
              strokeWidth="2"
              strokeLinejoin="round"
            >
              <path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6z" />
              <path d="M9 12l2 2 4-4" strokeLinecap="round" />
            </svg>
          </span>
          <div className="leading-tight">
            <p className="text-sm font-black text-[#1A1A1A]">月次報告を提出</p>
            <p className="text-[11px] font-bold text-[#7A6A6F]">
              取引先・監査に説明できます
            </p>
          </div>
        </div>
      </div>
      <div className="absolute -right-3 -top-5 animate-float-y rounded-full bg-[#1D050B] px-4 py-2 text-xs font-bold text-white shadow-lg [animation-delay:-1.5s] md:-right-6">
        AIを、<span className="text-[#E4A0B0]">安全に</span>使える会社へ
      </div>
    </div>
  );
}

/** 中央に「社外CISO」、周りに担う領域を配した円形の図 */
function DomainCircle() {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[420px]">
      <div
        aria-hidden="true"
        className="absolute inset-[13%] rounded-full border border-dashed border-white/40"
      />
      <div className="absolute left-1/2 top-1/2 grid h-[34%] w-[34%] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white text-center text-[#1A1A1A] shadow-[0_0_60px_-10px_rgba(228,160,176,0.8)]">
        <div>
          <p className="text-[10px] font-bold tracking-[0.2em] text-[#7A1E35]">
            vCISO
          </p>
          <p className="mt-1 text-base font-black leading-tight md:text-lg">
            社外
            <br />
            CISO
          </p>
        </div>
      </div>
      {domains.map((d, i) => {
        const a = ((-90 + (360 / domains.length) * i) * Math.PI) / 180;
        const x = 50 + 37 * Math.cos(a);
        const y = 50 + 37 * Math.sin(a);
        return (
          <span
            key={d}
            className="absolute grid h-[23%] w-[23%] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-white/60 bg-[#1D050B]/70 px-1 text-center text-[10px] font-bold leading-tight text-white backdrop-blur-sm md:text-[11px]"
            style={{ left: `${x}%`, top: `${y}%` }}
          >
            {d}
          </span>
        );
      })}
    </div>
  );
}

/* ----------------------------------------------------------------- ページ */

export default function CisoPage({ params }: { params: { locale: string } }) {
  if (!isLocale(params.locale)) notFound();
  const locale = params.locale;
  const base = site.url.replace(/\/$/, "");

  return (
    <div className="bg-white font-medium text-[#1A1A1A] [&_em]:not-italic [&_em]:text-[#7A1E35]">
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "ホーム", url: localePath("/", locale) },
            { name: "サービス一覧", url: localePath("/services", locale) },
            {
              name: "セキュリティ対策事業",
              url: localePath("/services/security", locale),
            },
            { name: "CISO・セキュリティ顧問", url: localePath(PATH, locale) },
          ]),
          {
            "@context": "https://schema.org",
            "@type": "Service",
            name: "CISO・セキュリティ顧問（AI時代の社外CISO）",
            alternateName: [
              "社外CISO",
              "vCISO",
              "CISO as a Service",
              "セキュリティ顧問",
              "AIセキュリティ顧問",
            ],
            serviceType: "社外CISO・セキュリティ顧問",
            description: pageMeta.ciso.description,
            url: `${base}${localePath(PATH, locale)}`,
            areaServed: { "@type": "Country", name: "日本" },
            provider: {
              "@type": "Organization",
              name: site.legalName,
              url: base,
            },
            audience: {
              "@type": "BusinessAudience",
              audienceType:
                "生成AIを活用する中小〜中堅企業・上場準備企業・エンタープライズと取引するベンチャー",
            },
            hasOfferCatalog: {
              "@type": "OfferCatalog",
              name: "AI時代のセキュリティ 標準メニュー",
              itemListElement: menus.map((m) => ({
                "@type": "Offer",
                itemOffered: { "@type": "Service", name: m.title },
              })),
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

      <LpHeader
        ctaHref={`#${FORM_ID}`}
        ctaLabel="無料相談を申し込む"
        items={[
          { href: "#problem", label: "課題" },
          { href: "#about", label: "サービス概要" },
          { href: "#menu", label: "標準メニュー" },
          { href: "#reason", label: "選ばれる理由" },
          { href: "#plan", label: "プラン" },
          { href: "#flow", label: "ご支援の流れ" },
          { href: "#faq", label: "よくある質問" },
        ]}
      />

      {/* 画面右端に固定の相談ボタン(PC) */}
      <a
        href={`#${FORM_ID}`}
        className="fixed right-0 top-1/2 z-30 hidden -translate-y-1/2 flex-col items-center gap-2 rounded-l-xl bg-[#7A1E35] px-3 py-5 text-white shadow-[0_10px_30px_-10px_rgba(122,30,53,0.8)] transition hover:bg-[#61162A] lg:flex"
      >
        <svg
          viewBox="0 0 24 24"
          className="h-6 w-6"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          aria-hidden="true"
        >
          <path d="M4 5h16v11H9l-5 4z" strokeLinejoin="round" />
        </svg>
        <span className="text-sm font-bold [writing-mode:vertical-rl]">
          無料相談
        </span>
      </a>

      {/* ファーストビュー */}
      <section className="relative isolate overflow-hidden bg-[#FBF6F7]">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-40 -top-40 -z-10 h-[46rem] w-[46rem] rotate-12 bg-[linear-gradient(135deg,#F7E3E8_0%,transparent_60%)]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 opacity-50 [background-image:linear-gradient(to_right,#EEDFE3_1px,transparent_1px),linear-gradient(to_bottom,#EEDFE3_1px,transparent_1px)] [background-size:48px_48px] [mask-image:linear-gradient(to_left,black,transparent_75%)]"
        />
        <Container className="grid items-center gap-16 pb-24 pt-14 md:pb-28 md:pt-20 lg:grid-cols-[1.05fr_1fr]">
          <div>
            <p className="animate-fade-up text-sm font-bold tracking-[0.12em] text-[#7A1E35]">
              CISO・セキュリティ顧問
            </p>
            <h1
              className="mt-4 animate-fade-up text-[clamp(1.9rem,4.1vw,3.05rem)] font-bold leading-[1.4] tracking-[0.04em] [word-break:auto-phrase]"
              style={{ animationDelay: "0.1s" }}
            >
              <span className="text-[#7A1E35]">AI</span>を使う会社のための、
              <br />
              <span className="text-[#7A1E35]">社外CISO</span>
            </h1>
            <p
              className="mt-6 max-w-xl animate-fade-up text-[15px] leading-[2] text-[#1A1A1A]/85"
              style={{ animationDelay: "0.25s" }}
            >
              AI利用のルールづくりと、会社全体のセキュリティ体制づくりを月額で引き受けます。
              <br className="hidden md:block" />
              上場準備や、大手企業・エンタープライズとの取引に必要な
              <strong className="font-bold text-[#1A1A1A]">
                「説明できるセキュリティ」
              </strong>
              を整えます。
            </p>
            <div
              className="mt-9 flex animate-fade-up flex-col gap-3 sm:flex-row"
              style={{ animationDelay: "0.4s" }}
            >
              <Cta label="無料相談" sub="AIの利用状況をお聞かせください" />
              <Cta
                label="標準メニュー"
                sub="6つのメニューを見る"
                href="#menu"
                tone="accent"
              />
            </div>
          </div>
          <div
            className="animate-fade-up px-6 sm:px-10 lg:px-0"
            style={{ animationDelay: "0.3s" }}
          >
            <SecurityDashboard />
          </div>
        </Container>
      </section>

      {/* 対応領域の帯 */}
      <section className="border-y border-[#EEDFE3] bg-white py-10">
        <Container>
          <p className="text-center text-sm font-bold">
            AI時代に求められる
            <span className="text-[#7A1E35]">セキュリティ体制</span>
            をまるごと支援します
          </p>
          <ul className="mx-auto mt-6 grid max-w-4xl grid-cols-1 gap-4 sm:grid-cols-3">
            {[
              { n: "生成AIの", s: "利用ルール" },
              { n: "取引先への", s: "説明責任" },
              { n: "上場準備の", s: "体制整備" },
            ].map((x) => (
              <li
                key={x.n}
                className="flex items-baseline justify-center gap-1.5 border-[#EEDFE3] sm:border-l sm:first:border-l-0"
              >
                <span className="text-sm font-bold text-[#7A6A6F]">{x.n}</span>
                <span className="text-2xl font-black text-[#7A1E35] md:text-3xl">
                  {x.s}
                </span>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* 課題 + 解決(濃色) */}
      <section
        id="problem"
        className="relative isolate scroll-mt-28 overflow-hidden pt-20 md:pt-28"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 top-[22rem] -z-10 bg-[linear-gradient(160deg,#4A1020_0%,#1D050B_55%)] [clip-path:polygon(0_12%,100%_0,100%_100%,0_100%)] md:top-[26rem]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 top-[22rem] -z-10 opacity-[0.08] [background-image:linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] [background-size:64px_64px] md:top-[26rem]"
        />
        <Container>
          <Reveal variant="up" className="text-center">
            <p className="text-sm font-bold tracking-[0.1em] text-[#7A1E35]">
              PROBLEM
            </p>
            <h2 className="mt-3 text-[clamp(1.5rem,3vw,2.2rem)] font-bold tracking-[0.04em]">
              こんな<em>課題</em>はありませんか？
            </h2>
          </Reveal>
          <ul className="mx-auto mt-14 grid max-w-6xl grid-cols-2 gap-x-3 gap-y-10 sm:grid-cols-3 lg:grid-cols-5">
            {problems.map((p, i) => (
              <Reveal key={i} variant="up" delay={i * 80} className="h-full">
                <li className="relative flex h-full flex-col items-center rounded-lg bg-[#FBF6F7] px-3 pb-6 pt-10 text-center shadow-[0_18px_36px_-24px_rgba(29,5,11,0.55)] ring-1 ring-white">
                  <span className="absolute -top-6 left-1/2 grid h-14 w-14 -translate-x-1/2 place-items-center rounded-full bg-[#7A1E35] text-white shadow-md">
                    <span className="text-center leading-none">
                      <span className="block text-[9px] font-bold">課題</span>
                      <span className="block text-2xl font-black">{i + 1}</span>
                    </span>
                    <span
                      aria-hidden="true"
                      className="absolute -bottom-1.5 left-1/2 h-3 w-3 -translate-x-1/2 rotate-45 bg-[#7A1E35]"
                    />
                  </span>
                  <Image
                    src={p.image}
                    alt=""
                    width={400}
                    height={400}
                    className="h-24 w-auto object-contain md:h-28"
                  />
                  <p className="mt-4 text-[15px] font-bold leading-[1.6] md:text-base">
                    {p.text}
                  </p>
                  <span
                    aria-hidden="true"
                    className="mt-auto pt-4 text-[#D9B3BE]"
                  >
                    ︾
                  </span>
                </li>
              </Reveal>
            ))}
          </ul>

          <div
            id="about"
            className="grid scroll-mt-28 items-center gap-12 py-20 text-white md:py-28 lg:grid-cols-2"
          >
            <Reveal variant="scale">
              <DomainCircle />
            </Reveal>
            <Reveal variant="up">
              <p className="text-xl font-bold">CISO・セキュリティ顧問は</p>
              <p className="mt-3 text-[clamp(1.6rem,3.2vw,2.4rem)] font-bold leading-[1.55] [word-break:auto-phrase]">
                社外CISOとして、
                <span className="text-[#E4A0B0]">AIを安全に使える体制</span>を
                <span className="text-[#E4A0B0]">月額でまるごと</span>引き受ける
              </p>
              <p className="mt-3 text-xl font-bold">ことで課題を解決します</p>
              <span
                aria-hidden="true"
                className="mt-7 block h-0.5 w-14 bg-white"
              />
              <p className="mt-7 text-[15px] leading-[2.05] text-white/85">
                セキュリティの専任者がいない企業に代わって、社外CISO（最高情報セキュリティ責任者）としてAI時代のセキュリティ体制を構築します。AI利用のルールづくりから、AIツールの導入前チェック、取引先への説明、経営への報告まで伴走します。
              </p>
              <p className="mt-4 text-[15px] leading-[2.05] text-white/85">
                目指すのは、社員がAIを安全に使え、取引先や監査に説明できる状態です。
              </p>
            </Reveal>
          </div>
        </Container>

        <div className="grid text-white md:grid-cols-2">
          <div className="flex flex-col items-center gap-4 bg-[#4A1020] px-6 py-10">
            <p className="text-sm font-bold">まずは現状を相談したい方は</p>
            <Cta label="無料相談" sub="オンラインで30分から" tone="accent" />
          </div>
          <div className="flex flex-col items-center gap-4 bg-[#7A1E35] px-6 py-10">
            <p className="text-sm font-bold">プランの違いを知りたい方は</p>
            <Cta
              label="3つのプラン"
              sub="規模と目的に合わせて選べます"
              href="#plan"
              tone="white"
            />
          </div>
        </div>
      </section>

      {/* 標準メニュー */}
      <section
        id="menu"
        className="relative isolate scroll-mt-28 overflow-hidden py-20 md:py-28"
      >
        <Watermark className="-right-6 top-6">Menu</Watermark>
        <Container>
          <Heading en="Menu">AI時代のセキュリティ、6つの標準メニュー</Heading>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {menus.map((m, i) => (
              <Reveal
                key={m.title}
                variant="up"
                delay={(i % 3) * 100}
                className="h-full"
              >
                <article className="relative flex h-full flex-col overflow-hidden rounded-xl bg-white shadow-[0_24px_50px_-34px_rgba(29,5,11,0.5)] ring-1 ring-[#EEDFE3]">
                  <div className="relative grid h-40 place-items-center bg-[#FBF6F7]">
                    <Image
                      src={m.image}
                      alt=""
                      width={600}
                      height={500}
                      className="h-32 w-auto object-contain"
                    />
                    <span className="absolute left-4 top-3 font-display text-4xl font-black leading-none text-[#7A1E35]/20">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="text-lg font-bold leading-snug">
                      {m.title}
                    </h3>
                    <p className="mt-3 text-[15px] leading-[1.9] text-[#1A1A1A]/80">
                      {m.text}
                    </p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* 選ばれる理由 */}
      <section
        id="reason"
        className="relative isolate scroll-mt-28 overflow-hidden bg-[#FBF6F7] py-20 md:py-28"
      >
        <Watermark className="-left-4 top-6">Reason</Watermark>
        <Container>
          <Heading en="Reason">
            CISO・セキュリティ顧問が選ばれる3つの理由
          </Heading>
          <div className="mt-12 space-y-6">
            {reasons.map((r, i) => (
              <Reveal key={r.label} variant="up">
                <article
                  className={cn(
                    "relative grid overflow-hidden rounded-xl bg-white shadow-[0_24px_50px_-34px_rgba(29,5,11,0.45)]",
                    i % 2 === 1
                      ? "md:grid-cols-[1fr_22rem]"
                      : "md:grid-cols-[22rem_1fr]",
                  )}
                >
                  <div
                    className={cn(
                      "grid place-items-center bg-[#F7E9ED] p-8",
                      i % 2 === 1 && "md:order-2",
                    )}
                  >
                    <Image
                      src={r.image}
                      alt=""
                      width={600}
                      height={560}
                      className="h-44 w-auto object-contain md:h-52"
                    />
                  </div>
                  <div className="relative p-7 md:p-10">
                    <p className="absolute right-6 top-4 text-right font-display font-black leading-none text-[#7A1E35] md:right-10 md:top-6">
                      <span className="block text-sm tracking-[0.12em] md:text-lg">
                        POINT
                      </span>
                      <span className="block text-5xl md:text-7xl">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </p>
                    <p className="text-xs font-bold tracking-[0.2em] text-[#7A6A6F]">
                      {r.label}
                    </p>
                    <h3 className="mt-3 pr-20 text-[clamp(1.3rem,2.4vw,1.75rem)] font-bold leading-[1.5] [word-break:auto-phrase] md:pr-28">
                      {r.lead}
                      <br />
                      <em>{r.em}</em>
                    </h3>
                    <p className="mt-4 text-[15px] leading-[2] text-[#1A1A1A]/80">
                      {r.text}
                    </p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* プラン(料金は掲載しない) */}
      <section
        id="plan"
        className="relative isolate scroll-mt-28 overflow-hidden py-20 md:py-28"
      >
        <Watermark className="-right-6 top-6">Plan</Watermark>
        <Container>
          <Heading en="Plan">会社の規模と目的に合わせた3つのプラン</Heading>
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {plans.map((p, i) => (
              <Reveal
                key={p.name}
                variant="up"
                delay={i * 100}
                className="h-full"
              >
                <article
                  className={cn(
                    "relative flex h-full flex-col overflow-hidden rounded-xl bg-white shadow-[0_24px_50px_-34px_rgba(29,5,11,0.5)]",
                    p.recommended
                      ? "ring-2 ring-[#7A1E35]"
                      : "ring-1 ring-[#EEDFE3]",
                  )}
                >
                  <div
                    className={cn(
                      "px-6 py-5",
                      p.recommended
                        ? "bg-[linear-gradient(110deg,#61162A,#A83B57)] text-white"
                        : "bg-[#FBF6F7]",
                    )}
                  >
                    {p.recommended ? (
                      <span className="mb-2 inline-block rounded-full bg-white px-3 py-0.5 text-[11px] font-bold text-[#7A1E35]">
                        おすすめ
                      </span>
                    ) : null}
                    <h3 className="text-xl font-black">{p.name}</h3>
                    <p
                      className={cn(
                        "mt-1 text-sm font-bold",
                        p.recommended ? "text-white/80" : "text-[#7A6A6F]",
                      )}
                    >
                      {p.target}
                    </p>
                  </div>
                  <ul className="space-y-2.5 p-6">
                    {p.items.map((it) => (
                      <li
                        key={it}
                        className="flex gap-2.5 text-[15px] leading-relaxed"
                      >
                        <Check />
                        {it}
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            ))}
          </div>
          <p className="mt-6 text-xs text-[#7A6A6F]">
            ※
            料金はご相談内容に応じてお見積もりします。はじめにAI利用の実態調査を含む初回診断を行います。最低契約期間は6カ月です。
          </p>

          <Reveal
            variant="up"
            className="mt-16 rounded-xl bg-[#1D050B] p-7 text-white md:p-10"
          >
            <div className="grid gap-6 md:grid-cols-[14rem_1fr] md:items-center">
              <p className="text-xl font-bold leading-snug">
                こんな企業に
                <br className="hidden md:block" />
                おすすめです
              </p>
              <ul className="grid gap-3 sm:grid-cols-2">
                {targets.map((t) => (
                  <li
                    key={t}
                    className="flex items-start gap-3 rounded-lg bg-white/10 px-4 py-3 text-[15px] font-bold leading-relaxed"
                  >
                    <Check dark />
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* ご支援の流れ */}
      <section
        id="flow"
        className="relative isolate scroll-mt-28 overflow-hidden bg-[#FBF6F7] py-20 md:py-28"
      >
        <Watermark className="-left-4 top-6">Flow</Watermark>
        <Container>
          <Heading en="Flow">ご支援の流れ</Heading>
          <ol className="mt-12 grid gap-4 md:grid-cols-4">
            {flow.map((f, i) => (
              <Reveal
                key={f.title}
                variant="up"
                delay={i * 100}
                className="h-full"
              >
                <li className="relative h-full rounded-xl bg-white p-6 shadow-[0_20px_40px_-32px_rgba(29,5,11,0.5)]">
                  <p className="font-display text-4xl font-black leading-none text-[#7A1E35]/20">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <p className="mt-3 text-xs font-black tracking-[0.2em] text-[#7A1E35]">
                    STEP {i + 1}
                  </p>
                  <p className="mt-1 text-lg font-bold">{f.title}</p>
                  <p className="mt-2 text-sm leading-relaxed text-[#1A1A1A]/70">
                    {f.text}
                  </p>
                  {i < flow.length - 1 ? (
                    <span
                      aria-hidden="true"
                      className="absolute -right-3 top-1/2 z-10 hidden h-6 w-6 -translate-y-1/2 place-items-center rounded-full bg-[#7A1E35] text-xs text-white md:grid"
                    >
                      →
                    </span>
                  ) : null}
                </li>
              </Reveal>
            ))}
          </ol>
        </Container>
      </section>

      {/* よくある質問 */}
      <section id="faq" className="scroll-mt-28 py-20 md:py-28">
        <Container>
          <Heading en="FAQ">よくある質問</Heading>
          <div className="mt-10 space-y-3">
            {faqs.map((f) => (
              <details
                key={f.q}
                className="group rounded-xl border border-[#EEDFE3] bg-white open:shadow-[0_20px_40px_-32px_rgba(29,5,11,0.5)]"
              >
                <summary className="flex cursor-pointer list-none items-center gap-4 p-5 md:p-6 [&::-webkit-details-marker]:hidden">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#7A1E35] text-sm font-black text-white">
                    Q
                  </span>
                  <span className="flex-1 text-[15px] font-bold md:text-base">
                    {f.q}
                  </span>
                  <span
                    aria-hidden="true"
                    className="text-xl text-[#7A1E35] transition-transform group-open:rotate-45"
                  >
                    ＋
                  </span>
                </summary>
                <div className="flex gap-4 border-t border-[#EEDFE3] px-5 py-5 md:px-6">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#FBEAEE] text-sm font-black text-[#7A1E35]">
                    A
                  </span>
                  <p className="pt-1.5 text-[15px] leading-relaxed text-[#1A1A1A]/80">
                    {f.a}
                  </p>
                </div>
              </details>
            ))}
          </div>
        </Container>
      </section>

      {/* 2分割のCTA帯 */}
      <section className="grid text-white md:grid-cols-2">
        <div className="flex flex-col items-center gap-4 bg-[#4A1020] px-6 py-12">
          <p className="text-sm font-bold">AIの利用ルールを整えたい方は</p>
          <Cta
            label="無料相談"
            sub="まずは現状をお聞かせください"
            tone="accent"
          />
        </div>
        <div className="flex flex-col items-center gap-4 bg-[#7A1E35] px-6 py-12">
          <p className="text-sm font-bold">ホームページの対策も気になる方は</p>
          <Cta
            label="ホームページ対策"
            sub="診断・保守・移行"
            href={localePath("/services/web-security", locale)}
            tone="white"
          />
        </div>
      </section>

      {/* 無料相談フォーム */}
      <section
        id={FORM_ID}
        className="relative isolate scroll-mt-28 overflow-hidden bg-[#FBF6F7] py-20 md:py-28"
      >
        <Watermark className="-right-6 top-6">Contact</Watermark>
        <Container>
          <Heading en="Contact">CISO・セキュリティ顧問の無料相談</Heading>
          <Reveal
            variant="up"
            delay={150}
            className="mx-auto mt-10 max-w-4xl rounded-xl bg-white p-6 shadow-[0_30px_60px_-40px_rgba(29,5,11,0.45)] md:p-10"
          >
            <ServiceLeadForm
              service="ciso"
              accent="wine"
              privacyHref={localePath("/privacy", locale)}
              topics={[
                "AI利用ガイドライン",
                "AIツールの導入前チェック",
                "セキュリティチェックシート対応",
                "上場準備（IPO）",
                "社外CISO",
                "セキュリティ顧問",
                "その他",
              ]}
            />
          </Reveal>
          <p className="mt-10 text-center text-sm text-[#7A6A6F]">
            運営会社：{site.legalName}
          </p>
        </Container>
      </section>
    </div>
  );
}
