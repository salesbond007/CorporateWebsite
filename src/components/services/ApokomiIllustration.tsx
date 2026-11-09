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

/* -------------------------------------------- ファーストビュー: 歩きながら作戦を話す2人 */

const HAIR = "#3A3536";
const SUIT_GRAY = "#9EA3A9";
const SW = 3; // 線の太さ

/** 輪郭線つきの袖(太い線を2重に描く) */
function Sleeve({ d, color }: { d: string; color: string }) {
  return (
    <>
      <path
        d={d}
        fill="none"
        stroke={INK}
        strokeWidth={30}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d={d}
        fill="none"
        stroke={color}
        strokeWidth={24}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </>
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

/** 「アポコミとは」: 悩むクライアント(上半身) */
export function ApokomiClientBust({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 240 250" className={className} aria-hidden="true">
      <g
        stroke={INK}
        strokeWidth={3}
        strokeLinejoin="round"
        strokeLinecap="round"
      >
        <path
          d="M30 252 L36 200 Q46 168 92 160 L148 160 Q194 168 204 200 L210 252 Z"
          fill={SUIT_GRAY}
        />
        <path d="M98 160 L120 212 L142 160 Z" fill={ORANGE} />
        <path
          d="M98 160 L108 236 L120 212 M142 160 L132 236 L120 212"
          fill="none"
        />
        <path d="M106 128 L106 164 L134 164 L134 128" fill="#fff" />
        <path
          d="M66 112 Q58 40 120 38 Q184 40 176 110 Q178 142 158 152 L82 152 Q62 142 66 112 Z"
          fill={HAIR}
        />
        <ellipse cx="120" cy="102" rx="40" ry="48" fill="#fff" />
        <path
          d="M80 92 Q82 52 122 50 Q162 52 162 90 Q140 70 116 76 Q96 80 80 92 Z"
          fill={HAIR}
        />
        {/* 落ち込みの線 */}
        <path
          d="M108 84 v10 M118 82 v12 M128 84 v10"
          fill="none"
          strokeWidth={2}
        />
        {/* 困った眉・目・口 */}
        <path
          d="M94 100 L110 94 M146 100 L130 94"
          fill="none"
          strokeWidth={2.6}
        />
        <path
          d="M98 110 q6 4 12 0 M130 110 q6 4 12 0"
          fill="none"
          strokeWidth={2.6}
        />
        <path d="M106 132 q7 -6 14 0 q7 6 14 0" fill="none" strokeWidth={2.6} />
        {/* 汗 */}
        <path
          d="M166 104 q8 12 0 16 q-8 -4 0 -16 Z"
          fill="#CFE6F5"
          strokeWidth={2}
        />
        {/* 頭に手を当てる腕 */}
        <Sleeve d="M58 214 Q36 156 70 104" color={SUIT_GRAY} />
        <path
          d="M66 98 Q70 72 92 70 Q104 72 100 84 Q96 92 84 100 Q74 108 66 98 Z"
          fill="#fff"
        />
        <path d="M80 76 L90 92 M88 72 L98 86" fill="none" strokeWidth={2} />
      </g>
    </svg>
  );
}

/** 「アポコミとは」: ヘッドセットを付けたアポコミの担当者(上半身) */
export function ApokomiStaffBust({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 240 250" className={className} aria-hidden="true">
      <g
        stroke={INK}
        strokeWidth={3}
        strokeLinejoin="round"
        strokeLinecap="round"
      >
        <path
          d="M30 252 L36 200 Q46 168 92 160 L148 160 Q194 168 204 200 L210 252 Z"
          fill={NAVY}
        />
        <path d="M100 160 L120 218 L140 160 Z" fill="#fff" />
        <path d="M120 168 L112 180 L120 232 L128 180 Z" fill={ORANGE} />
        <path
          d="M100 160 L110 236 L120 218 M140 160 L130 236 L120 218"
          fill="none"
        />
        <path d="M106 128 L106 164 L134 164 L134 128" fill="#fff" />
        <ellipse cx="80" cy="106" rx="8" ry="12" fill="#fff" />
        <ellipse cx="160" cy="106" rx="8" ry="12" fill="#fff" />
        <ellipse cx="120" cy="100" rx="40" ry="48" fill="#fff" />
        <path
          d="M78 98 Q68 38 122 40 Q174 40 164 94 Q158 70 136 66 Q118 78 98 72 Q86 80 78 98 Z"
          fill={HAIR}
        />
        {/* 笑顔 */}
        <path
          d="M100 92 q7 -4 14 0 M126 92 q7 -4 14 0"
          fill="none"
          strokeWidth={2.6}
        />
        <circle cx="107" cy="104" r="3.4" fill={INK} stroke="none" />
        <circle cx="133" cy="104" r="3.4" fill={INK} stroke="none" />
        <path d="M106 124 q14 12 28 0" fill="none" strokeWidth={2.8} />
        {/* ヘッドセット */}
        <path
          d="M74 106 Q70 44 120 42 Q170 44 166 106"
          fill="none"
          strokeWidth={6}
        />
        <rect x="66" y="94" width="14" height="24" rx="5" fill={ORANGE} />
        <rect x="160" y="94" width="14" height="24" rx="5" fill={ORANGE} />
        <path d="M72 118 Q78 142 104 140" fill="none" strokeWidth={3} />
        <circle cx="106" cy="140" r="5" fill={INK} stroke="none" />
      </g>
    </svg>
  );
}
