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
  className: string;
};

/**
 * スマホはhoverが効かないため、カードが画面中央付近に来たタイミングで
 * IntersectionObserverを使ってhover相当の見た目(active)を自動的に付与する。
 * PC/タブレットは従来どおりCSSのgroup-hoverに任せる。
 */
export function ServiceCard({ service: s, locale, className }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const mql = window.matchMedia("(max-width: 767px)");
    if (!mql.matches) return;

    const observer = new IntersectionObserver(
      ([entry]) => setActive(entry.isIntersecting),
      // 画面の縦方向、中央付近(上下40%を除いた帯)に入っている間だけactiveにする
      { rootMargin: "-40% 0px -40% 0px", threshold: 0 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const cardContent = (
    <>
      {/* hover(PC)またはactive(スマホ)で浮かび上がる背景写真 */}
      {s.image ? (
        <Image
          src={s.image}
          alt=""
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className={cn(
            "absolute inset-0 z-0 object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100",
            active && "opacity-100",
          )}
        />
      ) : null}
      {/* hover/active時のみのダークオーバーレイ(写真の上でテキストを読ませる) */}
      <div
        aria-hidden="true"
        className={cn(
          "absolute inset-0 z-0 bg-gradient-to-t from-ink/75 via-ink/50 to-ink/25 opacity-0 transition-opacity duration-500 group-hover:opacity-100",
          active && "opacity-100",
        )}
      />

      <div className="relative z-10 flex flex-col items-center text-center">
        {/* 高さを固定し、サブタイトルの折り返し数に関わらずタイトルの位置を揃える */}
        <div className="flex min-h-[2rem] items-end justify-center md:min-h-[2.25rem]">
          {s.subtitle ? (
            <p
              className={cn(
                "text-xs font-bold uppercase tracking-[0.1em] text-brand-600 transition-colors duration-300 group-hover:text-brand-200",
                active && "text-brand-200",
              )}
            >
              {s.subtitle}
            </p>
          ) : null}
        </div>
        <h3
          className={cn(
            "mt-2 text-2xl md:text-3xl font-black text-ink leading-tight transition-colors duration-300 group-hover:text-white",
            active && "text-white",
          )}
        >
          {s.title}
        </h3>
        <div
          className={cn(
            "mt-4 h-1 w-12 rounded-full bg-brand-500 transition-all duration-300 group-hover:w-20",
            active && "w-20",
          )}
          aria-hidden="true"
        />
        <p
          className={cn(
            "mt-5 text-sm leading-relaxed text-ink-soft font-medium transition-colors duration-300 group-hover:text-white/80",
            active && "text-white/80",
          )}
        >
          {s.summary}
        </p>

        {s.href ? (
          <span
            className={cn(
              "mt-6 inline-flex items-center gap-1.5 text-xs font-bold text-brand-600 transition-all duration-300 group-hover:gap-2.5 group-hover:text-brand-200",
              active && "gap-2.5 text-brand-200",
            )}
          >
            詳しく見る
            <span aria-hidden="true">→</span>
          </span>
        ) : null}
      </div>
    </>
  );

  return (
    <div ref={ref} className="h-full">
      {s.href ? (
        <Link href={localePath(s.href, locale)} className={className}>
          {cardContent}
        </Link>
      ) : (
        <div className={className}>{cardContent}</div>
      )}
    </div>
  );
}
