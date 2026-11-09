"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  /** 表示する文字列。最初に現れる数値部分(例: "3,900" "35.1" "約7" "66.7%")だけをカウントアップする */
  value: string;
  /** アニメーション時間(ms) */
  duration?: number;
};

const NUM = /(\d[\d,]*(?:\.\d+)?)/;

/** 画面に入ったら 0 から目標値まで数字を増やして表示する。数値を含まない文字列はそのまま表示 */
export function CountUp({ value, duration = 1400 }: Props) {
  const match = value.match(NUM);
  const ref = useRef<HTMLSpanElement>(null);
  const [text, setText] = useState(value);

  useEffect(() => {
    if (!match) return;
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const raw = match[1];
    const target = Number(raw.replace(/,/g, ""));
    const decimals = raw.includes(".") ? raw.split(".")[1].length : 0;
    const comma = raw.includes(",");
    const [before, after] = [
      value.slice(0, match.index),
      value.slice((match.index ?? 0) + raw.length),
    ];
    const format = (n: number) => {
      const fixed = n.toFixed(decimals);
      return comma
        ? Number(fixed).toLocaleString("en-US", {
            minimumFractionDigits: decimals,
          })
        : fixed;
    };

    setText(`${before}${format(0)}${after}`);
    let frame = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / duration);
          const eased = 1 - Math.pow(1 - t, 3);
          setText(`${before}${format(target * eased)}${after}`);
          if (t < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, duration]);

  return (
    <span ref={ref} aria-label={value}>
      <span aria-hidden="true">{text}</span>
    </span>
  );
}
