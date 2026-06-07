import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { localePath } from "@/i18n/path";
import { isLocale } from "@/i18n/config";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "送信完了 - 個人登録のご案内",
  description:
    "個人登録のご案内メールをお送りしました。届いたメールから本登録フォームへお進みください。",
  robots: { index: false, follow: true },
};

type SearchParams = { email?: string };

export default function PartnerSentPage({
  params,
  searchParams,
}: {
  params: { locale: string };
  searchParams: SearchParams;
}) {
  if (!isLocale(params.locale)) notFound();
  const locale = params.locale;
  const email = (searchParams.email ?? "").trim();

  return (
    <section className="py-20 md:py-28">
      <Container className="max-w-2xl">
        <div className="border-2 border-ink-line bg-white p-10 md:p-14 text-center">
          <div className="mx-auto grid h-16 w-16 place-items-center bg-brand-50 text-brand-600">
            <svg
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M4 8h24v16H4z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinejoin="round"
              />
              <path
                d="M4 8l12 9 12-9"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          <h1 className="mt-8 text-display-3 font-black leading-tight text-ink">
            送信が完了しました
          </h1>

          {email ? (
            <p className="mt-6 text-sm md:text-base text-ink-soft leading-relaxed">
              <span className="font-bold text-ink">{email}</span>
              <br />
              宛に、個人登録のご案内メールをお送りしました。
            </p>
          ) : (
            <p className="mt-6 text-sm md:text-base text-ink-soft leading-relaxed">
              ご入力のメールアドレス宛に、個人登録のご案内メールをお送りしました。
            </p>
          )}

          <div className="mt-10 border-2 border-dashed border-ink-line bg-cream/40 p-6 md:p-8 text-left">
            <p className="text-sm md:text-base font-black text-ink">
              ⚠ メールが届かない場合
            </p>
            <ul className="mt-4 space-y-2.5 text-sm leading-relaxed text-ink-soft">
              <li className="flex gap-2">
                <span
                  className="mt-2 inline-block h-1.5 w-1.5 shrink-0 bg-brand-500"
                  aria-hidden="true"
                />
                <span>
                  <span className="font-bold text-ink">迷惑メール / プロモーション</span>
                  フォルダもご確認ください。
                </span>
              </li>
              <li className="flex gap-2">
                <span
                  className="mt-2 inline-block h-1.5 w-1.5 shrink-0 bg-brand-500"
                  aria-hidden="true"
                />
                <span>
                  数分経っても届かない場合、メールアドレスの誤入力もご確認ください。
                </span>
              </li>
              <li className="flex gap-2">
                <span
                  className="mt-2 inline-block h-1.5 w-1.5 shrink-0 bg-brand-500"
                  aria-hidden="true"
                />
                <span>
                  それでも届かない場合は、こちらまで直接ご連絡ください:{" "}
                  <a
                    href={`mailto:${site.email}`}
                    className="font-bold text-brand-600 underline underline-offset-4"
                  >
                    {site.email}
                  </a>
                </span>
              </li>
            </ul>
          </div>

          <p className="mt-8 text-sm md:text-base text-ink leading-relaxed font-medium">
            届いたメールに記載のリンクから
            <span className="marker font-bold">本登録フォーム</span>
            にお進みいただき、必要事項のご記入をお願いいたします。
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Button
              href={localePath("/contact/partner", locale)}
              variant="secondary"
            >
              個人登録ページに戻る
            </Button>
            <Button href={localePath("/", locale)}>トップへ戻る</Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
