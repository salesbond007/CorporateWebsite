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
<link href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;500;700;900&family=Inter:wght@400;500;700;800&display=swap" rel="stylesheet">
<style>
:root{
  --wine-900:#4A1024;
  --wine-700:#6B1730;
  --wine-500:#8B2242;
  --wine-300:#D98CA3;
  --wine-100:#F5EBEE;
  --wine-50:#FBF3F5;
  --peach:#FFF4EC;
  --ink-900:#1A1A1C;
  --ink-600:#63616B;
  --ink-300:#E3DEDF;
  --paper:#FFFDFB;
  --paper-2:#FBF1F0;

  --space-1:8px;
  --space-2:16px;
  --space-3:24px;
  --space-4:40px;
  --space-5:64px;
  --space-6:96px;

  --content-max:1080px;
  --text-max:680px;
  --radius-lg:28px;
  --radius-md:20px;
  --radius-sm:14px;
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
.center{text-align:center;margin-left:auto;margin-right:auto;}

section{padding-top:64px;padding-bottom:64px;}
@media (min-width:1024px){
  section{padding-top:108px;padding-bottom:108px;}
}

h1,h2,h3{
  font-weight:700;
  margin:0;
}
h1{
  font-size:clamp(1.875rem,4.8vw,3.25rem);
  line-height:1.3;
  letter-spacing:-0.01em;
  font-weight:900;
}
h2{
  font-size:clamp(1.5rem,3.4vw,2.25rem);
  line-height:1.4;
  font-weight:900;
  letter-spacing:-0.01em;
}
h3{
  font-size:clamp(1.0625rem,2vw,1.25rem);
  font-weight:700;
  line-height:1.5;
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
.note-text{font-size:0.8125rem;color:var(--ink-600);line-height:1.8;}

.eyebrow{
  display:inline-flex;
  align-items:center;
  gap:8px;
  font-size:0.75rem;
  font-weight:700;
  letter-spacing:0.12em;
  color:var(--wine-700);
  background:var(--wine-100);
  padding:6px 14px;
  border-radius:999px;
}

.hr{border:0;border-top:1px solid var(--ink-300);}

.btn{
  display:inline-flex;
  align-items:center;
  justify-content:center;
  gap:8px;
  height:56px;
  padding:0 32px;
  background:var(--wine-700);
  color:#fff;
  text-decoration:none;
  font-weight:700;
  font-size:0.9375rem;
  border-radius:999px;
  border:1px solid var(--wine-700);
  cursor:pointer;
  box-shadow:0 10px 24px -10px rgba(107,23,48,0.55);
  transition:background-color .2s ease,border-color .2s ease,transform .2s ease;
}
.btn:hover{background:var(--wine-500);border-color:var(--wine-500);transform:translateY(-2px);}
.btn:focus-visible{outline:2px solid var(--wine-700);outline-offset:3px;}

.btn-invert{
  background:#fff;
  color:var(--wine-700);
  border-color:#fff;
  box-shadow:0 10px 24px -10px rgba(0,0,0,0.25);
}
.btn-invert:hover{background:var(--wine-50);border-color:var(--wine-50);color:var(--wine-700);}

.btn-outline{
  background:transparent;
  color:var(--wine-700);
  border-color:var(--wine-300);
  box-shadow:none;
}
.btn-outline:hover{background:var(--wine-50);border-color:var(--wine-500);color:var(--wine-700);}

.bg-2{background:var(--paper-2);}

/* ---------- reveal(スクロールフェードイン) ---------- */
.reveal{opacity:0;transform:translateY(14px);transition:opacity .5s ease-out,transform .5s ease-out;}
.reveal.is-visible{opacity:1;transform:translateY(0);}
@media (prefers-reduced-motion: reduce){
  .reveal{opacity:1;transform:none;transition:none;}
}

/* ---------- header ---------- */
.site-header{
  background:var(--paper);
  border-bottom:1px solid var(--ink-300);
}
.site-header .wrap{
  height:68px;
  display:flex;
  align-items:center;
  justify-content:space-between;
}
.logo-placeholder{
  font-family:'Inter',sans-serif;
  font-weight:800;
  font-size:0.9375rem;
  letter-spacing:0.06em;
  color:var(--wine-900);
}

/* ---------- ① hero ---------- */
.hero{position:relative;overflow:hidden;}
.hero{background:var(--wine-700);padding-bottom:0;}
.hero .wrap{position:relative;z-index:1;padding-top:80px;padding-bottom:96px;}
@media (min-width:1024px){
  .hero .wrap{padding-top:112px;padding-bottom:128px;}
}
.hero .eyebrow{background:rgba(255,255,255,0.16);color:#fff;}
.hero h1{margin-top:var(--space-3);margin-bottom:var(--space-3);color:#fff;}
.hero .lead{max-width:var(--text-max);margin-bottom:var(--space-4);color:rgba(255,255,255,0.85);}
.hero .btn-invert{margin-right:12px;}
.wave-divider{display:block;width:100%;height:auto;margin-top:-2px;}
.wave-divider path{fill:var(--paper-2);}

/* ---------- ② 課題提起 ---------- */
.problem-grid{
  display:grid;
  grid-template-columns:1fr;
  gap:var(--space-2);
  margin-top:var(--space-5);
}
@media (min-width:768px){
  .problem-grid{grid-template-columns:repeat(3,1fr);}
}
.problem-card{
  position:relative;
  background:var(--paper);
  border:1px solid var(--ink-300);
  border-radius:var(--radius-md);
  padding:var(--space-3);
  padding-top:var(--space-4);
  box-shadow:0 6px 18px -14px rgba(74,16,36,0.35);
}
.check-badge{
  position:absolute;
  top:-14px;
  left:20px;
  width:32px;height:32px;
  border-radius:10px;
  background:var(--wine-700);
  color:#fff;
  display:flex;align-items:center;justify-content:center;
  box-shadow:0 6px 14px -6px rgba(74,16,36,0.55);
}
.icon-badge{
  width:52px;height:52px;
  border-radius:16px;
  background:var(--wine-100);
  display:flex;align-items:center;justify-content:center;
  margin-bottom:var(--space-2);
  color:var(--wine-700);
}
.problem-arrow{
  display:flex;
  justify-content:center;
  color:var(--wine-500);
  margin-top:var(--space-2);
}
.problem-card h3{margin-bottom:8px;color:var(--ink-900);}
.problem-card p{color:var(--ink-600);font-size:0.9375rem;}

/* ---------- ③ 構造の説明 ---------- */
.structure-explain{
  display:grid;
  grid-template-columns:1fr;
  gap:var(--space-4);
  margin-top:var(--space-5);
  align-items:center;
}
@media (min-width:768px){
  .structure-explain{grid-template-columns:auto 1fr;gap:var(--space-6);}
}
.structure-number{text-align:left;}
.structure-number-value{
  font-size:clamp(3rem,8vw,5rem);
  font-weight:700;
  color:var(--wine-700);
  line-height:1;
  letter-spacing:-0.02em;
}
.structure-number-suffix{
  font-size:1.125rem;
  font-weight:700;
  color:var(--wine-700);
  margin-left:6px;
}
.structure-explain-text p{margin-bottom:var(--space-2);}
.structure-explain-text p:last-child{margin-bottom:0;}

/* ---------- ④ 2つの柱 ---------- */
.pillars{
  display:grid;
  grid-template-columns:1fr;
  gap:var(--space-3);
  margin-top:var(--space-5);
}
@media (min-width:768px){
  .pillars{grid-template-columns:1fr 1fr;}
}
.pillar{
  background:var(--paper);
  border:1px solid var(--ink-300);
  border-radius:var(--radius-lg);
  padding:var(--space-4);
}
.pillar h3.pillar-title{
  margin-top:var(--space-2);
  margin-bottom:var(--space-2);
  font-size:1.375rem;
  font-weight:800;
  color:var(--ink-900);
}
.pillar-desc{color:var(--ink-600);margin-bottom:var(--space-4);}
.area-list{list-style:none;margin:0;padding:0;}
.area-list li{
  display:flex;
  align-items:flex-start;
  gap:12px;
  background:var(--paper);
  border:1px solid var(--ink-300);
  border-radius:var(--radius-sm);
  padding:12px 16px;
  margin-bottom:8px;
  transition:border-color .2s ease,background-color .2s ease;
}
.area-list li:hover{border-color:var(--wine-300);background:var(--wine-50);}
.area-bullet{
  flex-shrink:0;
  width:8px;height:8px;
  margin-top:8px;
  border-radius:50%;
  background:var(--wine-700);
}
.area-list .area-title{display:block;font-weight:700;font-size:0.9375rem;}
.area-list .area-body{display:block;font-size:0.8125rem;color:var(--ink-600);margin-top:2px;}

/* ---------- ⑤ 頼み方の5段階 ---------- */
.engage-grid{
  display:grid;
  grid-template-columns:1fr;
  gap:var(--space-2);
  margin-top:var(--space-5);
}
@media (min-width:640px){
  .engage-grid{grid-template-columns:1fr 1fr;}
}
.engage-card{
  display:flex;
  gap:var(--space-2);
  align-items:flex-start;
  background:var(--paper);
  border:1px solid var(--ink-300);
  border-radius:var(--radius-md);
  padding:var(--space-3);
}
.engage-card .stage-badge{
  flex-shrink:0;
  width:40px;height:40px;
  border-radius:50%;
  background:var(--wine-700);
  color:#fff;
  display:flex;align-items:center;justify-content:center;
  font-weight:800;
  font-size:0.9375rem;
}
.engage-card .stage{font-weight:800;color:var(--ink-900);}
.engage-card .meta{margin-top:6px;font-size:0.875rem;color:var(--ink-600);}
.engage-card .meta .num{color:var(--wine-700);font-weight:700;}

/* ---------- ⑥ 選ばれる理由 ---------- */
.reasons{
  display:grid;
  grid-template-columns:1fr;
  gap:var(--space-2);
  margin-top:var(--space-5);
}
@media (min-width:640px){
  .reasons{grid-template-columns:1fr 1fr;}
}
.reason{
  position:relative;
  background:var(--paper);
  border:1px solid var(--ink-300);
  border-radius:var(--radius-lg);
  padding:var(--space-4);
  overflow:hidden;
}
.reason .reason-num{
  position:absolute;
  top:-0.2em;
  right:var(--space-2);
  font-size:4.5rem;
  font-weight:800;
  color:var(--wine-100);
  line-height:1;
  user-select:none;
  z-index:0;
}
.reason h3{position:relative;z-index:1;margin-bottom:8px;}
.reason p{position:relative;z-index:1;color:var(--ink-600);font-size:0.9375rem;}

/* ---------- ⑦ 規格・規制 ---------- */
.reg-list{list-style:none;margin:var(--space-5) 0 0;padding:0;display:grid;gap:var(--space-2);}
.reg-item{
  display:flex;
  gap:var(--space-3);
  align-items:flex-start;
  background:var(--paper);
  border:1px solid var(--ink-300);
  border-radius:var(--radius-md);
  padding:var(--space-3);
}
.reg-date-badge{
  flex-shrink:0;
  background:var(--wine-100);
  color:var(--wine-700);
  border-radius:var(--radius-sm);
  padding:10px 14px;
  text-align:center;
  min-width:104px;
}
.reg-date{
  font-family:'Inter',sans-serif;
  font-feature-settings:"tnum" 1;
  font-weight:800;
  font-size:0.9375rem;
}
.reg-title{font-weight:700;}
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
.engineer-card{
  background:var(--paper);
  border:1px solid var(--ink-300);
  border-radius:var(--radius-lg);
  overflow:hidden;
}
.engineer-band{height:8px;background:linear-gradient(90deg,var(--wine-700),var(--wine-300));}
.engineer-body{padding:var(--space-4);}
.engineer-emphasis-wrap{
  display:inline-flex;
  align-items:baseline;
  gap:6px;
  background:var(--wine-100);
  border-radius:999px;
  padding:8px 18px;
}
.engineer-emphasis{
  font-family:'Inter',sans-serif;
  font-size:1.75rem;
  font-weight:800;
  color:var(--wine-700);
  line-height:1;
}
.engineer-emphasis-unit{font-size:0.875rem;font-weight:700;color:var(--wine-700);}
.engineer-text{margin-top:var(--space-3);color:var(--ink-900);}

/* ---------- ⑨ 利用の流れ ---------- */
.flow{
  display:grid;
  grid-template-columns:1fr;
  gap:var(--space-2);
  margin-top:var(--space-5);
}
@media (min-width:768px){
  .flow{grid-template-columns:repeat(4,1fr);}
}
.flow-step{
  position:relative;
  background:var(--paper);
  border:1px solid var(--ink-300);
  border-radius:var(--radius-md);
  padding:var(--space-3);
}
@media (min-width:768px){
  .flow-step:not(:first-child)::before{
    content:"";
    position:absolute;
    left:-13px;
    top:50%;
    transform:translateY(-50%);
    width:0;height:0;
    border-top:7px solid transparent;
    border-bottom:7px solid transparent;
    border-left:9px solid var(--wine-300);
    z-index:1;
  }
}
.flow-num{
  width:52px;height:52px;
  border-radius:50%;
  background:var(--wine-100);
  color:var(--wine-700);
  display:flex;align-items:center;justify-content:center;
  margin-bottom:var(--space-2);
}
.flow-step h3{margin-bottom:6px;}
.flow-step p{color:var(--ink-600);font-size:0.875rem;}

/* ---------- ⑩ フォーム ---------- */
.contact-section{background:var(--wine-700);}
.contact-section .eyebrow{background:rgba(255,255,255,0.16);color:#fff;}
.contact-section h2{color:#fff;}
.form-card{
  max-width:560px;
  margin:var(--space-5) auto 0;
  background:#fff;
  border-radius:var(--radius-lg);
  padding:var(--space-4);
  box-shadow:0 20px 44px -20px rgba(0,0,0,0.35);
}
.field{margin-bottom:var(--space-3);}
.field label{
  display:flex;
  align-items:center;
  gap:8px;
  font-size:0.8125rem;
  font-weight:700;
  color:var(--ink-600);
  margin-bottom:8px;
}
.field-tag{
  font-size:0.6875rem;
  font-weight:700;
  padding:2px 8px;
  border-radius:999px;
}
.field-tag.required{background:var(--wine-100);color:var(--wine-700);}
.field-tag.optional{background:var(--ink-300);color:var(--ink-600);}
.field input,.field textarea{
  width:100%;
  border:1px solid var(--ink-300);
  background:var(--paper-2);
  padding:12px 16px;
  font:inherit;
  color:var(--ink-900);
  border-radius:var(--radius-sm);
}
.field textarea{resize:vertical;min-height:120px;}
.field input:focus,.field textarea:focus{
  outline:none;
  border-color:var(--wine-700);
  background:var(--paper);
}
.form-submit{width:100%;margin-top:var(--space-1);}

/* ---------- FAQ ---------- */
.faq-list{margin-top:var(--space-5);display:grid;gap:var(--space-2);}
.faq-item{
  background:var(--paper);
  border:1px solid var(--ink-300);
  border-radius:var(--radius-md);
  overflow:hidden;
}
.faq-q{
  width:100%;
  background:none;
  border:0;
  text-align:left;
  padding:18px 20px;
  display:flex;
  align-items:flex-start;
  justify-content:space-between;
  gap:16px;
  cursor:pointer;
  color:var(--ink-900);
}
.faq-q .q-text{font-weight:700;font-size:0.9375rem;display:flex;gap:12px;}
.faq-q .q-mark{
  color:var(--wine-700);
  font-weight:800;
  background:var(--wine-100);
  border-radius:50%;
  width:24px;height:24px;
  flex-shrink:0;
  display:flex;align-items:center;justify-content:center;
  font-size:0.8125rem;
}
.faq-chevron{flex-shrink:0;margin-top:6px;color:var(--wine-700);transition:transform .2s ease;}
.faq-item[data-open="true"] .faq-chevron{transform:rotate(180deg);}
.faq-a-wrap{height:0;overflow:hidden;transition:height .25s ease;}
@media (prefers-reduced-motion: reduce){
  .faq-a-wrap{transition:none;}
}
.faq-a{
  display:flex;
  align-items:flex-start;
  gap:12px;
  padding:0 20px 18px 20px;
  font-size:0.9375rem;
  color:var(--ink-600);
}
.faq-a .a-mark{
  flex-shrink:0;
  color:#fff;
  font-weight:800;
  background:var(--wine-300);
  border-radius:50%;
  width:24px;height:24px;
  display:flex;align-items:center;justify-content:center;
  font-size:0.8125rem;
}

/* ---------- ⑫ 最後のCTA ---------- */
.final-cta{background:var(--wine-700);color:#fff;text-align:center;border-radius:var(--radius-lg);}
.final-cta-inner{padding:var(--space-5) var(--space-3);}
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

/* ---------- フローティングお問い合わせウィジェット ---------- */
.float-contact{
  position:fixed;
  right:16px;
  bottom:16px;
  z-index:20;
  width:168px;
  background:var(--wine-50);
  border:1px solid var(--wine-100);
  border-radius:var(--radius-md);
  padding:14px;
  box-shadow:0 12px 28px -12px rgba(74,16,36,0.35);
  opacity:0;
  transform:translateY(12px);
  pointer-events:none;
  transition:opacity .3s ease,transform .3s ease;
}
.float-contact.is-shown{opacity:1;transform:translateY(0);pointer-events:auto;}
.float-contact-text{
  font-size:0.75rem;
  line-height:1.6;
  color:var(--wine-900);
  font-weight:700;
  margin-bottom:10px;
}
@media (max-width:640px){
  .float-contact{width:auto;left:16px;padding:10px 14px;display:flex;align-items:center;gap:12px;}
  .float-contact-text{margin-bottom:0;}
}
@media (prefers-reduced-motion: reduce){
  .float-contact{transition:none;}
}

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
    <div style="display:flex;gap:10px;">
      <a href="#contact" class="btn btn-outline" style="height:40px;padding:0 18px;font-size:0.8125rem;box-shadow:none;">資料請求</a>
      <a href="#contact" class="btn" style="height:40px;padding:0 18px;font-size:0.8125rem;box-shadow:none;">相談する</a>
    </div>
  </div>
</header>

<!-- ① ファーストビュー -->
<section class="hero">
  <div class="wrap">
    <div class="text-block reveal">
      <span class="eyebrow">HARDWARE DEVELOPMENT</span>
      <h1>ハードウェア開発の即戦力を、<br>必要な期間だけ</h1>
      <p class="body-text lead">
        開発の一線で判断してきたエンジニア・PM・技術顧問が入ります。<br>
        機構から組込み、無線、AI、制御、品質・安全まで。
      </p>
      <a href="#contact" class="btn">相談する(無料)</a>
      <a href="#contact" class="btn btn-invert">資料請求</a>
    </div>
  </div>
  <svg class="wave-divider" viewBox="0 0 1440 60" preserveAspectRatio="none" aria-hidden="true">
    <path d="M0,32 C240,68 480,-4 720,20 C960,44 1200,68 1440,28 L1440,60 L0,60 Z"></path>
  </svg>
</section>

<!-- ② 課題提起 -->
<section class="bg-2">
  <div class="wrap">
    <div class="reveal center text-block">
      <span class="eyebrow">PROBLEM</span>
      <h2 style="margin-top:16px;">こんな課題はありませんか？</h2>
    </div>

    <div class="problem-grid">
      <div class="problem-card reveal">
        <span class="check-badge" aria-hidden="true"><svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8.5l3 3 7-7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></span>
        <span class="icon-badge"><svg width="24" height="24" viewBox="0 0 28 28" fill="none"><circle cx="14" cy="14" r="4" stroke="currentColor" stroke-width="2"/><path d="M14 3v3M14 22v3M25 14h-3M6 14H3M21.6 6.4l-2.1 2.1M8.5 19.5l-2.1 2.1M21.6 21.6l-2.1-2.1M8.5 8.5L6.4 6.4" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg></span>
        <h3>機構設計ができる人がいない</h3>
        <p>筐体・治具まで踏み込んで設計できる人材が社内にいない。</p>
      </div>
      <div class="problem-card reveal">
        <span class="check-badge" aria-hidden="true"><svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8.5l3 3 7-7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></span>
        <span class="icon-badge"><svg width="24" height="24" viewBox="0 0 28 28" fill="none"><rect x="6" y="6" width="16" height="16" rx="3" stroke="currentColor" stroke-width="2"/><path d="M11 6V3M17 6V3M11 25v-3M17 25v-3M6 11H3M6 17H3M25 11h-3M25 17h-3" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg></span>
        <h3>試作から量産に進められない</h3>
        <p>プロトタイプはできても、量産設計・立上げの知見が不足している。</p>
      </div>
      <div class="problem-card reveal">
        <span class="check-badge" aria-hidden="true"><svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8.5l3 3 7-7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></span>
        <span class="icon-badge"><svg width="24" height="24" viewBox="0 0 28 28" fill="none"><path d="M6 20a11 11 0 0116 0M9.5 16.5a6.5 6.5 0 019 0M14 21v.01" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></span>
        <h3>無線・法規対応の知見がない</h3>
        <p>Wi-Fi/BLE実装や電波法認証、EMC対応をどこから進めればよいか分からない。</p>
      </div>
      <div class="problem-card reveal">
        <span class="check-badge" aria-hidden="true"><svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8.5l3 3 7-7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></span>
        <span class="icon-badge"><svg width="24" height="24" viewBox="0 0 28 28" fill="none"><rect x="9" y="9" width="10" height="10" rx="2" stroke="currentColor" stroke-width="2"/><path d="M14 4v3M14 21v3M4 14h3M21 14h3M6.5 6.5l2 2M19.5 6.5l-2 2M6.5 21.5l2-2M19.5 21.5l-2-2" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg></span>
        <h3>エッジAI実装まで手が回らない</h3>
        <p>機器上でのAI推論・異常検知の実装を担える人材がいない。</p>
      </div>
      <div class="problem-card reveal">
        <span class="check-badge" aria-hidden="true"><svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8.5l3 3 7-7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></span>
        <span class="icon-badge"><svg width="24" height="24" viewBox="0 0 28 28" fill="none"><circle cx="14" cy="14" r="10" stroke="currentColor" stroke-width="2"/><path d="M14 8v6l4 3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></span>
        <h3>開発が遅れているが原因が分からない</h3>
        <p>スケジュールが遅延しているが、どこがボトルネックか整理できていない。</p>
      </div>
      <div class="problem-card reveal">
        <span class="check-badge" aria-hidden="true"><svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8.5l3 3 7-7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></span>
        <span class="icon-badge"><svg width="24" height="24" viewBox="0 0 28 28" fill="none"><circle cx="14" cy="10" r="4" stroke="currentColor" stroke-width="2"/><path d="M5 24c1.5-5 5-7.5 9-7.5s7.5 2.5 9 7.5" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg></span>
        <h3>社内に技術を判断できる人がいない</h3>
        <p>提案や見積りの妥当性を、社内だけでは判断しきれない。</p>
      </div>
    </div>

    <div class="problem-arrow reveal" aria-hidden="true">
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none"><path d="M7 11l7 7 7-7" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg>
    </div>
  </div>
</section>

<!-- ③ 構造の説明 -->
<section class="bg-2">
  <div class="wrap">
    <div class="text-block reveal center" style="margin-left:auto;margin-right:auto;">
      <span class="eyebrow">STRUCTURE</span>
      <h2 style="margin-top:16px;">採用で解決しようとすると、<br>時間がかかります</h2>
    </div>

    <div class="structure-explain reveal">
      <div class="structure-number">
        <span class="structure-number-value num">約32万人</span><span class="structure-number-suffix">減少</span>
        <!-- TODO: 出典・数値の最終確認が済み次第、本文と合わせて差し替える -->
        <p class="note-text" style="margin-top:8px;">※製造業の就業者数(国勢調査 2015年→2020年)</p>
      </div>
      <div class="structure-explain-text">
        <p class="body-text">
          ハードウェアの技術は、現場で実物を扱いながら何年もかけて身につきます。未経験者を採用して育てる場合、ひとりで判断できるようになるまでに数年かかります。
        </p>
        <p class="body-text">
          開発には期限があります。間に合わせるには、すでに経験を積んだ人に入ってもらうのが最も速い選択です。
        </p>
      </div>
    </div>
  </div>
</section>

<!-- ④ 2つの柱 -->
<section class="bg-2">
  <div class="wrap">
    <div class="reveal center text-block">
      <span class="eyebrow">TEAM</span>
      <h2 style="margin-top:16px;">2つの柱</h2>
    </div>

    <div class="pillars">
      <div class="pillar reveal">
        <span class="eyebrow">ENGINEER</span>
        <h3 class="pillar-title">エンジニア｜手を動かす</h3>
        <p class="pillar-desc body-text">実装・設計・立上げを担います。</p>
        <ul class="area-list">
          <li><span class="area-bullet" aria-hidden="true"></span><span class="area-title">機構・機械設計</span><span class="area-body">機構、筐体、治具</span></li>
          <li><span class="area-bullet" aria-hidden="true"></span><span class="area-title">電気・回路</span><span class="area-body">回路設計、基板設計</span></li>
          <li><span class="area-bullet" aria-hidden="true"></span><span class="area-title">組込み</span><span class="area-body">C/C++、マイコン、組込みLinux</span></li>
          <li><span class="area-bullet" aria-hidden="true"></span><span class="area-title">無線・通信</span><span class="area-body">Wi-Fi、BLE、電波法認証、EMC</span></li>
          <li><span class="area-bullet" aria-hidden="true"></span><span class="area-title">エッジAI</span><span class="area-body">機器上でのAI実装、異常検知</span></li>
          <li><span class="area-bullet" aria-hidden="true"></span><span class="area-title">組込みセキュリティ</span><span class="area-body">改ざん検知、暗号</span></li>
          <li><span class="area-bullet" aria-hidden="true"></span><span class="area-title">制御</span><span class="area-body">PLC、ライン立上げ</span></li>
          <li><span class="area-bullet" aria-hidden="true"></span><span class="area-title">品質・安全</span><span class="area-body">評価試験、規格対応</span></li>
        </ul>
      </div>

      <div class="pillar reveal">
        <span class="eyebrow">PM / ADVISOR</span>
        <h3 class="pillar-title">PM・技術顧問｜判断し、率いる</h3>
        <p class="pillar-desc body-text">要件定義、開発推進、ベンダー調整、量産移行、技術判断を担います。</p>
        <p class="note-text" style="margin-bottom:12px;">こんなときに</p>
        <ul class="area-list">
          <li><span class="area-bullet" aria-hidden="true"></span><span class="area-title">何を作るかが決まらない</span></li>
          <li><span class="area-bullet" aria-hidden="true"></span><span class="area-title">開発が遅れているが、原因も打ち手も分からない</span></li>
          <li><span class="area-bullet" aria-hidden="true"></span><span class="area-title">試作から量産に進められない</span></li>
          <li><span class="area-bullet" aria-hidden="true"></span><span class="area-title">社内に技術を判断できる人がいない</span></li>
        </ul>
      </div>
    </div>
  </div>
</section>

<!-- ⑤ 頼み方の5段階 -->
<section>
  <div class="wrap">
    <div class="reveal center text-block">
      <span class="eyebrow">HOW TO ASK</span>
      <h2 style="margin-top:16px;">頼み方の5段階</h2>
      <p class="body-text" style="margin-top:16px;">小さな相談から、開発への参画まで。必要な段階だけご利用いただけます。</p>
    </div>

    <div class="engage-grid reveal">
      <div class="engage-card">
        <span class="stage-badge num">01</span>
        <div>
          <p class="stage">技術相談</p>
          <p class="meta">課題の整理、技術的な妥当性の確認 ／ <span class="num">1〜2時間</span> ／ 単発</p>
        </div>
      </div>
      <div class="engage-card">
        <span class="stage-badge num">02</span>
        <div>
          <p class="stage">診断・レビュー</p>
          <p class="meta">設計・仕様・進行中プロジェクトのレビュー ／ <span class="num">1日〜</span> ／ 単発</p>
        </div>
      </div>
      <div class="engage-card">
        <span class="stage-badge num">03</span>
        <div>
          <p class="stage">技術顧問</p>
          <p class="meta">継続的な技術判断・意思決定の伴走 ／ <span class="num">月1〜2回</span> ／ 継続</p>
        </div>
      </div>
      <div class="engage-card">
        <span class="stage-badge num">04</span>
        <div>
          <p class="stage">PM参画</p>
          <p class="meta">要件定義からベンダー調整、量産移行までの推進 ／ <span class="num">開発期間中</span> ／ 継続</p>
        </div>
      </div>
      <div class="engage-card">
        <span class="stage-badge num">05</span>
        <div>
          <p class="stage">開発参画</p>
          <p class="meta">設計・実装・立上げの実務そのものを担当 ／ <span class="num">数ヶ月〜</span> ／ 継続</p>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- ⑥ 選ばれる理由 -->
<section class="bg-2">
  <div class="wrap">
    <div class="reveal center text-block">
      <span class="eyebrow">WHY US</span>
      <h2 style="margin-top:16px;">選ばれる理由</h2>
    </div>

    <div class="reasons">
      <div class="reason reveal">
        <span class="reason-num num">01</span>
        <h3>二次受けなし、直接依頼</h3>
        <p>弊社から技術者へ直接依頼するため、伝言による情報のロスがありません。</p>
      </div>
      <div class="reason reveal">
        <span class="reason-num num">02</span>
        <h3>責任の所在が明確</h3>
        <p>弊社が契約の主体となり、業務の遂行に責任を持ちます。間に複数の会社が入る形にはしません。窓口は一つ、確認先も一つです。</p>
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
    <div class="reveal center text-block">
      <span class="eyebrow">REGULATION</span>
      <h2 style="margin-top:16px;">押さえておきたい規格・規制</h2>
      <p class="body-text" style="margin-top:16px;">無線・組込み製品に関わる規制強化が続いています。対応の要否は個別にご相談ください。</p>
    </div>

    <ul class="reg-list reveal">
      <li class="reg-item">
        <span class="reg-date-badge"><span class="reg-date num">2025年8月〜</span></span>
        <div>
          <p class="reg-title">EU無線機器指令(RED) サイバーセキュリティ要求</p>
          <p class="reg-desc">無線機能を持つ機器のEU向け出荷において、不正アクセス対策等の要求事項への対応が必要になります。</p>
        </div>
      </li>
      <li class="reg-item">
        <span class="reg-date-badge"><span class="reg-date num">2027年〜</span></span>
        <div>
          <p class="reg-title">EUサイバーレジリエンス法(CRA) 本格適用</p>
          <p class="reg-desc">デジタル要素を含む製品全般に、脆弱性管理・報告義務等が課される見込みです。</p>
        </div>
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
    <div class="reveal center text-block">
      <span class="eyebrow">ENGINEERS</span>
      <h2 style="margin-top:16px;">登録している技術者</h2>
    </div>

    <div class="engineers">
      <div class="engineer-card reveal">
        <div class="engineer-band"></div>
        <div class="engineer-body">
          <div class="engineer-emphasis-wrap"><span class="engineer-emphasis num">30</span><span class="engineer-emphasis-unit">年 通信機器開発</span></div>
          <p class="engineer-text body-text">
            大手電機メーカーで通信機器開発30年。無線(Wi-Fi／BLE)、電波法認証、量産立ち上げ、開発責任者、米国駐在。
          </p>
        </div>
      </div>
      <div class="engineer-card reveal">
        <div class="engineer-band"></div>
        <div class="engineer-body">
          <div class="engineer-emphasis-wrap"><span class="engineer-emphasis num">AI</span><span class="engineer-emphasis-unit">実装の専門家</span></div>
          <p class="engineer-text body-text">
            エッジAI、モデル軽量化、異常検知、組込みセキュリティ。組込みエンジニアのチームを保有。
          </p>
        </div>
      </div>
    </div>

    <p class="note-text" style="margin-top:16px;">※FA制御・生産技術の領域は拡充中です</p>

    <div class="reveal center" style="margin-top:var(--space-5);">
      <a href="#contact" class="btn">相談する(無料)</a>
    </div>
  </div>
</section>

<!-- ⑨ 利用の流れ -->
<section>
  <div class="wrap">
    <div class="reveal center text-block">
      <span class="eyebrow">FLOW</span>
      <h2 style="margin-top:16px;">利用の流れ</h2>
    </div>

    <div class="flow reveal">
      <div class="flow-step">
        <span class="flow-num"><svg width="24" height="24" viewBox="0 0 28 28" fill="none"><rect x="4" y="7" width="20" height="14" rx="2" stroke="currentColor" stroke-width="2"/><path d="M5 8l9 7 9-7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></span>
        <h3>お問い合わせ</h3>
        <p>フォームより、課題やご相談内容をお送りください。</p>
      </div>
      <div class="flow-step">
        <span class="flow-num"><svg width="24" height="24" viewBox="0 0 28 28" fill="none"><path d="M4 8a2 2 0 012-2h9a2 2 0 012 2v6a2 2 0 01-2 2h-6l-5 4v-4H6a2 2 0 01-2-2V8z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/><path d="M17 11h5a2 2 0 012 2v6a2 2 0 01-2 2h-1v3l-4-3h-4a2 2 0 01-2-2v-1" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/></svg></span>
        <h3>ヒアリング・ご提案</h3>
        <p>現状の課題を伺い、適した頼み方と技術者をご提案します。</p>
      </div>
      <div class="flow-step">
        <span class="flow-num"><svg width="24" height="24" viewBox="0 0 28 28" fill="none"><path d="M3 14l5-5 4 4 3-3M15 10h5v5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M4 20h20M9 20v-5M19 20v-5" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg></span>
        <h3>契約・アサイン</h3>
        <p>業務範囲・成果物を取り決め、準委任契約を締結します。</p>
      </div>
      <div class="flow-step">
        <span class="flow-num"><svg width="24" height="24" viewBox="0 0 28 28" fill="none"><path d="M14 4l3 6 6.5 1-4.7 4.6L20 22l-6-3.4L8 22l1.2-6.4L4.5 11l6.5-1z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/></svg></span>
        <h3>稼働開始</h3>
        <p>技術者が稼働を開始します。進行状況は弊社が窓口となり管理します。</p>
      </div>
    </div>
  </div>
</section>

<!-- ⑩ お問い合わせフォーム(見た目のみ。送信処理は未実装) -->
<section id="contact" class="contact-section">
  <div class="wrap">
    <div class="reveal center text-block">
      <span class="eyebrow">CONTACT</span>
      <h2 style="margin-top:16px;">まずは技術相談から</h2>
    </div>

    <form class="form-card reveal" onsubmit="return false;">
      <div class="field">
        <label for="hw-company">会社名<span class="field-tag required">必須</span></label>
        <input type="text" id="hw-company" name="company" autocomplete="organization">
      </div>
      <div class="field">
        <label for="hw-name">お名前<span class="field-tag required">必須</span></label>
        <input type="text" id="hw-name" name="name" autocomplete="name">
      </div>
      <div class="field">
        <label for="hw-email">メールアドレス<span class="field-tag required">必須</span></label>
        <input type="email" id="hw-email" name="email" autocomplete="email">
      </div>
      <div class="field">
        <label for="hw-message">ご相談内容<span class="field-tag optional">任意</span></label>
        <textarea id="hw-message" name="message" rows="5"></textarea>
      </div>
      <button type="button" class="btn form-submit">送信する</button>
    </form>
  </div>
</section>

<!-- FAQ -->
<section>
  <div class="wrap">
    <div class="reveal center text-block">
      <span class="eyebrow">FAQ</span>
      <h2 style="margin-top:16px;">よくあるご質問</h2>
    </div>

    <div class="faq-list reveal" id="faq-list">
      <div class="faq-item" data-open="false">
        <button class="faq-q" type="button" aria-expanded="false">
          <span class="q-text"><span class="q-mark">Q</span>契約形態は？</span>
          <span class="faq-chevron" aria-hidden="true"><svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3.5 5.25L7 8.75l3.5-3.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg></span>
        </button>
        <div class="faq-a-wrap"><div class="faq-a"><span class="a-mark">A</span>準委任契約です(成果物のある診断は請負となります)。</div></div>
      </div>
      <div class="faq-item" data-open="false">
        <button class="faq-q" type="button" aria-expanded="false">
          <span class="q-text"><span class="q-mark">Q</span>派遣や人材紹介ですか？</span>
          <span class="faq-chevron" aria-hidden="true"><svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3.5 5.25L7 8.75l3.5-3.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg></span>
        </button>
        <div class="faq-a-wrap"><div class="faq-a"><span class="a-mark">A</span>いずれも異なります。</div></div>
      </div>
      <div class="faq-item" data-open="false">
        <button class="faq-q" type="button" aria-expanded="false">
          <span class="q-text"><span class="q-mark">Q</span>二次受けはありますか？</span>
          <span class="faq-chevron" aria-hidden="true"><svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3.5 5.25L7 8.75l3.5-3.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg></span>
        </button>
        <div class="faq-a-wrap"><div class="faq-a"><span class="a-mark">A</span>ありません。弊社から直接技術者に依頼します。</div></div>
      </div>
      <div class="faq-item" data-open="false">
        <button class="faq-q" type="button" aria-expanded="false">
          <span class="q-text"><span class="q-mark">Q</span>偽装請負にならないか？</span>
          <span class="faq-chevron" aria-hidden="true"><svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3.5 5.25L7 8.75l3.5-3.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg></span>
        </button>
        <div class="faq-a-wrap"><div class="faq-a"><span class="a-mark">A</span>業務範囲と成果物を事前に定め、指示は弊社を通す運用です。</div></div>
      </div>
      <div class="faq-item" data-open="false">
        <button class="faq-q" type="button" aria-expanded="false">
          <span class="q-text"><span class="q-mark">Q</span>費用は？</span>
          <span class="faq-chevron" aria-hidden="true"><svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3.5 5.25L7 8.75l3.5-3.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg></span>
        </button>
        <!-- TODO: 費用の提示方法が決定次第、本文を差し替える -->
        <div class="faq-a-wrap"><div class="faq-a"><span class="a-mark">A</span>要相談です。貴社の課題・期間に応じてお見積りします。</div></div>
      </div>
      <div class="faq-item" data-open="false">
        <button class="faq-q" type="button" aria-expanded="false">
          <span class="q-text"><span class="q-mark">Q</span>直接契約したくなったら？</span>
          <span class="faq-chevron" aria-hidden="true"><svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3.5 5.25L7 8.75l3.5-3.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg></span>
        </button>
        <div class="faq-a-wrap"><div class="faq-a"><span class="a-mark">A</span>事前協議のうえ、移行手数料で対応します。</div></div>
      </div>
      <div class="faq-item" data-open="false">
        <button class="faq-q" type="button" aria-expanded="false">
          <span class="q-text"><span class="q-mark">Q</span>秘密保持は？</span>
          <span class="faq-chevron" aria-hidden="true"><svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3.5 5.25L7 8.75l3.5-3.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg></span>
        </button>
        <div class="faq-a-wrap"><div class="faq-a"><span class="a-mark">A</span>NDAを締結します。技術者とも個別に締結しています。</div></div>
      </div>
      <div class="faq-item" data-open="false">
        <button class="faq-q" type="button" aria-expanded="false">
          <span class="q-text"><span class="q-mark">Q</span>賠償責任は？</span>
          <span class="faq-chevron" aria-hidden="true"><svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3.5 5.25L7 8.75l3.5-3.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg></span>
        </button>
        <div class="faq-a-wrap"><div class="faq-a"><span class="a-mark">A</span>賠償責任保険に加入しています。</div></div>
      </div>
    </div>
  </div>
</section>

<!-- ⑫ 最後のCTA -->
<section>
  <div class="wrap">
    <div class="final-cta reveal">
      <div class="final-cta-inner text-block center">
        <h2>まずは、無料の技術相談から</h2>
        <p class="body-text">貴社の課題に応じて、適した頼み方と技術者をご提案します。</p>
        <a href="#contact" class="btn btn-invert">相談する(無料)</a>
      </div>
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

<!-- フローティングお問い合わせウィジェット -->
<div class="float-contact" id="float-contact">
  <p class="float-contact-text">ご相談・ご質問は<br>お気軽にどうぞ</p>
  <a href="#contact" class="btn" style="width:100%;height:44px;font-size:0.8125rem;">相談する(無料)</a>
</div>

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

  // フローティングお問い合わせウィジェット(ファーストビューを過ぎたら表示、
  // フォームやフッター付近では邪魔にならないよう非表示にする)
  var floatContact = document.getElementById("float-contact");
  var contactSection = document.getElementById("contact");
  if (floatContact && contactSection) {
    var updateFloatContact = function () {
      var scrollY = window.scrollY || window.pageYOffset;
      var contactTop = contactSection.getBoundingClientRect().top + scrollY;
      var shouldShow = scrollY > window.innerHeight * 0.6 && scrollY < contactTop - 200;
      floatContact.classList.toggle("is-shown", shouldShow);
    };
    updateFloatContact();
    window.addEventListener("scroll", updateFloatContact, { passive: true });
    window.addEventListener("resize", updateFloatContact);
  }
})();
</script>
</body>
</html>
`;
