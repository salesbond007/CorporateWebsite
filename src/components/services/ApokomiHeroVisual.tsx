import { ChannelIcon } from "./ApokomiServiceDiagram";

const NAVY = "#2F4358";
const SKIN = "#FFD8BF";
const HAIR = "#3A2E2B";
const ORANGE = "#F26B1D";

const channels = [
  { id: "tele", label: "テレアポ" },
  { id: "form", label: "問い合わせフォーム" },
  { id: "mail", label: "メール" },
  { id: "letter", label: "手紙BDR" },
  { id: "sns", label: "SNS（DM）" },
];

/** カレンダーのマス(5列×4行)のうち、商談が入るマスと時刻 */
const appointments: Record<number, string> = {
  1: "10:00",
  3: "14:00",
  5: "11:00",
  8: "16:00",
  10: "13:00",
  12: "10:30",
  14: "15:00",
  17: "11:00",
  19: "17:00",
};

/** フラットなタッチ(輪郭線なし)の、ヘッドセットを付けた担当者 */
function Staff({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 160 300" className={className} aria-hidden="true">
      {/* 脚・靴 */}
      <rect x="62" y="210" width="13" height="74" rx="6" fill={SKIN} />
      <rect x="86" y="210" width="13" height="74" rx="6" fill={SKIN} />
      <path d="M54 282 h24 v10 h-30 Q48 284 54 282 Z" fill={HAIR} />
      <path d="M84 282 h24 Q114 284 114 292 h-30 Z" fill={HAIR} />
      {/* スカート */}
      <path d="M52 170 L110 170 L118 222 L44 222 Z" fill={NAVY} />
      {/* タブレットを持つ腕(奥) */}
      <path
        d="M104 104 Q122 130 116 160 L104 160 Q108 136 96 116 Z"
        fill={NAVY}
      />
      <rect
        x="92"
        y="138"
        width="40"
        height="52"
        rx="6"
        fill="#fff"
        transform="rotate(-10 112 164)"
      />
      <rect
        x="99"
        y="148"
        width="26"
        height="6"
        rx="3"
        fill={ORANGE}
        transform="rotate(-10 112 164)"
      />
      <rect
        x="99"
        y="160"
        width="20"
        height="4"
        rx="2"
        fill="#E6E1DD"
        transform="rotate(-10 112 164)"
      />
      <circle cx="113" cy="162" r="7" fill={SKIN} />
      {/* ジャケット */}
      <path d="M50 108 Q80 92 110 108 L114 176 L46 176 Z" fill={NAVY} />
      <path d="M70 100 L80 132 L90 100 Z" fill="#fff" />
      <path d="M74 100 L80 116 L86 100 Z" fill={ORANGE} />
      {/* 指さす腕(手前) */}
      <path d="M54 110 Q34 104 16 84 L24 76 Q40 92 60 98 Z" fill={NAVY} />
      <circle cx="16" cy="78" r="7" fill={SKIN} />
      <rect
        x="2"
        y="72"
        width="14"
        height="5"
        rx="2.5"
        fill={SKIN}
        transform="rotate(-30 9 74)"
      />
      {/* 首・頭 */}
      <rect x="73" y="80" width="14" height="22" rx="5" fill={SKIN} />
      <path
        d="M48 58 Q46 18 82 18 Q116 18 112 60 Q112 82 100 88 L60 88 Q48 80 48 58 Z"
        fill={HAIR}
      />
      <circle cx="80" cy="58" r="24" fill={SKIN} />
      <path
        d="M56 54 Q58 30 82 30 Q104 30 106 50 Q92 40 76 44 Q64 46 56 54 Z"
        fill={HAIR}
      />
      <circle cx="72" cy="60" r="2.6" fill={HAIR} />
      <circle cx="90" cy="60" r="2.6" fill={HAIR} />
      <path
        d="M74 70 Q81 76 88 70"
        stroke={HAIR}
        strokeWidth="2.4"
        fill="none"
        strokeLinecap="round"
      />
      <circle cx="68" cy="68" r="4" fill="#FFB49A" opacity="0.7" />
      <circle cx="94" cy="68" r="4" fill="#FFB49A" opacity="0.7" />
      {/* ヘッドセット */}
      <path
        d="M54 58 Q54 28 80 28 Q106 28 106 58"
        stroke={ORANGE}
        strokeWidth="5"
        fill="none"
        strokeLinecap="round"
      />
      <rect x="49" y="52" width="10" height="16" rx="4" fill={ORANGE} />
      <rect x="101" y="52" width="10" height="16" rx="4" fill={ORANGE} />
      <path
        d="M54 66 Q58 80 70 80"
        stroke={ORANGE}
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  );
}

/**
 * ファーストビューのビジュアル:
 * 5つのチャネルからの流れが集まり、カレンダーが商談で埋まっていく。
 */
