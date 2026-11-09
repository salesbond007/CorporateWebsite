/**
 * 「このようなお悩みはありませんか？」用の線画イラスト(オリジナル)。
 * 線=インク、アクセント=ブランドカラー、塗り=淡いピンク。
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

function Person({ x, worried }: { x: number; worried?: boolean }) {
  return (
    <g>
      {/* 体 */}
      <path
        d={`M${x - 22} 112 q2 -30 22 -32 q20 2 22 32`}
        fill={SOFT}
        stroke={INK}
        strokeWidth="2"
        strokeLinejoin="round"
      />
      {/* 頭 */}
      <circle cx={x} cy={64} r={14} fill="#fff" stroke={INK} strokeWidth="2" />
      <path
        d={`M${x - 14} 62 q2 -16 14 -16 q12 0 14 16 q-8 -6 -14 -6 q-6 0 -14 6z`}
        fill={INK}
      />
      {worried ? (
        <>
          <path
            d={`M${x - 6} 70 q6 -4 12 0`}
            stroke={INK}
            strokeWidth="1.6"
            fill="none"
            strokeLinecap="round"
          />
          <path
            d={`M${x + 16} 52 q4 4 2 10`}
            stroke="#6AA9D8"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
          />
        </>
      ) : (
        <path
          d={`M${x - 5} 71 h10`}
          stroke={INK}
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      )}
    </g>
  );
}

