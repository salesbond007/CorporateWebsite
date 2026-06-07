import type { Metadata } from "next";
import type { ReactNode } from "react";
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

const SERVICE_SLUG = "keyman-bond";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const metadata: Metadata = {
  title:
    "キーマンボンド｜プロ人材/顧問マッチングサービス｜経営課題をその道のプロと解決",
  description:
    "キーマンボンドは、経営層・CxO・エキスパートクラスのプロ人材を、課題に応じてアドバイザー/顧問として提案するプロ人材/顧問マッチングサービス。新規事業・マーケ・DX・人事・財務・海外展開まで、実働型で経営課題の解決に伴走します。",
};

function ServiceOverviewDiagram() {
  return (
    <div className="relative">
      <div className="grid items-center gap-10 md:grid-cols-[1fr_auto_1fr] md:gap-6 lg:gap-10">
        {/* Left: 企業 */}
        <div className="flex flex-col items-center">
          <p className="text-base md:text-lg font-bold text-ink">企業</p>
          <svg
            viewBox="0 0 240 180"
            className="mt-4 h-auto w-full max-w-[260px]"
            role="img"
            aria-label="経営課題を抱える企業のイラスト"
          >
            <g stroke="#1F2937" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round">
              {/* baseline */}
              <line x1="6" y1="170" x2="234" y2="170" />
              {/* left building */}
              <rect x="20" y="100" width="44" height="70" />
              <path d="M28 110h6M40 110h6M52 110h6M28 122h6M40 122h6M52 122h6M28 134h6M40 134h6M52 134h6M28 146h6M40 146h6M52 146h6M28 158h6M40 158h6M52 158h6" />
              {/* highlight (center) building - filled rose */}
            </g>
            <g>
              <rect x="76" y="46" width="56" height="124" fill="#BE123C" stroke="#9F1239" strokeWidth="1.6" />
              <g stroke="#FFFFFF" strokeWidth="1.2" strokeLinecap="round">
                <path d="M84 60h6M96 60h6M108 60h6M120 60h6M84 74h6M96 74h6M108 74h6M120 74h6M84 88h6M96 88h6M108 88h6M120 88h6M84 102h6M96 102h6M108 102h6M120 102h6M84 116h6M96 116h6M108 116h6M120 116h6M84 130h6M96 130h6M108 130h6M120 130h6M84 144h6M96 144h6M108 144h6M120 144h6M84 158h6M96 158h6M108 158h6M120 158h6" />
              </g>
            </g>
            <g stroke="#1F2937" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round">
              {/* right tall building */}
              <rect x="142" y="76" width="38" height="94" />
              <path d="M148 88h4M158 88h4M168 88h4M148 100h4M158 100h4M168 100h4M148 112h4M158 112h4M168 112h4M148 124h4M158 124h4M168 124h4M148 136h4M158 136h4M168 136h4M148 148h4M158 148h4M168 148h4M148 160h4M158 160h4M168 160h4" />
              {/* far right small */}
              <rect x="190" y="118" width="32" height="52" />
              <path d="M196 128h4M206 128h4M214 128h4M196 140h4M206 140h4M214 140h4M196 152h4M206 152h4M214 152h4M196 164h4M206 164h4M214 164h4" />
            </g>
          </svg>
        </div>

        {/* Middle: arrows */}
        <div className="flex w-full flex-col items-center gap-3 md:w-[180px] lg:w-[220px]">
          {/* contract arrow → */}
          <div className="flex w-full items-center gap-3">
            <span className="font-display text-sm font-extrabold text-rose-700 md:text-base">契約</span>
            <span className="relative flex h-[2px] flex-1 items-center bg-rose-700">
              <span
                aria-hidden="true"
                className="absolute right-[-1px] -top-[7px] h-0 w-0"
                style={{
                  borderTop: "8px solid transparent",
                  borderBottom: "8px solid transparent",
                  borderLeft: "14px solid #BE123C",
                }}
              />
            </span>
          </div>
          {/* support arrow ← */}
          <div className="flex w-full items-center gap-3">
            <span className="relative flex h-[2px] flex-1 items-center bg-rose-700">
              <span
                aria-hidden="true"
                className="absolute left-[-1px] -top-[7px] h-0 w-0"
                style={{
                  borderTop: "8px solid transparent",
                  borderBottom: "8px solid transparent",
                  borderRight: "14px solid #BE123C",
                }}
              />
            </span>
            <span className="font-display text-sm font-extrabold text-rose-700 md:text-base">支援</span>
          </div>
        </div>

        {/* Right: Sales Bond platform */}
        <div className="flex flex-col items-center">
          <p className="font-display text-lg md:text-2xl font-black text-rose-700 tracking-tight">
            <span className="relative inline-block">
              Sales
              <span aria-hidden="true" className="absolute inset-x-0 -bottom-0.5 h-1 bg-rose-700/20" />
            </span>
            <span className="ml-1.5">Bond</span>
          </p>
          <svg
            viewBox="0 0 260 180"
            className="mt-4 h-auto w-full max-w-[280px]"
            role="img"
            aria-label="プラットフォームで適切なプロ人材/顧問を選定する図"
          >
            <g stroke="#1F2937" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round">
              {/* baseline */}
              <line x1="6" y1="160" x2="254" y2="160" />
              {/* left person */}
              <circle cx="50" cy="68" r="14" />
              <path d="M30 132c0-12 9-22 20-22s20 10 20 22" />
              {/* right person */}
              <circle cx="210" cy="68" r="14" />
              <path d="M190 132c0-12 9-22 20-22s20 10 20 22" />
              {/* back-center person (smaller) */}
              <circle cx="130" cy="58" r="11" />
              <path d="M114 110c0-9 7-16 16-16s16 7 16 16" />
            </g>

            {/* highlighted person (foreground) with magnifier */}
            <g>
              <circle cx="130" cy="100" r="20" fill="#FFFFFF" stroke="#BE123C" strokeWidth="2" />
              <circle cx="130" cy="100" r="6" fill="#BE123C" />
              <path d="M115 138c0-9 7-16 15-16s15 7 15 16" stroke="#BE123C" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            </g>
            <g stroke="#BE123C" strokeWidth="3" fill="none" strokeLinecap="round">
              <circle cx="160" cy="92" r="22" />
              <line x1="178" y1="110" x2="194" y2="126" />
            </g>
          </svg>
          <p className="mt-4 text-xs md:text-sm font-bold text-ink-soft">
            適切なプロ人材／顧問を選定
          </p>
        </div>
      </div>
    </div>
  );
}

