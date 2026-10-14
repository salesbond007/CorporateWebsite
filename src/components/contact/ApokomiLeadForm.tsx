"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";

export function ApokomiLeadForm() {
  const [company, setCompany] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
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
          type: "apokomi_lead",
          company,
          name,
          email,
          phone,
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
      setCompany("");
      setName("");
      setEmail("");
      setPhone("");
      setMessage("");
    } catch {
      setError("通信エラーが発生しました。時間をおいて再度お試しください。");
    } finally {
      setSending(false);
    }
  }

  if (sent) {
    return (
      <div className="rounded-md border border-[#7B2233]/20 bg-white p-8 text-center">
        <p className="text-xl font-black text-[#7B2233]">お申し込みを受け付けました</p>
        <p className="mt-3 text-base font-medium leading-relaxed text-[#2B2B2B]/80">
          確認次第、担当者よりご連絡いたします。
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="mx-auto max-w-xl" noValidate>
      <div className="space-y-4">
        <div>
          <label htmlFor="apokomi-company" className="sr-only">
            会社名
          </label>
          <input
            id="apokomi-company"
            name="company"
            type="text"
            required
            autoComplete="organization"
            placeholder="会社名"
            value={company}
            onChange={(event) => setCompany(event.target.value)}
            className="h-14 w-full rounded-md border border-[#7B2233]/25 bg-white px-5 text-base font-medium text-[#2B2B2B] outline-none transition focus:border-[#7B2233]"
          />
        </div>
        <div>
          <label htmlFor="apokomi-name" className="sr-only">
            お名前
          </label>
          <input
            id="apokomi-name"
            name="name"
            type="text"
            required
            autoComplete="name"
            placeholder="お名前"
            value={name}
            onChange={(event) => setName(event.target.value)}
            className="h-14 w-full rounded-md border border-[#7B2233]/25 bg-white px-5 text-base font-medium text-[#2B2B2B] outline-none transition focus:border-[#7B2233]"
          />
        </div>
        <div>
          <label htmlFor="apokomi-email" className="sr-only">
            メールアドレス
          </label>
          <input
            id="apokomi-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="メールアドレス"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="h-14 w-full rounded-md border border-[#7B2233]/25 bg-white px-5 text-base font-medium text-[#2B2B2B] outline-none transition focus:border-[#7B2233]"
          />
        </div>
        <div>
          <label htmlFor="apokomi-phone" className="sr-only">
            電話番号
          </label>
          <input
            id="apokomi-phone"
            name="phone"
            type="tel"
            required
            autoComplete="tel"
            placeholder="電話番号"
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
            className="h-14 w-full rounded-md border border-[#7B2233]/25 bg-white px-5 text-base font-medium text-[#2B2B2B] outline-none transition focus:border-[#7B2233]"
          />
        </div>
        <div>
          <label htmlFor="apokomi-message" className="sr-only">
            ご相談内容
          </label>
          <textarea
            id="apokomi-message"
            name="message"
            rows={4}
            placeholder="ご相談内容(商材・目標アポ数・ご予算など)"
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            className="w-full rounded-md border border-[#7B2233]/25 bg-white px-5 py-4 text-base font-medium text-[#2B2B2B] outline-none transition focus:border-[#7B2233]"
          />
        </div>
      </div>
      <label className="sr-only" htmlFor="apokomi-website">
        Website
      </label>
      <input
        id="apokomi-website"
        name="website"
        type="text"
        tabIndex={-1}
        autoComplete="off"
        value={website}
        onChange={(event) => setWebsite(event.target.value)}
        className="hidden"
      />
      {error ? <p className="mt-3 text-sm font-bold text-red-700">{error}</p> : null}
      <div className="mt-5 flex justify-center">
        <Button type="submit" size="lg" disabled={sending} className="!bg-[#7B2233] hover:!bg-[#A33A52]">
          {sending ? "送信中..." : "無料相談を申し込む"}
        </Button>
      </div>
    </form>
  );
}
