import Image from "next/image";
import { cn } from "@/lib/cn";

const ORANGE = "#0046C8";
const NAVY = "#0B1B36";

type Step = {
  no: string;
  name: string;
  note: string;
  owner: "apokomi" | "client";
  shade: string;
};

const steps: Step[] = [
  {
    no: "01",
    name: "リスト作成",
    note: "狙う企業と役職を選定",
    owner: "apokomi",
    shade: "#5A93F0",
  },
  {
    no: "02",
    name: "アプローチ",
    note: "5つのチャネルで接点づくり",
    owner: "apokomi",
    shade: "#2F6FE3",
  },
  {
    no: "03",
    name: "アポイント獲得",
    note: "商談の日程を確定",
    owner: "apokomi",
    shade: ORANGE,
  },
  {
    no: "04",
    name: "商談",
    note: "御社が提案",
    owner: "client",
    shade: "#1E2F4F",
  },
  {
    no: "05",
    name: "受注",
    note: "売上につなげる",
    owner: "client",
    shade: NAVY,
  },
];

const channelNames = ["テレアポ", "フォーム", "メール", "手紙BDR", "SNS"];

/** 矢羽根(シェブロン)の形 */
function chevron(first: boolean) {
  return first
    ? "polygon(0 0, calc(100% - 18px) 0, 100% 50%, calc(100% - 18px) 100%, 0 100%)"
    : "polygon(0 0, calc(100% - 18px) 0, 100% 50%, calc(100% - 18px) 100%, 0 100%, 18px 50%)";
}

/** 商談の受け渡し(握手)のイラスト。Loose Drawing の素材を色調整したもの */
export function BatonPass({ className }: { className?: string }) {
  return (
    <Image
      src="/illustrations/ld-1500-blue.webp"
      alt=""
      width={694}
      height={392}
      className={className}
    />
  );
}

/** アポコミの担当範囲を、営業プロセス全体の中で示す図 */
export function ApokomiProcess() {
  return (
    <figure aria-label="営業プロセスのうち、リスト作成・アプローチ・アポイント獲得をアポコミが担当し、商談・受注は御社が担当します">
      {/* ---------- PC: 横の矢羽根 ---------- */}
      <div className="hidden lg:block">
        {/* 担当の括り */}
        <div className="grid grid-cols-5 gap-1.5">
          <div className="col-span-3 mx-3 border-x-2 border-t-2 border-[#0046C8] pt-0 text-center">
            <span className="relative -top-3.5 bg-white px-3 text-sm font-black text-[#0037B9]">
              アポコミが担当
            </span>
          </div>
          <div className="col-span-2 mx-3 border-x-2 border-t-2 border-[#0B1B36] text-center">
            <span className="relative -top-3.5 bg-white px-3 text-sm font-black text-[#0B1B36]">
              御社が担当
            </span>
          </div>
        </div>
        <ol className="mt-1 grid grid-cols-5 gap-1.5">
          {steps.map((s, i) => (
            <li
              key={s.no}
              style={{ clipPath: chevron(i === 0), background: s.shade }}
              className={cn(
                "flex h-20 flex-col justify-center text-white",
                i === 0 ? "pl-5" : "pl-8",
              )}
            >
              <span className="text-[11px] font-bold tracking-[0.2em] opacity-80">
                STEP {s.no}
              </span>
              <span className="text-lg font-black">{s.name}</span>
            </li>
          ))}
        </ol>
        <div className="mt-4 grid grid-cols-5 gap-1.5 text-sm text-[#001432]/75">
          {steps.map((s, i) => (
            <div key={s.no} className={i === 0 ? "pl-5" : "pl-8"}>
              <p>{s.note}</p>
              {s.no === "02" ? (
                <p className="mt-2 text-xs leading-relaxed text-[#0037B9]">
                  {channelNames.join(" / ")}
                </p>
              ) : null}
            </div>
          ))}
        </div>
        {/* バトンパス */}
        <div className="relative mt-2 grid grid-cols-5">
          <div className="col-start-3 col-end-5 flex items-center justify-center gap-3 pl-16">
            <BatonPass className="w-40" />
            <p className="text-base font-black text-[#001432]">
              ここで<span className="text-[#0037B9]">商談をパス</span>
            </p>
          </div>
        </div>
      </div>

      {/* ---------- スマホ: 縦の流れ ---------- */}
      <div className="lg:hidden">
        {(["apokomi", "client"] as const).map((owner) => (
          <div key={owner}>
            {owner === "client" ? (
              <div className="my-4 flex items-center justify-center gap-2">
                <BatonPass className="w-24" />
                <p className="text-sm font-black">
                  ここで<span className="text-[#0037B9]">商談をパス</span>
                </p>
              </div>
            ) : null}
            <p
              className={cn(
                "mb-2 text-sm font-black",
                owner === "apokomi" ? "text-[#0037B9]" : "text-[#0B1B36]",
              )}
            >
              {owner === "apokomi" ? "アポコミが担当" : "御社が担当"}
            </p>
            <ol className="space-y-1.5">
              {steps
                .filter((s) => s.owner === owner)
                .map((s) => (
                  <li
                    key={s.no}
                    className="flex items-center gap-4 rounded-lg px-4 py-3 text-white"
                    style={{ background: s.shade }}
                  >
                    <span className="text-xs font-bold opacity-80">{s.no}</span>
                    <span>
                      <span className="block font-black">{s.name}</span>
                      <span className="block text-xs opacity-90">
                        {s.note}
                        {s.no === "02" ? `（${channelNames.join("・")}）` : ""}
                      </span>
                    </span>
                  </li>
                ))}
            </ol>
          </div>
        ))}
      </div>
    </figure>
  );
}
