import type { Metadata } from "next";
import Image from "next/image";
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
 * 取引先対応向けのサブLPを作るときは、ファーストビューとお悩みだけを差し替える。
 */

const promises = [
  {
    title: "漏えいを防ぐ",
    text: "AIに入れていい情報・ダメな情報を決めて、社員に浸透させます",
    icon: "shield",
  },
  {
    title: "説明できる",
    text: "誰が責任を持つかを決めて、取引先や監査に説明できる体制にします",
    icon: "doc",
  },
  {
    title: "責任者がつく",
    text: "資格を持つ専門家が、社外の責任者としてつきます",
    icon: "person",
  },
] as const;

const worries = [
  {
    title: "社員が会社の知らないところでAIを使っている",
    text: "何を入力してよいか、どのツールなら安全か、ルールがない。",
    image: "/illustrations/ld-1395-wine.webp",
  },
  {
    title: "「AIは危ないから禁止」で、活用が止まっている",
    text: "本当は使いたいのに、判断できる人がいない。",
    image: "/illustrations/ld-1523-wine.webp",
  },
  {
    title: "取引先からチェックシートや「★3」を求められた",
    text: "何十問もの設問に、自信を持って答えられる人が社内にいない。",
    image: "/illustrations/ld-1531-wine.webp",
  },
  {
    title: "情シスが一人、または兼務で回している",
    text: "相談相手も、経営に説明するときの後ろ盾もない。",
    image: "/illustrations/ld-1528-wine.webp",
  },
];

const facts = [
  {
    value: "3",
    unit: "位",
    text: "「AIの利用をめぐるサイバーリスク」が、組織向けの10大脅威に初めて選ばれ、3位に。",
    note: "※1",
  },
  {
    value: "2027",
    unit: "年3月",
    text: "取引先のセキュリティを★で評価する国の制度（SCS評価制度）の申請受付が始まる予定。",
    note: "※2",
  },
  {
    value: "84.4",
    unit: "%",
    text: "発注側の大企業のうち、取引先のセキュリティを確認している割合。",
    note: "※3",
  },
  {
    value: "63.3",
    unit: "%",
    text: "2025年のランサムウェア被害のうち、中小企業が占めた割合。",
    note: "※4",
  },
];

const features = [
  {
    title: "AIを止めずに、安全に広げる",
    text: "禁止するのではなく、安心して使えるルールをつくります。社員のAI利用、社内で使うAIやAIエージェント、AIを使ったなりすまし詐欺。従来のセキュリティに加えて、AIのリスクまで一つの窓口で引き受けます。",
    image: "/illustrations/ld-1817-wine.webp",
  },
  {
    title: "契約後すぐに、診断から",
    text: "最初の1〜2カ月で、AIの利用状況と弱点を診断します。年1回の脆弱性診断（提携の診断会社が実施）もプランに含め、結果は専門家が分かりやすく説明します。",
    image: "/illustrations/ld-1636-wine.webp",
  },
  {
    title: "ルールを作って終わりにしない",
    text: "AI利用ルールの整備、社員への説明会、取引先のチェックシート回答、社外CISOとしての名前の掲載まで行います。「専門家が責任者としてついています」と、取引先に言える状態をつくります。",
    image: "/illustrations/ld-1498-wine.webp",
  },
];

const monthly = [
  "月1回の定例（90分）と月次報告",
  "チャット相談（2営業日以内に返答）",
  "自社用のAI利用ルールの作成と見直し",
  "全社員向けのAIルール説明会（年1回・オンライン60分）",
  "AIツールの導入前チェック（月2件）",
  "取引先のチェックシート回答（月2件）",
  "社内で使うAIの一覧（AIシステム台帳）づくり",
  "事故が起きたときの初動の助言",
  "社外CISOとしての名前の掲載",
];