type FeatureKind = "flexible" | "multi-domain" | "phase-fit";

function FeatureDiagram({ kind }: { kind: FeatureKind }) {
  if (kind === "flexible") {
    return (
      <svg
        viewBox="0 0 280 110"
        className="h-auto w-full max-w-[260px]"
        role="img"
        aria-label="スポット・プロジェクト・伴走の3モードを柔軟に組み合わせる図"
      >
        <text x="140" y="14" textAnchor="middle" fontSize="9.5" fontWeight="700" fill="#9F1239">
          貴社の状況に応じて選択
        </text>

        {/* SPOT */}
        <rect x="14" y="30" width="74" height="46" rx="8" fill="#FFE4E6" stroke="#BE123C" strokeWidth="1.4" />
        <text x="51" y="46" textAnchor="middle" fontSize="8.5" fontWeight="800" fill="#BE123C" letterSpacing="1">SPOT</text>
        <text x="51" y="61" textAnchor="middle" fontSize="11" fontWeight="900" fill="#9F1239">スポット</text>
        <text x="51" y="71" textAnchor="middle" fontSize="8" fontWeight="700" fill="#9F1239">単発相談</text>

        {/* PROJECT */}
        <rect x="103" y="30" width="74" height="46" rx="8" fill="#FECDD3" stroke="#BE123C" strokeWidth="1.4" />
        <text x="140" y="46" textAnchor="middle" fontSize="8.5" fontWeight="800" fill="#BE123C" letterSpacing="1">PROJECT</text>
        <text x="140" y="61" textAnchor="middle" fontSize="11" fontWeight="900" fill="#9F1239">プロジェクト</text>
        <text x="140" y="71" textAnchor="middle" fontSize="8" fontWeight="700" fill="#9F1239">期間限定</text>

        {/* EMBED */}
        <rect x="192" y="30" width="74" height="46" rx="8" fill="#BE123C" />
        <text x="229" y="46" textAnchor="middle" fontSize="8.5" fontWeight="800" fill="#FECDD3" letterSpacing="1">EMBED</text>
        <text x="229" y="61" textAnchor="middle" fontSize="11" fontWeight="900" fill="#FFFFFF">伴走支援</text>
        <text x="229" y="71" textAnchor="middle" fontSize="8" fontWeight="700" fill="#FECDD3">継続実働</text>

        {/* connector */}
        <path d="M22 92 Q140 102 258 92" stroke="#FDA4AF" strokeWidth="1.6" fill="none" strokeDasharray="3 3" />
        <text x="140" y="105" textAnchor="middle" fontSize="9" fontWeight="800" fill="#9F1239">
          柔軟に組み合わせ可能
        </text>
      </svg>
    );
  }

  if (kind === "multi-domain") {
    const labels = ["経営", "マーケ", "DX", "人事", "財務", "営業"];
    return (
      <svg
        viewBox="0 0 220 160"
        className="h-auto w-full max-w-[240px]"
        role="img"
        aria-label="プロ人材がカバーする多領域のハブ&スポーク図"
      >
        {labels.map((label, i) => {
          const angle = ((i / labels.length) * Math.PI * 2) - Math.PI / 2;
          const x = 110 + 62 * Math.cos(angle);
          const y = 80 + 56 * Math.sin(angle);
          return (
            <g key={label}>
              <line x1="110" y1="80" x2={x} y2={y} stroke="#FCA5A5" strokeWidth="1" strokeDasharray="3 3" />
              <circle cx={x} cy={y} r="16" fill="#FFFFFF" stroke="#BE123C" strokeWidth="1.6" />
              <text x={x} y={y + 3.5} textAnchor="middle" fontSize="9.5" fontWeight="800" fill="#9F1239">
                {label}
              </text>
            </g>
          );
        })}
        <circle cx="110" cy="80" r="26" fill="#BE123C" />
        <circle cx="110" cy="80" r="33" fill="none" stroke="#BE123C" strokeWidth="1" opacity="0.3" />
        <text x="110" y="78" textAnchor="middle" fontSize="9" fontWeight="800" fill="#FECDD3">EXPERT</text>
        <text x="110" y="90" textAnchor="middle" fontSize="11" fontWeight="900" fill="#FFFFFF">Pro</text>
      </svg>
    );
  }

  // phase-fit
  return (
    <svg
      viewBox="0 0 280 150"
      className="h-auto w-full max-w-[260px]"
      role="img"
      aria-label="事業フェーズごとに最適なプロ人材を配置する成長曲線"
    >
      {/* baseline */}
      <line x1="10" y1="125" x2="270" y2="125" stroke="#E5E7EB" strokeWidth="1" />
      <line x1="10" y1="125" x2="10" y2="15" stroke="#E5E7EB" strokeWidth="1" />
      {/* growth curve */}
      <path
        d="M14 120 C 60 118 80 100 110 80 C 140 60 170 50 200 35 C 220 25 250 18 268 15"
        stroke="#BE123C"
        strokeWidth="2.4"
        fill="none"
        strokeLinecap="round"
      />
      {/* curve glow */}
      <path
        d="M14 120 C 60 118 80 100 110 80 C 140 60 170 50 200 35 C 220 25 250 18 268 15"
        stroke="#BE123C"
        strokeWidth="6"
        fill="none"
        strokeLinecap="round"
        opacity="0.12"
      />
      {/* waypoints */}
      {[
        { x: 56, y: 115, label: "シード", role: "CxO候補" },
        { x: 142, y: 70, label: "拡大期", role: "事業責任者" },
        { x: 230, y: 25, label: "上場準備", role: "顧問" },
      ].map((w) => (
        <g key={w.label}>
          <circle cx={w.x} cy={w.y} r="13" fill="none" stroke="#BE123C" strokeWidth="1" opacity="0.35" />
          <circle cx={w.x} cy={w.y} r="6" fill="#BE123C" />
          <circle cx={w.x} cy={w.y} r="2.4" fill="#FFFFFF" />
          <text x={w.x} y={144} textAnchor="middle" fontSize="9.5" fontWeight="800" fill="#9F1239">
            {w.label}
          </text>
          <text x={w.x} y={w.y - 18} textAnchor="middle" fontSize="8.5" fontWeight="700" fill="#6B7280">
            {w.role}
          </text>
        </g>
      ))}
    </svg>
  );
}

