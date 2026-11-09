/**
 * アポコミLP用のオリジナルのフラットイラスト(オレンジ基調)。
 * ファーストビューの「チームで新規開拓する」シーンと、3つの特徴の挿絵。
 */
const INK = "#241F20";
const ORANGE = "#F26B1D";
const ORANGE_SOFT = "#FFD9BC";
const CREAM = "#FFF4EA";
const SKIN = "#FFE2CC";
const NAVY = "#2F4358";

/* ---------------------------------------------------- ファーストビューの会議シーン */

const HAIR = "#3A3536";
const CHAIR = "#FFC08A";
const SUIT_GRAY = "#A3A7AD";
const SW = 3; // 線の太さ

/** 机の手前の縁(左下→右上へゆるやかに上がる曲線)のy座標 */
function edgeY(x: number) {
  const t = (x + 20) / 1480;
  return (1 - t) ** 2 * 506 + 2 * t * (1 - t) * 374 + t ** 2 * 412;
}

type Seat = {
  x: number;
  s: number;
  dir: 1 | -1;
  suit: string;
  hair: "short" | "long" | "bob";
  tie?: string;
  item: "pen" | "paper" | "laptop" | "talk";
};

const seats: Seat[] = [
  {
    x: 210,
    s: 1.32,
    dir: 1,
    suit: NAVY,
    hair: "short",
    tie: ORANGE,
    item: "pen",
  },
  { x: 470, s: 1.02, dir: 1, suit: SUIT_GRAY, hair: "long", item: "paper" },
  {
    x: 650,
    s: 0.88,
    dir: 1,
    suit: NAVY,
    hair: "short",
    tie: NAVY,
    item: "pen",
  },
  {
    x: 930,
    s: 0.9,
    dir: -1,
    suit: SUIT_GRAY,
    hair: "short",
    tie: ORANGE,
    item: "talk",
  },
  { x: 1200, s: 1.12, dir: -1, suit: SUIT_GRAY, hair: "bob", item: "laptop" },
];

function seatTransform(p: Seat) {
  return `translate(${p.x} ${edgeY(p.x) - 6}) scale(${p.s * p.dir} ${p.s})`;
}

/** 机の奥側に見える部分(椅子・胴体・頭) */
function SeatBody({ p }: { p: Seat }) {
  return (
    <g
      transform={seatTransform(p)}
      stroke={INK}
      strokeWidth={SW}
      strokeLinejoin="round"
    >
      {/* 椅子の背もたれ */}
      <path
        d="M-112 60 L-116 -150 Q-116 -206 -64 -210 L24 -210 Q70 -206 70 -150 L66 60 Z"
        fill={CHAIR}
      />
      {/* 長い髪(頭の後ろ) */}
      {p.hair === "long" ? (
        <path
          d="M-46 -236 Q-52 -296 6 -296 Q58 -294 50 -236 L58 -168 Q20 -156 -4 -166 L-52 -164 Z"
          fill={HAIR}
        />
      ) : null}
      {/* 胴体 */}
      <path
        d="M-82 60 L-78 -108 Q-74 -160 -26 -170 L30 -170 Q76 -160 80 -108 L84 60 Z"
        fill={p.suit}
      />
      <path d="M-26 -170 L4 -108 L30 -170 Z" fill="#fff" />
      {p.tie ? (
        <path d="M4 -162 L-5 -148 L4 -96 L13 -148 Z" fill={p.tie} />
      ) : null}
      <path
        d="M-26 -170 L-12 -98 L4 -108 M30 -170 L18 -98 L4 -108"
        fill="none"
      />
      {/* 首と頭 */}
      <path d="M-14 -200 L-14 -166 L20 -166 L20 -200" fill="#fff" />
      <ellipse cx="6" cy="-234" rx="38" ry="44" fill="#fff" />
      {p.hair === "short" ? (
        <path
          d="M-33 -220 Q-46 -282 8 -284 Q52 -284 46 -246 Q36 -260 16 -258 Q-2 -257 -12 -248 Q-17 -238 -18 -222 Z"
          fill={HAIR}
        />
      ) : p.hair === "long" ? (
        <path
          d="M-34 -226 Q-40 -284 10 -286 Q50 -284 46 -244 Q28 -264 -4 -258 Q-22 -250 -26 -222 Z"
          fill={HAIR}
        />
      ) : (
        <path
          d="M-40 -196 Q-52 -286 8 -288 Q56 -286 48 -240 Q30 -262 0 -256 Q-18 -248 -20 -228 Q-22 -206 -14 -196 Z"
          fill={HAIR}
        />
      )}
      {/* 耳と顔 */}
      <ellipse cx="-20" cy="-226" rx="8" ry="11" fill="#fff" />
      <circle cx="24" cy="-234" r="3.4" fill={INK} stroke="none" />
      <path
        d="M15 -247 q8 -5 17 -1"
        fill="none"
        strokeWidth={2.5}
        strokeLinecap="round"
      />
      <path
        d="M42 -234 q7 9 -2 11"
        fill="none"
        strokeWidth={2.5}
        strokeLinecap="round"
      />
      <path
        d="M24 -208 q7 4 13 -1"
        fill="none"
        strokeWidth={2.5}
        strokeLinecap="round"
      />
    </g>
  );
}

