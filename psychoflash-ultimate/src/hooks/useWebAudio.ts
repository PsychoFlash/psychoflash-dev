/**
 * useWebAudio — Generative Audio Synthesis Engine
 *
 * Creates ambient audio using Web Audio API only (no files).
 * - Drone layer: low-frequency oscillator (sub-bass hum)
 * - Harmonic layer: evolving chord based on neuro state
 * - Pulse sound: synthesized camera-shutter click on hover
 * - All sounds generated real-time, zero latency, zero network
 */

import { useRef, useEffect, useCallback } from "react";

interface AudioEngine {
  playPulse: () => void;
  playClick: () => void;
  setDroneIntensity: (val: number) => void;
  resume: () => void;
  ctx: AudioContext | null;
}

export function useWebAudio(enabled: boolean): AudioEngine {
  const ctxRef = useRef<AudioContext | null>(null);
  const droneGainRef = useRef<GainNode | null>(null);
  const masterGainRef = useRef<GainNode | null>(null);
  const droneOscRef = useRef<OscillatorNode | null>(null);
  const drone2Ref = useRef<OscillatorNode | null>(null);

  // Initialize audio context on first user gesture
  const initAudio = useCallback(() => {
    if (ctxRef.current) return;
    if (typeof window === "undefined") return;
    if (!enabled) return;

    const ctx = new (window.AudioContext || (window as any).webkitAudioContext)({
      sampleRate: 44100,
      latencyHint: "interactive",
    });
    ctxRef.current = ctx;

    // Master gain (soft)
    const master = ctx.createGain();
    master.gain.value = 0.04;
    master.connect(ctx.destination);
    masterGainRef.current = master;

    // Drone oscillator — very low frequency, base hum (36Hz = fundamental of gold)
    const droneGain = ctx.createGain();
    droneGain.gain.value = 0;
    droneGain.connect(master);
    droneGainRef.current = droneGain;

    const droneOsc = ctx.createOscillator();
    droneOsc.type = "sine";
    droneOsc.frequency.value = 58; // Bb1 — deep cinematic
    droneOsc.connect(droneGain);
    droneOsc.start();
    droneOscRef.current = droneOsc;

    // Second drone (harmonic fifth above)
    const drone2Gain = ctx.createGain();
    drone2Gain.gain.value = 0.5;
    droneGain.connect(drone2Gain); // controlled together
    const drone2 = ctx.createOscillator();
    drone2.type = "sine";
    drone2.frequency.value = 87; // approximately 3/2 ratio
    drone2.connect(droneGain);
    drone2.start();
    drone2Ref.current = drone2;

    // Slowly fade in drone
    droneGain.gain.setTargetAtTime(0.4, ctx.currentTime, 3.0);
  }, [enabled]);

  // Play a synaptic pulse sound — brief high harmonic shimmer
  const playPulse = useCallback(() => {
    const ctx = ctxRef.current;
    if (!ctx || !enabled) return;
    if (ctx.state === "suspended") ctx.resume();

    const t = ctx.currentTime;
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0, t);
    gain.gain.linearRampToValueAtTime(0.08, t + 0.008);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.35);
    gain.connect(masterGainRef.current!);

    // Bell-like harmonic: frequencies of gold = 432Hz and harmonics
    const freqs = [432, 648, 864, 1296];
    freqs.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      osc.type = "sine";
      osc.frequency.value = freq + Math.random() * 8 - 4;
      const oscGain = ctx.createGain();
      oscGain.gain.value = 1 / (i + 1) * 0.7;
      osc.connect(oscGain);
      oscGain.connect(gain);
      osc.start(t);
      osc.stop(t + 0.4);
    });
  }, [enabled]);

  // Camera-shutter click — mechanical synthesized sound
  const playClick = useCallback(() => {
    const ctx = ctxRef.current;
    if (!ctx || !enabled) return;
    if (ctx.state === "suspended") ctx.resume();

    const t = ctx.currentTime;

    // White noise burst (mechanical transient)
    const bufferSize = ctx.sampleRate * 0.05;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * (1 - i / bufferSize);
    }
    const noise = ctx.createBufferSource();
    noise.buffer = buffer;

    // Bandpass filter — camera shutter is midrange
    const bpf = ctx.createBiquadFilter();
    bpf.type = "bandpass";
    bpf.frequency.value = 3200;
    bpf.Q.value = 2;

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.12, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.05);

    noise.connect(bpf);
    bpf.connect(gain);
    gain.connect(masterGainRef.current!);
    noise.start(t);
    noise.stop(t + 0.06);
  }, [enabled]);

  const setDroneIntensity = useCallback((val: number) => {
    const ctx = ctxRef.current;
    const gain = droneGainRef.current;
    if (!ctx || !gain) return;
    gain.gain.setTargetAtTime(val * 0.5, ctx.currentTime, 0.8);
  }, []);

  const resume = useCallback(() => {
    initAudio();
    const ctx = ctxRef.current;
    if (ctx?.state === "suspended") ctx.resume();
  }, [initAudio]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      droneOscRef.current?.stop();
      drone2Ref.current?.stop();
      ctxRef.current?.close();
    };
  }, []);

  return {
    playPulse,
    playClick,
    setDroneIntensity,
    resume,
    ctx: ctxRef.current,
  };
}
