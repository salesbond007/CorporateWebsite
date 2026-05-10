"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

type Props = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  /** "up" | "fade" — direction of reveal. Defaults to "up". */
  variant?: "up" | "fade";
  once?: boolean;
};

export function Reveal({
  children,
  className,
  delay = 0,
  variant = "up",
  once = true,
}: Props) {
  const ref = useRef<HTMLDivElement | null>(null);
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

  const baseHidden =
    variant === "up" ? "opacity-0 translate-y-4" : "opacity-0";
  const baseShown =
    variant === "up" ? "opacity-100 translate-y-0" : "opacity-100";

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={cn(
        "transition-all duration-700 ease-out will-change-transform",
        visible ? baseShown : baseHidden,
        className,
      )}
    >
      {children}
    </div>
  );
}
