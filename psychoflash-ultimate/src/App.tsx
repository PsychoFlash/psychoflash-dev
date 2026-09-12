import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import { CircadianThemeProvider } from "@/hooks/CircadianThemeContext";

const Index                   = lazy(() => import("./pages/Index"));
const PrivacyPolicyPage       = lazy(() => import("./pages/PrivacyPolicyPage"));
const AccessibilityStatementPage = lazy(() => import("./pages/AccessibilityStatementPage"));

const Loader = () => (
  <div
    className="min-h-screen flex items-center justify-center"
    style={{ background: "hsl(var(--bg))" }}
    role="status"
    aria-live="polite"
    aria-label="טוען PSYCHOFLASH..."
  >
    <div className="font-orbitron text-xl animate-pulse tracking-widest" style={{ color: "hsl(var(--primary))" }}>
      PSYCHOFLASH<span className="animate-ping">_</span>
    </div>
  </div>
);

export default function App() {
  return (
    <CircadianThemeProvider>
      <BrowserRouter>
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/"                element={<Index />} />
            <Route path="/privacy"         element={<PrivacyPolicyPage />} />
            <Route path="/accessibility"   element={<AccessibilityStatementPage />} />
            {/* Fallback — redirect to home for unknown routes */}
            <Route path="*"               element={<Index />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </CircadianThemeProvider>
  );
}
