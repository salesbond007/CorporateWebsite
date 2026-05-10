import { cn } from "@/lib/cn";

type Props = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: Props) {
  return (
    <div
      className={cn(
        "max-w-3xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow ? (
        <span
          className={cn(
            "eyebrow",
            align === "center" && "justify-center",
          )}
        >
          {eyebrow}
        </span>
      ) : null}
      <h2 className="mt-5 text-display-2 text-ink">{title}</h2>
      {description ? (
        <p className="mt-5 text-base md:text-lg text-ink-soft leading-relaxed">
          {description}
        </p>
      ) : null}
    </div>
  );
}
