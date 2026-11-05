"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";
import { Button } from "@/components/ui/Button";
import { Logo } from "./Logo";
import { SiteMenu } from "./SiteMenu";
import { localePath } from "@/i18n/path";
import { navigation, navHref } from "@/lib/site";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionary";

type Props = {
  locale: Locale;
  dict: Dictionary;
};

export function Header({ locale, dict }: Props) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const hideCorporateHeader = /^\/(ja|en)\/services\/apokomi\/?$/.test(pathname);

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

        <nav className="ml-auto mr-6 hidden lg:flex items-center gap-9" aria-label="メイン">
          {navigation
            .filter((item) => item.key !== "contact")
            .map((item) => (
            <Link
              key={item.key}
              href={navHref(item, locale)}
              className="hover-underline text-base font-medium tracking-[0.12em] text-ink hover:text-brand-600"
            >
              {dict.nav[item.key]}
            </Link>
          ))}
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
