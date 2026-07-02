import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbJsonLd, serviceJsonLd } from "@/lib/jsonld";
import { services } from "@/lib/site";
import { localePath } from "@/i18n/path";
import { isLocale, locales } from "@/i18n/config";

const SERVICE_SLUG = "ai-komon";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const metadata: Metadata = {
  title: "AI顧問ボンド｜AI活用の相談ならAI顧問ボンド",
  description:
    "AI活用の相談ならAI顧問ボンド。大手企業技術開発部やIT企業代表などハイクラス層のAIプロフェッショナルが顧問として伴走。月額10万円〜、無料相談でロードマップをご提示します。",
};

// ─────────────────────────────────────────────────────────
// Data
// ─────────────────────────────────────────────────────────

type Problem = { num: string; title: string; body: string };

const problems: Problem[] = [
  {
    num: "01",
    title: "情報はあるが、動けない",
    body: "生成AI、LLM、RAG——毎日のように新しいキーワードが降ってくる。しかし社内で「何を、いつ、どう始めるか」の判断が下せない。会議は増える、決定は止まる。",
  },
  {
    num: "02",
    title: "導入したが、続かない",
    body: "外部ベンダーに任せてPoCまでは進んだ。だが誰も触らないダッシュボードが残り、業務にはまるで根付かない。「使いこなす人」の不在が、投資を無意味にしていく。",
  },
  {
    num: "03",
    title: "相談相手が、いない",
    body: "コンサルは高い、ベンダーは営業目線、社内には知見がない。「等身大の判断」を一緒にしてくれる、本物のプロは、どこにもいない。",
  },
];

type Reason = { num: string; kicker: string; title: string; body: string };

const reasons: Reason[] = [
  {
    num: "01",
    kicker: "High-class Professionals",
    title: "ハイクラス層だけが、顧問になる。",
    body:
      "大手企業技術開発部やIT企業代表など、経営と現場の両方を知り抜いた100人＋のハイクラス人材が在籍。日系トップコンサル代表、AI実装現場の責任者級まで——「肩書きだけ」の助言者は、一切いません。",
  },
  {
    num: "02",
    kicker: "Roadmap-First",
    title: "「作戦」なしに、AIは動かない。",
    body:
      "着手前に、業務の全体像・優先順位・成果の見え方まで含めたロードマップを提示。単発の助言ではなく、「どこから始め、どこへ辿り着くか」を最初に描き切る。だからPoCで終わらず、社内に残るAI活用に届く。",
  },
  {
    num: "03",
    kicker: "Flexible Engagement",
    title: "縛らない。だから、深く伴走できる。",
    body:
      "月額制の伴走支援。無理な長期契約は求めません。顧問との相性、事業のフェーズ、社内の温度感——それらに応じて、続ける/変える/一度離れる、を自由に選べる。強制ではなく、納得で続く関係だけを。",
  },
];

type Advisor = {
  name: string;
  role: string;
  bio: string;
  focus: string[];
  initials: string;
};

const advisors: Advisor[] = [
  {
    name: "元大手電機メーカー・技術部長級",
    role: "Senior Advisor",
    bio: "日本を代表する電機メーカーで、R&D組織を率いた経歴。製造業・重工業領域のAI活用と、大企業組織内での実装推進を熟知するシニア顧問。",
    focus: ["製造業DX", "R&Dプロセス", "組織横断のAI推進"],
    initials: "S.A.",
  },
  {
    name: "コンサルティング会社・代表",
    role: "Strategy Advisor",
    bio: "経営コンサルティングファームを率いる現役代表。「AIをどう戦略化するか」の視点で、経営層と現場の双方に届く提案・意思決定支援を得意とする。",
    focus: ["経営戦略", "AI投資判断", "組織変革"],
    initials: "C.E.O.",
  },
  {
    name: "SES会社・代表",
    role: "Implementation Advisor",
    bio: "自社エンジニア組織を率いる、AI実装の現場責任者。「絵に描いた餅」で終わらせない、実装レベルの筋の良さを判断できる稀有なプロフェッショナル。",
    focus: ["AI実装", "エンジニア組織", "PoC〜本番運用"],
    initials: "S.E.S.",
  },
];

