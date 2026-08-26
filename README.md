# 会話クラッシャー晒し機 (Silence Tracker)

![CI Status](https://img.shields.io/badge/CI-passing-emerald)
![Node Version](https://img.shields.io/badge/node-%3E%3D20.0.0-blue)
![License](https://img.shields.io/badge/license-MIT-slate)
![Privacy Architecture](https://img.shields.io/badge/privacy-Zero--Audio--Payload-indigo)
![Hackathon](https://img.shields.io/badge/STEM%20Hackathon%202026-%E3%83%86%E3%83%BC%E3%83%9E%E3%80%8C%E9%9A%99%E9%96%93%E3%80%8D-red)

> **STEM Summer Hackathon 2026 参加作品**  
> テーマ：「**隙間**」  
> 一行要約：**音声データを一切送信せず、エッジVADによる1bit発話判定のみを集約し、会話の「隙間（沈黙）」をミリ秒単位で可視化・ストッパーを特定するリアルタイム監視システム**

---

## 1. ドキュメント一覧

- **[Marp 発表スライド Markdown](./md/slides.marp.md)**（[PDF版スライド](./slides.pdf) / [HTML版スライド](http://localhost:3000/marp-slides.html)）
- **[動画連動プレゼンプレイヤー](http://localhost:3000/slides.html)**（トーク原稿・自動動画再生付き）
- **[アーキテクチャ設計決定書 (ADR-001)](./md/ADR-001-zero-audio-payload-vad.md)**
- **[実装計画書・詳細仕様](./md/ハッカソン%20実装計画.md)**
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
    Note over Worklet: 音声実データは破棄
    Worklet->>Server: 10Hz JSON { speaking: bool, level: float }
    Server->>Server: 分散マイク音量比較 (Max-RMS Diarization)
    Server->>Server: 沈黙ステートマシン更新 (沈黙秒数・戦犯判定)
    Server-->>Display: 10Hz ルーム状態ブロードキャスト
    Note over Display: 5秒沈黙で特大スタンプ出現 / 10秒で完全凍結アラート
```

### プライバシーと性能特性

| 項目 | 本システムの仕様 | 従来の音声認識/VC Bot |
|---|---|---|
| **音声データの外部送信** | **完全ゼロ (端末内破棄)** | サーバーへ常時ストリーミング |
| **通信帯域** | **1クライアントあたり 0.5 KB/s 未満** | 32〜64 KB/s (Opus) |
| **同室クロストーク** | **分散マイク RMS 比較で自動分離** | 隣の声を誤認識 |
| **ブラウザ互換性** | **標準 Web Audio API (iOS/Android/PC)** | Discord 等の外部アプリ必須 |

---

## 3. 発表用デモ素材 & シミュレータ

1. **発表用デモ動画 (1080p Full HD MP4)**:  
   - [demo-presentation.mp4](./demo-presentation.mp4) (または `http://localhost:3000/demo-presentation.mp4`)
2. **マルチ端末ライブシミュレータ**:  
   - `http://localhost:3000/studio.html`（プロジェクター画面とスマホ3台が完全連動）
3. **大画面プロジェクター用ダッシュボード**:  
   - `http://localhost:3000/display`
4. **参加者用マイクUI**:  
   - `http://localhost:3000/`

---

## 4. クイックスタート

### 開発環境のセットアップ
```bash
# 依存パッケージのインストール
npm install

# サーバー起動 (ポート 3000)
npm start
```

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

## 5. ライセンス

本プロジェクトは [MIT License](./LICENSE) のもとで公開されています。
