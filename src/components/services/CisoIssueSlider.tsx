"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

/**
 * Bond AI セキュリティ顧問 LP「セキュリティ対策が当たり前の時代に」。
 * 3枚のカードが2秒ごとに横へ自動でスライドする。
 * マウスを乗せている間・キーボードで操作している間は止める。動きを減らす設定の端末では自動で動かさない。
 * 数字はすべて出典を確認済みのもの。
 */

type Slide = {
  title: string;
  lead: string;
  visual: { num: string; unit: string; label: string };
  facts: ReactNode[];
  source: string;
};

const W = "text-[#7A1F3D]";

const slides: Slide[] = [
  {
    title: "大手企業が、取引先のセキュリティを確認する時代に",
    lead: "大手企業は、取引先のセキュリティ体制を確認するようになっています。答えられないと、取引のチャンスを逃しかねません。",
    visual: {
      num: "84.4",
      unit: "%",
      label: "取引先のセキュリティ対策を確認している大手企業の発注担当者",
    },
    facts: [
      <>
        大手企業（従業員1,000人以上）で発注を担当する人の
        <b className={W}>84.4%</b>
        が、取引先のセキュリティ対策を確認しています
      </>,
      <>
        <b className={W}>71.6%</b>
        が、SCS評価制度の★を取引の条件にしたいと考えています
      </>,
    ],
    source: "出典：キヤノンITソリューションズ調査（2026年3月）",
  },
  {
    title: "被害は最大1億円。起きてからでは遅い",
    lead: "情報漏えいやサイバー攻撃は、一度起きると、お金と取引の両方を失います。",
    visual: {
      num: "1",
      unit: "億円",
      label: "インシデントがあった中小企業の被害額（最大）",
    },
    facts: [
      <>
        インシデントがあった中小企業の平均の被害額は
        <b className={W}>73万円</b>で、最大は<b className={W}>1億円</b>
        でした
      </>,
      <>
        ランサムウェアの被害では、<b className={W}>6割</b>が復旧に
        <b className={W}>1,000万円以上</b>かかっています
      </>,
      <>
        インシデントがあった中小企業の<b className={W}>約7割</b>
        で、取引先にも影響が出ています
      </>,
    ],
    source: "出典：IPA「2024年度 中小企業等実態調査」、警察庁（2026年上半期）",
  },
  {
    title: "対策している中小企業は、まだ少ない。今動けば差がつく",
    lead: "多くの中小企業は、まだセキュリティに投資していません。先に体制を整えた会社が、取引先に選ばれやすくなります。",
    visual: {
      num: "62.6",
      unit: "%",
      label: "過去3期にセキュリティ対策へ投資していない中小企業",
    },
    facts: [
      <>
        過去3期にセキュリティ対策へ投資していない中小企業は
        <b className={W}>62.6%</b>です
      </>,
      <>
        セキュリティの専門部署がある中小企業は<b className={W}>9.3%</b>
        です
      </>,
      <>
        取引先に求められた対策が「取引につながった」と答えた中小企業は、対策に投資している企業で
        <b className={W}>49.8%</b>、していない企業で
        <b className={W}>27.4%</b>でした
      </>,
    ],
    source: "出典：IPA「2024年度 中小企業等実態調査」",
  },
];

const INTERVAL = 2000;

function Arrow({ dir }: { dir: "prev" | "next" }) {
  return (
    <svg viewBox="0 0 20 20" className="h-5 w-5" fill="none" aria-hidden="true">
      <path
        d={dir === "prev" ? "M12 4l-6 6 6 6" : "M8 4l6 6-6 6"}
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function CisoIssueSlider() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(false);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  const go = useCallback(
    (i: number) => setIndex((i + slides.length) % slides.length),
    [],
  );

  useEffect(() => {
    if (paused || reduced) return;
    timer.current = setInterval(
      () => setIndex((i) => (i + 1) % slides.length),
      INTERVAL,
    );
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, [paused, reduced]);

  return (
    <div
      className="relative"
      role="region"
      aria-roledescription="カルーセル"
      aria-label="セキュリティ対策が当たり前の時代に"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div className="overflow-hidden">
        <ul
          className="flex transition-transform duration-700 ease-[cubic-bezier(.22,1,.36,1)]"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {slides.map((s, i) => (
            <li
              key={s.title}
              className="w-full min-w-0 shrink-0 px-1"
              aria-hidden={i !== index}
              aria-roledescription="スライド"
              aria-label={`${i + 1} / ${slides.length}`}
            >
              <article className="grid min-w-0 gap-6 rounded-2xl bg-white p-5 md:p-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-12 lg:p-10">
                {/* 左: 数字を大きく見せる */}
                <div className="flex flex-col justify-center rounded-xl bg-[#F5E9ED] px-6 py-8 text-center md:py-12">
                  <p className="font-black leading-none text-[#7A1F3D]">
                    <span className="text-[4.5rem] tracking-tight md:text-[6rem]">
                      {s.visual.num}
                    </span>
                    <span className="ml-1 text-2xl md:text-3xl">
                      {s.visual.unit}
                    </span>
                  </p>
                  <p className="mx-auto mt-4 max-w-[18rem] text-sm font-bold leading-relaxed text-[#5A142C]">
                    {s.visual.label}
                  </p>
                </div>
                {/* 右: 見出しと根拠 */}
                <div className="flex min-w-0 flex-col justify-center [overflow-wrap:anywhere]">
                  <p className="text-xs font-black tracking-[0.2em] text-[#7A1F3D]">
                    ISSUE {String(i + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-2 text-[clamp(1.25rem,2.2vw,1.75rem)] font-black leading-[1.5] text-[#1F1A1C]">
                    {s.title}
                  </h3>
                  <p className="mt-3 text-[15px] leading-[1.9] text-[#5C5458]">
                    {s.lead}
                  </p>
                  <ul className="mt-5 space-y-2.5 border-t border-[#EADFE2] pt-5">
                    {s.facts.map((f, k) => (
                      <li
                        key={k}
                        className="flex gap-2.5 text-[14px] font-bold leading-relaxed text-[#1F1A1C] md:text-[15px]"
                      >
                        <span
                          aria-hidden="true"
                          className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#7A1F3D]"
                        />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="mt-4 text-[11px] text-[#5C5458]/80">
                    {s.source}
                  </p>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>

      {/* 操作 */}
      <div className="mt-6 flex items-center justify-center gap-5">
        <button
          type="button"
          onClick={() => go(index - 1)}
          aria-label="前へ"
          className="grid h-10 w-10 place-items-center rounded-full bg-white text-[#7A1F3D] ring-1 ring-[#E6D9DD] transition hover:bg-[#7A1F3D] hover:text-white"
        >
          <Arrow dir="prev" />
        </button>
        <div className="flex gap-2.5">
          {slides.map((s, i) => (
            <button
              key={s.title}
              type="button"
              onClick={() => go(i)}
              aria-label={`${i + 1}枚目を表示`}
              aria-current={i === index}
              className={`h-2.5 rounded-full transition-all ${
                i === index ? "w-8 bg-[#7A1F3D]" : "w-2.5 bg-[#D9C3CA]"
              }`}
            />
          ))}
        </div>
        <button
          type="button"
          onClick={() => go(index + 1)}
          aria-label="次へ"
          className="grid h-10 w-10 place-items-center rounded-full bg-white text-[#7A1F3D] ring-1 ring-[#E6D9DD] transition hover:bg-[#7A1F3D] hover:text-white"
        >
          <Arrow dir="next" />
        </button>
      </div>
    </div>
  );
}
