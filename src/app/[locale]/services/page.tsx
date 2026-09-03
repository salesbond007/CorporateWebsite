import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { CTASection } from "@/components/home/CTASection";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbJsonLd } from "@/lib/jsonld";
import { localePath } from "@/i18n/path";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionary";

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
  const dict = getDictionary(locale);

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
              src="/logo-square.jpg"
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

      {/* サービスは一旦データ削除。枠(箱)のみ残す */}
      <section className="py-24 md:py-32">
        <Container>
          <div
            className="min-h-[240px] rounded-xl2 border-2 border-dashed border-ink-line md:min-h-[360px]"
            aria-hidden="true"
          />
        </Container>
      </section>

      {/* CTA (shared with home) */}
      <CTASection locale={locale} dict={dict} />
    </>
  );
}
