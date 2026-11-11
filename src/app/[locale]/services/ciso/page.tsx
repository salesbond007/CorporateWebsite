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

const PATH = "/services/ciso";

export function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Metadata {
  if (!isLocale(params.locale)) return {};
  return pageMetadata({ ...pageMeta.ciso, path: PATH, locale: params.locale });
}

const img = (id: number, w: number, h: number, alt: string) => ({
  src: `/illustrations/ld-${id}-wine.webp`,
  width: w,
  height: h,
  alt,
});

/** AI検索・検索エンジン向けに、用語の定義も含めて回答する */
const faqs = [
  {
    q: "社外CISOとは何ですか？",
    a: "社外CISO（vCISO・CISO as a Service）とは、社外の専門家が最高情報セキュリティ責任者（CISO）の役割を担うサービスです。セキュリティ専任者を採用しなくても、情報セキュリティの方針づくり、体制整備、取引先や監査への説明を任せられます。",
  },
  {
    q: "セキュリティ顧問と社外CISOの違いは何ですか？",
    a: "セキュリティ顧問は、定例の打ち合わせやご相談への回答を中心とした助言型の支援です。社外CISOは、AI利用ルールの作成・改定、AIツールの導入前チェック、セキュリティチェックシートの回答、月次報告など、実務まで踏み込んで体制づくりを担う伴走型の支援です。",
  },
  {
    q: "生成AIの利用ガイドライン（AIポリシー）を作ってもらえますか？",
    a: "はい。入力してよい情報とだめな情報、使ってよいAIツール、導入時の承認の流れを決め、御社に合わせたAI利用ガイドラインを作成します。顧問プランではひな形をご提供します。",
  },
  {
    q: "上場準備（IPO）や大手企業との取引に必要なセキュリティ対応もできますか？",
    a: "はい。情報セキュリティ体制の整備や、取引先・監査に説明できる資料づくりを支援します。大手企業・エンタープライズとの取引で求められるセキュリティチェックシートへの回答も支援します。",
  },
  {
    q: "どのような企業が対象ですか？",
    a: "生成AIを業務に取り入れたい、またはすでに使っている中小〜中堅企業が主な対象です。特に、従業員50〜300名程度でセキュリティ専任者がいない企業に向いています。",
  },
  {
    q: "契約期間はどのくらいですか？",
    a: "最低契約期間は6カ月です。はじめにAI利用の実態調査を含む初回診断を行い、御社に合ったプランをご提案します。料金は内容に応じてお見積もりします。",
  },
];

