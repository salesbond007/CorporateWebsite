"use client";

import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { locales, type Locale } from "@/i18n/config";
import { stripLocale, localePath } from "@/i18n/path";
import { cn } from "@/lib/cn";

type Props = {
  current: Locale;
  className?: string;
};

const labels: Record<Locale, string> = {
  ja: "日本語",
  en: "English",
};

const short: Record<Locale, string> = {
  ja: "JP",
  en: "EN",
};

export function LocaleSwitcher({ current, className }: Props) {
  const pathname = usePathname();
  const router = useRouter();

  function switchTo(locale: Locale) {
    const { path } = stripLocale(pathname || "/");
    document.cookie = `NEXT_LOCALE=${locale}; path=/; max-age=31536000; samesite=lax`;
    router.push(localePath(path, locale));
  }

  return (
    <div
      role="group"
      aria-label="言語切り替え"
      className={cn(
        "inline-flex h-9 items-center rounded-full border border-ink-line bg-white p-0.5 text-xs",
        className,
      )}
    >
      {locales.map((l) => (
        <button
          key={l}
          type="button"
          onClick={() => switchTo(l)}
          aria-pressed={l === current}
          aria-label={labels[l]}
          className={cn(
            "h-8 rounded-full px-3 font-semibold transition",
            l === current
              ? "bg-ink text-white"
              : "text-ink-soft hover:text-ink",
          )}
        >
          {short[l]}
        </button>
      ))}
    </div>
  );
}
