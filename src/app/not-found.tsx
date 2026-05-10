import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="py-24 md:py-32">
      <Container className="text-center">
        <p className="font-display text-xs font-bold uppercase tracking-[0.2em] text-brand-600">
          404
        </p>
        <h1 className="mt-4 text-display-2">
          ページが見つかりません
        </h1>
        <p className="mx-auto mt-5 max-w-md text-ink-soft leading-relaxed">
          お探しのページは移動・削除された可能性があります。
        </p>
        <div className="mt-10 flex justify-center gap-3">
          <Button href="/" size="lg">
            トップへ戻る
          </Button>
          <Button href="/contact/business" size="lg" variant="secondary">
            お問い合わせ
          </Button>
        </div>
      </Container>
    </section>
  );
}
