/**
 * NeuralSection — Smart Section Wrapper
 *
 * Wraps any content section and:
 * - Registers with IntersectionObserver to report focus to NeuroMind
 * - Animates a synaptic border glow when in focus
 * - Renders the content with reveal animation
 * - Shows section ID in neural notation
 */

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useNeuro } from "@/hooks/NeuroContext";

interface NeuralSectionProps {
  id: string;
  children: React.ReactNode;
  className?: string;
}

export default function NeuralSection({ id, children, className = "" }: NeuralSectionProps) {
  const { state, observeSection } = useNeuro();
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    return observeSection(ref.current, id);
  }, [id, observeSection]);

  const isFocused = state.focusedSection === id;
  const glow = state.glowIntensity;

  return (
    <motion.section
      ref={ref}
      id={id}
      className={`relative ${className}`}
      layout
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6 }}
    >
      {/* Synaptic section indicator */}
      <motion.div
        className="absolute -left-2 top-8 pointer-events-none hidden md:flex flex-col items-center gap-1"
        animate={{ opacity: isFocused ? 0.8 : 0.15 }}
        transition={{ duration: 0.4 }}
      >
        {/* Vertical pulse line */}
        <motion.div
          className="w-px rounded-full"
          style={{ background: "hsl(var(--primary))" }}
          animate={{ height: isFocused ? "60px" : "20px" }}
          transition={{ duration: 0.5 }}
        />
        <span
          className="font-orbitron"
          style={{
            fontSize: "6px",
            letterSpacing: "2px",
            color: "hsl(var(--primary))",
            writingMode: "vertical-rl",
            textOrientation: "mixed",
            transform: "rotate(180deg)",
            textTransform: "uppercase",
          }}
        >
          {id.replace("#", "")}
        </span>
      </motion.div>

      {/* Focus border glow */}
      {isFocused && (
        <motion.div
          className="absolute inset-0 pointer-events-none rounded-2xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{
            boxShadow: `inset 0 0 ${40 + glow * 60}px hsl(var(--primary) / ${0.03 + glow * 0.05})`,
            border: `1px solid hsl(var(--primary) / ${0.05 + glow * 0.08})`,
          }}
        />
      )}

      {children}
    </motion.section>
  );
}
