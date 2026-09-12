"use client";

import emailjs from "@emailjs/browser";
import { AnimatePresence, motion } from "framer-motion";
import { useState, type FormEvent } from "react";
import { CheckCircle2, Loader2, Send } from "lucide-react";
import { Button } from "@/components/ui/Button";

const reasons = ["General Enquiry", "Order Support", "Custom Jewellery", "Other"];

const SERVICE_ID = "service_8b6r9gi";
const TEMPLATE_ID = "template_q5qvcao";
const PUBLIC_KEY = "L9jN46rbrFyL3OLfd";

const inputClasses =
  "h-12 w-full rounded-xl border border-charcoal/12 bg-white px-4 text-sm text-charcoal shadow-sm transition-colors placeholder:text-muted/60 focus:border-burgundy focus:outline-none focus:ring-2 focus:ring-burgundy/15";

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setSubmitting(true);

    const form = event.currentTarget;
    const formData = new FormData(form);

    try {
      emailjs.init({ publicKey: PUBLIC_KEY });

      await emailjs.send(SERVICE_ID, TEMPLATE_ID, {
        name: formData.get("name"),
        email: formData.get("email"),
        reason: formData.get("reason"),
        message: formData.get("message"),
      });

      setSubmitted(true);
      form.reset();
    } catch (err) {
      console.error("EmailJS send failed:", err);
      setError("Something went wrong while sending your message. Please try again or contact us directly.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <AnimatePresence mode="wait">
      {submitted ? (
        <motion.div
          key="success"
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-center gap-3 py-10 text-center"
        >
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-burgundy/10 text-burgundy">
            <CheckCircle2 className="h-7 w-7" />
          </span>
          <p className="font-serif text-2xl text-charcoal">Thank You</p>
          <p className="max-w-xs text-sm text-muted">Your message has been received. We&apos;ll be in touch soon.</p>
        </motion.div>
      ) : (
        <motion.form
          key="form"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onSubmit={handleSubmit}
          className="flex flex-col gap-5"
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <label className="flex flex-col gap-1.5">
              <span className="eyebrow text-[11px] text-muted">Full Name *</span>
              <input name="name" required autoComplete="name" className={inputClasses} />
            </label>
            <label className="flex flex-col gap-1.5">
              <span className="eyebrow text-[11px] text-muted">Email *</span>
              <input name="email" type="email" required autoComplete="email" className={inputClasses} />
            </label>
          </div>

          <label className="flex flex-col gap-1.5">
            <span className="eyebrow text-[11px] text-muted">Reason for Contact</span>
            <select name="reason" required defaultValue="" className={inputClasses}>
              <option value="" disabled>
                Select a reason
              </option>
              {reasons.map((reason) => (
                <option key={reason} value={reason}>
                  {reason}
                </option>
              ))}
            </select>
          </label>

          <label className="flex flex-col gap-1.5">
            <span className="eyebrow text-[11px] text-muted">Message *</span>
            <textarea
              name="message"
              required
              rows={5}
              className="w-full rounded-xl border border-charcoal/12 bg-white px-4 py-3 text-sm text-charcoal shadow-sm transition-colors focus:border-burgundy focus:outline-none focus:ring-2 focus:ring-burgundy/15"
            />
          </label>

          <Button type="submit" variant="primary" size="md" disabled={submitting} className="mt-1 w-fit gap-2">
            {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-3.5 w-3.5" />}
            Send Message
          </Button>

          {error && <p className="text-xs text-red-600">{error}</p>}

          <p className="text-xs text-muted">
            For urgent enquiries, reach us on WhatsApp or email directly.
          </p>
        </motion.form>
      )}
    </AnimatePresence>
  );
}
