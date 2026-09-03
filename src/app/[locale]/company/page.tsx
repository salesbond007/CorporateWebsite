import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CompanySection } from "@/components/company/CompanySection";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbJsonLd } from "@/lib/jsonld";
import { localePath } from "@/i18n/path";
import { isLocale } from "@/i18n/config";

export const metadata: Metadata = {
  title: "会社概要",
  description:
    "セールスボンド株式会社（Sales Bond Co., Ltd.）の会社概要。本社所在地、代表者、事業内容（大手決裁者紹介サービス・プロ人材/顧問マッチングサービス・営業BPO事業）など。",
};

export default function CompanyPage({
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
          { name: "会社概要", url: localePath("/company", locale) },
        ])}
      />
      <CompanySection />
    </>
  );
}
