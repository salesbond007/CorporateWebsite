import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/cn";

type Item = { href: string; label: string };

/**
 * LP用のヘッダー: ページ内の目次(ナビゲーション)と申し込みボタン。
 * サイト共通のヘッダーの代わりに、画面上部に固定して表示する。
 * スマホでは目次を2段目に横スクロールで表示する。
 */
export function LpHeader({
  items,
  ctaHref,
  ctaLabel,
  accent = "wine",
}: {
  items: Item[];
  ctaHref: string;
  ctaLabel: string;
  /** "wine": ブランドカラー(角ボタン) / "orange": 新規開拓支援系LP(丸ボタン) */
  accent?: "wine" | "orange";
}) {
  const orange = accent === "orange";
  return (
    <header className="sticky top-0 z-40 border-b border-ink/10 bg-white/95 backdrop-blur">
      <Container className="flex h-14 items-center gap-4 md:h-16">
        <nav aria-label="ページ内目次" className="hidden md:block">
          <ul className="flex items-center gap-1 lg:gap-2">
            {items.map((n) => (
              <li key={n.href}>
                <a
                  href={n.href}
                  className={cn(
                    "px-3 py-2 text-sm font-bold text-ink/75 transition lg:px-4",
                    orange ? "hover:text-[#E05A0C]" : "hover:text-brand-600",
                  )}
                >
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <a
          href={ctaHref}
          className={cn(
            "group ml-auto inline-flex h-10 items-center gap-2 px-5 text-sm font-bold text-white transition",
            orange
              ? "rounded-full bg-[#F26B1D] shadow-[0_10px_24px_-12px_rgba(242,107,29,0.9)] hover:bg-[#E05A0C]"
              : "bg-brand-500 shadow-[0_10px_24px_-12px_rgba(122,30,53,0.8)] hover:bg-brand-600",
          )}
        >
          {ctaLabel}
          <span
            aria-hidden="true"
            className="transition-transform group-hover:translate-x-0.5"
          >
            →
          </span>
        </a>
      </Container>
      <nav
        aria-label="ページ内目次"
        className="border-t border-ink/10 md:hidden"
      >
        <ul className="flex gap-1 overflow-x-auto px-3 py-1.5 [scrollbar-width:none]">
          {items.map((n) => (
            <li key={n.href} className="shrink-0">
              <a
                href={n.href}
                className="block whitespace-nowrap px-3 py-1.5 text-xs font-bold text-ink/75"
              >
                {n.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
