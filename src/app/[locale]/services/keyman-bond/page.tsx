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
      {/* Editorial horizontal rule */}
      <div className="flex items-center gap-4">
        <span aria-hidden="true" className="block h-px flex-1 bg-ink/30" />
        <p className="font-display text-[10px] font-extrabold uppercase tracking-[0.45em] text-ink/60">
          Service Overview ／ N&deg; 01
        </p>
        <span aria-hidden="true" className="block h-px flex-1 bg-ink/30" />
      </div>

      <div className="mt-12 grid gap-12 md:grid-cols-12 md:gap-16 lg:gap-20">
        {/* ===== Left column: editorial headline ===== */}
        <div className="md:col-span-5">
          {/* Drop cap style kicker */}
          <p className="font-display text-xs font-extrabold uppercase tracking-[0.3em] text-rose-700">
            How we bond
          </p>

          <h3 className="mt-4 font-display font-black leading-[1.02] tracking-tight text-ink text-[clamp(2.25rem,4.5vw,3.5rem)]">
            社内の力では
            <br />
            届かない場所へ、
            <br />
            <span className="italic font-medium" style={{ fontFamily: '"Times New Roman", serif' }}>
              the right
            </span>
            <br />
            <span className="text-rose-700">人と知見</span>
            を。
          </h3>

          {/* Decorative initials / signature */}
          <div className="mt-8 flex items-center gap-3">
            <span aria-hidden="true" className="block h-[2px] w-10 bg-rose-700" />
            <span className="font-display text-[10px] font-bold uppercase tracking-[0.4em] text-ink/60">
              Keyman Bond — Editor&apos;s Note
            </span>
          </div>

          <p className="mt-6 max-w-md text-sm md:text-[15px] leading-[1.95] text-ink-soft font-medium">
            経営課題を抱える企業と、その道のプロフェッショナルを、
            <span className="font-black text-ink">専属のエージェントとプラットフォーム</span>
            が結びつけます。社内では手の届かない経験・人脈・実行力を、最短距離で。
          </p>

          {/* Numbered editorial list */}
          <ol className="mt-12 space-y-7 border-t border-ink/10 pt-8">
            {[
              {
                num: "Ⅰ",
                kicker: "Corporate",
                title: "企業で困りごとがある",
                body: "経営課題は明確だが、社内リソースでは推進が難しい状態。",
              },
              {
                num: "Ⅱ",
                kicker: "Platform",
                title: "弊社・プラットフォームに相談",
                body: "専属エージェントが課題を翻訳し、最適なプロを選定します。",
              },
              {
                num: "Ⅲ",
                kicker: "Talent",
                title: "プロ人材／顧問を紹介",
                body: "経営層・CxO・各分野のエキスパートが、実働で並走します。",
              },
            ].map((it) => (
              <li key={it.kicker} className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-1">
                <span
                  className="row-span-3 font-display text-3xl font-black italic leading-none text-rose-700"
                  style={{ fontFamily: '"Times New Roman", serif' }}
                >
                  {it.num}
                </span>
                <p className="font-display text-[10px] font-extrabold uppercase tracking-[0.3em] text-rose-700">
                  {it.kicker}
                </p>
                <p className="font-display text-base font-black text-ink md:text-lg">
                  {it.title}
                </p>
                <p className="text-xs leading-relaxed text-ink-soft font-medium md:text-sm">
                  {it.body}
                </p>
              </li>
            ))}
          </ol>
        </div>

        {/* ===== Right column: hand-crafted single illustration ===== */}
        <div className="relative md:col-span-7">
          {/* Photo-paper feel frame */}
          <div className="relative aspect-[5/6] w-full md:aspect-[4/5] lg:aspect-[5/6]">
            {/* Background panel — half rose, half cream split */}
            <div
              aria-hidden="true"
              className="absolute inset-0 overflow-hidden rounded-[2px]"
            >
              <div className="absolute inset-y-0 left-0 w-[58%] bg-rose-700" />
              <div className="absolute inset-y-0 right-0 w-[44%] bg-cream/80" />
            </div>

            {/* Halftone dot pattern overlay on rose */}
            <div
              aria-hidden="true"
              className="absolute inset-y-0 left-0 w-[58%] opacity-25"
              style={{
                backgroundImage:
                  "radial-gradient(circle, #fff 1.1px, transparent 1.4px)",
                backgroundSize: "10px 10px",
              }}
            />

            {/* Editorial folio / page number */}
            <div className="absolute top-5 left-5 z-20 flex items-center gap-2 text-cream/90">
              <span className="font-display text-[10px] font-extrabold uppercase tracking-[0.4em]">
                Fig. 01
              </span>
              <span aria-hidden="true" className="block h-px w-8 bg-cream/60" />
            </div>
            <div className="absolute bottom-5 right-5 z-20 flex items-center gap-2 text-ink/60">
              <span aria-hidden="true" className="block h-px w-8 bg-ink/40" />
              <span className="font-display text-[10px] font-extrabold uppercase tracking-[0.4em]">
                p. 001
              </span>
            </div>

            {/* The illustration */}
            <svg
              viewBox="0 0 500 600"
              className="relative h-full w-full"
              preserveAspectRatio="xMidYMid meet"
              role="img"
              aria-label="プラットフォームを介して企業とプロ人材がつながる構図"
            >
              <defs>
                <linearGradient id="kb-shine" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#FBBF24" stopOpacity="1" />
                  <stop offset="100%" stopColor="#F59E0B" stopOpacity="1" />
                </linearGradient>
                <filter id="kb-soft" x="-30%" y="-30%" width="160%" height="160%">
                  <feGaussianBlur in="SourceAlpha" stdDeviation="10" />
                  <feOffset dx="0" dy="14" result="o" />
                  <feComponentTransfer><feFuncA type="linear" slope="0.22" /></feComponentTransfer>
                  <feMerge>
                    <feMergeNode />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* ===== Background "page" big serif Ⅰ Ⅱ Ⅲ in negative space ===== */}
              <text
                x="40"
                y="540"
                fontSize="220"
                fontFamily='"Times New Roman", serif'
                fontStyle="italic"
                fontWeight="900"
                fill="#FFFFFF"
                opacity="0.08"
              >
                bond
              </text>

              {/* ===== Decorative editorial annotation ===== */}
              <g transform="translate(36, 56)" fill="#FECDD3">
                <text fontSize="9" fontWeight="800" letterSpacing="2.6">
                  ・ AN EDITORIAL VIEW ON HOW
                </text>
                <text y="14" fontSize="9" fontWeight="800" letterSpacing="2.6">
                  ・ EXECUTIVES MEET THEIR MATCH
                </text>
              </g>

              {/* ====== Scene: portrait of executive in profile (left) ====== */}
              <g transform="translate(40, 230)">
                {/* portrait frame */}
                <rect x="-4" y="-4" width="170" height="200" rx="3" fill="#FFFFFF" opacity="0.06" />
                <rect x="0" y="0" width="162" height="192" rx="2" fill="#9F1239" />

                {/* halftone */}
                <rect x="0" y="0" width="162" height="192" rx="2" fill="url(#kb-stripes)" opacity="0.5" />

                {/* executive silhouette */}
                <g>
                  {/* head */}
                  <ellipse cx="78" cy="78" rx="34" ry="38" fill="#1F2937" />
                  {/* hair sweep */}
                  <path d="M44 78 C 44 50 60 38 80 38 C 102 38 116 52 116 78 C 116 70 105 60 88 60 C 70 60 56 66 48 80 z" fill="#0B1220" />
                  {/* shoulders / suit */}
                  <path d="M16 192 C 16 152 40 130 78 130 C 116 130 140 152 140 192 z" fill="#0B1220" />
                  {/* collar V */}
                  <path d="M62 130 L78 156 L94 130 L94 158 L62 158 z" fill="#FFFFFF" />
                  <path d="M78 156 L78 168" stroke="#0B1220" strokeWidth="2" />
                  {/* tie */}
                  <path d="M73 156 L83 156 L86 178 L78 188 L70 178 z" fill="#FBBF24" />
                </g>

                {/* annotation */}
                <text x="-4" y="218" fontSize="9" fontWeight="800" fill="#FECDD3" letterSpacing="2">
                  ① CORPORATE
                </text>
                <text x="-4" y="234" fontSize="13" fontWeight="900" fill="#FFFFFF">
                  経営課題を抱える企業
                </text>
              </g>

              <defs>
                <pattern id="kb-stripes" patternUnits="userSpaceOnUse" width="6" height="6" patternTransform="rotate(45)">
                  <line x1="0" y1="0" x2="0" y2="6" stroke="#FFFFFF" strokeWidth="1.4" opacity="0.4" />
                </pattern>
              </defs>

              {/* ====== Center "platform" — abstract elevated badge ====== */}
              <g transform="translate(238, 252)" filter="url(#kb-soft)">
                {/* outer halo */}
                <circle cx="0" cy="0" r="78" fill="#FBBF24" opacity="0.2" />
                <circle cx="0" cy="0" r="64" fill="url(#kb-shine)" />
                {/* inner platform mark */}
                <g stroke="#9F1239" strokeWidth="2.4" fill="none" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="0" cy="0" r="14" />
                  <circle cx="-30" cy="-18" r="8" />
                  <circle cx="30" cy="-18" r="8" />
                  <circle cx="-30" cy="18" r="8" />
                  <circle cx="30" cy="18" r="8" />
                  <line x1="-22" y1="-12" x2="-8" y2="-4" />
                  <line x1="22" y1="-12" x2="8" y2="-4" />
                  <line x1="-22" y1="12" x2="-8" y2="4" />
                  <line x1="22" y1="12" x2="8" y2="4" />
                </g>
                {/* "MATCH" stamp arc */}
                <text fontSize="9" fontWeight="900" fill="#9F1239" letterSpacing="2">
                  <textPath href="#kb-arc" startOffset="0">
                    ・ MATCHING ・ MATCHING
                  </textPath>
                </text>
                <path id="kb-arc" d="M -52 0 A 52 52 0 0 1 52 0" fill="none" />
              </g>

              {/* connecting arrows */}
              <path
                d="M210 318 Q 220 290 168 274"
                stroke="#FBBF24"
                strokeWidth="2.6"
                fill="none"
                strokeLinecap="round"
              />
              <path
                d="M268 318 Q 270 350 320 380"
                stroke="#FBBF24"
                strokeWidth="2.6"
                fill="none"
                strokeLinecap="round"
              />

              {/* ====== Pro talent card (lower right) ====== */}
              <g transform="translate(296, 372)">
                <rect x="0" y="0" width="170" height="190" rx="2" fill="#FFFFFF" filter="url(#kb-soft)" />
                <rect x="0" y="0" width="170" height="6" fill="#1F2937" />
                {/* portrait area */}
                <rect x="14" y="20" width="142" height="116" fill="#FBBF24" />
                <rect x="14" y="20" width="142" height="116" fill="url(#kb-stripes)" opacity="0.7" />
                {/* pro silhouette */}
                <g transform="translate(50, 30)">
                  <ellipse cx="36" cy="34" rx="22" ry="26" fill="#9F1239" />
                  <path d="M16 36 C 16 16 26 8 36 8 C 46 8 58 16 58 36 C 58 28 50 22 42 22 C 32 22 22 24 18 38 z" fill="#1F2937" />
                  <path d="M2 106 C 2 78 16 64 36 64 C 56 64 70 78 70 106 z" fill="#1F2937" />
                  <path d="M28 64 L36 84 L44 64 L44 86 L28 86 z" fill="#FFFFFF" />
                  <path d="M34 84 L38 84 L40 102 L36 110 L32 102 z" fill="#9F1239" />
                </g>
                {/* nameplate */}
                <text x="14" y="160" fontSize="10" fontWeight="900" fill="#9F1239" letterSpacing="2">
                  ③ TALENT
                </text>
                <text x="14" y="178" fontSize="14" fontWeight="900" fill="#1F2937">
                  プロ人材／顧問
                </text>
              </g>

              {/* Match-stamped seal */}
              <g transform="translate(456, 366) rotate(8)">
                <circle cx="0" cy="0" r="28" fill="#9F1239" />
                <circle cx="0" cy="0" r="24" fill="none" stroke="#FBBF24" strokeWidth="1.5" />
                <text textAnchor="middle" fontSize="9" fontWeight="900" fill="#FBBF24" y="-2" letterSpacing="1">MATCH</text>
                <text textAnchor="middle" fontSize="6" fontWeight="700" fill="#FECDD3" y="10" letterSpacing="2">No.01</text>
              </g>

              {/* Center caption */}
              <g transform="translate(178, 354)">
                <text fontSize="9" fontWeight="800" fill="#9F1239" letterSpacing="2.5">
                  ② PLATFORM
                </text>
                <text y="14" fontSize="11" fontWeight="900" fill="#1F2937">
                  弊社・プラットフォーム
                </text>
              </g>
            </svg>

            {/* Top hairline border */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 rounded-[2px] ring-1 ring-ink/10"
            />
          </div>
        </div>
      </div>

      {/* Bottom signature rule */}
      <div className="mt-16 flex items-center gap-4">
        <span aria-hidden="true" className="block h-px flex-1 bg-ink/15" />
        <p className="font-display text-[10px] font-extrabold uppercase tracking-[0.45em] text-ink/50">
          End ／ Keyman Bond Editorial
        </p>
        <span aria-hidden="true" className="block h-px flex-1 bg-ink/15" />
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

type Solution = { title: string; body: string };

const solutions: Solution[] = [
  { title: "新規事業開発", body: "立ち上げから事業化まで、実績を持つ専門家が実働型で支援します。" },
  { title: "マーケティング", body: "戦略策定からブランディング・PR・実行まで、専門家が伴走します。" },
  { title: "人事(採用・育成)", body: "人事制度設計・採用戦略・組織開発など豊富な経験を持つプロが対応。" },
  { title: "DX・システム", body: "要件定義・システム構築・PM・運用まで、課題解決を支援します。" },
  { title: "経営全般・事業承継", body: "経営支援の専門家がパートナーとなり、承継・組織づくりを支援。" },
  { title: "営業", body: "営業戦略の立案から人材育成、販路開拓まで成果に伴走します。" },
  { title: "財務・ファイナンス", body: "資金調達・管理会計・経営管理など、財務領域のプロが支援します。" },
  { title: "海外展開", body: "海外販路開拓・拠点立ち上げなど、グローバルの経営課題に対応。" },
  { title: "法務・ガバナンス", body: "機関設計・ガバナンス整備など、実績ある専門家が支援します。" },
];

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
            <div className="lg:col-span-6">
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
            <div className="lg:col-span-6">
              <div className="relative mx-auto max-w-md lg:ml-auto lg:mr-0 lg:max-w-none">
                <div
                  aria-hidden="true"
                  className="absolute -bottom-6 -right-6 h-40 w-40 rounded-xl3 bg-rose-700/15"
                />
                <div
                  aria-hidden="true"
                  className="absolute -left-5 -top-5 hidden h-28 w-28 rounded-full border-2 border-rose-300/60 md:block"
                />
                <div className="relative overflow-hidden rounded-xl4 border-4 border-white bg-cream shadow-[0_30px_70px_-25px_rgba(20,20,20,0.35)]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="https://i.imgur.com/qxw7FjS.png"
                    alt="経営課題に伴走するプロフェッショナル人材"
                    className="block h-auto w-full"
                    loading="eager"
                  />
                </div>
                {/* floating accent label */}
                <div className="absolute -bottom-4 left-4 rounded-xl2 bg-ink px-5 py-3 text-white shadow-card md:left-8">
                  <p className="text-xs font-extrabold tracking-[0.18em] uppercase text-rose-300">
                    Pro Talent
                  </p>
                  <p className="text-sm font-black">経営課題に伴走するプロ</p>
                </div>
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

          <ul className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-3 md:gap-6">
            {solutions.map((s, i) => (
              <li key={s.title}>
                <Reveal delay={(i % 3) * 70} className="h-full">
                  <div className="group h-full rounded-2xl border border-ink-line bg-white p-6 transition-all hover:-translate-y-1 hover:border-rose-300 hover:shadow-card md:p-7">
                    <p className="flex items-center gap-2.5 text-base md:text-lg font-black text-ink">
                      <span
                        aria-hidden="true"
                        className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-rose-700 text-xs font-black text-white shadow-[0_6px_18px_-6px_rgba(190,18,60,0.6)]"
                      >
                        ✓
                      </span>
                      <span className="transition-colors group-hover:text-rose-800">
                        {s.title}
                      </span>
                    </p>
                    <p className="mt-3 text-sm md:text-base leading-relaxed text-ink-soft font-medium">
                      {s.body}
                    </p>
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
