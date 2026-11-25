import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Hero } from "@/components/home/Hero";
import { ClientLogos } from "@/components/home/ClientLogos";
import { MissionSection } from "@/components/home/MissionSection";
import { ServicesSection } from "@/components/home/ServicesSection";
import { NewsSection } from "@/components/home/NewsSection";
import { CompanySection } from "@/components/company/CompanySection";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionary";
import { pageMeta, pageMetadata } from "@/lib/seo";

export function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Metadata {
  if (!isLocale(params.locale)) return {};
  return pageMetadata({ ...pageMeta.home, path: "/", locale: params.locale });
}

// ニュース(microCMS)の更新を60秒以内に反映する
export const revalidate = 60;

export default function HomePage({
  params,
}: {
  params: { locale: string };
}) {
  if (!isLocale(params.locale)) notFound();
  const locale = params.locale;
  const dict = getDictionary(locale);

  return (
    <>
      <Hero locale={locale} dict={dict} />
      <ClientLogos />
      <MissionSection />
      <ServicesSection locale={locale} dict={dict} />
      <NewsSection locale={locale} dict={dict} />
      <CompanySection />
    </>
  );
}
