import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";

export const metadata: Metadata = {
  title: "会社概要",
  description:
    "セールスボンド株式会社（Sales Bond Co., Ltd.）の会社概要。本社所在地、代表者、事業内容（顧問紹介事業・営業BPO事業）など。",
};

const rows: { label: string; value: string }[] = [
  { label: "会社名", value: "セールスボンド株式会社（Sales Bond Co., Ltd.）" },
  { label: "代表取締役", value: "飯住 孝裕" },
  { label: "設立", value: "2024年7月" },
  { label: "資本金", value: "41,002,000円" },
  { label: "法人番号", value: "8012801023311" },
  {
    label: "本社所在地",
    value: "〒160-0023 東京都新宿区西新宿3-3-13 西新宿水間ビル2F",
  },
  { label: "メールアドレス", value: "info@salesbond.jp" },
  { label: "事業内容", value: "顧問紹介事業 / 営業BPO事業" },
  { label: "取引銀行", value: "三井住友銀行 渋谷駅前支店" },
];

export default function CompanyPage() {
  return (
    <>
      <PageHero
        eyebrow="Company"
        title="会社概要"
        description="セールスボンド株式会社の会社情報をご案内します。"
      />

      <section className="py-24 md:py-32">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <span className="eyebrow">Profile</span>
              <h2 className="mt-5 text-h1">基本情報</h2>
              <p className="mt-5 text-ink-soft leading-relaxed">
                顧問紹介と営業BPOで企業の事業成長を支援する、セールスボンド株式会社の基本情報です。
              </p>
            </div>

            <div className="lg:col-span-8">
              <dl className="overflow-hidden rounded-xl2 border border-ink-line bg-white">
                {rows.map((row, i) => (
                  <div
                    key={row.label}
                    className={
                      "grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-6 px-6 py-5" +
                      (i !== rows.length - 1 ? " border-b border-ink-line" : "")
                    }
                  >
                    <dt className="sm:col-span-3 text-sm font-semibold text-ink">
                      {row.label}
                    </dt>
                    <dd className="sm:col-span-9 text-sm text-ink-soft leading-relaxed">
                      {row.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
