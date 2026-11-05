import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/cn";

type Props = {
  /** 大きく表示する英語見出し。1文字ずつせり上がる */
  en: string;
  /** 上に添える日本語ラベル(実際の見出し要素) */
  ja: string;
  className?: string;
  tone?: "light" | "dark";
  align?: "left" | "center";
  /** 狭いカラムに置く場合は "sm" */
  size?: "md" | "sm";
};

/**
 * セクション共通の見出し。
 * 日本語ラベル横の罫線が伸び、英語見出しが1文字ずつマスクからせり上がる。
 */
export function SectionTitle({
  en,
  ja,
  className,
  tone = "light",
  align = "left",
  size = "md",
}: Props) {
  const words = en.split(" ");
  let charIndex = 0;

  return (
    <Reveal
      variant="none"
      className={cn(align === "center" && "text-center", className)}
    >
      <h2
        className={cn(
          "flex items-center gap-3 text-sm font-bold tracking-[0.12em] md:text-base",
          align === "center" && "justify-center",
          tone === "dark" ? "text-brand-200" : "text-brand-500",
        )}
      >
        <span
          aria-hidden="true"
          className="h-px w-10 origin-left scale-x-0 bg-current transition-transform delay-200 duration-1000 ease-expo group-data-[visible=true]/reveal:scale-x-100"
        />
        {ja}
      </h2>
      <p
        aria-hidden="true"
        className={cn(
          "mt-3 font-display font-black leading-[0.95] tracking-[-0.03em]",
          size === "sm"
            ? "text-[clamp(2.5rem,5.5vw,4.25rem)]"
            : "text-[clamp(2.75rem,7vw,5.5rem)]",
          tone === "dark" ? "text-white" : "text-ink",
        )}
      >
        {words.map((word, w) => (
          <span key={w} className="inline-block overflow-hidden whitespace-nowrap pb-[0.06em] align-bottom">
            {word.split("").map((ch) => {
              const i = charIndex++;
              return (
                <span
                  key={i}
                  className="inline-block translate-y-[110%] transition-transform duration-1000 ease-expo group-data-[visible=true]/reveal:translate-y-0"
                  style={{ transitionDelay: `${i * 35}ms` }}
                >
                  {ch}
                </span>
              );
            })}
            {w < words.length - 1 ? <span className="inline-block">&nbsp;</span> : null}
          </span>
        ))}
        <span className="text-brand-500">.</span>
      </p>
    </Reveal>
  );
}
