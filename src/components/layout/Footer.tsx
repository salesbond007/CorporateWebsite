"use client";

import Link from "next/link";
import { Container } from "@/components/ui/Container";
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
      <Container className="py-6">
        <div className="flex flex-col-reverse gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-white/80">
            © {year}{" "}
            <Link
              href={localePath("/", locale)}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white"
            >
              {dict.site.name}
            </Link>
            . {dict.footer.rights}
          </p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2 text-xs text-white/80">
            {legalLinks.map((l) => (
              <li key={l.href}>
                <Link
                  href={localePath(l.href, locale)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white"
                >
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
