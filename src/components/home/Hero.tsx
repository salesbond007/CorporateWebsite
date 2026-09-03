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

      {/*
       * オーバーレイは3枚重ね:
       * 1. ワインレッドの色被せ(multiply) — 写真全体をブランドカラーに馴染ませる「かすみ」
       * 2. 左側の濃いスクリム — コピー部分の可読性を確保(写真が明るく情報量が多いため強めに)
       * 3. 下部の淡いグラデーション — ボタン周りを浮かせて地面に馴染ませる
       */}
      <div
        className="absolute inset-0 bg-brand-900/45 mix-blend-multiply"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 bg-[linear-gradient(to_right,rgba(29,5,11,0.92)_0%,rgba(29,5,11,0.72)_38%,rgba(29,5,11,0.25)_65%,rgba(29,5,11,0)_85%)]"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 bg-gradient-to-t from-ink/55 via-transparent to-transparent"
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
