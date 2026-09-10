import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const PARTNERS = [
  "SONY", "vMix", "TriCaster", "Runway AI", "Kling AI",
  "Adobe", "DJI", "Blackmagic", "After Effects", "Premiere Pro",
  "NVIDIA", "OBS", "Zoom", "Teams", "YouTube Live",
  "SONY", "vMix", "TriCaster", "Runway AI", "Kling AI",
  "Adobe", "DJI", "Blackmagic", "After Effects", "Premiere Pro",
  "NVIDIA", "OBS", "Zoom", "Teams", "YouTube Live",
];

const TESTIMONIALS = [
  {
    name: "דן לוי",
    role: "מנכ\"ל, StartupX",
    text: "PSYCHOFLASH הפיקו לנו ועידה גלובלית של 5,000 משתתפים. הביצוע היה ברמה בינלאומית. נדיר למצוא צוות בסדר גודל כזה.",
    stars: 5,
  },
  {
    name: "Sarah Mitchell",
    role: "CEO, TechForward",
    text: "The team delivered our brand film under impossible deadlines with a quality that exceeded our highest expectations. Truly world-class.",
    stars: 5,
  },
  {
    name: "מיכל כהן",
    role: "VP Marketing, InnoVentures",
    text: "כשרת הצוות של PsychoFlash להפיק תוכן AI גנרטיבי שנראה כמו עתיד — עכשיו. אנחנו לא עובדים עם אף אחד אחר.",
    stars: 5,
  },
  {
    name: "James Chen",
    role: "Director, Global Events Co.",
    text: "24/7 support, 25+ countries, zero compromises on quality. These are the most professional people I've worked with in 20 years of events.",
    stars: 5,
  },
];

export default function TestimonialsSection() {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setIdx((p) => (p + 1) % TESTIMONIALS.length), 4500);
    return () => clearInterval(t);
  }, []);

  const current = TESTIMONIALS[idx];

  return (
    <section id="testimonials" className="py-24 px-4 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* === TICKER === */}
        <div className="mb-20">
          <p className="font-orbitron text-[9px] tracking-[5px] text-white/20 uppercase text-center mb-6">
            TECHNOLOGY STACK
          </p>
          <div className="ticker-wrap py-3">
            <div className="ticker-track gap-x-12">
              {PARTNERS.map((p, i) => (
                <span
                  key={i}
                  className="font-orbitron text-xs tracking-widest text-white/20 hover:text-[hsl(187,100%,50%)] transition-colors cursor-default px-6 whitespace-nowrap border-l border-white/5"
                >
                  {p}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* === TESTIMONIALS === */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="font-orbitron text-[10px] tracking-[5px] text-[hsl(284,100%,50%)] uppercase mb-4">
            TESTIMONIALS
          </p>
          <h2 className="section-title gradient-text">לקוחות מדברים</h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Quote Display */}
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="glass-card p-8 relative"
          >
            {/* Quote marks */}
            <div
              className="absolute -top-4 -right-2 font-teko text-[8rem] leading-none opacity-10"
              style={{ color: "hsl(187,100%,50%)" }}
            >
              "
            </div>
            {/* Stars */}
            <div className="flex gap-1 mb-4">
              {Array.from({ length: current.stars }).map((_, i) => (
                <span key={i} className="text-yellow-400 text-sm">★</span>
              ))}
            </div>
            <p className="text-white/80 text-base leading-relaxed mb-6 relative z-10">
              "{current.text}"
            </p>
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center font-orbitron text-xs font-bold"
                style={{
                  background: "linear-gradient(135deg, hsl(187,100%,50%), hsl(284,100%,50%))",
                  color: "hsl(230,20%,2%)",
                }}
              >
                {current.name[0]}
              </div>
              <div>
                <p className="font-orbitron text-xs text-white tracking-wider">{current.name}</p>
                <p className="text-white/40 text-xs mt-0.5">{current.role}</p>
              </div>
            </div>
          </motion.div>

          {/* Indicators + other cards */}
          <div className="space-y-3">
            {TESTIMONIALS.map((t, i) => (
              <motion.div
                key={i}
                onClick={() => setIdx(i)}
                className="glass-card p-4 cursor-pointer transition-all duration-300"
                style={{
                  borderColor: i === idx ? "hsl(187,100%,50%,0.4)" : "transparent",
                  boxShadow: i === idx ? "0 0 20px hsl(187,100%,50%,0.1)" : "none",
                }}
                whileHover={{ x: -4 }}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center font-orbitron text-[10px] font-bold shrink-0"
                    style={{
                      background: i === idx
                        ? "linear-gradient(135deg, hsl(187,100%,50%), hsl(284,100%,50%))"
                        : "hsl(230,10%,15%)",
                      color: i === idx ? "hsl(230,20%,2%)" : "white",
                    }}
                  >
                    {t.name[0]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-orbitron text-[10px] text-white tracking-wider truncate">
                      {t.name}
                    </p>
                    <p className="text-white/30 text-[10px] truncate">{t.role}</p>
                  </div>
                  <div className="flex gap-0.5 shrink-0">
                    {Array.from({ length: t.stars }).map((_, j) => (
                      <span key={j} className="text-yellow-400 text-[10px]">★</span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
