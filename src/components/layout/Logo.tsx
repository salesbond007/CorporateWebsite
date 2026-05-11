import Image from "next/image";
import Link from "next/link";
import { localePath } from "@/i18n/path";
import { cn } from "@/lib/cn";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionary";

type Props = {
  locale: Locale;
  dict: Dictionary;
  className?: string;
  /** ダーク背景向けの白カード版に切り替える */
  variant?: "default" | "card";
  /** タップ領域の高さを上書きしたい場合 */
  size?: string;
};

export function Logo({
  locale,
  dict,
  className,
  variant = "default",
  size = "h-10 md:h-11",
}: Props) {
  return (
    <Link
      href={localePath("/", locale)}
      className={cn("inline-flex items-center", className)}
      aria-label={dict.site.name}
    >
      <span
        className={cn(
          "relative inline-flex aspect-square items-center justify-center overflow-hidden rounded-xl bg-white",
          variant === "card" && "ring-2 ring-white shadow-soft",
          size,
        )}
      >
        <Image
          src="/logo-square.jpg"
          alt={dict.site.name}
          width={2048}
          height={2048}
          priority
          sizes="48px"
          className="h-full w-full object-contain"
        />
      </span>
    </Link>
  );
}
