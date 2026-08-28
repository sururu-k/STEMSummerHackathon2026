---
marp: true
theme: gaia
paginate: true
header: "STEM Summer Hackathon 2026 ｜ 技術者倫理 遵守済み"
footer: "会話沈黙可視化システム (Silence Tracker)"
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
  .highlight-ethics {
    background-color: #059669;
    color: #ffffff;
    padding: 8px 20px;
    border-radius: 12px;
    font-weight: 900;
    border: 3px solid #000000;
    box-shadow: 4px 4px 0px #000000;
    display: inline-block;
    font-size: 20px;
    letter-spacing: 1px;
  }
  .comic-card {
    background: #ffffff;
    border: 3px solid #000000;
    box-shadow: 5px 5px 0px #000000;
    border-radius: 16px;
    padding: 14px 16px;
  }
  .danger-card {
    background: #fef2f2;
    border: 3px solid #dc2626;
    box-shadow: 5px 5px 0px #dc2626;
    border-radius: 16px;
    padding: 14px 16px;
  }
---

<!-- _class: lead -->
<!-- _paginate: false -->
<!-- _header: "" -->

<div style="text-align: center; margin-bottom: 20px;">
  <span class="highlight-ethics">[ 技術者倫理 遵守済み ] プライバシー保護・音声非送信</span>
</div>

# 会話沈黙可視化システム
### 会話の「隙間（沈黙）」のリアルタイム検知と表示

<div style="margin-top: 20px;">
  <span class="highlight-red">STEM Summer Hackathon 2026 参加作品</span>
</div>

<br>

**発表時間：約 2〜3 分**

---

## 課題：会話中の沈黙発生と状況把握の難しさ

複数人の会話において、発言後に沈黙（隙間）が発生した際の課題：

<div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 16px; margin-top: 24px;">
  <div class="comic-card" style="text-align: center;">
    <div style="font-size: 20px; font-weight: 900; color: #dc2626; margin-bottom: 8px;">[ 発話の途絶 ]</div>
    <h3 style="color: #dc2626; margin: 4px 0; font-size: 18px;">会話停止</h3>
    <p style="font-size: 14px; margin: 0; color: #475569;">発言直後に全員が沈黙する状態の発生</p>
  </div>
  <div class="comic-card" style="text-align: center;">
    <div style="font-size: 20px; font-weight: 900; color: #0f172a; margin-bottom: 8px;">[ 状況の不透明さ ]</div>
    <h3 style="color: #0f172a; margin: 4px 0; font-size: 18px;">直前発言の特定</h3>
    <p style="font-size: 14px; margin: 0; color: #475569;">誰の発言の後に沈黙が生じたかの認識の曖昧さ</p>
  </div>
  <div class="comic-card" style="text-align: center;">
    <div style="font-size: 20px; font-weight: 900; color: #4f46e5; margin-bottom: 8px;">[ 時間の不可視性 ]</div>
    <h3 style="color: #4f46e5; margin: 4px 0; font-size: 18px;">沈黙時間の長さ</h3>
    <p style="font-size: 14px; margin: 0; color: #475569;">沈黙が何秒間続いているかの客観的計測の不在</p>
  </div>
</div>

<div class="danger-card" style="margin-top: 24px; text-align: center; font-weight: 900; font-size: 18px; color: #dc2626;">
  主観に頼らず、発話状態と沈黙継続時間を客観的なデータとして画面に可視化する
</div>

---

## 解決策：分散マイクによる沈黙時間計測システム

各自のスマートフォンをマイク端末とし、会話の沈黙状態をリアルタイムに集約・表示

