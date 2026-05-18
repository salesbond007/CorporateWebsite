"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { TextField, TextareaField, SelectField } from "./Field";
import { CompanyAutocomplete } from "./CompanyAutocomplete";
import { localePath } from "@/i18n/path";
import { cn } from "@/lib/cn";
import { isEmailFormat, isFreeEmail } from "@/lib/email";
import { isValidPhone, normalizePhone } from "@/lib/phone";
import type { Locale } from "@/i18n/config";

type Props = {
  locale: Locale;
};

type InquiryType = "service" | "partnership" | "proposal" | "other";

const inquiryTypeLabels: Record<InquiryType, string> = {
  service: "サービスについて",
  partnership: "協業について",
  proposal: "ご提案 / 営業",
  other: "その他",
};

const serviceOptions = [
  { id: "sales-bond", label: "リファボンド(大手決裁者紹介サービス)について" },
  { id: "keyman-bond", label: "キーマンボンド（プロ人材マッチングサービス）について" },
  { id: "lead-bond", label: "セルボンド(インサイドセールス支援サービス)について" },
] as const;

type ServiceId = (typeof serviceOptions)[number]["id"];

const positionOptions = [
  { value: "executive", label: "経営者・役員" },
  { value: "general-manager", label: "部長" },
  { value: "manager", label: "課長" },
  { value: "section-chief", label: "係長・主任" },
  { value: "staff", label: "一般社員" },
  { value: "contract", label: "契約・嘱託・派遣等" },
  { value: "other", label: "その他" },
] as const;

const employeeCountOptions = [
  { value: "1", label: "1人、個人事業主" },
  { value: "2-5", label: "2〜5人" },
  { value: "6-30", label: "従業員数6〜30人" },
  { value: "31-200", label: "従業員数31〜200人" },
  { value: "201-600", label: "従業員数201〜600人" },
  { value: "601-2000", label: "従業員数601〜2,000人" },
  { value: "2001-plus", label: "従業員数2,001人以上" },
] as const;

type FormState = {
  company: string;
  companyAddress: string;
  corporateNumber: string;
  employeeCount: string;
  department: string;
  lastName: string;
  firstName: string;
  position: string;
  email: string;
  phone: string;
  inquiryType: InquiryType | "";
  serviceTypes: ServiceId[];
  message: string;
  agreement: boolean;
};

const initial: FormState = {
  company: "",
  companyAddress: "",
  corporateNumber: "",
  employeeCount: "",
  department: "",
  lastName: "",
  firstName: "",
  position: "",
  email: "",
  phone: "",
  inquiryType: "",
  serviceTypes: [],
  message: "",
  agreement: false,
};

type FieldErrors = Partial<Record<keyof FormState | "form", string>>;

