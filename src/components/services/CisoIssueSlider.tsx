"use client";

import Image from "next/image";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

/**
 * Bond AI セキュリティ顧問 LP「セキュリティ対策が当たり前の時代に」。
 * 3枚のカードが2秒ごとに横へ自動でスライドし、最後の次は1枚目へ途切れずにつながる(無限ループ)。
 * マウスを乗せている間・キーボードで操作している間は止める。動きを減らす設定の端末では自動で動かさない。
 * 数字はすべて出典を確認済みのもの。
 */

type Slide = {
  title: string;
  lead: string;
  image: string;
  alt: string;
  facts: ReactNode[];
  source: string;
};

const W = "text-[#7A1F3D]";

const slides: Slide[] = [
  {
    title: "大手企業が、取引先のセキュリティを確認する時代に",
    lead: "大手企業は、取引先のセキュリティ体制を確認するようになっています。答えられないと、取引のチャンスを逃しかねません。",
    image: "/photos/ciso/issue-1.webp",
    alt: "取引先のセキュリティ対策を確認している大手企業の発注担当者は84.4%、確認していないのは15.6%を示す円グラフ",
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
    image: "/photos/ciso/issue-2.webp",
    alt: "攻撃を受けた会社から、取引先の大手企業にまで影響が広がるイメージ",
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
    image: "/photos/ciso/issue-3.webp",
    alt: "セキュリティ対策に投資していない中小企業は62.6%。今、対策する企業が優位に立つイメージ",
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
  // 最後の後ろに1枚目の複製を置き、そこまで進んだら一瞬で1枚目に戻して、途切れずに一方向へ回し続ける
  const loop = [...slides, slides[0]];
  const [pos, setPos] = useState(0);
  const [animate, setAnimate] = useState(true);
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(false);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);
  const current = pos % slides.length;

  useEffect(() => {
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  const next = useCallback(() => {
    setAnimate(true);
    setPos((p) => (p >= slides.length ? 1 : p + 1));
  }, []);

  const prev = useCallback(() => {
    if (pos === 0) {
      // 複製(=1枚目)の位置へ瞬間移動してから、ひとつ前(3枚目)へ動かす
      setAnimate(false);
      setPos(slides.length);
      requestAnimationFrame(() =>
        requestAnimationFrame(() => {
          setAnimate(true);
          setPos(slides.length - 1);
        }),
      );
      return;
    }
    setAnimate(true);
    setPos(pos - 1);
  }, [pos]);

  const go = useCallback((i: number) => {
    setAnimate(true);
    setPos(i);
  }, []);

  // 複製まで来たら、アニメーションなしで1枚目へ戻す
  const onEnd = useCallback(() => {
    if (pos === slides.length) {
      setAnimate(false);
      setPos(0);
    }
  }, [pos]);

  useEffect(() => {
    if (!animate) {
      const id = requestAnimationFrame(() =>
        requestAnimationFrame(() => setAnimate(true)),
      );
      return () => cancelAnimationFrame(id);
    }
  }, [animate]);

  useEffect(() => {
    if (paused || reduced) return;
    timer.current = setInterval(next, INTERVAL);
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, [paused, reduced, next]);

  const arrowClass =
    "absolute top-1/2 z-10 h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-white/95 text-[#7A1F3D] shadow-[0_8px_24px_-10px_rgba(60,15,25,0.5)] ring-1 ring-[#E6D9DD] transition hover:bg-[#7A1F3D] hover:text-white hidden md:grid md:opacity-0 md:group-hover/slider:opacity-100 md:focus-visible:opacity-100";

  return (
    <div
      className="group/slider relative"
      role="region"
      aria-roledescription="カルーセル"
      aria-label="セキュリティ対策が必須の時代に"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div className="overflow-hidden rounded-2xl">
        <ul
          className={`flex ${animate ? "transition-transform duration-700 ease-[cubic-bezier(.22,1,.36,1)]" : ""}`}
          style={{ transform: `translateX(-${pos * 100}%)` }}
          onTransitionEnd={onEnd}
        >
          {loop.map((s, i) => (
            <li
              key={`${s.title}-${i}`}
              className="w-full min-w-0 shrink-0 px-1"
              aria-hidden={i !== pos}
              aria-roledescription="スライド"
              aria-label={`${(i % slides.length) + 1} / ${slides.length}`}
            >
              <article className="grid min-w-0 items-center gap-6 rounded-2xl bg-white p-5 md:p-8 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-12 lg:p-10">
                {/* 左: 画像 */}
                <div className="relative mx-auto aspect-square w-full max-w-[22rem] overflow-hidden rounded-xl bg-[#F5E9ED] lg:max-w-none">
                  <Image
                    src={s.image}
                    alt={s.alt}
                    fill
                    sizes="(max-width:1024px) 90vw, 420px"
                    className="object-cover"
                  />
                </div>
                {/* 右: 見出しと根拠 */}
                <div className="flex min-w-0 flex-col justify-center [overflow-wrap:anywhere]">
                  <p className="text-xs font-black tracking-[0.2em] text-[#7A1F3D]">
                    ISSUE {String((i % slides.length) + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-2 text-[clamp(1.25rem,2.2vw,1.75rem)] font-black leading-[1.5] text-[#1F1A1C] lg:[word-break:auto-phrase]">
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

      {/* 左右の矢印(PCはカーソルを当てると出る) */}
      <button
        type="button"
        onClick={prev}
        aria-label="前へ"
        className={`${arrowClass} -left-2 md:left-3`}
      >
        <Arrow dir="prev" />
      </button>
      <button
        type="button"
        onClick={next}
        aria-label="次へ"
        className={`${arrowClass} -right-2 md:right-3`}
      >
        <Arrow dir="next" />
      </button>

      {/* 何枚目か */}
      <div className="mt-6 flex items-center justify-center gap-4">
        <button
          type="button"
          onClick={prev}
          aria-label="前へ"
          className="grid h-10 w-10 place-items-center rounded-full bg-white text-[#7A1F3D] ring-1 ring-[#E6D9DD] md:hidden"
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
              aria-current={i === current}
              className={`h-2.5 rounded-full transition-all ${
                i === current ? "w-8 bg-[#7A1F3D]" : "w-2.5 bg-[#D9C3CA]"
              }`}
            />
          ))}
        </div>
        <button
          type="button"
          onClick={next}
          aria-label="次へ"
          className="grid h-10 w-10 place-items-center rounded-full bg-white text-[#7A1F3D] ring-1 ring-[#E6D9DD] md:hidden"
        >
          <Arrow dir="next" />
        </button>
      </div>
    </div>
  );
}
