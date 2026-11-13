import Image from "next/image";
import type { ReactNode } from "react";

/**
 * Bond AI LP: 月額で CISO / セキュリティ顧問に任せると、セキュリティがどう強くなるかを示す図。
 * 導入前(課題) → 月額で任せる(Bond AI) → 導入後(強化された状態) の3列。各列の上に写真。
 * 写真: Unsplash(商用利用可・クレジット不要)と自社素材。人物はイメージ。
 */

const C = {
  wine: "#7A1F3D",
  wineDark: "#5A142C",
  text: "#1F1A1C",
  sub: "#5C5458",
  line: "#E9E1DD",
  gray: "#F1EFEC",
};

const before = ["セキュリティの専任者がいない", "AIの使い方にルールがない", "取引先・審査に説明できない"];
const after = ["責任者が決まり、体制が整う", "AIを安全に使えるルールが浸透", "取引先・審査に説明できる"];

function Arrow() {
  return (
    <div aria-hidden="true" className="flex items-center justify-center py-1 md:py-0">
      <svg viewBox="0 0 24 24" className="h-8 w-8 rotate-90 md:rotate-0" fill="none">
        <path d="M5 12h12M12 6l6 6-6 6" stroke={C.wine} strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

function Photo({ src, alt, label, tone }: { src: string; alt: string; label: string; tone: "gray" | "wine" }) {
  return (
    <div className="relative aspect-[16/10] overflow-hidden">
      <Image src={src} alt={alt} fill sizes="(max-width:768px) 100vw, 33vw" className="object-cover" />
      <span
        className="absolute left-0 top-0 px-3 py-1.5 text-xs font-bold text-white"
        style={{ backgroundColor: tone === "wine" ? C.wine : "#3B3537" }}
      >
        {label}
      </span>
    </div>
  );
}

function Card({ children, border }: { children: ReactNode; border: string }) {
  return (
    <div className="flex flex-col overflow-hidden rounded-[12px] border bg-white" style={{ borderColor: border, borderWidth: border === C.wine ? 2 : 1 }}>
      {children}
    </div>
  );
}

export function CisoBeforeAfter() {
  return (
    <div
      className="grid items-stretch gap-2 md:grid-cols-[1fr_2.5rem_1fr_2.5rem_1fr] md:gap-0"
      role="group"
      aria-label="月額でCISO・セキュリティ顧問に任せることで、セキュリティが強化される流れ"
    >
      {/* 導入前 */}
      <Card border={C.line}>
        <Photo src="/photos/ciso/before.webp" alt="付箋に埋もれて対応に追われる担当者(イメージ)" label="いまの御社" tone="gray" />
        <div className="flex-1 p-5 md:p-6" style={{ backgroundColor: C.gray }}>
          <p className="text-lg font-bold" style={{ color: C.text }}>
            守りが手薄な状態
          </p>
          <ul className="mt-3 space-y-2">
            {before.map((t) => (
              <li key={t} className="flex gap-2 text-sm leading-relaxed" style={{ color: "#3B3537" }}>
                <span aria-hidden="true" className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full" style={{ backgroundColor: C.sub }} />
                {t}
              </li>
            ))}
          </ul>
        </div>
      </Card>

      <Arrow />

      {/* 月額で任せる */}
      <Card border={C.wine}>
        <Photo src="/services/cards/talent.jpg" alt="セキュリティの専門家が経営者と打ち合わせをしている様子(イメージ)" label="月額で任せる" tone="wine" />
        <div className="flex-1 p-5 text-white md:p-6" style={{ backgroundColor: C.wine }}>
          <p className="text-lg font-bold leading-snug">CISO／セキュリティ顧問</p>
          <p className="mt-3 text-sm leading-relaxed text-white/90">資格を持つ専門家が、御社のセキュリティの担当につきます。</p>
        </div>
      </Card>

      <Arrow />

      {/* 導入後 */}
      <Card border={C.wine}>
        <Photo src="/photos/ciso/after.webp" alt="体制が整い、安心して仕事を進めるチーム(イメージ)" label="導入後の御社" tone="wine" />
        <div className="flex-1 p-5 md:p-6">
          <p className="text-lg font-bold" style={{ color: C.wineDark }}>
            セキュリティを強化
          </p>
          <ul className="mt-3 space-y-2">
            {after.map((t) => (
              <li key={t} className="flex gap-2 text-sm font-bold leading-relaxed" style={{ color: C.wineDark }}>
                <svg viewBox="0 0 16 16" aria-hidden="true" className="mt-[4px] h-3.5 w-3.5 shrink-0">
                  <path d="M2 8.5l4 4 8-9" fill="none" stroke={C.wine} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {t}
              </li>
            ))}
          </ul>
        </div>
      </Card>
    </div>
  );
}
