"use client"

import { useState, type FormEvent } from "react"

import styles from "./newsletter-cta.module.css"

export interface NewsletterCtaProps {
  kicker?: string
  heading: string
  body?: string
  /** Submit button label. */
  ctaLabel?: string
  /** Privacy fineprint shown beneath the field. */
  privacyNote?: string
  /** Fires once with the entered email on submit. */
  onSubmit?: (email: string) => void | Promise<void>
  className?: string
}

export function NewsletterCta({
  kicker,
  heading,
  body,
  ctaLabel = "Subscribe",
  privacyNote = "We'll never share your email. Unsubscribe in one click.",
  onSubmit,
  className,
}: NewsletterCtaProps) {
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle")

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (status === "submitting") {
      return
    }
    setStatus("submitting")
    try {
      await onSubmit?.(email)
      setStatus("success")
      setEmail("")
    } catch {
      setStatus("error")
    }
  }

  const classes = [styles.section, className].filter(Boolean).join(" ")

  return (
    <section className={classes} aria-label={heading}>
      <div className={styles.shell}>
        <header className={styles.header}>
          {kicker ? <span className={styles.kicker}>{kicker}</span> : null}
          <h2 className={styles.heading}>{heading}</h2>
          {body ? <p className={styles.body}>{body}</p> : null}
        </header>

        <form className={styles.form} onSubmit={handleSubmit} noValidate>
          <label className={styles.field}>
            <span className={styles.fieldLabel}>Email</span>
            <input
              type="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="you@illawarra.example"
              className={styles.input}
              autoComplete="email"
              inputMode="email"
              disabled={status === "submitting"}
            />
          </label>
          <button
            type="submit"
            className={styles.submit}
            disabled={status === "submitting"}
          >
            <span>{status === "submitting" ? "Submitting..." : ctaLabel}</span>
            <span className={styles.arrow} aria-hidden="true" />
          </button>
        </form>

        {status === "success" ? (
          <p className={styles.feedback} role="status">
            You&rsquo;re in. Watch the inbox for the next workshop drop.
          </p>
        ) : null}
        {status === "error" ? (
          <p className={`${styles.feedback} ${styles.feedbackError}`} role="alert">
            Something stalled. Try again or call the workshop.
          </p>
        ) : null}

        <small className={styles.privacy}>{privacyNote}</small>
      </div>
    </section>
  )
}

export default NewsletterCta
