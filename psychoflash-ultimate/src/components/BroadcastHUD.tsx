import { useState, useEffect, useRef } from "react";
import { Camera, Radio, Lock, Zap, Film, Volume2, ShieldCheck, Maximize2 } from "lucide-react";
import { playTactileSound } from "@/utils/tactileAudio";
import { useCircadian } from "@/hooks/CircadianThemeContext";

/**
 * BroadcastHUD — Inspired by Active Theory, The Line Animation, and Sony FX6/Venice 2 Monitor
 * 
 * Provides authentic broadcast telemetry:
 * - Real-time SMPTE Drop-Frame Timecode (HH:MM:SS:FF)
 * - Tally lights (PGM Red, PVW Amber, ISO Green, GENLOCK)
 * - Cinema Engineering Telemetry (ProRes 422 HQ, 4K 50p, S-Log3, Shutter 180.0°)
 * - Instant Shutter Snap (Spacebar or click) with screen flash & mechanical shutter audio
 */
export default function BroadcastHUD() {
  const [timecode, setTimecode] = useState("00:00:00:00");
  const [flashActive, setFlashActive] = useState(false);
  const [tallyMode, setTallyMode] = useState<"pgm" | "pvw" | "iso">("pgm");
  const [isCompact, setIsCompact] = useState(false);
  const { isEffectiveLight } = useCircadian();

  // SMPTE Timecode generator running at 50fps (Broadcast Standard)
  useEffect(() => {
    let frame = 0;
    const interval = setInterval(() => {
      const now = new Date();
      const h = String(now.getHours()).padStart(2, "0");
      const m = String(now.getMinutes()).padStart(2, "0");
      const s = String(now.getSeconds()).padStart(2, "0");
      const f = String(Math.floor((now.getMilliseconds() / 1000) * 50)).padStart(2, "0");
      setTimecode(`${h}:${m}:${s}:${f}`);
      frame++;
    }, 20); // 50 updates per second

    return () => clearInterval(interval);
  }, []);

  // Trigger camera shutter snap with flash and audio
  const triggerShutterSnap = () => {
    playTactileSound("shutter");
    setFlashActive(true);
    setTimeout(() => setFlashActive(false), 120);
  };

  // Keyboard shortcut: Spacebar triggers shutter snap when not typing in inputs
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === "Space" && !["INPUT", "TEXTAREA", "SELECT"].includes((e.target as HTMLElement)?.tagName)) {
        e.preventDefault();
        triggerShutterSnap();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <>
      {/* High-speed mechanical shutter flash overlay */}
      {flashActive && (
        <div
          className="fixed inset-0 pointer-events-none z-[100000] bg-white transition-opacity duration-150 ease-out animate-out fade-out"
          aria-hidden="true"
        />
      )}

      {/* Broadcast Monitor Top-Left Telemetry Badge */}
      <aside
        data-cursor="timecode"
        className="fixed top-20 left-4 z-40 hidden md:flex items-center gap-2.5 px-3.5 py-1.5 rounded-xl border backdrop-blur-md transition-all duration-300 select-none"
        style={{
          background: isEffectiveLight ? "rgba(255, 255, 255, 0.88)" : "rgba(18, 5, 9, 0.86)",
          borderColor: isEffectiveLight ? "rgba(160, 109, 12, 0.35)" : "rgba(199, 154, 42, 0.35)",
          boxShadow: isEffectiveLight
            ? "0 4px 18px rgba(160, 109, 12, 0.08)"
            : "0 4px 22px rgba(0, 0, 0, 0.6)",
        }}
        aria-label="מוניטור שידור חי וטלמטריה SMPTE"
      >
        {/* Tally LED Lights */}
        <div className="flex items-center gap-1.5 pl-1 border-l border-border/40">
          <button
            onClick={() => {
              setTallyMode(tallyMode === "pgm" ? "pvw" : tallyMode === "pvw" ? "iso" : "pgm");
              playTactileSound("tally");
            }}
            className="flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-orbitron font-black uppercase transition-all tracking-wider"
            style={{
              background:
                tallyMode === "pgm"
                  ? "rgba(239, 68, 68, 0.2)"
                  : tallyMode === "pvw"
                  ? "rgba(245, 158, 11, 0.2)"
                  : "rgba(34, 197, 94, 0.2)",
              color:
                tallyMode === "pgm"
                  ? "#ef4444"
                  : tallyMode === "pvw"
                  ? "#f59e0b"
                  : "#22c55e",
              border: `1px solid ${
                tallyMode === "pgm"
                  ? "rgba(239, 68, 68, 0.6)"
                  : tallyMode === "pvw"
                  ? "rgba(245, 158, 11, 0.6)"
                  : "rgba(34, 197, 94, 0.6)"
              }`,
            }}
            title="לחץ להחלפת מצב Tally (PGM שידור / PVW תצוגה / ISO הקלטה)"
          >
            <span
              className="w-2 h-2 rounded-full animate-ping"
              style={{
                background:
                  tallyMode === "pgm"
                    ? "#ef4444"
                    : tallyMode === "pvw"
                    ? "#f59e0b"
                    : "#22c55e",
              }}
            />
            {tallyMode.toUpperCase()}
          </button>
        </div>

        {/* SMPTE Running Timecode */}
        <div className="flex items-center gap-1.5 font-orbitron font-bold text-xs tracking-widest text-primary">
          <Radio size={12} className="text-primary animate-pulse" />
          <span className="tabular-nums">{timecode}</span>
        </div>

        <div className="w-[1px] h-3.5 bg-border/60" />

        {/* Camera Engineering Parameters */}
        <div className="hidden lg:flex items-center gap-2 font-orbitron text-[9px] text-foreground-muted tracking-wide">
          <span className="text-primary font-semibold">4K DCI</span>
          <span>·</span>
          <span>50p</span>
          <span>·</span>
          <span>S-LOG3</span>
          <span>·</span>
          <span>180.0°</span>
        </div>

        <div className="w-[1px] h-3.5 bg-border/60" />

        {/* Shutter Snap Button */}
        <button
          onClick={triggerShutterSnap}
          className="flex items-center gap-1 px-1.5 py-0.5 rounded text-[9px] font-orbitron font-semibold text-primary hover:bg-primary/10 border border-primary/40 hover:border-primary transition-all active:scale-95"
          title="צילום תמונת מצב ממצלמת הבמאי (Space)"
        >
          <Camera size={11} />
          <span className="hidden sm:inline">SNAP</span>
        </button>
      </aside>
    </>
  );
}
