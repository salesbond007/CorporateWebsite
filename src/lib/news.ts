export type NewsItem = {
  title: string;
  date?: string;
  href?: string;
  /** サムネイル画像。microCMS連携後は記事のサムネイルを設定する想定 */
  thumbnail?: string;
};

// microCMSと連携するまでの仮データ。連携後は特定タグの記事のみをここに流し込む想定。
export const news: NewsItem[] = [];
