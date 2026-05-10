"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { cn } from "@/lib/cn";

type Props = {
  defaultValue?: string;
  className?: string;
  size?: "sm" | "md";
};

export function SearchBox({ defaultValue = "", className, size = "md" }: Props) {
  const router = useRouter();
  const [value, setValue] = useState(defaultValue);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const q = value.trim();
    if (!q) {
      router.push("/blog");
      return;
    }
    router.push(`/blog/search?q=${encodeURIComponent(q)}`);
  }

  const heightClass = size === "sm" ? "h-10" : "h-12";

  return (
    <form
      role="search"
      onSubmit={onSubmit}
      className={cn("relative", className)}
    >
      <label htmlFor="article-search" className="sr-only">
        記事を検索
      </label>
      <span
        className="pointer-events-none absolute inset-y-0 left-0 grid w-12 place-items-center text-ink-muted"
        aria-hidden="true"
      >
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <circle cx="8" cy="8" r="5.5" stroke="currentColor" strokeWidth="1.6" />
          <path d="M12 12L16 16" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      </span>
      <input
        id="article-search"
        type="search"
        name="q"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="キーワードで記事を検索"
        autoComplete="off"
        className={cn(
          "w-full rounded-full border border-ink-line bg-white pl-12 pr-28 text-sm text-ink placeholder:text-ink-muted focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200 transition",
          heightClass,
        )}
      />
      <button
        type="submit"
        className={cn(
          "absolute inset-y-1 right-1 inline-flex items-center justify-center rounded-full bg-ink px-5 text-xs font-semibold text-white hover:bg-brand-600",
        )}
      >
        検索
      </button>
    </form>
  );
}
