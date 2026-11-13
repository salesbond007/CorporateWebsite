import { z } from "zod";
import { isValidPhone } from "@/lib/phone";

/**
 * 企業向けフォームでブロックするフリーメール / 個人メールのドメイン。
 * 「会社のメールアドレスをご入力ください」というガード用。
 */
const blockedFreeEmailDomains = new Set<string>([
  "gmail.com",
  "yahoo.co.jp",
  "yahoo.com",
  "outlook.com",
  "outlook.jp",
  "hotmail.com",
  "hotmail.co.jp",
  "live.jp",
  "live.com",
  "msn.com",
  "icloud.com",
  "me.com",
  "mac.com",
  "aol.com",
]);

const corporateEmail = z
  .string()
  .trim()
  .email("正しいメールアドレスを入力してください")
  .refine(
    (email) => {
      const domain = email.split("@")[1]?.toLowerCase();
      return domain ? !blockedFreeEmailDomains.has(domain) : false;
    },
    { message: "会社のメールアドレスをご入力ください" },
  );

const honeypotAndAgreement = {
  // honeypot — must stay empty
  website: z.string().max(0).optional().or(z.literal("")),
  // policy
  agreement: z.union([z.literal("on"), z.literal(true)]).transform(() => true),
};

const baseSchema = {
  ...honeypotAndAgreement,
  name: z.string().trim().min(1, "お名前を入力してください").max(100),
  email: z.string().trim().email("正しいメールアドレスを入力してください"),
  message: z
    .string()
    .trim()
    .min(10, "本文は10文字以上でご入力ください")
    .max(5000),
};

export const professionalContactSchema = z.object({
  ...baseSchema,
  furigana: z.string().trim().max(100).optional().or(z.literal("")),
  phone: z.string().trim().max(40).optional().or(z.literal("")),
  expertise: z.string().trim().min(1, "専門分野を入力してください").max(200),
  experienceYears: z.enum(["0-3", "4-7", "8-15", "16-plus"]),
  workStyle: z.enum(["full-time", "part-time", "contract", "any"]),
  portfolio: z
    .string()
    .trim()
    .url("URL形式で入力してください")
    .optional()
    .or(z.literal("")),
});

/**
 * /contact ページの企業向け問い合わせ（SimpleContactForm）。
 * 9項目: 会社名 / 氏名 / メール / 電話 / 部署(任意) / 役職 / 従業員数 /
 *        問い合わせ種別 / 問い合わせ内容
 */
export const generalContactSchema = z.object({
  ...honeypotAndAgreement,
  company: z.string().trim().min(1, "会社名を入力してください").max(200),
  companyAddress: z.string().trim().max(300).optional().or(z.literal("")),
  corporateNumber: z
    .string()
    .trim()
    .regex(/^\d{13}$/, "法人番号は13桁の数字です")
    .optional()
    .or(z.literal("")),
  lastName: z.string().trim().min(1, "姓を入力してください").max(100),
  firstName: z.string().trim().min(1, "名を入力してください").max(100),
  email: corporateEmail,
  phone: z
    .string()
    .trim()
    .min(1, "電話番号を入力してください")
    .max(40)
    .refine(isValidPhone, {
      message: "正しい電話番号をご入力ください",
    }),
  department: z.string().trim().max(200).optional().or(z.literal("")),
  position: z.enum([
    "executive",
    "general-manager",
    "manager",
    "section-chief",
    "staff",
    "contract",
    "other",
  ]),
  employeeCount: z.enum([
    "1",
    "2-5",
    "6-30",
    "31-200",
    "201-600",
    "601-2000",
    "2001-plus",
  ]),
  inquiryType: z.enum(["service", "partnership", "proposal", "other"]),
  // サービスについて選択時のみ届く可能性のあるサブ選択
  serviceTypes: z.array(z.string()).optional(),
  // パートナーについて選択時のみ届く可能性のあるサブ選択
  partnerTypes: z.array(z.string()).optional(),
  message: z.string().trim().max(5000).optional().or(z.literal("")),
  /** document: 資料請求 / check: 無料のAI利用チェック */
  request: z.enum(["document", "check"]).default("document"),
});

/** アポコミLPの選択肢(フォーム・通知メールで共用) */
export const apokomiChannelOptions = [
  { id: "tele", label: "テレアポ" },
  { id: "form", label: "問い合わせフォーム" },
  { id: "email", label: "メール" },
  { id: "letter", label: "手紙BDR" },
  { id: "sns", label: "SNS（DM）" },
  { id: "undecided", label: "相談して決めたい" },
] as const;

export const apokomiTargetOptions = [
  { value: "under-10", label: "〜10件" },
  { value: "10-30", label: "10〜30件" },
  { value: "over-30", label: "30件以上" },
  { value: "undecided", label: "未定" },
] as const;

/**
 * /services/apokomi LP の「無料相談・見積もり依頼」フォーム。
 * 会社名 / 部署・役職(任意) / お名前 / メール / 電話 / 検討中のチャネル(任意) /
 * 月間の目標アポイント数(任意) / ご相談内容(任意) / 同意
 */
