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

const worries = [
  {
    title: "社内にセキュリティ対策の専門家がいない",
    text: "資格を持つ専門家が、月額で御社の担当につきます",
  },
  {
    title: "生成AIで情報が漏れないか不安",
    text: "入力してよい情報を決め、全社員に浸透させます",
  },
  {
    title: "上場審査で、責任者と体制を問われる",
    text: "社外CISOとして、審査で説明できる体制を整えます",
  },
  {
    title: "大手企業と取引したいが、審査が壁になる",
    text: "チェックシートの回答から取引先への説明まで引き受けます",
  },
  {
    title: "AI活用を進め、セキュリティが後回しに",
    text: "社内のAIを点検し、データの扱いと権限を整えます",
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

const facts = [
  {
    text: "「AIの利用をめぐるサイバーリスク」が、組織向けの10大脅威に初めて選ばれ、3位に。",
    note: "※1",
  },
  {
    text: "取引先のセキュリティを★で評価する国の制度（SCS評価制度）の申請受付が始まる予定。",
    note: "※2",
  },
  {
    text: "発注側の大企業のうち、取引先のセキュリティを確認している割合。",
    note: "※3",
  },
  {
    text: "2025年のランサムウェア被害のうち、中小企業が占めた割合。",
    note: "※4",
  },
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
              <span className="text-brand-500">AI時代</span>に必須な
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
                label="資料ダウンロード"
                sub="こちらから無料"
                icon="doc"
                href="#check"
              />
            </div>
          </div>
          <div className="lg:-mr-10 xl:-mr-24">
            <HeroVisual />
          </div>
        </Container>
      </section>

      {/* ========== 3. お悩み + 解決(濃色の帯) ========== */}
      <section className="relative isolate overflow-hidden pt-16 md:pt-24">
        {/* 下半分: 写真 + 濃い色の斜めの帯 */}
        <div className="absolute inset-x-0 bottom-0 top-[21rem] -z-10 [clip-path:polygon(0_8%,100%_0,100%_100%,0_100%)] md:top-[24rem]">
          <Image
            src="/services/cards/ai-solutions.jpg"
            alt=""
            fill
            sizes="100vw"
            className="object-cover"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[linear-gradient(120deg,rgba(28,30,42,0.94)_0%,rgba(28,30,42,0.86)_55%,rgba(60,24,38,0.82)_100%)]"
          />
        </div>
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
          <ul className="mx-auto mt-14 grid max-w-6xl gap-x-3 gap-y-10 sm:grid-cols-2 lg:grid-cols-5">
            {worries.map((w, i) => (
              <Reveal
                key={w.title}
                variant="up"
                delay={i * 70}
                className="h-full"
              >
                <li className="relative flex h-full flex-col overflow-hidden rounded-md bg-white text-center shadow-[0_16px_34px_-20px_rgba(0,0,0,0.5)] ring-1 ring-[#EEE5E8]">
                  {/* お悩み */}
                  <div className="relative flex flex-1 flex-col items-center bg-[#F4EEF0] px-4 pb-7 pt-5">
                    <span className="grid h-12 w-12 place-items-center rounded-full bg-[#3A3442] text-white">
                      <span className="leading-none">
                        <span className="block text-[9px] font-bold">
                          お悩み
                        </span>
                        <span className="block text-xl font-black">
                          {i + 1}
                        </span>
                      </span>
                    </span>
                    <p className="mt-4 flex flex-1 items-center text-[15px] font-black leading-[1.6] [word-break:auto-phrase]">
                      {w.title}
                    </p>
                    <span
                      aria-hidden="true"
                      className="absolute -bottom-3 left-1/2 h-0 w-0 -translate-x-1/2 border-x-[14px] border-t-[12px] border-x-transparent border-t-[#F4EEF0]"
                    />
                  </div>
                  {/* 解決 */}
                  <div className="flex flex-1 flex-col items-center px-4 pb-6 pt-7">
                    <span className="inline-flex items-center gap-1 bg-brand-500 px-2.5 py-1 text-[11px] font-bold text-white">
                      <Icon name="shield" className="h-3.5 w-3.5" />
                      Bond AI なら
                    </span>
                    <p className="mt-3 text-sm font-bold leading-[1.75] text-brand-600 [word-break:auto-phrase]">
                      {w.text}
                    </p>
                  </div>
                </li>
              </Reveal>
            ))}
          </ul>

          {/* 解決: 円形の図 + コピー */}
          <div className="grid items-center gap-12 py-16 text-white md:py-24 lg:grid-cols-2">
            <Reveal variant="scale">
              <div className="relative mx-auto aspect-square w-full max-w-[420px]">
                <div
                  aria-hidden="true"
                  className="absolute inset-[13%] rounded-full border-2 border-dotted border-white/50"
                />
                <div className="absolute left-1/2 top-1/2 grid h-[36%] w-[36%] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full text-center">
                  <div>
                    <span className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-white text-brand-500 md:h-20 md:w-20">
                      <Icon name="shield" className="h-9 w-9 md:h-11 md:w-11" />
                    </span>
                    <p className="mt-2 text-lg font-black tracking-[0.04em] md:text-xl">
                      Bond AI
                    </p>
                  </div>
                </div>
                {roles.map((d, i) => {
                  const a = ((-90 + (360 / roles.length) * i) * Math.PI) / 180;
                  return (
                    <span
                      key={d}
                      className="absolute grid h-[22%] w-[22%] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-white/70 bg-[#1C1E2A]/80 px-1 text-center text-[10px] font-bold leading-tight text-white md:text-[11px]"
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
              <p className="text-xl font-bold">Bond AI は</p>
              <p className="mt-3 text-[clamp(1.6rem,3.2vw,2.4rem)] font-black leading-[1.5] [word-break:auto-phrase]">
                社外の責任者として、AIを安全に使える体制を月額でつくる
              </p>
              <p className="mt-3 text-xl font-bold">ことで課題を解決できます</p>
              <span
                aria-hidden="true"
                className="mt-7 block h-0.5 w-14 bg-white"
              />
              <p className="mt-7 text-[15px] leading-[2] text-white/85">
                AIの利用ルール、導入前のチェック、取引先への回答、社員への説明、事故の初動まで。社内に専任者がいなくても、責任の所在がはっきりした体制をつくります。
              </p>
            </Reveal>
          </div>
        </Container>

        {/* 2分割のCTA帯 */}
        <SplitCta />
      </section>

      {/* ========== 4. なぜ今か ========== */}
      <section className="relative isolate overflow-hidden py-20 md:py-28">
        <Watermark className="-left-4 top-4">Why now</Watermark>
        <Container>
          <SectionHead en="Why now">
            AIの広がりに、守りと説明が追いついていません
          </SectionHead>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { big: "3", unit: "位", chart: <RankChart />, i: 0 },
              { big: "2027", unit: "年3月", chart: <TimelineChart />, i: 1 },
              {
                big: "84.4",
                unit: "%",
                chart: (
                  <Donut
                    value={84.4}
                    label="取引先のセキュリティを確認している大企業の割合"
                  />
                ),
                i: 2,
              },
              {
                big: "63.3",
                unit: "%",
                chart: (
                  <Donut
                    value={63.3}
                    label="ランサムウェア被害のうち中小企業の割合"
                  />
                ),
                i: 3,
              },
            ].map((f) => (
              <Reveal
                key={f.big}
                variant="up"
                delay={f.i * 80}
                className="h-full"
              >
                <article className="flex h-full flex-col rounded-md bg-white p-6 shadow-[0_18px_40px_-28px_rgba(0,0,0,0.45)] ring-1 ring-[#EEE5E8]">
                  <p className="font-black leading-none text-brand-500">
                    <span className="text-[2.6rem]">{f.big}</span>
                    <span className="ml-1 text-lg">{f.unit}</span>
                  </p>
                  <div className="my-5 grid h-28 place-items-center rounded bg-[#FBF6F7]">
                    {f.chart}
                  </div>
                  <p className="text-sm leading-[1.85] text-ink/80">
                    {facts[f.i].text}
                    <span className="ml-1 text-[11px] text-ink/45">
                      （{facts[f.i].note}）
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

      {/* ========== 5. サービス(製品紹介風) ========== */}
      <section
        id="service"
        className="relative isolate scroll-mt-28 overflow-hidden bg-[#FBF6F7] py-20 md:py-28"
      >
        <Watermark className="-right-6 top-4">Service</Watermark>
        <Container>
          <SectionHead en="Service">
            AIセキュリティの体制を、
            <span className="text-brand-500">3つの層</span>でつくります
          </SectionHead>
          <p className="mt-6 max-w-3xl text-[15px] leading-[2] text-ink/80">
            経営が責任者を決め、管理の仕組みを整え、現場に浸透させる。Bond AI
            はこの3つの層をまとめて引き受け、取引先や監査に説明できる体制をつくります。
          </p>
          <div className="mt-12 space-y-16 md:space-y-20">
            {features.map((f, i) => (
              <Reveal key={f.title} variant="up">
                <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
                  <div className={cn(i % 2 === 1 && "lg:order-2")}>
                    <p className="flex items-center gap-3">
                      <span className="grid h-10 w-10 place-items-center rounded-lg bg-brand-500 text-white">
                        <Icon
                          name={(["doc", "chart", "check"] as const)[i]}
                          className="h-5 w-5"
                        />
                      </span>
                      <span className="leading-tight">
                        <span className="block text-xl font-black tracking-[0.04em] text-ink">
                          Bond AI
                        </span>
                        <span className="block text-[11px] font-bold tracking-[0.2em] text-brand-500">
                          {
                            (["RULE", "DIAGNOSIS", "ACCOUNTABILITY"] as const)[
                              i
                            ]
                          }
                        </span>
                      </span>
                    </p>
                    <h3 className="mt-6 text-[clamp(1.45rem,2.6vw,2rem)] font-black leading-[1.5]">
                      {f.title}
                    </h3>
                    <p className="mt-4 text-[15px] leading-[2] text-ink/80">
                      {f.text}
                    </p>
                    <a
                      href={`#${FORM_ID}`}
                      className="mt-6 inline-flex items-center gap-3 text-sm font-bold text-ink"
                    >
                      <span className="grid h-8 w-8 place-items-center rounded-full border border-brand-500 text-brand-500">
                        →
                      </span>
                      無料で相談する
                    </a>
                  </div>
                  <div
                    className={cn(
                      "lg:-mx-6",
                      i % 2 === 1 ? "lg:-ml-16" : "lg:-mr-16",
                    )}
                  >
                    <FeatureVisual kind={f.visual} />
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          {/* 3層の図 + 毎月の支援内容 */}
          <div className="mt-20 grid gap-6">
            <div className="rounded-md bg-white p-6 shadow-[0_18px_40px_-30px_rgba(0,0,0,0.45)] md:p-8">
              <Pyramid />
            </div>
            <div className="overflow-hidden rounded-md bg-white shadow-[0_18px_40px_-30px_rgba(0,0,0,0.45)]">
              <p className="flex flex-wrap items-baseline justify-between gap-2 bg-brand-500 px-6 py-4 text-white">
                <span className="text-lg font-black">毎月の支援内容</span>
                <span className="text-xs font-bold text-white/80">
                  社外CISOプランの例
                </span>
              </p>
              <ul className="grid gap-x-6 gap-y-3 p-6 sm:grid-cols-2">
                {monthly.map((m) => (
                  <li key={m} className="flex gap-2.5 text-sm leading-relaxed">
                    <Check />
                    {m}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>

      {/* ========== 6. 選ばれる理由(POINT) ========== */}
      <section className="relative isolate overflow-hidden py-20 md:py-28">
        <Watermark className="-left-4 top-4">Reason</Watermark>
        <Container>
          <SectionHead en="Reason">Bond AI が選ばれる3つの理由</SectionHead>
          <div className="mt-12 space-y-6">
            {[
              {
                lead: "AIを禁止せず、",
                em: "安全に使えるルール",
                text: "入力してよい情報・ダメな情報、使ってよいツール、導入時の承認の流れまで。禁止ではなく、社員が安心して使える状態をつくります。",
                Visual: IconBanned,
              },
              {
                lead: "契約後すぐに、",
                em: "診断から始める",
                text: "最初の1〜2カ月でAIの利用状況と弱点を見える化。年1回の脆弱性診断もプランに含め、結果は専門家が分かりやすく説明します。",
                Visual: IconShadowAi,
              },
              {
                lead: "取引先に、",
                em: "責任者として名前を出せる",
                text: "チェックシートの回答から社外CISOとしての名前の掲載まで。「専門家が責任者としてついています」と取引先に言える状態をつくります。",
                Visual: IconChecksheet,
              },
            ].map((r, i) => (
              <Reveal key={r.em} variant="up">
                <article className="relative grid overflow-hidden rounded-md bg-white shadow-[0_20px_44px_-30px_rgba(0,0,0,0.45)] ring-1 ring-[#EEE5E8] md:grid-cols-[20rem_1fr]">
                  <div className="grid place-items-center bg-[#F7EAEE] p-8">
                    <r.Visual className="h-36 w-auto md:h-44" />
                  </div>
                  <div className="relative p-7 md:p-10">
                    <p className="absolute right-6 top-5 text-right font-black leading-none text-brand-500 md:right-10">
                      <span className="block text-sm tracking-[0.12em] md:text-lg">
                        POINT
                      </span>
                      <span className="block text-5xl md:text-7xl">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </p>
                    <h3 className="pr-24 text-[clamp(1.3rem,2.4vw,1.75rem)] font-black leading-[1.5] md:pr-32">
                      {r.lead}
                      <br />
                      <span className="text-brand-500">{r.em}</span>
                    </h3>
                    <p className="mt-4 text-[15px] leading-[2] text-ink/80">
                      {r.text}
                    </p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* ========== 7. 料金 ========== */}
      <section
        id="price"
        className="relative isolate scroll-mt-28 overflow-hidden bg-[#FBF6F7] py-20 md:py-28"
      >
        <Watermark className="-right-6 top-4">Price</Watermark>
        <Container>
          <SectionHead en="Price">
            会社の規模と課題に合わせて選べます
          </SectionHead>
          <p className="mt-4 text-sm text-ink/60">
            （税別・月額。最低契約期間は6カ月）
          </p>
          <div className="mt-12 grid items-stretch gap-6 lg:grid-cols-3">
            {plans.map((p) => (
              <article
                key={p.name}
                className={cn(
                  "relative flex flex-col overflow-hidden rounded-md bg-white",
                  p.recommended
                    ? "shadow-[0_30px_60px_-30px_rgba(122,30,53,0.55)] ring-2 ring-brand-500"
                    : "shadow-[0_18px_40px_-30px_rgba(0,0,0,0.4)] ring-1 ring-[#EEE5E8]",
                )}
              >
                <div
                  className={cn(
                    "px-6 py-5",
                    p.recommended ? "bg-brand-500 text-white" : "bg-[#F4EEF0]",
                  )}
                >
                  {p.recommended ? (
                    <p className="text-xs font-bold text-white/85">おすすめ</p>
                  ) : null}
                  <h3 className="text-lg font-black">{p.name}</h3>
                </div>
                <div className="border-b border-[#EEE5E8] px-6 py-6">
                  <p className="flex items-baseline gap-1">
                    <span className="text-sm font-bold">月</span>
                    <span className="text-5xl font-black leading-none text-brand-500">
                      {p.price}
                    </span>
                    <span className="text-lg font-bold">万円</span>
                    <span className="ml-1 text-xs text-ink/45">（税別）</span>
                  </p>
                  <p className="mt-3 text-sm font-bold leading-relaxed">
                    {p.target}
                  </p>
                  <p className="mt-0.5 text-xs text-ink/55">（{p.size}）</p>
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
              </article>
            ))}
          </div>

          <div className="mx-auto mt-14 max-w-4xl rounded-md bg-white p-6 shadow-[0_18px_40px_-30px_rgba(0,0,0,0.4)] md:p-9">
            <p className="text-center text-lg font-black md:text-xl">
              常勤のCISOを採用するより、
              <span className="text-brand-500">ずっと始めやすく</span>
            </p>
            <div className="mt-7 space-y-5">
              <div>
                <div className="flex flex-wrap items-baseline justify-between gap-2 text-sm font-bold">
                  <span className="text-ink/60">常勤のCISOを採用した場合</span>
                  <span className="text-ink/70">
                    年収1,000万円以上
                    <span className="ml-1 text-[11px] text-ink/45">（※5）</span>
                  </span>
                </div>
                <div className="mt-2 h-5 rounded-full bg-[#CFC6C9]" />
              </div>
              <div>
                <div className="flex flex-wrap items-baseline justify-between gap-2 text-sm font-bold">
                  <span className="text-brand-600">Bond AI の社外CISO</span>
                  <span className="text-brand-600">年360万円（月30万円）</span>
                </div>
                <div className="mt-2 h-5 rounded-full bg-[#F1ECEE]">
                  <div className="h-5 w-[36%] rounded-full bg-brand-500" />
                </div>
              </div>
            </div>
            <div className="mt-7 rounded bg-[#FBF6F7] p-5 text-sm leading-[1.9] text-ink/80">
              <p>
                稼働時間を超えた分は1時間3万円です。次のメニューは別途ご相談ください。
              </p>
              <p>
                ・半日・1日の社員研修、なりすましメール訓練、事故対応の机上演習
              </p>
              <p>・ISO/IEC 42001（AIの国際認証）の取得支援</p>
            </div>
          </div>
        </Container>
      </section>

      {/* ========== 8. 担当する専門家 ========== */}
      <section className="relative isolate overflow-hidden py-20 md:py-28">
        <Watermark className="-left-4 top-4">Expert</Watermark>
        <Container>
          <SectionHead en="Expert">
            資格と実務経験を持つ専門家が、責任者としてつきます
          </SectionHead>
          <div className="mt-12 grid gap-8 lg:grid-cols-[1fr_1.25fr] lg:items-stretch">
            <div className="relative min-h-[18rem] overflow-hidden rounded-md">
              <Image
                src="/services/cards/talent.jpg"
                alt="専門家が経営層と打ち合わせをしている様子(イメージ)"
                fill
                sizes="(max-width:1024px) 100vw, 45vw"
                className="object-cover"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-[linear-gradient(180deg,transparent_45%,rgba(20,20,28,0.8)_100%)]"
              />
              <p className="absolute inset-x-0 bottom-0 p-6 text-[15px] font-bold leading-[1.9] text-white">
                調べる・書く・まとめる作業はAIで効率化し、専門家は「判断」と「説明」に集中します。だから、相場どおりの価格で、AIまで見る責任者を置けます。
              </p>
            </div>
            <dl className="overflow-hidden rounded-md bg-white shadow-[0_18px_40px_-30px_rgba(0,0,0,0.4)] ring-1 ring-[#EEE5E8]">
              {expert.map((e, i) => (
                <div
                  key={e.label}
                  className={cn(
                    "grid gap-3 p-6 md:grid-cols-[9rem_1fr] md:p-7",
                    i > 0 && "border-t border-[#EEE5E8]",
                  )}
                >
                  <dt className="flex items-center gap-2 text-sm font-black text-brand-600">
                    <span aria-hidden="true" className="h-4 w-1 bg-brand-500" />
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
                            className="rounded bg-[#F4EEF0] px-2.5 py-1 text-[13px] font-bold text-brand-600"
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
          </div>
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
          <SectionHead en="Contact">
            資料ダウンロード・無料のAI利用チェック
          </SectionHead>
          <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_1.6fr] lg:gap-14">
            <div>
              <dl className="space-y-6 text-[15px] leading-[1.9] text-ink/80">
                <div>
                  <dt className="font-black text-ink">資料請求</dt>
                  <dd className="mt-1">
                    サービスの内容・料金・導入の流れをまとめた資料を、メールでお送りします。
                  </dd>
                </div>
                <div>
                  <dt className="font-black text-ink">無料のAI利用チェック</dt>
                  <dd className="mt-1">
                    オンライン30分。社内のAIの使い方、取引先から求められていること、今の体制を伺い、優先して手を打つべき点を専門家がお伝えします。売り込みはしません。
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
            <p className="font-bold text-white/70">出典</p>
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

/** 2分割のCTA帯 */
function SplitCta() {
  return (
    <div className="grid md:grid-cols-2">
      <div className="flex flex-col items-center gap-4 bg-[#5A1528] px-6 py-10 text-white">
        <p className="text-sm font-bold">まずは現状を相談したい方は</p>
        <BigButton
          label="無料のAI利用チェック"
          sub="オンライン30分・売り込みなし"
          icon="check"
          tone="accent"
        />
      </div>
      <div className="flex flex-col items-center gap-4 bg-brand-500 px-6 py-10 text-white">
        <p className="text-sm font-bold">料金とプランを確かめたい方は</p>
        <BigButton
          label="料金プランを見る"
          sub="月額8万円から"
          icon="doc"
          href="#price"
          tone="white"
        />
      </div>
    </div>
  );
}

/** 大きな英字 + 日本語(横並び) + 左だけ色の付いた線 */
function SectionHead({ en, children }: { en: string; children: ReactNode }) {
  return (
    <Reveal variant="up">
      <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:gap-5">
        <p className="text-[clamp(2.4rem,5.6vw,3.8rem)] font-black uppercase leading-none tracking-[0.02em] text-brand-500">
          {en}
        </p>
        <h2 className="pb-1 text-lg font-bold tracking-[0.04em] text-ink [word-break:auto-phrase] md:text-xl">
          {children}
        </h2>
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
