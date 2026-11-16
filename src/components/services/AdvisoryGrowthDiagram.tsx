import { Reveal } from "@/components/ui/Reveal";

/**
 * 経営顧問事業の図。
 * ふつうの成長(灰色の点線)に対して、2つのサービス
 * (顧問・COO紹介 = 経営の伴走とつながり / アポコミ = 新規アポイントの創出)が
 * 成長の線を押し上げ、「3年の成長を1年で」へ近づける様子を示す。
 * 動き: 画面に入ると成長の線が左から描かれ、2つのサービスが順に現れ、先端が光る。
 */

const B = "#0046C8";
const BL = "#EEF4FC";

const show =
  "opacity-0 transition-[opacity,transform] duration-700 ease-[cubic-bezier(.22,1,.36,1)] group-data-[visible=true]/reveal:opacity-100 group-data-[visible=true]/reveal:translate-y-0 translate-y-2";

export function AdvisoryGrowthDiagram() {
  return (
    <Reveal variant="none">
      <svg
        viewBox="0 0 480 360"
        className="mx-auto h-auto w-full max-w-[34rem]"
        role="img"
        aria-label="顧問・COO紹介とアポコミの2つのサービスで、ふつうより速く事業を成長させる図"
      >
        {/* 背景のマス目 */}
        <g stroke="#1F1A1C" strokeOpacity="0.06">
          {[80, 140, 200, 260].map((y) => (
            <line key={y} x1="40" x2="460" y1={y} y2={y} />
          ))}
          {[120, 200, 280, 360, 440].map((x) => (
            <line key={x} x1={x} x2={x} y1="40" y2="300" />
          ))}
        </g>
        {/* 軸 */}
        <path d="M40 30V300H466" fill="none" stroke="#1F1A1C" strokeOpacity="0.35" strokeWidth="1.5" />
        <path d="M462 296l6 4-6 4" fill="none" stroke="#1F1A1C" strokeOpacity="0.35" strokeWidth="1.5" />
        <text x="44" y="24" fontSize="10.5" fontWeight="700" fill="#1F1A1C" fillOpacity="0.5">
          事業の成長
        </text>
        <text x="466" y="320" textAnchor="end" fontSize="10.5" fontWeight="700" fill="#1F1A1C" fillOpacity="0.5">
          時間
        </text>
        {/* 時間の目盛り */}
        {[
          { x: 200, t: "1年" },
          { x: 440, t: "3年" },
        ].map((m) => (
          <g key={m.t}>
            <line x1={m.x} x2={m.x} y1="300" y2="306" stroke="#1F1A1C" strokeOpacity="0.35" />
            <text x={m.x} y="320" textAnchor="middle" fontSize="10.5" fontWeight="700" fill="#1F1A1C" fillOpacity="0.55">
              {m.t}
            </text>
          </g>
        ))}

        {/* ふつうの成長 */}
        <path
          d="M40 290 C 180 280, 320 230, 440 110"
          fill="none"
          stroke="#9A9396"
          strokeWidth="2"
          strokeDasharray="5 6"
        />
        <text x="430" y="132" textAnchor="end" fontSize="10.5" fontWeight="700" fill="#9A9396">
          ひとりで進めた場合
        </text>

        {/* 支援がある場合(描かれていく線) */}
        <path
          d="M40 290 C 110 270, 150 190, 200 90 S 300 50, 440 44"
          fill="none"
          stroke={B}
          strokeWidth="4"
          strokeLinecap="round"
          pathLength={1}
          strokeDasharray="1"
          className="[stroke-dashoffset:1] transition-[stroke-dashoffset] duration-[1800ms] ease-out group-data-[visible=true]/reveal:[stroke-dashoffset:0]"
        />
        {/* 1年で到達する点 */}
        <g className={show} style={{ transitionDelay: "1500ms" }}>
          <line x1="200" x2="200" y1="90" y2="300" stroke={B} strokeOpacity="0.3" strokeDasharray="3 4" />
          <circle cx="200" cy="90" r="16" fill={B} fillOpacity="0.12" className="pf-wave" />
          <circle cx="200" cy="90" r="7" fill={B} />
          <rect x="214" y="58" width="120" height="28" rx="14" fill={B} />
          <text x="274" y="77" textAnchor="middle" fontSize="12" fontWeight="900" fill="#fff">
            3年の成長を1年で
          </text>
        </g>

        {/* 2つのサービス(線を押し上げる) */}
        {[
          { x: 92, y: 250, t1: "顧問・COO紹介", t2: "経営に伴走・つながり", d: 600 },
          { x: 150, y: 176, t1: "アポコミ", t2: "新規アポイントを創出", d: 950 },
        ].map((n) => (
          <g key={n.t1} className={show} style={{ transitionDelay: `${n.d}ms` }}>
            <path d={`M${n.x} ${n.y + 46}V${n.y + 8}`} stroke={B} strokeWidth="2" markerEnd="" />
            <path d={`M${n.x - 5} ${n.y + 14}l5 -7 5 7`} fill="none" stroke={B} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <g transform={`translate(${n.x + 10} ${n.y + 20})`}>
              <rect width="132" height="42" rx="8" fill="#fff" stroke={B} strokeOpacity="0.35" />
              <rect width="4" height="42" rx="2" fill={B} />
              <text x="12" y="18" fontSize="12" fontWeight="900" fill="#1F1A1C">
                {n.t1}
              </text>
              <text x="12" y="33" fontSize="10" fontWeight="700" fill={B}>
                {n.t2}
              </text>
            </g>
          </g>
        ))}

        {/* 先端の光 */}
        <g className={show} style={{ transitionDelay: "1800ms" }}>
          <circle cx="440" cy="44" r="10" fill={BL} stroke={B} strokeWidth="2" />
          <circle cx="440" cy="44" r="10" fill="none" stroke={B} className="pf-wave" />
        </g>
      </svg>
    </Reveal>
  );
}
