import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, ExternalLink, ChevronLeft, ChevronRight, Sparkles, Layers, Video, Image as ImageIcon } from "lucide-react";
import { FEATURED_PROJECTS, PARTNERS_DATA, type FeaturedProject, type BtsPhoto } from "@/data/psychoflashData";
import OrianElasticCard from "@/components/OrianElasticCard";
import { getRandomMisterHorseTransition, type MisterHorseTransition } from "@/utils/misterHorseTransitions";

const CATS = ["ALL", "BROADCAST", "LIVE", "CINEMA", "EVENTS"] as const;

interface CardVisual {
  type: "video" | "image";
  src: string;
  title: string;
  badge: string;
}

// Single Project Card with IntersectionObserver, In-View Video Play/Pause & Mister Horse Transitions
function ProjectCard({
  item,
  index,
  onSelect,
}: {
  item: FeaturedProject;
  index: number;
  onSelect: () => void;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const [isInView, setIsInView] = useState(false);
  const [visualIndex, setVisualIndex] = useState(0);
  const [activeTransition, setActiveTransition] = useState<MisterHorseTransition>(() => getRandomMisterHorseTransition());
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Compile full visual reel: Master video + secondary clips + authentic BTS photos
  const visuals: CardVisual[] = [
    { type: "video", src: item.videoSrc, title: "🎬 מוצר מוגמר (Master Cut)", badge: "MASTER 4K" },
    ...(item.galleryPhotos || item.story?.btsImages || []).slice(0, 4).map((p, idx) => ({
      type: "image" as const,
      src: p.src,
      title: p.caption || `📸 צילום שטח #${idx + 1}`,
      badge: p.date ? `BTS · ${p.date}` : `BTS STILL #${idx + 1}`,
    })),
  ];

  if (item.videoClips && item.videoClips.length > 1) {
    item.videoClips.slice(1).forEach((clip) => {
      visuals.push({
        type: "video",
        src: clip.src,
        title: clip.title,
        badge: clip.type.toUpperCase(),
      });
    });
  }

  const currentVisual = visuals[visualIndex % visuals.length];

  // IntersectionObserver: Plays video when in view, pauses when exiting frame
  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.15) {
            setIsInView(true);
            // Broadcast active card to ApertureVideoBackground if strongly focused
            if (entry.intersectionRatio >= 0.35) {
              window.dispatchEvent(
                new CustomEvent("pf-sync-bg-video", {
                  detail: {
                    src: item.videoSrc,
                    title: item.title,
                    gear: item.story?.techSpecs?.[0] || "Sony FX6 · Broadcast PGM",
                    aperture: "f/1.8",
                    section: `PORTFOLIO · ${item.title}`,
                  },
                })
              );
            }
          } else if (!entry.isIntersecting || entry.intersectionRatio < 0.1) {
            setIsInView(false);
          }
        });
      },
      { threshold: [0.1, 0.25, 0.4, 0.7] }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [item]);

  // Handle video play/pause strictly based on in-view status
  useEffect(() => {
    if (!videoRef.current) return;
    if (isInView && currentVisual.type === "video") {
      videoRef.current.play().catch(() => {});
    } else {
      videoRef.current.pause();
    }
  }, [isInView, currentVisual, visualIndex]);

  // Midpoint cut transition: Outgoing media whips/zooms to apex, swaps at 42%, incoming media lands!
  const triggerTransition = (targetIndex: number) => {
    if (isTransitioning) return;
    const nextTrans = getRandomMisterHorseTransition();
    setActiveTransition(nextTrans);
    setIsTransitioning(true);

    // Swap at apex of motion blur / black frame / flash
    const apexTime = Math.max(100, Math.round(nextTrans.durationMs * 0.42));
    setTimeout(() => {
      setVisualIndex(targetIndex);
      const nextVisualItem = visuals[targetIndex % visuals.length];
      if (isInView && nextVisualItem.type === "video") {
        window.dispatchEvent(
          new CustomEvent("pf-sync-bg-video", {
            detail: {
              src: nextVisualItem.src,
              title: `${item.title} — ${nextVisualItem.title}`,
              gear: item.story?.techSpecs?.[0] || "Sony FX6 · Broadcast PGM",
              aperture: "f/1.8",
              section: `PORTFOLIO · ${item.title}`,
            },
          })
        );
      }
    }, apexTime);

    // End transition
    setTimeout(() => {
      setIsTransitioning(false);
    }, nextTrans.durationMs);
  };

  // Alternating media slideshow every 5.5 seconds when in view, cycling Mister Horse transitions
  useEffect(() => {
    if (!isInView || visuals.length <= 1) return;

    const timer = setInterval(() => {
      triggerTransition((visualIndex + 1) % visuals.length);
    }, 5500);

    return () => clearInterval(timer);
  }, [isInView, visuals.length, visualIndex, isTransitioning]);

  const nextVisual = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    triggerTransition((visualIndex + 1) % visuals.length);
  };

  const prevVisual = (e: React.MouseEvent) => {
    e.stopPropagation();
    triggerTransition((visualIndex - 1 + visuals.length) % visuals.length);
  };

  return (
    <div ref={cardRef} className="h-full">
      <OrianElasticCard pullStrength={14} tiltAngle={7}>
        <motion.div
          layout
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.35, delay: index * 0.04 }}
          onClick={onSelect}
          className="group cursor-pointer overflow-hidden relative rounded-xl border h-full flex flex-col justify-between transition-all duration-300 hover:border-primary/80 hover:shadow-xl"
          style={{
            background: "hsl(var(--bg-card) / 0.88)",
            backdropFilter: "blur(14px)",
            WebkitBackdropFilter: "blur(14px)",
            borderColor: "hsl(var(--border))",
            minHeight: 280,
          }}
        >
          {/* Visual Header with Mister Horse Animation Container */}
          <div className="relative h-48 overflow-hidden bg-black flex-shrink-0">
            {/* Transitioning Media Container */}
            <div
              className={`w-full h-full relative ${
                isTransitioning ? activeTransition.className : ""
              }`}
            >
              {currentVisual.type === "video" ? (
                <video
                  ref={videoRef}
                  key={currentVisual.src}
                  src={currentVisual.src}
                  poster={item.image}
                  autoPlay={isInView}
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  style={{ filter: "brightness(0.9) contrast(1.08)" }}
                />
              ) : (
                <img
                  key={currentVisual.src}
                  src={currentVisual.src}
                  alt={currentVisual.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  style={{ filter: "brightness(0.9) contrast(1.08)" }}
                />
              )}
            </div>

            {/* Gradient Darkening & Scanline overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/40 pointer-events-none" />

            {/* Top Right: Active Visual Badge & Tally */}
            <div className="absolute top-2.5 right-2.5 flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-black/80 backdrop-blur-md border border-amber-500/50 font-orbitron text-[9px] text-amber-300 font-bold tracking-wider z-20">
              <span className={`w-1.5 h-1.5 rounded-full ${isInView ? "bg-rose-500 animate-pulse" : "bg-zinc-500"}`} />
              <span>{currentVisual.badge}</span>
            </div>

            {/* Top Left: Category Badge */}
            <div className="absolute top-2.5 left-2.5 z-20">
              <span
                className={"font-orbitron text-[9px] tracking-[2px] uppercase px-2.5 py-1 rounded-md font-bold border " + (item.badgeColor ?? "border-amber-500/40")}
                style={{ background: "rgba(0,0,0,0.75)", color: "white", backdropFilter: "blur(4px)" }}
              >
                {item.badge}
              </span>
            </div>

            {/* Bottom Floating Visual Indicator & Interactive Mister Horse Label */}
            <div className="absolute bottom-2 inset-x-2 flex items-center justify-between z-20 pointer-events-none">
              <div className="flex items-center gap-1 px-2 py-0.5 rounded bg-black/75 backdrop-blur-md border border-white/20 text-[9px] text-zinc-300 font-orbitron truncate max-w-[180px] pointer-events-auto">
                {currentVisual.type === "video" ? <Video size={10} className="text-amber-400 shrink-0" /> : <ImageIcon size={10} className="text-cyan-400 shrink-0" />}
                <span className="truncate">{currentVisual.title}</span>
              </div>

              {/* Mister Horse Transition Indicator — Clickable to trigger new transition! */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  nextVisual(e);
                }}
                className="px-2 py-0.5 rounded bg-black/80 hover:bg-primary/20 backdrop-blur-md border border-primary/50 hover:border-primary text-[8px] font-orbitron font-bold text-primary transition-all pointer-events-auto cursor-pointer flex items-center gap-1 shadow-md hover:scale-105"
                style={{ opacity: isTransitioning ? 1 : 0.85 }}
                title={`מעבר מיסטר הורס פעיל: ${activeTransition.nameHe} (לחץ להחלפה)`}
              >
                <span>MH · {activeTransition.icon}</span>
                <Sparkles size={8} className="text-amber-400" />
              </button>
            </div>

            {/* Visual Carousel Arrows (Hover overlay) */}
            {visuals.length > 1 && (
              <div className="absolute inset-y-0 inset-x-1 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity z-20">
                <button
                  onClick={prevVisual}
                  className="w-7 h-7 rounded-full bg-black/70 hover:bg-primary/90 text-white flex items-center justify-center border border-white/20 transition-all shadow-md"
                  title="ויז'ואל קודם"
                >
                  <ChevronRight size={14} />
                </button>
                <button
                  onClick={nextVisual}
                  className="w-7 h-7 rounded-full bg-black/70 hover:bg-primary/90 text-white flex items-center justify-center border border-white/20 transition-all shadow-md"
                  title="ויז'ואל הבא (Mister Horse)"
                >
                  <ChevronLeft size={14} />
                </button>
              </div>
            )}

            {/* Center Play Overlay on Hover */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/25 backdrop-blur-[1px] pointer-events-none z-10">
              <div
                className="w-11 h-11 rounded-full flex items-center justify-center shadow-lg border border-primary/50 scale-95 group-hover:scale-105 transition-transform"
                style={{ background: "hsl(var(--primary) / 0.9)" }}
              >
                <Play size={16} fill="white" style={{ color: "white", marginLeft: 2 }} />
              </div>
            </div>
          </div>

          {/* Info */}
          <div className="p-4 flex-1 flex flex-col justify-between">
            <div>
              <h3
                className="font-teko text-2xl font-bold mb-1 transition-colors group-hover:text-primary leading-tight"
                style={{ color: "hsl(var(--fg))" }}
              >
                {item.title}
              </h3>
              <p className="text-xs leading-snug mb-3 line-clamp-2" style={{ color: "hsl(var(--fg-muted))" }}>
                {item.desc}
              </p>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-border/50">
              <span className="font-orbitron text-[9px] tracking-widest font-bold text-primary">
                {item.year}
              </span>
              <span
                className="font-orbitron text-[8px] tracking-[2px] uppercase px-2 py-0.5 rounded border"
                style={{ borderColor: "hsl(var(--border))", color: "hsl(var(--fg-muted))" }}
              >
                {item.category}
              </span>
            </div>
          </div>
        </motion.div>
      </OrianElasticCard>
    </div>
  );
}

