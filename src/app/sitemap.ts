import type { MetadataRoute } from "next";
import { site, services } from "@/lib/site";
import { getArticles } from "@/lib/microcms";
import { locales } from "@/i18n/config";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = site.url.replace(/\/$/, "");
  const now = new Date();

  const staticPaths = [
    "",
    "/about",
    "/services",
    "/company",
    "/blog",
    "/contact",
    "/contact/business",
    "/contact/professional",
    "/privacy",
    "/terms",
  ];

  const staticEntries: MetadataRoute.Sitemap = locales.flatMap((locale) =>
    staticPaths.map((path) => ({
      url: `${base}/${locale}${path}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority:
        path === ""
          ? 1
          : path === "/privacy" || path === "/terms"
            ? 0.3
            : 0.8,
      alternates: {
        languages: Object.fromEntries(
          locales.map((l) => [l, `${base}/${l}${path}`]),
        ),
      },
    })),
  );

  const serviceEntries: MetadataRoute.Sitemap = locales.flatMap((locale) =>
    services.map((s) => ({
      url: `${base}/${locale}${s.href}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.9,
      alternates: {
        languages: Object.fromEntries(
          locales.map((l) => [l, `${base}/${l}${s.href}`]),
        ),
      },
    })),
  );

  const { contents } = await getArticles({ limit: 100, fields: "slug,updatedAt" });
  const articleEntries: MetadataRoute.Sitemap = locales.flatMap((locale) =>
    contents.map((a) => ({
      url: `${base}/${locale}/blog/${a.slug}`,
      lastModified: new Date(a.updatedAt),
      changeFrequency: "monthly" as const,
      priority: 0.6,
      alternates: {
        languages: Object.fromEntries(
          locales.map((l) => [l, `${base}/${l}/blog/${a.slug}`]),
        ),
      },
    })),
  );

  return [...staticEntries, ...serviceEntries, ...articleEntries];
}
