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
    "SES",
    "IT人材支援",
    "業務委託エンジニア",
    "製造業 エンジニア",
    "機構設計",
    "電気設計",
    "組込み",
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
    "ボンドテック",
    "フィジカルAI",
    "ハード",
    "ハードウェア",
    "ハードウェアエンジニア",
    "エンジニア",
    "設計・開発",
    "筐体設計",
    "基板設計",
    "制御設計",
    "ロボティクス",
    "センサ・通信",
    "画像認識",
    "AI実装",
    "品質保証",
    "規格・認証",
    "技術顧問",
    "副業",
    "フリーランス",
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
  | "news"
  | "company";

export const navigation: { key: NavKey; href: string }[] = [
  { key: "top", href: "/" },
  { key: "services", href: "/services" },
  { key: "news", href: "/news" },
  { key: "company", href: "/company" },
];

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
    key: "hardware-ai",
    title: "ハードウェア/フィジカルAI",
    services: [
      {
        slug: "bondtech",
        number: "01",
        title: "ボンドテック",
        subtitle: "ハードウェア/フィジカルAIプロ人材紹介",
        summary:
          "ハードウェアとフィジカルAI領域のエンジニア・PMを、必要な期間だけ企業にご紹介するサービスです。",
        features: [
          "機構・電気・組込み・ロボティクス・AI実装まで幅広く対応",
          "週数日から常駐まで、柔軟な稼働形態でご紹介",
          "弊社独自の登録案件・登録人材でマッチング",
        ],
        href: "/services/bondtech",
        image: "/services/cards/talent.jpg",
      },
      {
        slug: "hardware-development",
        number: "02",
        title: "ハードウェア/フィジカルAI開発支援",
        subtitle: "エンジニア・PM・技術顧問",
        summary:
          "機構から組込み、無線、AI、制御、品質・安全まで。開発の即戦力を、必要な期間だけご提供します。",
        features: [
          "ハードウェア領域のエンジニア・PM・技術顧問を業務委託で提供",
          "機構・電気・組込み・無線・制御・品質安全まで幅広く対応",
          "技術顧問(月1〜2回)からPM参画まで柔軟に対応",
        ],
        href: "/services/hardware-development",
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
