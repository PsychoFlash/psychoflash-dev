/**
 * PSYCHOFLASH Unified Data Layer
 * Source: Extracted from WEBBS project archives
 * Owner: אוריין אדלני (Orian Edelenyi) — Founder, Creative Director
 */

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  features?: string[];
  price?: string;
  priceLabel?: string;
  priceNote?: string;
}

export interface ServiceCategory {
  id: string;
  title: string;
  icon: string;
  gradientFrom: string;
  gradientTo: string;
  services: ServiceItem[];
}

export const SERVICES_DATA: ServiceCategory[] = [
  {
    id: 'broadcast', title: 'צוות וציוד צילום', icon: '🎥',
    gradientFrom: '#3b82f6', gradientTo: '#1d4ed8',
    services: [{
      id: 'camera-crew', title: 'צילום ותעוד ארועים וכנסים',
      description: 'הפקת צילום במערך מולטי-קאמרה קולנועי (Blackmagic). מייצב Steadicam/Gimbal כלול.',
      features: ['2 אנשי צוות (צלם ראשי + מפעיל)', '4 גופי מצלמה עם עדשות סינמה', 'מערכת וידאו אלחוטית'],
      price: '₪5,500', priceLabel: 'חבילת פרימיום',
    }],
  },
  {
    id: 'streaming', title: 'שידור וניתוב', icon: '📡',
    gradientFrom: '#8b5cf6', gradientTo: '#7c3aed',
    services: [{
      id: 'vmix', title: 'עמדת שידור וניתוב (vMix)',
      description: 'עמדת שידור וניתוב מבוססת vMix. דוברים מרחוק, מצגות, מעברונים ואינטגרציה.',
      features: ['נתב + vMix + במאי שידור + Zoom', 'שידור כולל חיתוך סינקים', 'חיבור למסכים באולם'],
      price: '₪3,600', priceLabel: 'נתב מלא', priceNote: '* אינטרנט לא כלול',
    }],
  },
  {
    id: 'sound-light', title: 'סאונד ותאורה', icon: '🎙️',
    gradientFrom: '#f97316', gradientTo: '#ea580c',
    services: [
      { id: 'sound', title: 'מפרט הגברה וסאונד', description: 'מיקסר + 4 מיקרופונים אלחוטיים, סאונדמן, רמקולים להגברה', price: '₪500', priceLabel: 'מיקסר + מיקרופונים' },
      { id: 'lighting', title: 'מפרט תאורה', description: 'סט תאורה מקצועי לצילום אירועים וכנסים, תאורת סטודיו ותאורה ניידת', price: '₪1,200', priceLabel: 'סט PRO' },
    ],
  },
  {
    id: 'creative', title: 'הפקת תוכן ואולפן', icon: '🎬',
    gradientFrom: '#ec4899', gradientTo: '#db2777',
    services: [
      { id: 'video-edit', title: 'עריכת וידאו ופוסט', description: 'עריכת וידאו מקצועית (Offline/Online). חיתוך חומרים, אנימציות, תיקוני צבע וסאונד.', price: '₪2,500', priceLabel: 'משמרת עריכה יומית' },
      { id: 'virtual-studio', title: 'אולפן וירטואלי ופודקאסטים', description: 'צילום על מסך ירוק (Green Screen), הטמעת רקעים וירטואליים תלת-ממדיים.', price: '₪2,500', priceLabel: 'משמרת בימוי/צילום' },
    ],
  },
  {
    id: 'events', title: 'כנסים ואירועים', icon: '🖥️',
    gradientFrom: '#10b981', gradientTo: '#059669',
    services: [
      { id: 'live-graphics', title: 'ניהול ויזואלי למסכים', description: 'ניהול תכנים על מסכים באירוע. גרפיקה, מצגות, וידאו וטיימרים לדוברים.', features: ['ניהול תוכן בלייב', 'הפעלת טיימרים'], price: '₪2,500', priceLabel: 'ניהול טכני' },
      { id: 'hybrid', title: 'ניהול טכני ושידור היברידי', description: 'שידורים היברידיים וחיבור דוברים מרחוק. בימוי שידור, ניהול Zoom.', price: '₪2,500', priceLabel: 'ניהול שידור' },
    ],
  },
  {
    id: 'ai', title: 'ייעוץ והטמעת AI', icon: '🧠',
    gradientFrom: '#a855f7', gradientTo: '#9333ea',
    services: [{
      id: 'ai-consulting', title: 'פיתוח אסטרטגיה וכלים מבוססי AI',
      description: 'ניתוח צרכים, פיתוח אוטומציות, והטמעת כלים ליצירת תוכן וניהול מידע חכם.',
      features: ['פיתוח אוטומציות', 'הטמעת כלי AI', 'ComfyUI + Runway + Kling'],
      price: 'Custom', priceLabel: 'חבילת ייעוץ', priceNote: 'החל מ-₪500 לשעת ייעוץ',
    }],
  },
  {
    id: 'web', title: 'אתרים ואינטגרציה', icon: '🌐',
    gradientFrom: '#6366f1', gradientTo: '#4f46e5',
    services: [{
      id: 'microsite', title: 'אפיון ופיתוח אתר אירוע',
      description: 'בניית דף נחיתה מותאם אישית (Custom Code). עיצוב ממשק, Frontend, רספונסיבי.',
      price: '₪3,500', priceLabel: 'פיתוח ועיצוב',
    }],
  },
  {
    id: 'data', title: 'מערכות ניהול ודאטה', icon: '📊',
    gradientFrom: '#3b82f6', gradientTo: '#0ea5e9',
    services: [{
      id: 'dashboard', title: 'פיתוח והטמעת מערכת נתונים',
      description: 'ממשק משתמש אינטראקטיבי לנתונים מורכבים בצורה ויזואלית ונגישה.',
      features: ['נתונים דינמיים בזמן אמת', 'סנכרון Google Sheets', 'כרטיסי מידע חכמים'],
      price: '₪5,500', priceLabel: 'עלות הקמה',
    }],
  },
];

export type PartnerCategory = 'tech' | 'broadcast' | 'events' | 'media' | 'nonprofit' | 'academic';

export interface Partner {
  id: string;
  name: string;
  role: string;
  roleEn: string;
  logo: string;
  desc: string;
  stats?: { hours: string; projects: string; period: string; peak?: string; };
  category: PartnerCategory;
}

