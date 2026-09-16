import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbJsonLd, serviceJsonLd } from "@/lib/jsonld";
import { site } from "@/lib/site";
import { localePath } from "@/i18n/path";
import { isLocale, locales } from "@/i18n/config";
import { FaqAccordion } from "./FaqAccordion";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const metadata: Metadata = {
  title: "ハードウェア開発支援",
  description:
    "製造業向けに、ハードウェア領域のエンジニア・PM・技術顧問を業務委託で提供します。機構から組込み、無線、AI、制御、品質・安全まで、開発の即戦力を必要な期間だけ。",
};

// このLPは製造業の開発責任者向けに、他ページと異なるネイビー/グレースケール基調の
// トーンで構成する(要件上、装飾を抑えた「硬い」デザインにしている)。
const NAVY = "#16233F";

// ①で登録者名の代わりに掲げるサービス名の仮テキスト。名称が決まり次第差し替える。
const SERVICE_NAME_PLACEHOLDER = "SERVICE NAME";

const engineerAreas = [
  { title: "機構・機械設計", body: "機構、筐体、治具" },
  { title: "電気・回路", body: "回路設計、基板設計" },
  { title: "組込み", body: "C/C++、マイコン、組込みLinux" },
  { title: "無線・通信", body: "Wi-Fi、BLE、電波法認証、EMC" },
  { title: "エッジAI", body: "機器上でのAI実装、異常検知" },
  { title: "組込みセキュリティ", body: "改ざん検知、暗号" },
  { title: "制御", body: "PLC、ライン立上げ" },
  { title: "品質・安全", body: "評価試験、規格対応" },
];

const pmSituations = [
  "何を作るかが決まらない",
  "開発が遅れているが、原因も打ち手も分からない",
  "試作から量産に進められない",
  "社内に技術を判断できる人がいない",
];

// 実績の代わりに、登録技術者の経歴で信頼を作る。人数は記載しない。
const engineerProfiles = [
  "大手電機メーカーで通信機器開発30年。無線(Wi-Fi／BLE)、電波法認証、量産立ち上げ、開発責任者、米国駐在",
  "AI実装の専門家。エッジAI、モデル軽量化、異常検知、組込みセキュリティ。組込みエンジニアのチームを保有",
];

