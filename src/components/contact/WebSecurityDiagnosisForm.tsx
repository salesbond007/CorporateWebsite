"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";

type Props = {
  /** プライバシーポリシーへのリンク(ロケール付き) */
  privacyHref: string;
};

const inputClass =
  "w-full border border-ink/20 bg-white px-4 py-3.5 text-base text-ink outline-none transition placeholder:text-ink-muted/70 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/15";

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
      const json: { ok?: boolean; error?: string; issues?: Record<string, string[]> } =
        await res.json().catch(() => ({}));

      if (!res.ok || !json.ok) {
        const issueText = json.issues && Object.values(json.issues).flat()[0];
        setError(issueText ?? json.error ?? "送信に失敗しました。時間をおいて再度お試しください。");
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
      <div className="border border-brand-500/25 bg-white p-8 text-center md:p-10" role="status">
        <p className="text-xl font-black text-brand-600">お申し込みを受け付けました</p>
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
            ? "bg-brand-500 px-1.5 py-0.5 text-[10px] font-bold text-white"
            : "bg-ink-line px-1.5 py-0.5 text-[10px] font-bold text-ink-muted"
        }
      >
        {required ? "必須" : "任意"}
      </span>
    </span>
  );

  return (
    <form onSubmit={onSubmit} noValidate className="border border-ink/15 bg-white p-6 md:p-10">
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
        <Link href={privacyHref} className="underline underline-offset-2 hover:text-brand-600">
          プライバシーポリシー
        </Link>
        に基づき適切に取り扱います。
      </p>

      <div className="mt-6">
        <Button type="submit" size="lg" disabled={sending} className="w-full">
          {sending ? "送信中..." : "無料で簡易診断を申し込む"}
        </Button>
      </div>
    </form>
  );
}
