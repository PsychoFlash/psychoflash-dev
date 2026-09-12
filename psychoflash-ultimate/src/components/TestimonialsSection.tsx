import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const PARTNERS = [
  "SONY PRO", "vMix 4K", "Blackmagic ATEM", "Runway Gen-3", "Kling AI",
  "Adobe CC", "DJI Enterprise", "Blackmagic 6K", "After Effects", "Premiere Pro",
  "NVIDIA RTX", "OBS Studio", "Zoom Rooms", "Microsoft Teams", "YouTube Live",
  "SONY PRO", "vMix 4K", "Blackmagic ATEM", "Runway Gen-3", "Kling AI",
  "Adobe CC", "DJI Enterprise", "Blackmagic 6K", "After Effects", "Premiere Pro",
  "NVIDIA RTX", "OBS Studio", "Zoom Rooms", "Microsoft Teams", "YouTube Live",
];

const TESTIMONIALS = [
  {
    name: "דן לוי",
    role: "מנכ\"ל, StartupX",
    text: "PSYCHOFLASH הפיקו לנו ועידה גלובלית היברידית של 5,000 משתתפים. הביצוע הטכנולוגי והרמה האסתטית היו בליגה בינלאומית. נדיר למצוא צוות עם מקצוענות כזו בישראל.",
    stars: 5,
  },
  {
    name: "Sarah Mitchell",
    role: "VP Marketing, TechForward Global",
    text: "The team delivered our international keynote broadcast and brand film under impossible deadlines. The visual polish and audio quality exceeded our highest expectations.",
    stars: 5,
  },
  {
    name: "מיכל כהן",
    role: "מנהלת תקשורת שיווקית, InnoVentures",
    text: "היכולת של PSYCHOFLASH לשלב צילומי שטח חיים עם אלמנטים גנרטיביים של AI יצרה סרטון שעצר את כל התעשייה. אנחנו עובדים איתם באופן בלעדי בכל פרויקט מרכזי.",
    stars: 5,
  },
  {
    name: "James Chen",
    role: "Director of Production, Global Events Co.",
    text: "24/7 reliability, seamless multi-camera switching, and zero compromises on stream stability. Orian and his crew are the pinnacle of live media engineering.",
    stars: 5,
  },
];

export default function TestimonialsSection() {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setIdx((p) => (p + 1) % TESTIMONIALS.length), 5500);
    return () => clearInterval(t);
  }, []);

  const current = TESTIMONIALS[idx];

  return (
    <section id="testimonials" className="py-24 px-4 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* === TICKER === */}
        <div className="mb-20">
          <p
            className="font-orbitron text-[9px] tracking-[5px] uppercase text-center mb-6 font-semibold"
            style={{ color: "hsl(var(--fg-muted))" }}
          >
            TECHNOLOGY STACK & PARTNERS
          </p>
          <div className="ticker-wrap py-3">
            <div className="ticker-track gap-x-12">
              {PARTNERS.map((p, i) => (
                <span
                  key={i}
                  className="font-orbitron text-xs tracking-widest transition-colors cursor-default px-6 whitespace-nowrap border-l"
                  style={{
                    color: "hsl(var(--fg-muted))",
                    borderColor: "hsl(var(--border))",
                  }}
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
          className="text-center mb-14"
        >
          <p
            className="font-orbitron text-[10px] tracking-[5px] uppercase mb-4 font-bold"
            style={{ color: "hsl(var(--primary))" }}
          >
            TESTIMONIALS · מילים מלקוחות
          </p>
          <h2 className="section-title gradient-text">מה אומרים עלינו</h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Quote Display */}
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="glass-card p-8 sm:p-10 relative overflow-hidden"
          >
            {/* Quote marks */}
            <div
              className="absolute -top-4 -right-2 font-teko text-[8rem] leading-none opacity-10 pointer-events-none select-none"
              style={{ color: "hsl(var(--primary))" }}
            >
              "
            </div>

            {/* Stars */}
            <div className="flex gap-1 mb-4" aria-label={`דירוג: ${current.stars} כוכבים`}>
              {Array.from({ length: current.stars }).map((_, i) => (
                <span key={i} className="text-amber-400 text-sm">★</span>
              ))}
            </div>

            <p className="text-base sm:text-lg leading-relaxed mb-6 relative z-10 font-medium" style={{ color: "hsl(var(--fg))" }}>
              "{current.text}"
            </p>

            <div className="flex items-center gap-3.5">
              <div
                className="w-11 h-11 rounded-full flex items-center justify-center font-orbitron text-sm font-bold shadow-md shrink-0"
                style={{
                  background: "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--secondary)))",
                  color: "white",
                }}
              >
                {current.name[0]}
              </div>
              <div>
                <p className="font-orbitron text-xs tracking-wider font-bold" style={{ color: "hsl(var(--fg))" }}>
                  {current.name}
                </p>
                <p className="text-xs mt-0.5" style={{ color: "hsl(var(--fg-muted))" }}>
                  {current.role}
                </p>
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
                  borderColor: i === idx ? "hsl(var(--primary))" : "hsl(var(--border))",
                  boxShadow: i === idx ? "0 0 20px hsl(var(--primary) / 0.15)" : "none",
                  background: i === idx ? "hsl(var(--primary) / 0.06)" : undefined,
                }}
                whileHover={{ x: -4 }}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center font-orbitron text-[11px] font-bold shrink-0"
                    style={{
                      background: i === idx
                        ? "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--secondary)))"
                        : "hsl(var(--border))",
                      color: i === idx ? "white" : "hsl(var(--fg))",
                    }}
                  >
                    {t.name[0]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-orbitron text-[11px] tracking-wider truncate font-semibold" style={{ color: "hsl(var(--fg))" }}>
                      {t.name}
                    </p>
                    <p className="text-[10px] truncate" style={{ color: "hsl(var(--fg-muted))" }}>
                      {t.role}
                    </p>
                  </div>
                  <div className="flex gap-0.5 shrink-0">
                    {Array.from({ length: t.stars }).map((_, j) => (
                      <span key={j} className="text-amber-400 text-[10px]">★</span>
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
