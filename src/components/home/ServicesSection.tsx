import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
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
    <section className="py-24 md:py-32">
      <Container>
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            eyebrow="Services"
            title="提供する3つのサービス"
            description="決裁者紹介・プロ人材紹介・インサイドセールス代行で、企業の営業活動を多角的に支援します。"
          />
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
                  className="group block h-full rounded-xl2 border border-ink-line bg-white p-8 transition-all duration-300 hover:-translate-y-1 hover:border-brand-300 hover:shadow-card"
                >
                  <div className="flex items-start justify-between">
                    <span className="font-display text-sm font-bold text-brand-500">
                      {s.number}
                    </span>
                    <span
                      className="grid h-10 w-10 place-items-center rounded-full border border-ink-line text-ink-muted transition-all group-hover:border-brand-500 group-hover:bg-brand-500 group-hover:text-white"
                      aria-hidden="true"
                    >
                      →
                    </span>
                  </div>
                  <h3 className="mt-12 text-xl font-bold text-ink">{s.title}</h3>
                  <p className="mt-1 text-xs font-semibold text-brand-600">
                    {s.subtitle}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-ink-soft">
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
