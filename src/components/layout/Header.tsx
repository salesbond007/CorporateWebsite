"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { navigation } from "@/lib/site";
import { cn } from "@/lib/cn";
import { Button } from "@/components/ui/Button";
import { Logo } from "./Logo";
import { MobileMenu } from "./MobileMenu";

export function Header() {
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
          ? "bg-white/85 backdrop-blur-md border-b border-ink-line"
          : "bg-transparent border-b border-transparent",
      )}
    >
      <div className="container flex h-16 md:h-20 items-center justify-between gap-6">
        <Logo />

        <nav className="hidden lg:flex items-center gap-8" aria-label="メイン">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-ink-soft hover:text-ink"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button
            href="/contact/business"
            size="sm"
            variant="secondary"
            className="hidden md:inline-flex"
          >
            企業様へ
          </Button>
          <Button
            href="/contact/professional"
            size="sm"
            className="hidden md:inline-flex"
          >
            プロ人材の方
          </Button>
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