export default function CisoPage({ params }: { params: { locale: string } }) {
  if (!isLocale(params.locale)) notFound();
  const locale = params.locale;
  const base = site.url.replace(/\/$/, "");

  const content: ServiceLpContent = {
    accent: "wine",
    service: "ciso",
    privacyHref: localePath("/privacy", locale),
    hero: {
      eyebrow: "セキュリティ対策｜AI時代の社外CISO",
      title: "CISO・セキュリティ顧問",
      catchCopy: (
        <>
          <span className="text-brand-600">AIを使う会社</span>のための、
          <br className="hidden sm:block" />
          社外CISO。
        </>
      ),
      lead: "生成AIを業務に取り入れたい、またはすでに使っている企業に代わり、AI利用のルールづくりと会社全体のセキュリティ体制づくりを月額で引き受けます。上場準備や、大手企業・エンタープライズとの取引に必要な「説明できるセキュリティ」を整えます。",
      badges: [
        "AI利用ガイドライン",
        "AIツールの導入前チェック",
        "セキュリティチェックシート対応",
        "上場準備（IPO）",
      ],
      image: img(
        947,
        503,
        507,
        "セキュリティ体制について説明する社外CISOのイラスト",
      ),
    },
    problems: {
      image: img(
        1523,
        470,
        529,
        "セキュリティの課題に悩むビジネスパーソンのイラスト",
      ),
      items: [
        "社員が生成AIを使っているが、利用ルールがない",
        "取引先からセキュリティチェックシートが届くが、答えられない",
        "上場準備で、情報セキュリティ体制の整備を求められている",
        "大手企業との取引で、セキュリティの説明を求められる",
        "セキュリティの専任者を採用するのは難しい",
        "AIを使ったなりすましメールや詐欺が心配",
      ],
    },
    about: {
      heading: (
        <>
          社員がAIを安全に使え、
          <br />
          取引先や監査に説明できる状態に
        </>
      ),
      paragraphs: [
        "CISO・セキュリティ顧問は、セキュリティの専任者がいない企業に代わって、社外CISO（最高情報セキュリティ責任者）としてAI時代のセキュリティ体制を構築するサービスです。",
        "「セキュリティの専門家」としてだけでなく、「AIを安全に使えるようにする専門家」として、AI利用のルールづくりから取引先への説明、経営への報告まで伴走します。",
      ],
      points: [
        "AIを安全に使える",
        "取引先・監査に説明できる",
        "専任者の採用が不要",
      ],
    },
    features: {
      heading: "AI時代のセキュリティ、6つの標準メニュー",
      items: [
        {
          title: "AI利用の実態調査",
          text: "社員アンケートと利用ツールの洗い出しで、許可なく使われているAI（シャドーAI）を把握します。",
          image: img(1395, 618, 479, "AIにパソコンで質問する人のイラスト"),
        },
        {
          title: "AI利用ガイドライン",
          text: "入力してよい情報とだめな情報、使ってよいツール、導入時の承認の流れを決めます。",
          image: img(
            1817,
            627,
            509,
            "ルールを守るためのチェックリストのイラスト",
          ),
        },
        {
          title: "AIツールの導入前チェック",
          text: "利用規約、データの保存先、入力データが学習に使われるか、権限を確認し、導入してよいかを判定します。",
          image: img(
            1381,
            553,
            465,
            "オンラインで相談に応じる専門家のイラスト",
          ),
        },
        {
          title: "取引先へのAI利用の説明",
          text: "セキュリティチェックシートのAI関連の設問への回答と、取引先向けの説明資料を作ります。",
          image: img(
            1498,
            635,
            539,
            "取引先と握手するビジネスパーソンのイラスト",
          ),
        },
        {
          title: "社内AI・AIエージェントの権限設計",
          text: "AIに渡すデータの範囲、操作の権限、利用ログの残し方を決めます。",
          image: img(1834, 594, 457, "サーバールームのイラスト"),
        },
        {
          title: "AIを使った攻撃への備え",
          text: "なりすましメールやディープフェイクによる送金詐欺への注意喚起と、社内の確認手順をつくります。",
          image: img(1636, 629, 604, "ウイルス対策・セキュリティのイラスト"),
        },
      ],
    },
    plans: {
      heading: "会社の規模と目的に合わせた3つのプラン",
      note: "※ 料金はご相談内容に応じてお見積もりします。はじめにAI利用の実態調査を含む初回診断を行います。最低契約期間は6カ月です。",
      items: [
        {
          name: "顧問",
          target: "従業員30〜100名程度",
          items: [
            "月1回の定例（60分）",
            "メールでのご相談",
            "AI利用ガイドラインのひな形",
            "AIツール導入のご相談",
          ],
        },
        {
          name: "AI社外CISO",
          target: "従業員50〜300名程度",
          recommended: true,
          items: [
            "月1回の定例（90分）",
            "チャットでのご相談",
            "自社用のAI利用ガイドラインの作成・改定",
            "AIツールの導入前チェック",
            "セキュリティチェックシートの回答",
            "月次報告・緊急時の初動の助言",
          ],
        },
        {
          name: "AI社外CISO（経営参画）",
          target: "従業員100〜1,000名程度",
          items: [
            "月2回の定例＋経営会議への参加",
            "部門ごとのAI運用まで担当",
            "社内AI・AIエージェントの権限設計",
            "経営向けの四半期報告",
            "年1回のAI安全利用研修",
            "緊急時の初動の助言と訪問対応",
          ],
        },
      ],
    },
    targets: {
      heading: "こんな企業におすすめです",
      items: [
        "上場準備（IPO）を進めている企業",
        "大手企業・エンタープライズとの取引を広げたいベンチャー",
        "生成AIを業務に取り入れたい・すでに使っている企業",
        "セキュリティ専任者がいない従業員50〜300名の企業",
      ],
    },
    flow: [
      {
        title: "無料相談",
        text: "AIの利用状況とセキュリティの課題をお聞かせください。",
      },
      {
        title: "初回診断",
        text: "AI利用の実態調査を含め、現状とリスクを整理します。",
      },
      {
        title: "プランのご提案",
        text: "会社の規模と目的に合わせたプランをご提案します。",
      },
      {
        title: "ご契約・伴走開始",
        text: "定例とご相談対応を通じて、体制づくりを進めます。",
      },
    ],
    faqs,
    form: {
      heading: "CISO・セキュリティ顧問の無料相談",
      topics: [
        "AI利用ガイドライン",
        "AIツールの導入前チェック",
        "セキュリティチェックシート対応",
        "上場準備（IPO）",
        "社外CISO",
        "セキュリティ顧問",
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
              name: "セキュリティ対策事業",
              url: localePath("/services/security", locale),
            },
            { name: "CISO・セキュリティ顧問", url: localePath(PATH, locale) },
          ]),
          {
            "@context": "https://schema.org",
            "@type": "Service",
            name: "CISO・セキュリティ顧問（AI時代の社外CISO）",
            alternateName: [
              "社外CISO",
              "vCISO",
              "CISO as a Service",
              "セキュリティ顧問",
              "AIセキュリティ顧問",
            ],
            serviceType: "社外CISO・セキュリティ顧問",
            description: pageMeta.ciso.description,
            url: `${base}${localePath(PATH, locale)}`,
            areaServed: { "@type": "Country", name: "日本" },
            provider: {
              "@type": "Organization",
              name: site.legalName,
              url: base,
            },
            audience: {
              "@type": "BusinessAudience",
              audienceType:
                "生成AIを活用する中小〜中堅企業・上場準備企業・エンタープライズと取引するベンチャー",
            },
            hasOfferCatalog: {
              "@type": "OfferCatalog",
              name: "AI時代のセキュリティ 標準メニュー",
              itemListElement: [
                "AI利用の実態調査",
                "AI利用ガイドライン",
                "AIツールの導入前チェック",
                "取引先へのAI利用の説明（セキュリティチェックシート対応）",
                "社内AI・AIエージェントの権限設計",
                "AIを使った攻撃への備え",
              ].map((name) => ({
                "@type": "Offer",
                itemOffered: { "@type": "Service", name },
              })),
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
