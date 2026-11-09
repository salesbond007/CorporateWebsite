import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbJsonLd } from "@/lib/jsonld";
import { serviceCategories, type Service } from "@/lib/site";
import { cn } from "@/lib/cn";
import { localePath } from "@/i18n/path";
import { isLocale, type Locale } from "@/i18n/config";
import { pageMeta, pageMetadata } from "@/lib/seo";

export function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Metadata {
  if (!isLocale(params.locale)) return {};
  return pageMetadata({
    ...pageMeta.services,
    path: "/services",
    locale: params.locale,
  });
}

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
          { name: "サービス一覧", url: localePath("/services", locale) },
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
                サービス一覧
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
                <ul className="mt-8 grid items-start gap-6 md:grid-cols-2">
                  {category.services.map((s) => (
                    <li
                      key={s.slug}
                      id={s.slug}
                      className="scroll-mt-24 md:scroll-mt-28"
                    >
                      <ServiceCard service={s} locale={locale} />
                      {/* このサービスに含まれる個別サービス */}
                      {s.children?.length ? (
                        <div className="mt-3 border-l-2 border-brand-500/30 pl-5 md:ml-8">
                          <p className="mb-3 text-xs font-bold tracking-[0.15em] text-brand-600">
                            {s.title}のサービス
                          </p>
                          <ul className="space-y-3">
                            {s.children.map((ch) => (
                              <li
                                key={ch.slug}
                                id={ch.slug}
                                className="scroll-mt-24 md:scroll-mt-28"
                              >
                                <ServiceCard
                                  service={ch}
                                  locale={locale}
                                  compact
                                />
                              </li>
                            ))}
                          </ul>
                        </div>
                      ) : null}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}

function ServiceCard({
  service: s,
  locale,
  compact,
}: {
  service: Service;
  locale: Locale;
  /** 子サービス用の小さめのカード */
  compact?: boolean;
}) {
  const content = (
    <>
      {compact ? null : (
        <span className="font-display text-3xl font-bold text-brand-500 transition-colors group-hover:text-white">
          {s.number}
        </span>
      )}
      {s.subtitle ? (
        <p
          className={cn(
            "mb-1 text-sm font-bold text-brand-600 transition-colors group-hover:text-brand-100",
            compact ? "" : "mt-6",
          )}
        >
          {s.subtitle}
        </p>
      ) : null}
      <h2
        className={cn(
          "font-black leading-tight text-ink transition-colors group-hover:text-white",
          compact ? "text-lg md:text-xl" : "text-xl md:text-2xl",
        )}
      >
        {s.title}
      </h2>
      <p className="mt-3 text-sm font-medium leading-relaxed text-ink transition-colors group-hover:text-white/90">
        {s.summary}
      </p>
      {s.href ? (
        <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-brand-600 transition-colors group-hover:text-white">
          詳しく見る
          <span
            aria-hidden="true"
            className="transition-transform group-hover:translate-x-1"
          >
            →
          </span>
        </span>
      ) : null}
    </>
  );
  const className = cn(
    "group block border border-ink-line bg-white transition-all duration-300 hover:border-brand-500 hover:bg-brand-500 hover:shadow-card",
    compact ? "p-6" : "p-8",
  );
  return s.href ? (
    <Link href={localePath(s.href, locale)} className={className}>
      {content}
    </Link>
  ) : (
    <div className={className}>{content}</div>
  );
}
