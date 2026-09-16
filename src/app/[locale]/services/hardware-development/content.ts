// このファイルは /services/hardware-development で配信する単一HTMLの中身。
// 技術要件上、外部ライブラリを使わず単一ファイル(インラインCSS/JS)で完結させる必要が
// あるため、Next.jsのコンポーネント機構(Tailwind/React)を使わず、素のHTML文字列を
// route.tsから直接レスポンスとして返している。
export const hardwareDevelopmentHtml = String.raw`<!DOCTYPE html>
<html lang="ja">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>ハードウェア開発支援 | SERVICE NAME</title>
<meta name="description" content="製造業向けに、ハードウェア領域のエンジニア・PM・技術顧問を業務委託(準委任)で提供します。機構から組込み、無線、AI、制御、品質・安全まで。">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;500;700&family=Inter:wght@400;500;700&display=swap" rel="stylesheet">
<style>
:root{
  --wine-900:#4A1024;
  --wine-700:#6B1730;
  --wine-500:#8B2242;
  --wine-100:#F5EBEE;
  --ink-900:#1A1A1C;
  --ink-600:#5A5A60;
  --ink-300:#C8C8CC;
  --paper:#FCFBFA;
  --paper-2:#F4F2F0;

  --space-1:8px;
  --space-2:16px;
  --space-3:24px;
  --space-4:40px;
  --space-5:64px;
  --space-6:96px;
  --space-7:128px;

  --content-max:1080px;
  --text-max:720px;
}

*,*::before,*::after{box-sizing:border-box;}
html{-webkit-text-size-adjust:100%;}
body{
  margin:0;
  background:var(--paper);
  color:var(--ink-900);
  font-family:'Noto Sans JP','Inter',-apple-system,BlinkMacSystemFont,'Segoe UI',Hiragino Sans,Meiryo,sans-serif;
  font-weight:400;
  line-height:1.9;
  letter-spacing:0.02em;
  -webkit-font-smoothing:antialiased;
}
.num{font-family:'Inter','Noto Sans JP',sans-serif;font-feature-settings:"tnum" 1,"lnum" 1;}

img,svg{display:block;max-width:100%;}
a{color:inherit;}
button{font:inherit;}

.wrap{
  max-width:var(--content-max);
  margin:0 auto;
  padding-left:20px;
  padding-right:20px;
}
@media (min-width:768px){
  .wrap{padding-left:40px;padding-right:40px;}
}

.text-block{max-width:var(--text-max);}

section{padding-top:72px;padding-bottom:72px;}
@media (min-width:1024px){
  section{padding-top:128px;padding-bottom:128px;}
}

h1,h2,h3{
  font-weight:700;
  margin:0;
}
h1{
  font-size:clamp(1.75rem,4.5vw,3.25rem);
  line-height:1.25;
  letter-spacing:-0.02em;
}
h2{
  font-size:clamp(1.375rem,3vw,2.125rem);
  line-height:1.35;
  letter-spacing:-0.01em;
}
h3{
  font-size:clamp(1.0625rem,2vw,1.25rem);
  font-weight:500;
  line-height:1.4;
}
p{margin:0;}
.body-text{
  font-size:1rem;
  line-height:1.9;
  letter-spacing:0.02em;
  color:var(--ink-900);
}
@media (min-width:1024px){
  .body-text{font-size:1.0625rem;}
}
.sub-text{font-size:0.875rem;color:var(--ink-600);line-height:1.8;}
.note-text{font-size:0.75rem;color:var(--ink-600);line-height:1.7;}

.eyebrow{
  display:inline-block;
  font-size:0.75rem;
  font-weight:700;
  letter-spacing:0.15em;
  text-transform:uppercase;
  color:var(--wine-700);
}

.rule-short{
  width:48px;
  height:3px;
  background:var(--wine-700);
  border:0;
  margin:0 0 var(--space-3);
}

.hr{border:0;border-top:1px solid var(--ink-300);}

.btn{
  display:inline-flex;
  align-items:center;
  justify-content:center;
  height:52px;
  padding:0 32px;
  background:var(--wine-700);
  color:#fff;
  text-decoration:none;
  font-weight:500;
  font-size:0.9375rem;
  border-radius:4px;
  border:1px solid var(--wine-700);
  cursor:pointer;
  transition:background-color .2s ease,border-color .2s ease;
}
.btn:hover{background:var(--wine-500);border-color:var(--wine-500);}
.btn:focus-visible{outline:2px solid var(--wine-700);outline-offset:2px;}

.btn-invert{
  background:#fff;
  color:var(--wine-700);
  border-color:#fff;
}
.btn-invert:hover{background:var(--paper-2);border-color:var(--paper-2);color:var(--wine-700);}

.bg-2{background:var(--paper-2);}

/* ---------- reveal(スクロールフェードイン) ---------- */
.reveal{opacity:0;transform:translateY(12px);transition:opacity .5s ease-out,transform .5s ease-out;}
.reveal.is-visible{opacity:1;transform:translateY(0);}
@media (prefers-reduced-motion: reduce){
  .reveal{opacity:1;transform:none;transition:none;}
}

/* ---------- header ---------- */
.site-header{
  border-bottom:1px solid var(--ink-300);
  background:var(--paper);
}
.site-header .wrap{
  height:64px;
  display:flex;
  align-items:center;
  justify-content:space-between;
}
.logo-placeholder{
  font-family:'Inter',sans-serif;
  font-weight:700;
  font-size:0.9375rem;
  letter-spacing:0.08em;
  color:var(--wine-900);
}

/* ---------- ① hero ---------- */
.hero .wrap{padding-top:96px;padding-bottom:96px;}
@media (min-width:1024px){
  .hero .wrap{padding-top:128px;padding-bottom:128px;}
}
.hero h1{margin-top:var(--space-2);margin-bottom:var(--space-3);color:var(--wine-900);}
.hero .lead{max-width:var(--text-max);margin-bottom:var(--space-4);}

/* ---------- ② 課題提起 ---------- */
.problem-grid{
  display:grid;
  grid-template-columns:1fr;
  gap:1px;
  background:var(--ink-300);
  border:1px solid var(--ink-300);
  margin-top:var(--space-5);
}
@media (min-width:768px){
  .problem-grid{grid-template-columns:repeat(3,1fr);}
}
.problem-card{
  background:var(--paper);
  padding:var(--space-4) var(--space-3);
}
.problem-card svg{margin-bottom:var(--space-2);color:var(--wine-700);}
.problem-card h3{margin-bottom:8px;color:var(--ink-900);}
.problem-card p{color:var(--ink-600);font-size:0.9375rem;}

/* ---------- ③ 構造の説明 ---------- */
.structure-stats{
  display:flex;
  flex-direction:column;
  margin-top:var(--space-5);
  border-top:1px solid var(--ink-300);
  border-bottom:1px solid var(--ink-300);
}
@media (min-width:768px){
  .structure-stats{flex-direction:row;}
}
.stat{
  flex:1;
  padding:var(--space-4) var(--space-2);
  border-bottom:1px solid var(--ink-300);
}
.stat:last-child{border-bottom:0;}
@media (min-width:768px){
  .stat{border-bottom:0;border-right:1px solid var(--ink-300);}
  .stat:last-child{border-right:0;}
}
.stat-value{
  font-size:clamp(3rem,8vw,5.5rem);
  font-weight:700;
  color:var(--wine-700);
  line-height:1;
  letter-spacing:-0.02em;
}
.stat-unit{font-size:1.125rem;font-weight:500;margin-left:4px;color:var(--wine-700);}
.stat-label{margin-top:var(--space-2);font-size:0.875rem;color:var(--ink-600);}

.compare{
  display:grid;
  grid-template-columns:1fr;
  margin-top:var(--space-5);
}
@media (min-width:768px){
  .compare{grid-template-columns:1fr 1px 1fr;column-gap:var(--space-4);}
}
.compare-col{padding:var(--space-3) 0;}
.compare-divider{background:var(--ink-300);}
.compare-col .eyebrow{margin-bottom:var(--space-2);}

.structure-conclusion{
  margin-top:var(--space-6);
  padding-top:var(--space-5);
  padding-bottom:var(--space-2);
  color:var(--wine-900);
  font-weight:500;
  font-size:1.125rem;
  line-height:1.9;
}

/* ---------- ④ 2つの柱 ---------- */
.pillars{
  display:grid;
  grid-template-columns:1fr;
  margin-top:var(--space-5);
}
@media (min-width:768px){
  .pillars{grid-template-columns:1fr 1px 1fr;column-gap:var(--space-5);}
}
.pillar-divider{background:var(--ink-300);}
.pillar{padding-top:var(--space-3);padding-bottom:var(--space-5);}
.pillar .eyebrow{letter-spacing:0.15em;}
.pillar h3.pillar-title{
  margin-top:var(--space-2);
  margin-bottom:var(--space-2);
  font-size:1.375rem;
  font-weight:700;
  color:var(--ink-900);
}
.pillar-desc{color:var(--ink-600);margin-bottom:var(--space-4);}
.area-list{list-style:none;margin:0;padding:0;}
.area-list li{
  border-left:2px solid var(--wine-700);
  padding:10px 0 10px var(--space-2);
  margin-bottom:2px;
}
.area-list .area-title{display:block;font-weight:500;font-size:0.9375rem;}
.area-list .area-body{display:block;font-size:0.8125rem;color:var(--ink-600);margin-top:2px;}

/* ---------- ⑤ 頼み方の5段階 ---------- */
.engage-table{
  width:100%;
  border-collapse:collapse;
  margin-top:var(--space-5);
  display:none;
}
.engage-table th,.engage-table td{
  text-align:left;
  padding:16px 20px;
  border-bottom:1px solid var(--ink-300);
  font-size:0.9375rem;
}
.engage-table thead th{
  background:var(--wine-100);
  font-weight:700;
  color:var(--wine-900);
  font-size:0.8125rem;
  letter-spacing:0.05em;
}
.engage-table td.col-duration{font-family:'Inter',sans-serif;font-feature-settings:"tnum" 1;}
@media (min-width:768px){
  .engage-table{display:table;}
  .engage-cards{display:none;}
}
.engage-cards{margin-top:var(--space-5);}
.engage-card{
  border-top:1px solid var(--ink-300);
  padding:var(--space-2) 0;
}
.engage-card:last-child{border-bottom:1px solid var(--ink-300);}
.engage-card .stage{font-weight:700;color:var(--wine-900);}
.engage-card .meta{margin-top:4px;font-size:0.8125rem;color:var(--ink-600);}

/* ---------- ⑥ 選ばれる理由 ---------- */
.reasons{
  display:grid;
  grid-template-columns:1fr;
  gap:1px;
  background:var(--ink-300);
  border:1px solid var(--ink-300);
  margin-top:var(--space-5);
}
@media (min-width:640px){
  .reasons{grid-template-columns:1fr 1fr;}
}
.reason{
  position:relative;
  background:var(--paper);
  padding:var(--space-4) var(--space-3);
  overflow:hidden;
}
.reason .reason-num{
  position:absolute;
  top:-0.15em;
  right:var(--space-2);
  font-size:5rem;
  font-weight:700;
  color:var(--wine-100);
  line-height:1;
  user-select:none;
  z-index:0;
}
.reason h3{position:relative;z-index:1;margin-bottom:8px;}
.reason p{position:relative;z-index:1;color:var(--ink-600);font-size:0.9375rem;}

/* ---------- ⑦ 規格・規制 ---------- */
.reg-list{list-style:none;margin:var(--space-5) 0 0;padding:0;}
.reg-item{
  border-left:2px solid var(--wine-700);
  padding:var(--space-2) 0 var(--space-2) var(--space-3);
  margin-bottom:var(--space-2);
}
.reg-date{
  font-family:'Inter',sans-serif;
  font-feature-settings:"tnum" 1;
  font-weight:700;
  color:var(--wine-700);
  font-size:1.0625rem;
}
.reg-title{margin-top:4px;font-weight:500;}
.reg-desc{margin-top:4px;color:var(--ink-600);font-size:0.9375rem;}

/* ---------- ⑧ 登録技術者 ---------- */
.engineers{
  display:grid;
  grid-template-columns:1fr;
  gap:var(--space-3);
  margin-top:var(--space-5);
}
@media (min-width:768px){
  .engineers{grid-template-columns:1fr 1fr;}
}
.engineer-card{border:1px solid var(--ink-300);}
.engineer-band{height:4px;background:var(--wine-700);}
.engineer-body{padding:var(--space-3);}
.engineer-emphasis{
  font-family:'Inter',sans-serif;
  font-size:2.5rem;
  font-weight:700;
  color:var(--wine-700);
  line-height:1;
}
.engineer-emphasis-unit{font-size:1rem;font-weight:500;color:var(--wine-700);margin-left:4px;}
.engineer-text{margin-top:var(--space-2);color:var(--ink-900);}

/* ---------- ⑨ 利用の流れ ---------- */
.flow{
  display:grid;
  grid-template-columns:1fr;
  margin-top:var(--space-5);
}
@media (min-width:768px){
  .flow{grid-template-columns:repeat(4,1fr);}
}
.flow-step{
  padding:var(--space-3) var(--space-2) var(--space-3) 0;
  border-top:1px solid var(--ink-300);
}
@media (min-width:768px){
  .flow-step{border-top:none;border-left:1px solid var(--ink-300);padding-left:var(--space-3);}
  .flow-step:first-child{border-left:none;padding-left:0;}
}
.flow-num{
  font-family:'Inter',sans-serif;
  font-size:1.5rem;
  font-weight:700;
  color:var(--wine-700);
  display:inline-block;
  padding-bottom:8px;
  border-bottom:2px solid var(--wine-700);
  margin-bottom:var(--space-2);
}
.flow-step h3{margin-bottom:6px;}
.flow-step p{color:var(--ink-600);font-size:0.875rem;}

/* ---------- ⑩ フォーム ---------- */
.form-wrap{max-width:560px;margin:var(--space-5) auto 0;}
.field{margin-bottom:var(--space-4);}
.field label{
  display:block;
  font-size:0.8125rem;
  font-weight:500;
  color:var(--ink-600);
  margin-bottom:8px;
}
.field input,.field textarea{
  width:100%;
  border:0;
  border-bottom:1px solid var(--ink-300);
  background:transparent;
  padding:10px 2px;
  font:inherit;
  color:var(--ink-900);
  border-radius:0;
}
.field textarea{resize:vertical;min-height:120px;}
.field input:focus,.field textarea:focus{
  outline:none;
  border-bottom-color:var(--wine-700);
}
.form-submit{width:100%;margin-top:var(--space-2);}

/* ---------- FAQ ---------- */
.faq-list{border-top:1px solid var(--ink-300);margin-top:var(--space-5);}
.faq-item{border-bottom:1px solid var(--ink-300);}
.faq-q{
  width:100%;
  background:none;
  border:0;
  text-align:left;
  padding:20px 0;
  display:flex;
  align-items:flex-start;
  justify-content:space-between;
  gap:16px;
  cursor:pointer;
  color:var(--ink-900);
}
.faq-q .q-text{font-weight:500;font-size:0.9375rem;display:flex;gap:12px;}
.faq-q .q-mark{color:var(--wine-700);font-weight:700;}
.faq-chevron{flex-shrink:0;margin-top:4px;color:var(--ink-600);transition:transform .2s ease;}
.faq-item[data-open="true"] .faq-chevron{transform:rotate(180deg);}
.faq-a-wrap{height:0;overflow:hidden;transition:height .25s ease;}
@media (prefers-reduced-motion: reduce){
  .faq-a-wrap{transition:none;}
}
.faq-a{padding-bottom:20px;font-size:0.9375rem;color:var(--ink-600);display:flex;gap:12px;}
.faq-a .a-mark{font-weight:700;color:var(--ink-600);}

/* ---------- ⑫ 最後のCTA ---------- */
.final-cta{background:var(--wine-700);color:#fff;text-align:left;}
.final-cta h2{color:#fff;margin-bottom:var(--space-2);}
.final-cta p{color:rgba(255,255,255,0.85);margin-bottom:var(--space-4);}

/* ---------- ⑬ フッター ---------- */
footer{background:var(--ink-900);color:rgba(255,255,255,0.7);padding:var(--space-4) 0;}
footer .wrap{
  display:flex;
  flex-direction:column;
  gap:var(--space-2);
}
@media (min-width:768px){
  footer .wrap{flex-direction:row;justify-content:space-between;align-items:center;}
}
footer .foot-info{font-size:0.8125rem;line-height:1.9;}
footer .foot-links{display:flex;gap:var(--space-3);font-size:0.8125rem;}
footer a{text-decoration:none;}
footer a:hover{color:#fff;}
.foot-divider{border-top:1px solid rgba(255,255,255,0.15);margin-top:var(--space-3);padding-top:var(--space-3);font-size:0.75rem;}

/* focus visibility全体 */
a:focus-visible,button:focus-visible,input:focus-visible,textarea:focus-visible{
  outline:2px solid var(--wine-700);
  outline-offset:2px;
}
</style>
</head>
<body>

<header class="site-header">
  <div class="wrap">
    <span class="logo-placeholder">SERVICE NAME</span>
    <a href="#contact" class="btn" style="height:40px;padding:0 20px;font-size:0.8125rem;">相談する</a>
  </div>
</header>

<!-- ① ファーストビュー -->
<section class="hero">
  <div class="wrap">
    <div class="text-block reveal">
      <hr class="rule-short">
      <h1>ハードウェア開発の即戦力を、<br>必要な期間だけ</h1>
      <p class="body-text lead">
        開発の一線で判断してきたエンジニア・PM・技術顧問が入ります。<br>
        機構から組込み、無線、AI、制御、品質・安全まで。
      </p>
      <a href="#contact" class="btn">相談する(無料)</a>
    </div>
  </div>
</section>

<!-- ② 課題提起 -->
<section class="bg-2">
  <div class="wrap">
    <div class="reveal">
      <span class="eyebrow">Problem</span>
      <h2 style="margin-top:12px;">こんな課題は<br class="mobile-break">ありませんか</h2>
    </div>

    <div class="problem-grid">
      <div class="problem-card reveal">
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none"><circle cx="14" cy="14" r="4" stroke="currentColor" stroke-width="1.5"/><path d="M14 3v3M14 22v3M25 14h-3M6 14H3M21.6 6.4l-2.1 2.1M8.5 19.5l-2.1 2.1M21.6 21.6l-2.1-2.1M8.5 8.5L6.4 6.4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
        <h3>機構設計ができる人がいない</h3>
        <p>筐体・治具まで踏み込んで設計できる人材が社内にいない。</p>
      </div>
      <div class="problem-card reveal">
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none"><rect x="6" y="6" width="16" height="16" rx="1" stroke="currentColor" stroke-width="1.5"/><path d="M11 6V3M17 6V3M11 25v-3M17 25v-3M6 11H3M6 17H3M25 11h-3M25 17h-3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
        <h3>試作から量産に進められない</h3>
        <p>プロトタイプはできても、量産設計・立上げの知見が不足している。</p>
      </div>
      <div class="problem-card reveal">
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none"><path d="M6 20a11 11 0 0116 0M9.5 16.5a6.5 6.5 0 019 0M14 21v.01" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
        <h3>無線・法規対応の知見がない</h3>
        <p>Wi-Fi/BLE実装や電波法認証、EMC対応をどこから進めればよいか分からない。</p>
      </div>
      <div class="problem-card reveal">
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none"><rect x="9" y="9" width="10" height="10" rx="1" stroke="currentColor" stroke-width="1.5"/><path d="M14 4v3M14 21v3M4 14h3M21 14h3M6.5 6.5l2 2M19.5 6.5l-2 2M6.5 21.5l2-2M19.5 21.5l-2-2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
        <h3>エッジAI実装まで手が回らない</h3>
        <p>機器上でのAI推論・異常検知の実装を担える人材がいない。</p>
      </div>
      <div class="problem-card reveal">
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none"><circle cx="14" cy="14" r="10" stroke="currentColor" stroke-width="1.5"/><path d="M14 8v6l4 3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
        <h3>開発が遅れているが原因が分からない</h3>
        <p>スケジュールが遅延しているが、どこがボトルネックか整理できていない。</p>
      </div>
      <div class="problem-card reveal">
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none"><circle cx="14" cy="10" r="4" stroke="currentColor" stroke-width="1.5"/><path d="M5 24c1.5-5 5-7.5 9-7.5s7.5 2.5 9 7.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
        <h3>社内に技術を判断できる人がいない</h3>
        <p>提案や見積りの妥当性を、社内だけでは判断しきれない。</p>
      </div>
    </div>
  </div>
</section>

<!-- ③ 構造の説明(最重要) -->
<section>
  <div class="wrap">
    <div class="text-block reveal">
      <span class="eyebrow">Structure</span>
      <h2 style="margin-top:12px;">なぜ「今」<br class="mobile-break">ハードウェア人材が足りないのか</h2>
    </div>

    <div class="structure-stats reveal">
      <div class="stat">
        <div><span class="stat-value num">1.2</span><span class="stat-unit">倍</span></div>
        <p class="stat-label">全職種平均の有効求人倍率(目安)</p>
      </div>
      <div class="stat">
        <div><span class="stat-value num">3.0</span><span class="stat-unit">倍</span></div>
        <p class="stat-label">IT人材の有効求人倍率(目安)</p>
      </div>
      <div class="stat">
        <div><span class="stat-value num">6.00</span><span class="stat-unit">倍</span></div>
        <p class="stat-label">ハードウェア技術者の有効求人倍率(目安)</p>
      </div>
    </div>
    <p class="note-text" style="margin-top:12px;">
      <!-- TODO: 正式な数値・出典が確定次第、実データに差し替える -->
      ※各種公開統計をもとにした目安値です。正式な数値は別途ご確認ください。
    </p>

    <div class="compare reveal">
      <div class="compare-col">
        <span class="eyebrow">IT人材</span>
        <p class="body-text" style="margin-top:12px;">
          採用競争は激しいものの、母数自体は大きく、業務委託・副業など調達手段も多様化しています。
        </p>
      </div>
      <div class="compare-divider"></div>
      <div class="compare-col">
        <span class="eyebrow">ハードウェア人材</span>
        <p class="body-text" style="margin-top:12px;">
          機構・電気・組込みを横断できる人材はもともと母数が少なく、育成にも時間がかかるため、代替が利きません。
        </p>
      </div>
    </div>

    <p class="structure-conclusion reveal text-block">
      だからこそ、必要な期間だけ、必要な技術者に、直接依頼できる仕組みが必要です。
    </p>
  </div>
</section>

<!-- ④ 2つの柱 -->
<section class="bg-2">
  <div class="wrap">
    <div class="reveal">
      <span class="eyebrow">Team</span>
      <h2 style="margin-top:12px;">2つの柱</h2>
    </div>

    <div class="pillars">
      <div class="pillar reveal">
        <span class="eyebrow">ENGINEER</span>
        <h3 class="pillar-title">エンジニア｜手を動かす</h3>
        <p class="pillar-desc body-text">実装・設計・立上げを担います。</p>
        <ul class="area-list">
          <li><span class="area-title">機構・機械設計</span><span class="area-body">機構、筐体、治具</span></li>
          <li><span class="area-title">電気・回路</span><span class="area-body">回路設計、基板設計</span></li>
          <li><span class="area-title">組込み</span><span class="area-body">C/C++、マイコン、組込みLinux</span></li>
          <li><span class="area-title">無線・通信</span><span class="area-body">Wi-Fi、BLE、電波法認証、EMC</span></li>
          <li><span class="area-title">エッジAI</span><span class="area-body">機器上でのAI実装、異常検知</span></li>
          <li><span class="area-title">組込みセキュリティ</span><span class="area-body">改ざん検知、暗号</span></li>
          <li><span class="area-title">制御</span><span class="area-body">PLC、ライン立上げ</span></li>
          <li><span class="area-title">品質・安全</span><span class="area-body">評価試験、規格対応</span></li>
        </ul>
      </div>

      <div class="pillar-divider"></div>

      <div class="pillar reveal">
        <span class="eyebrow">PM / ADVISOR</span>
        <h3 class="pillar-title">PM・技術顧問｜判断し、率いる</h3>
        <p class="pillar-desc body-text">要件定義、開発推進、ベンダー調整、量産移行、技術判断を担います。</p>
        <p class="note-text" style="margin-bottom:12px;">こんなときに</p>
        <ul class="area-list">
          <li><span class="area-title">何を作るかが決まらない</span></li>
          <li><span class="area-title">開発が遅れているが、原因も打ち手も分からない</span></li>
          <li><span class="area-title">試作から量産に進められない</span></li>
          <li><span class="area-title">社内に技術を判断できる人がいない</span></li>
        </ul>
      </div>
    </div>
  </div>
</section>

<!-- ⑤ 頼み方の5段階 -->
<section>
  <div class="wrap">
    <div class="reveal">
      <span class="eyebrow">How to ask</span>
      <h2 style="margin-top:12px;">頼み方の5段階</h2>
      <p class="body-text" style="margin-top:16px;">小さな相談から、開発への参画まで。必要な段階だけご利用いただけます。</p>
    </div>

    <table class="engage-table reveal">
      <thead>
        <tr>
          <th>段階</th>
          <th>内容</th>
          <th>期間の目安</th>
          <th>頻度</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>技術相談</td>
          <td>課題の整理、技術的な妥当性の確認</td>
          <td class="col-duration num">1〜2時間</td>
          <td>単発</td>
        </tr>
        <tr>
          <td>診断・レビュー</td>
          <td>設計・仕様・進行中プロジェクトのレビュー</td>
          <td class="col-duration num">1日〜</td>
          <td>単発</td>
        </tr>
        <tr>
          <td>技術顧問</td>
          <td>継続的な技術判断・意思決定の伴走</td>
          <td class="col-duration num">月1〜2回</td>
          <td>継続</td>
        </tr>
        <tr>
          <td>PM参画</td>
          <td>要件定義からベンダー調整、量産移行までの推進</td>
          <td class="col-duration num">開発期間中</td>
          <td>継続</td>
        </tr>
        <tr>
          <td>開発参画</td>
          <td>設計・実装・立上げの実務そのものを担当</td>
          <td class="col-duration num">数ヶ月〜</td>
          <td>継続</td>
        </tr>
      </tbody>
    </table>

    <div class="engage-cards reveal">
      <div class="engage-card">
        <p class="stage">技術相談</p>
        <p class="meta">課題の整理、技術的な妥当性の確認 ／ <span class="num">1〜2時間</span> ／ 単発</p>
      </div>
      <div class="engage-card">
        <p class="stage">診断・レビュー</p>
        <p class="meta">設計・仕様・進行中プロジェクトのレビュー ／ <span class="num">1日〜</span> ／ 単発</p>
      </div>
      <div class="engage-card">
        <p class="stage">技術顧問</p>
        <p class="meta">継続的な技術判断・意思決定の伴走 ／ <span class="num">月1〜2回</span> ／ 継続</p>
      </div>
      <div class="engage-card">
        <p class="stage">PM参画</p>
        <p class="meta">要件定義からベンダー調整、量産移行までの推進 ／ <span class="num">開発期間中</span> ／ 継続</p>
      </div>
      <div class="engage-card">
        <p class="stage">開発参画</p>
        <p class="meta">設計・実装・立上げの実務そのものを担当 ／ <span class="num">数ヶ月〜</span> ／ 継続</p>
      </div>
    </div>
  </div>
</section>

<!-- ⑥ 選ばれる理由 -->
<section class="bg-2">
  <div class="wrap">
    <div class="reveal">
      <span class="eyebrow">Why us</span>
      <h2 style="margin-top:12px;">選ばれる理由</h2>
    </div>

    <div class="reasons">
      <div class="reason reveal">
        <span class="reason-num num">01</span>
        <h3>二次受けなし、直接依頼</h3>
        <p>弊社から技術者へ直接依頼するため、伝言による情報のロスがありません。</p>
      </div>
      <div class="reason reveal">
        <span class="reason-num num">02</span>
        <h3>準委任契約、指示系統も明確</h3>
        <p>業務範囲と成果物を事前に定め、指示は弊社を通す運用のため、契約上の位置づけが明確です。</p>
      </div>
      <div class="reason reveal">
        <span class="reason-num num">03</span>
        <h3>経歴で担保する技術力</h3>
        <p>登録技術者を厳選し、実際の経歴・専門領域を開示したうえでお引き合わせします。</p>
      </div>
      <div class="reason reveal">
        <span class="reason-num num">04</span>
        <h3>相談から参画まで柔軟に対応</h3>
        <p>単発の技術相談から、技術顧問、PM参画、開発参画まで、必要な形で依頼いただけます。</p>
      </div>
    </div>
  </div>
</section>

<!-- ⑦ 規格・規制 -->
<section>
  <div class="wrap">
    <div class="reveal">
      <span class="eyebrow">Regulation</span>
      <h2 style="margin-top:12px;">押さえておきたい規格・規制</h2>
      <p class="body-text" style="margin-top:16px;">無線・組込み製品に関わる規制強化が続いています。対応の要否は個別にご相談ください。</p>
    </div>

    <ul class="reg-list reveal">
      <li class="reg-item">
        <p class="reg-date num">2025年8月〜</p>
        <p class="reg-title">EU無線機器指令(RED) サイバーセキュリティ要求</p>
        <p class="reg-desc">無線機能を持つ機器のEU向け出荷において、不正アクセス対策等の要求事項への対応が必要になります。</p>
      </li>
      <li class="reg-item">
        <p class="reg-date num">2027年〜</p>
        <p class="reg-title">EUサイバーレジリエンス法(CRA) 本格適用</p>
        <p class="reg-desc">デジタル要素を含む製品全般に、脆弱性管理・報告義務等が課される見込みです。</p>
      </li>
    </ul>
    <p class="note-text" style="margin-top:12px;">
      ※適用時期・要件は今後の法改正等により変更される場合があります。貴社製品への該当有無は個別にご確認ください。
    </p>
  </div>
</section>

<!-- ⑧ 登録している技術者 -->
<section class="bg-2">
  <div class="wrap">
    <div class="reveal">
      <span class="eyebrow">Engineers</span>
      <h2 style="margin-top:12px;">登録している技術者</h2>
    </div>

    <div class="engineers">
      <div class="engineer-card reveal">
        <div class="engineer-band"></div>
        <div class="engineer-body">
          <div><span class="engineer-emphasis num">30</span><span class="engineer-emphasis-unit">年 通信機器開発</span></div>
          <p class="engineer-text body-text">
            大手電機メーカーで通信機器開発30年。無線(Wi-Fi／BLE)、電波法認証、量産立ち上げ、開発責任者、米国駐在。
          </p>
        </div>
      </div>
      <div class="engineer-card reveal">
        <div class="engineer-band"></div>
        <div class="engineer-body">
          <div><span class="engineer-emphasis num">AI</span><span class="engineer-emphasis-unit">実装の専門家</span></div>
          <p class="engineer-text body-text">
            エッジAI、モデル軽量化、異常検知、組込みセキュリティ。組込みエンジニアのチームを保有。
          </p>
        </div>
      </div>
    </div>

    <p class="note-text" style="margin-top:16px;">※FA制御・生産技術の領域は拡充中です</p>

    <div class="reveal" style="margin-top:var(--space-5);">
      <a href="#contact" class="btn">相談する(無料)</a>
    </div>
  </div>
</section>

<!-- ⑨ 利用の流れ -->
<section>
  <div class="wrap">
    <div class="reveal">
      <span class="eyebrow">Flow</span>
      <h2 style="margin-top:12px;">利用の流れ</h2>
    </div>

    <div class="flow reveal">
      <div class="flow-step">
        <span class="flow-num num">01</span>
        <h3>お問い合わせ</h3>
        <p>フォームより、課題やご相談内容をお送りください。</p>
      </div>
      <div class="flow-step">
        <span class="flow-num num">02</span>
        <h3>ヒアリング・ご提案</h3>
        <p>現状の課題を伺い、適した頼み方と技術者をご提案します。</p>
      </div>
      <div class="flow-step">
        <span class="flow-num num">03</span>
        <h3>契約・アサイン</h3>
        <p>業務範囲・成果物を取り決め、準委任契約を締結します。</p>
      </div>
      <div class="flow-step">
        <span class="flow-num num">04</span>
        <h3>稼働開始</h3>
        <p>技術者が稼働を開始します。進行状況は弊社が窓口となり管理します。</p>
      </div>
    </div>
  </div>
</section>

<!-- ⑩ お問い合わせフォーム(見た目のみ。送信処理は未実装) -->
<section id="contact" class="bg-2">
  <div class="wrap">
    <div class="reveal" style="text-align:left;">
      <span class="eyebrow">Contact</span>
      <h2 style="margin-top:12px;">まずは技術相談から</h2>
    </div>

    <form class="form-wrap reveal" onsubmit="return false;">
      <div class="field">
        <label for="hw-company">会社名</label>
        <input type="text" id="hw-company" name="company" autocomplete="organization">
      </div>
      <div class="field">
        <label for="hw-name">お名前</label>
        <input type="text" id="hw-name" name="name" autocomplete="name">
      </div>
      <div class="field">
        <label for="hw-email">メールアドレス</label>
        <input type="email" id="hw-email" name="email" autocomplete="email">
      </div>
      <div class="field">
        <label for="hw-message">ご相談内容</label>
        <textarea id="hw-message" name="message" rows="5"></textarea>
      </div>
      <button type="button" class="btn form-submit">送信する</button>
    </form>
  </div>
</section>

<!-- FAQ -->
<section>
  <div class="wrap">
    <div class="reveal">
      <span class="eyebrow">FAQ</span>
      <h2 style="margin-top:12px;">よくあるご質問</h2>
    </div>

    <div class="faq-list reveal" id="faq-list">
      <div class="faq-item" data-open="false">
        <button class="faq-q" type="button" aria-expanded="false">
          <span class="q-text"><span class="q-mark">Q.</span>契約形態は？</span>
          <span class="faq-chevron" aria-hidden="true"><svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3.5 5.25L7 8.75l3.5-3.5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg></span>
        </button>
        <div class="faq-a-wrap"><div class="faq-a"><span class="a-mark">A.</span><span>準委任契約です(成果物のある診断は請負となります)。</span></div></div>
      </div>
      <div class="faq-item" data-open="false">
        <button class="faq-q" type="button" aria-expanded="false">
          <span class="q-text"><span class="q-mark">Q.</span>派遣や人材紹介ですか？</span>
          <span class="faq-chevron" aria-hidden="true"><svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3.5 5.25L7 8.75l3.5-3.5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg></span>
        </button>
        <div class="faq-a-wrap"><div class="faq-a"><span class="a-mark">A.</span><span>いずれも異なります。</span></div></div>
      </div>
      <div class="faq-item" data-open="false">
        <button class="faq-q" type="button" aria-expanded="false">
          <span class="q-text"><span class="q-mark">Q.</span>二次受けはありますか？</span>
          <span class="faq-chevron" aria-hidden="true"><svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3.5 5.25L7 8.75l3.5-3.5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg></span>
        </button>
        <div class="faq-a-wrap"><div class="faq-a"><span class="a-mark">A.</span><span>ありません。弊社から直接技術者に依頼します。</span></div></div>
      </div>
      <div class="faq-item" data-open="false">
        <button class="faq-q" type="button" aria-expanded="false">
          <span class="q-text"><span class="q-mark">Q.</span>偽装請負にならないか？</span>
          <span class="faq-chevron" aria-hidden="true"><svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3.5 5.25L7 8.75l3.5-3.5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg></span>
        </button>
        <div class="faq-a-wrap"><div class="faq-a"><span class="a-mark">A.</span><span>業務範囲と成果物を事前に定め、指示は弊社を通す運用です。</span></div></div>
      </div>
      <div class="faq-item" data-open="false">
        <button class="faq-q" type="button" aria-expanded="false">
          <span class="q-text"><span class="q-mark">Q.</span>費用は？</span>
          <span class="faq-chevron" aria-hidden="true"><svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3.5 5.25L7 8.75l3.5-3.5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg></span>
        </button>
        <!-- TODO: 費用の提示方法が決定次第、本文を差し替える -->
        <div class="faq-a-wrap"><div class="faq-a"><span class="a-mark">A.</span><span>要相談です。貴社の課題・期間に応じてお見積りします。</span></div></div>
      </div>
      <div class="faq-item" data-open="false">
        <button class="faq-q" type="button" aria-expanded="false">
          <span class="q-text"><span class="q-mark">Q.</span>直接契約したくなったら？</span>
          <span class="faq-chevron" aria-hidden="true"><svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3.5 5.25L7 8.75l3.5-3.5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg></span>
        </button>
        <div class="faq-a-wrap"><div class="faq-a"><span class="a-mark">A.</span><span>事前協議のうえ、移行手数料で対応します。</span></div></div>
      </div>
      <div class="faq-item" data-open="false">
        <button class="faq-q" type="button" aria-expanded="false">
          <span class="q-text"><span class="q-mark">Q.</span>秘密保持は？</span>
          <span class="faq-chevron" aria-hidden="true"><svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3.5 5.25L7 8.75l3.5-3.5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg></span>
        </button>
        <div class="faq-a-wrap"><div class="faq-a"><span class="a-mark">A.</span><span>NDAを締結します。技術者とも個別に締結しています。</span></div></div>
      </div>
      <div class="faq-item" data-open="false">
        <button class="faq-q" type="button" aria-expanded="false">
          <span class="q-text"><span class="q-mark">Q.</span>賠償責任は？</span>
          <span class="faq-chevron" aria-hidden="true"><svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3.5 5.25L7 8.75l3.5-3.5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg></span>
        </button>
        <div class="faq-a-wrap"><div class="faq-a"><span class="a-mark">A.</span><span>賠償責任保険に加入しています。</span></div></div>
      </div>
    </div>
  </div>
</section>

<!-- ⑫ 最後のCTA -->
<section class="final-cta">
  <div class="wrap">
    <div class="text-block reveal">
      <h2>まずは、無料の技術相談から</h2>
      <p class="body-text">貴社の課題に応じて、適した頼み方と技術者をご提案します。</p>
      <a href="#contact" class="btn btn-invert">相談する(無料)</a>
    </div>
  </div>
</section>

<!-- ⑬ フッター -->
<footer>
  <div class="wrap">
    <div class="foot-info">
      <div>セールスボンド株式会社</div>
      <div>東京都新宿区西新宿3-3-13 西新宿水間ビル2F</div>
      <div>info@salesbond.jp</div>
    </div>
    <div class="foot-links">
      <a href="#contact">お問い合わせ</a>
    </div>
  </div>
</footer>

<script>
(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // スクロールフェードイン
  var reveals = document.querySelectorAll(".reveal");
  if (reduceMotion || !("IntersectionObserver" in window)) {
    reveals.forEach(function (el) { el.classList.add("is-visible"); });
  } else {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.1 }
    );
    reveals.forEach(function (el) { io.observe(el); });
  }

  // FAQアコーディオン
  var faqItems = document.querySelectorAll(".faq-item");
  faqItems.forEach(function (item) {
    var btn = item.querySelector(".faq-q");
    var wrap = item.querySelector(".faq-a-wrap");
    var inner = item.querySelector(".faq-a");

    btn.addEventListener("click", function () {
      var isOpen = item.getAttribute("data-open") === "true";
      if (isOpen) {
        wrap.style.height = "0px";
        item.setAttribute("data-open", "false");
        btn.setAttribute("aria-expanded", "false");
      } else {
        wrap.style.height = inner.offsetHeight + "px";
        item.setAttribute("data-open", "true");
        btn.setAttribute("aria-expanded", "true");
      }
    });
  });
})();
</script>
</body>
</html>
`;
