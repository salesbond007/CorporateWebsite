import { site } from "./site";
import type { Article } from "./microcms";

const base = site.url.replace(/\/$/, "");

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.legalName,
    legalName: site.legalName,
    alternateName: [site.legalNameEn, "Sales Bond", "セールスボンド"],
    url: base,
    logo: `${base}/logo-square.jpg`,
    image: `${base}/logo-square.jpg`,
    description: site.description,
    slogan: site.slogan,
    keywords: site.keywords.join(", "),
    knowsAbout: [
      "営業代行",
      "インサイドセールス",
      "顧問紹介",
      "人脈紹介",
      "リファラル営業",
      "紹介営業",
      "アポイント獲得",
      "BtoB営業支援",
      "決裁者紹介",
      "プロ人材マッチング",
      "営業BPO",
    ],
    email: site.email,
    foundingDate: site.founded,
    founder: {
      "@type": "Person",
      name: site.founderName,
      alternateName: site.founderNameKana,
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.streetAddress,
      addressLocality: site.address.locality,
      addressRegion: site.address.region,
      postalCode: site.address.postalCode,
      addressCountry: site.address.country,
    },
    contactPoint: [
      {
        "@type": "ContactPoint",
        email: site.email,
        contactType: "customer support",
        areaServed: "JP",
        availableLanguage: ["Japanese"],
      },
    ],
    // TODO: SNSアカウントが決まったら sameAs に列挙
    sameAs: [],
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
    description: site.description,
    keywords: site.keywords.join(", "),
    publisher: {
      "@type": "Organization",
      name: site.legalName,
      url: base,
      logo: `${base}/logo-square.jpg`,
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
export function siteNavigationJsonLd(
  items: { name: string; url: string }[],
) {
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

export function breadcrumbJsonLd(
  items: { name: string; url: string }[],
) {
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
        url: `${base}/logo-square.jpg`,
      },
    },
  };
}
