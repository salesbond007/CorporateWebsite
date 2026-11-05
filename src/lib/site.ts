import type { Dictionary } from "@/i18n/dictionary";

export const site = {
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://salesbond1962.com",
  /** 構造化データ(Organization)に出力する公式URL */
  officialUrl: "https://salesbond1962.com",
  /** Used by site-wide JSON-LD; locale-specific copy comes from the dictionary. */
  name: "セールスボンド株式会社",
  legalName: "セールスボンド株式会社",
  legalNameEn: "Sales Bond Co., Ltd.",
  /** SEO で狙うキーワード群 — Organization JSON-LD と meta keywords に展開 */
  keywords: [
    "セールスボンド",
    "セールスボンド株式会社",
    "Sales Bond",
    "セキュリティ対策",
    "情報セキュリティ",
    "AIセキュリティ",
    "新規開拓",
    "新規開拓支援",
    "営業顧問",
    "営業代行",
    "インサイドセールス",
    "アポイント獲得",
    "BtoB営業",
    "BtoB営業支援",
    "営業BPO",
    "飯住",
    "イイズミ",
  ],
  slogan: "挑む企業に最短で、確実な解を。",
  email: "info@salesbond.jp",
  /** 外部メディア(フッター・メニュー・JSON-LDのsameAsに使用) */
  media: [{ name: "note", url: "https://note.com/bondai1962" }],
  address: {
    postalCode: "160-0023",
    addressJa: "東京都新宿区西新宿3-3-13 西新宿水間ビル2F",
    region: "Tokyo",
    locality: "Shinjuku-ku",
    streetAddress: "Nishi-Shinjuku 3-3-13, Nishi-Shinjuku Mizuma Building 2F",
    country: "JP",
  },
  founded: "2024-07",
  /** 構造化データ用の日本語住所 */
  addressJaParts: {
    region: "東京都",
    locality: "新宿区",
    street: "西新宿3-3-13 西新宿水間ビル2F",
  },
  registrationNumber: "T8012801023311",
  /** 代表者名 */
  founderName: "飯住",
  founderNameKana: "イイズミ",
} as const;

export type NavKey =
  | "top"
  | "services"
  | "blog"
  | "news"
  | "company"
  | "recruit"
  | "contact";

/**
 * トップページ内のセクションへのナビゲーション。
 * サービス一覧・お知らせ・会社概要はトップページ内に集約し、LPのみ別ページとする。
 */
export type NavItem = {
  key: NavKey;
  /** トップページ内のセクションへ移動する場合のアンカー */
  hash?: string;
  /** 別ページへ移動する場合のパス(ロケール接頭辞なし) */
  href?: string;
};

export const navigation: NavItem[] = [
  { key: "top" },
  { key: "services", href: "/services" },
  { key: "news", href: "/news" },
  { key: "company", href: "/company" },
  { key: "contact", href: "/contact" },
];

/** ナビゲーション項目のリンク先を組み立てる */
export function navHref(item: NavItem, locale: string): string {
  const home = `/${locale}`;
  if (item.href) return `${home}${item.href}`;
  return item.hash ? `${home}#${item.hash}` : home;
}

export type Service = {
  slug: string;
  number: string;
  title: string;
  subtitle?: string;
  summary: string;
  features: string[];
  /** 設定時は専用LPへ、未設定時は/servicesの該当カードへのアンカーリンクになる */
  href?: string;
  /** ServicesSectionでhover時に浮かび上がる背景写真 */
  image?: string;
};

export type ServiceCategory = {
  key: string;
  title: string;
  services: Service[];
};

export const serviceCategories: ServiceCategory[] = [
  {
    key: "services",
    title: "サービス",
    services: [
      {
        slug: "ai-security",
        number: "01",
        title: "AIセキュリティ対策",
        href: "/services/security",
        subtitle: "AI Security",
        summary:
          "AIの活用に伴う情報漏えいや不正利用などのリスクに備え、企業の安全なAI活用を支援するソリューションです。",
        features: [],
        image: "/services/cards/ai-solutions.jpg",
      },
      {
        slug: "new-business-development",
        number: "02",
        title: "新規開拓支援",
        href: "/services/sales",
        subtitle: "New Business Development",
        summary:
          "ターゲット選定からアポイント獲得まで、新規顧客の開拓に必要な営業活動をワンストップで支援するソリューションです。",
        features: [],
        image: "/services/cards/talent.jpg",
      },
    ],
  },
];

/** カテゴリを問わず全サービスを横断的に扱いたい場合(Footer等)用のフラット配列 */
export const services: Service[] = serviceCategories.flatMap(
  (c) => c.services,
);

export function navLabel(dict: Dictionary, key: NavKey): string {
  return dict.nav[key];
}

export const legalLinks = [
  { href: "/privacy", labelKey: "privacy" as const },
  { href: "/terms", labelKey: "terms" as const },
];