/** 机の手前に見える部分(腕・手・持ち物) */
function SeatArms({ p }: { p: Seat }) {
  const sleeve = (d: string) => (
    <>
      <path
        d={d}
        fill="none"
        stroke={INK}
        strokeWidth={34}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d={d}
        fill="none"
        stroke={p.suit}
        strokeWidth={27}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </>
  );
  const hand = (cx: number, cy: number) => (
    <ellipse
      cx={cx}
      cy={cy}
      rx="15"
      ry="11"
      fill="#fff"
      stroke={INK}
      strokeWidth={SW}
    />
  );
  return (
    <g transform={seatTransform(p)}>
      {/* 書類 */}
      {p.item !== "laptop" ? (
        <g stroke={INK} strokeWidth={SW} strokeLinejoin="round">
          <path d="M10 36 L150 22 L170 92 L24 108 Z" fill="#fff" />
          <path
            d="M40 54 L130 45 M44 70 L140 60 M48 86 L110 80"
            fill="none"
            stroke="#D8D2CD"
            strokeWidth={4}
            strokeLinecap="round"
          />
        </g>
      ) : null}
      {/* 奥の腕 */}
      {p.item === "talk"
        ? sleeve("M58 -120 Q92 -70 96 -30 Q98 -6 112 -40")
        : sleeve("M58 -120 Q84 -40 96 24 L136 36")}
      {p.item === "talk" ? hand(116, -48) : hand(146, 38)}
      {/* 手前の腕 */}
      {sleeve("M-52 -116 Q-56 -20 -30 44 L64 62")}
      {hand(76, 62)}
      {p.item === "pen" ? (
        <path
          d="M70 58 L104 18"
          stroke={INK}
          strokeWidth={6}
          strokeLinecap="round"
        />
      ) : null}
      {p.item === "laptop" ? (
        <g stroke={INK} strokeWidth={SW} strokeLinejoin="round">
          <path d="M44 -58 L176 -76 L188 52 L56 66 Z" fill="#E7EAEE" />
          <path d="M40 66 L192 50 L200 66 L44 84 Z" fill="#CDD2D8" />
          <circle cx="118" cy="-4" r="8" fill={ORANGE} />
        </g>
      ) : null}
    </g>
  );
}

