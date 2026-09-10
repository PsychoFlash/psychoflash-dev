import { Link } from "react-router-dom";

const NAV_LINKS = ["#services", "#portfolio", "#pricing", "#contact"];
const LABEL_MAP: Record<string, string> = {
  "#services":  "שירותים",
  "#portfolio": "פורטפוליו",
  "#pricing":   "מחירים",
  "#contact":   "יצירת קשר",
};

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      className="py-8 px-5"
      style={{ borderTop: "1px solid hsl(var(--border))" }}
      role="contentinfo"
      aria-label="Footer — PSYCHOFLASH"
    >
      <div className="max-w-5xl mx-auto space-y-4">
        {/* Main row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 flex-wrap">
          {/* Brand */}
          <span
            className="font-orbitron text-[10px] tracking-widest uppercase select-none"
            style={{ color: "hsl(var(--fg-muted))" }}
            aria-label="PSYCHOFLASH all rights reserved"
          >
            PSYCHO<span style={{ color: "hsl(var(--primary))" }}>FLASH</span> © {year}
          </span>

          {/* Nav links */}
          <nav aria-label="ניווט footer">
            <ul className="flex items-center gap-4 list-none" role="list">
              {NAV_LINKS.map((href) => (
                <li key={href}>
                  <a
                    href={href}
                    className="font-orbitron text-[9px] tracking-wider uppercase transition-colors hover:text-[hsl(var(--primary))] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--primary))] focus-visible:ring-offset-2 rounded-sm"
                    style={{ color: "hsl(var(--fg-muted))", textDecoration: "none" }}
                    aria-label={`נווט ל-${LABEL_MAP[href]}`}
                  >
                    {LABEL_MAP[href]}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <a
            href="mailto:PsychoFlash@gmail.com"
            className="text-xs transition-colors hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--primary))] rounded-sm"
            style={{ color: "hsl(var(--fg-muted))", opacity: 0.5, textDecoration: "none" }}
            aria-label="שלח אימייל לPsychoFlash@gmail.com"
          >
            PsychoFlash@gmail.com
          </a>
        </div>

        {/* Legal links row */}
        <div className="flex items-center justify-center gap-6 pt-1" style={{ borderTop: "1px solid hsl(var(--border))" }}>
          <Link
            to="/privacy"
            className="font-orbitron text-[8px] tracking-wider uppercase transition-colors hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--primary))] rounded-sm"
            style={{ color: "hsl(var(--fg-muted))", opacity: 0.45, textDecoration: "none" }}
            aria-label="קרא את מדיניות הפרטיות שלנו"
          >
            מדיניות פרטיות
          </Link>
          <span aria-hidden="true" style={{ color: "hsl(var(--border))" }}>·</span>
          <Link
            to="/accessibility"
            className="font-orbitron text-[8px] tracking-wider uppercase transition-colors hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--primary))] rounded-sm"
            style={{ color: "hsl(var(--fg-muted))", opacity: 0.45, textDecoration: "none" }}
            aria-label="קרא את הצהרת הנגישות שלנו"
          >
            הצהרת נגישות
          </Link>
          <span aria-hidden="true" style={{ color: "hsl(var(--border))" }}>·</span>
          <span
            className="font-orbitron text-[8px] tracking-wider"
            style={{ color: "hsl(var(--fg-muted))", opacity: 0.35 }}
            aria-label="כל הזכויות שמורות לאוריאן עדלני"
          >
            © {year} ORIAN EDELENYI
          </span>
        </div>
      </div>
    </footer>
  );
}
