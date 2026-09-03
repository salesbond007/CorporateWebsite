"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

type Session = {
  number: string;
  title: string;
  description: string;
  details: string[];
  note?: string;
};

const sessions: Session[] = [
  {
    number: "01",
    title: "AIの現在地 ― 生成AIからフィジカルAIへ",
    description:
      "AI全体を俯瞰し、生成AI・AIエージェント・フィジカルAIがどのようにつながっているのかを理解します。AIを一部の専門家だけのテーマではなく、自分の仕事・自社の事業に関わるテーマとして捉えます。",
    details: [
      "AI・機械学習・ディープラーニング",
      "LLM",
      "生成AI",
      "AIエージェント",
      "フィジカルAI",
      "生成AI→AIエージェント→フィジカルAIの流れ",
      "AIが得意なこと／苦手なこと",
      "AIによって変わる仕事・産業",
      "人間とAIの役割分担",
    ],
  },
  {
    number: "02",
    title: "生成AI・AIエージェント実践① ― AIを仕事で使う",
    description:
      "生成AIを日常業務で使いこなすための基礎を身につけます。同時に、AIエージェントとの違いを理解し、「答えるAI」から「仕事を実行するAI」への変化を学びます。",
    details: [
      "ChatGPT等の基本操作",
      "LLMの基本的な仕組み",
      "プロンプトの書き方",
      "情報収集・リサーチ／要約",
      "メール・文章作成／資料作成",
      "データ分析",
      "ハルシネーション",
      "AIエージェントとは",
      "生成AIとAIエージェントの違い",
    ],
  },
  {
    number: "03",
    title: "生成AI・AIエージェント実践② ― 業務改善・自動化",
    description:
      "個人の生成AI利用から、部門・会社単位の業務改善へ発展させます。業務を分解し、AI・人・システムの役割を再設計する考え方を学びます。",
    details: [
      "業務分解(入力→処理→判断→出力)",
      "営業／人事／マーケティング×AI",
      "企画／管理部門／製造・現場×AI",
      "RAG・社内データ活用",
      "API・外部システム連携",
      "AIによる業務自動化",
      "Human in the Loop",
      "自部署の業務改善ワーク",
    ],
  },
  {
    number: "04",
    title: "フィジカルAI① ― 基礎・仕組み・最新技術",
    description:
      "フィジカルAIの基本構造と最新技術を理解します。「認識→判断→行動」という考え方を軸に、現実世界でAIが機能する仕組みを非エンジニアにも分かる形で学びます。",
    details: [
      "フィジカルAIとは",
      "認識→判断→行動",
      "生成AIとフィジカルAIの関係",
      "カメラ・センサー／LiDAR",
      "コンピュータビジョン／エッジAI",
      "ロボティクス／AGV・AMR／協働ロボット",
      "LLM・VLM・VLA",
      "シミュレーション・デジタルツイン",
    ],
  },
  {
    number: "05",
    title: "フィジカルAI② ― 業界別ユースケース",
    note: "※オーダーメイド",
    description:
      "実際の産業・現場におけるフィジカルAI活用を学び、「どんな課題を、どんな技術で解決しているのか」を理解します。他社事例から自社への応用を考える視点を身につけます。",
    details: [
      "製造×フィジカルAI(外観検査・予知保全・ロボットピッキング・自律搬送)",
      "物流／建設／小売×フィジカルAI",
      "飲食・ホテル／医療・介護×フィジカルAI",
      "カメラ・センサー活用",
      "人手不足・省人化／品質向上・安全性",
      "他社事例を自社に転用する考え方",
    ],
  },
  {
    number: "06",
    title: "フィジカルAI③ ― 導入・PoC・ROI",
    note: "※オーダーメイド",
    description:
      "フィジカルAIを「知る」だけでなく、企業が実際に導入するまでのプロセスを理解します。課題設定、データ、PoC、ROI、既存設備との連携など、導入する側に必要な知識を学びます。",
    details: [
      "現場課題の発見／フィジカルAI導入プロセス",
      "必要データの整理・収集",
      "技術選定／PoC(技術検証・事業性検証)",
      "ROI・投資回収",
      "既存設備(カメラ・センサー・PLC等)との連携",
      "PoC→本開発→現場導入",
      "既製品／独自開発の判断",
    ],
  },
  {
    number: "07",
    title: "AI×データ・セキュリティ・ガバナンス",
    description:
      "生成AIからフィジカルAIまで、企業がAIを安全に利用・導入するために必要なデータ、セキュリティ、ガバナンス、安全性の基礎を学びます。",
    details: [
      "学習データ・データ品質",
      "個人情報・機密情報／情報漏洩",
      "シャドーAI／アクセス管理",
      "AI利用ルール・AIガバナンス",
      "著作権・知的財産",
      "ハルシネーション・誤判断",
      "フィジカルAI特有の安全性・フェイルセーフ",
      "AIの事故・責任",
    ],
  },
  {
    number: "08",
    title: "部門別AI活用ワークショップ ― 自社のAI活用テーマを発掘する",
    description:
      "2ヶ月で学んだ生成AI・AIエージェント・フィジカルAIの知識をもとに、各部門が自部署の課題を棚卸しし、AI活用候補を発掘します。フィジカルAIに限定せず、課題に最適な手段を考えます。",
    details: [
      "自部署の業務棚卸し(時間・コスト／人手不足／属人化／品質／安全／売上)",
      "生成AI・AIエージェント・従来型AI・フィジカルAIで解決できる課題の切り分け",
      "AIを使わない方がよい課題の見極め",
      "各自でAI活用案を作成し、部門内で有望テーマを選定",
      "BondAIへ提出",
    ],
  },
];

