/**
 * 日本国内の電話番号として妥当かをざっくり判定する。
 * - ハイフン / 半角・全角スペース / カッコ / +81 などはユーザーが入れがちなので除去してから検査
 * - 国内番号は 0 で始まる 10 桁(固定) or 11 桁(携帯/050/0120 等)
 * - 全桁同一(0000000000) や明らかな順列 (0123456789) は弾く
 */

const NORMALIZE_DROP_RE = /[\s\-()ー－〜~.]/g;

function toFullWidthDigits(s: string): string {
  return s.replace(/[０-９]/g, (c) => String.fromCharCode(c.charCodeAt(0) - 0xfee0));
}

export function normalizeJapanesePhone(input: string): string {
  if (!input) return "";
  let s = toFullWidthDigits(input).trim();
  s = s.replace(NORMALIZE_DROP_RE, "");
  // 国際表記 +81 / 0081 → 0
  s = s.replace(/^\+81/, "0").replace(/^0081/, "0");
  return s;
}

const OBVIOUS_FAKE_PATTERNS: RegExp[] = [
  /^(\d)\1+$/, // 全桁同一 0000000000 / 1111111111 等
  /^0123456789$/, // 順列
  /^01234567890?$/, // 順列(11桁)
];

const VALID_PREFIXES = [
  // 携帯
  "070",
  "080",
  "090",
  // IP 電話
  "050",
  // フリーダイヤル / ナビダイヤル等
  "0120",
  "0570",
  "0800",
  "0990",
];

export function isValidJapanesePhone(input: string): boolean {
  const digits = normalizeJapanesePhone(input);

  // 数字以外混在 NG
  if (!/^\d+$/.test(digits)) return false;
  // 0 始まり必須
  if (!digits.startsWith("0")) return false;
  // 桁数 10 or 11
  if (digits.length !== 10 && digits.length !== 11) return false;
  // フェイクパターン
  if (OBVIOUS_FAKE_PATTERNS.some((p) => p.test(digits))) return false;
  // 2 桁目が 0 (00...) は固定電話・携帯のいずれにも該当しないので NG
  if (digits[1] === "0") {
    // ただし 050 / 0120 / 0800 / 0570 / 0990 のような有効な先頭は許可
    const ok = VALID_PREFIXES.some((p) => digits.startsWith(p));
    if (!ok) return false;
  }

  return true;
}
