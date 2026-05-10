import { Container } from "@/components/ui/Container";

export default function ArticleLoading() {
  return (
    <article>
      <header className="border-b border-ink-line bg-cream">
        <Container className="py-16 md:py-24">
          <div className="h-3 w-40 rounded bg-white/80 animate-pulse" />
          <div className="mt-6 h-10 w-3/4 rounded bg-white/80 animate-pulse" />
          <div className="mt-3 h-10 w-1/2 rounded bg-white/80 animate-pulse" />
        </Container>
      </header>
      <Container className="py-16 md:py-24">
        <div className="prose-article mx-auto space-y-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="h-4 rounded bg-cream animate-pulse"
              style={{ width: `${60 + ((i * 7) % 30)}%` }}
            />
          ))}
        </div>
      </Container>
    </article>
  );
}
