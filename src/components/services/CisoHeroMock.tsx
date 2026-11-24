"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

/**
 * セキュプロ LP ファーストビュー右側の画面イメージ。
 * 「御社の支援体制」の画面に、担当するプロと対応内容・進み具合が並ぶ。
 * 表示後に進み具合のバーが伸びる。※イメージ(実在の画面ではない)。
 */

const rows = [
  {
    src: "/photos/ciso/advisor.webp",
    role: "責任者",
    task: "方針と優先順位の決定",
    w: 100,
    state: "完了",
  },
  {
    src: "/photos/ciso/pro-1.webp",
    role: "認証・SCS",
    task: "チェックシートの回答準備",
    w: 72,
    state: "対応中",
  },
  {
    src: "/photos/ciso/pro-2.webp",
    role: "診断・Web対策",
    task: "ホームページの脆弱性診断",
    w: 40,
    state: "対応中",
  },
];

export function CisoHeroMock() {
  const [on, setOn] = useState(false);
  useEffect(() => {
    const t = window.setTimeout(() => setOn(true), 300);
    return () => window.clearTimeout(t);
  }, []);

  return (
    <div
      className="relative mx-auto w-full max-w-[640px]"
      role="img"
      aria-label="御社の支援体制の画面イメージ。責任者、認証・SCS、診断・Web対策のプロが、それぞれの対応内容と進み具合とともに並んでいる"
    >
      <div className="overflow-hidden border border-[#D8DCE4] bg-white shadow-[0_30px_60px_-30px_rgba(36,48,74,0.45)]">
        {/* 窓の上部 */}
        <div className="flex items-center gap-2 border-b border-[#E6E8EE] bg-[#F7F8FA] px-4 py-2.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[#D5D8DF]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#D5D8DF]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#D5D8DF]" />
          <span className="ml-3 flex items-center gap-1.5 text-[11px] font-black text-ink/60">
            <svg viewBox="0 0 40 44" className="h-3.5 w-3.5" aria-hidden="true">
              <path
                d="M20 2l16 6v12c0 11-7 18.5-16 22C11 38.5 4 31 4 20V8z"
                fill="#7A1F3D"
              />
            </svg>
            セキュプロ｜支援状況
          </span>
        </div>

        <div className="p-4 sm:p-5">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <p className="text-[15px] font-black text-ink sm:text-base">
              御社の支援体制
            </p>
            <span className="bg-brand-500 px-2.5 py-1 text-[11px] font-black text-white">
              チーム体制（3名）
            </span>
          </div>

          {/* 表 */}
          <div className="mt-3 border border-[#E6E8EE]">
            <div className="hidden grid-cols-[8.5rem_1fr_6rem_3.6rem] gap-3 border-b border-[#E6E8EE] bg-[#F7F8FA] px-3 py-2 text-[10.5px] font-bold text-ink/50 sm:grid">
              <span>担当</span>
              <span>対応内容</span>
              <span>進み具合</span>
              <span>状態</span>
            </div>
            <ul>
              {rows.map((r, i) => (
                <li
                  key={r.role}
                  className={`grid grid-cols-[auto_1fr_auto] items-center gap-x-3 gap-y-1.5 px-3 py-3 sm:grid-cols-[8.5rem_1fr_6rem_3.6rem] ${i > 0 ? "border-t border-[#EEF0F4]" : ""}`}
                >
                  <span className="flex items-center gap-2">
                    <span className="block h-9 w-9 shrink-0 overflow-hidden rounded-full bg-[#EEE]">
                      <Image
                        src={r.src}
                        alt=""
                        width={72}
                        height={72}
                        className="h-full w-full object-cover"
                      />
                    </span>
                    <span className="hidden text-[12px] font-black text-ink sm:block">
                      {r.role}
                    </span>
                  </span>
                  <span className="min-w-0">
                    <span className="block text-[11px] font-black text-ink sm:hidden">
                      {r.role}
                    </span>
                    <span className="block text-[12px] font-bold text-ink/75 sm:text-[12.5px]">
                      {r.task}
                    </span>
                  </span>
                  <span className="col-span-3 col-start-1 h-1.5 bg-[#EEF0F4] sm:col-span-1 sm:col-start-auto">
                    <span
                      className="block h-full bg-brand-500 transition-[width] duration-[1200ms] ease-out"
                      style={{
                        width: on ? `${r.w}%` : "0%",
                        transitionDelay: `${i * 250}ms`,
                      }}
                    />
                  </span>
                  <span
                    className={`row-start-1 col-start-3 justify-self-end px-1.5 py-0.5 text-[10px] font-black sm:row-start-auto sm:col-start-auto sm:justify-self-start ${
                      r.state === "完了"
                        ? "bg-[#EEF0F4] text-ink/55"
                        : "bg-[#FBEAF0] text-brand-500"
                    }`}
                  >
                    {r.state}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* 下段 */}
          <div className="mt-3 hidden gap-3 sm:grid sm:grid-cols-2">
            <div className="border border-[#E6E8EE] px-3 py-2.5">
              <p className="text-[10.5px] font-bold text-ink/50">次回の定例</p>
              <p className="mt-0.5 text-[12.5px] font-black text-ink">
                優先順位の見直しと報告
              </p>
            </div>
            <div className="flex items-center gap-2.5 border border-[#E6E8EE] px-3 py-2.5">
              <span className="block h-9 w-9 shrink-0 overflow-hidden rounded-full bg-[#EEE]">
                <Image
                  src="/photos/ciso/okazaki.webp"
                  alt=""
                  width={72}
                  height={72}
                  className="h-full w-full object-cover object-top"
                />
              </span>
              <p className="text-[12px] font-black leading-snug text-ink">
                監修者が
                <br />
                支援の品質を確認
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 浮いているカード: 窓口はひとつ */}
      <div className="absolute -bottom-5 -left-3 hidden items-center gap-2 bg-[#24304A] px-4 py-3 text-white shadow-[0_16px_30px_-16px_rgba(36,48,74,0.8)] sm:flex lg:-left-8">
        <svg
          viewBox="0 0 24 24"
          className="h-5 w-5"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          aria-hidden="true"
        >
          <path d="M4 5h16v11H8l-4 4z" strokeLinejoin="round" />
        </svg>
        <span className="text-[13px] font-black">窓口・契約はひとつ</span>
      </div>
      <p className="mt-2 text-right text-[10px] text-ink/45">
        ※画面はイメージです
      </p>
    </div>
  );
}
