import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/** チャネルのアイコン(線画) */
export function ChannelIcon({ id, size = 30 }: { id: string; size?: number }) {
  const p = {
    stroke: "currentColor",
    strokeWidth: 1.7,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    fill: "none",
  };
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
      {id === "tele" ? (
        <path
          {...p}
          d="M5 4h3l1.5 4-2 1.2a11 11 0 0 0 5.3 5.3L14 12.5l4 1.5v3a2 2 0 0 1-2 2A13 13 0 0 1 3 6a2 2 0 0 1 2-2Z"
        />
      ) : id === "form" ? (
        <g {...p}>
          <rect x="3" y="4" width="18" height="16" rx="2" />
          <path d="M3 8h18M7 12h10M7 15.5h6" />
        </g>
      ) : id === "mail" ? (
        <g {...p}>
          <rect x="3" y="5.5" width="18" height="13" rx="2" />
          <path d="m3.5 7 8.5 6 8.5-6" />
        </g>
      ) : id === "letter" ? (
        <g {...p}>
          <rect x="3" y="6" width="15" height="12" rx="1.5" />
          <path d="m3.5 7.5 7 5 7-5" />
          <path d="M21 3.5 15.5 9" />
          <path d="m20 3 1.5 1.5" />
        </g>
      ) : (
        <g {...p}>
          <path d="M4 5h16v11H9l-5 4V5Z" />
          <path d="M8 9.5h8M8 12.5h5" />
        </g>
      )}
    </svg>
  );
}

const CHANNEL_IDS = ["tele", "form", "mail", "letter", "sns"];

const iconProps = {
  width: 56,
  height: 56,
  viewBox: "0 0 48 48",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2.4,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

function TeamIcon() {
  return (
    <svg {...iconProps}>
      <circle cx="24" cy="15" r="6" />
      <path d="M13 37c0-6 5-11 11-11s11 5 11 11" />
      <circle cx="10" cy="20" r="4.5" />
      <path d="M3 37c0-4.5 3-8.3 7.5-8.6" />
      <circle cx="38" cy="20" r="4.5" />
      <path d="M45 37c0-4.5-3-8.3-7.5-8.6" />
    </svg>
  );
}

function BuildingsIcon() {
  return (
    <svg {...iconProps}>
      <path d="M7 42V19l11-4v27M18 42V8l15 5v29M33 42V22l9 3v17M3 42h42" />
      <path d="M23 17h2M28 17h2M23 23h2M28 23h2M23 29h2M28 29h2M11 24h3M11 30h3M11 36h3M37 30h2M37 36h2" />
    </svg>
  );
}

function MeetingIcon() {
  return (
    <svg {...iconProps}>
      <circle cx="11" cy="14" r="5" />
      <circle cx="37" cy="14" r="5" />
      <path d="M3 33c0-6 3.5-10.5 8-10.5 3.5 0 6 2 7.5 5.5M45 33c0-6-3.5-10.5-8-10.5-3.5 0-6 2-7.5 5.5" />
      <path d="M5 33h38M10 33v9M38 33v9" />
      <path d="M19 25.5l5 3 5-3" />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M3 10h18M8 3v4M16 3v4M9 15.5l2 2 4-4" />
    </svg>
  );
}

function Node({
  tone,
  icon,
  title,
  children,
}: {
  tone: "orange" | "white" | "navy";
  icon: ReactNode;
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col items-center text-center">
      <div
        className={cn(
          "grid h-28 w-28 place-items-center rounded-full md:h-32 md:w-32",
          tone === "orange" &&
            "bg-[#F26B1D] text-white shadow-[0_18px_40px_-18px_rgba(242,107,29,0.9)]",
          tone === "white" &&
            "bg-white text-[#F26B1D] shadow-[0_18px_40px_-24px_rgba(242,107,29,0.7)] ring-2 ring-[#F2E3D8]",
          tone === "navy" &&
            "bg-[#2F4358] text-white shadow-[0_18px_40px_-18px_rgba(47,67,88,0.8)]",
        )}
      >
        {icon}
      </div>
      <p className="mt-4 text-lg font-bold">{title}</p>
      <div className="mt-3 flex min-h-8 items-center">{children}</div>
    </div>
  );
}

function Badge({
  children,
  tone = "orange",
}: {
  children: ReactNode;
  tone?: "orange" | "navy";
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold",
        tone === "orange"
          ? "bg-[#FFF3EA] text-[#E05A0C]"
          : "bg-[#E8EDF2] text-[#2F4358]",
      )}
    >
      {children}
    </span>
  );
}

