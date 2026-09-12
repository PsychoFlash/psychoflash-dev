/**
 * AccessibilityStatementPage — הצהרת נגישות
 *
 * חובה לפי תקן ישראלי IS 5568 (ינואר 2017)
 * עסקים עם אתר חייבים בהצהרת נגישות ב-WCAG 2.1 AA
 */

import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export default function AccessibilityStatementPage() {
  useEffect(() => {
    document.title = "הצהרת נגישות — PSYCHOFLASH";
    window.scrollTo(0, 0);
  }, []);

  const year = new Date().getFullYear();

  return (
    <div
      className="min-h-screen"
      style={{ background: "hsl(var(--bg))", color: "hsl(var(--fg))" }}
      lang="he"
      dir="rtl"
    >
      {/* Skip nav */}
      <a
        href="#a11y-content"
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
            aria-label="חזרה לדף הבית"
          >
            PSYCHO<span style={{ color: "hsl(var(--primary))" }}>FLASH</span>
          </Link>
          <Link
            to="/"
            className="flex items-center gap-2 text-sm"
            style={{ color: "hsl(var(--fg-muted))", textDecoration: "none" }}
          >
            <ArrowRight size={14} aria-hidden="true" />
            חזרה לאתר
          </Link>
        </div>
      </header>

      {/* Main */}
      <main id="a11y-content" className="max-w-3xl mx-auto px-6 py-12" tabIndex={-1}>
        <div className="mb-10">
          <p
            className="font-orbitron mb-3"
            style={{ fontSize: "10px", letterSpacing: "5px", color: "hsl(var(--primary))", textTransform: "uppercase" }}
          >
            ACCESSIBILITY
          </p>
          <h1
            className="font-teko mb-3"
            style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", color: "hsl(var(--fg))" }}
          >
            הצהרת נגישות
          </h1>
          <p className="text-sm" style={{ color: "hsl(var(--fg-muted))" }}>
            בהתאם לתקנות שוויון זכויות לאנשים עם מוגבלות (התאמות נגישות לשירות), תשע"ג-2013
          </p>
        </div>

        <article className="space-y-8 text-sm leading-relaxed" style={{ color: "hsl(var(--fg))", maxWidth: "65ch" }}>

          <section aria-labelledby="a11y-intro">
            <h2 id="a11y-intro" className="font-orbitron text-base mb-3" style={{ color: "hsl(var(--primary))" }}>
              על הצהרה זו
            </h2>
            <p style={{ color: "hsl(var(--fg-muted))" }}>
              PSYCHOFLASH מחויבת לנגישות דיגיטלית עבור אנשים עם מוגבלויות.
              אנו ממשיכים לשפר את חוויית המשתמש לכולם ולהחיל תקני נגישות רלוונטיים.
            </p>
          </section>

          <section aria-labelledby="a11y-standard">
            <h2 id="a11y-standard" className="font-orbitron text-base mb-3" style={{ color: "hsl(var(--primary))" }}>
              התקן שאנו מיישמים
            </h2>
            <p className="mb-3" style={{ color: "hsl(var(--fg-muted))" }}>
              אנו שואפים לעמוד ב-<strong>WCAG 2.1 ברמה AA</strong> — תקן הנגישות הבינלאומי של W3C, אשר מאומץ בישראל דרך תקן{" "}
              <strong>IS 5568</strong> ותקנות שוויון זכויות לאנשים עם מוגבלות.
            </p>
          </section>

          <section aria-labelledby="a11y-features">
            <h2 id="a11y-features" className="font-orbitron text-base mb-3" style={{ color: "hsl(var(--primary))" }}>
              אמצעי נגישות שיישמנו
            </h2>
            <ul className="list-disc list-inside space-y-2" style={{ color: "hsl(var(--fg-muted))" }}>
              <li><strong>שפה מוגדרת:</strong> שפת האתר מוגדרת ל-he עם כיוון RTL (WCAG 3.1.1)</li>
              <li><strong>דילוג לתוכן:</strong> קישור "דלג לתוכן הראשי" ראשון בדף (WCAG 2.4.1)</li>
              <li><strong>תגיות כותרת:</strong> היררכיה עקבית H1→H2→H3 (WCAG 1.3.1)</li>
              <li><strong>תוויות טפסים:</strong> כל שדה מלווה ב-label (WCAG 1.3.1, 3.3.2)</li>
              <li><strong>ניווט מקלדת:</strong> כל האלמנטים האינטראקטיביים נגישים ב-Tab (WCAG 2.1.1)</li>
              <li><strong>מצב focus גלוי:</strong> מסגרת focus ברורה בצבע זהב (WCAG 2.4.7)</li>
              <li><strong>Landmarks:</strong> header, main, nav, footer מוגדרים כ-ARIA landmarks (WCAG 1.3.6)</li>
              <li><strong>טקסט חלופי:</strong> תמונות ואיקונים דקורטיביים עם aria-hidden (WCAG 1.1.1)</li>
              <li><strong>ניגוד צבעים:</strong> יחס ניגוד ≥ 4.5:1 לטקסט רגיל, ≥ 3:1 לטקסט גדול (WCAG 1.4.3)</li>
              <li><strong>אנימציות:</strong> כבוד ל-prefers-reduced-motion (WCAG 2.3.3)</li>
              <li><strong>RTL מלא:</strong> כיוון כתיבה עברית נכון לכל הדף (WCAG 3.1.1)</li>
              <li><strong>Responsive:</strong> תצוגה מותאמת מ-320px ועד מסכים גדולים (WCAG 1.4.4)</li>
              <li><strong>Audio Control:</strong> שמע סביבתי מושתק כברירת מחדל (WCAG 1.4.2)</li>
            </ul>
          </section>

          <section aria-labelledby="a11y-partial">
            <h2 id="a11y-partial" className="font-orbitron text-base mb-3" style={{ color: "hsl(var(--primary))" }}>
              היבטים בתהליך שיפור
            </h2>
            <ul className="list-disc list-inside space-y-2" style={{ color: "hsl(var(--fg-muted))" }}>
              <li>תיאורים מפורטים לתמונות וסרטוני וידאו בתיק העבודות</li>
              <li>כתוביות לתכנים וידאו עתידיים</li>
            </ul>
          </section>

          <section aria-labelledby="a11y-contact">
            <h2 id="a11y-contact" className="font-orbitron text-base mb-3" style={{ color: "hsl(var(--primary))" }}>
              פניות בנושא נגישות
            </h2>
            <p className="mb-3" style={{ color: "hsl(var(--fg-muted))" }}>
              נתקלת בבעיית נגישות? נשמח לשמוע ולתקן בהקדם:
            </p>
            <div className="space-y-1" style={{ color: "hsl(var(--fg-muted))" }}>
              <p>
                <strong style={{ color: "hsl(var(--fg))" }}>רכז נגישות:</strong> אוריין אדלני
              </p>
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
              נטפל בכל פנייה תוך 5 ימי עסקים.
              <br />
              הגשת תלונה אפשרית גם לנציב שוויון זכויות לאנשים עם מוגבלות, משרד המשפטים.
            </p>
          </section>

          <section aria-labelledby="a11y-date">
            <h2 id="a11y-date" className="font-orbitron text-base mb-3" style={{ color: "hsl(var(--primary))" }}>
              תאריך עדכון הצהרה
            </h2>
            <p style={{ color: "hsl(var(--fg-muted))" }}>
              ספטמבר {year}. הצהרה זו תעודכן עם כל שינוי מהותי בנגישות האתר.
            </p>
          </section>

          <div className="pt-6" style={{ borderTop: "1px solid hsl(var(--border))" }}>
            <Link
              to="/"
              className="inline-flex items-center gap-2"
              style={{ color: "hsl(var(--primary))", textDecoration: "none", fontFamily: "Orbitron", fontSize: "11px", letterSpacing: "2px", textTransform: "uppercase" }}
            >
              <ArrowRight size={13} aria-hidden="true" />
              חזרה לאתר
            </Link>
          </div>
        </article>
      </main>

      <footer
        className="mt-12 py-6 px-6 text-center"
        style={{ borderTop: "1px solid hsl(var(--border))", color: "hsl(var(--fg-muted))", fontSize: "11px", opacity: 0.6 }}
      >
        <p>PSYCHOFLASH © {year} | אדלני הפקות</p>
      </footer>
    </div>
  );
}
