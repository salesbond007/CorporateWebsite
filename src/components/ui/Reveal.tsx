"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

type Variant = "up" | "fade" | "blur" | "left" | "right" | "scale" | "none";

type Props = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  /**
   * 表示時の動き。"none" はラッパー自体は動かさず、子要素が
   * `group-data-[visible=true]/reveal:` で表示状態を参照するためだけに使う。
   */
  variant?: Variant;
  once?: boolean;
  as?: "div" | "span";
};

const hidden: Record<Variant, string> = {
  up: "opacity-0 translate-y-8",
  fade: "opacity-0",
  blur: "opacity-0 blur-md translate-y-4",
  left: "opacity-0 -translate-x-10",
  right: "opacity-0 translate-x-10",
  scale: "opacity-0 scale-95",
  none: "",
};

const shown: Record<Variant, string> = {
  up: "opacity-100 translate-y-0",
  fade: "opacity-100",
  blur: "opacity-100 blur-0 translate-y-0",
  left: "opacity-100 translate-x-0",
  right: "opacity-100 translate-x-0",
  scale: "opacity-100 scale-100",
  none: "",
};

export function Reveal({
  children,
  className,
  delay = 0,
  variant = "up",
  once = true,
  as = "div",
}: Props) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          if (once) observer.disconnect();
        } else if (!once) {
          setVisible(false);
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.1 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [once]);

  const Tag = as;

  return (
    <Tag
      ref={ref as React.Ref<HTMLDivElement & HTMLSpanElement>}
      data-visible={visible}
      style={{ transitionDelay: `${delay}ms` }}
      className={cn(
        "group/reveal",
        variant !== "none" &&
          "transition-all duration-1000 ease-expo will-change-transform",
        visible ? shown[variant] : hidden[variant],
        className,
      )}
    >
      {children}
    </Tag>
  );
}
