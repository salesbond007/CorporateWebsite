import { z } from "zod";

const baseSchema = {
  name: z.string().trim().min(1, "お名前を入力してください").max(100),
  email: z.string().trim().email("正しいメールアドレスを入力してください"),
  message: z.string().trim().min(10, "本文は10文字以上でご入力ください").max(5000),
  // honeypot — must stay empty
  website: z.string().max(0).optional().or(z.literal("")),
  // policy
  agreement: z
    .union([z.literal("on"), z.literal(true)])
    .transform(() => true),
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

export type BusinessContactInput = z.infer<typeof businessContactSchema>;
export type ProfessionalContactInput = z.infer<typeof professionalContactSchema>;

export type ContactFormType = "business" | "professional";