export function ApokomiHeroVisual() {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[560px]">
      {/* 背景の円 */}
      <div
        aria-hidden="true"
        className="absolute inset-[6%] rounded-full bg-white/15"
      />

      {/* チャネル → カレンダーへの流れ */}
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-hidden="true"
        className="absolute inset-0 h-full w-full"
      >
        {[20, 33, 46, 59, 72].map((y) => (
          <path
            key={y}
            d={`M30 ${y} C 36 ${y}, 34 46, 40 46`}
            fill="none"
            stroke="#fff"
            strokeOpacity="0.85"
            strokeWidth="0.6"
            strokeDasharray="1.4 1.4"
            vectorEffect="non-scaling-stroke"
            className="[stroke-width:2px]"
          />
        ))}
      </svg>

      {/* チャネル */}
      <ul
        aria-label="対応チャネル"
        className="absolute left-0 top-[14%] flex h-[64%] flex-col justify-between"
      >
        {channels.map((c, i) => (
          <li
            key={c.id}
            className="flex animate-fade-up items-center gap-1.5 rounded-full bg-white py-1 pl-1 pr-2.5 text-[clamp(0.6rem,1.6vw,0.8rem)] font-bold text-[#241F20] shadow-[0_10px_24px_-14px_rgba(120,40,0,0.7)] sm:gap-2 sm:pr-3"
            style={{ animationDelay: `${0.3 + i * 0.12}s` }}
          >
            <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-[#FFF3EA] text-[#F26B1D] sm:h-7 sm:w-7">
              <ChannelIcon id={c.id} size={14} />
            </span>
            {c.label}
          </li>
        ))}
      </ul>

      {/* カレンダー */}
      <div
        className="absolute left-[40%] top-[18%] w-[58%] animate-fade-up overflow-hidden rounded-2xl bg-white shadow-[0_30px_60px_-30px_rgba(120,40,0,0.8)]"
        style={{ animationDelay: "0.2s" }}
      >
        <div className="flex items-center justify-between bg-[#241F20] px-3 py-2 text-white sm:px-4 sm:py-2.5">
          <span className="text-[clamp(0.55rem,1.4vw,0.75rem)] font-bold tracking-[0.15em]">
            APPOINTMENT
          </span>
          <span className="flex gap-1" aria-hidden="true">
            <span className="h-1.5 w-1.5 rounded-full bg-[#F26B1D]" />
            <span className="h-1.5 w-1.5 rounded-full bg-white/40" />
            <span className="h-1.5 w-1.5 rounded-full bg-white/40" />
          </span>
        </div>
        <div className="grid grid-cols-5 gap-[3px] bg-[#F3EEEA] p-[3px] text-center">
          {["月", "火", "水", "木", "金"].map((d) => (
            <span
              key={d}
              className="bg-white py-1 text-[clamp(0.55rem,1.3vw,0.7rem)] font-bold text-[#241F20]/60"
            >
              {d}
            </span>
          ))}
          {Array.from({ length: 20 }).map((_, i) => {
            const time = appointments[i];
            return (
              <span
                key={i}
                className="flex aspect-[5/4] items-center justify-center bg-white p-[2px]"
              >
                {time ? (
                  <span
                    className="flex h-full w-full animate-fade-up flex-col items-center justify-center rounded-[4px] bg-[#F26B1D] leading-tight text-white"
                    style={{
                      animationDelay: `${0.8 + Object.keys(appointments).indexOf(String(i)) * 0.18}s`,
                    }}
                  >
                    <span className="text-[clamp(0.45rem,1.1vw,0.6rem)] font-bold opacity-90">
                      {time}
                    </span>
                    <span className="text-[clamp(0.5rem,1.3vw,0.7rem)] font-black">
                      商談
                    </span>
                  </span>
                ) : null}
              </span>
            );
          })}
        </div>
      </div>

      {/* 商談確定の通知 */}
      <div
        className="absolute right-[2%] top-[2%] flex animate-float-y items-center gap-2 rounded-xl bg-white px-3 py-2 shadow-[0_16px_36px_-16px_rgba(120,40,0,0.8)]"
        style={{ animationDelay: "0.4s" }}
      >
        <span
          className="grid h-7 w-7 place-items-center rounded-full bg-[#F26B1D] text-white"
          aria-hidden="true"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
            <path
              d="M5 12.5l4.5 4.5L19 7.5"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
        <span className="text-left leading-tight">
          <span className="block text-[clamp(0.55rem,1.3vw,0.7rem)] font-bold text-[#241F20]/50">
            NEW
          </span>
          <span className="block text-[clamp(0.65rem,1.6vw,0.85rem)] font-black text-[#241F20]">
            新しい商談が確定しました
          </span>
        </span>
      </div>

      {/* 担当者 */}
      <Staff className="absolute bottom-[2%] right-[-3%] h-[40%] w-auto" />
      <div
        aria-hidden="true"
        className="absolute bottom-[1%] right-[4%] h-[3%] w-[24%] rounded-[50%] bg-[#7A2E00]/20"
      />
    </div>
  );
}
