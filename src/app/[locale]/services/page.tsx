import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { Illustration } from "@/components/ui/Illustration";
import { CTASection } from "@/components/home/CTASection";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbJsonLd } from "@/lib/jsonld";
import { services } from "@/lib/site";
import { localePath } from "@/i18n/path";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionary";

export const metadata: Metadata = {
  title: "サービス案内",
  description:
    "セールスボンド株式会社の3つのサービス。リファボンド(大手決裁者紹介)、キーマンボンド(プロ人材マッチング)、セルボンド(BtoB営業支援サービス)。",
};

type ServiceWithImage = {
  image?: string;
  illustrationVariant: "abstract" | "grid" | "blob";
};

// サービスごとのテーマカラー。Tailwind に静的に拾わせるため、完全なクラス名を列挙。
type SlugTheme = {
  number: string;
  bgTile: string;
  subtitle: string;
  hoverTitle: string;
  hoverBorder: string;
  featureDot: string;
  arrow: string;
};

const themeBySlug: Record<string, SlugTheme> = {
  "sales-bond": {
    number: "text-emerald-500",
    bgTile: "bg-emerald-50",
    subtitle: "text-emerald-600",
    hoverTitle: "group-hover:text-emerald-600",
    hoverBorder: "hover:border-emerald-300",
    featureDot: "bg-emerald-500",
    arrow: "text-emerald-600",
  },
  "lead-bond": {
    number: "text-sky-500",
    bgTile: "bg-sky-50",
    subtitle: "text-sky-600",
    hoverTitle: "group-hover:text-sky-600",
    hoverBorder: "hover:border-sky-300",
    featureDot: "bg-sky-500",
    arrow: "text-sky-600",
  },
  "keyman-bond": {
    number: "text-rose-700",
    bgTile: "bg-rose-50",
    subtitle: "text-rose-700",
    hoverTitle: "group-hover:text-rose-700",
    hoverBorder: "hover:border-rose-300",
    featureDot: "bg-rose-700",
    arrow: "text-rose-700",
  },
};

const fallbackTheme: SlugTheme = {
  number: "text-brand-500",
  bgTile: "bg-brand-50",
  subtitle: "text-brand-600",
  hoverTitle: "group-hover:text-brand-600",
  hoverBorder: "hover:border-brand-300",
  featureDot: "bg-brand-500",
  arrow: "text-brand-600",
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
      <PageHero
        eyebrow="Services"
        title="サービス案内"
      />

      <section className="py-24 md:py-32">
        <Container>
          <ul className="space-y-6">
            {services.map((s) => {
              const sx = s as typeof s & ServiceWithImage;
              const theme = themeBySlug[s.slug] ?? fallbackTheme;
              return (
              <li key={s.slug} id={s.slug} className="scroll-mt-24 md:scroll-mt-28">
                <Link
                  href={localePath(s.href, locale)}
                  className={`group block rounded-xl2 border border-ink-line bg-white p-8 md:p-10 transition-all ${theme.hoverBorder} hover:shadow-card`}
                >
                  <div className="grid gap-6 md:grid-cols-12 md:items-center">
                    {/* Number */}
                    <div className="md:col-span-1">
                      <span className={`font-display text-4xl font-bold ${theme.number}`}>
                        {s.number}
                      </span>
                    </div>

                    {/* Illustration */}
                    <div className="md:col-span-3">
                      <div className={`mx-auto aspect-square w-32 rounded-2xl ${theme.bgTile} p-4 md:w-full md:max-w-[180px]`}>
                        <Illustration
                          src={sx.image}
                          variant={sx.illustrationVariant}
                          alt={`${s.title} のイラスト`}
                        />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="md:col-span-6">
                      {s.subtitle ? (
                        <p className={`mb-2 text-base md:text-lg font-bold ${theme.subtitle}`}>
                          {s.subtitle}
                        </p>
                      ) : null}
                      <h2 className={`text-2xl md:text-3xl font-black text-ink leading-tight ${theme.hoverTitle} transition-colors`}>
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
                              className={`mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full ${theme.featureDot}`}
                            />
                            <span>{f}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Arrow */}
                    <div className="md:col-span-2 md:text-right">
                      <span className={`inline-flex items-center gap-2 text-sm font-semibold ${theme.arrow}`}>
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

      {/* CTA (shared with home) */}
      <CTASection locale={locale} dict={dict} />
    </>
  );
}
