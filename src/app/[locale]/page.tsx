import { notFound } from "next/navigation";
import { Hero } from "@/components/home/Hero";
import { MissionSection } from "@/components/home/MissionSection";
import { ServicesSection } from "@/components/home/ServicesSection";
import { AboutSection } from "@/components/home/AboutSection";
import { BlogPreview } from "@/components/home/BlogPreview";
import { CTASection } from "@/components/home/CTASection";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionary";

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
      <MissionSection />
      <ServicesSection locale={locale} dict={dict} />
      <AboutSection locale={locale} dict={dict} />
      <BlogPreview locale={locale} dict={dict} />
      <CTASection locale={locale} dict={dict} />
    </>
  );
}