const plans = [
  {
    name: "AIセキュリティ顧問",
    price: "8",
    target: "まずは相談相手がほしい会社に",
    size: "30〜100名",
    items: [
      "月1回の定例（60分）",
      "メール相談（3営業日以内に返答）",
      "AI利用ルールのひな形と、社員向けの説明資料（ひな形）",
      "年1回、ホームページなど外から見える部分の自動診断",
      "社外顧問としての名前の掲載",
    ],
  },
  {
    name: "AI社外CISO",
    price: "30",
    target: "責任者がほしい・取引先への説明が必要な会社に",
    size: "50〜300名",
    recommended: true,
    items: [
      "月1回の定例（90分）と月次報告",
      "チャット相談（2営業日以内に返答）",
      "初月にAI利用の診断",
      "年1回の簡易な脆弱性診断（AIチャットボットなどを含む）",
      "自社用のAI利用ルール、AIシステム台帳",
      "全社員向けのAIルール説明会（年1回・オンライン60分）",
      "AIツールの導入前チェック・チェックシート回答（各月2件）",
      "事故時の初動の助言",
      "社外CISOとしての名前の掲載",
    ],
  },
  {
    name: "AI社外CISO（経営参画）",
    price: "50",
    target: "経営会議まで入ってほしい会社に",
    size: "100〜1,000名",
    items: [
      "月2回の定例＋経営会議に月1回参加",
      "チャット相談（1営業日以内に返答）",
      "初月にAI利用の診断",
      "年1回の標準的な脆弱性診断（Web・AIアプリ）",
      "AIエージェントの権限設計と定期確認",
      "チェックシート回答（月5件）",
      "社員研修（年1回・半日）",
      "事故時の初動の助言＋緊急訪問（年2回まで）",
    ],
  },
];

const expert = [
  {
    label: "実務経験",
    body: "企業のセキュリティ管理、情報システム部門、セキュリティのコンサル・監査のいずれかで5年以上",
  },
  {
    label: "資格（いずれか）",
    chips: [
      "情報処理安全確保支援士",
      "公認情報セキュリティ監査人",
      "CISSP",
      "CISM",
      "CISA",
      "ISO/IEC 27001 主任審査員",
    ],
  },
  {
    label: "押さえている基準",
    chips: [
      "ISMS",
      "サイバーセキュリティ経営ガイドライン",
      "SCS評価制度",
      "AI事業者ガイドライン",
    ],
  },
];

const flow = [
  {
    title: "無料のAI利用チェック",
    text: "オンライン30分で、気になる点を整理します",
  },
  { title: "ご提案", text: "課題と規模に合うプランをご提案します" },
  { title: "ご契約", text: "秘密保持と、診断する範囲を書面で決めます" },
  {
    title: "診断（1〜2カ月目）",
    text: "AIの利用状況と弱点を見える化し、優先順位をつけます",
  },
  {
    title: "毎月の改善",
    text: "定例で一つずつ直し、社員への説明会を経て、取引先に説明できる状態へ",
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

const sources = [
  "※1 IPA「情報セキュリティ10大脅威 2026」（組織編）",
  "※2 IPA「SCS評価制度」の公表資料（2026年）。申請受付の開始は予定",
  "※3 キヤノンITソリューションズの調査",
  "※4 令和8年版 警察白書（2025年のランサムウェア被害226件のうち中小企業143件）",
  "※5 アクセルパートナーズの解説記事による目安",
];

/* ============================================================ 小さな部品 */

/** ピル型ボタン(右端に丸い矢印) */
function Cta({
  children,
  href = `#${FORM_ID}`,
  tone = "wine",
  className,
}: {
  children: ReactNode;
  href?: string;
  tone?: "wine" | "outline" | "white";
  className?: string;
}) {
  return (
    <a
      href={href}
      className={cn(
        "group relative inline-flex h-14 items-center justify-center rounded-full pl-7 pr-14 text-[15px] font-bold tracking-[0.03em] transition duration-300 hover:-translate-y-0.5 md:h-[3.75rem]",
        tone === "wine" &&
          "bg-[linear-gradient(100deg,#61162A,#A83B57)] text-white shadow-[0_14px_30px_-12px_rgba(122,30,53,0.8)]",
        tone === "outline" &&
          "border-2 border-brand-500 bg-white text-brand-600 hover:bg-brand-50",
        tone === "white" &&
          "bg-white text-brand-600 shadow-[0_14px_30px_-14px_rgba(29,5,11,0.5)]",
        className,
      )}
    >
      {children}
      <span
        aria-hidden="true"
        className={cn(
          "absolute right-2 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full transition-transform duration-300 group-hover:translate-x-0.5 md:h-11 md:w-11",
          tone === "wine"
            ? "bg-white text-brand-600"
            : "bg-brand-500 text-white",
        )}
      >
        →
      </span>
    </a>
  );
}

/** 見出し: 英字ラベル + 日本語見出し + 左だけ色の付いた下線 */
function Heading({
  en,
  children,
  dark,
  align = "left",
}: {
  en: string;
  children: ReactNode;
  dark?: boolean;
  align?: "left" | "center";
}) {
  return (
    <Reveal variant="up" className={align === "center" ? "text-center" : ""}>
      <p
        className={cn(
          "inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[0.3em]",
          dark ? "text-brand-200" : "text-brand-500",
        )}
      >
        <span
          aria-hidden="true"
          className={cn(
            "h-2 w-2 rotate-45",
            dark ? "bg-brand-200" : "bg-brand-500",
          )}
        />
        {en}
      </p>
      <h2
        className={cn(
          "mt-3 text-[clamp(1.55rem,3vw,2.3rem)] font-bold leading-[1.5] tracking-[0.04em] [word-break:auto-phrase]",
          dark ? "text-white" : "text-ink",
        )}
      >
        {children}
      </h2>
    </Reveal>
  );
}

function Icon({
  name,
  className,
}: {
  name: "shield" | "doc" | "person";
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
      ) : (
        <g {...p}>
          <circle cx="12" cy="8" r="4" />
          <path d="M4.5 21c1-4.2 4-6.5 7.5-6.5s6.5 2.3 7.5 6.5" />
        </g>
      )}
    </svg>
  );
}

