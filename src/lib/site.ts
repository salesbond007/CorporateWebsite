import type { Dictionary } from "@/i18n/dictionary";

export const site = {
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com",
  /** Used by site-wide JSON-LD; locale-specific copy comes from the dictionary. */
  name: "セールスボンド株式会社",
  legalName: "セールスボンド株式会社",
  legalNameEn: "Sales Bond Co., Ltd.",
  description:
    "セールスボンド株式会社は、人脈紹介(リファラル)を起点とした営業代行・インサイドセールス・顧問紹介・アポイント獲得を提供。大手企業の決裁者へつながる完全成果報酬型のBtoB営業支援で、挑む企業に確実な成果を届けます。",
  /** SEO で狙うキーワード群 — Organization JSON-LD と meta keywords に展開 */
  keywords: [
    "セールスボンド",
    "セールスボンド株式会社",
    "Sales Bond",
    "営業代行",
    "インサイドセールス",
    "IS",
    "顧問",
    "顧問紹介",
    "人脈紹介",
    "営業",
    "リファラル",
    "リファラル営業",
    "紹介営業",
    "アポイント獲得",
    "BtoB営業",
    "BtoB営業支援",
    "決裁者紹介",
    "プロ人材マッチング",
    "プロ人材",
    "営業BPO",
    "飯住",
    "イイズミ",
  ],
  slogan: "挑む企業に最短で、確実な解を。",
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
  registrationNumber: "T8012801023311",
  /** 代表者名 */
  founderName: "飯住",
  founderNameKana: "イイズミ",
} as const;

export type NavKey =
  | "top"
  | "services"
  | "blog"
  | "aiTsushin"
  | "company";

export const navigation: { key: NavKey; href: string }[] = [
  { key: "top", href: "/" },
  { key: "services", href: "/services" },
  { key: "blog", href: "/blog" },
  { key: "aiTsushin", href: "/ai-tsushin" },
  { key: "company", href: "/company" },
];

export const services = [
  {
    slug: "sales-bond",
    number: "01",
    title: "リファボンド",
    subtitle: "大手決裁者紹介サービス",
    summary:
      "人脈紹介を活用した、決裁者開拓サービス。ベンチャーから大企業、地方企業まで、幅広い開拓が可能です。完全成果報酬でご提供します。",
    features: [
      "人脈紹介を活用したキーマン開拓",
      "完全成果報酬制",
      "大手企業からベンチャー企業まで開拓可能",
    ],
    image: "/logo-square.jpg",
    illustrationVariant: "abstract" as const,
    href: "/services/sales-bond",
  },
  {
    slug: "keyman-bond",
    number: "02",
    title: "キーマンボンド",
    subtitle: "プロ人材/顧問マッチングサービス",
    summary:
      "高度な経営課題を、その道のプロと共に解決する経営支援サービス。営業・マーケ・DX・人事・財務など多彩な領域に精通した経営層・CxO・エキスパートクラスの実力者が伴走します。",
    features: [
      "プロ人材が企業の経営課題を解決",
      "事業フェーズに合わせて最適な人材を配置",
    ],
    image: "/logo-square.jpg",
    illustrationVariant: "grid" as const,
    href: "/services/keyman-bond",
  },
  {
    slug: "lead-bond",
    number: "03",
    title: "セルボンド",
    subtitle: "BtoB営業支援サービス",
    summary:
      "営業戦略の策定からアポ獲得・商談・成約、そして営業DX・人材紹介まで。BtoBに特化し、必要な営業ソリューションをワンストップで提供。自走できる営業組織づくりまで伴走します。",
    features: [
      "戦略策定〜成約まで一気通貫で伴走",
      "足りない営業リソースを提供",
    ],
    image: "/logo-square.jpg",
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
