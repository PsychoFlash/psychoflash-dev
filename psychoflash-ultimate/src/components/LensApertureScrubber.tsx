import { useState } from "react";
import { Aperture, Disc, Crosshair, Eye } from "lucide-react";
import { playTactileSound } from "@/utils/tactileAudio";
import { useCircadian } from "@/hooks/CircadianThemeContext";

export const F_STOPS = ["f/1.2", "f/1.4", "f/1.8", "f/2.8", "f/4.0", "f/5.6", "f/8.0", "f/11"] as const;
export type FStop = (typeof F_STOPS)[number];

export const FOCAL_LENGTHS = [
  { mm: "16mm", label: "Ultra Wide", scale: 1.0 },
  { mm: "24mm", label: "Gimbal", scale: 1.05 },
  { mm: "35mm", label: "Cine Doc", scale: 1.12 },
  { mm: "50mm", label: "Prime", scale: 1.20 },
  { mm: "85mm", label: "Telephoto", scale: 1.32 },
];

interface LensApertureScrubberProps {
  currentFStop?: FStop;
  onFStopChange?: (fstop: FStop) => void;
  currentFocal?: string;
  onFocalChange?: (focal: string, scale: number) => void;
}

/**
 * LensApertureScrubber — Inspired by Apple Vision Pro & Leica Optical Mechanics
 * 
 * Provides tactile, authentic optical controls:
 * - Interactive f-stop ring with metallic detent clicks
 * - Focal length presets adjusting camera FOV & parallax
 */
export default function LensApertureScrubber({
  currentFStop = "f/1.8",
  onFStopChange,
  currentFocal = "35mm",
  onFocalChange,
}: LensApertureScrubberProps) {
  const [selectedFStop, setSelectedFStop] = useState<FStop>(currentFStop);
  const [selectedFocal, setSelectedFocal] = useState(currentFocal);
  const { isEffectiveLight } = useCircadian();

  const handleSelectFStop = (f: FStop) => {
    setSelectedFStop(f);
    playTactileSound("fstop");
    onFStopChange?.(f);

    // Broadcast event for global blur & aperture sync
    window.dispatchEvent(new CustomEvent("pf-lens-fstop-change", { detail: { fstop: f } }));
  };

  const handleSelectFocal = (focal: (typeof FOCAL_LENGTHS)[number]) => {
    setSelectedFocal(focal.mm);
    playTactileSound("switch");
    onFocalChange?.(focal.mm, focal.scale);

    window.dispatchEvent(new CustomEvent("pf-lens-focal-change", { detail: { focal: focal.mm, scale: focal.scale } }));
  };

  return (
    <div
      data-cursor="aperture"
      className="flex flex-col gap-2 p-3 rounded-2xl border backdrop-blur-xl select-none"
      style={{
        background: isEffectiveLight ? "rgba(255, 255, 255, 0.85)" : "rgba(18, 5, 9, 0.85)",
        borderColor: isEffectiveLight ? "rgba(160, 109, 12, 0.35)" : "rgba(199, 154, 42, 0.35)",
        boxShadow: isEffectiveLight
          ? "0 6px 24px rgba(160, 109, 12, 0.08)"
          : "0 6px 28px rgba(0, 0, 0, 0.6)",
      }}
      aria-label="בקרת צמצם ואורך מוקד אופטי"
    >
      {/* Header & Telemetry */}
      <div className="flex items-center justify-between font-orbitron text-[10px] text-foreground-muted">
        <span className="flex items-center gap-1.5 text-primary font-bold">
          <Aperture size={13} className="text-primary animate-spin" style={{ animationDuration: "20s" }} />
          LENS APERTURE RING
        </span>
        <span className="tabular-nums font-mono text-primary font-black">{selectedFStop} · {selectedFocal}</span>
      </div>

      {/* Optical f-stop Notches Ring */}
      <div className="flex items-center justify-between gap-1 overflow-x-auto py-1">
        {F_STOPS.map((f) => {
          const isActive = selectedFStop === f;
          return (
            <button
              key={f}
              onClick={() => handleSelectFStop(f)}
              className="flex-1 min-w-[34px] py-1 px-1 rounded-lg border text-center transition-all active:scale-95 flex flex-col items-center gap-0.5"
              style={{
                background: isActive ? "hsl(var(--primary) / 0.18)" : "transparent",
                borderColor: isActive ? "hsl(var(--primary))" : "hsl(var(--border) / 0.6)",
                color: isActive ? "hsl(var(--primary))" : "hsl(var(--fg-muted))",
              }}
              title={`כוונן צמצם אופטי ל-${f}`}
            >
              <div
                className="w-1 h-1 rounded-full transition-transform"
                style={{
                  background: isActive ? "hsl(var(--primary))" : "currentColor",
                  transform: isActive ? "scale(1.5)" : "scale(1)",
                }}
              />
              <span className="font-orbitron text-[9px] font-bold tracking-tight">{f}</span>
            </button>
          );
        })}
      </div>

      {/* Focal Length Presets */}
      <div className="flex items-center gap-1.5 pt-1 border-t border-border/40">
        <span className="font-orbitron text-[8px] uppercase tracking-wider text-foreground-muted shrink-0">
          FOV:
        </span>
        <div className="flex items-center gap-1 flex-1 overflow-x-auto">
          {FOCAL_LENGTHS.map((focal) => {
            const isActive = selectedFocal === focal.mm;
            return (
              <button
                key={focal.mm}
                onClick={() => handleSelectFocal(focal)}
                className="px-2 py-0.5 rounded border text-[9px] font-orbitron transition-all whitespace-nowrap"
                style={{
                  background: isActive ? "hsl(var(--primary) / 0.16)" : "transparent",
                  borderColor: isActive ? "hsl(var(--primary))" : "hsl(var(--border) / 0.4)",
                  color: isActive ? "hsl(var(--primary))" : "hsl(var(--fg-muted))",
                  fontWeight: isActive ? "bold" : "normal",
                }}
              >
                {focal.mm}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
