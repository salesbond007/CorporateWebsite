import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/ui/PageHero";
import { Button } from "@/components/ui/Button";
import { ComingSoon } from "@/components/ui/ComingSoon";
import { services } from "@/lib/site";
import { localePath } from "@/i18n/path";
import { isLocale, locales } from "@/i18n/config";

type Params = { slug: string; locale: string };

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    services.map((s) => ({ locale, slug: s.slug })),
  );
}

export function generateMetadata({
  params,
}: {
  params: Params;
}): Metadata {
  const service = services.find((s) => s.slug === params.slug);
  if (!service) return {};
  return {
    title: `${service.title} | ${service.subtitle}`,
    description: service.summary,
  };
}

export default function ServiceDetailPage({ params }: { params: Params }) {
  if (!isLocale(params.locale)) notFound();
  const locale = params.locale;
  const service = services.find((s) => s.slug === params.slug);
  if (!service) notFound();

  return (
    <>
      <PageHero
        eyebrow={`Service ${service.number} / ${service.subtitle}`}
        title={service.title}
        description={service.summary}
      />

      <ComingSoon message="本サービスの詳細ページは現在準備中です。公開までもうしばらくお待ちください。">
        <Button href={localePath("/services", locale)} variant="secondary">
          サービス一覧へ戻る
        </Button>
        <Button href={localePath("/contact", locale)}>
          お問い合わせ
        </Button>
      </ComingSoon>
    </>
  );
}
