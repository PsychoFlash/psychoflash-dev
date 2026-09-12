import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Play, Pause, Volume2, VolumeX, Maximize, Film, Award, CheckCircle2 } from "lucide-react";

interface ShowreelModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Chapter {
  time: number; // in seconds
  titleHe: string;
  project: string;
  tech: string;
}

const CHAPTERS: Chapter[] = [
  { time: 0, titleHe: "פתיח ושואו-ריל מפתח", project: "PSYCHOFLASH Master", tech: "4K DCI · 60fps" },
  { time: 6, titleHe: "הוועד הפראלימפי ישראל", project: "Cinema Brand Reveal", tech: "Sony FX6 · DaVinci" },
  { time: 14, titleHe: "ארנה ירושלים — ש״ס לייב", project: "10,000+ צופים בלייב", tech: "vMix 4K · Blackmagic ATEM" },
  { time: 24, titleHe: "ועידת CyberTech Global", project: "שידור בינלאומי", tech: "Multi-cam PGM · NDI" },
  { time: 34, titleHe: "התקווה 6 — מופעי ענק", project: "אירועי לייב ואצטדיונים", tech: "Broadcast Audio · Dante" },
  { time: 44, titleHe: "תעשייה אווירית IAI ASTRA", project: "חלל ותעופה", tech: "Cinema FPV · Macro BTS" },
];

