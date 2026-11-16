import { site } from "./site";
import { pageMeta } from "./seo";
import type { Article } from "./microcms";

const base = site.url.replace(/\/$/, "");

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.legalName,
    legalName: site.legalName,
    alternateName: [site.legalNameEn, "Sales Bond", "セールスボンド"],
    url: site.officialUrl,
    description: pageMeta.home.description,
    logo: `${base}/logo-square.png`,
    image: `${base}/logo-square.png`,
    slogan: site.slogan,
    keywords: site.keywords.join(", "),
    knowsAbout: [
      "情報セキュリティ",
      "情報セキュリティ対策",
      "情報セキュリティ顧問",
      "AI情報セキュリティ",
      "情報セキュリティ研修",
      "個人情報漏洩対策",
      "ランサムウェア対策",
      "サイバー攻撃対策",
      "社外CISO（vCISO）",
      "生成AIの利用ルール・AIガバナンス",
      "セキュリティチェックシート対応",
      "SCS評価制度",
      "上場準備（IPO）の情報セキュリティ体制整備",
      "ホームページの情報セキュリティ対策",
      "経営顧問",
      "COO紹介",
      "新規開拓支援",
      "インサイドセールス",
    ],
    foundingDate: site.founded,
    founder: {
      "@type": "Person",
      name: site.founderName,
      alternateName: site.founderNameKana,
    },
    // 〒160-0023 東京都新宿区西新宿3-3-13 西新宿水間ビル2F
    address: {
      "@type": "PostalAddress",
      postalCode: site.address.postalCode,
      addressRegion: site.addressJaParts.region,
      addressLocality: site.addressJaParts.locality,
      streetAddress: site.addressJaParts.street,
      addressCountry: site.address.country,
    },
    contactPoint: [
      {
        "@type": "ContactPoint",
        url: `${base}/ja/contact`,
        contactType: "customer support",
        areaServed: "JP",
        availableLanguage: ["Japanese"],
      },
    ],
    // 対面での打ち合わせ場所
    location: [
      {
        "@type": "Place",
        name: "Tokyo Innovation Base",
        url: "https://tib.metro.tokyo.lg.jp/",
        address: {
          "@type": "PostalAddress",
          postalCode: "100-0005",
          addressRegion: "東京都",
          addressLocality: "千代田区",
          streetAddress: "丸の内3丁目8-3",
          addressCountry: "JP",
        },
      },
      {
        "@type": "Place",
        name: "渋谷駅周辺（打ち合わせ場所）",
        address: {
          "@type": "PostalAddress",
          postalCode: "150-0043",
          addressRegion: "東京都",
          addressLocality: "渋谷区",
          streetAddress: "道玄坂1丁目10 2F-C",
          addressCountry: "JP",
        },
      },
    ],
    sameAs: site.media.map((m) => m.url),
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: site.name,
    alternateName: ["Sales Bond", "セールスボンド"],
    url: base,
    inLanguage: "ja",
    keywords: site.keywords.join(", "),
    publisher: {
      "@type": "Organization",
      name: site.legalName,
      url: base,
      logo: `${base}/logo-square.png`,
    },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${base}/ja/blog/search?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

/**
 * SiteNavigationElement — 主要ナビ項目をクローラに提示し
 * サイトリンク(sitelinks)生成のヒントを与えます。
 */
export function siteNavigationJsonLd(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: items.map((item, i) => ({
      "@type": "SiteNavigationElement",
      position: i + 1,
      name: item.name,
      url: item.url.startsWith("http") ? item.url : `${base}${item.url}`,
    })),
  };
}

/**
 * 各サービスを Service スキーマで出力 — Googleが「サービス内容」を理解し
 * リッチリザルトの候補に上げやすくなる。
 */
export function serviceJsonLd(service: {
  name: string;
  description: string;
  url: string;
  keywords?: string[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: service.name,
    name: service.name,
    description: service.description,
    url: service.url.startsWith("http") ? service.url : `${base}${service.url}`,
    provider: {
      "@type": "Organization",
      name: site.legalName,
      url: base,
    },
    areaServed: "JP",
    keywords: service.keywords?.join(", "),
  };
}

export function breadcrumbJsonLd(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url.startsWith("http") ? item.url : `${base}${item.url}`,
    })),
  };
}

export function articleJsonLd(article: Article) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    image: article.thumbnail ? [article.thumbnail.url] : undefined,
    datePublished: article.publishedAt,
    dateModified: article.updatedAt,
    inLanguage: "ja",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${base}/blog/${article.slug}`,
    },
    publisher: {
      "@type": "Organization",
      name: site.name,
      logo: {
        "@type": "ImageObject",
        url: `${base}/logo-square.png`,
      },
    },
  };
}
