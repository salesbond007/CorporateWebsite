"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { cn } from "@/lib/cn";
import { localePath } from "@/i18n/path";
import { site } from "@/lib/site";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionary";

type Props = {
  locale: Locale;
  dict: Dictionary;
};

/**
 * 右上の三本線ボタンと、開くと全画面に広がるメニュー。
 * PC・スマホ共通。上部に会社概要/お問い合わせのボタン、左にナビ一覧、
 * 右に写真付きのカードリンクを並べる。
 */
export function SiteMenu({ locale, dict }: Props) {
  const [open, setOpen] = useState(false);
  // ヘッダーのbackdrop-filterが固定配置の基準になってしまうため、bodyへポータルで描画する
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const home = localePath("/", locale);

  useEffect(() => {
    if (!open) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = original;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const close = () => setOpen(false);

  const navItems = [
    { label: dict.nav.top, href: home },
    { label: dict.nav.services, href: `${home}#services` },
    { label: dict.nav.news, href: localePath("/news", locale) },
    { label: dict.nav.company, href: `${home}#company` },
    { label: dict.nav.about, href: `${home}#mission` },
    { label: dict.nav.recruit, href: localePath("/recruit", locale) },
    { label: dict.nav.partner, href: localePath("/partner", locale) },
    { label: dict.nav.contact, href: localePath("/contact", locale) },
  ];

  const cards = [
    {
      ja: "サービス一覧",
      en: "Our Service",
      href: `${home}#services`,
      image: "/services/cards/ai-solutions.jpg",
    },
    {
      ja: "私たちについて",
      en: "About Us",
      href: `${home}#mission`,
      image: "/hero/slide-2.png",
    },
    {
      ja: "採用情報",
      en: "Recruitment",
      href: localePath("/recruit", locale),
      image: "/services/cards/ai-media.jpg",
    },
    {
      ja: "パートナー募集",
      en: "Business Partner",
      href: localePath("/partner", locale),
      image: "/services/cards/talent.jpg",
    },
  ];

  const pills = [
    {
      label: dict.nav.company,
      href: `${home}#company`,
      icon: <BuildingIcon />,
    },
    {
      label: "お問い合わせ",
      href: localePath("/contact", locale),
      icon: <MailIcon />,
    },
  ];

  // 開いたときに上から順に現れるよう、要素ごとに遅延をずらす
  const stagger = (i: number) => ({
    transitionDelay: open ? `${120 + i * 45}ms` : "0ms",
  });
  const itemAnim = cn(
    "transition-all duration-700 ease-expo",
    open ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0",
  );

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={dict.nav.openMenu}
        aria-expanded={open}
        aria-controls="site-menu"
        className="group grid h-11 w-11 shrink-0 place-items-center rounded-full bg-ink text-white shadow-[0_8px_20px_-8px_rgba(0,0,0,0.6)] transition-colors hover:bg-brand-500 md:h-12 md:w-12"
      >
        <span className="sr-only">{dict.nav.menu}</span>
        <span aria-hidden="true" className="flex w-5 flex-col gap-[5px]">
          <span className="h-0.5 w-full rounded-full bg-current" />
          <span className="h-0.5 w-full rounded-full bg-current transition-all duration-300 group-hover:w-3/5" />
          <span className="h-0.5 w-full rounded-full bg-current" />
        </span>
      </button>

      {mounted
        ? createPortal(
            <div
              id="site-menu"
              role="dialog"
              aria-modal="true"
              aria-label={dict.nav.menu}
              aria-hidden={!open}
              className={cn(
                "fixed inset-0 z-50 overflow-y-auto transition-[opacity,visibility] duration-500",
                open ? "visible opacity-100" : "invisible opacity-0",
              )}
            >
              {/* 背景: 暗い写真 + スモーク */}
              <div
                aria-hidden="true"
                className="fixed inset-0 -z-10 bg-[#121212]"
              >
                <Image
                  src="/hero/slide-1.png"
                  alt=""
                  fill
                  sizes="100vw"
                  className="object-cover opacity-25"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/70 to-brand-900/80 backdrop-blur-sm" />
              </div>

              <div className="container py-4 md:py-6">
                {/* 上部: ボタン + 閉じる */}
                <div className="flex items-center justify-end gap-2 sm:gap-3">
                  {pills.map((p, i) => (
                    <Link
                      key={p.label}
                      href={p.href}
                      onClick={close}
                      style={stagger(i)}
                      className={cn(
                        "inline-flex h-11 items-center gap-2 rounded-full bg-white px-4 text-sm font-bold tracking-[0.06em] text-ink shadow-[4px_4px_0_rgba(0,0,0,0.35)] transition-colors hover:bg-brand-50 sm:h-12 sm:px-7 sm:text-base",
                        itemAnim,
                      )}
                    >
                      {p.icon}
                      {p.label}
                    </Link>
                  ))}
                  <button
                    type="button"
                    onClick={close}
                    aria-label={dict.nav.closeMenu}
                    className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-white/80 text-ink transition-transform duration-300 hover:rotate-90 hover:bg-white md:h-12 md:w-12"
                  >
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 18 18"
                      fill="none"
                      aria-hidden="true"
                    >
                      <path
                        d="M3 3l12 12M15 3L3 15"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                    </svg>
                  </button>
                </div>

                <div className="mt-10 grid gap-10 pb-10 md:mt-16 lg:grid-cols-12 lg:gap-12">
                  {/* 左: ナビ一覧 */}
                  <nav aria-label="メニュー" className="lg:col-span-4">
                    <ul className="grid grid-cols-2 gap-x-6 gap-y-1 sm:grid-cols-3 lg:grid-cols-1">
                      {navItems.map((item, i) => (
                        <li
                          key={item.label}
                          style={stagger(i + 2)}
                          className={itemAnim}
                        >
                          <Link
                            href={item.href}
                            onClick={close}
                            className="group/nav relative flex items-center gap-2 border-l-2 border-transparent py-2 pl-4 text-base font-bold tracking-[0.08em] text-white/70 transition-colors hover:border-white hover:text-white md:text-lg"
                          >
                            {item.label}
                            <span
                              aria-hidden="true"
                              className="text-xs text-brand-200 opacity-0 transition-all duration-300 group-hover/nav:translate-x-1 group-hover/nav:opacity-100"
                            >
                              →
                            </span>
                          </Link>
                        </li>
                      ))}
                      {site.media.map((m, i) => (
                  <li key={m.url} style={stagger(navItems.length + i + 2)} className={itemAnim}>
                    <a
                      href={m.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={close}
                      className="flex items-center gap-2 border-l-2 border-transparent py-2 pl-4 text-base font-bold tracking-[0.08em] text-white/70 transition-colors hover:border-white hover:text-white md:text-lg"
                    >
                      {m.name}
                      <span aria-hidden="true" className="text-xs text-brand-200">↗</span>
                      <span className="sr-only">(新しいタブで開く)</span>
                    </a>
                  </li>
                ))}
              </ul>
                  </nav>

                  {/* 右: 写真付きカード */}
                  <ul className="grid content-start gap-3 sm:grid-cols-2 sm:gap-4 lg:col-span-8">
                    {cards.map((c, i) => (
                      <li
                        key={c.ja}
                        style={stagger(i + 6)}
                        className={itemAnim}
                      >
                        <Link
                          href={c.href}
                          onClick={close}
                          className="group/card flex h-28 overflow-hidden bg-white shadow-[0_20px_40px_-20px_rgba(0,0,0,0.6)] md:h-36"
                        >
                          <span className="relative w-2/5 shrink-0 overflow-hidden lg:w-[36%]">
                            <Image
                              src={c.image}
                              alt=""
                              fill
                              sizes="(max-width: 640px) 40vw, 20vw"
                              className="object-cover transition-transform duration-700 ease-expo group-hover/card:scale-110"
                            />
                          </span>
                          <span className="relative flex min-w-0 flex-1 flex-col justify-center px-5 md:px-7 lg:px-5 xl:px-7">
                            <span className="whitespace-nowrap text-xl font-bold tracking-[0.08em] text-brand-500 md:text-2xl lg:text-xl xl:text-2xl">
                              {c.ja}
                            </span>
                            <span className="mt-1 text-xs tracking-[0.12em] text-ink-muted md:text-sm">
                              {c.en}
                            </span>
                            <span
                              aria-hidden="true"
                              className="absolute bottom-0 left-0 h-[3px] w-full origin-left scale-x-0 bg-brand-500 transition-transform duration-500 ease-expo group-hover/card:scale-x-100"
                            />
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>,
            document.body,
          )
        : null}
    </>
  );
}

function BuildingIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M3 1h7v14H3V1zm1.5 2v1.5H6V3H4.5zm3 0v1.5H9V3H7.5zm-3 3v1.5H6V6H4.5zm3 0v1.5H9V6H7.5zm-3 3v1.5H6V9H4.5zm3 0v1.5H9V9H7.5zM5.5 12v3h2v-3h-2zM11 6h2.5v9H11V6z" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M1 3.5A1.5 1.5 0 0 1 2.5 2h11A1.5 1.5 0 0 1 15 3.5v.3L8 8.2 1 3.8v-.3z" />
      <path d="M1 5.6V12.5A1.5 1.5 0 0 0 2.5 14h11a1.5 1.5 0 0 0 1.5-1.5V5.6L8 10 1 5.6z" />
    </svg>
  );
}
