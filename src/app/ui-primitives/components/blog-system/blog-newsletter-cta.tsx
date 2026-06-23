"use client"

import { useState, type FormEvent } from "react"

import styles from "./blog-newsletter-cta.module.css"

export interface BlogNewsletterCtaProps {
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

type Status = "idle" | "submitting" | "success" | "error"

export function BlogNewsletterCta({
  kicker = "Workshop dispatch",
  heading,
  body,
  ctaLabel = "Subscribe",
  privacyNote = "One email a month. No spam, unsubscribe in a click.",
  onSubmit,
  className,
}: BlogNewsletterCtaProps) {
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState<Status>("idle")

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
      <span className={styles.weave} aria-hidden="true" />
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
          <button type="submit" className={styles.submit} disabled={status === "submitting"}>
            <span>{status === "submitting" ? "Sending..." : ctaLabel}</span>
            <span className={styles.arrow} aria-hidden="true" />
          </button>
        </form>

        {status === "success" ? (
          <p className={styles.feedback} role="status">
            You&rsquo;re on the list. Next dispatch lands after the upcoming build.
          </p>
        ) : null}
        {status === "error" ? (
          <p className={`${styles.feedback} ${styles.feedbackError}`} role="alert">
            That stalled. Try again or call the workshop.
          </p>
        ) : null}

        <small className={styles.privacy}>{privacyNote}</small>
      </div>
    </section>
  )
}

export default BlogNewsletterCta
