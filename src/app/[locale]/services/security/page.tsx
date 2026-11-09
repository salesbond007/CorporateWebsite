import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ServiceDetail } from "@/components/services/ServiceDetail";
import { isLocale } from "@/i18n/config";
import { pageMeta, pageMetadata } from "@/lib/seo";

const PATH = "/services/security";

export function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Metadata {
  if (!isLocale(params.locale)) return {};
  return pageMetadata({ ...pageMeta.security, path: PATH, locale: params.locale });
}

export default function SecurityServicePage({
  params,
}: {
  params: { locale: string };
}) {
  if (!isLocale(params.locale)) notFound();

  return (
    <ServiceDetail
      locale={params.locale}
      path={PATH}
      en="Security"
      title="セキュリティ対策事業"
      description={pageMeta.security.description}
      image="/services/cards/ai-solutions.jpg"
      related={[
        {
          title: "ホームページセキュリティ対策",
          text: "問い合わせフォームや採用応募など、個人情報の入口になるホームページを「診断」「保守」「移行」で守ります。無料相談も受け付けています。",
          href: "/services/web-security",
        },
      ]}
      // TODO: 本文確定後に差し替え
      lead="企業の情報と信頼を守り、安心して事業に挑戦できる環境づくりを支援します。"
      // TODO: 本文確定後に差し替え
      body={[
        "AIの活用が広がる一方で、情報漏えいや不正利用といったリスクへの備えは、企業にとって欠かせないものになっています。",
        "セールスボンドは、企業ごとの状況に合わせたセキュリティ対策をご提案し、安全に事業を進めるための土台づくりを支援します。ご相談内容に応じて最適な進め方をご案内しますので、お気軽にお問い合わせください。",
      ]}
    />
  );
}
