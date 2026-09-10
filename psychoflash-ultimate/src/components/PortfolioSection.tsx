import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const PORTFOLIO = [
  { title: "ועידת IPS 2026", category: "LIVE", year: "2026", color: "hsl(187,100%,50%)" },
  { title: "StartupX Global Summit", category: "EVENTS", year: "2025", color: "hsl(284,100%,50%)" },
  { title: "AI Horizons Brand Film", category: "VIDEO", year: "2025", color: "hsl(187,100%,50%)" },
  { title: "TechForward Annual Report", category: "VIDEO", year: "2025", color: "hsl(284,100%,50%)" },
  { title: "InnoVentures Live Stream", category: "LIVE", year: "2025", color: "hsl(187,100%,50%)" },
  { title: "PSYCHOFLASH Showreel", category: "VIDEO", year: "2026", color: "hsl(284,100%,50%)" },
  { title: "Red Bull x PsychoFlash", category: "EVENTS", year: "2024", color: "hsl(187,100%,50%)" },
  { title: "MedTech Global Conference", category: "LIVE", year: "2024", color: "hsl(284,100%,50%)" },
  { title: "Cyber Space Documentary", category: "VIDEO", year: "2024", color: "hsl(187,100%,50%)" },
];

const CATEGORIES = ["ALL", "LIVE", "VIDEO", "EVENTS"];

export default function PortfolioSection() {
  const [filter, setFilter] = useState("ALL");

  const filtered = filter === "ALL" ? PORTFOLIO : PORTFOLIO.filter((p) => p.category === filter);

  return (
    <section id="portfolio" className="py-24 px-4 relative">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="font-orbitron text-[10px] tracking-[5px] text-[hsl(284,100%,50%)] uppercase mb-4">
            PORTFOLIO
          </p>
          <h2 className="section-title gradient-text mb-6">הפרויקטים שלנו</h2>

          {/* Filter tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className="font-orbitron text-[9px] tracking-[3px] uppercase px-4 py-2 rounded border transition-all duration-200"
                style={{
                  borderColor:
                    filter === cat ? "hsl(187,100%,50%)" : "hsl(0,0%,100%,0.1)",
                  color: filter === cat ? "hsl(187,100%,50%)" : "hsl(0,0%,100%,0.3)",
                  background:
                    filter === cat ? "hsl(187,100%,50%,0.08)" : "transparent",
                  boxShadow: filter === cat ? "0 0 12px hsl(187,100%,50%,0.2)" : "none",
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((item, i) => (
            <motion.div
              key={item.title}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              whileHover={{ y: -6 }}
              className="glass-card group cursor-pointer overflow-hidden relative"
              style={{ minHeight: 200 }}
            >
              {/* Placeholder BG — in real app would be a thumbnail */}
              <div
                className="absolute inset-0"
                style={{
                  background: `linear-gradient(135deg, hsl(230,20%,4%) 0%, ${item.color}08 100%)`,
                }}
              />

              {/* Grid pattern */}
              <div className="absolute inset-0 grid-pattern opacity-20" />

              {/* Hover glow */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: `radial-gradient(circle at 50% 50%, ${item.color}10 0%, transparent 70%)`,
                }}
              />

              {/* Content */}
              <div className="relative z-10 p-6 h-full flex flex-col justify-between" style={{ minHeight: 200 }}>
                <div>
                  <span
                    className="font-orbitron text-[8px] tracking-[3px] uppercase px-2 py-1 rounded"
                    style={{
                      border: `1px solid ${item.color}40`,
                      color: item.color,
                      background: `${item.color}10`,
                    }}
                  >
                    {item.category}
                  </span>
                </div>
                <div>
                  <h3 className="font-teko text-2xl font-bold text-white mb-1 group-hover:text-[hsl(187,100%,50%)] transition-colors">
                    {item.title}
                  </h3>
                  <p className="font-orbitron text-[9px] tracking-widest text-white/20">{item.year}</p>
                </div>
              </div>

              {/* Corner */}
              <div
                className="absolute top-0 left-0 w-12 h-px opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ background: `linear-gradient(to right, ${item.color}, transparent)` }}
              />
              <div
                className="absolute top-0 left-0 w-px h-12 opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ background: `linear-gradient(to bottom, ${item.color}, transparent)` }}
              />
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-10"
        >
          <a href="#contact" className="cyber-btn cyber-btn-ghost py-3 px-8">
            ראה את כל הפרויקטים →
          </a>
        </motion.div>
      </div>
    </section>
  );
}
