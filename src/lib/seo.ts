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
  /** meta keywords(任意) */
  keywords?: readonly string[];
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
  keywords,
}: PageMetaInput): Metadata {
  const suffix = path === "/" ? "" : path;
  const url = `/${locale}${suffix}`;
  return {
    title: { absolute: title },
    description,
    ...(keywords?.length ? { keywords: [...keywords] } : {}),
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
      "セールスボンド株式会社｜AI時代のセキュリティ構築・情報セキュリティ顧問・経営顧問",
    description:
      "守りの「AI時代のセキュリティ構築」と、攻めの「事業グロースの経営顧問」を、プロの力で。セールスボンド株式会社は、情報セキュリティ顧問やホームページのセキュリティ対策、経営顧問・COO紹介、新規開拓支援（アポコミ）を通じて、企業が安心して挑戦できる土台をつくります。",
  },
  services: {
    title: "サービス一覧｜セールスボンド株式会社",
    description:
      "セールスボンド株式会社のサービス一覧です。情報セキュリティ顧問、ホームページセキュリティ対策などの情報セキュリティ対策事業と、顧問・COO紹介、アポコミ（インサイドセールス代行）などの経営顧問事業で、企業の持続的な成長を支援します。",
  },
  security: {
    title:
      "情報セキュリティ対策事業（情報セキュリティ顧問・セキュリティ研修）｜セールスボンド株式会社",
    description:
      "セールスボンド株式会社の情報セキュリティ対策事業。情報セキュリティ顧問による情報セキュリティ体制づくりやAI利用ルールの作成、ホームページのセキュリティ対策で、企業の情報と信頼を守り、安心して事業に挑戦できる環境づくりを支援します。",
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
      "情報セキュリティ顧問｜大手企業と取引したい中小企業の社外CISO・AIセキュリティ対策｜Bond AI",
    description:
      "大手企業と取引したい中小企業のための情報セキュリティ顧問。元 帝国データバンクグループ会社代表が監修し、専門家が社外の情報セキュリティ責任者（社外CISO）として就任。取引先のチェックシート回答、AI利用ルールづくり、個人情報漏洩・ランサムウェア対策まで支援します。月10万円〜（税別）。無料相談受付中。",
    keywords: [
      "情報セキュリティ顧問",
      "セキュリティ顧問",
      "情報セキュリティ",
      "セキュリティ",
      "社外CISO",
      "vCISO",
      "CISO",
      "顧問",
      "AI",
      "AIセキュリティ",
      "生成AI",
      "AI利用ルール",
      "AIガバナンス",
      "個人情報漏洩",
      "情報漏洩対策",
      "ランサムウェア対策",
      "サイバー攻撃",
      "セキュリティチェックシート",
      "委託先評価",
      "SCS評価制度",
      "ISMS",
      "中小企業",
      "大手企業との取引",
      "帝国データバンク",
      "Bond AI",
      "セールスボンド",
    ],
  },

  securityTraining: {
    title:
      "AI時代のセキュリティ研修（全社員研修＋社内CISO育成）｜Bond AI｜セールスボンド株式会社",
    description:
      "セキュリティも、CISOも、内製化する。AI時代の全社員セキュリティ研修と社内CISOの育成を、3カ月でひとつに。オンライン完結、社員向け教材は完成品でお渡し、全6回・約3カ月。無料相談・資料ダウンロード受付中。",
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
