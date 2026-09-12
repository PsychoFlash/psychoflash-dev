import { lazy, Suspense, useEffect, useState } from "react";
import Header from "@/components/Header";
import ScrollProgress from "@/components/ScrollProgress";
import SynapticCanvas from "@/components/SynapticCanvas";
import NeuralHero from "@/components/NeuralHero";
import LiveArenaSection from "@/components/LiveArenaSection";
import ApertureVideoBackground from "@/components/ApertureVideoBackground";
import AdaptiveLayout from "@/components/AdaptiveLayout";
import HiveMind from "@/components/HiveMind";
import NeuroProfileIndicator from "@/components/NeuroProfileIndicator";
import ClientStrip from "@/components/ClientStrip";
import ShowreelModal from "@/components/ShowreelModal";
import AutopilotHUD from "@/components/AutopilotHUD";
import TactileGlobalInteractions from "@/components/TactileGlobalInteractions";
import { NeuroContext } from "@/hooks/NeuroContext";
import { useNeuroMind } from "@/hooks/useNeuroMind";
import { useNeuro } from "@/hooks/NeuroContext";
import { useCircadian } from "@/hooks/CircadianThemeContext";

const AudioCore  = lazy(() => import("@/components/AudioCore"));
const Footer     = lazy(() => import("@/components/Footer"));

// Bio-responsive CSS custom property updater
function NeuroCssDriver() {
  const { state } = useNeuro();
  const { isEffectiveLight, solarPhase } = useCircadian();

  useEffect(() => {
    const root = document.documentElement;
    const g = state.glowIntensity;
    const t = state.colorTemperature;

    if (isEffectiveLight) {
      // Light Mode: maintain elegant high contrast
      const primaryL = Math.max(34, 39 - g * 3);
      const primaryS = Math.min(90, 75 + g * 10);
      root.style.setProperty("--primary", `37 ${primaryS}% ${primaryL}%`);
    } else {
      // Dark Mode: Deep wine and gold
      const primaryL = 47 + g * 8;
      const primaryS = 66 + g * 10;
      root.style.setProperty("--primary", `36 ${primaryS}% ${primaryL}%`);

      const baseL = solarPhase.id === "deep-night" ? 2.8 : 4;
      const bgL = baseL - g * 1.5;
      root.style.setProperty("--bg", `350 55% ${Math.max(1.8, bgL)}%`);
    }

    // Global glow variable (used by elements that want to react)
    root.style.setProperty("--neuro-glow", g.toFixed(3));
    root.style.setProperty("--neuro-temp", t.toFixed(3));
  }, [state.glowIntensity, state.colorTemperature, isEffectiveLight, solarPhase]);

  return null;
}

function AppInner() {
  const [showreelOpen, setShowreelOpen] = useState(false);

  return (
    <div
      className="min-h-screen overflow-x-hidden relative"
      style={{ background: "hsl(var(--bg))", color: "hsl(var(--fg))" }}
    >
      {/* Tactile interaction engine: instant particles, shockwaves & synthesized audio for every click */}
      <TactileGlobalInteractions />

      {/* Layer 0: Global Cinematic Video Aperture & INNOBIZ Downward Sonar Radar (runs behind whole site!) */}
      <ApertureVideoBackground
        onOpenShowreel={() => setShowreelOpen(true)}
      />

      {/* Layer 0.2: Neural mesh background */}
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
        {/* Hero with cinematic aperture video background */}
        <NeuralHero
          onOpenShowreel={() => setShowreelOpen(true)}
        />

        {/* זירת ההפקה והחיפוש המרכזית — הדבר הראשון שרואים מיד אחרי הלוגו */}
        <LiveArenaSection />

        {/* Client trust strip */}
        <Suspense fallback={null}>
          <ClientStrip />
        </Suspense>

        <div className="neon-divider" />

        {/* Adaptive sections (Portfolio -> Production Circles -> About -> Contact) */}
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

      {/* Ambient Collective AI Learner HUD ("מוטמע בדרך אגב", ללא גלילה כפויה) */}
      <AutopilotHUD />

      {/* 4K Showreel Master Modal */}
      <ShowreelModal
        isOpen={showreelOpen}
        onClose={() => setShowreelOpen(false)}
      />
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
