import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ServiceDetail } from "@/components/services/ServiceDetail";
import { isLocale } from "@/i18n/config";
import { pageMeta, pageMetadata } from "@/lib/seo";

const PATH = "/services/sales";

export function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Metadata {
  if (!isLocale(params.locale)) return {};
  return pageMetadata({ ...pageMeta.sales, path: PATH, locale: params.locale });
}

export default function SalesServicePage({
  params,
}: {
  params: { locale: string };
}) {
  if (!isLocale(params.locale)) notFound();

  return (
    <ServiceDetail
      locale={params.locale}
      path={PATH}
      en="Sales"
      title="新規開拓支援事業"
      subtitle="営業顧問・営業代行"
      description={pageMeta.sales.description}
      image="/services/cards/talent.jpg"
      related={[
        {
          title: "アポコミ（新規開拓支援）",
          text: "テレアポ・フォーム・メール・手紙・SNSを総動員して、新規アポイントを獲りにいくインサイドセールス代行サービスです。",
          href: "/services/apokomi",
        },
      ]}
      // TODO: 本文確定後に差し替え
      lead="営業顧問と営業代行で、新たな顧客の獲得と事業成長を支援します。"
      // TODO: 本文確定後に差し替え
      body={[
        "新しい市場を切り拓くには、戦略づくりから実際の営業活動まで、一貫した取り組みが求められます。",
        "セールスボンドは、営業顧問による戦略面の支援と、営業代行による実行面の支援を組み合わせ、企業の新規開拓を後押しします。ご相談内容に応じて最適な進め方をご案内しますので、お気軽にお問い合わせください。",
      ]}
    />
  );
}
