import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { services } from "@/lib/site";
import { localePath } from "@/i18n/path";
import { isLocale, locales } from "@/i18n/config";

type Params = { slug: string; locale: string };

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    services.map((s) => ({ locale, slug: s.slug })),
  );
}

export function generateMetadata({
  params,
}: {
  params: Params;
}): Metadata {
  const service = services.find((s) => s.slug === params.slug);
  if (!service) return {};
  return {
    title: `${service.title} | ${service.subtitle}`,
    description: service.summary,
  };
}

export default function ServiceDetailPage({ params }: { params: Params }) {
  if (!isLocale(params.locale)) notFound();
  const locale = params.locale;
  const service = services.find((s) => s.slug === params.slug);
  if (!service) notFound();

  const others = services.filter((s) => s.slug !== service.slug);

  return (
    <>
      <PageHero
        eyebrow={`Service ${service.number} / ${service.subtitle}`}
        title={service.title}
        description={service.summary}
      />

      {/* メリット */}
      <section className="py-24 md:py-32">
        <Container>
          <SectionHeading eyebrow="Merits" title="本サービスのメリット" />
          <ul className="mt-14 grid gap-6 md:grid-cols-3">
            {service.features.map((feature, i) => (
              <li
                key={feature}
                className="rounded-xl2 border border-ink-line bg-white p-8"
              >
                <span className="font-display text-2xl font-bold text-brand-500">
                  0{i + 1}
                </span>
                <p className="mt-4 text-base font-bold text-ink leading-relaxed">
                  {feature}
                </p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* CTA */}
      <section className="pb-24 md:pb-32">
        <Container>
          <div className="rounded-xl2 bg-brand-500 px-8 py-14 md:px-14 md:py-16 text-white">
            <div className="grid gap-6 md:grid-cols-2 md:items-center">
              <div>
                <h2 className="text-h1">まずはご相談ください。</h2>
                <p className="mt-3 text-white/85">
                  サービス内容のご質問・お見積もりなど、お気軽にお問い合わせください。
                </p>
              </div>
              <div className="md:text-right">
                <Button
                  href={localePath("/contact", locale)}
                  size="lg"
                  className="bg-white !text-brand-600 hover:!bg-brand-50"
                >
                  お問い合わせ
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Other services */}
      <section className="pb-24 md:pb-32">
        <Container>
          <h2 className="text-h2">他のサービス</h2>
          <ul className="mt-8 grid gap-6 md:grid-cols-2">
            {others.map((s) => (
              <li key={s.slug}>
                <Link
                  href={localePath(s.href, locale)}
                  className="group flex items-center justify-between gap-6 rounded-xl2 border border-ink-line p-6 hover:border-brand-300 hover:shadow-soft transition-all"
                >
                  <div>
                    <span className="font-display text-sm font-bold text-brand-500">
                      {s.number}
                    </span>
                    <p className="mt-2 text-xs font-bold text-brand-600">
                      {s.subtitle}
                    </p>
                    <p className="mt-1 text-lg font-bold group-hover:text-brand-600">
                      {s.title}
                    </p>
                  </div>
                  <span
                    aria-hidden="true"
                    className="text-ink-muted group-hover:translate-x-1 transition-transform"
                  >
                    →
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </section>
    </>
  );
}
