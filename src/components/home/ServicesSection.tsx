import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { ServiceCard } from "@/components/home/ServiceCard";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionary";
import { serviceCategories } from "@/lib/site";

type Props = {
  locale: Locale;
  dict: Dictionary;
};

const cardClass =
  "group relative isolate flex aspect-square h-full flex-col justify-center overflow-hidden rounded-none border-2 border-ink bg-white p-8 transition-all duration-300 hover:-translate-y-1.5 hover:border-white/20 hover:shadow-[0_24px_60px_-18px_rgba(29,5,11,0.55)]";

/** トップページで表示するサービス一覧(LPは別ページ) */
const homeServices = serviceCategories.flatMap((c) => c.services);

export function ServicesSection({ locale }: Props) {
  return (
    <section id="services" className="relative scroll-mt-20 bg-white py-16 md:py-24">
      <Container>
        <p className="text-2xl md:text-3xl font-black text-ink">サービス一覧</p>

        <ul className="mt-14 grid gap-6 sm:grid-cols-2">
          {homeServices.map((s, i) => (
            <li key={s.slug}>
              <Reveal delay={i * 100} className="h-full">
                <ServiceCard service={s} locale={locale} className={cardClass} />
              </Reveal>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
