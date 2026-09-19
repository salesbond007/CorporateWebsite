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
        // 専用LPは削除。項目自体は掲載を継続(hrefなし)
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
        slug: "ai-komon",
        number: "03",
        title: "AI顧問",
        subtitle: "AI活用の相談窓口",
        summary:
          "AI活用に関する相談ならAI顧問。技術・業務の両面に精通した顧問が伴走し、活用の方向性から実装判断まで支援します。",
        features: [
          "AI活用に関する継続的な相談窓口",
          "技術・業務両面からのアドバイス",
          "実装判断・体制づくりの伴走支援",
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
        slug: "ses",
        number: "01",
        title: "SES・IT人材支援",
        subtitle: "製造業向けエンジニア業務委託",
        summary:
          "機構設計、電気設計、組込み、ロボティクス、品質・規格まで。製造業の開発現場に必要な業務委託エンジニアをご紹介します。",
        features: [
          "製造業の開発現場に強い技術者をご紹介",
          "週数日・短期・顧問・PM支援まで柔軟に対応",
          "要件整理から候補者提案まで伴走",
        ],
        href: "/services/ses",
        image: "/services/cards/talent.jpg",
      },
      {
        slug: "hardware-development",
        number: "02",
        title: "ハードウェア開発支援",
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
      {
        slug: "sales-support",
        number: "03",
        title: "インサイドセールス支援",
        subtitle: "アポイント獲得・商談化の支援",
        summary:
          "戦略設計から実行まで、アポイント獲得・商談化に向けたインサイドセールス業務を支援します。",
        features: [
          "架電・メール等によるアポイント獲得",
          "商談化率向上のための設計・運用",
          "営業ツール活用支援",
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
