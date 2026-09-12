import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { MessageCircle, Mail, Clock, CheckCircle2, Sparkles, Send, Calculator } from "lucide-react";

const WHATSAPP_NUMBER = "972542559027";
const DIRECT_EMAIL = "orian@psychoflash.dev";

interface ProjectType {
  id: string;
  titleHe: string;
  descHe: string;
  baseDays: number;
}

const PROJECT_TYPES: ProjectType[] = [
  { id: "broadcast", titleHe: "שידור חי מולטי-קאם / ארנה", descHe: "vMix 4K, ניתוב ATEM, הקלטות ISO, צוות שידור", baseDays: 1 },
  { id: "commercial", titleHe: "פרסומת ומיתוג קולנועי 4K", descHe: "סרטוני תדמית ומותג, בימוי, צילום ועריכה", baseDays: 2 },
  { id: "ai_post", titleHe: "פוסט-פרודקשן ו-AI Pipelines", descHe: "קומפי, ראנוויי, עיבוד צבע DaVinci, אנימציה", baseDays: 3 },
  { id: "drone_fpv", titleHe: "צילומי רחפן קולנועי ו-FPV", descHe: "רחפנים כבדים, FPV מהיר, צילומי אוויר 4K", baseDays: 1 },
];

interface Addon {
  id: string;
  titleHe: string;
  extraDays: number;
}

const ADDONS: Addon[] = [
  { id: "drone_cinema", titleHe: "רחפן קולנוע 4K DCI משולב", extraDays: 0.5 },
  { id: "ai_motion", titleHe: "רצפי AI VFX מתקדמים (Kling/Runway)", extraDays: 1 },
  { id: "dante_audio", titleHe: "הקלטת סאונד שידורי רב-ערוצי Dante", extraDays: 0.5 },
  { id: "rush_delivery", titleHe: "מסירה מזורזת תוך 48 שעות", extraDays: -1 },
];

