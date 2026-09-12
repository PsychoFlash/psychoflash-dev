import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Radio,
  Zap,
  CheckCircle2,
  Play,
  X,
  ExternalLink,
  TrendingUp,
  Activity,
  Filter,
  Check,
  Calendar,
  Layers,
  ArrowUpRight,
} from "lucide-react";
import OrianElasticCard from "@/components/OrianElasticCard";

/* ─────────────────────────────────────────────────────────────────────────
 * בורסת מעגלי ההפקה — רשת חברתית כמו וולט ובורסת מותגים של דינמיקות שיתופי הפעולה
 * בהשראת ארכיטקטורת "בורסת המותגים" (2007) ופרויקט "מי פנוי" (מתוך תוכנית העבודה)
 *
 * דינמיקות שיתוף פעולה מאומתות:
 * 1. אוריין אדלני + אסף קריאף (Go Live) — הפקות ים המלח, שידורים ממשלתיים
 * 2. אוריין אדלני + איתמר כהן (סאן וידאו / הפקות) — שורשי סאן וידאו, פסטיבל הפסנתר, לוד, אדידס
 * 3. טריו מובחר: אוריין אדלני + אסף קריאף + יונתן (ג'וני) אוחנה — מגה-ארנה (10,000+), היכל מנורה
 * 4. אוריין אדלני + MindFly US & ליגות ספורט — סיור ארה"ב, BodyCam NBA All-Stars (דונבן מיטשל)
 * 5. אוריין אדלני + CLB Broadcast & Wiz — אולפני In-House היברידיים וכנסי לאס וגאס
 * 6. Live Premiere Studio — שידור AI אוטונומי ב-Python (XDCAM 50Mbps, Faster-Whisper)
 * ─────────────────────────────────────────────────────────────────────────*/

export interface DynamicColleagueCircle {
  id: string;
  ticker: string;
  titleHe: string;
  colleaguesHe: string;
  circleType: "duo" | "trio" | "ai";
  circleTypeLabelHe: string;
  projectTag: "dead_sea" | "sun_video" | "arena_trio" | "nba_sports" | "cyber_studio" | "live_ai";
  projectTagLabelHe: string;
  
  // Stock Valuation & Metrics
  valuationShekels: number;
  trendPercent: number;
  sparkline: number[];
  sharedProjectsCount: number;
  viewsRating: number;
  searchIndex: number;
  
  // Project "מי פנוי" live status
  availabilityStatus: "available_now" | "available_tomorrow" | "advance_booking";
  availabilityLabelHe: string;
  etaDispatch: string;
  
  // Nano Banana Pro Custom Holographic Icon & Theme
  nanoBananaIcon: string;
  nanoBadgeTitle: string;
  colorFrom: string;
  colorTo: string;
  
  // Authentic Card Background Texture Image
  bgTexture: string;
  
  summaryHe: string;
  keyProjectsHe: string[];
  colleagueRoles: { name: string; role: string; focus: string }[];
  deliverables: string[];
  gearAndSkills: string[];
}

