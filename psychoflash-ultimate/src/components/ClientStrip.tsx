import { motion } from "framer-motion";

const LOGO_CLIENTS = [
  { name: "WIX", logo: "/logos/wix.svg" },
  { name: "El Al", logo: "/logos/elal.svg" },
  { name: "Keshet 12", logo: "/logos/keshet.svg" },
];

const TEXT_CLIENTS = [
  "Starburst Aerospace",
  "Shenkar College",
  "חברת החשמל",
  "גו-לייב שידורים",
  "אוקולוס הפקות",
  "Eastside Studio",
  "Satview",
  "המרכז למוזיקה בלומנטל",
];

export default function ClientStrip() {
  return (
    <section className="py-8 px-5">
      <div className="max-w-5xl mx-auto">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center font-orbitron mb-6"
          style={{
            fontSize: "9px",
            letterSpacing: "4px",
            color: "hsl(var(--fg-muted))",
            textTransform: "uppercase",
            opacity: 0.6,
          }}
        >
          Trusted By
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap items-center justify-center gap-8 md:gap-12"
        >
          {/* Logos */}
          {LOGO_CLIENTS.map((c) => (
            <div
              key={c.name}
              className="flex items-center justify-center h-8 transition-opacity hover:opacity-100"
              style={{ opacity: 0.45 }}
              title={c.name}
            >
              <img
                src={c.logo}
                alt={c.name}
                className="h-6 md:h-7 w-auto object-contain"
                style={{ filter: "grayscale(1) brightness(1.8) contrast(0.8)" }}
              />
            </div>
          ))}

          {/* Text-only clients */}
          {TEXT_CLIENTS.map((name) => (
            <span
              key={name}
              className="font-orbitron transition-opacity hover:opacity-80"
              style={{
                fontSize: "9px",
                letterSpacing: "1.5px",
                color: "hsl(var(--fg-muted))",
                opacity: 0.4,
                textTransform: "uppercase",
                whiteSpace: "nowrap",
              }}
            >
              {name}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
