/**
 * Free / consumer email domains that should be rejected on a B2B
 * inquiry form. Add or remove entries as the company's policy
 * dictates.
 */
const FREE_EMAIL_DOMAINS = new Set<string>([
  // Global webmail
  "gmail.com",
  "googlemail.com",
  "yahoo.com",
  "yahoo.co.jp",
  "yahoo.co.uk",
  "ymail.com",
  "rocketmail.com",
  "hotmail.com",
  "hotmail.co.jp",
  "outlook.com",
  "outlook.jp",
  "live.com",
  "live.jp",
  "msn.com",
  "icloud.com",
  "me.com",
  "mac.com",
  "aol.com",
  "aol.jp",
  "protonmail.com",
  "proton.me",
  "tutanota.com",
  "tuta.io",
  "zoho.com",
  "gmx.com",
  "gmx.net",
  "yandex.com",
  "yandex.ru",
  "mail.com",
  "mail.ru",
  "fastmail.com",

  // 国内ISP・無料系
  "nifty.com",
  "nifty.ne.jp",
  "so-net.ne.jp",
  "ocn.ne.jp",
  "biglobe.ne.jp",
  "plala.or.jp",
  "infoseek.jp",
  "infoseek.co.jp",
  "excite.co.jp",
  "goo.jp",
  "goo.ne.jp",

  // モバイルキャリア
  "ezweb.ne.jp",
  "au.com",
  "docomo.ne.jp",
  "mopera.net",
  "softbank.ne.jp",
  "i.softbank.jp",
  "vodafone.ne.jp",
  "ymobile.ne.jp",
  "willcom.com",
  "uqmobile.jp",
  "rakuten.jp",
]);

export function isFreeEmail(email: string): boolean {
  const domain = email.split("@")[1]?.toLowerCase().trim();
  if (!domain) return false;
  return FREE_EMAIL_DOMAINS.has(domain);
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function isEmailFormat(email: string): boolean {
  return EMAIL_RE.test(email);
}
