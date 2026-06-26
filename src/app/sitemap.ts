import type { MetadataRoute } from "next";
import { site, services } from "@/lib/site";
import { getArticles } from "@/lib/microcms";
import { locales } from "@/i18n/config";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = site.url.replace(/\/$/, "");
  const now = new Date();

  type StaticPath = {
    path: string;
    priority: number;
    changeFrequency: "daily" | "weekly" | "monthly" | "yearly";
  };
  const staticPaths: StaticPath[] = [
    { path: "", priority: 1.0, changeFrequency: "weekly" },
    { path: "/services", priority: 0.9, changeFrequency: "monthly" },
    { path: "/blog", priority: 0.8, changeFrequency: "daily" },
    { path: "/contact", priority: 0.8, changeFrequency: "monthly" },
    { path: "/contact/partner", priority: 0.7, changeFrequency: "monthly" },
    { path: "/company", priority: 0.7, changeFrequency: "monthly" },
    { path: "/privacy", priority: 0.3, changeFrequency: "yearly" },
    { path: "/terms", priority: 0.3, changeFrequency: "yearly" },
  ];

  const staticEntries: MetadataRoute.Sitemap = locales.flatMap((locale) =>
    staticPaths.map(({ path, priority, changeFrequency }) => ({
      url: `${base}/${locale}${path}`,
      lastModified: now,
      changeFrequency,
      priority,
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
