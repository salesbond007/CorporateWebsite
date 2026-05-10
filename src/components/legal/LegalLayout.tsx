import { Container } from "@/components/ui/Container";

type Props = {
  children: React.ReactNode;
};

export function LegalLayout({ children }: Props) {
  return (
    <section className="py-20 md:py-28">
      <Container>
        <div className="prose-article mx-auto">{children}</div>
      </Container>
    </section>
  );
}
