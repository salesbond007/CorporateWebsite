"use client";

import { SecuproMark } from "./SecuproMark";
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
      <div className="overflow-hidden border border-[#E8D9DE] bg-white shadow-[0_30px_60px_-30px_rgba(122,31,61,0.4)]">
        {/* 窓の上部 */}
        <div className="flex items-center gap-2 border-b border-[#EEE2E6] bg-[#FBF5F7] px-4 py-2.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[#E4D3D8]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#E4D3D8]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#E4D3D8]" />
          <span className="ml-3 flex items-center gap-1.5 text-[11px] font-black text-ink/60">
            <SecuproMark className="h-5 w-5" />
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
          <div className="mt-3 border border-[#EEE2E6]">
            <div className="hidden grid-cols-[8.5rem_1fr_6rem_3.6rem] gap-3 border-b border-[#EEE2E6] bg-[#FBF5F7] px-3 py-2 text-[10.5px] font-bold text-ink/50 sm:grid">
              <span>担当</span>
              <span>対応内容</span>
              <span>進み具合</span>
              <span>状態</span>
            </div>
            <ul>
              {rows.map((r, i) => (
                <li
                  key={r.role}
                  className={`grid grid-cols-[auto_1fr_auto] items-center gap-x-3 gap-y-1.5 px-3 py-3 sm:grid-cols-[8.5rem_1fr_6rem_3.6rem] ${i > 0 ? "border-t border-[#F3EAED]" : ""}`}
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
                  <span className="col-span-3 col-start-1 h-1.5 bg-[#F3EAED] sm:col-span-1 sm:col-start-auto">
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
                        ? "bg-[#F3EAED] text-ink/55"
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
            <div className="border border-[#EEE2E6] px-3 py-2.5">
              <p className="text-[10.5px] font-bold text-ink/50">次回の定例</p>
              <p className="mt-0.5 text-[12.5px] font-black text-ink">
                優先順位の見直しと報告
              </p>
            </div>
            <div className="border border-[#EEE2E6] px-3 py-2.5">
              <p className="text-[10.5px] font-bold text-ink/50">
                次のフェーズ
              </p>
              <p className="mt-0.5 text-[12.5px] font-black text-ink">
                社員研修の準備
              </p>
            </div>
          </div>
        </div>
      </div>

      <p className="mt-2 text-right text-[10px] text-ink/45">
        ※画面はイメージです　※画像はイメージです
      </p>
    </div>
  );
}
