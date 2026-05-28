import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Illustration } from "@/components/ui/Illustration";
import { localePath } from "@/i18n/path";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionary";

type Props = {
  locale: Locale;
  dict: Dictionary;
};

/**
 * Hero の右側のメインビジュアル。
 * /public/hero.png を置けばこちらが使われる。無ければ SVG にフォールバック。
 * パスを変えたい場合はこの定数だけ書き換えれば OK。
 */
const HERO_IMAGE = "/hero.jpg";

export function Hero({ locale, dict }: Props) {
  return (
    <section className="relative overflow-hidden bg-cream">
      <div className="absolute inset-0 dot-bg opacity-70" aria-hidden="true" />
      <div
        className="absolute -top-40 right-[-10%] h-[480px] w-[480px] rounded-full bg-brand-200/50 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-32 left-[-10%] h-[420px] w-[420px] rounded-full bg-brand-100/70 blur-3xl"
        aria-hidden="true"
      />

      <Container className="relative pt-20 pb-24 md:pt-28 md:pb-32 lg:pt-32 lg:pb-40">
        <div className="grid items-center gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7 animate-fade-up">
            <h1 className="text-display-2 text-ink font-extrabold leading-[1.1]">
              {dict.hero.titleLine1}
              <br />
              <span className="text-brand-500">
                {dict.hero.titleHighlight}
              </span>
              {dict.hero.titleSuffix}
            </h1>
            <p className="mt-8 max-w-xl text-base md:text-lg text-ink-soft font-medium leading-[1.95]">
              {dict.hero.subtitlePrefix}
              <span className="font-black text-ink underline decoration-brand-500 decoration-[3px] underline-offset-4">
                {dict.hero.subtitleHighlight}
              </span>
              {dict.hero.subtitleSuffix}
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-3 md:justify-start">
              <Button href={localePath("/services", locale)} size="lg">
                {dict.buttons.viewServices}
              </Button>
              <Button
                href={localePath("/contact", locale)}
                size="lg"
                variant="secondary"
              >
                {dict.buttons.contact}
              </Button>
            </div>
          </div>

          <div className="lg:col-span-5 animate-fade-up [animation-delay:120ms]">
            <div className="relative mx-auto max-w-md">
              <div
                className="absolute -inset-4 rounded-xl4 bg-brand-200/60 -rotate-3"
                aria-hidden="true"
              />
              <div className="relative rounded-xl4 bg-white p-6 md:p-8 shadow-soft overflow-hidden">
                <Illustration src={HERO_IMAGE} variant="abstract" alt="" />
              </div>
              <div className="absolute -bottom-5 -left-5 rounded-none bg-brand-500 px-6 py-3 text-sm font-black text-white shadow-card">
                Sales Bond
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
