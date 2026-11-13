import { NextResponse, type NextRequest } from "next/server";
import { defaultLocale, isLocale, locales } from "@/i18n/config";

const PUBLIC_FILE = /\.[a-z0-9]+$/i;

function pickLocale(req: NextRequest): string {
  const cookie = req.cookies.get("NEXT_LOCALE")?.value;
  if (cookie && isLocale(cookie)) return cookie;

  const accept = req.headers.get("accept-language") ?? "";
  const preferred = accept
    .split(",")
    .map((p) => p.split(";")[0].trim().toLowerCase());
  for (const lang of preferred) {
    const short = lang.split("-")[0];
    if (isLocale(short)) return short;
  }
  return defaultLocale;
}

/**
 * 提供を終了したページ。リダイレクトではなく 410(削除済み)を返して、
 * 検索結果(サイトリンクなど)から早く消えるようにする。
 */
const GONE = /^\/(?:(?:ja|en)\/)?services\/physical-ai-training\/?$/;

const goneHtml = `<!doctype html><html lang="ja"><head><meta charset="utf-8"><meta name="robots" content="noindex"><meta name="viewport" content="width=device-width,initial-scale=1"><title>このページは終了しました｜セールスボンド株式会社</title></head><body style="font-family:'Noto Sans JP',sans-serif;color:#1F1A1C;text-align:center;padding:80px 20px"><p style="font-weight:700;font-size:20px">このサービスの提供は終了しました</p><p><a href="/ja/services" style="color:#7A1F3D;font-weight:700">サービス一覧へ</a></p></body></html>`;

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (GONE.test(pathname)) {
    return new NextResponse(goneHtml, {
      status: 410,
      headers: {
        "content-type": "text/html; charset=utf-8",
        "x-robots-tag": "noindex",
      },
    });
  }

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/static") ||
    pathname === "/sitemap.xml" ||
    pathname === "/robots.txt" ||
    pathname === "/favicon.ico" ||
    PUBLIC_FILE.test(pathname)
  ) {
    return NextResponse.next();
  }

  const segments = pathname.split("/").filter(Boolean);
  const head = segments[0];

  if (head && (locales as readonly string[]).includes(head)) {
    return NextResponse.next();
  }

  const locale = pickLocale(req);
  const url = req.nextUrl.clone();
  url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/((?!_next|api|.*\\..*).*)"],
};
