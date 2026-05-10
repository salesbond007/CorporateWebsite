"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { TextField, TextareaField, SelectField } from "./Field";
import type { ContactFormType } from "@/lib/contact";

type Props = {
  type: ContactFormType;
};

type Status = "idle" | "submitting" | "success" | "error";

export function ContactForm({ type }: Props) {
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState<string>("");
  const [errors, setErrors] = useState<Record<string, string[]>>({});

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setErrors({});
    setMessage("");

    const formData = new FormData(e.currentTarget);
    const data: Record<string, unknown> = { type };
    formData.forEach((value, key) => {
      data[key] = value;
    });

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) {
        setStatus("error");
        setErrors(json.issues ?? {});
        setMessage(json.error ?? "送信に失敗しました。");
        return;
      }
      setStatus("success");
      (e.target as HTMLFormElement).reset();
    } catch {
      setStatus("error");
      setMessage("通信エラーが発生しました。");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-xl2 border border-ink-line bg-white p-10 text-center">
        <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-brand-50 text-brand-600">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M5 12l5 5L20 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <h2 className="mt-6 text-h2">送信が完了しました</h2>
        <p className="mt-4 text-ink-soft leading-relaxed">
          お問い合わせありがとうございます。<br />
          内容を確認のうえ、担当者よりご連絡いたします。
        </p>
        <div className="mt-8">
          <Link href="/" className="link-arrow">
            トップへ戻る
          </Link>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-6">
      {/* Honeypot */}
      <div className="hidden" aria-hidden="true">
        <label>
          Website
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      {type === "business" ? (
        <BusinessFields errors={errors} />
      ) : (
        <ProfessionalFields errors={errors} />
      )}

      <TextareaField
        label="お問い合わせ内容"
        name="message"
        required
        hint="10文字以上でご入力ください。"
        error={errors.message?.[0]}
      />

      <div className="rounded-xl border border-ink-line bg-cream p-5">
        <label className="flex items-start gap-3 text-sm">
          <input
            type="checkbox"
            name="agreement"
            required
            className="mt-1 h-4 w-4 rounded border-ink-line text-brand-500 focus:ring-brand-500"
          />
          <span className="text-ink-soft leading-relaxed">
            <Link href="/privacy" className="underline underline-offset-4 text-brand-600">
              プライバシーポリシー
            </Link>
            に同意して送信します。
          </span>
        </label>
      </div>

      {status === "error" && message ? (
        <p
          role="alert"
          className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
        >
          {message}
        </p>
      ) : null}

      <div>
        <Button size="lg" type="submit" disabled={status === "submitting"}>
          {status === "submitting" ? "送信中..." : "送信する"}
        </Button>
      </div>
    </form>
  );
}

function BusinessFields({ errors }: { errors: Record<string, string[]> }) {
  return (
    <>
      <div className="grid gap-6 md:grid-cols-2">
        <TextField
          label="会社名"
          name="company"
          required
          autoComplete="organization"
          placeholder="株式会社○○"
          error={errors.company?.[0]}
        />
        <TextField
          label="部署・役職"
          name="department"
          autoComplete="organization-title"
          placeholder="マーケティング部"
        />
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        <TextField
          label="お名前"
          name="name"
          required
          autoComplete="name"
          placeholder="山田 太郎"
          error={errors.name?.[0]}
        />
        <TextField
          label="電話番号"
          name="phone"
          inputMode="tel"
          autoComplete="tel"
          placeholder="03-XXXX-XXXX"
        />
      </div>
      <TextField
        label="メールアドレス"
        name="email"
        type="email"
        required
        autoComplete="email"
        placeholder="example@company.co.jp"
        error={errors.email?.[0]}
      />
      <div className="grid gap-6 md:grid-cols-2">
        <SelectField
          label="お問い合わせ種別"
          name="inquiryType"
          required
          options={[
            { value: "service", label: "サービスについて" },
            { value: "estimate", label: "お見積り依頼" },
            { value: "partnership", label: "パートナーシップ" },
            { value: "other", label: "その他" },
          ]}
          error={errors.inquiryType?.[0]}
        />
        <SelectField
          label="ご予算"
          name="budget"
          options={[
            { value: "under-500k", label: "〜50万円" },
            { value: "500k-3m", label: "50〜300万円" },
            { value: "3m-10m", label: "300〜1,000万円" },
            { value: "10m-plus", label: "1,000万円〜" },
            { value: "undecided", label: "未定" },
          ]}
        />
      </div>
    </>
  );
}

function ProfessionalFields({ errors }: { errors: Record<string, string[]> }) {
  return (
    <>
      <div className="grid gap-6 md:grid-cols-2">
        <TextField
          label="お名前"
          name="name"
          required
          autoComplete="name"
          placeholder="山田 太郎"
          error={errors.name?.[0]}
        />
        <TextField
          label="フリガナ"
          name="furigana"
          placeholder="ヤマダ タロウ"
        />
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        <TextField
          label="メールアドレス"
          name="email"
          type="email"
          required
          autoComplete="email"
          error={errors.email?.[0]}
        />
        <TextField
          label="電話番号"
          name="phone"
          inputMode="tel"
          autoComplete="tel"
        />
      </div>
      <TextField
        label="専門分野・職種"
        name="expertise"
        required
        placeholder="例: ITコンサルタント / マーケティング / エンジニア"
        error={errors.expertise?.[0]}
      />
      <div className="grid gap-6 md:grid-cols-2">
        <SelectField
          label="経験年数"
          name="experienceYears"
          required
          options={[
            { value: "0-3", label: "0〜3年" },
            { value: "4-7", label: "4〜7年" },
            { value: "8-15", label: "8〜15年" },
            { value: "16-plus", label: "16年以上" },
          ]}
          error={errors.experienceYears?.[0]}
        />
        <SelectField
          label="希望稼働形態"
          name="workStyle"
          required
          options={[
            { value: "full-time", label: "フルタイム" },
            { value: "part-time", label: "パートタイム / 副業" },
            { value: "contract", label: "業務委託" },
            { value: "any", label: "相談したい" },
          ]}
          error={errors.workStyle?.[0]}
        />
      </div>
      <TextField
        label="ポートフォリオURL"
        name="portfolio"
        type="url"
        placeholder="https://"
        error={errors.portfolio?.[0]}
      />
    </>
  );
}
