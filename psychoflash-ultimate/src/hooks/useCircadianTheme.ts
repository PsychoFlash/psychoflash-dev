import { useState, useEffect, useCallback, useMemo } from "react";

export type ThemeMode = "circadian" | "light" | "dark";

export interface SolarPhaseInfo {
  id: "deep-night" | "dawn" | "sunrise" | "daylight" | "golden-hour" | "dusk" | "night";
  labelHe: string;
  subLabelHe: string;
  icon: string;
  colorTempK: number;
  isDaylight: boolean;
  timeFormatted: string;
}

function getSolarPhase(minuteOfDay: number, now: Date): SolarPhaseInfo {
  const timeFormatted = now.toLocaleTimeString("he-IL", { hour: "2-digit", minute: "2-digit" });

  // 00:00 - 05:15 (0 - 315 min)
  if (minuteOfDay < 315) {
    return {
      id: "deep-night",
      labelHe: "חצות עמוק",
      subLabelHe: "אווירת חלל ולילה שקט",
      icon: "🌌",
      colorTempK: 2200,
      isDaylight: false,
      timeFormatted,
    };
  }
  // 05:15 - 06:15 (315 - 375 min)
  if (minuteOfDay < 375) {
    return {
      id: "dawn",
      labelHe: "עלות השחר",
      subLabelHe: "אור ראשון בגווני לבנדר וורוד",
      icon: "🌄",
      colorTempK: 3000,
      isDaylight: false,
      timeFormatted,
    };
  }
  // 06:15 - 08:30 (375 - 510 min)
  if (minuteOfDay < 510) {
    return {
      id: "sunrise",
      labelHe: "בוקר זהוב",
      subLabelHe: "אור בוקר חמים ורענן",
      icon: "🌅",
      colorTempK: 4000,
      isDaylight: true,
      timeFormatted,
    };
  }
  // 08:30 - 16:30 (510 - 990 min)
  if (minuteOfDay < 990) {
    return {
      id: "daylight",
      labelHe: "אור יום מלא",
      subLabelHe: "תאורת יום צלולה ויוקרתית",
      icon: "☀️",
      colorTempK: 6200,
      isDaylight: true,
      timeFormatted,
    };
  }
  // 16:30 - 18:30 (990 - 1110 min)
  if (minuteOfDay < 1110) {
    return {
      id: "golden-hour",
      labelHe: "שעת הזהב",
      subLabelHe: "קרני שמש ענבריות ונעימות",
      icon: "🌇",
      colorTempK: 3500,
      isDaylight: true,
      timeFormatted,
    };
  }
  // 18:30 - 19:45 (1110 - 1185 min)
  if (minuteOfDay < 1185) {
    return {
      id: "dusk",
      labelHe: "בין השמשות",
      subLabelHe: "שקיעה ודמדומים עמוקים",
      icon: "🌆",
      colorTempK: 2800,
      isDaylight: false,
      timeFormatted,
    };
  }
  // 19:45 - 24:00 (1185 - 1440 min)
  return {
    id: "night",
    labelHe: "שעות הלילה",
    subLabelHe: "מצב Cyber Night ממוקד",
    icon: "🌙",
    colorTempK: 2400,
    isDaylight: false,
    timeFormatted,
  };
}

