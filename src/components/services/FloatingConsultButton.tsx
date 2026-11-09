"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";

type Props = {
  /** 移動先の要素ID(ページ内のフォーム) */
  targetId: string;
  label?: string;
};

/**
 * 常に表示する「無料相談」ボタン。押すとページ内のフォームへスクロールする。
 * PCは画面右端の縦タブ、スマホは画面下の左側に横長の小さなボタン。
 * フォームが画面内に見えている間は邪魔にならないよう隠す。
 */
export function FloatingConsultButton({ targetId, label = "無料相談" }: Props) {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const el = document.getElementById(targetId);
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setHidden(entry.isIntersecting),
      { threshold: 0, rootMargin: "0px 0px -35% 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [targetId]);

  return (
    <a
      href={`#${targetId}`}
      aria-label={`${label}(ページ下部のフォームへ移動)`}
      className={cn(
        "group fixed z-40 flex items-center text-white transition-all duration-300",
        "bottom-5 left-4 gap-2 rounded-full bg-brand-500 px-5 py-3 shadow-[0_12px_30px_-10px_rgba(122,30,53,0.8)]",
        "md:bottom-auto md:left-auto md:right-0 md:top-1/2 md:-translate-y-1/2 md:flex-col md:rounded-none md:rounded-l-xl md:px-3 md:py-6 md:hover:bg-brand-600 md:hover:pr-4",
        hidden &&
          "pointer-events-none opacity-0 max-md:translate-y-4 md:translate-x-full",
      )}
    >
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
        <path
          d="M3 4.5A1.5 1.5 0 0 1 4.5 3h9A1.5 1.5 0 0 1 15 4.5v6a1.5 1.5 0 0 1-1.5 1.5H8l-3.5 3v-3h0A1.5 1.5 0 0 1 3 10.5v-6Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
      </svg>
      <span className="text-sm font-black tracking-[0.15em] md:text-base md:tracking-[0.25em] md:[writing-mode:vertical-rl]">
        {label}
      </span>
      <span
        aria-hidden="true"
        className="text-xs transition-transform duration-300 group-hover:translate-y-0.5"
      >
        ↓
      </span>
    </a>
  );
}