type Seminar = { partner: string; kicker: string };

const seminars: Seminar[] = [
  { partner: "株式会社FCE", kicker: "Co-hosted Seminar" },
  { partner: "東京ガス株式会社", kicker: "Co-hosted Seminar" },
];

type Step = { num: string; en: string; title: string; body: string };

const steps: Step[] = [
  {
    num: "01",
    en: "Discovery",
    title: "無料相談",
    body: "御社の課題・現状の取り組み・目指したい姿をお聞かせください。担当がヒアリングのうえ、AI活用に向けたロードマップ案を無料でご提示します。",
  },
  {
    num: "02",
    en: "Assignment",
    title: "顧問アサイン",
    body: "ロードマップに最も適したAI顧問を厳選してご紹介。相性やご要望をふまえ、最初の面談まで丁寧にセットアップします。",
  },
  {
    num: "03",
    en: "Engagement",
    title: "伴走スタート",
    body: "定例のディスカッションを起点に、意思決定・実装判断・組織への浸透までを、月次のリズムで顧問が並走します。",
  },
];

type Faq = { q: string; a: string };

const faqs: Faq[] = [
  {
    q: "無料相談ではどこまで話せますか?",
    a: "AI活用の目的整理、現在の課題の棚卸し、ロードマップの初期案の提示までを、無料相談の範囲で行います。「まだ何も決まっていない」段階でも、遠慮なくお声掛けください。",
  },
  {
    q: "社内にAIの知識がある人間がいませんが、大丈夫ですか?",
    a: "むしろその状態からのご相談が最も多いです。前提知識ゼロを想定して、経営視点・業務視点で「何のためのAIか」から一緒に整理します。専門用語で煙に巻くことはしません。",
  },
  {
    q: "途中で顧問を変更することはできますか?",
    a: "はい、可能です。事業のフェーズが変わったり、必要な専門性が変わった際には、別の顧問への切り替えを柔軟に行えます。無理な縛りは一切設けていません。",
  },
  {
    q: "業界・業種に制限はありますか?",
    a: "特にありません。製造・小売・金融・SaaS・医療・公共・非営利まで、AI活用の余地がある領域であれば幅広くご相談いただけます。領域に応じて最適な顧問をアサインします。",
  },
  {
    q: "どのような企業に向いていますか?",
    a: "中堅規模で、AI活用に本気で踏み込みたい経営層・DX推進責任者の方に最適です。逆に、単発の情報収集や、丸投げでの導入代行をご希望の場合は他サービスをおすすめします。",
  },
];

// ─────────────────────────────────────────────────────────
// Small building blocks
// ─────────────────────────────────────────────────────────

function AdvisorPortrait({ initials }: { initials: string }) {
  return (
    <div className="relative aspect-[4/5] w-full overflow-hidden rounded-md">
      {/* Duotone-esque gradient portrait placeholder */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-br from-[#003386] via-[#0055d4] to-[#00164a]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "radial-gradient(circle at 30% 25%, rgba(255,255,255,0.6) 0px, transparent 55%), radial-gradient(circle at 70% 80%, rgba(0,0,0,0.4) 0px, transparent 60%)",
        }}
      />
      {/* Silhouette (bust) */}
      <svg
        viewBox="0 0 200 250"
        className="absolute inset-0 h-full w-full"
        aria-hidden="true"
      >
        <ellipse cx="100" cy="98" rx="38" ry="44" fill="#000c2e" opacity="0.85" />
        <path
          d="M28 250 C 28 190 60 158 100 158 C 140 158 172 190 172 250 z"
          fill="#000c2e"
          opacity="0.85"
        />
      </svg>
      {/* Initials */}
      <div className="absolute right-3 top-3 rounded-sm bg-amber-300 px-2 py-0.5 font-display text-[10px] font-black tracking-[0.16em] text-[#00235d]">
        {initials}
      </div>
      {/* Grain */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.08] mix-blend-overlay"
        style={{
          backgroundImage:
            "radial-gradient(#fff 1px, transparent 1px)",
          backgroundSize: "3px 3px",
        }}
      />
    </div>
  );
}

// ─────────────────────────────────────────────────────────
// Page
// ─────────────────────────────────────────────────────────

