/** 「診断」「保守」「移行」の各メニューを表すアイコン(オリジナルの線画) */
const INK = "#2B2B2B";
const BRAND = "#7A1E35";
const SOFT = "#FBEAEE";

function Diagnose() {
  // ブラウザ画面を虫眼鏡で調べる
  return (
    <>
      <rect
        x="8"
        y="14"
        width="44"
        height="34"
        rx="4"
        fill="#fff"
        stroke={INK}
        strokeWidth="2.2"
      />
      <line x1="8" y1="22" x2="52" y2="22" stroke={INK} strokeWidth="2.2" />
      <circle cx="13" cy="18" r="1.4" fill={BRAND} />
      <circle cx="18" cy="18" r="1.4" fill={BRAND} />
      <rect x="14" y="28" width="22" height="4" rx="1.5" fill={SOFT} />
      <rect x="14" y="36" width="16" height="4" rx="1.5" fill={SOFT} />
      <circle
        cx="46"
        cy="44"
        r="11"
        fill="#fff"
        stroke={BRAND}
        strokeWidth="3"
      />
      <path
        d="M41.5 44l3 3 6-6"
        stroke={BRAND}
        strokeWidth="2.6"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <line
        x1="54"
        y1="52"
        x2="61"
        y2="59"
        stroke={BRAND}
        strokeWidth="4"
        strokeLinecap="round"
      />
    </>
  );
}

function Maintain() {
  // 盾と更新(循環)の矢印
  return (
    <>
      <path
        d="M32 8l18 6.5v14c0 13-8.5 21.5-18 25.5-9.5-4-18-12.5-18-25.5v-14z"
        fill={SOFT}
        stroke={BRAND}
        strokeWidth="2.6"
        strokeLinejoin="round"
      />
      <path
        d="M24.5 31.5a8 8 0 0 1 13.6-5.6"
        stroke={BRAND}
        strokeWidth="2.6"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M38.6 21.6v4.8h-4.8"
        stroke={BRAND}
        strokeWidth="2.6"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M39.5 32.5a8 8 0 0 1-13.6 5.6"
        stroke={BRAND}
        strokeWidth="2.6"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M25.4 42.4v-4.8h4.8"
        stroke={BRAND}
        strokeWidth="2.6"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10 56h44"
        stroke={INK}
        strokeWidth="2.2"
        strokeLinecap="round"
      />
    </>
  );
}

function Migrate() {
  // サーバー(データベース) → 軽い静的HTMLのページへ
  return (
    <>
      <ellipse
        cx="17"
        cy="16"
        rx="11"
        ry="4.5"
        fill="#fff"
        stroke={INK}
        strokeWidth="2.2"
      />
      <path
        d="M6 16v24c0 2.5 5 4.5 11 4.5s11-2 11-4.5V16"
        fill="#fff"
        stroke={INK}
        strokeWidth="2.2"
      />
      <path
        d="M6 28c0 2.5 5 4.5 11 4.5s11-2 11-4.5"
        fill="none"
        stroke={INK}
        strokeWidth="2.2"
      />
      <path
        d="M30 30h8m0 0l-4-4m4 4l-4 4"
        stroke={BRAND}
        strokeWidth="2.8"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M42 12h12l6 6v30a2 2 0 0 1-2 2H42a2 2 0 0 1-2-2V14a2 2 0 0 1 2-2z"
        fill={SOFT}
        stroke={BRAND}
        strokeWidth="2.6"
        strokeLinejoin="round"
      />
      <path
        d="M54 12v6h6"
        stroke={BRAND}
        strokeWidth="2.6"
        fill="none"
        strokeLinejoin="round"
      />
      <path
        d="M46.5 29l-3 3 3 3M53.5 29l3 3-3 3"
        stroke={BRAND}
        strokeWidth="2.4"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </>
  );
}

const ICONS: Record<string, () => JSX.Element> = {
  診断: Diagnose,
  保守: Maintain,
  移行: Migrate,
};

export function MenuIcon({ name }: { name: string }) {
  const Icon = ICONS[name];
  if (!Icon) return null;
  return (
    <svg
      viewBox="0 0 64 64"
      width="68"
      height="68"
      fill="none"
      aria-hidden="true"
    >
      <Icon />
    </svg>
  );
}
