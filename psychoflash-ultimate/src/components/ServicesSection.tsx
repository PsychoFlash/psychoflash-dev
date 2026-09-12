import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Video, Radio, Clapperboard, Cpu, Globe, Mic, BarChart, MonitorPlay, type LucideIcon } from "lucide-react";
import { SERVICES_DATA } from "@/data/psychoflashData";

const ICON_MAP: Record<string, LucideIcon> = {
  broadcast: Video,
  streaming: Radio,
  creative: Clapperboard,
  ai: Cpu,
  events: Globe,
  "sound-light": Mic,
  web: MonitorPlay,
  data: BarChart,
};

export default function ServicesSection() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  return (
    <section id="services" className="py-24 px-5 relative overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <p className="font-orbitron mb-3" style={{ fontSize: "10px", letterSpacing: "5px", color: "hsl(var(--primary))", textTransform: "uppercase" }}>
            WHAT WE DO · שירותים
          </p>
          <h2 className="section-title mb-3" style={{ color: "hsl(var(--fg))" }}>
            ה<span style={{ color: "hsl(var(--primary))" }}>שירותים</span> שלנו
          </h2>
          <p className="text-sm max-w-lg mx-auto" style={{ color: "hsl(var(--fg-muted))" }}>
            מהפרה-פרודקשן ועד הפוסט — מעטפת מלאה תחת קורת גג אחת.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {SERVICES_DATA.map((cat, i) => {
            const Icon = ICON_MAP[cat.id] ?? Video;
            const isActive = activeCategory === cat.id;
            return (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                whileHover={{ y: -5 }}
                onClick={() => setActiveCategory(isActive ? null : cat.id)}
                className="group cursor-pointer relative overflow-hidden rounded-xl border transition-all duration-300"
                style={{
                  background: isActive
                    ? "linear-gradient(135deg, " + cat.gradientFrom + "22, " + cat.gradientTo + "18)"
                    : "hsl(var(--bg-card) / 0.75)",
                  backdropFilter: "blur(12px)",
                  WebkitBackdropFilter: "blur(12px)",
                  borderColor: isActive ? cat.gradientFrom + "80" : "hsl(var(--border))",
                  boxShadow: isActive ? "0 0 24px " + cat.gradientFrom + "30" : "none",
                }}
              >
                {/* Top accent bar */}
                <div
                  className="absolute top-0 left-0 right-0 h-px transition-opacity duration-300"
                  style={{
                    background: "linear-gradient(90deg, " + cat.gradientFrom + ", " + cat.gradientTo + ")",
                    opacity: isActive ? 1 : 0,
                  }}
                />

                <div className="p-5">
                  {/* Icon + title */}
                  <div className="flex items-center gap-3 mb-3">
                    <div
                      className="w-9 h-9 flex items-center justify-center rounded-lg shrink-0"
                      style={{ background: cat.gradientFrom + "20", border: "1px solid " + cat.gradientFrom + "40" }}
                    >
                      <Icon size={16} style={{ color: cat.gradientFrom }} />
                    </div>
                    <div>
                      <h3 className="font-teko text-lg font-bold leading-tight" style={{ color: "hsl(var(--fg))" }}>
                        {cat.title}
                      </h3>
                    </div>
                  </div>

                  {/* Emoji */}
                  <div className="text-2xl mb-3">{cat.icon}</div>

                  {/* Services preview */}
                  <div className="space-y-2">
                    {cat.services.slice(0, 2).map((svc) => (
                      <div key={svc.id} className="flex items-start gap-2">
                        <div
                          className="mt-1.5 w-1 h-1 rounded-full shrink-0"
                          style={{ background: cat.gradientFrom }}
                        />
                        <div>
                          <p className="font-orbitron text-[9px] tracking-wider font-semibold" style={{ color: cat.gradientFrom }}>
                            {svc.title}
                          </p>
                          <p className="text-[11px] leading-snug mt-0.5" style={{ color: "hsl(var(--fg-muted))" }}>
                            {svc.description.slice(0, 60)}...
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Price callout */}
                  {cat.services[0].price && (
                    <div className="mt-4 pt-3" style={{ borderTop: "1px solid hsl(var(--border))" }}>
                      <span
                        className="font-orbitron text-[10px] font-bold"
                        style={{ color: cat.gradientFrom }}
                      >
                        {cat.services[0].price}
                      </span>
                      {cat.services[0].priceLabel && (
                        <span className="text-[10px] ml-1" style={{ color: "hsl(var(--fg-muted))" }}>
                          · {cat.services[0].priceLabel}
                        </span>
                      )}
                    </div>
                  )}
                </div>

                {/* Expanded details */}
                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-5 space-y-3" style={{ borderTop: "1px solid hsl(var(--border))" }}>
                        {cat.services.map((svc) => (
                          <div key={svc.id} className="pt-3">
                            <p className="font-teko text-sm font-bold mb-1" style={{ color: "hsl(var(--fg))" }}>{svc.title}</p>
                            <p className="text-[11px] leading-relaxed mb-2" style={{ color: "hsl(var(--fg-muted))" }}>{svc.description}</p>
                            {svc.features && (
                              <ul className="space-y-1">
                                {svc.features.map((f) => (
                                  <li key={f} className="flex items-center gap-2 text-[10px]" style={{ color: "hsl(var(--fg-muted))" }}>
                                    <span style={{ color: cat.gradientFrom }}>✓</span> {f}
                                  </li>
                                ))}
                              </ul>
                            )}
                            {svc.price && (
                              <div className="mt-2 font-orbitron text-[11px] font-bold" style={{ color: cat.gradientFrom }}>
                                {svc.price} · {svc.priceLabel}
                                {svc.priceNote && <span className="opacity-60 ml-1 font-normal">{svc.priceNote}</span>}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Hover glow */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background: "radial-gradient(circle at 50% 0%, " + cat.gradientFrom + "08, transparent 70%)",
                  }}
                />
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <a href="#contact" className="cyber-btn py-3 px-8">
            קבל הצעת מחיר
          </a>
        </motion.div>
      </div>
    </section>
  );
}
