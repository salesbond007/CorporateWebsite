import type { Dictionary } from "@/i18n/dictionary";

export const site = {
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.salesbond1962.com",
  /** 構造化データ(Organization)に出力する公式URL */
  officialUrl: "https://www.salesbond1962.com",
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
    "CISO",
    "社外CISO",
    "vCISO",
    "セキュリティ顧問",
    "AIセキュリティ顧問",
    "生成AIガイドライン",
    "AI利用ガイドライン",
    "セキュリティチェックシート",
    "ホームページセキュリティ",
    "情報漏洩対策",
    "WordPress保守",
    "脆弱性診断",
    "新規開拓",
    "新規開拓支援",
    "経営顧問",
    "事業グロース",
    "営業顧問",
    "顧問紹介",
    "COO紹介",
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
  /** このサービスに含まれる個別サービス(例: セキュリティ対策 > ホームページセキュリティ対策) */
  children?: Service[];
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
        title: "セキュリティ対策事業",
        href: "/services/security",
        subtitle: "Security",
        summary:
          "AIの活用に伴う情報漏えいや不正利用などのリスクに備え、社外CISO・セキュリティ顧問やホームページのセキュリティ対策で、企業の安全なAI活用を支援するソリューションです。",
        features: [],
        image: "/services/cards/ai-solutions.jpg",
        children: [
          {
            slug: "ciso",
            number: "01-1",
            title: "CISO・セキュリティ顧問",
            href: "/services/ciso",
            subtitle: "CISO / Security Advisor",
            summary:
              "AIを使う会社のための社外CISO。AI利用ガイドラインの作成やAIツールの導入前チェック、セキュリティチェックシート対応まで、AI時代のセキュリティ体制づくりを月額で引き受けます。",
            features: [],
            image: "/services/cards/ai-solutions.jpg",
          },
          {
            slug: "web-security",
            number: "01-2",
            title: "ホームページセキュリティ対策",
            href: "/services/web-security",
            subtitle: "Website Security",
            summary:
              "問い合わせフォームや採用応募など、個人情報の入口になるホームページを守ります。「診断」「保守」「移行」の3つから必要なものだけを選べます。",
            features: [],
            image: "/services/cards/ai-solutions.jpg",
          },
        ],
      },
      {
        slug: "new-business-development",
        number: "02",
        title: "経営顧問事業",
        href: "/services/sales",
        subtitle: "Growth Advisory",
        summary:
          "事業グロースを担う経営顧問・COOの紹介と、新規開拓のプロによるアポイント創出で、ベンチャー企業や新規事業の成長を「攻め」の両面から支援するソリューションです。",
        features: [],
        image: "/services/cards/talent.jpg",
        children: [
          {
            slug: "advisory",
            number: "02-1",
            title: "顧問・COO紹介",
            href: "/services/advisory",
            subtitle: "Executive Advisor / COO",
            summary:
              "3年の成長を1年で。元上場企業役員や元メガバンクCOOなど各業界のプロが経営に伴走し、販路開拓・アライアンス開拓・つながりの紹介でベンチャー企業や新規事業の早期グロースを支援します。",
            features: [],
            image: "/services/cards/talent.jpg",
          },
          {
            slug: "apokomi",
            number: "02-2",
            title: "アポコミ（新規開拓支援）",
            href: "/services/apokomi",
            subtitle: "Inside Sales",
            summary:
              "テレアポ・フォーム・メール・手紙・SNSを総動員して、新規アポイントを獲りにいくインサイドセールス代行サービスです。",
            features: [],
            image: "/services/cards/talent.jpg",
          },
        ],
      },
    ],
  },
];

/** カテゴリを問わず全サービスを横断的に扱いたい場合用のフラット配列(子サービスも含む) */
export const services: Service[] = serviceCategories.flatMap((c) =>
  c.services.flatMap((s) => [s, ...(s.children ?? [])]),
);

export function navLabel(dict: Dictionary, key: NavKey): string {
  return dict.nav[key];
}

export const legalLinks = [
  { href: "/privacy", labelKey: "privacy" as const },
  { href: "/terms", labelKey: "terms" as const },
];
