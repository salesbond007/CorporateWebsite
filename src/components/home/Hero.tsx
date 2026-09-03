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
 * 背景に敷く3枚の画像。/public/hero/slide-1.jpg 〜 slide-3.jpg を置き換えるだけで
 * 差し替え可能。約6秒ごとにゆっくりクロスフェードする(hero-crossfade アニメーション、
 * tailwind.config.ts 参照)。
 */
const HERO_SLIDES = ["/hero/slide-1.jpg", "/hero/slide-2.jpg", "/hero/slide-3.jpg"];

export function Hero({ locale, dict }: Props) {
  return (
    <section className="relative isolate flex min-h-[640px] items-center overflow-hidden bg-ink md:min-h-[760px]">
      {/* 背景: 3枚をクロスフェードでゆっくり切り替え */}
      <div className="absolute inset-0" aria-hidden="true">
        {HERO_SLIDES.map((src, i) => (
          <Image
            key={src}
            src={src}
            alt=""
            fill
            priority={i === 0}
            sizes="100vw"
            className="animate-hero-crossfade object-cover"
            style={{ animationDelay: `${i * 6}s` }}
          />
        ))}
      </div>

      {/* ブランドカラー(ワインレッド)のグラデーションオーバーレイ: テキストの視認性を確保 */}
      <div
        className="absolute inset-0 bg-gradient-to-r from-brand-900/85 via-brand-900/55 to-brand-900/20"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent"
        aria-hidden="true"
      />

      <Container className="relative py-24 md:py-32">
        <div className="max-w-2xl animate-fade-up">
          <h1 className="text-display-2 text-white font-extrabold leading-[1.1]">
            {dict.hero.titleLine1}
            <br />
            <span className="text-brand-200">{dict.hero.titleHighlight}</span>
            {dict.hero.titleSuffix}
          </h1>
          <div className="mt-10 flex flex-wrap gap-3">
            <Button href={localePath("/services", locale)} size="lg">
              {dict.buttons.viewServices}
            </Button>
            <Button
              href={localePath("/contact", locale)}
              size="lg"
              variant="secondary"
              className="!border-white !text-white hover:!bg-white hover:!text-ink"
            >
              {dict.buttons.contact}
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
