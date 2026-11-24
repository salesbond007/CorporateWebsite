"use client";

import Image from "next/image";
import { useEffect, useState, type ReactNode } from "react";
import { Reveal } from "@/components/ui/Reveal";

/**
 * セキュプロ LP「サービス概要」の図。
 * 企業(御社) ⇄ セキュプロ ⇄ 情報セキュリティのプロ人材 の関係と、
 * 課題に合わせて「ひとり → 2名 → チーム」とプロをアサインする様子を、自動で切り替えて見せる。
 */

const pros = [
  { src: "/photos/ciso/advisor.webp", role: "責任者", sub: "体制づくり・方針" },
  { src: "/photos/ciso/pro-1.webp", role: "認証・SCS", sub: "取得準備・回答" },
  {
    src: "/photos/ciso/pro-2.webp",
    role: "診断・Web対策",
    sub: "脆弱性診断・実務",
  },
];

const formations = [
  { label: "ひとりで対応", note: "まずは責任者がひとりで", members: [0] },
  { label: "2名で対応", note: "認証の準備が始まったら", members: [0, 1] },
  { label: "チーム体制", note: "診断・実務まで広がったら", members: [0, 1, 2] },
];

function Face({
  src,
  className = "h-12 w-12",
}: {
  src: string;
  className?: string;
}) {
  return (
    <span
      className={`block shrink-0 overflow-hidden rounded-full bg-[#EEE7E9] ${className}`}
    >
      <Image
        src={src}
        alt=""
        width={128}
        height={128}
        className="h-full w-full object-cover"
      />
    </span>
  );
}

function Building() {
  return (
    <svg viewBox="0 0 120 70" className="h-16 w-auto" aria-hidden="true">
      <rect x="4" y="30" width="30" height="40" fill="#3A4A6B" />
      <rect x="40" y="8" width="38" height="62" fill="#24304A" />
      <rect x="84" y="22" width="32" height="48" fill="#3A4A6B" />
      {[0, 1, 2, 3, 4].map((r) =>
        [0, 1, 2].map((c) => (
          <rect
            key={`${r}${c}`}
            x={46 + c * 10}
            y={15 + r * 10}
            width="6"
            height="6"
            fill="#9AA6BF"
          />
        )),
      )}
      {[0, 1, 2].map((r) => (
        <g key={r}>
          <rect x="10" y={37 + r * 10} width="6" height="5" fill="#9AA6BF" />
          <rect x="22" y={37 + r * 10} width="6" height="5" fill="#9AA6BF" />
          <rect x="90" y={29 + r * 12} width="6" height="6" fill="#9AA6BF" />
          <rect x="102" y={29 + r * 12} width="6" height="6" fill="#9AA6BF" />
        </g>
      ))}
    </svg>
  );
}

