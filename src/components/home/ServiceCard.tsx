"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/cn";
import { localePath } from "@/i18n/path";
import type { Locale } from "@/i18n/config";
import type { Service } from "@/lib/site";

type Props = {
  service: Service;
  locale: Locale;
};

/**
 * トップページのサービスカード。
 * - PC: カーソル位置を追う光(スポットライト)、番号の塗り、アイコン回転、下線の伸長
 * - スマホ: hoverが効かないため、画面中央付近に来たらIntersectionObserverで
 *   data-active=true を付与し、同じ見た目を自動で再生する
 */
export function ServiceCard({ service: s, locale }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!window.matchMedia("(max-width: 767px)").matches) return;

    const observer = new IntersectionObserver(
      ([entry]) => setActive(entry.isIntersecting),
      { rootMargin: "-35% 0px -35% 0px", threshold: 0 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--x", `${e.clientX - rect.left}px`);
    el.style.setProperty("--y", `${e.clientY - rect.top}px`);
  };

  // 見た目の切り替えは hover(PC) と data-active(スマホ) の両方に同じクラスを指定している。
  // Tailwindはソース上の文字列からクラスを生成するため、動的に組み立てず列挙する。

  const content = (
    <>
      {/* 背景写真: hover時にうっすら浮かぶ */}
      {s.image ? (
        <Image
          src={s.image}
          alt=""
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className={cn(
            "absolute inset-0 -z-20 scale-110 object-cover opacity-0 transition-all duration-1000 ease-expo",
            "group-hover/card:opacity-[0.12] group-data-[active=true]/card:opacity-[0.12] group-hover/card:scale-100 group-data-[active=true]/card:scale-100",
          )}
        />
      ) : null}
      {/* カーソルを追うスポットライト */}
      <div
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute inset-0 -z-10 opacity-0 transition-opacity duration-500",
          "group-hover/card:opacity-100 group-data-[active=true]/card:opacity-100",
        )}
        style={{
          background:
            "radial-gradient(420px circle at var(--x, 50%) var(--y, 30%), rgba(122,30,53,0.13), transparent 65%)",
        }}
      />

      <div className="flex items-start justify-between">
        <span
          className={cn(
            "font-display text-6xl font-black leading-none text-transparent [-webkit-text-stroke:1.5px_#7A1E35] transition-all duration-500 md:text-7xl",
            "group-hover/card:[-webkit-text-stroke:0px] group-data-[active=true]/card:[-webkit-text-stroke:0px] group-hover/card:[color:#7A1E35] group-data-[active=true]/card:[color:#7A1E35]",
          )}
        >
          {s.number}
        </span>
        <span
          className={cn(
            "grid h-14 w-14 place-items-center rounded-full border border-brand-500/30 text-brand-500 transition-all duration-700 ease-expo",
            "group-hover/card:rotate-[360deg] group-data-[active=true]/card:rotate-[360deg] group-hover/card:border-brand-500 group-data-[active=true]/card:border-brand-500 group-hover/card:bg-brand-500 group-data-[active=true]/card:bg-brand-500 group-hover/card:text-white group-data-[active=true]/card:text-white",
          )}
        >
          <ServiceIcon name={s.icon} />
        </span>
      </div>

      <p className="mt-10 text-[11px] font-bold uppercase tracking-[0.2em] text-brand-500">
        {s.subtitle}
      </p>
      <h3 className="mt-2 text-xl font-black leading-tight text-ink md:text-2xl">{s.title}</h3>
      <p className="mt-4 text-sm font-medium leading-relaxed text-ink-soft">{s.summary}</p>

      {/* 下辺のアクセントライン */}
      <span
        aria-hidden="true"
        className={cn(
          "absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 bg-gradient-to-r from-brand-700 via-brand-500 to-brand-300 transition-transform duration-700 ease-expo",
          "group-hover/card:scale-x-100 group-data-[active=true]/card:scale-x-100",
        )}
      />
    </>
  );

  const cardClass = cn(
    "relative isolate flex h-full flex-col overflow-hidden border border-ink/10 bg-white/80 p-8 backdrop-blur-sm transition-all duration-500 ease-expo md:p-10",
    "group-hover/card:-translate-y-2 group-data-[active=true]/card:-translate-y-2 group-hover/card:border-brand-500/30 group-data-[active=true]/card:border-brand-500/30 group-hover/card:shadow-[0_30px_60px_-25px_rgba(29,5,11,0.35)] group-data-[active=true]/card:shadow-[0_30px_60px_-25px_rgba(29,5,11,0.35)]",
  );

  return (
    <div
      ref={ref}
      data-active={active}
      onMouseMove={onMouseMove}
      className="group/card h-full"
    >
      {s.href ? (
        <Link href={localePath(s.href, locale)} className={cardClass}>
          {content}
        </Link>
      ) : (
        <div className={cardClass}>{content}</div>
      )}
    </div>
  );
}

function ServiceIcon({ name }: { name?: Service["icon"] }) {
  const common = {
    width: 24,
    height: 24,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.7,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };
  if (name === "shield") {
    return (
      <svg {...common}>
        <path d="M12 3l7.5 3v5.5c0 4.6-3.2 8.3-7.5 9.5-4.3-1.2-7.5-4.9-7.5-9.5V6L12 3z" />
        <path d="M8.75 12.25l2.25 2.25 4.25-4.5" />
      </svg>
    );
  }
  return (
    <svg {...common}>
      <circle cx="12" cy="12" r="8.5" />
      <circle cx="12" cy="12" r="4.5" />
      <circle cx="12" cy="12" r="0.75" fill="currentColor" />
      <path d="M17.5 6.5L21 3M18 3h3v3" />
    </svg>
  );
}
