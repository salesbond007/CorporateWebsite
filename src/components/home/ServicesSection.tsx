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

export function ServicesSection({ locale, dict }: Props) {
  return (
    <section className="relative py-28 md:py-36 bg-cream">
      <Container>
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="section-label">Services</p>
            <p className="mt-3 text-lg md:text-xl font-extrabold text-ink">
              提供する3つのサービス
            </p>
          </div>
          <Link
            href={localePath("/services", locale)}
            className="link-arrow shrink-0"
          >
            {dict.nav.services}
          </Link>
        </div>

        <ul className="mt-14 grid gap-6 md:grid-cols-3">
          {services.map((s, i) => (
            <li key={s.slug}>
              <Reveal delay={i * 100} className="h-full">
                <Link
                  href={localePath(s.href, locale)}
                  className="group block h-full rounded-none border-2 border-ink-line bg-white p-8 transition-all duration-300 hover:-translate-y-1 hover:border-brand-500 hover:shadow-card"
                >
                  <div className="flex items-start justify-between">
                    <span className="text-3xl font-black text-brand-500 leading-none">
                      {s.number}
                    </span>
                    <span
                      className="grid h-10 w-10 place-items-center rounded-full border-2 border-ink-line text-ink-muted transition-all group-hover:border-brand-500 group-hover:bg-brand-500 group-hover:text-white"
                      aria-hidden="true"
                    >
                      →
                    </span>
                  </div>
                  <p className="mt-10 text-base font-bold text-brand-500">
                    {s.subtitle}
                  </p>
                  <h3 className="mt-2 text-2xl md:text-3xl font-black text-ink leading-tight">
                    {s.title}
                  </h3>
                  <div className="mt-4 h-1 w-12 rounded-full bg-brand-500" aria-hidden="true" />
                  <p className="mt-5 text-sm leading-relaxed text-ink font-medium">
                    {s.summary}
                  </p>
                </Link>
              </Reveal>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
