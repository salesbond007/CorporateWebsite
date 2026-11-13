/**
 * Bond AI セキュリティ LP「料金プラン」。画像は使わず HTML/CSS のみ。
 * 1. プランカード(3列。社外CISOを「おすすめ」として強調)
 * 2. 詳しい比較表(PC: 表 / スマホ: カテゴリごとの開閉式)
 * 3. オプション(別料金)
 * 4. 注記
 * 文言・金額は指定どおり。変更・追加しないこと。
 */

type Plan = {
  name: string;
  amount: string;
  lead: string;
  scale: string;
  style: string;
  recommended?: boolean;
};

const plans: Plan[] = [
  {
    name: "セキュリティ顧問",
    amount: "8万円",
    lead: "まずは相談相手がほしい会社に",
    scale: "30〜100名",
    style: "助言で支える",
  },
  {
    name: "社外CISO",
    amount: "30万円",
    lead: "責任者を置き、取引先に説明したい会社に",
    scale: "50〜300名",
    style: "代わりに進める",
    recommended: true,
  },
  {
    name: "社外CISO（経営参画）",
    amount: "50万円",
    lead: "経営会議まで入ってほしい会社に",
    scale: "100〜1,000名",
    style: "経営の一員として進める",
  },
];

/** 比較表の列名(表示どおり) */
const cols = ["セキュリティ顧問", "社外CISO", "経営参画"] as const;
/** スマホの3行表示の見出し */
const shortCols = ["顧問", "社外CISO", "経営参画"] as const;

type Row = [item: string, advisor: string, ciso: string, exec: string];

const categories: { title: string; rows: Row[] }[] = [
  {
    title: "リスクアセスメント",
    rows: [
      [
        "シャドーAIの可視化（社員アンケート、使われているAIの洗い出し）",
        "―",
        "初月に実施",
        "初月に実施",
      ],
      ["ギャップ分析（AI事業者ガイドラインとの照らし合わせ）", "―", "○", "○"],
      [
        "脆弱性診断（年1回、提携の診断会社が実施）",
        "外部からの自動診断",
        "簡易診断（AIチャットボットを含む）",
        "標準診断（Web・AIアプリ）",
      ],
      ["リスク評価と、改善の優先順位づけ", "定例で助言", "○", "○"],
    ],
  },
  {
    title: "ポリシー策定・AIガバナンス",
    rows: [
      [
        "AI利用ポリシー（入力してよい情報、使ってよいツール、承認の流れ）",
        "ひな形を提供",
        "自社用に作成・改定",
        "作成＋部門ごとの運用",
      ],
      [
        "情報セキュリティ規程・手順書の整備",
        "ひな形を提供",
        "自社用に作成・改定",
        "作成・改定",
      ],
      ["AIツールのリスク評価（導入前チェック）", "相談のみ", "月2件", "月5件"],
      [
        "AIインベントリ（社内で使うAIの台帳）",
        "―",
        "作成と更新",
        "台帳＋影響評価の運用",
      ],
      ["AIエージェントのアクセス権管理", "―", "相談", "設計と定期確認"],
      ["ISO/IEC 42001の維持支援", "別料金", "別料金", "○"],
    ],
  },
  {
    title: "セキュリティ教育・啓発",
    rows: [
      ["社員向けの説明資料", "ひな形を提供", "自社用に作成", "自社用に作成"],
      ["全社員向けのAIルール説明会", "―", "年1回・オンライン60分", "―"],
      ["社員研修", "―", "―", "年1回・半日"],
    ],
  },
  {
    title: "サプライチェーンセキュリティ対応",
    rows: [
      [
        "セキュリティチェックシート対応",
        "回答方法を相談で助言",
        "回答を作成（月2件）",
        "回答を作成（月5件）",
      ],
      ["取引先・監査法人向けの説明資料", "―", "○", "○"],
      [
        "対外的な名前の掲載",
        "社外顧問として",
        "社外CISOとして",
        "社外CISOとして",
      ],
    ],
  },
  {
    title: "継続的な支援",
    rows: [
      [
        "定例ミーティング（オンラインまたは訪問）",
        "月1回・60分",
        "月1回・90分",
        "月2回＋経営会議に月1回参加",
      ],
      [
        "相談窓口",
        "メール・3営業日以内に返答",
        "チャット・2営業日以内に返答",
        "チャット・1営業日以内に返答",
      ],
      [
        "レポート",
        "簡易な月次レポート",
        "月次報告",
        "月次報告＋経営向けの四半期報告",
      ],
      ["1カ月の稼働の目安", "4時間", "10時間", "20時間"],
    ],
  },
  {
    title: "インシデントレスポンス",
    rows: [
      ["緊急時の相談窓口", "メールで受付", "○", "○"],
      ["対応体制・連絡体制の整備", "手順づくりを助言", "○", "○"],
      ["発生時の初動の判断の助言", "―", "○", "○"],
      ["緊急訪問", "―", "―", "年2回まで"],
    ],
  },
];

