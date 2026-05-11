"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { TextField, TextareaField } from "./Field";
import { localePath } from "@/i18n/path";
import { site } from "@/lib/site";
import { isEmailFormat } from "@/lib/email";
import type { Locale } from "@/i18n/config";

type Props = {
  locale: Locale;
};

type FormState = {
  lastName: string;
  firstName: string;
  furigana: string;
  email: string;
  phone: string;
  affiliation: string;
  position: string;
  expertise: string;
  achievements: string;
  agreement: boolean;
};

const initial: FormState = {
  lastName: "",
  firstName: "",
  furigana: "",
  email: "",
  phone: "",
  affiliation: "",
  position: "",
  expertise: "",
  achievements: "",
  agreement: false,
};

type FieldErrors = Partial<Record<keyof FormState, string>>;

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
    if (!state.phone.trim()) next.phone = "電話番号をご入力ください。";
    if (!state.expertise.trim()) {
      next.expertise = "ご紹介可能な業界・領域をご入力ください。";
    }
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

    const subject = `【紹介営業パートナー登録】${state.lastName} ${state.firstName} 様`;
    const body = [
      "■ お名前",
      `${state.lastName} ${state.firstName}`,
      ...(state.furigana ? ["", "■ フリガナ", state.furigana] : []),
      "",
      "■ メールアドレス",
      state.email,
      "",
      "■ 電話番号",
      state.phone,
      "",
      "■ 現在のご所属",
      state.affiliation || "（未入力）",
      "",
      "■ 役職",
      state.position || "（未入力）",
      "",
      "■ ご紹介可能な業界・領域",
      state.expertise,
      "",
      "■ 過去のご紹介実績・強み",
      state.achievements || "（未入力）",
    ].join("\n");

    const mailto = `mailto:${site.email}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;
    window.location.href = mailto;
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
          メールクライアントが起動した場合は、内容を確認のうえそのまま送信してください。
          <br />
          起動しなかった場合は{" "}
          <a className="text-brand-600 underline" href={`mailto:${site.email}`}>
            {site.email}
          </a>{" "}
          まで直接ご連絡ください。
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
      {/* 氏名 */}
      <div>
        <p className="flex items-center gap-2 text-sm font-semibold text-ink">
          氏名
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

      <TextField
        label="フリガナ"
        name="furigana"
        placeholder="ヤマダ タロウ"
        value={state.furigana}
        onChange={(e) => update("furigana", e.target.value)}
      />

      <div className="grid gap-6 md:grid-cols-2">
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
          label="電話番号"
          name="phone"
          type="tel"
          required
          inputMode="tel"
          autoComplete="tel"
          placeholder="090-XXXX-XXXX"
          value={state.phone}
          onChange={(e) => update("phone", e.target.value)}
          error={errors.phone}
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <TextField
          label="現在のご所属"
          name="affiliation"
          autoComplete="organization"
          placeholder="株式会社○○ / 個人事業主 など"
          value={state.affiliation}
          onChange={(e) => update("affiliation", e.target.value)}
        />
        <TextField
          label="役職・職種"
          name="position"
          autoComplete="organization-title"
          placeholder="営業部 部長 / 経営者 など"
          value={state.position}
          onChange={(e) => update("position", e.target.value)}
        />
      </div>

      <TextareaField
        label="ご紹介可能な業界・領域"
        name="expertise"
        required
        hint="例：IT/SaaS、製造業、金融、地方の中小企業の経営層 など"
        value={state.expertise}
        onChange={(e) => update("expertise", e.target.value)}
        error={errors.expertise}
      />

      <TextareaField
        label="過去のご紹介実績・強み"
        name="achievements"
        hint="ご経験や、過去にご紹介された業界・規模感などをご記入ください。"
        value={state.achievements}
        onChange={(e) => update("achievements", e.target.value)}
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

      <div>
        <Button type="submit" size="lg">
          登録申請する
        </Button>
      </div>
    </form>
  );
}
