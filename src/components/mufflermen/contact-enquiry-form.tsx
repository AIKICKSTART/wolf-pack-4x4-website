"use client"

import * as React from "react"

type FormStatus =
  | { type: "idle"; message: string }
  | { type: "success"; message: string }
  | { type: "error"; message: string }

const serviceOptions = [
  { label: "Suspension and lift kits", value: "suspension-lift-kits" },
  { label: "Bull bars and protection", value: "bull-bars-protection" },
  { label: "Winches and recovery gear", value: "winches-recovery-gear" },
  { label: "4x4 lighting and electrical", value: "4x4-lighting-electrical" },
  { label: "Dual battery systems", value: "dual-battery-systems" },
  { label: "Canopies, racks and storage", value: "canopies-roof-racks-storage" },
  { label: "Towing and GVM support", value: "towing-gvm-upgrades" },
  { label: "Performance 4x4 upgrades", value: "performance-4x4-upgrades" },
  { label: "4x4 parts enquiry", value: "parts" },
  { label: "Other workshop enquiry", value: "other" },
] as const

export function ContactEnquiryForm() {
  const [status, setStatus] = React.useState<FormStatus>({
    type: "idle",
    message: "Tell us the vehicle, current accessories and the outcome you want quoted.",
  })
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const formRef = React.useRef<HTMLFormElement>(null)

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsSubmitting(true)
    setStatus({ type: "idle", message: "Sending enquiry..." })

    const formData = new FormData(event.currentTarget)
    const payload = {
      email: String(formData.get("email") ?? ""),
      message: String(formData.get("message") ?? ""),
      name: String(formData.get("name") ?? ""),
      phone: String(formData.get("phone") ?? ""),
      serviceInterest: String(formData.get("serviceInterest") ?? "other"),
      vehicle: String(formData.get("vehicle") ?? ""),
      website: String(formData.get("website") ?? ""),
    }

    try {
      const response = await fetch("/api/enquiries", {
        body: JSON.stringify(payload),
        headers: { "Content-Type": "application/json" },
        method: "POST",
      })
      const result = (await response.json().catch(() => ({}))) as { error?: string; ok?: boolean }

      if (!response.ok || !result.ok) {
        setStatus({
          type: "error",
          message: result.error ?? "The enquiry could not be sent. Please call the workshop.",
        })
        return
      }

      formRef.current?.reset()
      setStatus({
        type: "success",
        message: "Enquiry received. The workshop will follow up during business hours.",
      })
    } catch {
      setStatus({
        type: "error",
        message: "The enquiry could not be sent. Please call the workshop.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form id="enquiry" ref={formRef} className="public-contact-form glass" onSubmit={onSubmit}>
      <div className="public-form-head">
        <span className="seo-kicker">Workshop enquiry</span>
        <h2>Request a 4x4 quote</h2>
        <p>
          Include make, model, year, current accessories, towing or touring use, and the upgrade result you want quoted.
        </p>
      </div>

      <input className="public-honeypot" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" />

      <div className="public-form-grid">
        <label htmlFor="enquiry-name">
          <span>Name *</span>
          <input id="enquiry-name" name="name" type="text" autoComplete="name" required placeholder="Your name" />
        </label>
        <label htmlFor="enquiry-phone">
          <span>Phone *</span>
          <input id="enquiry-phone" name="phone" type="tel" autoComplete="tel" required placeholder="04xx xxx xxx" />
        </label>
        <label htmlFor="enquiry-email">
          <span>Email</span>
          <input id="enquiry-email" name="email" type="email" autoComplete="email" placeholder="you@example.com" />
        </label>
        <label htmlFor="enquiry-vehicle">
          <span>Vehicle *</span>
          <input
            id="enquiry-vehicle"
            name="vehicle"
            type="text"
            required
            placeholder="Vehicle make, model, year and engine"
          />
        </label>
        <label htmlFor="enquiry-service">
          <span>Service</span>
          <select id="enquiry-service" name="serviceInterest" defaultValue="suspension-lift-kits">
            {serviceOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
        <label className="is-wide" htmlFor="enquiry-message">
          <span>Message *</span>
          <textarea
            id="enquiry-message"
            name="message"
            required
            rows={6}
            placeholder="Tell us what needs upgrading, fitting or planning."
          />
        </label>
        <label className="public-consent is-wide" htmlFor="enquiry-consent">
          <input id="enquiry-consent" name="consent" type="checkbox" required />
          <span>Wolfpack 4x4 can use these details to respond to this enquiry.</span>
        </label>
      </div>

      <div className="public-form-actions">
        <p className={`public-form-status ${status.type}`} role="status" aria-live="polite">
          {status.message}
        </p>
        <button className="btn btn-red" type="submit" disabled={isSubmitting}>
          <span>{isSubmitting ? "Sending" : "Request quote"}</span>
          <span className="arrow" />
        </button>
      </div>
    </form>
  )
}
