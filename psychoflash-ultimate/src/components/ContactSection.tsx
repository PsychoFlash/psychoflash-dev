import { motion } from "framer-motion";
import { MessageCircle, Mail, Phone, MapPin, Send } from "lucide-react";
import { useState, useId } from "react";

const CONTACTS = [
  { icon: Phone,         label: "טלפון",    value: "054-2559027",           href: "tel:+972542559027",            ariaLabel: "התקשר אלינו" },
  { icon: Mail,          label: "מייל",     value: "PsychoFlash@gmail.com", href: "mailto:PsychoFlash@gmail.com", ariaLabel: "שלח אימייל" },
  { icon: MessageCircle, label: "WhatsApp", value: "שלח הודעה ישירה",       href: "https://wa.me/972542559027",   ariaLabel: "פתח שיחת WhatsApp" },
  { icon: MapPin,        label: "מיקום",    value: "ישראל | גלובלי",        href: undefined,                      ariaLabel: "ישראל ופעילות גלובלית" },
];

export default function ContactSection() {
  const [form, setForm] = useState({ name: "", phone: "", service: "", message: "" });
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const formId = useId();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    // Simulate async submit
    setTimeout(() => {
      setSent(true);
      setSubmitting(false);
      setTimeout(() => setSent(false), 4000);
      setForm({ name: "", phone: "", service: "", message: "" });
    }, 600);
  };

  return (
    <section
      id="contact"
      className="py-20 px-5"
      aria-labelledby="contact-heading"
    >
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p
            className="font-orbitron mb-3"
            style={{ fontSize: "10px", letterSpacing: "5px", color: "hsl(var(--primary))", textTransform: "uppercase" }}
            aria-hidden="true"
          >
            GET IN TOUCH
          </p>
          <h2
            id="contact-heading"
            className="section-title gradient-text mb-3"
          >
            צור קשר
          </h2>
          <p className="text-sm max-w-md mx-auto" style={{ color: "hsl(var(--fg-muted))" }}>
            מוכן להתחיל? נחזור אליך תוך 24 שעות.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Contact Form */}
          <motion.form
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            onSubmit={handleSubmit}
            className="lg:col-span-3 glass-card p-7 space-y-4"
            aria-label="טופס יצירת קשר"
            noValidate
          >
            {/* Success message */}
            {sent && (
              <div
                role="alert"
                aria-live="polite"
                className="text-sm font-medium text-center py-2 rounded"
                style={{ background: "hsl(var(--primary) / 0.1)", color: "hsl(var(--primary))", border: "1px solid hsl(var(--primary) / 0.3)" }}
              >
                ✓ הפנייה נשלחה בהצלחה! נחזור אליך תוך 24 שעות.
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field
                id={`${formId}-name`}
                label="שם מלא"
                value={form.name}
                onChange={(v) => setForm({ ...form, name: v })}
                placeholder="אוריאן עדלני"
                required
                autoComplete="name"
              />
              <Field
                id={`${formId}-phone`}
                label="טלפון"
                value={form.phone}
                onChange={(v) => setForm({ ...form, phone: v })}
                placeholder="054-000-0000"
                type="tel"
                autoComplete="tel"
              />
            </div>
            <Field
              id={`${formId}-service`}
              label="סוג שירות"
              value={form.service}
              onChange={(v) => setForm({ ...form, service: v })}
              placeholder="הפקת וידאו, שידור חי, AI..."
            />

            {/* Textarea */}
            <div>
              <label
                htmlFor={`${formId}-message`}
                className="block font-orbitron mb-1.5"
                style={{ fontSize: "9px", letterSpacing: "2px", color: "hsl(var(--fg-muted))", textTransform: "uppercase" }}
              >
                פרטים נוספים
              </label>
              <textarea
                id={`${formId}-message`}
                name="message"
                rows={4}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                placeholder="ספר לנו על הפרויקט שלך..."
                className="w-full rounded-lg px-4 py-3 text-sm resize-none transition-all duration-200"
                style={{
                  background: "hsl(var(--bg))",
                  border: "1px solid hsl(var(--border))",
                  color: "hsl(var(--fg))",
                  outline: "none",
                }}
                onFocus={(e) => (e.target.style.borderColor = "hsl(var(--primary))")}
                onBlur={(e) => (e.target.style.borderColor = "hsl(var(--border))")}
                aria-label="פרטים נוספים על הפרויקט"
              />
            </div>

            <button
              type="submit"
              className="cyber-btn w-full justify-center py-3"
              disabled={submitting}
              aria-label={sent ? "הפנייה נשלחה" : "שלח הודעה"}
              aria-busy={submitting}
            >
              {sent ? (
                "✓ נשלח!"
              ) : submitting ? (
                <span aria-hidden="true">שולח...</span>
              ) : (
                <>
                  <Send size={13} aria-hidden="true" />
                  שלח הודעה
                </>
              )}
            </button>

            {/* Privacy notice */}
            <p
              className="text-center text-xs"
              style={{ color: "hsl(var(--fg-muted))", opacity: 0.5, fontSize: "10px" }}
            >
              המידע שלך מוגן לפי{" "}
              <a
                href="/privacy"
                style={{ color: "hsl(var(--primary))", textDecoration: "underline" }}
                aria-label="קרא את מדיניות הפרטיות שלנו"
              >
                מדיניות הפרטיות
              </a>{" "}
              שלנו ואינו מועבר לצד שלישי.
            </p>
          </motion.form>

          {/* Contact cards */}
          <motion.div
            initial={{ opacity: 0, x: 16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2 flex flex-col gap-3"
            aria-label="פרטי יצירת קשר"
          >
            {CONTACTS.map((c, i) => {
              const Tag = c.href ? "a" : "div";
              const linkProps = c.href
                ? {
                    href: c.href,
                    target: c.href.startsWith("http") ? "_blank" : undefined,
                    rel: c.href.startsWith("http") ? "noopener noreferrer" : undefined,
                    "aria-label": c.ariaLabel,
                  }
                : { "aria-label": c.ariaLabel };

              return (
                <motion.div
                  key={c.label}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07 }}
                  whileHover={{ x: 4 }}
                >
                  <Tag
                    {...(linkProps as any)}
                    className="glass-card p-4 flex items-center gap-4 no-underline group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--primary))] rounded-xl"
                    style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "1rem" }}
                  >
                    <div
                      className="w-9 h-9 rounded flex items-center justify-center shrink-0"
                      style={{ background: "hsl(var(--primary) / 0.1)", border: "1px solid hsl(var(--primary) / 0.2)" }}
                      aria-hidden="true"
                    >
                      <c.icon size={15} style={{ color: "hsl(var(--primary))" }} />
                    </div>
                    <div>
                      <div
                        className="font-orbitron"
                        style={{ fontSize: "8px", letterSpacing: "2px", color: "hsl(var(--fg-muted))", textTransform: "uppercase", marginBottom: 2 }}
                        aria-hidden="true"
                      >
                        {c.label}
                      </div>
                      <div
                        className="text-sm font-medium transition-colors group-hover:text-[hsl(var(--primary))]"
                        style={{ color: "hsl(var(--fg))" }}
                      >
                        {c.value}
                      </div>
                    </div>
                  </Tag>
                </motion.div>
              );
            })}

            {/* WhatsApp CTA */}
            <div
              className="glass-card p-4 text-center"
              style={{ borderColor: "hsl(var(--primary) / 0.2)" }}
            >
              <p className="text-xs mb-2" style={{ color: "hsl(var(--fg-muted))" }}>
                עדיף ב-WhatsApp?
              </p>
              <a
                href="https://wa.me/972542559027"
                target="_blank"
                rel="noopener noreferrer"
                className="cyber-btn justify-center py-2.5 px-5 w-full text-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--primary))]"
                style={{ fontSize: "0.65rem" }}
                aria-label="פתח שיחת WhatsApp עם PSYCHOFLASH (נפתח בחלון חדש)"
              >
                <MessageCircle size={12} aria-hidden="true" />
                פתח WhatsApp
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ======================================================
   Field — accessible form field with proper label binding
   ====================================================== */
interface FieldProps {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
  required?: boolean;
  autoComplete?: string;
}

function Field({ id, label, value, onChange, placeholder, type = "text", required, autoComplete }: FieldProps) {
  return (
    <div>
      <label
        htmlFor={id}
        className="block font-orbitron mb-1.5"
        style={{ fontSize: "9px", letterSpacing: "2px", color: "hsl(var(--fg-muted))", textTransform: "uppercase" }}
      >
        {label}
        {required && (
          <span aria-hidden="true" style={{ color: "hsl(var(--primary))", marginRight: "2px" }}>
            {" "}*
          </span>
        )}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        value={value}
        required={required}
        autoComplete={autoComplete}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-required={required}
        aria-label={label}
        className="w-full rounded-lg px-4 py-3 text-sm transition-all duration-200"
        style={{
          background: "hsl(var(--bg))",
          border: "1px solid hsl(var(--border))",
          color: "hsl(var(--fg))",
          outline: "none",
        }}
        onFocus={(e) => (e.target.style.borderColor = "hsl(var(--primary))")}
        onBlur={(e) => (e.target.style.borderColor = "hsl(var(--border))")}
      />
    </div>
  );
}
