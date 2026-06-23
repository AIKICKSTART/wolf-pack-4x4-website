"use client"

import { useId, useState } from "react"

import { Chip } from "../primitives/chip"

import { FLAG_REASON_LABEL, type FlagReason } from "./reviews-types"

import styles from "./spam-abuse-flag.module.css"

export interface SpamAbuseFlagSubmission {
  reason: FlagReason
  note: string
}

export interface SpamAbuseFlagProps {
  reviewId: string
  onSubmit?: (submission: SpamAbuseFlagSubmission) => void
  title?: string
  label?: string
  className?: string
}

const REASONS: ReadonlyArray<FlagReason> = ["spam", "off-topic", "hate", "personal-info"]

export function SpamAbuseFlag({
  reviewId,
  onSubmit,
  title = "Report this review",
  label = "Why is this review a problem?",
  className,
}: SpamAbuseFlagProps) {
  const [reason, setReason] = useState<FlagReason | null>(null)
  const [note, setNote] = useState<string>("")
  const [sent, setSent] = useState<boolean>(false)
  const noteId = useId()
  const classes = [styles.card, className].filter(Boolean).join(" ")

  const disabled = reason === null

  const handleSubmit = () => {
    if (!reason) return
    onSubmit?.({ reason, note: note.trim() })
    setSent(true)
  }

  if (sent) {
    return (
      <section className={classes} aria-label="Report submitted">
        <div className={styles.confirmation} role="status" aria-live="polite">
          <p className={styles.confirmationTitle}>Thanks — we’ll review this report</p>
          <p className={styles.confirmationBody}>
            Report ID OAK-RPT-{reviewId.slice(-4).toUpperCase()}. A moderator looks at every report within 24 hours.
          </p>
        </div>
      </section>
    )
  }

  return (
    <section className={classes} aria-label={title}>
      <span className={styles.label}>{label}</span>
      <p className={styles.title}>{title}</p>
      <div className={styles.chips} role="radiogroup" aria-label={label}>
        {REASONS.map((id) => (
          <Chip
            key={id}
            label={FLAG_REASON_LABEL[id]}
            tone={reason === id ? "red" : "neutral"}
            selected={reason === id}
            onSelect={() => setReason(id)}
          />
        ))}
      </div>
      <label className={styles.label} htmlFor={noteId}>
        Optional context
      </label>
      <textarea
        id={noteId}
        className={styles.note}
        value={note}
        onChange={(event) => setNote(event.target.value)}
        placeholder="Help our moderators by adding context (optional)."
        maxLength={400}
      />
      <div className={styles.actions}>
        <span className={styles.helper}>Reports stay confidential · {note.length}/400</span>
        <button
          type="button"
          className={styles.submit}
          disabled={disabled}
          onClick={handleSubmit}
        >
          Send report
        </button>
      </div>
    </section>
  )
}

export default SpamAbuseFlag
