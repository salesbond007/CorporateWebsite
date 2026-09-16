"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

type Faq = {
  q: string;
  a: string;
};

const faqs: Faq[] = [
  {
    q: "契約形態は？",
    a: "準委任契約です(成果物のある診断は請負となります)。",
  },
  {
    q: "派遣や人材紹介ですか？",
    a: "いずれも異なります。",
  },
  {
    q: "二次受けはありますか？",
    a: "ありません。弊社から直接技術者に依頼します。",
  },
  {
    q: "偽装請負にならないか？",
    a: "業務範囲と成果物を事前に定め、指示は弊社を通す運用です。",
  },
  {
    // 費用の提示方法は未決定のため、要相談として案内(決定次第このテキストを差し替え)
    q: "費用は？",
    a: "要相談です。貴社の課題・期間に応じてお見積りします。",
  },
  {
    q: "直接契約したくなったら？",
    a: "事前協議のうえ、移行手数料で対応します。",
  },
  {
    q: "秘密保持は？",
    a: "NDAを締結します。技術者とも個別に締結しています。",
  },
  {
    q: "賠償責任は？",
    a: "賠償責任保険に加入しています。",
  },
];

function FaqItem({ faq }: { faq: Faq }) {
  const [open, setOpen] = useState(false);

  return (
    <li className="border-b border-[#1B2A4A]/15">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full items-start justify-between gap-4 py-5 text-left"
      >
        <span className="flex gap-3 text-sm font-bold text-ink md:text-base">
          <span aria-hidden="true" className="text-[#1B2A4A]">
            Q.
          </span>
          {faq.q}
        </span>
        <span
          aria-hidden="true"
          className={cn(
            "mt-0.5 shrink-0 text-ink-muted transition-transform",
            open && "rotate-180",
          )}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path
              d="M3.5 5.25L7 8.75l3.5-3.5"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </button>
      {open ? (
        <p className="flex gap-3 pb-5 text-sm leading-relaxed text-ink-soft">
          <span aria-hidden="true" className="font-bold text-ink-muted">
            A.
          </span>
          <span>{faq.a}</span>
        </p>
      ) : null}
    </li>
  );
}

export function FaqAccordion() {
  return (
    <ul className="border-t border-[#1B2A4A]/15">
      {faqs.map((faq) => (
        <FaqItem key={faq.q} faq={faq} />
      ))}
    </ul>
  );
}
