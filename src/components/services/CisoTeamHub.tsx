"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

/**
 * 「セキュプロとは」の中央: セキュプロが、情報セキュリティのプロを
 * 課題に合わせて「ひとり」「2名」「チーム」と編成する様子を、人の写真で示す。
 * 編成は自動で切り替わる。
 */

const pros = [
  { src: "/photos/ciso/advisor.webp" },
  { src: "/photos/ciso/pro-1.webp" },
  { src: "/photos/ciso/pro-2.webp" },
];

/** 編成ごとに、担当するプロの番号 */
const formations = [
  { label: "ひとりで対応", members: [0] },
  { label: "2名で対応", members: [0, 2] },
  { label: "チームで対応", members: [0, 1, 2] },
];

export function CisoTeamHub({ compact }: { compact?: boolean }) {
  const [f, setF] = useState(0);
  useEffect(() => {
    const t = window.setInterval(
      () => setF((v) => (v + 1) % formations.length),
      2200,
    );
    return () => window.clearInterval(t);
  }, []);
  const members = formations[f].members;

  return (
    <div
      className={`flex h-full flex-col border border-brand-500 bg-white text-center ${compact ? "" : "shadow-[0_24px_48px_-28px_rgba(122,31,61,0.7)]"}`}
    >
      {/* セキュプロ */}
      <div className="flex items-center justify-center gap-2 bg-brand-500 px-4 py-3 text-white">
        <svg viewBox="0 0 40 44" className="h-5 w-5" aria-hidden="true">
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
        <span className="text-base font-black tracking-[0.12em]">
          セキュプロ
        </span>
      </div>

      <div
        className={`flex flex-1 flex-col justify-center ${compact ? "px-4 py-5" : "px-4 py-6"}`}
      >
        <p className="text-[15px] font-black leading-snug text-ink">
          情報セキュリティの
          <span className="text-brand-500">プロ</span>
        </p>

        {/* 写真: 担当するプロが前に出て色がつく */}
        <ul
          className="mt-4 flex items-end justify-center gap-2"
          aria-label="情報セキュリティのプロ"
        >
          {pros.map((p, i) => {
            const on = members.includes(i);
            return (
              <li
                key={p.src}
                className={`relative transition-all duration-500 ${on ? "-translate-y-1" : "translate-y-1"}`}
              >
                <span
                  className={`block overflow-hidden rounded-full border-[3px] transition-all duration-500 ${
                    on
                      ? "border-brand-500 opacity-100 grayscale-0"
                      : "border-[#E6DFE1] opacity-45 grayscale"
                  } ${compact ? "h-14 w-14" : "h-[3.6rem] w-[3.6rem] lg:h-16 lg:w-16"}`}
                >
                  <Image
                    src={p.src}
                    alt=""
                    width={128}
                    height={128}
                    className="h-full w-full object-cover"
                  />
                </span>
                <span
                  aria-hidden="true"
                  className={`absolute -bottom-1 left-1/2 grid h-5 w-5 -translate-x-1/2 place-items-center rounded-full bg-brand-500 text-white transition-all duration-500 ${on ? "scale-100" : "scale-0"}`}
                >
                  <svg viewBox="0 0 16 16" className="h-3 w-3" fill="none">
                    <path
                      d="M3 8.5l3 3 7-7"
                      stroke="currentColor"
                      strokeWidth="2.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </li>
            );
          })}
        </ul>

        {/* 編成の切り替え */}
        <ul className="mt-5 grid grid-cols-3 whitespace-nowrap border border-[#E6DFE1] text-[10px] font-bold lg:text-[11px]">
          {formations.map((x, i) => (
            <li
              key={x.label}
              className={`px-1 py-1.5 leading-tight transition-colors duration-500 ${
                i === f ? "bg-brand-500 text-white" : "text-ink/45"
              } ${i > 0 ? "border-l border-[#E6DFE1]" : ""}`}
            >
              {x.label}
            </li>
          ))}
        </ul>

        <p className="mt-4 text-xs font-bold leading-relaxed text-ink/70">
          課題やフェーズに合わせて、
          <br />
          プロを編成します
        </p>
      </div>
    </div>
  );
}
