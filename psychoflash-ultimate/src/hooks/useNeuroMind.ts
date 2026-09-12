/**
 * useNeuroMind — The Behavioral Learning Engine
 *
 * A real-time, privacy-safe behavioral profiler that runs entirely in-browser.
 * Tracks mouse dynamics, dwell time, scroll patterns, and section engagement
 * to compute an "interest weight vector" that drives adaptive UI.
 *
 * Profiles: broadcast | hitech | events | creative
 */

import { useEffect, useRef, useState, useCallback } from "react";

export type NeuroProfile = "broadcast" | "hitech" | "events" | "creative" | "unknown";

export interface NeuroState {
  // Interest weights [0, 1] per domain
  weights: {
    broadcast: number;
    hitech: number;
    events: number;
    creative: number;
  };
  // Dominant profile
  profile: NeuroProfile;
  // Behavioral signals
  signals: {
    mouseVelocity: number;      // 0 = still, 1 = very fast
    scrollIntensity: number;    // 0 = slow reader, 1 = skimmer
    engagementDepth: number;    // 0 = glancing, 1 = deep focus
    sessionProgress: number;    // 0-1 how far through journey
    interactionCount: number;   // total meaningful interactions
  };
  // Color/vibe adaptation [0, 1]
  colorTemperature: number;   // 0 = cool calm, 1 = warm intense
  glowIntensity: number;      // 0-1 driven by recent activity
  // Section focus
  focusedSection: string | null;
  // Milliseconds into session
  sessionAge: number;
}

// Keywords that map sections / hover targets to profiles
const PROFILE_KEYWORDS: Record<NeuroProfile, readonly string[]> = {
  broadcast: ["שידור", "broadcast", "live", "stream", "vMix", "Blackmagic", "ATEM", "לוויין", "קשת", "שידור חי"],
  hitech: ["AI", "Pipeline", "Runway", "Kling", "automation", "AI Production", "tech", "code", "script", "api"],
  events: ["אירוע", "event", "חתונה", "wedding", "הפקה", "conference", "stage", "אולם", "concert", "סמבו"],
  creative: ["4K", "portrait", "creative", "art", "design", "יצירה", "photography", "film", "post", "visual"],
  unknown: [],
};

const DEFAULT_STATE: NeuroState = {
  weights: { broadcast: 0.25, hitech: 0.25, events: 0.25, creative: 0.25 },
  profile: "unknown",
  signals: {
    mouseVelocity: 0,
    scrollIntensity: 0,
    engagementDepth: 0,
    sessionProgress: 0,
    interactionCount: 0,
  },
  colorTemperature: 0,
  glowIntensity: 0,
  focusedSection: null,
  sessionAge: 0,
};

function detectKeywords(text: string): NeuroProfile | null {
  const lower = text.toLowerCase();
  for (const [profile, keywords] of Object.entries(PROFILE_KEYWORDS)) {
    if (profile === "unknown") continue;
    if (keywords.some((kw) => lower.includes(kw.toLowerCase()))) {
      return profile as NeuroProfile;
    }
  }
  return null;
}

function computeDominant(weights: NeuroState["weights"]): NeuroProfile {
  const entries = Object.entries(weights) as [NeuroProfile, number][];
  const max = entries.reduce((a, b) => (b[1] > a[1] ? b : a));
  const delta = max[1] - 0.25;
  return delta > 0.05 ? max[0] : "unknown";
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * Math.min(1, Math.max(0, t));
}

