export type NewsItem = {
  title: string;
  date?: string;
  href?: string;
};

// microCMSと連携するまでの仮データ。連携後は特定タグの記事のみをここに流し込む想定。
export const news: NewsItem[] = [
  {
    title: "テスト",
    date: "2026.09.03",
  },
];