export const PARTNERS_DATA: Partner[] = [
  { id: 'mindfly', name: 'MindFly', role: 'ספורט-טק', roleEn: 'Sports-Tech', logo: 'https://placehold.co/200x80/0f0f0f/eab308?text=MINDFLY', desc: 'שיתוף פעולה אסטרטגי עם סטארטאפ ספורט-טק. שידור BodyCam לליגות ספורט (NBA ויורוליג).', stats: { hours: '100+', projects: '15', period: '2024–2025', peak: 'עונת המשחקים' }, category: 'tech' },
  { id: 'clb', name: 'CLB Broadcast', role: 'שידור בינלאומי', roleEn: 'Global Broadcast', logo: 'https://placehold.co/200x80/0f0f0f/38bdf8?text=CLB+BROADCAST', desc: 'הפקות שידור גלובליות וכנסים בלאס וגאס (Wiz Beyond). ניתוב מליאות 4K וסיבי וידאו SMPTE.', stats: { hours: '500+', projects: '18', period: '2023–2026', peak: 'Las Vegas SKO' }, category: 'broadcast' },
  { id: 'sweet', name: 'Sweet Security', role: 'סייבר ענן', roleEn: 'Cloud Security', logo: 'https://placehold.co/200x80/0f0f0f/34d399?text=SWEET', desc: 'יצירת תוכן שיווקי ועריכת וידאו שוטפת במודל ריטיינר.', stats: { hours: '30+', projects: 'Retainer', period: '2024–2025', peak: 'Q4 Push' }, category: 'tech' },
  { id: 'golive', name: 'Go Live Israel', role: 'חברת שידור', roleEn: 'Broadcast Company', logo: 'https://placehold.co/200x80/0f0f0f/eab308?text=GO+LIVE', desc: 'שותפים אסטרטגיים בהובלת איתן אורטל (בעלים ומייסד) ואסף קריאף. ספק ראשי להפקות שידור מורכבות, ניידות שידור וארנות.', stats: { hours: '2500+', projects: '80+', period: '2018–2026', peak: 'שידורי ארנה ולוויין' }, category: 'broadcast' },
  { id: 'oculus', name: 'Oculus Productions', role: 'הפקות הייטק', roleEn: 'High-Tech Productions', logo: 'https://placehold.co/200x80/111827/eab308?text=OCULUS', desc: 'הפקות יוקרה ל-Google, Taboola, Gong. התמחות באירועי Tech בינלאומיים.', stats: { hours: '400+', projects: '25', period: '2021–2025', peak: 'כנסים שנתיים' }, category: 'events' },
  { id: 'by', name: 'B.Y. Productions', role: 'מגה-אירועים', roleEn: 'Mega Events', logo: 'https://placehold.co/200x80/111111/c084fc?text=B.Y.+GROUP', desc: 'אירועים לאומיים וממלכתיים (בנייני האומה, בריכת הסולטן, בית הנשיא). ניהול הקרנה ומסכי ענק.', stats: { hours: '300+', projects: '20', period: '2021–2025', peak: 'אירועים לאומיים' }, category: 'events' },
  { id: 'mizmor', name: 'מזמור הפקות', role: 'אולפני טלוויזיה', roleEn: 'TV Studios', logo: 'https://placehold.co/200x80/0f0f0f/34d399?text=MIZMOR', desc: 'עבודה בסטנדרט ברודקאסט. צילומים לתוכניות פריים-טיים ושידורי ספורט.', stats: { hours: '100+', projects: 'Various', period: '2018–2025', peak: 'Prime Time' }, category: 'media' },
  { id: 'itamar', name: 'איתמר כהן', role: 'מפיק על', roleEn: 'Super Producer', logo: 'https://placehold.co/200x80/1f1f1f/fb923c?text=ITAMAR+COHEN', desc: 'עשרות פרויקטים משותפים: עיריית לוד, פסטיבל הפסנתר, קמפיינים לאדידס.', stats: { hours: '800+', projects: '60+', period: '2018–2025', peak: 'אירועי קיץ' }, category: 'events' },
  { id: 'eastside', name: 'Eastside Studio', role: 'דוקו ורפואה', roleEn: 'Docu/Medical', logo: 'https://placehold.co/200x80/0a0a0a/60a5fa?text=EASTSIDE', desc: 'תוכן רפואי ודוקומנטרי. תיעוד עבור מדא, טבע, כנסים רפואיים בינלאומיים.', stats: { hours: '200+', projects: '40', period: '2018–2023', peak: 'כנסים רפואיים' }, category: 'media' },
  { id: 'yeladim', name: 'ילדים בסיכוי', role: 'עמותה', roleEn: 'Non-Profit', logo: 'https://placehold.co/200x80/0f0f0f/f472b6?text=YELADIM', desc: 'שותפות מתוך שליחות. הפקת תכנים ואירועים למען ילדי פנימיות ומשפחות אומנה.', stats: { hours: 'Vol.', projects: 'Many', period: '2017–2025', peak: 'אירועי התרמה' }, category: 'nonprofit' },
  { id: 'bgu', name: 'Ben-Gurion University', role: 'Education', roleEn: 'Education', logo: 'https://placehold.co/200x80/0a0a1a/93c5fd?text=BGU', desc: 'עריכת וידאו ותוכן אקדמי למחלקות האוניברסיטה.', stats: { hours: '30+', projects: 'Academic', period: '2022, 2025', peak: 'שנת לימודים' }, category: 'academic' },
  { id: 'starburst', name: 'Starburst Aerospace', role: 'Aerospace', roleEn: 'Aerospace', logo: 'https://placehold.co/200x80/0f0f0f/a78bfa?text=STARBURST', desc: 'חדשנות גלובלית בתעופה וחלל. הפקת אירועי חדשנות ופיצים לסטארטאפים.', stats: { hours: '20+', projects: '5', period: '2024–2025', peak: 'Demo Days' }, category: 'tech' },
];

export interface VideoClip {
  id: string;
  title: string;
  type: "master" | "bts" | "cleanfeed" | "raw";
  src: string;
  duration?: string;
}

export interface JourneyDay {
  day: string;
  title: string;
  desc: string;
}

export interface CrewMember {
  role: string;
  name: string;
}

export interface BtsPhoto {
  src: string;
  caption: string;
  date?: string;
  lens?: string;
}

export interface ForensicDetails {
  endClient: string;        // 1. לקוח קצה
  hiringPartner: string;    // 2. חברה מזמינה
  orianRole: string;        // 3. תפקיד אוריין
  exactDate: string;        // 4. תאריך מדויק
  whatIdid: string;         // 5. מה עשיתי בקצרה
  masterCut: string;        // 6. מוצר מוגמר
  btsInfo: string;          // 7. מאחורי הקלעים
  location: string;         // 8. מיקום מדויק
}

export interface ProductionStory {
  headline: string;
  orianRole: string;
  whatIdid: string;
  forensics?: ForensicDetails;
  journeyDays: JourneyDay[];
  crew: CrewMember[];
  btsImages: BtsPhoto[];
  techSpecs: string[];
}

export interface FeaturedProject {
  id: string;
  title: string;
  badge: string;
  badgeColor?: string;
  desc: string;
  image: string;
  category: string;
  year: string;
  videoId?: string;
  videoSrc: string;
  vtsBadge?: string;
  videoClips?: VideoClip[];
  galleryPhotos?: BtsPhoto[];
  story?: ProductionStory;
}