export default function PortfolioSection() {
  const [filter, setFilter] = useState("ALL");
  const [selected, setSelected] = useState<FeaturedProject | null>(null);
  const [activeClipId, setActiveClipId] = useState<string | null>(null);
  const [lightboxPhoto, setLightboxPhoto] = useState<{ src: string; caption: string; date?: string; lens?: string } | null>(null);

  // Listen to remote filter broadcasts from HiveMind or NeuroProfileIndicator
  useEffect(() => {
    const handleRemoteFilter = (e: Event) => {
      const customEvt = e as CustomEvent<{ category: string }>;
      if (customEvt.detail?.category) {
        setFilter(customEvt.detail.category);
      }
    };
    window.addEventListener("pf-filter-portfolio", handleRemoteFilter);
    return () => window.removeEventListener("pf-filter-portfolio", handleRemoteFilter);
  }, []);

  // When selected project changes, reset active clip
  useEffect(() => {
    if (selected) {
      setActiveClipId(selected.videoClips?.[0]?.id || null);
    } else {
      setActiveClipId(null);
      setLightboxPhoto(null);
    }
  }, [selected]);

  // Lock background scroll when the project journey modal is open
  useEffect(() => {
    if (selected) {
      const originalOverflow = document.body.style.overflow;
      const originalPaddingRight = document.body.style.paddingRight;
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = "hidden";
      if (scrollbarWidth > 0) {
        document.body.style.paddingRight = `${scrollbarWidth}px`;
      }
      return () => {
        document.body.style.overflow = originalOverflow;
        document.body.style.paddingRight = originalPaddingRight;
      };
    }
  }, [selected]);

  const filtered =
    filter === "ALL"
      ? FEATURED_PROJECTS
      : FEATURED_PROJECTS.filter((p) => p.category === filter);

  return (
    <section id="portfolio" className="py-24 px-4 relative">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="font-orbitron text-[10px] tracking-[5px] uppercase mb-4 font-bold" style={{ color: "hsl(var(--primary))" }}>
            PORTFOLIO 2023–2026 · תיק הפקות מאומת
          </p>
          <h2 className="section-title gradient-text mb-4">פרויקטי השידור והקולנוע המובילים</h2>
          <p className="text-xs max-w-2xl mx-auto text-foreground-muted">
            כל כרטיסייה מנגנת וידאו עצמאי בפריים, מתחלפת בתמונות שטח עם 20+ מעברי Mister Horse קולנועיים, ומסתנכרנת לצמצם הראשי בגלילה.
          </p>

          {/* Filter tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
            {CATS.map((cat) => {
              const active = filter === cat;
              const label = cat === "ALL" ? "הכל (10 הפקות)" : cat;
              return (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className="font-orbitron text-[10px] tracking-[2px] uppercase px-5 py-2.5 rounded-lg border transition-all duration-200"
                  style={{
                    borderColor: active ? "hsl(var(--primary))" : "hsl(var(--border))",
                    color: active ? "hsl(var(--primary))" : "hsl(var(--fg-muted))",
                    background: active ? "hsl(var(--primary) / 0.12)" : "transparent",
                    backdropFilter: "blur(8px)",
                    WebkitBackdropFilter: "blur(8px)",
                    boxShadow: active ? "0 0 14px hsl(var(--primary) / 0.2)" : "none",
                    fontWeight: active ? 700 : 500,
                  }}
                >
                  {label}
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Dynamic Project Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filtered.map((item, i) => (
            <ProjectCard
              key={item.id}
              item={item}
              index={i}
              onSelect={() => setSelected(item)}
            />
          ))}
        </div>

        {/* Partners strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20"
        >
          <p className="font-orbitron text-center text-[9px] tracking-[5px] uppercase mb-8" style={{ color: "hsl(var(--fg-muted))" }}>
            שותפים אסטרטגיים ולקוחות קצה
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {PARTNERS_DATA.map((p) => (
              <motion.div
                key={p.id}
                whileHover={{ scale: 1.06, y: -2 }}
                className="px-4 py-2 rounded-xl border text-center cursor-default transition-all"
                style={{
                  background: "hsl(var(--bg-card) / 0.6)",
                  backdropFilter: "blur(10px)",
                  WebkitBackdropFilter: "blur(10px)",
                  borderColor: "hsl(var(--border))",
                }}
                title={p.desc}
              >
                <p className="font-orbitron text-[9px] font-bold tracking-wider" style={{ color: "hsl(var(--fg))" }}>{p.name}</p>
                <p className="font-orbitron text-[8px]" style={{ color: "hsl(var(--primary))", opacity: 0.8 }}>{p.roleEn}</p>
                {p.stats && (
                  <p className="text-[8px] mt-0.5" style={{ color: "hsl(var(--fg-muted))" }}>{p.stats.hours} hrs</p>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mt-12">
          <a href="#contact" className="cyber-btn py-3 px-8">
            בואו נפיק את האירוע הבא שלכם
          </a>
        </motion.div>
      </div>

      {/* Production Story, 8-Parameter Forensics, BTS Journey & Multi-Clip Modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[999] flex items-center justify-center p-3 sm:p-6"
            style={{ background: "rgba(0,0,0,0.88)", backdropFilter: "blur(14px)" }}
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ scale: 0.92, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.92, y: 30 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="max-w-4xl w-full max-h-[92vh] flex flex-col rounded-2xl overflow-hidden border shadow-2xl relative overscroll-contain"
              style={{
                background: "hsl(var(--bg-card))",
                borderColor: "hsl(var(--primary) / 0.4)",
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.7), 0 0 35px hsl(var(--primary) / 0.15)",
              }}
              onClick={(e) => e.stopPropagation()}
              onWheel={(e) => e.stopPropagation()}
            >
              {/* Modal Top Navigation Bar */}
              <div className="px-6 py-4 flex items-center justify-between border-b border-border/50 bg-black/40 backdrop-blur-md">
                <div className="flex items-center gap-3">
                  <span
                    className={"font-orbitron text-[9px] tracking-[2px] uppercase px-2.5 py-0.5 rounded border " + (selected.badgeColor || "border-amber-500/40")}
                    style={{ background: "rgba(0,0,0,0.6)", color: "white" }}
                  >
                    {selected.badge}
                  </span>
                  <span className="font-orbitron text-xs text-primary font-bold">{selected.year}</span>
                  <span className="text-xs text-foreground-muted hidden sm:inline-block">· סיפור ההפקה המלא ופענוח קבצי שטח</span>
                </div>
                <button
                  onClick={() => setSelected(null)}
                  className="w-8 h-8 rounded-full flex items-center justify-center border border-border/60 hover:border-primary text-foreground-muted hover:text-white transition-colors bg-white/5"
                  aria-label="סגור חלון"
                >
                  ✕
                </button>
              </div>

              {/* Modal Scrollable Body */}
              <div
                className="overflow-y-auto flex-1 custom-scrollbar overscroll-contain touch-pan-y"
                onWheel={(e) => e.stopPropagation()}
              >
                {/* 1. Multi-Clip Channel Switcher Bar */}
                {selected.videoClips && selected.videoClips.length > 1 && (
                  <div className="px-6 py-3 bg-black/60 border-b border-border/40 backdrop-blur-md flex flex-wrap items-center gap-2">
                    <span className="font-orbitron text-[10px] uppercase tracking-wider text-amber-400 font-bold ml-2 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                      ערוצי וידאו זמינים:
                    </span>
                    {selected.videoClips.map((clip) => {
                      const isActive = (activeClipId || selected.videoClips?.[0]?.id) === clip.id;
                      return (
                        <button
                          key={clip.id}
                          onClick={() => setActiveClipId(clip.id)}
                          className={`px-3 py-1.5 rounded-lg border text-xs font-orbitron transition-all flex items-center gap-2 ${
                            isActive
                              ? "bg-primary/20 border-primary text-primary shadow-[0_0_12px_rgba(234,179,8,0.35)] font-bold scale-[1.02]"
                              : "bg-white/5 border-border/60 text-foreground-muted hover:border-primary/60 hover:text-white"
                          }`}
                        >
                          <span>{clip.title}</span>
                          {clip.duration && (
                            <span className="text-[9px] px-1.5 py-0.5 rounded bg-black/60 border border-border/50 text-amber-300 font-mono">
                              {clip.duration}
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                )}

                {/* 2. Main Media Player Header */}
                <div className="relative aspect-video max-h-[420px] bg-black overflow-hidden border-b border-border/40">
                  {(() => {
                    const activeClip = selected.videoClips?.find((c) => c.id === activeClipId);
                    const currentSrc = activeClip?.src || selected.videoSrc;
                    return (
                      <>
                        <video
                          key={currentSrc}
                          src={currentSrc}
                          poster={selected.image}
                          controls
                          autoPlay
                          loop
                          playsInline
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-3 right-3 flex items-center gap-2 px-3 py-1 rounded-md bg-black/85 backdrop-blur-md border border-amber-500/50 font-orbitron text-[10px] text-amber-300 font-bold shadow-lg">
                          <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
                          <span>{activeClip?.title ? activeClip.title.replace(/^[^\wא-ת]+/, '') : (selected.vtsBadge || "VTS MASTER FEED")}</span>
                        </div>
                      </>
                    );
                  })()}
                </div>

                <div className="p-6 sm:p-8 space-y-8">
                  {/* Title & Subtitle */}
                  <div>
                    <h2 className="font-teko text-3xl sm:text-4xl font-bold tracking-wide" style={{ color: "hsl(var(--fg))" }}>
                      {selected.title}
                    </h2>
                    <p className="text-primary font-orbitron text-xs sm:text-sm font-semibold mt-1">
                      {selected.story?.headline || selected.desc}
                    </p>
                  </div>

                  {/* 3. 8 FORENSIC PARAMETERS BOX (ממצאים מאומתים מתוך קבצי המקור) */}
                  {selected.story?.forensics && (
                    <div className="rounded-xl border border-primary/40 bg-black/40 backdrop-blur-md overflow-hidden p-5 space-y-4 shadow-lg">
                      <div className="flex items-center justify-between border-b border-primary/20 pb-3">
                        <div className="flex items-center gap-2">
                          <span className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse" />
                          <h4 className="font-orbitron text-xs tracking-wider uppercase text-primary font-bold">
                            פענוח פרמטרי הפקה אותנטיים (Production Forensics)
                          </h4>
                        </div>
                        <span className="font-orbitron text-[9px] text-foreground-muted px-2 py-0.5 rounded bg-primary/10 border border-primary/30 font-bold">
                          8 PARAMETERS VERIFIED
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                        <div className="p-3 rounded-lg border border-border/50 bg-white/5">
                          <span className="text-[10px] font-orbitron text-foreground-muted block mb-0.5">1. לקוח קצה (End Client):</span>
                          <strong className="text-foreground text-sm font-semibold">{selected.story.forensics.endClient}</strong>
                        </div>
                        <div className="p-3 rounded-lg border border-border/50 bg-white/5">
                          <span className="text-[10px] font-orbitron text-foreground-muted block mb-0.5">2. חברה מזמינה / שותף (Hiring Partner):</span>
                          <strong className="text-foreground text-sm font-semibold">{selected.story.forensics.hiringPartner}</strong>
                        </div>
                        <div className="p-3 rounded-lg border border-border/50 bg-white/5">
                          <span className="text-[10px] font-orbitron text-foreground-muted block mb-0.5">3. תפקיד אוריין (Orian's Role):</span>
                          <strong className="text-primary text-sm font-semibold">{selected.story.forensics.orianRole}</strong>
                        </div>
                        <div className="p-3 rounded-lg border border-border/50 bg-white/5">
                          <span className="text-[10px] font-orbitron text-foreground-muted block mb-0.5">4. תאריך מדויק (Exact Date):</span>
                          <strong className="text-foreground text-sm font-semibold">{selected.story.forensics.exactDate}</strong>
                        </div>
                        <div className="p-3 rounded-lg border border-border/50 bg-white/5 sm:col-span-2">
                          <span className="text-[10px] font-orbitron text-foreground-muted block mb-0.5">5. מה עשיתי בקצרה (Work Summary):</span>
                          <p className="text-foreground text-xs leading-relaxed">{selected.story.forensics.whatIdid}</p>
                        </div>
                        <div className="p-3 rounded-lg border border-border/50 bg-white/5">
                          <span className="text-[10px] font-orbitron text-foreground-muted block mb-0.5">6. מוצר מוגמר (Master Cut):</span>
                          <strong className="text-amber-400 text-xs font-mono">{selected.story.forensics.masterCut}</strong>
                        </div>
                        <div className="p-3 rounded-lg border border-border/50 bg-white/5">
                          <span className="text-[10px] font-orbitron text-foreground-muted block mb-0.5">7. מאחורי הקלעים (BTS Stills):</span>
                          <strong className="text-foreground text-xs">{selected.story.forensics.btsInfo}</strong>
                        </div>
                        <div className="p-3 rounded-lg border border-border/50 bg-white/5 sm:col-span-2">
                          <span className="text-[10px] font-orbitron text-foreground-muted block mb-0.5">8. מיקום מדויק (Location):</span>
                          <strong className="text-foreground text-sm font-semibold">📍 {selected.story.forensics.location}</strong>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* 4. Day-by-Day Production Journey */}
                  {selected.story?.journeyDays && selected.story.journeyDays.length > 0 && (
                    <div>
                      <h4 className="font-orbitron text-xs tracking-[2px] uppercase text-primary font-bold mb-4 flex items-center gap-2">
                        <span>יומן מסע הפקה לפי ימים (Timeline)</span>
                      </h4>
                      <div className="space-y-3 relative before:absolute before:right-3 before:top-2 before:bottom-2 before:w-[2px] before:bg-primary/20">
                        {selected.story.journeyDays.map((step, idx) => (
                          <div key={idx} className="relative pr-8">
                            <span className="absolute right-1.5 top-1.5 w-3.5 h-3.5 rounded-full border-2 border-primary bg-black flex items-center justify-center shadow-md">
                              <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                            </span>
                            <div className="p-3.5 rounded-lg border border-border/50 bg-black/20">
                              <div className="flex items-center gap-2 mb-1">
                                <span className="font-orbitron text-[10px] text-amber-400 font-bold px-1.5 py-0.5 rounded bg-amber-500/10 border border-amber-500/20">
                                  {step.day}
                                </span>
                                <h5 className="font-bold text-sm text-foreground">{step.title}</h5>
                              </div>
                              <p className="text-xs text-foreground-muted leading-relaxed">{step.desc}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* 5. Production Crew & Collaborators */}
                  {selected.story?.crew && selected.story.crew.length > 0 && (
                    <div>
                      <h4 className="font-orbitron text-xs tracking-[2px] uppercase text-primary font-bold mb-3">
                        אנשים שהשתתפו איתי בהפקה (Colleague Roster)
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
                        {selected.story.crew.map((member, idx) => (
                          <div
                            key={idx}
                            onClick={() => {
                              setSelected(null);
                              const el = document.getElementById("production-circles");
                              if (el) el.scrollIntoView({ behavior: "smooth" });
                            }}
                            className="p-3 rounded-lg border border-border/60 bg-black/30 flex flex-col justify-between cursor-pointer hover:border-primary/80 hover:bg-primary/5 transition-all group"
                            title="לחץ לצפייה במעגל שיתוף הפעולה בבורסת המותגים"
                          >
                            <span className="text-[10px] font-orbitron text-foreground-muted tracking-wider">{member.role}</span>
                            <span className="font-bold text-xs text-foreground mt-1 flex items-center gap-1.5 group-hover:text-primary transition-colors">
                              <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                              {member.name}
                              <ExternalLink size={10} className="opacity-0 group-hover:opacity-100 mr-auto" />
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* 6. Behind The Scenes Gallery with Dates & Lenses */}
                  {selected.story?.btsImages && selected.story.btsImages.length > 0 && (
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-orbitron text-xs tracking-[2px] uppercase text-primary font-bold flex items-center gap-2">
                          <span>מאחורי הקלעים ותמונות מהאירוע (BTS & Event Stills)</span>
                        </h4>
                        <span className="text-[10px] font-orbitron text-foreground-muted">
                          תאריכים ומצלמות שטח מאומתות
                        </span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {selected.story.btsImages.map((photo, idx) => (
                          <div
                            key={idx}
                            onClick={() => setLightboxPhoto(photo)}
                            className="group overflow-hidden rounded-xl border border-border/60 bg-black relative cursor-pointer hover:border-primary transition-all duration-300 shadow-md"
                          >
                            <div className="aspect-video overflow-hidden relative">
                              <img
                                src={photo.src}
                                alt={photo.caption}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                              />
                              {photo.date && (
                                <div className="absolute top-2 right-2 px-2 py-0.5 rounded bg-black/80 backdrop-blur-md border border-amber-500/50 font-orbitron text-[9px] text-amber-300 font-bold">
                                  📅 {photo.date}
                                </div>
                              )}
                              {photo.lens && (
                                <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-black/80 backdrop-blur-md border border-white/20 font-orbitron text-[9px] text-zinc-300">
                                  📷 {photo.lens}
                                </div>
                              )}
                            </div>
                            <div className="p-2.5 bg-black/80 backdrop-blur-sm border-t border-border/40 flex items-center justify-between">
                              <p className="text-[11px] text-foreground-muted leading-tight group-hover:text-white transition-colors">
                                {photo.caption}
                              </p>
                              <span className="text-[10px] font-orbitron text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                                הגדל ↗
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* 7. Technical Specifications */}
                  {selected.story?.techSpecs && (
                    <div className="pt-4 border-t border-border/40">
                      <span className="font-orbitron text-[10px] uppercase tracking-wider text-foreground-muted block mb-2 font-bold">
                        תשתיות טכנולוגיות וציוד שידור:
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {selected.story.techSpecs.map((spec, idx) => (
                          <span
                            key={idx}
                            className="px-2.5 py-1 rounded-md bg-white/5 border border-border/50 text-[10px] font-orbitron text-primary"
                          >
                            {spec}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Lightbox Modal for BTS Photos */}
      <AnimatePresence>
        {lightboxPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-black/95 backdrop-blur-xl"
            onClick={() => setLightboxPhoto(null)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="max-w-5xl w-full max-h-[90vh] flex flex-col items-center justify-center relative"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={lightboxPhoto.src}
                alt={lightboxPhoto.caption}
                className="max-w-full max-h-[75vh] object-contain rounded-xl border border-primary/40 shadow-2xl"
              />
              <div className="mt-4 text-center max-w-xl">
                <p className="text-white font-bold text-sm mb-1">{lightboxPhoto.caption}</p>
                <div className="flex items-center justify-center gap-3 text-xs font-orbitron text-primary">
                  {lightboxPhoto.date && <span>📅 תאריך: {lightboxPhoto.date}</span>}
                  {lightboxPhoto.lens && <span>📷 עדשה: {lightboxPhoto.lens}</span>}
                </div>
              </div>
              <button
                onClick={() => setLightboxPhoto(null)}
                className="absolute -top-10 right-0 w-8 h-8 rounded-full border border-white/30 text-white flex items-center justify-center hover:bg-white/10"
              >
                ✕
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
