import { createContext, useContext } from "react";
import type { NeuroState } from "@/hooks/useNeuroMind";
import type { NeuroProfile } from "@/hooks/useNeuroMind";

interface NeuroContextValue {
  state: NeuroState;
  boostProfile: (profile: NeuroProfile, amount?: number) => void;
  observeSection: (el: Element, sectionId: string) => () => void;
}

const DEFAULT_STATE: NeuroState = {
  weights: { broadcast: 0.25, hitech: 0.25, events: 0.25, creative: 0.25 },
  profile: "unknown",
  signals: {
    mouseVelocity: 0,
    scrollIntensity: 0,
    engagementDepth: 0,
    sessionProgress: 0,
    interactionCount: 0,
  },
  colorTemperature: 0,
  glowIntensity: 0,
  focusedSection: null,
  sessionAge: 0,
};

export const NeuroContext = createContext<NeuroContextValue>({
  state: DEFAULT_STATE,
  boostProfile: () => {},
  observeSection: () => () => {},
});

export function useNeuro() {
  return useContext(NeuroContext);
}
