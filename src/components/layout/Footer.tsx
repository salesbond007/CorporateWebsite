import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Logo } from "./Logo";
import { navigation, services } from "@/lib/site";
import { localePath } from "@/i18n/path";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionary";

type Props = {
  locale: Locale;
  dict: Dictionary;
};

export function Footer({ locale, dict }: Props) {
  const year = new Date().getFullYear();

  const contactLinks = [
    { href: "/contact", label: dict.nav.contact },
    { href: "/contact/professional", label: dict.nav.contactProfessional },
  ];

  const legalLinks =
    locale === "ja"
      ? [
          { href: "/privacy", label: "プライバシーポリシー" },
          { href: "/terms", label: "利用規約" },
        ]
      : [
          { href: "/privacy", label: "Privacy Policy" },
          { href: "/terms", label: "Terms of Service" },
        ];

  return (
    <footer className="mt-32 border-t border-ink-line bg-cream">
      <Container className="py-16 md:py-20">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Logo locale={locale} dict={dict} />
          </div>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 lg:col-span-8">
            <FooterColumn title={dict.footer.sitemap}>
              {navigation.map((n) => (
                <FooterLink
                  key={n.href}
                  href={localePath(n.href, locale)}
                >
                  {dict.nav[n.key]}
                </FooterLink>
              ))}
            </FooterColumn>

            <FooterColumn title={dict.footer.services}>
              {services.map((s) => (
                <FooterLink
                  key={s.slug}
                  href={localePath(s.href, locale)}
                >
                  {s.title}
                </FooterLink>
              ))}
            </FooterColumn>

            <FooterColumn title={dict.footer.contact}>
              {contactLinks.map((c) => (
                <FooterLink
                  key={c.href}
                  href={localePath(c.href, locale)}
                >
                  {c.label}
                </FooterLink>
              ))}
            </FooterColumn>
          </div>
        </div>

        <div className="mt-16 flex flex-col-reverse gap-4 border-t border-ink-line pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-ink-muted">
            © {year} {dict.site.name}. {dict.footer.rights}
          </p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2 text-xs text-ink-muted">
            {legalLinks.map((l) => (
              <li key={l.href}>
                <Link href={localePath(l.href, locale)} className="hover:text-ink">
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
      <h3 className="text-xs font-extrabold uppercase tracking-[0.2em] text-brand-500">
        {title}
      </h3>
      <ul className="mt-4 space-y-2.5 text-sm font-bold">{children}</ul>
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
