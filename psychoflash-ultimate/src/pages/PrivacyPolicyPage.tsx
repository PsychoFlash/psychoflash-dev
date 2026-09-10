/**
 * PrivacyPolicyPage — מדיניות פרטיות
 *
 * עומד ב:
 * - חוק הגנת הפרטיות ישראל (1981) ותקנות הגנת הפרטיות (אבטחת מידע) 2017
 * - GDPR (רגולציית EU לגבי לקוחות אירופאים)
 * - WCAG 2.1 AA — נגישות מלאה
 */

import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export default function PrivacyPolicyPage() {
  useEffect(() => {
    document.title = "מדיניות פרטיות — PSYCHOFLASH";
    window.scrollTo(0, 0);
  }, []);

  const today = new Date().toLocaleDateString("he-IL", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div
      className="min-h-screen"
      style={{ background: "hsl(var(--bg))", color: "hsl(var(--fg))" }}
      lang="he"
      dir="rtl"
    >
      {/* Skip nav */}
      <a
        href="#privacy-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:right-2 focus:z-50 focus:px-4 focus:py-2 focus:rounded"
        style={{ background: "hsl(var(--primary))", color: "#000" }}
      >
        דלג לתוכן
      </a>

      {/* Header */}
      <header
        className="sticky top-0 z-40 px-6 py-4"
        style={{
          background: "hsl(var(--bg) / 0.95)",
          borderBottom: "1px solid hsl(var(--border))",
          backdropFilter: "blur(12px)",
        }}
      >
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <Link
            to="/"
            className="font-orbitron text-sm font-bold"
            style={{ color: "hsl(var(--fg))", textDecoration: "none" }}
            aria-label="חזרה לדף הבית של PSYCHOFLASH"
          >
            PSYCHO<span style={{ color: "hsl(var(--primary))" }}>FLASH</span>
          </Link>
          <Link
            to="/"
            className="flex items-center gap-2 text-sm transition-colors hover:opacity-80"
            style={{ color: "hsl(var(--fg-muted))", textDecoration: "none" }}
          >
            <ArrowRight size={14} aria-hidden="true" />
            חזרה לאתר
          </Link>
        </div>
      </header>

      {/* Main content */}
      <main
        id="privacy-content"
        className="max-w-3xl mx-auto px-6 py-12"
        tabIndex={-1}
      >
        {/* Title */}
        <div className="mb-10">
          <p
            className="font-orbitron mb-3"
            style={{
              fontSize: "10px",
              letterSpacing: "5px",
              color: "hsl(var(--primary))",
              textTransform: "uppercase",
            }}
          >
            LEGAL
          </p>
          <h1
            className="font-teko mb-3"
            style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", color: "hsl(var(--fg))" }}
          >
            מדיניות פרטיות
          </h1>
          <p className="text-sm" style={{ color: "hsl(var(--fg-muted))" }}>
            עדכון אחרון: {today} | גרסה 1.0
          </p>
        </div>

        {/* Content */}
        <article
          className="space-y-8 text-sm leading-relaxed"
          style={{ color: "hsl(var(--fg))", maxWidth: "65ch" }}
          aria-label="מדיניות פרטיות מלאה"
        >

          {/* Section 1 */}
          <section aria-labelledby="section-1">
            <h2 id="section-1" className="font-orbitron text-base mb-3" style={{ color: "hsl(var(--primary))" }}>
              1. כללי
            </h2>
            <p className="mb-3">
              PSYCHOFLASH (להלן: <strong>"החברה"</strong>, <strong>"אנחנו"</strong>) מנוהלת על ידי אוריאן עדלני, אדלני הפקות.
              מדיניות פרטיות זו מסבירה כיצד אנו אוספים, משתמשים ומגנים על המידע האישי שלך בעת השימוש באתר{" "}
              <a href="https://psychoflash.dev" style={{ color: "hsl(var(--primary))" }}>psychoflash.dev</a>.
            </p>
            <p>
              השימוש באתר מהווה הסכמה למדיניות זו. אם אינך מסכים — אנא הפסק את השימוש.
            </p>
          </section>

          {/* Section 2 */}
          <section aria-labelledby="section-2">
            <h2 id="section-2" className="font-orbitron text-base mb-3" style={{ color: "hsl(var(--primary))" }}>
              2. איזה מידע אנו אוספים?
            </h2>

            <h3 className="font-semibold mb-2 mt-4" style={{ color: "hsl(var(--fg))" }}>
              2.1 מידע שאתה מספק באופן ישיר
            </h3>
            <ul className="list-disc list-inside space-y-1 mb-4" style={{ color: "hsl(var(--fg-muted))" }}>
              <li>שם מלא</li>
              <li>מספר טלפון</li>
              <li>כתובת דוא"ל (אם תימסר)</li>
              <li>תיאור הפרויקט שנשלח דרך טופס יצירת הקשר</li>
            </ul>

            <h3 className="font-semibold mb-2" style={{ color: "hsl(var(--fg))" }}>
              2.2 מידע הנאסף אוטומטית (ב-Session בלבד)
            </h3>
            <p className="mb-2" style={{ color: "hsl(var(--fg-muted))" }}>
              האתר משתמש ב-<strong>sessionStorage</strong> בלבד לצורך התאמת חוויה אנונימית בזמן הביקור.
              מידע זה <strong>אינו מועבר לשרתים חיצוניים</strong>, <strong>אינו מכיל מידע מזהה</strong> ו-<strong>נמחק אוטומטית</strong> עם סגירת הדפדפן.
            </p>
            <p style={{ color: "hsl(var(--fg-muted))" }}>
              לא נעשה שימוש ב-cookies, tracking pixels, Google Analytics, Meta Pixel או כל כלי מעקב חיצוני.
            </p>
          </section>

          {/* Section 3 */}
          <section aria-labelledby="section-3">
            <h2 id="section-3" className="font-orbitron text-base mb-3" style={{ color: "hsl(var(--primary))" }}>
              3. כיצד אנו משתמשים במידע?
            </h2>
            <ul className="list-disc list-inside space-y-2" style={{ color: "hsl(var(--fg-muted))" }}>
              <li>חזרה אליך בנוגע לפנייתך / הצעת מחיר</li>
              <li>ביצוע שירות שביקשת (הפקה, שידור, ייעוץ)</li>
              <li>אנחנו <strong>לא</strong> מוכרים, משכירים, או משתפים את פרטיך עם צדדים שלישיים לצורכי שיווק</li>
            </ul>
          </section>

          {/* Section 4 */}
          <section aria-labelledby="section-4">
            <h2 id="section-4" className="font-orbitron text-base mb-3" style={{ color: "hsl(var(--primary))" }}>
              4. אחסון ואבטחת מידע
            </h2>
            <p className="mb-3" style={{ color: "hsl(var(--fg-muted))" }}>
              האתר מאובטח עם <strong>HTTPS/TLS</strong> דרך Cloudflare. מידע שנמסר בטופס יצירת הקשר מגיע ישירות לכתובת הדוא"ל / WhatsApp שלנו.
            </p>
            <p style={{ color: "hsl(var(--fg-muted))" }}>
              אנו מחויבים לעמוד בתקנות הגנת הפרטיות (אבטחת מידע) 2017 תחת חוק הגנת הפרטיות הישראלי.
              מסדי נתונים המכילים מידע אישי מוגנים בהתאם לרמת הגנה בסיסית כנדרש בחוק.
            </p>
          </section>

          {/* Section 5 */}
          <section aria-labelledby="section-5">
            <h2 id="section-5" className="font-orbitron text-base mb-3" style={{ color: "hsl(var(--primary))" }}>
              5. הזכויות שלך (ישראל + EU/GDPR)
            </h2>
            <p className="mb-3" style={{ color: "hsl(var(--fg-muted))" }}>
              בהתאם לחוק הגנת הפרטיות (ישראל, 1981) ו-GDPR (ל-EU), יש לך את הזכויות הבאות:
            </p>
            <ul className="list-disc list-inside space-y-2" style={{ color: "hsl(var(--fg-muted))" }}>
              <li><strong>עיון:</strong> לבקש לראות את המידע האישי שנשמר עליך</li>
              <li><strong>תיקון:</strong> לתקן מידע שגוי</li>
              <li><strong>מחיקה:</strong> לבקש מחיקת המידע שלך ("הזכות להישכח")</li>
              <li><strong>התנגדות:</strong> להתנגד לעיבוד המידע שלך</li>
              <li><strong>ניוד:</strong> לקבל את המידע שלך בפורמט מובנה (GDPR)</li>
            </ul>
            <p className="mt-3" style={{ color: "hsl(var(--fg-muted))" }}>
              לממש את זכויותיך:{" "}
              <a href="mailto:PsychoFlash@gmail.com" style={{ color: "hsl(var(--primary))" }}>
                PsychoFlash@gmail.com
              </a>
            </p>
          </section>

          {/* Section 6 */}
          <section aria-labelledby="section-6">
            <h2 id="section-6" className="font-orbitron text-base mb-3" style={{ color: "hsl(var(--primary))" }}>
              6. קישורים חיצוניים
            </h2>
            <p style={{ color: "hsl(var(--fg-muted))" }}>
              האתר מכיל קישורים לשירותים חיצוניים (WhatsApp, El Al, WIX, Keshet 12).
              אנו לא אחראים למדיניות הפרטיות של אתרים אלו. אנא קרא את מדיניות הפרטיות שלהם בנפרד.
            </p>
          </section>

          {/* Section 7 */}
          <section aria-labelledby="section-7">
            <h2 id="section-7" className="font-orbitron text-base mb-3" style={{ color: "hsl(var(--primary))" }}>
              7. שינויים במדיניות
            </h2>
            <p style={{ color: "hsl(var(--fg-muted))" }}>
              אנו עשויים לעדכן מדיניות זו מעת לעת. כל שינוי מהותי יפורסם בדף זה עם תאריך עדכון מחודש.
              המשך השימוש לאחר הפרסום מהווה הסכמה לתנאים המעודכנים.
            </p>
          </section>

          {/* Section 8 */}
          <section aria-labelledby="section-8">
            <h2 id="section-8" className="font-orbitron text-base mb-3" style={{ color: "hsl(var(--primary))" }}>
              8. יצירת קשר — ממונה על הגנת פרטיות
            </h2>
            <div className="space-y-1" style={{ color: "hsl(var(--fg-muted))" }}>
              <p><strong style={{ color: "hsl(var(--fg))" }}>שם:</strong> אוריאן עדלני</p>
              <p>
                <strong style={{ color: "hsl(var(--fg))" }}>דוא"ל:</strong>{" "}
                <a href="mailto:PsychoFlash@gmail.com" style={{ color: "hsl(var(--primary))" }}>
                  PsychoFlash@gmail.com
                </a>
              </p>
              <p>
                <strong style={{ color: "hsl(var(--fg))" }}>טלפון:</strong>{" "}
                <a href="tel:+972542559027" style={{ color: "hsl(var(--primary))" }}>
                  054-2559027
                </a>
              </p>
            </div>
            <p className="mt-4 text-xs" style={{ color: "hsl(var(--fg-muted))", opacity: 0.6 }}>
              בהתאם לחוק הגנת הפרטיות, תשנ"א-1981 ותקנות הגנת הפרטיות (אבטחת מידע) תשע"ז-2017.
              <br />
              GDPR compliance applies to EU/EEA residents.
            </p>
          </section>

          {/* Back */}
          <div className="pt-6" style={{ borderTop: "1px solid hsl(var(--border))" }}>
            <Link
              to="/"
              className="inline-flex items-center gap-2 transition-colors hover:opacity-80"
              style={{ color: "hsl(var(--primary))", textDecoration: "none", fontFamily: "Orbitron", fontSize: "11px", letterSpacing: "2px", textTransform: "uppercase" }}
              aria-label="חזרה לדף הבית"
            >
              <ArrowRight size={13} aria-hidden="true" />
              חזרה לאתר
            </Link>
          </div>
        </article>
      </main>

      {/* Footer */}
      <footer
        className="mt-12 py-6 px-6 text-center"
        style={{
          borderTop: "1px solid hsl(var(--border))",
          color: "hsl(var(--fg-muted))",
          fontSize: "11px",
          opacity: 0.6,
        }}
      >
        <p>PSYCHOFLASH © {new Date().getFullYear()} | אדלני הפקות | כל הזכויות שמורות</p>
      </footer>
    </div>
  );
}
