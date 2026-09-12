/**
 * NeuroProfileIndicator — Personal neural fingerprint & Broadcast Node Switcher
 *
 * Shows the user's detected profile in real-time as a top-left telemetry HUD.
 * Fully interactive: clicking it toggles production nodes (Broadcast, AI, Arena, Cinema)
 * and dispatches portfolio filters and sound feedback.
 */

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNeuro } from "@/hooks/NeuroContext";
import { Radio, RefreshCw } from "lucide-react";

const PROFILE_DATA = {
  broadcast: { label: "BROADCAST NODE", labelHe: "שידור חי ולוויין", color: "hsl(190, 80%, 50%)", icon: "📡", cat: "BROADCAST" },
  hitech: { label: "AI PIPELINE", labelHe: "הפקת AI אוטונומית", color: "hsl(270, 80%, 65%)", icon: "🧬", cat: "CINEMA" },
  events: { label: "EVENT MATRIX", labelHe: "מגה-ארנות ואירועים", color: "hsl(36, 80%, 55%)", icon: "⚡", cat: "LIVE" },
  creative: { label: "CREATIVE CORE", labelHe: "קולנוע ומאסטר 4K", color: "hsl(320, 70%, 60%)", icon: "🎬", cat: "CINEMA" },
  unknown: { label: "CALIBRATING...", labelHe: "כיול טלמטריה...", color: "hsl(var(--fg-muted))", icon: "◎", cat: "ALL" },
};

const PROFILES_ORDER: Array<keyof typeof PROFILE_DATA> = ["broadcast", "hitech", "events", "creative"];

export default function NeuroProfileIndicator() {
  const { state, boostProfile } = useNeuro();
  const [clickNotice, setClickNotice] = useState<string | null>(null);

  const pData = PROFILE_DATA[state.profile] || PROFILE_DATA.broadcast;
  const topWeight = Math.max(...Object.values(state.weights)) * 100;
  const isCalibrating = state.profile === "unknown" && state.sessionAge < 5000;

  const cycleNextProfile = () => {
    const currentIdx = PROFILES_ORDER.indexOf(state.profile as keyof typeof PROFILE_DATA);
    const nextKey = PROFILES_ORDER[(currentIdx + 1) % PROFILES_ORDER.length];
    boostProfile(nextKey, 0.4);

    const nextData = PROFILE_DATA[nextKey];
    setClickNotice(`${nextData.icon} ${nextData.labelHe}`);
    setTimeout(() => setClickNotice(null), 2000);

    // Broadcast filter event
    window.dispatchEvent(
      new CustomEvent("pf-filter-portfolio", { detail: { category: nextData.cat } })
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -12 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1.5, duration: 0.8 }}
      className="fixed top-24 left-4 z-40 pointer-events-auto hidden md:block"
    >
      <div
        onClick={cycleNextProfile}
        className="flex flex-col gap-1 rounded-xl px-3.5 py-2.5 border shadow-xl cursor-pointer transition-all duration-300 hover:border-primary/80 hover:scale-[1.03] group"
        style={{
          background: "hsl(var(--bg-card) / 0.85)",
          borderColor: "hsl(var(--border))",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          minWidth: "155px",
        }}
        title="לחץ להחלפת פרופיל טלמטריה וסינון פרויקטים"
      >
        {/* Label */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span style={{ fontSize: "11px" }}>{pData.icon}</span>
            <AnimatePresence mode="wait">
              <motion.span
                key={state.profile}
                initial={{ opacity: 0, y: -2 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 2 }}
                className="font-orbitron font-bold"
                style={{
                  fontSize: "7.5px",
                  letterSpacing: "1.5px",
                  color: pData.color,
                  textTransform: "uppercase",
                }}
              >
                {pData.label}
              </motion.span>
            </AnimatePresence>
          </div>
          <RefreshCw size={8} className="text-foreground-muted opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>

        {/* Weight bars */}
        <div className="flex gap-1 mt-1">
          {Object.entries(state.weights).map(([key, w]) => (
            <div
              key={key}
              onClick={(e) => {
                e.stopPropagation();
                boostProfile(key as any, 0.4);
                const info = PROFILE_DATA[key as keyof typeof PROFILE_DATA];
                if (info) {
                  setClickNotice(`${info.icon} ${info.labelHe}`);
                  setTimeout(() => setClickNotice(null), 2000);
                  window.dispatchEvent(
                    new CustomEvent("pf-filter-portfolio", { detail: { category: info.cat } })
                  );
                }
              }}
              className="flex-1 rounded-full overflow-hidden hover:opacity-100 transition-all cursor-pointer"
              style={{
                height: "3.5px",
                background: "hsl(var(--border))",
              }}
              title={`לחץ לבחירת ${PROFILE_DATA[key as keyof typeof PROFILE_DATA]?.labelHe}`}
            >
              <motion.div
                className="h-full rounded-full"
                style={{
                  background: PROFILE_DATA[key as keyof typeof PROFILE_DATA]?.color ?? "white",
                  opacity: 0.8,
                }}
                animate={{ width: `${(w * 100).toFixed(1)}%` }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              />
            </div>
          ))}
        </div>

        {/* Confidence & Click Prompt */}
        <div className="flex items-center justify-between mt-0.5">
          {!isCalibrating ? (
            <span
              className="font-orbitron text-[6.5px] font-semibold"
              style={{ color: "hsl(var(--fg-muted))", opacity: 0.7 }}
            >
              CONF: {topWeight.toFixed(0)}%
            </span>
          ) : (
            <span
              className="font-orbitron text-[6.5px]"
              style={{ color: "hsl(var(--fg-muted))", opacity: 0.6 }}
            >
              LEARNING...
            </span>
          )}
          <span className="font-orbitron text-[6px] text-primary/70 group-hover:text-primary transition-colors">
            TAP TO SWITCH
          </span>
        </div>

        {/* Dynamic Toast Notice */}
        <AnimatePresence>
          {clickNotice && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="font-orbitron text-[7.5px] text-primary font-bold text-center pt-1 border-t border-border/40 truncate"
            >
              {clickNotice}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
