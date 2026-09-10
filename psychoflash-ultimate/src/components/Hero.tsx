import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import icountData from "@/data/icountData.json";

const PARTICLES = Array.from({ length: 40 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 1.5 + 0.5,
  speed: Math.random() * 18 + 12,
  delay: Math.random() * -18,
  primary: Math.random() > 0.5,
  opacity: Math.random() * 0.25 + 0.06,
}));

const STATS = [
  { num: `${icountData.totalDocuments.toLocaleString()}+`, label: "Productions" },
  { num: `${icountData.activeClients}+`, label: "Clients" },
  { num: "50+", label: "Team" },
  { num: "2009", label: "Founded" },
];

export default function Hero() {
  const [isGlitching, setIsGlitching] = useState(false);

  useEffect(() => {
    let t: ReturnType<typeof setTimeout>;
    const trigger = () => {
      setIsGlitching(true);
      setTimeout(() => setIsGlitching(false), 700);
      t = setTimeout(trigger, Math.random() * 10000 + 8000);
    };
    t = setTimeout(trigger, 4000);
    return () => clearTimeout(t);
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {PARTICLES.map((p) => (
          <div
            key={p.id}
            className="absolute rounded-full"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: p.size,
              height: p.size,
              background: p.primary ? "hsl(var(--primary))" : "hsl(var(--secondary))",
              opacity: p.opacity,
              animation: `float ${p.speed}s ease-in-out ${p.delay}s infinite`,
            }}
          />
        ))}
      </div>

      {/* Grid */}
      <div className="absolute inset-0 grid-pattern opacity-30 pointer-events-none" />

      {/* Glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, hsl(var(--primary) / 0.06) 0%, transparent 65%)" }}
      />

      {/* Content */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-6 text-center pt-24 pb-16">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 mb-8 px-4 py-1.5 rounded-full"
          style={{ border: "1px solid hsl(var(--border))", background: "hsl(var(--primary) / 0.06)" }}
        >
          <div className="live-dot" />
          <span className="font-orbitron text-[10px] tracking-[3px] uppercase" style={{ color: "hsl(var(--fg-muted))" }}>
            LIVE 24/7 · PRODUCTION READY
          </span>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className={`font-orbitron font-black leading-none mb-5 select-none ${isGlitching ? "glitch active" : "glitch"}`}
          data-text="PSYCHOFLASH"
          style={{ fontSize: "clamp(2.8rem, 9vw, 8rem)", letterSpacing: "0.04em", wordBreak: "keep-all" }}
        >
          <span style={{ color: "hsl(var(--fg))" }}>PSYCHO</span>
          <span
            style={{
              color: "transparent",
              WebkitTextStroke: "1px hsl(var(--primary))",
              textShadow: isGlitching ? "0 0 30px hsl(var(--primary))" : "none",
              transition: "text-shadow 0.3s",
            }}
          >
            FLASH
          </span>
        </motion.h1>

        {/* Sub */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="font-teko text-xl md:text-3xl mb-2 tracking-wide"
          style={{ color: "hsl(var(--fg-muted))" }}
        >
          מפיקים חוויות.{" "}
          <span className="gradient-text font-bold">יוצרים היסטוריה.</span>
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="text-sm md:text-base max-w-xl mx-auto mb-10 leading-relaxed"
          style={{ color: "hsl(var(--fg-muted))" }}
        >
          הפקות וידאו · שידורים חיים · AI Production · אירועים גלובליים
        </motion.p>

        {/* Stats — real numbers, no source mentioned */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.55 }}
          className="flex flex-wrap items-center justify-center gap-8 sm:gap-12 mb-10"
        >
          {STATS.map((s) => (
            <div key={s.label} className="text-center">
              <div className="stat-number" style={{ fontSize: "clamp(1.6rem, 3.5vw, 2.4rem)" }}>{s.num}</div>
              <div className="font-orbitron mt-0.5" style={{ fontSize: "9px", letterSpacing: "3px", color: "hsl(var(--fg-muted))", textTransform: "uppercase" }}>
                {s.label}
              </div>
            </div>
          ))}
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="flex flex-wrap items-center justify-center gap-3"
        >
          <a href="#contact" className="cyber-btn py-3 px-7">בואו נתחיל</a>
          <a href="#services" className="cyber-btn cyber-btn-outline py-3 px-7">השירותים שלנו</a>
        </motion.div>
      </div>

      {/* Scroll */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5"
      >
        <span className="font-orbitron" style={{ fontSize: "8px", letterSpacing: "4px", color: "hsl(var(--fg-muted))", textTransform: "uppercase", opacity: 0.4 }}>scroll</span>
        <div className="w-px h-10" style={{ background: "linear-gradient(to bottom, hsl(var(--fg-muted) / 0.3), transparent)" }} />
      </motion.div>
    </section>
  );
}
