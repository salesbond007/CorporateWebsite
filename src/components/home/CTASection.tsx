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
        <div className="relative overflow-hidden rounded-xl4 bg-brand-500 px-8 py-16 md:px-16 md:py-20">
          <div
            className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-white/15"
            aria-hidden="true"
          />
          <div
            className="absolute -bottom-24 -left-24 h-80 w-80 rounded-full bg-white/10"
            aria-hidden="true"
          />

          <div className="relative grid items-center gap-10 md:grid-cols-2">
            <div>
              <p className="text-xs md:text-sm font-extrabold uppercase tracking-[0.18em] text-white">
                Get in touch
              </p>
              <h2 className="mt-4 text-display-2 text-white leading-tight">
                事業成長について、
                <br />
                ご相談ください。
              </h2>
              <p className="mt-7 max-w-xl text-white/90 leading-relaxed font-medium">
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
                className="!text-white border-2 border-white/60 hover:!bg-white/15"
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
