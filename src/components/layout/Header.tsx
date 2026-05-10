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
