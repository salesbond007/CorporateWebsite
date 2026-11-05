import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { localePath } from "@/i18n/path";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionary";
import { serviceCategories } from "@/lib/site";
import { cn } from "@/lib/cn";

type Props = {
  locale: Locale;
  dict: Dictionary;
};

const bySlug = Object.fromEntries(
  serviceCategories.flatMap((c) => c.services).map((s) => [s.slug, s]),
);

type Pillar = {
  slug: string;
  role: string;
  en: string;
  image: string;
  /** カードの配色。攻め=白、守り=濃色 */
  tone: "light" | "dark";
};

const pillars: Pillar[] = [
  {
    slug: "new-business-development",
    role: "攻め",
    en: "Offense",
    image: "/services/cards/talent.jpg",
    tone: "light",
  },
  {
    slug: "ai-security",
    role: "守り",
    en: "Defense",
    image: "/services/cards/ai-solutions.jpg",
    tone: "dark",
  },
];

/**
 * 2つのサービス(攻め・守り)を対等な2枚のカードで見せ、
 * その結果として「企業の持続的な成長」が生まれることを下の合流線で示す。
 */
export function ServicesSection({ locale }: Props) {
  return (
    <section
      id="services"
      className="relative isolate scroll-mt-20 overflow-hidden bg-cream py-20 md:py-32"
    >
      <div aria-hidden="true" className="dot-bg-soft absolute inset-0 -z-10" />

      <Container>
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionTitle en="Services" ja="サービス" />
          <Reveal variant="fade" delay={300}>
            <p className="text-lg font-bold tracking-[0.06em] text-ink md:text-right md:text-xl">
              守りが固まるから、
              <br className="hidden md:block" />
              迷わず攻められる。
            </p>
          </Reveal>
        </div>

        <div className="relative mt-12 grid gap-5 md:mt-16 md:grid-cols-2 md:gap-8">
          {pillars.map((p, i) => {
            const s = bySlug[p.slug];
            if (!s) return null;
            const dark = p.tone === "dark";
            return (
              <Reveal key={p.slug} variant="up" delay={i * 150} className="h-full">
                <article
                  className={cn(
                    "group relative flex h-full flex-col overflow-hidden transition-shadow duration-500 hover:shadow-[0_30px_60px_-25px_rgba(29,5,11,0.45)]",
                    dark ? "bg-brand-900 text-white" : "border border-ink/10 bg-white text-ink",
                  )}
                >
                  {/* 写真 + 役割ラベル */}
                  <div className="relative aspect-[21/9] overflow-hidden md:aspect-[5/2]">
                    <Image
                      src={p.image}
                      alt=""
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover opacity-75 transition-transform duration-1000 ease-expo group-hover:scale-105"
                    />
                    <div
                      aria-hidden="true"
                      className={cn(
                        "absolute inset-0",
                        dark
                          ? "bg-gradient-to-t from-brand-900 via-brand-900/40 to-brand-900/10"
                          : "bg-gradient-to-t from-white via-white/10 to-transparent",
                      )}
                    />
                    <span
                      className={cn(
                        "absolute left-5 top-5 inline-flex items-center gap-2 px-3 py-1.5 text-xs font-bold tracking-[0.2em] md:left-6 md:top-6",
                        dark ? "bg-white text-brand-900" : "bg-brand-500 text-white",
                      )}
                    >
                      {p.role}
                      <span className="font-medium opacity-70">/ {p.en.toUpperCase()}</span>
                    </span>
                    {/* 大きな英字の透かし */}
                    <span
                      aria-hidden="true"
                      className={cn(
                        "absolute -bottom-3 right-4 font-display text-6xl font-black leading-none tracking-tight md:text-7xl",
                        dark ? "text-white/15" : "text-brand-500/10",
                      )}
                    >
                      {p.en}
                    </span>
                  </div>

                  <div className="flex flex-1 flex-col px-6 pb-6 pt-1 md:px-8 md:pb-7">
                    <p
                      className={cn(
                        "text-[11px] font-bold uppercase tracking-[0.25em]",
                        dark ? "text-brand-200" : "text-brand-500",
                      )}
                    >
                      Solution {String(i + 1).padStart(2, "0")}
                    </p>
                    <h3 className="mt-2 text-2xl font-black tracking-[0.04em] md:text-3xl">{s.title}</h3>
                    <p
                      className={cn(
                        "mt-4 text-sm leading-[1.9] md:text-[15px]",
                        dark ? "text-white/75" : "text-ink-soft",
                      )}
                    >
                      {s.summary}
                    </p>
                    <Link
                      href={localePath("/contact", locale)}
                      className={cn(
                        "mt-auto inline-flex items-center gap-2 self-start border-b pb-1 pt-4 text-sm font-bold tracking-[0.08em] transition-colors",
                        dark
                          ? "border-white/40 hover:border-brand-200 hover:text-brand-200"
                          : "border-ink/30 hover:border-brand-500 hover:text-brand-500",
                      )}
                    >
                      相談する
                      <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">
                        →
                      </span>
                    </Link>
                  </div>
                </article>
              </Reveal>
            );
          })}

          {/* 2枚の間をつなぐ「×」 */}
          <span
            aria-hidden="true"
            className="absolute left-1/2 top-1/2 z-10 hidden h-12 w-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-cream font-display text-xl font-black text-brand-500 shadow-[0_0_0_6px_rgba(250,247,242,1)] md:grid"
          >
            ×
          </span>
        </div>

        {/* 2つが合流して「成長」へ */}
        <Reveal variant="none" className="mt-2">
          <div aria-hidden="true" className="relative mx-auto hidden h-12 w-1/2 md:block">
            <span className="absolute inset-x-0 bottom-0 h-px origin-center scale-x-0 bg-ink/25 transition-transform delay-300 duration-1000 ease-expo group-data-[visible=true]/reveal:scale-x-100" />
            <span className="absolute bottom-0 left-0 h-full w-px origin-top scale-y-0 bg-ink/25 transition-transform duration-700 ease-expo group-data-[visible=true]/reveal:scale-y-100" />
            <span className="absolute bottom-0 right-0 h-full w-px origin-top scale-y-0 bg-ink/25 transition-transform duration-700 ease-expo group-data-[visible=true]/reveal:scale-y-100" />
          </div>
          <span
            aria-hidden="true"
            className="mx-auto block h-10 w-px origin-top scale-y-0 bg-ink/25 transition-transform delay-700 duration-700 ease-expo group-data-[visible=true]/reveal:scale-y-100"
          />
          <div className="mx-auto flex w-fit translate-y-3 flex-col items-center opacity-0 transition-all delay-1000 duration-700 ease-expo group-data-[visible=true]/reveal:translate-y-0 group-data-[visible=true]/reveal:opacity-100">
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-brand-500">Growth</span>
            <p className="mt-2 border border-ink/15 bg-white px-8 py-4 text-lg font-black tracking-[0.1em] text-ink md:px-12 md:text-2xl">
              企業の持続的な成長へ
            </p>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
