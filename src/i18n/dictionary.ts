import "server-only";

import ja from "./dictionaries/ja.json";
import en from "./dictionaries/en.json";
import type { Locale } from "./config";

export type Dictionary = typeof ja;

const dictionaries: Record<Locale, Dictionary> = {
  ja,
  en: en as Dictionary,
};

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}