type ContractStep = {
  num: string;
  title: string;
  body: string;
  isFree?: boolean;
  icon: "chat" | "register" | "task" | "introduce" | "launch";
};

const contractSteps: ContractStep[] = [
  {
    num: "01",
    title: "ご相談",
    body: "貴社の状況・解決したい課題をお気軽にご相談ください。",
    icon: "chat",
  },
  {
    num: "02",
    title: "プラットフォームへの登録",
    body: "弊社マッチングプラットフォームへご登録いただきます。",
    isFree: true,
    icon: "register",
  },
  {
    num: "03",
    title: "経営課題の登録",
    body: "解決したい経営課題を登録。マッチング精度を高めます。",
    isFree: true,
    icon: "task",
  },
  {
    num: "04",
    title: "プロ人材のご紹介",
    body: "弊社エージェントが、課題に適したプロ人材をご紹介します。",
    icon: "introduce",
  },
  {
    num: "05",
    title: "面談後、実働開始",
    body: "面談・合意のうえ、プロ人材が現場に入り実働を開始します。",
    icon: "launch",
  },
];

function ContractStepIcon({ kind }: { kind: ContractStep["icon"] }) {
  const c = {
    viewBox: "0 0 32 32",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.7,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
    className: "h-9 w-9",
  };
  switch (kind) {
    case "chat":
      return (
        <svg {...c}>
          <path d="M5 7h22v14H13l-5 5v-5H5z" />
          <circle cx="12" cy="14" r="1" fill="currentColor" />
          <circle cx="16" cy="14" r="1" fill="currentColor" />
          <circle cx="20" cy="14" r="1" fill="currentColor" />
        </svg>
      );
    case "register":
      return (
        <svg {...c}>
          <circle cx="13" cy="12" r="4" />
          <path d="M5 26c0-4 3.6-7 8-7 1.6 0 3 .4 4.2 1.1" />
          <path d="M21 22h6M24 19v6" />
        </svg>
      );
    case "task":
      return (
        <svg {...c}>
          <rect x="7" y="6" width="18" height="22" rx="2" />
          <path d="M11 4h10v4H11z" />
          <path d="M11 14h10M11 18h10M11 22h6" />
          <path d="M9 11l1.2 1.2L13 9.5" />
        </svg>
      );
    case "introduce":
      return (
        <svg {...c}>
          <circle cx="9" cy="11" r="3.2" />
          <circle cx="23" cy="11" r="3.2" />
          <path d="M4 24c0-3.2 2.4-5.4 5.5-5.4 1.2 0 2.3.3 3.2.9" />
          <path d="M28 24c0-3.2-2.4-5.4-5.5-5.4-1.2 0-2.3.3-3.2.9" />
          <path d="M13 21l3-3 3 3" />
          <path d="M16 18v8" />
        </svg>
      );
    case "launch":
      return (
        <svg {...c}>
          <path d="M11 21c-3 0-5-2-5-5 2 0 4 1 5 3" />
          <path d="M14 22c5-2 9-6 11-13l-3-3c-7 2-11 6-13 11l5 5z" />
          <circle cx="20" cy="12" r="2" />
          <path d="M8 26l3-3" />
        </svg>
      );
  }
}

