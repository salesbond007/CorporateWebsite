import { z } from "zod";

const honeypotAndAgreement = {
  // honeypot — must stay empty
  website: z.string().max(0).optional().or(z.literal("")),
  // policy
  agreement: z
    .union([z.literal("on"), z.literal(true)])
    .transform(() => true),
};

const baseSchema = {
  ...honeypotAndAgreement,
  name: z.string().trim().min(1, "お名前を入力してください").max(100),
  email: z.string().trim().email("正しいメールアドレスを入力してください"),
  message: z.string().trim().min(10, "本文は10文字以上でご入力ください").max(5000),
};

export const businessContactSchema = z.object({
  ...baseSchema,
  company: z.string().trim().min(1, "会社名を入力してください").max(200),
  department: z.string().trim().max(200).optional().or(z.literal("")),
  phone: z.string().trim().max(40).optional().or(z.literal("")),
  inquiryType: z.enum(["service", "estimate", "partnership", "other"]),
  budget: z.enum(["under-500k", "500k-3m", "3m-10m", "10m-plus", "undecided"]).optional(),
});

export const professionalContactSchema = z.object({
  ...baseSchema,
  furigana: z.string().trim().max(100).optional().or(z.literal("")),
  phone: z.string().trim().max(40).optional().or(z.literal("")),
  expertise: z.string().trim().min(1, "専門分野を入力してください").max(200),
  experienceYears: z.enum(["0-3", "4-7", "8-15", "16-plus"]),
  workStyle: z.enum(["full-time", "part-time", "contract", "any"]),
  portfolio: z.string().trim().url("URL形式で入力してください").optional().or(z.literal("")),
});

/**
 * /contact ページの企業向け問い合わせ（SimpleContactForm）。
 * 9項目: 会社名 / 氏名 / メール / 電話 / 部署(任意) / 役職 / 従業員数 /
 *        問い合わせ種別 / 問い合わせ内容
 */
export const generalContactSchema = z.object({
  ...honeypotAndAgreement,
  company: z.string().trim().min(1, "会社名を入力してください").max(200),
  lastName: z.string().trim().min(1, "姓を入力してください").max(100),
  firstName: z.string().trim().min(1, "名を入力してください").max(100),
  email: z.string().trim().email("正しいメールアドレスを入力してください"),
  phone: z.string().trim().min(1, "電話番号を入力してください").max(40),
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
  message: z.string().trim().max(5000).optional().or(z.literal("")),
});

export type BusinessContactInput = z.infer<typeof businessContactSchema>;
export type ProfessionalContactInput = z.infer<typeof professionalContactSchema>;
export type GeneralContactInput = z.infer<typeof generalContactSchema>;

export type ContactFormType = "business" | "professional" | "general";
