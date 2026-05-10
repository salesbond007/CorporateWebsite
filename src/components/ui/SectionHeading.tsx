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
      {eyebrow ? <p className="section-label">{eyebrow}</p> : null}
      <h2 className="mt-3 text-display-3 text-ink font-black">{title}</h2>
      {description ? (
        <p className="mt-5 text-base md:text-lg text-ink font-medium leading-relaxed">
          {description}
        </p>
      ) : null}
    </div>
  );
}