type SolutionIcon =
  | "rocket"
  | "megaphone"
  | "hr"
  | "code"
  | "succession"
  | "sales"
  | "finance"
  | "globe"
  | "law";

type Solution = {
  title: string;
  body: string;
  icon: SolutionIcon;
  tags: string[];
};

const solutions: Solution[] = [
  {
    title: "新規事業開発",
    body: "立ち上げから事業化まで、実績を持つ専門家が実働型で支援します。",
    icon: "rocket",
    tags: ["競合/市場調査", "アイデア創出", "推進スピードUP"],
  },
  {
    title: "マーケティング",
    body: "戦略策定からブランディング・PR・実行まで、専門家が伴走します。",
    icon: "megaphone",
    tags: ["広告運用", "PR", "戦略設計", "WEBマーケティング"],
  },
  {
    title: "人事(採用・育成)",
    body: "人事制度設計・採用戦略・組織開発など豊富な経験を持つプロが対応。",
    icon: "hr",
    tags: ["人材採用", "制度設計", "人事データ活用"],
  },
  {
    title: "DX・システム",
    body: "要件定義・システム構築・PM・運用まで、課題解決を支援します。",
    icon: "code",
    tags: ["開発支援", "PM業務", "システム構築", "運用保守"],
  },
  {
    title: "経営全般・事業承継",
    body: "経営支援の専門家がパートナーとなり、承継・組織づくりを支援。",
    icon: "succession",
    tags: ["事業承継", "IPO準備", "組織再編"],
  },
  {
    title: "営業",
    body: "営業戦略の立案から人材育成、販路開拓まで成果に伴走します。",
    icon: "sales",
    tags: ["販路拡大", "営業支援", "営業力の底上げ"],
  },
  {
    title: "財務・ファイナンス",
    body: "資金調達・管理会計・経営管理など、財務領域のプロが支援します。",
    icon: "finance",
    tags: ["資金調達", "管理会計", "M&A"],
  },
  {
    title: "海外展開",
    body: "海外販路開拓・拠点立ち上げなど、グローバルの経営課題に対応。",
    icon: "globe",
    tags: ["海外展開", "拠点立ち上げ", "販路開拓"],
  },
  {
    title: "法務・ガバナンス",
    body: "機関設計・ガバナンス整備など、実績ある専門家が支援します。",
    icon: "law",
    tags: ["法務", "IPO", "グローバルガバナンス"],
  },
];

