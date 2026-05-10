export const locales = ["ja", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "ja";

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

const ogLocaleMap: Record<Locale, string> = {
  ja: "ja_JP",
  en: "en_US",
};

export function ogLocale(locale: Locale): string {
  return ogLocaleMap[locale];
}
