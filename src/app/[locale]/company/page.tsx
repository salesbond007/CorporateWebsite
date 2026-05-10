import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { isLocale } from "@/i18n/config";

export const metadata: Metadata = {
  title: "会社概要",
  description:
    "セールスボンド株式会社（Sales Bond Co., Ltd.）の会社概要。本社所在地、代表者、事業内容（大手決裁者紹介サービス・プロ人材マッチングサービス・営業BPO事業）など。",
};

type Office = {
  name: string;
  postalCode: string;
  lines: string[];
  /** Used for the embedded Google Map query. */
  query: string;
};

const offices: Office[] = [
  {
    name: "本社",
    postalCode: "160-0023",
    lines: ["東京都新宿区西新宿3-3-13", "西新宿水間ビル2F"],
    query: "東京都新宿区西新宿3-3-13 西新宿水間ビル",
  },
];

const rows: { label: string; value: React.ReactNode }[] = [
  { label: "会社名", value: "セールスボンド株式会社（Sales Bond Co., Ltd.）" },
  { label: "代表取締役", value: "飯住 孝裕" },
  { label: "設立", value: "2024年7月" },
  { label: "資本金", value: "41,002,000円" },
  { label: "法人番号", value: "8012801023311" },
  {
    label: "住所",
    value: (
      <ul className="space-y-4">
        {offices.map((o) => (
          <li key={o.name}>
            <p className="font-semibold text-ink">{o.name}</p>
            <p className="mt-1 text-ink leading-relaxed">
              〒{o.postalCode}
              <br />
              {o.lines.join(" ")}
            </p>
          </li>
        ))}
      </ul>
    ),
  },
  { label: "メールアドレス", value: "info@salesbond.jp" },
  {
    label: "事業内容",
    value: (
      <ul className="space-y-1.5">
        <li>大手決裁者紹介サービス</li>
        <li>プロ人材マッチングサービス</li>
        <li>営業BPO事業</li>
      </ul>
    ),
  },
  { label: "取引銀行", value: "三井住友銀行 渋谷駅前支店" },
];

export default function CompanyPage({
  params,
}: {
  params: { locale: string };
}) {
  if (!isLocale(params.locale)) notFound();

  return (
    <>
      {/* Company Profile */}
      <section className="pt-20 pb-20 md:pt-28 md:pb-28">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <BilingualHeading ja="会社概要" en={["Company", "Profile"]} />
            </div>

            <div className="lg:col-span-8">
              <dl>
                {rows.map((row, i) => (
                  <div
                    key={row.label}
                    className={
                      "grid grid-cols-1 gap-2 py-6 sm:grid-cols-12 sm:gap-8 sm:py-7" +
                      (i !== rows.length - 1 ? " border-b border-ink-line" : "")
                    }
                  >
                    <dt className="sm:col-span-3 text-sm font-bold text-ink">
                      {row.label}
                    </dt>
                    <dd className="sm:col-span-9 text-sm text-ink leading-relaxed">
                      {row.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </Container>
      </section>

      {/* Access */}
      <section className="pb-24 md:pb-32">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <BilingualHeading ja="アクセス" en={["Access"]} />
            </div>

            <div className="lg:col-span-8 space-y-12">
              {offices.map((o) => (
                <div key={o.name} className="grid gap-8 md:grid-cols-12">
                  <div className="md:col-span-4">
                    <p className="text-2xl font-bold text-brand-500">{o.name}</p>
                    <p className="mt-4 text-sm leading-relaxed text-ink">
                      〒{o.postalCode}
                      <br />
                      {o.lines.map((line, i) => (
                        <span key={i}>
                          {line}
                          {i < o.lines.length - 1 ? <br /> : null}
                        </span>
                      ))}
                    </p>
                  </div>
                  <div className="md:col-span-8">
                    <div className="aspect-[4/3] w-full overflow-hidden rounded-xl bg-cream">
                      <iframe
                        title={`セールスボンド株式会社 ${o.name}の地図`}
                        src={`https://www.google.com/maps?q=${encodeURIComponent(o.query)}&output=embed`}
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        className="h-full w-full border-0"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}

function BilingualHeading({
  ja,
  en,
}: {
  ja: string;
  en: string[];
}) {
  return (
    <div>
      <p className="text-lg font-bold text-brand-500">{ja}</p>
      <h2 className="mt-2 font-display font-bold leading-[1.05] text-brand-500 text-[clamp(2.25rem,5vw,3.5rem)]">
        {en.map((line, i) => (
          <span key={i} className="block">
            {line}
          </span>
        ))}
      </h2>
    </div>
  );
}
