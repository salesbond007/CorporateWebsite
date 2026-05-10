import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Sparkle, Squiggle } from "@/components/ui/Doodle";
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
        <div className="relative overflow-hidden rounded-xl4 bg-brand-500 px-8 py-16 md:px-16 md:py-20">
          <div
            className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-white/15"
            aria-hidden="true"
          />
          <div
            className="absolute -bottom-24 -left-24 h-80 w-80 rounded-full bg-white/10"
            aria-hidden="true"
          />
          <Sparkle className="absolute right-[10%] top-[15%] h-8 w-8 text-white/70 animate-wiggle" />
          <Sparkle className="absolute left-[15%] bottom-[20%] h-6 w-6 text-white/50" />

          <div className="relative grid items-center gap-10 md:grid-cols-2">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-white/25 px-4 py-1.5 font-handwritten text-sm font-semibold text-white">
                ✦ Get in touch
              </span>
              <h2 className="mt-5 text-display-2 text-white leading-tight">
                事業成長について、
                <span className="relative inline-block">
                  ご相談
                  <Squiggle className="absolute -bottom-3 left-0 h-3 w-full text-white" />
                </span>
                ください。
              </h2>
              <p className="mt-7 max-w-xl text-white/90 leading-relaxed">
                サービスの詳細・お見積もり・導入事例など、貴社の課題に合わせてご提案します。
                プロ人材としてご活躍いただける方も歓迎しています。
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
                className="!text-white border-2 border-white/50 hover:!bg-white/15"
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