function Check({ light }: { light?: boolean }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "mt-[3px] grid h-[18px] w-[18px] shrink-0 place-items-center rounded-full text-[10px] font-black",
        light ? "bg-white text-brand-600" : "bg-brand-500 text-white",
      )}
    >
      ✓
    </span>
  );
}

/** ファーストビュー右側: AI利用ルールの書類と、責任者の就任カード(イメージ) */
function HeroVisual() {
  return (
    <div className="relative mx-auto w-full max-w-[520px] px-4 pb-10 pt-6 sm:px-8">
      {/* 背景の大きな盾 */}
      <svg
        viewBox="0 0 200 220"
        aria-hidden="true"
        className="absolute inset-x-0 top-0 mx-auto h-full w-auto text-brand-500/[0.06]"
      >
        <path
          d="M100 6l84 34v58c0 54-36 96-84 116C52 194 16 152 16 98V40z"
          fill="currentColor"
        />
      </svg>

      {/* AI利用ルール(書類) */}
      <div className="relative rounded-lg bg-white p-6 shadow-[0_40px_80px_-40px_rgba(29,5,11,0.55)] ring-1 ring-[#EEDFE3] md:p-7">
        <div className="flex items-center justify-between">
          <p className="text-[11px] font-bold tracking-[0.2em] text-brand-500">
            AI USAGE POLICY
          </p>
          <span className="rounded-full bg-[#E3F5EC] px-2.5 py-0.5 text-[10px] font-bold text-[#1E8A57]">
            施行中
          </span>
        </div>
        <p className="mt-2 text-lg font-black text-ink">AI利用ルール</p>
        <div className="mt-4 grid grid-cols-2 gap-3 text-[12px] font-bold">
          <div className="rounded-md bg-[#E3F5EC]/70 p-3">
            <p className="text-[#1E8A57]">入力してよい</p>
            <ul className="mt-2 space-y-1 text-ink/75">
              <li>・公開済みの情報</li>
              <li>・社内向けの文章案</li>
            </ul>
          </div>
          <div className="rounded-md bg-brand-50 p-3">
            <p className="text-brand-600">入力してはダメ</p>
            <ul className="mt-2 space-y-1 text-ink/75">
              <li>・お客さまの個人情報</li>
              <li>・取引先の機密情報</li>
            </ul>
          </div>
        </div>
        <div className="mt-4 space-y-2 border-t border-[#EEDFE3] pt-4 text-[12px] font-bold">
          {[
            ["承認済みのAIツール", "3件"],
            ["導入前チェック中", "1件"],
          ].map(([k, v]) => (
            <p key={k} className="flex items-center justify-between">
              <span className="text-ink/70">{k}</span>
              <span className="text-ink">{v}</span>
            </p>
          ))}
        </div>
      </div>

      {/* 責任者のカード */}
      <div className="absolute -bottom-2 -left-2 w-[15.5rem] animate-float-y rounded-lg bg-brand-900 p-4 text-white shadow-[0_24px_50px_-20px_rgba(29,5,11,0.7)] sm:left-0">
        <p className="text-[10px] font-bold tracking-[0.2em] text-brand-200">
          社外CISO
        </p>
        <div className="mt-2 flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-full bg-white/15">
            <Icon name="person" className="h-6 w-6" />
          </span>
          <div className="leading-tight">
            <p className="text-sm font-black">セキュリティの責任者</p>
            <p className="mt-0.5 text-[11px] text-white/70">
              資格を持つ専門家がつきます
            </p>
          </div>
        </div>
      </div>

      {/* 取引先への回答バッジ */}
      <div className="absolute -right-1 top-0 animate-float-y rounded-full bg-white px-4 py-2 text-xs font-bold text-ink shadow-[0_16px_30px_-14px_rgba(29,5,11,0.5)] ring-1 ring-[#EEDFE3] [animation-delay:-1.5s] sm:right-2">
        <span className="text-brand-500">✓</span> 取引先のチェックシート
        回答済み
      </div>
    </div>
  );
}

