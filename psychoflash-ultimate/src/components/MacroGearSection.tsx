import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Camera, Eye, X, Cpu, Radio, Sparkles, Layers } from "lucide-react";

interface GearItem {
  id: string;
  titleHe: string;
  category: "switchers" | "control" | "cameras" | "audio" | "ai";
  categoryLabelHe: string;
  src: string;
  gearSpecs: string;
  descHe: string;
}

const GEAR_ITEMS: GearItem[] = [
  {
    id: "photo-tbar",
    titleHe: "ידית מעבר T-Bar — מתג שידור 4K (Google Photos)",
    category: "switchers",
    categoryLabelHe: "מתגי שידור",
    src: "/images/bts/macro_tbar_switcher.jpg",
    gearSpecs: "Blackmagic ATEM Precision T-Bar · Zero Latency",
    descHe: "שליטה ידנית מילימטרית על דיזולבים, וואייפים ומעברים חיים בזמן שידור קריטי (מתוך ארכיון Google Photos של אוריין אדלני).",
  },
  {
    id: "photo-cam-buttons",
    titleHe: "לחצני ניתוב מצלמות מוארים בזמן שידור חי",
    category: "switchers",
    categoryLabelHe: "מתגי שידור",
    src: "/images/bts/macro_switcher_buttons.jpg",
    gearSpecs: "Broadcast Switcher Bus Matrix · Tactile Mechanical",
    descHe: "ניתוב מיידי בין מצלמות ראשיות, רחפנים וגרפיקה בעצימות אור מותאמת לאולפן חשוך.",
  },
  {
    id: "photo-cbs-tally",
    titleHe: "תצוגת טאלי NCAA on CBS וניתוב שטח",
    category: "switchers",
    categoryLabelHe: "מתגי שידור",
    src: "/images/bts/macro_ncaa_cbs_tally.jpg",
    gearSpecs: "CBS Sports Broadcast Roster · Multi-Tally Matrix",
    descHe: "אינדיקציית שידור חיה ישירה מול ערוצי השידור הבינלאומיים.",
  },
  {
    id: "photo-concert-monitor",
    titleHe: "מוניטור במאי צמוד במה — הופעה חיה בתיאטרון",
    category: "cameras",
    categoryLabelHe: "מצלמות ועדשות",
    src: "/images/bts/concert_monitor_bts.jpg",
    gearSpecs: "Sony FX6 · SmallHD High-Bright · Shutter 1/50 WB 4500K",
    descHe: "צילום וידאו סטטי מנקודת מבט הבמאי, לכידת אווירה, תאורת נגד והופעה חיה.",
  },
  {
    id: "photo-audio-knobs",
    titleHe: "פוטנציומטרים וקונסולת מיקס שידורי",
    category: "audio",
    categoryLabelHe: "סאונד ורשת",
    src: "/images/bts/macro_audio_console_knobs.jpg",
    gearSpecs: "Analog/Digital Console Controls · Color Coded Pots",
    descHe: "כיוון מהיר של ערוצי שירה, כלי נגינה ומיקס סטרילי לשידור.",
  },
  {
    id: "photo-control-room",
    titleHe: "חדר בקרה שידורית Master Control Room",
    category: "control",
    categoryLabelHe: "חדרי בקרה",
    src: "/images/bts/macro_bnc_cables_rack.jpg",
    gearSpecs: "BNC 12G-SDI Matrix Routing · Multiview Grid",
    descHe: "פיקוח בו-זמני על 16 ערוצי וידאו, טלמטריה, שידורי לוויין והקלטות ISO מקבילות.",
  },
  {
    id: "photo-sound-spectrum",
    titleHe: "ספקטרום אנליזה ורשת אודיו Dante",
    category: "audio",
    categoryLabelHe: "סאונד ורשת",
    src: "/images/bts/macro_audio_console_knobs.jpg",
    gearSpecs: "Dante Digital Audio · Multi-channel DSP · R128",
    descHe: "כיול תדרים מדויק, ביטול רעשים אקוסטיים והבטחת איכות שמע ללא פשרות.",
  },
  {
    id: "photo-ai-dashboard",
    titleHe: "דשבורד ועיבוד וידאו מבוסס AI",
    category: "ai",
    categoryLabelHe: "AI ופוסט",
    src: "/images/gear/photo-ai-dashboard.jpg",
    gearSpecs: "Custom AI Video Inference · ComfyUI · Runway Gen-3",
    descHe: "שילוב בינה מלאכותית בתהליך העריכה, שיפור חדות וסינתזת תוכן ויזואלי מתקדם.",
  },
  {
    id: "photo-workstation",
    titleHe: "תחנת עבודה לעריכה ומאסטרינג DaVinci",
    category: "ai",
    categoryLabelHe: "AI ופוסט",
    src: "/images/gear/photo-workstation.jpg",
    gearSpecs: "DaVinci Resolve Studio · Color Grading Surface",
    descHe: "תיקוני צבע ב-HDR, עיבוד פסקול קולנועי ומאסטרינג בפורמט ProRes 422 HQ.",
  },
  {
    id: "wiz-beyond-event",
    titleHe: "הפקה חיה — אירועי טכנולוגיה וסייבר גלובליים",
    category: "control",
    categoryLabelHe: "חדרי בקרה",
    src: "/images/gear/wiz-beyond-event.png",
    gearSpecs: "Hybrid Event Production · Live Streaming Ecosystem",
    descHe: "שידור ועידות בינלאומיות לעשרות אלפי צופים ברחבי העולם באיכות שידור עילית.",
  },
];

