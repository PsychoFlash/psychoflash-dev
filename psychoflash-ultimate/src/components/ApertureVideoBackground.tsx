import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Camera, RefreshCw, Play, Aperture, Layers, Eye, Sliders } from "lucide-react";
import { useCircadian } from "@/hooks/CircadianThemeContext";
import OrianElasticCard from "@/components/OrianElasticCard";
import LensApertureScrubber, { FStop } from "@/components/LensApertureScrubber";
import { playTactileSound } from "@/utils/tactileAudio";

export interface MediaClip {
  id: string;
  titleHe: string;
  type: "video" | "image";
  src: string;
  aperture: string;
  gear: string;
}

export const CLIPS: MediaClip[] = [
  {
    id: "bts_concert_vertical",
    titleHe: "מוניטור במאי, תאורת במה וסאונד לייב (צילום במה אישי של אוריין)",
    type: "video",
    src: "/videos/bg_concert_vertical.mp4",
    aperture: "f/1.8",
    gear: "Sony FX6 · SmallHD Director Monitor · Live Stage Rig",
  },
  {
    id: "arena_shas_master",
    titleHe: "כנס ש\"ס פיס ארנה 20.08.2026 — נאום מרכזי ומנוע AI לכתוביות",
    type: "video",
    src: "/videos/arena_shas_master_highlights.mp4",
    aperture: "f/2.8",
    gear: "12-Cam Master · vMix 4K Pro · Live Premiere AI · Dante",
  },
  {
    id: "bts_gear_macro",
    titleHe: "תקריב נתב שידור ופוטנציומטרים: ניתוב 4K חי",
    type: "video",
    src: "/videos/bts_gear_macro.mp4",
    aperture: "f/1.4",
    gear: "ATEM Constellation · Precision Switcher T-Bar",
  },
  {
    id: "vts_vegas_keynote",
    titleHe: "Wiz Beyond Las Vegas — במת Keynote ושידור מליאה 4K",
    type: "video",
    src: "/videos/vts_vegas_keynote.mp4",
    aperture: "f/1.4",
    gear: "Wiz Keynote Stage · Blackmagic ATEM · SMPTE Fiber Optic Link",
  },
  {
    id: "paralympic_master",
    titleHe: "סרט מיתוג 4K DCI HDR לוועד הפראלימפי ישראל (Sony FX6)",
    type: "video",
    src: "/videos/paralympic_master_film.mp4",
    aperture: "f/1.2",
    gear: "Sony FX6 Cinema Line · DaVinci Resolve Studio DCI HDR",
  },
  {
    id: "astra_keynote",
    titleHe: "כנס ASTRA Demo Day 2026 — תעשייה אווירית ו-Starburst Aerospace",
    type: "video",
    src: "/videos/astra_master_keynote.mp4",
    aperture: "f/2.0",
    gear: "Balanced Multi-Cam Setup · Sony Cinema · vMix 4K Pro",
  },
  {
    id: "redbull_action",
    titleHe: "Red Bull Extreme Action — שידור חי וסלואו-מושן 120fps",
    type: "video",
    src: "/videos/redbull_master_action.mp4",
    aperture: "f/2.8",
    gear: "vMix Instant Replay · Sony FX3 120fps · Teradek Bolt 4K",
  },
  {
    id: "vts_nba_bodycam",
    titleHe: "NBA All-Stars BodyCam RF — דונבן מיטשל ו-וומבי בשידור חי TNT",
    type: "video",
    src: "/videos/vts_nba_bodycam.mp4",
    aperture: "f/2.0",
    gear: "MindFly Live ChestCam · TNT Uplink · Sub-Ghz RF",
  },
  {
    id: "cybertech_satellite",
    titleHe: "ועידת CyberTech Global ושידורי לוויין באקספו תל אביב",
    type: "video",
    src: "/videos/bg_cybertech.mp4",
    aperture: "f/2.8",
    gear: "Live Satellite Stream · SRT Low-Latency Uplink · ATEM 4K",
  },
];

