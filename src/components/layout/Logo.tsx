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
  /** Render the logo in white (e.g. on dark sections). */
  variant?: "default" | "white";
  /** Override the height. Defaults to "h-10". */
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
      <Image
        src="/logo.png"
        alt={dict.site.name}
        width={2938}
        height={1440}
        priority
        sizes="(max-width: 768px) 100px, 130px"
        className={cn(
          "w-auto select-none",
          size,
          variant === "white" && "[filter:brightness(0)_invert(1)]",
        )}
      />
    </Link>
  );
}