function SolutionIconArt({ kind }: { kind: SolutionIcon }) {
  const c = {
    viewBox: "0 0 64 64",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.6,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
    className: "h-14 w-14 md:h-16 md:w-16",
  };
  switch (kind) {
    case "rocket":
      return (
        <svg {...c}>
          <path d="M38 8c8 6 12 16 12 26l-8 8H22l-8-8c0-10 4-20 12-26l6-4 6 4z" />
          <circle cx="32" cy="24" r="4" />
          <path d="M22 42l-6 10 10-4M42 42l6 10-10-4" />
          <path d="M28 50c0 4 4 6 4 6s4-2 4-6" />
        </svg>
      );
    case "megaphone":
      return (
        <svg {...c}>
          <path d="M10 30v6l28 12V18z" />
          <path d="M38 22c4 0 8 4 8 10s-4 10-8 10" />
          <path d="M16 36v8a4 4 0 0 0 8 0v-5" />
        </svg>
      );
    case "hr":
      return (
        <svg {...c}>
          <circle cx="22" cy="20" r="6" />
          <path d="M10 42c0-7 5-12 12-12s12 5 12 12" />
          <rect x="38" y="28" width="18" height="20" />
          <path d="M42 36h10M42 40h10M42 44h6" />
          <path d="M40 28l3 4 3-3M48 28l3 4 3-3" />
        </svg>
      );
    case "code":
      return (
        <svg {...c}>
          <rect x="8" y="14" width="48" height="32" rx="2" />
          <path d="M8 22h48" />
          <circle cx="13" cy="18" r="0.8" fill="currentColor" />
          <circle cx="17" cy="18" r="0.8" fill="currentColor" />
          <path d="M24 32l-4 4 4 4M40 32l4 4-4 4M34 30l-4 12" />
          <path d="M8 50h48" />
        </svg>
      );
    case "succession":
      return (
        <svg {...c}>
          <rect x="8" y="20" width="48" height="32" />
          <path d="M14 20V12h36v8" />
          <path d="M8 20l24 16 24-16" />
          <circle cx="32" cy="36" r="2.5" />
        </svg>
      );
    case "sales":
      return (
        <svg {...c}>
          <circle cx="36" cy="14" r="4" />
          <path d="M20 50l8-12 8 4 8-8" />
          <path d="M28 38l-4-6 8-8 6 6" />
          <path d="M44 26l4-4 6 6" />
          <rect x="34" y="32" width="10" height="8" rx="1" />
        </svg>
      );
    case "finance":
      return (
        <svg {...c}>
          <ellipse cx="32" cy="18" rx="14" ry="5" />
          <path d="M18 18v10c0 3 6 5 14 5s14-2 14-5V18" />
          <path d="M18 28v10c0 3 6 5 14 5s14-2 14-5V28" />
          <path d="M18 38v8c0 3 6 5 14 5s14-2 14-5v-8" />
        </svg>
      );
    case "globe":
      return (
        <svg {...c}>
          <circle cx="32" cy="32" r="20" />
          <ellipse cx="32" cy="32" rx="8" ry="20" />
          <path d="M12 32h40" />
          <path d="M16 20c4 4 10 6 16 6s12-2 16-6" />
          <path d="M16 44c4-4 10-6 16-6s12 2 16 6" />
        </svg>
      );
    case "law":
      return (
        <svg {...c}>
          <path d="M14 22l18-8 18 8" />
          <rect x="14" y="22" width="36" height="4" />
          <path d="M18 26v22M28 26v22M36 26v22M46 26v22" />
          <path d="M12 50h40" />
        </svg>
      );
  }
}

type Pro = { field: string; catch: string };

const pros: Pro[] = [
  { field: "新規事業", catch: "事業構想から立ち上げ・収益化まで、0→1を伴走するプロ" },
  { field: "マーケティング", catch: "戦略設計から実行まで、成果に直結する施策を主導するプロ" },
  { field: "人事・組織", catch: "採用・制度設計・組織開発で、強い組織づくりを支えるプロ" },
  { field: "DX・IT", catch: "要件定義から運用まで、現場に入り変革を推進するプロ" },
  { field: "財務・経営管理", catch: "資金調達・管理会計で、経営の意思決定を支えるプロ" },
  { field: "営業・事業開発", catch: "戦略から販路開拓まで、売上の最大化を実現するプロ" },
];

type Faq = { q: string; a: ReactNode };

