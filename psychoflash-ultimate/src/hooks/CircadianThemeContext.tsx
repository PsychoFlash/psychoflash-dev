import React, { createContext, useContext } from "react";
import { useCircadianTheme, ThemeMode, SolarPhaseInfo } from "./useCircadianTheme";

interface CircadianThemeContextValue {
  mode: ThemeMode;
  setMode: (mode: ThemeMode) => void;
  isEffectiveLight: boolean;
  solarPhase: SolarPhaseInfo;
}

const CircadianThemeContext = createContext<CircadianThemeContextValue | null>(null);

export function CircadianThemeProvider({ children }: { children: React.ReactNode }) {
  const theme = useCircadianTheme();

  return (
    <CircadianThemeContext.Provider value={theme}>
      {children}
    </CircadianThemeContext.Provider>
  );
}

export function useCircadian() {
  const ctx = useContext(CircadianThemeContext);
  if (!ctx) {
    throw new Error("useCircadian must be used within CircadianThemeProvider");
  }
  return ctx;
}