const options: { menu: string; note?: string; price: string }[] = [
  {
    menu: "ISO/IEC 42001（AIの国際認証）取得支援",
    note: "※審査費用は別",
    price: "200万円〜",
  },
  { menu: "ISO/IEC 42001 維持支援", price: "月5万円〜" },
  { menu: "SCS評価制度 ★3の取得準備", price: "65万円〜" },
  { menu: "AI利用ガイドライン策定（単品）", price: "70万円〜" },
  { menu: "AI影響評価・AIシステム台帳づくり", price: "50万円〜" },
  { menu: "AIエージェントの設計レビュー", price: "50万円〜" },
  {
    menu: "追加の脆弱性診断（LLMアプリ・AIエージェントなど）",
    price: "10万円〜",
  },
  { menu: "社員研修（経営層・管理職・全社員・開発者向け）", price: "30万円〜" },
  { menu: "事故対応の机上演習", price: "60万円〜" },
  { menu: "なりすましメール訓練", price: "30万円〜" },
  { menu: "研修の年間パッケージ", price: "100万円〜" },
  { menu: "CISO育成プログラム（1on1）", price: "45万円〜" },
];

const notes = [
  "価格はすべて税別です。会社の規模やご相談内容に応じてお見積もりします。",
  "最低契約期間は6カ月です。",
  "稼働の目安を超える分は、1時間3万円で承ります。",
  "訪問時の交通費は別途いただきます。",
  "脆弱性診断は提携の診断会社が実施し、結果は担当の専門家がご説明します。",
  "認証（ISO/IEC 42001、SCS評価制度など）は審査機関・評価機関が行います。当社は取得の支援を行います。",
];

/* ------------------------------------------------------------------ 部品 */

/** ○ / ― はアイコン + 読み上げ用テキスト。それ以外は文字のまま */
function Cell({ v }: { v: string }) {
  if (v === "○") {
    return (
      <span className="inline-flex items-center">
        <svg
          viewBox="0 0 20 20"
          className="h-5 w-5 text-[#7A1F3D]"
          aria-hidden="true"
        >
          <circle
            cx="10"
            cy="10"
            r="7.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
          />
        </svg>
        <span className="sr-only">含む</span>
      </span>
    );
  }
  if (v === "―") {
    return (
      <span className="inline-flex items-center">
        <svg
          viewBox="0 0 20 20"
          className="h-5 w-5 text-[#8A8185]"
          aria-hidden="true"
        >
          <path
            d="M5 10h10"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
        <span className="sr-only">含まない</span>
      </span>
    );
  }
  return <>{v}</>;
}

/** 「200万円〜」「月5万円〜」の「〜」を小さく */
function Amount({ text }: { text: string }) {
  const body = text.replace(/〜$/, "");
  return (
    <>
      {body}
      <span className="text-[0.75em] font-bold">〜</span>
    </>
  );
}

function Recommend() {
  return (
    <span className="inline-block bg-[#7A1F3D] px-2.5 py-1 text-xs font-bold leading-none tracking-[0.08em] text-white">
      おすすめ
    </span>
  );
}

/* ------------------------------------------------------------------ 本体 */

