"use client";

import { useEffect } from "react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="py-24 md:py-32">
      <Container className="text-center">
        <p className="font-display text-xs font-bold uppercase tracking-[0.2em] text-brand-600">
          Error
        </p>
        <h1 className="mt-4 text-display-2">
          問題が発生しました
        </h1>
        <p className="mx-auto mt-5 max-w-md text-ink-soft leading-relaxed">
          一時的な問題が発生した可能性があります。しばらくしてから再度お試しください。
        </p>
        {error.digest ? (
          <p className="mt-3 text-xs text-ink-muted">参照ID: {error.digest}</p>
        ) : null}
        <div className="mt-10 flex justify-center gap-3">
          <Button onClick={() => reset()} size="lg">
            もう一度試す
          </Button>
          <Button href="/" size="lg" variant="secondary">
            トップへ戻る
          </Button>
        </div>
      </Container>
    </section>
  );
}
