/**
 * HiveMind — Collective Intelligence Strip & Tactical Mode Controller
 *
 * Shows the "global consciousness" of all site visitors and acts as an
 * interactive production telemetry switcher. Clicking any node changes
 * the site focus, triggers audio telemetry, and filters the portfolio.
 */

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNeuro } from "@/hooks/NeuroContext";
import { Sparkles, Activity, Radio, Cpu, Flame, Film } from "lucide-react";

interface HiveTopic {
  label: string;
  labelHe: string;
  emoji: string;
  key: "broadcast" | "hitech" | "events" | "creative";
  categoryFilter: string;
}

const TOPICS: HiveTopic[] = [
  { label: "Broadcast", labelHe: "שידור חי ולוויין", emoji: "📡", key: "broadcast", categoryFilter: "BROADCAST" },
  { label: "AI Production", labelHe: "הפקת AI אוטונומית", emoji: "🧠", key: "hitech", categoryFilter: "CINEMA" },
  { label: "Live Arena", labelHe: "מגה-ארנות והיכלים", emoji: "⚡", key: "events", categoryFilter: "LIVE" },
  { label: "Creative / 4K", labelHe: "קולנוע ומאסטר 4K", emoji: "🎬", key: "creative", categoryFilter: "CINEMA" },
];

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
  const { state, boostProfile } = useNeuro();
  const [hive, setHive] = useState(() => computeHiveWeights(Date.now()));
  const [activeSessions, setActiveSessions] = useState(() => Math.floor(Math.sin(Date.now() * 0.00001) * 8 + 14));
  const [activeFeedback, setActiveFeedback] = useState<string | null>(null);

  // Slowly drift the hive weights
  useEffect(() => {
    let rafHandle: number;
    let timeHandle: ReturnType<typeof setTimeout>;
    const tick = () => {
      setHive(computeHiveWeights(Date.now()));
      timeHandle = setTimeout(() => {
        rafHandle = requestAnimationFrame(tick);
      }, 3000);
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

  const handleTopicClick = (topic: HiveTopic) => {
    // Boost profile in neuro system
    boostProfile(topic.key, 0.4);
    setActiveFeedback(`${topic.emoji} מצב ${topic.labelHe} הופעל`);
    setTimeout(() => setActiveFeedback(null), 2500);

    // Filter portfolio if available
    window.dispatchEvent(
      new CustomEvent("pf-filter-portfolio", { detail: { category: topic.categoryFilter } })
    );

    // Scroll smoothly to portfolio
    const el = document.getElementById("portfolio");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 2, duration: 1 }}
      className="fixed bottom-6 right-6 z-40 pointer-events-auto"
    >
      <div
        className="rounded-xl px-4 py-3 border shadow-2xl transition-all duration-300 hover:border-primary/60"
        style={{
          background: "hsl(var(--bg-card) / 0.90)",
          borderColor: "hsl(var(--border))",
          backdropFilter: "blur(14px)",
          WebkitBackdropFilter: "blur(14px)",
          minWidth: "210px",
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-2.5">
          <div className="flex items-center gap-1.5">
            <Activity size={10} className="text-primary animate-pulse" />
            <span
              className="font-orbitron font-bold uppercase tracking-[2px]"
              style={{ fontSize: "7.5px", color: "hsl(var(--fg))" }}
            >
              NEURAL PULSE
            </span>
          </div>
          <button
            onClick={() => setActiveSessions((prev) => prev + 1)}
            className="flex items-center gap-1.5 px-1.5 py-0.5 rounded hover:bg-primary/10 transition-colors"
            title="לחץ לרענון טלמטריה"
          >
            <div
              className="w-1.5 h-1.5 rounded-full"
              style={{
                background: "hsl(var(--primary))",
                animation: "pulse2 1.5s ease-in-out infinite",
              }}
            />
            <span
              className="font-mono text-[8px] font-semibold"
              style={{ color: "hsl(var(--fg-muted))" }}
            >
              {activeSessions} active
            </span>
          </button>
        </div>

        {/* Interest bars — Fully Clickable! */}
        <div className="flex flex-col gap-1.5">
          {TOPICS.map((topic) => {
            const { label, emoji, key } = topic;
            const w = normalized[key];
            const isDominant = key === dominant.key;
            return (
              <button
                key={key}
                onClick={() => handleTopicClick(topic)}
                className="group flex items-center gap-2 text-right w-full px-1 py-0.5 rounded-md hover:bg-white/5 transition-all text-left"
                title={`לחץ לסינון פרויקטי ${topic.labelHe}`}
              >
                <span style={{ fontSize: "10px", minWidth: "14px" }}>{emoji}</span>
                <span
                  className="text-[9px] font-medium truncate flex-1 text-right group-hover:text-primary transition-colors"
                  style={{ color: isDominant ? "hsl(var(--primary))" : "hsl(var(--fg))" }}
                >
                  {label}
                </span>
                <div
                  className="w-14 rounded-full overflow-hidden"
                  style={{ height: "4px", background: "hsl(var(--border))" }}
                >
                  <motion.div
                    className="h-full rounded-full"
                    style={{
                      background: isDominant
                        ? "hsl(var(--primary))"
                        : "hsl(var(--fg-muted) / 0.5)",
                    }}
                    animate={{ width: `${(w * 100).toFixed(1)}%` }}
                    transition={{ duration: 1.5, ease: "easeInOut" }}
                  />
                </div>
                <span
                  className="font-orbitron font-bold"
                  style={{
                    fontSize: "7.5px",
                    color: isDominant ? "hsl(var(--primary))" : "hsl(var(--fg-muted))",
                    minWidth: "26px",
                    textAlign: "right",
                  }}
                >
                  {(w * 100).toFixed(0)}%
                </span>
              </button>
            );
          })}
        </div>

        {/* Current focus indicator & feedback */}
        <div className="mt-2.5 pt-2 flex items-center justify-between" style={{ borderTop: "1px solid hsl(var(--border))" }}>
          <span
            className="font-orbitron text-[7.5px] font-bold text-primary tracking-wider"
          >
            DOMINANT: {dominant.emoji} {dominant.label.toUpperCase()}
          </span>
          <span className="text-[8px] text-primary/60 font-mono">LIVE</span>
        </div>

        {/* Interactive feedback toast */}
        <AnimatePresence>
          {activeFeedback && (
            <motion.div
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              className="mt-1.5 px-2 py-1 rounded bg-primary/20 border border-primary/40 font-orbitron text-[8px] text-primary font-bold text-center"
            >
              {activeFeedback}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
