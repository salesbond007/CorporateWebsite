/**
 * 「診断」「保守」「移行」の各メニューを表すイラスト(オリジナルの線画)。
 * 「このようなお悩みはありませんか？」のイラストと同じタッチ(机の線+小物)。
 */
const INK = "#2B2B2B";
const BRAND = "#7A1E35";
const SOFT = "#F3CDD6";
const BG = "#FBEAEE";

function Desk() {
  return (
    <line
      x1="20"
      y1="112"
      x2="180"
      y2="112"
      stroke={INK}
      strokeWidth="2"
      strokeLinecap="round"
    />
  );
}

function Monitor({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect
        width="70"
        height="48"
        rx="4"
        fill="#fff"
        stroke={INK}
        strokeWidth="2"
      />
      <line x1="0" y1="11" x2="70" y2="11" stroke={INK} strokeWidth="2" />
      <circle cx="7" cy="5.5" r="2" fill={BRAND} />
      <circle cx="13" cy="5.5" r="2" fill={SOFT} />
      <rect x="8" y="18" width="40" height="10" rx="2" fill={BG} />
      <rect x="8" y="33" width="28" height="4" rx="2" fill="#E6E6E6" />
      <path
        d="M29 48v10M21 58h16"
        stroke={INK}
        strokeWidth="2"
        strokeLinecap="round"
      />
    </g>
  );
}

function Diagnose() {
  // 画面を虫眼鏡で調べ、結果のチェック
  return (
    <>
      <Desk />
      <Monitor x={40} y={46} />
      <g transform="translate(118 50)">
        <circle
          cx="0"
          cy="0"
          r="20"
          fill="#fff"
          fillOpacity="0.9"
          stroke={BRAND}
          strokeWidth="3"
        />
        <path
          d="M-8 0l6 6 11-12"
          stroke={BRAND}
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <line
          x1="14"
          y1="14"
          x2="30"
          y2="30"
          stroke={BRAND}
          strokeWidth="6"
          strokeLinecap="round"
        />
      </g>
    </>
  );
}

function Maintain() {
  // 画面の横で歯車と更新、盾で守る
  return (
    <>
      <Desk />
      <Monitor x={34} y={46} />
      <g transform="translate(130 40)">
        <path
          d="M22 0l20 7v15c0 14-9 23-20 27C11 45 2 36 2 22V7z"
          fill={BG}
          stroke={BRAND}
          strokeWidth="2.4"
          strokeLinejoin="round"
        />
        <path
          d="M13.5 26a9 9 0 0 1 15-6.5"
          stroke={BRAND}
          strokeWidth="2.4"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M29.5 14.5v5.5h-5.5"
          stroke={BRAND}
          strokeWidth="2.4"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M30.5 27a9 9 0 0 1-15 6.5"
          stroke={BRAND}
          strokeWidth="2.4"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M14.5 38.5V33H20"
          stroke={BRAND}
          strokeWidth="2.4"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      {/* 歯車 */}
      <g transform="translate(120 96)">
        <circle cx="0" cy="0" r="8" fill="#fff" stroke={INK} strokeWidth="2" />
        <circle
          cx="0"
          cy="0"
          r="3"
          fill={SOFT}
          stroke={INK}
          strokeWidth="1.5"
        />
        {[0, 60, 120, 180, 240, 300].map((d) => (
          <rect
            key={d}
            x="-2"
            y="-12"
            width="4"
            height="5"
            rx="1"
            fill={INK}
            transform={`rotate(${d})`}
          />
        ))}
      </g>
    </>
  );
}

function Migrate() {
  // サーバー(データベース) → 静的HTMLのページ
  return (
    <>
      <Desk />
      <g transform="translate(36 52)">
        <ellipse
          cx="22"
          cy="8"
          rx="22"
          ry="8"
          fill="#fff"
          stroke={INK}
          strokeWidth="2"
        />
        <path
          d="M0 8v44c0 4.4 9.8 8 22 8s22-3.6 22-8V8"
          fill="#fff"
          stroke={INK}
          strokeWidth="2"
        />
        <path
          d="M0 30c0 4.4 9.8 8 22 8s22-3.6 22-8"
          fill="none"
          stroke={INK}
          strokeWidth="2"
        />
        <circle cx="34" cy="22" r="2" fill={BRAND} />
        <circle cx="34" cy="45" r="2" fill={BRAND} />
      </g>
      <path
        d="M90 82h22m0 0l-7-7m7 7l-7 7"
        stroke={BRAND}
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <g transform="translate(122 42)">
        <path
          d="M0 0h32l12 12v56a3 3 0 0 1-3 3H3a3 3 0 0 1-3-3V3a3 3 0 0 1 3-3z"
          fill={BG}
          stroke={BRAND}
          strokeWidth="2.4"
          strokeLinejoin="round"
        />
        <path
          d="M32 0v12h12"
          stroke={BRAND}
          strokeWidth="2.4"
          fill="none"
          strokeLinejoin="round"
        />
        <path
          d="M14 34l-6 6 6 6M30 34l6 6-6 6"
          stroke={BRAND}
          strokeWidth="2.6"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <text
          x="22"
          y="62"
          textAnchor="middle"
          fontSize="9"
          fontWeight="900"
          fill={BRAND}
        >
          HTML
        </text>
      </g>
    </>
  );
}

const ILLUSTRATIONS: Record<string, () => JSX.Element> = {
  診断: Diagnose,
  保守: Maintain,
  移行: Migrate,
};

export function MenuIcon({ name }: { name: string }) {
  const Illust = ILLUSTRATIONS[name];
  if (!Illust) return null;
  return (
    <svg
      viewBox="0 0 200 124"
      className="h-full w-full"
      fill="none"
      aria-hidden="true"
    >
      <Illust />
    </svg>
  );
}
