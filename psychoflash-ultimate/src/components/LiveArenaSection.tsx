import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Radio, Eye, Zap } from "lucide-react";

const ARENA_ITEMS = [
  { name: "MedTech Circle", members: 12, badge: "LIVE", color: "hsl(187,100%,50%)" },
  { name: "Cyber Defense", members: 8, badge: "HOT", color: "hsl(284,100%,50%)" },
  { name: "Space & Aerial", members: 15, badge: "LIVE", color: "hsl(187,100%,50%)" },
  { name: "Music & Sound", members: 6, badge: "NEW", color: "hsl(284,100%,50%)" },
  { name: "AI Production", members: 20, badge: "TOP", color: "hsl(187,100%,50%)" },
  { name: "Global Events", members: 9, badge: "LIVE", color: "hsl(284,100%,50%)" },
];

const TYPEWRITER_TEXTS = [
  "חפש הפקות וידאו לועידה בינלאומית...",
  "Search AI production for startup summit...",
  "חפש שידור חי לאירוע ב-5000 אנשים...",
  "Find drone cinematography for real estate...",
];

export default function LiveArenaSection() {
  const [textIdx, setTextIdx] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [charIdx, setCharIdx] = useState(0);

  useEffect(() => {
    const target = TYPEWRITER_TEXTS[textIdx];
    if (charIdx < target.length) {
      const t = setTimeout(() => {
        setDisplayed(target.slice(0, charIdx + 1));
        setCharIdx(charIdx + 1);
      }, 45);
      return () => clearTimeout(t);
    } else {
      const t = setTimeout(() => {
        setCharIdx(0);
        setDisplayed("");
        setTextIdx((prev) => (prev + 1) % TYPEWRITER_TEXTS.length);
      }, 2500);
      return () => clearTimeout(t);
    }
  }, [charIdx, textIdx]);

  return (
    <section id="arena" className="py-24 px-4 relative overflow-hidden">
      {/* BG effect */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% 50%, hsl(187,100%,50%,0.03) 0%, transparent 70%)",
        }}
      />
      <div className="absolute top-0 inset-x-0 h-px"
        style={{ background: "linear-gradient(to right, transparent, hsl(284,100%,50%,0.3), hsl(187,100%,50%,0.3), transparent)" }} />

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="live-dot" />
            <span className="font-orbitron text-[9px] tracking-[5px] text-green-400 uppercase">LIVE 24/7</span>
          </div>
          <h2 className="section-title gradient-text mb-4">LIVE ARENA</h2>
          <p className="text-white/40 text-sm max-w-lg mx-auto">
            ה-Marketplace החי של PSYCHOFLASH — פרויקטים, מעגלי עבודה, הזדמנויות בזמן אמת.
          </p>
        </motion.div>

        {/* Search bar */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative max-w-2xl mx-auto mb-12"
        >
          <div className="glass-card p-1 flex items-center gap-3"
            style={{ borderColor: "hsl(187,100%,50%,0.2)", boxShadow: "0 0 30px hsl(187,100%,50%,0.05)" }}>
            <div className="w-10 h-10 flex items-center justify-center shrink-0">
              <Zap size={16} style={{ color: "hsl(187,100%,50%)" }} />
            </div>
            <div className="flex-1 font-['Inter'] text-sm text-white/30 py-2" dir="rtl">
              {displayed}
              <span className="inline-block w-px h-4 bg-[hsl(187,100%,50%)] mr-0.5 animate-pulse" />
            </div>
            <button className="cyber-btn text-xs py-2 px-4 shrink-0">חפש</button>
          </div>
        </motion.div>

        {/* Arena Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-12">
          {ARENA_ITEMS.map((item, i) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              whileHover={{ y: -4, scale: 1.03 }}
              className="glass-card p-4 cursor-pointer group relative overflow-hidden"
            >
              {/* Badge */}
              <div className="flex justify-between items-start mb-3">
                <span
                  className="font-orbitron text-[8px] tracking-wider px-1.5 py-0.5 rounded"
                  style={{ border: `1px solid ${item.color}40`, color: item.color, background: `${item.color}10` }}
                >
                  {item.badge}
                </span>
                <div className="live-dot" style={{ width: 5, height: 5, opacity: item.badge === "LIVE" ? 1 : 0 }} />
              </div>

              {/* Circle icon */}
              <div
                className="w-10 h-10 rounded-full mx-auto mb-3 flex items-center justify-center"
                style={{
                  background: `${item.color}15`,
                  border: `1px solid ${item.color}30`,
                  boxShadow: `0 0 12px ${item.color}10`,
                }}
              >
                <Radio size={14} style={{ color: item.color }} />
              </div>

              <p className="font-teko text-sm font-bold text-white text-center leading-tight mb-1">
                {item.name}
              </p>
              <div className="flex items-center justify-center gap-1">
                <Eye size={9} className="text-white/20" />
                <span className="font-orbitron text-[8px] text-white/20">{item.members}</span>
              </div>

              {/* Hover glow */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{ background: `radial-gradient(circle at 50% 50%, ${item.color}08, transparent 70%)` }}
              />
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <a href="#contact" className="cyber-btn py-3 px-10">
            <Radio size={14} />
            הצטרף ל-ARENA
          </a>
        </motion.div>
      </div>
    </section>
  );
}
