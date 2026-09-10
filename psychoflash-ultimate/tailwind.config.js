import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: { DEFAULT: "hsl(var(--primary))", foreground: "hsl(var(--primary-foreground))" },
        secondary: { DEFAULT: "hsl(var(--secondary))", foreground: "hsl(var(--secondary-foreground))" },
        muted: { DEFAULT: "hsl(var(--muted))", foreground: "hsl(var(--muted-foreground))" },
        card: { DEFAULT: "hsl(var(--card))", foreground: "hsl(var(--card-foreground))" },
        border: "hsl(var(--border))",
      },
      fontFamily: {
        orbitron: ["Orbitron", "monospace"],
        teko: ["Teko", "sans-serif"],
      },
      keyframes: {
        "glitch-1": {
          "0%,100%": { clipPath: "inset(40% 0 61% 0)" },
          "20%": { clipPath: "inset(92% 0 1% 0)" },
          "40%": { clipPath: "inset(43% 0 1% 0)" },
          "60%": { clipPath: "inset(25% 0 58% 0)" },
          "80%": { clipPath: "inset(54% 0 7% 0)" },
        },
        "glitch-2": {
          "0%,100%": { clipPath: "inset(50% 0 30% 0)" },
          "20%": { clipPath: "inset(10% 0 85% 0)" },
          "40%": { clipPath: "inset(63% 0 5% 0)" },
          "60%": { clipPath: "inset(5% 0 80% 0)" },
          "80%": { clipPath: "inset(75% 0 10% 0)" },
        },
        ticker: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        float: {
          "0%,100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        pulse2: {
          "0%,100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: "0.4", transform: "scale(0.85)" },
        },
        scanline: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(200vh)" },
        },
        "neon-flicker": {
          "0%,19%,21%,23%,25%,54%,56%,100%": { 
            textShadow: "0 0 10px hsl(187,100%,50%), 0 0 30px hsl(187,100%,50%), 0 0 60px hsl(187,100%,50%)"
          },
          "20%,24%,55%": { textShadow: "none", opacity: "0.9" },
        },
        "rotate-slow": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
      },
      animation: {
        "glitch-1": "glitch-1 0.8s linear infinite",
        "glitch-2": "glitch-2 0.8s linear infinite",
        ticker: "ticker 40s linear infinite",
        float: "float 6s ease-in-out infinite",
        pulse2: "pulse2 2s ease-in-out infinite",
        scanline: "scanline 8s linear infinite",
        "neon-flicker": "neon-flicker 4s linear infinite",
        "rotate-slow": "rotate-slow 20s linear infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
