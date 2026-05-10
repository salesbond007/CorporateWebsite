"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { TextField, TextareaField } from "./Field";
import { localePath } from "@/i18n/path";
import { site } from "@/lib/site";
import { cn } from "@/lib/cn";
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
  { id: "sales-bond", label: "セールスボンド（紹介営業サービス）について" },
  { id: "lead-bond", label: "リードボンド（営業代行サービス）について" },
  { id: "pro-talent", label: "プロ人材サービスについて" },
] as const;

type ServiceId = (typeof serviceOptions)[number]["id"];

type FormState = {
  company: string;
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

export function SimpleContactForm({ locale }: Props) {
  const [state, setState] = useState<FormState>(initial);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setState((s) => ({ ...s, [key]: value }));
  }

  function toggleService(id: ServiceId) {
    setState((s) => ({
      ...s,
      serviceTypes: s.serviceTypes.includes(id)
        ? s.serviceTypes.filter((v) => v !== id)
        : [...s.serviceTypes, id],
    }));
  }

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    if (!state.inquiryType) {
      setError("お問い合わせ種類をご選択ください。");
      return;
    }

    const inquiryLabel = inquiryTypeLabels[state.inquiryType];
    const serviceLabels =
      state.inquiryType === "service"
        ? serviceOptions
            .filter((o) => state.serviceTypes.includes(o.id))
            .map((o) => `・${o.label}`)
        : [];

    // Frontend-only: compose a mailto: with the form contents.
    // Replace with a server-side API call when ready.
    const subject = `【お問い合わせ】${state.company} ${state.lastName} ${state.firstName} 様`;
    const body = [
      "■ 会社名",
      state.company,
      "",
      "■ お名前",
      `${state.lastName} ${state.firstName}`,
      "",
      "■ 役職",
      state.position,
      "",
      "■ メールアドレス",
      state.email,
      "",
      "■ 携帯電話番号",
      state.phone,
      "",
      "■ お問い合わせ種類",
      inquiryLabel,
      ...(serviceLabels.length > 0 ? ["", ...serviceLabels] : []),
      "",
      "■ お問い合わせ内容",
      state.message || "（未入力）",
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
        <h2 className="mt-6 text-h2">送信を受け付けました</h2>
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
      <p className="text-xs text-ink-muted">
        ※ 現在フロントのみ実装。送信ボタンを押すとメーラーが起動し、
        <span className="font-semibold text-ink-soft">{site.email}</span>{" "}
        宛のメール下書きが作成されます。
      </p>

      <TextField
        label="会社名"
        name="company"
        required
        autoComplete="organization"
        placeholder="株式会社○○"
        value={state.company}
        onChange={(e) => update("company", e.target.value)}
      />

      <div className="grid gap-6 md:grid-cols-2">
        <TextField
          label="お名前(姓)"
          name="lastName"
          required
          autoComplete="family-name"
          placeholder="山田"
          value={state.lastName}
          onChange={(e) => update("lastName", e.target.value)}
        />
        <TextField
          label="お名前(名)"
          name="firstName"
          required
          autoComplete="given-name"
          placeholder="太郎"
          value={state.firstName}
          onChange={(e) => update("firstName", e.target.value)}
        />
      </div>

      <TextField
        label="役職"
        name="position"
        required
        autoComplete="organization-title"
        placeholder="部長 / 取締役 など"
        value={state.position}
        onChange={(e) => update("position", e.target.value)}
      />

      <div className="grid gap-6 md:grid-cols-2">
        <TextField
          label="メールアドレス"
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="example@company.co.jp"
          value={state.email}
          onChange={(e) => update("email", e.target.value)}
        />
        <TextField
          label="携帯電話番号"
          name="phone"
          type="tel"
          required
          inputMode="tel"
          autoComplete="tel"
          placeholder="090-XXXX-XXXX"
          value={state.phone}
          onChange={(e) => update("phone", e.target.value)}
        />
      </div>

      <fieldset>
        <legend className="flex items-center gap-2 text-sm font-semibold text-ink">
          お問い合わせ種類をご選択ください
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
      </fieldset>

      <TextareaField
        label="お問い合わせ内容"
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

      {error ? (
        <p
          role="alert"
          className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
        >
          {error}
        </p>
      ) : null}

      <div>
        <Button type="submit" size="lg">
          送信する
        </Button>
      </div>
    </form>
  );
}
