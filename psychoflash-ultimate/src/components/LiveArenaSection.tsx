import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Zap,
  Radio,
  Clock,
  Sparkles,
  ExternalLink,
  ChevronDown,
  X,
  CheckCircle2,
  Users,
} from "lucide-react";
import { FEATURED_PROJECTS } from "@/data/psychoflashData";
import { DYNAMIC_CIRCLES } from "@/components/ProductionCirclesSection";
import OrianElasticCard from "@/components/OrianElasticCard";

const TYPEWRITER_SUGGESTIONS = [
  "חפש: ים המלח וגולייב (שידורי שטח ושטח קיצון)",
  "חפש: מי פנוי להפקה היום / מחר (זמינות מיידית)",
  "חפש: סאן וידאו, איתמר כהן, פסטיבל הפסנתר, לוד",
  "חפש: טריו מגה-ארנה ירושלים, היכל מנורה (ג'וני אוחנה)",
  "חפש: NBA All-Stars דונבן מיטשל MindFly BodyCam",
  "חפש: במת Keynote לאס וגאס Wiz Beyond, מליאה 4K, סיבי SMPTE",
  "חפש: ציוד שידור מאומת: vMix 4K Pro, Sony FX6, ATEM",
];

const POPULAR_TAGS = [
  { id: "available", label: "מי פנוי עכשיו 🟢", query: "מי פנוי" },
  { id: "dead_sea", label: "ים המלח & GoLive 🌊", query: "ים המלח" },
  { id: "sun_video", label: "סאן וידאו & איתמר 🎬", query: "סאן וידאו" },
  { id: "arena", label: "טריו מגה-ארנה (10K+) 🏟️", query: "ארנה" },
  { id: "nba", label: "NBA BodyCam RF 🏀", query: "NBA" },
  { id: "wiz", label: "Wiz לאס וגאס 🌐", query: "Wiz" },
  { id: "ai", label: "שידור AI אוטונומי 🤖", query: "AI" },
];

