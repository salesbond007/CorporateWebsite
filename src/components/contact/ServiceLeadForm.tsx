"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import type { ServiceLeadService } from "@/lib/contact";
import { isValidPhone, normalizePhone } from "@/lib/phone";
import { cn } from "@/lib/cn";

type Accent = "blue" | "wine";

type Props = {
  /** 送信先で区別するサービス */
  service: ServiceLeadService;
  /** ページのメインカラー */
  accent: Accent;
  /** 「ご相談テーマ」の選択肢(複数選択) */
  topics: string[];
  /** プライバシーポリシーへのリンク(ロケール付き) */
  privacyHref: string;
};

/** アクセントカラーごとのクラス(Tailwindが検出できるよう、文字列をそのまま書く) */
const tone: Record<
  Accent,
  {
    solid: string;
    hover: string;
    soft: string;
    text: string;
    focus: string;
    pillOn: string;
    pillHover: string;
    shadow: string;
  }
> = {
  blue: {
    solid: "bg-[#0046C8]",
    hover: "hover:bg-[#0037B9]",
    soft: "bg-[#F2F8FC]",
    text: "text-[#0046C8]",
    focus: "focus:border-[#0046C8] focus:ring-[#0046C8]/15",
    pillOn: "border-[#0046C8] bg-[#0046C8] text-white",
    pillHover: "hover:border-[#0046C8]",
    shadow: "shadow-[0_16px_36px_-14px_rgba(0,70,200,0.7)]",
  },
  wine: {
    solid: "bg-brand-500",
    hover: "hover:bg-brand-600",
    soft: "bg-brand-50",
    text: "text-brand-600",
    focus: "focus:border-brand-500 focus:ring-brand-500/15",
    pillOn: "border-brand-500 bg-brand-500 text-white",
    pillHover: "hover:border-brand-500",
    shadow: "shadow-[0_16px_36px_-14px_rgba(122,30,53,0.8)]",
  },
};

function Label({
  text,
  required,
  accent,
}: {
  text: string;
  required?: boolean;
  accent: Accent;
}) {
  return (
    <span className="mb-2 flex items-center gap-2 text-sm font-bold text-ink">
      {text}
      <span
        className={cn(
          "rounded px-1.5 py-0.5 text-[10px] font-bold",
          required
            ? cn(tone[accent].solid, "text-white")
            : "bg-[#EFE9E4] text-ink/60",
        )}
      >
        {required ? "必須" : "任意"}
      </span>
    </span>
  );
}

/** 簡易LP(顧問・COO紹介 / CISO・セキュリティ顧問)の無料相談フォーム(送信先: info@salesbond.jp) */
export function ServiceLeadForm({
  service,
  accent,
  topics,
  privacyHref,
}: Props) {
  const t = tone[accent];
  const inputClass = cn(
    "w-full rounded-lg border border-[#E7DED7] bg-white px-4 py-3.5 text-base text-ink outline-none transition placeholder:text-ink/35 focus:ring-4",
    t.focus,
  );

  const [company, setCompany] = useState("");
  const [department, setDepartment] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [selected, setSelected] = useState<string[]>([]);
  const [message, setMessage] = useState("");
  const [agreement, setAgreement] = useState(false);
  const [website, setWebsite] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function toggle(topic: string) {
    setSelected((c) =>
      c.includes(topic) ? c.filter((v) => v !== topic) : [...c, topic],
    );
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    if (!company.trim() || !name.trim() || !email.trim() || !phone.trim()) {
      setError("必須項目をご入力ください。");
      return;
    }
    if (!isValidPhone(phone)) {
      setError("正しい電話番号をご入力ください。");
      return;
    }
    if (!agreement) {
      setError("個人情報の取り扱いへの同意が必要です。");
      return;
    }
    setSending(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "service_lead",
          service,
          company,
          department,
          name,
          email,
          phone: normalizePhone(phone),
          topics: selected,
          message,
          agreement: "on",
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
      <div className="rounded-2xl bg-white p-10 text-center" role="status">
        <div
          className={cn(
            "mx-auto grid h-14 w-14 place-items-center rounded-full",
            t.soft,
            t.text,
          )}
        >
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
        <p className="mt-6 text-lg font-black text-ink">送信が完了しました</p>
        <p className="mt-3 leading-relaxed text-ink/75">
          お問い合わせありがとうございます。
          <br />
          内容を確認のうえ、担当者より2営業日以内にご連絡いたします。
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <label className="block">
          <Label text="会社名" required accent={accent} />
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
          <Label text="部署・役職" accent={accent} />
          <input
            name="department"
            type="text"
            autoComplete="organization-title"
            placeholder="経営企画部 部長"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            className={inputClass}
          />
        </label>
        <label className="block">
          <Label text="お名前" required accent={accent} />
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
          <Label text="メールアドレス" required accent={accent} />
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
        <label className="block md:col-span-2">
          <Label text="電話番号" required accent={accent} />
          <input
            name="phone"
            type="tel"
            autoComplete="tel"
            placeholder="03-1234-5678"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className={inputClass}
          />
        </label>
      </div>

      <fieldset>
        <legend>
          <Label text="ご相談テーマ（複数選択可）" accent={accent} />
        </legend>
        <div className="flex flex-wrap gap-2">
          {topics.map((topic) => {
            const on = selected.includes(topic);
            return (
              <button
                key={topic}
                type="button"
                aria-pressed={on}
                onClick={() => toggle(topic)}
                className={cn(
                  "rounded-full border px-4 py-2 text-sm font-bold transition",
                  on
                    ? t.pillOn
                    : cn("border-[#E7DED7] bg-white text-ink", t.pillHover),
                )}
              >
                {on ? "✓ " : ""}
                {topic}
              </button>
            );
          })}
        </div>
      </fieldset>

      <label className="block">
        <Label text="ご相談内容" accent={accent} />
        <textarea
          name="message"
          rows={5}
          placeholder="現在の状況や、実現したいことなど"
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

      <label
        className={cn("flex items-start gap-3 rounded-lg p-4 text-sm", t.soft)}
      >
        <input
          type="checkbox"
          name="agreement"
          checked={agreement}
          onChange={(e) => setAgreement(e.target.checked)}
          className="mt-0.5 h-4 w-4 rounded border-[#E7DED7]"
        />
        <span className="leading-relaxed text-ink/80">
          <Link
            href={privacyHref}
            className={cn("font-bold underline underline-offset-4", t.text)}
          >
            個人情報の取り扱い
          </Link>
          に同意します
          <span
            className={cn(
              "ml-2 rounded px-1.5 py-0.5 text-[10px] font-bold text-white",
              t.solid,
            )}
          >
            必須
          </span>
        </span>
      </label>

      {error ? (
        <p
          role="alert"
          className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-bold text-red-700"
        >
          {error}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={sending}
        className={cn(
          "group flex h-16 w-full items-center justify-center gap-2 rounded-xl text-base font-black text-white transition hover:-translate-y-0.5 disabled:opacity-60",
          t.solid,
          t.hover,
          t.shadow,
        )}
      >
        {sending ? "送信中..." : "無料相談を申し込む"}
        {sending ? null : (
          <span
            aria-hidden="true"
            className="transition-transform group-hover:translate-x-1"
          >
            →
          </span>
        )}
      </button>
    </form>
  );
}