export const apokomiLeadSchema = z.object({
  website: z.string().max(0).optional().or(z.literal("")),
  company: z.string().trim().min(1, "会社名を入力してください").max(200),
  department: z.string().trim().max(200).optional().or(z.literal("")),
  name: z.string().trim().min(1, "お名前を入力してください").max(100),
  email: z.string().trim().email("正しいメールアドレスを入力してください"),
  phone: z
    .string()
    .trim()
    .min(1, "電話番号を入力してください")
    .max(40)
    .refine(isValidPhone, {
      message: "正しい電話番号をご入力ください",
    }),
  channels: z
    .array(z.enum(["tele", "form", "email", "letter", "sns", "undecided"]))
    .optional(),
  targetApo: z
    .enum(["under-10", "10-30", "over-30", "undecided"])
    .optional()
    .or(z.literal("")),
  message: z.string().trim().max(5000).optional().or(z.literal("")),
  agreement: z.literal("on", {
    errorMap: () => ({ message: "個人情報の取り扱いへの同意が必要です" }),
  }),
});

/**
 * /services/web-security LP の無料簡易診断フォーム。
 * 診断対象のURL / 会社名 / お名前 / メールアドレス / ご相談内容(任意)
 */
export const webSecurityDiagnosisSchema = z.object({
  website: z.string().max(0).optional().or(z.literal("")),
  siteUrl: z
    .string()
    .trim()
    .min(1, "診断するホームページのURLを入力してください")
    .max(500)
    .refine((v) => /^https?:\/\/[^\s.]+\.[^\s]+$/i.test(v), {
      message: "URLは https:// から始まる形式で入力してください",
    }),
  company: z.string().trim().min(1, "会社名を入力してください").max(200),
  name: z.string().trim().min(1, "お名前を入力してください").max(100),
  email: z.string().trim().email("正しいメールアドレスを入力してください"),
  message: z.string().trim().max(5000).optional().or(z.literal("")),
  /** document: 資料請求 / check: 無料のAI利用チェック */
  request: z.enum(["document", "check"]).default("document"),
});

/** 簡易LP(顧問・COO紹介 / CISO・セキュリティ顧問)の無料相談フォームで扱うサービス */
export const serviceLeadServices = {
  advisory: "顧問・COO紹介",
  ciso: "CISO・セキュリティ顧問",
} as const;

export type ServiceLeadService = keyof typeof serviceLeadServices;

/**
 * 簡易LPの「無料相談」フォーム。
 * 会社名 / 部署・役職(任意) / お名前 / メール / 電話 / ご相談テーマ(任意・複数) / ご相談内容(任意) / 同意
 */
export const serviceLeadSchema = z.object({
  website: z.string().max(0).optional().or(z.literal("")),
  service: z.enum(["advisory", "ciso"]),
  company: z.string().trim().min(1, "会社名を入力してください").max(200),
  department: z.string().trim().max(200).optional().or(z.literal("")),
  name: z.string().trim().min(1, "お名前を入力してください").max(100),
  email: z.string().trim().email("正しいメールアドレスを入力してください"),
  phone: z
    .string()
    .trim()
    .min(1, "電話番号を入力してください")
    .max(40)
    .refine(isValidPhone, {
      message: "正しい電話番号をご入力ください",
    }),
  topics: z.array(z.string().trim().max(60)).max(12).optional(),
  message: z.string().trim().max(5000).optional().or(z.literal("")),
  agreement: z.literal("on", {
    errorMap: () => ({ message: "個人情報の取り扱いへの同意が必要です" }),
  }),
});

export type ServiceLeadInput = z.infer<typeof serviceLeadSchema>;

/** Bond AI(CISO・セキュリティ顧問)LP の従業員数の選択肢 */
export const aiCheckEmployeeOptions = [
  { value: "under-30", label: "〜30名" },
  { value: "31-100", label: "31〜100名" },
  { value: "101-300", label: "101〜300名" },
  { value: "301-1000", label: "301〜1,000名" },
  { value: "over-1000", label: "1,001名以上" },
] as const;

/**
 * Bond AI LP の「無料のAI利用チェック」申し込みフォーム。
 * 会社名 / お名前 / メールアドレス / 従業員数 / ご相談内容(任意)
 */
export const aiCheckSchema = z.object({
  website: z.string().max(0).optional().or(z.literal("")),
  company: z.string().trim().min(1, "会社名を入力してください").max(200),
  name: z.string().trim().min(1, "お名前を入力してください").max(100),
  email: z.string().trim().email("正しいメールアドレスを入力してください"),
  employees: z.enum(
    ["under-30", "31-100", "101-300", "301-1000", "over-1000"],
    {
      errorMap: () => ({ message: "従業員数を選択してください" }),
    },
  ),
  message: z.string().trim().max(5000).optional().or(z.literal("")),
  /** document: 資料請求 / check: 無料のAI利用チェック */
  request: z.enum(["document", "check"]).default("document"),
});

export type ProfessionalContactInput = z.infer<
  typeof professionalContactSchema
>;
export type GeneralContactInput = z.infer<typeof generalContactSchema>;
export type ApokomiLeadInput = z.infer<typeof apokomiLeadSchema>;

export type WebSecurityDiagnosisInput = z.infer<
  typeof webSecurityDiagnosisSchema
>;

export type ContactFormType =
  | "professional"
  | "general"
  | "apokomi_lead"
  | "service_lead"
  | "ai_check"
  | "web_security_diagnosis";
