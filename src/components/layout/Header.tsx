"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { navigation } from "@/lib/site";
import { cn } from "@/lib/cn";
import { Button } from "@/components/ui/Button";
import { Logo } from "./Logo";
import { MobileMenu } from "./MobileMenu";
import { localePath } from "@/i18n/path";
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

  const contactItems = [
    {
      href: localePath("/contact", locale),
      label: `${dict.nav.contact}`,
      sub: "サービス・お見積もりはこちら",
    },
    {
      href: localePath("/contact/professional", locale),
      label: `${dict.nav.contactProfessional}登録`,
      sub: "プロ人材としてご活躍いただける方",
    },
    {
      href: localePath("/contact/partner", locale),
      label: `${dict.nav.contactPartner}登録`,
      sub: "人脈を活かしてご協力いただける方",
    },
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
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={localePath(item.href, locale)}
              className="text-sm font-bold text-ink hover:text-brand-600"
            >
              {dict.nav[item.key]}
            </Link>
          ))}
          <ContactDropdown
            label={dict.nav.contact.replace(/\(.*\)$/, "")}
            items={contactItems}
          />
        </nav>

        <div className="flex items-center gap-2 md:gap-3">
          <Button
            href={localePath("/contact", locale)}
            size="md"
            className="hidden md:inline-flex shadow-[0_8px_24px_-8px_rgba(245,130,32,0.6)]"
          >
            {dict.nav.contact}
          </Button>
          <Button
            href={localePath("/contact/professional", locale)}
            size="md"
            className="hidden md:inline-flex !bg-ink !text-white hover:!bg-ink-soft shadow-[0_8px_24px_-8px_rgba(0,0,0,0.45)]"
          >
            {dict.nav.contactProfessional}はこちら
          </Button>
          <MobileMenu locale={locale} dict={dict} />
        </div>
      </div>
    </header>
  );
}

type ContactDropdownProps = {
  label: string;
  items: { href: string; label: string; sub: string }[];
};

function ContactDropdown({ label, items }: ContactDropdownProps) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onBlur={(e) => {
        // close only when focus leaves the whole dropdown
        if (!e.currentTarget.contains(e.relatedTarget as Node)) setOpen(false);
      }}
    >
      <button
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        className="inline-flex items-center gap-1 text-sm font-bold text-ink hover:text-brand-600"
      >
        {label}
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
      </button>

      {/* invisible hover-bridge so the menu stays open between the
          button and the panel */}
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
                <span className="block text-sm font-bold text-ink">
                  {item.label}
                </span>
                <span className="mt-0.5 block text-xs text-ink-muted">
                  {item.sub}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
