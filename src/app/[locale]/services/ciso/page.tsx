import type { Metadata } from "next";
import Image from "next/image";
import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  IconBanned,
  IconChecksheet,
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

const W = "#7A1E35"; // メイン(ワインレッド)
const W2 = "#A83B57"; // やや明るいワインレッド
const LINE = "#EEDFE3";

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

const worries: {
  title: ReactNode;
  text: string;
  Icon: (p: { className?: string }) => ReactNode;
}[] = [
  {
    title: (
      <>
        社員が会社の知らないところで<em>AIを使っている</em>
      </>
    ),
    text: "何を入力してよいか、どのツールなら安全か、ルールがない。",
    Icon: IconShadowAi,
  },
  {
    title: (
      <>
        「AIは危ないから禁止」で、<em>活用が止まっている</em>
      </>
    ),
    text: "本当は使いたいのに、判断できる人がいない。",
    Icon: IconBanned,
  },
  {
    title: (
      <>
        取引先から<em>チェックシートや「★3」</em>を求められた
      </>
    ),
    text: "何十問もの設問に、自信を持って答えられる人が社内にいない。",
    Icon: IconChecksheet,
  },
  {
    title: (
      <>
        情シスが<em>一人、または兼務</em>で回している
      </>
    ),
    text: "相談相手も、経営に説明するときの後ろ盾もない。",
    Icon: IconSoloIt,
  },
];

/** 解決の図: Bond AI が担う役割 */
const roles = [
  "AI利用ルール",
  "導入前チェック",
  "AIシステム台帳",
  "チェックシート回答",
  "脆弱性診断",
  "社員説明会",
  "月次報告",
  "事故の初動",
];

const features = [
  {
    title: "AIを止めずに、安全に広げる",
    text: "禁止するのではなく、安心して使えるルールをつくります。社員のAI利用、社内で使うAIやAIエージェント、AIを使ったなりすまし詐欺。従来のセキュリティに加えて、AIのリスクまで一つの窓口で引き受けます。",
    visual: "policy",
  },
  {
    title: "契約後すぐに、診断から",
    text: "最初の1〜2カ月で、AIの利用状況と弱点を診断します。年1回の脆弱性診断（提携の診断会社が実施）もプランに含め、結果は専門家が分かりやすく説明します。",
    visual: "diagnosis",
  },
  {
    title: "ルールを作って終わりにしない",
    text: "AI利用ルールの整備、社員への説明会、取引先のチェックシート回答、社外CISOとしての名前の掲載まで行います。「専門家が責任者としてついています」と、取引先に言える状態をつくります。",
    visual: "checksheet",
  },
] as const;

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

const sources = [
  "※1 IPA「情報セキュリティ10大脅威 2026」（組織編）",
  "※2 IPA「SCS評価制度」の公表資料（2026年）。申請受付の開始は予定",
  "※3 キヤノンITソリューションズの調査",
  "※4 令和8年版 警察白書（2025年のランサムウェア被害226件のうち中小企業143件）",
  "※5 アクセルパートナーズの解説記事による目安",
];

/* ============================================================ 小さな部品 */

