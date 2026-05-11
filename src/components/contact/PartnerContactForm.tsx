"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { TextField } from "./Field";
import { localePath } from "@/i18n/path";
import { isEmailFormat } from "@/lib/email";
import { cn } from "@/lib/cn";
import type { Locale } from "@/i18n/config";

type Props = {
  locale: Locale;
};

type Gender = "male" | "female" | "other";

type FormState = {
  lastName: string;
  firstName: string;
  email: string;
  emailConfirm: string;
  phone: string;
  birthYear: string;
  birthMonth: string;
  birthDay: string;
  gender: Gender | "";
  connections: string;
  agreeTerms: boolean;
  agreePrivacy: boolean;
  agreeAntisocial: boolean;
  agreeCompliance: boolean;
};

const initial: FormState = {
  lastName: "",
  firstName: "",
  email: "",
  emailConfirm: "",
  phone: "",
  birthYear: "",
  birthMonth: "",
  birthDay: "",
  gender: "",
  connections: "",
  agreeTerms: false,
  agreePrivacy: false,
  agreeAntisocial: false,
  agreeCompliance: false,
};

type FieldErrors = Partial<Record<keyof FormState | "birthdate", string>>;

const currentYear = new Date().getFullYear();
const yearOptions = Array.from({ length: 80 }, (_, i) => {
  const y = currentYear - 18 - i;
  return { value: String(y), label: `${y}` };
});
const monthOptions = Array.from({ length: 12 }, (_, i) => ({
  value: String(i + 1),
  label: `${i + 1}`,
}));
const dayOptions = Array.from({ length: 31 }, (_, i) => ({
  value: String(i + 1),
  label: `${i + 1}`,
}));

const genderOptions: { value: Gender; label: string }[] = [
  { value: "male", label: "男性" },
  { value: "female", label: "女性" },
  { value: "other", label: "その他" },
];

function isValidDate(y: string, m: string, d: string): boolean {
  const yn = Number(y);
  const mn = Number(m);
  const dn = Number(d);
  if (!yn || !mn || !dn) return false;
  const date = new Date(yn, mn - 1, dn);
  return (
    date.getFullYear() === yn &&
    date.getMonth() === mn - 1 &&
    date.getDate() === dn
  );
}

function isAdult(y: string, m: string, d: string): boolean {
  const yn = Number(y);
  const mn = Number(m);
  const dn = Number(d);
  if (!yn || !mn || !dn) return false;
  const today = new Date();
  const birth = new Date(yn, mn - 1, dn);
  let age = today.getFullYear() - birth.getFullYear();
  const beforeBirthday =
    today.getMonth() < birth.getMonth() ||
    (today.getMonth() === birth.getMonth() && today.getDate() < birth.getDate());
  if (beforeBirthday) age--;
  return age >= 18;
}

