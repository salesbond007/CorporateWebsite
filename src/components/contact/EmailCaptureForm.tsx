"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { localePath } from "@/i18n/path";
import { isEmailFormat } from "@/lib/email";
import { cn } from "@/lib/cn";
import type { Locale } from "@/i18n/config";

type Props = {
  locale: Locale;
  /** Container styling override */
  className?: string;
  /** Short heading above the form */
  heading?: string;
  /** Subhead under the heading */
  subhead?: string;
  /** Submit button label */
  buttonLabel?: string;
  /** Dark backgrounds use the inverse text/border tone */
  tone?: "light" | "dark";
  /** Compact horizontal layout (always row, smaller height, no arrow) */
  compact?: boolean;
};

export function EmailCaptureForm({
  locale,
  className,
  heading = "まずはメールアドレスのみで登録",
  subhead = "ご入力のメール宛に、本登録フォームをお送りします。所要時間1分。",
  buttonLabel = "登録する",
  tone = "light",
  compact = false,
}: Props) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const trimmed = email.trim();
    if (!trimmed) {
      setError("メールアドレスをご入力ください。");
      return;
    }
    if (!isEmailFormat(trimmed)) {
      setError("メールアドレスの形式が正しくありません。");
      return;
    }
    setError(null);
    setSubmitting(true);
    // UI-only: redirect to the "sent" confirmation page.
    // Backend mail delivery to be wired up later.
    router.push(
      `${localePath("/contact/partner/sent", locale)}?email=${encodeURIComponent(trimmed)}`,
    );
  }

  const isDark = tone === "dark";

  return (
    <div
      className={cn(
        "w-full",
        isDark ? "text-white" : "text-ink",
        className,
      )}
    >
      {heading ? (
        <p
          className={cn(
            "font-display text-xl md:text-2xl font-black leading-tight",
            isDark ? "text-white" : "text-ink",
          )}
        >
          {heading}
        </p>
      ) : null}
      {subhead ? (
        <p
          className={cn(
            "mt-3 text-sm md:text-base leading-relaxed font-medium",
            isDark ? "text-white/80" : "text-ink-soft",
          )}
        >
          {subhead}
        </p>
      ) : null}

      <form
        onSubmit={onSubmit}
        noValidate
        className={cn(
          "mt-5 flex items-stretch gap-2",
          compact
            ? "flex-row"
            : "flex-col gap-3 sm:flex-row sm:gap-3",
        )}
      >
        <label htmlFor="email-capture" className="sr-only">
          メールアドレス
        </label>
        <input
          id="email-capture"
          type="email"
          inputMode="email"
          autoComplete="email"
          required
          placeholder="example@company.co.jp"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={cn(
            "border-2 px-4 text-ink placeholder:text-ink-muted transition focus:outline-none",
            compact
              ? "h-12 flex-1 text-sm"
              : "h-14 w-full sm:flex-1 text-sm md:text-base",
            isDark
              ? "border-white/30 bg-white focus:border-brand-500"
              : "border-ink-line bg-white focus:border-brand-500",
          )}
        />
        <button
          type="submit"
          disabled={submitting}
          className={cn(
            "inline-flex shrink-0 items-center justify-center bg-brand-500 font-semibold text-white transition hover:bg-brand-600 disabled:opacity-60",
            compact
              ? "h-12 px-5 text-sm"
              : "h-14 w-full sm:w-auto gap-2 px-8 text-sm md:text-base",
          )}
        >
          {submitting ? "送信中..." : buttonLabel}
          {!submitting && !compact ? (
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M2.5 7h9M11.5 7L7.5 3M11.5 7L7.5 11"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          ) : null}
        </button>
      </form>

      {error ? (
        <p
          role="alert"
          className={cn(
            "mt-3 text-xs",
            isDark ? "text-red-300" : "text-red-600",
          )}
        >
          {error}
        </p>
      ) : null}

      <p
        className={cn(
          "mt-3 text-[11px] leading-relaxed",
          isDark ? "text-white/60" : "text-ink-muted",
        )}
      >
        ※ 登録費用は一切かかりません。18歳未満および高校生はご登録いただけません。
      </p>
    </div>
  );
}
