import type { Dictionary } from "@/i18n/dictionary";

export const site = {
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com",
  /** Used by site-wide JSON-LD; locale-specific copy comes from the dictionary. */
  name: "セールスボンド株式会社",
  legalName: "セールスボンド株式会社",
  legalNameEn: "Sales Bond Co., Ltd.",
  description: "TODO: メタディスクリプション（120〜140字）",
  email: "info@salesbond.jp",
  address: {
    postalCode: "160-0023",
    addressJa: "東京都新宿区西新宿3-3-13 西新宿水間ビル2F",
    region: "Tokyo",
    locality: "Shinjuku-ku",
    streetAddress: "Nishi-Shinjuku 3-3-13, Nishi-Shinjuku Mizuma Building 2F",
    country: "JP",
  },
  founded: "2024-07",
  corporateNumber: "8012801023311",
} as const;

export type NavKey =
  | "top"
  | "services"
  | "blog"
  | "company";

export const navigation: { key: NavKey; href: string }[] = [
  { key: "top", href: "/" },
  { key: "services", href: "/services" },
  { key: "blog", href: "/blog" },
  { key: "company", href: "/company" },
];

export const services = [
  {
    slug: "sales-bond",
    number: "01",
    title: "セールスボンド",
    subtitle: "大手決裁者紹介サービス",
    summary:
      "人脈紹介を活用した決裁者開拓サービス。ベンチャー〜大企業、地方まで幅広い開拓が可能。完全成果報酬で実現します。",
    features: [
      "人脈紹介を活用したキーマン開拓",
      "完全成果報酬制（成功報酬のみ）",
      "大手企業からベンチャー企業まで開拓可能",
    ],
    image: "/illustrations/sales-bond.png",
    illustrationVariant: "abstract" as const,
    href: "/services/sales-bond",
  },
  {
    slug: "keyman-bond",
    number: "02",
    title: "キーマンボンド",
    subtitle: "プロ人材マッチングサービス",
    summary:
      "経営課題を解決するプロ人材をご紹介。マーケティング・海外展開・社内DX・人事強化など多彩な領域に対応。",
    features: [
      "プロ人材が企業の経営課題を解決",
      "マーケティング・海外展開・社内DX・人事強化",
      "事業フェーズに合わせて最適な人材を配置",
    ],
    image: "/illustrations/keyman-bond.png",
    illustrationVariant: "grid" as const,
    href: "/services/keyman-bond",
  },
  {
    slug: "lead-bond",
    number: "03",
    title: "リードボンド",
    subtitle: "インサイドセールス代行サービス",
    summary:
      "戦略立案から現場運用まで、インサイドセールスを代行。再現性のあるノウハウを提供し、中小企業のリード獲得に最適。",
    features: [
      "インサイドセールスの代行",
      "戦略立案 + 現場入り + 再現性のあるノウハウ提供",
      "中小企業のリード獲得を加速",
    ],
    image: "/illustrations/lead-bond.png",
    illustrationVariant: "blob" as const,
    href: "/services/lead-bond",
  },
] as const;

// Each service entry can optionally include an `image` path that
// overrides the inline SVG. e.g. `image: "/illustrations/sales-bond.png"`
export type Service = (typeof services)[number] & { image?: string };

export function navLabel(dict: Dictionary, key: NavKey): string {
  return dict.nav[key];
}

export const legalLinks = [
  { href: "/privacy", labelKey: "privacy" as const },
  { href: "/terms", labelKey: "terms" as const },
];
