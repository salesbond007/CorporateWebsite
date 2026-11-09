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
 * PCは画面右下に浮遊する丸いボタン、スマホは画面下の左側に大きめの横長ボタン。
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
        "group fixed z-40 transition-all duration-500",
        // スマホ: 画面下の左側に大きめの横長ボタン
        "bottom-5 left-4",
        // PC: 画面右下に浮遊する丸いボタン(トップへ戻るボタンの上)
        "md:bottom-20 md:left-auto md:right-6",
        hidden && "pointer-events-none translate-y-6 opacity-0",
      )}
    >
      <span className="relative block animate-float-y">
        {/* 波紋 */}
        <span
          aria-hidden="true"
          className="absolute inset-0 hidden animate-pulse-ring rounded-full bg-brand-500/40 md:block"
        />
        <span className="relative flex items-center gap-2 rounded-full bg-brand-500 px-6 py-3.5 text-white shadow-[0_16px_36px_-12px_rgba(122,30,53,0.85)] ring-4 ring-white transition-colors group-hover:bg-brand-600 md:h-28 md:w-28 md:flex-col md:justify-center md:gap-1 md:px-0 md:py-0">
          <svg
            width="22"
            height="22"
            viewBox="0 0 18 18"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M3 4.5A1.5 1.5 0 0 1 4.5 3h9A1.5 1.5 0 0 1 15 4.5v6a1.5 1.5 0 0 1-1.5 1.5H8l-3.5 3v-3h0A1.5 1.5 0 0 1 3 10.5v-6Z"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
          </svg>
          <span className="text-base font-black tracking-[0.1em] md:text-lg md:leading-tight">
            {label}
          </span>
          <span aria-hidden="true" className="text-xs md:hidden">
            ↓
          </span>
        </span>
      </span>
    </a>
  );
}
