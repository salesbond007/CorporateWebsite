import { hardwareDevelopmentHtml } from "./content";
import { locales } from "@/i18n/config";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

// 技術要件上、単一HTMLファイル(インラインCSS/JS、外部ライブラリなし)として
// 独立して配信する必要があるため、Next.jsのページコンポーネントではなく
// Route Handlerから生のHTMLを直接返している。
export function GET() {
  return new Response(hardwareDevelopmentHtml, {
    headers: {
      "content-type": "text/html; charset=utf-8",
    },
  });
}