export default function HardwareDevelopmentPage({
  params,
}: {
  params: { locale: string };
}) {
  if (!isLocale(params.locale)) notFound();
  const locale = params.locale;
  const contactHref = localePath("/services/hardware-development", locale);

  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "ホーム", url: localePath("/", locale) },
            { name: "サービス案内", url: localePath("/services", locale) },
            {
              name: "ハードウェア開発",
              url: contactHref,
            },
          ]),
          serviceJsonLd({
            name: "ハードウェア開発支援",
            description: metadata.description as string,
            url: contactHref,
          }),
        ]}
      />

      {/* ① ファーストビュー */}
      <section className="relative overflow-hidden" style={{ backgroundColor: NAVY }}>
        <Container className="relative py-20 md:py-28">
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-white/50">
            {SERVICE_NAME_PLACEHOLDER}
          </p>
          <h1 className="mt-5 max-w-3xl text-[clamp(1.75rem,4.2vw,3rem)] font-black leading-[1.3] text-white">
            ハードウェア開発の即戦力を、
            <br />
            必要な期間だけ
          </h1>
          <p className="mt-6 max-w-2xl text-sm leading-[1.9] text-white/75 md:text-base">
            開発の一線で判断してきたエンジニア・PM・技術顧問が入ります。
            <br />
            機構から組込み、無線、AI、制御、品質・安全まで。
          </p>

          <div className="mt-10">
            <a
              href="#contact"
              className="inline-flex h-12 items-center justify-center rounded-sm bg-white px-8 text-sm font-bold text-[#16233F] transition hover:bg-white/90"
            >
              相談する(無料)
            </a>
          </div>
        </Container>
      </section>

      {/* ② 2つの柱 */}
      <section className="bg-white py-20 md:py-28">
        <Container>
          <div className="grid gap-8 md:grid-cols-2 md:gap-6">
            {/* 左: エンジニア */}
            <div className="flex flex-col border border-ink-line p-8 md:p-10">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-ink-muted">
                Engineer
              </p>
              <h2 className="mt-3 text-xl font-black text-ink md:text-2xl">
                エンジニア｜手を動かす
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-ink-soft">
                実装・設計・立上げを担います。
              </p>

              <ul className="mt-8 flex-1 space-y-5 border-t border-ink-line pt-8">
                {engineerAreas.map((area) => (
                  <li key={area.title} className="flex gap-4">
                    <span
                      aria-hidden="true"
                      className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full"
                      style={{ backgroundColor: NAVY }}
                    />
                    <span>
                      <span className="block text-sm font-bold text-ink">
                        {area.title}
                      </span>
                      <span className="block text-xs text-ink-muted">
                        {area.body}
                      </span>
                    </span>
                  </li>
                ))}
              </ul>

              <p className="mt-8 border-t border-ink-line pt-6 text-xs font-bold text-ink-muted">
                頼み方：開発参画(数ヶ月〜)／診断・レビュー(1日〜)
              </p>
            </div>

            {/* 右: PM・技術顧問 */}
            <div className="flex flex-col border border-ink-line p-8 md:p-10">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-ink-muted">
                PM / Advisor
              </p>
              <h2 className="mt-3 text-xl font-black text-ink md:text-2xl">
                PM・技術顧問｜判断し、率いる
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-ink-soft">
                要件定義、開発推進、ベンダー調整、量産移行、技術判断を担います。
              </p>

              <div className="mt-8 flex-1 border-t border-ink-line pt-8">
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-ink-muted">
                  こんなときに
                </p>
                <ul className="mt-4 space-y-4">
                  {pmSituations.map((s) => (
                    <li key={s} className="flex gap-3 text-sm leading-relaxed text-ink">
                      <span
                        aria-hidden="true"
                        className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full"
                        style={{ backgroundColor: NAVY }}
                      />
                      <span>{s}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <p className="mt-8 border-t border-ink-line pt-6 text-xs font-bold text-ink-muted">
                頼み方：技術顧問(月1〜2回)／PM参画(開発期間中)／技術相談(1〜2時間)
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* ③ 登録している技術者 */}
      <section className="border-t border-ink-line bg-[#F5F6F8] py-20 md:py-28">
        <Container>
          <h2 className="text-xl font-black text-ink md:text-2xl">
            登録している技術者
          </h2>

          <ul className="mt-10 grid gap-6 md:grid-cols-2">
            {engineerProfiles.map((body, i) => (
              <li
                key={i}
                className="border border-ink-line bg-white p-7 md:p-8"
              >
                <span
                  aria-hidden="true"
                  className="text-xs font-bold uppercase tracking-[0.2em]"
                  style={{ color: NAVY }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="mt-4 text-sm leading-[1.9] text-ink">{body}</p>
              </li>
            ))}
          </ul>

          <p className="mt-6 text-xs text-ink-muted">
            ※FA制御・生産技術の領域は拡充中です
          </p>

          {/* CTA(②配置目: ③の後) */}
          <div className="mt-12">
            <a
              href="#contact"
              className="inline-flex h-12 items-center justify-center rounded-sm px-8 text-sm font-bold text-white transition hover:opacity-90"
              style={{ backgroundColor: NAVY }}
            >
              相談する(無料)
            </a>
          </div>
        </Container>
      </section>

      {/* ④ お問い合わせ */}
      <section id="contact" className="scroll-mt-20 bg-white py-20 md:py-28">
        <Container>
          <div className="mx-auto max-w-xl">
            <h2 className="text-center text-xl font-black text-ink md:text-2xl">
              まずは技術相談から
            </h2>

            {/* 見た目のみのフォーム。送信処理は未実装 */}
            <form className="mt-10 space-y-6">
              <div>
                <label
                  htmlFor="hw-company"
                  className="block text-xs font-bold text-ink-muted"
                >
                  会社名
                </label>
                <input
                  id="hw-company"
                  type="text"
                  name="company"
                  className="mt-2 h-12 w-full border border-ink-line bg-white px-4 text-sm text-ink focus:border-[#16233F] focus:outline-none"
                />
              </div>
              <div>
                <label
                  htmlFor="hw-name"
                  className="block text-xs font-bold text-ink-muted"
                >
                  お名前
                </label>
                <input
                  id="hw-name"
                  type="text"
                  name="name"
                  className="mt-2 h-12 w-full border border-ink-line bg-white px-4 text-sm text-ink focus:border-[#16233F] focus:outline-none"
                />
              </div>
              <div>
                <label
                  htmlFor="hw-email"
                  className="block text-xs font-bold text-ink-muted"
                >
                  メールアドレス
                </label>
                <input
                  id="hw-email"
                  type="email"
                  name="email"
                  className="mt-2 h-12 w-full border border-ink-line bg-white px-4 text-sm text-ink focus:border-[#16233F] focus:outline-none"
                />
              </div>
              <div>
                <label
                  htmlFor="hw-message"
                  className="block text-xs font-bold text-ink-muted"
                >
                  ご相談内容
                </label>
                <textarea
                  id="hw-message"
                  name="message"
                  rows={5}
                  className="mt-2 w-full border border-ink-line bg-white px-4 py-3 text-sm text-ink focus:border-[#16233F] focus:outline-none"
                />
              </div>

              <button
                type="button"
                className="h-12 w-full text-sm font-bold text-white transition hover:opacity-90"
                style={{ backgroundColor: NAVY }}
              >
                送信する
              </button>
            </form>
          </div>
        </Container>
      </section>

      {/* ⑤ FAQ */}
      <section className="border-t border-ink-line bg-[#F5F6F8] py-20 md:py-28">
        <Container>
          <div className="mx-auto max-w-2xl">
            <h2 className="text-xl font-black text-ink md:text-2xl">
              よくあるご質問
            </h2>
            <div className="mt-8">
              <FaqAccordion />
            </div>

            {/* CTA(③配置目: ⑤の後) */}
            <div className="mt-12 text-center">
              <a
                href="#contact"
                className="inline-flex h-12 items-center justify-center rounded-sm px-8 text-sm font-bold text-white transition hover:opacity-90"
                style={{ backgroundColor: NAVY }}
              >
                相談する(無料)
              </a>
            </div>
          </div>
        </Container>
      </section>

      {/* ⑥ 会社情報(住所・メールを明記。社員数は記載しない) */}
      <section className="bg-white py-12">
        <Container>
          <div className="mx-auto max-w-2xl border-t border-ink-line pt-8 text-center text-xs leading-relaxed text-ink-muted">
            <p className="font-bold text-ink">{site.legalName}</p>
            <p className="mt-1">{site.address.addressJa}</p>
            <p className="mt-1">{site.email}</p>
          </div>
        </Container>
      </section>
    </>
  );
}