/* ================================================================ ページ */

export default function CisoPage({ params }: { params: { locale: string } }) {
  if (!isLocale(params.locale)) notFound();
  const locale = params.locale;
  const base = site.url.replace(/\/$/, "");
  const url = `${base}${localePath(PATH, locale)}`;

  const nav = [
    { href: "#service", label: "サービス" },
    { href: "#price", label: "料金" },
    { href: "#flow", label: "導入の流れ" },
    { href: "#faq", label: "よくある質問" },
  ];

  return (
    <div className="bg-white font-medium text-ink">
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
            offers: plans.map((p) => ({
              "@type": "Offer",
              name: p.name,
              url,
              priceSpecification: {
                "@type": "UnitPriceSpecification",
                price: Number(p.price) * 10000,
                priceCurrency: "JPY",
                unitText: "月額（税別）",
                valueAddedTaxIncluded: false,
              },
            })),
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

      {/* 1. ヘッダー */}
      <header className="sticky top-0 z-40 border-b border-ink/10 bg-white/95 backdrop-blur">
        <Container className="flex h-16 items-center gap-6 md:h-[4.5rem]">
          <a href="#top" className="flex items-center gap-3">
            <span
              className="grid h-9 w-9 place-items-center rounded-md bg-brand-500 text-white"
              aria-hidden="true"
            >
              <Icon name="shield" className="h-5 w-5" />
            </span>
            <span className="leading-tight">
              <span className="block text-lg font-black tracking-[0.02em] text-ink">
                Bond AI
              </span>
              <span className="hidden text-[10px] font-bold text-ink/60 sm:block">
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
                    className="px-3 py-2 text-sm font-bold text-ink/75 transition hover:text-brand-600 lg:px-4"
                  >
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <a
            href={`#${FORM_ID}`}
            className="ml-auto inline-flex h-10 items-center gap-2 rounded-full bg-brand-500 px-5 text-sm font-bold text-white transition hover:bg-brand-600 md:ml-2"
          >
            無料相談
            <span aria-hidden="true">→</span>
          </a>
        </Container>
        <nav
          aria-label="ページ内メニュー"
          className="border-t border-ink/10 md:hidden"
        >
          <ul className="flex justify-between px-3 py-1.5">
            {nav.map((n) => (
              <li key={n.href}>
                <a
                  href={n.href}
                  className="block px-2 py-1.5 text-xs font-bold text-ink/75"
                >
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      {/* 2. ファーストビュー */}
      <section
        id="top"
        className="relative isolate overflow-hidden bg-[#FBF6F7]"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 opacity-60 [background-image:linear-gradient(to_right,#EEDFE3_1px,transparent_1px),linear-gradient(to_bottom,#EEDFE3_1px,transparent_1px)] [background-size:44px_44px] [mask-image:linear-gradient(to_left,black,transparent_70%)]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-48 -top-48 -z-10 h-[40rem] w-[40rem] rounded-full bg-brand-100/60 blur-[120px]"
        />
        <Container className="grid items-center gap-12 pb-28 pt-12 md:pt-16 lg:grid-cols-[1.1fr_1fr] lg:pb-32">
          <div>
            <p className="inline-flex animate-fade-up items-center gap-2 rounded-full bg-white px-4 py-1.5 text-xs font-bold text-brand-600 ring-1 ring-brand-100 md:text-sm">
              中小・中堅企業のための AIセキュリティ
            </p>
            <h1
              className="mt-5 animate-fade-up text-[clamp(1.75rem,3.5vw,2.85rem)] font-bold leading-[1.45] tracking-[0.03em]"
              style={{ animationDelay: "0.1s" }}
            >
              <span className="inline-block">
                AIを<span className="text-brand-500">禁止しない</span>会社に、
              </span>
              <br />
              <span className="inline-block">
                セキュリティの<span className="text-brand-500">責任者</span>を。
              </span>
            </h1>
            <p
              className="mt-6 max-w-xl animate-fade-up text-[15px] leading-[2] text-ink/80 md:text-base"
              style={{ animationDelay: "0.25s" }}
            >
              社員がAIを安心して使えるルールづくりから、取引先への説明まで。資格を持つセキュリティの専門家が、あなたの会社の責任者として月額でつきます。
            </p>
            <div
              className="mt-8 flex animate-fade-up flex-col gap-3 sm:flex-row sm:flex-wrap"
              style={{ animationDelay: "0.4s" }}
            >
              <Cta>無料の「AI利用チェック」を申し込む</Cta>
              <Cta href="#price" tone="outline">
                料金を見る
              </Cta>
            </div>
            <p
              className="mt-4 max-w-xl animate-fade-up text-xs leading-relaxed text-ink/60 md:text-[13px]"
              style={{ animationDelay: "0.5s" }}
            >
              オンライン30分。社内のAIの使い方とセキュリティ体制の気になる点を、専門家が無料で整理します。
            </p>
          </div>
          <div className="animate-fade-up" style={{ animationDelay: "0.3s" }}>
            <HeroVisual />
          </div>
        </Container>
      </section>

      {/* 3つの約束(ファーストビューに重ねる) */}
      <section aria-label="3つの約束" className="relative z-10 -mt-16">
        <Container>
          <ul className="grid overflow-hidden rounded-xl bg-white shadow-[0_30px_60px_-40px_rgba(29,5,11,0.5)] ring-1 ring-[#EEDFE3] md:grid-cols-3">
            {promises.map((p, i) => (
              <Reveal key={p.title} variant="up" delay={i * 100}>
                <li
                  className={cn(
                    "flex h-full gap-4 p-6 md:p-7",
                    i > 0 &&
                      "border-t border-[#EEDFE3] md:border-l md:border-t-0",
                  )}
                >
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-brand-50 text-brand-500">
                    <Icon name={p.icon} className="h-6 w-6" />
                  </span>
                  <div>
                    <p className="text-[11px] font-bold tracking-[0.2em] text-brand-500">
                      PROMISE {String(i + 1).padStart(2, "0")}
                    </p>
                    <p className="mt-1 text-lg font-black">{p.title}</p>
                    <p className="mt-1.5 text-sm leading-[1.8] text-ink/75">
                      {p.text}
                    </p>
                  </div>
                </li>
              </Reveal>
            ))}
          </ul>
        </Container>
      </section>

      {/* 3. お悩み */}
      <section className="py-20 md:py-28">
        <Container>
          <Heading en="Problem" align="center">
            AIは使いたい。
            <br className="sm:hidden" />
            でも、<span className="text-brand-500">任せられる人</span>がいない。
          </Heading>
          <ul className="mx-auto mt-12 grid max-w-5xl gap-5 md:grid-cols-2">
            {worries.map((w, i) => (
              <Reveal
                key={w.title}
                variant="up"
                delay={(i % 2) * 100}
                className="h-full"
              >
                <li className="flex h-full items-center gap-5 rounded-xl bg-[#FBF6F7] p-5 md:p-6">
                  <Image
                    src={w.image}
                    alt=""
                    width={300}
                    height={300}
                    className="h-24 w-24 shrink-0 object-contain md:h-28 md:w-28"
                  />
                  <div>
                    <p className="text-base font-bold leading-[1.6] md:text-[17px]">
                      {w.title}
                    </p>
                    <p className="mt-2 flex gap-2 text-sm leading-[1.8] text-ink/75">
                      <span
                        aria-hidden="true"
                        className="font-black text-brand-500"
                      >
                        →
                      </span>
                      {w.text}
                    </p>
                  </div>
                </li>
              </Reveal>
            ))}
          </ul>
        </Container>
      </section>

      {/* 4. なぜ今か */}
      <section className="relative isolate overflow-hidden bg-brand-900 py-20 text-white md:py-28">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 opacity-[0.07] [background-image:linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] [background-size:64px_64px]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-32 bottom-0 -z-10 h-96 w-96 rounded-full bg-brand-500/40 blur-[120px]"
        />
        <Container>
          <Heading en="Why now" dark>
            AIの広がりに、
            <br className="sm:hidden" />
            守りと説明が追いついていません
          </Heading>
          <ul className="mt-12 grid gap-px overflow-hidden rounded-xl bg-white/15 sm:grid-cols-2 lg:grid-cols-4">
            {facts.map((f, i) => (
              <Reveal
                key={f.value + f.unit}
                variant="up"
                delay={i * 80}
                className="h-full"
              >
                <li className="flex h-full flex-col bg-brand-900/95 p-6 md:p-7">
                  <p className="font-display font-black leading-none text-white">
                    <span className="text-5xl md:text-6xl">{f.value}</span>
                    <span className="ml-1 text-xl text-brand-200 md:text-2xl">
                      {f.unit}
                    </span>
                  </p>
                  <span
                    aria-hidden="true"
                    className="mt-5 block h-px w-10 bg-brand-200"
                  />
                  <p className="mt-4 text-sm leading-[1.9] text-white/85">
                    {f.text}
                    <span className="ml-1 text-[11px] text-white/50">
                      （{f.note}）
                    </span>
                  </p>
                </li>
              </Reveal>
            ))}
          </ul>
          <p className="mt-5 text-right text-[11px] text-white/50">
            出典はページ下部に記載しています。
          </p>
        </Container>
      </section>

      {/* 5. 3つの特長 */}
      <section
        id="service"
        className="scroll-mt-28 bg-[#FBF6F7] py-20 md:py-28"
      >
        <Container>
          <Heading en="Reason">
            <span className="text-brand-500">Bond AI</span> が選ばれる3つの理由
          </Heading>
          <div className="mt-12 space-y-6">
            {features.map((f, i) => (
              <Reveal key={f.title} variant="up">
                <article
                  className={cn(
                    "grid overflow-hidden rounded-xl bg-white shadow-[0_24px_50px_-36px_rgba(29,5,11,0.5)] md:grid-cols-[1fr_20rem]",
                    i % 2 === 1 && "md:grid-cols-[20rem_1fr]",
                  )}
                >
                  <div
                    className={cn("p-7 md:p-10", i % 2 === 1 && "md:order-2")}
                  >
                    <p className="font-display text-sm font-black tracking-[0.2em] text-brand-500">
                      REASON {String(i + 1).padStart(2, "0")}
                    </p>
                    <h3 className="mt-2 text-[clamp(1.3rem,2.4vw,1.7rem)] font-bold leading-[1.5]">
                      {f.title}
                    </h3>
                    <p className="mt-4 text-[15px] leading-[2] text-ink/80">
                      {f.text}
                    </p>
                  </div>
                  <div className="grid place-items-center bg-brand-50/70 p-8">
                    <Image
                      src={f.image}
                      alt=""
                      width={600}
                      height={560}
                      className="h-40 w-auto object-contain md:h-48"
                    />
                  </div>
                </article>
              </Reveal>
            ))}
          </div>

          {/* 毎月の支援内容 */}
          <Reveal
            variant="up"
            className="mt-14 overflow-hidden rounded-xl bg-white ring-1 ring-[#EEDFE3]"
          >
            <div className="flex flex-wrap items-baseline justify-between gap-2 bg-brand-500 px-6 py-4 text-white md:px-8">
              <p className="text-lg font-bold">毎月の支援内容</p>
              <p className="text-xs font-bold text-white/80">
                社外CISOプランの例
              </p>
            </div>
            <ul className="grid gap-x-8 gap-y-3 p-6 sm:grid-cols-2 md:p-8 lg:grid-cols-3">
              {monthly.map((m) => (
                <li
                  key={m}
                  className="flex gap-2.5 text-[15px] leading-relaxed"
                >
                  <Check />
                  {m}
                </li>
              ))}
            </ul>
          </Reveal>
        </Container>
      </section>

      {/* 6. 料金プラン */}
      <section id="price" className="scroll-mt-28 py-20 md:py-28">
        <Container>
          <Heading en="Price" align="center">
            会社の規模と課題に合わせて選べます
          </Heading>
          <p className="mt-3 text-center text-sm text-ink/60">
            （税別・月額。最低契約期間は6カ月）
          </p>
          <div className="mt-12 grid items-stretch gap-6 lg:grid-cols-3">
            {plans.map((p, i) => (
              <Reveal
                key={p.name}
                variant="up"
                delay={i * 100}
                className="h-full"
              >
                <article
                  className={cn(
                    "relative flex h-full flex-col overflow-hidden rounded-xl bg-white",
                    p.recommended
                      ? "shadow-[0_30px_60px_-30px_rgba(122,30,53,0.6)] ring-2 ring-brand-500 lg:-mt-4 lg:mb-4"
                      : "ring-1 ring-[#EEDFE3]",
                  )}
                >
                  <div
                    className={cn(
                      "px-6 pb-6 pt-7",
                      p.recommended
                        ? "bg-[linear-gradient(120deg,#61162A,#A83B57)] text-white"
                        : "bg-[#FBF6F7]",
                    )}
                  >
                    {p.recommended ? (
                      <span className="mb-3 inline-block rounded-full bg-white px-3 py-0.5 text-[11px] font-bold text-brand-600">
                        おすすめ
                      </span>
                    ) : null}
                    <h3 className="text-xl font-black">{p.name}</h3>
                    <p className="mt-4 flex items-baseline gap-1">
                      <span className="text-sm font-bold">月</span>
                      <span className="font-display text-5xl font-black leading-none">
                        {p.price}
                      </span>
                      <span className="text-lg font-bold">万円</span>
                    </p>
                    <p
                      className={cn(
                        "mt-4 text-sm font-bold leading-relaxed",
                        p.recommended ? "text-white/90" : "text-ink/80",
                      )}
                    >
                      {p.target}
                    </p>
                    <p
                      className={cn(
                        "mt-1 text-xs font-bold",
                        p.recommended ? "text-white/70" : "text-ink/55",
                      )}
                    >
                      （{p.size}）
                    </p>
                  </div>
                  <ul className="flex-1 space-y-2.5 p-6">
                    {p.items.map((it) => (
                      <li
                        key={it}
                        className="flex gap-2.5 text-[14px] leading-relaxed"
                      >
                        <Check />
                        {it}
                      </li>
                    ))}
                  </ul>
                  <div className="px-6 pb-6">
                    <a
                      href={`#${FORM_ID}`}
                      className={cn(
                        "flex h-12 items-center justify-center rounded-full text-sm font-bold transition",
                        p.recommended
                          ? "bg-brand-500 text-white hover:bg-brand-600"
                          : "border-2 border-brand-500 text-brand-600 hover:bg-brand-50",
                      )}
                    >
                      このプランを相談する
                    </a>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>

          {/* 比較 */}
          <Reveal variant="up" className="mx-auto mt-14 max-w-4xl">
            <p className="text-center text-lg font-bold md:text-xl">
              常勤のCISOを採用するより、
              <span className="text-brand-500">ずっと始めやすく</span>
            </p>
            <div className="mt-6 grid overflow-hidden rounded-xl ring-1 ring-[#EEDFE3] sm:grid-cols-2">
              <div className="bg-[#F5F2F3] p-6 text-center">
                <p className="text-sm font-bold text-ink/60">
                  常勤のCISOを採用した場合
                </p>
                <p className="mt-3 text-2xl font-black text-ink/70 md:text-3xl">
                  年収1,000万円以上
                  <span className="ml-1 text-xs font-bold text-ink/50">
                    （※5）
                  </span>
                </p>
              </div>
              <div className="bg-brand-500 p-6 text-center text-white">
                <p className="text-sm font-bold text-white/80">
                  Bond AI の社外CISO
                </p>
                <p className="mt-3 text-2xl font-black md:text-3xl">
                  年360万円
                  <span className="ml-1 text-base font-bold">（月30万円）</span>
                </p>
              </div>
            </div>
            <div className="mt-6 rounded-xl bg-[#FBF6F7] p-6 text-sm leading-[1.9] text-ink/80">
              <p>
                稼働時間を超えた分は1時間3万円です。次のメニューは別途ご相談ください。
              </p>
              <ul className="mt-2 space-y-1">
                <li>
                  ・半日・1日の社員研修、なりすましメール訓練、事故対応の机上演習
                </li>
                <li>・ISO/IEC 42001（AIの国際認証）の取得支援</li>
              </ul>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* 7. 担当する専門家 */}
      <section className="bg-[#FBF6F7] py-20 md:py-28">
        <Container className="grid gap-12 lg:grid-cols-[1fr_1.25fr] lg:items-center">
          <div>
            <Heading en="Expert">
              資格と実務経験を持つ専門家が、責任者としてつきます
            </Heading>
            <Reveal variant="up">
              <p className="mt-6 text-[15px] leading-[2] text-ink/80">
                調べる・書く・まとめる作業はAIで効率化し、専門家は「判断」と「説明」に集中します。だから、相場どおりの価格で、AIまで見る責任者を置けます。
              </p>
              <Image
                src="/illustrations/ld-947-wine.webp"
                alt=""
                width={503}
                height={507}
                className="mt-8 hidden h-48 w-auto lg:block"
              />
            </Reveal>
          </div>
          <Reveal variant="up">
            <dl className="overflow-hidden rounded-xl bg-white shadow-[0_24px_50px_-36px_rgba(29,5,11,0.5)]">
              {expert.map((e, i) => (
                <div
                  key={e.label}
                  className={cn(
                    "grid gap-3 p-6 md:grid-cols-[9rem_1fr] md:p-7",
                    i > 0 && "border-t border-[#EEDFE3]",
                  )}
                >
                  <dt className="flex items-center gap-2 text-sm font-bold text-brand-600">
                    <span
                      aria-hidden="true"
                      className="h-4 w-[3px] bg-brand-500"
                    />
                    {e.label}
                  </dt>
                  <dd className="text-[15px] leading-[1.9] text-ink/85">
                    {"body" in e ? (
                      e.body
                    ) : (
                      <ul className="flex flex-wrap gap-2">
                        {e.chips.map((c) => (
                          <li
                            key={c}
                            className="rounded border border-brand-500/30 bg-brand-50/50 px-2.5 py-1 text-[13px] font-bold text-brand-600"
                          >
                            {c}
                          </li>
                        ))}
                      </ul>
                    )}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </Container>
      </section>

      {/* 8. 導入の流れ */}
      <section id="flow" className="scroll-mt-28 py-20 md:py-28">
        <Container>
          <Heading en="Flow" align="center">
            導入の流れ
          </Heading>
          <ol className="mx-auto mt-12 grid max-w-6xl gap-4 md:grid-cols-5">
            {flow.map((f, i) => (
              <Reveal
                key={f.title}
                variant="up"
                delay={i * 90}
                className="h-full"
              >
                <li className="relative h-full rounded-xl bg-white p-5 ring-1 ring-[#EEDFE3]">
                  <span className="grid h-10 w-10 place-items-center rounded-full bg-brand-500 text-sm font-black text-white">
                    {i + 1}
                  </span>
                  <p className="mt-4 text-base font-bold leading-snug">
                    {f.title}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-ink/70">
                    {f.text}
                  </p>
                  {i < flow.length - 1 ? (
                    <span
                      aria-hidden="true"
                      className="absolute -right-3 top-8 z-10 hidden h-6 w-6 place-items-center rounded-full bg-white text-brand-500 ring-1 ring-[#EEDFE3] md:grid"
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

      {/* 9. よくある質問 */}
      <section id="faq" className="scroll-mt-28 bg-[#FBF6F7] py-20 md:py-28">
        <Container>
          <Heading en="FAQ" align="center">
            よくある質問
          </Heading>
          <div className="mx-auto mt-10 max-w-3xl space-y-3">
            {faqs.map((f) => (
              <details
                key={f.q}
                className="group rounded-xl bg-white ring-1 ring-[#EEDFE3]"
              >
                <summary className="flex cursor-pointer list-none items-center gap-4 p-5 md:p-6 [&::-webkit-details-marker]:hidden">
                  <span className="text-lg font-black text-brand-500">Q.</span>
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
                <div className="flex gap-4 border-t border-[#EEDFE3] px-5 py-5 md:px-6">
                  <span className="text-lg font-black text-ink/35">A.</span>
                  <p className="pt-0.5 text-[15px] leading-[1.9] text-ink/80">
                    {f.a}
                  </p>
                </div>
              </details>
            ))}
          </div>
        </Container>
      </section>

      {/* 10. 申し込み */}
      <section
        id={FORM_ID}
        className="relative isolate scroll-mt-28 overflow-hidden bg-brand-900 py-20 md:py-28"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 opacity-[0.07] [background-image:linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] [background-size:64px_64px]"
        />
        <Container className="grid gap-10 lg:grid-cols-[1fr_1.35fr] lg:gap-14">
          <div className="text-white">
            <Heading en="Free check" dark>
              まずは無料の
              <br />
              「AI利用チェック」から
            </Heading>
            <Reveal variant="up">
              <p className="mt-6 text-[15px] leading-[2] text-white/85">
                オンライン30分。社内のAIの使い方、取引先から求められていること、今の体制を伺い、優先して手を打つべき点を専門家がお伝えします。売り込みはしません。
              </p>
              <ul className="mt-6 space-y-2.5 text-[15px] font-bold">
                {[
                  "オンライン30分・無料",
                  "専門家が気になる点を整理",
                  "売り込みはしません",
                ].map((t) => (
                  <li key={t} className="flex gap-2.5">
                    <Check light />
                    {t}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
          <Reveal
            variant="up"
            delay={120}
            className="rounded-xl bg-white p-6 md:p-9"
          >
            <AiCheckForm privacyHref={localePath("/privacy", locale)} />
          </Reveal>
        </Container>
      </section>

      {/* 11. フッター(LP) */}
      <footer className="border-t border-ink/10 bg-white py-10">
        <Container>
          <div className="flex flex-wrap items-center gap-3">
            <span
              className="grid h-8 w-8 place-items-center rounded-md bg-brand-500 text-white"
              aria-hidden="true"
            >
              <Icon name="shield" className="h-4 w-4" />
            </span>
            <p className="text-base font-black">Bond AI</p>
            <p className="text-sm text-ink/60">／ 運営：{site.legalName}</p>
          </div>
          <div className="mt-6 border-t border-ink/10 pt-6 text-[11px] leading-[1.9] text-ink/55">
            <p className="font-bold text-ink/70">出典</p>
            <ul>
              {sources.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
            <p className="mt-3">
              注記：ISMSやISO/IEC
              42001などの認証は審査機関が行います。当社は取得の支援を行います。
            </p>
          </div>
        </Container>
      </footer>
    </div>
  );
}
