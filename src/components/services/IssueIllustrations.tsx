/**
 * セキュプロ LP の課題カード用イラスト(オリジナル)。
 * 輪郭線のない塗りのフラットな絵柄。スーツの人物 + 小物で、法人向けの落ち着いたトーンにする。
 */

const NAVY = "#24304A";
const NAVY2 = "#33415F";
const PANTS = "#1B2235";
const WINE = "#7A1F3D";
const ROSE = "#B4475F";
const GOLD = "#E3A63B";
const SKIN = "#F1C7A5";
const HAIR = "#2A2226";
const SHADOW = "#E9E4E6";
const PAPER = "#FFFFFF";
const LINE = "#C9C2C5";

type Pose = "down" | "chin" | "point" | "up" | "hold" | "head";

/** 立っている人。x,y は足もと */
function Person({
  x,
  y,
  suit = NAVY,
  tie = GOLD,
  woman = false,
  pose = "down",
  flip = false,
  scale = 1,
}: {
  x: number;
  y: number;
  suit?: string;
  tie?: string;
  woman?: boolean;
  pose?: Pose;
  flip?: boolean;
  scale?: number;
}) {
  const arm = {
    fill: "none",
    stroke: suit,
    strokeWidth: 8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  const arms: Record<Pose, { d: string[]; hands: [number, number][] }> = {
    down: {
      d: ["M-15 -94L-20 -62", "M15 -94L20 -62"],
      hands: [
        [-20, -59],
        [20, -59],
      ],
    },
    chin: {
      d: ["M-15 -94L-20 -62", "M14 -94Q22 -78 7 -101"],
      hands: [
        [-20, -59],
        [5, -104],
      ],
    },
    point: {
      d: ["M-15 -94L-20 -62", "M14 -95L36 -108"],
      hands: [
        [-20, -59],
        [39, -110],
      ],
    },
    up: {
      d: ["M-15 -94L-20 -62", "M14 -96L25 -126"],
      hands: [
        [-20, -59],
        [26, -130],
      ],
    },
    hold: {
      d: ["M-15 -94L-10 -72", "M15 -94L10 -72"],
      hands: [
        [-8, -70],
        [8, -70],
      ],
    },
    head: {
      d: ["M-14 -95Q-30 -110 -12 -124", "M14 -95Q30 -110 12 -124"],
      hands: [
        [-11, -126],
        [11, -126],
      ],
    },
  };
  const a = arms[pose];
  return (
    <g
      transform={`translate(${x} ${y}) scale(${flip ? -scale : scale} ${scale})`}
    >
      <ellipse cx="0" cy="0" rx="22" ry="3.5" fill={SHADOW} />
      {/* 足 */}
      {woman ? (
        <>
          <rect x="-8" y="-40" width="5" height="38" fill={SKIN} />
          <rect x="3" y="-40" width="5" height="38" fill={SKIN} />
          <path d="M-17 -58H17L19 -36H-19z" fill={PANTS} />
        </>
      ) : (
        <>
          <rect x="-11" y="-56" width="9.5" height="54" fill={PANTS} />
          <rect x="1.5" y="-56" width="9.5" height="54" fill={PANTS} />
        </>
      )}
      <ellipse cx="-8" cy="-2" rx="7" ry="3" fill={HAIR} />
      <ellipse cx="8" cy="-2" rx="7" ry="3" fill={HAIR} />
      {/* 体 */}
      <rect x="-4" y="-107" width="8" height="9" fill={SKIN} />
      <path d="M-18 -55L-16 -97Q0 -103 16 -97L18 -55z" fill={suit} />
      <path d="M-7 -100L0 -82L7 -100z" fill={PAPER} />
      {!woman && <path d="M-2 -96H2L3.4 -70L0 -66L-3.4 -70z" fill={tie} />}
      <path d="M-16 -97L-4 -98L0 -82z" fill="#000" fillOpacity="0.12" />
      {/* 腕 */}
      {a.d.map((d) => (
        <path key={d} d={d} {...arm} />
      ))}
      {a.hands.map(([hx, hy]) => (
        <circle key={`${hx}${hy}`} cx={hx} cy={hy} r="4.2" fill={SKIN} />
      ))}
      {/* 頭 */}
      <circle cx="0" cy="-117" r="11" fill={SKIN} />
      {woman ? (
        <path
          d="M-12 -114Q-14 -133 0 -132Q14 -133 12 -114L13 -100Q9 -103 8 -112Q4 -121 -6 -119Q-9 -112 -9 -103L-13 -101z"
          fill={HAIR}
        />
      ) : (
        <path
          d="M-11.5 -117Q-12.5 -132 0 -131Q12.5 -132 11.5 -117Q9 -124 1 -124Q-6 -125 -11.5 -117z"
          fill={HAIR}
        />
      )}
    </g>
  );
}

function Frame({
  children,
  label,
}: {
  children: React.ReactNode;
  label: string;
}) {
  return (
    <svg
      viewBox="0 0 200 170"
      className="h-full w-auto"
      role="img"
      aria-label={label}
    >
      {children}
    </svg>
  );
}

function Question({
  x,
  y,
  s = 1,
  c = GOLD,
}: {
  x: number;
  y: number;
  s?: number;
  c?: string;
}) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`} fill={c}>
      <path d="M0 -14c-6 0-10.5 4-10.5 9.5h6c0-2.3 2-4 4.5-4s4.5 1.6 4.5 3.8c0 4-7 4.3-7 11h6c0-4.5 7-5.2 7-11.4C10.5 -10.4 6 -14 0 -14z" />
      <circle cx="-0.5" cy="11" r="2.6" />
    </g>
  );
}

/** 1 対策の優先順位が定まらない */
export function IllPriority() {
  return (
    <Frame label="どの対策から手をつけるか迷っている人">
      {/* ボード */}
      <rect
        x="96"
        y="28"
        width="86"
        height="104"
        fill={PAPER}
        stroke={LINE}
        strokeWidth="2"
      />
      <rect x="96" y="28" width="86" height="12" fill={NAVY2} />
      {[0, 1, 2, 3].map((i) => (
        <g key={i} transform={`translate(106 ${52 + i * 19})`}>
          <rect width="11" height="11" fill={i === 1 ? WINE : SHADOW} />
          <rect x="17" y="2" width={i % 2 ? 40 : 52} height="7" fill={SHADOW} />
        </g>
      ))}
      <Question x={166} y={22} s={1.1} />
      <Question x={84} y={34} s={0.8} c={ROSE} />
      <Person x={60} y={160} pose="chin" suit={NAVY} />
    </Frame>
  );
}

/** 2 専任人材の採用コストが見合わない */
export function IllHireCost() {
  return (
    <Frame label="採用にかかる費用の高さに悩む人">
      {/* 積み上がったコイン */}
      {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
        <g key={i}>
          <ellipse cx="146" cy={150 - i * 11} rx="26" ry="7" fill="#C98A22" />
          <rect x="120" y={140 - i * 11} width="52" height="10" fill={GOLD} />
          <ellipse cx="146" cy={140 - i * 11} rx="26" ry="7" fill="#F2C15E" />
        </g>
      ))}
      <text
        x="146"
        y="66"
        textAnchor="middle"
        fontSize="13"
        fontWeight="900"
        fill="#9A6514"
      >
        ¥
      </text>
      {/* 求人の紙 */}
      <g transform="translate(92 30) rotate(-8)">
        <rect
          width="34"
          height="42"
          fill={PAPER}
          stroke={LINE}
          strokeWidth="2"
        />
        <circle cx="17" cy="13" r="6" fill={NAVY2} />
        <rect x="7" y="24" width="20" height="3.5" fill={SHADOW} />
        <rect x="7" y="31" width="14" height="3.5" fill={SHADOW} />
      </g>
      <Person x={58} y={160} pose="head" suit={WINE} tie={GOLD} />
    </Frame>
  );
}

/** 3 取引先からチェックシートへの回答を求められている */
export function IllChecksheet() {
  return (
    <Frame label="取引先から届いたチェックシートを持つ人">
      {/* 取引先のビル */}
      <rect x="136" y="34" width="48" height="122" fill={NAVY2} />
      {[0, 1, 2, 3, 4, 5].map((r) =>
        [0, 1, 2].map((c) => (
          <rect
            key={`${r}${c}`}
            x={143 + c * 13}
            y={44 + r * 17}
            width="8"
            height="10"
            fill="#8D9AB5"
          />
        )),
      )}
      <rect x="152" y="138" width="16" height="18" fill={PANTS} />
      {/* 届いた紙(点線の矢印) */}
      <path
        d="M132 66Q112 50 98 70"
        fill="none"
        stroke={WINE}
        strokeWidth="2.4"
        strokeDasharray="4 4"
      />
      <path
        d="M96 62l1 9 8-3"
        fill="none"
        stroke={WINE}
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* 人 + クリップボード */}
      <Person x={66} y={160} pose="hold" suit={NAVY} />
      <g transform="translate(48 70)">
        <rect
          width="36"
          height="46"
          fill={PAPER}
          stroke={LINE}
          strokeWidth="2"
        />
        <rect x="11" y="-4" width="14" height="7" fill={WINE} />
        {[0, 1, 2].map((i) => (
          <g key={i} transform={`translate(6 ${10 + i * 11})`}>
            <rect
              width="7"
              height="7"
              fill="none"
              stroke={WINE}
              strokeWidth="1.8"
            />
            <rect x="11" y="2" width="14" height="3.5" fill={SHADOW} />
          </g>
        ))}
      </g>
    </Frame>
  );
}

/** 4 SCS評価制度への対応が必要 */
export function IllScs() {
  return (
    <Frame label="SCS評価制度の取得という目標に向けて階段を上る人">
      {/* 階段 */}
      {[0, 1, 2, 3, 4].map((i) => (
        <rect
          key={i}
          x={70 + i * 22}
          y={150 - (i + 1) * 18}
          width={150 - (70 + i * 22) + 40}
          height="18"
          fill={i % 2 ? NAVY2 : NAVY}
        />
      ))}
      {/* 旗(SCS) */}
      <rect x="176" y="20" width="3" height="42" fill={PANTS} />
      <g transform="translate(150 22)">
        <rect width="27" height="18" fill={WINE} />
        <text
          x="13.5"
          y="13"
          textAnchor="middle"
          fontSize="9"
          fontWeight="900"
          fill="#fff"
        >
          SCS
        </text>
      </g>
      <Person x={60} y={160} pose="up" suit={NAVY} scale={0.95} />
      <Question x={102} y={44} s={0.9} />
    </Frame>
  );
}

/** 5 生成AIの利用ルールが整っていない */
export function IllAiRule() {
  return (
    <Frame label="生成AIの使い方のルールがなく戸惑う人">
      {/* 机とPC */}
      <rect x="88" y="112" width="104" height="7" fill={NAVY2} />
      <rect x="96" y="119" width="5" height="40" fill={NAVY2} />
      <rect x="178" y="119" width="5" height="40" fill={NAVY2} />
      <rect x="112" y="76" width="56" height="36" fill={PANTS} />
      <rect x="116" y="80" width="48" height="28" fill="#E7ECF5" />
      <rect x="121" y="85" width="22" height="6" fill={ROSE} />
      <rect x="135" y="95" width="24" height="6" fill={NAVY2} />
      {/* AIの吹き出し */}
      <g transform="translate(150 30)">
        <rect width="38" height="28" rx="4" fill={WINE} />
        <path d="M8 28l-2 9 10-9z" fill={WINE} />
        <text
          x="19"
          y="19"
          textAnchor="middle"
          fontSize="13"
          fontWeight="900"
          fill="#fff"
        >
          AI
        </text>
      </g>
      {/* ルールの本(白紙) */}
      <g transform="translate(94 40) rotate(-10)">
        <rect width="30" height="38" fill={GOLD} />
        <rect x="4" y="4" width="22" height="30" fill={PAPER} />
        <text
          x="15"
          y="24"
          textAnchor="middle"
          fontSize="13"
          fontWeight="900"
          fill={LINE}
        >
          ?
        </text>
      </g>
      <Person x={60} y={160} pose="point" suit={NAVY} woman />
    </Frame>
  );
}