export const DYNAMIC_CIRCLES: DynamicColleagueCircle[] = [
  {
    id: "orian_krief_golive",
    ticker: "PF-KRF",
    colleaguesHe: "אוריין אדלני + אסף קריאף (Go Live Israel)",
    titleHe: "הפקות ים המלח ושידורים ממשלתיים — GoLive Synergy",
    circleType: "duo",
    circleTypeLabelHe: "Duo · צמד אסטרטגי מ-2018",
    projectTag: "dead_sea",
    projectTagLabelHe: "ים המלח & GoLive",
    valuationShekels: 34200,
    trendPercent: 28.4,
    sparkline: [24.0, 25.5, 27.2, 26.8, 30.1, 31.8, 34.2],
    sharedProjectsCount: 85,
    viewsRating: 98,
    searchIndex: 97,
    availabilityStatus: "available_now",
    availabilityLabelHe: "פנוי להפקה מיידית 🟢 (מי פנוי)",
    etaDispatch: "התייצבות שטח תוך 45 דק'",
    nanoBananaIcon: "🛰️",
    nanoBadgeTitle: "Quantum Uplink & T-Bar",
    colorFrom: "#eab308",
    colorTo: "#f59e0b",
    bgTexture: "/images/bts/macro_tbar_switcher.jpg",
    summaryHe: "שותפות הדגל הוותיקה והאינטנסיבית ביותר של PSYCHOFLASH מ-2018 (2,500+ שעות עבודה משותפות): ניהול הפקות שידור מורכבות ביותר, כולל הפקות בים המלח עבור GoLive בתנאי שטח קיצוניים, שידורים ממשלתיים לאומיים, כנסים בינלאומיים ואולפנים וירטואליים.",
    keyProjectsHe: [
      "הפקות ים המלח עבור GoLive (תנאי אקלים קיצוניים, קווי שידור מוצפנים לוויינית)",
      "שידורים ממשלתיים לאומיים (כנסים, הצהרות ראש ממשלה ושרים, אירועים ממלכתיים)",
      "שידורי כנסים היברידיים ואולפני קורונה בסטנדרט ברודקאסט 4K",
    ],
    colleagueRoles: [
      { name: "אוריין אדלני", role: "במאי שידור ראשי ומהנדס ניתוב", focus: "ניתוב חי בזמן אמת, כיול vMix 4K Pro ו-ATEM, פיקוח ערוצים" },
      { name: "אסף קריאף", role: "מפיק שידור ושיווק ראשי (Go Live)", focus: "ניהול לקוחות אסטרטגי, שיווק, תיאום לוגיסטיקה ושטח" },
    ],
    deliverables: [
      "תשתית שידור לווייני + אינטרנטי מוצפן SRT ביתירות כפולה 1+1",
      "הקלטת ISO נפרדת לכל ערוץ מצלמה בסנכרון טיים-קוד",
      "עמידות מלאה בתנאי שטח קיצוניים (חום מדבר, ים המלח)",
    ],
    gearAndSkills: ["vMix 4K Pro Master", "Blackmagic ATEM Constellation", "LiveU Multi-Cellular", "Dante Audio", "T-Bar Switching"],
  },
  {
    id: "orian_itamar_sunvideo",
    ticker: "PF-ITM",
    colleaguesHe: "אוריין אדלני + איתמר כהן (סאן וידאו / הפקות)",
    titleHe: "מורשת סאן וידאו, פסטיבל הפסנתר ואירועי עיריית לוד",
    circleType: "duo",
    circleTypeLabelHe: "Duo · שותפות שטח רב-שנתית",
    projectTag: "sun_video",
    projectTagLabelHe: "סאן וידאו & איתמר כהן",
    valuationShekels: 27800,
    trendPercent: 19.6,
    sparkline: [20.5, 21.8, 23.0, 22.4, 25.0, 26.2, 27.8],
    sharedProjectsCount: 64,
    viewsRating: 94,
    searchIndex: 93,
    availabilityStatus: "available_tomorrow",
    availabilityLabelHe: "באירוע שטח — פנוי ממחר 🟡 (מי פנוי)",
    etaDispatch: "הפקה מלאה תוך 24 שעות",
    nanoBananaIcon: "🎬",
    nanoBadgeTitle: "Cultural Field Master",
    colorFrom: "#f97316",
    colorTo: "#fb923c",
    bgTexture: "/images/bts/macro_bnc_cables_rack.jpg",
    summaryHe: "קשר מקצועי עמוק משורשי סאן וידאו כשעבדו במקביל: שותפות רבת-שנים (800+ שעות, 60+ הפקות), פסטיבל הפסנתר, אירועי עיריית לוד, קמפיינים שיווקיים לאדידס (Adidas) והפקות תרבות מהירות ומדויקות.",
    keyProjectsHe: [
      "פרויקטים מתקופת סאן וידאו (עבודה במקביל וסנכרון הפקות הדדי)",
      "פסטיבל הפסנתר — צילום מולטי-קאמרה קולנועי למופעים חיים",
      "אירועי עיריית לוד וקמפיינים שיווקיים מותאמים לאדידס (Adidas)",
    ],
    colleagueRoles: [
      { name: "אוריין אדלני", role: "במאי ומנהל צילום שטח", focus: "בניית שפה ויזואלית, בימוי זוויות והפעלת ציוד קולנועי" },
      { name: "איתמר כהן", role: "מפיק-על ומנהל הפקות תרבות", focus: "ניהול מגה-הפקות מוניציפליות, קמפיינים מסחריים וקשרי לקוחות" },
    ],
    deliverables: [
      "צילום מולטי-קאמרה קולנועי בלוק עשיר (Sony FX6/FX3)",
      "עריכה מהירה בשטח (On-Site Highlights) להפצה מיידית",
      "שליטה מלאה בלוחות זמנים צפופים באירועי תרבות",
    ],
    gearAndSkills: ["Sony FX6 Cinema", "Sony FX3", "Teradek Bolt 4K", "DaVinci Resolve Studio", "Adobe Premiere Pro 2026"],
  },
  {
    id: "orian_krief_ohana_trio",
    ticker: "PF-TRIO",
    colleaguesHe: "אוריין אדלני + אסף קריאף + יונתן (ג'וני) אוחנה",
    titleHe: "טריו מגה-ארנה — ניתוב 12 מצלמות, היכל מנורה ושידורי ענק",
    circleType: "trio",
    circleTypeLabelHe: "Trio · נבחרת שיא למגה-אירועים",
    projectTag: "arena_trio",
    projectTagLabelHe: "מגה-ארנה (ג'וני אוחנה)",
    valuationShekels: 52400,
    trendPercent: 41.2,
    sparkline: [34.0, 37.5, 40.2, 43.8, 46.5, 49.0, 52.4],
    sharedProjectsCount: 38,
    viewsRating: 99,
    searchIndex: 99,
    availabilityStatus: "advance_booking",
    availabilityLabelHe: "שריון מגה-הפקות (שבועיים מראש) 🔵",
    etaDispatch: "פריסה ארצית מתואמת",
    nanoBananaIcon: "🔺",
    nanoBadgeTitle: "Apex Tri-Force Live",
    colorFrom: "#ef4444",
    colorTo: "#f87171",
    bgTexture: "/images/bts/macro_switcher_buttons.jpg",
    summaryHe: "דינמיקת העבודה החזקה והמבוקשת ביותר בארץ לארנות ואיצטדיונים (10,000+ צופים): אוריין אדלני (Lead TD & vMix Master), אסף קריאף (מפיק ראשי ושיווק GoLive), ויונתן (ג'וני) אוחנה (במאי ניתוב ומולטי-קאם). שווי השוק הגבוה ביותר בבורסת המעגלים.",
    keyProjectsHe: [
      "ארנה ירושלים (10,000+ צופים, 12 ערוצי וידאו, CleanFeed לווייני)",
      "מופעי היכל מנורה מבטחים (עדן בן זקן, שלמה ארצי, רחפני פנים)",
      "מגה-אירועים לאומיים בבנייני האומה ובריכת הסולטן",
    ],
    colleagueRoles: [
      { name: "אוריין אדלני", role: "Lead TD & מהנדס מערכות שידור", focus: "ארכיטקטורת ניתוב, בקרת אותות וידאו, יתירות כפולה 1+1" },
      { name: "אסף קריאף", role: "מפיק שידור ומנהל הפקה (Go Live)", focus: "ניהול מגה-הפקה, קשרי שידור, אינטגרציה מול רשתות טלוויזיה" },
      { name: "יונתן (ג'וני) אוחנה", role: "במאי ניתוב ומנהל מצלמות שטח", focus: "ניתוב קצבי חי, ניהול 8-12 צלמים באינטרקום, שוטי שיא" },
    ],
    deliverables: [
      "ניהול וניתוב 8 עד 12 מצלמות חיות בסנכרון פריים מושלם",
      "שידור CleanFeed נקי לטלוויזיה + הזנת 4 מסכי LED באולם",
      "מערך אינטרקום אלחוטי רב-ערוצי מקצועי לכל הצוות",
    ],
    gearAndSkills: ["vMix 4K Pro 12-Channel", "ATEM Constellation 4K", "SMPTE Fiber", "Dante Audio Network", "SmallHD Monitors"],
  },
  {
    id: "orian_mindfly_nba",
    ticker: "PF-MND",
    colleaguesHe: "אוריין אדלני + MindFly US (NBA / EuroLeague)",
    titleHe: "MindFly US Tour & NBA All-Stars BodyCam RF",
    circleType: "duo",
    circleTypeLabelHe: "Duo · חטיבת ספורט-טק בינלאומית",
    projectTag: "nba_sports",
    projectTagLabelHe: "ספורט-טק & NBA",
    valuationShekels: 48500,
    trendPercent: 35.8,
    sparkline: [31.0, 34.2, 38.0, 41.5, 43.8, 46.0, 48.5],
    sharedProjectsCount: 18,
    viewsRating: 97,
    searchIndex: 98,
    availabilityStatus: "available_now",
    availabilityLabelHe: "פנוי להפקות ספורט וספורט-טק 🟢 (מי פנוי)",
    etaDispatch: "שיגור בינלאומי וארצי",
    nanoBananaIcon: "🏀",
    nanoBadgeTitle: "Live ChestCam RF",
    colorFrom: "#3b82f6",
    colorTo: "#60a5fa",
    bgTexture: "/images/bts/macro_ncaa_cbs_tally.jpg",
    summaryHe: "מסע הפקה וטכנולוגיית קצה: שידור מצלמות גוף חיות (BodyCam) משחקני NBA באימון האולסטאר 2025 (דונבן מיטשל שומר על וומבי בשידור חי עבור TNT), סיור ארה\"ב ב-6 מדינות ו-3 משחקי פוטבול ושידורי יורוליג.",
    keyProjectsHe: [
      "NBA All-Stars 2025 — שידור חי ממצלמת הגוף של דונבן מיטשל ל-TNT",
      "MindFly US Tour — 13 ימים, 6 מדינות, 3 משחקי פוטבול וסנכרון ניידות CBS/ESPN",
      "משחקי יורוליג — שידור שופטים ושחקנים בזמן אמת",
    ],
    colleagueRoles: [
      { name: "אוריין אדלני", role: "מהנדס RF ובמאי שידור ספורט", focus: "סנכרון שידורי תדרים מול ניידות שידור TNT/CBS, בקרת אות שטח" },
      { name: "צוות MindFly US", role: "מהנדסי חומרה ואלגוריתמיקה", focus: "ייצוב תמונה מבוסס AI, התאמת ווסט מיוחד לשחקני NBA" },
    ],
    deliverables: [
      "מצלמת גוף אלחוטית קלת משקל בשידור חי ללא השהייה",
      "סנכרון תדרים RF מאושר מול רשתות שידור בינלאומיות (TNT/CBS)",
      "תקצירי הילוך חוזר מנקודת המבט של השחקן",
    ],
    gearAndSkills: ["MindFly Sub-Ghz RF", "Zero-Latency Wireless", "Teradek Bolt 4K", "vMix Master Hub", "Low-Latency SRT"],
  },
  {
    id: "orian_clb_sweet",
    ticker: "PF-WIZ",
    colleaguesHe: "אוריין אדלני + CLB Broadcast & Wiz",
    titleHe: "במת Keynote לאס וגאס, כנסי סייבר עולמיים ומערכי שידור 4K",
    circleType: "duo",
    circleTypeLabelHe: "Duo · כנסי סייבר גלובליים",
    projectTag: "cyber_studio",
    projectTagLabelHe: "סייבר & לאס וגאס",
    valuationShekels: 34800,
    trendPercent: 24.5,
    sparkline: [25.0, 26.5, 28.0, 29.5, 31.0, 33.2, 34.8],
    sharedProjectsCount: 28,
    viewsRating: 95,
    searchIndex: 94,
    availabilityStatus: "available_now",
    availabilityLabelHe: "זמין להפקות ענק ושידורי מליאה בינלאומיים 🟢 (מי פנוי)",
    etaDispatch: "הקמה ואינטגרציה תוך 48 שעות",
    nanoBananaIcon: "🌐",
    nanoBadgeTitle: "Las Vegas Keynote Core",
    colorFrom: "#06b6d4",
    colorTo: "#3b82f6",
    bgTexture: "/images/bts/bts_vegas_stage.jpg",
    summaryHe: "הפקת במת ה-Keynote המרכזית בלאס וגאס לענקית הסייבר Wiz (בשיתוף CLB Broadcast), ניהול 6 מצלמות שידור, סיבי SMPTE ואינטגרציה למסכי ענק באולם ובסטרים הגלובלי.",
    keyProjectsHe: [
      "שידור במת ה-Keynote המרכזית בכנס Wiz Beyond בלאס וגאס",
      "ניהול עמדת במאי וקונסולת ATEM Constellation עם סיבי SMPTE",
      "הפקת אירוע Keynote בינלאומי בלאס וגאס לחברת Sweet Security",
    ],
    colleagueRoles: [
      { name: "אוריין אדלני", role: "נתב תמונה חי (TD) ובמאי Keynote", focus: "תכנון תשתיות שידור, סיבי SMPTE ובימוי מליאות גלובליות" },
      { name: "צוות CLB Broadcast & Wiz", role: "הפקת כנסי ענק סייבר", focus: "אפיון תכנים, סנכרון דוברים בינלאומיים והפצת מוצר" },
    ],
    deliverables: [
      "אולפן שידור פנימי מלא עם שליטה בלחיצת כפתור אחת",
      "אינטגרציית NDI ו-Dante לסנכרון גלובלי ללא עיכובים",
      "צינור הפקת תוכן AI מואץ לסרטוני שיווק",
    ],
    gearAndSkills: ["NDI 10Gbps Network", "vMix 4K Pro Master", "PTZ 4K Cameras", "Zoom Rooms Pro", "Kling/Runway AI"],
  },
  {
    id: "orian_live_premiere_ai",
    ticker: "PF-AUTO",
    colleaguesHe: "אוריין אדלני (פיתוח והנדסת AI)",
    titleHe: "Live Premiere Studio — מערכת שידור AI אוטונומית ב-Python",
    circleType: "ai",
    circleTypeLabelHe: "Autonomous AI · מנוע שידור פייתון",
    projectTag: "live_ai",
    projectTagLabelHe: "AI אוטונומי & פייתון",
    valuationShekels: 39000,
    trendPercent: 31.5,
    sparkline: [26.0, 28.5, 31.0, 33.2, 35.8, 37.4, 39.0],
    sharedProjectsCount: 28,
    viewsRating: 96,
    searchIndex: 95,
    availabilityStatus: "available_now",
    availabilityLabelHe: "זמין להפעלה מיידית בלחיצה 🟢 (מי פנוי)",
    etaDispatch: "הפעלה תוך 60 שניות",
    nanoBananaIcon: "🤖",
    nanoBadgeTitle: "Python STT Engine",
    colorFrom: "#8b5cf6",
    colorTo: "#a78bfa",
    bgTexture: "/images/bts/macro_switcher_buttons.jpg",
    summaryHe: "מערכת הדגל הטכנולוגית שפיתח אוריין: לכידת XDCAM HD422 MXF ישירות לעריכה חיה בפרמייר (Edit-While-Ingest), תמלול עברית חי ב-Faster-Whisper ותיוג דוברים אוטומטי. הופעלה בהצלחה בהפקות ענק.",
    keyProjectsHe: [
      "הפקת שס — דרך אמונה בחרתי (תמלול חי והפצת קליפים אוטומטית)",
      "מערכת Edit-While-Ingest מותאמת אישית לניידות שידור",
      "אינטגרציית WebSockets ודשבורד בקרה רב-משתמשים",
    ],
    colleagueRoles: [
      { name: "אוריין אדלני", role: "ארכיטקט תוכנה ומהנדס שידור ראשי", focus: "פיתוח פייתון, אינטגרציית AVMATRIX, מנועי תמלול ופרמייר" },
      { name: "צוות פיתוח AI", role: "מהנדסי STT ומודלים", focus: "אימון מודל עברית ספציפי לשידור חי וסנכרון טיים-קוד" },
    ],
    deliverables: [
      "קובץ MXF 50Mbps נקי הנפתח לעריכה תוך כדי הקלטה",
      "תמלול עברית חי מסונכרן Timecode ב-Faster-Whisper",
      "ייצוא קליפים עם כתוביות אוטומטיות תוך 30 שניות",
    ],
    gearAndSkills: ["Python FastAPI", "AVMATRIX USB Capture", "Faster-Whisper Hebrew", "Adobe Premiere Pro 2026", "FFmpeg"],
  },
];

