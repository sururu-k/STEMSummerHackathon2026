# 会話クラッシャー晒し機 (Silence Tracker)

[![技術者倫理|遵守済み](https://gijutsusharin.li/badge.svg)](https://gijutsusharin.li)
[![CI Status](https://img.shields.io/badge/CI-passing-emerald)](https://github.com/)
[![Node Version](https://img.shields.io/badge/node-%3E%3D20.0.0-blue)](https://nodejs.org/)
[![License](https://img.shields.io/badge/license-MIT-slate)](./LICENSE)
[![Privacy Architecture](https://img.shields.io/badge/privacy-Zero--Audio--Payload-indigo)](./md/ADR-001-zero-audio-payload-vad.md)
[![Hackathon](https://img.shields.io/badge/STEM%20Hackathon%202026-%E3%83%86%E3%83%BC%E3%83%9E%E3%80%8C%E9%9A%99%E9%96%93%E3%80%8D-red)](./md/arc/%E3%83%8F%E3%83%83%E3%82%AB%E3%82%BD%E3%83%B3.md)

> **STEM Summer Hackathon 2026 参加作品**  
> テーマ：「**隙間**」  
> 一行要約：**音声データを一切送信せず、エッジVADによる1bit発話判定のみを集約し、会話の「隙間（沈黙）」をミリ秒単位で可視化・ストッパーを特定するリアルタイム監視システム**

---

## 1. ドキュメント一覧

- **[Marp 発表スライド Markdown](./md/slides.marp.md)**（[PDF版スライド](./slides.pdf) / [HTML版スライド](./public/marp-slides.html)）
- **[動画連動プレゼンプレイヤー (Web)](./public/slides.html)**（トーク原稿・自動動画再生付き）
- **[アーキテクチャ設計決定書 (ADR-001)](./md/ADR-001-zero-audio-payload-vad.md)**
- **[実装計画書・詳細仕様](./md/%E3%83%8F%E3%83%83%E3%82%AB%E3%82%BD%E3%83%B3%20%E5%AE%9F%E8%A3%85%E8%A8%88%E7%94%BB.md)**
- **[開発・コントリビューション規約](./CONTRIBUTING.md)**
- **[初期ブレスト・アイデアアーカイブ](./md/arc/)**

---

## 2. システムアーキテクチャ & プライバシー設計

```mermaid
sequenceDiagram
    autonumber
    actor Participant as 参加者端末 (Mobile)
    participant Worklet as AudioWorklet (Edge VAD)
    participant Server as Node.js WebSocket Server
    actor Display as 会場大画面 (Display)

    Participant->>Worklet: マイク音声入力 (300-3400Hz Bandpass)
    Worklet->>Worklet: RMS計算 & 適応ノイズフロア閾値判定
    Note over Worklet: 音声実データは端末内で即座に破棄
    Worklet->>Server: 10Hz JSON { speaking: bool, level: float }
    Server->>Server: 分散マイク音量比較 (Max-RMS Diarization)
    Server->>Server: 沈黙ステートマシン更新 (沈黙秒数・戦犯判定)
    Server-->>Display: 10Hz ルーム状態ブロードキャスト
    Note over Display: 5秒沈黙で特大スタンプ出現 / 10秒で完全凍結アラート
```

### プライバシーと性能特性

| 項目 | 本システムの仕様 | 従来の音声認識 / VC Bot |
|---|---|---|
| **音声データの外部送信** | **完全ゼロ (端末内破棄)** | サーバーへ常時ストリーミング |
| **通信帯域** | **1クライアントあたり 0.5 KB/s 未満** | 32〜64 KB/s (Opus) |
| **同室クロストーク** | **分散マイク RMS 比較で自動分離** | 隣の声を誤認識 |
| **ブラウザ互換性** | **標準 Web Audio API (iOS / Android / PC)** | Discord 等の外部アプリ必須 |
| **技術者倫理** | **プライバシー侵害・盗聴リスク ゼロ** | 録音流出・同意取得リスク |

---

## 3. 発表用デモ素材 & シミュレータ

1. **発表用デモ動画 (1080p Full HD MP4)**:  
   - [demo-presentation.mp4](./demo-presentation.mp4)
2. **マルチ端末ライブシミュレータ**:  
   - [studio.html](./public/studio.html)（プロジェクター画面とスマホ3台が完全連動）
3. **大画面プロジェクター用ダッシュボード**:  
   - [display.html](./public/display.html)
4. **参加者用マイクUI**:  
   - [index.html](./public/index.html)

---

## 4. クイックスタート

### 開発環境のセットアップ
```bash
# 依存パッケージのインストール
npm install

# サーバー起動 (ポート 3000)
npm start
```

### 起動後のアクセス先
- プレゼンスライド（トーク原稿・MP4連動）: `http://localhost:3000/slides.html`
- マルチ端末デモスタジオ: `http://localhost:3000/studio.html`
- 会場大画面ダッシュボード: `http://localhost:3000/display`
- 参加者マイク参加: `http://localhost:3000/`

### スライドのビルド & エクスポート
```bash
# Marp スライド (HTML) のビルド
npm run build-slides
```

### デモ動画の自動再収録 (Puppeteer + FFmpeg)
```bash
# 1920x1080 30fps でデモ実演をMP4自動出力
npm run record-video
```

---

## 5. 技術者倫理に関するステートメント

本プロダクトは「会話の隙間（沈黙）」を可視化するエンタメシステムですが、参加者のプライバシーおよび人権に配慮した設計を徹底しています。

1. **ゼロ・オーディオ・ペイロード**: 音声波形・録音データは一切ネットワークに送信せず、端末内メモリで即時破棄されます。
2. **会話内容の不可逆性**: 会話の内容や単語は解析せず、「喋っているか否か（1bit）」のみを取り扱います。
3. **心理的安全性の担保**: 沈黙を生んだストッパーを晒すだけでなく、沈黙を破った人を「沈黙ブレイカーMVP」として表彰する仕組みを組み込み、ポジティブなコミュニケーション促進を目指しています。

---

## 6. ライセンス

本プロジェクトは [MIT License](./LICENSE) のもとで公開されています。
