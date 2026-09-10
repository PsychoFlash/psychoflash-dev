import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon, Menu, X } from "lucide-react";

const NAV = [
  { label: "שירותים", href: "#services" },
  { label: "פרויקטים", href: "#portfolio" },
  { label: "מחירים", href: "#pricing" },
  { label: "אודות", href: "#about" },
  { label: "צור קשר", href: "#contact" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [dark, setDark] = useState(true);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const toggleTheme = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("light", !next);
  };

  return (
    <header
      className="fixed top-0 inset-x-0 z-50 transition-all duration-400"
      style={{
        background: scrolled ? "hsl(var(--bg) / 0.92)" : "transparent",
        backdropFilter: scrolled ? "blur(16px)" : "none",
        borderBottom: scrolled ? "1px solid hsl(var(--border))" : "1px solid transparent",
      }}
    >
      <div className="max-w-6xl mx-auto px-5 h-[60px] flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2 shrink-0">
          <div className="w-7 h-7 border flex items-center justify-center" style={{ borderColor: "hsl(var(--primary))" }}>
            <div className="w-2.5 h-2.5" style={{ background: "hsl(var(--primary))", clipPath: "polygon(50% 0%, 100% 100%, 0% 100%)" }} />
          </div>
          <span className="font-orbitron font-black text-sm tracking-[0.12em]" style={{ color: "hsl(var(--fg))" }}>
            PSYCHO<span style={{ color: "hsl(var(--primary))" }}>FLASH</span>
          </span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-7">
          {NAV.map((n) => (
            <a key={n.href} href={n.href} className="nav-link">{n.label}</a>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={toggleTheme}
            className="w-9 h-9 flex items-center justify-center rounded-lg transition-colors"
            style={{ background: "hsl(var(--border))", color: "hsl(var(--fg-muted))" }}
            title={dark ? "Light mode" : "Dark mode"}
          >
            {dark ? <Sun size={15} /> : <Moon size={15} />}
          </button>
          <a href="#contact" className="hidden md:inline-flex cyber-btn py-2 px-5 text-[0.65rem]">הצעת מחיר</a>
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden w-9 h-9 flex items-center justify-center rounded-lg"
            style={{ background: "hsl(var(--border))", color: "hsl(var(--fg-muted))" }}
          >
            {open ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden overflow-hidden"
            style={{ background: "hsl(var(--bg-card))", borderBottom: "1px solid hsl(var(--border))" }}
          >
            <nav className="px-5 py-4 flex flex-col gap-1">
              {NAV.map((n, i) => (
                <motion.a
                  key={n.href}
                  href={n.href}
                  initial={{ x: 16, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: i * 0.04 }}
                  onClick={() => setOpen(false)}
                  className="py-3 font-orbitron text-[10px] tracking-widest uppercase transition-colors"
                  style={{ borderBottom: "1px solid hsl(var(--border))", color: "hsl(var(--fg-muted))", textDecoration: "none" }}
                >
                  {n.label}
                </motion.a>
              ))}
              <a href="#contact" onClick={() => setOpen(false)} className="cyber-btn text-center justify-center mt-3 py-3">הצעת מחיר</a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