export default function AiKomonPage({
  params,
}: {
  params: { locale: string };
}) {
  if (!isLocale(params.locale)) notFound();
  const locale = params.locale;
  const service = services.find((s) => s.slug === SERVICE_SLUG);
  if (!service) notFound();

  const contactHref = localePath("/contact", locale);

  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "ホーム", url: localePath("/", locale) },
            { name: "サービス紹介", url: localePath("/services", locale) },
            {
              name: service.title,
              url: localePath(`/services/${SERVICE_SLUG}`, locale),
            },
          ]),
          serviceJsonLd({
            name: "AI顧問ボンド（by セールスボンド）",
            description:
              "AI活用の相談ならAI顧問ボンド。大手企業技術開発部やIT企業代表などハイクラス層のAIプロフェッショナルが顧問として伴走。月額10万円〜の伴走支援。",
            url: localePath(`/services/${SERVICE_SLUG}`, locale),
            keywords: [
              "AI顧問",
              "AI顧問ボンド",
              "AIアドバイザー",
              "AI活用",
              "AI導入支援",
              "AI戦略",
              "生成AI活用",
              "DX推進",
              "顧問サービス",
            ],
          }),
        ]}
      />

      {/* ═══════════════════════════════════════════════════
          Hero
      ══════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-[#00164a] text-white">
        {/* Deep gradient */}
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 20% 20%, #003386 0%, transparent 55%), radial-gradient(circle at 80% 80%, #0766f4 0%, transparent 60%), linear-gradient(180deg, #00164a 0%, #000e34 100%)",
          }}
        />
        {/* Subtle grid */}
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "linear-gradient(#93c5fd 1px, transparent 1px), linear-gradient(90deg, #93c5fd 1px, transparent 1px)",
            backgroundSize: "56px 56px",
          }}
        />
        {/* Amber glow */}
        <div
          aria-hidden="true"
          className="absolute -right-40 top-1/4 h-[520px] w-[520px] rounded-full bg-amber-500/15 blur-[120px]"
        />

        <Container className="relative py-24 md:py-32 lg:py-36">
          <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7">
              {/* Kicker */}
              <div className="flex items-center gap-3">
                <span aria-hidden="true" className="block h-px w-10 bg-amber-300" />
                <p className="font-display text-[11px] font-extrabold uppercase tracking-[0.36em] text-amber-300">
                  AI顧問ボンド ／ by Sales Bond
                </p>
              </div>

              {/* Hook */}
              <h1 className="mt-8 font-display font-black leading-[1.06] tracking-tight text-white text-[clamp(2.5rem,6vw,4.75rem)]">
                AI活用の相談なら、
                <br />
                <span className="relative inline-block">
                  <span className="italic" style={{ fontFamily: '"Times New Roman", serif' }}>
                    AI顧問ボンド
                  </span>
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-0 -bottom-1 h-[6px] bg-amber-300"
                  />
                </span>
                。
              </h1>

              {/* Sub */}
              <p className="mt-8 max-w-2xl text-base md:text-lg leading-[1.85] text-white/85 font-medium">
                <span className="font-black text-white">
                  大手企業技術開発部やIT企業代表などハイクラス層
                </span>
                のAIプロフェッショナルが顧問として伴走。生成AI・LLM・機械学習の現場を知る本物が、御社の課題に最適な
                <span className="font-black text-white">ロードマップと実装</span>
                を届けます。
              </p>

              {/* CTAs */}
              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <Button
                  href={contactHref}
                  size="lg"
                  className="!h-[68px] w-full px-12 text-lg font-black !bg-amber-400 !text-[#00164a] hover:!bg-amber-300 shadow-[0_22px_50px_-12px_rgba(251,191,36,0.55)] hover:-translate-y-1 md:!h-[76px] md:text-xl sm:w-auto sm:min-w-[240px]"
                >
                  無料相談を予約する
                </Button>
                <Button
                  href={contactHref}
                  size="lg"
                  variant="ghost"
                  className="!h-[68px] w-full px-12 text-lg font-black border-2 border-white/40 !text-white hover:!bg-white/10 hover:-translate-y-1 md:!h-[76px] md:text-xl sm:w-auto sm:min-w-[240px]"
                >
                  資料をダウンロード
                </Button>
              </div>

              {/* Proof points */}
              <div className="mt-14 flex flex-wrap gap-3">
                {/* Talent */}
                <div className="inline-flex items-center gap-4 rounded-full border border-amber-300/40 bg-white/[0.04] px-5 py-2.5 backdrop-blur-sm">
                  <span className="font-display text-[10px] font-extrabold uppercase tracking-[0.28em] text-amber-300">
                    High-class Pros
                  </span>
                  <span className="h-4 w-px bg-white/25" aria-hidden="true" />
                  <span className="font-display text-xl font-black text-white md:text-2xl">
                    100
                    <span className="text-amber-300">＋</span>
                  </span>
                  <span className="text-xs font-bold text-white/70 md:text-sm">
                    在籍
                  </span>
                </div>
                {/* Pricing */}
                <div className="inline-flex items-center gap-4 rounded-full border border-white/25 bg-white/[0.04] px-5 py-2.5 backdrop-blur-sm">
                  <span className="font-display text-[10px] font-extrabold uppercase tracking-[0.28em] text-white/70">
                    Monthly
                  </span>
                  <span className="h-4 w-px bg-white/25" aria-hidden="true" />
                  <span className="font-display text-xl font-black text-white md:text-2xl">
                    ¥10<span className="text-amber-300">万</span>
                  </span>
                  <span className="text-xs font-bold text-white/70 md:text-sm">
                    〜／月
                  </span>
                </div>
              </div>
            </div>

            {/* Right editorial layer */}
            <div className="relative lg:col-span-5">
              <div className="relative mx-auto aspect-[4/5] w-full max-w-md">
                {/* Layered frames */}
                <div
                  aria-hidden="true"
                  className="absolute -left-4 -top-4 h-40 w-40 border border-amber-300/40"
                />
                <div
                  aria-hidden="true"
                  className="absolute -bottom-4 -right-4 h-40 w-40 border border-amber-300/40"
                />
                <div className="absolute inset-0 overflow-hidden rounded-sm border border-white/10 bg-[#00164a]/60 shadow-[0_40px_100px_-30px_rgba(0,0,0,0.7)]">
                  {/* portrait */}
                  <div
                    aria-hidden="true"
                    className="absolute inset-0"
                    style={{
                      background:
                        "radial-gradient(circle at 40% 30%, #0766f4 0%, #000e34 65%)",
                    }}
                  />
                  <svg
                    viewBox="0 0 300 400"
                    className="absolute inset-0 h-full w-full"
                    aria-hidden="true"
                  >
                    {/* silhouette */}
                    <ellipse cx="150" cy="150" rx="58" ry="66" fill="#000820" />
                    <path
                      d="M50 400 C 50 300 100 250 150 250 C 200 250 250 300 250 400 z"
                      fill="#000820"
                    />
                    {/* thin light on shoulder */}
                    <path
                      d="M108 218 C 130 240 170 240 192 218"
                      stroke="#93c5fd"
                      strokeWidth="1.4"
                      fill="none"
                      opacity="0.4"
                    />
                  </svg>
                  {/* Signature caption */}
                  <div className="absolute bottom-6 left-6 right-6">
                    <p className="font-display text-[10px] font-extrabold uppercase tracking-[0.32em] text-amber-300">
                      Advisor Portrait
                    </p>
                    <p
                      className="mt-1 font-display text-2xl font-black italic text-white"
                      style={{ fontFamily: '"Times New Roman", serif' }}
                    >
                      &ldquo;A real professional, right beside you.&rdquo;
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ═══════════════════════════════════════════════════
          Problems
      ══════════════════════════════════════════════════ */}
      <section className="bg-[#f2f4f8] py-24 md:py-32">
        <Container>
          <div className="max-w-2xl">
            <div className="flex items-center gap-3">
              <span aria-hidden="true" className="block h-px w-10 bg-[#003386]" />
              <p className="font-display text-[10px] font-extrabold uppercase tracking-[0.32em] text-[#003386]">
                Problems ／ AI が進まない現場で
              </p>
            </div>
            <h2 className="mt-6 font-display font-black leading-[1.15] tracking-tight text-ink text-[clamp(2rem,4.5vw,3.25rem)]">
              「AIをやろう」で、
              <br />
              止まっていませんか。
            </h2>
          </div>

          <ol className="mt-16 grid gap-6 md:grid-cols-3 md:gap-8">
            {problems.map((p, i) => (
              <li key={p.num}>
                <Reveal delay={i * 100} className="h-full">
                  <div className="relative flex h-full flex-col border-t-2 border-[#003386] bg-white px-7 pb-8 pt-10">
                    <span
                      className="absolute -top-6 left-6 font-display text-6xl font-black italic leading-none text-[#003386]"
                      style={{ fontFamily: '"Times New Roman", serif' }}
                    >
                      {p.num}
                    </span>
                    <h3 className="mt-2 text-lg md:text-xl font-black leading-snug text-ink">
                      {p.title}
                    </h3>
                    <p className="mt-4 text-sm md:text-[15px] leading-[1.9] text-ink-soft font-medium">
                      {p.body}
                    </p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {/* ═══════════════════════════════════════════════════
          Reasons
      ══════════════════════════════════════════════════ */}
      <section className="bg-white py-28 md:py-36">
        <Container>
          <div className="text-center">
            <div className="inline-flex items-center gap-3">
              <span aria-hidden="true" className="block h-px w-10 bg-[#003386]" />
              <p className="font-display text-[10px] font-extrabold uppercase tracking-[0.32em] text-[#003386]">
                Why AI 顧問
              </p>
              <span aria-hidden="true" className="block h-px w-10 bg-[#003386]" />
            </div>
            <h2 className="mt-6 font-display font-black leading-[1.1] tracking-tight text-ink text-[clamp(2rem,4.5vw,3.25rem)]">
              &ldquo;肩書きだけ&rdquo;の助言は、
              <br />
              置いていない。
            </h2>
          </div>

          <div className="mt-20 space-y-16 md:space-y-24">
            {reasons.map((r, i) => {
              const reverse = i % 2 === 1;
              return (
                <Reveal key={r.num}>
                  <div className="grid items-center gap-10 md:grid-cols-12 md:gap-14">
                    {/* Number panel */}
                    <div className={`md:col-span-5 ${reverse ? "md:order-2" : ""}`}>
                      <div className="relative aspect-[4/3] overflow-hidden rounded-sm bg-[#00164a] text-white">
                        <div
                          aria-hidden="true"
                          className="absolute inset-0"
                          style={{
                            background:
                              "radial-gradient(circle at 30% 30%, #0055d4 0%, transparent 55%), linear-gradient(160deg, #003386 0%, #000e34 100%)",
                          }}
                        />
                        <div
                          aria-hidden="true"
                          className="absolute inset-0 opacity-[0.08]"
                          style={{
                            backgroundImage:
                              "radial-gradient(#fff 1px, transparent 1px)",
                            backgroundSize: "16px 16px",
                          }}
                        />
                        <span
                          className="absolute left-8 top-6 font-display text-[10px] font-extrabold uppercase tracking-[0.32em] text-amber-300"
                        >
                          {r.kicker}
                        </span>
                        <span
                          className="absolute bottom-6 right-8 font-display text-[clamp(6rem,14vw,11rem)] font-black italic leading-none text-amber-300/90"
                          style={{ fontFamily: '"Times New Roman", serif' }}
                        >
                          {r.num}
                        </span>
                        <div
                          aria-hidden="true"
                          className="absolute -left-2 top-2 h-full w-[2px] bg-amber-300/30"
                        />
                      </div>
                    </div>

                    {/* Copy */}
                    <div className={`md:col-span-7 ${reverse ? "md:order-1" : ""}`}>
                      <p className="font-display text-[10px] font-extrabold uppercase tracking-[0.32em] text-[#003386]">
                        Reason {r.num}
                      </p>
                      <h3 className="mt-3 font-display font-black leading-[1.15] tracking-tight text-ink text-[clamp(1.5rem,3vw,2.25rem)]">
                        {r.title}
                      </h3>
                      <span
                        aria-hidden="true"
                        className="mt-5 block h-1 w-14 bg-[#003386]"
                      />
                      <p className="mt-6 text-sm md:text-base leading-[1.95] text-ink-soft font-medium">
                        {r.body}
                      </p>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </Container>
      </section>

      {/* ═══════════════════════════════════════════════════
          Advisor Introductions
      ══════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-ink py-28 text-white md:py-36">
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage:
              "radial-gradient(#FCD34D 1px, transparent 1px)",
            backgroundSize: "20px 20px",
          }}
        />
        <div
          aria-hidden="true"
          className="absolute -left-32 top-1/3 h-96 w-96 rounded-full bg-[#00235d]/30 blur-[120px]"
        />

        <Container className="relative">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3">
              <span aria-hidden="true" className="block h-px w-10 bg-amber-300" />
              <p className="font-display text-[10px] font-extrabold uppercase tracking-[0.32em] text-amber-300">
                Advisors ／ 代表例のご紹介
              </p>
            </div>
            <h2 className="mt-6 font-display font-black leading-[1.15] tracking-tight text-white text-[clamp(2rem,4.5vw,3.25rem)]">
              <span className="italic" style={{ fontFamily: '"Times New Roman", serif' }}>
                ハイクラス層
              </span>
              が、
              <br />
              顧問として在籍。
            </h2>
            <p className="mt-5 text-sm md:text-base leading-relaxed text-white/70 font-medium">
              大手企業技術開発部やIT企業代表など、経営と現場の両方に踏み込めるプロだけを、顧問としてご紹介します。以下は在籍する顧問の代表例です。
            </p>
          </div>

          <ul className="mt-16 grid gap-8 md:grid-cols-3 md:gap-10">
            {advisors.map((a, i) => (
              <li key={a.name}>
                <Reveal delay={i * 100} className="h-full">
                  <article className="flex h-full flex-col">
                    <AdvisorPortrait initials={a.initials} />
                    <div className="mt-6">
                      <p className="font-display text-[10px] font-extrabold uppercase tracking-[0.32em] text-amber-300">
                        {a.role}
                      </p>
                      <h3 className="mt-2 text-lg md:text-xl font-black leading-snug text-white">
                        {a.name}
                      </h3>
                      <span
                        aria-hidden="true"
                        className="mt-3 block h-px w-10 bg-amber-300/50"
                      />
                      <p className="mt-4 text-sm leading-[1.9] text-white/70 font-medium">
                        {a.bio}
                      </p>
                      <ul className="mt-5 flex flex-wrap gap-2">
                        {a.focus.map((f) => (
                          <li
                            key={f}
                            className="rounded-full border border-white/20 px-2.5 py-1 text-[11px] font-bold text-white/80"
                          >
                            #{f}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </article>
                </Reveal>
              </li>
            ))}
          </ul>

          <p className="mt-10 text-center text-xs text-white/50 md:text-sm">
            ※ 上記は在籍する顧問の代表例です。ご相談内容に応じて、最適な顧問をご紹介します。
          </p>
        </Container>
      </section>

      {/* ═══════════════════════════════════════════════════
          Trust — Co-hosted Seminars
      ══════════════════════════════════════════════════ */}
      <section className="bg-[#f2f4f8] py-24 md:py-32">
        <Container>
          <div className="text-center">
            <div className="inline-flex items-center gap-3">
              <span aria-hidden="true" className="block h-px w-10 bg-[#003386]" />
              <p className="font-display text-[10px] font-extrabold uppercase tracking-[0.32em] text-[#003386]">
                Trust ／ 共催セミナー実績
              </p>
              <span aria-hidden="true" className="block h-px w-10 bg-[#003386]" />
            </div>
            <h2 className="mt-6 font-display font-black leading-[1.15] tracking-tight text-ink text-[clamp(1.75rem,4vw,2.75rem)]">
              大手企業と、共に語ってきた。
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-sm md:text-base leading-relaxed text-ink-soft font-medium">
              業界を代表する企業と共に、AI活用の最前線をテーマとしたセミナーを開催してきました。
            </p>
          </div>

          <ul className="mx-auto mt-14 grid max-w-3xl gap-6 md:grid-cols-2 md:gap-8">
            {seminars.map((s, i) => (
              <li key={s.partner}>
                <Reveal delay={i * 100} className="h-full">
                  <div className="flex h-full items-center justify-between rounded-sm border-t-2 border-[#003386] bg-white p-8 shadow-[0_20px_50px_-30px_rgba(190,18,60,0.35)]">
                    <div>
                      <p className="font-display text-[10px] font-extrabold uppercase tracking-[0.28em] text-[#003386]">
                        {s.kicker}
                      </p>
                      <p className="mt-2 text-lg md:text-xl font-black text-ink">
                        {s.partner}
                      </p>
                    </div>
                    <span
                      className="font-display text-4xl font-black italic text-[#003386]/25"
                      style={{ fontFamily: '"Times New Roman", serif' }}
                      aria-hidden="true"
                    >
                      &times;
                    </span>
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* ═══════════════════════════════════════════════════
          Flow
      ══════════════════════════════════════════════════ */}
      <section className="bg-white py-28 md:py-36">
        <Container>
          <div className="text-center">
            <div className="inline-flex items-center gap-3">
              <span aria-hidden="true" className="block h-px w-10 bg-[#003386]" />
              <p className="font-display text-[10px] font-extrabold uppercase tracking-[0.32em] text-[#003386]">
                Flow ／ ご利用の流れ
              </p>
              <span aria-hidden="true" className="block h-px w-10 bg-[#003386]" />
            </div>
            <h2 className="mt-6 font-display font-black leading-[1.15] tracking-tight text-ink text-[clamp(2rem,4.5vw,3rem)]">
              まずは、話してみることから。
            </h2>
          </div>

          <ol className="mt-16 grid gap-6 md:grid-cols-3 md:gap-8">
            {steps.map((s, i) => (
              <li key={s.num} className="relative">
                <Reveal delay={i * 100} className="h-full">
                  <div className="flex h-full flex-col rounded-sm border border-ink-line bg-white p-8">
                    <div className="flex items-baseline gap-3">
                      <span
                        className="font-display text-5xl font-black italic leading-none text-[#003386]"
                        style={{ fontFamily: '"Times New Roman", serif' }}
                      >
                        {s.num}
                      </span>
                      <span className="font-display text-[10px] font-extrabold uppercase tracking-[0.28em] text-[#003386]">
                        {s.en}
                      </span>
                    </div>
                    <h3 className="mt-6 text-xl md:text-2xl font-black text-ink leading-snug">
                      {s.title}
                    </h3>
                    <span
                      aria-hidden="true"
                      className="mt-4 block h-0.5 w-10 bg-[#003386]"
                    />
                    <p className="mt-4 text-sm md:text-[15px] leading-[1.9] text-ink-soft font-medium">
                      {s.body}
                    </p>
                  </div>
                </Reveal>
                {i < steps.length - 1 ? (
                  <span
                    aria-hidden="true"
                    className="absolute right-[-14px] top-1/2 hidden -translate-y-1/2 text-[#003386] md:block"
                  >
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M4 12h14M13 6l6 6-6 6"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                ) : null}
              </li>
            ))}
          </ol>

          <div className="mt-16 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button
              href={contactHref}
              size="lg"
              className="!bg-[#003386] hover:!bg-[#00235d] shadow-[0_18px_40px_-12px_rgba(159,18,57,0.55)]"
            >
              無料相談を予約する
            </Button>
            <Button href={contactHref} size="lg" variant="secondary">
              資料をダウンロード
            </Button>
          </div>
        </Container>
      </section>

      {/* ═══════════════════════════════════════════════════
          FAQ
      ══════════════════════════════════════════════════ */}
      <section className="bg-[#f2f4f8] py-24 md:py-32">
        <Container>
          <div className="text-center">
            <div className="inline-flex items-center gap-3">
              <span aria-hidden="true" className="block h-px w-10 bg-[#003386]" />
              <p className="font-display text-[10px] font-extrabold uppercase tracking-[0.32em] text-[#003386]">
                FAQ
              </p>
              <span aria-hidden="true" className="block h-px w-10 bg-[#003386]" />
            </div>
            <h2 className="mt-6 font-display font-black leading-tight text-ink text-[clamp(1.875rem,4vw,2.75rem)]">
              よくあるご質問
            </h2>
          </div>

          <ul className="mx-auto mt-14 max-w-3xl space-y-3">
            {faqs.map((f) => (
              <li key={f.q} className="rounded-sm border border-ink-line bg-white">
                <details className="group">
                  <summary className="flex cursor-pointer items-start justify-between gap-4 p-6 list-none">
                    <span className="flex gap-3">
                      <span
                        className="font-display text-lg font-black italic text-[#003386]"
                        style={{ fontFamily: '"Times New Roman", serif' }}
                      >
                        Q.
                      </span>
                      <span className="text-base md:text-lg font-bold text-ink leading-snug">
                        {f.q}
                      </span>
                    </span>
                    <span className="mt-1 grid h-7 w-7 shrink-0 place-items-center rounded-full border-2 border-ink-line text-ink-muted transition group-open:rotate-45 group-open:border-[#003386] group-open:text-[#003386]">
                      +
                    </span>
                  </summary>
                  <div className="border-t border-ink-line p-6 pt-5 text-sm md:text-base leading-relaxed text-ink-soft font-medium">
                    <span
                      className="mr-2 font-display text-lg font-black italic text-ink-muted"
                      style={{ fontFamily: '"Times New Roman", serif' }}
                    >
                      A.
                    </span>
                    {f.a}
                  </div>
                </details>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* ═══════════════════════════════════════════════════
          Final CTA
      ══════════════════════════════════════════════════ */}
      <section className="py-28 md:py-36">
        <Container>
          <div className="relative overflow-hidden rounded-sm bg-[#00164a] px-8 py-16 text-white md:px-16 md:py-20">
            <div
              aria-hidden="true"
              className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(circle at 20% 30%, #0055d4 0%, transparent 55%), radial-gradient(circle at 80% 70%, #0766f4 0%, transparent 55%), linear-gradient(180deg, #00164a 0%, #000e34 100%)",
              }}
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 opacity-[0.06]"
              style={{
                backgroundImage:
                  "linear-gradient(#93c5fd 1px, transparent 1px), linear-gradient(90deg, #93c5fd 1px, transparent 1px)",
                backgroundSize: "56px 56px",
              }}
            />
            <div
              aria-hidden="true"
              className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-amber-500/20 blur-[120px]"
            />

            <div className="relative text-center">
              <div className="inline-flex items-center gap-3">
                <span aria-hidden="true" className="block h-px w-10 bg-amber-300" />
                <p className="font-display text-[10px] font-extrabold uppercase tracking-[0.32em] text-amber-300">
                  Book a Free Consultation
                </p>
                <span aria-hidden="true" className="block h-px w-10 bg-amber-300" />
              </div>
              <h2 className="mx-auto mt-8 max-w-2xl font-display font-black leading-[1.1] tracking-tight text-white text-[clamp(2rem,5vw,3.75rem)]">
                AI活用の相談なら、
                <br />
                <span className="relative inline-block">
                  <span className="italic" style={{ fontFamily: '"Times New Roman", serif' }}>
                    AI顧問ボンド
                  </span>
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-0 -bottom-1 h-[6px] bg-amber-300"
                  />
                </span>
                。
              </h2>
              <p className="mx-auto mt-6 max-w-xl text-sm md:text-base leading-relaxed text-white/80 font-medium">
                月額10万円〜、無理な縛りなし。まずは無料相談から。御社の現状をお聞かせいただければ、AI活用のロードマップをご提示します。
              </p>
              <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Button
                  href={contactHref}
                  size="lg"
                  className="!h-[72px] w-full px-12 text-xl font-black !bg-amber-400 !text-[#00164a] hover:!bg-amber-300 shadow-[0_22px_50px_-12px_rgba(251,191,36,0.55)] hover:-translate-y-1 md:!h-[84px] md:px-16 md:text-2xl sm:w-auto sm:min-w-[260px]"
                >
                  無料相談を予約する
                </Button>
                <Button
                  href={contactHref}
                  size="lg"
                  variant="ghost"
                  className="!h-[72px] w-full px-12 text-xl font-black border-2 border-white/40 !text-white hover:!bg-white/10 hover:-translate-y-1 md:!h-[84px] md:px-16 md:text-2xl sm:w-auto sm:min-w-[260px]"
                >
                  資料をダウンロード
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
