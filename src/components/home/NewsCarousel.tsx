"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/cn";
import { localePath } from "@/i18n/path";
import type { Locale } from "@/i18n/config";
import type { NewsItem } from "@/lib/news";

type Props = {
  items: NewsItem[];
  locale: Locale;
};

export function NewsCarousel({ items, locale }: Props) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const updateScrollState = () => {
    const el = scrollerRef.current;
    if (!el) return;
    setCanScrollPrev(el.scrollLeft > 4);
    setCanScrollNext(el.scrollLeft < el.scrollWidth - el.clientWidth - 4);
  };

  useEffect(() => {
    updateScrollState();
    const el = scrollerRef.current;
    if (!el) return;
    const onResize = () => updateScrollState();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const scrollByCard = (direction: 1 | -1) => {
    const el = scrollerRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-news-card]");
    const amount = card ? card.offsetWidth + 20 : el.clientWidth * 0.8;
    el.scrollBy({ left: amount * direction, behavior: "smooth" });
  };

  if (items.length === 0) {
    return (
      <p className="mt-10 text-sm text-ink-muted">
        現在お知らせはありません。準備が整い次第、順次公開します。
      </p>
    );
  }

  return (
    <div className="relative mt-10">
      <div
        ref={scrollerRef}
        onScroll={updateScrollState}
        className="flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth pb-2 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
      >
        {items.map((item, i) => {
          const cardContent = (
            <div data-news-card className="w-64 shrink-0 snap-start sm:w-72">
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-ink-line/30">
                {item.thumbnail ? (
                  <Image
                    src={item.thumbnail}
                    alt=""
                    fill
                    sizes="(max-width: 640px) 256px, 288px"
                    className="object-cover"
                  />
                ) : null}
              </div>
              <h3 className="mt-4 line-clamp-2 text-sm font-bold leading-snug text-ink md:text-base">
                {item.title}
              </h3>
            </div>
          );
          return (
            <div key={`${item.title}-${i}`}>
              {item.href ? (
                <Link href={localePath(item.href, locale)}>{cardContent}</Link>
              ) : (
                cardContent
              )}
            </div>
          );
        })}
      </div>

      <button
        type="button"
        aria-label="前へ"
        onClick={() => scrollByCard(-1)}
        disabled={!canScrollPrev}
        className={cn(
          "absolute left-0 top-1/2 z-10 grid h-10 w-10 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-ink-line bg-white shadow-card transition hover:bg-ink hover:text-white disabled:pointer-events-none disabled:opacity-0",
        )}
      >
        <ArrowIcon direction="left" />
      </button>
      <button
        type="button"
        aria-label="次へ"
        onClick={() => scrollByCard(1)}
        disabled={!canScrollNext}
        className={cn(
          "absolute right-0 top-1/2 z-10 grid h-10 w-10 translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-ink-line bg-white shadow-card transition hover:bg-ink hover:text-white disabled:pointer-events-none disabled:opacity-0",
        )}
      >
        <ArrowIcon direction="right" />
      </button>
    </div>
  );
}

function ArrowIcon({ direction }: { direction: "left" | "right" }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
      className={direction === "right" ? "rotate-180" : undefined}
    >
      <path
        d="M10 3L5 8L10 13"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
