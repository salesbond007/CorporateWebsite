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

/** トップページで表示する3つのサービス */
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
    slug: "advisory",
    number: "02",
    title: "顧問事業",
    subtitle: "AI化・DX化・海外展開のプロフェッショナル紹介",
    summary:
      "AI化、DX化、海外展開など、あらゆる経営課題におけるプロフェッショナルをご紹介する顧問サービスです。",
    features: [],
    href: "/services/advisory",
    image: "/services/cards/ai-solutions.jpg",
  },
  {
    slug: "physical-ai-training",
    number: "03",
    title: "フィジカルAI研修",
    subtitle: "生成AI・AIエージェント・フィジカルAI研修",
    summary:
      "生成AIからフィジカルAIまでを体系的に学び、自社・自部署でAI活用を企画できる人材を育成する法人向け研修です。",
    features: [],
    href: "/services/physical-ai-training",
    image: "/services/physical-ai-training/hero.png",
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

        <ul className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
