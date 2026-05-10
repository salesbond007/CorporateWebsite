import Link from "next/link";
import type { ArticleCategory } from "@/lib/microcms";
import { cn } from "@/lib/cn";
import { localePath } from "@/i18n/path";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionary";

type Props = {
  categories: ArticleCategory[];
  currentSlug?: string;
  locale: Locale;
  dict: Dictionary;
  className?: string;
};

export function CategoryNav({
  categories,
  currentSlug,
  locale,
  dict,
  className,
}: Props) {
  if (categories.length === 0) return null;

  return (
    <nav aria-label="カテゴリ" className={cn("flex flex-wrap gap-2", className)}>
      <CategoryChip
        href={localePath("/blog", locale)}
        active={!currentSlug}
        label={dict.blog.all}
      />
      {categories.map((c) => (
        <CategoryChip
          key={c.id}
          href={localePath(`/blog/category/${c.slug}`, locale)}
          active={c.slug === currentSlug}
          label={c.name}
        />
      ))}
    </nav>
  );
}

function CategoryChip({
  href,
  active,
  label,
}: {
  href: string;
  active: boolean;
  label: string;
}) {
  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={cn(
        "inline-flex items-center rounded-full border px-4 py-1.5 text-xs font-semibold transition",
        active
          ? "border-ink bg-ink text-white"
          : "border-ink-line bg-white text-ink-soft hover:border-ink",
      )}
    >
      {label}
    </Link>
  );
}
