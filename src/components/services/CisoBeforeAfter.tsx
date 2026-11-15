import type { ComponentType, CSSProperties } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { IconChecksheet, IconShadowAi, IconSoloIt } from "./FlatIcons";

/**
 * Bond AI セキュリティ LP: 月額で CISO / セキュリティ顧問に任せると、何が変わるかを示す図。
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
    before: "セキュリティの専任者がいない",
    after: ["責任者が決まり、", "体制が整う"],
  },
  {
    Icon: IconShadowAi,
    before: "AIの使い方にルールがない",
    after: ["AIを安全に使える", "ルールが浸透"],
  },
  {
    Icon: IconChecksheet,
    before: "取引先・審査に説明できない",
    after: ["取引先・審査に", "説明できる"],
  },
];

const show =
  "group-data-[visible=true]/reveal:translate-x-0 group-data-[visible=true]/reveal:opacity-100";
const d = (ms: number): CSSProperties => ({ transitionDelay: `${ms}ms` });

function Shield({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M12 2.5l8 3v6c0 5-3.4 8.6-8 10-4.6-1.4-8-5-8-10v-6z"
        fill="currentColor"
      />
      <path
        d="M8.2 12l2.6 2.6 5-5"
        stroke="#fff"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

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
function Hub({ compact, delay }: { compact?: boolean; delay: number }) {
  return (
    <div
      style={d(delay)}
      className={`relative overflow-hidden bg-brand-500 text-white opacity-0 transition-all duration-700 group-data-[visible=true]/reveal:scale-100 group-data-[visible=true]/reveal:opacity-100 ${
        compact
          ? "flex scale-95 items-center gap-4 rounded-md px-5 py-4"
          : "flex h-full scale-95 flex-col items-center justify-center rounded-md px-5 py-8 text-center"
      }`}
    >
      {/* うすい格子 */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.08] [background-image:linear-gradient(#fff_1px,transparent_1px),linear-gradient(90deg,#fff_1px,transparent_1px)] [background-size:22px_22px]"
      />
      <span
        className={`relative grid shrink-0 place-items-center ${compact ? "h-12 w-12" : "h-16 w-16"}`}
      >
        <span
          aria-hidden="true"
          className="ba-pulse absolute inset-0 rounded-full border border-white/60"
        />
        <span className="grid h-full w-full place-items-center rounded-full bg-white text-brand-500">
          <Shield className={compact ? "h-6 w-6" : "h-8 w-8"} />
        </span>
      </span>
      <div className={`relative ${compact ? "" : "mt-4"}`}>
        <p className="text-[11px] font-bold tracking-[0.14em] text-white/75">
          月額で任せる
        </p>
        <p
          className={`mt-1 font-black leading-snug ${compact ? "text-base" : "text-lg"}`}
        >
          CISO／
          {compact ? null : <br />}
          セキュリティ顧問
        </p>
        {compact ? null : (
          <p className="mt-3 border-t border-white/25 pt-3 text-xs leading-relaxed text-white/85">
            資格を持つ専門家が
            <br />
            担当につきます
          </p>
        )}
      </div>
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
        mobile ? "-translate-x-4 px-3 py-2.5" : "h-[5.5rem] -translate-x-6 px-4"
      }`}
    >
      <span className="w-5 shrink-0 text-xs font-black text-ink/30">
        {String(i + 1).padStart(2, "0")}
      </span>
      <r.Icon
        className={`shrink-0 opacity-70 grayscale ${mobile ? "h-10 w-12" : "hidden h-14 w-16 lg:block"}`}
      />
      <span className="text-[14px] font-bold leading-snug text-ink/65 [word-break:auto-phrase] md:text-[15px]">
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
          : "h-[5.5rem] translate-x-6 pl-5 pr-4"
      }`}
    >
      <span
        aria-hidden="true"
        className="absolute inset-y-0 left-0 w-1 bg-brand-500"
      />
      <Check delay={base + i * 120 + 300} />
      <span className="text-[14px] font-black leading-snug text-ink md:text-[15px]">
        {r.after[0]}
        <span className="text-brand-500">{r.after[1]}</span>
      </span>
    </li>
  );
}

export function CisoBeforeAfter() {
  return (
    <Reveal variant="none">
      <div
        role="group"
        aria-label="月額でCISO・セキュリティ顧問に任せると、課題がどう変わるか"
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
