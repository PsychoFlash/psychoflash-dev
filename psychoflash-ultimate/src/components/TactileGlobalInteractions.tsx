/**
 * TactileGlobalInteractions — Omnipresent Tactile Feedback Engine
 * 
 * Ensures every single interaction with the site (clicks on buttons, text,
 * headers, dividers, badges, or empty space) yields immediate, responsive,
 * tactile audiovisual feedback:
 * - Shockwave rings & kinetic spark particles at cursor point
 * - Synthesized Web Audio physical clicks, chimes, and synaptic pulses
 * - Spring bounce & vibration
 */

import { useEffect, useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { playTactileSound } from "@/utils/tactileAudio";

interface Shockwave {
  id: number;
  x: number;
  y: number;
  color: string;
}

interface Particle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
}

export default function TactileGlobalInteractions() {
  const [shockwaves, setShockwaves] = useState<Shockwave[]>([]);
  const [particles, setParticles] = useState<Particle[]>([]);
  const nextId = useRef(0);

  const handleClick = useCallback((e: MouseEvent) => {
    const target = e.target as HTMLElement | null;
    const x = e.clientX;
    const y = e.clientY;

    const id = ++nextId.current;
    const isMisterHorse = !!target?.closest("[data-cursor='mh'], .mh-badge");
    const isCamera = !!target?.closest("[data-cursor='snap'], .snap-btn");
    const isAperture = !!target?.closest("[data-cursor='aperture']");
    const isInteractive = !!target?.closest("button, a, input, select, textarea, [role='button']");
    const isHeaderOrLogo = !!target?.closest("h1, h2, h3, [data-tactile='title'], .logo-glow");
    const isStat = !!target?.closest(".stat-number, [data-tactile='stat']");
    const isBadge = !!target?.closest(".badge, [data-tactile='badge']");
    const isCard = !!target?.closest(".elastic-card-sheen, .group, card");

    // Select synthesized physical audio feedback based on element semantics
    if (isCamera) {
      playTactileSound("shutter");
    } else if (isMisterHorse) {
      playTactileSound("whoosh");
    } else if (isAperture) {
      playTactileSound("fstop");
    } else if (isStat) {
      playTactileSound("chime");
    } else if (isHeaderOrLogo) {
      playTactileSound("glitch");
    } else if (isBadge) {
      playTactileSound("tally");
    } else if (isInteractive) {
      playTactileSound("switch");
    } else if (isCard) {
      playTactileSound("pop");
    } else {
      playTactileSound("thud");
    }

    const shockColor = isStat
      ? "rgba(234, 179, 8, 0.8)"
      : isHeaderOrLogo
      ? "rgba(245, 158, 11, 0.85)"
      : isMisterHorse
      ? "rgba(168, 85, 247, 0.75)"
      : isCamera
      ? "rgba(255, 255, 255, 0.9)"
      : "rgba(217, 119, 6, 0.55)";

    // Spawn shockwave ring
    setShockwaves((prev) => [...prev.slice(-6), { id, x, y, color: shockColor }]);

    // Spawn 6 kinetic micro-particles
    const newParticles: Particle[] = Array.from({ length: 6 }).map((_, i) => {
      const angle = (i / 6) * Math.PI * 2 + Math.random() * 0.5;
      const speed = Math.random() * 50 + 35;
      return {
        id: id * 10 + i,
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        size: Math.random() * 2.5 + 1.5,
        color: i % 2 === 0 ? "#eab308" : "#f59e0b",
      };
    });

    setParticles((prev) => [...prev.slice(-18), ...newParticles]);

    // Clean up shockwaves after 650ms
    setTimeout(() => {
      setShockwaves((prev) => prev.filter((s) => s.id !== id));
    }, 650);

    // Clean up particles after 550ms
    setTimeout(() => {
      setParticles((prev) => prev.filter((p) => Math.floor(p.id / 10) !== id));
    }, 550);
  }, []);

  useEffect(() => {
    window.addEventListener("pointerdown", handleClick, { passive: true });
    return () => window.removeEventListener("pointerdown", handleClick);
  }, [handleClick]);

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {/* Shockwave Rings */}
      <AnimatePresence>
        {shockwaves.map((s) => (
          <motion.div
            key={s.id}
            initial={{ opacity: 0.9, scale: 0.1 }}
            animate={{ opacity: 0, scale: 3.2 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.55, ease: "easeOut" }}
            className="absolute rounded-full pointer-events-none"
            style={{
              left: s.x - 30,
              top: s.y - 30,
              width: 60,
              height: 60,
              border: `1.5px solid ${s.color}`,
              boxShadow: `0 0 16px ${s.color}`,
            }}
          />
        ))}
      </AnimatePresence>

      {/* Kinetic Micro-Particles */}
      <AnimatePresence>
        {particles.map((p) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 1, x: p.x, y: p.y, scale: 1 }}
            animate={{
              opacity: 0,
              x: p.x + p.vx,
              y: p.y + p.vy,
              scale: 0.2,
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="absolute rounded-full pointer-events-none"
            style={{
              width: p.size,
              height: p.size,
              backgroundColor: p.color,
              boxShadow: `0 0 6px ${p.color}`,
            }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}
