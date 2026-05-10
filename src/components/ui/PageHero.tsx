import { Container } from "./Container";

type Props = {
  eyebrow?: string;
  title: string;
  description?: string;
};

export function PageHero({ eyebrow, title, description }: Props) {
  return (
    <section className="relative overflow-hidden border-b border-ink-line bg-cream">
      <div className="absolute inset-0 grid-bg opacity-60" aria-hidden="true" />
      <div
        className="absolute -top-32 -right-32 h-96 w-96 rounded-full bg-brand-200/40 blur-3xl"
        aria-hidden="true"
      />
      <Container className="relative py-20 md:py-28">
        {eyebrow ? <span className="eyebrow">{eyebrow}</span> : null}
        <h1 className="mt-5 text-display-1 text-ink max-w-4xl">{title}</h1>
        {description ? (
          <p className="mt-6 max-w-2xl text-base md:text-lg text-ink-soft leading-relaxed">
            {description}
          </p>
        ) : null}
      </Container>
    </section>
  );
}
