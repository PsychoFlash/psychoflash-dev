/**
 * tactileAudio — Zero-Latency Web Audio Synthesizer for Omnipresent Feedback
 * 
 * Provides tactile, authentic physical switcher & console sound effects
 * for every touch and click across PSYCHOFLASH.
 * Completely synthesized in real-time — zero network requests, zero latency.
 */

class TactileAudioEngine {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;

  private getContext(): AudioContext | null {
    if (typeof window === "undefined") return null;
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx({ sampleRate: 44100, latencyHint: "interactive" });
      }
    }
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume().catch(() => {});
    }
    return this.ctx;
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
  }

  public play(type: "switch" | "chime" | "thud" | "pop" | "glitch" | "tally" = "switch") {
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const t = ctx.currentTime;

      switch (type) {
        case "switch": {
          // Sharp broadcast switcher mechanical relay snap
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = "triangle";
          osc.frequency.setValueAtTime(1400, t);
          osc.frequency.exponentialRampToValueAtTime(120, t + 0.025);

          gain.gain.setValueAtTime(0.08, t);
          gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.025);

          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(t);
          osc.stop(t + 0.03);
          break;
        }

        case "chime": {
          // Harmonic golden bell chime (432Hz harmonic)
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = "sine";
          osc.frequency.setValueAtTime(864, t);
          osc.frequency.exponentialRampToValueAtTime(432, t + 0.18);

          gain.gain.setValueAtTime(0.06, t);
          gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.22);

          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(t);
          osc.stop(t + 0.25);
          break;
        }

        case "thud": {
          // Deep sub-bass synaptic pulse (55Hz)
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = "sine";
          osc.frequency.setValueAtTime(75, t);
          osc.frequency.exponentialRampToValueAtTime(32, t + 0.12);

          gain.gain.setValueAtTime(0.12, t);
          gain.gain.exponentialRampToValueAtTime(0.001, t + 0.14);

          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(t);
          osc.stop(t + 0.15);
          break;
        }

        case "pop": {
          // Organic spring pop
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = "sine";
          osc.frequency.setValueAtTime(300, t);
          osc.frequency.exponentialRampToValueAtTime(950, t + 0.04);

          gain.gain.setValueAtTime(0.07, t);
          gain.gain.exponentialRampToValueAtTime(0.001, t + 0.05);

          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(t);
          osc.stop(t + 0.06);
          break;
        }

        case "glitch": {
          // Cyber glitch laser chirp
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = "sawtooth";
          osc.frequency.setValueAtTime(2200, t);
          osc.frequency.linearRampToValueAtTime(440, t + 0.06);

          gain.gain.setValueAtTime(0.04, t);
          gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.07);

          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(t);
          osc.stop(t + 0.08);
          break;
        }

        case "tally": {
          // Camera tally click
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = "sine";
          osc.frequency.setValueAtTime(1760, t);
          osc.frequency.setValueAtTime(2640, t + 0.015);

          gain.gain.setValueAtTime(0.05, t);
          gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.04);

          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(t);
          osc.stop(t + 0.05);
          break;
        }
      }
    } catch {
      // Ignore autoplay policy if not engaged
    }
  }
}

export const tactileAudio = new TactileAudioEngine();

export function playTactileSound(type?: "switch" | "chime" | "thud" | "pop" | "glitch" | "tally") {
  tactileAudio.play(type);
}