<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-top: 16px;">
  <div class="comic-card">
    <h4 style="margin: 0 0 6px 0; color: #0f172a; font-size: 17px;">1. QRコード接続とエッジ発話検知</h4>
    <p style="font-size: 14px; margin: 0; color: #334155;">音声はサーバーへ送信せず、端末内AudioWorkletで発話判定（RMS）のみをWebSocket送信。</p>
  </div>
  <div class="comic-card">
    <h4 style="margin: 0 0 6px 0; color: #dc2626; font-size: 17px;">2. 沈黙時間のミリ秒計測と直前発言者の記録</h4>
    <p style="font-size: 14px; margin: 0; color: #334155;">全員の音声入力が停止した瞬間から沈黙秒数をカウントし、直前の発言者名を画面に表示。</p>
  </div>
  <div class="comic-card">
    <h4 style="margin: 0 0 6px 0; color: #854d0e; font-size: 17px;">3. 5秒以上の沈黙でスタンプ画像を表示</h4>
    <p style="font-size: 14px; margin: 0; color: #334155;">沈黙が5秒を超えた段階で指定のスタンプ画像（その発言で会話がピタッと止まった）を表示。</p>
  </div>
  <div class="comic-card">
    <h4 style="margin: 0 0 6px 0; color: #059669; font-size: 17px;">4. 発話再開者の検知と記録</h4>
    <p style="font-size: 14px; margin: 0; color: #334155;">沈黙を終えて最初に発話した参加者を検知し、沈黙救出回数として集計・表示。</p>
  </div>
</div>

---

## 実装動作：発話検知から沈黙計測・スタンプ表示のフロー

<div style="display: grid; grid-template-columns: 1fr 1.3fr; gap: 24px; align-items: center;">
  <div>
    <div class="danger-card" style="font-size: 16px; line-height: 1.7;">
      <b>[ 動作シナリオ ]</b><br>
      ・<b>00:08</b> 田中が発言（発話状態を検知）<br>
      ・<b>00:10</b> 全員沈黙（沈黙計測開始）<br>
      ・<b>00:16</b> 5秒経過によりスタンプ画像表示<br>
      ・<b>00:20</b> 10秒経過アラート表示<br>
      ・<b>00:22</b> 鈴木が発言再開（沈黙終了・再開者集計）
    </div>
    <div style="margin-top: 14px; font-size: 13px; color: #64748b; font-weight: bold;">
      収録動画: demo-presentation.mp4
    </div>
  </div>
  <div style="text-align: center;">
    <img src="../その発言で会話がピタッと止まった.png" style="width: 380px; max-height: 380px; border: 5px solid #000; border-radius: 20px; box-shadow: 8px 8px 0px #000;" alt="その発言で会話がピタッと止まった">
  </div>
</div>

---

## 技術構成 & Gemini / 低遅延AI連携による発展性

<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-top: 10px;">
  <div class="comic-card">
    <h4 style="margin: 0 0 4px 0; color: #0f172a; font-size: 17px;">[ 現行実装 ] 堅牢なエッジVAD</h4>
    <p style="font-size: 14px; margin: 0; color: #334155;">
      <b>Web Audio API / AudioWorklet</b> ＋ <b>Node.js WebSocket</b><br>
      低遅延（15ms未満）・外部API非依存・端末内メモリ即時破棄で「技術者倫理」を完全遵守。
    </p>
  </div>
  <div class="comic-card">
    <h4 style="margin: 0 0 4px 0; color: #4f46e5; font-size: 17px;">[ 発展性 ] Gemini 2.0 Flash 連携</h4>
    <p style="font-size: 14px; margin: 0; color: #334155;">
      <b>Gemini Flash / Gemini Nano</b><br>
      超低遅延・軽量LLMと連携し、沈黙発生時に会話再開のための話題候補をリアルタイム生成する機能への拡張。
    </p>
  </div>
</div>

<div class="danger-card" style="margin-top: 14px;">
  <h4 style="margin: 0 0 4px 0; color: #dc2626; font-size: 17px;">テーマ「隙間」に対する技術的アプローチ</h4>
  <p style="font-size: 15px; font-weight: bold; margin: 0; color: #0f172a;">
    会話における「隙間（沈黙時間）」をミリ秒単位で測定・可視化し、客観的データとして提供することで円滑な会話進行を支援する。
  </p>
</div>

<div style="text-align: center; margin-top: 10px; font-weight: 900; font-size: 22px; color: #0f172a;">
  ご清聴ありがとうございました
</div>
