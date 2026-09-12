import { useEffect, useState, useRef } from "react";
import { playTactileSound } from "@/utils/tactileAudio";

/**
 * CustomCinemaCursor — Inspired by Lusion & Aristide Benoist
 * 
 * - Smooth lerp (linear interpolation) inertia tracking via requestAnimationFrame
 * - Optical lens aperture reticle with precision 4-axis crosshairs
 * - Dynamic context morphing:
 *   - Video / Cards -> "PLAY 4K"
 *   - Mister Horse Badges -> "PREVIEW MH"
 *   - Lens / Aperture -> "f/STOP"
 *   - Timecode / Telemetry -> "SMPTE"
 *   - Buttons & Links -> Magnetic snap + "SELECT"
 * - Automatically hidden on touch devices (@media (pointer: coarse))
 */
export default function CustomCinemaCursor() {
  const [enabled, setEnabled] = useState(false);
  const [badgeText, setBadgeText] = useState<string | null>(null);
  const [cursorMode, setCursorMode] = useState<"default" | "hover" | "video" | "aperture" | "mh" | "timecode">("default");
  const [isClicking, setIsClicking] = useState(false);

  const mousePos = useRef({ x: -100, y: -100 });
  const cursorDotPos = useRef({ x: -100, y: -100 });
  const cursorRingPos = useRef({ x: -100, y: -100 });
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only enable on fine pointer devices (mouse / trackpad)
    if (window.matchMedia("(pointer: fine)").matches) {
      setEnabled(true);
    }

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };

      // Inspect target element or closest parent for contextual cursor hints
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const cursorTarget = target.closest("[data-cursor]") as HTMLElement | null;
      if (cursorTarget) {
        const type = cursorTarget.getAttribute("data-cursor");
        if (type === "video" || type === "play") {
          setCursorMode("video");
          setBadgeText("PLAY 4K");
          return;
        }
        if (type === "aperture" || type === "fstop") {
          setCursorMode("aperture");
          setBadgeText("f/STOP");
          return;
        }
        if (type === "mh" || type === "mister-horse") {
          setCursorMode("mh");
          setBadgeText("PREVIEW MH");
          return;
        }
        if (type === "timecode") {
          setCursorMode("timecode");
          setBadgeText("SMPTE SYNC");
          return;
        }
      }

      // Check standard interactive tags
      const interactive = target.closest("button, a, [role='button'], input, select, textarea");
      if (interactive) {
        setCursorMode("hover");
        setBadgeText(null);
      } else {
        setCursorMode("default");
        setBadgeText(null);
      }
    };

    const handleMouseDown = () => {
      setIsClicking(true);
    };

    const handleMouseUp = () => {
      setIsClicking(false);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    // Lerp animation loop
    let rafId: number;
    const lerp = (start: number, end: number, factor: number) => start + (end - start) * factor;

    const render = () => {
      // Dot snaps closely
      cursorDotPos.current.x = lerp(cursorDotPos.current.x, mousePos.current.x, 0.5);
      cursorDotPos.current.y = lerp(cursorDotPos.current.y, mousePos.current.y, 0.5);

      // Ring follows with silky optical lag (Lusion style)
      cursorRingPos.current.x = lerp(cursorRingPos.current.x, mousePos.current.x, 0.18);
      cursorRingPos.current.y = lerp(cursorRingPos.current.y, mousePos.current.y, 0.18);

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${cursorDotPos.current.x}px, ${cursorDotPos.current.y}px, 0)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${cursorRingPos.current.x}px, ${cursorRingPos.current.y}px, 0)`;
      }

      rafId = requestAnimationFrame(render);
    };

    rafId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      cancelAnimationFrame(rafId);
    };
  }, []);

  if (!enabled) return null;

  const isSpecial = cursorMode !== "default" && cursorMode !== "hover";
  const ringSize = isClicking ? 28 : isSpecial ? 54 : cursorMode === "hover" ? 44 : 32;

  return (
    <div className="fixed inset-0 pointer-events-none z-[99999] overflow-hidden" aria-hidden="true">
      {/* Precision Center Optical Dot */}
      <div
        ref={dotRef}
        className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full transition-transform duration-75 ease-out"
        style={{
          background: isSpecial ? "hsl(var(--primary))" : "hsl(var(--fg))",
          boxShadow: "0 0 8px hsl(var(--primary) / 0.8)",
          opacity: isClicking ? 0.3 : 1,
        }}
      />

      {/* Outer Cinema Reticle & Crosshairs */}
      <div
        ref={ringRef}
        className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 rounded-full border transition-all duration-300 ease-out flex items-center justify-center"
        style={{
          width: `${ringSize}px`,
          height: `${ringSize}px`,
          borderColor: isSpecial
            ? "hsl(var(--primary))"
            : cursorMode === "hover"
            ? "hsl(var(--primary) / 0.8)"
            : "hsl(var(--fg) / 0.35)",
          background: isSpecial
            ? "hsl(var(--primary) / 0.12)"
            : cursorMode === "hover"
            ? "hsl(var(--primary) / 0.08)"
            : "transparent",
          backdropFilter: isSpecial ? "blur(4px)" : "none",
          transform: `scale(${isClicking ? 0.85 : 1})`,
        }}
      >
        {/* Optical 4-axis Crosshair Ticks */}
        {isSpecial && (
          <>
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-1.5 bg-primary" />
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1px] h-1.5 bg-primary" />
            <div className="absolute left-0 top-1/2 -translate-y-1/2 h-[1px] w-1.5 bg-primary" />
            <div className="absolute right-0 top-1/2 -translate-y-1/2 h-[1px] w-1.5 bg-primary" />
          </>
        )}

        {/* Dynamic Context Badge Text (e.g. "PLAY 4K", "f/STOP", "PREVIEW MH") */}
        {badgeText && (
          <div
            ref={badgeRef}
            className="absolute -top-7 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-full border bg-black/85 border-primary/60 text-[9px] font-orbitron font-bold text-primary tracking-widest whitespace-nowrap shadow-lg animate-in fade-in zoom-in duration-150"
          >
            {badgeText}
          </div>
        )}
      </div>
    </div>
  );
}
