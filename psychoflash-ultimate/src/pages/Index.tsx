import { lazy, Suspense, useEffect } from "react";
import Header from "@/components/Header";
import ScrollProgress from "@/components/ScrollProgress";
import SynapticCanvas from "@/components/SynapticCanvas";
import NeuralHero from "@/components/NeuralHero";
import AdaptiveLayout from "@/components/AdaptiveLayout";
import HiveMind from "@/components/HiveMind";
import NeuroProfileIndicator from "@/components/NeuroProfileIndicator";
import ClientStrip from "@/components/ClientStrip";
import { NeuroContext } from "@/hooks/NeuroContext";
import { useNeuroMind } from "@/hooks/useNeuroMind";
import { useNeuro } from "@/hooks/NeuroContext";

const AudioCore  = lazy(() => import("@/components/AudioCore"));
const Footer     = lazy(() => import("@/components/Footer"));

// Bio-responsive CSS custom property updater
function NeuroCssDriver() {
  const { state } = useNeuro();

  useEffect(() => {
    const root = document.documentElement;
    const g = state.glowIntensity;
    const t = state.colorTemperature;

    // Drive CSS custom properties from neuro state in real-time
    // Gold primary hue shifts slightly warmer with intensity
    const primaryL = 47 + g * 8;
    const primaryS = 66 + g * 10;
    root.style.setProperty("--primary", `36 ${primaryS}% ${primaryL}%`);

    // Background gets subtly deeper with engagement
    const bgL = 4 - g * 1.5;
    root.style.setProperty("--bg", `350 55% ${Math.max(2, bgL)}%`);

    // Global glow variable (used by elements that want to react)
    root.style.setProperty("--neuro-glow", g.toFixed(3));
    root.style.setProperty("--neuro-temp", t.toFixed(3));
  }, [state.glowIntensity, state.colorTemperature]);

  return null;
}

function AppInner() {
  return (
    <div
      className="min-h-screen overflow-x-hidden relative"
      style={{ background: "hsl(var(--bg))", color: "hsl(var(--fg))" }}
    >
      {/* Layer 0: Neural mesh background */}
      <SynapticCanvas />

      {/* Layer 0.5: CSS var driver */}
      <NeuroCssDriver />

      {/* Progress bar */}
      <ScrollProgress />

      {/* Navigation */}
      <Header />

      {/* Main content */}
      <main
        id="main-content"
        className="relative z-10"
        aria-label="תוכן ראשי"
        tabIndex={-1}
      >
        {/* Hero with neural aperture */}
        <NeuralHero />

        {/* Client trust strip */}
        <Suspense fallback={null}>
          <ClientStrip />
        </Suspense>

        <div className="neon-divider" />

        {/* Adaptive sections (reorder by profile) */}
        <AdaptiveLayout />
      </main>

      {/* Footer */}
      <Suspense fallback={null}>
        <Footer />
      </Suspense>

      {/* Overlay systems */}
      {/* Neural profile indicator (top-left Easter egg) */}
      <NeuroProfileIndicator />

      {/* Hive Mind (bottom-right) */}
      <HiveMind />

      {/* Audio controller (bottom-left) */}
      <Suspense fallback={null}>
        <AudioCore />
      </Suspense>
    </div>
  );
}

export default function Index() {
  const neuroMind = useNeuroMind();

  return (
    <NeuroContext.Provider value={neuroMind}>
      <AppInner />
    </NeuroContext.Provider>
  );
}
