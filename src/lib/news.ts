export type NewsItem = {
  title: string;
  date?: string;
  href?: string;
  /** サムネイル画像。microCMS連携後は記事のサムネイルを設定する想定 */
  thumbnail?: string;
};

// microCMSと連携するまでの仮データ。連携後は特定タグの記事のみをここに流し込む想定。
// テスト表示用に10件のダミーデータを用意。
export const news: NewsItem[] = Array.from({ length: 10 }, (_, i) => ({
  title: `テスト${i + 1}`,
  date: "2026.09.03",
}));
