"use client";

import { useEffect, useRef, useState } from "react";

export type LpNavItem = { href: string; label: string };

/**
 * LP のページ内ナビゲーション。
 * - いま見ているセクションの項目に下線を付ける
 * - PC(lg以上)はヘッダーの中に横並び、それより狭い画面はヘッダーの下に横スクロールで並べる
 * - スマホでは、選ばれている項目が見える位置まで自動で横スクロールする
 */
export function LpNav({
  items,
  variant,
}: {
  items: LpNavItem[];
  variant: "desktop" | "mobile";
}) {
  const [active, setActive] = useState<string | null>(null);
  const listRef = useRef<HTMLUListElement | null>(null);

  useEffect(() => {
    const targets = items
      .map((i) => document.querySelector<HTMLElement>(i.href))
      .filter((el): el is HTMLElement => !!el);
    if (!targets.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(`#${visible[0].target.id}`);
      },
      { rootMargin: "-30% 0px -60% 0px" },
    );
    targets.forEach((t) => io.observe(t));
    return () => io.disconnect();
  }, [items]);

  useEffect(() => {
    if (variant !== "mobile" || !active || !listRef.current) return;
    const el = listRef.current.querySelector<HTMLElement>(
      `a[href="${active}"]`,
    );
    if (!el) return;
    const list = listRef.current;
    list.scrollTo({
      left: el.offsetLeft - list.clientWidth / 2 + el.clientWidth / 2,
      behavior: "smooth",
    });
  }, [active, variant]);

  if (variant === "desktop") {
    return (
      <nav aria-label="ページ内メニュー" className="ml-auto hidden lg:block">
        <ul className="flex items-center">
          {items.map((n) => (
            <li key={n.href}>
              <a
                href={n.href}
                aria-current={active === n.href ? "true" : undefined}
                className={`relative block whitespace-nowrap px-2.5 py-2 text-[13px] font-bold transition-colors hover:text-brand-500 xl:px-3.5 xl:text-sm ${
                  active === n.href ? "text-brand-500" : "text-ink/80"
                }`}
              >
                {n.label}
                <span
                  aria-hidden="true"
                  className={`absolute inset-x-2.5 -bottom-0.5 h-0.5 origin-left bg-brand-500 transition-transform duration-300 xl:inset-x-3.5 ${
                    active === n.href ? "scale-x-100" : "scale-x-0"
                  }`}
                />
              </a>
            </li>
          ))}
        </ul>
      </nav>
    );
  }

  return (
    <nav
      aria-label="ページ内メニュー"
      className="relative border-t border-[#EEE5E8] lg:hidden"
    >
      <ul
        ref={listRef}
        className="flex gap-1 overflow-x-auto px-3 [-ms-overflow-style:none] [scrollbar-width:none] sm:justify-center [&::-webkit-scrollbar]:hidden"
      >
        {items.map((n) => (
          <li key={n.href} className="shrink-0">
            <a
              href={n.href}
              aria-current={active === n.href ? "true" : undefined}
              className={`block whitespace-nowrap border-b-2 px-2.5 py-2.5 text-xs font-bold transition-colors ${
                active === n.href
                  ? "border-brand-500 text-brand-500"
                  : "border-transparent text-ink/75"
              }`}
            >
              {n.label}
            </a>
          </li>
        ))}
      </ul>
      {/* 右端に続きがあることを示すぼかし */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-white to-transparent sm:hidden"
      />
    </nav>
  );
}