export default function LiveArenaSection() {
  const [typewriterIdx, setTypewriterIdx] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [charIdx, setCharIdx] = useState(0);
  const [userQuery, setUserQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [scrollScale, setScrollScale] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);

  // Typewriter animation
  useEffect(() => {
    if (isFocused || userQuery.length > 0) return;

    const currentPrompt = TYPEWRITER_SUGGESTIONS[typewriterIdx];
    if (charIdx < currentPrompt.length) {
      const t = setTimeout(() => {
        setDisplayedText(currentPrompt.slice(0, charIdx + 1));
        setCharIdx((prev) => prev + 1);
      }, 40);
      return () => clearTimeout(t);
    } else {
      const t = setTimeout(() => {
        setCharIdx(0);
        setDisplayedText("");
        setTypewriterIdx((prev) => (prev + 1) % TYPEWRITER_SUGGESTIONS.length);
      }, 3000);
      return () => clearTimeout(t);
    }
  }, [charIdx, typewriterIdx, isFocused, userQuery]);

  // Dynamic Scroll-Scale effect: enlarges slightly when entering viewport so user absorbs it
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const vh = window.innerHeight;

      // When near center of viewport, scale up smoothly up to 1.04
      const centerDist = Math.abs(rect.top + rect.height / 2 - vh / 2);
      const proximity = Math.max(0, 1 - centerDist / (vh * 0.7));
      const scale = 1 + proximity * 0.04;
      setScrollScale(scale);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Filter matched results across both Projects and Colleague Circles
  const q = userQuery.trim().toLowerCase();
  const matchedProjects = q
    ? FEATURED_PROJECTS.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.desc.toLowerCase().includes(q) ||
          p.badge.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      ).slice(0, 4)
    : [];

  const matchedCircles = q
    ? DYNAMIC_CIRCLES.filter(
        (c) =>
          c.titleHe.toLowerCase().includes(q) ||
          c.colleaguesHe.toLowerCase().includes(q) ||
          c.ticker.toLowerCase().includes(q) ||
          c.projectTagLabelHe.toLowerCase().includes(q) ||
          (q.includes("פנוי") && c.availabilityStatus === "available_now")
      ).slice(0, 4)
    : [];

  const hasResults = matchedProjects.length > 0 || matchedCircles.length > 0;

  return (
    <section
      id="arena"
      ref={containerRef}
      className="py-12 sm:py-16 px-4 relative z-20"
      style={{
        transform: `scale(${scrollScale})`,
        transition: "transform 0.25s cubic-bezier(0.2, 0.8, 0.2, 1)",
      }}
    >
      <div className="max-w-4xl mx-auto">
        {/* Top Header Badge */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-amber-500/40 bg-amber-500/10 backdrop-blur-md shadow-lg shadow-amber-500/5 mb-3">
            <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
            <span className="font-orbitron text-[10px] tracking-[3px] text-amber-300 font-bold uppercase">
              LIVE ARENA · זירת ההפקה והחיפוש המרכזית
            </span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-foreground">
            השורת חיפוש שעושה הכל
          </h2>
          <p className="text-xs sm:text-sm text-foreground-muted mt-1 max-w-xl mx-auto leading-relaxed">
            איתור מיידי של הפקות, זמינות מעגלי עבודה ב<strong className="text-primary">"מי פנוי"</strong>, ציוד שידור מאומת ודינמיקות הקולגות.
          </p>
        </div>

        {/* The Omni-Search Bar */}
        <OrianElasticCard pullStrength={10} tiltAngle={3}>
          <div
            className={`p-2 sm:p-2.5 rounded-2xl border transition-all duration-300 shadow-2xl relative ${
              isFocused
                ? "border-primary shadow-primary/20 bg-card/95 ring-2 ring-primary/20"
                : "border-primary/40 bg-card/85 hover:border-primary/70"
            }`}
            style={{
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              boxShadow: "0 20px 40px -15px rgba(0,0,0,0.5), 0 0 25px hsl(var(--primary) / 0.12)",
            }}
          >
            <div className="flex items-center gap-3">
              {/* Left Search Icon with pulse */}
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 border border-primary/40 shadow-inner"
                style={{
                  background: "linear-gradient(135deg, hsl(var(--primary) / 0.25), hsl(var(--primary) / 0.08))",
                }}
              >
                <Search size={18} className="text-primary" />
              </div>

              {/* Input Area */}
              <div className="flex-1 relative" dir="rtl">
                <input
                  type="text"
                  value={userQuery}
                  onChange={(e) => setUserQuery(e.target.value)}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setTimeout(() => setIsFocused(false), 200)}
                  placeholder={displayedText || "הקלד לחיפוש הפקה, קולגה, ציוד או 'מי פנוי'..."}
                  className="w-full bg-transparent border-none outline-none text-sm sm:text-base font-medium text-foreground placeholder:text-foreground-muted/60"
                  aria-label="שורת חיפוש זירת ההפקה"
                />
              </div>

              {/* Clear Button */}
              {userQuery && (
                <button
                  onClick={() => setUserQuery("")}
                  className="w-8 h-8 rounded-full flex items-center justify-center text-foreground-muted hover:text-white hover:bg-white/10 transition-colors"
                >
                  <X size={14} />
                </button>
              )}

              {/* Quick WhatsApp Action Button */}
              <a
                href={`https://wa.me/972542559027?text=${encodeURIComponent(
                  userQuery ? `שלום אוריין, חיפשתי בזירת ההפקות של PSYCHOFLASH לגבי "${userQuery}"...` : "שלום אוריין, אשמח לברר לגבי הפקה ותיאום זמנים."
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="cyber-btn py-2.5 px-4 sm:px-6 text-xs font-bold font-orbitron flex items-center gap-2 shrink-0 shadow-md"
              >
                <span>{userQuery ? "שאל את אוריין" : "בדוק זמינות"}</span>
                <ExternalLink size={12} />
              </a>
            </div>

            {/* Instant Search Results Dropdown Overlay */}
            <AnimatePresence>
              {q.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="mt-3 pt-3 border-t border-border/50 space-y-4 max-h-[380px] overflow-y-auto custom-scrollbar"
                  dir="rtl"
                >
                  {/* Matched Colleague Dynamic Circles */}
                  {matchedCircles.length > 0 && (
                    <div>
                      <div className="text-[10px] font-orbitron text-primary font-bold tracking-wider mb-2 flex items-center gap-1.5">
                        <Users size={12} />
                        <span>מעגלי הפקה וקולגות בבורסה ({matchedCircles.length})</span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {matchedCircles.map((circle) => (
                          <a
                            key={circle.id}
                            href="#synergy"
                            className="p-3 rounded-xl border border-border/60 bg-black/40 hover:border-primary/70 transition-all flex items-start justify-between gap-3 group"
                          >
                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                <span className="font-mono text-[10px] font-bold text-primary px-1.5 py-0.2 rounded bg-primary/15">
                                  {circle.ticker}
                                </span>
                                <span className="text-xs font-bold text-foreground group-hover:text-primary transition-colors">
                                  {circle.titleHe}
                                </span>
                              </div>
                              <p className="text-[11px] text-foreground-muted">{circle.colleaguesHe}</p>
                            </div>
                            <span className="text-xs font-mono font-bold text-emerald-400 shrink-0">
                              ₪{circle.valuationShekels.toLocaleString()}
                            </span>
                          </a>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Matched Portfolio Projects */}
                  {matchedProjects.length > 0 && (
                    <div>
                      <div className="text-[10px] font-orbitron text-amber-400 font-bold tracking-wider mb-2 flex items-center gap-1.5">
                        <Zap size={12} />
                        <span>פרויקטים והפקות מתאימות ({matchedProjects.length})</span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {matchedProjects.map((proj) => (
                          <a
                            key={proj.id}
                            href="#portfolio"
                            className="p-3 rounded-xl border border-border/60 bg-black/40 hover:border-amber-500/70 transition-all flex items-center gap-3 group"
                          >
                            <img
                              src={proj.image}
                              alt={proj.title}
                              className="w-12 h-10 object-cover rounded-md border border-border/40 shrink-0"
                            />
                            <div className="min-w-0">
                              <span className="text-xs font-bold text-foreground group-hover:text-amber-300 transition-colors block truncate">
                                {proj.title}
                              </span>
                              <span className="text-[10px] text-foreground-muted font-orbitron block">
                                {proj.badge} · {proj.year}
                              </span>
                            </div>
                          </a>
                        ))}
                      </div>
                    </div>
                  )}

                  {!hasResults && (
                    <div className="text-center py-6 text-foreground-muted text-xs">
                      לא נמצאה תוצאה ישירה עבור "{userQuery}". רוצה לתאם מפרט מותאם אישית?{" "}
                      <a
                        href={`https://wa.me/972542559027?text=${encodeURIComponent(`שלום אוריין, חיפשתי "${userQuery}" באתר PSYCHOFLASH...`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary font-bold underline"
                      >
                        לחץ כאן לשאלות ישירות בוואטסאפ
                      </a>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </OrianElasticCard>

        {/* Popular Instant Search Chips */}
        <div className="flex items-center justify-center gap-2 flex-wrap mt-4">
          <span className="text-[10px] font-orbitron text-foreground-muted font-bold ml-1">חיפושים נבחרים:</span>
          {POPULAR_TAGS.map((tag) => (
            <button
              key={tag.id}
              onClick={() => setUserQuery(tag.query)}
              className="px-3 py-1 rounded-full text-xs font-medium border border-border/60 bg-black/30 hover:border-primary text-foreground-muted hover:text-foreground transition-all hover:scale-105"
            >
              {tag.label}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
