import Link from "next/link";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md" | "lg";

const base =
  "group/btn relative isolate inline-flex items-center justify-center gap-2 overflow-hidden rounded-none font-semibold transition-all duration-300 ease-expo disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap " +
  // ホバー時に光の帯が左から右へ走る
  "before:pointer-events-none before:absolute before:inset-y-0 before:left-0 before:-z-0 before:w-1/3 before:-translate-x-[150%] before:skew-x-[-20deg] before:bg-white/25 before:transition-transform before:duration-700 before:ease-expo hover:before:translate-x-[400%]";

const variants: Record<Variant, string> = {
  primary:
    "bg-brand-500 text-white hover:bg-brand-600 shadow-[0_10px_30px_-10px_rgba(122,30,53,0.7)] hover:shadow-[0_14px_36px_-10px_rgba(122,30,53,0.8)] hover:-translate-y-0.5 active:translate-y-0",
  secondary:
    "bg-white text-ink border-2 border-ink hover:bg-ink hover:text-white hover:-translate-y-0.5 active:translate-y-0",
  ghost:
    "bg-transparent text-ink hover:bg-ink-line/30",
};

const sizes: Record<Size, string> = {
  sm: "h-10 px-5 text-sm",
  md: "h-12 px-7 text-sm",
  lg: "h-14 px-9 text-base",
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: React.ReactNode;
};

type AsLink = CommonProps & {
  href: string;
  external?: boolean;
};

type AsButton = CommonProps &
  React.ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };

function isLink(props: AsLink | AsButton): props is AsLink {
  return typeof (props as AsLink).href === "string";
}

export function Button(props: AsLink | AsButton) {
  const { variant = "primary", size = "md", className, children } = props;
  const classes = cn(base, variants[variant], sizes[size], className);

  if (isLink(props)) {
    if (props.external) {
      return (
        <a
          href={props.href}
          className={classes}
          target="_blank"
          rel="noopener noreferrer"
        >
          {children}
          <ArrowIcon />
        </a>
      );
    }
    return (
      <Link href={props.href} className={classes}>
        {children}
        <ArrowIcon />
      </Link>
    );
  }

  const { variant: _v, size: _s, className: _c, children: _ch, ...rest } = props;
  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  );
}

function ArrowIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      aria-hidden="true"
      className="transition-transform duration-300 ease-expo group-hover/btn:translate-x-1"
    >
      <path
        d="M2.5 7H11.5M11.5 7L7.5 3M11.5 7L7.5 11"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