function Arrow({ label, strong }: { label: string; strong?: boolean }) {
  const line = strong
    ? { strokeWidth: 5 }
    : { strokeWidth: 3, strokeDasharray: "7 7" };
  return (
    <div className="flex flex-col items-center gap-2 py-1 text-[#F26B1D] lg:-mt-16">
      <span
        className={cn(
          "whitespace-nowrap rounded-full px-3 py-1 text-xs font-bold",
          strong ? "bg-[#F26B1D] text-white" : "bg-[#FFF3EA]",
        )}
      >
        {label}
      </span>
      {/* PC: 横向き */}
      <svg
        width="120"
        height="24"
        viewBox="0 0 120 24"
        fill="none"
        aria-hidden="true"
        className="hidden lg:block"
      >
        <path
          d="M4 12h100"
          stroke="currentColor"
          strokeLinecap="round"
          {...line}
        />
        <path
          d="M98 3l14 9-14 9"
          stroke="currentColor"
          strokeWidth={strong ? 5 : 3}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      {/* スマホ: 縦向き */}
      <svg
        width="24"
        height="56"
        viewBox="0 0 24 56"
        fill="none"
        aria-hidden="true"
        className="lg:hidden"
      >
        <path
          d="M12 4v38"
          stroke="currentColor"
          strokeLinecap="round"
          {...line}
        />
        <path
          d="M3 36l9 14 9-14"
          stroke="currentColor"
          strokeWidth={strong ? 5 : 3}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

/**
 * サービス概要の図:
 * アポコミが5チャネルでターゲット企業にアプローチ → アポイント(商談)を創出 → 御社へパス。
 */
export function ApokomiServiceDiagram() {
  return (
    <figure
      className="mx-auto max-w-5xl"
      aria-label="アポコミが5つのチャネルでターゲット企業にアプローチして商談を創出し、御社へ商談をパスする流れ"
    >
      <div className="grid items-center gap-3 lg:grid-cols-[1fr_auto_1fr_auto_1fr] lg:gap-2">
        <Node tone="orange" icon={<TeamIcon />} title="アポコミ">
          <ul className="flex gap-1.5" aria-label="5つのチャネル">
            {CHANNEL_IDS.map((id) => (
              <li
                key={id}
                className="grid h-8 w-8 place-items-center rounded-full bg-white text-[#F26B1D] ring-1 ring-[#F2E3D8]"
              >
                <ChannelIcon id={id} size={16} />
              </li>
            ))}
          </ul>
        </Node>
        <Arrow label="5チャネルでアプローチ" />
        <Node tone="white" icon={<BuildingsIcon />} title="ターゲット企業">
          <Badge>
            <CalendarIcon />
            アポイント獲得
          </Badge>
        </Node>
        <Arrow label="商談をパス" strong />
        <Node tone="navy" icon={<MeetingIcon />} title="御社">
          <Badge tone="navy">商談 → 受注</Badge>
        </Node>

        {/* 担当範囲 */}
        <div className="mt-6 flex items-center justify-center gap-3 rounded-full bg-[#F26B1D] px-5 py-3 text-xs font-bold sm:text-sm text-white lg:col-start-1 lg:col-end-4">
          <span className="shrink-0 whitespace-nowrap rounded-full bg-white px-2.5 py-0.5 text-xs text-[#E05A0C]">
            アポコミ
          </span>
          リスト作成 → アプローチ → アポイント獲得
        </div>
        <div className="flex items-center justify-center gap-3 rounded-full bg-[#2F4358] px-5 py-3 text-xs font-bold sm:text-sm text-white lg:col-start-5 lg:mt-6">
          <span className="shrink-0 whitespace-nowrap rounded-full bg-white px-2.5 py-0.5 text-xs text-[#2F4358]">
            御社
          </span>
          商談に集中
        </div>
      </div>
    </figure>
  );
}