function Cta({
  children,
  sub,
  href = `#${FORM_ID}`,
  tone = "wine",
  className,
}: {
  children: ReactNode;
  sub?: string;
  href?: string;
  tone?: "wine" | "outline";
  className?: string;
}) {
  return (
    <a
      href={href}
      className={cn(
        "group relative inline-flex h-16 items-center justify-center rounded-full pl-7 pr-16 text-center transition duration-300 hover:-translate-y-0.5",
        tone === "wine" &&
          "bg-[linear-gradient(100deg,#7A1E35,#B4475F)] text-white shadow-[0_14px_30px_-12px_rgba(122,30,53,0.7)]",
        tone === "outline" &&
          "border-2 border-brand-500 bg-white text-brand-600 hover:bg-brand-50",
        className,
      )}
    >
      <span className="leading-tight">
        <span className="block text-[15px] font-bold tracking-[0.03em] md:text-base">
          {children}
        </span>
        {sub ? (
          <span
            className={cn(
              "mt-0.5 block text-[11px] font-bold",
              tone === "wine" ? "text-white/80" : "text-ink/55",
            )}
          >
            {sub}
          </span>
        ) : null}
      </span>
      <span
        aria-hidden="true"
        className={cn(
          "absolute right-2 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full transition-transform duration-300 group-hover:translate-x-0.5",
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

/** 見出し: 大きな英字 + 日本語 + 左だけ色の付いた下線 */
function Heading({
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
      <p className="font-display text-[clamp(2.2rem,5vw,3.4rem)] font-black uppercase leading-none tracking-[0.02em] text-brand-500">
        {en}
      </p>
      <h2 className="mt-3 text-[clamp(1.35rem,2.6vw,1.9rem)] font-bold leading-[1.5] tracking-[0.04em] text-ink [word-break:auto-phrase]">
        {children}
      </h2>
      <div
        className={cn(
          "relative mt-5 h-px bg-[#EEDFE3]",
          center && "mx-auto max-w-xs",
        )}
      >
        <span
          className={cn(
            "absolute inset-y-0 -translate-y-px border-b-2 border-brand-500",
            center ? "left-1/2 w-16 -translate-x-1/2" : "left-0 w-24",
          )}
        />
      </div>
    </Reveal>
  );
}

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

/* ----------------------------------- ファーストビュー: 体制図と月次報告書 */

/** 会社の中で、社外CISOがどこに入るかを示す体制図 */
function HeroVisual() {
  return (
    <div className="relative px-2 pb-28 sm:px-6 lg:pr-0">
      <div className="relative rounded-xl bg-white p-6 shadow-[0_40px_80px_-40px_rgba(60,15,25,0.45)] ring-1 ring-[#EEDFE3] md:p-8">
        <div className="flex items-center justify-between">
          <p className="text-sm font-black text-ink">御社のセキュリティ体制</p>
          <span className="rounded-full bg-brand-50 px-3 py-1 text-[11px] font-bold text-brand-600">
            Bond AI 導入後
          </span>
        </div>

        {/* 経営者 */}
        <div className="mt-6 flex justify-center">
          <div className="flex items-center gap-2 rounded-lg bg-[#F5F2F3] px-5 py-2.5 text-sm font-bold">
            <Icon name="person" className="h-4 w-4 text-ink/60" />
            経営者
          </div>
        </div>
        <div aria-hidden="true" className="mx-auto h-5 w-0.5 bg-[#D9C3C9]" />

        {/* 社外CISO(強調) */}
        <div className="relative mx-auto max-w-[19rem] rounded-xl bg-[linear-gradient(120deg,#7A1E35,#B4475F)] p-4 text-white shadow-[0_18px_36px_-16px_rgba(122,30,53,0.7)]">
          <div className="flex items-center gap-3">
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-white/20">
              <Icon name="shield" className="h-6 w-6" />
            </span>
            <div className="leading-tight">
              <p className="text-[10px] font-bold tracking-[0.15em] text-white/80">
                社外CISO・セキュリティ顧問
              </p>
              <p className="mt-1 text-base font-black">Bond AI の専門家</p>
              <p className="mt-1 text-[11px] text-white/80">
                資格を持つセキュリティの責任者
              </p>
            </div>
          </div>
          <span className="absolute -right-3 -top-3 rounded-full bg-[#F5B82E] px-2.5 py-1 text-[10px] font-black text-ink shadow">
            責任者
          </span>
        </div>

        {/* 枝分かれ */}
        <div aria-hidden="true" className="mx-auto h-5 w-0.5 bg-[#D9C3C9]" />
        <div
          aria-hidden="true"
          className="mx-auto h-0.5 w-[70%] bg-[#D9C3C9]"
        />
        <div className="grid grid-cols-3 gap-2 pt-0">
          {[
            { k: "情報システム", v: "導入前チェック" },
            { k: "総務・人事", v: "AI利用ルール" },
            { k: "各部門", v: "社員への説明会" },
          ].map((d) => (
            <div key={d.k} className="flex flex-col items-center">
              <span aria-hidden="true" className="h-4 w-0.5 bg-[#D9C3C9]" />
              <div className="w-full rounded-lg border border-[#EEDFE3] bg-[#FBF6F7] px-2 py-2.5 text-center">
                <p className="text-[12px] font-bold">{d.k}</p>
                <p className="mt-1 text-[10px] font-bold text-brand-500">
                  {d.v}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* 取引先への説明 */}
        <div className="mt-5 flex items-center gap-3 rounded-lg border border-dashed border-brand-200 px-4 py-3">
          <Icon name="doc" className="h-5 w-5 shrink-0 text-brand-500" />
          <p className="text-[12px] font-bold leading-snug">
            取引先・監査へ「セキュリティの責任者は社外CISOです」と説明できる
          </p>
        </div>
      </div>

      {/* 月次報告書 */}
      <div className="absolute bottom-0 right-2 w-[15rem] animate-float-y rounded-lg bg-white p-4 shadow-[0_24px_50px_-22px_rgba(60,15,25,0.5)] ring-1 ring-[#EEDFE3] sm:right-6 lg:right-0">
        <div className="flex items-center justify-between">
          <p className="text-[12px] font-black">月次報告書</p>
          <span className="text-[10px] font-bold text-ink/45">社外CISO</span>
        </div>
        <ul className="mt-2.5 space-y-1.5 text-[11px] font-bold">
          {[
            "AI利用ルールの見直し",
            "AIツールの導入前チェック",
            "取引先チェックシート回答",
          ].map((t) => (
            <li key={t} className="flex items-center gap-2">
              <span className="grid h-4 w-4 place-items-center rounded-full bg-[#E3F5EC] text-[9px] text-[#1E8A57]">
                ✓
              </span>
              {t}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------ 図・グラフ */

/** ドーナツグラフ */
function Donut({ value, label }: { value: number; label: string }) {
  const r = 42;
  const c = 2 * Math.PI * r;
  return (
    <svg
      viewBox="0 0 110 110"
      className="h-28 w-28"
      role="img"
      aria-label={`${label} ${value}%`}
    >
      <circle
        cx="55"
        cy="55"
        r={r}
        fill="none"
        stroke={LINE}
        strokeWidth="14"
      />
      <circle
        cx="55"
        cy="55"
        r={r}
        fill="none"
        stroke={W}
        strokeWidth="14"
        strokeDasharray={`${(c * value) / 100} ${c}`}
        transform="rotate(-90 55 55)"
      />
      <text
        x="55"
        y="60"
        textAnchor="middle"
        fontSize="18"
        fontWeight="900"
        fill={W}
      >
        {value}%
      </text>
    </svg>
  );
}

/** 10大脅威の順位(3位を強調) */
function RankChart() {
  const bars = [100, 88, 76, 66, 58];
  return (
    <svg
      viewBox="0 0 150 110"
      className="h-28 w-auto"
      role="img"
      aria-label="AIの利用をめぐるサイバーリスクが10大脅威の3位"
    >
      {bars.map((w, i) => (
        <g key={i}>
          <text
            x="0"
            y={16 + i * 21}
            fontSize="10"
            fontWeight="700"
            fill={i === 2 ? W : "#9A8E91"}
          >
            {i + 1}位
          </text>
          <rect
            x="24"
            y={7 + i * 21}
            width={w * 1.2}
            height="12"
            rx="3"
            fill={i === 2 ? W : LINE}
          />
        </g>
      ))}
      <text x={24 + 76 * 1.2 + 4} y="58" fontSize="9" fontWeight="800" fill={W}>
        AI
      </text>
    </svg>
  );
}

/** SCS評価制度のタイムライン */
function TimelineChart() {
  return (
    <svg
      viewBox="0 0 170 110"
      className="h-28 w-auto"
      role="img"
      aria-label="2026年 制度の公表、2027年3月 申請受付開始予定"
    >
      <line
        x1="10"
        y1="60"
        x2="160"
        y2="60"
        stroke={LINE}
        strokeWidth="4"
        strokeLinecap="round"
      />
      <line
        x1="10"
        y1="60"
        x2="110"
        y2="60"
        stroke={W}
        strokeWidth="4"
        strokeLinecap="round"
      />
      <circle cx="30" cy="60" r="7" fill="#fff" stroke={W} strokeWidth="3" />
      <circle cx="120" cy="60" r="10" fill={W} />
      <text
        x="30"
        y="40"
        textAnchor="middle"
        fontSize="10"
        fontWeight="700"
        fill="#9A8E91"
      >
        2026年
      </text>
      <text
        x="30"
        y="84"
        textAnchor="middle"
        fontSize="9"
        fontWeight="700"
        fill="#9A8E91"
      >
        制度の公表
      </text>
      <text
        x="120"
        y="38"
        textAnchor="middle"
        fontSize="11"
        fontWeight="900"
        fill={W}
      >
        2027.3
      </text>
      <text
        x="120"
        y="86"
        textAnchor="middle"
        fontSize="9"
        fontWeight="800"
        fill={W}
      >
        申請受付（予定）
      </text>
    </svg>
  );
}

/** 体制のピラミッド */
function Pyramid() {
  const layers = [
    { k: "経営", v: "責任者を決め、方針を示す", y: 0 },
    { k: "管理", v: "AI利用ルール・AIシステム台帳・導入前チェック", y: 1 },
    { k: "現場", v: "社員への説明会・日々の相談", y: 2 },
  ];
  return (
    <div className="grid items-center gap-8 md:grid-cols-[1fr_1.1fr]">
      <svg
        viewBox="0 0 300 250"
        className="mx-auto h-auto w-full max-w-[340px]"
        role="img"
        aria-label="経営・管理・現場の3層でAIセキュリティの体制をつくるピラミッド図"
      >
        <polygon points="150,10 205,85 95,85" fill={W} />
        <polygon points="92,90 208,90 250,165 50,165" fill={W2} />
        <polygon points="46,170 254,170 296,245 4,245" fill="#E7C4CD" />
        <text
          x="150"
          y="68"
          textAnchor="middle"
          fontSize="18"
          fontWeight="900"
          fill="#fff"
        >
          経営
        </text>
        <text
          x="150"
          y="135"
          textAnchor="middle"
          fontSize="18"
          fontWeight="900"
          fill="#fff"
        >
          管理
        </text>
        <text
          x="150"
          y="215"
          textAnchor="middle"
          fontSize="18"
          fontWeight="900"
          fill={W}
        >
          現場
        </text>
      </svg>
      <ol className="space-y-3">
        {layers.map((l) => (
          <li
            key={l.k}
            className="flex items-center gap-4 rounded-lg bg-white p-4 ring-1 ring-[#EEDFE3]"
          >
            <span
              className={cn(
                "grid h-12 w-12 shrink-0 place-items-center rounded-md text-sm font-black",
                l.y === 0 && "bg-brand-500 text-white",
                l.y === 1 && "bg-[#A83B57] text-white",
                l.y === 2 && "bg-[#E7C4CD] text-brand-600",
              )}
            >
              {l.k}
            </span>
            <p className="text-[15px] font-bold leading-relaxed">{l.v}</p>
          </li>
        ))}
        <li className="pl-1 pt-1 text-sm font-bold text-brand-600">
          → Bond AI は、3つの層をまとめて引き受けます
        </li>
      </ol>
    </div>
  );
}

/** 毎月の改善サイクル */
function Cycle() {
  const steps = [
    "診断する",
    "ルールを直す",
    "社員に伝える",
    "取引先に説明",
    "報告・見直し",
  ];
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[300px]">
      <svg
        viewBox="0 0 200 200"
        className="absolute inset-0 h-full w-full"
        aria-hidden="true"
      >
        <circle
          cx="100"
          cy="100"
          r="74"
          fill="none"
          stroke={LINE}
          strokeWidth="10"
        />
        <circle
          cx="100"
          cy="100"
          r="74"
          fill="none"
          stroke={W}
          strokeWidth="10"
          strokeDasharray="60 33"
          strokeLinecap="round"
        />
      </svg>
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
        <p className="text-[10px] font-bold tracking-[0.2em] text-brand-500">
          MONTHLY
        </p>
        <p className="mt-1 text-base font-black leading-tight">
          毎月の
          <br />
          改善サイクル
        </p>
      </div>
      {steps.map((s, i) => {
        const a = ((-90 + (360 / steps.length) * i) * Math.PI) / 180;
        const x = 50 + 41 * Math.cos(a);
        const y = 50 + 41 * Math.sin(a);
        return (
          <span
            key={s}
            className="absolute -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full bg-white px-2.5 py-1 text-[11px] font-bold shadow-[0_8px_18px_-10px_rgba(60,15,25,0.6)] ring-1 ring-[#EEDFE3]"
            style={{ left: `${x}%`, top: `${y}%` }}
          >
            {s}
          </span>
        );
      })}
    </div>
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
    <div className="bg-white font-medium text-ink [&_em]:not-italic [&_em]:text-brand-500">
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

      {/* 2. ファーストビュー: 左に文章、右に体制図 */}
      <section
        id="top"
        className="relative isolate overflow-hidden bg-[linear-gradient(180deg,#FFFFFF_0%,#FBF4F6_100%)]"
      >
        {/* 背景の斜めの面と細い線 */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-24 top-0 -z-10 h-full w-[55%] bg-[#F7ECEF] [clip-path:polygon(18%_0,100%_0,100%_100%,0_100%)]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 opacity-50 [background-image:linear-gradient(to_right,#EEDFE3_1px,transparent_1px),linear-gradient(to_bottom,#EEDFE3_1px,transparent_1px)] [background-size:44px_44px] [mask-image:linear-gradient(to_left,black,transparent_60%)]"
        />
        <Container className="grid items-center gap-14 pb-24 pt-12 md:pt-16 lg:grid-cols-[1fr_1.05fr] lg:pb-28">
          <div>
            <p className="flex animate-fade-up flex-wrap items-center gap-x-3 gap-y-2">
              <span className="rounded-md bg-brand-500 px-3 py-1.5 text-sm font-black tracking-[0.04em] text-white md:text-base">
                社外CISO・セキュリティ顧問サービス
              </span>
              <span className="text-sm font-bold text-brand-500">
                中小・中堅企業のための AIセキュリティ
              </span>
            </p>
            <h1
              className="mt-5 animate-fade-up text-[clamp(1.85rem,3.6vw,2.9rem)] font-bold leading-[1.45] tracking-[0.03em]"
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
              className="mt-6 max-w-xl animate-fade-up text-[15px] leading-[2] text-ink/80"
              style={{ animationDelay: "0.25s" }}
            >
              社員がAIを安心して使えるルールづくりから、取引先への説明まで。資格を持つセキュリティの専門家が、あなたの会社の責任者として月額でつきます。
            </p>
            {/* 任せられること */}
            <ul
              className="mt-6 grid max-w-xl animate-fade-up grid-cols-2 gap-2 sm:grid-cols-4"
              style={{ animationDelay: "0.32s" }}
              aria-label="Bond AI に任せられること"
            >
              {[
                { t: "社外CISO（責任者）", i: "person" },
                { t: "AI利用ルールづくり", i: "doc" },
                { t: "チェックシート回答", i: "check" },
                { t: "脆弱性診断・月次報告", i: "chart" },
              ].map((x) => (
                <li
                  key={x.t}
                  className="flex flex-col items-center gap-1.5 rounded-lg bg-white px-2 py-3 text-center text-[12px] font-bold leading-snug ring-1 ring-[#EEDFE3]"
                >
                  <span className="grid h-8 w-8 place-items-center rounded-full bg-brand-50 text-brand-500">
                    <Icon name={x.i as "person"} className="h-4 w-4" />
                  </span>
                  {x.t}
                </li>
              ))}
            </ul>
            <div
              className="mt-8 flex animate-fade-up flex-col gap-3 sm:flex-row sm:flex-wrap"
              style={{ animationDelay: "0.4s" }}
            >
              <Cta sub="オンライン30分・無料">
                無料の「AI利用チェック」を申し込む
              </Cta>
              <Cta href="#price" tone="outline" sub="月8万円から">
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
          <div
            className="animate-fade-up px-2 sm:px-6 lg:px-0"
            style={{ animationDelay: "0.3s" }}
          >
            <HeroVisual />
          </div>
        </Container>
      </section>

      {/* 3つの約束 */}
      <section aria-label="3つの約束" className="relative z-10 -mt-12">
        <Container>
          <ul className="grid overflow-hidden rounded-xl bg-white shadow-[0_30px_60px_-40px_rgba(60,15,25,0.5)] ring-1 ring-[#EEDFE3] md:grid-cols-3">
            {promises.map((p, i) => (
              <li
                key={p.title}
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
            ))}
          </ul>
        </Container>
      </section>

      {/* 3. お悩み + 解決 */}
      <section className="pt-20 md:pt-28">
        <Container>
          <Reveal variant="up" className="text-center">
            <p className="text-sm font-bold tracking-[0.15em] text-brand-500">
              PROBLEM
            </p>
            <h2 className="mt-3 text-[clamp(1.5rem,3vw,2.2rem)] font-bold tracking-[0.04em] [word-break:auto-phrase]">
              AIは使いたい。でも、<em>任せられる人</em>がいない。
            </h2>
          </Reveal>
          <ul className="mx-auto mt-14 grid max-w-6xl grid-cols-1 gap-x-4 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {worries.map((w, i) => (
              <Reveal key={i} variant="up" delay={i * 80} className="h-full">
                <li className="relative flex h-full flex-col items-center rounded-lg bg-[#FBF6F7] px-5 pb-6 pt-10 text-center shadow-[0_18px_36px_-26px_rgba(60,15,25,0.5)]">
                  <span className="absolute -top-6 left-1/2 grid h-14 w-14 -translate-x-1/2 place-items-center rounded-full bg-brand-500 text-white shadow-md">
                    <span className="leading-none">
                      <span className="block text-[9px] font-bold">お悩み</span>
                      <span className="block text-2xl font-black">{i + 1}</span>
                    </span>
                    <span
                      aria-hidden="true"
                      className="absolute -bottom-1.5 left-1/2 h-3 w-3 -translate-x-1/2 rotate-45 bg-brand-500"
                    />
                  </span>
                  <w.Icon className="h-28 w-auto md:h-32" />
                  <p className="mt-4 text-base font-bold leading-[1.6]">
                    {w.title}
                  </p>
                  <p className="mt-2 text-sm leading-[1.8] text-ink/70">
                    {w.text}
                  </p>
                  <span
                    aria-hidden="true"
                    className="mt-auto pt-3 text-[#D9B3BE]"
                  >
                    ︾
                  </span>
                </li>
              </Reveal>
            ))}
          </ul>
        </Container>

        {/* 解決: 写真 + 円形の図 */}
        <div className="relative isolate mt-12 overflow-hidden py-20 md:py-24">
          <Image
            src="/services/cards/ai-solutions.jpg"
            alt=""
            fill
            sizes="100vw"
            className="-z-20 object-cover"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-10 bg-[linear-gradient(100deg,rgba(255,255,255,0.97)_0%,rgba(255,255,255,0.93)_50%,rgba(251,244,246,0.86)_100%)]"
          />
          <Container className="grid items-center gap-12 lg:grid-cols-2">
            <Reveal variant="scale">
              <div className="relative mx-auto aspect-square w-full max-w-[400px]">
                <div
                  aria-hidden="true"
                  className="absolute inset-[13%] rounded-full border-2 border-dashed border-brand-200"
                />
                <div className="absolute left-1/2 top-1/2 grid h-[34%] w-[34%] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-[linear-gradient(135deg,#7A1E35,#B4475F)] text-center text-white shadow-[0_20px_40px_-16px_rgba(122,30,53,0.7)]">
                  <div>
                    <Icon name="shield" className="mx-auto h-7 w-7" />
                    <p className="mt-1 text-base font-black">Bond AI</p>
                  </div>
                </div>
                {roles.map((d, i) => {
                  const a = ((-90 + (360 / roles.length) * i) * Math.PI) / 180;
                  return (
                    <span
                      key={d}
                      className="absolute grid h-[22%] w-[22%] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white px-1 text-center text-[10px] font-bold leading-tight text-ink shadow-[0_10px_24px_-12px_rgba(60,15,25,0.5)] ring-1 ring-[#EEDFE3] md:text-[11px]"
                      style={{
                        left: `${50 + 37 * Math.cos(a)}%`,
                        top: `${50 + 37 * Math.sin(a)}%`,
                      }}
                    >
                      {d}
                    </span>
                  );
                })}
              </div>
            </Reveal>
            <Reveal variant="up">
              <p className="text-lg font-bold">Bond AI は</p>
              <p className="mt-3 text-[clamp(1.5rem,3vw,2.2rem)] font-bold leading-[1.6] [word-break:auto-phrase]">
                社外の<em>責任者</em>として、AIを<em>安全に使える体制</em>
                を月額でつくる
              </p>
              <p className="mt-3 text-lg font-bold">
                ことで、これらのお悩みを解決します。
              </p>
              <span
                aria-hidden="true"
                className="mt-6 block h-0.5 w-14 bg-brand-500"
              />
              <p className="mt-6 text-[15px] leading-[2] text-ink/80">
                AIの利用ルール、導入前のチェック、取引先への回答、社員への説明、事故の初動まで。社内に専任者がいなくても、責任の所在がはっきりした体制をつくります。
              </p>
            </Reveal>
          </Container>
        </div>
      </section>

      {/* 4. なぜ今か: 数字 + グラフ */}
      <section className="bg-[#FBF6F7] py-20 md:py-28">
        <Container>
          <Heading en="Why now">
            AIの広がりに、守りと説明が追いついていません
          </Heading>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                big: (
                  <>
                    3<span className="text-xl">位</span>
                  </>
                ),
                chart: <RankChart />,
                text: "「AIの利用をめぐるサイバーリスク」が、組織向けの10大脅威に初めて選ばれ、3位に。",
                note: "※1",
              },
              {
                big: (
                  <>
                    2027<span className="text-xl">年3月</span>
                  </>
                ),
                chart: <TimelineChart />,
                text: "取引先のセキュリティを★で評価する国の制度（SCS評価制度）の申請受付が始まる予定。",
                note: "※2",
              },
              {
                big: (
                  <>
                    84.4<span className="text-xl">%</span>
                  </>
                ),
                chart: (
                  <Donut
                    value={84.4}
                    label="取引先のセキュリティを確認している大企業の割合"
                  />
                ),
                text: "発注側の大企業のうち、取引先のセキュリティを確認している割合。",
                note: "※3",
              },
              {
                big: (
                  <>
                    63.3<span className="text-xl">%</span>
                  </>
                ),
                chart: (
                  <Donut
                    value={63.3}
                    label="ランサムウェア被害のうち中小企業の割合"
                  />
                ),
                text: "2025年のランサムウェア被害のうち、中小企業が占めた割合。",
                note: "※4",
              },
            ].map((f, i) => (
              <Reveal key={i} variant="up" delay={i * 80} className="h-full">
                <article className="flex h-full flex-col rounded-xl bg-white p-6 shadow-[0_20px_40px_-32px_rgba(60,15,25,0.5)] ring-1 ring-[#EEDFE3]">
                  <p className="font-display text-4xl font-black leading-none text-brand-500 md:text-[2.6rem]">
                    {f.big}
                  </p>
                  <div className="my-5 grid h-28 place-items-center rounded-lg bg-[#FBF6F7]">
                    {f.chart}
                  </div>
                  <p className="text-sm leading-[1.85] text-ink/80">
                    {f.text}
                    <span className="ml-1 text-[11px] text-ink/45">
                      （{f.note}）
                    </span>
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
          <p className="mt-4 text-right text-[11px] text-ink/45">
            出典はページ下部に記載しています。
          </p>
        </Container>
      </section>

      {/* 5. サービス: 体制の全体像 + 3つの特長 */}
      <section id="service" className="scroll-mt-28 py-20 md:py-28">
        <Container>
          <Heading en="Service">
            AIセキュリティの体制を、3つの層でつくります
          </Heading>
          <Reveal
            variant="up"
            className="mt-12 rounded-xl bg-[#FBF6F7] p-6 md:p-10"
          >
            <Pyramid />
          </Reveal>

          <div className="mt-20">
            <Heading en="Reason">
              <span className="text-brand-500">Bond AI</span>{" "}
              が選ばれる3つの理由
            </Heading>
          </div>
          <div className="mt-12 space-y-16 md:space-y-20">
            {features.map((f, i) => (
              <Reveal key={f.title} variant="up">
                <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
                  <div className={cn(i % 2 === 1 && "lg:order-2")}>
                    <p className="flex items-end gap-3 text-brand-500">
                      <span className="text-sm font-black tracking-[0.15em]">
                        REASON
                      </span>
                      <span className="font-display text-6xl font-black leading-none">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </p>
                    <h3 className="mt-4 text-[clamp(1.4rem,2.6vw,1.9rem)] font-bold leading-[1.5]">
                      {f.title}
                    </h3>
                    <p className="mt-4 text-[15px] leading-[2] text-ink/80">
                      {f.text}
                    </p>
                  </div>
                  <div className="relative px-2 sm:px-8">
                    <div
                      aria-hidden="true"
                      className={cn(
                        "absolute inset-y-6 -z-10 w-[85%] rounded-2xl bg-[#F7ECEF]",
                        i % 2 === 1 ? "left-0" : "right-0",
                      )}
                    />
                    <FeatureVisual kind={f.visual} />
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          {/* 毎月の支援内容 + 改善サイクル */}
          <Reveal
            variant="up"
            className="mt-20 grid overflow-hidden rounded-xl ring-1 ring-[#EEDFE3] lg:grid-cols-[1.5fr_1fr]"
          >
            <div className="bg-white p-6 md:p-9">
              <p className="flex flex-wrap items-baseline gap-x-3 text-xl font-bold">
                毎月の支援内容
                <span className="text-xs font-bold text-ink/50">
                  （社外CISOプランの例）
                </span>
              </p>
              <ul className="mt-6 grid gap-x-6 gap-y-3 sm:grid-cols-2">
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
            </div>
            <div className="grid place-items-center bg-[#FBF6F7] p-8">
              <Cycle />
            </div>
          </Reveal>
        </Container>
      </section>

      {/* 6. 料金プラン */}
      <section id="price" className="scroll-mt-28 bg-[#FBF6F7] py-20 md:py-28">
        <Container>
          <Heading en="Price" center>
            会社の規模と課題に合わせて選べます
          </Heading>
          <p className="mt-4 text-center text-sm text-ink/60">
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
                    "relative flex h-full flex-col rounded-xl bg-white",
                    p.recommended
                      ? "shadow-[0_30px_60px_-30px_rgba(122,30,53,0.5)] ring-2 ring-brand-500"
                      : "ring-1 ring-[#EEDFE3]",
                  )}
                >
                  {p.recommended ? (
                    <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-brand-500 px-4 py-1 text-xs font-bold text-white">
                      おすすめ
                    </span>
                  ) : null}
                  <div className="border-b border-[#EEDFE3] px-6 pb-6 pt-8 text-center">
                    <h3 className="text-lg font-black">{p.name}</h3>
                    <p className="mt-4 flex items-baseline justify-center gap-1 text-brand-500">
                      <span className="text-sm font-bold">月</span>
                      <span className="font-display text-5xl font-black leading-none">
                        {p.price}
                      </span>
                      <span className="text-lg font-bold">万円</span>
                    </p>
                    <p className="mt-4 text-sm font-bold leading-relaxed text-ink/80">
                      {p.target}
                    </p>
                    <p className="mt-1 text-xs font-bold text-ink/50">
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

          {/* 比較(横棒グラフ) */}
          <Reveal
            variant="up"
            className="mx-auto mt-16 max-w-4xl rounded-xl bg-white p-6 ring-1 ring-[#EEDFE3] md:p-9"
          >
            <p className="text-center text-lg font-bold md:text-xl">
              常勤のCISOを採用するより、<em>ずっと始めやすく</em>
            </p>
            <div className="mt-8 space-y-5">
              <div>
                <div className="flex flex-wrap items-baseline justify-between gap-2 text-sm font-bold">
                  <span className="text-ink/60">常勤のCISOを採用した場合</span>
                  <span className="text-ink/70">
                    年収1,000万円以上
                    <span className="ml-1 text-[11px] text-ink/45">（※5）</span>
                  </span>
                </div>
                <div className="mt-2 h-5 rounded-full bg-[#F1ECEE]">
                  <div className="h-5 w-full rounded-full bg-[#CFC6C9]" />
                </div>
              </div>
              <div>
                <div className="flex flex-wrap items-baseline justify-between gap-2 text-sm font-bold">
                  <span className="text-brand-600">Bond AI の社外CISO</span>
                  <span className="text-brand-600">年360万円（月30万円）</span>
                </div>
                <div className="mt-2 h-5 rounded-full bg-[#F1ECEE]">
                  <div className="h-5 w-[36%] rounded-full bg-[linear-gradient(90deg,#A83B57,#7A1E35)]" />
                </div>
              </div>
            </div>
            <div className="mt-8 rounded-lg bg-[#FBF6F7] p-5 text-sm leading-[1.9] text-ink/80">
              <p>
                稼働時間を超えた分は1時間3万円です。次のメニューは別途ご相談ください。
              </p>
              <ul className="mt-1">
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
      <section className="py-20 md:py-28">
        <Container>
          <Heading en="Expert">
            資格と実務経験を持つ専門家が、責任者としてつきます
          </Heading>
          <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:items-stretch">
            <Reveal
              variant="up"
              className="relative min-h-[18rem] overflow-hidden rounded-xl"
            >
              <Image
                src="/services/cards/talent.jpg"
                alt="専門家が経営層と打ち合わせをしている様子のイメージ"
                fill
                sizes="(max-width:1024px) 100vw, 45vw"
                className="object-cover"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-[linear-gradient(180deg,transparent_40%,rgba(40,10,18,0.75)_100%)]"
              />
              <p className="absolute inset-x-0 bottom-0 p-6 text-[15px] font-bold leading-[1.9] text-white md:p-7">
                調べる・書く・まとめる作業はAIで効率化し、専門家は「判断」と「説明」に集中します。だから、相場どおりの価格で、AIまで見る責任者を置けます。
              </p>
            </Reveal>
            <Reveal variant="up">
              <dl className="h-full overflow-hidden rounded-xl bg-white ring-1 ring-[#EEDFE3]">
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
          </div>
          <p className="mt-3 text-[11px] text-ink/45">※ 写真はイメージです</p>
        </Container>
      </section>

      {/* 8. 導入の流れ */}
      <section id="flow" className="scroll-mt-28 bg-[#FBF6F7] py-20 md:py-28">
        <Container>
          <Heading en="Flow" center>
            導入の流れ
          </Heading>
          <ol className="relative mx-auto mt-14 grid max-w-6xl gap-4 md:grid-cols-5">
            <span
              aria-hidden="true"
              className="absolute left-[10%] right-[10%] top-5 hidden h-0.5 bg-[linear-gradient(90deg,#E7C4CD,#7A1E35)] md:block"
            />
            {flow.map((f, i) => (
              <Reveal
                key={f.title}
                variant="up"
                delay={i * 90}
                className="h-full"
              >
                <li className="relative flex h-full flex-col items-center text-center">
                  <span className="relative grid h-10 w-10 place-items-center rounded-full bg-brand-500 text-sm font-black text-white ring-4 ring-[#FBF6F7]">
                    {i + 1}
                  </span>
                  <div className="mt-4 w-full flex-1 rounded-xl bg-white p-5 ring-1 ring-[#EEDFE3]">
                    {f.when ? (
                      <p className="text-[11px] font-bold text-brand-500">
                        {f.when}
                      </p>
                    ) : null}
                    <p className="mt-1 text-base font-bold leading-snug">
                      {f.title}
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-ink/70">
                      {f.text}
                    </p>
                  </div>
                </li>
              </Reveal>
            ))}
          </ol>
        </Container>
      </section>

      {/* 9. よくある質問 */}
      <section id="faq" className="scroll-mt-28 py-20 md:py-28">
        <Container>
          <Heading en="FAQ" center>
            よくある質問
          </Heading>
          <div className="mx-auto mt-10 max-w-3xl space-y-3">
            {faqs.map((f) => (
              <details
                key={f.q}
                className="group rounded-xl bg-white ring-1 ring-[#EEDFE3] open:shadow-[0_20px_40px_-32px_rgba(60,15,25,0.5)]"
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
                <div className="flex gap-4 border-t border-[#EEDFE3] px-5 py-5 md:px-6">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-brand-50 text-sm font-black text-brand-500">
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

      {/* 10. 申し込み */}
      <section
        id={FORM_ID}
        className="relative isolate scroll-mt-28 overflow-hidden bg-[linear-gradient(180deg,#FBF4F6,#F5E6EA)] py-20 md:py-28"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-32 -top-32 -z-10 h-96 w-96 rounded-full bg-white/70 blur-[90px]"
        />
        <Container className="grid gap-10 lg:grid-cols-[1fr_1.35fr] lg:gap-14">
          <div>
            <Heading en="Free check">
              まずは無料の
              <br />
              「AI利用チェック」から
            </Heading>
            <Reveal variant="up">
              <p className="mt-6 text-[15px] leading-[2] text-ink/80">
                オンライン30分。社内のAIの使い方、取引先から求められていること、今の体制を伺い、優先して手を打つべき点を専門家がお伝えします。売り込みはしません。
              </p>
              <ul className="mt-6 space-y-3">
                {[
                  { t: "オンライン30分・無料", i: "bell" },
                  { t: "専門家が気になる点を整理", i: "chart" },
                  { t: "売り込みはしません", i: "check" },
                ].map((x) => (
                  <li
                    key={x.t}
                    className="flex items-center gap-3 rounded-lg bg-white px-4 py-3 text-[15px] font-bold ring-1 ring-[#EEDFE3]"
                  >
                    <span className="grid h-8 w-8 place-items-center rounded-full bg-brand-50 text-brand-500">
                      <Icon name={x.i as "bell"} className="h-4 w-4" />
                    </span>
                    {x.t}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
          <Reveal
            variant="up"
            delay={120}
            className="rounded-xl bg-white p-6 shadow-[0_30px_60px_-40px_rgba(60,15,25,0.45)] md:p-9"
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
            <p>
              ※
              ページ内の画面はイメージです。数値は例示であり、実績を示すものではありません。
            </p>
          </div>
        </Container>
      </footer>
    </div>
  );
}
