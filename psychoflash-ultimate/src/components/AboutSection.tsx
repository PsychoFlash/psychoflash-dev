import { motion } from "framer-motion";
import OdometerCounter from "@/components/OdometerCounter";

const PILLARS = [
  {
    num: "01",
    title: "Live Production",
    titleHe: "הפקה חיה ושידורי לייב",
    desc: "OB Van מאובזרת, מערכות vMix 4K מקצועיות, מערך Multi-cam עד 12 מצלמות Blackmagic ו-Sony. שידור סימולטני יציב ל-YouTube, Zoom, Teams ולכל שרת RTMP/SRT.",
    color: "hsl(var(--primary))",
  },
  {
    num: "02",
    title: "Aerial & Cinema",
    titleHe: "סינמטוגרפיה ואוויר",
    desc: "טייסי FPV ורחפנים מורשים, Sony FX3/FX6, מצלמות קולנוע Blackmagic 6K. צילום בכל תנאי שטח, בכל שעה, ברישוי תעופה מלא.",
    color: "hsl(var(--secondary))",
  },
  {
    num: "03",
    title: "AI Integration",
    titleHe: "אינטגרציית AI מתקדמת",
    desc: "Runway Gen-3, Kling AI, Midjourney, NeRF ו-ComfyUI. שילוב תוכן גנרטיבי היברידי שמחבר ריאליזם קולנועי עם עולמות דמיון.",
    color: "hsl(var(--primary))",
  },
  {
    num: "04",
    title: "Post & Delivery",
    titleHe: "פוסט-פרודקשן ומאסטרינג",
    desc: "קולור גריידינג DaVinci Resolve, עיצוב ומיקס סאונד קולנועי, כתוביות ותרגום רב-לשוני, ומסירה בפורמטים מותאמים לכל מסך ופלטפורמה.",
    color: "hsl(var(--secondary))",
  },
];

export default function AboutSection() {
  return (
    <section id="about" className="py-24 px-4 relative">
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
              <div className="stat-number text-5xl md:text-6xl font-orbitron" style={{ color: "hsl(var(--fg))" }}>
                <OdometerCounter value={s.target} suffix={s.suffix} enableTickSound={true} />
              </div>
              <p
                className="font-orbitron text-[9px] tracking-[3px] uppercase mt-2 font-semibold"
                style={{ color: "hsl(var(--fg-muted))" }}
              >
                {s.label}
              </p>
            </motion.div>
          ))}
        </div>

        {/* ABOUT TEXT & VISUAL */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <p
              className="font-orbitron text-[10px] tracking-[5px] uppercase mb-4 font-bold"
              style={{ color: "hsl(var(--primary))" }}
            >
              ABOUT US · אודות החברה
            </p>
            <h2 className="section-title mb-6" style={{ color: "hsl(var(--fg))" }}>
              מקצה<br />
              <span className="gradient-text">לקצה.</span>
            </h2>
            <div className="space-y-4 text-sm leading-relaxed max-w-lg" style={{ color: "hsl(var(--fg-muted))" }}>
              <p>
                <strong>PSYCHOFLASH</strong> היא חברת הנדסת תוכן ויזואלי והפקות מדיה ישראלית הפועלת משנת 2009 בהובלת <strong>אוריין אדלני</strong>. אנו מפיקים כל פרויקט ברמה הגבוהה ביותר — מועידות גלובליות ואירועי ענק, דרך סרטי תדמית וקמפיינים מסחריים, ועד שידורים חיים מרובי-מצלמות ותוכן מבוסס AI.
              </p>
              <p>
                נבחרת המומחים שלנו כוללת עשרות צלמים, במאים, עורכים, מהנדסי שידור ומומחי AI ופוסט. כולם פועלים בסינרגיה אחת: להבטיח שכל פריים ישדר עוצמה, דיוק ומצוינות בינלאומית.
              </p>
              <p>
                עם למעלה מ-17 שנות ניסיון, מאות לקוחות מרוצים ותשתיות טכנולוגיות מהמתקדמות בעולם, אנחנו הופכים כל חזון ויזואלי למציאות חיה.
              </p>
            </div>
            <div className="mt-8">
              <a href="#contact" className="cyber-btn inline-flex py-3 px-8">
                בואו נדבר על הפרויקט שלכם
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
              {/* Rotating borders */}
              <div
                className="absolute inset-0 rounded-full border"
                style={{
                  borderColor: "hsl(var(--primary) / 0.25)",
                  animation: "rotate-slow 20s linear infinite",
                }}
              />
              <div
                className="absolute inset-4 rounded-full border"
                style={{
                  borderColor: "hsl(var(--secondary) / 0.2)",
                  animation: "rotate-slow 15s linear infinite reverse",
                }}
              />
              <div
                className="absolute inset-8 rounded-full border"
                style={{
                  borderColor: "hsl(var(--primary) / 0.15)",
                  animation: "rotate-slow 10s linear infinite",
                }}
              />

              {/* Center badge */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center p-6 rounded-full glass-card">
                  <div
                    className="font-orbitron text-5xl font-black mb-1"
                    style={{
                      background: "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--secondary)))",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    ⚡
                  </div>
                  <div className="font-orbitron text-xs font-bold tracking-widest" style={{ color: "hsl(var(--fg))" }}>
                    PSYCHOFLASH
                  </div>
                  <div className="font-orbitron text-[9px] tracking-wider mt-1" style={{ color: "hsl(var(--fg-muted))" }}>
                    EST. 2009 · ISRAEL
                  </div>
                </div>
              </div>

              {/* Orbiting dots */}
              {[0, 90, 180, 270].map((angle, i) => (
                <div
                  key={angle}
                  className="absolute w-2 h-2 rounded-full"
                  style={{
                    background: i % 2 === 0 ? "hsl(var(--primary))" : "hsl(var(--secondary))",
                    boxShadow: `0 0 8px ${i % 2 === 0 ? "hsl(var(--primary))" : "hsl(var(--secondary))"}`,
                    top: "50%",
                    left: "50%",
                    transform: `rotate(${angle}deg) translate(140px, -50%)`,
                    animation: `rotate-slow ${20 - i * 2}s linear infinite`,
                    transformOrigin: "-140px 50%",
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
          <p
            className="font-orbitron text-[10px] tracking-[5px] uppercase mb-3 font-bold"
            style={{ color: "hsl(var(--primary))" }}
          >
            OUR METHODOLOGY
          </p>
          <h3 className="section-title gradient-text">עמודי התווך</h3>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {PILLARS.map((pillar, i) => (
            <motion.div
              key={pillar.num}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ x: -4 }}
              className="glass-card p-6 sm:p-7 flex gap-5 group cursor-default"
            >
              <div
                className="font-orbitron text-4xl font-black leading-none shrink-0 opacity-40 group-hover:opacity-100 transition-opacity"
                style={{ color: pillar.color }}
              >
                {pillar.num}
              </div>
              <div>
                <p className="font-orbitron text-[8px] tracking-[3px] uppercase mb-1 font-semibold" style={{ color: "hsl(var(--fg-muted))" }}>
                  {pillar.title}
                </p>
                <h4 className="font-teko text-2xl font-bold mb-2 group-hover:text-primary transition-colors" style={{ color: "hsl(var(--fg))" }}>
                  {pillar.titleHe}
                </h4>
                <p className="text-sm leading-relaxed" style={{ color: "hsl(var(--fg-muted))" }}>
                  {pillar.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
