import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { services } from "@/lib/site";
import { localePath } from "@/i18n/path";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionary";

type Props = {
  locale: Locale;
  dict: Dictionary;
};

const iconProps = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
  className: "h-6 w-6",
};

const icons: Record<string, React.ReactNode> = {
  "ai-solutions": (
    <svg {...iconProps}>
      <rect x="7" y="7" width="10" height="10" rx="2" />
      <path d="M9 3v3M15 3v3M9 18v3M15 18v3M3 9h3M3 15h3M18 9h3M18 15h3" />
    </svg>
  ),
  "ai-media": (
    <svg {...iconProps}>
      <path d="M4 10v4a2 2 0 0 0 2 2h2l5 4V4L8 8H6a2 2 0 0 0-2 2Z" />
      <path d="M17 9a4 4 0 0 1 0 6" />
      <path d="M20 6a8.5 8.5 0 0 1 0 12" />
    </svg>
  ),
  talent: (
    <svg {...iconProps}>
      <circle cx="9" cy="8" r="3.2" />
      <circle cx="17" cy="10" r="2.6" />
      <path d="M3 20c0-3.6 2.7-6.2 6-6.2s6 2.6 6 6.2" />
      <path d="M15 20c0-2.6 1.7-4.6 4-4.6s4 2 4 4.6" />
    </svg>
  ),
};

const cardClass =
  "group relative isolate block h-full overflow-hidden rounded-2xl border border-white/10 bg-ink p-8 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_24px_60px_-18px_rgba(29,5,11,0.55)]";

export function ServicesSection({ locale, dict }: Props) {
  return (
    <section id="services" className="relative scroll-mt-20 py-16 md:py-24 bg-cream">
      <Container>
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <p className="text-2xl md:text-3xl font-black text-ink">
            提供するサービス
          </p>
          <Link
            href={localePath("/services", locale)}
            className="link-arrow shrink-0"
          >
            {dict.nav.services}
          </Link>
        </div>

        <ul className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => {
            const cardContent = (
              <>
                {/* コーナーのグロー装飾 */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -top-16 -right-16 h-40 w-40 rounded-full bg-brand-600/40 blur-3xl transition-opacity duration-300 group-hover:bg-brand-500/60"
                />
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 opacity-[0.07] [background-image:radial-gradient(currentColor_1px,transparent_1px)] [background-size:16px_16px] text-white"
                />

                <div className="relative flex items-start justify-between">
                  <span className="grid h-12 w-12 place-items-center rounded-xl bg-white/10 text-brand-300 ring-1 ring-white/15 transition-colors group-hover:bg-brand-500 group-hover:text-white">
                    {icons[s.slug]}
                  </span>
                  <span className="font-display text-xs font-bold tracking-[0.18em] text-white/40">
                    No.{s.number}
                  </span>
                </div>

                {s.subtitle ? (
                  <p className="relative mt-8 mb-2 text-xs font-bold uppercase tracking-[0.1em] text-brand-300">
                    {s.subtitle}
                  </p>
                ) : null}
                <h3 className="relative text-2xl md:text-3xl font-black text-white leading-tight">
                  {s.title}
                </h3>
                <div
                  className="relative mt-4 h-1 w-12 rounded-full bg-brand-400 transition-all duration-300 group-hover:w-20"
                  aria-hidden="true"
                />
                <p className="relative mt-5 text-sm leading-relaxed text-white/70 font-medium">
                  {s.summary}
                </p>

                {s.href ? (
                  <span className="relative mt-6 inline-flex items-center gap-1.5 text-xs font-bold text-brand-300 transition-all group-hover:gap-2.5">
                    詳しく見る
                    <span aria-hidden="true">→</span>
                  </span>
                ) : null}
              </>
            );

            return (
              <li key={s.slug}>
                <Reveal delay={i * 100} className="h-full">
                  {s.href ? (
                    <Link href={localePath(s.href, locale)} className={cardClass}>
                      {cardContent}
                    </Link>
                  ) : (
                    <div className={cardClass}>{cardContent}</div>
                  )}
                </Reveal>
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
