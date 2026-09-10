/**
 * AdaptiveText — Persona Mutation Component
 *
 * Renders different text based on the user's behavioral profile.
 * Crossfades smoothly between persona layers.
 * Used for headlines, CTAs, service descriptions.
 */

import { motion, AnimatePresence } from "framer-motion";
import { useNeuro } from "@/hooks/NeuroContext";
import type { NeuroProfile } from "@/hooks/useNeuroMind";

interface PersonaText {
  unknown?: string;
  broadcast?: string;
  hitech?: string;
  events?: string;
  creative?: string;
}

interface AdaptiveTextProps {
  text: PersonaText;
  className?: string;
  style?: React.CSSProperties;
  as?: "p" | "h1" | "h2" | "h3" | "span" | "div";
}

export default function AdaptiveText({
  text,
  className = "",
  style,
  as: Tag = "span",
}: AdaptiveTextProps) {
  const { state } = useNeuro();
  const profile: NeuroProfile = state.profile;

  // Pick text: use profile-specific if available, else fall back to unknown
  const resolved = text[profile] ?? text.unknown ?? Object.values(text)[0] ?? "";

  return (
    <AnimatePresence mode="wait">
      <motion.span
        key={resolved}
        initial={{ opacity: 0, y: 4, filter: "blur(4px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        exit={{ opacity: 0, y: -4, filter: "blur(4px)" }}
        transition={{ duration: 0.45, ease: [0.23, 1, 0.32, 1] }}
        className={className}
        style={style}
      >
        {resolved}
      </motion.span>
    </AnimatePresence>
  );
}
