import { defaultLocale, isLocale, type Locale } from "./config";

/**
 * Build a locale-prefixed path.
 *   localePath("/services", "ja") -> "/ja/services"
 *   localePath("/", "en")         -> "/en"
 */
export function localePath(path: string, locale: Locale): string {
  const normalized = path === "/" ? "" : path.startsWith("/") ? path : `/${path}`;
  return `/${locale}${normalized}`;
}

/**
 * Strip a locale prefix from a path.
 *   stripLocale("/ja/services") -> { locale: "ja", path: "/services" }
 *   stripLocale("/services")    -> { locale: defaultLocale, path: "/services" }
 */
export function stripLocale(path: string): { locale: Locale; path: string } {
  const segments = path.split("/").filter(Boolean);
  const head = segments[0];
  if (head && isLocale(head)) {
    const rest = "/" + segments.slice(1).join("/");
    return { locale: head, path: rest === "/" ? "/" : rest };
  }
  return { locale: defaultLocale, path };
}