const consulting: Session = {
  number: "09",
  title: "研修終了後：AI導入コンサルティング",
  note: "付加価値プログラム",
  description:
    "第8回で集まった各部門のAI活用案をBondAI側で整理・分析し、経営層・DX/AI責任者・技術責任者等との少人数の壁打ちを通じて、実行すべきテーマと優先順位を整理します。研修の1回には含めず、研修後の付加価値として提供します。",
  details: [
    "各部門から提出されたAI活用案の整理",
    "生成AI／AIエージェント／従来型AI／フィジカルAIへの分類",
    "事業インパクト・実現可能性・投資・導入難易度の整理",
    "優先テーマの選定",
    "既製品導入／PoC／独自開発の判断",
    "短期・中期・長期のAI導入ロードマップ検討",
  ],
};

function SessionCard({ session, accent }: { session: Session; accent?: boolean }) {
  const [open, setOpen] = useState(false);

  return (
    <li
      className={cn(
        "rounded-2xl border bg-white transition-colors",
        accent ? "border-brand-300 bg-brand-50/40" : "border-ink-line",
      )}
    >
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full items-start gap-4 p-5 text-left md:gap-6 md:p-6"
      >
        <span
          className={cn(
            "grid h-11 w-11 shrink-0 place-items-center rounded-full font-display text-sm font-black text-white md:h-12 md:w-12 md:text-base",
            accent ? "bg-brand-900" : "bg-brand-500",
          )}
        >
          {session.number}
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-base font-black text-ink md:text-lg">
              {session.title}
            </h3>
            {session.note ? (
              <span className="rounded-full bg-brand-100 px-2.5 py-0.5 text-[11px] font-bold text-brand-700">
                {session.note}
              </span>
            ) : null}
          </div>
          <p className="mt-2 text-sm leading-relaxed text-ink-soft">
            {session.description}
          </p>
        </div>
        <span
          aria-hidden="true"
          className={cn(
            "mt-1 shrink-0 text-ink-muted transition-transform",
            open && "rotate-180",
          )}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
              d="M4 6l4 4 4-4"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </button>

      {open ? (
        <div className="border-t border-ink-line/70 px-5 pb-5 pt-4 md:px-6 md:pb-6">
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-brand-600">
            主なトピック
          </p>
          <ul className="mt-3 grid gap-x-6 gap-y-2 sm:grid-cols-2">
            {session.details.map((d) => (
              <li key={d} className="flex gap-2 text-sm text-ink-soft">
                <span aria-hidden="true" className="mt-2 h-1 w-1 shrink-0 rounded-full bg-brand-400" />
                <span>{d}</span>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </li>
  );
}

export function CurriculumAccordion() {
  return (
    <ul className="space-y-4">
      {sessions.map((s) => (
        <SessionCard key={s.number} session={s} />
      ))}
      <SessionCard session={consulting} accent />
    </ul>
  );
}
