"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";
import { Button } from "@/components/ui/Button";
import { Logo } from "./Logo";
import { SiteMenu } from "./SiteMenu";
import { localePath } from "@/i18n/path";
import { navigation, navHref, serviceCategories } from "@/lib/site";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionary";

type Props = {
  locale: Locale;
  dict: Dictionary;
};

export function Header({ locale, dict }: Props) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const hideCorporateHeader = /^\/(ja|en)\/services\/apokomi\/?$/.test(
    pathname,
  );

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (hideCorporateHeader) return null;

  return (
    <header
      className={cn(
        "sticky top-0 z-40 w-full transition-all duration-300",
        scrolled
          ? "bg-white/90 backdrop-blur-md border-b border-ink-line/60"
          : "bg-transparent border-b border-transparent",
      )}
    >
      <div className="container flex h-16 md:h-20 items-center justify-between gap-6">
        <Logo locale={locale} dict={dict} />

        <nav
          className="ml-auto mr-6 hidden lg:flex items-center gap-9"
          aria-label="メイン"
        >
          {navigation
            .filter((item) => item.key !== "contact")
            .map((item) =>
              item.key === "services" ? (
                <ServicesDropdown
                  key={item.key}
                  label={dict.nav.services}
                  href={navHref(item, locale)}
                  items={serviceCategories
                    .flatMap((c) => c.services)
                    .filter((sv) => sv.href)
                    .map((sv) => ({
                      label: sv.title,
                      href: localePath(sv.href!, locale),
                      children: (sv.children ?? [])
                        .filter((ch) => ch.href)
                        .map((ch) => ({
                          label: ch.title,
                          href: localePath(ch.href!, locale),
                        })),
                    }))}
                />
              ) : (
                <Link
                  key={item.key}
                  href={navHref(item, locale)}
                  className="hover-underline text-base font-medium tracking-[0.12em] text-ink hover:text-brand-600"
                >
                  {dict.nav[item.key]}
                </Link>
              ),
            )}
        </nav>

        <div className="flex items-center gap-3 md:gap-6 lg:gap-12">
          <Button
            href={localePath("/contact", locale)}
            size="md"
            className="hidden md:inline-flex !px-8 text-[15px] !font-bold tracking-[0.1em] shadow-[0_8px_24px_-8px_rgba(122,30,53,0.6)]"
          >
            {dict.nav.contact}
          </Button>
          <SiteMenu locale={locale} dict={dict} />
        </div>
      </div>
    </header>
  );
}

/**
 * 「サービス」: ホバー(またはキーボードフォーカス)で下にサービス一覧が開く。
 * ラベル自体はサービス一覧ページへのリンク。
 */
function ServicesDropdown({
  label,
  href,
  items,
}: {
  label: string;
  href: string;
  items: {
    label: string;
    href: string;
    children?: { label: string; href: string }[];
  }[];
}) {
  const [open, setOpen] = useState(false);
  // 子サービスを持つ項目のうち、展開中のもの
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => {
        setOpen(false);
        setExpanded(null);
      }}
      onFocus={() => setOpen(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) setOpen(false);
      }}
      onKeyDown={(e) => {
        if (e.key === "Escape") setOpen(false);
      }}
    >
      <Link
        href={href}
        aria-haspopup="true"
        aria-expanded={open}
        className={cn(
          "relative inline-flex items-center gap-2 text-base font-medium tracking-[0.12em] text-ink transition-colors hover:text-brand-600",
          // 開いている間はラベル下に線を表示
          "after:absolute after:-bottom-1.5 after:left-0 after:h-0.5 after:w-full after:origin-left after:bg-ink after:transition-transform after:duration-300",
          open ? "after:scale-x-100" : "after:scale-x-0",
        )}
      >
        {label}
        <CircleChevron direction="down" open={open} />
      </Link>

      <div
        className={cn(
          "absolute left-0 top-full pt-5 transition-all duration-200",
          open
            ? "visible translate-y-0 opacity-100"
            : "invisible -translate-y-1 opacity-0",
        )}
      >
        <ul className="min-w-[15rem] border border-ink-line bg-white py-2 shadow-[0_16px_40px_-16px_rgba(0,0,0,0.25)]">
          {items.map((it) => {
            const hasChildren = !!it.children?.length;
            const isOpen = expanded === it.href;
            return (
              <li
                key={it.href}
                onMouseEnter={() => hasChildren && setExpanded(it.href)}
              >
                <div className="flex items-center">
                  <Link
                    href={it.href}
                    onClick={() => setOpen(false)}
                    className="group/item flex flex-1 items-center gap-3 whitespace-nowrap py-3 pl-5 pr-3 text-[15px] font-medium tracking-[0.06em] text-ink transition-colors hover:bg-brand-50/60 hover:text-brand-600"
                  >
                    <CircleChevron direction="right" />
                    {it.label}
                  </Link>
                  {hasChildren ? (
                    <button
                      type="button"
                      aria-label={`${it.label}のサービスを${isOpen ? "閉じる" : "開く"}`}
                      aria-expanded={isOpen}
                      onClick={() => setExpanded(isOpen ? null : it.href)}
                      className="mr-2 grid h-8 w-8 place-items-center rounded-full text-brand-500 transition-colors hover:bg-brand-50"
                    >
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 12 12"
                        fill="none"
                        aria-hidden="true"
                        className={cn(
                          "transition-transform duration-300",
                          isOpen && "rotate-180",
                        )}
                      >
                        <path
                          d="M3 4.5L6 7.5L9 4.5"
                          stroke="currentColor"
                          strokeWidth="1.6"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                  ) : null}
                </div>
                {hasChildren ? (
                  <div
                    className={cn(
                      "grid overflow-hidden transition-all duration-300",
                      isOpen
                        ? "grid-rows-[1fr] opacity-100"
                        : "grid-rows-[0fr] opacity-0",
                    )}
                  >
                    <ul className="min-h-0">
                      {it.children!.map((ch) => (
                        <li key={ch.href}>
                          <Link
                            href={ch.href}
                            onClick={() => setOpen(false)}
                            tabIndex={isOpen ? 0 : -1}
                            className="ml-8 flex items-center gap-2 whitespace-nowrap border-l border-brand-500/30 py-2.5 pl-4 pr-5 text-sm font-medium text-ink-soft transition-colors hover:text-brand-600"
                          >
                            <span aria-hidden="true" className="text-brand-500">
                              └
                            </span>
                            {ch.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

function CircleChevron({
  direction,
  open,
}: {
  direction: "down" | "right";
  open?: boolean;
}) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "grid h-[18px] w-[18px] shrink-0 place-items-center rounded-full border border-brand-500/50 text-brand-500 transition-transform duration-300",
        direction === "down" && open && "rotate-180",
      )}
    >
      <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
        <path
          d={
            direction === "down"
              ? "M1.5 3l2.5 2.5L6.5 3"
              : "M3 1.5l2.5 2.5L3 6.5"
          }
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}
