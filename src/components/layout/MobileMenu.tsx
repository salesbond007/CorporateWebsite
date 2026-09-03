"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { navigation } from "@/lib/site";
import { cn } from "@/lib/cn";
import { localePath } from "@/i18n/path";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionary";

type Props = {
  locale: Locale;
  dict: Dictionary;
};

export function MobileMenu({ locale, dict }: Props) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const ctaLinks = [
    {
      href: "/contact",
      label: dict.nav.contact,
      className: "bg-brand-500 text-white hover:bg-brand-600",
    },
    {
      href: "/contact/partner",
      label: "個人の方はこちら",
      className: "bg-ink text-white hover:bg-ink-soft",
    },
  ];

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="lg:hidden grid h-10 w-10 place-items-center rounded-full border border-ink-line text-ink hover:bg-ink-line/30"
        aria-label={dict.nav.openMenu}
        aria-expanded={open}
      >
        <span className="sr-only">{dict.nav.menu}</span>
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
          <path d="M2 5h14M2 9h14M2 13h14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      </button>

      <div
        className={cn(
          "fixed inset-0 z-50 transition-opacity duration-300 lg:hidden",
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none",
        )}
        aria-hidden={!open}
      >
        <div
          className="absolute inset-0 bg-ink/40 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        />
        <div
          className={cn(
            "absolute right-0 top-0 h-full w-[88%] max-w-sm bg-white shadow-2xl flex flex-col transform transition-transform duration-300",
            open ? "translate-x-0" : "translate-x-full",
          )}
          role="dialog"
          aria-modal="true"
        >
          <div className="flex h-16 items-center justify-between px-5 border-b border-ink-line">
            <span className="font-display font-bold">{dict.nav.menu}</span>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label={dict.nav.closeMenu}
              className="grid h-10 w-10 place-items-center rounded-full border border-ink-line"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path d="M2 2l10 10M12 2L2 12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              </svg>
            </button>
          </div>

          <nav className="flex-1 overflow-y-auto px-5 py-6">
            <ul className="space-y-1">
              {navigation.map((item) => (
                <li key={item.href}>
                  <Link
                    href={localePath(item.href, locale)}
                    onClick={() => setOpen(false)}
                    className="block rounded-lg px-3 py-3 text-base font-medium hover:bg-ink-line/30"
                  >
                    {dict.nav[item.key]}
                  </Link>
                  {/* AI専門メディア: リンクは後日追加予定。現時点ではテキストのみ表示 */}
                  {item.key === "services" ? (
                    <span className="block rounded-lg px-3 py-3 text-base font-medium text-ink-muted">
                      AI専門メディア
                    </span>
                  ) : null}
                </li>
              ))}
            </ul>

            <div className="mt-8 pt-6 border-t border-ink-line space-y-3">
              {ctaLinks.map((item) => (
                <Link
                  key={item.href}
                  href={localePath(item.href, locale)}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "flex items-center justify-between rounded-none px-4 py-3.5 text-sm font-semibold transition",
                    item.className,
                  )}
                >
                  {item.label}
                  <span aria-hidden="true">→</span>
                </Link>
              ))}
            </div>
          </nav>
        </div>
      </div>
    </>
  );
}
