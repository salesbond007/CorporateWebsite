import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbJsonLd } from "@/lib/jsonld";
import { serviceCategories } from "@/lib/site";
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

      {/* Hero: 写真背景+タイトル */}
      <section className="relative overflow-hidden border-b-2 border-ink-line bg-ink">
        <Image
          src="/services/cards/ai-solutions.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div
          className="absolute inset-0 bg-brand-900/45 mix-blend-multiply"
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 bg-[linear-gradient(to_right,rgba(29,5,11,0.85)_0%,rgba(29,5,11,0.55)_45%,rgba(29,5,11,0.15)_75%,rgba(29,5,11,0)_95%)]"
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
              <p className="section-label !text-brand-200">Services</p>
              <h1 className="mt-3 text-display-2 text-white font-black">
                サービス案内
              </h1>
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-white py-24 md:py-32">
        <Container>
          <div className="space-y-20">
            {serviceCategories.map((category) => (
              <div
                key={category.key}
                id={category.key}
                className="scroll-mt-24 md:scroll-mt-28"
              >
                <p className="text-xl md:text-2xl font-black text-ink">
                  {category.title}
                </p>
                <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {category.services.map((s) => {
                    const cardContent = (
                      <>
                        <span className="font-display text-3xl font-bold text-brand-500 transition-colors group-hover:text-white">
                          {s.number}
                        </span>
                        {s.subtitle ? (
                          <p className="mt-6 mb-1 text-sm font-bold text-brand-600 transition-colors group-hover:text-brand-100">
                            {s.subtitle}
                          </p>
                        ) : null}
                        <h2 className="text-xl md:text-2xl font-black text-ink leading-tight transition-colors group-hover:text-white">
                          {s.title}
                        </h2>
                        <p className="mt-4 text-sm text-ink leading-relaxed font-medium transition-colors group-hover:text-white/90">
                          {s.summary}
                        </p>
                        {s.href ? (
                          <span className="mt-5 inline-flex items-center gap-1.5 text-xs font-bold text-brand-600 transition-colors group-hover:text-white">
                            詳しく見る
                            <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">
                              →
                            </span>
                          </span>
                        ) : null}
                      </>
                    );
                    const className =
                      "group block h-full rounded-none border border-ink-line bg-white p-8 transition-all duration-300 hover:border-brand-500 hover:bg-brand-500 hover:shadow-card";
                    return (
                      <li key={s.slug} id={s.slug} className="scroll-mt-24 md:scroll-mt-28">
                        {s.href ? (
                          <Link href={localePath(s.href, locale)} className={className}>
                            {cardContent}
                          </Link>
                        ) : (
                          <div className={className}>{cardContent}</div>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