export const FEATURED_PROJECTS: FeaturedProject[] = [
  // 1. Wiz Beyond Las Vegas
  {
    id: 'wiz-las-vegas',
    title: 'Wiz 2026 — Las Vegas Keynote',
    badge: 'Global Cyber · Las Vegas',
    badgeColor: 'border-cyan-500/40',
    desc: 'שידור חי מרובה מצלמות של במת ה-Keynote המרכזית בלאס וגאס לענקית הסייבר Wiz.',
    image: '/images/bts/bts_vegas_stage.jpg',
    videoSrc: '/videos/vts_vegas_keynote.mp4',
    category: 'EVENTS',
    year: '2026',
    vtsBadge: 'VTS · KEYNOTE STAGE',
    videoClips: [
      { id: 'master', title: '🎬 מוצר מוגמר — שידור מליאה 4K לאס וגאס', type: 'master', src: '/videos/vts_vegas_keynote.mp4', duration: '0:30' },
      { id: 'bts', title: '🎥 מאחורי הקלעים — עמדת במאי וניתוב ATEM Constellation', type: 'bts', src: '/videos/bts_gear_macro.mp4', duration: '0:18' },
      { id: 'feed', title: '📡 ערוץ שטח — ניידת שידור, מסכי ענק וסיבי SMPTE', type: 'cleanfeed', src: '/videos/bg_cybertech.mp4', duration: '0:25' },
    ],
    galleryPhotos: [
      { src: '/images/bts/bts_vegas_stage.jpg', caption: 'במת ה-Keynote המרכזית בלאס וגאס ומסכי הענק', date: '18.03.2026', lens: 'Stage Rig' },
      { src: '/images/bts/macro_tbar_switcher.jpg', caption: 'עמדת הניתוב ATEM עם ידית T-Bar באולם', date: '18.03.2026', lens: 'ATEM Console' },
      { src: '/images/bts/bts_vegas_orian.jpg', caption: 'אוריין אדלני בעמדת הבקרה בלאס וגאס', date: '18.03.2026', lens: 'Director Desk' },
    ],
    story: {
      headline: 'שידור במת Keynote בינלאומית בלאס וגאס לענקית הסייבר Wiz',
      orianRole: 'במאי שידור חי ו-Technical Director',
      whatIdid: 'הפקה ובימוי שידור חי של מליאת הפתיחה וה-Keynote המרכזי של חברת Wiz בלאס וגאס. ניהול 6 מצלמות שידור, סיבי וידאו אופטיים SMPTE, אינטגרציה מלאה מול מסכי הבמה הענקיים והזרמת CleanFeed מוצפן לרחבי העולם.',
      forensics: {
        endClient: 'Wiz (יוניקורן סייבר גלובלי)',
        hiringPartner: 'CLB Broadcast / Go Live',
        orianRole: 'נתב תמונה חי (TD), במאי במת Keynote ומנהל Family Feud',
        exactDate: 'מרץ 2025 / 2026',
        whatIdid: 'הפקה ובימוי שידור מליאת ה-Keynote בלאס וגאס. ניהול 6 מצלמות, סיבי SMPTE, אינטגרציה למסכי ענק והזרמת CleanFeed מוצפן.',
        masterCut: 'שידור מליאה 4K לאס וגאס (vts_vegas_keynote.mp4)',
        btsInfo: 'עמדת במאי, קונסולת ATEM, ידית T-Bar ואינטרקום אלחוטי',
        location: 'The Venetian Resort & Convention, Las Vegas, NV',
      },
      journeyDays: [
        { day: 'יום 1', title: 'הקמת תשתיות באולם המרכזי בלאס וגאס', desc: 'פריסת כבלי סיב אופטי לבמות, כיול מסכי ה-LED באולם וסנכרון תדרי תקשורת אלחוטיים.' },
        { day: 'יום 2', title: 'חזרות גנרליות, כיול סאונד ובדיקות Uplink', desc: 'אימון דוברים, בדיקות ערוצי לווין ו-SRT עם אפס נפילות לאירופה וארה"ב.' },
        { day: 'יום 3', title: 'שידור ה-Keynote בשידור חי עולמי', desc: 'בימוי המליאה המרכזית לעיני אלפי משתתפים באולם ועשרות אלפים בסטרים הגלובלי.' },
      ],
      crew: [
        { role: 'במאי שידור ראשי ו-TD', name: 'אוריין אדלני' },
        { role: 'הפקה טכנולוגית Wiz', name: 'צוות הפקה גלובלי' },
        { role: 'צוות צלמים ומסכים', name: 'צוות שידור לאס וגאס' },
      ],
      btsImages: [
        { src: '/images/bts/bts_vegas_stage.jpg', caption: 'במת ה-Keynote המרכזית בלאס וגאס ומסכי הענק', date: '18.03.2026', lens: 'Stage Rig' },
        { src: '/images/bts/macro_tbar_switcher.jpg', caption: 'עמדת הניתוב ATEM עם ידית T-Bar באולם', date: '18.03.2026', lens: 'ATEM Console' },
        { src: '/images/bts/bts_vegas_orian.jpg', caption: 'אוריין אדלני בעמדת הבקרה בלאס וגאס', date: '18.03.2026', lens: 'Director Desk' },
      ],
      techSpecs: ['Blackmagic ATEM Constellation', 'SMPTE Fiber Optic Link', 'vMix 4K Pro Master', 'Dante Audio Network', 'Dual Redundant SRT'],
    },
  },

  // 2. כנס ש"ס פיס ארנה
  {
    id: 'arena-jerusalem',
    title: 'כנס ש"ס "דרך אמונה בחרתי"',
    badge: 'Arena Live · 10,000+',
    badgeColor: 'border-amber-500/40',
    desc: 'שידור חי מרובה מצלמות. 10,000+ צופים, 12 ערוצי וידאו, מנוע AI לכתוביות עברית בזמן אמת וסאונד Dante.',
    image: '/images/bts/arena_bts_Campus_Flight_DJI_0248_t001.jpg',
    videoSrc: '/videos/arena_shas_master_highlights.mp4',
    category: 'LIVE',
    year: '2026',
    vtsBadge: 'MASTER · LIVE 40S',
    videoClips: [
      { id: 'master', title: '🎬 מוצר מוגמר — מאסטר נאום מרכזי כתוביות צרובות', type: 'master', src: '/videos/arena_shas_master_highlights.mp4', duration: '0:40' },
      { id: 'bts', title: '🎥 מאחורי הקלעים — ניתוב 12 ערוצים וקונטרול חי', type: 'bts', src: '/videos/vts_arena_shas.mp4', duration: '0:15' },
      { id: 'crowd', title: '📡 ערוץ שטח — קהל ארנה ומסכי LED היקפיים', type: 'cleanfeed', src: '/videos/bg_concert_vertical.mp4', duration: '0:30' },
    ],
    galleryPhotos: [
      { src: '/images/bts/arena_bts_Campus_Flight_DJI_0248_t001.jpg', caption: 'צילום אווירי מאסטר של מתחם הארנה ביום האירוע', date: '20.08.2026', lens: 'DJI Drone 4K' },
      { src: '/images/bts/arena_bts_Campus_Flight_DJI_0248_t019.jpg', caption: 'מערך פריסת תשתיות קליטה ושידור בארנה', date: '20.08.2026', lens: 'DJI Drone 4K' },
      { src: '/images/bts/bts_arena_crowd.jpg', caption: 'אלפי משתתפים באולם ושידור CleanFeed בזמן אמת', date: '20.08.2026', lens: 'Arena Cam 1' },
      { src: '/images/studio/photo-mics-arena.jpg', caption: 'מערך המיקרופונים, קווי ה-Dante והקליטה בארנה', date: '20.08.2026', lens: 'FOH Audio Rig' },
    ],
    story: {
      headline: 'מגה-אירוע בארנה (20.08.2026) — 10,000+ משתתפים, 12 מצלמות ושידור CleanFeed',
      orianRole: 'במאי שידור חי ומהנדס ניתוב ראשי',
      whatIdid: 'ניהול וניתוב מערך שידור ענק בארנה. שליטה על 8 מצלמות במגרש, 2 מצלמות רחף/מנוף ומצלמות רובוטיות. פיתוח מנוע Live Premiere AI לתמלול עברית חי, ניהול 4 מסכי LED היקפיים בסנכרון אפס, שידור חי ללוויין והקלטת ISO נקייה לכל ערוץ.',
      forensics: {
        endClient: 'תנועת ש"ס',
        hiringPartner: 'הפקת אירועי ענק / Go Live',
        orianRole: 'במאי שידור, נתב ראשי ומפתח Live Premiere AI לכתוביות עברית',
        exactDate: '20.08.2026',
        whatIdid: 'בימוי וניתוב 12 ערוצי שידור חי בארנה מול מעל 10,000 משתתפים. פיתוח מנוע AI חי לתמלול וכתוביות (Faster-Whisper), ניהול 4 מסכי ענק והקלטת ISO נקייה.',
        masterCut: 'מאסטר נאום מרכזי כתוביות צרובות 40 שניות (arena_shas_master_highlights.mp4)',
        btsInfo: 'שוטי רחפן אוויריים של הארנה (DJI Drone 4K), קונטרול חי 12 ערוצים',
        location: 'פיס ארנה, ירושלים',
      },
      journeyDays: [
        { day: 'יום 1', title: 'פריסת סיבים ומערך הקונטרול בארנה', desc: 'חיבור ניידת שידור ועמדת ניתוב ניידת, בדיקת קווי אינטרקום Dante ומצלמות.' },
        { day: 'יום 2', title: 'אירוע השיא — 10,000 איש באולם', desc: 'ניתוב חי מורכב ביותר, מעברים מהירים בין קהל, במה ומסכי ענק באולם.' },
      ],
      crew: [
        { role: 'במאי שידור ראשי', name: 'אוריין אדלני' },
        { role: 'צלמי שטח ומנוף', name: 'צוות צילום ארנה (8 צלמים)' },
        { role: 'מהנדס קול ראשי', name: 'מחלקת סאונד Dante' },
      ],
      btsImages: [
        { src: '/images/bts/arena_bts_Campus_Flight_DJI_0248_t001.jpg', caption: 'צילום אווירי מאסטר של מתחם הארנה ביום האירוע', date: '20.08.2026', lens: 'DJI Drone 4K' },
        { src: '/images/bts/arena_bts_Campus_Flight_DJI_0248_t019.jpg', caption: 'מערך פריסת תשתיות קליטה ושידור בארנה', date: '20.08.2026', lens: 'DJI Drone 4K' },
        { src: '/images/bts/bts_arena_crowd.jpg', caption: 'אלפי משתתפים באולם ושידור CleanFeed בזמן אמת', date: '20.08.2026', lens: 'Arena Cam 1' },
        { src: '/images/studio/photo-mics-arena.jpg', caption: 'מערך המיקרופונים, קווי ה-Dante והקליטה בארנה', date: '20.08.2026', lens: 'FOH Audio Rig' },
      ],
      techSpecs: ['vMix 4K Pro 12-Channel', 'Blackmagic ATEM Constellation', 'Dante Network Audio', 'Fiber Optic SMPTE'],
    },
  },

  // 3. הוועד הפראלימפי ישראל
  {
    id: 'paralympic',
    title: 'הוועד הפראלימפי ישראל',
    badge: 'Cinema 4K · DCI HDR',
    badgeColor: 'border-violet-500/40',
    desc: 'סרט מיתוג קולנועי מאסטר 4K DCI HDR ב-Sony FX6 בוולודרום. נצבע ב-DaVinci Resolve Studio.',
    image: '/images/bts/para_bts_01_velodrome_approach_end.jpg',
    videoSrc: '/videos/paralympic_master_film.mp4',
    category: 'CINEMA',
    year: '2026',
    vtsBadge: 'MASTER · 4K FILM',
    videoClips: [
      { id: 'master', title: '🎬 מוצר מוגמר — סרט מיתוג 4K מאסטר מלא', type: 'master', src: '/videos/paralympic_master_film.mp4', duration: '0:35' },
      { id: 'color', title: '🎥 מאחורי הקלעים — Sony FX6 וכיול DaVinci Resolve Studio', type: 'bts', src: '/videos/vts_paralympic_fx6.mp4', duration: '0:15' },
      { id: 'bts', title: '📡 ערוץ שטח — תאורת סטודיו וצילום ספורטאים', type: 'cleanfeed', src: '/videos/bg_paralympic.mp4', duration: '0:25' },
    ],
    galleryPhotos: [
      { src: '/images/bts/para_bts_01_velodrome_approach_end.jpg', caption: 'שוט קולנועי מאסטר — גישה למתחם הוולודרום', date: '31.08.2026', lens: 'Sony FX6 · GM 24-70mm' },
      { src: '/images/bts/para_bts_02_velodrome_facade_start.jpg', caption: 'פריים חזית הוולודרום ותאורת סטודיו מותאמת לספורטאים', date: '31.08.2026', lens: 'Sony FX6 · GM 50mm f/1.2' },
      { src: '/images/bts/bts_paralympic_team.jpg', caption: 'מאחורי הקלעים — צילום הספורטאים, הגביע ומעמד "ומעל המגבלות"', date: '25.08.2026', lens: 'Sony FX6 Cinema Line' },
      { src: '/images/studio/control-room.jpg', caption: 'חדר עריכת מאסטר ו-DaVinci Resolve Studio', date: '02.09.2026', lens: 'Studio Control' },
    ],
    story: {
      headline: 'סרט מיתוג קולנועי "ומעל המגבלות" — מאסטר 4K DCI HDR',
      orianRole: 'במאי ראשי, מנהל צילומים ועורך צבע מאסטר',
      whatIdid: 'בימוי וצילום סרט מיתוג יוקרתי לוועד הפראלימפי בישראל. צילום בלוק קולנועי מלא ב-Sony FX6 Cinema Line, תאורת סטודיו רכה, קלוז-אפים עוצמתיים וכיול צבע עמוק ב-DaVinci Resolve Studio.',
      forensics: {
        endClient: 'הוועד הפראלימפי הישראלי',
        hiringPartner: 'PSYCHOFLASH Cinema',
        orianRole: 'במאי, צלם ראשי (Sony FX6) ועורך צבע DaVinci Resolve DCI HDR',
        exactDate: '31.08.2026',
        whatIdid: 'בימוי וצילום סרט מיתוג קולנועי בוולודרום הלאומי. צילום בלוק קולנועי מלא ב-Sony FX6 Cinema Line, תאורת סטודיו רכה, סלואו-מושן 120fps וכיול צבע עמוק ב-DaVinci Resolve Studio.',
        masterCut: 'סרט מיתוג 4K מאסטר מלא 35 שניות (paralympic_master_film.mp4)',
        btsInfo: 'שוטי גישה לוולודרום, סטודיו ספורטאים, גביעים ומעמד "ומעל המגבלות"',
        location: 'ולודרום סילבן אדמס, הדר יוסף, תל אביב',
      },
      journeyDays: [
        { day: 'יום 1', title: 'תחקיר, בניית קונספט ותסריט ויזואלי', desc: 'פגישות עם ספורטאים והנהלת הוועד, בניית שוטינג-ליסט מדויק לכל סצנה.' },
        { day: 'יום 2', title: 'ימי צילום מרוכזים בסטודיו ובאולמות אימון', desc: 'הקמת תאורה קולנועית, צילום בעדשות פריים ובסלואו-מושן 120fps ב-Sony FX6.' },
        { day: 'יום 3', title: 'פוסט-פרודקשן, Color Grading ומאסטרינג', desc: 'עריכת Offline/Online, גרפיקה ייעודית וייצוא מאסטר DCI HDR לשידור בטלוויזיה ובאירועים לאומיים.' },
      ],
      crew: [
        { role: 'במאי, צלם ראשי ו-Colorist', name: 'אוריין אדלני' },
        { role: 'עוזר במאי ותאורן', name: 'צוות PSYCHOFLASH Cinema' },
        { role: 'הנהלת הוועד הפראלימפי', name: 'הוועד הפראלימפי הישראלי' },
      ],
      btsImages: [
        { src: '/images/bts/para_bts_01_velodrome_approach_end.jpg', caption: 'שוט קולנועי מאסטר — גישה למתחם הוולודרום', date: '31.08.2026', lens: 'Sony FX6 · GM 24-70mm' },
        { src: '/images/bts/para_bts_02_velodrome_facade_start.jpg', caption: 'פריים חזית הוולודרום ותאורת סטודיו מותאמת לספורטאים', date: '31.08.2026', lens: 'Sony FX6 · GM 50mm f/1.2' },
        { src: '/images/bts/bts_paralympic_team.jpg', caption: 'מאחורי הקלעים — צילום הספורטאים, הגביע ומעמד "ומעל המגבלות"', date: '25.08.2026', lens: 'Sony FX6 Cinema Line' },
        { src: '/images/studio/control-room.jpg', caption: 'חדר עריכת מאסטר ו-DaVinci Resolve Studio', date: '02.09.2026', lens: 'Studio Control' },
      ],
      techSpecs: ['Sony FX6 Cinema Line', 'Sony G-Master Primes', 'DaVinci Resolve Studio DCI HDR', 'ProRes 422 HQ Master'],
    },
  },

  // 4. תעשייה אווירית & Starburst
  {
    id: 'astra-aerospace',
    title: 'תעשייה אווירית & Starburst',
    badge: 'Keynote 4K · Aerospace',
    badgeColor: 'border-cyan-500/40',
    desc: 'שידור חי מרובה מצלמות של כנס החדשנות העולמי ASTRA Demo Day 2026. אינטגרציה מלאה לקונטרול.',
    image: '/images/bts/astra_bts_Cam1_00069_f_0011.jpg',
    videoSrc: '/videos/astra_master_keynote.mp4',
    category: 'CINEMA',
    year: '2026',
    vtsBadge: 'MASTER · ASTRA 4K',
    videoClips: [
      { id: 'master', title: '🎬 מוצר מוגמר — שידור כנס תעופה וחלל ASTRA (מצלמה 2 מאסטר)', type: 'master', src: '/videos/astra_master_keynote.mp4', duration: '0:30' },
      { id: 'bts', title: '🎥 מאחורי הקלעים — ניתוב קונטרול ו-YOLOv8', type: 'bts', src: '/videos/bg_astra.mp4', duration: '0:20' },
      { id: 'fpv', title: '📡 ערוץ שטח — מעופי FPV בהאנגר התעשייה האווירית', type: 'cleanfeed', src: '/videos/bg_astra.mp4', duration: '0:25' },
    ],
    galleryPhotos: [
      { src: '/images/bts/astra_bts_Cam1_00069_f_0011.jpg', caption: 'במת הפיצ\'ים הראשית בכנס ASTRA Demo Day 2026', date: '14.05.2026', lens: 'Sony Cinema Cam 1' },
      { src: '/images/bts/astra_bts_Cam1_00070_f_0001.jpg', caption: 'מערך מצלמה 1 מאוזנת צבע בקונטרול השידור', date: '14.05.2026', lens: 'Sony Cinema Cam 1' },
      { src: '/images/studio/astra-digital.jpg', caption: 'עמדת הניהול והבקרה הטכנולוגית', date: '14.05.2026', lens: 'Control Rig' },
      { src: '/images/bts/macro_bnc_cables_rack.jpg', caption: 'תשתית העברת האותות BNC וסיב אופטי', date: '14.05.2026', lens: 'Rack Infrastructure' },
    ],
    story: {
      headline: 'שידור כנס החדשנות הבינלאומי ASTRA Demo Day 2026 לתעופה וחלל',
      orianRole: 'במאי שידור חי ומהנדס ניתוב ראשי',
      whatIdid: 'הפקה ובימוי שידור חי של כנס החדשנות הבינלאומי ASTRA Demo Day 2026 של התעשייה האווירית ו-Starburst Aerospace. ניהול מערך מצלמות Sony קולנועיות, תיאום קווי BNC וסיב אופטי, וניתוב תכנים חיים למסכי הכנס.',
      forensics: {
        endClient: 'התעשייה האווירית (IAI) & Starburst',
        hiringPartner: 'Starburst Aerospace',
        orianRole: 'במאי שידור חי וכיול צבע Balanced Multi-Cam',
        exactDate: '14.05.2026',
        whatIdid: 'הפקה ובימוי שידור חי של כנס ASTRA Demo Day 2026. איזון צבע של מעל 1,300 פריימים קולנועיים בין שתי מצלמות Sony, ניתוב פיצ\'י סטארטאפים ונאומי הנהלת IAI.',
        masterCut: 'שידור כנס תעופה וחלל מצלמה 2 מאסטר 30 שניות (astra_master_keynote.mp4)',
        btsInfo: 'במת הפיצ\'ים הראשית, 1,300 פריימים מאוזנים, תשתית BNC וקונטרול חי',
        location: 'האנגר התעשייה האווירית, נתב"ג',
      },
      journeyDays: [
        { day: 'יום 1', title: 'פריסת תשתיות וכיול צבע מאסטר למצלמות', desc: 'בדיקת קווי BNC וסיב אופטי בהאנגר, איזון צבע (Balanced Colors) לשתי מצלמות ראשיות.' },
        { day: 'יום 2', title: 'שידור הפיצ\'ים והדגמות הטכנולוגיה בשידור חי', desc: 'ניתוב מולטי-קאמרה חי של פיצ\'י הסטארטאפים ונאומי בכירי התעשייה האווירית.' },
      ],
      crew: [
        { role: 'במאי שידור חי ו-TD', name: 'אוריין אדלני' },
        { role: 'הנהלת חדשנות', name: 'צוות Starburst Aerospace' },
        { role: 'מפעילי מצלמות קולנועיות', name: 'צוות PSYCHOFLASH Broadcast' },
      ],
      btsImages: [
        { src: '/images/bts/astra_bts_Cam1_00069_f_0011.jpg', caption: 'במת הפיצ\'ים הראשית בכנס ASTRA Demo Day 2026', date: '14.05.2026', lens: 'Sony Cinema Cam 1' },
        { src: '/images/bts/astra_bts_Cam1_00070_f_0001.jpg', caption: 'מערך מצלמה 1 מאוזנת צבע בקונטרול השידור', date: '14.05.2026', lens: 'Sony Cinema Cam 1' },
        { src: '/images/studio/astra-digital.jpg', caption: 'עמדת הניהול והבקרה הטכנולוגית', date: '14.05.2026', lens: 'Control Rig' },
        { src: '/images/bts/macro_bnc_cables_rack.jpg', caption: 'תשתית העברת האותות BNC וסיב אופטי', date: '14.05.2026', lens: 'Rack Infrastructure' },
      ],
      techSpecs: ['Sony FX6 & FX3 Cinema Rig', 'Balanced Multi-Cam Setup', 'vMix 4K Pro Master', 'DaVinci Resolve Studio'],
    },
  },

  // 5. NBA All-Stars BodyCam RF
  {
    id: 'nba-allstars',
    title: 'NBA All-Stars BodyCam RF',
    badge: 'Live Sports · NBA',
    badgeColor: 'border-blue-500/40',
    desc: 'שידור מצלמות גוף חיות (Chest Cam) של דונבן מיטשל וג\'ארן ג\'קסון באימון האולסטאר ב-NBA.',
    image: '/images/bts/bts_nba_donovan.jpg',
    videoSrc: '/videos/vts_nba_bodycam.mp4',
    category: 'BROADCAST',
    year: '2024',
    videoId: 'Y8DxFX8sooI',
    vtsBadge: 'BTS · NBA BODYCAM',
    videoClips: [
      { id: 'master', title: 'מוצר מוגמר — שידור גוף חי TNT', type: 'master', src: '/videos/vts_nba_bodycam.mp4' },
      { id: 'bts', title: 'מאחורי הקלעים — הלבשת ווסט וסנסורים בארנה', type: 'bts', src: '/videos/bg_concert_vertical.mp4' },
      { id: 'feed', title: 'ערוץ שטח — CleanFeed וכיול RF', type: 'cleanfeed', src: '/videos/vts_arena_shas.mp4' },
    ],
    galleryPhotos: [
      { src: '/images/bts/bts_nba_donovan.jpg', caption: 'תמונה חיה ממצלמת הגוף של דונבן מיטשל שומר על ומבי באימון האולסטאר', date: '17.02.2024', lens: 'BodyCam Lens' },
      { src: '/images/bts/macro_ncaa_cbs_tally.jpg', caption: 'תצוגת טאלי ואינטגרציה לניידות שידור', date: '17.02.2024', lens: 'Broadcast Tally' },
      { src: '/images/studio/photo-live-control.jpg', caption: 'עמדת הפיקוח והקונטרול בזמן שידור האולסטאר', date: '17.02.2024', lens: 'Control Rig' },
    ],
    story: {
      headline: 'מצלמת גוף ראשונה מסוגה על כוכבי ה-NBA בשידור חי עולמי',
      orianRole: 'במאי ומהנדס שידור מצלמות גוף',
      whatIdid: 'אינטגרציה טכנולוגית בלעדית של שידור מצלמת גוף (BodyCam) על דונבן מיטשל (Donovan Mitchell) כשהוא שומר על ויקטור ומבניאמה (Wembanyama) באימון האולסטאר. האות עבר ישירות לשידור החי של TNT ורשתות ה-NBA.',
      forensics: {
        endClient: 'ליגת ה-NBA / TNT Sports',
        hiringPartner: 'MindFly Sports-Tech',
        orianRole: 'במאי ומהנדס מערכות שידור RF למצלמות גוף',
        exactDate: '17.02.2024',
        whatIdid: 'אינטגרציה טכנולוגית של מצלמת גוף חיה על דונבן מיטשל באימון האולסטאר. העברת וידאו RF בזמן אמת ללא השהייה ישירות לניידת TNT Sports ולשידור העולמי.',
        masterCut: 'שידור גוף חי TNT — דונבן מיטשל ו-וומבי (vts_nba_bodycam.mp4)',
        btsInfo: 'הלבשת הווסט והסנסורים בארנה, עמדת פיקוח RF, ניידת שידור',
        location: 'Gainbridge Fieldhouse, אינדיאנפוליס, ארה"ב',
      },
      journeyDays: [
        { day: 'יום 1', title: 'תיאום טכני בארנה עם הנהלת ה-NBA', desc: 'אישור מיקומי מקלטים על קורות הארנה ובדיקת כיסוי רדיו מלא של שטח הפרקט.' },
        { day: 'יום 2', title: 'התאמת ווסט מיוחד לשחקן ובדיקת משקל', desc: 'התקנת המצלמה ומשדר הווידאו על גופיית האימון ללא שום הפרעה לחופש התנועה של השחקן.' },
        { day: 'יום 3', title: 'אימון האולסטאר — שידור חי עולמי', desc: 'שידור בזמן אמת של נקודת המבט של השחקן, עם מיליוני צפיות ביוטיוב ובטלוויזיה.' },
      ],
      crew: [
        { role: 'מהנדס שידור מצלמות גוף', name: 'אוריין אדלני' },
        { role: 'מנהלי הפקה טכנולוגית', name: 'MindFly Team' },
        { role: 'במאי שידור NBA TNT', name: 'צוות TNT Sports' },
      ],
      btsImages: [
        { src: '/images/bts/bts_nba_donovan.jpg', caption: 'תמונה חיה ממצלמת הגוף של דונבן מיטשל שומר על ומבי באימון האולסטאר', date: '17.02.2024', lens: 'BodyCam Lens' },
        { src: '/images/studio/photo-live-control.jpg', caption: 'עמדת הפיקוח והקונטרול בזמן שידור האולסטאר', date: '17.02.2024', lens: 'Control Rig' },
      ],
      techSpecs: ['Donovan Mitchell Live ChestCam', 'TNT Live Uplink Feed', 'Zero-Latency RF', 'vMix 4K Pro Integration'],
    },
  },

  // 6. CyberTech Global
  {
    id: 'cybertech',
    title: 'CyberTech Global',
    badge: 'Live Conference · Satellite',
    badgeColor: 'border-emerald-500/40',
    desc: 'ועידת סייבר עולמית — שידור לווייני ו-SRT באיחור אפס עם מערך ניתוב מולטי-קאמרה באקספו תל אביב.',
    image: '/images/studio/event-corporate-control.jpg',
    videoSrc: '/videos/bg_cybertech.mp4',
    category: 'EVENTS',
    year: '2023',
    vtsBadge: 'VTS · SAT UPLINK',
    videoClips: [
      { id: 'master', title: 'מוצר מוגמר — שידור לווייני אקספו', type: 'master', src: '/videos/bg_cybertech.mp4' },
      { id: 'bts', title: 'מאחורי הקלעים — ניתוב ATEM Constellation', type: 'bts', src: '/videos/bts_gear_macro.mp4' },
      { id: 'arena', title: 'ערוץ שטח — עמדת בקרה ומסכי ענק', type: 'cleanfeed', src: '/videos/vts_vegas_keynote.mp4' },
    ],
    galleryPhotos: [
      { src: '/images/studio/event-corporate-control.jpg', caption: 'עמדת הבקרה והניתוב של כנס CyberTech באקספו', date: '30.01.2023', lens: 'Control Desk' },
      { src: '/images/bts/macro_tbar_switcher.jpg', caption: 'מתג הניתוב ATEM עם ידית T-Bar במליאה הראשית', date: '30.01.2023', lens: 'ATEM Console' },
      { src: '/images/bts/macro_switcher_buttons.jpg', caption: 'לחצני המיתוג החי והניתוב באקספו', date: '30.01.2023', lens: 'Switcher Keys' },
    ],
    story: {
      headline: 'ועידת הסייבר הגדולה בעולם — ניהול שידור לווייני ואבטחת SRT',
      orianRole: 'במאי שידור חי ו-Technical Director',
      whatIdid: 'ניהול עמדת הניתוב הראשית באקספו תל אביב עבור ועידת CyberTech Global. שידור חי לעשרות אלפי צופים ברחבי העולם, העברת ערוצי וידאו מוצפנים לוויינית, ניהול תכנים על מסכי ענק וניתוב דוברים בינלאומיים.',
      forensics: {
        endClient: 'CyberTech Global',
        hiringPartner: 'Go Live Israel (איתן אורטל ואסף קריאף)',
        orianRole: 'במאי שידור חי ו-Technical Director (שידורי לוויין ו-SRT)',
        exactDate: '30.01.2023',
        whatIdid: 'ניהול עמדת הניתוב הראשית באקספו עבור ועידת CyberTech Global. שידור חי מוצפן לוויינית ו-SRT לעשרות אלפי מומחי סייבר, ניהול מליאה מרכזית וניתוב דוברים.',
        masterCut: 'שידור מליאת סייבר עולמית ושידור לווייני (bg_cybertech.mp4)',
        btsInfo: 'עמדת מיתוג ATEM Constellation, ידית T-Bar ותשתיות סיב אופטי',
        location: 'אקספו תל אביב (ביתן 2)',
      },
      journeyDays: [
        { day: 'יום 1', title: 'הקמת תשתית אולמות מליאה וסיבים', desc: 'חיבור עמדות מצלמה בסיב אופטי לעמדת הקונטרול הראשית, בדיקות ערוצי לווין.' },
        { day: 'יום 2-3', title: 'שידורי מליאה רצופים 8 שעות ביום', desc: 'ניתוב מולטי-קאמרה חלק, סנכרון מצגות טכנולוגיות ושידור ישיר לראשי תעשיית הסייבר.' },
      ],
      crew: [
        { role: 'במאי שידור ראשי ו-TD', name: 'אוריין אדלני' },
        { role: 'צוות צלמים ומפעילי וידאו', name: 'צוות PSYCHOFLASH Broadcast' },
      ],
      btsImages: [
        { src: '/images/studio/event-corporate-control.jpg', caption: 'עמדת הבקרה והניתוב של כנס CyberTech באקספו', date: '30.01.2023', lens: 'Control Desk' },
        { src: '/images/bts/macro_tbar_switcher.jpg', caption: 'מתג הניתוב ATEM עם ידית T-Bar במליאה הראשית', date: '30.01.2023', lens: 'ATEM Console' },
      ],
      techSpecs: ['Blackmagic ATEM Constellation', 'Satellite Uplink + Dual SRT', 'Dante Audio Hub', 'vMix 4K Pro Master'],
    },
  },

  // 7. Red Bull Extreme Action
  {
    id: 'redbull-action',
    title: 'Red Bull Extreme Action',
    badge: 'Extreme Live · 4K Replay',
    badgeColor: 'border-red-500/40',
    desc: 'שידור חי רציף וסלואו-מושן 120fps של פעלולי אקסטרים ואופניים. עריכה, Instant Replay ומאסטר 4K.',
    image: '/images/bts/bts_extreme_bike.jpg',
    videoSrc: '/videos/redbull_master_action.mp4',
    category: 'BROADCAST',
    year: '2025',
    vtsBadge: 'MASTER · ACTION 4K',
    videoClips: [
      { id: 'master', title: '🎬 מוצר מוגמר — אקשן אקסטרים מאסטר 4K מלא', type: 'master', src: '/videos/redbull_master_action.mp4', duration: '0:25' },
      { id: 'bts', title: '🎥 מאחורי הקלעים — מעקב רחפן FPV וסלואו-מושן 120fps', type: 'bts', src: '/videos/vts_extreme_jump.mp4', duration: '0:15' },
      { id: 'pool', title: '📡 ערוץ שטח — קפיצות בריכה ואקשן חי', type: 'cleanfeed', src: '/videos/vts_extreme_jump.mp4', duration: '0:20' },
    ],
    galleryPhotos: [
      { src: '/images/bts/bts_extreme_bike.jpg', caption: 'צילום קפיצת האופניים מעל המים בזמן אמת', date: '12.10.2025', lens: 'Sony FX3 · 120fps' },
      { src: '/images/studio/photo-cam-buttons.jpg', caption: 'לחצני הניתוב וה-Instant Replay בשידור חי', date: '12.10.2025', lens: 'vMix Replay Console' },
    ],
    story: {
      headline: 'אירוע אקסטרים — שידור חי 3 שעות של קפיצות אופניים וסלואו-מושן חי',
      orianRole: 'במאי שידור, צלם ומנהל מערכת Replay',
      whatIdid: 'שידור חי רציף בן 3 שעות של מגה-אירוע אקסטרים. שילוב מצלמות אקשן במהירות 120fps, ניתוב הילוכים חוזרים (Instant Replay) מיידיים תוך כדי קפיצות סלטים מעל הבריכה, וסאונד שטח חי.',
      forensics: {
        endClient: 'Red Bull Action Sports',
        hiringPartner: 'Action Sports Israel',
        orianRole: 'במאי שידור, צלם שטח ומפעיל Replay 120fps',
        exactDate: '12.10.2025',
        whatIdid: 'שידור חי רציף בן 3 שעות של מגה-אירוע אקסטרים. מצלמות מהירות 120fps, ניתוב Replay מיידי של קפיצות מעל המים ומשדרי Teradek עמידי רטיבות.',
        masterCut: 'אקשן אקסטרים מאסטר 4K מלא 25 שניות (redbull_master_action.mp4)',
        btsInfo: 'מעקב רחפן FPV, צילום קפיצות בריכה וקונסולת Replay (vts_extreme_jump.mp4)',
        location: 'מתחם האקסטרים והבריכה',
      },
      journeyDays: [
        { day: 'יום 1', title: 'הקמת עמדות צילום מוגנות מים ומשדרי שטח', desc: 'פריסת משדרי Teradek Bolt 4K ומיגון מצלמות מפני מים ונתזי בריכה.' },
        { day: 'יום 2', title: 'תחרות האקסטרים — 3 שעות שידור חי רצוף', desc: 'שידור חי ללא שום נפילה, תפיסת רגעי שיא בהילוך חוזר איטי 120fps.' },
      ],
      crew: [
        { role: 'במאי שידור ומפעיל Replay', name: 'אוריין אדלני' },
        { role: 'צלמי שטח אקסטרים', name: 'צוות Action Sports' },
      ],
      btsImages: [
        { src: '/images/bts/bts_extreme_bike.jpg', caption: 'צילום קפיצת האופניים מעל המים בזמן אמת', date: '12.10.2025', lens: 'Sony FX3 · 120fps' },
        { src: '/images/studio/photo-cam-buttons.jpg', caption: 'לחצני הניתוב וה-Instant Replay בשידור חי', date: '12.10.2025', lens: 'vMix Replay Console' },
      ],
      techSpecs: ['vMix Instant Replay 4-Cam', 'Teradek Bolt 4K Wireless', 'Sony FX3 120fps High-Speed', 'Waterproof Rigging'],
    },
  },

  // 8. שולי רנד — מופע מאסטר חי
  {
    id: 'shuli-rand-master',
    title: 'שולי רנד — מופע מאסטר חי',
    badge: 'Concert Live · Sultan\'s Pool',
    badgeColor: 'border-yellow-500/40',
    desc: 'עמדת נתב שידור צמוד במה במערך מולטי-קאמרה קולנועי 4K. מסכי ערוצים בלייב ורשת סאונד Dante.',
    image: '/images/studio/photo-tbar.jpg',
    videoSrc: '/videos/vts_summer_concert.mp4',
    category: 'LIVE',
    year: '2024',
    vtsBadge: 'MASTER · PGM LIVE',
    videoClips: [
      { id: 'master', title: '🎬 מוצר מוגמר — שידור מופע בריכת הסולטן מלא', type: 'master', src: '/videos/vts_summer_concert.mp4', duration: '0:30' },
      { id: 'bts', title: '🎥 מאחורי הקלעים — במאי שידור צמוד במה', type: 'bts', src: '/videos/bg_hatikva6.mp4', duration: '0:20' },
      { id: 'stage', title: '📡 ערוץ שטח — מסכי ענק ורשת סאונד Dante', type: 'cleanfeed', src: '/videos/bg_concert_vertical.mp4', duration: '0:25' },
    ],
    galleryPhotos: [
      { src: '/images/studio/photo-tbar.jpg', caption: 'עמדת הבקרה והמוניטורים צמודת הבמה', date: '04.07.2024', lens: 'Director Desk' },
      { src: '/images/bts/macro_tbar_switcher.jpg', caption: 'ידית T-Bar וקונסולת הניתוב החי', date: '04.07.2024', lens: 'ATEM Switcher' },
      { src: '/images/bts/macro_audio_console_knobs.jpg', caption: 'קונסולת ניתוב האודיו Dante בהופעה', date: '04.07.2024', lens: 'Audio Console' },
    ],
    story: {
      headline: 'קונסולת במאי שידור צמודת במה במערך מולטי-קאמרה קולנועי 4K',
      orianRole: 'נתב שידור חי (Master PGM Switcher) ומנהל מסכים',
      whatIdid: 'ניהול עמדת ניתוב ומעקב מוניטור במאי צמוד לבמה בבריכת הסולטן. שליטה על שוטי קלוז-אפ מרגשים, סנכרון תאורת במה ואפקטים עם ערוצי וידאו חיים והזנת מסכי ענק ללא השהייה.',
      forensics: {
        endClient: 'שולי רנד / מופעי תרבות וזמר',
        hiringPartner: 'ניתוב והפקות שטח PGM (Sun Video / Go Live)',
        orianRole: 'נתב שידור חי (Master PGM Switcher) ומנהל מסכים',
        exactDate: '04.07.2024',
        whatIdid: 'ניהול עמדת ניתוב ומעקב מוניטור צמוד לבמה בבריכת הסולטן. שליטה על שוטי קלוז-אפ מרגשים, סנכרון תאורה ומסכי ענק ללא השהייה.',
        masterCut: 'מופע מאסטר חי PGM מלא (vts_summer_concert.mp4)',
        btsInfo: 'קונסולת ניתוב ATEM עם ידית T-Bar, רשת Dante ועמדת בקרה',
        location: 'בריכת הסולטן, ירושלים',
      },
      journeyDays: [
        { day: 'יום 1', title: 'בדיקת זוויות ראייה וקווי סיבים בבריכת הסולטן', desc: 'בדיקת עמדות מצלמה מול הבמה ומסלולי מעבר בתוך הקהל.' },
        { day: 'יום 2', title: 'חזרות סאונד ומופע חי מול 5,000 צופים', desc: 'אינטגרציה מלאה של עמדת המוניטורים מול מחלקת התאורה וההגברה.' },
      ],
      crew: [
        { role: 'נתב שידור ראשי ו-TD', name: 'אוריין אדלני' },
        { role: 'צוות צלמים שטח ומנוף', name: 'צוות צילום מופעים (6 צלמים)' },
        { role: 'מחלקת סאונד שידורי', name: 'צוות Dante Audio' },
      ],
      btsImages: [
        { src: '/images/bts/macro_tbar_switcher.jpg', caption: 'ידית T-Bar וקונסולת הניתוב החי', date: '04.07.2024', lens: 'ATEM Switcher' },
        { src: '/images/studio/photo-tbar.jpg', caption: 'עמדת הבקרה צמודת הבמה', date: '04.07.2024', lens: 'Director Monitor' },
      ],
      techSpecs: ['Sony FX6 Cinema 4K', 'SmallHD High-Bright Director Monitor', 'vMix 4K Master', 'Dante Audio'],
    },
  },

  // 9. ועידת נשיא המדינה / אירועי שלטון וממשל
  {
    id: 'state-herzog-conference',
    title: 'ועידת נשיא המדינה ואירועי שלטון',
    badge: 'State Live · Presidency',
    badgeColor: 'border-purple-500/40',
    desc: 'בימוי וניתוב שידור מליאת נשיא המדינה יצחק הרצוג מול עשרות שגרירים ובכירי ממשל. שידור ממלכתי ומסכי ענק.',
    image: '/images/studio/event-hero-corporate.jpg',
    videoSrc: '/videos/bg_cybertech.mp4',
    category: 'EVENTS',
    year: '2024',
    vtsBadge: 'VTS · STATE PLENARY',
    videoClips: [
      { id: 'master', title: '🎬 מוצר מוגמר — שידור מליאת הנשיא הרצוג', type: 'master', src: '/videos/bg_cybertech.mp4', duration: '0:30' },
      { id: 'bts', title: '🎥 מאחורי הקלעים — עמדת במאי צמודת מסכים', type: 'bts', src: '/videos/vts_vegas_keynote.mp4', duration: '0:20' },
      { id: 'hall', title: '📡 ערוץ שטח — מליאת שגרירים ודגלי הלאום', type: 'cleanfeed', src: '/videos/bts_gear_macro.mp4', duration: '0:25' },
    ],
    galleryPhotos: [
      { src: '/images/studio/event-hero-corporate.jpg', caption: 'מראה הבמה הממלכתית, דגלי ישראל ונאום נשיא המדינה', date: '18.06.2024', lens: 'Wide Stage Master' },
      { src: '/images/studio/event-corporate-control.jpg', caption: 'עמדת הבקרה והניתוב הממלכתית', date: '18.06.2024', lens: 'Control Rig' },
    ],
    story: {
      headline: 'בימוי וניתוב שידור ממלכתי במליאת נשיא המדינה יצחק הרצוג',
      orianRole: 'במאי שידור חי וניהול מליאות ממלכתיות',
      whatIdid: 'בימוי וניתוב שידור מליאת נשיא המדינה יצחק הרצוג מול עשרות שגרירים, ראשי ארגונים ובכירי ממשל. ניהול שידור חי ממלכתי, עבודה מול דגלי הלאום ופרוטוקול מדיני קפדני, הזנת ערוצי שידור לחדשות והקלטת ארכיון לאומי.',
      forensics: {
        endClient: 'בית הנשיא / משרדי ממשלה',
        hiringPartner: 'B.Y. Productions / Go Live Israel',
        orianRole: 'במאי שידור חי וניהול מליאות ממלכתיות',
        exactDate: '18.06.2024',
        whatIdid: 'בימוי וניתוב שידור מליאת נשיא המדינה יצחק הרצוג מול עשרות שגרירים ובכירי ממשל. ניהול שידור חי ממלכתי, עבודה מול דגלי הלאום ופרוטוקול מדיני קפדני.',
        masterCut: 'שידור מליאת הנשיא הרצוג ואירועי שלטון (bg_cybertech.mp4)',
        btsInfo: 'צילום מראה הבמה והדגלים הממלכתיים (event-hero-corporate.jpg), עמדת פיקוח',
        location: 'מרכז הקונגרסים הבינלאומי / אקספו',
      },
      journeyDays: [
        { day: 'יום 1', title: 'תיאום ביטחוני ופריסת סיבי שידור באולם המליאה', desc: 'בדיקות קווי וידאו מוצפנים, תיאום זוויות צילום לפי כללי הטקס והפרוטוקול הממלכתי.' },
        { day: 'יום 2', title: 'שידור המליאה הראשית ונאום הנשיא הרצוג', desc: 'שידור ישיר לכל ערוצי הטלוויזיה, הזנת מסכי הענק במליאה ללא שום השהייה.' },
      ],
      crew: [
        { role: 'במאי שידור ראשי', name: 'אוריין אדלני' },
        { role: 'מפיקי אירועים ממלכתיים', name: 'צוות B.Y. Productions & Go Live' },
        { role: 'צוות צלמים מורחב', name: 'צוות צילום ממלכתי' },
      ],
      btsImages: [
        { src: '/images/studio/event-hero-corporate.jpg', caption: 'מראה הבמה הממלכתית, דגלי ישראל ונאום נשיא המדינה', date: '18.06.2024', lens: 'Wide Stage Master' },
        { src: '/images/studio/event-corporate-control.jpg', caption: 'עמדת הבקרה והניתוב הממלכתית', date: '18.06.2024', lens: 'Control Rig' },
      ],
      techSpecs: ['Redundant SDI Broadcast Chain', 'Fiber Optic CleanFeed', 'ATEM Constellation 4K', 'ProRes ISO Archives'],
    },
  },

  // 10. גלגלצ — Live Studio Sessions
  {
    id: 'galgalatz-live',
    title: 'גלגלצ — Live Studio Sessions',
    badge: 'Radio Live · Acoustic 4K',
    badgeColor: 'border-rose-500/40',
    desc: 'בימוי ותיעוד מולטי-קאמרה של הופעות חיות וסשנים אקוסטיים באולפני גלגלצ ביפו. צילום קולנועי וסאונד שידור.',
    image: '/images/studio/photo-broadcast-studio.jpg',
    videoSrc: '/videos/bg_concert_vertical.mp4',
    category: 'BROADCAST',
    year: '2026',
    vtsBadge: 'VTS · RADIO ACOUSTIC',
    videoClips: [
      { id: 'master', title: '🎬 מוצר מוגמר — סשן חי אקוסטי באולפן גלגלצ', type: 'master', src: '/videos/bg_concert_vertical.mp4', duration: '0:30' },
      { id: 'bts', title: '🎥 מאחורי הקלעים — צילום מולטי-קאמרה באולפן', type: 'bts', src: '/videos/vts_arena_shas.mp4', duration: '0:20' },
    ],
    galleryPhotos: [
      { src: '/images/studio/photo-broadcast-studio.jpg', caption: 'אולפן השידור והמצלמות הקולנועיות בגלגלצ', date: '19.08.2026', lens: 'Studio Cam' },
      { src: '/images/studio/photo-mics-arena.jpg', caption: 'מערך המיקרופונים והקליטה באולפן הרדיו', date: '19.08.2026', lens: 'Audio Desk' },
    ],
    story: {
      headline: 'בימוי ותיעוד סשנים מוזיקליים חיים באולפני גלגלצ',
      orianRole: 'במאי ותיעוד סשנים מוזיקליים חיים',
      whatIdid: 'בימוי ותיעוד מולטי-קאמרה של הופעות חיות באולפני גלגלצ ביפו. צילום קולנועי מקרוב של אמנים מהשורה הראשונה, אינטגרציה מלאה מול מחלקת הסאונד של התחנה ועריכת וידאו מהירה ליוטיוב ולרשתות.',
      forensics: {
        endClient: 'גלי צה"ל / גלגלצ',
        hiringPartner: 'גלגלצ',
        orianRole: 'במאי ותיעוד סשנים מוזיקליים חיים באולפן',
        exactDate: '19.08.2026',
        whatIdid: 'בימוי ותיעוד מולטי-קאמרה של הופעות חיות באולפני גלגלצ ביפו. צילום קולנועי של אמנים מובילים, אינטגרציה מול סאונד התחנה ועריכת וידאו.',
        masterCut: 'סשן חי קולנועי באולפן גלגלצ (bg_concert_vertical.mp4)',
        btsInfo: 'מערך מיקרופונים דיגיטליים, מוניטור במאי צמוד ותאורת אולפן',
        location: 'אולפני גלגלצ, יפו',
      },
      journeyDays: [
        { day: 'יום 1', title: 'הקמת עמדות צילום באולפן הרדיו', desc: 'פריסת מצלמות Sony FX6 עם עדשות פריים קולנועיות, תיאום קווי שמע מול טכנאי השידור.' },
        { day: 'יום 2', title: 'הקלטת הסשנים החיים ועריכה מהירה', desc: 'תיעוד חי ברמת רגש גבוהה, צילומי קלוז-אפ על כלי הנגינה וייצוא מאסטר 4K.' },
      ],
      crew: [
        { role: 'במאי צילום ותיעוד', name: 'אוריין אדלני' },
        { role: 'טכנאי שידור גלגלצ', name: 'מחלקת הסאונד וההקלטות' },
      ],
      btsImages: [
        { src: '/images/studio/photo-broadcast-studio.jpg', caption: 'אולפן השידור והמצלמות הקולנועיות בגלגלצ', date: '19.08.2026', lens: 'Studio Cam' },
        { src: '/images/studio/photo-mics-arena.jpg', caption: 'מערך המיקרופונים והקליטה באולפן הרדיו', date: '19.08.2026', lens: 'Audio Desk' },
      ],
      techSpecs: ['Sony Cinema Line', 'Dante Audio Sync', 'Studio Acoustic Lighting', 'ProRes 422 HQ'],
    },
  },
];
