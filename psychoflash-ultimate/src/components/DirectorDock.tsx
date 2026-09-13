import { useState, useEffect } from "react";
import { Camera, Film, Monitor, Volume2, VolumeX, ShieldCheck, ChevronUp, ChevronDown, Sliders, Aperture } from "lucide-react";
import { playTactileSound, tactileAudio } from "@/utils/tactileAudio";
import { useCircadian } from "@/hooks/CircadianThemeContext";

/**
 * DirectorDock — Floating Broadcast Director's Quick-Control Dock
 * 
 * Inspired by Locomotive, Active Theory, and Apple Pro apps.
 * Provides instant control over:
 * - 📸 Shutter Snapshot (Space)
 * - 🎬 Anamorphic 2.39:1 Cinema Mode (C)
 * - 📺 Vintage CRT Broadcast Scanlines
 * - 🔊 Tactile Audio Engine with VU Meter (M)
 * - 🛡️ Rock-Solid Restore Point Status
 */
export default function DirectorDock() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isCinemaMode, setIsCinemaMode] = useState(false);
  const [isCrtMode, setIsCrtMode] = useState(false);
  const [isAudioMuted, setIsAudioMuted] = useState(false);
  const [flashActive, setFlashActive] = useState(false);
  const [vuLevel, setVuLevel] = useState(65);
  const { isEffectiveLight } = useCircadian();

  // Simulated live broadcast VU meter
  useEffect(() => {
    const interval = setInterval(() => {
      setVuLevel(Math.floor(45 + Math.random() * 50));
    }, 180);
    return () => clearInterval(interval);
  }, []);

  // Toggle Cinema Anamorphic Mode
  const toggleCinemaMode = () => {
    playTactileSound("switch");
    const next = !isCinemaMode;
    setIsCinemaMode(next);
    if (next) {
      document.documentElement.classList.add("cinema-mode");
    } else {
      document.documentElement.classList.remove("cinema-mode");
    }
  };

  // Toggle CRT Monitor Mode
  const toggleCrtMode = () => {
    playTactileSound("switch");
    const next = !isCrtMode;
    setIsCrtMode(next);
    if (next) {
      document.documentElement.classList.add("crt-mode");
    } else {
      document.documentElement.classList.remove("crt-mode");
    }
  };

  // Toggle Audio Engine
  const toggleAudio = () => {
    const next = !isAudioMuted;
    setIsAudioMuted(next);
    tactileAudio.setMuted(next);
    if (!next) {
      playTactileSound("chime");
    }
  };

  // Shutter Snapshot
  const triggerShutter = () => {
    playTactileSound("shutter");
    setFlashActive(true);
    setTimeout(() => setFlashActive(false), 120);
  };

  // Global Keyboard Shortcuts (C for Cinema, M for Mute)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (["INPUT", "TEXTAREA", "SELECT"].includes((e.target as HTMLElement)?.tagName)) return;

      if (e.key === "c" || e.key === "C" || e.key === "ב") {
        toggleCinemaMode();
      } else if (e.key === "m" || e.key === "M" || e.key === "צ") {
        toggleAudio();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isCinemaMode, isAudioMuted]);

  return (
    <>
      {flashActive && (
        <div
          className="fixed inset-0 pointer-events-none z-[100000] bg-white transition-opacity duration-150 ease-out"
          aria-hidden="true"
        />
      )}

      {/* Floating Director Control Bar at Bottom Center */}
      <aside
        data-cursor="timecode"
        className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 flex items-center transition-all duration-300 select-none"
        aria-label="פאנל בקרי במאי מהירים"
      >
        <div
          className="flex items-center gap-1 sm:gap-2 px-2.5 sm:px-3 py-1.5 rounded-full border backdrop-blur-xl shadow-2xl transition-all max-w-[96vw] overflow-x-auto custom-scrollbar"
          style={{
            background: isEffectiveLight ? "rgba(255, 255, 255, 0.92)" : "rgba(18, 5, 9, 0.92)",
            borderColor: isEffectiveLight ? "rgba(160, 109, 12, 0.4)" : "rgba(199, 154, 42, 0.4)",
            boxShadow: isEffectiveLight
              ? "0 8px 30px rgba(0, 0, 0, 0.12), 0 0 15px rgba(160, 109, 12, 0.1)"
              : "0 8px 35px rgba(0, 0, 0, 0.7), 0 0 15px rgba(199, 154, 42, 0.15)",
          }}
        >
          {/* Restore Point Verified Indicator */}
          <div
            className="flex items-center gap-1.5 px-2 sm:px-2.5 py-1 rounded-full border text-[9px] font-orbitron font-bold tracking-wider shrink-0"
            style={{
              background: "rgba(34, 197, 94, 0.12)",
              borderColor: "rgba(34, 197, 94, 0.4)",
              color: "#22c55e",
            }}
            title="נקודת שחזור מאובטחת ומאומתת (v1.3 Restore Point)"
          >
            <ShieldCheck size={11} className="text-emerald-500 animate-pulse" />
            <span className="hidden sm:inline">V1.3 RESTORE POINT</span>
          </div>

          <div className="w-[1px] h-3.5 bg-border/50" />

          {/* Snapshot Shutter Trigger */}
          <button
            onClick={triggerShutter}
            className="flex items-center gap-1 px-2.5 py-1 rounded-full border text-[10px] font-orbitron font-semibold text-primary hover:bg-primary/10 border-primary/40 hover:border-primary transition-all active:scale-95"
            title="צילום תמונת מצב ממצלמת הבמאי (Space)"
          >
            <Camera size={12} />
            <span className="hidden md:inline">SNAP</span>
          </button>

          {/* Anamorphic 2.39:1 Cinema Mode */}
          <button
            onClick={toggleCinemaMode}
            className="flex items-center gap-1 px-2.5 py-1 rounded-full border text-[10px] font-orbitron font-semibold transition-all active:scale-95"
            style={{
              background: isCinemaMode ? "hsl(var(--primary) / 0.2)" : "transparent",
              borderColor: isCinemaMode ? "hsl(var(--primary))" : "hsl(var(--border))",
              color: isCinemaMode ? "hsl(var(--primary))" : "hsl(var(--fg))",
            }}
            title="מצב קולנוע אנמורפי 2.39:1 (קיצור: C)"
          >
            <Film size={12} />
            <span className="hidden md:inline">2.39:1</span>
          </button>

          {/* CRT Broadcast Monitor Scanlines */}
          <button
            onClick={toggleCrtMode}
            className="flex items-center gap-1 px-2.5 py-1 rounded-full border text-[10px] font-orbitron font-semibold transition-all active:scale-95"
            style={{
              background: isCrtMode ? "hsl(var(--primary) / 0.2)" : "transparent",
              borderColor: isCrtMode ? "hsl(var(--primary))" : "hsl(var(--border))",
              color: isCrtMode ? "hsl(var(--primary))" : "hsl(var(--fg))",
            }}
            title="סימולציית מוניטור שידור שפופרתי CRT"
          >
            <Monitor size={12} />
            <span className="hidden lg:inline">CRT</span>
          </button>

          <div className="w-[1px] h-3.5 bg-border/50" />

          {/* Audio Engine & Live VU Meter */}
          <button
            onClick={toggleAudio}
            className="flex items-center gap-1.5 px-2 py-1 rounded-full border border-border/60 hover:border-primary transition-all text-[10px] font-orbitron"
            title="מנוע סאונד טקטילי (קיצור: M)"
          >
            {isAudioMuted ? (
              <VolumeX size={12} className="text-foreground-muted" />
            ) : (
              <Volume2 size={12} className="text-primary" />
            )}

            {/* Micro VU Meter Bar */}
            {!isAudioMuted && (
              <div className="w-8 h-1.5 bg-border/40 rounded-full overflow-hidden flex items-center">
                <div
                  className="h-full bg-primary rounded-full transition-all duration-150"
                  style={{ width: `${vuLevel}%` }}
                />
              </div>
            )}
          </button>
        </div>
      </aside>
    </>
  );
}