export function SimpleContactForm({ locale }: Props) {
  const [state, setState] = useState<FormState>(initial);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState<string | null>(null);

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setState((s) => ({ ...s, [key]: value }));
    // Clear error for this field on edit
    setErrors((e) => {
      if (!e[key]) return e;
      const { [key]: _, ...rest } = e;
      return rest;
    });
  }

  function toggleService(id: ServiceId) {
    setState((s) => ({
      ...s,
      serviceTypes: s.serviceTypes.includes(id)
        ? s.serviceTypes.filter((v) => v !== id)
        : [...s.serviceTypes, id],
    }));
  }

  function validate(): FieldErrors {
    const next: FieldErrors = {};
    if (!state.company.trim()) next.company = "会社名をご入力ください。";
    if (!state.lastName.trim()) next.lastName = "姓をご入力ください。";
    if (!state.firstName.trim()) next.firstName = "名をご入力ください。";

    if (!state.email.trim()) {
      next.email = "メールアドレスをご入力ください。";
    } else if (!isEmailFormat(state.email)) {
      next.email = "メールアドレスの形式が正しくありません。";
    } else if (isFreeEmail(state.email)) {
      next.email = "フリーメール（Gmail / Yahoo 等）はご利用いただけません。勤務先のメールアドレスをご入力ください。";
    }

    if (!state.phone.trim()) {
      next.phone = "電話番号をご入力ください。";
    } else if (!isValidPhone(state.phone)) {
      next.phone = "正しい電話番号をご入力ください。";
    }
    // 部署は任意
    if (!state.position) next.position = "役職をご選択ください。";
    if (!state.employeeCount) next.employeeCount = "従業員数をご選択ください。";
    if (!state.inquiryType) next.inquiryType = "お問い合わせ種別をご選択ください。";
    return next;
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const next = validate();
    if (Object.keys(next).length > 0) {
      setErrors(next);
      // Scroll to first error
      const firstKey = Object.keys(next)[0];
      requestAnimationFrame(() => {
        const el = document.getElementById(firstKey);
        el?.scrollIntoView({ behavior: "smooth", block: "center" });
        el?.focus({ preventScroll: true });
      });
      return;
    }
    setErrors({});

    setSending(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "general",
          company: state.company,
          companyAddress: state.companyAddress,
          corporateNumber: state.corporateNumber,
          lastName: state.lastName,
          firstName: state.firstName,
          email: state.email,
          phone: normalizePhone(state.phone),
          department: state.department,
          position: state.position,
          employeeCount: state.employeeCount,
          inquiryType: state.inquiryType,
          serviceTypes:
            state.inquiryType === "service" ? state.serviceTypes : [],
          message: state.message,
          agreement: state.agreement ? "on" : "",
          website: "",
        }),
      });

      const json: { ok?: boolean; error?: string; issues?: Record<string, string[]> } =
        await res.json().catch(() => ({}));

      if (!res.ok || !json.ok) {
        const issueText =
          json.issues && Object.values(json.issues).flat()[0];
        setSendError(
          issueText ??
            json.error ??
            "送信に失敗しました。時間をおいて再度お試しください。",
        );
        setSending(false);
        return;
      }

      setSubmitted(true);
    } catch (err) {
      console.error("[SimpleContactForm] submit failed", err);
      setSendError("通信エラーが発生しました。時間をおいて再度お試しください。");
    } finally {
      setSending(false);
    }
  }

  if (submitted) {
    return (
      <div className="rounded-xl2 border border-ink-line bg-white p-10 text-center">
        <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-brand-50 text-brand-600">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M5 12l5 5L20 7"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <h2 className="mt-6 text-h2">送信が完了しました</h2>
        <p className="mt-4 text-ink-soft leading-relaxed">
          お問い合わせありがとうございます。
          <br />
          内容を確認のうえ、担当者よりご連絡いたします。
        </p>
        <div className="mt-8 flex justify-center gap-3">
          <Button href={localePath("/", locale)} variant="secondary">
            トップへ戻る
          </Button>
          <Button
            onClick={() => {
              setState(initial);
              setSubmitted(false);
            }}
          >
            別の内容で送信
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="space-y-6 rounded-xl2 border border-ink-line bg-white p-8 md:p-10"
    >
      {/* 1. 会社名（法人番号DB連携 オートコンプリート） */}
      <CompanyAutocomplete
        label="会社名"
        name="company"
        required
        placeholder="株式会社○○"
        value={state.company}
        error={errors.company}
        onChange={(v) => {
          update("company", v);
          // 候補から外れた場合は紐づけ情報をリセット
          if (state.corporateNumber) {
            update("corporateNumber", "");
            update("companyAddress", "");
          }
        }}
        onSelect={(c) => {
          setState((s) => ({
            ...s,
            company: c.name,
            companyAddress: c.address,
            corporateNumber: c.corporateNumber,
          }));
          setErrors((e) => {
            if (!e.company) return e;
            const { company: _omit, ...rest } = e;
            return rest;
          });
        }}
      />

      {/* 2. 氏名 */}
      <div className="grid gap-4 md:grid-cols-2">
        <TextField
          label="姓"
          name="lastName"
          required
          autoComplete="family-name"
          placeholder="山田"
          value={state.lastName}
          onChange={(e) => update("lastName", e.target.value)}
          error={errors.lastName}
        />
        <TextField
          label="名"
          name="firstName"
          required
          autoComplete="given-name"
          placeholder="太郎"
          value={state.firstName}
          onChange={(e) => update("firstName", e.target.value)}
          error={errors.firstName}
        />
      </div>

      {/* 3. メールアドレス */}
      <TextField
        label="メールアドレス"
        name="email"
        type="email"
        required
        autoComplete="email"
        placeholder="example@company.co.jp"
        hint="フリーメール（Gmail / Yahoo 等）はご利用いただけません。"
        value={state.email}
        onChange={(e) => update("email", e.target.value)}
        error={errors.email}
      />

      {/* 4. 電話番号 */}
      <TextField
        label="電話番号"
        name="phone"
        type="tel"
        required
        inputMode="tel"
        autoComplete="tel"
        placeholder="0312345678 / 09012345678 / +1234567890"
        value={state.phone}
        onChange={(e) => update("phone", e.target.value)}
        onBlur={(e) => update("phone", normalizePhone(e.target.value))}
        error={errors.phone}
      />

      {/* 5. 部署（任意） */}
      <TextField
        label="部署"
        name="department"
        autoComplete="organization-title"
        placeholder="営業部 / マーケティング部 など"
        value={state.department}
        onChange={(e) => update("department", e.target.value)}
        error={errors.department}
      />

      {/* 6. 役職 */}
      <SelectField
        label="役職"
        name="position"
        required
        placeholder="役職を選択"
        options={positionOptions.map((o) => ({ value: o.value, label: o.label }))}
        value={state.position}
        onChange={(e) => update("position", e.target.value)}
        error={errors.position}
      />

      {/* 7. 従業員数 */}
      <SelectField
        label="従業員数"
        name="employeeCount"
        required
        placeholder="従業員数を選択"
        options={employeeCountOptions.map((o) => ({ value: o.value, label: o.label }))}
        value={state.employeeCount}
        onChange={(e) => update("employeeCount", e.target.value)}
        error={errors.employeeCount}
      />

      {/* 8. お問い合わせ種別 */}
      <fieldset>
        <legend className="flex items-center gap-2 text-sm font-semibold text-ink">
          お問い合わせ種別
          <span className="rounded bg-brand-500/10 px-1.5 py-0.5 text-[10px] font-bold text-brand-600">
            必須
          </span>
        </legend>

        <div className="mt-3 space-y-2">
          {(Object.keys(inquiryTypeLabels) as InquiryType[]).map((type) => {
            const checked = state.inquiryType === type;
            return (
              <div key={type}>
                <label
                  className={cn(
                    "flex cursor-pointer items-center gap-3 rounded-lg border px-4 py-3 text-sm transition",
                    checked
                      ? "border-brand-500 bg-brand-50/60"
                      : "border-ink-line bg-white hover:border-ink",
                  )}
                >
                  <input
                    type="radio"
                    name="inquiryType"
                    value={type}
                    checked={checked}
                    onChange={() => {
                      update("inquiryType", type);
                      if (type !== "service") update("serviceTypes", []);
                    }}
                    className="h-4 w-4 text-brand-500 focus:ring-brand-500"
                  />
                  <span className="font-medium">{inquiryTypeLabels[type]}</span>
                </label>

                {type === "service" && checked ? (
                  <div className="ml-7 mt-3 space-y-2 rounded-lg border border-dashed border-ink-line bg-cream/60 p-4">
                    <p className="text-xs font-semibold text-ink-muted">
                      該当するサービスをお選びください（複数選択可）
                    </p>
                    {serviceOptions.map((opt) => (
                      <label
                        key={opt.id}
                        className="flex cursor-pointer items-start gap-3 text-sm"
                      >
                        <input
                          type="checkbox"
                          checked={state.serviceTypes.includes(opt.id)}
                          onChange={() => toggleService(opt.id)}
                          className="mt-0.5 h-4 w-4 rounded text-brand-500 focus:ring-brand-500"
                        />
                        <span className="leading-relaxed">{opt.label}</span>
                      </label>
                    ))}
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>
        {errors.inquiryType ? (
          <p className="mt-2 text-xs text-red-600">{errors.inquiryType}</p>
        ) : null}
      </fieldset>

      {/* 9. 問い合わせ内容 */}
      <TextareaField
        label="問い合わせ内容"
        name="message"
        hint="ご相談内容や検討中のサービスなど、お気軽にご記入ください。"
        value={state.message}
        onChange={(e) => update("message", e.target.value)}
      />

      <div className="rounded-xl border border-ink-line bg-cream p-5">
        <label className="flex items-start gap-3 text-sm">
          <input
            type="checkbox"
            name="agreement"
            required
            checked={state.agreement}
            onChange={(e) => update("agreement", e.target.checked)}
            className="mt-1 h-4 w-4 rounded border-ink-line text-brand-500 focus:ring-brand-500"
          />
          <span className="text-ink-soft leading-relaxed">
            <Link
              href={localePath("/privacy", locale)}
              className="underline underline-offset-4 text-brand-600"
            >
              プライバシーポリシー
            </Link>
            に同意して送信します。
          </span>
        </label>
      </div>

      {sendError ? (
        <p
          role="alert"
          className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
        >
          {sendError}
        </p>
      ) : null}

      <div className="flex justify-center">
        <Button type="submit" size="lg" disabled={sending}>
          {sending ? "送信中..." : "送信する"}
        </Button>
      </div>
    </form>
  );
}
