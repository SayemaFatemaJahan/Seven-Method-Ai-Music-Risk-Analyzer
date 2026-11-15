/**
 * Web Audio API Engine
 * Handles real-time audio playback, waveform synthesis for research presets,
 * and client-side PCM decoding of user-uploaded MP3/WAV/AAC files.
 */

class AudioPlaybackService {
  private ctx: AudioContext | null = null;
  private currentSource: AudioBufferSourceNode | null = null;
  private currentGain: GainNode | null = null;
  private currentBuffer: AudioBuffer | null = null;
  private startTime = 0;
  private pausedAt = 0;
  private isPlaying = false;
  private onTimeUpdateCallback: ((currentTime: number, duration: number) => void) | null = null;
  private animationFrameId: number | null = null;

  private initContext(): AudioContext {
    if (!this.ctx || this.ctx.state === 'closed') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    return this.ctx;
  }

  public getContext(): AudioContext {
    return this.initContext();
  }

  /**
   * Synthesizes audio samples in-browser for the research presets
   * so the user can listen and verify waveforms without needing external media files.
   */
  public generatePresetAudioBuffer(type: 'koto-folk-synth' | 'rock-riff' | 'rabindra-cover' | 'trap-loop' | 'clean-original', durationSec = 16): AudioBuffer {
    const ctx = this.initContext();
    const sampleRate = ctx.sampleRate;
    const numFrames = Math.floor(sampleRate * durationSec);
    const buffer = ctx.createBuffer(2, numFrames, sampleRate);
    const left = buffer.getChannelData(0);
    const right = buffer.getChannelData(1);

    if (type === 'koto-folk-synth') {
      // Cakewalk Koto Virtual Instrument pentatonic pluck simulation + subtle folk rhythm
      // Koto tuning (Insen scale: D, Eb, G, A, C)
      const kotoFreqs = [293.66, 311.13, 392.00, 440.00, 523.25, 587.33];
      const tempo = 102; // BPM
      const beatDur = 60 / tempo;

      for (let i = 0; i < numFrames; i++) {
        const t = i / sampleRate;
        const beatNum = Math.floor(t / (beatDur / 2));
        const timeInPluck = (t % (beatDur / 2));
        
        // Koto pluck note
        const noteIndex = (beatNum * 3) % kotoFreqs.length;
        const freq = kotoFreqs[noteIndex];
        const pluckEnvelope = Math.exp(-timeInPluck * 11);
        const kotoTone = Math.sin(2 * Math.PI * freq * t) * 0.6 + Math.sin(2 * Math.PI * freq * 2 * t) * 0.25;
        
        // Gentle background tabla/folk shaker
        const shakerEnvelope = Math.exp(-(t % (beatDur / 4)) * 25);
        const noise = (Math.random() * 2 - 1) * shakerEnvelope * 0.08;

        // Original vocal melody simulation (sine wave with vibrato)
        const vocalFreq = 220 + Math.sin(t * 1.5) * 40;
        const vocalEnv = 0.5 + 0.3 * Math.sin(t * 0.8);
        const vocal = Math.sin(2 * Math.PI * vocalFreq * t + Math.sin(2 * Math.PI * 5 * t) * 0.3) * 0.15 * vocalEnv;

        const sample = (kotoTone * pluckEnvelope * 0.3) + noise + vocal;
        left[i] = sample;
        right[i] = sample * 0.95;
      }
    } else if (type === 'rock-riff') {
      // Bangla rock overdrive guitar riff + kick/snare
      const riffFreqs = [146.83, 146.83, 174.61, 196.00, 220.00, 196.00]; // D Minor
      const tempo = 126;
      const beatDur = 60 / tempo;

      for (let i = 0; i < numFrames; i++) {
        const t = i / sampleRate;
        const noteIndex = Math.floor(t / beatDur) % riffFreqs.length;
        const f = riffFreqs[noteIndex];
        
        // Distortion / overdrive
        let rawWave = Math.sin(2 * Math.PI * f * t) + 0.5 * Math.sin(2 * Math.PI * f * 2 * t);
        const guitar = Math.tanh(rawWave * 2.5) * 0.25;

        // Kick on beat 1 & 3, snare on 2 & 4
        const beatFraction = t % beatDur;
        const beatIndex = Math.floor(t / beatDur) % 4;
        let drum = 0;
        if (beatIndex === 0 || beatIndex === 2) {
          drum = Math.sin(2 * Math.PI * (120 * Math.exp(-beatFraction * 20)) * t) * Math.exp(-beatFraction * 8) * 0.4;
        } else {
          drum = (Math.random() * 2 - 1) * Math.exp(-beatFraction * 14) * 0.25;
        }

        left[i] = guitar + drum;
        right[i] = guitar + drum;
      }
    } else if (type === 'rabindra-cover') {
      // Acoustic harmonium / acoustic guitar drone in C Major
      for (let i = 0; i < numFrames; i++) {
        const t = i / sampleRate;
        // C Major chord notes: C4 (261.63), E4 (329.63), G4 (392.00)
        const drone = (
          Math.sin(2 * Math.PI * 130.81 * t) * 0.2 + // C3
          Math.sin(2 * Math.PI * 261.63 * t) * 0.15 +
          Math.sin(2 * Math.PI * 329.63 * t) * 0.12 +
          Math.sin(2 * Math.PI * 392.00 * t) * 0.1
        );
        const flute = Math.sin(2 * Math.PI * (523.25 + Math.sin(t * 2) * 15) * t) * 0.1 * (0.6 + 0.4 * Math.sin(t));
        left[i] = (drone + flute) * 0.4;
        right[i] = (drone + flute) * 0.4;
      }
    } else {
      // Generic harmonic test track
      for (let i = 0; i < numFrames; i++) {
        const t = i / sampleRate;
        const sample = Math.sin(2 * Math.PI * 220 * t) * 0.15 + Math.sin(2 * Math.PI * 440 * t) * 0.08;
        left[i] = sample;
        right[i] = sample;
      }
    }

    return buffer;
  }

