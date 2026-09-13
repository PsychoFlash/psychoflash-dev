/**
 * NeuralHero — The Neural-Aware Hero Section
 *
 * Enhanced hero with:
 * - Adaptive tagline that mutates based on visitor profile
 * - Neural aperture core (SVG animated camera with synaptic pulses)
 * - Color temperature responsive to neuro state
 * - Stats that pulse with the synaptic glow
 * - Glitch effect driven by glow intensity
 */

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play } from "lucide-react";
import { useNeuro } from "@/hooks/NeuroContext";
import AdaptiveText from "@/components/AdaptiveText";
import ApertureVideoBackground from "@/components/ApertureVideoBackground";
import icountData from "@/data/icountData.json";
import OdometerCounter from "@/components/OdometerCounter";

interface NeuralHeroProps {
  onOpenShowreel?: () => void;
  externalTriggerAperture?: number;
}

const STATS = [
  { val: icountData.totalDocuments, suffix: "+", label: "Productions" },
  { val: icountData.activeClients, suffix: "+", label: "Clients" },
  { val: 50, suffix: "+", label: "Team" },
  { val: 2009, suffix: "", label: "Founded" },
];

const ADAPTIVE_TAGLINE = {
  unknown: "מפיקים חוויות. יוצרים היסטוריה.",
  broadcast: "שידורים חיים ברמה אחרת. vMix 4K. Blackmagic. לייב בלי פשרות.",
  hitech: "AI Production Pipelines. Runway. Kling. אוטומציה שמשנה חוקים.",
  events: "אירועים שנחרטים בזיכרון. מ-50 איש ועד 50,000. בכל מקום בעולם.",
  creative: "קולנוע. 4K. פוסט-פרודקשן שמרגש. תוכן שגורם לאנשים לעצור.",
};

const ADAPTIVE_CTA = {
  unknown: "בואו נתחיל",
  broadcast: "שוחח על הפקת שידור",
  hitech: "חקור AI Production",
  events: "תכנן אירוע",
  creative: "צור קשר יצירתי",
};

// Particles
const PARTICLES = Array.from({ length: 50 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 1.5 + 0.5,
  speed: Math.random() * 20 + 14,
  delay: Math.random() * -20,
  primary: Math.random() > 0.4,
  opacity: Math.random() * 0.2 + 0.05,
}));

