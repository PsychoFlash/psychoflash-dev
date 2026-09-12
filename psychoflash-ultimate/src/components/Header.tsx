import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon, Sparkles, Menu, X, ChevronDown, Clock } from "lucide-react";
import { useCircadian } from "@/hooks/CircadianThemeContext";
import type { ThemeMode } from "@/hooks/useCircadianTheme";

const NAV = [
  { label: "תיק עבודות נבחר", href: "#portfolio" },
  { label: "בורסת מעגלי הפקה", href: "#synergy" },
  { label: "אוריין אדלני · אודות", href: "#about" },
  { label: "יצירת קשר מהיר", href: "#contact" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [themeMenuOpen, setThemeMenuOpen] = useState(false);
  const themeMenuRef = useRef<HTMLDivElement>(null);

  const { mode, setMode, isEffectiveLight, solarPhase } = useCircadian();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  // Close theme popover when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (themeMenuRef.current && !themeMenuRef.current.contains(e.target as Node)) {
        setThemeMenuOpen(false);
      }
    };
    if (themeMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [themeMenuOpen]);

  const selectTheme = (newMode: ThemeMode) => {
    setMode(newMode);
    setThemeMenuOpen(false);
  };

  return (
    <header
      className="fixed top-0 inset-x-0 z-50 transition-all duration-400"
      style={{
        background: scrolled
          ? isEffectiveLight
            ? "hsl(var(--bg) / 0.94)"
            : "hsl(var(--bg) / 0.92)"
          : "transparent",
        backdropFilter: scrolled ? "blur(16px)" : "none",
        borderBottom: scrolled ? "1px solid hsl(var(--border))" : "1px solid transparent",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-[64px] flex items-center justify-between gap-4">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2.5 shrink-0" aria-label="PSYCHOFLASH ראשי">
          <div
            className="w-7 h-7 border flex items-center justify-center transition-colors"
            style={{ borderColor: "hsl(var(--primary))" }}
          >
            <div
              className="w-2.5 h-2.5 transition-transform duration-300 group-hover:scale-125"
              style={{ background: "hsl(var(--primary))", clipPath: "polygon(50% 0%, 100% 100%, 0% 100%)" }}
            />
          </div>
          <span className="font-orbitron font-black text-sm tracking-[0.12em]" style={{ color: "hsl(var(--fg))" }}>
            PSYCHO<span style={{ color: "hsl(var(--primary))" }}>FLASH</span>
          </span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
          {NAV.map((n) => (
            <a key={n.href} href={n.href} className="nav-link">
              {n.label}
            </a>
          ))}
        </nav>

        {/* Actions & Dynamic Theme Selector */}
        <div className="flex items-center gap-2.5">
          {/* Circadian / Theme Popover Button */}
          <div className="relative" ref={themeMenuRef}>
            <button
              onClick={() => setThemeMenuOpen(!themeMenuOpen)}
              className="h-9 px-2.5 sm:px-3 flex items-center gap-2 rounded-lg border text-xs font-orbitron transition-all duration-200"
              style={{
                background: themeMenuOpen ? "hsl(var(--primary) / 0.12)" : "hsl(var(--glass))",
                borderColor: themeMenuOpen ? "hsl(var(--primary))" : "hsl(var(--border))",
                color: "hsl(var(--fg))",
              }}
              title="בחר מצב תצוגה / סנכרון שמש דינמי"
              aria-expanded={themeMenuOpen}
              aria-label="תפריט בחירת מצב תצוגה ושעת שמש"
            >
              {mode === "circadian" ? (
                <>
                  <span className="text-sm leading-none">{solarPhase.icon}</span>
                  <span className="hidden sm:inline-block text-[11px] font-medium tracking-wide">
                    {solarPhase.timeFormatted}
                  </span>
                  <span
                    className="w-1.5 h-1.5 rounded-full animate-pulse"
                    style={{ background: "hsl(var(--primary))" }}
                  />
                </>
              ) : mode === "light" ? (
                <>
                  <Sun size={15} style={{ color: "hsl(var(--primary))" }} />
                  <span className="hidden sm:inline-block text-[11px] font-medium">יום</span>
                </>
              ) : (
                <>
                  <Moon size={15} style={{ color: "hsl(var(--primary))" }} />
                  <span className="hidden sm:inline-block text-[11px] font-medium">לילה</span>
                </>
              )}
              <ChevronDown size={13} className={`opacity-60 transition-transform ${themeMenuOpen ? "rotate-180" : ""}`} />
            </button>

            {/* Popover Menu */}
            <AnimatePresence>
              {themeMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 6, scale: 0.96 }}
                  transition={{ duration: 0.18 }}
                  className="absolute left-0 mt-2 w-72 p-2 rounded-xl shadow-2xl z-50 glass-card"
                  style={{
                    background: isEffectiveLight ? "hsl(0 0% 100% / 0.95)" : "hsl(350 45% 8% / 0.95)",
                    borderColor: "hsl(var(--border))",
                  }}
                  dir="rtl"
                >
                  <div className="px-3 py-2 border-b mb-1.5 flex items-center justify-between" style={{ borderColor: "hsl(var(--border))" }}>
                    <div className="flex items-center gap-1.5">
                      <Clock size={12} style={{ color: "hsl(var(--primary))" }} />
                      <span className="text-[11px] font-orbitron font-bold" style={{ color: "hsl(var(--fg))" }}>
                        ערכת נושא ותאורה
                      </span>
                    </div>
                    <span className="text-[10px] font-mono opacity-60" style={{ color: "hsl(var(--fg-muted))" }}>
                      {solarPhase.timeFormatted}
                    </span>
                  </div>

                  {/* Option 1: Circadian Auto */}
                  <button
                    onClick={() => selectTheme("circadian")}
                    className="w-full text-right p-2.5 rounded-lg flex items-start gap-2.5 transition-colors group mb-1"
                    style={{
                      background: mode === "circadian" ? "hsl(var(--primary) / 0.1)" : "transparent",
                      border: mode === "circadian" ? "1px solid hsl(var(--primary) / 0.35)" : "1px solid transparent",
                    }}
                  >
                    <span className="text-lg mt-0.5">{solarPhase.icon}</span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold" style={{ color: "hsl(var(--fg))" }}>
                          סנכרון שמש דינמי (מומלץ)
                        </span>
                        {mode === "circadian" && (
                          <span
                            className="text-[9px] px-1.5 py-0.5 rounded font-orbitron"
                            style={{ background: "hsl(var(--primary))", color: "hsl(var(--bg))" }}
                          >
                            פעיל
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] mt-0.5" style={{ color: "hsl(var(--fg-muted))" }}>
                        מתכוונן לפי הדקה: {solarPhase.labelHe} ({solarPhase.colorTempK}K)
                      </p>
                    </div>
                  </button>

                  {/* Option 2: Light Mode */}
                  <button
                    onClick={() => selectTheme("light")}
                    className="w-full text-right p-2.5 rounded-lg flex items-start gap-2.5 transition-colors group mb-1"
                    style={{
                      background: mode === "light" ? "hsl(var(--primary) / 0.1)" : "transparent",
                      border: mode === "light" ? "1px solid hsl(var(--primary) / 0.35)" : "1px solid transparent",
                    }}
                  >
                    <div className="p-1 rounded bg-amber-500/10 text-amber-500 mt-0.5">
                      <Sun size={16} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold" style={{ color: "hsl(var(--fg))" }}>
                          מצב יום (בהיר)
                        </span>
                        {mode === "light" && (
                          <span
                            className="text-[9px] px-1.5 py-0.5 rounded font-orbitron"
                            style={{ background: "hsl(var(--primary))", color: "hsl(var(--bg))" }}
                          >
                            נעול
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] mt-0.5" style={{ color: "hsl(var(--fg-muted))" }}>
                        שמפניה חמימה, קריאות גבוהה וניגודיות מלאה
                      </p>
                    </div>
                  </button>

                  {/* Option 3: Dark Mode */}
                  <button
                    onClick={() => selectTheme("dark")}
                    className="w-full text-right p-2.5 rounded-lg flex items-start gap-2.5 transition-colors group"
                    style={{
                      background: mode === "dark" ? "hsl(var(--primary) / 0.1)" : "transparent",
                      border: mode === "dark" ? "1px solid hsl(var(--primary) / 0.35)" : "1px solid transparent",
                    }}
                  >
                    <div className="p-1 rounded bg-purple-500/10 text-purple-400 mt-0.5">
                      <Moon size={16} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold" style={{ color: "hsl(var(--fg))" }}>
                          מצב לילה (כהה)
                        </span>
                        {mode === "dark" && (
                          <span
                            className="text-[9px] px-1.5 py-0.5 rounded font-orbitron"
                            style={{ background: "hsl(var(--primary))", color: "hsl(var(--bg))" }}
                          >
                            נעול
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] mt-0.5" style={{ color: "hsl(var(--fg-muted))" }}>
                        סייבר-יין עמוק, זהב וניאון חללי
                      </p>
                    </div>
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* CTA quote button */}
          <a href="#contact" className="hidden sm:inline-flex cyber-btn py-2 px-5 text-[0.65rem]">
            הצעת מחיר
          </a>

          {/* Mobile menu hamburger */}
          <button
            onClick={() => setOpen(!open)}
            className="lg:hidden w-9 h-9 flex items-center justify-center rounded-lg border transition-colors"
            style={{ background: "hsl(var(--border) / 0.4)", borderColor: "hsl(var(--border))", color: "hsl(var(--fg))" }}
            aria-label={open ? "סגור תפריט" : "פתח תפריט"}
          >
            {open ? <X size={17} /> : <Menu size={17} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="lg:hidden overflow-hidden glass-card border-b"
            style={{
              background: isEffectiveLight ? "hsl(0 0% 100% / 0.98)" : "hsl(350 45% 7% / 0.98)",
              borderColor: "hsl(var(--border))",
            }}
          >
            <nav className="px-5 py-4 flex flex-col gap-1">
              {NAV.map((n, i) => (
                <motion.a
                  key={n.href}
                  href={n.href}
                  initial={{ x: 16, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: i * 0.03 }}
                  onClick={() => setOpen(false)}
                  className="py-2.5 font-orbitron text-[11px] tracking-widest uppercase transition-colors"
                  style={{ borderBottom: "1px solid hsl(var(--border))", color: "hsl(var(--fg))", textDecoration: "none" }}
                >
                  {n.label}
                </motion.a>
              ))}

              {/* Mobile theme toggle row */}
              <div className="pt-3 pb-2 flex items-center justify-between text-xs" style={{ color: "hsl(var(--fg-muted))" }}>
                <span>מצב תאורה:</span>
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => selectTheme("circadian")}
                    className={`px-2 py-1 rounded text-[10px] font-orbitron border ${mode === "circadian" ? "border-primary text-primary" : "border-border"}`}
                  >
                    {solarPhase.icon} אוטומטי
                  </button>
                  <button
                    onClick={() => selectTheme("light")}
                    className={`px-2 py-1 rounded text-[10px] font-orbitron border ${mode === "light" ? "border-primary text-primary" : "border-border"}`}
                  >
                    ☀️ יום
                  </button>
                  <button
                    onClick={() => selectTheme("dark")}
                    className={`px-2 py-1 rounded text-[10px] font-orbitron border ${mode === "dark" ? "border-primary text-primary" : "border-border"}`}
                  >
                    🌙 לילה
                  </button>
                </div>
              </div>

              <a
                href="#contact"
                onClick={() => setOpen(false)}
                className="cyber-btn text-center justify-center mt-3 py-3"
              >
                הצעת מחיר מיידית
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
