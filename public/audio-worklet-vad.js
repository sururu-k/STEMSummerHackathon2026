/**
 * AudioWorkletProcessor for computing Audio RMS (Volume)
 * Runs off the main thread (immune to background tab throttling)
 */
class VADProcessor extends AudioWorkletProcessor {
  constructor() {
    super();
    this.bufferSize = 128;
  }

  process(inputs, outputs, parameters) {
    const input = inputs[0];
    if (!input || input.length === 0) return true;

    const channelData = input[0];
    let sum = 0;
    for (let i = 0; i < channelData.length; i++) {
      sum += channelData[i] * channelData[i];
    }
    const rms = Math.sqrt(sum / channelData.length);

    // RMS Level をメインスレッドに通知
    this.port.postMessage({ rms });

    return true;
  }
}

registerProcessor('vad-processor', VADProcessor);
