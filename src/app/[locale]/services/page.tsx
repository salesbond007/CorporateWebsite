import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
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
    "セールスボンド株式会社のサービス案内。リファボンド(大手決裁者紹介)、キーマンボンド(プロ人材/顧問マッチング)、セルボンド(BtoB営業支援)、AI顧問ボンド(ハイクラスAIプロが月額10万円〜で伴走)を提供しています。",
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
  "ai-komon": {
    number: "text-[#0766f4]",
    bgTile: "bg-[#e3edff]",
    subtitle: "text-[#003386]",
    hoverTitle: "group-hover:text-[#0766f4]",
    hoverBorder: "hover:border-[#0766f4]",
    featureDot: "bg-[#0766f4]",
    arrow: "text-[#0766f4]",
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

// サービスごとのアイコン（テーマ色で表示）。
// sales-bond: 紹介(人脈)→ users、lead-bond: 売上向上 → trending up、
// keyman-bond: プロ人材 → briefcase。
function ServiceIcon({ slug }: { slug: string }) {
  const common = {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.6,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
    className: "h-full w-full",
  };
  switch (slug) {
    case "sales-bond":
      return (
        <svg {...common}>
          <circle cx="9" cy="8" r="3.2" />
          <circle cx="17" cy="10" r="2.6" />
          <path d="M3 20c0-3.6 2.7-6.2 6-6.2s6 2.6 6 6.2" />
          <path d="M15 20c0-2.6 1.7-4.6 4-4.6s4 2 4 4.6" />
        </svg>
      );
    case "lead-bond":
      return (
        <svg {...common}>
          <path d="M3 17l6-6 4 4 7-7" />
          <path d="M14 8h6v6" />
          <path d="M3 21h18" />
        </svg>
      );
    case "keyman-bond":
      return (
        <svg {...common}>
          <rect x="3" y="7" width="18" height="13" rx="2" />
          <path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2" />
          <path d="M3 13h18" />
          <path d="M11 11h2" />
        </svg>
      );
    case "ai-komon":
      // AI 顧問: 脳ノード + スパーク
      return (
        <svg {...common}>
          <path d="M9 4a3 3 0 0 0-3 3v1a3 3 0 0 0-2 2.8V13a3 3 0 0 0 2 2.8V17a3 3 0 0 0 3 3h1V4H9z" />
          <path d="M15 4a3 3 0 0 1 3 3v1a3 3 0 0 1 2 2.8V13a3 3 0 0 1-2 2.8V17a3 3 0 0 1-3 3h-1V4h1z" />
          <path d="M9.5 9h1M13.5 9h1M9.5 15h1M13.5 15h1" />
          <path d="M12 4v16" />
        </svg>
      );
    default:
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="9" />
        </svg>
      );
  }
}

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

      <section className="py-24 md:py-32">
        <Container>
          <ul className="space-y-6">
            {services.map((s) => {
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

                    {/* Themed icon tile */}
                    <div className="md:col-span-3">
                      <div className={`mx-auto grid aspect-square w-32 place-items-center rounded-2xl ${theme.bgTile} p-7 md:w-full md:max-w-[180px] md:p-10`}>
                        <span className={theme.number}>
                          <ServiceIcon slug={s.slug} />
                        </span>
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
