"use client";
import { useEffect, useRef } from "react";

export default function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const update = () => {
      const scrollTop = window.scrollY;
      const docH = document.documentElement.scrollHeight - window.innerHeight;
      const pct = docH > 0 ? (scrollTop / docH) * 100 : 0;
      if (barRef.current) barRef.current.style.width = pct + "%";
    };
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <div
      ref={barRef}
      className="scroll-progress fixed top-0 left-0 h-[2px] z-[9999]"
      style={{
        background: "linear-gradient(to right, hsl(187,100%,50%), hsl(284,100%,50%))",
        width: "0%",
        boxShadow: "0 0 10px hsl(187,100%,50%)",
        transition: "width 0.1s linear",
      }}
    />
  );
}
