import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { Noto_Sans_JP } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { BackToTop } from "@/components/ui/BackToTop";
import { JsonLd } from "@/components/seo/JsonLd";
import { organizationJsonLd, websiteJsonLd, siteNavigationJsonLd } from "@/lib/jsonld";
import { site } from "@/lib/site";
import { isLocale, locales, ogLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionary";
import "../globals.css";

const notoSansJp = Noto_Sans_JP({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-noto-sans-jp",
  display: "swap",
});

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  if (!isLocale(params.locale)) return {};
  const dict = getDictionary(params.locale);

  return {
    metadataBase: new URL(site.url),
    applicationName: site.name,
    title: {
      default: dict.site.name,
      template: `%s | ${dict.site.name}`,
    },
    description: dict.site.description,
    keywords: [...site.keywords],
    authors: [{ name: site.legalName, url: site.url }],
    creator: site.legalName,
    publisher: site.legalName,
    category: "Business Services",
    alternates: {
      canonical: `/${params.locale}`,
      languages: {
        ja: "/ja",
        en: "/en",
        "x-default": "/ja",
      },
    },
    openGraph: {
      type: "website",
      locale: ogLocale(params.locale),
      url: `${site.url}/${params.locale}`,
      siteName: dict.site.name,
      title: dict.site.name,
      description: dict.site.description,
    },
    twitter: {
      card: "summary_large_image",
      title: dict.site.name,
      description: dict.site.description,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-snippet": -1,
        "max-image-preview": "large",
        "max-video-preview": -1,
      },
    },
  };
}

export const viewport: Viewport = {
  themeColor: "#7A1E35",
  width: "device-width",
  initialScale: 1,
};

export default function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  if (!isLocale(params.locale)) notFound();
  const locale = params.locale as Locale;
  const dict = getDictionary(locale);

  return (
    <html lang={locale} className={notoSansJp.variable}>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-brand-500 focus:px-4 focus:py-2 focus:text-white"
        >
          {dict.nav.skipToContent}
        </a>
        <Header locale={locale} dict={dict} />
        <main id="main">{children}</main>
        <Footer locale={locale} dict={dict} />
        <BackToTop label={dict.buttons.backToTop} />
        <JsonLd
          data={[
            organizationJsonLd(),
            websiteJsonLd(),
            siteNavigationJsonLd([
              { name: "ホーム", url: `/${locale}` },
              { name: "サービス案内", url: `/${locale}/services` },
              { name: "会社概要", url: `/${locale}/company` },
              { name: "お問い合わせ", url: `/${locale}/contact` },
            ]),
          ]}
        />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
