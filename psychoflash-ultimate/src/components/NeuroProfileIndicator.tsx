/**
 * NeuroProfileIndicator — Personal neural fingerprint display
 *
 * Shows the user's detected profile in real-time as a subtle
 * top-left indicator that evolves as they interact.
 * Designed to be noticed as a delightful Easter egg.
 */

import { motion, AnimatePresence } from "framer-motion";
import { useNeuro } from "@/hooks/NeuroContext";

const PROFILE_DATA = {
  broadcast: { label: "BROADCAST NODE", color: "hsl(190, 80%, 50%)", icon: "📡" },
  hitech: { label: "AI PIPELINE", color: "hsl(270, 80%, 65%)", icon: "🧬" },
  events: { label: "EVENT MATRIX", color: "hsl(36, 80%, 55%)", icon: "⚡" },
  creative: { label: "CREATIVE CORE", color: "hsl(320, 70%, 60%)", icon: "🎬" },
  unknown: { label: "CALIBRATING...", color: "hsl(var(--fg-muted))", icon: "◎" },
};

export default function NeuroProfileIndicator() {
  const { state } = useNeuro();
  const pData = PROFILE_DATA[state.profile];
  const topWeight = Math.max(...Object.values(state.weights)) * 100;
  const isCalibrating = state.profile === "unknown" && state.sessionAge < 5000;

  return (
    <motion.div
      initial={{ opacity: 0, x: -12 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 3, duration: 1 }}
      className="fixed top-24 left-4 z-40 pointer-events-none hidden md:block"
    >
      <div
        className="flex flex-col gap-1 rounded-lg px-3 py-2"
        style={{
          background: "hsl(var(--bg-card) / 0.7)",
          border: "1px solid hsl(var(--border))",
          backdropFilter: "blur(8px)",
          minWidth: "140px",
        }}
      >
        {/* Label */}
        <div className="flex items-center gap-1.5">
          <span style={{ fontSize: "9px" }}>{pData.icon}</span>
          <AnimatePresence mode="wait">
            <motion.span
              key={state.profile}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="font-orbitron"
              style={{
                fontSize: "6.5px",
                letterSpacing: "1.5px",
                color: pData.color,
                textTransform: "uppercase",
              }}
            >
              {pData.label}
            </motion.span>
          </AnimatePresence>
        </div>

        {/* Weight bars */}
        <div className="flex gap-0.5 mt-1">
          {Object.entries(state.weights).map(([key, w]) => (
            <motion.div
              key={key}
              className="rounded-full"
              style={{
                height: "3px",
                background: PROFILE_DATA[key as keyof typeof PROFILE_DATA]?.color ?? "white",
                opacity: 0.6,
              }}
              animate={{ width: `${(w * 100).toFixed(1)}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
            />
          ))}
        </div>

        {/* Confidence */}
        {!isCalibrating && (
          <span
            className="font-orbitron mt-0.5"
            style={{ fontSize: "6px", color: "hsl(var(--fg-muted))", opacity: 0.45 }}
          >
            CONF: {topWeight.toFixed(0)}%
          </span>
        )}
        {isCalibrating && (
          <span
            className="font-orbitron mt-0.5"
            style={{ fontSize: "6px", color: "hsl(var(--fg-muted))", opacity: 0.35 }}
          >
            LEARNING...
          </span>
        )}
      </div>
    </motion.div>
  );
}
