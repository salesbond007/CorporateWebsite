import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ContactSection } from "@/components/contact/ContactSection";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbJsonLd } from "@/lib/jsonld";
import { localePath } from "@/i18n/path";
import { isLocale } from "@/i18n/config";

export const metadata: Metadata = {
  title: "お問い合わせ/無料相談",
  description:
    "セールスボンド株式会社へのお問い合わせ・無料相談はこちらから。サービスに関するご相談・お見積もり・採用に関するお問い合わせを受け付けています。",
};

export default function ContactPage({
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
          { name: "お問い合わせ/無料相談", url: localePath("/contact", locale) },
        ])}
      />
      <ContactSection locale={locale} />
    </>
  );
}
