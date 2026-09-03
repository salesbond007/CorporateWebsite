"use client";

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
  const footerBg = "bg-brand-500";

  const contactLinks = [
    { href: "/contact", label: dict.nav.contact },
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
    <footer className={`mt-32 ${footerBg} text-white`}>
      <Container className="py-16 md:py-20">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Logo locale={locale} dict={dict} variant="card" size="h-12 md:h-14" />
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
                  href={`${localePath("/services", locale)}#${s.slug}`}
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

        <div className="mt-16 flex flex-col-reverse gap-4 border-t border-white/30 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-white/80">
            © {year} {dict.site.name}. {dict.footer.rights}
          </p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2 text-xs text-white/80">
            {legalLinks.map((l) => (
              <li key={l.href}>
                <Link href={localePath(l.href, locale)} className="hover:text-white">
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
      <h3 className="text-sm font-extrabold uppercase tracking-[0.2em] text-white">
        {title}
      </h3>
      <div className="mt-2 h-[3px] w-10 rounded-full bg-white/90" aria-hidden="true" />
      <ul className="mt-5 space-y-2.5 text-sm font-bold">{children}</ul>
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
      <Link href={href} className="text-white/90 hover:text-white">
        {children}
      </Link>
    </li>
  );
}
