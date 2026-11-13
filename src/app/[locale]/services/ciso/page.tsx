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
 *
 * デザイン方針(プロのBtoB LPを参考):
 * - 写真と文字組みで見せる。自作のイラスト・丸アイコンのタイル・グラデーションは使わない。
 * - 見出しは太すぎない字(semibold)、余白を広く、アクセント色(ワインレッド)は要所のみ。
 * - 写真は Unsplash(商用利用可)と自社の素材。人物写真はイメージである旨を注記する。
 */

const promises = [
  {
    title: "漏えいを防ぐ",
    text: "AIに入れていい情報・ダメな情報を決めて、社員に浸透させます",
  },
  {
    title: "説明できる",
    text: "誰が責任を持つかを決めて、取引先や監査に説明できる体制にします",
  },
  {
    title: "責任者がつく",
    text: "資格を持つ専門家が、社外の責任者としてつきます",
  },
];

const worries = [
  {
    title: "社員が会社の知らないところでAIを使っている",
    text: "何を入力してよいか、どのツールなら安全か、ルールがない。",
  },
  {
    title: "「AIは危ないから禁止」で、活用が止まっている",
    text: "本当は使いたいのに、判断できる人がいない。",
  },
  {
    title: "取引先からチェックシートや「★3」を求められた",
    text: "何十問もの設問に、自信を持って答えられる人が社内にいない。",
  },
  {
    title: "情シスが一人、または兼務で回している",
    text: "相談相手も、経営に説明するときの後ろ盾もない。",
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

const layers = [
  { k: "経営", v: "責任者を決め、方針を示す" },
  { k: "管理", v: "AI利用ルール・AIシステム台帳・導入前チェック" },
  { k: "現場", v: "社員への説明会・日々の相談" },
];

const features = [
  {
    title: "AIを止めずに、安全に広げる",
    text: "禁止するのではなく、安心して使えるルールをつくります。社員のAI利用、社内で使うAIやAIエージェント、AIを使ったなりすまし詐欺。従来のセキュリティに加えて、AIのリスクまで一つの窓口で引き受けます。",
    points: [
      "入力してよい情報・ダメな情報の基準",
      "使ってよいAIツールと承認の流れ",
      "AIエージェントの権限とログ",
    ],
    image: "/photos/ciso/devices.webp",
    alt: "ノートパソコンとスマートフォンで業務をする様子",
  },
  {
    title: "契約後すぐに、診断から",
    text: "最初の1〜2カ月で、AIの利用状況と弱点を診断します。年1回の脆弱性診断（提携の診断会社が実施）もプランに含め、結果は専門家が分かりやすく説明します。",
    points: [
      "AIの利用状況の洗い出し",
      "弱点の見える化と優先順位づけ",
      "年1回の脆弱性診断",
    ],
    image: "/photos/ciso/server-room.webp",
    alt: "サーバールームでタブレットを確認する担当者",
  },
  {
    title: "ルールを作って終わりにしない",
    text: "AI利用ルールの整備、社員への説明会、取引先のチェックシート回答、社外CISOとしての名前の掲載まで行います。「専門家が責任者としてついています」と、取引先に言える状態をつくります。",
    points: [
      "全社員向けのAIルール説明会",
      "取引先のチェックシート回答",
      "社外CISOとしての名前の掲載",
    ],
    image: "/photos/ciso/briefing.webp",
    alt: "社員向けの説明会の様子",
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
    body: "情報処理安全確保支援士、公認情報セキュリティ監査人、CISSP、CISM、CISA、ISO/IEC 27001 主任審査員",
  },
  {
    label: "押さえている基準",
    body: "ISMS、サイバーセキュリティ経営ガイドライン、SCS評価制度、AI事業者ガイドライン",
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
    title: "診断",
    text: "1〜2カ月目。AIの利用状況と弱点を見える化し、優先順位をつけます",
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

const LINE = "border-[#E4E4E7]";

function Cta({
  children = "無料の「AI利用チェック」を申し込む",
  light,
  className,
}: {
  children?: ReactNode;
  light?: boolean;
  className?: string;
}) {
  return (
    <a
      href={`#${FORM_ID}`}
      className={cn(
        "group inline-flex h-14 items-center justify-center gap-3 rounded-[4px] px-7 text-[15px] font-semibold transition-colors",
        light
          ? "bg-white text-ink hover:bg-white/90"
          : "bg-brand-500 text-white hover:bg-brand-600",
        className,
      )}
    >
      {children}
      <svg
        viewBox="0 0 16 16"
        className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5"
        aria-hidden="true"
      >
        <path
          d="M2 8h11M9 4l4 4-4 4"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
        />
      </svg>
    </a>
  );
}

/** セクション見出し: 小さな英字ラベル(グレー) + 日本語の見出し */
function Heading({
  label,
  children,
  lead,
  center,
}: {
  label: string;
  children: ReactNode;
  lead?: ReactNode;
  center?: boolean;
}) {
  return (
    <Reveal variant="up" className={cn(center && "text-center")}>
      <p className="text-[12px] font-medium uppercase tracking-[0.18em] text-ink/45">
        {label}
      </p>
      <h2 className="mt-3 text-[clamp(1.6rem,3vw,2.3rem)] font-semibold leading-[1.45] tracking-[0.01em] text-ink [word-break:auto-phrase]">
        {children}
      </h2>
      {lead ? (
        <p
          className={cn(
            "mt-5 max-w-2xl text-[15px] leading-[2] text-ink/70",
            center && "mx-auto",
          )}
        >
          {lead}
        </p>
      ) : null}
    </Reveal>
  );
}

function Check() {
  return (
    <svg
      viewBox="0 0 16 16"
      className="mt-[6px] h-3 w-3 shrink-0 text-brand-500"
      aria-hidden="true"
    >
      <path
        d="M2 8.5l4 4 8-9"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      />
    </svg>
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
    <div className="bg-white text-ink">
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
      <header
        className={cn(
          "sticky top-0 z-40 border-b bg-white/95 backdrop-blur",
          LINE,
        )}
      >
        <Container className="flex h-16 items-center gap-8">
          <a href="#top" className="flex items-baseline gap-3">
            <span className="text-xl font-semibold tracking-tight text-ink">
              Bond<span className="text-brand-500"> AI</span>
            </span>
            <span className="hidden text-[11px] text-ink/55 lg:inline">
              AI時代のセキュリティ顧問・社外CISO
            </span>
          </a>
          <nav
            aria-label="ページ内メニュー"
            className="ml-auto hidden md:block"
          >
            <ul className="flex items-center gap-7">
              {nav.map((n) => (
                <li key={n.href}>
                  <a
                    href={n.href}
                    className="text-sm text-ink/75 transition-colors hover:text-ink"
                  >
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <a
            href={`#${FORM_ID}`}
            className="ml-auto inline-flex h-10 items-center rounded-[4px] bg-brand-500 px-5 text-sm font-semibold text-white transition-colors hover:bg-brand-600 md:ml-0"
          >
            無料相談
          </a>
        </Container>
        <nav
          aria-label="ページ内メニュー"
          className={cn("border-t md:hidden", LINE)}
        >
          <ul className="flex justify-between px-4">
            {nav.map((n) => (
              <li key={n.href}>
                <a href={n.href} className="block py-2.5 text-xs text-ink/75">
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      {/* 2. ファーストビュー */}
      <section id="top" className="relative">
        <Container className="grid items-center gap-12 py-14 md:py-20 lg:grid-cols-[1fr_1.05fr] lg:gap-16">
          <div>
            <p className="text-sm font-medium text-brand-500">
              社外CISO・セキュリティ顧問サービス
            </p>
            <p className="mt-1 text-sm text-ink/55">
              中小・中堅企業のための AIセキュリティ
            </p>
            <h1 className="mt-6 text-[clamp(1.9rem,3.5vw,2.85rem)] font-semibold leading-[1.35] tracking-[-0.005em]">
              <span className="inline-block">AIを禁止しない会社に、</span>
              <br />
              <span className="inline-block">セキュリティの責任者を。</span>
            </h1>
            <p className="mt-7 max-w-[34rem] text-[15px] leading-[2] text-ink/70 md:text-base">
              社員がAIを安心して使えるルールづくりから、取引先への説明まで。資格を持つセキュリティの専門家が、あなたの会社の責任者として月額でつきます。
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Cta />
              <a
                href="#price"
                className="inline-flex h-14 items-center justify-center rounded-[4px] border border-ink/20 px-7 text-[15px] font-semibold text-ink transition-colors hover:border-ink/50"
              >
                料金を見る
              </a>
            </div>
            <p className="mt-4 text-[13px] leading-relaxed text-ink/50">
              オンライン30分。社内のAIの使い方とセキュリティ体制の気になる点を、専門家が無料で整理します。
            </p>
          </div>
          <div className="relative">
            <div className="relative aspect-[4/3] overflow-hidden rounded-[6px]">
              <Image
                src="/services/cards/talent.jpg"
                alt="セキュリティの専門家が経営層と打ち合わせをしている様子(イメージ)"
                fill
                priority
                sizes="(max-width:1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            <div className="absolute -bottom-6 left-6 right-6 grid grid-cols-3 divide-x divide-[#E4E4E7] rounded-[4px] bg-white shadow-[0_10px_30px_-12px_rgba(0,0,0,0.25)] sm:left-auto sm:w-[26rem]">
              {[
                { k: "月額", v: "8万円〜" },
                { k: "最低契約", v: "6カ月" },
                { k: "無料相談", v: "30分" },
              ].map((x) => (
                <div key={x.k} className="px-4 py-3.5 text-center">
                  <p className="text-[11px] text-ink/50">{x.k}</p>
                  <p className="mt-0.5 text-base font-semibold">{x.v}</p>
                </div>
              ))}
            </div>
          </div>
        </Container>

        {/* 3つの約束 */}
        <div className={cn("border-y bg-[#F7F6F4]", LINE)}>
          <Container className="grid md:grid-cols-3">
            {promises.map((p, i) => (
              <div
                key={p.title}
                className={cn(
                  "py-8 md:px-8 md:first:pl-0",
                  i > 0 && "border-t md:border-l md:border-t-0",
                  LINE,
                )}
              >
                <p className="flex items-baseline gap-3">
                  <span className="text-sm font-medium text-brand-500">
                    0{i + 1}
                  </span>
                  <span className="text-lg font-semibold">{p.title}</span>
                </p>
                <p className="mt-2 text-sm leading-[1.9] text-ink/65">
                  {p.text}
                </p>
              </div>
            ))}
          </Container>
        </div>
      </section>

      {/* 3. お悩み */}
      <section className="py-20 md:py-28">
        <Container>
          <Heading label="Issues">
            AIは使いたい。でも、任せられる人がいない。
          </Heading>
          <ol className={cn("mt-12 grid border-t md:grid-cols-2", LINE)}>
            {worries.map((w, i) => (
              <li
                key={w.title}
                className={cn(
                  "flex gap-6 border-b py-8 md:pr-10 md:[&:nth-child(even)]:border-l md:[&:nth-child(even)]:pl-10",
                  LINE,
                )}
              >
                <span className="text-sm font-medium text-ink/35">
                  0{i + 1}
                </span>
                <div>
                  <p className="text-[17px] font-semibold leading-[1.6]">
                    {w.title}
                  </p>
                  <p className="mt-2 text-[15px] leading-[1.9] text-ink/65">
                    {w.text}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {/* 解決: 写真 + 体制の3層 */}
      <section className="bg-[#F7F6F4] py-20 md:py-28">
        <Container className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <div className="relative aspect-[4/3] overflow-hidden rounded-[6px]">
            <Image
              src="/photos/ciso/consulting.webp"
              alt="専門家が担当者と打ち合わせをしている様子"
              fill
              sizes="(max-width:1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          <div>
            <Heading
              label="Solution"
              lead="AIの利用ルール、導入前のチェック、取引先への回答、社員への説明、事故の初動まで。社内に専任者がいなくても、責任の所在がはっきりした体制をつくります。"
            >
              社外の責任者として、経営・管理・現場の3つの層をまとめて引き受けます。
            </Heading>
            <dl className="mt-10 space-y-2">
              {layers.map((l, i) => (
                <div
                  key={l.k}
                  className="flex items-stretch overflow-hidden rounded-[4px] bg-white"
                  style={{ marginLeft: `${i * 6}%` }}
                >
                  <dt
                    className={cn(
                      "flex w-16 shrink-0 items-center justify-center text-sm font-semibold text-white",
                      i === 0
                        ? "bg-brand-500"
                        : i === 1
                          ? "bg-[#9C3E56]"
                          : "bg-[#C47C8E]",
                    )}
                  >
                    {l.k}
                  </dt>
                  <dd className="px-5 py-4 text-[15px] leading-relaxed">
                    {l.v}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </Container>
      </section>

      {/* 4. なぜ今か */}
      <section className="py-20 md:py-28">
        <Container>
          <Heading label="Why now">
            AIの広がりに、守りと説明が追いついていません。
          </Heading>
          <dl
            className={cn(
              "mt-12 grid border-t sm:grid-cols-2 lg:grid-cols-4",
              LINE,
            )}
          >
            {facts.map((f, i) => (
              <div
                key={f.value}
                className={cn(
                  "border-b py-8 sm:pr-8 lg:border-b-0",
                  i % 2 === 1 && "sm:border-l sm:pl-8",
                  i >= 1 && "lg:border-l lg:pl-8",
                  LINE,
                )}
              >
                <dt className="font-semibold leading-none tracking-tight">
                  <span className="text-[3.25rem]">{f.value}</span>
                  <span className="ml-1 text-lg text-ink/60">{f.unit}</span>
                </dt>
                <dd className="mt-5 text-sm leading-[1.9] text-ink/70">
                  {f.text}
                  <span className="ml-1 text-[11px] text-ink/40">{f.note}</span>
                </dd>
              </div>
            ))}
          </dl>
          <p className="mt-4 text-[11px] text-ink/40">
            出典はページ下部に記載しています。
          </p>
        </Container>
      </section>

      {/* 5. 3つの特長 */}
      <section
        id="service"
        className="scroll-mt-28 bg-[#F7F6F4] py-20 md:py-28"
      >
        <Container>
          <Heading label="Features">Bond AI が選ばれる3つの理由</Heading>
          <div className="mt-14 space-y-16 md:space-y-24">
            {features.map((f, i) => (
              <Reveal key={f.title} variant="up">
                <article className="grid items-center gap-10 lg:grid-cols-2 lg:gap-20">
                  <div
                    className={cn(
                      "relative aspect-[3/2] overflow-hidden rounded-[6px]",
                      i % 2 === 1 && "lg:order-2",
                    )}
                  >
                    <Image
                      src={f.image}
                      alt={f.alt}
                      fill
                      sizes="(max-width:1024px) 100vw, 50vw"
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-brand-500">
                      Reason 0{i + 1}
                    </p>
                    <h3 className="mt-3 text-[clamp(1.4rem,2.4vw,1.85rem)] font-semibold leading-[1.45]">
                      {f.title}
                    </h3>
                    <p className="mt-5 text-[15px] leading-[2] text-ink/70">
                      {f.text}
                    </p>
                    <ul className={cn("mt-7 border-t", LINE)}>
                      {f.points.map((pt) => (
                        <li
                          key={pt}
                          className={cn(
                            "flex gap-3 border-b py-3 text-[15px]",
                            LINE,
                          )}
                        >
                          <Check />
                          {pt}
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>

          {/* 毎月の支援内容 */}
          <div className="mt-24 rounded-[6px] bg-white p-8 md:p-12">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h3 className="text-xl font-semibold">毎月の支援内容</h3>
              <p className="text-sm text-ink/50">社外CISOプランの例</p>
            </div>
            <ul className="mt-8 grid gap-x-10 sm:grid-cols-2 lg:grid-cols-3">
              {monthly.map((m) => (
                <li
                  key={m}
                  className={cn(
                    "flex gap-3 border-t py-3.5 text-[15px] leading-relaxed",
                    LINE,
                  )}
                >
                  <Check />
                  {m}
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      {/* 6. 料金 */}
      <section id="price" className="scroll-mt-28 py-20 md:py-28">
        <Container>
          <Heading label="Pricing" lead="税別・月額。最低契約期間は6カ月です。">
            会社の規模と課題に合わせて選べます。
          </Heading>
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {plans.map((p) => (
              <article
                key={p.name}
                className={cn(
                  "relative flex flex-col rounded-[6px] border bg-white",
                  p.recommended
                    ? "border-brand-500 shadow-[0_20px_40px_-28px_rgba(122,30,53,0.6)]"
                    : LINE,
                )}
              >
                {p.recommended ? (
                  <p className="absolute -top-3 left-8 bg-brand-500 px-2.5 py-0.5 text-[11px] font-semibold text-white">
                    おすすめ
                  </p>
                ) : null}
                <div className={cn("border-b p-8", LINE)}>
                  <h3 className="text-lg font-semibold">{p.name}</h3>
                  <p className="mt-1 text-sm text-ink/55">
                    {p.target}（{p.size}）
                  </p>
                  <p className="mt-6 flex items-baseline gap-1">
                    <span className="text-sm text-ink/60">月</span>
                    <span className="text-[2.75rem] font-semibold leading-none tracking-tight">
                      {p.price}
                    </span>
                    <span className="text-base font-semibold">万円</span>
                    <span className="ml-1 text-xs text-ink/45">（税別）</span>
                  </p>
                </div>
                <ul className="flex-1 space-y-3 p-8">
                  {p.items.map((it) => (
                    <li
                      key={it}
                      className="flex gap-3 text-[14px] leading-relaxed text-ink/80"
                    >
                      <Check />
                      {it}
                    </li>
                  ))}
                </ul>
                <div className="px-8 pb-8">
                  <a
                    href={`#${FORM_ID}`}
                    className={cn(
                      "flex h-12 items-center justify-center rounded-[4px] text-sm font-semibold transition-colors",
                      p.recommended
                        ? "bg-brand-500 text-white hover:bg-brand-600"
                        : "border border-ink/20 hover:border-ink/50",
                    )}
                  >
                    このプランを相談する
                  </a>
                </div>
              </article>
            ))}
          </div>

          {/* 比較 */}
          <div className="mt-16 grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:items-center">
            <h3 className="text-xl font-semibold leading-[1.6]">
              常勤のCISOを採用するより、ずっと始めやすく。
            </h3>
            <table className="w-full border-collapse text-left">
              <tbody>
                <tr className={cn("border-y", LINE)}>
                  <th className="py-5 pr-4 text-sm font-normal text-ink/60">
                    常勤のCISOを採用した場合
                  </th>
                  <td className="py-5 text-right text-xl font-semibold text-ink/50">
                    年収1,000万円以上
                    <span className="ml-1 text-xs font-normal">※5</span>
                  </td>
                </tr>
                <tr className={cn("border-b", LINE)}>
                  <th className="py-5 pr-4 text-sm font-semibold">
                    Bond AI の社外CISO
                  </th>
                  <td className="py-5 text-right text-xl font-semibold text-brand-500">
                    年360万円
                    <span className="ml-1 text-sm text-ink/60">
                      （月30万円）
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="mt-10 text-sm leading-[1.9] text-ink/60">
            <p>
              稼働時間を超えた分は1時間3万円です。次のメニューは別途ご相談ください。
            </p>
            <p>
              半日・1日の社員研修、なりすましメール訓練、事故対応の机上演習／ISO/IEC
              42001（AIの国際認証）の取得支援
            </p>
          </div>
        </Container>
      </section>

      {/* 7. 担当する専門家 */}
      <section className="bg-[#F7F6F4] py-20 md:py-28">
        <Container className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
          <div>
            <Heading
              label="Expert"
              lead="調べる・書く・まとめる作業はAIで効率化し、専門家は「判断」と「説明」に集中します。だから、相場どおりの価格で、AIまで見る責任者を置けます。"
            >
              資格と実務経験を持つ専門家が、責任者としてつきます。
            </Heading>
            <dl className={cn("mt-10 border-t", LINE)}>
              {expert.map((e) => (
                <div
                  key={e.label}
                  className={cn(
                    "grid gap-1 border-b py-5 sm:grid-cols-[9rem_1fr] sm:gap-6",
                    LINE,
                  )}
                >
                  <dt className="text-sm font-semibold">{e.label}</dt>
                  <dd className="text-[15px] leading-[1.9] text-ink/70">
                    {e.body}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="relative min-h-[22rem] overflow-hidden rounded-[6px]">
            <Image
              src="/photos/ciso/server-room.webp"
              alt="サーバールームで確認作業をするセキュリティの担当者(イメージ)"
              fill
              sizes="(max-width:1024px) 100vw, 45vw"
              className="object-cover"
            />
          </div>
        </Container>
      </section>

      {/* 8. 導入の流れ */}
      <section id="flow" className="scroll-mt-28 py-20 md:py-28">
        <Container>
          <Heading label="Flow">導入の流れ</Heading>
          <ol className="mt-12 grid gap-8 md:grid-cols-5 md:gap-6">
            {flow.map((f, i) => (
              <li
                key={f.title}
                className="border-t-2 border-ink pt-5 first:border-brand-500"
              >
                <p className="text-sm font-medium text-ink/45">Step {i + 1}</p>
                <p className="mt-2 text-base font-semibold">{f.title}</p>
                <p className="mt-2 text-sm leading-[1.85] text-ink/65">
                  {f.text}
                </p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {/* CTA(写真) */}
      <section className="relative isolate overflow-hidden py-20 text-white md:py-24">
        <Image
          src="/photos/ciso/office.webp"
          alt=""
          fill
          sizes="100vw"
          className="-z-20 object-cover"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-[#141414]/70"
        />
        <Container className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          <div>
            <p className="text-[clamp(1.4rem,2.6vw,2rem)] font-semibold leading-[1.5]">
              まずは無料の「AI利用チェック」から。
            </p>
            <p className="mt-3 text-[15px] text-white/80">
              オンライン30分。優先して手を打つべき点を専門家がお伝えします。売り込みはしません。
            </p>
          </div>
          <Cta light>無料で申し込む</Cta>
        </Container>
      </section>

      {/* 9. よくある質問 */}
      <section id="faq" className="scroll-mt-28 py-20 md:py-28">
        <Container className="grid gap-10 lg:grid-cols-[1fr_2fr] lg:gap-20">
          <Heading label="FAQ">よくある質問</Heading>
          <div className={cn("border-t", LINE)}>
            {faqs.map((f) => (
              <details key={f.q} className={cn("group border-b", LINE)}>
                <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-6 [&::-webkit-details-marker]:hidden">
                  <span className="text-[15px] font-semibold leading-relaxed md:text-base">
                    {f.q}
                  </span>
                  <span
                    aria-hidden="true"
                    className="mt-1 text-lg leading-none text-ink/40 transition-transform group-open:rotate-45"
                  >
                    +
                  </span>
                </summary>
                <p className="pb-6 pr-10 text-[15px] leading-[1.95] text-ink/70">
                  {f.a}
                </p>
              </details>
            ))}
          </div>
        </Container>
      </section>

      {/* 10. 申し込み */}
      <section
        id={FORM_ID}
        className="scroll-mt-28 bg-[#F7F6F4] py-20 md:py-28"
      >
        <Container className="grid gap-12 lg:grid-cols-[1fr_1.3fr] lg:gap-20">
          <div>
            <Heading
              label="Contact"
              lead="オンライン30分。社内のAIの使い方、取引先から求められていること、今の体制を伺い、優先して手を打つべき点を専門家がお伝えします。売り込みはしません。"
            >
              まずは無料の「AI利用チェック」から
            </Heading>
          </div>
          <div className="rounded-[6px] bg-white p-7 md:p-10">
            <AiCheckForm privacyHref={localePath("/privacy", locale)} />
          </div>
        </Container>
      </section>

      {/* 11. フッター(LP) */}
      <footer className={cn("border-t py-12", LINE)}>
        <Container>
          <p className="text-sm">
            <span className="font-semibold">
              Bond<span className="text-brand-500"> AI</span>
            </span>
            <span className="ml-3 text-ink/55">運営：{site.legalName}</span>
          </p>
          <div className="mt-6 text-[11px] leading-[1.9] text-ink/50">
            <p className="text-ink/65">出典</p>
            <ul>
              {sources.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
            <p className="mt-3">
              注記：ISMSやISO/IEC
              42001などの認証は審査機関が行います。当社は取得の支援を行います。
            </p>
            <p>※ 写真はイメージです。</p>
          </div>
        </Container>
      </footer>
    </div>
  );
}
