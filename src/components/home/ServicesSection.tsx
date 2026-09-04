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

/** トップページはカテゴリ単位の2枚のみ表示。内訳(6サービス)は/servicesページで確認できる */
const categoryCards: Service[] = [
  {
    slug: "ai-solutions",
    number: "01",
    title: "AIソリューション",
    subtitle: "研修・アドバイザリー・受託開発",
    summary:
      "フィジカルAI研修から経営者向けAIアドバイザー、AI受託開発まで、AI活用をワンストップで支援します。",
    features: [],
    href: "/services#ai-solutions",
    image: "/services/cards/ai-solutions.jpg",
  },
  {
    slug: "talent-solutions",
    number: "02",
    title: "人材ソリューション",
    subtitle: "営業代行・決裁者紹介・エンジニア紹介",
    summary:
      "営業代行事業、決裁者紹介サービス、AIエンジニア紹介まで、貴社に必要な人材・実行力を提供します。",
    features: [],
    href: "/services#talent-solutions",
    image: "/services/cards/talent.jpg",
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
