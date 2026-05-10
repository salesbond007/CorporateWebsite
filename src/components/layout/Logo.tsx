import Link from "next/link";
import { site } from "@/lib/site";

export function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" className={className} aria-label={site.name}>
      <span className="flex items-center gap-2">
        <span className="grid h-8 w-8 place-items-center rounded-lg bg-brand-500 text-white font-bold">
          C
        </span>
        <span className="font-display text-base font-bold tracking-tight">
          {site.name}
        </span>
      </span>
    </Link>
  );
}