export default function KeymanBondPage({
  params,
}: {
  params: { locale: string };
}) {
  if (!isLocale(params.locale)) notFound();
  const locale = params.locale;
  const service = services.find((s) => s.slug === SERVICE_SLUG);
  if (!service) notFound();

  const contactHref = localePath("/contact", locale);
  const professionalHref = localePath("/contact/partner", locale);

  const faqs: Faq[] = [
    {
      q: "どんな領域・課題に対応できますか?",
      a: "新規事業・マーケティング・人事・DX・財務・営業・海外展開・法務など、幅広い経営領域に対応しています。まずは無料相談で貴社の課題をお聞かせください。",
    },
    {
      q: "どのような契約形態になりますか?",
      a: "アドバイザー(顧問)・業務委託・社外役員など、課題と関与度に応じて柔軟に設計します。スポットでのご相談から継続的な伴走まで対応可能です。",
    },
    {
      q: "費用感はどのくらいですか?",
      a: "起用するプロ人材の領域・関与度・期間によって変動します。ご予算に合わせた設計が可能ですので、まずは無料相談・資料請求でご確認ください。",
    },
    {
      q: "稼働開始までどのくらいかかりますか?",
      a: "ヒアリングのうえ要件に合うプロ人材をご提案し、面談を経て稼働開始となります。課題の内容により異なりますので、個別にご案内します。",
    },
    {
      q: "プロ人材として登録したいのですが?",
      a: (
        <>
          経験・専門性を活かしてご活躍いただけるプロ人材を募集しています。
          <Link
            href={professionalHref}
            className="font-bold text-rose-700 underline underline-offset-2 hover:text-rose-800"
          >
            個人登録のお問い合わせ
          </Link>
          よりご連絡ください。
        </>
      ),
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

      {/* ───── Hero ───── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-cream via-white to-rose-50">
        <div className="absolute inset-0 dot-bg opacity-50" aria-hidden="true" />
        <div
          aria-hidden="true"
          className="absolute -top-40 right-[-12%] h-[520px] w-[520px] rounded-full bg-rose-200/40 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="absolute -bottom-40 -left-32 h-[420px] w-[420px] rounded-full bg-rose-100/60 blur-3xl"
        />

        <Container className="relative py-16 md:py-24 lg:py-28">
          <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-14">
            {/* Left: copy */}
            <div className="lg:col-span-5">
              <p className="inline-flex items-center gap-2 rounded-full border border-rose-200 bg-white px-4 py-1.5 text-xs md:text-sm font-extrabold tracking-wide text-rose-800 shadow-sm">
                <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-rose-700" />
                キーマンボンド｜プロ人材/顧問マッチングサービス
              </p>

              <h1 className="mt-6 font-display font-black leading-[1.2] tracking-tight text-ink text-[clamp(2rem,4.2vw,3.25rem)]">
                経営課題を、その道の
                <span className="relative inline-block">
                  プロ
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-0 -bottom-1 h-1.5 bg-amber-400 md:h-2"
                  />
                </span>
                と解決する。
              </h1>
              <p className="mt-6 text-base md:text-lg font-bold text-ink-soft leading-relaxed">
                経営層・CxO・エキスパートクラスの実力者が、実働型で伴走
              </p>

              <ul className="mt-7 flex flex-wrap gap-x-6 gap-y-2.5">
                {["経営層・CxO・専門家が在籍", "助言で終わらない実働型支援", "多彩な経営領域に対応"].map(
                  (t) => (
                    <li
                      key={t}
                      className="flex items-center gap-2 text-sm font-bold text-ink-soft"
                    >
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 18 18"
                        fill="none"
                        aria-hidden="true"
                        className="shrink-0"
                      >
                        <circle cx="9" cy="9" r="8" fill="#BE123C" />
                        <path
                          d="M5 9.5l3 3 5-6"
                          stroke="white"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      {t}
                    </li>
                  ),
                )}
              </ul>

              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <Button
                  href={contactHref}
                  size="lg"
                  className="!h-[64px] w-full px-12 text-lg font-black !bg-[#BE123C] hover:!bg-rose-700 shadow-[0_22px_50px_-12px_rgba(190,18,60,0.85)] hover:-translate-y-1 md:!h-[72px] md:text-xl sm:w-auto sm:min-w-[220px]"
                >
                  資料請求
                </Button>
                <Button
                  href={contactHref}
                  size="lg"
                  variant="secondary"
                  className="!h-[64px] w-full px-12 text-lg font-black hover:-translate-y-1 md:!h-[72px] md:text-xl sm:w-auto sm:min-w-[220px]"
                >
                  無料相談
                </Button>
              </div>
            </div>

            {/* Right: professional visual */}
            <div className="lg:col-span-7">
              <div className="relative mx-auto w-full lg:ml-auto lg:mr-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://i.imgur.com/F0ZKMUf.png"
                  alt="経営課題に伴走するプロフェッショナル人材"
                  className="block h-auto w-full"
                  loading="eager"
                />
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ───── About (企業の皆さまへ) ───── */}
      <section className="bg-white py-24 md:py-32">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-rose-700">
              For Corporates
            </p>
            <h2 className="mt-3 text-display-3 text-ink font-black leading-tight">
              キーマンボンドとは?
            </h2>
            <span
              aria-hidden="true"
              className="mx-auto mt-6 block h-1 w-16 rounded-full bg-rose-700"
            />
            <p className="mt-8 text-base md:text-lg leading-[1.95] text-ink font-medium">
              キーマンボンドは、経営課題の解決に取り組む企業向けに、事業会社やアカデミアで経験を積んだ
              <span className="font-black text-rose-700">
                上級役職者・専門家
              </span>
              を「アドバイザー」「顧問」「社外役員」として提案する経営支援サービスです。
            </p>
          </div>

          {/* Service overview triad diagram */}
          <div className="mx-auto mt-14 max-w-5xl">
            <ServiceOverviewDiagram />
          </div>

          <ul className="mx-auto mt-16 grid max-w-5xl gap-6 md:grid-cols-3">
            {[
              {
                num: "01",
                en: "Flexible",
                t: "柔軟なサポートが可能",
                b: "スポットでのご依頼から伴走支援まで、貴社のご状況に応じて柔軟なサポートが可能。",
                kind: "flexible" as const,
              },
              {
                num: "02",
                en: "Multi-domain",
                t: "多領域の実力者",
                b: "経営層・CxO・各分野のエキスパートが多数。",
                kind: "multi-domain" as const,
              },
              {
                num: "03",
                en: "Phase-fit",
                t: "フェーズに最適配置",
                b: "事業フェーズと課題に応じて最適な人材を提案。",
                kind: "phase-fit" as const,
              },
            ].map((c, i) => (
              <li key={c.t}>
                <Reveal delay={i * 80} className="h-full">
                  <div className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-rose-100 bg-white p-7 shadow-[0_24px_60px_-30px_rgba(190,18,60,0.35)] transition-all hover:-translate-y-1 hover:border-rose-300 hover:shadow-[0_30px_70px_-25px_rgba(190,18,60,0.55)]">
                    <span
                      aria-hidden="true"
                      className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-rose-700 via-rose-500 to-rose-700"
                    />
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-rose-100/60 blur-2xl transition-opacity group-hover:opacity-80"
                    />

                    <div className="relative flex items-baseline gap-3">
                      <span className="font-display text-5xl font-black leading-none text-rose-700/90">
                        {c.num}
                      </span>
                      <span className="text-xs font-extrabold uppercase tracking-[0.22em] text-rose-600/80">
                        {c.en}
                      </span>
                    </div>

                    <div className="relative mt-6 grid h-[180px] place-items-center">
                      <FeatureDiagram kind={c.kind} />
                    </div>

                    <div className="relative mt-6 flex flex-1 flex-col">
                      <h3 className="min-h-[2.75rem] text-xl font-black leading-tight text-ink">
                        {c.t}
                      </h3>
                      <span
                        aria-hidden="true"
                        className="mt-3 block h-0.5 w-10 rounded-full bg-rose-700"
                      />
                      <p className="mt-3 text-sm leading-relaxed text-ink-soft font-medium">
                        {c.b}
                      </p>
                    </div>
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* ───── Solution (経営課題の解決) ───── */}
      <section className="bg-cream py-24 md:py-32">
        <Container>
          <div className="text-center">
            <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-rose-700">
              Solution
            </p>
            <h2 className="mt-3 text-display-3 text-ink font-black leading-tight">
              解決できる経営課題
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-sm md:text-base leading-relaxed text-ink-soft font-medium">
              幅広い領域のプロ人材の知見・人脈を組み合わせ、貴社の事業成長を支援します。
            </p>
          </div>

          <ul className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3 md:gap-6">
            {solutions.map((s, i) => (
              <li key={s.title}>
                <Reveal delay={(i % 3) * 70} className="h-full">
                  <div className="flex h-full flex-col rounded-md border border-ink-line bg-white p-6 transition-all hover:-translate-y-0.5 hover:border-rose-300 hover:shadow-card md:p-7">
                    {/* Title in bordered pill */}
                    <div className="rounded border border-rose-700 px-4 py-2 text-center">
                      <p className="text-sm md:text-base font-black text-rose-700">
                        {s.title}
                      </p>
                    </div>

                    {/* Icon */}
                    <div className="my-6 grid place-items-center text-rose-700">
                      <SolutionIconArt kind={s.icon} />
                    </div>

                    {/* Body */}
                    <p className="text-sm leading-relaxed text-ink-soft font-medium">
                      {s.body}
                    </p>

                    {/* Tags */}
                    <div className="mt-auto flex flex-wrap gap-x-3 gap-y-1 pt-6">
                      {s.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs font-bold text-rose-700"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>

          <div className="mt-16 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button
              href={contactHref}
              size="lg"
              className="!bg-[#BE123C] hover:!bg-rose-700 shadow-[0_18px_40px_-12px_rgba(190,18,60,0.6)]"
            >
              資料請求
            </Button>
            <Button href={contactHref} size="lg" variant="secondary">
              無料相談
            </Button>
          </div>
        </Container>
      </section>

      {/* ───── Contract Flow ───── */}
      <section className="bg-white py-24 md:py-32">
        <Container>
          <div className="text-center">
            <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-rose-700">
              Process
            </p>
            <h2 className="mt-3 text-display-3 text-ink font-black leading-tight">
              ご契約から実働までの流れ
            </h2>
            <span
              aria-hidden="true"
              className="mx-auto mt-6 block h-1 w-16 rounded-full bg-rose-700"
            />
            <p className="mx-auto mt-6 max-w-2xl text-sm md:text-base leading-relaxed text-ink-soft font-medium">
              ご相談から実働開始まで、最短で着手できる5ステップ。プラットフォーム登録・課題登録は無料です。
            </p>
          </div>

          <div className="relative mt-16">
            {/* Connecting rail behind cards (desktop) */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute left-[6%] right-[6%] top-[88px] hidden h-[2px] lg:block"
              style={{
                backgroundImage:
                  "linear-gradient(to right, #BE123C 0, #BE123C 8px, transparent 8px, transparent 16px)",
                backgroundSize: "16px 2px",
                backgroundRepeat: "repeat-x",
              }}
            />

            <ol className="relative grid gap-x-3 gap-y-8 sm:grid-cols-2 lg:grid-cols-5">
              {contractSteps.map((s, i) => (
                <li key={s.num} className="relative">
                  <Reveal delay={i * 80} className="h-full">
                    <div className="relative flex h-full flex-col items-center text-center">
                      {/* Number capsule */}
                      <div className="relative grid h-[72px] w-[72px] place-items-center">
                        <span
                          aria-hidden="true"
                          className="absolute inset-0 rounded-full bg-rose-100"
                        />
                        <span
                          aria-hidden="true"
                          className="absolute inset-[6px] rounded-full bg-white shadow-[0_8px_22px_-10px_rgba(190,18,60,0.55)]"
                        />
                        <span className="relative font-display text-lg font-black leading-none text-rose-700">
                          <span className="block text-[10px] font-extrabold tracking-[0.18em] uppercase text-rose-500/80">
                            Step
                          </span>
                          <span className="block">{s.num}</span>
                        </span>
                        {s.isFree ? (
                          <span className="absolute -right-2 -top-2 rotate-6 rounded-full bg-amber-400 px-2 py-0.5 text-[10px] font-black uppercase tracking-wide text-ink shadow-sm">
                            無料
                          </span>
                        ) : null}
                      </div>

                      {/* Card */}
                      <div className="mt-5 flex w-full flex-1 flex-col items-center rounded-2xl border border-rose-100 bg-white p-5 shadow-[0_18px_50px_-30px_rgba(190,18,60,0.4)]">
                        <span className="grid h-12 w-12 place-items-center rounded-xl bg-rose-50 text-rose-700">
                          <ContractStepIcon kind={s.icon} />
                        </span>
                        <h3 className="mt-4 text-base font-black leading-snug text-ink md:text-lg">
                          {s.title}
                        </h3>
                        <p className="mt-2 text-xs leading-relaxed text-ink-soft font-medium md:text-sm">
                          {s.body}
                        </p>
                      </div>

                      {/* Mobile down arrow between cards */}
                      {i < contractSteps.length - 1 ? (
                        <span
                          aria-hidden="true"
                          className="mt-4 inline-block text-rose-400 lg:hidden"
                        >
                          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                            <path
                              d="M12 4v14M6 13l6 6 6-6"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </span>
                      ) : null}
                    </div>
                  </Reveal>
                </li>
              ))}
            </ol>
          </div>

          <div className="mt-14 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button
              href={contactHref}
              size="lg"
              className="!bg-[#BE123C] hover:!bg-rose-700 shadow-[0_18px_40px_-12px_rgba(190,18,60,0.6)]"
            >
              ご相談・お問い合わせ
            </Button>
            <Button href={contactHref} size="lg" variant="secondary">
              資料請求
            </Button>
          </div>
        </Container>
      </section>

      {/* ───── FAQ ───── */}
      <section className="bg-cream py-24 md:py-32">
        <Container>
          <div className="text-center">
            <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-rose-700">
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
                      <span className="font-display text-lg font-black text-rose-700">
                        Q.
                      </span>
                      <span className="text-base md:text-lg font-bold text-ink leading-snug">
                        {f.q}
                      </span>
                    </span>
                    <span className="mt-1 grid h-7 w-7 shrink-0 place-items-center rounded-full border-2 border-ink-line text-ink-muted transition group-open:rotate-45 group-open:border-rose-700 group-open:text-rose-700">
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
          <div className="relative overflow-hidden rounded-2xl bg-rose-700 px-8 py-14 md:px-16 md:py-16 text-white">
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
              className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-rose-300/40 blur-3xl"
            />
            <div
              aria-hidden="true"
              className="absolute -bottom-24 -left-24 h-80 w-80 rounded-full bg-rose-900/40 blur-3xl"
            />

            <div className="relative text-center">
              <p className="text-2xl md:text-3xl font-black text-white">
                資料請求・無料相談はこちら
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Button
                  href={contactHref}
                  size="lg"
                  className="!h-[72px] w-full px-12 text-xl font-black !bg-white !text-rose-800 hover:!bg-cream hover:-translate-y-1 shadow-[0_22px_50px_-12px_rgba(0,0,0,0.4)] md:!h-[84px] md:px-16 md:text-2xl sm:w-auto sm:min-w-[260px]"
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
