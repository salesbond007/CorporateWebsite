import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Illustration } from "@/components/ui/Illustration";
import { localePath } from "@/i18n/path";
import { services } from "@/lib/site";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionary";

type Props = {
  locale: Locale;
  dict: Dictionary;
};

export function Hero({ locale, dict }: Props) {
  return (
    <section className="relative overflow-hidden bg-cream">
      <div className="absolute inset-0 grid-bg opacity-50" aria-hidden="true" />
      <div
        className="absolute -top-40 right-[-10%] h-[480px] w-[480px] rounded-full bg-brand-200/40 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-32 left-[-10%] h-[420px] w-[420px] rounded-full bg-brand-100/60 blur-3xl"
        aria-hidden="true"
      />

      <Container className="relative pt-20 pb-24 md:pt-28 md:pb-32 lg:pt-32 lg:pb-40">
        <div className="grid items-center gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7 animate-fade-up">
            <span className="eyebrow">{dict.hero.eyebrow}</span>
            <h1 className="mt-6 text-display-1 text-ink">
              {dict.hero.titleLine1}
              <br />
              <span className="text-brand-500">{dict.hero.titleHighlight}</span>
              {dict.hero.titleSuffix}
            </h1>
            <p className="mt-7 max-w-xl text-base md:text-lg text-ink-soft leading-relaxed">
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

            <ul className="mt-14 grid grid-cols-3 gap-4 max-w-xl">
              {services.map((s) => (
                <li
                  key={s.slug}
                  className="rounded-xl border border-ink-line bg-white/60 p-4 backdrop-blur-sm"
                >
                  <p className="font-display text-xs font-bold text-brand-500">
                    {s.number}
                  </p>
                  <p className="mt-1 text-sm font-bold text-ink leading-tight">
                    {s.title}
                  </p>
                  <p className="mt-1 text-[11px] text-ink-muted leading-tight">
                    {s.subtitle}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-5 animate-fade-up [animation-delay:120ms]">
            <div className="relative mx-auto max-w-md">
              <div className="absolute -inset-6 rounded-[2rem] bg-white shadow-card" aria-hidden="true" />
              <div className="relative rounded-[2rem] bg-white p-6 shadow-soft">
                <Illustration variant="abstract" />
              </div>
              <div className="absolute -bottom-6 -left-6 rounded-2xl bg-brand-500 p-4 text-white shadow-card hidden md:block">
                <p className="text-xs font-semibold uppercase tracking-wider opacity-80">
                  Sales Bond
                </p>
                <p className="mt-1 font-display text-base font-bold">
                  営業を、支援する。
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