const CATEGORIES = [
  { id: "all", labelHe: "כל המאגר" },
  { id: "switchers", labelHe: "מתגי שידור ו-T-Bar" },
  { id: "control", labelHe: "חדרי בקרה ו-MCR" },
  { id: "cameras", labelHe: "מצלמות וקולנוע" },
  { id: "audio", labelHe: "סאונד ו-Dante" },
  { id: "ai", labelHe: "AI ופוסט DaVinci" },
];

export default function MacroGearSection() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedGear, setSelectedGear] = useState<GearItem | null>(null);

  const filteredItems = activeCategory === "all"
    ? GEAR_ITEMS
    : GEAR_ITEMS.filter((g) => g.category === activeCategory);

  return (
    <div id="gear" className="w-full max-w-6xl mx-auto px-6 py-16">
      {/* Header */}
      <div className="text-center mb-10">
        <div
          className="inline-flex items-center gap-2 mb-3 px-4 py-1.5 rounded-full border text-[11px] font-orbitron tracking-widest uppercase"
          style={{
            borderColor: "hsl(var(--primary) / 0.4)",
            background: "hsl(var(--primary) / 0.08)",
            color: "hsl(var(--primary))",
          }}
        >
          <Camera size={13} />
          <span>PRODUCTION GEAR & MACRO CLOSE-UPS</span>
        </div>
        <h2 className="font-teko text-4xl sm:text-5xl font-bold tracking-tight mb-3" style={{ color: "hsl(var(--fg))" }}>
          ציוד הפקה אמיתי ומאקרו מאחורי הקלעים
        </h2>
        <p className="max-w-2xl mx-auto text-sm sm:text-base leading-relaxed" style={{ color: "hsl(var(--fg-muted))" }}>
          קלוז-אפים אותנטיים מרגעי השידור, מתגי הניתוב, המצלמות ושרתי האודיו שמרכיבים כל הפקה של PSYCHOFLASH.
        </p>
      </div>

      {/* Category Pills */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
        {CATEGORIES.map((c) => {
          const isActive = c.id === activeCategory;
          return (
            <button
              key={c.id}
              onClick={() => setActiveCategory(c.id)}
              className={`px-4 py-2 rounded-xl border text-xs font-semibold transition-all duration-200 ${
                isActive ? "shadow-md scale-[1.02]" : "hover:border-primary/40 opacity-80 hover:opacity-100"
              }`}
              style={{
                background: isActive ? "hsl(var(--primary) / 0.16)" : "hsl(var(--card))",
                borderColor: isActive ? "hsl(var(--primary))" : "hsl(var(--border))",
                color: isActive ? "hsl(var(--fg))" : "hsl(var(--fg-muted))",
              }}
            >
              {c.labelHe}
            </button>
          );
        })}
      </div>

      {/* Image Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredItems.map((item) => (
          <motion.div
            key={item.id}
            layout
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            onClick={() => setSelectedGear(item)}
            className="group relative rounded-2xl overflow-hidden border cursor-pointer aspect-4/3 shadow-md"
            style={{
              borderColor: "hsl(var(--border))",
              background: "hsl(var(--card))",
            }}
          >
            <img
              src={item.src}
              alt={item.titleHe}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />

            {/* Dark gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />

            {/* Card Content */}
            <div className="absolute inset-0 p-4 flex flex-col justify-between z-10 text-white">
              <div className="flex items-center justify-between">
                <span className="text-[9px] font-orbitron font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-black/50 border border-white/20">
                  {item.categoryLabelHe}
                </span>
                <div className="w-6 h-6 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Eye size={12} className="text-white" />
                </div>
              </div>

              <div>
                <h3 className="font-bold text-sm leading-snug line-clamp-1">
                  {item.titleHe}
                </h3>
                <p className="text-[10px] text-white/70 line-clamp-1 mt-0.5 font-mono">
                  {item.gearSpecs}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Lightbox / Detail Modal */}
      <AnimatePresence>
        {selectedGear && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedGear(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-3xl rounded-2xl overflow-hidden border shadow-2xl z-10 flex flex-col"
              style={{
                background: "hsl(var(--card))",
                borderColor: "hsl(var(--primary) / 0.5)",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div
                className="px-5 py-3 border-b flex items-center justify-between"
                style={{ borderColor: "hsl(var(--border))" }}
              >
                <div className="flex items-center gap-2">
                  <span className="font-orbitron text-xs font-bold uppercase tracking-wider" style={{ color: "hsl(var(--primary))" }}>
                    {selectedGear.gearSpecs}
                  </span>
                </div>
                <button
                  onClick={() => setSelectedGear(null)}
                  className="p-1.5 rounded-lg hover:bg-primary/10 transition-colors"
                  style={{ color: "hsl(var(--fg))" }}
                >
                  <X size={18} />
                </button>
              </div>

              {/* Photo */}
              <div className="relative aspect-16/10 bg-black">
                <img
                  src={selectedGear.src}
                  alt={selectedGear.titleHe}
                  className="w-full h-full object-contain"
                />
              </div>

              {/* Details footer */}
              <div className="p-5 border-t space-y-1.5" style={{ borderColor: "hsl(var(--border))", background: "hsl(var(--bg) / 0.5)" }}>
                <h3 className="font-teko text-2xl font-bold" style={{ color: "hsl(var(--fg))" }}>
                  {selectedGear.titleHe}
                </h3>
                <p className="text-xs leading-relaxed" style={{ color: "hsl(var(--fg-muted))" }}>
                  {selectedGear.descHe}
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
