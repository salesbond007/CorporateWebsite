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
    key: "ai-solutions",
    title: "AIソリューション",
    services: [
      {
        slug: "physical-ai-training",
        number: "01",
        title: "フィジカルAI研修",
        subtitle: "生成AI・AIエージェント・フィジカルAI研修",
        summary:
          "生成AIからフィジカルAIまでを体系的に学び、自社・自部署でAI活用を企画できる人材を育成する法人向け研修です。",
        features: [
          "生成AI・AIエージェント・フィジカルAIを体系的に学習",
          "全社員からAI活用の種を発掘",
          "研修後のAI導入コンサルティング",
        ],
        href: "/services/physical-ai-training",
        image: "/services/physical-ai-training/hero.png",
      },
      {
        slug: "ai-advisor",
        number: "02",
        title: "経営者向けAIアドバイザー",
        subtitle: "AI活用の意思決定を伴走支援",
        summary:
          "経営者に伴走し、AI活用の意思決定や投資判断、社内体制づくりを支援するアドバイザリーサービスです。",
        features: [
          "経営視点でのAI活用戦略策定",
          "投資判断・社内体制づくりの伴走支援",
          "最新AIトレンドのキャッチアップ支援",
        ],
        image: "/services/cards/ai-solutions.jpg",
      },
      {
        slug: "ai-development",
        number: "03",
        title: "AI受託開発",
        subtitle: "生成AI・業務システム開発",
        summary:
          "生成AIを活用した業務システムやプロダクトの企画・開発を、要件定義から実装まで一気通貫で支援します。",
        features: [
          "要件定義〜実装までワンストップ",
          "生成AI・フィジカルAIの実装支援",
          "既存システムとの連携開発",
        ],
        image: "/services/cards/ai-solutions.jpg",
      },
    ],
  },
  {
    key: "talent-solutions",
    title: "人材ソリューション",
    services: [
      {
        slug: "sales-agency",
        number: "01",
        title: "営業代行事業",
        subtitle: "インサイドセールス・営業BPO",
        summary:
          "営業戦略の立案からアポイント獲得、商談まで、貴社の営業活動を代行します。",
        features: [
          "営業戦略の立案・実行",
          "インサイドセールス代行",
          "アポイント獲得〜商談支援",
        ],
        image: "/services/cards/talent.jpg",
      },
      {
        slug: "executive-referral",
        number: "02",
        title: "決裁者紹介サービス",
        subtitle: "人脈紹介型の商談創出",
        summary:
          "人脈紹介を活用し、大手企業をはじめとした決裁者へつながる商談機会を創出する完全成果報酬型サービスです。",
        features: [
          "人脈紹介による決裁者開拓",
          "完全成果報酬制",
          "大手企業からベンチャー企業まで対応",
        ],
        image: "/services/cards/talent.jpg",
      },
      {
        slug: "ai-engineer-referral",
        number: "03",
        title: "AIエンジニア紹介事業",
        subtitle: "AI・機械学習領域の人材紹介",
        summary:
          "生成AI・機械学習・データ分析領域に強みを持つエンジニア人材をご紹介します。",
        features: [
          "AI・機械学習領域に特化した人材紹介",
          "貴社の開発フェーズに合わせた提案",
          "業務委託・正社員紹介に対応",
        ],
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