function Logo({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 44" className={className} aria-hidden="true">
      <path
        d="M20 2l16 6v12c0 11-7 18.5-16 22C11 38.5 4 31 4 20V8z"
        fill="#fff"
      />
      <path
        d="M13 21.5l5 5 9.5-10"
        fill="none"
        stroke="#7A1F3D"
        strokeWidth="3.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** 横の矢印(点線が流れる) */
function HArrow({ label, dir }: { label: string; dir: "right" | "left" }) {
  return (
    <div className="flex flex-col items-center gap-1.5">
      <span className="text-[12px] font-black text-brand-500">{label}</span>
      <div className="relative flex h-3 w-full items-center">
        <span
          className={`h-[2px] w-full ${dir === "right" ? "ba-flow-x" : "ba-flow-x [transform:scaleX(-1)]"}`}
        />
        <svg
          viewBox="0 0 10 12"
          className={`absolute h-3 w-2.5 text-brand-500 ${dir === "right" ? "-right-0.5" : "-left-0.5 rotate-180"}`}
          aria-hidden="true"
        >
          <path
            d="M1 1l7 5-7 5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  );
}

/** 縦の矢印(スマホ) */
function VArrow({ label }: { label: string }) {
  return (
    <div className="flex items-center justify-center gap-2 py-2">
      <svg
        viewBox="0 0 12 34"
        className="h-8 w-3 text-brand-500"
        aria-hidden="true"
      >
        <path
          d="M6 1v28"
          stroke="currentColor"
          strokeWidth="2"
          strokeDasharray="3 3"
          className="rv-dash"
        />
        <path
          d="M1 26l5 7 5-7"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span className="text-[12px] font-black text-brand-500">{label}</span>
    </div>
  );
}

function Panel({
  title,
  children,
  tone,
}: {
  title: ReactNode;
  children: ReactNode;
  tone: "navy" | "wine";
}) {
  return (
    <div className="flex h-full flex-col border border-[#D9D3D6] bg-white">
      <p
        className={`px-4 py-2.5 text-center text-[15px] font-black text-white ${tone === "navy" ? "bg-[#24304A]" : "bg-[#3A2A30]"}`}
      >
        {title}
      </p>
      <div className="flex flex-1 flex-col p-4 md:p-5">{children}</div>
    </div>
  );
}

export function CisoAssignDiagram() {
  const [f, setF] = useState(0);
  const [hold, setHold] = useState(false);
  useEffect(() => {
    if (hold) return;
    const t = window.setInterval(
      () => setF((v) => (v + 1) % formations.length),
      2800,
    );
    return () => window.clearInterval(t);
  }, [hold]);
  const members = formations[f].members;

  /* 企業(御社)のパネル */
  const company = (
    <Panel title="企業（御社）" tone="navy">
      <div className="flex items-center justify-center gap-3">
        <Building />
        <p className="text-left text-[13px] font-bold leading-snug text-ink/70">
          専任者がいない
          <br />
          何から始めるか迷う
        </p>
      </div>
      <div className="mt-4 flex-1 border border-dashed border-brand-500/50 bg-[#FBF6F7] p-3">
        <p className="text-center text-[12px] font-black text-brand-500">
          御社の支援体制：{formations[f].label}
        </p>
        <ul className="mt-3 flex min-h-[4.5rem] items-center justify-center gap-2">
          {pros.map((p, i) => {
            const on = members.includes(i);
            return (
              <li
                key={p.src}
                className={`flex flex-col items-center transition-all duration-500 ease-[cubic-bezier(.34,1.56,.64,1)] ${
                  on
                    ? "w-[4.2rem] scale-100 opacity-100"
                    : "w-0 scale-50 opacity-0"
                }`}
              >
                <Face
                  src={p.src}
                  className="h-12 w-12 border-2 border-brand-500"
                />
                <span className="mt-1 whitespace-nowrap text-[10px] font-bold text-ink/70">
                  {p.role}
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </Panel>
  );

  /* プロ人材のパネル */
  const talent = (
    <Panel title="情報セキュリティのプロ人材" tone="wine">
      <ul className="space-y-2">
        {pros.map((p, i) => {
          const on = members.includes(i);
          return (
            <li
              key={p.src}
              className={`flex items-center gap-3 border px-3 py-2 transition-colors duration-500 ${
                on
                  ? "border-brand-500 bg-[#FBF1F4]"
                  : "border-[#E6DFE1] bg-white"
              }`}
            >
              <Face
                src={p.src}
                className={`h-11 w-11 transition-all duration-500 ${on ? "" : "opacity-60 grayscale"}`}
              />
              <span className="min-w-0 flex-1 text-left">
                <span className="block text-[14px] font-black text-ink">
                  {p.role}
                </span>
                <span className="block text-[11px] font-bold text-ink/55">
                  {p.sub}
                </span>
              </span>
              <span
                className={`shrink-0 px-2 py-0.5 text-[10px] font-black transition-all duration-500 ${
                  on ? "bg-brand-500 text-white" : "bg-[#F1ECEE] text-ink/40"
                }`}
              >
                {on ? "アサイン" : "待機"}
              </span>
            </li>
          );
        })}
      </ul>
    </Panel>
  );

  /* セキュプロ */
  const hub = (
    <div className="flex h-full flex-col items-center justify-center bg-brand-500 px-4 py-6 text-center text-white">
      <Logo className="h-10 w-10" />
      <p className="mt-2 text-xl font-black tracking-[0.12em]">セキュプロ</p>
      <p className="mt-3 border-t border-white/30 pt-3 text-[12px] font-bold leading-relaxed text-white/90">
        課題とフェーズに合う
        <br />
        プロを選んでアサイン
      </p>
      <p className="mt-3 bg-white px-3 py-1 text-[12px] font-black text-brand-500">
        窓口・契約はひとつ
      </p>
    </div>
  );

  return (
    <Reveal variant="up">
      <div
        role="group"
        aria-label="企業とセキュプロと情報セキュリティのプロ人材の関係。課題に合わせて、ひとりからチーム体制までプロをアサインする図"
        onMouseEnter={() => setHold(true)}
        onMouseLeave={() => setHold(false)}
      >
        {/* 編成の切り替え */}
        <div className="mx-auto flex max-w-xl items-stretch justify-center">
          {formations.map((x, i) => (
            <button
              key={x.label}
              type="button"
              onClick={() => setF(i)}
              className={`relative flex-1 border px-2 py-2.5 text-[13px] font-black transition-colors duration-500 md:text-[15px] ${
                i === f
                  ? "border-brand-500 bg-brand-500 text-white"
                  : "border-[#D9D3D6] bg-white text-ink/50"
              } ${i > 0 ? "-ml-px" : ""}`}
            >
              {x.label}
              {i < formations.length - 1 && (
                <span
                  aria-hidden="true"
                  className="absolute -right-2 top-1/2 z-10 hidden -translate-y-1/2 text-brand-500 sm:block"
                >
                  ›
                </span>
              )}
            </button>
          ))}
        </div>
        <p className="mt-2 text-center text-[13px] font-bold text-ink/60">
          例：{formations[f].note}
        </p>

        {/* PC */}
        <div className="mt-8 hidden grid-cols-[minmax(0,1fr)_7.5rem_13rem_7.5rem_minmax(0,1fr)] items-stretch md:grid lg:grid-cols-[minmax(0,1fr)_9rem_15rem_9rem_minmax(0,1fr)]">
          {company}
          <div className="flex flex-col justify-center gap-10 px-2">
            <HArrow label="課題を相談" dir="right" />
            <HArrow label="プロが支援" dir="left" />
          </div>
          {hub}
          <div className="flex flex-col justify-center gap-10 px-2">
            <HArrow label="要件を共有" dir="right" />
            <HArrow label="アサイン" dir="left" />
          </div>
          {talent}
        </div>

        {/* スマホ */}
        <div className="mt-6 md:hidden">
          {company}
          <VArrow label="課題を相談" />
          {hub}
          <VArrow label="合うプロを選んでアサイン" />
          {talent}
        </div>
      </div>
    </Reveal>
  );
}
