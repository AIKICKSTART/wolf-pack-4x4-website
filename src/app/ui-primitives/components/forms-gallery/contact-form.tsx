"use client"

import { useId, useState, type FormEvent } from "react"

import styles from "./contact-form.module.css"

export interface ContactFormValues {
  name: string
  email: string
  phone: string
  subject: string
  message: string
  consent: boolean
}

interface ContactFormProps {
  onSubmit?: (data: FormData) => void
  defaultValues?: Partial<ContactFormValues>
}

const SUBJECTS: ReadonlyArray<{ value: string; label: string }> = [
  { value: "general", label: "General enquiry" },
  { value: "quote", label: "Quote request" },
  { value: "booking", label: "Booking question" },
  { value: "warranty", label: "Warranty / fitment" },
  { value: "media", label: "Media / supplier" },
]

export function ContactForm({ onSubmit, defaultValues }: ContactFormProps) {
  const nameId = useId()
  const emailId = useId()
  const phoneId = useId()
  const subjectId = useId()
  const messageId = useId()
  const consentId = useId()
  const messageHelpId = useId()

  const [attached, setAttached] = useState<string | null>(null)
  const [submitted, setSubmitted] = useState<boolean>(false)

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    onSubmit?.(data)
    setSubmitted(true)
  }

  const handleAttach = () => {
    setAttached((current) => (current ? null : "underbody-photo.jpg · 1.2 MB"))
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <header className={styles.head}>
        <span className={styles.eyebrow}>01 / Contact</span>
        <h2 className={styles.title}>Talk to the workshop</h2>
        <p className={styles.lede}>
          Send the team a message. We reply during workshop hours, Monday to Saturday.
        </p>
      </header>

      {submitted ? (
        <div className={styles.success} role="status">
          <span className={styles.successTick} aria-hidden="true">
            ✓
          </span>
          <span className={styles.successCopy}>
            <strong>Message received</strong>
            <span>We will reply to your email within one business day.</span>
          </span>
        </div>
      ) : null}

      <fieldset className={styles.grid}>
        <legend className={styles.legend}>Your details and message</legend>

        <div className={styles.field}>
          <label htmlFor={nameId} className={styles.label}>
            Full name
            <span className={styles.required} aria-hidden="true">
              *
            </span>
          </label>
          <input
            id={nameId}
            name="name"
            type="text"
            autoComplete="name"
            required
            placeholder="Jordan Harris"
            defaultValue={defaultValues?.name}
            className={styles.input}
          />
        </div>

        <div className={styles.field}>
          <label htmlFor={emailId} className={styles.label}>
            Email
            <span className={styles.required} aria-hidden="true">
              *
            </span>
          </label>
          <input
            id={emailId}
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            required
            placeholder="you@workshop.com"
            defaultValue={defaultValues?.email}
            className={styles.input}
          />
        </div>

        <div className={styles.field}>
          <label htmlFor={phoneId} className={styles.label}>
            Phone
          </label>
          <input
            id={phoneId}
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder="0400 000 000"
            defaultValue={defaultValues?.phone}
            className={styles.input}
          />
        </div>

        <div className={styles.field}>
          <label htmlFor={subjectId} className={styles.label}>
            Subject
            <span className={styles.required} aria-hidden="true">
              *
            </span>
          </label>
          <select
            id={subjectId}
            name="subject"
            required
            defaultValue={defaultValues?.subject ?? "general"}
            className={styles.select}
          >
            {SUBJECTS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className={`${styles.field} ${styles.fieldWide}`}>
          <label htmlFor={messageId} className={styles.label}>
            Message
            <span className={styles.required} aria-hidden="true">
              *
            </span>
          </label>
          <textarea
            id={messageId}
            name="message"
            required
            rows={5}
            placeholder="Tell us about the vehicle, the sound, and what you would like done."
            defaultValue={defaultValues?.message}
            aria-describedby={messageHelpId}
            className={styles.textarea}
          />
          <span id={messageHelpId} className={styles.help}>
            Include vehicle make, model, year, and the symptom if possible.
          </span>
        </div>

        <div className={`${styles.attachRow} ${styles.fieldWide}`}>
          <div className={styles.attachInfo}>
            <span className={styles.attachLabel}>Attachment</span>
            <span className={styles.attachHelp}>
              {attached ?? "Optional · max 10 MB, JPG / PDF"}
            </span>
          </div>
          <button type="button" className={styles.attachBtn} onClick={handleAttach}>
            {attached ? "Remove" : "Attach file"}
          </button>
        </div>

        <label htmlFor={consentId} className={`${styles.consent} ${styles.fieldWide}`}>
          <input
            id={consentId}
            name="consent"
            type="checkbox"
            required
            defaultChecked={defaultValues?.consent}
          />
          <span>
            I agree to Oak Flats Mufflermen storing my contact details for the purpose of
            replying to this enquiry. We do not share details with third parties.
          </span>
        </label>
      </fieldset>

      <div className={styles.actions}>
        <button type="button" className={styles.draftBtn}>
          Save draft
        </button>
        <button type="submit" className={styles.primaryBtn}>
          Send message
          <span aria-hidden="true">→</span>
        </button>
      </div>
    </form>
  )
}