export default function NeuralHero({ onOpenShowreel, externalTriggerAperture }: NeuralHeroProps) {
  const { state, boostProfile } = useNeuro();
  const [isGlitching, setIsGlitching] = useState(false);
  const [apertureOpen, setApertureOpen] = useState(0.6);

  // Glitch triggered by high glow
  useEffect(() => {
    if (state.glowIntensity > 0.7 && !isGlitching) {
      setIsGlitching(true);
      setTimeout(() => setIsGlitching(false), 600);
    }
  }, [state.glowIntensity, isGlitching]);

  // Autonomous glitch loop
  useEffect(() => {
    let t: ReturnType<typeof setTimeout>;
    const trigger = () => {
      setIsGlitching(true);
      setTimeout(() => setIsGlitching(false), 700);
      t = setTimeout(trigger, Math.random() * 12000 + 7000);
    };
    t = setTimeout(trigger, 5000);
    return () => clearTimeout(t);
  }, []);

  // Aperture opens with engagement
  useEffect(() => {
    setApertureOpen(0.3 + state.signals.engagementDepth * 0.7);
  }, [state.signals.engagementDepth]);

  // Glow intensity drives particle saturation
  const glowLevel = state.glowIntensity;

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Particles — density reacts to glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {PARTICLES.map((p) => (
          <motion.div
            key={p.id}
            className="absolute rounded-full"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: p.size + glowLevel * 0.5,
              height: p.size + glowLevel * 0.5,
              background: p.primary ? "hsl(var(--primary))" : "hsl(var(--secondary))",
              opacity: p.opacity + glowLevel * 0.15,
              animation: `float ${p.speed}s ease-in-out ${p.delay}s infinite`,
            }}
          />
        ))}
      </div>

      {/* Grid */}
      <div className="absolute inset-0 grid-pattern opacity-20 pointer-events-none" />

      {/* Dynamic radial glow — shifts color with intensity */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
        animate={{
          background: [
            `radial-gradient(circle, hsl(36 66% 47% / ${0.04 + glowLevel * 0.08}) 0%, transparent 65%)`,
            `radial-gradient(circle, hsl(36 80% 55% / ${0.06 + glowLevel * 0.10}) 0%, transparent 65%)`,
          ],
        }}
        transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
      />

      {/* Content */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 text-center pt-28 pb-16">
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

        {/* Aperture Core + Title */}
        <div className="relative inline-flex flex-col items-center">
          {/* Neural aperture SVG */}
          <motion.div
            className="mb-4 relative"
            animate={{ rotate: apertureOpen > 0.6 ? [0, 3, -3, 0] : 0 }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            <svg width="80" height="80" viewBox="0 0 80 80" className="opacity-80">
              <defs>
                <radialGradient id="apertureGrad" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="hsl(36, 90%, 70%)" stopOpacity="0.9" />
                  <stop offset="60%" stopColor="hsl(36, 60%, 40%)" stopOpacity="0.5" />
                  <stop offset="100%" stopColor="hsl(350, 55%, 20%)" stopOpacity="0" />
                </radialGradient>
              </defs>
              {/* Outer ring */}
              <circle cx="40" cy="40" r="36" fill="none" stroke="hsl(36, 60%, 40%)" strokeWidth="0.5" strokeOpacity="0.4" />
              <circle cx="40" cy="40" r="28" fill="none" stroke="hsl(36, 80%, 55%)" strokeWidth="0.8" strokeOpacity="0.3" />

              {/* Aperture blades — 6 blades, open with apertureOpen */}
              {Array.from({ length: 6 }).map((_, i) => {
                const angle = (i / 6) * 360 + apertureOpen * 25;
                const rad = (angle * Math.PI) / 180;
                const x1 = 40 + Math.cos(rad) * 10;
                const y1 = 40 + Math.sin(rad) * 10;
                const x2 = 40 + Math.cos(rad + 1.2) * 28;
                const y2 = 40 + Math.sin(rad + 1.2) * 28;
                const x3 = 40 + Math.cos(rad + 0.6) * 30;
                const y3 = 40 + Math.sin(rad + 0.6) * 30;
                return (
                  <motion.path
                    key={i}
                    d={`M ${x1} ${y1} L ${x2} ${y2} L ${x3} ${y3} Z`}
                    fill="hsl(36, 50%, 30%)"
                    fillOpacity={0.25 + (1 - apertureOpen) * 0.3}
                    stroke="hsl(36, 70%, 45%)"
                    strokeWidth="0.3"
                    strokeOpacity="0.5"
                    animate={{ fillOpacity: 0.1 + (1 - apertureOpen) * 0.3 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                  />
                );
              })}

              {/* Core glow */}
              <circle cx="40" cy="40" r={8 + glowLevel * 4} fill="url(#apertureGrad)" />
              <motion.circle
                cx="40" cy="40" r="4"
                fill="hsl(36, 95%, 75%)"
                animate={{ r: [3.5, 5, 3.5], opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              />
            </svg>
          </motion.div>

          {/* Main title — Interactive with Orian's glitch & resonance response */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => {
              setIsGlitching(true);
              setTimeout(() => setIsGlitching(false), 500);
            }}
            title="לחץ להפעלת פעימת סייבר ורזוננס"
            className={`font-orbitron font-black leading-none mb-5 select-none cursor-pointer ${isGlitching ? "glitch active" : "glitch"}`}
            data-text="PSYCHOFLASH"
            data-tactile="title"
            style={{ fontSize: "clamp(2.8rem, 9vw, 8rem)", letterSpacing: "0.04em", wordBreak: "keep-all" }}
          >
            <span style={{ color: "hsl(var(--fg))" }}>PSYCHO</span>
            <motion.span
              style={{
                color: "transparent",
                WebkitTextStroke: "1px hsl(var(--primary))",
              }}
              animate={{
                textShadow: isGlitching
                  ? `0 0 ${20 + glowLevel * 30}px hsl(var(--primary))`
                  : `0 0 ${glowLevel * 15}px hsl(var(--primary) / 0.4)`,
              }}
              transition={{ duration: 0.3 }}
            >
              FLASH
            </motion.span>
          </motion.h1>
        </div>

        {/* Adaptive tagline */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="font-teko text-xl md:text-3xl mb-2 tracking-wide cursor-pointer select-none"
          whileHover={{ scale: 1.01 }}
          data-tactile="title"
          style={{ color: "hsl(var(--fg-muted))" }}
        >
          <AdaptiveText text={ADAPTIVE_TAGLINE} />
        </motion.p>

        {/* Visual Content Engineering subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="font-orbitron text-xs md:text-sm max-w-lg mx-auto mb-12 tracking-widest cursor-pointer select-none"
          whileHover={{ opacity: 0.9, letterSpacing: "6px" }}
          data-tactile="title"
          style={{ color: "hsl(var(--fg-muted))", opacity: 0.5, letterSpacing: "5px", textTransform: "uppercase" }}
        >
          VISUAL CONTENT ENGINEERING
        </motion.p>

        {/* Stats — pulse with glow and react tactilely to every click */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.55 }}
          className="flex flex-wrap items-center justify-center gap-8 sm:gap-16 mb-12"
        >
          {STATS.map((s) => (
            <motion.div
              key={s.label}
              className="text-center cursor-pointer select-none group"
              whileHover={{ scale: 1.1, y: -4 }}
              whileTap={{ scale: 1.2, rotate: [-2, 2, 0] }}
              onHoverStart={() => boostProfile("broadcast", 0.01)}
              data-tactile="stat"
              title="לחץ לקבלת פעימת סינרגיה"
            >
              <motion.div
                className="stat-number transition-colors group-hover:text-amber-400"
                style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)" }}
                animate={{
                  textShadow: [
                    `0 0 ${4 + glowLevel * 12}px hsl(var(--primary) / 0.4)`,
                    `0 0 ${8 + glowLevel * 20}px hsl(var(--primary) / 0.7)`,
                  ],
                }}
                transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
              >
                <OdometerCounter value={s.val} suffix={s.suffix} enableTickSound={false} />
              </motion.div>
              <div
                className="font-orbitron mt-1 group-hover:text-primary transition-colors"
                style={{ fontSize: "8px", letterSpacing: "3px", color: "hsl(var(--fg-muted))", textTransform: "uppercase", opacity: 0.6 }}
              >
                {s.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="flex flex-wrap items-center justify-center gap-3"
        >
          <a href="#contact" className="cyber-btn py-3 px-8 relative overflow-hidden">
            <AdaptiveText text={ADAPTIVE_CTA} />
          </a>
          {onOpenShowreel && (
            <button
              onClick={onOpenShowreel}
              className="cyber-btn py-3 px-7 inline-flex items-center gap-2 border shadow-lg"
              style={{
                background: "hsl(var(--primary) / 0.16)",
                borderColor: "hsl(var(--primary))",
                color: "hsl(var(--fg))",
              }}
            >
              <Play size={15} fill="currentColor" style={{ color: "hsl(var(--primary))" }} />
              <span>שואו-ריל מאסטר 4K</span>
            </button>
          )}
          <a
            href="#services"
            className="cyber-btn cyber-btn-outline py-3 px-8"
            onMouseEnter={() => boostProfile("creative", 0.015)}
          >
            השירותים שלנו
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5"
      >
        <span
          className="font-orbitron"
          style={{ fontSize: "7px", letterSpacing: "4px", color: "hsl(var(--fg-muted))", textTransform: "uppercase", opacity: 0.3 }}
        >
          scroll
        </span>
        <motion.div
          className="w-px h-12"
          style={{ background: "linear-gradient(to bottom, hsl(var(--primary) / 0.5), transparent)" }}
          animate={{ opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </motion.div>
    </section>
  );
}
