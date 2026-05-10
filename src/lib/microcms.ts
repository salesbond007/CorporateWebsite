import { createClient, type MicroCMSQueries } from "microcms-js-sdk";

export type ArticleCategory = {
  id: string;
  name: string;
  slug: string;
};

export type Article = {
  id: string;
  title: string;
  slug: string;
  description?: string;
  body: string; // rich text HTML from microCMS
  thumbnail?: {
    url: string;
    width: number;
    height: number;
  };
  category?: ArticleCategory;
  tags?: string[];
  publishedAt: string;
  updatedAt: string;
  createdAt: string;
};

export type ArticleListResponse = {
  contents: Article[];
  totalCount: number;
  offset: number;
  limit: number;
};

const serviceDomain = process.env.MICROCMS_SERVICE_DOMAIN;
const apiKey = process.env.MICROCMS_API_KEY;

const client =
  serviceDomain && apiKey
    ? createClient({ serviceDomain, apiKey })
    : null;

const isConfigured = () => client !== null;

const emptyList: ArticleListResponse = {
  contents: [],
  totalCount: 0,
  offset: 0,
  limit: 0,
};

export async function getArticles(
  queries: MicroCMSQueries = {},
): Promise<ArticleListResponse> {
  if (!client) return emptyList;
  return client.get<ArticleListResponse>({
    endpoint: "articles",
    queries: { orders: "-publishedAt", ...queries },
  });
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  if (!client) return null;
  const res = await client.get<ArticleListResponse>({
    endpoint: "articles",
    queries: { filters: `slug[equals]${slug}`, limit: 1 },
  });
  return res.contents[0] ?? null;
}

export async function getArticleSlugs(): Promise<string[]> {
  if (!client) return [];
  const res = await client.get<ArticleListResponse>({
    endpoint: "articles",
    queries: { fields: "slug", limit: 100 },
  });
  return res.contents.map((c) => c.slug);
}

export type CategoryListResponse = {
  contents: ArticleCategory[];
  totalCount: number;
  offset: number;
  limit: number;
};

export async function getCategories(): Promise<ArticleCategory[]> {
  if (!client) return [];
  const res = await client.get<CategoryListResponse>({
    endpoint: "categories",
    queries: { limit: 100 },
  });
  return res.contents;
}

export async function getCategoryBySlug(
  slug: string,
): Promise<ArticleCategory | null> {
  if (!client) return null;
  const res = await client.get<CategoryListResponse>({
    endpoint: "categories",
    queries: { filters: `slug[equals]${slug}`, limit: 1 },
  });
  return res.contents[0] ?? null;
}

export async function searchArticles(
  q: string,
  queries: MicroCMSQueries = {},
): Promise<ArticleListResponse> {
  if (!client || !q.trim()) return emptyList;
  return client.get<ArticleListResponse>({
    endpoint: "articles",
    queries: { q, orders: "-publishedAt", ...queries },
  });
}

export { isConfigured as isMicroCmsConfigured };
