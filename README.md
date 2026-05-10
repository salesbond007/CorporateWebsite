# Corporate Website

BtoB向けコーポレートサイトのスケルトン。Next.js 14 (App Router) + TypeScript + Tailwind CSS + microCMS。

## 構成

| パス | 役割 |
| --- | --- |
| `/` | トップページ |
| `/about` | 私たちについて |
| `/services` | サービス概要（3サービス一覧） |
| `/services/[slug]` | サービスごとのLP |
| `/company` | 会社概要 |
| `/blog` | 記事一覧（microCMS） |
| `/blog/[slug]` | 記事詳細（microCMS） |
| `/contact/business` | お問い合わせ（企業様） |
| `/contact/professional` | お問い合わせ（プロ人材） |
| `/api/contact` | 問い合わせフォームの送信API（Resend） |

## デザインシステム

- メインカラー: `#F58220` (Tailwind: `brand-500`)
- フォント: Noto Sans JP (Google Fonts)
- レイアウト: コンテナ最大幅 1200px / レスポンシブ（モバイル, md, lg）
- コンポーネント: `src/components/ui` 配下
- グローバルスタイル: `src/app/globals.css`

## セットアップ

```bash
# 依存関係のインストール
npm install

# 環境変数を設定
cp .env.example .env.local
# .env.local を編集

# 開発サーバ
npm run dev
```

## 環境変数

`.env.example` を参照。主要なもの:

| 変数 | 用途 |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | OGP / sitemap で使うサイトURL |
| `MICROCMS_SERVICE_DOMAIN` | microCMSのサブドメイン |
| `MICROCMS_API_KEY` | microCMSのAPIキー |
| `RESEND_API_KEY` | 問い合わせフォームのメール送信 |
| `CONTACT_MAIL_FROM` | 送信元アドレス |
| `CONTACT_MAIL_TO_BUSINESS` | 企業様問い合わせの宛先 |
| `CONTACT_MAIL_TO_PROFESSIONAL` | プロ人材問い合わせの宛先 |

`MICROCMS_*` が未設定でもビルド・起動は可能。記事一覧は空表示になる。
`RESEND_API_KEY` が未設定の場合、問い合わせ送信はサーバログに出力されるドライランになる。

## microCMS スキーマ

**APIエンドポイント名**: `articles` (リスト形式)

| フィールドID | 種類 | 必須 |
| --- | --- | --- |
| `title` | テキストフィールド | ✓ |
| `slug` | テキストフィールド（半角英数記号） | ✓ |
| `description` | テキストエリア | |
| `body` | リッチエディタ（画像・動画埋め込み可） | ✓ |
| `thumbnail` | 画像 | |
| `category` | コンテンツ参照（カテゴリ） | |
| `tags` | 複数選択 | |

**カテゴリ用エンドポイント**: `categories` (リスト形式)

| フィールドID | 種類 |
| --- | --- |
| `name` | テキスト |
| `slug` | テキスト |

## 検索エンジン対応

- `src/app/sitemap.ts` で `/sitemap.xml` を自動生成
- `src/app/robots.ts` で `/robots.txt` を自動生成
- 記事ページは `revalidate = 60` でISR

## TODO

テキストや画像など、`TODO:` コメントの箇所をクライアント情報に差し替える。

- `src/lib/site.ts` のサイト名 / ナビ / サービス一覧
- 各ページの見出し・本文プレースホルダ
- ロゴ画像 (現状は文字ロゴ)
- favicon / OG画像
