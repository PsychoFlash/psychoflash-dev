/**
 * AdaptiveLayout — Adaptive Section Reordering
 *
 * Orders sections by relevance to the user's behavioral profile.
 * Animations are smooth (Framer Motion layout) so reordering is
 * natural and never jarring.
 */

import { Suspense, lazy, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNeuro } from "@/hooks/NeuroContext";
import NeuralSection from "@/components/NeuralSection";

const PortfolioSection    = lazy(() => import("@/components/PortfolioSection"));
const ProductionCirclesSection = lazy(() => import("@/components/ProductionCirclesSection"));
const AboutSection        = lazy(() => import("@/components/AboutSection"));
const ContactSection      = lazy(() => import("@/components/ContactSection"));

function SectionLoader() {
  return (
    <div className="flex items-center justify-center py-24">
      <div
        className="w-8 h-8 border-2 rounded-full animate-spin"
        style={{ borderColor: "hsl(var(--primary) / 0.2)", borderTopColor: "hsl(var(--primary))" }}
      />
    </div>
  );
}

const SECTIONS = [
  { id: "portfolio", component: PortfolioSection, profiles: ["hitech", "creative", "broadcast", "events"] },
  { id: "synergy", component: ProductionCirclesSection, profiles: ["broadcast", "events", "hitech", "creative"] },
  { id: "about", component: AboutSection, profiles: ["broadcast", "events", "hitech", "creative"] },
  { id: "contact", component: ContactSection, profiles: ["unknown", "broadcast", "events", "hitech", "creative"] },
];

export default function AdaptiveLayout() {
  const { state } = useNeuro();

  const orderedSections = useMemo(() => {
    const profile = state.profile;
    return [...SECTIONS].sort((a, b) => {
      const aRelevant = a.profiles.includes(profile) ? -1 : 0;
      const bRelevant = b.profiles.includes(profile) ? -1 : 0;
      return aRelevant - bRelevant;
    });
  }, [state.profile]);

  return (
    <AnimatePresence>
      {orderedSections.map(({ id, component: Section }, i) => (
        <motion.div
          key={id}
          layout
          transition={{
            layout: { duration: 0.8, ease: [0.23, 1, 0.32, 1] },
          }}
        >
          {i > 0 && (
            <div className="neon-divider" />
          )}
          <NeuralSection id={id}>
            <Suspense fallback={<SectionLoader />}>
              <Section />
            </Suspense>
          </NeuralSection>
        </motion.div>
      ))}
    </AnimatePresence>
  );
}
