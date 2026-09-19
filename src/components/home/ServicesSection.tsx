import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { ServiceCard } from "@/components/home/ServiceCard";
import { localePath } from "@/i18n/path";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionary";
import type { Service } from "@/lib/site";

type Props = {
  locale: Locale;
  dict: Dictionary;
};

const cardClass =
  "group relative isolate flex aspect-square h-full flex-col justify-center overflow-hidden rounded-none border-2 border-ink bg-white p-8 transition-all duration-300 hover:-translate-y-1.5 hover:border-white/20 hover:shadow-[0_24px_60px_-18px_rgba(29,5,11,0.55)]";

/** トップページで表示する2つのサービス */
const categoryCards: Service[] = [
  {
    slug: "bondtech",
    number: "01",
    title: "ボンドテック",
    subtitle: "ハードウェア/フィジカルAIプロ人材紹介",
    summary:
      "ハードウェアとフィジカルAI領域のエンジニア・PMを、必要な期間だけ企業にご紹介するサービスです。",
    features: [],
    href: "/services/bondtech",
    image: "/services/cards/talent.jpg",
  },
  {
    slug: "hardware-development",
    number: "02",
    title: "ハードウェア/フィジカルAI開発支援",
    subtitle: "エンジニア・PM・技術顧問",
    summary:
      "機構から組込み、無線、AI、制御、品質・安全まで。開発の即戦力を、必要な期間だけご提供します。",
    features: [],
    href: "/services/hardware-development",
    image: "/services/cards/ai-solutions.jpg",
  },
];

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

        <ul className="mt-14 grid gap-6 sm:grid-cols-2">
          {categoryCards.map((s, i) => (
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
