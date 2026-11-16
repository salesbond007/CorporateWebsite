import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { SimpleContactForm } from "@/components/contact/SimpleContactForm";
import type { Locale } from "@/i18n/config";

export function ContactSection({ locale }: { locale: Locale }) {
  return (
    <div id="contact" className="scroll-mt-20">
      <PageHero
        eyebrow="Contact"
        title="お問い合わせ/無料相談"
        description="サービスに関するご相談、その他ご質問はこちらのフォームからお送りください。"
      />

      <section className="py-20 md:py-28">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-8 lg:col-start-3">
              <SimpleContactForm locale={locale} />
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
