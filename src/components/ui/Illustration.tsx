import Image from "next/image";
import { cn } from "@/lib/cn";

type Variant = "abstract" | "grid" | "blob";

type Props = {
  /** Inline SVG variant. Used when `src` is not provided. */
  variant?: Variant;
  className?: string;
  /** Override the SVG with a local image (path under /public). */
  src?: string;
  alt?: string;
};

/**
 * Decorative illustration. Pass `src="/illustrations/foo.png"` to use a
 * downloaded image (Loose Drawing / Storyset / etc.). Otherwise falls
 * back to a generated SVG.
 */
export function Illustration({
  variant = "abstract",
  className,
  src,
  alt = "",
}: Props) {
  if (src) {
    return (
      <div className={cn("relative aspect-square w-full", className)}>
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 768px) 50vw, 33vw"
          className="object-contain"
        />
      </div>
    );
  }

  return (
    <div
      className={cn("relative aspect-square w-full text-brand-500", className)}
      aria-hidden="true"
    >
      {variant === "abstract" && <Abstract />}
      {variant === "grid" && <Grid />}
      {variant === "blob" && <Blob />}
    </div>
  );
}

function Abstract() {
  return (
    <svg viewBox="0 0 400 400" className="h-full w-full">
      <defs>
        <linearGradient id="ab-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#FFB374" />
          <stop offset="100%" stopColor="#F58220" />
        </linearGradient>
      </defs>
      <circle cx="200" cy="200" r="160" fill="url(#ab-grad)" opacity="0.18" />
      <circle cx="200" cy="200" r="110" fill="none" stroke="#F58220" strokeWidth="1.5" opacity="0.4" />
      <path
        d="M80,260 C140,200 260,200 320,140"
        fill="none"
        stroke="#F58220"
        strokeWidth="2"
      />
      <circle cx="80" cy="260" r="6" fill="#F58220" />
      <circle cx="320" cy="140" r="6" fill="#F58220" />
      <rect x="170" y="170" width="60" height="60" rx="12" fill="#F58220" opacity="0.9" />
    </svg>
  );
}

function Grid() {
  return (
    <svg viewBox="0 0 400 400" className="h-full w-full">
      {Array.from({ length: 9 }).map((_, i) => {
        const x = (i % 3) * 120 + 40;
        const y = Math.floor(i / 3) * 120 + 40;
        const filled = [0, 4, 7].includes(i);
        return (
          <rect
            key={i}
            x={x}
            y={y}
            width="80"
            height="80"
            rx="10"
            fill={filled ? "#F58220" : "none"}
            stroke="#F58220"
            strokeWidth="1.5"
            opacity={filled ? 1 : 0.4}
          />
        );
      })}
    </svg>
  );
}

function Blob() {
  return (
    <svg viewBox="0 0 400 400" className="h-full w-full">
      <path
        d="M310,210 C320,270 270,330 200,330 C130,330 70,270 80,210 C90,150 130,90 200,90 C270,90 300,150 310,210 Z"
        fill="#FFE7D1"
      />
      <path
        d="M280,200 C290,250 250,300 200,300 C150,300 110,250 120,200 C130,150 160,120 200,120 C240,120 270,150 280,200 Z"
        fill="#F58220"
        opacity="0.85"
      />
      <circle cx="170" cy="190" r="8" fill="white" />
      <circle cx="230" cy="190" r="8" fill="white" />
      <path
        d="M170,230 Q200,250 230,230"
        fill="none"
        stroke="white"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}
