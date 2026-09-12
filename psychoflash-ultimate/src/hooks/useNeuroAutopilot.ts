import { useState, useEffect, useRef, useCallback } from "react";
import { useNeuro } from "@/hooks/NeuroContext";

export interface AutopilotStep {
  id: string;
  targetId: string;
  titleHe: string;
  actionDesc: string;
  durationMs: number;
  triggerApertureCycle?: boolean;
}

const AUTOPILOT_STEPS: AutopilotStep[] = [
  {
    id: "hero_aperture",
    targetId: "hero",
    titleHe: "צמצם קולנועי וראדאר INNOBIZ",
    actionDesc: "סריקת ראדאר חיה, סיבוב צמצם ומאקרו ציוד (vMix 4K & Sony FX6)",
    durationMs: 7000,
    triggerApertureCycle: true,
  },
  {
    id: "live_arena",
    targetId: "arena",
    titleHe: "ארנה ושידורים חיים מרובי מצלמות",
    actionDesc: "הדגמת מיתוג PGM, ניתוב מצלמות ואירועי 10,000+ צופים",
    durationMs: 8000,
  },
  {
    id: "portfolio",
    targetId: "portfolio",
    titleHe: "תיק עבודות והפקות מאסטר",
    actionDesc: "סריקת פרויקטים נבחרים: הוועד הפראלימפי, IAI, התקווה 6",
    durationMs: 8000,
  },
  {
    id: "synergy",
    targetId: "synergy",
    titleHe: "מעגלי עבודה וסינרגיה מקצועית (SLA)",
    actionDesc: "מנהיגות הפקה, דירוג SLA ותפקידי צוות מאסטר בהובלת אוריין אדלני",
    durationMs: 8000,
  },
  {
    id: "gear",
    targetId: "gear",
    titleHe: "ציוד שידור ומאקרו מאחורי הקלעים",
    actionDesc: "קלוז-אפ אותנטי על מתגי T-Bar, מסכי בקרה ורשת אודיו Dante",
    durationMs: 7500,
  },
  {
    id: "calculator",
    targetId: "calculator",
    titleHe: "מחשבון היקף ואומדן הפקה",
    actionDesc: "חישוב ימי עבודה, תוספות שידור ופנייה ישירה לוואטסאפ",
    durationMs: 7000,
  },
  {
    id: "contact",
    targetId: "contact",
    titleHe: "סגירת מועד והפקה ישירה",
    actionDesc: "ערוץ ישיר לאוריין אדלני בוואטסאפ ובטלפון",
    durationMs: 6000,
  },
];

const IDLE_TIMEOUT_MS = 25000; // 25 seconds of inactivity triggers autopilot

export function useNeuroAutopilot() {
  const { state } = useNeuro();
  const [isActive, setIsActive] = useState(false);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [apertureTriggerCount, setApertureTriggerCount] = useState(0);
  const [isManualPaused, setIsManualPaused] = useState(false);
  const lastUserActivity = useRef<number>(Date.now());
  const isProgrammaticScroll = useRef(false);

  // Reset idle timer on real user actions
  const recordActivity = useCallback(() => {
    lastUserActivity.current = Date.now();
    if (isActive) {
      // Immediate graceful yield to human
      setIsActive(false);
    }
  }, [isActive]);

  // Listen to window interaction events
  useEffect(() => {
    const handlePointer = (e: MouseEvent | TouchEvent) => {
      recordActivity();
    };

    const handleKey = () => recordActivity();

    const handleScroll = () => {
      if (isProgrammaticScroll.current) {
        return; // ignore scrolls driven by autopilot
      }
      recordActivity();
    };

    window.addEventListener("pointermove", handlePointer, { passive: true });
    window.addEventListener("pointerdown", handlePointer, { passive: true });
    window.addEventListener("keydown", handleKey, { passive: true });
    window.addEventListener("wheel", handleScroll, { passive: true });
    window.addEventListener("touchmove", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("pointermove", handlePointer);
      window.removeEventListener("pointerdown", handlePointer);
      window.removeEventListener("keydown", handleKey);
      window.removeEventListener("wheel", handleScroll);
      window.removeEventListener("touchmove", handleScroll);
    };
  }, [recordActivity]);

  // Idle check tick
  useEffect(() => {
    const interval = setInterval(() => {
      if (isManualPaused) return;

      const idleDuration = Date.now() - lastUserActivity.current;
      if (!isActive && idleDuration >= IDLE_TIMEOUT_MS) {
        // Start autopilot
        setIsActive(true);
        setCurrentStepIndex(0);
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [isActive, isManualPaused]);

  // Execute autopilot step actions
  useEffect(() => {
    if (!isActive) return;

    const step = AUTOPILOT_STEPS[currentStepIndex];
    if (!step) return;

    // Trigger aperture rotation if requested
    if (step.triggerApertureCycle) {
      setApertureTriggerCount((c) => c + 1);
    }

    // Scroll to section
    const el = document.getElementById(step.targetId);
    if (el) {
      isProgrammaticScroll.current = true;
      const navOffset = 70;
      const elementPosition = el.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = Math.max(0, elementPosition - navOffset);

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });

      // Clear programmatic scroll lock after scroll finishes
      setTimeout(() => {
        isProgrammaticScroll.current = false;
      }, 1000);
    }

    // Advance to next step after step duration
    const timer = setTimeout(() => {
      setCurrentStepIndex((prev) => (prev + 1) % AUTOPILOT_STEPS.length);
    }, step.durationMs);

    return () => clearTimeout(timer);
  }, [isActive, currentStepIndex]);

  const toggleManualAutopilot = () => {
    if (isActive) {
      setIsActive(false);
      setIsManualPaused(true);
    } else {
      setIsActive(true);
      setIsManualPaused(false);
      setCurrentStepIndex(0);
    }
  };

  const currentStep = AUTOPILOT_STEPS[currentStepIndex];

  return {
    isActive,
    currentStep,
    currentStepIndex,
    totalSteps: AUTOPILOT_STEPS.length,
    apertureTriggerCount,
    toggleManualAutopilot,
    dismissAutopilot: () => {
      setIsActive(false);
      setIsManualPaused(true);
    },
  };
}
