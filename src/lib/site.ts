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
  | "company";

export const navigation: { key: NavKey; href: string }[] = [
  { key: "top", href: "/" },
  { key: "services", href: "/services" },
  { key: "company", href: "/company" },
];

export const services = [
  {
    slug: "ai-solutions",
    number: "01",
    title: "AIソリューション",
    subtitle: "生成AI・フィジカルAI・開発・研修",
    summary:
      "生成AIの業務活用からフィジカルAI導入まで、企画・開発・研修をワンストップで支援します。",
    features: ["生成AI活用", "フィジカルAI導入", "研修・開発支援"],
    href: "/services/physical-ai-training",
  },
  {
    slug: "ai-media",
    number: "02",
    title: "AI専門メディア",
    subtitle: "BondAI",
    summary: "AI活用のリアルな知見を発信するオウンドメディア。",
    features: ["AI活用ノウハウを発信", "事例・トレンドを解説"],
    href: undefined,
  },
  {
    slug: "talent",
    number: "03",
    title: "人材",
    subtitle: "営業BPO・エンジニア紹介・顧問紹介",
    summary:
      "営業BPO事業、エンジニア紹介、顧問紹介まで、貴社に必要な人材・実行力を提供します。",
    features: ["営業BPO事業", "エンジニア紹介", "顧問紹介"],
    href: undefined,
  },
  // 以下は現在非公開 (下記コメント解除で復活)
  // {
  //   slug: "sales-bond",
  //   number: "02",
  //   title: "リファボンド",
  //   subtitle: "大手決裁者紹介サービス",
  //   summary:
  //     "人脈紹介を活用した、決裁者開拓サービス。ベンチャーから大企業、地方企業まで、幅広い開拓が可能です。完全成果報酬でご提供します。",
  //   features: [
  //     "人脈紹介を活用したキーマン開拓",
  //     "完全成果報酬制",
  //     "大手企業からベンチャー企業まで開拓可能",
  //   ],
  //   image: "/logo-square.jpg",
  //   illustrationVariant: "abstract" as const,
  // },
  // {
  //   slug: "keyman-bond",
  //   number: "03",
  //   title: "キーマンボンド",
  //   subtitle: "プロ人材/顧問マッチングサービス",
  //   summary:
  //     "高度な経営課題を、その道のプロと共に解決する経営支援サービス。営業・マーケ・DX・人事・財務など多彩な領域に精通した経営層・CxO・エキスパートクラスの実力者が伴走します。",
  //   features: [
  //     "プロ人材が企業の経営課題を解決",
  //     "事業フェーズに合わせて最適な人材を配置",
  //   ],
  //   image: "/logo-square.jpg",
  //   illustrationVariant: "grid" as const,
  // },
  // {
  //   slug: "lead-bond",
  //   number: "04",
  //   title: "セルボンド",
  //   subtitle: "BtoB営業支援サービス",
  //   summary:
  //     "営業戦略の策定からアポ獲得・商談・成約、そして営業DX・人材紹介まで。BtoBに特化し、必要な営業ソリューションをワンストップで提供。自走できる営業組織づくりまで伴走します。",
  //   features: [
  //     "戦略策定〜成約まで一気通貫で伴走",
  //     "足りない営業リソースを提供",
  //   ],
  //   image: "/logo-square.jpg",
  //   illustrationVariant: "blob" as const,
  // },
  // {
  //   slug: "ai-komon",
  //   number: "05",
  //   title: "AI顧問ボンド",
  //   subtitle: "AI顧問サービス",
  //   summary:
  //     "AI活用の相談ならAI顧問ボンド。大手企業技術開発部やIT企業代表などハイクラス層が顧問として伴走。無料相談でロードマップを提示し、月額10万円〜の伴走支援で実装まで導きます。",
  //   features: [
  //     "ハイクラスAIプロフェッショナル 100人＋",
  //     "ロードマップ提示型の伴走支援",
  //     "月額10万円〜、無理な縛りなし",
  //   ],
  //   image: "/logo-square.jpg",
  //   illustrationVariant: "abstract" as const,
  //   href: "/services/ai-komon",
  // },
] as const;

// Each service entry can optionally include an `image` path that
// overrides the inline SVG, and/or an `href` that links to a dedicated
// LP instead of an anchor on /services. e.g. `image: "/illustrations/x.png"`
export type Service = (typeof services)[number] & {
  image?: string;
  href?: string;
};

export function navLabel(dict: Dictionary, key: NavKey): string {
  return dict.nav[key];
}

export const legalLinks = [
  { href: "/privacy", labelKey: "privacy" as const },
  { href: "/terms", labelKey: "terms" as const },
];
