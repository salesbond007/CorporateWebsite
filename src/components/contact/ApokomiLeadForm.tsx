"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { apokomiChannelOptions, apokomiTargetOptions } from "@/lib/contact";
import { isValidPhone, normalizePhone } from "@/lib/phone";
import { cn } from "@/lib/cn";

type Props = {
  /** プライバシーポリシーへのリンク(ロケール付き) */
  privacyHref: string;
};

type ChannelId = (typeof apokomiChannelOptions)[number]["id"];

const inputClass =
  "w-full rounded-lg border border-[#DCE3EF] bg-white px-4 py-3.5 text-base text-[#001432] outline-none transition placeholder:text-[#001432]/35 focus:border-[#0046C8] focus:ring-4 focus:ring-[#0046C8]/15";

function Label({ text, required }: { text: string; required?: boolean }) {
  return (
    <span className="mb-2 flex items-center gap-2 text-sm font-bold text-[#001432]">
      {text}
      <span
        className={cn(
          "rounded px-1.5 py-0.5 text-[10px] font-bold",
          required
            ? "bg-[#0046C8] text-white"
            : "bg-[#E8EDF5] text-[#001432]/60",
        )}
      >
        {required ? "必須" : "任意"}
      </span>
    </span>
  );
}

/** アポコミLPの「無料相談・見積もり依頼」フォーム(送信先: info@salesbond.jp) */
export function ApokomiLeadForm({ privacyHref }: Props) {
  const [company, setCompany] = useState("");
  const [department, setDepartment] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [channels, setChannels] = useState<ChannelId[]>([]);
  const [targetApo, setTargetApo] = useState("");
  const [message, setMessage] = useState("");
  const [agreement, setAgreement] = useState(false);
  const [website, setWebsite] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function toggleChannel(id: ChannelId) {
    setChannels((c) =>
      c.includes(id) ? c.filter((v) => v !== id) : [...c, id],
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
          type: "apokomi_lead",
          company,
          department,
          name,
          email,
          phone: normalizePhone(phone),
          channels,
          targetApo,
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
        <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-[#EEF4FC] text-[#0046C8]">
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
        <p className="mt-6 text-lg font-black text-[#001432]">
          送信が完了しました
        </p>
        <p className="mt-3 leading-relaxed text-[#001432]/75">
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
          <Label text="部署・役職" />
          <input
            name="department"
            type="text"
            autoComplete="organization-title"
            placeholder="営業部 部長"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
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
        <label className="block md:col-span-2">
          <Label text="電話番号" required />
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
          <Label text="検討中のチャネル（複数選択可）" />
        </legend>
        <div className="flex flex-wrap gap-2">
          {apokomiChannelOptions.map((c) => {
            const on = channels.includes(c.id);
            return (
              <button
                key={c.id}
                type="button"
                aria-pressed={on}
                onClick={() => toggleChannel(c.id)}
                className={cn(
                  "rounded-full border px-4 py-2 text-sm font-bold transition",
                  on
                    ? "border-[#0046C8] bg-[#0046C8] text-white"
                    : "border-[#DCE3EF] bg-white text-[#001432] hover:border-[#0046C8]",
                )}
              >
                {on ? "✓ " : ""}
                {c.label}
              </button>
            );
          })}
        </div>
      </fieldset>

      <label className="block">
        <Label text="月間の目標アポイント数" />
        <select
          name="targetApo"
          value={targetApo}
          onChange={(e) => setTargetApo(e.target.value)}
          className={inputClass}
        >
          <option value="">選択してください</option>
          {apokomiTargetOptions.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      </label>

      <label className="block">
        <Label text="ご相談内容" />
        <textarea
          name="message"
          rows={5}
          placeholder="商材、ターゲット、これまでの営業活動など"
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

      <label className="flex items-start gap-3 rounded-lg bg-[#EEF4FC] p-4 text-sm">
        <input
          type="checkbox"
          name="agreement"
          checked={agreement}
          onChange={(e) => setAgreement(e.target.checked)}
          className="mt-0.5 h-4 w-4 rounded border-[#DCE3EF] text-[#0046C8] focus:ring-[#0046C8]"
        />
        <span className="leading-relaxed text-[#001432]/80">
          <Link
            href={privacyHref}
            className="font-bold text-[#00309F] underline underline-offset-4"
          >
            個人情報の取り扱い
          </Link>
          に同意します
          <span className="ml-2 rounded bg-[#0046C8] px-1.5 py-0.5 text-[10px] font-bold text-white">
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
        className="group flex h-16 w-full items-center justify-center gap-2 rounded-xl bg-[#0046C8] text-base font-black text-white shadow-[0_16px_36px_-14px_rgba(0,70,200,0.9)] transition hover:-translate-y-0.5 hover:bg-[#0037B9] disabled:opacity-60"
      >
        {sending ? "送信中..." : "この内容で送信する"}
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
