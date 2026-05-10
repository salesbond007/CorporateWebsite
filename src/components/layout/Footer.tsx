import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Logo } from "./Logo";
import { navigation, footerLinks, services, site } from "@/lib/site";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-32 border-t border-ink-line bg-cream">
      <Container className="py-16 md:py-20">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Logo />
            <p className="mt-5 max-w-sm text-sm text-ink-soft leading-relaxed">
              TODO: フッター用のコーポレートメッセージをここに。会社のミッションやキャッチを1〜2行で。
            </p>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 lg:col-span-8">
            <FooterColumn title="サイトマップ">
              {navigation.map((n) => (
                <FooterLink key={n.href} href={n.href}>
                  {n.label}
                </FooterLink>
              ))}
            </FooterColumn>

            <FooterColumn title="サービス">
              {services.map((s) => (
                <FooterLink key={s.slug} href={s.href}>
                  {s.title}
                </FooterLink>
              ))}
            </FooterColumn>

            <FooterColumn title="お問い合わせ">
              {footerLinks.contact.map((c) => (
                <FooterLink key={c.href} href={c.href}>
                  {c.label}
                </FooterLink>
              ))}
            </FooterColumn>
          </div>
        </div>

        <div className="mt-16 flex flex-col-reverse gap-4 border-t border-ink-line pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-ink-muted">
            © {year} {site.name}. All rights reserved.
          </p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2 text-xs text-ink-muted">
            {footerLinks.legal.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="hover:text-ink">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </footer>
  );
}

function FooterColumn({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-ink-muted">
        {title}
      </h3>
      <ul className="mt-4 space-y-2.5 text-sm">{children}</ul>
    </div>
  );
}

function FooterLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <li>
      <Link href={href} className="text-ink-soft hover:text-ink">
        {children}
      </Link>
    </li>
  );
}