  /**
   * Decodes an uploaded audio File (MP3, WAV, etc.) into an AudioBuffer
   */
  public async decodeAudioFile(file: File): Promise<{ buffer: AudioBuffer; peaks: number[] }> {
    const ctx = this.initContext();
    const arrayBuffer = await file.arrayBuffer();
    const audioBuffer = await ctx.decodeAudioData(arrayBuffer);
    const peaks = this.extractPeaks(audioBuffer, 120);
    return { buffer: audioBuffer, peaks };
  }

  /**
   * Extracts normalized amplitude peaks for responsive waveform rendering
   */
  public extractPeaks(buffer: AudioBuffer, numPeaks = 100): number[] {
    const channelData = buffer.getChannelData(0);
    const step = Math.floor(channelData.length / numPeaks);
    const peaks: number[] = [];

    for (let i = 0; i < numPeaks; i++) {
      let max = 0;
      const start = i * step;
      const end = Math.min(start + step, channelData.length);
      for (let j = start; j < end; j += 4) { // Sub-sample for speed
        const val = Math.abs(channelData[j]);
        if (val > max) max = val;
      }
      peaks.push(Math.min(1, Math.max(0.05, max)));
    }
    return peaks;
  }

  /**
   * Play audio buffer from specific position
   */
  public playBuffer(
    buffer: AudioBuffer, 
    startOffset = 0, 
    onTimeUpdate?: (currentTime: number, duration: number) => void,
    onEnded?: () => void
  ) {
    this.stop();
    const ctx = this.initContext();

    this.currentBuffer = buffer;
    this.onTimeUpdateCallback = onTimeUpdate || null;

    const source = ctx.createBufferSource();
    source.buffer = buffer;

    const gain = ctx.createGain();
    gain.gain.value = 0.85;

    source.connect(gain);
    gain.connect(ctx.destination);

    this.currentSource = source;
    this.currentGain = gain;
    this.startTime = ctx.currentTime - startOffset;
    this.pausedAt = startOffset;
    this.isPlaying = true;

    source.onended = () => {
      this.isPlaying = false;
      if (this.animationFrameId) {
        cancelAnimationFrame(this.animationFrameId);
        this.animationFrameId = null;
      }
      if (onEnded) onEnded();
    };

    source.start(0, startOffset);
    this.startTrackingTime(buffer.duration);
  }

  private startTrackingTime(duration: number) {
    const track = () => {
      if (!this.isPlaying || !this.ctx) return;
      const current = Math.min(duration, this.ctx.currentTime - this.startTime);
      if (this.onTimeUpdateCallback) {
        this.onTimeUpdateCallback(current, duration);
      }
      if (current < duration) {
        this.animationFrameId = requestAnimationFrame(track);
      }
    };
    this.animationFrameId = requestAnimationFrame(track);
  }

  public pause() {
    if (!this.isPlaying || !this.ctx) return;
    this.pausedAt = this.ctx.currentTime - this.startTime;
    this.stop();
  }

  public stop() {
    if (this.currentSource) {
      try {
        this.currentSource.stop();
        this.currentSource.disconnect();
      } catch {
        // Ignore if already stopped
      }
      this.currentSource = null;
    }
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
    this.isPlaying = false;
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }

  public getPausedAt(): number {
    return this.pausedAt;
  }
}

export const audioEngine = new AudioPlaybackService();
