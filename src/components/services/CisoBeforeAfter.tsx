import type { ComponentType } from "react";
import { IconChecksheet, IconShadowAi, IconSoloIt } from "./FlatIcons";

/**
 * Bond AI セキュリティ LP: 月額で CISO / セキュリティ顧問に任せると、何が変わるかを示す図。
 * 写真は使わず、お悩み欄と同じイラスト + 矢印 + テキストで、
 * 「いまの課題」→「導入後」を1行ずつ対応させて見せる。
 */

const rows: {
  Icon: ComponentType<{ className?: string }>;
  before: string;
  after: string;
}[] = [
  {
    Icon: IconSoloIt,
    before: "セキュリティの専任者がいない",
    after: "責任者が決まり、体制が整う",
  },
  {
    Icon: IconShadowAi,
    before: "AIの使い方にルールがない",
    after: "AIを安全に使えるルールが浸透",
  },
  {
    Icon: IconChecksheet,
    before: "取引先・審査に説明できない",
    after: "取引先・審査に説明できる",
  },
];

function Mark({ className }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={`grid place-items-center rounded-lg bg-white text-brand-500 ${className ?? ""}`}
    >
      <svg viewBox="0 0 24 24" className="h-[55%] w-[55%]" fill="none">
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
    </span>
  );
}

function ArrowRight() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-6 w-6 shrink-0 text-brand-500"
      fill="none"
    >
      <path
        d="M4 12h14M13 6l6 6-6 6"
        stroke="currentColor"
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CheckBadge() {
  return (
    <span
      aria-hidden="true"
      className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-brand-500 text-white"
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

function CrossBadge() {
  return (
    <span
      aria-hidden="true"
      className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-[#8A8185] text-white"
    >
      <svg viewBox="0 0 16 16" className="h-3 w-3" fill="none">
        <path
          d="M4 4l8 8M12 4l-8 8"
          stroke="currentColor"
          strokeWidth="2.4"
          strokeLinecap="round"
        />
      </svg>
    </span>
  );
}

/** 中央の「月額で任せる」帯 */
function Bridge({ vertical }: { vertical?: boolean }) {
  return (
    <div
      className={
        vertical
          ? "flex h-full flex-col items-center justify-center gap-3 rounded-lg bg-brand-500 px-4 py-6 text-center text-white"
          : "flex items-center gap-3 rounded-lg bg-brand-500 px-4 py-3.5 text-white"
      }
    >
      <Mark className={vertical ? "h-14 w-14" : "h-11 w-11 shrink-0"} />
      <div className={vertical ? "" : "min-w-0"}>
        <p className="text-[11px] font-bold tracking-[0.08em] text-white/80">
          月額で任せる
        </p>
        <p className="mt-0.5 text-[15px] font-black leading-snug md:text-base">
          CISO／
          <br className={vertical ? "" : "hidden"} />
          セキュリティ顧問
        </p>
        <p
          className={`mt-1.5 text-xs leading-relaxed text-white/85 ${vertical ? "" : "hidden"}`}
        >
          資格を持つ専門家が
          <br />
          担当につきます
        </p>
      </div>
    </div>
  );
}

export function CisoBeforeAfter() {
  return (
    <div
      role="group"
      aria-label="月額でCISO・セキュリティ顧問に任せると、課題がどう変わるか"
    >
      {/* ===== PC: 左右で1行ずつ対応させる ===== */}
      <div className="hidden grid-cols-[1fr_auto_11rem_auto_1fr] items-stretch gap-x-3 md:grid">
        {/* 見出し行 */}
        <p className="pb-3 text-center text-sm font-bold tracking-[0.06em] text-ink/60">
          いまの御社
        </p>
        <span />
        <span />
        <span />
        <p className="pb-3 text-center text-sm font-bold tracking-[0.06em] text-brand-500">
          導入後の御社
        </p>

        {/* 左: 課題 */}
        <ul className="row-span-1 space-y-3">
          {rows.map((r) => (
            <li
              key={r.before}
              className="flex h-[5.5rem] items-center gap-3 rounded-lg bg-[#F1EFEC] px-4"
            >
              <r.Icon className="h-16 w-20 shrink-0" />
              <span className="text-[15px] font-bold leading-snug text-ink/80 [word-break:auto-phrase]">
                {r.before}
              </span>
            </li>
          ))}
        </ul>
        <div className="flex flex-col justify-center">
          <ArrowRight />
        </div>
        <Bridge vertical />
        <div className="flex flex-col justify-center">
          <ArrowRight />
        </div>
        {/* 右: 導入後 */}
        <ul className="space-y-3">
          {rows.map((r) => (
            <li
              key={r.after}
              className="flex h-[5.5rem] items-center gap-3 rounded-lg border-2 border-brand-500 bg-white px-4"
            >
              <CheckBadge />
              <span className="text-[15px] font-black leading-snug text-brand-600 [word-break:auto-phrase]">
                {r.after}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* ===== スマホ: 縦に 課題 → 任せる → 導入後 ===== */}
      <div className="md:hidden">
        <p className="text-sm font-bold text-ink/60">いまの御社</p>
        <ul className="mt-2 space-y-2">
          {rows.map((r) => (
            <li
              key={r.before}
              className="flex items-center gap-3 rounded-lg bg-[#F1EFEC] px-3 py-2"
            >
              <r.Icon className="h-12 w-14 shrink-0" />
              <span className="text-[14px] font-bold leading-snug text-ink/80">
                {r.before}
              </span>
              <span className="ml-auto">
                <CrossBadge />
              </span>
            </li>
          ))}
        </ul>
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          className="mx-auto my-2 h-7 w-7 text-brand-500"
          fill="none"
        >
          <path
            d="M12 4v14M6 13l6 6 6-6"
            stroke="currentColor"
            strokeWidth="2.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <Bridge />
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          className="mx-auto my-2 h-7 w-7 text-brand-500"
          fill="none"
        >
          <path
            d="M12 4v14M6 13l6 6 6-6"
            stroke="currentColor"
            strokeWidth="2.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <p className="text-sm font-bold text-brand-500">導入後の御社</p>
        <ul className="mt-2 space-y-2">
          {rows.map((r) => (
            <li
              key={r.after}
              className="flex items-center gap-3 rounded-lg border-2 border-brand-500 bg-white px-3 py-3"
            >
              <CheckBadge />
              <span className="text-[14px] font-black leading-snug text-brand-600">
                {r.after}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
