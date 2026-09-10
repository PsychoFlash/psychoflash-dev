/**
 * HiveMind — Collective Intelligence Strip
 *
 * Shows the "global consciousness" of all site visitors.
 * Uses a deterministic seed based on current time-slot + Math.sin
 * to simulate realistic, slowly drifting collective interest.
 * Totally client-side — no backend needed.
 */

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useNeuro } from "@/hooks/NeuroContext";

interface HiveTopic {
  label: string;
  emoji: string;
  key: "broadcast" | "hitech" | "events" | "creative";
}

const TOPICS: HiveTopic[] = [
  { label: "Broadcast", emoji: "📡", key: "broadcast" },
  { label: "AI Production", emoji: "🧠", key: "hitech" },
  { label: "Live Events", emoji: "⚡", key: "events" },
  { label: "Creative", emoji: "🎬", key: "creative" },
];

// Generate pseudo-random but smooth, slowly drifting collective interest
function computeHiveWeights(seed: number): Record<string, number> {
  const t = seed;
  const raw = {
    broadcast: 0.25 + Math.sin(t * 0.0003 + 1.1) * 0.15 + Math.sin(t * 0.00009) * 0.08,
    hitech: 0.25 + Math.sin(t * 0.0004 + 2.3) * 0.18 + Math.sin(t * 0.00011 + 0.5) * 0.07,
    events: 0.25 + Math.sin(t * 0.00025 + 3.7) * 0.12 + Math.sin(t * 0.00008 + 1.2) * 0.06,
    creative: 0.25 + Math.sin(t * 0.00035 + 0.7) * 0.14 + Math.sin(t * 0.0001) * 0.05,
  };
  const total = Object.values(raw).reduce((a, b) => a + b, 0);
  return Object.fromEntries(Object.entries(raw).map(([k, v]) => [k, Math.max(0.05, v / total)]));
}

export default function HiveMind() {
  const { state } = useNeuro();
  const [hive, setHive] = useState(() => computeHiveWeights(Date.now()));
  const [activeSessions] = useState(() => Math.floor(Math.sin(Date.now() * 0.00001) * 8 + 14));
  const rafRef = useRef(0);

  // Slowly drift the hive weights
  useEffect(() => {
    // eslint-disable-next-line prefer-const
    let rafHandle: number;
    let timeHandle: ReturnType<typeof setTimeout>;
    const tick = () => {
      setHive(computeHiveWeights(Date.now()));
      timeHandle = setTimeout(() => {
        rafHandle = requestAnimationFrame(tick);
      }, 2000);
    };
    rafHandle = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(rafHandle);
      clearTimeout(timeHandle);
    };
  }, []);

  // Blend personal profile into hive
  const blended = Object.fromEntries(
    TOPICS.map(({ key }) => [
      key,
      hive[key] * 0.7 + state.weights[key] * 0.3,
    ])
  );
  const total = Object.values(blended).reduce((a, b) => a + b, 0);
  const normalized = Object.fromEntries(
    Object.entries(blended).map(([k, v]) => [k, v / total])
  );

  const dominant = TOPICS.reduce((a, b) =>
    normalized[b.key] > normalized[a.key] ? b : a
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 2, duration: 1 }}
      className="fixed bottom-6 right-6 z-40 pointer-events-none"
    >
      <div
        className="rounded-xl px-4 py-3"
        style={{
          background: "hsl(var(--bg-card) / 0.85)",
          border: "1px solid hsl(var(--border))",
          backdropFilter: "blur(12px)",
          minWidth: "180px",
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-2.5">
          <span
            className="font-orbitron uppercase"
            style={{ fontSize: "7px", letterSpacing: "2px", color: "hsl(var(--fg-muted))", opacity: 0.7 }}
          >
            NEURAL PULSE
          </span>
          <div className="flex items-center gap-1.5">
            <div
              className="w-1.5 h-1.5 rounded-full"
              style={{
                background: "hsl(var(--primary))",
                animation: "pulse2 1.5s ease-in-out infinite",
              }}
            />
            <span
              style={{ fontSize: "7px", color: "hsl(var(--fg-muted))", opacity: 0.5 }}
            >
              {activeSessions} active
            </span>
          </div>
        </div>

        {/* Interest bars */}
        <div className="flex flex-col gap-1.5">
          {TOPICS.map(({ label, emoji, key }) => {
            const w = normalized[key];
            const isPersonal = state.weights[key] > 0.28;
            const isDominant = key === dominant.key;
            return (
              <div key={key} className="flex items-center gap-2">
                <span style={{ fontSize: "9px", minWidth: "12px" }}>{emoji}</span>
                <div
                  className="flex-1 rounded-full overflow-hidden"
                  style={{ height: "3px", background: "hsl(var(--border))" }}
                >
                  <motion.div
                    className="h-full rounded-full"
                    style={{
                      background: isDominant
                        ? "hsl(var(--primary))"
                        : "hsl(var(--fg-muted) / 0.4)",
                    }}
                    animate={{ width: `${(w * 100).toFixed(1)}%` }}
                    transition={{ duration: 1.5, ease: "easeInOut" }}
                  />
                </div>
                <span
                  className="font-orbitron"
                  style={{
                    fontSize: "7px",
                    color: isDominant
                      ? "hsl(var(--primary))"
                      : "hsl(var(--fg-muted))",
                    opacity: isDominant ? 1 : 0.5,
                    minWidth: "28px",
                    textAlign: "right",
                  }}
                >
                  {(w * 100).toFixed(0)}%
                </span>
              </div>
            );
          })}
        </div>

        {/* Current focus */}
        <div className="mt-2.5 pt-2" style={{ borderTop: "1px solid hsl(var(--border))" }}>
          <span
            className="font-orbitron"
            style={{ fontSize: "7px", color: "hsl(var(--primary))", letterSpacing: "1px" }}
          >
            DOMINANT: {dominant.emoji} {dominant.label.toUpperCase()}
          </span>
        </div>
      </div>
    </motion.div>
  );
}
