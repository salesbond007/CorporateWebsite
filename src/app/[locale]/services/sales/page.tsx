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
      en="Growth Advisory"
      title="経営顧問事業"
      subtitle="経営顧問・新規開拓"
      description={pageMeta.sales.description}
      image="/services/cards/talent.jpg"
      related={[
        {
          title: "顧問・COO紹介",
          text: "3年の成長を1年で。各業界のプロが経営に伴走し、販路開拓・アライアンス開拓・つながりの紹介で早期グロースを支援します。",
          href: "/services/advisory",
        },
        {
          title: "アポコミ（新規開拓支援）",
          text: "テレアポ・フォーム・メール・手紙・SNSを総動員して、新規アポイントを獲りにいくインサイドセールス代行サービスです。",
          href: "/services/apokomi",
        },
        {
          title: "顧問・COO紹介",
          text: "3年の成長を1年で。各業界のプロが経営に伴走し、販路開拓・アライアンス開拓・つながりの紹介で早期グロースを支援します。",
          href: "/services/advisory",
        },
      ]}
      // TODO: 本文確定後に差し替え
      lead="事業グロースを担う経営顧問と、新規開拓のプロで、企業の成長を「攻め」から支援します。"
      // TODO: 本文確定後に差し替え
      body={[
        "新しい市場を切り拓くには、戦略づくりから実際の営業活動まで、一貫した取り組みが求められます。",
        "セールスボンドは、事業グロースを担う経営顧問・COOによる戦略面の支援と、新規開拓のプロによる実行面の支援を組み合わせ、企業の成長を後押しします。ご相談内容に応じて最適な進め方をご案内しますので、お気軽にお問い合わせください。",
      ]}
    />
  );
}
