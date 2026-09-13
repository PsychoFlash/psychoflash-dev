import { motion } from "framer-motion";
import { Check, Zap } from "lucide-react";
import OrianElasticCard from "@/components/OrianElasticCard";

const PLANS = [
  {
    name: "STARTER",
    nameHe: "סטארטר דיגיטל",
    price: "₪3,500",
    period: "לפרויקט",
    desc: "לעסקים, סרטי מוצר ותוכן דיגיטלי איכותי",
    color: "hsl(var(--primary))",
    features: [
      "וידאו ערוך עד 3 דקות באיכות 4K",
      "צבע וסאונד ברמת שידור",
      "פורמטים מותאמים: 16:9 + 9:16 Reels",
      "2 סבבי תיקונים ודיוקים",
      "מסירת חומרים עד 7 ימי עסקים",
    ],
    featured: false,
  },
  {
    name: "PRO",
    nameHe: "פרו הפקות ולייב",
    price: "₪12,000",
    period: "לפרויקט",
    desc: "ועידות, כנסים, אירועים וקמפיינים מסחריים",
    color: "hsl(var(--secondary))",
    features: [
      "שידור חי מרובה מצלמות (Multi-Cam 4K)",
      "הקלטה באיכות Master נפרדת לכל ערוץ",
      "גרפיקה חיה, כתוביות ו-Live Lower Thirds",
      "Reel סיכום מהיר באותו היום",
      "5 סבבי תיקונים והתאמות",
      "תמיכה ישירה ומנהל הפקה צמוד",
      "זמינות מוקד טלפוני ו-WhatsApp 24/7",
    ],
    featured: true,
  },
  {
    name: "ENTERPRISE",
    nameHe: "ארגוני ומותאם אישית",
    price: "בהתאמה",
    period: "אישית",
    desc: "הפקות בינלאומיות, AI מתקדם ושידורי ענק",
    color: "hsl(var(--primary))",
    features: [
      "צוות הפקה מלא וניידת שידור OB Van ייעודית",
      "שידור סימולטני גלובלי לרשתות עולמיות",
      "אינטגרציית AI, NeRF ואפקטים קולנועיים VFX",
      "הסכם שירות וזמינות מלא (SLA)",
      "מנהל לקוח בכיר (Account Manager) אישי",
      "גישה ישירה לבמאי ולצוות הטכנולוגי",
      "דשבורד מעקב וארכיון חומרים מנוהל בענן",
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
          <p
            className="font-orbitron text-[10px] tracking-[5px] uppercase mb-4 font-bold"
            style={{ color: "hsl(var(--primary))" }}
          >
            PRICING · חבילות ומחירים
          </p>
          <h2 className="section-title gradient-text mb-4">השקעה שקופה ומדויקת</h2>
          <p className="text-sm max-w-md mx-auto" style={{ color: "hsl(var(--fg-muted))" }}>
            סטנדרטים בלתי מתפשרים, ללא אותיות קטנות. כל פרויקט מקבל יחס של יצירת מופת.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PLANS.map((plan, i) => (
            <OrianElasticCard key={plan.name} pullStrength={12} tiltAngle={5} className="h-full">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="glass-card relative overflow-hidden flex flex-col h-full"
                style={{
                  borderColor: plan.featured ? "hsl(var(--primary))" : "hsl(var(--border))",
                  boxShadow: plan.featured ? "0 10px 40px hsl(var(--primary) / 0.18)" : undefined,
                  background: plan.featured ? "hsl(var(--primary) / 0.04)" : undefined,
                }}
              >
                {/* Top stripe */}
                <div
                  className="h-1.5 w-full absolute top-0 left-0"
                  style={{
                    background: plan.featured
                      ? "linear-gradient(to right, hsl(var(--primary)), hsl(var(--secondary)))"
                      : "linear-gradient(to right, hsl(var(--primary) / 0.5), transparent)",
                  }}
                />

                {plan.featured && (
                  <div className="absolute top-4 left-1/2 -translate-x-1/2">
                    <span
                      className="font-orbitron text-[9px] tracking-widest px-3 py-1 rounded-full font-bold shadow-md"
                      style={{
                        background: "linear-gradient(to right, hsl(var(--primary)), hsl(var(--secondary)))",
                        color: "white",
                      }}
                    >
                      ⚡ הכי פופולרי
                    </span>
                  </div>
                )}

                <div className="p-8 flex flex-col flex-1 mt-4">
                  {/* Plan name */}
                  <div className="mb-6">
                    <p className="font-orbitron text-[9px] tracking-[4px] uppercase mb-1 font-semibold" style={{ color: "hsl(var(--fg-muted))" }}>
                      {plan.name}
                    </p>
                    <h3 className="font-teko text-3xl font-bold" style={{ color: "hsl(var(--fg))" }}>
                      {plan.nameHe}
                    </h3>
                    <p className="text-xs mt-1" style={{ color: "hsl(var(--fg-muted))" }}>
                      {plan.desc}
                    </p>
                  </div>

                  {/* Price */}
                  <div className="mb-8">
                    <div
                      className="font-orbitron font-black text-4xl"
                      style={{ color: "hsl(var(--primary))" }}
                    >
                      {plan.price}
                    </div>
                    <p className="font-orbitron text-[9px] tracking-widest uppercase mt-1 font-semibold" style={{ color: "hsl(var(--fg-muted))" }}>
                      {plan.period}
                    </p>
                  </div>

                  {/* Features */}
                  <ul className="space-y-3 mb-8 flex-1">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-start gap-2.5">
                        <Check
                          size={14}
                          className="shrink-0 mt-0.5"
                          style={{ color: "hsl(var(--primary))" }}
                        />
                        <span className="text-sm" style={{ color: "hsl(var(--fg))" }}>
                          {f}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <a
                    href="#contact"
                    className={`cyber-btn text-center justify-center py-3 ${plan.featured ? "" : "cyber-btn-outline"}`}
                  >
                    {plan.name === "ENTERPRISE" ? "בואו נשוחח על הפרויקט" : "בחר חבילה זו"}
                  </a>
                </div>
              </motion.div>
            </OrianElasticCard>
          ))}
        </div>

        {/* Bottom note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-center font-orbitron text-[10px] tracking-widest uppercase mt-12 font-medium"
          style={{ color: "hsl(var(--fg-muted))" }}
        >
          כל המחירים לפני מע"מ · הצעות מחיר מותאמות אישית · ליווי מלא משלב התכנון ועד השידור
        </motion.p>
      </div>
    </section>
  );
}
