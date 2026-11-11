import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  ServiceLp,
  type ServiceLpContent,
} from "@/components/services/ServiceLp";
import { breadcrumbJsonLd } from "@/lib/jsonld";
import { pageMeta, pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";
import { localePath } from "@/i18n/path";
import { isLocale } from "@/i18n/config";

const PATH = "/services/advisory";

export function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Metadata {
  if (!isLocale(params.locale)) return {};
  return pageMetadata({
    ...pageMeta.advisory,
    path: PATH,
    locale: params.locale,
  });
}

const img = (id: number, w: number, h: number, alt: string) => ({
  src: `/illustrations/ld-${id}-orange.webp`,
  width: w,
  height: h,
  alt,
});

const faqs = [
  {
    q: "どのような人材を紹介してもらえますか？",
    a: "元上場企業役員、元メガバンクCOOなど、各業界で実績のある経営のプロフェッショナルです。御社の課題と業界に合わせて、最適な人材をご紹介します。",
  },
  {
    q: "顧問とCOOの違いは何ですか？",
    a: "顧問は定例の打ち合わせや助言、人脈の紹介が中心です。COOは事業計画の実行や組織づくりまで踏み込み、経営の一員として伴走します。御社の状況に合わせて、どちらが合うかをご提案します。",
  },
  {
    q: "販路開拓やアライアンス開拓も支援してもらえますか？",
    a: "はい。顧問・COOが持つ業界のつながりを活かし、見込み顧客や代理店の開拓、大手企業・事業会社との提携づくりを支援します。",
  },
  {
    q: "ベンチャー企業や新規事業でも依頼できますか？",
    a: "はい。早期のグロースを目指すベンチャー企業や、事業会社の新規事業の立ち上げを主な対象としています。正社員として経営人材を採用する前の段階でもご活用いただけます。",
  },
  {
    q: "料金はどのくらいですか？",
    a: "支援の範囲や関わり方に応じてお見積もりします。まずは無料相談で、御社の状況をお聞かせください。",
  },
  {
    q: "アポコミ（新規開拓支援）と組み合わせられますか？",
    a: "はい。顧問のつながりを活かした開拓と、アポコミの複数チャネルによるアポイント創出を組み合わせ、攻めの新規開拓を加速させることもできます。",
  },
];

export default function AdvisoryPage({
  params,
}: {
  params: { locale: string };
}) {
  if (!isLocale(params.locale)) notFound();
  const locale = params.locale;
  const base = site.url.replace(/\/$/, "");

  const content: ServiceLpContent = {
    accent: "orange",
    service: "advisory",
    privacyHref: localePath("/privacy", locale),
    hero: {
      eyebrow: "新規開拓支援｜顧問・COO紹介",
      title: "顧問・COO紹介",
      catchCopy: (
        <>
          <span className="text-[#E05A0C]">3年の成長</span>を、
          <span className="text-[#E05A0C]">1年</span>で実現する。
        </>
      ),
      lead: "各業界のプロが、御社の経営に伴走します。元上場企業役員や元メガバンクCOOなど、実績あるプロフェッショナルが、販路開拓・アライアンス開拓・つながりの紹介まで、ベンチャー企業や新規事業の早期グロースを支えます。",
      badges: ["元上場企業役員", "元メガバンクCOO", "各業界のプロ"],
      image: img(
        949,
        507,
        508,
        "経営のプロフェッショナルが事業の成長を説明しているイラスト",
      ),
    },
    problems: {
      image: img(742, 592, 526, "事業の成長戦略を考えるイラスト"),
      items: [
        "事業は伸びているが、次の成長を担う経営人材がいない",
        "大手企業との取引や提携の糸口がつかめない",
        "新規事業を立ち上げたが、販路が広がらない",
        "経営の意思決定を相談できる相手がいない",
        "フルタイムの役員を採用するのは、まだ早い",
      ],
    },
    about: {
      heading: (
        <>
          経営のプロが、
          <br className="sm:hidden" />
          御社のチームに加わります
        </>
      ),
      paragraphs: [
        "顧問・COO紹介は、御社の課題に合った経営のプロフェッショナルを、顧問またはCOO（最高執行責任者）としてご紹介するサービスです。",
        "戦略づくりから実行まで伴走し、業界のつながりを活かして販路とアライアンスを広げます。正社員として採用するよりも早く、必要な期間だけ経営の力を補えます。",
      ],
      points: [
        "3年の成長を1年で",
        "業界のつながりを活用",
        "必要な期間だけ伴走",
      ],
    },
    features: {
      heading: "顧問・COOができること",
      items: [
        {
          title: "販路開拓",
          text: "業界のつながりを活かして、見込み顧客や代理店へのルートをつくります。自社だけでは届かなかった企業との商談につなげます。",
          image: img(752, 662, 655, "目標達成に向けて進むチームのイラスト"),
        },
        {
          title: "アライアンス開拓",
          text: "大手企業や事業会社との提携・協業の機会をつくります。事業を一気に広げるパートナーとの関係を築きます。",
          image: img(
            1498,
            635,
            539,
            "取引先と握手するビジネスパーソンのイラスト",
          ),
        },
        {
          title: "つながりの紹介",
          text: "キーパーソン、金融機関、専門家など、成長に必要な人との出会いをつなぎます。",
          image: img(881, 536, 583, "経営者のイラスト"),
        },
        {
          title: "経営への伴走（COO）",
          text: "事業計画、組織づくり、KPIの管理まで踏み込み、経営の一員として実行を推進します。",
          image: img(736, 638, 607, "急成長するグラフを説明するイラスト"),
        },
        {
          title: "新規事業の早期グロース",
          text: "事業会社の新規事業に、立ち上げ経験のあるプロが参画。検証から拡大までのスピードを上げます。",
          image: img(241, 626, 499, "グラフを使って成長を説明するイラスト"),
        },
        {
          title: "新規開拓との組み合わせ",
          text: "アポコミの複数チャネルによるアポイント創出と組み合わせ、攻めの新規開拓をさらに加速させます。",
          image: img(
            247,
            613,
            559,
            "ヘッドセットを付けて新規開拓をするイラスト",
          ),
        },
      ],
    },
    targets: {
      heading: "こんな企業におすすめです",
      items: [
        "早期のグロースを目指すベンチャー・スタートアップ",
        "新規事業を立ち上げた事業会社",
        "大手企業との取引やアライアンスを広げたい企業",
        "IPOを見据えて経営体制を強化したい企業",
      ],
    },
    flow: [
      {
        title: "無料相談",
        text: "現在の事業と、実現したい成長をお聞かせください。",
      },
      {
        title: "課題の整理",
        text: "必要な経営の力と、関わり方（顧問／COO）を整理します。",
      },
      {
        title: "人材のご紹介・面談",
        text: "課題と業界に合ったプロフェッショナルをご紹介します。",
      },
      {
        title: "ご契約・伴走開始",
        text: "定例での伴走と、販路・アライアンスの開拓を始めます。",
      },
    ],
    faqs,
    form: {
      heading: "顧問・COO紹介の無料相談",
      topics: [
        "販路開拓",
        "アライアンス開拓",
        "つながりの紹介",
        "経営への伴走（COO）",
        "新規事業の立ち上げ",
        "その他",
      ],
    },
  };

  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "ホーム", url: localePath("/", locale) },
            { name: "サービス一覧", url: localePath("/services", locale) },
            {
              name: "新規開拓支援事業",
              url: localePath("/services/sales", locale),
            },
            { name: "顧問・COO紹介", url: localePath(PATH, locale) },
          ]),
          {
            "@context": "https://schema.org",
            "@type": "Service",
            name: "顧問・COO紹介",
            serviceType: "経営顧問・COO紹介",
            description: pageMeta.advisory.description,
            url: `${base}${localePath(PATH, locale)}`,
            areaServed: { "@type": "Country", name: "日本" },
            provider: {
              "@type": "Organization",
              name: site.legalName,
              url: base,
            },
            audience: {
              "@type": "BusinessAudience",
              audienceType: "ベンチャー企業・スタートアップ・新規事業",
            },
          },
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqs.map((f) => ({
              "@type": "Question",
              name: f.q,
              acceptedAnswer: { "@type": "Answer", text: f.a },
            })),
          },
        ]}
      />
      <ServiceLp c={content} />
    </>
  );
}
