"use client"

import { useState } from "react"

import styles from "./anonymous-toggle.module.css"

interface AnonymousToggleProps {
  /** Initial pressed state. */
  defaultPressed?: boolean
  /** Override the surface heading. */
  title?: string
  /** Override the explanation copy. */
  description?: string
  className?: string
}

export function AnonymousToggle({
  defaultPressed = true,
  title = "Anonymous responses",
  description = "When on, the workshop sees aggregated answers only. Respondents are never linked to a name, email, or vehicle.",
  className,
}: AnonymousToggleProps) {
  const [pressed, setPressed] = useState<boolean>(defaultPressed)
  const [popoverOpen, setPopoverOpen] = useState<boolean>(false)

  const classes = [styles.row, pressed ? styles.rowOn : null, className]
    .filter(Boolean)
    .join(" ")

  return (
    <div className={classes}>
      <div className={styles.body}>
        <span className={styles.title}>{title}</span>
        <span className={styles.subtitle}>
          {pressed ? "On — answers untraceable" : "Off — respondent identity recorded"}
        </span>
      </div>

      <div className={styles.controls}>
        <button
          type="button"
          className={styles.info}
          aria-expanded={popoverOpen}
          aria-controls="anon-toggle-pop"
          aria-label="What does anonymous mean?"
          onClick={() => setPopoverOpen((v) => !v)}
        >
          <svg viewBox="0 0 14 14" width="13" height="13" aria-hidden="true">
            <circle cx="7" cy="7" r="5.6" stroke="currentColor" fill="none" />
            <path d="M7 6.4v3.2M7 4.6v.4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
        </button>

        <button
          type="button"
          role="switch"
          aria-checked={pressed}
          aria-label={title}
          className={styles.switch}
          onClick={() => setPressed((v) => !v)}
        >
          <span className={styles.thumb} aria-hidden="true" />
        </button>
      </div>

      {popoverOpen ? (
        <div
          id="anon-toggle-pop"
          className={styles.popover}
          role="note"
        >
          {description}
        </div>
      ) : null}
    </div>
  )
}
