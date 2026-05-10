"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { TextField, TextareaField } from "./Field";
import { localePath } from "@/i18n/path";
import { site } from "@/lib/site";
import type { Locale } from "@/i18n/config";

type Props = {
  locale: Locale;
};

type FormState = {
  name: string;
  furigana: string;
  company: string;
  department: string;
  position: string;
  email: string;
  phone: string;
  message: string;
  agreement: boolean;
};

const initial: FormState = {
  name: "",
  furigana: "",
  company: "",
  department: "",
  position: "",
  email: "",
  phone: "",
  message: "",
  agreement: false,
};

export function SimpleContactForm({ locale }: Props) {
  const [state, setState] = useState<FormState>(initial);
  const [submitted, setSubmitted] = useState(false);

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setState((s) => ({ ...s, [key]: value }));
  }

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // Frontend-only: open the user's mail client pre-filled with the form
    // contents. Replace with a server-side API call when ready.
    const subject = `【お問い合わせ】${state.company} ${state.name} 様`;
    const body = [
      "■ お名前",
      state.name,
      state.furigana ? `（${state.furigana}）` : null,
      "",
      "■ 会社名",
      state.company,
      "",
      "■ 部署",
      state.department || "（未入力）",
      "",
      "■ 役職",
      state.position || "（未入力）",
      "",
      "■ メールアドレス",
      state.email,
      "",
      "■ 電話番号",
      state.phone || "（未入力）",
      "",
      "■ お問い合わせ内容",
      state.message,
    ]
      .filter((v) => v !== null)
      .join("\n");

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
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
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
          起動しなかった場合は <a className="text-brand-600 underline" href={`mailto:${site.email}`}>{site.email}</a> まで直接ご連絡ください。
        </p>
        <div className="mt-8 flex justify-center gap-3">
          <Button
            href={localePath("/", locale)}
            variant="secondary"
          >
            トップへ戻る
          </Button>
          <Button onClick={() => { setState(initial); setSubmitted(false); }}>
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

      <div className="grid gap-6 md:grid-cols-2">
        <TextField
          label="お名前"
          name="name"
          required
          autoComplete="name"
          placeholder="山田 太郎"
          value={state.name}
          onChange={(e) => update("name", e.target.value)}
        />
        <TextField
          label="フリガナ"
          name="furigana"
          autoComplete="off"
          placeholder="ヤマダ タロウ"
          value={state.furigana}
          onChange={(e) => update("furigana", e.target.value)}
        />
      </div>

      <TextField
        label="法人名（会社名）"
        name="company"
        required
        autoComplete="organization"
        placeholder="株式会社○○"
        value={state.company}
        onChange={(e) => update("company", e.target.value)}
      />

      <div className="grid gap-6 md:grid-cols-2">
        <TextField
          label="部署"
          name="department"
          autoComplete="organization-title"
          placeholder="営業部"
          value={state.department}
          onChange={(e) => update("department", e.target.value)}
        />
        <TextField
          label="役職"
          name="position"
          autoComplete="organization-title"
          placeholder="部長 / 取締役 など"
          value={state.position}
          onChange={(e) => update("position", e.target.value)}
        />
      </div>

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
          label="電話番号"
          name="phone"
          inputMode="tel"
          autoComplete="tel"
          placeholder="03-XXXX-XXXX"
          value={state.phone}
          onChange={(e) => update("phone", e.target.value)}
        />
      </div>

      <TextareaField
        label="お問い合わせ内容"
        name="message"
        required
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

      <div>
        <Button type="submit" size="lg">
          送信する
        </Button>
      </div>
    </form>
  );
}
