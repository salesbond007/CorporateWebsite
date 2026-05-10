import { Container } from "./Container";

type Props = {
  eyebrow?: string;
  title: string;
  description?: string;
};

export function PageHero({ eyebrow, title, description }: Props) {
  return (
    <section className="relative overflow-hidden border-b-2 border-ink-line bg-cream">
      <div className="absolute inset-0 dot-bg opacity-60" aria-hidden="true" />
      <div
        className="absolute -top-32 -right-32 h-96 w-96 rounded-full bg-brand-200/50 blur-3xl"
        aria-hidden="true"
      />
      <Container className="relative py-20 md:py-28">
        {eyebrow ? (
          <p className="section-label !text-brand-500">{eyebrow}</p>
        ) : null}
        <h1 className="mt-4 text-display-2 text-ink max-w-4xl font-black">
          {title}
        </h1>
        {description ? (
          <p className="mt-6 max-w-2xl text-base md:text-lg text-ink font-medium leading-relaxed">
            {description}
          </p>
        ) : null}
      </Container>
    </section>
  );
}
