import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { localePath } from "@/i18n/path";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionary";

type Props = {
  locale: Locale;
  dict: Dictionary;
};

/**
 * 背景に敷く3枚の画像。/public/hero/slide-1.png 〜 slide-3.png を置き換えるだけで
 * 差し替え可能。4秒ごとに永続的にクロスフェードし(hero-crossfade)、
 * 全体はゆっくりズームし続ける(ken-burns)。tailwind.config.ts 参照。
 */
const HERO_SLIDES = ["/hero/slide-1.png", "/hero/slide-2.png", "/hero/slide-3.png"];

export function Hero({ locale, dict }: Props) {
  return (
    <section className="relative isolate flex min-h-[600px] items-center overflow-hidden bg-ink md:min-h-[calc(100svh-5rem)]">
      {/* 背景: 3枚をクロスフェード + ゆっくりズーム */}
      <div className="absolute inset-0 animate-ken-burns" aria-hidden="true">
        {HERO_SLIDES.map((src, i) => (
          <Image
            key={src}
            src={src}
            alt=""
            fill
            priority={i === 0}
            sizes="100vw"
            className="animate-hero-crossfade object-cover"
            style={{ animationDelay: `${i * 4}s` }}
          />
        ))}
      </div>

      {/* オーバーレイ: ブランド色の被せ / 左側のスクリム / 下部グラデーション */}
      <div className="absolute inset-0 bg-brand-900/40 mix-blend-multiply" aria-hidden="true" />
      <div
        className="absolute inset-0 bg-[linear-gradient(to_right,rgba(29,5,11,0.88)_0%,rgba(29,5,11,0.62)_40%,rgba(29,5,11,0.15)_70%,rgba(29,5,11,0)_90%)]"
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" aria-hidden="true" />

      {/* ゆっくり漂う光のにじみ */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 top-1/4 h-[28rem] w-[28rem] animate-blob rounded-full bg-brand-500/35 blur-[120px]"
      />

      {/* 細いグリッド線(奥行きの演出) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.07] [background-image:linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] [background-size:96px_96px] [mask-image:linear-gradient(to_right,black,transparent_70%)]"
      />

      <Container className="relative py-20 md:py-32">
        <p
          className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.18em] text-brand-200 animate-fade-up md:gap-4 md:text-xs md:tracking-[0.35em]"
          style={{ animationDelay: "0.1s" }}
        >
          <span aria-hidden="true" className="h-px w-8 origin-left animate-grow-x bg-brand-200 md:w-12" />
          Offense &amp; Defense, by Professionals
        </p>

        <h1 className="mt-6 text-[clamp(1.25rem,4.2vw,3.75rem)] font-black leading-[1.2] tracking-tight text-white">
          <span className="line-mask">
            <span style={{ animationDelay: "0.25s" }}>
              {dict.hero.line1Prefix}
              <span className="text-shimmer">{dict.hero.line1Highlight}</span>
              {dict.hero.line1Suffix}
            </span>
          </span>
          <span className="line-mask">
            <span style={{ animationDelay: "0.4s" }}>
              {dict.hero.line2Prefix}
              <span className="text-shimmer">{dict.hero.line2Highlight}</span>
              {dict.hero.line2Suffix}
            </span>
          </span>
        </h1>
        <p
          className="mt-6 text-base font-bold tracking-[0.06em] text-white/85 animate-fade-up md:text-xl"
          style={{ animationDelay: "0.65s" }}
        >
          {dict.hero.lead}
        </p>

        <div
          className="mt-10 flex flex-wrap gap-3 animate-fade-up"
          style={{ animationDelay: "0.85s" }}
        >
          <Button href={`${localePath("/", locale)}#services`} size="lg">
            {dict.buttons.viewServices}
          </Button>
          <Button
            href={localePath("/contact", locale)}
            size="lg"
            variant="secondary"
            className="!border-white/70 !bg-white/10 !text-white backdrop-blur-sm hover:!bg-white hover:!text-ink"
          >
            {dict.buttons.contact}
          </Button>
        </div>
      </Container>

      {/* 縦書きのサイドラベル */}
      <p
        aria-hidden="true"
        className="absolute right-6 top-1/2 hidden -translate-y-1/2 rotate-90 text-[11px] font-bold uppercase tracking-[0.4em] text-white/50 lg:block"
      >
        Sales Bond Co., Ltd. — Since 2024
      </p>

      {/* スクロールインジケーター */}
      <div
        aria-hidden="true"
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-3 md:flex"
      >
        <span className="text-[10px] font-bold uppercase tracking-[0.35em] text-white/70">Scroll</span>
        <span className="relative h-14 w-px overflow-hidden bg-white/25">
          <span className="absolute inset-x-0 top-0 h-1/3 animate-scroll-dot bg-white" />
        </span>
      </div>
    </section>
  );
}
