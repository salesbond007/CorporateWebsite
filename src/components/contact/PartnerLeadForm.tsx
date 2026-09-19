"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";

export function PartnerLeadForm() {
  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
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
          type: "partner_lead",
          lastName,
          firstName,
          email,
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
      setLastName("");
      setFirstName("");
      setEmail("");
    } catch {
      setError("通信エラーが発生しました。時間をおいて再度お試しください。");
    } finally {
      setSending(false);
    }
  }

  if (sent) {
    return (
      <div className="rounded-md border border-[#7B2233]/20 bg-white p-8 text-center">
        <p className="text-xl font-black text-[#7B2233]">仮登録を受け付けました</p>
        <p className="mt-3 text-base font-medium leading-relaxed text-[#2B2B2B]/80">
          ご登録ありがとうございます。担当者より、案件情報や本登録のご案内をお送りします。
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="mx-auto max-w-xl" noValidate>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="partner-last-name" className="sr-only">
            姓
          </label>
          <input
            id="partner-last-name"
            name="lastName"
            type="text"
            required
            autoComplete="family-name"
            placeholder="姓"
            value={lastName}
            onChange={(event) => setLastName(event.target.value)}
            className="h-14 w-full rounded-md border border-[#7B2233]/25 bg-white px-5 text-base font-medium text-[#2B2B2B] outline-none transition focus:border-[#7B2233]"
          />
        </div>
        <div>
          <label htmlFor="partner-first-name" className="sr-only">
            名
          </label>
          <input
            id="partner-first-name"
            name="firstName"
            type="text"
            required
            autoComplete="given-name"
            placeholder="名"
            value={firstName}
            onChange={(event) => setFirstName(event.target.value)}
            className="h-14 w-full rounded-md border border-[#7B2233]/25 bg-white px-5 text-base font-medium text-[#2B2B2B] outline-none transition focus:border-[#7B2233]"
          />
        </div>
      </div>
      <label htmlFor="partner-email" className="sr-only">
        メールアドレス
      </label>
      <input
        id="partner-email"
        name="email"
        type="email"
        required
        autoComplete="email"
        placeholder="メールアドレス"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        className="mt-4 h-14 w-full rounded-md border border-[#7B2233]/25 bg-white px-5 text-base font-medium text-[#2B2B2B] outline-none transition focus:border-[#7B2233]"
      />
      <label className="sr-only" htmlFor="partner-website">
        Website
      </label>
      <input
        id="partner-website"
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
          {sending ? "送信中..." : "無料で登録する"}
        </Button>
      </div>
    </form>
  );
}
