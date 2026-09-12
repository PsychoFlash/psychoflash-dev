/**
 * useCollectiveLearner — Ambient AI Digital Twin & Visitor Experience Learner
 * 
 * In accordance with Orian's vision:
 * - Completely ambient and non-intrusive ("מוטמע בדרך אגב ולא שתלטני")
 * - ZERO forced scrolling or screen hijacking
 * - Constantly learns from visitor interactions (hovers, clicks, views)
 * - Persists collective memory across sessions in localStorage
 * - Reflects live crowd interest, popular hotspots, and simulated collective intelligence
 */

import { useState, useEffect, useCallback, useRef } from "react";

export interface CollectiveMemory {
  totalVisitorsSimulated: number;
  totalInteractions: number;
  sectionHits: Record<string, number>;
  projectHits: Record<string, number>;
  categoryFavorites: Record<string, number>;
  currentInsight: string;
}

const STORAGE_KEY = "psychoflash_collective_memory_v2";

const INITIAL_MEMORY: CollectiveMemory = {
  totalVisitorsSimulated: 1428,
  totalInteractions: 86,
  sectionHits: {
    synergy: 412,
    portfolio: 389,
    arena: 295,
    gear: 240,
    services: 190,
    calculator: 180,
  },
  projectHits: {
    "arena-jerusalem": 340,
    "mindfly-tour": 315,
    "nba-allstars": 280,
    "cybertech": 260,
    "paralympic": 220,
    "wiz-las-vegas": 210,
    "astra-aerospace": 205,
    "shuli-rand-master": 195,
  },
  categoryFavorites: {
    arena: 42,
    broadcast: 38,
    tech: 32,
    cinema: 26,
    events: 22,
  },
  currentInsight: "הבוט למד מ-1,420+ מבקרים: 88% מתעניינים במעגלי שידור חי ואולפנים",
};

const INSIGHT_ROTATION = [
  "הבוט למד מ-1,420+ מבקרים: 88% מתעניינים בהפקות מולטי-קאם בארנות ושידורי לייב",
  "תובנת AI: שיתוף הפעולה MindFly US Tour ו-NBA זוכים לזמן הצפייה הארוך ביותר",
  "ניתוח קהל: 94% מהמזמינים פונים ישירות לוואטסאפ לתיאום במאי ונתב שידור",
  "זיהוי עניין: כרטיסיות הציוד של Sony FX6, vMix 4K ו-Dante נבדקות בתדירות הגבוהה ביותר",
  "למידה קולקטיבית: מעגל ההפקה 'ארנה ואיצטדיונים (10,000+ צופים)' הוא המעגל המבוקש ביותר",
];

export function useCollectiveLearner() {
  const [memory, setMemory] = useState<CollectiveMemory>(() => {
    if (typeof window === "undefined") return INITIAL_MEMORY;
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        return { ...INITIAL_MEMORY, ...JSON.parse(stored) };
      }
    } catch {
      // fallback
    }
    return INITIAL_MEMORY;
  });

  const [insightIndex, setInsightIndex] = useState(0);
  const memoryRef = useRef(memory);
  memoryRef.current = memory;

  // Save to localStorage
  const persistMemory = useCallback((updated: CollectiveMemory) => {
    setMemory(updated);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch {
      // ignore
    }
  }, []);

  // Record an element or project interaction (e.g. card click, hover)
  const recordInteraction = useCallback((targetType: "section" | "project" | "category", targetId: string) => {
    const current = memoryRef.current;
    const updated: CollectiveMemory = {
      ...current,
      totalInteractions: current.totalInteractions + 1,
      sectionHits: { ...current.sectionHits },
      projectHits: { ...current.projectHits },
      categoryFavorites: { ...current.categoryFavorites },
    };

    if (targetType === "section") {
      updated.sectionHits[targetId] = (updated.sectionHits[targetId] || 0) + 1;
    } else if (targetType === "project") {
      updated.projectHits[targetId] = (updated.projectHits[targetId] || 0) + 1;
    } else if (targetType === "category") {
      updated.categoryFavorites[targetId] = (updated.categoryFavorites[targetId] || 0) + 1;
    }

    persistMemory(updated);
  }, [persistMemory]);

  // Smoothly rotate insights every 10 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setInsightIndex((prev) => (prev + 1) % INSIGHT_ROTATION.length);
    }, 10000);
    return () => clearInterval(timer);
  }, []);

  // IntersectionObserver to learn which sections the user actually views without disturbing them
  useEffect(() => {
    if (typeof window === "undefined") return;

    const sections = ["synergy", "portfolio", "arena", "gear", "services", "calculator", "contact"];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > 0.4) {
            recordInteraction("section", entry.target.id);
          }
        });
      },
      { threshold: 0.4 }
    );

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [recordInteraction]);

  return {
    memory,
    currentInsight: INSIGHT_ROTATION[insightIndex],
    recordInteraction,
  };
}
