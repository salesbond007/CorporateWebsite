export const site = {
  name: "Corporate Website",
  tagline: "TODO: コーポレートタグライン",
  description: "TODO: メタディスクリプション（120〜140字）",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com",
  locale: "ja_JP",
} as const;

export const navigation = [
  { label: "私たちについて", href: "/about" },
  { label: "サービス", href: "/services" },
  { label: "記事", href: "/blog" },
  { label: "会社概要", href: "/company" },
] as const;

export const footerLinks = {
  contact: [
    { label: "お問い合わせ（企業様）", href: "/contact/business" },
    { label: "お問い合わせ（プロ人材）", href: "/contact/professional" },
  ],
  legal: [
    { label: "プライバシーポリシー", href: "/privacy" },
    { label: "利用規約", href: "/terms" },
  ],
} as const;

export const services = [
  {
    slug: "service-01",
    number: "01",
    title: "サービス名 01",
    summary: "TODO: サービス01の概要を1〜2行で。",
    href: "/services/service-01",
  },
  {
    slug: "service-02",
    number: "02",
    title: "サービス名 02",
    summary: "TODO: サービス02の概要を1〜2行で。",
    href: "/services/service-02",
  },
  {
    slug: "service-03",
    number: "03",
    title: "サービス名 03",
    summary: "TODO: サービス03の概要を1〜2行で。",
    href: "/services/service-03",
  },
] as const;

export type Service = (typeof services)[number];
