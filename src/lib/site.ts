import type { Dictionary } from "@/i18n/dictionary";

export const site = {
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com",
  /** Used by site-wide JSON-LD; locale-specific copy comes from the dictionary. */
  name: "Corporate Website",
  description: "TODO: メタディスクリプション（120〜140字）",
} as const;

export type NavKey =
  | "about"
  | "services"
  | "blog"
  | "company";

export const navigation: { key: NavKey; href: string }[] = [
  { key: "about", href: "/about" },
  { key: "services", href: "/services" },
  { key: "blog", href: "/blog" },
  { key: "company", href: "/company" },
];

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

export function navLabel(dict: Dictionary, key: NavKey): string {
  return dict.nav[key];
}

export const legalLinks = [
  { href: "/privacy", labelKey: "privacy" as const },
  { href: "/terms", labelKey: "terms" as const },
];
