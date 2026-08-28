import puppeteer from 'puppeteer';
import { spawn } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const OUTPUT_VIDEO = path.join(rootDir, 'public', 'demo-presentation.mp4');
const ROOT_OUTPUT = path.join(rootDir, 'demo-presentation.mp4');

const DURATION_SEC = 27; // 27秒の完全シナリオ
const FPS = 25;
const WIDTH = 1920;
const HEIGHT = 1080;

async function record() {
  console.log(`Starting video recording: 1920x1080 @ ${FPS}fps for ${DURATION_SEC}s...`);

  const browser = await puppeteer.launch({
    headless: 'new',
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      `--window-size=${WIDTH},${HEIGHT}`
    ],
    defaultViewport: {
      width: WIDTH,
      height: HEIGHT,
      deviceScaleFactor: 1
    }
  });

  const page = await browser.newPage();
  await page.goto('http://localhost:3000/studio.html', { waitUntil: 'networkidle0' });

  // FFmpeg プロセス起動
  const ffmpeg = spawn('/opt/homebrew/bin/ffmpeg', [
    '-y',
    '-f', 'image2pipe',
    '-vcodec', 'png',
    '-r', `${FPS}`,
    '-i', '-',
    '-c:v', 'libx264',
    '-pix_fmt', 'yuv420p',
    '-preset', 'fast',
    '-crf', '20',
    OUTPUT_VIDEO
  ]);

  ffmpeg.stderr.on('data', (data) => {
    // console.log(`ffmpeg: ${data.toString()}`);
  });

  const totalFrames = DURATION_SEC * FPS;
  console.log(`Capturing ${totalFrames} frames...`);

  for (let frame = 0; frame < totalFrames; frame++) {
    const screenshot = await page.screenshot({ type: 'png' });
    ffmpeg.stdin.write(screenshot);

    if (frame % (FPS * 3) === 0) {
      console.log(`Progress: ${(frame / totalFrames * 100).toFixed(0)}% (${(frame / FPS).toFixed(1)}s / ${DURATION_SEC}s)`);
    }

    // 1フレーム分時間を進める (40ms)
    await new Promise(r => setTimeout(r, 1000 / FPS));
  }

  ffmpeg.stdin.end();

  await new Promise((resolve, reject) => {
    ffmpeg.on('close', (code) => {
      if (code === 0) resolve();
      else reject(new Error(`FFmpeg exited with code ${code}`));
    });
  });

  await browser.close();

  // ルートディレクトリにもコピー
  fs.copyFileSync(OUTPUT_VIDEO, ROOT_OUTPUT);

  console.log(`\n Video recording completed successfully!`);
  console.log(`Saved to: ${OUTPUT_VIDEO}`);
  console.log(`Saved to: ${ROOT_OUTPUT}`);
}

record().catch(err => {
  console.error('Recording error:', err);
  process.exit(1);
});
