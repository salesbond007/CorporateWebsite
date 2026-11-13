import type { Metadata } from "next";
import { site } from "@/lib/site";
import { ogLocale, type Locale } from "@/i18n/config";

type PageMetaInput = {
  /** ページタイトル(レイアウトのテンプレートを使わず、この文字列をそのまま出力) */
  title: string;
  description: string;
  /** ロケール接頭辞なしのパス。トップは "/" */
  path: string;
  locale: Locale;
};

/**
 * 各ページの title / description / canonical / OGP / Twitter を一括で組み立てる。
 * og:title・og:description は title・description と同じ内容にそろえる。
 */
export function pageMetadata({
  title,
  description,
  path,
  locale,
}: PageMetaInput): Metadata {
  const suffix = path === "/" ? "" : path;
  const url = `/${locale}${suffix}`;
  return {
    title: { absolute: title },
    description,
    alternates: {
      canonical: url,
      languages: {
        ja: `/ja${suffix}`,
        en: `/en${suffix}`,
        "x-default": `/ja${suffix}`,
      },
    },
    openGraph: {
      type: "website",
      locale: ogLocale(locale),
      url,
      siteName: site.name,
      title,
      description,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

/** 各ページのメタ情報(文言は確定版。変更時はここを編集) */
export const pageMeta = {
  home: {
    title:
      "セールスボンド株式会社｜AI時代のセキュリティ構築・社外CISO/セキュリティ顧問・経営顧問",
    description:
      "守りの「AI時代のセキュリティ構築」と、攻めの「事業グロースの経営顧問」を、プロの力で。セールスボンド株式会社は、社外CISO・セキュリティ顧問やホームページのセキュリティ対策、経営顧問・COO紹介、新規開拓支援（アポコミ）を通じて、企業が安心して挑戦できる土台をつくります。",
  },
  services: {
    title: "サービス一覧｜セールスボンド株式会社",
    description:
      "セールスボンド株式会社のサービス一覧です。CISO・セキュリティ顧問、ホームページセキュリティ対策などのセキュリティ対策事業と、顧問・COO紹介、アポコミ（インサイドセールス代行）などの経営顧問事業で、企業の持続的な成長を支援します。",
  },
  security: {
    title:
      "セキュリティ対策事業（AIセキュリティ・社外CISO・セキュリティ顧問）｜セールスボンド株式会社",
    description:
      "セールスボンド株式会社のセキュリティ対策事業。AI時代の社外CISO・セキュリティ顧問によるAI利用ガイドラインの作成やセキュリティ体制づくり、ホームページのセキュリティ対策で、企業の情報と信頼を守り、安心して事業に挑戦できる環境づくりを支援します。",
  },
  sales: {
    title:
      "経営顧問事業（顧問・COO紹介・新規開拓支援）｜セールスボンド株式会社",
    description:
      "セールスボンド株式会社の経営顧問事業。元上場企業役員や元メガバンクCOOなど事業グロースを担う経営顧問・COOの紹介と、新規開拓のプロによるアポイント創出（アポコミ）で、企業の成長を支援します。",
  },
  webSecurity: {
    title:
      "ホームページセキュリティ対策（診断・保守・移行）｜セールスボンド株式会社",
    description:
      "問い合わせフォーム、採用応募、会員登録など、ホームページは個人情報の受付窓口であり、同時にサイバー攻撃の標的でもあります。AI時代に求められる水準のセキュリティ対策で、情報漏洩のリスクを低減します。診断・保守・移行から選べ、無料相談も受け付けています。",
  },
  apokomi: {
    title: "インサイドセールス代行・アポイント獲得代行｜アポコミ",
    description:
      "アポコミは、テレアポ・フォーム・メール・手紙・SNSを総動員して、新規アポイントを獲りにいくインサイドセールス代行サービスです。準備から実行・改善までまるごと担当します。料金は要見積もり。無料相談・見積もり依頼を受け付けています。",
  },
  ciso: {
    title:
      "Bond AI｜AI時代のセキュリティ顧問・社外CISO｜中小・中堅企業のAIセキュリティ",
    description:
      "AIを禁止しない会社に、セキュリティの責任者を。Bond AIは、資格を持つセキュリティの専門家が社外CISO・セキュリティ顧問として月額でつくサービスです。生成AIの利用ルールづくり、AIツールの導入前チェック、取引先のセキュリティチェックシート回答、SCS評価制度への備えまで。月8万円から。無料の「AI利用チェック」受付中。",
  },

  advisory: {
    title: "顧問・COO紹介｜3年の成長を1年で実現｜セールスボンド株式会社",
    description:
      "元上場企業役員や元メガバンクCOOなど、各業界のプロが経営に伴走する顧問・COO紹介サービス。販路開拓、アライアンス開拓、つながりの紹介で、ベンチャー企業や新規事業の早期グロースを支援します。無料相談受付中。",
  },
  contact: {
    title: "お問い合わせ｜セールスボンド株式会社",
    description:
      "セールスボンド株式会社へのお問い合わせはこちら。セキュリティ対策・経営顧問・新規開拓支援に関するご相談を受け付けています。",
  },
  company: {
    title: "会社概要｜セールスボンド株式会社",
    description:
      "セールスボンド株式会社の会社概要です。所在地、設立、事業内容などをご紹介します。",
  },
} as const;
