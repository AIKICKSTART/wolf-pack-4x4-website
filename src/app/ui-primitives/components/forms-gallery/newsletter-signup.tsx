"use client"

import { useId, useState, type FormEvent } from "react"

import styles from "./newsletter-signup.module.css"

export interface NewsletterSignupValues {
  email: string
}

interface NewsletterSignupProps {
  onSubmit?: (data: FormData) => void
  defaultValues?: Partial<NewsletterSignupValues>
}

export function NewsletterSignup({ onSubmit, defaultValues }: NewsletterSignupProps) {
  const emailId = useId()
  const helpId = useId()
  const [submitted, setSubmitted] = useState<boolean>(false)

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    onSubmit?.(data)
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className={styles.form} role="status" aria-live="polite">
        <div className={styles.success}>
          <span className={styles.successTick} aria-hidden="true">
            ✓
          </span>
          <h2 className={styles.successTitle}>Thanks — you are in</h2>
          <p className={styles.successCopy}>
            Look for the weekly drop on Friday morning. Quotes, builds, and the workshop log.
          </p>
          <button
            type="button"
            className={styles.followBtn}
            onClick={() => setSubmitted(false)}
          >
            Submit another email
          </button>
        </div>
      </div>
    )
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <header className={styles.head}>
        <span className={styles.eyebrow}>06 / Newsletter</span>
        <h2 className={styles.title}>Workshop signal</h2>
        <p className={styles.lede}>
          One short email per week — builds, before / afters, and parts moving through Oak Flats.
        </p>
      </header>

      <div className={styles.inputRow}>
        <div className={styles.field}>
          <label htmlFor={emailId} className={styles.label}>
            Email address
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
            aria-describedby={helpId}
            className={styles.input}
          />
        </div>
        <button type="submit" className={styles.submitBtn}>
          Subscribe
          <span aria-hidden="true">→</span>
        </button>
      </div>

      <span id={helpId} className={styles.help}>
        No spam. Unsubscribe in one click. We never share your email.
      </span>
    </form>
  )
}