export default function ShowreelModal({ isOpen, onClose }: ShowreelModalProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [activeChapterIndex, setActiveChapterIndex] = useState(0);

  // Auto-play when opened, pause when closed
  useEffect(() => {
    if (isOpen) {
      setIsPlaying(true);
      if (videoRef.current) {
        videoRef.current.currentTime = 0;
        videoRef.current.play().catch(() => {});
      }
    } else {
      if (videoRef.current) {
        videoRef.current.pause();
      }
    }
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === " ") {
        e.preventDefault();
        togglePlay();
      }
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const curr = videoRef.current.currentTime;
    setCurrentTime(curr);

    // Identify active chapter
    for (let i = CHAPTERS.length - 1; i >= 0; i--) {
      if (curr >= CHAPTERS[i].time) {
        setActiveChapterIndex(i);
        break;
      }
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration || 54);
    }
  };

  const seekTo = (seconds: number) => {
    if (!videoRef.current) return;
    videoRef.current.currentTime = seconds;
    videoRef.current.play().catch(() => {});
    setIsPlaying(true);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const requestFullscreen = () => {
    if (videoRef.current) {
      if (videoRef.current.requestFullscreen) {
        videoRef.current.requestFullscreen();
      }
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 md:p-10">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/85 backdrop-blur-xl"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="relative w-full max-w-5xl rounded-2xl overflow-hidden border shadow-2xl z-10 flex flex-col"
            style={{
              background: "hsl(var(--card))",
              borderColor: "hsl(var(--primary) / 0.4)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Bar / Header */}
            <div
              className="px-5 py-3.5 border-b flex items-center justify-between"
              style={{
                borderColor: "hsl(var(--border))",
                background: "hsl(var(--bg) / 0.6)",
              }}
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "hsl(var(--primary) / 0.15)" }}>
                  <Film size={16} style={{ color: "hsl(var(--primary))" }} />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-orbitron text-xs font-black tracking-widest uppercase" style={{ color: "hsl(var(--primary))" }}>
                      PSYCHOFLASH 4K SHOWREEL MASTER
                    </span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono" style={{ background: "hsl(var(--primary) / 0.1)", color: "hsl(var(--fg-muted))" }}>
                      PRORES 422 HQ
                    </span>
                  </div>
                  <p className="text-[11px] font-medium" style={{ color: "hsl(var(--fg-muted))" }}>
                    בימוי, צילום והפקה: <strong style={{ color: "hsl(var(--fg))" }}>אוריין אדלני</strong> · מערכות vMix 4K & Blackmagic ATEM
                  </p>
                </div>
              </div>

              <button
                onClick={onClose}
                className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-primary/10 transition-colors"
                style={{ color: "hsl(var(--fg-muted))" }}
                aria-label="סגור חלון"
              >
                <X size={18} />
              </button>
            </div>

            {/* Video Player Area */}
            <div className="relative aspect-video bg-black flex items-center justify-center group overflow-hidden">
              <video
                ref={videoRef}
                src="/videos/showreel_master.mp4"
                className="w-full h-full object-contain cursor-pointer"
                onClick={togglePlay}
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleLoadedMetadata}
                onEnded={() => setIsPlaying(false)}
                playsInline
                autoPlay
              />

              {/* Big Play Button Overlay when paused */}
              {!isPlaying && (
                <button
                  onClick={togglePlay}
                  className="absolute w-20 h-20 rounded-full flex items-center justify-center bg-black/60 border border-primary/50 text-primary shadow-2xl backdrop-blur-md hover:scale-110 transition-transform"
                >
                  <Play size={36} fill="currentColor" className="ml-1" />
                </button>
              )}

              {/* Bottom Video Controls Floating Overlay */}
              <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-black/90 via-black/50 to-transparent flex flex-col gap-2 transition-opacity duration-300">
                {/* Timeline Progress Bar */}
                <div
                  className="w-full h-1.5 bg-white/20 rounded-full overflow-hidden cursor-pointer relative"
                  onClick={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const clickX = e.clientX - rect.left;
                    const pct = clickX / rect.width;
                    if (duration) seekTo(pct * duration);
                  }}
                >
                  <div
                    className="h-full transition-all duration-100"
                    style={{
                      width: duration ? `${(currentTime / duration) * 100}%` : "0%",
                      background: "hsl(var(--primary))",
                    }}
                  />
                </div>

                <div className="flex items-center justify-between text-xs text-white">
                  <div className="flex items-center gap-3">
                    <button onClick={togglePlay} className="hover:text-primary transition-colors">
                      {isPlaying ? <Pause size={16} /> : <Play size={16} />}
                    </button>
                    <button onClick={toggleMute} className="hover:text-primary transition-colors">
                      {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
                    </button>
                    <span className="font-mono text-[11px]">
                      {formatTime(currentTime)} / {formatTime(duration || 54)}
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-[11px] font-medium hidden sm:inline text-white/80">
                      פרק נוכחי: {CHAPTERS[activeChapterIndex]?.titleHe}
                    </span>
                    <button onClick={requestFullscreen} className="hover:text-primary transition-colors">
                      <Maximize size={15} />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Chapters & Highlights Tray */}
            <div
              className="p-4 border-t"
              style={{
                borderColor: "hsl(var(--border))",
                background: "hsl(var(--bg) / 0.4)",
              }}
            >
              <div className="text-[10px] font-orbitron font-bold uppercase tracking-widest mb-2" style={{ color: "hsl(var(--fg-muted))" }}>
                מעבר מהיר לפרויקטים מובילים בשואו-ריל:
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
                {CHAPTERS.map((ch, idx) => {
                  const isActive = activeChapterIndex === idx;
                  return (
                    <button
                      key={ch.titleHe}
                      onClick={() => seekTo(ch.time)}
                      className={`text-right p-2 rounded-lg border text-xs transition-all duration-200 flex flex-col justify-between ${
                        isActive ? "border-primary shadow-sm" : "hover:border-primary/40"
                      }`}
                      style={{
                        background: isActive ? "hsl(var(--primary) / 0.15)" : "hsl(var(--card))",
                        borderColor: isActive ? "hsl(var(--primary))" : "hsl(var(--border))",
                      }}
                    >
                      <div className="flex items-center justify-between w-full mb-1">
                        <span className="font-mono text-[10px]" style={{ color: isActive ? "hsl(var(--primary))" : "hsl(var(--fg-muted))" }}>
                          {formatTime(ch.time)}
                        </span>
                        {isActive && <CheckCircle2 size={10} style={{ color: "hsl(var(--primary))" }} />}
                      </div>
                      <div className="font-semibold text-[11px] line-clamp-1" style={{ color: "hsl(var(--fg))" }}>
                        {ch.titleHe}
                      </div>
                      <div className="text-[9px] mt-0.5 line-clamp-1" style={{ color: "hsl(var(--fg-muted))" }}>
                        {ch.tech}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
