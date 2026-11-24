import type { ComponentType, CSSProperties, ReactNode } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { IconChecksheet, IconShadowAi, IconSoloIt } from "./FlatIcons";

/**
 * セキュプロ LP「セキュプロとは」: 情報セキュリティのプロ人材が対応すると、何が変わるかを示す図。
 * 写真は使わず、イラスト + 流れる線 + テキストで「いまの課題」→「導入後」を1行ずつ対応させる。
 * 画面に入ると、左の課題 → 線が中央へ流れる → 右の導入後、の順に現れる。
 */

const rows: {
  Icon: ComponentType<{ className?: string }>;
  before: string;
  after: [string, string];
}[] = [
  {
    Icon: IconSoloIt,
    before: "専任のセキュリティ人材を採用・確保するコストが見合わない",
    after: ["採用せずに、", "必要なときだけプロ人材を活用できる"],
  },
  {
    Icon: IconChecksheet,
    before: "対策の優先順位が定まらず、着手できていない",
    after: ["現状とリスクを整理し、", "優先順位をつけて着手できる"],
  },
  {
    Icon: IconShadowAi,
    before: "外部に頼みたいが、委託先と依頼範囲を判断できない",
    after: ["課題に合ったプロに、", "窓口ひとつで任せられる"],
  },
];

const show =
  "group-data-[visible=true]/reveal:translate-x-0 group-data-[visible=true]/reveal:opacity-100";
const d = (ms: number): CSSProperties => ({ transitionDelay: `${ms}ms` });

