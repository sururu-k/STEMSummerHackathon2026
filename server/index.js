import express from 'express';
import http from 'http';
import { WebSocketServer, WebSocket } from 'ws';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const app = express();
const server = http.createServer(app);
const wss = new WebSocketServer({ server, path: '/ws' });

const PORT = process.env.PORT || 3000;

// 静的ファイルの提供
app.use(express.static(path.join(rootDir, 'public')));
app.use(express.json());

// ルーティング
app.get('/display', (req, res) => {
  res.sendFile(path.join(rootDir, 'public', 'display.html'));
});

// リプレイシナリオ取得API
app.get('/api/replay-scenario', (req, res) => {
  const scenarioPath = path.join(__dirname, 'mock', 'sample-scenario.json');
  if (fs.existsSync(scenarioPath)) {
    const data = fs.readFileSync(scenarioPath, 'utf8');
    res.json(JSON.parse(data));
  } else {
    res.status(404).json({ error: 'Scenario not found' });
  }
});

/**
 * リアルタイムルーム状態管理 (In-Memory)
 */
class RoomState {
  constructor() {
    this.participants = new Map(); // userId -> { id, name, speaking, level, lastSeen }
    this.activeSpeakerId = null;
    this.lastSpeaker = null; // 直前に喋っていた人 { id, name, endedAt }
    this.isSilence = true;
    this.silenceStartedAt = Date.now();
    this.currentSilenceDurationSec = 0;
    
    this.totalSilenceSec = 0;
    this.stoppers = new Map(); // userId -> { name, count, totalSilenceSec }
    this.breakers = new Map(); // userId -> { name, count }
    this.lastStopper = null;
    this.lastBreaker = null;

    this.isReplay = false;
  }

  updateVoiceState(userId, userName, speaking, level) {
    if (this.isReplay) return;
    this.participants.set(userId, {
      id: userId,
      name: userName || '名無し',
      speaking: !!speaking,
      level: Number(level) || 0,
      lastSeen: Date.now()
    });
  }

  removeParticipant(userId) {
    this.participants.delete(userId);
  }

  // 100ms ごとの tick 処理 (状態集約 & クロストーク解消 & 沈黙判定)
  tick(now = Date.now()) {
    if (this.isReplay) return this.exportState(now);

    // タイムアウトした参加者の削除 (5秒以上通信なし)
    for (const [userId, p] of this.participants.entries()) {
      if (now - p.lastSeen > 5000) {
        this.participants.delete(userId);
      }
    }

    // 分散マイク ダイアリゼーション: 最も音量 (level) が大きい発話者を選定
    let highestLevel = 0.15; // 最低閾値
    let dominantSpeaker = null;

    for (const p of this.participants.values()) {
      if (p.speaking && p.level > highestLevel) {
        highestLevel = p.level;
        dominantSpeaker = p;
      }
    }

    const previousSpeakerId = this.activeSpeakerId;

    if (dominantSpeaker) {
      // 誰かが喋っている状態
      if (this.isSilence) {
        // 沈黙が破られた瞬間！
        const silenceDuration = (now - this.silenceStartedAt) / 1000;
        this.isSilence = false;

        // 3秒以上の沈黙を破った場合、ブレイカーとして表彰
        if (silenceDuration >= 3.0) {
          const breakerId = dominantSpeaker.id;
          const currentBreaker = this.breakers.get(breakerId) || { name: dominantSpeaker.name, count: 0 };
          currentBreaker.count += 1;
          this.breakers.set(breakerId, currentBreaker);
          this.lastBreaker = {
            userId: breakerId,
            userName: dominantSpeaker.name,
            silenceDurationSec: Math.round(silenceDuration * 10) / 10
          };

          // 直前のストッパーも記録更新
          if (this.lastSpeaker) {
            const stopperId = this.lastSpeaker.id;
            const currentStopper = this.stoppers.get(stopperId) || { name: this.lastSpeaker.name, count: 0, totalSilenceSec: 0 };
            currentStopper.count += 1;
            currentStopper.totalSilenceSec += silenceDuration;
            this.stoppers.set(stopperId, currentStopper);
            this.lastStopper = {
              userId: stopperId,
              userName: this.lastSpeaker.name,
              durationSec: Math.round(silenceDuration * 10) / 10
            };
          }
        }
      }

      this.activeSpeakerId = dominantSpeaker.id;
      this.currentSilenceDurationSec = 0;
      this.lastSpeaker = {
        id: dominantSpeaker.id,
        name: dominantSpeaker.name,
        endedAt: now
      };
    } else {
      // 全員沈黙している状態
      if (!this.isSilence) {
        this.isSilence = true;
        this.silenceStartedAt = now;
      }
      this.activeSpeakerId = null;
      this.currentSilenceDurationSec = Math.round(((now - this.silenceStartedAt) / 1000) * 10) / 10;
      this.totalSilenceSec += 0.1;
    }

    return this.exportState(now);
  }

  exportState(now = Date.now()) {
    const stopperList = Array.from(this.stoppers.entries()).map(([id, s]) => ({
      id,
      name: s.name,
      count: s.count,
      avgSilenceSec: Math.round((s.totalSilenceSec / s.count) * 10) / 10
    })).sort((a, b) => b.count - a.count);

    const breakerList = Array.from(this.breakers.entries()).map(([id, b]) => ({
      id,
      name: b.name,
      count: b.count
    })).sort((a, b) => b.count - a.count);

    return {
      type: 'room_state',
      timestamp: now,
      isSilence: this.isSilence,
      activeSpeakerId: this.activeSpeakerId,
      currentSilenceDurationSec: this.currentSilenceDurationSec,
      participants: Array.from(this.participants.values()).map(p => ({
        id: p.id,
        name: p.name,
        speaking: p.id === this.activeSpeakerId,
        level: p.level
      })),
      lastStopper: this.lastStopper,
      lastBreaker: this.lastBreaker,
      stats: {
        totalSilenceSec: Math.round(this.totalSilenceSec * 10) / 10,
        stoppers: stopperList,
        breakers: breakerList
      }
    };
  }
}

const room = new RoomState();

// 100ms周期 (10Hz) で全クライアントに配信
setInterval(() => {
  const state = room.tick();
  const payload = JSON.stringify(state);
  for (const client of wss.clients) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(payload);
    }
  }
}, 100);

// WebSocket 接続処理
wss.on('connection', (ws, req) => {
  let boundUserId = null;

  ws.on('message', (message) => {
    try {
      const data = JSON.parse(message.toString());
      if (data.type === 'voice_state') {
        boundUserId = data.userId;
        room.updateVoiceState(data.userId, data.userName, data.speaking, data.level);
      } else if (data.type === 'reset') {
        room.stoppers.clear();
        room.breakers.clear();
        room.totalSilenceSec = 0;
        room.lastStopper = null;
        room.lastBreaker = null;
      }
    } catch (e) {
      console.error('Invalid WS message', e);
    }
  });

  ws.on('close', () => {
    if (boundUserId) {
      room.removeParticipant(boundUserId);
    }
  });
});

server.listen(PORT, () => {
  console.log(`Silence Tracker running on http://localhost:${PORT}`);
  console.log(`Display view: http://localhost:${PORT}/display`);
});
