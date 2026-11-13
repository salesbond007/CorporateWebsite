/**
 * Bond AI LP: 月額で CISO / セキュリティ顧問に任せると、セキュリティがどう強くなるかを示す図。
 * 導入前(課題) → 月額で任せる(Bond AI) → 導入後(強化された状態) の3列。
 * 画像は使わず HTML/CSS + 線のアイコンで構成。グラデーション・影なし。
 */

const C = {
  wine: "#7A1F3D",
  wineDark: "#5A142C",
  winePale: "#F5E9ED",
  text: "#1F1A1C",
  sub: "#5C5458",
  line: "#E9E1DD",
  gray: "#F1EFEC",
};

const before = [
  "セキュリティの専任者がいない",
  "AIの使い方にルールがない",
  "取引先・審査に説明できない",
];
const after = [
  "責任者が決まり、体制が整う",
  "AIを安全に使えるルールが浸透",
  "取引先・審査に説明できる",
];

function Shield({ strong }: { strong?: boolean }) {
  return (
    <svg viewBox="0 0 48 56" aria-hidden="true" className="h-14 w-12">
      <path
        d="M24 3l19 7v15c0 13-8 23-19 28C13 48 5 38 5 25V10z"
        fill={strong ? C.wine : "none"}
        stroke={strong ? C.wine : C.sub}
        strokeWidth="2.5"
        strokeLinejoin="round"
        strokeDasharray={strong ? undefined : "4 4"}
      />
      {strong ? (
        <path
          d="M15 28l7 7 12-14"
          fill="none"
          stroke="#fff"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      ) : (
        <path
          d="M24 18v14M24 39v1"
          stroke={C.sub}
          strokeWidth="3.5"
          strokeLinecap="round"
        />
      )}
    </svg>
  );
}

function Person() {
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true" className="h-12 w-12">
      <circle
        cx="24"
        cy="24"
        r="22"
        fill="none"
        stroke="#fff"
        strokeWidth="2"
      />
      <circle
        cx="24"
        cy="19"
        r="7"
        fill="none"
        stroke="#fff"
        strokeWidth="2.5"
      />
      <path
        d="M11 38c2.5-6.5 7.5-10 13-10s10.5 3.5 13 10"
        fill="none"
        stroke="#fff"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function Arrow() {
  return (
    <div
      aria-hidden="true"
      className="flex items-center justify-center py-1 md:py-0"
    >
      <svg
        viewBox="0 0 24 24"
        className="h-8 w-8 rotate-90 md:rotate-0"
        fill="none"
      >
        <path
          d="M5 12h12M12 6l6 6-6 6"
          stroke={C.wine}
          strokeWidth="2.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

export function CisoBeforeAfter() {
  return (
    <div
      className="grid items-stretch gap-2 md:grid-cols-[1fr_2.5rem_1.15fr_2.5rem_1fr] md:gap-0"
      role="group"
      aria-label="月額でCISO・セキュリティ顧問に任せることで、セキュリティが強化される流れ"
    >
      {/* 導入前 */}
      <div
        className="rounded-[12px] border p-6"
        style={{ backgroundColor: C.gray, borderColor: C.line }}
      >
        <div className="flex items-center gap-3">
          <Shield />
          <div>
            <p
              className="text-xs font-bold tracking-[0.12em]"
              style={{ color: C.sub }}
            >
              いまの御社
            </p>
            <p className="text-lg font-bold" style={{ color: C.text }}>
              守りが手薄な状態
            </p>
          </div>
        </div>
        <ul className="mt-5 space-y-2.5">
          {before.map((t) => (
            <li
              key={t}
              className="flex gap-2 text-sm leading-relaxed"
              style={{ color: "#3B3537" }}
            >
              <span
                aria-hidden="true"
                className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full"
                style={{ backgroundColor: C.sub }}
              />
              {t}
            </li>
          ))}
        </ul>
      </div>

      <Arrow />

      {/* 月額で任せる */}
      <div
        className="flex flex-col items-center justify-center rounded-[12px] px-6 py-7 text-center text-white"
        style={{ backgroundColor: C.wine }}
      >
        <Person />
        <p className="mt-3 text-xs font-bold tracking-[0.15em] text-white/85">
          月額で任せる
        </p>
        <p className="mt-1 text-xl font-bold leading-snug">
          CISO／
          <br className="hidden lg:block" />
          セキュリティ顧問
        </p>
        <p className="mt-3 text-sm leading-relaxed text-white/90">
          資格を持つ専門家が
          <br />
          御社の担当につく
        </p>
      </div>

      <Arrow />

      {/* 導入後 */}
      <div
        className="rounded-[12px] border-2 bg-white p-6"
        style={{ borderColor: C.wine }}
      >
        <div className="flex items-center gap-3">
          <Shield strong />
          <div>
            <p
              className="text-xs font-bold tracking-[0.12em]"
              style={{ color: C.wine }}
            >
              導入後の御社
            </p>
            <p className="text-lg font-bold" style={{ color: C.wineDark }}>
              セキュリティを強化
            </p>
          </div>
        </div>
        <ul className="mt-5 space-y-2.5">
          {after.map((t) => (
            <li
              key={t}
              className="flex gap-2 text-sm font-bold leading-relaxed"
              style={{ color: C.wineDark }}
            >
              <svg
                viewBox="0 0 16 16"
                aria-hidden="true"
                className="mt-[4px] h-3.5 w-3.5 shrink-0"
              >
                <path
                  d="M2 8.5l4 4 8-9"
                  fill="none"
                  stroke={C.wine}
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              {t}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