function Check({ delay }: { delay: number }) {
  return (
    <span
      aria-hidden="true"
      style={d(delay)}
      className="grid h-7 w-7 shrink-0 scale-0 place-items-center rounded-full bg-brand-500 text-white transition-transform duration-500 ease-[cubic-bezier(.34,1.56,.64,1)] group-data-[visible=true]/reveal:scale-100"
    >
      <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none">
        <path
          d="M3 8.5l3 3 7-7"
          stroke="currentColor"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

/** 横に流れる点線(左から右へ伸びて、流れ続ける) */
function FlowX({ delay }: { delay: number }) {
  return (
    <div className="relative flex h-full items-center" aria-hidden="true">
      <span
        style={d(delay)}
        className="ba-flow-x h-[2px] w-full origin-left scale-x-0 transition-transform duration-700 ease-out group-data-[visible=true]/reveal:scale-x-100"
      />
      <svg
        viewBox="0 0 10 12"
        style={d(delay + 500)}
        className="absolute -right-0.5 h-3 w-2.5 text-brand-500 opacity-0 transition-opacity duration-300 group-data-[visible=true]/reveal:opacity-100"
      >
        <path
          d="M1 1l7 5-7 5"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

function FlowY({ delay }: { delay: number }) {
  return (
    <div
      className="relative mx-auto flex h-10 w-3 justify-center"
      aria-hidden="true"
    >
      <span
        style={d(delay)}
        className="ba-flow-y h-full w-[2px] origin-top scale-y-0 transition-transform duration-500 ease-out group-data-[visible=true]/reveal:scale-y-100"
      />
      <svg
        viewBox="0 0 12 10"
        className="absolute -bottom-1 h-2.5 w-3 text-brand-500"
      >
        <path
          d="M1 1l5 7 5-7"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

/** 中央: 月額で任せる専門家 */
/** 中央: セキュプロ(情報セキュリティのプロ人材) */
const proKinds: { label: string; icon: ReactNode }[] = [
  {
    label: "社外CISO",
    icon: (
      <g
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="7.5" r="3.2" />
        <path d="M5.5 20c.8-3.6 3.3-5.6 6.5-5.6s5.7 2 6.5 5.6" />
        <path d="M12 14.4l-1.2 2.6L12 19l1.2-2z" />
      </g>
    ),
  },
  {
    label: "認証・SCSの専門家",
    icon: (
      <g
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="9" r="5" />
        <path d="M9.6 9l1.6 1.6 3.2-3.2" />
        <path d="M8.5 13.2L7 21l5-2.5 5 2.5-1.5-7.8" />
      </g>
    ),
  },
  {
    label: "診断エンジニア",
    icon: (
      <g
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="3" y="4" width="18" height="12" />
        <path d="M8 20h8M12 16v4" />
        <circle cx="11" cy="10" r="2.6" />
        <path d="M13 12l2.2 2.2" />
      </g>
    ),
  },
];

function Hub({ compact, delay }: { compact?: boolean; delay: number }) {
  return (
    <div
      style={d(delay)}
      className={`relative flex scale-95 flex-col overflow-hidden bg-brand-500 text-white opacity-0 transition-all duration-700 group-data-[visible=true]/reveal:scale-100 group-data-[visible=true]/reveal:opacity-100 ${
        compact ? "px-5 py-5" : "h-full justify-center px-5 py-7 text-center"
      }`}
    >
      {/* うすい格子 */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.08] [background-image:linear-gradient(#fff_1px,transparent_1px),linear-gradient(90deg,#fff_1px,transparent_1px)] [background-size:22px_22px]"
      />
      <p className="relative mx-auto w-fit border border-white/70 px-3 py-1 text-xs font-black tracking-[0.16em]">
        セキュプロ
      </p>
      <p
        className={`relative mt-3 font-black leading-snug ${compact ? "text-center text-lg" : "text-lg"}`}
      >
        情報セキュリティの
        <br />
        プロ人材
      </p>
      <ul
        className={`relative mt-4 grid gap-2 ${compact ? "grid-cols-3" : ""}`}
      >
        {proKinds.map((k, i) => (
          <li
            key={k.label}
            className={`flex items-center gap-2 bg-white/10 px-2.5 py-2 text-left text-[12px] font-bold leading-tight ${
              compact ? "flex-col text-center" : ""
            }`}
          >
            <span
              className="hv-cycle-bg grid h-8 w-8 shrink-0 place-items-center bg-white text-brand-500"
              style={{ animationDelay: `${i * 1.6}s` }}
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
                {k.icon}
              </svg>
            </span>
            {k.label}
          </li>
        ))}
      </ul>
      <p className="relative mt-4 border-t border-white/25 pt-3 text-xs leading-relaxed text-white/90">
        課題に合わせて、
        {compact ? null : <br />}
        必要なプロが対応します
      </p>
    </div>
  );
}

function Label({
  en,
  ja,
  accent,
}: {
  en: string;
  ja: string;
  accent?: boolean;
}) {
  return (
    <p className="flex items-baseline gap-2">
      <span
        className={`text-[11px] font-black tracking-[0.2em] ${accent ? "text-brand-500" : "text-ink/40"}`}
      >
        {en}
      </span>
      <span
        className={`text-sm font-bold ${accent ? "text-brand-500" : "text-ink/60"}`}
      >
        {ja}
      </span>
    </p>
  );
}

function BeforeCard({
  r,
  i,
  mobile,
}: {
  r: (typeof rows)[number];
  i: number;
  mobile?: boolean;
}) {
  return (
    <li
      style={d(i * 120)}
      className={`flex items-center gap-3 rounded-md border border-[#E6DFE1] bg-white opacity-0 transition-all duration-700 ${show} ${
        mobile ? "-translate-x-4 px-3 py-2.5" : "h-[6.5rem] -translate-x-6 px-5"
      }`}
    >
      <span className="w-5 shrink-0 text-xs font-black text-ink/30">
        {String(i + 1).padStart(2, "0")}
      </span>
      <r.Icon
        className={`shrink-0 opacity-70 grayscale ${mobile ? "h-10 w-12" : "hidden h-14 w-16 lg:block"}`}
      />
      <span className="text-[14px] font-bold leading-snug text-ink/70 [word-break:auto-phrase] md:text-base">
        {r.before}
      </span>
    </li>
  );
}

function AfterCard({
  r,
  i,
  base,
  mobile,
}: {
  r: (typeof rows)[number];
  i: number;
  base: number;
  mobile?: boolean;
}) {
  return (
    <li
      style={d(base + i * 120)}
      className={`relative flex items-center gap-3 overflow-hidden rounded-md bg-white opacity-0 shadow-[0_10px_30px_-18px_rgba(122,31,61,0.55)] ring-1 ring-brand-500/25 transition-all duration-700 ${show} ${
        mobile
          ? "translate-x-4 py-3 pl-4 pr-3"
          : "h-[6.5rem] translate-x-6 pl-6 pr-5"
      }`}
    >
      <span
        aria-hidden="true"
        className="absolute inset-y-0 left-0 w-1 bg-brand-500"
      />
      <Check delay={base + i * 120 + 300} />
      <span className="text-[14px] font-black leading-snug text-ink md:text-base">
        {r.after[0]}
        <span className="text-brand-500 md:block">{r.after[1]}</span>
      </span>
    </li>
  );
}

export function CisoBeforeAfter() {
  return (
    <Reveal variant="none">
      <div
        role="group"
        aria-label="セキュプロの情報セキュリティのプロ人材が対応すると、課題がどう変わるか"
      >
        {/* ===== PC ===== */}
        <div className="hidden grid-cols-[1fr_3.5rem_12rem_3.5rem_1fr] gap-x-3 md:grid lg:grid-cols-[1fr_4.5rem_13rem_4.5rem_1fr]">
          <div className="pb-3">
            <Label en="BEFORE" ja="いまの御社" />
          </div>
          <span />
          <span />
          <span />
          <div className="pb-3">
            <Label en="AFTER" ja="導入後の御社" accent />
          </div>

          <ul className="space-y-3">
            {rows.map((r, i) => (
              <BeforeCard key={r.before} r={r} i={i} />
            ))}
          </ul>
          <div className="grid grid-rows-3 gap-3">
            {rows.map((r, i) => (
              <FlowX key={r.before} delay={400 + i * 120} />
            ))}
          </div>
          <Hub delay={300} />
          <div className="grid grid-rows-3 gap-3">
            {rows.map((r, i) => (
              <FlowX key={r.before} delay={1000 + i * 120} />
            ))}
          </div>
          <ul className="space-y-3">
            {rows.map((r, i) => (
              <AfterCard key={r.before} r={r} i={i} base={1300} />
            ))}
          </ul>
        </div>

        {/* ===== スマホ ===== */}
        <div className="md:hidden">
          <Label en="BEFORE" ja="いまの御社" />
          <ul className="mt-2 space-y-2">
            {rows.map((r, i) => (
              <BeforeCard key={r.before} r={r} i={i} mobile />
            ))}
          </ul>
          <div className="py-2">
            <FlowY delay={400} />
          </div>
          <Hub compact delay={600} />
          <div className="py-2">
            <FlowY delay={900} />
          </div>
          <Label en="AFTER" ja="導入後の御社" accent />
          <ul className="mt-2 space-y-2">
            {rows.map((r, i) => (
              <AfterCard key={r.before} r={r} i={i} base={1100} mobile />
            ))}
          </ul>
        </div>
      </div>
    </Reveal>
  );
}
