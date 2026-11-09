"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";

type Props = {
  /** プライバシーポリシーへのリンク(ロケール付き) */
  privacyHref: string;
};

const inputClass =
  "w-full rounded-xl border border-transparent bg-[#F5F2F3] px-4 py-3.5 text-base text-ink outline-none transition placeholder:text-ink-muted/60 hover:bg-[#F1ECEE] focus:border-brand-500 focus:bg-white focus:ring-4 focus:ring-brand-500/10";

/** URLに https:// が無ければ補う(「www.example.com」等の入力を許容するため) */
function normalizeUrl(value: string) {
  const v = value.trim();
  if (!v) return v;
  return /^https?:\/\//i.test(v) ? v : `https://${v}`;
}

/** ホームページセキュリティ対策LPの「無料簡易診断」申し込みフォーム */
export function WebSecurityDiagnosisForm({ privacyHref }: Props) {
  const [siteUrl, setSiteUrl] = useState("");
  const [company, setCompany] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [website, setWebsite] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSending(true);
    setError(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "web_security_diagnosis",
          siteUrl: normalizeUrl(siteUrl),
          company,
          name,
          email,
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
      <div
        className="rounded-2xl border border-ink/10 bg-white p-8 text-center text-ink md:p-10"
        role="status"
      >
        <p className="text-xl font-black text-brand-600">
          お申し込みを受け付けました
        </p>
        <p className="mt-3 text-base leading-relaxed text-ink-soft">
          簡易診断を行い、担当者より結果とご提案をご連絡いたします。
          <br className="hidden sm:block" />
          確認のメールをお送りしましたので、あわせてご確認ください。
        </p>
      </div>
    );
  }

  const label = (text: string, required: boolean) => (
    <span className="mb-2 flex items-center gap-2 text-sm font-bold text-ink">
      {text}
      <span
        className={
          required
            ? "rounded-full bg-brand-500 px-2 py-0.5 text-[10px] font-bold text-white"
            : "rounded-full bg-ink-line px-2 py-0.5 text-[10px] font-bold text-ink-muted"
        }
      >
        {required ? "必須" : "任意"}
      </span>
    </span>
  );

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="relative overflow-hidden rounded-2xl border border-ink/10 bg-white p-6 text-ink shadow-[0_24px_60px_-40px_rgba(29,5,11,0.35)] md:p-10"
    >
      <span
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-1 bg-brand-500"
      />
      <div className="mb-7 flex items-center justify-between gap-4 border-b border-ink/10 pb-5">
        <p className="text-lg font-black">お申し込みフォーム</p>
        <span className="rounded-full bg-brand-50 px-3 py-1 text-xs font-bold text-brand-600">
          無料
        </span>
      </div>
      <div className="space-y-5">
        <label className="block">
          {label("診断するホームページのURL", true)}
          <input
            name="siteUrl"
            type="url"
            inputMode="url"
            required
            autoComplete="url"
            placeholder="https://www.example.co.jp"
            value={siteUrl}
            onChange={(e) => setSiteUrl(e.target.value)}
            className={inputClass}
          />
        </label>
        <div className="grid gap-5 sm:grid-cols-2">
          <label className="block">
            {label("会社名", true)}
            <input
              name="company"
              type="text"
              required
              autoComplete="organization"
              placeholder="株式会社〇〇"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              className={inputClass}
            />
          </label>
          <label className="block">
            {label("お名前", true)}
            <input
              name="name"
              type="text"
              required
              autoComplete="name"
              placeholder="山田 太郎"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={inputClass}
            />
          </label>
        </div>
        <label className="block">
          {label("メールアドレス", true)}
          <input
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="taro@example.co.jp"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={inputClass}
          />
        </label>
        <label className="block">
          {label("気になっていること・ご相談内容", false)}
          <textarea
            name="message"
            rows={4}
            placeholder="例）サーバー会社からPHP更新の通知が来ている、制作会社と連絡が取れない など"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className={inputClass}
          />
        </label>
      </div>

      {/* スパム対策のダミー欄(人には見えない) */}
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
        <p className="mt-5 text-sm font-bold text-red-700" role="alert">
          {error}
        </p>
      ) : null}

      <p className="mt-6 text-xs leading-relaxed text-ink-muted">
        送信いただいた情報は、
        <Link
          href={privacyHref}
          className="underline underline-offset-2 hover:text-brand-600"
        >
          プライバシーポリシー
        </Link>
        に基づき適切に取り扱います。
      </p>

      <div className="mt-6">
        <Button
          type="submit"
          size="lg"
          disabled={sending}
          className="w-full !h-16 !rounded-xl text-base"
        >
          {sending ? "送信中..." : "無料で簡易診断を申し込む"}
        </Button>
      </div>
    </form>
  );
}
