import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Illustration } from "@/components/ui/Illustration";
import { DotsDecoration, Sparkle, Squiggle } from "@/components/ui/Doodle";
import { localePath } from "@/i18n/path";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionary";

type Props = {
  locale: Locale;
  dict: Dictionary;
};

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

      {/* 装飾 */}
      <DotsDecoration
        className="absolute left-[6%] top-[20%] h-12 w-12 hidden md:block animate-float-y"
      />
      <Sparkle
        className="absolute right-[10%] top-[18%] h-6 w-6 hidden md:block text-brand-400 animate-wiggle"
      />
      <Sparkle
        className="absolute left-[42%] bottom-[14%] h-4 w-4 hidden md:block text-brand-300"
      />

      <Container className="relative pt-20 pb-24 md:pt-28 md:pb-32 lg:pt-32 lg:pb-40">
        <div className="grid items-center gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7 animate-fade-up">
            <span className="eyebrow">{dict.hero.eyebrow}</span>
            <h1 className="mt-6 text-display-1 text-ink leading-[1.15]">
              {dict.hero.titleLine1}
              <span className="relative inline-block text-brand-500">
                {dict.hero.titleHighlight}
                <Squiggle className="absolute -bottom-3 left-0 h-3 w-full" />
              </span>
              {dict.hero.titleSuffix}
            </h1>
            <p className="mt-8 max-w-xl text-base md:text-lg text-ink-soft leading-[1.95]">
              {dict.hero.subtitle}
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
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
                className="absolute -inset-4 rounded-xl4 bg-brand-100/60 -rotate-2"
                aria-hidden="true"
              />
              <div className="relative rounded-xl4 bg-white p-8 shadow-soft">
                <Illustration variant="abstract" />
              </div>
              <div className="absolute -bottom-4 -left-4 rounded-full bg-brand-500 px-5 py-3 font-handwritten text-sm font-semibold text-white shadow-card hidden md:block">
                Sales Bond
              </div>
              <Sparkle className="absolute -top-3 -right-2 h-8 w-8 animate-wiggle" />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
