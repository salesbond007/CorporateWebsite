"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { aiCheckEmployeeOptions } from "@/lib/contact";
import { cn } from "@/lib/cn";

const inputClass =
  "w-full rounded-[4px] border border-[#D9D9DE] bg-white px-4 py-3.5 text-base text-ink outline-none transition placeholder:text-ink/35 focus:border-ink/60";

function Label({ text, required }: { text: string; required?: boolean }) {
  return (
    <span className="mb-2 flex items-center gap-2 text-sm font-semibold text-ink">
      {text}
      <span
        className={cn(
          "rounded px-1.5 py-0.5 text-[10px] font-bold",
          required ? "bg-brand-500 text-white" : "bg-[#F1ECEE] text-ink/60",
        )}
      >
        {required ? "必須" : "任意"}
      </span>
    </span>
  );
}

/** Bond AI LP の「無料のAI利用チェック」申し込みフォーム(送信先: info@salesbond.jp) */
export function AiCheckForm({ privacyHref }: { privacyHref: string }) {
  const [company, setCompany] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [employees, setEmployees] = useState("");
  const [message, setMessage] = useState("");
  const [website, setWebsite] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    if (!company.trim() || !name.trim() || !email.trim() || !employees) {
      setError("必須項目をご入力ください。");
      return;
    }
    setSending(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "ai_check",
          company,
          name,
          email,
          employees,
          message,
          website,
        }),
      });
      const json: {
        ok?: boolean;
        error?: string;
        issues?: Record<string, string[]>;
      } = await res.json().catch(() => ({}));
      if (!res.ok || !json.ok) {
        const issueText = json.issues && Object.values(json.issues).flat()[0];
        setError(
          issueText ??
            json.error ??
            "送信に失敗しました。時間をおいて再度お試しください。",
        );
        return;
      }
      setSent(true);
    } catch {
      setError("通信エラーが発生しました。時間をおいて再度お試しください。");
    } finally {
      setSending(false);
    }
  }

  if (sent) {
    return (
      <div className="p-8 text-center md:p-12" role="status">
        <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-brand-50 text-brand-500">
          <svg
            width="26"
            height="26"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M5 12l5 5L20 7"
              stroke="currentColor"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <p className="mt-6 text-lg font-semibold text-ink">
          お申し込みを受け付けました
        </p>
        <p className="mt-3 leading-relaxed text-ink/75">
          ありがとうございます。
          <br />
          担当者より2営業日以内に、日程調整のご連絡をいたします。
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <label className="block md:col-span-2">
          <Label text="会社名" required />
          <input
            name="company"
            type="text"
            autoComplete="organization"
            placeholder="株式会社〇〇"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            className={inputClass}
          />
        </label>
        <label className="block">
          <Label text="お名前" required />
          <input
            name="name"
            type="text"
            autoComplete="name"
            placeholder="山田 太郎"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={inputClass}
          />
        </label>
        <label className="block">
          <Label text="メールアドレス" required />
          <input
            name="email"
            type="email"
            autoComplete="email"
            placeholder="taro@example.co.jp"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={inputClass}
          />
        </label>
      </div>

      <fieldset>
        <legend>
          <Label text="従業員数" required />
        </legend>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
          {aiCheckEmployeeOptions.map((o) => (
            <label
              key={o.value}
              className={cn(
                "flex cursor-pointer items-center justify-center rounded-[4px] border px-3 py-3 text-sm font-bold transition",
                employees === o.value
                  ? "border-brand-500 bg-brand-500 text-white"
                  : "border-[#D9D9DE] bg-white text-ink hover:border-brand-500",
              )}
            >
              <input
                type="radio"
                name="employees"
                value={o.value}
                checked={employees === o.value}
                onChange={() => setEmployees(o.value)}
                className="sr-only"
              />
              {o.label}
            </label>
          ))}
        </div>
      </fieldset>

      <label className="block">
        <Label text="ご相談内容" />
        <textarea
          name="message"
          rows={4}
          placeholder="例：社員のAI利用のルールを作りたい／取引先からチェックシートが届いた"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className={inputClass}
        />
      </label>

      <input
        name="website"
        type="text"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        value={website}
        onChange={(e) => setWebsite(e.target.value)}
        className="hidden"
      />

      {error ? (
        <p
          role="alert"
          className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm font-bold text-red-700"
        >
          {error}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={sending}
        className="group flex h-14 w-full items-center justify-center gap-2 rounded-[4px] bg-brand-500 text-base font-semibold text-white transition-colors hover:bg-brand-600 disabled:opacity-60"
      >
        {sending ? "送信中..." : "無料で申し込む"}
        {sending ? null : (
          <span
            aria-hidden="true"
            className="transition-transform group-hover:translate-x-1"
          >
            →
          </span>
        )}
      </button>
      <p className="text-center text-xs leading-relaxed text-ink/60">
        送信いただいた情報は
        <Link
          href={privacyHref}
          className="mx-0.5 font-bold text-brand-600 underline underline-offset-4"
        >
          プライバシーポリシー
        </Link>
        に沿って取り扱います。
      </p>
    </form>
  );
}
