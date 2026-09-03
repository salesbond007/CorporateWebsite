import Link from "next/link";
import { cn } from "@/lib/cn";

type Props = {
  currentPage: number;
  totalPages: number;
  basePath: string;
};

function buildHref(basePath: string, page: number) {
  if (page <= 1) return basePath;
  const sep = basePath.includes("?") ? "&" : "?";
  return `${basePath}${sep}page=${page}`;
}

function pageRange(current: number, total: number): (number | "…")[] {
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }
  const items: (number | "…")[] = [1];
  const start = Math.max(2, current - 1);
  const end = Math.min(total - 1, current + 1);
  if (start > 2) items.push("…");
  for (let i = start; i <= end; i++) items.push(i);
  if (end < total - 1) items.push("…");
  items.push(total);
  return items;
}

export function Pagination({ currentPage, totalPages, basePath }: Props) {
  if (totalPages <= 1) return null;

  const items = pageRange(currentPage, totalPages);
  const prev = currentPage > 1 ? buildHref(basePath, currentPage - 1) : null;
  const next =
    currentPage < totalPages ? buildHref(basePath, currentPage + 1) : null;

  return (
    <nav
      className="mt-16 flex items-center justify-center gap-2"
      aria-label="ページネーション"
    >
      <PageLink
        href={prev}
        ariaLabel="前のページ"
        className="px-4"
      >
        <span aria-hidden="true">←</span>
        <span className="hidden sm:inline">前へ</span>
      </PageLink>

      <ul className="flex items-center gap-1">
        {items.map((item, i) =>
          item === "…" ? (
            <li
              key={`ellipsis-${i}`}
              className="px-2 text-sm text-ink-muted"
              aria-hidden="true"
            >
              …
            </li>
          ) : (
            <li key={item}>
              <Link
                href={buildHref(basePath, item)}
                aria-current={item === currentPage ? "page" : undefined}
                className={cn(
                  "grid h-10 min-w-10 place-items-center rounded-full px-3 text-sm font-semibold transition",
                  item === currentPage
                    ? "bg-ink text-white"
                    : "text-ink-soft hover:bg-ink-line/30",
                )}
              >
                {item}
              </Link>
            </li>
          ),
        )}
      </ul>

      <PageLink
        href={next}
        ariaLabel="次のページ"
        className="px-4"
      >
        <span className="hidden sm:inline">次へ</span>
        <span aria-hidden="true">→</span>
      </PageLink>
    </nav>
  );
}

function PageLink({
  href,
  ariaLabel,
  children,
  className,
}: {
  href: string | null;
  ariaLabel: string;
  children: React.ReactNode;
  className?: string;
}) {
  const base =
    "inline-flex h-10 items-center gap-1.5 rounded-full text-sm font-semibold transition";
  if (!href) {
    return (
      <span
        aria-hidden="true"
        className={cn(base, "text-ink-muted opacity-40", className)}
      >
        {children}
      </span>
    );
  }
  return (
    <Link
      href={href}
      aria-label={ariaLabel}
      className={cn(base, "text-ink-soft hover:bg-ink-line/30", className)}
    >
      {children}
    </Link>
  );
}
