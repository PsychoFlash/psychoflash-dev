/**
 * AutopilotHUD / CollectiveLearnerHUD — Ambient AI Digital Twin
 * 
 * Completely redesigned based on Orian's feedback:
 * - NO scroll hijacking ("לא שתלטני ולא גולל מעצמו")
 * - Completely ambient and embedded ("מוטמע בדרך אגב")
 * - Shows real-time simulated collective learning & popular crowd hotspots
 * - Expandable micro-card showing visitor favorite circles and projects
 */

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Brain, Sparkles, ChevronUp, ChevronDown, Flame, BarChart3, X } from "lucide-react";
import { useCollectiveLearner } from "@/hooks/useCollectiveLearner";
import OrianElasticCard from "@/components/OrianElasticCard";

export default function AutopilotHUD() {
  const { memory, currentInsight } = useCollectiveLearner();
  const [isOpen, setIsOpen] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  if (isDismissed) return null;

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-2">
      {/* Expanded Learning Stats Card */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.94 }}
            className="p-4 rounded-2xl border shadow-2xl backdrop-blur-xl w-80 sm:w-96 text-xs flex flex-col gap-3 mb-1"
            style={{
              background: "hsl(var(--bg-card) / 0.94)",
              borderColor: "hsl(var(--primary) / 0.4)",
              boxShadow: "0 16px 36px rgba(0,0,0,0.45)",
            }}
          >
            <div className="flex items-center justify-between pb-2 border-b border-border/40">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full flex items-center justify-center bg-primary/20 text-primary">
                  <Brain size={13} />
                </div>
                <div>
                  <span className="font-orbitron font-bold text-[10px] tracking-wider text-primary">
                    AI COLLECTIVE LEARNER
                  </span>
                  <p className="text-[10px] text-muted-foreground">
                    זיכרון קולקטיבי: {memory.totalVisitorsSimulated.toLocaleString()} מבקרים
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-md hover:bg-white/10 text-muted-foreground"
              >
                <X size={13} />
              </button>
            </div>

            {/* Current crowd insight */}
            <div className="p-2.5 rounded-xl bg-primary/10 border border-primary/20 text-foreground leading-relaxed flex items-start gap-2">
              <Sparkles size={14} className="text-amber-400 shrink-0 mt-0.5" />
              <span>{currentInsight}</span>
            </div>

            {/* Top Project Hotspots */}
            <div>
              <span className="font-orbitron text-[9px] uppercase tracking-wider text-muted-foreground flex items-center gap-1 mb-1.5">
                <Flame size={11} className="text-rose-400" />
                <span>מובילי עניין בקרב המבקרים:</span>
              </span>
              <div className="space-y-1">
                <div className="flex items-center justify-between py-0.5 text-[11px]">
                  <span>1. ארנה ירושלים (10,000+ צופים)</span>
                  <span className="font-mono text-primary font-semibold">88% עניין</span>
                </div>
                <div className="flex items-center justify-between py-0.5 text-[11px]">
                  <span>2. MindFly US Tour & NBA</span>
                  <span className="font-mono text-primary font-semibold">84% עניין</span>
                </div>
                <div className="flex items-center justify-between py-0.5 text-[11px]">
                  <span>3. ועידת CyberTech Global</span>
                  <span className="font-mono text-primary font-semibold">79% עניין</span>
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-border/40 text-[10px] text-muted-foreground text-center">
              הבוט לומד באופן פסיבי מהאינטראקציות באתר ללא גלילה כפויה.
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Ambient Floating Pill ("מוטמע בדרך אגב") */}
      <OrianElasticCard pullStrength={10} tiltAngle={4}>
        <div
          onClick={() => setIsOpen((prev) => !prev)}
          className="cursor-pointer flex items-center gap-2.5 px-3.5 py-2 rounded-full border shadow-xl backdrop-blur-xl transition-all hover:border-primary/60 group"
          style={{
            background: "hsl(var(--bg-card) / 0.88)",
            borderColor: "hsl(var(--primary) / 0.35)",
            boxShadow: "0 8px 24px rgba(0,0,0,0.35)",
          }}
          title="לחץ לצפייה בזיכרון הלמידה הקולקטיבי"
        >
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <Brain size={14} className="text-amber-400 group-hover:rotate-12 transition-transform" />
          <span className="font-orbitron text-[10px] font-bold tracking-wider text-foreground">
            AI LEARNER · {memory.totalVisitorsSimulated.toLocaleString()} VISITS
          </span>
          {isOpen ? <ChevronDown size={13} className="text-muted-foreground" /> : <ChevronUp size={13} className="text-muted-foreground" />}
        </div>
      </OrianElasticCard>
    </div>
  );
}