export default function QuoteCalculator() {
  const [selectedType, setSelectedType] = useState<string>(PROJECT_TYPES[0].id);
  const [scopeDays, setScopeDays] = useState<number>(2);
  const [selectedAddons, setSelectedAddons] = useState<string[]>(["dante_audio"]);
  const [clientName, setClientName] = useState<string>("");
  const [clientPhone, setClientPhone] = useState<string>("");

  const currentType = PROJECT_TYPES.find((t) => t.id === selectedType) || PROJECT_TYPES[0];

  const toggleAddon = (id: string) => {
    setSelectedAddons((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const estimatedTimelineDays = useMemo(() => {
    const base = currentType.baseDays * scopeDays;
    const extra = selectedAddons.reduce((acc, aId) => {
      const addon = ADDONS.find((a) => a.id === aId);
      return acc + (addon ? addon.extraDays : 0);
    }, 0);
    return Math.max(1, Math.round(base + extra));
  }, [currentType, scopeDays, selectedAddons]);

  const whatsappMessage = useMemo(() => {
    const addonsNames = selectedAddons
      .map((id) => ADDONS.find((a) => a.id === id)?.titleHe)
      .filter(Boolean)
      .join(", ");

    const text = `שלום אוריין אדלני, ברצוני לקבל הצעת מחיר להפקה ב-PSYCHOFLASH:
שם: ${clientName || "לא צוין"}
טלפון: ${clientPhone || "לא צוין"}
סוג הפקה: ${currentType.titleHe}
היקף ימי הפקה: ${scopeDays} ימים
תוספות: ${addonsNames || "ללא"}
הערכת לוח זמנים משוערת: כ-${estimatedTimelineDays} ימי עבודה`;

    return encodeURIComponent(text);
  }, [clientName, clientPhone, currentType, scopeDays, selectedAddons, estimatedTimelineDays]);

  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappMessage}`;

  return (
    <div className="w-full max-w-5xl mx-auto px-6 py-16">
      <div className="text-center mb-10">
        <div
          className="inline-flex items-center gap-2 mb-3 px-4 py-1.5 rounded-full border text-[11px] font-orbitron tracking-widest uppercase"
          style={{
            borderColor: "hsl(var(--primary) / 0.4)",
            background: "hsl(var(--primary) / 0.08)",
            color: "hsl(var(--primary))",
          }}
        >
          <Calculator size={13} />
          <span>INSTANT SCOPE & QUOTE CALCULATOR</span>
        </div>
        <h2 className="font-teko text-4xl sm:text-5xl font-bold tracking-tight mb-3" style={{ color: "hsl(var(--fg))" }}>
          מחשבון היקף הפקה והצעת מחיר
        </h2>
        <p className="max-w-xl mx-auto text-sm sm:text-base" style={{ color: "hsl(var(--fg-muted))" }}>
          הגדירו את מאפייני הפרויקט וקבלו אומדן לוח זמנים ופנייה ישירה לאוריין אדלני.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-6">
        {/* Left Options Form */}
        <div
          className="rounded-2xl border p-6 sm:p-8 backdrop-blur-xl shadow-xl flex flex-col gap-6"
          style={{
            background: "hsl(var(--card) / 0.75)",
            borderColor: "hsl(var(--border))",
          }}
        >
          {/* Step 1: Project Type */}
          <div>
            <label className="block text-xs font-orbitron font-bold uppercase tracking-wider mb-3" style={{ color: "hsl(var(--primary))" }}>
              1. סוג ההפקה המבוקשת
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {PROJECT_TYPES.map((pt) => {
                const isSel = pt.id === selectedType;
                return (
                  <button
                    key={pt.id}
                    onClick={() => setSelectedType(pt.id)}
                    className={`text-right p-3.5 rounded-xl border text-xs transition-all duration-200 ${
                      isSel ? "border-primary shadow-md" : "hover:border-primary/40"
                    }`}
                    style={{
                      background: isSel ? "hsl(var(--primary) / 0.14)" : "hsl(var(--bg) / 0.4)",
                      borderColor: isSel ? "hsl(var(--primary))" : "hsl(var(--border))",
                    }}
                  >
                    <div className="font-bold text-sm mb-1" style={{ color: "hsl(var(--fg))" }}>
                      {pt.titleHe}
                    </div>
                    <div className="text-[11px] line-clamp-1" style={{ color: "hsl(var(--fg-muted))" }}>
                      {pt.descHe}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 2: Scope Days Slider */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-orbitron font-bold uppercase tracking-wider" style={{ color: "hsl(var(--primary))" }}>
                2. היקף משוער (ימי צילום ועריכה)
              </label>
              <span className="font-mono text-sm font-black px-2 py-0.5 rounded" style={{ background: "hsl(var(--primary) / 0.15)", color: "hsl(var(--primary))" }}>
                {scopeDays} {scopeDays === 1 ? "יום" : "ימים"}
              </span>
            </div>
            <input
              type="range"
              min={1}
              max={10}
              value={scopeDays}
              onChange={(e) => setScopeDays(Number(e.target.value))}
              className="w-full accent-primary cursor-pointer"
            />
            <div className="flex justify-between text-[10px] font-mono mt-1" style={{ color: "hsl(var(--fg-muted))" }}>
              <span>1 יום</span>
              <span>5 ימים</span>
              <span>10+ ימי עבודה</span>
            </div>
          </div>

          {/* Step 3: Addons */}
          <div>
            <label className="block text-xs font-orbitron font-bold uppercase tracking-wider mb-2.5" style={{ color: "hsl(var(--primary))" }}>
              3. תוספות ורכיבי הפקה מתקדמים
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {ADDONS.map((addon) => {
                const isChecked = selectedAddons.includes(addon.id);
                return (
                  <button
                    key={addon.id}
                    onClick={() => toggleAddon(addon.id)}
                    className={`flex items-center gap-2.5 p-3 rounded-lg border text-xs text-right transition-colors ${
                      isChecked ? "border-primary" : "hover:border-primary/40"
                    }`}
                    style={{
                      background: isChecked ? "hsl(var(--primary) / 0.1)" : "hsl(var(--bg) / 0.3)",
                      borderColor: isChecked ? "hsl(var(--primary))" : "hsl(var(--border))",
                      color: isChecked ? "hsl(var(--fg))" : "hsl(var(--fg-muted))",
                    }}
                  >
                    <div
                      className={`w-4 h-4 rounded flex items-center justify-center shrink-0 border ${
                        isChecked ? "bg-primary border-primary" : "border-muted"
                      }`}
                    >
                      {isChecked && <CheckCircle2 size={12} className="text-white" />}
                    </div>
                    <span className="text-[11px] font-medium leading-snug">{addon.titleHe}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Contact Inputs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <div>
              <label className="block text-[11px] font-medium mb-1" style={{ color: "hsl(var(--fg-muted))" }}>
                שם מלא
              </label>
              <input
                type="text"
                placeholder="ישראל ישראלי"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border text-xs focus:outline-none focus:border-primary"
                style={{
                  background: "hsl(var(--bg) / 0.5)",
                  borderColor: "hsl(var(--border))",
                  color: "hsl(var(--fg))",
                }}
              />
            </div>
            <div>
              <label className="block text-[11px] font-medium mb-1" style={{ color: "hsl(var(--fg-muted))" }}>
                מספר טלפון
              </label>
              <input
                type="tel"
                placeholder="050-0000000"
                value={clientPhone}
                onChange={(e) => setClientPhone(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border text-xs focus:outline-none focus:border-primary"
                style={{
                  background: "hsl(var(--bg) / 0.5)",
                  borderColor: "hsl(var(--border))",
                  color: "hsl(var(--fg))",
                }}
              />
            </div>
          </div>
        </div>

        {/* Right Summary & Action Card */}
        <div
          className="rounded-2xl border p-6 sm:p-8 backdrop-blur-xl shadow-xl flex flex-col justify-between"
          style={{
            background: "hsl(var(--card) / 0.85)",
            borderColor: "hsl(var(--primary) / 0.4)",
          }}
        >
          <div>
            <span className="font-orbitron text-[10px] tracking-widest uppercase font-bold" style={{ color: "hsl(var(--primary))" }}>
              PROJECT SUMMARY & SLA
            </span>
            <h3 className="font-teko text-3xl font-bold mt-1 mb-4" style={{ color: "hsl(var(--fg))" }}>
              אומדן הפקה ולו״ז
            </h3>

            <div className="space-y-3 pb-6 border-b" style={{ borderColor: "hsl(var(--border))" }}>
              <div className="flex items-center justify-between text-xs">
                <span style={{ color: "hsl(var(--fg-muted))" }}>סוג הפקה:</span>
                <span className="font-semibold" style={{ color: "hsl(var(--fg))" }}>
                  {currentType.titleHe}
                </span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span style={{ color: "hsl(var(--fg-muted))" }}>ימי צילום וניתוב:</span>
                <span className="font-mono font-bold" style={{ color: "hsl(var(--fg))" }}>
                  {scopeDays} ימים
                </span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span style={{ color: "hsl(var(--fg-muted))" }}>תוספות שנבחרו:</span>
                <span className="font-semibold text-[11px]" style={{ color: "hsl(var(--primary))" }}>
                  {selectedAddons.length} תוספות
                </span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span style={{ color: "hsl(var(--fg-muted))" }}>איכות מאסטר:</span>
                <span className="font-mono font-bold" style={{ color: "hsl(var(--fg))" }}>
                  4K UHD / ProRes 422
                </span>
              </div>
            </div>

            {/* Timeline Result Highlight */}
            <div className="my-6 p-4 rounded-xl border flex items-center gap-3.5" style={{ background: "hsl(var(--primary) / 0.08)", borderColor: "hsl(var(--primary) / 0.3)" }}>
              <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0" style={{ background: "hsl(var(--primary) / 0.2)" }}>
                <Clock size={20} style={{ color: "hsl(var(--primary))" }} />
              </div>
              <div>
                <div className="text-[10px] font-orbitron uppercase tracking-wider" style={{ color: "hsl(var(--fg-muted))" }}>
                  הערכת זמן אספקה משוערת
                </div>
                <div className="font-teko text-2xl font-black" style={{ color: "hsl(var(--fg))" }}>
                  כ-{estimatedTimelineDays} ימי עבודה
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-2.5">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3.5 px-6 rounded-xl font-bold text-sm flex items-center justify-center gap-2.5 transition-transform duration-200 active:scale-95 shadow-lg text-white"
              style={{ background: "#25D366" }}
            >
              <MessageCircle size={17} />
              <span>שליחת מפרט לוואטסאפ של אוריין</span>
            </a>

            <a
              href={`mailto:${DIRECT_EMAIL}?subject=בקשת מפרט והצעת מחיר - ${encodeURIComponent(currentType.titleHe)}&body=${whatsappMessage}`}
              className="w-full py-2.5 px-6 rounded-xl font-medium text-xs flex items-center justify-center gap-2 border transition-colors hover:bg-primary/10"
              style={{ borderColor: "hsl(var(--border))", color: "hsl(var(--fg))" }}
            >
              <Mail size={14} />
              <span>שליחה באימייל (orian@psychoflash.dev)</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
