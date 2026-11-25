export type NewsItem = {
  title: string;
  date?: string;
  href?: string;
  /** サムネイル画像。microCMS連携後は記事のサムネイルを設定する想定 */
  thumbnail?: string;
};

import { getArticles, getCategoryBySlug } from "@/lib/microcms";

/** ニュースとして表示する microCMS のカテゴリ(スラッグ) */
export const NEWS_CATEGORY_SLUG = "news";

function formatDate(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  // 日本時間で表示する
  const jst = new Date(d.getTime() + 9 * 60 * 60 * 1000);
  const y = jst.getUTCFullYear();
  const m = String(jst.getUTCMonth() + 1).padStart(2, "0");
  const day = String(jst.getUTCDate()).padStart(2, "0");
  return `${y}.${m}.${day}`;
}

/**
 * microCMS の記事のうち、カテゴリ「社内ニュース」(スラッグ news)のものを新しい順に取得する。
 * microCMS が未設定・取得に失敗した場合は空の配列を返す(ページは「準備中」の表示になる)。
 */
export async function getNews(limit = 100): Promise<NewsItem[]> {
  try {
    const category = await getCategoryBySlug(NEWS_CATEGORY_SLUG);
    if (!category) return [];
    const res = await getArticles({
      limit,
      filters: `category[equals]${category.id}`,
      fields: "id,title,slug,publishedAt,thumbnail",
    });
    return res.contents.map((a) => ({
      title: a.title,
      date: formatDate(a.publishedAt),
      href: `/blog/${a.slug}`,
      thumbnail: a.thumbnail?.url,
    }));
  } catch (error) {
    console.error("[news] failed to load news from microCMS:", error);
    return [];
  }
}
