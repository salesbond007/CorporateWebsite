"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * セキュプロ LP ファーストビュー右側:「よくあるお悩み」のアニメーション図。
 * 表示時に上から順にカードが浮き上がり、チェックが線を描くように付き、締めの一文が出る。
 * その後は1枚ずつ順番にハイライトする(画面外にある間は止める)。
 * 動きを減らす設定の端末では、アニメーションなしで全部を表示する。
 * カードはリンクではない装飾。
 */

const sw = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

const worries: { text: string; icon: ReactNode }[] = [
  {
    text: "何から対策すれば良いか分からない",
    icon: (
      <g {...sw}>
        <circle cx="12" cy="12" r="8.5" />
        <path d="M9.6 9.6a2.5 2.5 0 0 1 4.8.9c0 1.7-2.4 2.1-2.4 3.7" />
        <circle cx="12" cy="17" r="0.6" fill="currentColor" />
      </g>
    ),
  },
  {
    text: "取引先からチェックシートや認証を求められた",
    icon: (
      <g {...sw}>
        <rect x="5" y="4.5" width="14" height="16.5" />
        <path d="M9 3h6v3H9z" />
        <path d="M8 11l1.4 1.4L12 10M8 16l1.4 1.4L12 15M14 11.5h2.5M14 16.5h2.5" />
      </g>
    ),
  },
  {
    text: "任せられる責任者がいない",
    icon: (
      <g {...sw}>
        <circle cx="12" cy="7.5" r="3.4" />
        <path d="M5 21c.8-4 3.5-6.2 7-6.2s6.2 2.2 7 6.2" />
      </g>
    ),
  },
  {
    text: "生成AIの社内ルールが決まっていない",
    icon: (
      <g {...sw}>
        <rect x="6" y="6" width="12" height="12" />
        <path d="M9 3v3M15 3v3M9 18v3M15 18v3M3 9h3M3 15h3M18 9h3M18 15h3" />
        <path d="M9.2 14.5l1.6-5h.4l1.6 5M9.7 13h2.6M14.8 9.5v5" />
      </g>
    ),
  },
  {
    text: "専任者を雇うほどの業務量はない",
    icon: (
      <g {...sw}>
        <rect x="5" y="3.5" width="10" height="17.5" />
        <path d="M15 9h4v12h-4M3 21h18" />
        <path d="M8 7h1.5M10.5 7H12M8 10.5h1.5M10.5 10.5H12M8 14h1.5M10.5 14H12" />
        <path d="M9 21v-3h2v3" />
      </g>
    ),
  },
];

const STEP = 150; // カードごとのずれ(ms)
const DUR = 400; // 1枚の表示時間(ms)
const CLOSING = STEP * (worries.length - 1) + DUR + 400; // 締めの一文
const LOOP_START = CLOSING + 900;
const LOOP_MS = 2500;

export function CisoHeroWorries() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [reduced, setReduced] = useState(false);
  const [shown, setShown] = useState(false);
  const [inView, setInView] = useState(false);
  const [ready, setReady] = useState(false); // 最初の表示が終わったか
  const [active, setActive] = useState(-1);

  // 動きを減らす設定
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    if (mq.matches) setShown(true);
  }, []);

  // 画面に入っているか
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        setInView(e.isIntersecting);
        if (e.isIntersecting) setShown(true);
      },
      { threshold: 0.2 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // 最初の表示が終わったらループを始められる
  useEffect(() => {
    if (!shown || reduced) return;
    const t = window.setTimeout(() => setReady(true), LOOP_START);
    return () => window.clearTimeout(t);
  }, [shown, reduced]);

  // ループ(画面外では止める)
  useEffect(() => {
    if (!ready || !inView || reduced) return;
    setActive((v) => (v < 0 ? 0 : v));
    const t = window.setInterval(
      () => setActive((v) => (v + 1) % worries.length),
      LOOP_MS,
    );
    return () => window.clearInterval(t);
  }, [ready, inView, reduced]);

  const anim = !reduced;

  return (
    <div ref={ref} className="mx-auto w-full max-w-[24rem]">
      <p className="text-center text-[15px] font-black text-ink md:text-base">
        こんなお悩みはありませんか？
      </p>
      <ul className="mt-4 space-y-2.5">
        {worries.map((w, i) => {
          const on = i === active;
          const delay = i * STEP;
          return (
            <li
              key={w.text}
              className={`flex items-center gap-3 rounded-xl border px-3.5 py-3 transition-[opacity,transform,background-color,border-color,color] ease-out sm:gap-3.5 sm:px-4 ${
                on
                  ? "scale-[1.03] border-brand-500 bg-brand-500 text-white shadow-[0_12px_24px_-14px_rgba(122,31,61,0.9)]"
                  : "border-[#EADCE1] bg-white text-ink shadow-[0_6px_16px_-12px_rgba(122,31,61,0.45)]"
              } ${
                anim && !shown
                  ? "translate-y-2 opacity-0"
                  : "translate-y-0 opacity-100"
              }`}
              style={{
                transitionDuration: ready ? "500ms" : `${DUR}ms`,
                transitionDelay: ready || !anim ? "0ms" : `${delay}ms`,
              }}
            >
              <span className="relative shrink-0">
                <span
                  className={`grid h-9 w-9 place-items-center rounded-full transition-colors duration-500 sm:h-10 sm:w-10 ${
                    on ? "bg-white text-brand-500" : "bg-brand-500 text-white"
                  }`}
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="h-5 w-5 sm:h-[22px] sm:w-[22px]"
                    aria-hidden="true"
                  >
                    {w.icon}
                  </svg>
                </span>
                {/* チェック(線を描くように表示) */}
                <span
                  aria-hidden="true"
                  className={`absolute -bottom-1 -right-1.5 grid h-[18px] w-[18px] place-items-center rounded-full border-2 transition-colors duration-500 ${
                    on
                      ? "border-brand-500 bg-white text-brand-500"
                      : "border-white bg-[#F3DCE3] text-brand-500"
                  }`}
                >
                  <svg viewBox="0 0 16 16" className="h-2.5 w-2.5" fill="none">
                    <path
                      d="M3 8.5l3 3 7-7"
                      stroke="currentColor"
                      strokeWidth="2.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      pathLength={1}
                      strokeDasharray="1"
                      style={{
                        strokeDashoffset: anim && !shown ? 1 : 0,
                        transition: anim
                          ? `stroke-dashoffset 350ms ease-out ${delay + DUR}ms`
                          : undefined,
                      }}
                    />
                  </svg>
                </span>
              </span>
              <span className="whitespace-nowrap text-[clamp(10px,3.15vw,15px)] font-bold leading-snug sm:text-[14px] md:text-[12px] lg:text-[15px]">
                {w.text}
              </span>
            </li>
          );
        })}
      </ul>
      <p
        className={`mt-4 text-center text-[14px] font-black text-brand-500 transition-opacity duration-500 md:text-[15px] ${
          anim && !shown ? "opacity-0" : "opacity-100"
        }`}
        style={{ transitionDelay: anim ? `${CLOSING}ms` : "0ms" }}
      >
        どのお悩みも、セキュプロにご相談いただけます
      </p>
    </div>
  );
}
