/**
 * 電話番号として妥当かをざっくり判定する(国内・国際両対応)。
 * - 入力時のハイフン / 半角・全角スペース / カッコ / 全角数字 / 先頭 + は事前に正規化
 * - E.164 国際標準に準拠して 7〜15 桁を許容
 *   → 日本だけでなく海外法人からの問い合わせも通すための緩めの基準
 * - 全桁同一 (0000000000) や明らかな順列 (0123456789) のフェイクのみ弾く
 */

const NORMALIZE_DROP_RE = /[\s\-()ー－〜~.]/g;

function toFullWidthDigits(s: string): string {
  return s.replace(/[０-９]/g, (c) => String.fromCharCode(c.charCodeAt(0) - 0xfee0));
}

export function normalizePhone(input: string): string {
  if (!input) return "";
  let s = toFullWidthDigits(input).trim();
  s = s.replace(NORMALIZE_DROP_RE, "");
  return s;
}

const OBVIOUS_FAKE_PATTERNS: RegExp[] = [
  /^\+?(\d)\1+$/, // 全桁同一 0000000000 / 1111111111 等
  /^\+?0123456789\d?$/, // 順列
];

export function isValidPhone(input: string): boolean {
  const s = normalizePhone(input);

  // 先頭 + のみ許可、それ以外は数字必須
  if (!/^\+?\d+$/.test(s)) return false;

  const digits = s.replace(/^\+/, "");

  // E.164: 国番号含めて 7〜15 桁
  if (digits.length < 7 || digits.length > 15) return false;

  // 先頭 000... は明らかに無効
  if (digits.startsWith("000")) return false;

  // 明らかなフェイク
  if (OBVIOUS_FAKE_PATTERNS.some((p) => p.test(s))) return false;

  return true;
}
