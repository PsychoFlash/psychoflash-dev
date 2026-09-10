import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

function Counter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && !started.current) {
          started.current = true;
          let start = 0;
          const step = Math.ceil(target / 60);
          const t = setInterval(() => {
            start += step;
            if (start >= target) {
              setCount(target);
              clearInterval(t);
            } else {
              setCount(start);
            }
          }, 16);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return (
    <div ref={ref} className="stat-number text-5xl md:text-6xl font-orbitron">
      {count.toLocaleString()}
      {suffix}
    </div>
  );
}

const PILLARS = [
  {
    num: "01",
    title: "Live Production",
    titleHe: "הפקה חיה",
    desc: "OB Van מאובזרת, TriCaster Pro, Multi-cam עד 12 מצלמות. שידור ל-YouTube, Zoom, Teams בו זמנית.",
    color: "hsl(187,100%,50%)",
  },
  {
    num: "02",
    title: "Aerial & Cinema",
    titleHe: "אוויר וקולנוע",
    desc: "טייסי FPV ודרון מורשים, Sony FX3/FX6, Blackmagic BMPCC. כל פורמט, כל מיקום, כל מזג אוויר.",
    color: "hsl(284,100%,50%)",
  },
  {
    num: "03",
    title: "AI Integration",
    titleHe: "אינטגרציית AI",
    desc: "Runway Gen-3, Kling AI, NeRF, Stable Diffusion. הפקת תוכן גנרטיבי שמשלב ריאליסטיות עם יצירתיות.",
    color: "hsl(187,100%,50%)",
  },
  {
    num: "04",
    title: "Post & Delivery",
    titleHe: "פוסט ומסירה",
    desc: "Color grade מקצועי, מיקס קול Dolby, תרגום אוטומטי, קפיש לכל הפלטפורמות — בזמן שהוגדר.",
    color: "hsl(284,100%,50%)",
  },
];

export default function AboutSection() {
  return (
    <section id="about" className="py-24 px-4 relative">
      {/* Top divider */}
      <div className="neon-divider mb-20" />

      <div className="max-w-7xl mx-auto">
        {/* STATS COUNTER ROW */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-24">
          {[
            { target: 1200, suffix: "+", label: "PRODUCTIONS" },
            { target: 25, suffix: "+", label: "COUNTRIES" },
            { target: 50, suffix: "+", label: "TEAM MEMBERS" },
            { target: 17, suffix: " yrs", label: "EXPERIENCE" },
          ].map((s) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <Counter target={s.target} suffix={s.suffix} />
              <p className="font-orbitron text-[9px] tracking-[3px] text-white/20 uppercase mt-2">
                {s.label}
              </p>
            </motion.div>
          ))}
        </div>

        {/* ABOUT TEXT */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <p className="font-orbitron text-[10px] tracking-[5px] text-[hsl(187,100%,50%)] uppercase mb-4">
              ABOUT US
            </p>
            <h2 className="section-title text-white mb-6">
              מקצה<br />
              <span className="gradient-text">לקצה.</span>
            </h2>
            <div className="space-y-4 text-white/50 text-sm leading-relaxed max-w-lg">
              <p>
                PSYCHOFLASH היא חברת הפקה מדיה ישראלית שפועלת מ-2009. אנחנו מפיקים כל דבר — מועידות גלובליות לאירועים אינטימיים, מסרטוני מסחר ל-Documentary, משידורים חיים ל-AI Content.
              </p>
              <p>
                הצוות שלנו: 50+ מקצוענים — צלמים, עורכים, טכנאי שמע, מנהלי פרויקטים, ומפתחי AI. כולם עם מטרה אחת: לגרום לפרויקט שלך להיראות מושלם.
              </p>
              <p>
                אורי אדלניי, מייסד ומנכ"ל, מוביל את הצוות עם ניסיון של 17 שנים בתעשיית המדיה.
              </p>
            </div>
            <div className="mt-8">
              <a href="#contact" className="cyber-btn inline-flex py-3 px-8">
                הכר את הצוות שלנו
              </a>
            </div>
          </motion.div>

          {/* Visual — animated box */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative w-full aspect-square max-w-sm mx-auto">
              {/* Rotating border */}
              <div
                className="absolute inset-0 rounded-full border border-[hsl(187,100%,50%,0.2)]"
                style={{ animation: "rotate-slow 20s linear infinite" }}
              />
              <div
                className="absolute inset-4 rounded-full border border-[hsl(284,100%,50%,0.15)]"
                style={{ animation: "rotate-slow 15s linear infinite reverse" }}
              />
              <div
                className="absolute inset-8 rounded-full border border-[hsl(187,100%,50%,0.1)]"
                style={{ animation: "rotate-slow 10s linear infinite" }}
              />

              {/* Center */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div
                    className="font-orbitron text-5xl font-black mb-1"
                    style={{
                      background: "linear-gradient(135deg, hsl(187,100%,50%), hsl(284,100%,50%))",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    ⚡
                  </div>
                  <div className="font-orbitron text-xs tracking-widest text-white/60">
                    PSYCHOFLASH
                  </div>
                  <div className="font-orbitron text-[9px] tracking-wider text-white/20 mt-1">
                    EST. 2009
                  </div>
                </div>
              </div>

              {/* Orbiting dots */}
              {[0, 90, 180, 270].map((angle, i) => (
                <div
                  key={i}
                  className="absolute w-2 h-2 rounded-full"
                  style={{
                    background: i % 2 === 0 ? "hsl(187,100%,50%)" : "hsl(284,100%,50%)",
                    boxShadow: `0 0 8px ${i % 2 === 0 ? "hsl(187,100%,50%)" : "hsl(284,100%,50%)"}`,
                    top: "50%",
                    left: "50%",
                    transform: `rotate(${angle}deg) translate(${140}px, -50%)`,
                    animation: `rotate-slow ${20 - i * 2}s linear infinite`,
                    transformOrigin: `-${140}px 50%`,
                  }}
                />
              ))}
            </div>
          </motion.div>
        </div>

        {/* PILLARS */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h3 className="section-title gradient-text">עמודי התווך</h3>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {PILLARS.map((pillar, i) => (
            <motion.div
              key={pillar.num}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ x: -4 }}
              className="glass-card p-6 flex gap-5 group cursor-default"
            >
              <div
                className="font-orbitron text-4xl font-black leading-none shrink-0 opacity-20 group-hover:opacity-60 transition-opacity"
                style={{ color: pillar.color }}
              >
                {pillar.num}
              </div>
              <div>
                <p className="font-orbitron text-[8px] tracking-[3px] text-white/20 uppercase mb-1">
                  {pillar.title}
                </p>
                <h4 className="font-teko text-2xl font-bold text-white mb-2 group-hover:text-[hsl(187,100%,50%)] transition-colors">
                  {pillar.titleHe}
                </h4>
                <p className="text-white/40 text-sm leading-relaxed">{pillar.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