export function useCircadianTheme() {
  const [mode, setModeState] = useState<ThemeMode>(() => {
    if (typeof window === "undefined") return "circadian";
    const saved = localStorage.getItem("psychoflash-theme-mode") as ThemeMode | null;
    return saved && ["circadian", "light", "dark"].includes(saved) ? saved : "circadian";
  });

  const [now, setNow] = useState(() => new Date());

  // Update clock every second for seamless micro-shifting in circadian mode
  useEffect(() => {
    const update = () => setNow(new Date());
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  const minuteOfDay = useMemo(() => {
    return now.getHours() * 60 + now.getMinutes();
  }, [now]);

  const solarPhase = useMemo(() => {
    return getSolarPhase(minuteOfDay, now);
  }, [minuteOfDay, now]);

  const isEffectiveLight = useMemo(() => {
    if (mode === "light") return true;
    if (mode === "dark") return false;
    return solarPhase.isDaylight;
  }, [mode, solarPhase.isDaylight]);

  const setMode = useCallback((newMode: ThemeMode) => {
    setModeState(newMode);
    try {
      localStorage.setItem("psychoflash-theme-mode", newMode);
    } catch {
      // storage unavailable in private mode
    }
  }, []);

  // Apply continuous, micro-shifting CSS variables dynamically to the document root
  useEffect(() => {
    const root = document.documentElement;

    // Toggle base classes
    root.classList.toggle("light", isEffectiveLight);
    root.classList.toggle("dark", !isEffectiveLight);

    // Continuous day progress (0.0 to 1.0) and second-by-second micro-glide
    const secondsOfDay = now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds();
    const dayProgress = secondsOfDay / 86400; // 0 to 1
    const microCycle = (secondsOfDay % 360) / 360; // subtle 6-minute harmonic wave

    if (isEffectiveLight) {
      // Light Mode: Clear, radiant champagne / ivory where background video is 100% visible!
      // Hue micro-glides continuously between 32° and 44°
      const hueGlide = 36 + Math.sin(dayProgress * Math.PI * 2) * 6 + Math.sin(microCycle * Math.PI * 2) * 2;
      const satGlide = 35 + Math.cos(dayProgress * Math.PI * 2) * 8;
      const lightGlide = 94.5 + Math.sin(microCycle * Math.PI * 2) * 1.5;

      const primaryH = 36 + Math.sin(dayProgress * Math.PI * 2) * 4;
      const primaryS = 82 + Math.cos(microCycle * Math.PI * 2) * 6;
      const primaryL = 38;

      root.style.setProperty("--bg", `${hueGlide.toFixed(1)} ${satGlide.toFixed(1)}% ${lightGlide.toFixed(1)}%`);
      // Semi-translucent glass so background video is clearly visible!
      root.style.setProperty("--bg-card", `0 0% 100%`);
      root.style.setProperty("--fg", `350 45% 8%`); // #1B060D deep espresso
      root.style.setProperty("--fg-muted", `350 25% 22%`); // #46252E crisp dark burgundy
      root.style.setProperty("--primary", `${primaryH.toFixed(1)} ${primaryS.toFixed(1)}% ${primaryL}%`);
      root.style.setProperty("--secondary", `350 65% 36%`);
      root.style.setProperty("--border", `350 20% 75% / 1`);
      root.style.setProperty("--glass", `0 0% 100% / 0.94`);
      root.style.setProperty("--solar-temp", `${solarPhase.colorTempK}`);
      // Lighter video overlay opacity so the video pops in light mode!
      root.style.setProperty("--video-overlay-opacity", "0.65");
    } else {
      // Dark Mode: Continuous night & cosmic spectrum
      // Hue glides through cosmic wine (350°), deep midnight indigo (260°), and obsidian amber (36°)
      let bgH: number;
      if (minuteOfDay < 315) {
        // Deep night: 00:00 - 05:15 -> glides between 270° (cosmic indigo) and 340° (deep wine)
        bgH = 290 + Math.sin((minuteOfDay / 315) * Math.PI) * 35;
      } else if (minuteOfDay < 375) {
        // Dawn: 05:15 - 06:15 -> glides through lavender dawn (280° -> 345°)
        bgH = 300 + ((minuteOfDay - 315) / 60) * 45;
      } else if (minuteOfDay < 1185) {
        // Dusk / Evening: 18:30 - 19:45 -> sunset crimson to wine (355° -> 345°)
        bgH = 350 + Math.sin(microCycle * Math.PI * 2) * 5;
      } else {
        // Night: 19:45 - 24:00 -> cyber wine to sapphire (348° -> 300°)
        bgH = 345 - ((minuteOfDay - 1185) / 255) * 45;
      }

      // Micro-harmonic hue drift (every minute changes smoothly by fraction of degree)
      const primaryHueShift = 36 + Math.sin(dayProgress * Math.PI * 4) * 4 + Math.sin(microCycle * Math.PI * 2) * 2;
      const bgLightness = solarPhase.id === "deep-night" ? 2.6 : 3.8 + Math.sin(microCycle * Math.PI * 2) * 0.4;

      root.style.setProperty("--bg", `${bgH.toFixed(1)} 50% ${bgLightness.toFixed(1)}%`);
      root.style.setProperty("--bg-card", `${bgH.toFixed(1)} 40% 6.5%`);
      root.style.setProperty("--fg", `15 15% 88%`);
      root.style.setProperty("--fg-muted", `350 12% 56%`);
      root.style.setProperty("--primary", `${primaryHueShift.toFixed(1)} 72% 48%`);
      root.style.setProperty("--secondary", `350 55% 42%`);
      root.style.setProperty("--border", `${bgH.toFixed(1)} 30% 16% / 1`);
      root.style.setProperty("--glass", `${bgH.toFixed(1)} 45% 7% / 0.8`);
      root.style.setProperty("--solar-temp", `${solarPhase.colorTempK}`);
      root.style.setProperty("--video-overlay-opacity", "0.75");
    }
  }, [isEffectiveLight, solarPhase, now, mode]);

  return {
    mode,
    setMode,
    isEffectiveLight,
    solarPhase,
  };
}
