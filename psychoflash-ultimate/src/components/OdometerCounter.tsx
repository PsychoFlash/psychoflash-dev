import { useEffect, useState, useRef } from "react";
import { playTactileSound } from "@/utils/tactileAudio";

interface OdometerCounterProps {
  value: number;
  prefix?: string;
  suffix?: string;
  durationMs?: number;
  className?: string;
  enableTickSound?: boolean;
}

/**
 * OdometerCounter — Inspired by Aristide Benoist & Apple Keynote metrics
 * 
 * Smooth mechanical rolling counter with intersection detection
 * and optional tactile acoustic ticks.
 */
export default function OdometerCounter({
  value,
  prefix = "",
  suffix = "",
  durationMs = 1400,
  className = "",
  enableTickSound = false,
}: OdometerCounterProps) {
  const [displayValue, setDisplayValue] = useState(0);
  const containerRef = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          startRolling();
        }
      },
      { threshold: 0.25 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [value, durationMs]);

  const startRolling = () => {
    const startTime = performance.now();
    let lastTick = 0;

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(1, elapsed / durationMs);

      // Easing: ease-out quintic for smooth mechanical deceleration
      const easeOut = 1 - Math.pow(1 - progress, 4);
      const current = Math.floor(easeOut * value);

      setDisplayValue(current);

      // Play soft mechanical tick every 8% of progress if enabled
      if (enableTickSound && progress - lastTick > 0.08 && progress < 0.95) {
        lastTick = progress;
        playTactileSound("pop");
      }

      if (progress < 1) {
        requestAnimationFrame(tick);
      } else {
        setDisplayValue(value);
      }
    };

    requestAnimationFrame(tick);
  };

  const formatted = displayValue.toLocaleString("en-US");

  return (
    <span ref={containerRef} className={`tabular-nums inline-flex items-baseline ${className}`}>
      {prefix && <span className="opacity-80 font-normal mr-0.5">{prefix}</span>}
      <span>{formatted}</span>
      {suffix && <span className="text-primary ml-0.5 font-bold">{suffix}</span>}
    </span>
  );
}