export function PartnerContactForm({ locale }: Props) {
  const [state, setState] = useState<FormState>(initial);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<FieldErrors>({});

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setState((s) => ({ ...s, [key]: value }));
    setErrors((e) => {
      if (!e[key]) return e;
      const { [key]: _, ...rest } = e;
      return rest;
    });
  }

  function validate(): FieldErrors {
    const next: FieldErrors = {};
    if (!state.lastName.trim()) next.lastName = "姓をご入力ください。";
    if (!state.firstName.trim()) next.firstName = "名をご入力ください。";

    if (!state.email.trim()) {
      next.email = "メールアドレスをご入力ください。";
    } else if (!isEmailFormat(state.email)) {
      next.email = "メールアドレスの形式が正しくありません。";
    }

    if (!state.emailConfirm.trim()) {
      next.emailConfirm = "確認用メールアドレスをご入力ください。";
    } else if (state.email && state.email !== state.emailConfirm) {
      next.emailConfirm = "メールアドレスが一致しません。";
    }

    if (!state.phone.trim()) {
      next.phone = "電話番号をご入力ください。";
    } else if (!/^[0-9]+$/.test(state.phone)) {
      next.phone = "半角数字・ハイフン無しでご入力ください。";
    }

    if (!state.birthYear || !state.birthMonth || !state.birthDay) {
      next.birthdate = "生年月日をご選択ください。";
    } else if (!isValidDate(state.birthYear, state.birthMonth, state.birthDay)) {
      next.birthdate = "生年月日が正しくありません。";
    } else if (!isAdult(state.birthYear, state.birthMonth, state.birthDay)) {
      next.birthdate = "18歳未満および高校生はご登録いただけません。";
    }

    if (!state.gender) next.gender = "性別をご選択ください。";
    if (!state.connections.trim()) {
      next.connections = "お繋がりのある企業をご入力ください（最低1社）。";
    }

    if (!state.agreeTerms) next.agreeTerms = "利用規約への同意が必要です。";
    if (!state.agreePrivacy)
      next.agreePrivacy = "プライバシーポリシーへの同意が必要です。";
    if (!state.agreeAntisocial)
      next.agreeAntisocial = "反社会的勢力に該当しないことの同意が必要です。";
    if (!state.agreeCompliance)
      next.agreeCompliance = "副業規則・退職元との取り決め遵守の同意が必要です。";

    return next;
  }

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const next = validate();
    if (Object.keys(next).length > 0) {
      setErrors(next);
      const firstKey = Object.keys(next)[0];
      requestAnimationFrame(() => {
        const el = document.getElementById(firstKey);
        el?.scrollIntoView({ behavior: "smooth", block: "center" });
        el?.focus({ preventScroll: true });
      });
      return;
    }
    setErrors({});
    // NOTE: 現在は送信処理を行わず、UIのみ完了状態を表示する。
    setSubmitted(true);
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
        <h2 className="mt-6 text-h2">登録申請を受け付けました</h2>
        <p className="mt-4 text-ink-soft leading-relaxed">
          ご登録ありがとうございます。
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
      className="space-y-8 rounded-xl2 border border-ink-line bg-white p-8 md:p-10"
    >
      {/* 氏名 */}
      <div>
        <p className="flex items-center gap-2 text-sm font-semibold text-ink">
          お名前
          <span className="rounded bg-brand-500/10 px-1.5 py-0.5 text-[10px] font-bold text-brand-600">
            必須
          </span>
        </p>
        <div className="mt-2 grid gap-4 md:grid-cols-2">
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
      </div>

      {/* メール */}
      <TextField
        label="メールアドレス"
        name="email"
        type="email"
        required
        autoComplete="email"
        placeholder="example@example.com"
        value={state.email}
        onChange={(e) => update("email", e.target.value)}
        error={errors.email}
      />

      <TextField
        label="メールアドレス（確認用）"
        name="emailConfirm"
        type="email"
        required
        autoComplete="email"
        placeholder="example@example.com"
        value={state.emailConfirm}
        onChange={(e) => update("emailConfirm", e.target.value)}
        error={errors.emailConfirm}
      />

      {/* 電話番号 */}
      <TextField
        label="電話番号"
        name="phone"
        type="tel"
        required
        inputMode="numeric"
        autoComplete="tel"
        placeholder="09012345678"
        hint="半角数字・ハイフン無しでご入力ください。"
        value={state.phone}
        onChange={(e) => update("phone", e.target.value)}
        error={errors.phone}
      />

      {/* 生年月日 */}
      <div id="birthdate">
        <p className="flex items-center gap-2 text-sm font-semibold text-ink">
          生年月日
          <span className="rounded bg-brand-500/10 px-1.5 py-0.5 text-[10px] font-bold text-brand-600">
            必須
          </span>
        </p>
        <div className="mt-2 grid gap-3 sm:grid-cols-3">
          <BirthSelect
            name="birthYear"
            value={state.birthYear}
            placeholder="年"
            options={yearOptions}
            onChange={(v) => update("birthYear", v)}
            ariaLabel="生年"
          />
          <BirthSelect
            name="birthMonth"
            value={state.birthMonth}
            placeholder="月"
            options={monthOptions}
            onChange={(v) => update("birthMonth", v)}
            ariaLabel="生月"
          />
          <BirthSelect
            name="birthDay"
            value={state.birthDay}
            placeholder="日"
            options={dayOptions}
            onChange={(v) => update("birthDay", v)}
            ariaLabel="生日"
          />
        </div>
        {errors.birthdate ? (
          <p className="mt-2 text-xs text-red-600">{errors.birthdate}</p>
        ) : null}
        <p className="mt-2 text-xs text-ink-muted">
          ※ 18歳未満および高校生はご登録いただけません。
        </p>
      </div>

      {/* 性別 */}
      <fieldset id="gender">
        <legend className="flex items-center gap-2 text-sm font-semibold text-ink">
          性別
          <span className="rounded bg-brand-500/10 px-1.5 py-0.5 text-[10px] font-bold text-brand-600">
            必須
          </span>
        </legend>
        <div className="mt-3 grid gap-2 sm:grid-cols-3">
          {genderOptions.map((opt) => {
            const checked = state.gender === opt.value;
            return (
              <label
                key={opt.value}
                className={cn(
                  "flex cursor-pointer items-center gap-3 rounded-lg border px-4 py-3 text-sm transition",
                  checked
                    ? "border-brand-500 bg-brand-50/60"
                    : "border-ink-line bg-white hover:border-ink",
                )}
              >
                <input
                  type="radio"
                  name="gender"
                  value={opt.value}
                  checked={checked}
                  onChange={() => update("gender", opt.value)}
                  className="h-4 w-4 text-brand-500 focus:ring-brand-500"
                />
                <span className="font-medium">{opt.label}</span>
              </label>
            );
          })}
        </div>
        {errors.gender ? (
          <p className="mt-2 text-xs text-red-600">{errors.gender}</p>
        ) : null}
      </fieldset>

      {/* お繋がりのある企業 */}
      <div>
        <label
          htmlFor="connections"
          className="flex items-center gap-2 text-sm font-semibold text-ink"
        >
          お繋がりのある企業
          <span className="rounded bg-brand-500/10 px-1.5 py-0.5 text-[10px] font-bold text-brand-600">
            必須
          </span>
        </label>
        <textarea
          id="connections"
          name="connections"
          rows={5}
          required
          placeholder={"例：\n・株式会社○○（製造業／代表取締役）\n・株式会社△△（IT／執行役員）"}
          value={state.connections}
          onChange={(e) => update("connections", e.target.value)}
          className="mt-2 block w-full resize-y rounded-lg border border-ink-line bg-white px-4 py-3 text-sm text-ink placeholder:text-ink-muted focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200 transition"
        />
        <p className="mt-1.5 text-xs text-ink-muted">
          最低1社、ご紹介可能な企業を業種・規模感とともにご記入ください。
        </p>
        {errors.connections ? (
          <p className="mt-1.5 text-xs text-red-600">{errors.connections}</p>
        ) : null}
      </div>

      {/* 同意チェック */}
      <div className="space-y-4 rounded-xl border border-ink-line bg-cream p-6">
        <AgreementCheckbox
          id="agreeTerms"
          checked={state.agreeTerms}
          onChange={(v) => update("agreeTerms", v)}
          error={errors.agreeTerms}
        >
          <Link
            href={localePath("/terms", locale)}
            className="underline underline-offset-4 text-brand-600"
            target="_blank"
            rel="noopener noreferrer"
          >
            利用規約
          </Link>
          に同意します。
        </AgreementCheckbox>

        <AgreementCheckbox
          id="agreePrivacy"
          checked={state.agreePrivacy}
          onChange={(v) => update("agreePrivacy", v)}
          error={errors.agreePrivacy}
        >
          <Link
            href={localePath("/privacy", locale)}
            className="underline underline-offset-4 text-brand-600"
            target="_blank"
            rel="noopener noreferrer"
          >
            プライバシーポリシー
          </Link>
          に同意します。
        </AgreementCheckbox>

        <AgreementCheckbox
          id="agreeAntisocial"
          checked={state.agreeAntisocial}
          onChange={(v) => update("agreeAntisocial", v)}
          error={errors.agreeAntisocial}
        >
          反社会的勢力に属していないことを誓約します。
        </AgreementCheckbox>

        <AgreementCheckbox
          id="agreeCompliance"
          checked={state.agreeCompliance}
          onChange={(v) => update("agreeCompliance", v)}
          error={errors.agreeCompliance}
        >
          所属企業の副業規則および退職元との取り決めに違反していないことを誓約します。
        </AgreementCheckbox>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <Button type="submit" size="lg">
          登録申請を送信
        </Button>
        <Link
          href={localePath("/contact/partner", locale)}
          className="text-sm font-semibold text-ink-soft hover:text-ink"
        >
          ← 紹介営業パートナーの説明に戻る
        </Link>
      </div>
    </form>
  );
}

