import { motion } from "framer-motion";
import { Check, Zap } from "lucide-react";

const PLANS = [
  {
    name: "STARTER",
    nameHe: "סטארטר",
    price: "₪3,500",
    period: "לפרויקט",
    desc: "לעסקים קטנים ותוכן דיגיטלי",
    color: "hsl(187,100%,50%)",
    features: [
      "וידאו עד 3 דקות",
      "עריכה בסיסית",
      "פורמטים: 16:9 + 9:16",
      "2 גרסאות תיקונים",
      "קבלה ב-7 ימי עסקים",
    ],
    featured: false,
  },
  {
    name: "PRO",
    nameHe: "פרו",
    price: "₪12,000",
    period: "לפרויקט",
    desc: "ועידות, אירועים, מסחריים",
    color: "hsl(284,100%,50%)",
    features: [
      "שידור חי + רקורדינג",
      "Multi-cam עד 4 מצלמות",
      "עריכה ו-Color Grade",
      "Thumbnail + Reel",
      "5 גרסאות תיקונים",
      "קבלה ב-5 ימי עסקים",
      "תמיכה WhatsApp 24/7",
    ],
    featured: true,
  },
  {
    name: "ENTERPRISE",
    nameHe: "ארגוני",
    price: "בהתאמה",
    period: "אישית",
    desc: "פרויקטים גלובליים, AI, הפקות גדולות",
    color: "hsl(187,100%,50%)",
    features: [
      "צוות ייעודי מלא",
      "Multi-country production",
      "AI + VFX + NeRF",
      "Live streaming גלובלי",
      "SLA מוגדר",
      "Account Manager אישי",
      "גישה 24/7 לצוות",
      "Dashboard לקוח אישי",
    ],
    featured: false,
  },
];

export default function PricingSection() {
  return (
    <section id="pricing" className="py-24 px-4 relative">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="font-orbitron text-[10px] tracking-[5px] text-[hsl(187,100%,50%)] uppercase mb-4">
            PRICING
          </p>
          <h2 className="section-title gradient-text mb-4">מחירים</h2>
          <p className="text-white/40 text-sm">
            מחירים שקופים. איכות ללא פשרות.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PLANS.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              whileHover={{ y: -4 }}
              className="glass-card relative overflow-hidden flex flex-col"
              style={{
                ...(plan.featured
                  ? {
                      borderColor: `${plan.color}40`,
                      boxShadow: `0 0 40px ${plan.color}15`,
                    }
                  : {}),
              }}
            >
              {/* Top stripe */}
              <div
                className="h-1 w-full absolute top-0 left-0"
                style={{
                  background: plan.featured
                    ? `linear-gradient(to right, hsl(187,100%,50%), hsl(284,100%,50%))`
                    : `linear-gradient(to right, ${plan.color}60, transparent)`,
                }}
              />

              {plan.featured && (
                <div className="absolute top-4 left-1/2 -translate-x-1/2">
                  <span
                    className="font-orbitron text-[9px] tracking-widest px-3 py-1 rounded-full"
                    style={{
                      background: "linear-gradient(to right, hsl(187,100%,50%), hsl(284,100%,50%))",
                      color: "hsl(230,20%,2%)",
                    }}
                  >
                    ⚡ MOST POPULAR
                  </span>
                </div>
              )}

              <div className="p-8 flex flex-col flex-1 mt-2">
                {/* Plan name */}
                <div className="mb-6">
                  <p className="font-orbitron text-[9px] tracking-[4px] text-white/30 uppercase mb-1">
                    {plan.name}
                  </p>
                  <h3 className="font-teko text-3xl font-bold text-white">{plan.nameHe}</h3>
                  <p className="text-white/40 text-xs mt-1">{plan.desc}</p>
                </div>

                {/* Price */}
                <div className="mb-8">
                  <div
                    className="font-orbitron font-black text-4xl"
                    style={{ color: plan.color, textShadow: `0 0 20px ${plan.color}50` }}
                  >
                    {plan.price}
                  </div>
                  <p className="font-orbitron text-[9px] tracking-widest text-white/20 uppercase mt-1">
                    {plan.period}
                  </p>
                </div>

                {/* Features */}
                <ul className="space-y-3 mb-8 flex-1">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5">
                      <Check
                        size={13}
                        className="shrink-0 mt-0.5"
                        style={{ color: plan.color }}
                      />
                      <span className="text-white/60 text-sm">{f}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <a
                  href="#contact"
                  className={`cyber-btn text-center justify-center py-3 ${plan.featured ? "" : "cyber-btn-ghost"}`}
                  style={
                    plan.featured
                      ? { borderColor: plan.color, color: plan.color }
                      : {}
                  }
                >
                  {plan.name === "ENTERPRISE" ? "בואו נדבר" : "התחל עכשיו"}
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center text-white/20 font-orbitron text-[9px] tracking-widest uppercase mt-10"
        >
          כל המחירים ללא מע"מ · הצעת מחיר מותאמת אישית · ללא התחייבות
        </motion.p>
      </div>
    </section>
  );
}