// SVG Sparkline Component
function StockSparkline({ points, color }: { points: number[]; color: string }) {
  const min = Math.min(...points);
  const max = Math.max(...points);
  const range = max - min || 1;
  const width = 110;
  const height = 34;

  const coords = points.map((p, i) => {
    const x = (i / (points.length - 1)) * width;
    const y = height - ((p - min) / range) * (height - 8) - 4;
    return `${x},${y}`;
  });

  const pathD = `M ${coords.join(" L ")}`;
  const areaD = `M 0,${height} L ${coords.join(" L ")} L ${width},${height} Z`;

  const lastCoord = coords[coords.length - 1].split(",");
  const lastX = parseFloat(lastCoord[0]);
  const lastY = parseFloat(lastCoord[1]);

  return (
    <div className="relative inline-block w-[110px] h-[34px]">
      <svg width={width} height={height} className="overflow-visible">
        <defs>
          <linearGradient id={`grad-${color.replace("#", "")}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0.35" />
            <stop offset="100%" stopColor={color} stopOpacity="0.0" />
          </linearGradient>
        </defs>
        <path d={areaD} fill={`url(#grad-${color.replace("#", "")})`} />
        <path d={pathD} fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx={lastX} cy={lastY} r="3" fill={color} className="animate-ping" opacity="0.75" />
        <circle cx={lastX} cy={lastY} r="2.5" fill="white" stroke={color} strokeWidth="1.2" />
      </svg>
    </div>
  );
}

export default function ProductionCirclesSection() {
  const [selectedCircle, setSelectedCircle] = useState<DynamicColleagueCircle | null>(null);
  const [sizeFilter, setSizeFilter] = useState<string>("all");
  const [projectFilter, setProjectFilter] = useState<string>("all");
  const [onlyAvailableNow, setOnlyAvailableNow] = useState<boolean>(false);

  const filteredCircles = DYNAMIC_CIRCLES.filter((circle) => {
    if (onlyAvailableNow && circle.availabilityStatus !== "available_now") return false;
    if (sizeFilter !== "all" && circle.circleType !== sizeFilter) return false;
    if (projectFilter !== "all" && circle.projectTag !== projectFilter) return false;
    return true;
  });

  const getWhatsAppBookingUrl = (circle: DynamicColleagueCircle) => {
    const text = `שלום אוריין אדלני, אני מעוניין להזמין את מעגל ההפקה: "${circle.titleHe}" (${circle.ticker}) מתוך בורסת מעגלי ההפקה של PSYCHOFLASH. אשמח לבדוק זמינות במסגרת פרויקט "מי פנוי" ולתאם מפרט.`;
    return `https://wa.me/972542559027?text=${encodeURIComponent(text)}`;
  };

  const totalCombinedValuation = DYNAMIC_CIRCLES.reduce((acc, c) => acc + c.valuationShekels, 0);

  return (
    <section
      id="synergy"
      className="py-24 px-4 sm:px-6 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header & Stock Ticker Marquee */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-6 border-b border-border/40 pb-8">
          <div>
            <div className="flex flex-wrap items-center gap-2.5 mb-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold bg-amber-500/15 text-amber-400 border border-amber-500/30">
                <Activity className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
                בורסת מעגלי הפקה · פרויקט "מי פנוי"
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-mono text-foreground-muted bg-secondary/60 border border-border">
                בהשראת "בורסת המותגים" 2007
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/30">
                שווי שוק משולב: ₪{totalCombinedValuation.toLocaleString()} ▲ +29.8%
              </span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
              בורסת מעגלי ההפקה ודינמיקות הקולגות
            </h2>
            <p className="text-foreground-muted text-sm sm:text-base mt-2 max-w-2xl leading-relaxed">
              מסחור דינמיקות שיתוף הפעולה המובילות של אוריין אדלני עם הקולגות: צמדי שטח, נבחרת המגה-ארנה (טריו), ספורט-טק בינלאומי ומערכות שידור AI.
              כולל סטטוס זמינות חי במסגרת פרויקט <strong className="text-primary">"מי פנוי"</strong>.
            </p>
          </div>

          {/* Quick "מי פנוי" Toggle */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => setOnlyAvailableNow((prev) => !prev)}
              className={`px-4 py-2.5 rounded-xl border text-xs font-bold font-orbitron flex items-center gap-2 transition-all ${
                onlyAvailableNow
                  ? "bg-emerald-500/20 text-emerald-400 border-emerald-500 shadow-lg shadow-emerald-500/10"
                  : "bg-secondary/40 text-foreground-muted border-border hover:border-primary"
              }`}
            >
              <span className={`w-2 h-2 rounded-full ${onlyAvailableNow ? "bg-emerald-400 animate-ping" : "bg-emerald-500"}`} />
              <span>{onlyAvailableNow ? "מציג רק פנויים להיום (מי פנוי)" : "סנן רק פנויים מיידית (מי פנוי)"}</span>
            </button>
          </div>
        </div>

        {/* Filter Controls: Circle Size & Project Dynamic */}
        <div className="space-y-3 mb-8">
          {/* Filter Row 1: Size */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            <span className="text-[11px] font-orbitron text-foreground-muted font-bold ml-2 shrink-0">גודל מעגל:</span>
            {[
              { id: "all", label: "כל המעגלים (6)" },
              { id: "duo", label: "צמדים אסטרטגיים (Duo)" },
              { id: "trio", label: "טריו & צוות מורחב (Trio Squad)" },
              { id: "ai", label: "מנועי AI אוטונומיים" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSizeFilter(tab.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                  sizeFilter === tab.id
                    ? "bg-primary text-black font-bold shadow-md shadow-primary/20 scale-105"
                    : "bg-secondary/60 hover:bg-secondary text-foreground-muted hover:text-foreground border border-border/60"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Filter Row 2: Projects */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            <span className="text-[11px] font-orbitron text-foreground-muted font-bold ml-2 shrink-0">לפי פרויקטים:</span>
            {[
              { id: "all", label: "כל הפרויקטים" },
              { id: "dead_sea", label: "ים המלח & GoLive" },
              { id: "sun_video", label: "סאן וידאו & איתמר כהן" },
              { id: "arena_trio", label: "מגה-ארנה (ג'וני אוחנה)" },
              { id: "nba_sports", label: "ספורט-טק & NBA" },
              { id: "cyber_studio", label: "סייבר & אולפנים" },
              { id: "live_ai", label: "AI אוטונומי & פייתון" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setProjectFilter(tab.id)}
                className={`px-3 py-1 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                  projectFilter === tab.id
                    ? "border border-amber-500/80 bg-amber-500/15 text-amber-300 font-bold"
                    : "border border-border/40 bg-black/20 text-foreground-muted hover:text-foreground"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Colleague Dynamics Stock Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCircles.map((circle) => {
            const isAvailableNow = circle.availabilityStatus === "available_now";

            return (
              <OrianElasticCard key={circle.id} pullStrength={14} tiltAngle={5}>
                <motion.div
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="group relative rounded-2xl border border-border/70 overflow-hidden hover:border-primary/60 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/10 flex flex-col justify-between h-full"
                  style={{
                    background: "hsl(var(--bg-card) / 0.8)",
                    backdropFilter: "blur(14px)",
                    WebkitBackdropFilter: "blur(14px)",
                  }}
                >
                  {/* Authentic Macro Gear Photo Background Texture with Dark Gradient Overlay */}
                  <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
                    <img
                      src={circle.bgTexture}
                      alt={circle.titleHe}
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 opacity-20 group-hover:opacity-35"
                      style={{ filter: "brightness(0.7) contrast(1.2)" }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/85 to-black/60" />
                  </div>

                  {/* Card Content Layer (z-10) */}
                  <div className="relative z-10 p-6 flex flex-col justify-between h-full">
                    {/* Stock Header: Ticker & Sparkline Chart */}
                    <div className="border-b border-border/50 pb-4 mb-4">
                      <div className="flex items-center justify-between gap-3 mb-2">
                        {/* Ticker & Nano Banana Icon */}
                        <div className="flex items-center gap-2">
                          <span
                            className="w-8 h-8 rounded-lg flex items-center justify-center text-base border shadow-md"
                            style={{
                              background: `linear-gradient(135deg, ${circle.colorFrom}25, ${circle.colorTo}45)`,
                              borderColor: `${circle.colorFrom}60`,
                            }}
                          >
                            {circle.nanoBananaIcon}
                          </span>
                          <div>
                            <span className="font-mono text-xs font-extrabold tracking-widest text-primary flex items-center gap-1">
                              {circle.ticker}
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                            </span>
                            <span className="text-[10px] font-orbitron text-foreground-muted block">
                              {circle.nanoBadgeTitle}
                            </span>
                          </div>
                        </div>

                        {/* Sparkline Curve */}
                        <StockSparkline points={circle.sparkline} color={circle.colorFrom} />
                      </div>

                      {/* Valuation & Trend */}
                      <div className="flex items-baseline justify-between pt-1">
                        <div>
                          <span className="text-[10px] font-orbitron text-foreground-muted block">ערך מנייה בבורסה</span>
                          <span className="text-xl font-mono font-black text-foreground tracking-tight">
                            ₪{circle.valuationShekels.toLocaleString()}
                          </span>
                        </div>
                        <div className="flex items-center gap-1 px-2 py-0.5 rounded bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-bold">
                          <TrendingUp className="w-3 h-3" />
                          <span>+{circle.trendPercent}%</span>
                        </div>
                      </div>
                    </div>

                    {/* Colleague Dynamic Header */}
                    <div className="mb-4">
                      <span className="text-[11px] font-bold text-amber-400 block mb-1 font-orbitron">
                        {circle.colleaguesHe}
                      </span>
                      <h3 className="text-lg font-bold text-foreground leading-snug group-hover:text-primary transition-colors">
                        {circle.titleHe}
                      </h3>
                      <p className="text-xs text-foreground-muted line-clamp-3 mt-2 leading-relaxed">
                        {circle.summaryHe}
                      </p>
                    </div>

                    {/* Dynamic Badges: "מי פנוי" Status & Stats */}
                    <div className="space-y-2 mb-5">
                      <div className="flex items-center justify-between p-2.5 rounded-xl bg-black/40 border border-border/50">
                        <span className="text-[11px] text-foreground font-semibold flex items-center gap-1.5">
                          <span className={`w-2 h-2 rounded-full ${isAvailableNow ? "bg-emerald-400 animate-pulse" : "bg-amber-400"}`} />
                          {circle.availabilityLabelHe}
                        </span>
                        <span className="text-[10px] font-mono text-foreground-muted">{circle.etaDispatch}</span>
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-center text-[10px] font-mono">
                        <div className="p-1.5 rounded-lg bg-black/30 border border-border/40">
                          <span className="text-foreground-muted block">עבודות משותפות</span>
                          <span className="font-bold text-foreground text-xs">{circle.sharedProjectsCount}+ הפקות</span>
                        </div>
                        <div className="p-1.5 rounded-lg bg-black/30 border border-border/40">
                          <span className="text-foreground-muted block">מדד צפיות וחיפוש</span>
                          <span className="font-bold text-emerald-400 text-xs">{circle.viewsRating}/100 ★</span>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="pt-3 border-t border-border/50 flex items-center gap-2">
                      <a
                        href={getWhatsAppBookingUrl(circle)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 px-3 py-2.5 rounded-xl bg-primary text-black font-bold text-xs flex items-center justify-center gap-1.5 hover:brightness-110 transition-all shadow-md shadow-primary/20"
                      >
                        <span>שריון ב"מי פנוי"</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>

                      <button
                        onClick={() => setSelectedCircle(circle)}
                        className="px-3.5 py-2.5 rounded-xl border border-border hover:border-primary text-xs font-semibold text-foreground-muted hover:text-foreground transition-colors bg-white/5"
                      >
                        פרטי מעגל
                      </button>
                    </div>
                  </div>
                </motion.div>
              </OrianElasticCard>
            );
          })}
        </div>
      </div>

      {/* Rich Colleague Dynamic Modal */}
      <AnimatePresence>
        {selectedCircle && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedCircle(null)}
              className="absolute inset-0 bg-black/85 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-3xl max-h-[88vh] overflow-y-auto rounded-2xl bg-card border border-border/80 p-6 sm:p-8 shadow-2xl z-10 text-right custom-scrollbar"
              dir="rtl"
            >
              <button
                onClick={() => setSelectedCircle(null)}
                className="absolute top-4 left-4 p-2 rounded-full hover:bg-secondary text-foreground-muted hover:text-foreground border border-border"
                aria-label="סגור"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Modal Ticker Header */}
              <div className="flex items-center gap-2 text-xs font-mono text-primary mb-3">
                <span className="px-2 py-0.5 rounded bg-primary/20 text-primary font-bold">{selectedCircle.ticker}</span>
                <span>•</span>
                <span>{selectedCircle.circleTypeLabelHe}</span>
                <span>•</span>
                <span className="text-emerald-400 font-bold">ערך ₪{selectedCircle.valuationShekels.toLocaleString()}</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-bold mb-2 text-foreground">{selectedCircle.titleHe}</h3>
              <p className="text-sm font-semibold text-amber-400 mb-4 font-orbitron">{selectedCircle.colleaguesHe}</p>

              <p className="text-sm text-foreground-muted leading-relaxed mb-6">
                {selectedCircle.summaryHe}
              </p>

              {/* Key Shared Projects */}
              <div className="mb-6 p-4 rounded-xl bg-black/30 border border-border/60">
                <h4 className="text-xs font-bold uppercase tracking-wider text-primary mb-3 font-orbitron flex items-center gap-2">
                  <span>פרויקטי דגל ועבודות משותפות בולטות</span>
                </h4>
                <div className="space-y-2">
                  {selectedCircle.keyProjectsHe.map((p, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-xs text-foreground">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0 mt-1.5" />
                      <span>{p}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Roles Breakdown */}
              <div className="space-y-3 mb-6">
                <h4 className="text-xs font-bold uppercase tracking-wider text-foreground-muted font-orbitron">
                  דינמיקת העבודה והקולגות במעגל:
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {selectedCircle.colleagueRoles.map((role, idx) => (
                    <div key={idx} className="p-4 rounded-xl border border-border/60 bg-black/25">
                      <div className="font-bold text-sm text-foreground flex items-center justify-between mb-1">
                        <span>{role.name}</span>
                        <span className="text-[10px] font-orbitron px-2 py-0.5 rounded bg-primary/10 text-primary border border-primary/20">
                          {role.role}
                        </span>
                      </div>
                      <p className="text-xs text-foreground-muted mt-1 leading-snug">{role.focus}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Deliverables & Gear */}
              <div className="mb-6">
                <h4 className="text-xs font-bold uppercase tracking-wider text-foreground-muted font-orbitron mb-2">
                  ציוד מאומת ותוצרים מובטחים:
                </h4>
                <div className="flex flex-wrap gap-2 mb-3">
                  {selectedCircle.gearAndSkills.map((g, gi) => (
                    <span key={gi} className="px-2.5 py-1 rounded-md text-[10px] font-mono bg-black/40 text-foreground-muted border border-border/40">
                      ⚙️ {g}
                    </span>
                  ))}
                </div>
                <div className="space-y-1.5">
                  {selectedCircle.deliverables.map((d, di) => (
                    <div key={di} className="flex items-center gap-2 text-xs text-foreground-muted">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>{d}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Booking Footer */}
              <div className="pt-4 border-t border-border/60 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-xs text-foreground-muted">
                  <span>סטטוס פרויקט "מי פנוי": </span>
                  <strong className="text-emerald-400">{selectedCircle.availabilityLabelHe}</strong>
                </div>
                <a
                  href={getWhatsAppBookingUrl(selectedCircle)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cyber-btn py-2.5 px-6 font-orbitron text-xs flex items-center gap-2"
                >
                  <span>שוחח עם אוריין על מעגל זה בוואטסאפ</span>
                  <ExternalLink size={13} />
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
