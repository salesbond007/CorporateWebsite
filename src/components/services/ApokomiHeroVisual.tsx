import Image from "next/image";

/** カレンダーのマス(5列×3行)のうち、商談が入るマスと時刻 */
const appointments: Record<number, string> = {
  1: "10:00",
  3: "14:00",
  5: "11:00",
  7: "16:00",
  9: "13:00",
  10: "10:30",
  12: "15:00",
  14: "17:00",
};

/**
 * ファーストビューのビジュアル:
 * チームで新規開拓を進める会議のイラストと、商談で埋まっていくカレンダー、商談確定の通知。
 * イラストは Loose Drawing(商用利用可)の素材をブランドカラーに合わせて色調整したもの。
 */
export function ApokomiHeroVisual() {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[560px]">
      {/* 背景の円 */}
      <div
        aria-hidden="true"
        className="absolute inset-[3%] rounded-full bg-white shadow-[0_40px_80px_-40px_rgba(120,40,0,0.6)]"
      />
      <Image
        src="/illustrations/ld-990-orange.webp"
        alt="会議室でチームが新規開拓の作戦を立てているイラスト"
        width={639}
        height={581}
        priority
        className="absolute left-1/2 top-[14%] w-[78%] -translate-x-1/2"
      />

      {/* 商談で埋まっていくカレンダー */}
      <div
        className="absolute bottom-[4%] left-0 w-[50%] animate-fade-up overflow-hidden rounded-2xl bg-white shadow-[0_30px_60px_-30px_rgba(120,40,0,0.8)]"
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
          {Array.from({ length: 15 }).map((_, i) => {
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
        className="absolute right-0 top-[6%] flex animate-float-y items-center gap-2 rounded-xl bg-white px-3 py-2 shadow-[0_16px_36px_-16px_rgba(120,40,0,0.8)]"
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
    </div>
  );
}