interface ApertureVideoBackgroundProps {
  onOpenShowreel?: () => void;
  externalTriggerCycle?: number;
}

export default function ApertureVideoBackground({ onOpenShowreel, externalTriggerCycle }: ApertureVideoBackgroundProps) {
  // Dual-Buffer State for ultra-soft crossfade
  const [activeSlot, setActiveSlot] = useState<0 | 1>(0);
  const [slot0Media, setSlot0Media] = useState<MediaClip>(CLIPS[0]);
  const [slot1Media, setSlot1Media] = useState<MediaClip>(CLIPS[1]);
  const [isCrossfading, setIsCrossfading] = useState(false);
  const [irisRotation, setIrisRotation] = useState(0);
  const [scrollFraction, setScrollFraction] = useState(0);
  const [currentScannedSection, setCurrentScannedSection] = useState("HERO · DIRECTOR STAGE MONITOR");
  const [manualFStop, setManualFStop] = useState<FStop | null>(null);
  const [customFocalScale, setCustomFocalScale] = useState(1.0);
  const [lensScrubberOpen, setLensScrubberOpen] = useState(false);

  const video0Ref = useRef<HTMLVideoElement>(null);
  const video1Ref = useRef<HTMLVideoElement>(null);
  const { isEffectiveLight } = useCircadian();

  const currentClip = activeSlot === 0 ? slot0Media : slot1Media;

  // Listen for external optical controls (f-stop and focal length)
  useEffect(() => {
    const handleFStop = (e: Event) => {
      const detail = (e as CustomEvent<{ fstop: FStop }>).detail;
      if (detail?.fstop) setManualFStop(detail.fstop);
    };
    const handleFocal = (e: Event) => {
      const detail = (e as CustomEvent<{ focal: string; scale: number }>).detail;
      if (detail?.scale) setCustomFocalScale(detail.scale);
    };
    window.addEventListener("pf-lens-fstop-change", handleFStop);
    window.addEventListener("pf-lens-focal-change", handleFocal);
    return () => {
      window.removeEventListener("pf-lens-fstop-change", handleFStop);
      window.removeEventListener("pf-lens-focal-change", handleFocal);
    };
  }, []);

  // Targeted ultra-soft dual-buffer crossfade function:
  // Fades between slot 0 and slot 1 with zero freeze, zero black frames, continuous playback
  const crossfadeToMedia = useCallback((newClip: { src: string; titleHe: string; gear?: string; aperture?: string }, sectionName?: string) => {
    // Determine currently visible media
    const currentMedia = activeSlot === 0 ? slot0Media : slot1Media;
    if (currentMedia.src === newClip.src) {
      if (sectionName) setCurrentScannedSection(sectionName);
      return;
    }

    if (isCrossfading) return;
    setIsCrossfading(true);
    setIrisRotation((prev) => prev + 35);
    if (sectionName) setCurrentScannedSection(sectionName);

    const mediaObj: MediaClip = {
      id: "media_" + Date.now(),
      titleHe: newClip.titleHe,
      type: "video",
      src: newClip.src,
      aperture: newClip.aperture || "f/1.8",
      gear: newClip.gear || "Sony Cinema Line · PGM Master",
    };

    if (activeSlot === 0) {
      setSlot1Media(mediaObj);
      if (video1Ref.current) {
        if (video1Ref.current.src !== newClip.src) {
          video1Ref.current.src = newClip.src;
        }
        video1Ref.current.currentTime = 0;
        video1Ref.current.play().catch(() => {});
      }
      setTimeout(() => {
        setActiveSlot(1);
        setTimeout(() => setIsCrossfading(false), 850);
      }, 60);
    } else {
      setSlot0Media(mediaObj);
      if (video0Ref.current) {
        if (video0Ref.current.src !== newClip.src) {
          video0Ref.current.src = newClip.src;
        }
        video0Ref.current.currentTime = 0;
        video0Ref.current.play().catch(() => {});
      }
      setTimeout(() => {
        setActiveSlot(0);
        setTimeout(() => setIsCrossfading(false), 850);
      }, 60);
    }
  }, [activeSlot, isCrossfading, slot0Media, slot1Media]);

  // Cyclic transition for button click or idle timer
  const cycleToNextClip = useCallback(() => {
    const currentIdx = CLIPS.findIndex(c => c.src === currentClip.src);
    const nextIdx = (currentIdx + 1) % CLIPS.length;
    crossfadeToMedia(CLIPS[nextIdx]);
  }, [currentClip, crossfadeToMedia]);

  // Listen for active portfolio card broadcasts:
  // When user scrolls or views any portfolio card, background video synchronizes smoothly!
  useEffect(() => {
    const handleBgSync = (e: Event) => {
      const customEvt = e as CustomEvent<{ src: string; title: string; gear?: string; aperture?: string; section?: string }>;
      if (!customEvt.detail?.src) return;

      crossfadeToMedia(
        {
          src: customEvt.detail.src,
          titleHe: customEvt.detail.title,
          gear: customEvt.detail.gear,
          aperture: customEvt.detail.aperture,
        },
        customEvt.detail.section
      );
    };

    window.addEventListener("pf-sync-bg-video", handleBgSync);
    return () => window.removeEventListener("pf-sync-bg-video", handleBgSync);
  }, [crossfadeToMedia]);

  // Scroll tracking: parallax motion, mechanical iris rotation and section mapping
  useEffect(() => {
    let rafId = 0;
    const handleScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const scrollY = window.scrollY;
        const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
        const frac = Math.min(1, Math.max(0, scrollY / maxScroll));
        setScrollFraction(frac);

        // Section tracking offsets
        const portfolioEl = document.getElementById("portfolio");
        const synergyEl = document.getElementById("synergy");
        const circlesEl = document.getElementById("production-circles");
        const contactEl = document.getElementById("contact");

        const vh = window.innerHeight;
        const triggerPoint = scrollY + vh * 0.42;

        if (contactEl && triggerPoint >= contactEl.offsetTop) {
          crossfadeToMedia(CLIPS[8], "CONTACT · LIVE BROADCAST COMMAND");
        } else if (circlesEl && triggerPoint >= circlesEl.offsetTop) {
          crossfadeToMedia(CLIPS[2], "BRAND EXCHANGE · בורסת מעגלי הפקה");
        } else if (synergyEl && triggerPoint >= synergyEl.offsetTop) {
          crossfadeToMedia(CLIPS[3], "SYNERGY · ניתוב T-BAR ולוויין");
        } else if (portfolioEl && triggerPoint >= portfolioEl.offsetTop && (!synergyEl || triggerPoint < synergyEl.offsetTop)) {
          // Inside portfolio: in-view cards broadcast themselves via pf-sync-bg-video!
          setCurrentScannedSection("PORTFOLIO · כרטיסיות הפקה בלייב");
        } else if (scrollY < 200) {
          crossfadeToMedia(CLIPS[0], "HERO · DIRECTOR STAGE MONITOR");
        }
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(rafId);
    };
  }, [crossfadeToMedia]);

  // Autonomous cycle only if idle at the very top of Hero
  useEffect(() => {
    const timer = setInterval(() => {
      if (window.scrollY < 120) {
        cycleToNextClip();
      }
    }, 18000);
    return () => clearInterval(timer);
  }, [cycleToNextClip]);

  // External trigger
  useEffect(() => {
    if (externalTriggerCycle && externalTriggerCycle > 0) {
      cycleToNextClip();
    }
  }, [externalTriggerCycle, cycleToNextClip]);

  // Start initial playback
  useEffect(() => {
    if (video0Ref.current) {
      video0Ref.current.play().catch(() => {});
    }
  }, []);

  const clip0 = slot0Media;
  const clip1 = slot1Media;

  // Optical Aperture Geometry Calculation:
  // Calculates optical aperture center & iris rotation matching camera lens physics
  const apertureY = 38 + scrollFraction * 26; // Smooth downward scan
  const apertureRotationDeg = irisRotation + scrollFraction * 220;
  const naturalFStop = scrollFraction < 0.15 ? "f/1.2" : scrollFraction < 0.35 ? "f/1.8" : scrollFraction < 0.6 ? "f/2.8" : scrollFraction < 0.85 ? "f/5.6" : "f/11";
  const currentFStop = manualFStop || naturalFStop;

  const dofBlurMap: Record<string, number> = {
    "f/1.2": 7,
    "f/1.4": 5,
    "f/1.8": 3,
    "f/2.8": 1,
    "f/4.0": 0,
    "f/5.6": 0,
    "f/8.0": 0,
    "f/11": 0,
  };
  const dofBlur = dofBlurMap[currentFStop] ?? 0;

  // Dynamic Camera Parallax: shifts video slightly vertically and scales gently with scroll & focal preset
  const parallaxOffsetY = (scrollFraction - 0.5) * -75;
  const parallaxScale = (1.05 + scrollFraction * 0.08) * customFocalScale;

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* 
        LAYER 0: Dual-Buffer Video Layer with Optical Aperture Lens Shutter Mask & Scroll Parallax
        Active across the entire scroll of the site!
      */}
      <div
        className="absolute inset-0 transition-transform duration-300 ease-out"
        style={{
          transform: `scale(${parallaxScale}) translateY(${parallaxOffsetY}px)`,
          maskImage: `radial-gradient(circle at 50% ${apertureY}%, black 48%, rgba(0,0,0,0.65) 76%, transparent 98%)`,
          WebkitMaskImage: `radial-gradient(circle at 50% ${apertureY}%, black 48%, rgba(0,0,0,0.65) 76%, transparent 98%)`,
        }}
      >
        {/* Buffer Slot 0 */}
        <div
          className="absolute inset-0 transition-opacity duration-1000 ease-in-out"
          style={{ opacity: activeSlot === 0 ? (isEffectiveLight ? 0.46 : 0.52) : 0 }}
        >
          <video
            ref={video0Ref}
            src={clip0.src}
            autoPlay
            loop
            muted
            playsInline
            onCanPlay={(e) => (e.target as HTMLVideoElement).play().catch(() => {})}
            onEnded={(e) => {
              const v = e.target as HTMLVideoElement;
              v.currentTime = 0;
              v.play().catch(() => {});
            }}
            className="w-full h-full object-cover transition-all duration-300"
            style={{
              filter: `${isEffectiveLight ? "brightness(0.96) contrast(1.18) saturate(1.15)" : "saturate(1.25) contrast(1.15)"} ${dofBlur > 0 ? `blur(${dofBlur}px)` : ""}`,
            }}
          />
        </div>

        {/* Buffer Slot 1 */}
        <div
          className="absolute inset-0 transition-opacity duration-1000 ease-in-out"
          style={{ opacity: activeSlot === 1 ? (isEffectiveLight ? 0.46 : 0.52) : 0 }}
        >
          <video
            ref={video1Ref}
            src={clip1.src}
            autoPlay
            loop
            muted
            playsInline
            onCanPlay={(e) => (e.target as HTMLVideoElement).play().catch(() => {})}
            onEnded={(e) => {
              const v = e.target as HTMLVideoElement;
              v.currentTime = 0;
              v.play().catch(() => {});
            }}
            className="w-full h-full object-cover transition-all duration-300"
            style={{
              filter: `${isEffectiveLight ? "brightness(0.96) contrast(1.18) saturate(1.15)" : "saturate(1.25) contrast(1.15)"} ${dofBlur > 0 ? `blur(${dofBlur}px)` : ""}`,
            }}
          />
        </div>
      </div>

      {/* Atmospheric Theme Gradient Overlays — Clear in light mode so video shines through! */}
      <div
        className="absolute inset-0 transition-colors duration-700"
        style={{
          background: isEffectiveLight
            ? "radial-gradient(circle at 50% 50%, hsl(var(--bg) / 0.22) 0%, hsl(var(--bg) / 0.44) 88%)"
            : "radial-gradient(circle at 50% 50%, hsl(var(--bg) / 0.55) 0%, hsl(var(--bg) / 0.84) 88%)",
        }}
      />

      {/* 
        LAYER 1: GEOMETRIC APERTURE IRIS VIEWFINDER (NO BLUE CANVAS RADAR)
        Authentic camera lens shutter blades, optical crosshairs & f-stop markings
      */}
      <div
        className="absolute inset-0 pointer-events-none z-10 flex items-center justify-center transition-transform duration-700"
        style={{
          transform: `translateY(${(scrollFraction - 0.2) * 120}px)`,
        }}
      >
        {/* Optical Aperture Shutter Ring */}
        <div
          className="relative rounded-full border transition-transform duration-1000 ease-out"
          style={{
            width: "min(72vw, 560px)",
            height: "min(72vw, 560px)",
            borderColor: isEffectiveLight ? "rgba(180, 130, 40, 0.35)" : "rgba(234, 179, 8, 0.35)",
            transform: `rotate(${apertureRotationDeg}deg)`,
            boxShadow: isEffectiveLight
              ? "0 0 30px rgba(180, 130, 40, 0.08), inset 0 0 30px rgba(180, 130, 40, 0.08)"
              : "0 0 35px rgba(234, 179, 8, 0.12), inset 0 0 35px rgba(234, 179, 8, 0.12)",
          }}
        >
          {/* 8 Mechanical Shutter Blades Geometry */}
          {[0, 45, 90, 135, 180, 225, 270, 315].map((deg, i) => (
            <div
              key={deg}
              className="absolute inset-0"
              style={{ transform: `rotate(${deg}deg)` }}
            >
              <div
                className="w-full h-[1px] absolute top-1/2 left-0 -translate-y-1/2 opacity-30"
                style={{
                  background: isEffectiveLight
                    ? "linear-gradient(90deg, transparent, rgba(180, 130, 40, 0.6) 20%, rgba(180, 130, 40, 0.1) 80%, transparent)"
                    : "linear-gradient(90deg, transparent, rgba(234, 179, 8, 0.6) 20%, rgba(234, 179, 8, 0.1) 80%, transparent)",
                }}
              />
              <div
                className="absolute top-2 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full"
                style={{
                  background: i % 2 === 0 ? "hsl(var(--primary))" : "rgba(255,255,255,0.4)",
                  opacity: 0.7,
                }}
              />
            </div>
          ))}

          {/* Inner Iris Core Ring */}
          <div
            className="absolute inset-[22%] rounded-full border border-dashed transition-colors"
            style={{
              borderColor: isEffectiveLight ? "rgba(180, 130, 40, 0.25)" : "rgba(234, 179, 8, 0.25)",
            }}
          />

          {/* Center Precision Optical Reticle */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div
              className="w-10 h-10 rounded-full border flex items-center justify-center"
              style={{
                borderColor: isEffectiveLight ? "rgba(180, 130, 40, 0.4)" : "rgba(234, 179, 8, 0.5)",
              }}
            >
              <div className="w-1.5 h-1.5 rounded-full bg-primary animate-ping" />
            </div>
          </div>
        </div>

        {/* Optical Focus Distance & f-stop HUD Ticks around Iris */}
        <div className="absolute flex items-center justify-between w-[min(80vw,640px)] px-4 font-orbitron text-[9px] font-bold tracking-widest text-primary/70">
          <span className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />
            IRIS: {currentFStop}
          </span>
          <span className="hidden sm:inline-block">FOCUS: 1.8m · T-STOP 1.4</span>
          <span>SONY FX6 · 4K 10-BIT</span>
        </div>
      </div>

      {/* Grid Pattern overlay */}
      <div className="absolute inset-0 grid-pattern opacity-10 pointer-events-none" />

      {/* 
        LAYER 3: Clean Centered Lens HUD Dock
        Docked at bottom-center of Hero — fades smoothly when scrolling into content!
      */}
      <div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2 transition-all duration-500"
        style={{
          opacity: scrollFraction > 0.14 ? 0 : 1,
          pointerEvents: scrollFraction > 0.14 ? "none" : "auto",
          transform: `translate(-50%, ${scrollFraction > 0.14 ? "20px" : "0px"})`,
        }}
      >
        {/* Interactive Lens Aperture & Focal Length Popover */}
        {lensScrubberOpen && (
          <div className="w-[min(90vw,380px)] animate-in fade-in slide-in-from-bottom-2 duration-200 pointer-events-auto">
            <LensApertureScrubber
              currentFStop={currentFStop as FStop}
              onFStopChange={(f) => setManualFStop(f)}
            />
          </div>
        )}

        <div
          className="flex items-center gap-3 px-5 py-2.5 rounded-2xl border shadow-xl backdrop-blur-xl pointer-events-auto"
          style={{
            background: isEffectiveLight ? "rgba(255, 255, 255, 0.88)" : "rgba(18, 6, 12, 0.88)",
            borderColor: isEffectiveLight ? "rgba(180, 130, 40, 0.4)" : "rgba(234, 179, 8, 0.4)",
            boxShadow: isEffectiveLight
              ? "0 10px 30px -5px rgba(0, 0, 0, 0.12), 0 0 15px rgba(180, 130, 40, 0.15)"
              : "0 10px 30px -5px rgba(0, 0, 0, 0.6), 0 0 15px rgba(234, 179, 8, 0.15)",
          }}
        >
          {/* Camera Aperture Interactive Button */}
          <button
            data-cursor="aperture"
            onClick={() => {
              playTactileSound("switch");
              setLensScrubberOpen(!lensScrubberOpen);
            }}
            className="flex items-center gap-2 px-1.5 py-0.5 rounded-lg border border-transparent hover:border-primary/50 hover:bg-primary/10 transition-colors"
            title="כוונן צמצם אופטי ועומק שדה (f-stop)"
          >
            <Aperture size={15} className="text-primary animate-spin" style={{ animationDuration: "16s" }} />
            <span className="font-orbitron text-[10px] font-bold text-primary tracking-wider">
              {currentFStop}
            </span>
          </button>

          <div className="w-[1px] h-4 bg-border/60" />

          {/* Current Live Feed Title */}
          <div className="text-right max-w-[280px] sm:max-w-[340px] truncate">
            <p className="font-orbitron text-[8px] uppercase tracking-wider text-foreground-muted">
              {currentScannedSection}
            </p>
            <p className="text-xs font-bold truncate text-foreground" title={currentClip.titleHe}>
              {currentClip.titleHe}
            </p>
          </div>

          <div className="w-[1px] h-4 bg-border/60" />

          {/* Next Visual Button */}
          <button
            onClick={cycleToNextClip}
            className="p-1.5 rounded-lg border border-border/60 hover:border-primary/80 hover:bg-primary/10 text-foreground-muted hover:text-primary transition-colors flex items-center gap-1 text-[10px] font-orbitron"
            title="החלף לוידאו הבא"
          >
            <RefreshCw size={12} className={isCrossfading ? "animate-spin" : ""} />
            <span className="hidden sm:inline">הבא</span>
          </button>
        </div>
      </div>
    </div>
  );
}
