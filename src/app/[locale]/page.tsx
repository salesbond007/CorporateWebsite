import { notFound } from "next/navigation";
import { Hero } from "@/components/home/Hero";
import { MissionSection } from "@/components/home/MissionSection";
import { ServicesSection } from "@/components/home/ServicesSection";
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
    </>
  );
}
