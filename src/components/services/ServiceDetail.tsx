import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbJsonLd, serviceJsonLd } from "@/lib/jsonld";
import { localePath } from "@/i18n/path";
import type { Locale } from "@/i18n/config";

type Props = {
  locale: Locale;
  /** ロケール接頭辞なしのパス(例: /services/security) */
  path: string;
  /** ヒーローの英字ラベル */
  en: string;
  /** ページ見出し(h1) */
  title: string;
  /** 見出し下の補足(任意) */
  subtitle?: string;
  /** 構造化データ(Service)の説明 */
  description: string;
  image: string;
  /** 本文のリード文 */
  lead: string;
  /** 本文の段落 */
  body: string[];
  /** 関連サービスへのリンク(任意) */
  related?: { title: string; text: string; href: string }[];
};

/**
 * サービス個別ページの共通レイアウト。
 * ヒーロー(写真背景+英字ラベル+見出し)はサービス一覧ページと同じ構成。
 */
export function ServiceDetail({
  locale,
  path,
  en,
  title,
  subtitle,
  description,
  image,
  lead,
  body,
  related,
}: Props) {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "ホーム", url: localePath("/", locale) },
            { name: "サービス一覧", url: localePath("/services", locale) },
            { name: title, url: localePath(path, locale) },
          ]),
          serviceJsonLd({
            name: title,
            description,
            url: localePath(path, locale),
          }),
        ]}
      />

      <section className="relative overflow-hidden border-b-2 border-ink-line bg-ink">
        <Image
          src={image}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div
          className="absolute inset-0 bg-brand-900/45 mix-blend-multiply"
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 bg-[linear-gradient(to_right,rgba(29,5,11,0.85)_0%,rgba(29,5,11,0.55)_45%,rgba(29,5,11,0.15)_75%,rgba(29,5,11,0)_95%)]"
          aria-hidden="true"
        />
        <Container className="relative py-20 md:py-28">
          <p className="section-label !text-brand-200">{en}</p>
          <h1 className="mt-3 text-display-2 font-black text-white">{title}</h1>
          {subtitle ? (
            <p className="mt-4 text-base font-bold tracking-[0.08em] text-white/85 md:text-lg">
              {subtitle}
            </p>
          ) : null}
        </Container>
      </section>

      <section className="bg-white py-20 md:py-28">
        <Container>
          <div className="mx-auto max-w-3xl">
            <p className="text-xl font-black leading-relaxed text-ink md:text-2xl">
              {lead}
            </p>
            <div className="mt-8 space-y-5 text-base leading-[2] text-ink-soft">
              {body.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
            {related?.length ? (
              <div className="mt-12 border-t border-ink pt-6">
                <p className="text-xs font-bold tracking-[0.2em] text-ink-muted">
                  関連サービス
                </p>
                <ul className="mt-4 border-t border-ink/15">
                  {related.map((r) => (
                    <li key={r.href} className="border-b border-ink/15">
                      <Link
                        href={localePath(r.href, locale)}
                        className="group flex items-center justify-between gap-6 py-5"
                      >
                        <span>
                          <span className="block text-lg font-black text-ink transition-colors group-hover:text-brand-600">
                            {r.title}
                          </span>
                          <span className="mt-1 block text-sm leading-relaxed text-ink-soft">
                            {r.text}
                          </span>
                        </span>
                        <span
                          aria-hidden="true"
                          className="text-brand-500 transition-transform group-hover:translate-x-1"
                        >
                          →
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
            <div className="mt-12 flex flex-wrap gap-3">
              <Button href={localePath("/contact", locale)} size="lg">
                お問い合わせ
              </Button>
              <Button
                href={localePath("/services", locale)}
                size="lg"
                variant="secondary"
              >
                サービス一覧へ
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
