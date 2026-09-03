import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbJsonLd } from "@/lib/jsonld";
import { services } from "@/lib/site";
import { localePath } from "@/i18n/path";
import { isLocale } from "@/i18n/config";

export const metadata: Metadata = {
  title: "サービス案内",
  description: "セールスボンド株式会社のサービス案内。",
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
          { name: "サービス案内", url: localePath("/services", locale) },
        ])}
      />

      {/* Hero with company logo on the left */}
      <section className="relative overflow-hidden border-b-2 border-ink-line bg-cream">
        <div className="absolute inset-0 dot-bg opacity-60" aria-hidden="true" />
        <div
          className="absolute -top-32 -right-32 h-96 w-96 rounded-full bg-brand-200/50 blur-3xl"
          aria-hidden="true"
        />
        <Container className="relative py-20 md:py-28">
          <div className="flex flex-col items-center gap-6 md:flex-row md:items-center md:gap-8">
            <Image
              src="/logo-square.png"
              alt="セールスボンド株式会社"
              width={160}
              height={160}
              className="h-24 w-24 shrink-0 rounded-xl shadow-soft md:h-32 md:w-32"
              priority
            />
            <div>
              <p className="section-label !text-brand-500">Services</p>
              <h1 className="mt-3 text-display-2 text-ink font-black">
                サービス案内
              </h1>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-24 md:py-32">
        <Container>
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => {
              const href = s.href
                ? localePath(s.href, locale)
                : `${localePath("/services", locale)}#${s.slug}`;
              return (
                <li key={s.slug} id={s.slug} className="scroll-mt-24 md:scroll-mt-28">
                  <Link
                    href={href}
                    className="group block h-full rounded-xl2 border border-ink-line bg-white p-8 transition-all hover:border-brand-300 hover:shadow-card"
                  >
                    <span className="font-display text-3xl font-bold text-brand-500">
                      {s.number}
                    </span>
                    {s.subtitle ? (
                      <p className="mt-6 mb-1 text-sm font-bold text-brand-600">
                        {s.subtitle}
                      </p>
                    ) : null}
                    <h2 className="text-xl md:text-2xl font-black text-ink leading-tight group-hover:text-brand-600 transition-colors">
                      {s.title}
                    </h2>
                    <p className="mt-4 text-sm text-ink leading-relaxed font-medium">
                      {s.summary}
                    </p>
                    <span className="mt-5 inline-flex items-center gap-1.5 text-xs font-bold text-brand-600">
                      詳しく見る
                      <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">
                        →
                      </span>
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </Container>
      </section>
    </>
  );
}