export function CisoPricing({ ctaHref }: { ctaHref: string }) {
  return (
    <div className="text-[#1F1A1C]">
      {/* ===== プランカード ===== */}
      <ul className="grid gap-4 md:grid-cols-3 md:gap-5">
        {plans.map((p) => (
          <li
            key={p.name}
            className={`relative flex flex-col bg-white p-6 lg:p-7 ${
              p.recommended
                ? "border-2 border-[#7A1F3D] md:-my-3 md:py-9"
                : "border border-[#E9E1DD]"
            }`}
          >
            {p.recommended ? (
              <p className="absolute -top-px left-1/2 -translate-x-1/2 -translate-y-1/2">
                <Recommend />
              </p>
            ) : null}
            <h3
              className={`text-lg font-black lg:text-xl ${p.recommended ? "text-[#5A142C]" : ""}`}
            >
              {p.name}
            </h3>
            <p className="mt-2 min-h-[3em] text-sm leading-relaxed text-[#5C5458]">
              {p.lead}
            </p>
            <p className="mt-4 flex items-baseline gap-1 border-b border-[#E9E1DD] pb-5">
              <span className="text-sm font-bold text-[#5C5458]">月</span>
              <span className="text-[2.6rem] font-black leading-none tracking-tight text-[#7A1F3D] lg:text-5xl">
                {p.amount}
              </span>
              <span className="text-base font-bold text-[#7A1F3D]">〜</span>
            </p>
            <dl className="mt-5 space-y-3 text-sm">
              <div className="flex gap-3">
                <dt className="w-20 shrink-0 font-bold text-[#5C5458]">
                  目安の規模
                </dt>
                <dd className="font-bold">{p.scale}</dd>
              </div>
              <div className="flex gap-3">
                <dt className="w-20 shrink-0 font-bold text-[#5C5458]">
                  関わり方
                </dt>
                <dd className="font-bold">{p.style}</dd>
              </div>
            </dl>
            <div className="mt-auto pt-7">
              <a
                href={ctaHref}
                className={`flex h-12 items-center justify-center gap-2 text-sm font-bold transition-colors ${
                  p.recommended
                    ? "bg-[#7A1F3D] text-white hover:bg-[#5A142C]"
                    : "border-2 border-[#7A1F3D] text-[#7A1F3D] hover:bg-[#F5E9ED]"
                }`}
              >
                相談する
                <span aria-hidden="true">→</span>
              </a>
            </div>
          </li>
        ))}
      </ul>

      {/* ===== 比較表 ===== */}
      <h3 className="mt-16 text-xl font-black md:mt-20 md:text-2xl">
        プランごとの対応範囲
      </h3>

      {/* PC: 表(プラン名の行はスクロールしても上に残る) */}
      <table className="mt-6 hidden w-full border-collapse text-left text-sm md:table">
        <caption className="sr-only">
          セキュリティ顧問・社外CISO・経営参画の3プランの対応範囲の比較(○は含む、―は含まない)
        </caption>
        <thead>
          <tr>
            <th
              scope="col"
              className="sticky top-[4.5rem] z-10 w-[34%] border-b-2 border-[#1F1A1C] bg-white py-3 pr-3 text-xs font-bold text-[#5C5458]"
            >
              項目
            </th>
            {cols.map((c, i) => (
              <th
                key={c}
                scope="col"
                className={`sticky top-[4.5rem] z-10 w-[22%] border-b-2 px-3 py-3 text-center text-[15px] font-black ${
                  i === 1
                    ? "border-[#7A1F3D] bg-[#F5E9ED] text-[#5A142C]"
                    : "border-[#1F1A1C] bg-white"
                }`}
              >
                {i === 1 ? (
                  <span className="mb-1 block">
                    <Recommend />
                  </span>
                ) : null}
                {c}
              </th>
            ))}
          </tr>
        </thead>
        {categories.map((cat) => (
          <tbody key={cat.title}>
            <tr>
              <th
                scope="colgroup"
                colSpan={4}
                className="border-b border-[#E9E1DD] bg-[#FBF8F6] px-3 pb-2.5 pt-6 text-[15px] font-black text-[#5A142C]"
              >
                {cat.title}
              </th>
            </tr>
            {cat.rows.map(([item, ...vals]) => (
              <tr key={item} className="border-b border-[#E9E1DD]">
                <th
                  scope="row"
                  className="py-3.5 pl-3 pr-3 font-bold leading-relaxed"
                >
                  {item}
                </th>
                {vals.map((v, i) => (
                  <td
                    key={i}
                    className={`px-3 py-3.5 text-center leading-relaxed ${i === 1 ? "bg-[#F5E9ED]/60 font-bold" : ""}`}
                  >
                    <Cell v={v} />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        ))}
      </table>

      {/* スマホ: カテゴリごとの開閉式 */}
      <div className="mt-5 border-t border-[#E9E1DD] md:hidden">
        {categories.map((cat) => (
          <details key={cat.title} className="group border-b border-[#E9E1DD]">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-3 py-4 text-[15px] font-black text-[#5A142C] [&::-webkit-details-marker]:hidden">
              {cat.title}
              <svg
                viewBox="0 0 20 20"
                aria-hidden="true"
                className="h-5 w-5 shrink-0 text-[#7A1F3D] transition-transform group-open:rotate-180"
              >
                <path
                  d="M5 8l5 5 5-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </summary>
            <dl className="space-y-4 pb-5">
              {cat.rows.map(([item, ...vals]) => (
                <div key={item}>
                  <dt className="text-sm font-bold leading-relaxed">{item}</dt>
                  <dd className="mt-1.5 space-y-1 border-l-2 border-[#E9E1DD] pl-3 text-[13px] leading-relaxed text-[#5C5458]">
                    {vals.map((v, i) => (
                      <p
                        key={i}
                        className={`flex gap-1 ${i === 1 ? "font-bold text-[#5A142C]" : ""}`}
                      >
                        <span className="shrink-0">{shortCols[i]}：</span>
                        <span>
                          <Cell v={v} />
                        </span>
                      </p>
                    ))}
                  </dd>
                </div>
              ))}
            </dl>
          </details>
        ))}
      </div>

      {/* ===== オプション ===== */}
      <h3 className="mt-16 text-xl font-black md:mt-20 md:text-2xl">
        オプション（別料金）
      </h3>
      <table className="mt-5 w-full border-collapse text-left text-sm md:text-[15px]">
        <caption className="sr-only">オプションメニューと料金</caption>
        <thead>
          <tr className="border-b-2 border-[#1F1A1C]">
            <th
              scope="col"
              className="py-2.5 pr-3 text-xs font-bold text-[#5C5458]"
            >
              メニュー
            </th>
            <th
              scope="col"
              className="py-2.5 text-right text-xs font-bold text-[#5C5458]"
            >
              料金
            </th>
          </tr>
        </thead>
        <tbody>
          {options.map((o) => (
            <tr key={o.menu} className="border-b border-[#E9E1DD]">
              <th scope="row" className="py-3.5 pr-3 font-bold leading-relaxed">
                {o.menu}
                {o.note ? (
                  <span className="ml-2 text-xs font-medium text-[#5C5458]">
                    {o.note}
                  </span>
                ) : null}
              </th>
              <td className="whitespace-nowrap py-3.5 text-right text-base font-black text-[#7A1F3D] md:text-lg">
                <Amount text={o.price} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="mt-5 border-l-4 border-[#7A1F3D] bg-[#F5E9ED] px-4 py-3 text-sm font-bold leading-relaxed text-[#5A142C]">
        補足：社外CISO・経営参画プランをご契約中は、大型メニュー（ISO/IEC
        42001取得支援、★3取得準備、ガイドライン策定など）を20%引きでご提供します。
      </p>

      {/* ===== 注記 ===== */}
      <ul className="mt-8 space-y-1.5 text-xs leading-relaxed text-[#5C5458]">
        {notes.map((n) => (
          <li key={n} className="flex gap-1.5">
            <span aria-hidden="true">・</span>
            {n}
          </li>
        ))}
      </ul>
    </div>
  );
}
