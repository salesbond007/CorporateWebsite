"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";
import type { TocItem } from "@/lib/toc";

type Props = {
  items: TocItem[];
};

export function Toc({ items }: Props) {
  const [activeId, setActiveId] = useState<string>(items[0]?.id ?? "");

  useEffect(() => {
    if (items.length === 0) return;

    const observers: IntersectionObserver[] = [];
    const visible = new Map<string, number>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            visible.set(entry.target.id, entry.intersectionRatio);
          } else {
            visible.delete(entry.target.id);
          }
        }
        if (visible.size > 0) {
          // Pick the first heading (in document order) that's currently visible.
          for (const item of items) {
            if (visible.has(item.id)) {
              setActiveId(item.id);
              break;
            }
          }
        }
      },
      { rootMargin: "-25% 0px -65% 0px", threshold: [0, 1] },
    );

    items.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });
    observers.push(observer);

    return () => observers.forEach((o) => o.disconnect());
  }, [items]);

  if (items.length === 0) return null;

  return (
    <nav aria-label="目次" className="text-sm">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-ink-muted">
        Contents
      </p>
      <ul className="mt-4 space-y-2.5 border-l border-ink-line">
        {items.map((item) => {
          const isActive = item.id === activeId;
          return (
            <li
              key={item.id}
              className={cn(item.level === 3 && "pl-3")}
            >
              <a
                href={`#${item.id}`}
                className={cn(
                  "-ml-px block border-l-2 py-0.5 pl-4 transition-colors",
                  isActive
                    ? "border-brand-500 text-ink font-semibold"
                    : "border-transparent text-ink-muted hover:text-ink",
                )}
              >
                {item.text}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
