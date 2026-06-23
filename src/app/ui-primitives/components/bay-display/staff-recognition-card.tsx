import { Star } from "lucide-react"

import { Avatar } from "../primitives/avatar"
import styles from "./staff-recognition-card.module.css"

export interface StaffRecognitionCardProps {
  /** Period — "Employee of the week". */
  periodLabel?: string
  /** Recipient name — "Sophie Tan". */
  name: string
  /** Role / title — "Lead fitter". */
  role: string
  /** Reason copy — "Saved the McKinnon Patrol tune by spotting a cracked manifold". */
  reason: string
  /** Photo URL — optional; falls back to initials. */
  photoSrc?: string
  /** Service span — "5 years at Oak Flats". */
  tenureLabel?: string
  className?: string
}

export function StaffRecognitionCard({
  periodLabel = "Employee of the week",
  name,
  role,
  reason,
  photoSrc,
  tenureLabel,
  className,
}: StaffRecognitionCardProps) {
  const classes = [styles.card, className].filter(Boolean).join(" ")

  return (
    <article
      className={classes}
      aria-label={`${periodLabel} — ${name}, ${role}`}
    >
      <header className={styles.head}>
        <Star size={16} strokeWidth={2.4} aria-hidden="true" />
        <span>{periodLabel}</span>
      </header>
      <div className={styles.portraitRow}>
        <div className={styles.portrait}>
          <Avatar name={name} src={photoSrc} size="xl" tone="amber" />
          <span className={styles.glow} aria-hidden="true" />
        </div>
        <div className={styles.identity}>
          <strong className={styles.name}>{name}</strong>
          <em className={styles.role}>{role}</em>
          {tenureLabel && (
            <span className={styles.tenure}>{tenureLabel}</span>
          )}
        </div>
      </div>
      <blockquote className={styles.reason}>
        <span className={styles.openMark} aria-hidden="true">
          &ldquo;
        </span>
        {reason}
        <span className={styles.closeMark} aria-hidden="true">
          &rdquo;
        </span>
      </blockquote>
    </article>
  )
}

export default StaffRecognitionCard