/** ファーストビュー: 会議テーブルを囲んで新規開拓を進めるチームのイラスト */
export function ApokomiHeroIllustration({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 60 1440 560"
      className={className}
      role="img"
      aria-label="会議テーブルを囲んで新規開拓の作戦を立てるチームのイラスト"
    >
      {seats.map((p) => (
        <SeatBody key={p.x} p={p} />
      ))}
      {/* 会議テーブル(白) */}
      <path
        d="M-20 640 L-20 506 Q 720 374 1460 412 L1460 640 Z"
        fill="#fff"
        stroke={INK}
        strokeWidth={SW}
        strokeLinejoin="round"
      />
      {/* コーヒーカップ */}
      <g stroke={INK} strokeWidth={SW} strokeLinejoin="round">
        <path d="M774 452 L780 494 Q792 502 806 494 L812 452 Z" fill="#fff" />
        <ellipse cx="793" cy="452" rx="19" ry="6" fill={CHAIR} />
        <path d="M811 462 q14 2 6 18 l-8 2" fill="none" />
      </g>
      {seats.map((p) => (
        <SeatArms key={p.x} p={p} />
      ))}
    </svg>
  );
}

/** 3つの特徴の挿絵 */
export function ApokomiFeatureIllustration({ index }: { index: number }) {
  return (
    <svg viewBox="0 0 240 180" className="h-auto w-full" aria-hidden="true">
      <ellipse cx="120" cy="96" rx="104" ry="76" fill={CREAM} />
      {index === 3 ? (
        <g>
          {/* ホワイトボードを指し示す人物(ナレッジの共有) */}
          <rect
            x="22"
            y="34"
            width="128"
            height="84"
            rx="6"
            fill="#fff"
            stroke={INK}
            strokeWidth="2.2"
          />
          {[0, 1, 2, 3].map((n) => (
            <circle key={n} cx="38" cy={52 + n * 15} r="3.5" fill="#D9D3CE" />
          ))}
          {[0, 1, 2].map((n) => (
            <line
              key={n}
              x1="52"
              y1={60 + n * 17}
              x2="138"
              y2={60 + n * 17}
              stroke="#EFE9E4"
              strokeWidth="1.5"
            />
          ))}
          {[14, 26, 38, 54].map((h, n) => (
            <rect
              key={n}
              x={58 + n * 20}
              y={104 - h}
              width="12"
              height={h}
              rx="1.5"
              fill={n === 3 ? ORANGE : ORANGE_SOFT}
            />
          ))}
          <line
            x1="52"
            y1="104"
            x2="138"
            y2="104"
            stroke={INK}
            strokeWidth="1.8"
          />
          {/* 人物 */}
          <line
            x1="122"
            y1="80"
            x2="170"
            y2="96"
            stroke={INK}
            strokeWidth="3"
            strokeLinecap="round"
          />
          <circle
            cx="184"
            cy="58"
            r="11"
            fill={SKIN}
            stroke={INK}
            strokeWidth="2"
          />
          <path
            d="M173 56 Q174 44 186 45 Q196 46 195 56 Q188 50 180 52 Z"
            fill={INK}
          />
          <path
            d="M172 76 Q184 68 196 76 L198 120 L170 120 Z"
            fill={ORANGE}
            stroke={INK}
            strokeWidth="2"
            strokeLinejoin="round"
          />
          <path
            d="M174 80 Q168 92 170 96"
            fill="none"
            stroke={ORANGE}
            strokeWidth="7"
            strokeLinecap="round"
          />
          <rect x="172" y="118" width="11" height="40" fill={NAVY} />
          <rect x="185" y="118" width="11" height="40" fill={NAVY} />
          <path
            d="M168 158 h16 M184 158 h16"
            stroke={INK}
            strokeWidth="4"
            strokeLinecap="round"
          />
          <line
            x1="40"
            y1="162"
            x2="220"
            y2="162"
            stroke={INK}
            strokeWidth="2"
            strokeLinecap="round"
          />
        </g>
      ) : index === 0 ? (
        <g>
          {/* クリップボードのチェックリスト */}
          <rect
            x="70"
            y="34"
            width="100"
            height="124"
            rx="8"
            fill="#fff"
            stroke={INK}
            strokeWidth="2.5"
          />
          <rect
            x="98"
            y="26"
            width="44"
            height="16"
            rx="4"
            fill={ORANGE}
            stroke={INK}
            strokeWidth="2"
          />
          {[0, 1, 2, 3].map((i) => (
            <g key={i}>
              <rect
                x="84"
                y={58 + i * 24}
                width="14"
                height="14"
                rx="3"
                fill={i < 3 ? ORANGE : "#fff"}
                stroke={INK}
                strokeWidth="2"
              />
              {i < 3 ? (
                <path
                  d={`M87 ${65 + i * 24} l3 3 l6 -7`}
                  fill="none"
                  stroke="#fff"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              ) : null}
              <rect
                x="106"
                y={61 + i * 24}
                width={i % 2 ? 40 : 52}
                height="7"
                rx="3.5"
                fill="#E7E2DE"
              />
            </g>
          ))}
          <circle
            cx="186"
            cy="132"
            r="22"
            fill={ORANGE}
            stroke={INK}
            strokeWidth="2.5"
          />
          <path
            d="M176 132 l7 7 l13 -14"
            fill="none"
            stroke="#fff"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
      ) : index === 1 ? (
        <g>
          {/* 5方向から中心のアポイントへ */}
          {[0, 1, 2, 3, 4].map((i) => {
            const a = ((-90 + i * 72) * Math.PI) / 180;
            const x = 120 + 74 * Math.cos(a);
            const y = 96 + 58 * Math.sin(a);
            return (
              <g key={i}>
                <line
                  x1={x}
                  y1={y}
                  x2={120 + 30 * Math.cos(a)}
                  y2={96 + 30 * Math.sin(a)}
                  stroke={ORANGE}
                  strokeWidth="2.5"
                  strokeDasharray="5 5"
                />
                <circle
                  cx={x}
                  cy={y}
                  r="15"
                  fill="#fff"
                  stroke={INK}
                  strokeWidth="2.2"
                />
                <circle cx={x} cy={y} r="5" fill={i % 2 ? ORANGE : NAVY} />
              </g>
            );
          })}
          <circle
            cx="120"
            cy="96"
            r="28"
            fill={ORANGE}
            stroke={INK}
            strokeWidth="2.5"
          />
          <rect x="106" y="84" width="28" height="24" rx="3" fill="#fff" />
          <line
            x1="106"
            y1="92"
            x2="134"
            y2="92"
            stroke={INK}
            strokeWidth="2"
          />
          <path
            d="M113 100 l4 4 l9 -8"
            fill="none"
            stroke={ORANGE}
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
      ) : (
        <g>
          {/* 伸びる棒グラフ */}
          <line
            x1="48"
            y1="150"
            x2="200"
            y2="150"
            stroke={INK}
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          {[30, 48, 66, 98].map((h, i) => (
            <rect
              key={i}
              x={62 + i * 34}
              y={150 - h}
              width="22"
              height={h}
              rx="3"
              fill={i === 3 ? ORANGE : ORANGE_SOFT}
              stroke={INK}
              strokeWidth="2"
            />
          ))}
          <path
            d="M60 112 L104 92 L136 98 L186 42"
            fill="none"
            stroke={NAVY}
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M172 40 L188 40 L188 56"
            fill="none"
            stroke={NAVY}
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="186" cy="42" r="4" fill={ORANGE} />
        </g>
      )}
    </svg>
  );
}

/** 背景に流れる細い波線(装飾) */
export function WaveLines({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 1440 320"
      preserveAspectRatio="none"
      className={className}
      aria-hidden="true"
    >
      {Array.from({ length: 9 }).map((_, i) => (
        <path
          key={i}
          d={`M0 ${120 + i * 9} C 360 ${20 + i * 14}, 720 ${300 - i * 8}, 1440 ${90 + i * 12}`}
          fill="none"
          stroke={ORANGE}
          strokeOpacity={0.12}
          strokeWidth={1.2}
        />
      ))}
    </svg>
  );
}
