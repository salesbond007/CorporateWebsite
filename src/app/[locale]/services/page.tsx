import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { Button } from "@/components/ui/Button";
import { Illustration } from "@/components/ui/Illustration";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbJsonLd } from "@/lib/jsonld";
import { services } from "@/lib/site";
import { localePath } from "@/i18n/path";
import { isLocale } from "@/i18n/config";

export const metadata: Metadata = {
  title: "サービス概要",
  description:
    "セールスボンド株式会社の3つのサービス。セールスボンド(大手決裁者紹介)、キーマンボンド(プロ人材マッチング)、リードボンド(インサイドセールス代行)。",
};

type ServiceWithImage = {
  image?: string;
  illustrationVariant: "abstract" | "grid" | "blob";
};

export default function ServicesPage({
  params,
}: {
  params: { locale: string };
}) {
  if (!isLocale(params.locale)) notFound();
  const locale = params.locale;

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "ホーム", url: localePath("/", locale) },
          { name: "サービス", url: localePath("/services", locale) },
        ])}
      />
      <PageHero
        eyebrow="Services"
        title="サービス概要"
      />

      <section className="py-24 md:py-32">
        <Container>
          <ul className="space-y-6">
            {services.map((s) => {
              const sx = s as typeof s & ServiceWithImage;
              return (
              <li key={s.slug} id={s.slug} className="scroll-mt-24 md:scroll-mt-28">
                <Link
                  href={localePath(s.href, locale)}
                  className="group block rounded-xl2 border border-ink-line bg-white p-8 md:p-10 transition-all hover:border-brand-300 hover:shadow-card"
                >
                  <div className="grid gap-6 md:grid-cols-12 md:items-center">
                    {/* Number */}
                    <div className="md:col-span-1">
                      <span className="font-display text-4xl font-bold text-brand-500">
                        {s.number}
                      </span>
                    </div>

                    {/* Illustration */}
                    <div className="md:col-span-3">
                      <div className="mx-auto aspect-square w-32 rounded-2xl bg-brand-50 p-4 md:w-full md:max-w-[180px]">
                        <Illustration
                          src={sx.image}
                          variant={sx.illustrationVariant}
                          alt={`${s.title} のイラスト`}
                        />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="md:col-span-6">
                      <p className="text-base md:text-lg font-bold text-brand-600">
                        {s.subtitle}
                      </p>
                      <h2 className="mt-2 text-2xl md:text-3xl font-black text-ink leading-tight group-hover:text-brand-600 transition-colors">
                        {s.title}
                      </h2>
                      <p className="mt-5 text-sm md:text-base text-ink leading-relaxed font-medium">
                        {s.summary}
                      </p>
                      <ul className="mt-4 space-y-1.5 text-sm text-ink-soft">
                        {s.features.map((f) => (
                          <li key={f} className="flex gap-2">
                            <span
                              aria-hidden="true"
                              className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500"
                            />
                            <span>{f}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Arrow */}
                    <div className="md:col-span-2 md:text-right">
                      <span className="inline-flex items-center gap-2 text-sm font-semibold text-brand-600">
                        詳しく見る
                        <span
                          aria-hidden="true"
                          className="transition-transform group-hover:translate-x-1"
                        >
                          →
                        </span>
                      </span>
                    </div>
                  </div>
                </Link>
              </li>
              );
            })}
          </ul>
        </Container>
      </section>

      {/* CTA */}
      <section className="pb-24 md:pb-32">
        <Container className="text-center">
          <p className="text-sm text-ink-muted">
            サービスに関するご相談・お見積もりはこちらから
          </p>
          <div className="mt-6">
            <Button
              href={localePath("/contact", locale)}
              size="lg"
              className="!h-16 !px-12 !text-lg shadow-[0_18px_40px_-12px_rgba(245,130,32,0.7)]"
            >
              無料で相談する
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
