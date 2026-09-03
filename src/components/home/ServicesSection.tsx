import Image from "next/image";
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

const cardClass =
  "group relative isolate flex aspect-square h-full flex-col justify-between overflow-hidden rounded-none border-2 border-ink bg-white p-8 transition-all duration-300 hover:-translate-y-1.5 hover:border-white/20 hover:shadow-[0_24px_60px_-18px_rgba(29,5,11,0.55)]";

export function ServicesSection({ locale, dict }: Props) {
  return (
    <section id="services" className="relative scroll-mt-20 bg-white py-16 md:py-24">
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
                {/* ホバーで浮かび上がる背景写真 */}
                {s.image ? (
                  <Image
                    src={s.image}
                    alt=""
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="absolute inset-0 z-0 object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  />
                ) : null}
                {/* ホバー時のみのダークオーバーレイ(写真の上でテキストを読ませる) */}
                <div
                  aria-hidden="true"
                  className="absolute inset-0 z-0 bg-gradient-to-t from-ink via-ink/85 to-ink/60 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                />

                <div className="relative z-10">
                  {s.subtitle ? (
                    <p className="mb-2 text-xs font-bold uppercase tracking-[0.1em] text-brand-600 transition-colors duration-300 group-hover:text-brand-200">
                      {s.subtitle}
                    </p>
                  ) : null}
                  <h3 className="text-2xl md:text-3xl font-black text-ink leading-tight transition-colors duration-300 group-hover:text-white">
                    {s.title}
                  </h3>
                  <div
                    className="mt-4 h-1 w-12 rounded-full bg-brand-500 transition-all duration-300 group-hover:w-20"
                    aria-hidden="true"
                  />
                </div>

                <div className="relative z-10">
                  <p className="text-sm leading-relaxed text-ink-soft font-medium transition-colors duration-300 group-hover:text-white/80">
                    {s.summary}
                  </p>

                  {s.href ? (
                    <span className="mt-6 inline-flex items-center gap-1.5 text-xs font-bold text-brand-600 transition-all duration-300 group-hover:gap-2.5 group-hover:text-brand-200">
                      詳しく見る
                      <span aria-hidden="true">→</span>
                    </span>
                  ) : null}
                </div>
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
