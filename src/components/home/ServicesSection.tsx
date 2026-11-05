import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { ServiceCard } from "@/components/home/ServiceCard";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionary";
import { serviceCategories } from "@/lib/site";

type Props = {
  locale: Locale;
  dict: Dictionary;
};

/** トップページで表示するサービス一覧(LPは別ページ) */
const homeServices = serviceCategories.flatMap((c) => c.services);

export function ServicesSection({ locale }: Props) {
  return (
    <section
      id="services"
      className="relative isolate scroll-mt-20 overflow-hidden bg-cream py-20 md:py-32"
    >
      {/* 背景: ドット + 漂う色面 */}
      <div aria-hidden="true" className="dot-bg-soft absolute inset-0 -z-10" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 -top-24 -z-10 h-96 w-96 animate-blob rounded-full bg-brand-200/40 blur-[110px]"
      />

      <Container>
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionTitle en="Services" ja="サービス" />
          <Reveal variant="fade" delay={300}>
            <p className="max-w-sm text-sm leading-relaxed text-ink-soft">
              攻めの「新規開拓」と、守りの「AIセキュリティ」。
              <br className="hidden md:block" />
              2つのソリューションで企業の成長を支えます。
            </p>
          </Reveal>
        </div>

        <ul className="mt-12 grid gap-6 md:mt-16 md:grid-cols-2 md:gap-8">
          {homeServices.map((s, i) => (
            <li key={s.slug}>
              <Reveal variant="up" delay={i * 150} className="h-full">
                <ServiceCard service={s} locale={locale} />
              </Reveal>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
