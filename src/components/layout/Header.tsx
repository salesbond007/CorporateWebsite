"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";
import { Button } from "@/components/ui/Button";
import { Logo } from "./Logo";
import { MobileMenu } from "./MobileMenu";
import { localePath } from "@/i18n/path";
import { services } from "@/lib/site";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionary";

type Props = {
  locale: Locale;
  dict: Dictionary;
};

export function Header({ locale, dict }: Props) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const serviceItems = [
    {
      href: localePath("/services", locale),
      label: "サービス一覧",
      highlight: true,
    },
    ...services
      .filter((s) => s.slug !== "ai-media")
      .map((s) => ({
        href: s.href
          ? localePath(s.href, locale)
          : `${localePath("/services", locale)}#${s.slug}`,
        label: s.title,
        sub: s.subtitle,
      })),
  ];

  return (
    <header
      className={cn(
        "sticky top-0 z-40 w-full transition-all duration-300",
        scrolled
          ? "bg-cream/90 backdrop-blur-md border-b border-ink-line/60"
          : "bg-transparent border-b border-transparent",
      )}
    >
      <div className="container flex h-16 md:h-20 items-center justify-between gap-6">
        <Logo locale={locale} dict={dict} />

        <nav className="hidden lg:flex items-center gap-8" aria-label="メイン">
          <Link
            href={localePath("/", locale)}
            className="text-sm font-bold text-ink hover:text-brand-600"
          >
            {dict.nav.top}
          </Link>

          <NavDropdown
            label={dict.nav.services}
            href={localePath("/services", locale)}
            items={serviceItems}
          />

          {/* リンクは後日追加予定。現時点ではテキストのみ表示 */}
          <span className="text-sm font-bold text-ink-muted">
            AI専門メディア
          </span>

          <Link
            href={localePath("/company", locale)}
            className="text-sm font-bold text-ink hover:text-brand-600"
          >
            {dict.nav.company}
          </Link>
        </nav>

        <div className="flex items-center gap-2 md:gap-3">
          <Button
            href={localePath("/contact", locale)}
            size="md"
            className="hidden md:inline-flex shadow-[0_8px_24px_-8px_rgba(122,30,53,0.6)]"
          >
            {dict.nav.contact}
          </Button>
          <Button
            href={localePath("/contact/partner", locale)}
            size="md"
            className="hidden md:inline-flex !bg-ink !text-white hover:!bg-ink-soft shadow-[0_8px_24px_-8px_rgba(0,0,0,0.45)]"
          >
            個人の方はこちら
          </Button>
          <MobileMenu locale={locale} dict={dict} />
        </div>
      </div>
    </header>
  );
}

type NavDropdownItem = {
  href: string;
  label: string;
  sub?: string;
  /** 「サービス一覧」など一覧リンクをテキスト色で軽く区別する */
  highlight?: boolean;
};

type NavDropdownProps = {
  label: string;
  /** If set, the trigger label itself navigates here on click */
  href?: string;
  items: NavDropdownItem[];
};

function NavDropdown({ label, href, items }: NavDropdownProps) {
  const [open, setOpen] = useState(false);

  const triggerClass =
    "inline-flex items-center gap-1 text-sm font-bold text-ink hover:text-brand-600";

  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) setOpen(false);
      }}
    >
      {href ? (
        <Link
          href={href}
          aria-haspopup="menu"
          aria-expanded={open}
          className={triggerClass}
        >
          {label}
          <Chevron open={open} />
        </Link>
      ) : (
        <button
          type="button"
          aria-haspopup="menu"
          aria-expanded={open}
          className={triggerClass}
        >
          {label}
          <Chevron open={open} />
        </button>
      )}

      <div
        className={cn(
          "absolute left-1/2 -translate-x-1/2 top-full pt-3 transition-opacity duration-150",
          open
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none",
        )}
      >
        <ul
          role="menu"
          className="min-w-[280px] rounded-xl2 border border-ink-line bg-white p-2 shadow-card"
        >
          {items.map((item) => (
            <li key={item.href} role="none">
              <Link
                role="menuitem"
                href={item.href}
                className="block rounded-lg px-4 py-3 transition hover:bg-cream"
                onClick={() => setOpen(false)}
              >
                <span
                  className={cn(
                    "block text-sm font-bold",
                    item.highlight ? "text-brand-600" : "text-ink",
                  )}
                >
                  {item.label}
                </span>
                {item.sub ? (
                  <span className="mt-0.5 block text-xs text-ink-muted">
                    {item.sub}
                  </span>
                ) : null}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      aria-hidden="true"
      className={cn(
        "transition-transform duration-200",
        open && "rotate-180",
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
  );
}
