import Link from "next/link";
import { localePath } from "@/i18n/path";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionary";

type Props = {
  locale: Locale;
  dict: Dictionary;
  className?: string;
};

export function Logo({ locale, dict, className }: Props) {
  return (
    <Link
      href={localePath("/", locale)}
      className={className}
      aria-label={dict.site.name}
    >
      <span className="flex items-center gap-2">
        <span className="grid h-8 w-8 place-items-center rounded-lg bg-brand-500 text-white font-bold">
          S
        </span>
        <span className="font-display text-base font-bold tracking-tight">
          {dict.site.name}
        </span>
      </span>
    </Link>
  );
}