function BirthSelect({
  name,
  value,
  placeholder,
  options,
  onChange,
  ariaLabel,
}: {
  name: string;
  value: string;
  placeholder: string;
  options: { value: string; label: string }[];
  onChange: (v: string) => void;
  ariaLabel: string;
}) {
  return (
    <select
      name={name}
      value={value}
      aria-label={ariaLabel}
      required
      onChange={(e) => onChange(e.target.value)}
      className="block w-full rounded-lg border border-ink-line bg-white px-4 py-3 pr-10 text-sm text-ink focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200 transition"
    >
      <option value="" disabled>
        {placeholder}
      </option>
      {options.map((o) => (
        <option key={o.value} value={o.value}>
          {o.label}
        </option>
      ))}
    </select>
  );
}

function AgreementCheckbox({
  id,
  checked,
  onChange,
  error,
  children,
}: {
  id: string;
  checked: boolean;
  onChange: (v: boolean) => void;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="flex cursor-pointer items-start gap-3 text-sm">
        <input
          id={id}
          type="checkbox"
          required
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="mt-1 h-4 w-4 rounded border-ink-line text-brand-500 focus:ring-brand-500"
        />
        <span className="text-ink-soft leading-relaxed">{children}</span>
      </label>
      {error ? <p className="mt-1.5 pl-7 text-xs text-red-600">{error}</p> : null}
    </div>
  );
}
