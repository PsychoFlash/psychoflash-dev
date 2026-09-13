"use client";
import { useEffect, useState, useRef } from "react";

/**
 * ScrollProgress — Precision Brand Gold Micro-Scrubber
 * Inspired by Aristide Benoist & Apple Keynote pages.
 */
export default function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null);
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    let rafId: number;
    const update = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const scrollTop = window.scrollY;
        const docH = document.documentElement.scrollHeight - window.innerHeight;
        const pct = docH > 0 ? Math.min(100, Math.max(0, (scrollTop / docH) * 100)) : 0;
        setPercent(Math.round(pct));
        if (barRef.current) {
          barRef.current.style.width = `${pct}%`;
        }
      });
    };

    window.addEventListener("scroll", update, { passive: true });
    update();
    return () => {
      window.removeEventListener("scroll", update);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      {/* Precision Top Gold Bar */}
      <div
        ref={barRef}
        className="scroll-progress fixed top-0 left-0 h-[2.5px] z-[99999] pointer-events-none transition-all ease-out"
        style={{
          background: "linear-gradient(90deg, hsl(var(--primary)), hsl(var(--secondary)) 85%, #f59e0b)",
          width: "0%",
          boxShadow: "0 0 12px hsl(var(--primary) / 0.9), 0 0 4px hsl(var(--secondary))",
        }}
      />

      {/* Floating Micro Percentage Badge (Top-Right under header) */}
      <div
        className="fixed top-[70px] right-4 z-40 hidden sm:flex items-center gap-1 px-2 py-0.5 rounded-full border backdrop-blur-md font-orbitron text-[9px] font-bold tracking-widest pointer-events-none transition-opacity duration-300"
        style={{
          background: "hsl(var(--bg) / 0.75)",
          borderColor: "hsl(var(--border) / 0.6)",
          color: "hsl(var(--primary))",
          opacity: percent > 2 ? 0.85 : 0,
        }}
      >
        <span className="tabular-nums">{percent}%</span>
        <span className="text-[7px] text-foreground-muted font-normal">REC</span>
      </div>
    </>
  );
}
