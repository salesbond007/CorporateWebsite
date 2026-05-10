import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { localePath } from "@/i18n/path";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionary";

type Props = {
  locale: Locale;
  dict: Dictionary;
};

export function CTASection({ locale, dict }: Props) {
  return (
    <section className="py-24 md:py-32">
      <Container>
        <div className="relative overflow-hidden rounded-[2rem] bg-brand-500 px-8 py-16 md:px-16 md:py-20">
          <div
            className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-white/10"
            aria-hidden="true"
          />
          <div
            className="absolute -bottom-24 -left-24 h-80 w-80 rounded-full bg-white/10"
            aria-hidden="true"
          />

          <div className="relative grid items-center gap-10 md:grid-cols-2">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-white/20 px-3 py-1 text-xs font-semibold text-white">
                Get in touch
              </span>
              <h2 className="mt-5 text-display-2 text-white">
                TODO: 問い合わせ誘導の見出し
              </h2>
              <p className="mt-5 max-w-xl text-white/85 leading-relaxed">
                TODO: コンバージョンを促すリード文を2〜3行で。
              </p>
            </div>

            <div className="flex flex-col gap-3 md:items-end">
              <Button
                href={localePath("/contact", locale)}
                size="lg"
                className="bg-white !text-brand-600 hover:!bg-brand-50"
              >
                {dict.nav.contact}
              </Button>
              <Button
                href={localePath("/contact/professional", locale)}
                size="lg"
                variant="ghost"
                className="!text-white border border-white/40 hover:!bg-white/10"
              >
                {dict.nav.contactProfessional}
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
