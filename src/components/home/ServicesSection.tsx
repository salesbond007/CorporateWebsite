import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { services } from "@/lib/site";

export function ServicesSection() {
  return (
    <section className="py-24 md:py-32">
      <Container>
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            eyebrow="Services"
            title="提供する3つのサービス"
            description="TODO: サービス全体のイントロを2〜3行で。"
          />
          <Link href="/services" className="link-arrow shrink-0">
            すべてのサービス
          </Link>
        </div>

        <ul className="mt-14 grid gap-6 md:grid-cols-3">
          {services.map((s) => (
            <li key={s.slug}>
              <Link
                href={s.href}
                className="group block h-full rounded-xl2 border border-ink-line bg-white p-8 transition-all duration-300 hover:-translate-y-1 hover:border-brand-300 hover:shadow-card"
              >
                <div className="flex items-start justify-between">
                  <span className="font-display text-sm font-bold text-brand-500">
                    {s.number}
                  </span>
                  <span
                    className="grid h-10 w-10 place-items-center rounded-full border border-ink-line text-ink-muted transition-all group-hover:border-brand-500 group-hover:bg-brand-500 group-hover:text-white"
                    aria-hidden="true"
                  >
                    →
                  </span>
                </div>
                <h3 className="mt-12 text-xl font-bold text-ink">{s.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-soft">
                  {s.summary}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
