/**
 * AdaptiveLayout — Adaptive Section Reordering
 *
 * Orders sections by relevance to the user's behavioral profile.
 * Animations are smooth (Framer Motion layout) so reordering is
 * natural and never jarring.
 *
 * Default order: services → portfolio → pricing → contact
 * Profile overrides:
 * - broadcast → services first (with broadcast terms in focus)
 * - hitech → portfolio first (show AI/tech work)
 * - events → pricing first (event budgets = key concern)
 * - creative → portfolio first (visual work)
 */

import { Suspense, lazy, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNeuro } from "@/hooks/NeuroContext";
import NeuralSection from "@/components/NeuralSection";

const ServicesSection  = lazy(() => import("@/components/ServicesSection"));
const PortfolioSection = lazy(() => import("@/components/PortfolioSection"));
const PricingSection   = lazy(() => import("@/components/PricingSection"));
const ContactSection   = lazy(() => import("@/components/ContactSection"));

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
  { id: "services", component: ServicesSection, profiles: ["broadcast", "creative"] },
  { id: "portfolio", component: PortfolioSection, profiles: ["hitech", "creative", "events"] },
  { id: "pricing", component: PricingSection, profiles: ["events", "broadcast"] },
  { id: "contact", component: ContactSection, profiles: ["unknown"] },
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