export function useNeuroMind() {
  const [state, setState] = useState<NeuroState>(() => {
    try {
      const saved = sessionStorage.getItem("neuro_state");
      if (saved) return { ...DEFAULT_STATE, ...JSON.parse(saved) };
    } catch {}
    return DEFAULT_STATE;
  });

  const refs = useRef({
    lastMouseX: 0,
    lastMouseY: 0,
    lastMouseTime: Date.now(),
    lastScrollY: 0,
    lastScrollTime: Date.now(),
    dwellTimers: {} as Record<string, ReturnType<typeof setTimeout>>,
    sessionStart: Date.now(),
    velocityBuffer: [] as number[],
    scrollBuffer: [] as number[],
    raf: 0,
  });

  // Save to session periodically
  const saveState = useCallback((s: NeuroState) => {
    try {
      sessionStorage.setItem("neuro_state", JSON.stringify(s));
    } catch {}
  }, []);

  // Boost a profile's weight on meaningful interaction
  const boostProfile = useCallback((profile: NeuroProfile, amount = 0.04) => {
    if (profile === "unknown") return;
    setState((prev) => {
      const w = { ...prev.weights };
      w[profile] = Math.min(1, w[profile] + amount);
      // Normalize
      const total = Object.values(w).reduce((a, b) => a + b, 0);
      const normalized = Object.fromEntries(
        Object.entries(w).map(([k, v]) => [k, v / total])
      ) as NeuroState["weights"];
      const newState = {
        ...prev,
        weights: normalized,
        profile: computeDominant(normalized),
        signals: {
          ...prev.signals,
          interactionCount: prev.signals.interactionCount + 1,
        },
        glowIntensity: Math.min(1, prev.glowIntensity + 0.15),
      };
      saveState(newState);
      return newState;
    });
  }, [saveState]);

  // Track section focus via IntersectionObserver
  const observeSection = useCallback((el: Element, sectionId: string) => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > 0.4) {
            setState((prev) => ({ ...prev, focusedSection: sectionId }));
            // Detect profile from section content
            const text = el.textContent || "";
            const profile = detectKeywords(text);
            if (profile) boostProfile(profile, 0.02);
          }
        });
      },
      { threshold: [0.2, 0.4, 0.7] }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [boostProfile]);

  // Mouse movement tracking
  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      const now = Date.now();
      const dx = e.clientX - refs.current.lastMouseX;
      const dy = e.clientY - refs.current.lastMouseY;
      const dt = Math.max(1, now - refs.current.lastMouseTime);
      const velocity = Math.sqrt(dx * dx + dy * dy) / dt;

      refs.current.velocityBuffer.push(velocity);
      if (refs.current.velocityBuffer.length > 20) {
        refs.current.velocityBuffer.shift();
      }

      refs.current.lastMouseX = e.clientX;
      refs.current.lastMouseY = e.clientY;
      refs.current.lastMouseTime = now;

      // Detect hovered text for profile boosting
      const el = document.elementFromPoint(e.clientX, e.clientY);
      if (el?.textContent) {
        const profile = detectKeywords(el.textContent.substring(0, 100));
        if (profile) boostProfile(profile, 0.005);
      }
    };

    window.addEventListener("mousemove", handleMouse, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouse);
  }, [boostProfile]);

  // Scroll tracking
  useEffect(() => {
    const handleScroll = () => {
      const now = Date.now();
      const dy = Math.abs(window.scrollY - refs.current.lastScrollY);
      const dt = Math.max(1, now - refs.current.lastScrollTime);
      const rate = dy / dt;

      refs.current.scrollBuffer.push(rate);
      if (refs.current.scrollBuffer.length > 15) refs.current.scrollBuffer.shift();

      refs.current.lastScrollY = window.scrollY;
      refs.current.lastScrollTime = now;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Animation frame: continuously compute derived signals
  useEffect(() => {
    let frame: number;
    const tick = () => {
      const now = Date.now();
      const sessionAge = now - refs.current.sessionStart;
      const totalHeight = document.body.scrollHeight - window.innerHeight;
      const sessionProgress = totalHeight > 0 ? window.scrollY / totalHeight : 0;

      const avgVelocity =
        refs.current.velocityBuffer.length > 0
          ? refs.current.velocityBuffer.reduce((a, b) => a + b, 0) /
            refs.current.velocityBuffer.length
          : 0;

      const avgScroll =
        refs.current.scrollBuffer.length > 0
          ? refs.current.scrollBuffer.reduce((a, b) => a + b, 0) /
            refs.current.scrollBuffer.length
          : 0;

      // Normalize signals to [0, 1]
      const mouseVelocity = Math.min(1, avgVelocity / 2.5);
      const scrollIntensity = Math.min(1, avgScroll / 1.5);
      const engagementDepth = Math.max(0, 1 - scrollIntensity * 0.5 - mouseVelocity * 0.3);

      setState((prev) => {
        const glowDecay = lerp(prev.glowIntensity, mouseVelocity * 0.6 + scrollIntensity * 0.4, 0.05);
        const tempTarget = mouseVelocity * 0.4 + scrollIntensity * 0.3 + sessionProgress * 0.3;
        const colorTemp = lerp(prev.colorTemperature, tempTarget, 0.03);

        return {
          ...prev,
          signals: {
            ...prev.signals,
            mouseVelocity,
            scrollIntensity,
            engagementDepth,
            sessionProgress,
          },
          colorTemperature: colorTemp,
          glowIntensity: glowDecay,
          sessionAge,
        };
      });

      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, []);

  return { state, boostProfile, observeSection };
}
