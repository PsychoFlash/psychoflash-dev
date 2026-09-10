/**
 * AudioCore — Sound Controller UI
 * Minimal, elegant mute/unmute toggle with audio visualization bars.
 */

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useWebAudio } from "@/hooks/useWebAudio";
import { useNeuro } from "@/hooks/NeuroContext";

export default function AudioCore() {
  const [audioEnabled, setAudioEnabled] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const { state } = useNeuro();
  const audio = useWebAudio(audioEnabled);
  const glowRef = useRef(0);

  // Drive drone intensity from neuro state
  useEffect(() => {
    if (!audioEnabled) return;
    audio.setDroneIntensity(state.glowIntensity);
  }, [state.glowIntensity, audio, audioEnabled]);

  // Fire a pulse sound when the synaptic glow spikes
  useEffect(() => {
    if (!audioEnabled) return;
    if (state.glowIntensity > glowRef.current + 0.15) {
      audio.playPulse();
    }
    glowRef.current = state.glowIntensity;
  }, [state.glowIntensity, audio, audioEnabled]);

  const toggle = () => {
    const next = !audioEnabled;
    setAudioEnabled(next);
    setHasInteracted(true);
    if (next) {
      audio.resume();
    }
  };

  // Visualization bars (5 bars, animated by glow + time)
  const barCount = 5;

  return (
    <motion.div
      className="fixed bottom-6 left-6 z-50 flex items-center gap-3 cursor-pointer select-none"
      onClick={toggle}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      title={audioEnabled ? "Mute ambient" : "Enable ambient audio"}
    >
      {/* Visualization bars */}
      <div className="flex items-end gap-0.5 h-5">
        {Array.from({ length: barCount }).map((_, i) => (
          <motion.div
            key={i}
            className="w-0.5 rounded-full"
            style={{ background: "hsl(var(--primary))" }}
            animate={
              audioEnabled
                ? {
                    height: [
                      `${8 + (i * 3) % 9}px`,
                      `${4 + (i * 7 + 5) % 14}px`,
                      `${10 + (i * 4) % 8}px`,
                    ],
                    opacity: 0.4 + state.glowIntensity * 0.5,
                  }
                : { height: "3px", opacity: 0.2 }
            }
            transition={{
              duration: 0.5 + i * 0.08,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Label */}
      <AnimatePresence>
        {!hasInteracted && (
          <motion.span
            initial={{ opacity: 0, x: -4 }}
            animate={{ opacity: 0.45, x: 0 }}
            exit={{ opacity: 0 }}
            className="font-orbitron"
            style={{
              fontSize: "7px",
              letterSpacing: "2px",
              color: "hsl(var(--fg-muted))",
              textTransform: "uppercase",
            }}
          >
            {audioEnabled ? "AMBIENT ON" : "ENABLE AUDIO"}
          </motion.span>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
