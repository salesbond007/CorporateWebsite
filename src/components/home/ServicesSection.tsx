import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionTitle } from "@/components/ui/SectionTitle";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionary";
import { serviceCategories } from "@/lib/site";
import { cn } from "@/lib/cn";

type Props = {
  locale: Locale;
  dict: Dictionary;
};

const bySlug = Object.fromEntries(
  serviceCategories.flatMap((c) => c.services).map((s) => [s.slug, s]),
);

type Layer = {
  /** ピラミッド内に表示するラベル */
  label: string;
  en: string;
  title: string;
  summary: string;
  /** 段の塗り・文字色 */
  fill: string;
  text: string;
  /** 右側の丸印の色 */
  dot: string;
};

/**
 * 上から 成長(頂点) / 攻め / 守り(土台) の3段。
 * 「守りが固まるから、迷わず攻められる」を、土台から積み上がる図で表現する。
 */
const layers: Layer[] = [
  {
    label: "成長",
    en: "Growth",
    title: "企業の持続的な成長",
    summary: "守りを固め、攻めに集中する。その積み重ねが、企業の次の成長をつくります。",
    fill: "bg-brand-900",
    text: "text-white",
    dot: "bg-brand-900",
  },
  {
    label: "攻め",
    en: "Offense",
    title: bySlug["new-business-development"]?.title ?? "新規開拓支援",
    summary: bySlug["new-business-development"]?.summary ?? "",
    fill: "bg-brand-500",
    text: "text-white",
    dot: "bg-brand-500",
  },
  {
    label: "守り",
    en: "Defense",
    title: bySlug["ai-security"]?.title ?? "AIセキュリティ対策",
    summary: bySlug["ai-security"]?.summary ?? "",
    fill: "bg-brand-200",
    text: "text-brand-900",
    dot: "bg-brand-300",
  },
];

const ROWS = layers.length;

/** k段目(0=頂点)の台形を、全体で1つの三角形になるよう切り出す */
function slicePolygon(k: number) {
  const top = k / ROWS;
  const bottom = (k + 1) / ROWS;
  const l = (w: number) => `${((1 - w) / 2) * 100}%`;
  const r = (w: number) => `${((1 + w) / 2) * 100}%`;
  return `polygon(${l(top)} 0, ${r(top)} 0, ${r(bottom)} 100%, ${l(bottom)} 100%)`;
}

/** 段の右辺の中点(引き出し線の起点)。左カラム幅に対する割合 */
function edgeX(k: number) {
  return ((1 + (k + 0.5) / ROWS) / 2) * 100;
}

/** 下の段から順に積み上がるよう、表示の遅延を逆順にする */
const delayOf = (k: number) => (ROWS - 1 - k) * 220;

function Slice({ k, layer }: { k: number; layer: Layer }) {
  return (
    <div
      style={{ clipPath: slicePolygon(k), transitionDelay: `${delayOf(k)}ms` }}
      className={cn(
        "flex h-[calc(100%-6px)] translate-y-6 items-end justify-center opacity-0 transition-all duration-1000 ease-expo group-hover/row:brightness-110 group-data-[visible=true]/reveal:translate-y-0 group-data-[visible=true]/reveal:opacity-100",
        layer.fill,
      )}
    >
      <span
        className={cn(
          "pb-[12%] pl-[0.3em] text-sm font-bold tracking-[0.3em] md:text-base",
          k === 0 && "pb-[8%] text-xs md:text-sm",
          layer.text,
        )}
      >
        {layer.label}
      </span>
    </div>
  );
}

export function ServicesSection(_props: Props) {
  return (
    <section
      id="services"
      className="relative isolate scroll-mt-20 overflow-hidden bg-cream py-20 md:py-32"
    >
      <div aria-hidden="true" className="dot-bg-soft absolute inset-0 -z-10" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 -top-24 -z-10 h-96 w-96 animate-blob rounded-full bg-brand-200/40 blur-[110px]"
      />

      <Container>
        <SectionTitle en="Services" ja="サービス" />

        {/* PC・タブレット: 各段から右へ引き出し線を伸ばして説明を並べる */}
        <Reveal variant="none" className="mt-14 hidden md:block">
          <ol className="mx-auto max-w-5xl">
            {layers.map((layer, k) => (
              <li
                key={layer.label}
                className="group/row grid h-36 grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] gap-12 lg:h-40"
              >
                <div className="relative">
                  <Slice k={k} layer={layer} />
                  {/* 引き出し線: 段の右辺から右カラムの丸印まで伸びる */}
                  <span
                    aria-hidden="true"
                    style={{
                      left: `${edgeX(k)}%`,
                      transitionDelay: `${delayOf(k) + 500}ms`,
                    }}
                    className="absolute -right-12 top-1/2 h-px origin-left scale-x-0 bg-ink/25 transition-transform duration-700 ease-expo group-hover/row:bg-brand-500 group-data-[visible=true]/reveal:scale-x-100"
                  />
                </div>

                <div
                  style={{ transitionDelay: `${delayOf(k) + 700}ms` }}
                  className="relative flex translate-x-4 flex-col justify-center pl-6 opacity-0 transition-all duration-700 ease-expo group-data-[visible=true]/reveal:translate-x-0 group-data-[visible=true]/reveal:opacity-100"
                >
                  <span
                    aria-hidden="true"
                    className={cn(
                      "absolute -left-1.5 top-1/2 h-3 w-3 -translate-y-1/2 rounded-full ring-4 ring-cream transition-transform duration-300 group-hover/row:scale-150",
                      layer.dot,
                    )}
                  />
                  <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-brand-500">
                    {layer.en} ／ {layer.label}
                  </p>
                  <h3 className="mt-1.5 text-xl font-black text-ink lg:text-2xl">{layer.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-soft">{layer.summary}</p>
                </div>
              </li>
            ))}
          </ol>
        </Reveal>

        {/* スマホ: ピラミッドを上に、説明を下に並べる */}
        <Reveal variant="none" className="mt-10 md:hidden">
          <div className="mx-auto w-full max-w-[18rem]">
            {layers.map((layer, k) => (
              <div key={layer.label} className="h-24">
                <Slice k={k} layer={layer} />
              </div>
            ))}
          </div>
          <ol className="mt-10 space-y-6">
            {layers.map((layer, k) => (
              <li
                key={layer.label}
                style={{ transitionDelay: `${delayOf(k) + 500}ms` }}
                className="flex translate-y-3 gap-4 opacity-0 transition-all duration-700 ease-expo group-data-[visible=true]/reveal:translate-y-0 group-data-[visible=true]/reveal:opacity-100"
              >
                <span aria-hidden="true" className={cn("mt-1.5 h-3 w-3 shrink-0 rounded-full", layer.dot)} />
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-brand-500">
                    {layer.en} ／ {layer.label}
                  </p>
                  <h3 className="mt-1 text-lg font-black text-ink">{layer.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">{layer.summary}</p>
                </div>
              </li>
            ))}
          </ol>
        </Reveal>
      </Container>
    </section>
  );
}