function Calendar() {
  return (
    <svg viewBox="0 0 200 124" className="h-full w-full" aria-hidden="true">
      <Desk />
      <Person x={62} worried />
      <g transform="translate(108 34)">
        <rect
          x="0"
          y="0"
          width="62"
          height="56"
          rx="6"
          fill="#fff"
          stroke={INK}
          strokeWidth="2"
        />
        <rect x="0" y="0" width="62" height="16" rx="6" fill={BRAND} />
        <rect x="0" y="10" width="62" height="6" fill={BRAND} />
        <line
          x1="16"
          y1="-6"
          x2="16"
          y2="6"
          stroke={INK}
          strokeWidth="2"
          strokeLinecap="round"
        />
        <line
          x1="46"
          y1="-6"
          x2="46"
          y2="6"
          stroke={INK}
          strokeWidth="2"
          strokeLinecap="round"
        />
        <text
          x="31"
          y="12"
          textAnchor="middle"
          fontSize="9"
          fontWeight="800"
          fill="#fff"
        >
          12月
        </text>
        <text
          x="25"
          y="40"
          textAnchor="middle"
          fontSize="14"
          fontWeight="900"
          fill={INK}
        >
          PHP
        </text>
        <path
          d="M45 46 l9 -9 M54 46 l-9 -9"
          stroke={BRAND}
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      </g>
      <path
        d="M180 30 l-6 10 h6 l-6 10"
        stroke="#E8A93B"
        strokeWidth="2.2"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function Question() {
  return (
    <svg viewBox="0 0 200 124" className="h-full w-full" aria-hidden="true">
      <Desk />
      <Person x={100} worried />
      {[
        [52, 40, 18],
        [148, 34, 22],
        [128, 14, 14],
      ].map(([cx, cy, r], i) => (
        <g key={i}>
          <circle
            cx={cx}
            cy={cy}
            r={r}
            fill={BG}
            stroke={BRAND}
            strokeWidth="1.8"
          />
          <text
            x={cx}
            y={cy + r * 0.45}
            textAnchor="middle"
            fontSize={r * 1.25}
            fontWeight="900"
            fill={BRAND}
          >
            ?
          </text>
        </g>
      ))}
      <g transform="translate(30 92)">
        <rect
          width="34"
          height="20"
          rx="2"
          fill="#fff"
          stroke={INK}
          strokeWidth="1.8"
        />
        <line x1="6" y1="7" x2="28" y2="7" stroke={INK} strokeWidth="1.4" />
        <line x1="6" y1="13" x2="22" y2="13" stroke={INK} strokeWidth="1.4" />
      </g>
    </svg>
  );
}

function Shield() {
  return (
    <svg viewBox="0 0 200 124" className="h-full w-full" aria-hidden="true">
      <Desk />
      <Person x={60} />
      <g transform="translate(104 22)">
        <path
          d="M30 0 l28 10 v24 c0 22 -14 36 -28 42 c-14 -6 -28 -20 -28 -42 v-24z"
          fill={BG}
          stroke={BRAND}
          strokeWidth="2.2"
          strokeLinejoin="round"
        />
        <path
          d="M17 38 l9 9 l17 -18"
          stroke={BRAND}
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <g transform="translate(160 76)">
        <circle cx="0" cy="0" r="13" fill="#fff" stroke={INK} strokeWidth="2" />
        <line
          x1="0"
          y1="0"
          x2="0"
          y2="-8"
          stroke={INK}
          strokeWidth="2"
          strokeLinecap="round"
        />
        <line
          x1="0"
          y1="0"
          x2="6"
          y2="3"
          stroke={BRAND}
          strokeWidth="2"
          strokeLinecap="round"
        />
        <line
          x1="-4"
          y1="-16"
          x2="4"
          y2="-16"
          stroke={INK}
          strokeWidth="2"
          strokeLinecap="round"
        />
      </g>
    </svg>
  );
}

function EmptySeat() {
  return (
    <svg viewBox="0 0 200 124" className="h-full w-full" aria-hidden="true">
      <Desk />
      {/* 誰もいない椅子 */}
      <g transform="translate(46 56)">
        <rect
          x="0"
          y="0"
          width="34"
          height="34"
          rx="6"
          fill="#fff"
          stroke={INK}
          strokeWidth="2"
        />
        <rect
          x="-4"
          y="34"
          width="42"
          height="8"
          rx="3"
          fill={SOFT}
          stroke={INK}
          strokeWidth="2"
        />
        <line x1="17" y1="42" x2="17" y2="56" stroke={INK} strokeWidth="2" />
      </g>
      {/* PC */}
      <g transform="translate(104 58)">
        <rect
          x="0"
          y="0"
          width="56"
          height="36"
          rx="3"
          fill="#fff"
          stroke={INK}
          strokeWidth="2"
        />
        <rect x="6" y="6" width="44" height="22" fill={BG} />
        <path
          d="M22 54 h12 M28 36 v18"
          stroke={INK}
          strokeWidth="2"
          strokeLinecap="round"
          transform="translate(0 -10)"
        />
      </g>
      {/* 吹き出し: 担当不在 */}
      <g transform="translate(96 10)">
        <rect width="80" height="30" rx="15" fill={BRAND} />
        <text
          x="40"
          y="20"
          textAnchor="middle"
          fontSize="11"
          fontWeight="800"
          fill="#fff"
        >
          担当者 不在
        </text>
        <path d="M18 30 l-4 10 l12 -10z" fill={BRAND} />
      </g>
    </svg>
  );
}

function Magnifier() {
  return (
    <svg viewBox="0 0 200 124" className="h-full w-full" aria-hidden="true">
      <Desk />
      {/* ブラウザ */}
      <g transform="translate(28 26)">
        <rect
          width="100"
          height="74"
          rx="6"
          fill="#fff"
          stroke={INK}
          strokeWidth="2"
        />
        <line x1="0" y1="16" x2="100" y2="16" stroke={INK} strokeWidth="2" />
        <circle cx="10" cy="8" r="2.5" fill={BRAND} />
        <circle cx="19" cy="8" r="2.5" fill={SOFT} />
        <circle cx="28" cy="8" r="2.5" fill={SOFT} />
        <rect x="10" y="26" width="80" height="18" rx="2" fill={BG} />
        <rect x="10" y="50" width="50" height="5" rx="2" fill="#E6E6E6" />
        <rect x="10" y="60" width="64" height="5" rx="2" fill="#E6E6E6" />
      </g>
      {/* 虫眼鏡 */}
      <g transform="translate(132 46)">
        <circle
          cx="0"
          cy="0"
          r="22"
          fill="#ffffff"
          fillOpacity="0.85"
          stroke={BRAND}
          strokeWidth="3"
        />
        <text
          x="0"
          y="8"
          textAnchor="middle"
          fontSize="22"
          fontWeight="900"
          fill={BRAND}
        >
          ?
        </text>
        <line
          x1="16"
          y1="16"
          x2="34"
          y2="34"
          stroke={BRAND}
          strokeWidth="6"
          strokeLinecap="round"
        />
      </g>
    </svg>
  );
}

const ILLUSTRATIONS = [Calendar, Question, Shield, EmptySeat, Magnifier];

export function WorryIllustration({ index }: { index: number }) {
  const C = ILLUSTRATIONS[index % ILLUSTRATIONS.length];
  return <C />;
}
