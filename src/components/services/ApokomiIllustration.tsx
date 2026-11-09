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
const PANTS = "#243446";
const SUIT_GRAY = "#9EA3A9";
const SKIRT = "#7F858C";
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

/** ファーストビュー: クリップボードを手に、歩きながら作戦を話すビジネスパーソン2人 */
export function ApokomiHeroIllustration({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 400 610"
      className={className}
      role="img"
      aria-label="クリップボードを手に、歩きながら新規開拓の作戦を話し合うビジネスパーソン2人のイラスト"
    >
      {/* 足元の影 */}
      <ellipse cx="210" cy="590" rx="170" ry="14" fill={INK} opacity="0.12" />

      <g
        stroke={INK}
        strokeWidth={SW}
        strokeLinejoin="round"
        strokeLinecap="round"
      >
        {/* ---------- 女性(右・奥) ---------- */}
        {/* 脚 */}
        <path
          d="M298 386 L316 386 L334 500 L346 566 L334 569 L312 504 Z"
          fill="#fff"
        />
        <path
          d="M262 386 L280 386 L272 506 L266 572 L254 572 L256 506 Z"
          fill="#fff"
        />
        <path d="M330 566 L350 562 L360 576 L334 578 Z" fill={INK} />
        <path
          d="M250 570 L268 570 L270 584 L238 584 Q240 574 250 570 Z"
          fill={INK}
        />
        {/* スカート */}
        <path d="M246 296 L328 296 L338 392 L238 392 Z" fill={SKIRT} />
        {/* 奥の腕(下ろしている) */}
        <Sleeve d="M318 186 Q334 240 330 296" color={SUIT_GRAY} />
        <ellipse cx="330" cy="306" rx="11" ry="13" fill="#fff" />
        {/* ジャケット */}
        <path
          d="M250 172 Q286 158 322 172 L328 300 L244 300 Z"
          fill={SUIT_GRAY}
        />
        <path d="M272 164 L286 206 L300 164 Z" fill={ORANGE} />
        <path
          d="M272 164 L280 230 L286 206 M300 164 L292 230 L286 206"
          fill="none"
        />
        {/* 首・頭 */}
        <path d="M276 148 L276 168 L296 168 L296 148" fill="#fff" />
        <path
          d="M318 126 Q326 74 284 70 Q248 70 250 112 Q252 128 262 134 L314 136 Z"
          fill={HAIR}
        />
        <ellipse cx="280" cy="122" rx="27" ry="32" fill="#fff" />
        <path
          d="M254 116 Q252 82 284 82 Q308 84 310 110 Q296 96 274 100 Q262 104 254 116 Z"
          fill={HAIR}
        />
        <ellipse cx="302" cy="124" rx="6" ry="9" fill="#fff" />
        <circle cx="266" cy="122" r="3" fill={INK} stroke="none" />
        <path d="M258 112 q7 -4 14 0" fill="none" strokeWidth={2.5} />
        <path d="M253 124 q-6 8 2 10" fill="none" strokeWidth={2.5} />
        <path d="M262 140 q6 4 12 0" fill="none" strokeWidth={2.5} />
        {/* 手前の腕(クリップボードを指さす) */}
        <Sleeve d="M256 184 Q236 228 226 244 L200 236" color={SUIT_GRAY} />
        <path d="M196 230 L176 226 Q172 232 178 236 L196 240 Z" fill="#fff" />

        {/* ---------- 男性(左・手前) ---------- */}
        {/* 脚 */}
        <path
          d="M104 296 L152 300 L134 440 L112 566 L86 562 L104 438 Z"
          fill={PANTS}
        />
        <path
          d="M148 296 L198 300 L212 440 L222 570 L196 572 L182 446 Z"
          fill={PANTS}
        />
        <path
          d="M84 558 L114 562 L112 582 Q92 586 70 578 Q72 564 84 558 Z"
          fill={INK}
        />
        <path d="M196 568 L224 566 Q246 572 248 584 L196 586 Z" fill={INK} />
        {/* 奥の腕(手を挙げて話している) */}
        <Sleeve d="M188 150 Q222 196 226 214 Q232 180 240 150" color={NAVY} />
        <path
          d="M232 146 L234 118 M240 144 L246 116 M246 148 L256 124 M232 146 Q236 136 252 140 L250 156 Q240 162 232 156 Z"
          fill="#fff"
        />
        {/* ジャケット */}
        <path d="M106 136 Q150 120 194 136 L202 304 L98 304 Z" fill={NAVY} />
        <path d="M136 128 L150 182 L164 128 Z" fill="#fff" />
        <path d="M150 136 L143 148 L150 190 L157 148 Z" fill={ORANGE} />
        <path
          d="M136 128 L144 214 L150 182 M164 128 L156 214 L150 182"
          fill="none"
        />
        {/* 首・頭 */}
        <path d="M140 108 L140 130 L162 130 L162 108" fill="#fff" />
        <ellipse cx="154" cy="78" rx="30" ry="36" fill="#fff" />
        <path
          d="M124 84 Q114 34 158 36 Q190 38 186 66 Q176 54 160 56 Q144 58 136 68 Q132 76 132 86 Z"
          fill={HAIR}
        />
        <ellipse cx="130" cy="82" rx="7" ry="10" fill="#fff" />
        <circle cx="168" cy="78" r="3.2" fill={INK} stroke="none" />
        <path d="M160 66 q8 -4 16 0" fill="none" strokeWidth={2.5} />
        <path d="M184 78 q6 8 -2 10" fill="none" strokeWidth={2.5} />
        <ellipse
          cx="172"
          cy="100"
          rx="5"
          ry="3.5"
          fill="#fff"
          strokeWidth={2.5}
        />
        {/* クリップボード */}
        <g transform="rotate(-14 160 236)">
          <rect x="112" y="200" width="96" height="70" rx="5" fill="#fff" />
          <rect x="146" y="194" width="28" height="10" rx="2" fill={ORANGE} />
          <path
            d="M124 220 h52 M124 234 h70 M124 248 h40"
            fill="none"
            stroke="#D8D2CD"
            strokeWidth={4}
          />
          <circle cx="188" cy="252" r="7" fill={ORANGE} stroke="none" />
        </g>
        {/* 手前の腕(クリップボードを抱える) */}
        <Sleeve d="M112 150 Q94 214 106 248 L150 262" color={NAVY} />
        <ellipse cx="160" cy="262" rx="13" ry="10" fill="#fff" />
      </g>
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
