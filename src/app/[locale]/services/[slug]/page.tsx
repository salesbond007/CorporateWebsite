import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { Button } from "@/components/ui/Button";
import { Illustration } from "@/components/ui/Illustration";
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
    title: service.title,
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

      {/* Overview */}
      <section className="py-24 md:py-32">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-7">
              <span className="eyebrow">Overview</span>
              <h2 className="mt-5 text-display-2">
                TODO: サービスの提供価値を見出しで。
              </h2>
              <p className="mt-6 text-ink-soft leading-[1.9]">
                TODO: サービスの本文。何を・誰に・どう提供するか。
              </p>
              <p className="mt-4 text-ink-soft leading-[1.9]">
                TODO: 補足。実績や差別化ポイントなど。
              </p>
            </div>
            <div className="lg:col-span-5">
              <div className="rounded-xl2 bg-cream p-8">
                <Illustration variant="abstract" />
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Features */}
      <section className="bg-cream py-24 md:py-32">
        <Container>
          <SectionHeading
            eyebrow="Features"
            title="3つの特長"
            description="TODO: 特長セクションのリード文。"
          />
          <ul className="mt-14 grid gap-6 md:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <li
                key={i}
                className="rounded-xl2 bg-white p-8 shadow-soft"
              >
                <span className="font-display text-2xl font-bold text-brand-500">
                  0{i}
                </span>
                <h3 className="mt-4 text-xl font-bold">TODO: 特長 0{i}</h3>
                <p className="mt-3 text-sm text-ink-soft leading-relaxed">
                  TODO: 特長の説明を3〜5行で。
                </p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* Process */}
      <section className="py-24 md:py-32">
        <Container>
          <SectionHeading
            eyebrow="Process"
            title="導入の流れ"
            description="TODO: プロセスのリード文。"
          />
          <ol className="mt-14 grid gap-6 md:grid-cols-4">
            {["ヒアリング", "ご提案", "実行", "効果検証"].map((step, i) => (
              <li key={step} className="relative">
                <div className="rounded-xl2 border border-ink-line p-6">
                  <span className="font-display text-xs font-bold text-brand-500">
                    STEP 0{i + 1}
                  </span>
                  <h3 className="mt-3 text-base font-bold">{step}</h3>
                  <p className="mt-2 text-sm text-ink-soft leading-relaxed">
                    TODO: 各ステップの説明を1〜2行で。
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {/* CTA */}
      <section className="pb-24 md:pb-32">
        <Container>
          <div className="rounded-xl2 bg-brand-500 px-8 py-14 md:px-14 md:py-16 text-white">
            <div className="grid gap-6 md:grid-cols-2 md:items-center">
              <div>
                <h2 className="text-h1">
                  まずはご相談ください。
                </h2>
                <p className="mt-3 text-white/85">
                  TODO: 問い合わせ誘導の文。
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
                    <p className="mt-2 text-lg font-bold group-hover:text-brand-600">
                      {s.title}
                    </p>
                  </div>
                  <span aria-hidden="true" className="text-ink-muted group-hover:translate-x-1 transition-transform">
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
