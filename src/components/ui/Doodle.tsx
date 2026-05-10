import { cn } from "@/lib/cn";

type DoodleProps = {
  className?: string;
};

/** 手書き風の波線 */
export function Squiggle({ className }: DoodleProps) {
  return (
    <svg
      viewBox="0 0 120 16"
      preserveAspectRatio="none"
      className={cn("inline-block text-brand-500", className)}
      aria-hidden="true"
    >
      <path
        d="M2 8 Q 15 1 30 8 T 60 8 T 90 8 T 118 8"
        stroke="currentColor"
        strokeWidth="2.5"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** 手書き風の星 */
export function Sparkle({ className }: DoodleProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={cn("inline-block text-brand-500", className)}
      aria-hidden="true"
    >
      <path
        d="M12 2 L13.5 9.5 L21 11 L13.5 12.5 L12 21 L10.5 12.5 L3 11 L10.5 9.5 Z"
        fill="currentColor"
      />
    </svg>
  );
}

/** 手書き風の点（小さい4つの点） */
export function DotsDecoration({ className }: DoodleProps) {
  return (
    <svg
      viewBox="0 0 40 40"
      className={cn("inline-block text-brand-500", className)}
      aria-hidden="true"
    >
      <circle cx="6" cy="6" r="3" fill="currentColor" />
      <circle cx="20" cy="20" r="2.5" fill="currentColor" opacity="0.6" />
      <circle cx="34" cy="10" r="2" fill="currentColor" opacity="0.4" />
      <circle cx="14" cy="32" r="2" fill="currentColor" opacity="0.5" />
      <circle cx="32" cy="32" r="2.8" fill="currentColor" opacity="0.7" />
    </svg>
  );
}

/** 手書き風の波形セクション仕切り（top/bottom 用） */
type WaveProps = {
  className?: string;
  /** 波の色（背景にしたい色） */
  fill?: string;
  /** 上下どちら向きか */
  flip?: boolean;
};

export function WaveDivider({
  className,
  fill = "#fdf8f1",
  flip = false,
}: WaveProps) {
  return (
    <div
      className={cn("relative h-12 w-full overflow-hidden", className)}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1200 60"
        preserveAspectRatio="none"
        className={cn("absolute inset-0 h-full w-full", flip && "rotate-180")}
      >
        <path
          d="M0,30 C150,55 300,5 600,30 C900,55 1050,5 1200,30 L1200,60 L0,60 Z"
          fill={fill}
        />
      </svg>
    </div>
  );
}

/** 手書き風の丸 (アンダーラインの代わりに見出しを囲む) */
export function CircleScribble({ className }: DoodleProps) {
  return (
    <svg
      viewBox="0 0 200 80"
      preserveAspectRatio="none"
      className={cn("text-brand-500", className)}
      aria-hidden="true"
    >
      <path
        d="M100 8
           C 50 8, 12 22, 12 40
           C 12 60, 55 72, 105 72
           C 160 72, 190 58, 188 38
           C 186 18, 145 8, 100 8 Z"
        stroke="currentColor"
        strokeWidth="2.5"
        fill="none"
        strokeLinecap="round"
        strokeDasharray="0"
      />
    </svg>
  );
}

/** ふきだし風のアクセント */
export function Bubble({
  className,
  children,
}: DoodleProps & { children: React.ReactNode }) {
  return (
    <span
      className={cn(
        "relative inline-block rounded-full bg-brand-500 px-4 py-2 text-sm font-extrabold text-white",
        className,
      )}
    >
      {children}
      <span
        aria-hidden="true"
        className="absolute -bottom-1.5 left-6 h-3 w-3 rotate-45 bg-brand-500"
      />
    </span>
  );
}
