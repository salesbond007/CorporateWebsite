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
      "セールスボンド株式会社｜AIセキュリティ・社外CISO/セキュリティ顧問・新規開拓支援",
    description:
      "セールスボンド株式会社は、セキュリティ対策事業と新規開拓支援事業を通じて、企業の持続的な成長を支援します。AI時代の社外CISO・セキュリティ顧問、ホームページのセキュリティ対策といった「守り」と、新たな顧客を生む「攻め」の両面から、プロの力で企業を支えます。",
  },
  services: {
    title: "サービス一覧｜セールスボンド株式会社",
    description:
      "セールスボンド株式会社のサービス一覧です。CISO・セキュリティ顧問、ホームページセキュリティ対策などのセキュリティ対策事業と、アポコミ（インサイドセールス代行）、顧問・COO紹介などの新規開拓支援事業で、企業の持続的な成長を支援します。",
  },
  security: {
    title:
      "セキュリティ対策事業（AIセキュリティ・社外CISO・セキュリティ顧問）｜セールスボンド株式会社",
    description:
      "セールスボンド株式会社のセキュリティ対策事業。AI時代の社外CISO・セキュリティ顧問によるAI利用ガイドラインの作成やセキュリティ体制づくり、ホームページのセキュリティ対策で、企業の情報と信頼を守り、安心して事業に挑戦できる環境づくりを支援します。",
  },
  sales: {
    title: "新規開拓支援事業（営業顧問・営業代行）｜セールスボンド株式会社",
    description:
      "セールスボンド株式会社の新規開拓支援事業。営業顧問と営業代行で、新たな顧客の獲得と事業成長を支援します。",
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
      "社外CISO・セキュリティ顧問｜AI時代のセキュリティ体制構築｜セールスボンド株式会社",
    description:
      "AIを使う会社のための社外CISO・セキュリティ顧問。生成AIの利用ガイドライン作成、AIツールの導入前チェック、セキュリティチェックシートへの回答、上場準備（IPO）や大手企業との取引に必要なセキュリティ体制づくりを月額で支援します。セキュリティ専任者がいない企業に。無料相談受付中。",
  },
  advisory: {
    title: "顧問・COO紹介｜3年の成長を1年で実現｜セールスボンド株式会社",
    description:
      "元上場企業役員や元メガバンクCOOなど、各業界のプロが経営に伴走する顧問・COO紹介サービス。販路開拓、アライアンス開拓、つながりの紹介で、ベンチャー企業や新規事業の早期グロースを支援します。無料相談受付中。",
  },
  contact: {
    title: "お問い合わせ｜セールスボンド株式会社",
    description:
      "セールスボンド株式会社へのお問い合わせはこちら。セキュリティ対策・新規開拓支援に関するご相談を受け付けています。",
  },
  company: {
    title: "会社概要｜セールスボンド株式会社",
    description:
      "セールスボンド株式会社の会社概要です。所在地、設立、事業内容などをご紹介します。",
  },
} as const;
