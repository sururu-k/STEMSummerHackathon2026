---
marp: true
theme: gaia
paginate: true
header: "STEM Summer Hackathon 2026 ｜ テーマ「隙間」"
footer: "チーム「隙間ハンター」 ｜ 会話クラッシャー晒し機"
style: |
  section {
    font-family: 'M PLUS Rounded 1c', 'Zen Maru Gothic', 'Hiragino Sans', 'Meiryo', sans-serif;
    background-color: #fffbeb;
    color: #1e293b;
    padding: 36px 48px;
  }
  h1 {
    color: #0f172a;
    font-weight: 900;
  }
  h2 {
    color: #dc2626;
    font-weight: 900;
    border-bottom: 4px solid #dc2626;
    padding-bottom: 8px;
    margin-bottom: 20px;
  }
  .highlight-red {
    background-color: #dc2626;
    color: #ffffff;
    padding: 4px 12px;
    border-radius: 8px;
    font-weight: 900;
    display: inline-block;
  }
  .comic-card {
    background: #ffffff;
    border: 3px solid #000000;
    box-shadow: 5px 5px 0px #000000;
    border-radius: 16px;
    padding: 16px;
  }
  .danger-card {
    background: #fef2f2;
    border: 3px solid #dc2626;
    box-shadow: 5px 5px 0px #dc2626;
    border-radius: 16px;
    padding: 16px;
  }
---

<!-- _class: lead -->
<!-- _paginate: false -->
<!-- _header: "" -->

# 会話クラッシャー晒し機
### 〜 会話の「隙間（沈黙）」を可視化・戦犯公開処刑 〜

<div style="margin-top: 30px;">
  <span class="highlight-red">STEM Summer Hackathon 2026 参加作品</span>
</div>

<br>

**チーム「隙間ハンター」**  
発表時間：約 2〜3 分

---

## 日常の課題：急に訪れる「シーン……」

楽しく会話していたはずなのに、誰かが一言発した直後に訪れる……

<div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 16px; margin-top: 24px;">
  <div class="comic-card" style="text-align: center;">
    <div style="font-size: 24px; font-weight: 900; color: #dc2626; margin-bottom: 8px;">[ 突然の空白 ]</div>
    <h3 style="color: #dc2626; margin: 4px 0; font-size: 20px;">会話の停止</h3>
    <p style="font-size: 15px; margin: 0; color: #475569;">会話がピタッと止まる謎の隙間</p>
  </div>
  <div class="comic-card" style="text-align: center;">
    <div style="font-size: 24px; font-weight: 900; color: #0f172a; margin-bottom: 8px;">[ 気まずい空気 ]</div>
    <h3 style="color: #0f172a; margin: 4px 0; font-size: 20px;">犯人探し</h3>
    <p style="font-size: 15px; margin: 0; color: #475569;">「誰のせい？」と言い出せない空気</p>
  </div>
  <div class="comic-card" style="text-align: center;">
    <div style="font-size: 24px; font-weight: 900; color: #4f46e5; margin-bottom: 8px;">[ 解散の危機 ]</div>
    <h3 style="color: #4f46e5; margin: 4px 0; font-size: 20px;">沈黙の固定化</h3>
    <p style="font-size: 15px; margin: 0; color: #475569;">会話が完全に凍結して気まずい沈黙</p>
  </div>
</div>

<div class="danger-card" style="margin-top: 24px; text-align: center; font-weight: 900; font-size: 20px; color: #dc2626;">
  誰も言えない「会話を止めた戦犯」を、テクノロジーで白日の下に晒す！
</div>

---

## 解決策：会話クラッシャー晒し機

各自のスマホをマイクにし、会話の隙間（沈黙）をミリ秒単位で追跡・晒し上げ！

<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-top: 16px;">
  <div class="comic-card">
    <h4 style="margin: 0 0 6px 0; color: #0f172a; font-size: 18px;">1. QRコードで即座に監視マイク化</h4>
    <p style="font-size: 15px; margin: 0; color: #334155;">音声は一切送信せず、ブラウザ内VADで「喋った/喋ってない」の判定のみ集約（プライバシー保護）。</p>
  </div>
  <div class="comic-card">
    <h4 style="margin: 0 0 6px 0; color: #dc2626; font-size: 18px;">2. 沈黙検知で大画面に即晒し</h4>
    <p style="font-size: 15px; margin: 0; color: #334155;">全員が黙った瞬間から秒数カウントアップ。「〇〇の発言で会話凍結中！」と名指し。</p>
  </div>
  <div class="comic-card">
    <h4 style="margin: 0 0 6px 0; color: #854d0e; font-size: 18px;">3. 5秒沈黙で巨大スタンプ爆撃</h4>
    <p style="font-size: 15px; margin: 0; color: #334155;">「その発言で！ピタッと止まった…」スタンプが集中線とともにドカンと出現！</p>
  </div>
  <div class="comic-card">
    <h4 style="margin: 0 0 6px 0; color: #059669; font-size: 18px;">4. 沈黙ブレイカーMVP表彰</h4>
    <p style="font-size: 15px; margin: 0; color: #334155;">止まった会話を再開させた人を大量の紙吹雪で祝福し、ポジティブに回収！</p>
  </div>
</div>

---

## デモ実演：発言 ➔ 沈黙 ➔ スタンプ爆撃！

<div style="display: grid; grid-template-columns: 1fr 1.3fr; gap: 24px; align-items: center;">
  <div>
    <div class="danger-card" style="font-size: 17px; line-height: 1.7;">
      <b>[ 実演シナリオ ]</b><br>
      ・<b>00:08</b> 田中が「朝ご飯カツ丼」発言<br>
      ・<b>00:10</b> 全員沈黙（隙間発生）<br>
      ・<b>00:16</b> 巨大スタンプ出現！<br>
      ・<b>00:20</b> 10秒完全凍結アラート<br>
      ・<b>00:22</b> 審査員Aが救出・MVP表彰
    </div>
    <div style="margin-top: 14px; font-size: 14px; color: #64748b; font-weight: bold;">
      動画ファイル: demo-presentation.mp4
    </div>
  </div>
  <div style="text-align: center;">
    <img src="../その発言で会話がピタッと止まった.png" style="width: 380px; max-height: 380px; border: 5px solid #000; border-radius: 20px; box-shadow: 8px 8px 0px #000;" alt="その発言で会話がピタッと止まった">
  </div>
</div>

---

## 技術構成 & テーマ「隙間」への着地

<div class="comic-card" style="margin-bottom: 16px;">
  <h4 style="margin: 0 0 8px 0; color: #0f172a;">堅牢なブラウザ標準アーキテクチャ</h4>
  <p style="font-size: 16px; margin: 0; color: #334155;">
    <b>Web Audio API / AudioWorklet</b> ＋ <b>Node.js WebSocket</b><br>
    外部APIに頼らずブラウザ標準のみで同室クロストークを自動分離（分散マイクアレイ方式）。
  </p>
</div>

<div class="danger-card">
  <h4 style="margin: 0 0 8px 0; color: #dc2626;">隙間を無理に埋めない「逆張りのエンタメ」</h4>
  <p style="font-size: 18px; font-weight: bold; margin: 0; color: #0f172a;">
    会話の隙間（沈黙）を気まずいものとして隠すのではなく、<br>
    <span class="highlight-red">隙間を作った戦犯を晒して笑いに変える</span> ことで、結果的に会話が爆発的に盛り上がる！
  </p>
</div>

<div style="text-align: center; margin-top: 20px; font-weight: 900; font-size: 24px; color: #0f172a;">
  ご清聴ありがとうございました！
</div>
