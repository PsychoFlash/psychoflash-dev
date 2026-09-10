import { motion } from "framer-motion";
import { Video, Radio, Clapperboard, Cpu, Globe, Plane } from "lucide-react";

const SERVICES = [
  { icon: Video,        title: "הפקת וידאו",     en: "Video Production",   desc: "4K, דרון, FPV. כל פורמט, כל מיקום בעולם.", tags: ["4K", "FPV Drone", "Sony FX"],            accent: "hsl(var(--primary))" },
  { icon: Radio,        title: "שידורים חיים",    en: "Live Broadcast",     desc: "TriCaster, vMix, OB Van. שידור מכל מקום.",  tags: ["Tricaster", "vMix", "Streaming"],        accent: "hsl(var(--secondary))" },
  { icon: Clapperboard, title: "פוסט-פרודקשן",   en: "Post Production",    desc: "עריכה, VFX, קולריינג. מ-A עד Z.",          tags: ["Premiere", "After Effects", "DaVinci"],  accent: "hsl(var(--primary))" },
  { icon: Cpu,          title: "AI Production",   en: "AI Production",      desc: "Runway Gen-3, Kling AI, NeRF. עתיד ההפקה.", tags: ["Runway", "Kling AI", "NeRF"],             accent: "hsl(var(--secondary))" },
  { icon: Globe,        title: "אירועים גלובליים",en: "Global Events",      desc: "ועידות, כנסים, אירועי ענק. 25+ מדינות.",   tags: ["Corporate", "Conference", "Global"],     accent: "hsl(var(--primary))" },
  { icon: Plane,        title: "ניהול פרויקט",    en: "Project Management", desc: "ליווי מלא מהרעיון עד ה-Delivery.",         tags: ["End-to-End", "Team 50+", "On-Time"],     accent: "hsl(var(--secondary))" },
];

export default function ServicesSection() {
  return (
    <section id="services" className="py-20 px-5">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="font-orbitron mb-3" style={{ fontSize: "10px", letterSpacing: "5px", color: "hsl(var(--primary))", textTransform: "uppercase" }}>
            WHAT WE DO
          </p>
          <h2 className="section-title mb-3" style={{ color: "hsl(var(--fg))" }}>השירותים</h2>
          <p className="text-sm max-w-lg mx-auto" style={{ color: "hsl(var(--fg-muted))" }}>
            מהפרה-פרודקשן ועד הפוסט — הכל תחת קורת גג אחת.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {SERVICES.map((s, i) => (
            <motion.div
              key={s.en}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
              whileHover={{ y: -4 }}
              className="glass-card p-6 group cursor-pointer relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-10 h-10 pointer-events-none" style={{ borderTop: `2px solid ${s.accent}`, borderRight: `2px solid ${s.accent}`, opacity: 0.4 }} />
              <div className="w-10 h-10 flex items-center justify-center mb-4 rounded" style={{ background: `${s.accent}15`, border: `1px solid ${s.accent}30` }}>
                <s.icon size={18} style={{ color: s.accent }} />
              </div>
              <h3 className="font-teko text-xl font-bold mb-0.5" style={{ color: "hsl(var(--fg))" }}>{s.title}</h3>
              <p className="font-orbitron mb-2" style={{ fontSize: "9px", letterSpacing: "2px", color: s.accent, textTransform: "uppercase", opacity: 0.7 }}>{s.en}</p>
              <p className="text-sm leading-relaxed mb-4" style={{ color: "hsl(var(--fg-muted))" }}>{s.desc}</p>
              <div className="flex flex-wrap gap-1.5">
                {s.tags.map((tag) => (
                  <span key={tag} className="font-orbitron rounded px-2 py-0.5" style={{ fontSize: "8px", letterSpacing: "1px", border: `1px solid ${s.accent}30`, color: s.accent, background: `${s.accent}08` }}>
                    {tag}
                  </span>
                ))}
              </div>
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{ background: `radial-gradient(circle at 50% 0%, ${s.accent}06, transparent 70%)` }} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
