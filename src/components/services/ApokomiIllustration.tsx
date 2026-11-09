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
