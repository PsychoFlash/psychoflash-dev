import { motion } from "framer-motion";
import { playTactileSound } from "@/utils/tactileAudio";
import { useCircadian } from "@/hooks/CircadianThemeContext";

const LOGO_CLIENTS = [
  { name: "WIX", logo: "/logos/wix.svg", tag: "Tech & Keynote" },
  { name: "El Al", logo: "/logos/elal.svg", tag: "National Airline" },
  { name: "Keshet 12", logo: "/logos/keshet.svg", tag: "Broadcast TV" },
];

const TEXT_CLIENTS = [
  { name: "תעשייה אווירית (IAI)", tag: "Defense & Space" },
  { name: "Starburst Aerospace", tag: "Global Demo Day" },
  { name: "Shenkar College", tag: "Academy Live" },
  { name: "חברת החשמל לישראל", tag: "National Infrastructure" },
  { name: "Go Live Israel (גולייב)", tag: "Flagship Partner 2,500h" },
  { name: "ועד פראלימפי ישראל", tag: "DCI HDR 4K Master" },
  { name: "MindFly US (NBA)", tag: "BodyCam RF Tour" },
  { name: "Eastside Studio", tag: "Live Production" },
  { name: "Wiz Beyond Las Vegas", tag: "Cyber Conference" },
  { name: "כנס ש\"ס פיס ארנה", tag: "Mega Arena 12-Cam" },
];

export default function ClientStrip() {
  const { isEffectiveLight } = useCircadian();

  // Duplicate list to achieve continuous seamless loop
  const marqueeItems = [...LOGO_CLIENTS, ...TEXT_CLIENTS, ...LOGO_CLIENTS, ...TEXT_CLIENTS];

  return (
    <section className="py-10 relative overflow-hidden select-none border-y border-border/30 bg-black/10 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2 font-orbitron text-[9px] tracking-[4px] uppercase text-foreground-muted">
          <span className="w-1.5 h-1.5 rounded-full bg-primary animate-ping" />
          <span>TRUSTED BY INDUSTRY TITANS & BROADCAST NETWORKS</span>
        </div>
        <span className="font-orbitron text-[8px] text-primary/70 tracking-widest hidden sm:inline-block">
          CONTINUOUS TRANSMISSION
        </span>
      </div>

      {/* Infinite Marquee Track */}
      <div className="relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        <div
          className="flex items-center gap-6 whitespace-nowrap animate-marquee hover:[animation-play-state:paused]"
          style={{ width: "max-content" }}
        >
          {marqueeItems.map((item, idx) => {
            const logoSrc = "logo" in item ? (item as { logo: string }).logo : null;
            return (
              <div
                key={idx}
                onMouseEnter={() => playTactileSound("fstop")}
                className="flex items-center gap-2.5 px-4 py-2 rounded-xl border border-border/50 bg-card/40 hover:border-primary/70 hover:bg-card/80 transition-all duration-300 group cursor-default"
                style={{
                  boxShadow: isEffectiveLight
                    ? "0 2px 10px rgba(0,0,0,0.04)"
                    : "0 4px 15px rgba(0,0,0,0.4)",
                }}
              >
                {logoSrc ? (
                  <img
                    src={logoSrc}
                    alt={item.name}
                    className="h-5 sm:h-6 w-auto object-contain filter grayscale contrast-125 opacity-70 group-hover:opacity-100 group-hover:grayscale-0 transition-all"
                  />
                ) : (
                  <span className="font-orbitron text-xs font-bold text-foreground group-hover:text-primary transition-colors">
                    {item.name}
                  </span>
                )}

                <div className="w-[1px] h-3 bg-border/60" />

                <span className="font-orbitron text-[8px] uppercase tracking-wider text-foreground-muted group-hover:text-amber-400/90 transition-colors">
                  {item.tag}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
