/**
 * MISTER HORSE PREMIERE & AFTER EFFECTS TRANSITION SUITE
 * 24 Authentic Transitions used in high-end video editing:
 * Zoom In / Out with Motion Tile & Black completion, Whip Pans,
 * 360° Spins, Glitch RGB split, Lens Rack Focus, White Flash, etc.
 */

export interface MisterHorseTransition {
  id: string;
  nameHe: string;
  nameEn: string;
  className: string;
  durationMs: number;
  category: "zoom" | "pan" | "spin" | "optical" | "glitch" | "cut";
  icon: string;
}

export const MISTER_HORSE_TRANSITIONS: MisterHorseTransition[] = [
  {
    id: "zoom-in-tile",
    nameHe: "Zoom In + השלמת שחורים (Motion Tile)",
    nameEn: "Zoom In Motion Tile",
    className: "mh-transition-zoom-in-tile",
    durationMs: 750,
    category: "zoom",
    icon: "🔍",
  },
  {
    id: "zoom-out-tile",
    nameHe: "Zoom Out + משיכת עדשה (Bounce Pull)",
    nameEn: "Zoom Out Bounce Pull",
    className: "mh-transition-zoom-out-tile",
    durationMs: 750,
    category: "zoom",
    icon: "🔎",
  },
  {
    id: "whip-pan-left",
    nameHe: "Whip Pan שמאלה (צליפת מצלמה מהירה)",
    nameEn: "Whip Pan Left",
    className: "mh-transition-whip-pan-left",
    durationMs: 650,
    category: "pan",
    icon: "⬅️",
  },
  {
    id: "whip-pan-right",
    nameHe: "Whip Pan ימינה (מריחת תנועה אופקית)",
    nameEn: "Whip Pan Right",
    className: "mh-transition-whip-pan-right",
    durationMs: 650,
    category: "pan",
    icon: "➡️",
  },
  {
    id: "whip-pan-up",
    nameHe: "Tilt Up (הטיה אנכית מהירה מעלה)",
    nameEn: "Whip Pan Up",
    className: "mh-transition-whip-pan-up",
    durationMs: 650,
    category: "pan",
    icon: "⬆️",
  },
  {
    id: "whip-pan-down",
    nameHe: "Tilt Down (הטיה אנכית מטה)",
    nameEn: "Whip Pan Down",
    className: "mh-transition-whip-pan-down",
    durationMs: 650,
    category: "pan",
    icon: "⬇️",
  },
  {
    id: "spin-360-cw",
    nameHe: "סיבוב 360° מלא עם כיוון השעון (Clockwise Spin)",
    nameEn: "Spin 360° Clockwise",
    className: "mh-transition-spin-360-cw",
    durationMs: 800,
    category: "spin",
    icon: "🔄",
  },
  {
    id: "spin-360-ccw",
    nameHe: "סיבוב 360° מלא נגד כיוון השעון (Counter-Clockwise)",
    nameEn: "Spin 360° Counter-Clockwise",
    className: "mh-transition-spin-360-ccw",
    durationMs: 800,
    category: "spin",
    icon: "🔃",
  },
  {
    id: "spin-180-bounce",
    nameHe: "היפוך 180° עם בלימה קפיצית (Elastic Flip)",
    nameEn: "Elastic Flip 180°",
    className: "mh-transition-spin-180-bounce",
    durationMs: 850,
    category: "spin",
    icon: "🔁",
  },
  {
    id: "glitch-rgb-split",
    nameHe: "Glitch דיגיטלי + הפרדת ערוצי RGB",
    nameEn: "Glitch RGB Split",
    className: "mh-transition-glitch-rgb-split",
    durationMs: 550,
    category: "glitch",
    icon: "⚡",
  },
  {
    id: "lens-rack-focus",
    nameHe: "משיכת פוקוס קולנועית (Lens Rack Focus)",
    nameEn: "Lens Rack Focus",
    className: "mh-transition-lens-rack-focus",
    durationMs: 700,
    category: "optical",
    icon: "🎯",
  },
  {
    id: "white-flash-burst",
    nameHe: "הבזק חשיפת יתר לבנה (White Out Strobe)",
    nameEn: "White Flash Overexposure",
    className: "mh-transition-white-flash-burst",
    durationMs: 500,
    category: "optical",
    icon: "💥",
  },
  {
    id: "vertigo-dolly-zoom",
    nameHe: "דולי זום ורטיגו (Vertigo Push-Pull)",
    nameEn: "Vertigo Dolly Zoom",
    className: "mh-transition-vertigo-dolly-zoom",
    durationMs: 850,
    category: "optical",
    icon: "🌀",
  },
  {
    id: "shutter-iris-snap",
    nameHe: "סגירת להבי צמצם ופתיחה חדה (Shutter Iris Snap)",
    nameEn: "Shutter Iris Snap",
    className: "mh-transition-shutter-iris-snap",
    durationMs: 650,
    category: "optical",
    icon: "📸",
  },
  {
    id: "camera-earthquake",
    nameHe: "רעידת מצלמת שטח אקסטרים (Camera Shake Impact)",
    nameEn: "Camera Shake Impact",
    className: "mh-transition-camera-shake",
    durationMs: 600,
    category: "optical",
    icon: "📳",
  },
  {
    id: "film-burn-leak",
    nameHe: "כוויית סרט 35mm + דליפת אור (Film Burn Light Leak)",
    nameEn: "Film Burn Light Leak",
    className: "mh-transition-film-burn",
    durationMs: 750,
    category: "optical",
    icon: "🔥",
  },
  {
    id: "split-slice-h",
    nameHe: "חיתוך אופקי מפוצל (Split Slice Horizontal)",
    nameEn: "Split Slice Horizontal",
    className: "mh-transition-split-slice-h",
    durationMs: 650,
    category: "cut",
    icon: "✂️",
  },
  {
    id: "split-slice-v",
    nameHe: "חיתוך אנכי מפוצל (Split Slice Vertical)",
    nameEn: "Split Slice Vertical",
    className: "mh-transition-split-slice-v",
    durationMs: 650,
    category: "cut",
    icon: "📐",
  },
  {
    id: "elastic-snap",
    nameHe: "קפיצת גומי גמישה (Elastic Snap Bounce)",
    nameEn: "Elastic Snap Bounce",
    className: "mh-transition-elastic-snap",
    durationMs: 750,
    category: "zoom",
    icon: "🪀",
  },
  {
    id: "mosaic-pixelate",
    nameHe: "פיקסלציה דיגיטלית 8-Bit (Mosaic Dissolve)",
    nameEn: "Mosaic Pixelate Dissolve",
    className: "mh-transition-mosaic-pixelate",
    durationMs: 650,
    category: "glitch",
    icon: "👾",
  },
  {
    id: "cyber-laser-scanner",
    nameHe: "סריקת לייזר סייבר (Cyber Laser Scanner Wipe)",
    nameEn: "Cyber Laser Scanner Wipe",
    className: "mh-transition-cyber-scanner",
    durationMs: 700,
    category: "optical",
    icon: "📶",
  },
  {
    id: "prism-spectral-warp",
    nameHe: "שבירה פריזמטית ספקטרלית (Prism Spectral Warp)",
    nameEn: "Prism Spectral Warp",
    className: "mh-transition-prism-warp",
    durationMs: 800,
    category: "optical",
    icon: "💎",
  },
  {
    id: "anamorphic-streak",
    nameHe: "פס אנמורפי כחול (Anamorphic Lens Flare Pulse)",
    nameEn: "Anamorphic Lens Flare Pulse",
    className: "mh-transition-anamorphic-streak",
    durationMs: 650,
    category: "optical",
    icon: "✨",
  },
  {
    id: "roll-90-snap",
    nameHe: "גלגול הולנדי 90° והתיישרות (Dutch Angle Roll)",
    nameEn: "Dutch Angle 90° Roll",
    className: "mh-transition-roll-90-snap",
    durationMs: 750,
    category: "spin",
    icon: "🎛️",
  },
];

export function getRandomMisterHorseTransition(): MisterHorseTransition {
  const idx = Math.floor(Math.random() * MISTER_HORSE_TRANSITIONS.length);
  return MISTER_HORSE_TRANSITIONS[idx];
}

export function getMisterHorseTransitionByIndex(index: number): MisterHorseTransition {
  return MISTER_HORSE_TRANSITIONS[index % MISTER_HORSE_TRANSITIONS.length];
}
