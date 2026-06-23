import { Chip } from "../primitives/chip"
import { MaterialSurface } from "../surfaces/material-surface"

import styles from "./last-job-completed-card.module.css"

export interface LastJobCompletedCardProps {
  /** Vehicle make/model the job was completed on. */
  vehicle: string
  /** Short service label (e.g. "Manta 3-inch catback"). */
  service: string
  /** Suburb the job was delivered to. */
  suburbName: string
  /** How many days ago the job was completed. */
  daysAgo: number
  /** Optional tone for the image placeholder accent. */
  tone?: "red" | "amber" | "teal" | "green"
  /** Optional 1-3 word job-card status label (e.g. "Signed off"). */
  status?: string
  className?: string
}

const TONE_CLASS: Record<NonNullable<LastJobCompletedCardProps["tone"]>, string> = {
  red: styles.toneRed,
  amber: styles.toneAmber,
  teal: styles.toneTeal,
  green: styles.toneGreen,
}

/**
 * Recent-work card — adapter that wraps `surfaces/MaterialSurface`
 * around a stylised exhaust SVG placeholder, days-ago chip, vehicle +
 * suburb metadata, and a status chip rendered with `primitives/Chip`.
 */
export function LastJobCompletedCard({
  vehicle,
  service,
  suburbName,
  daysAgo,
  tone = "amber",
  status = "Signed off",
  className,
}: LastJobCompletedCardProps) {
  const classes = [styles.card, TONE_CLASS[tone], className]
    .filter(Boolean)
    .join(" ")

  const dayLabel =
    daysAgo === 0
      ? "Today"
      : daysAgo === 1
      ? "1 day ago"
      : `${daysAgo} days ago`

  return (
    <MaterialSurface elevation={2} tone="surface" className={classes}>
      <article aria-labelledby="last-job-heading">
        <div className={styles.media} aria-hidden="true">
          <svg viewBox="0 0 240 160" preserveAspectRatio="xMidYMid slice" role="presentation">
            <defs>
              <linearGradient id="ljc-pipe" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="color-mix(in oklab, var(--primitive-text-strong) 80%, var(--primitive-body))" />
                <stop offset="0.5" stopColor="var(--primitive-muted)" />
                <stop offset="1" stopColor="color-mix(in oklab, var(--primitive-canvas) 70%, var(--primitive-muted))" />
              </linearGradient>
            </defs>
            <rect width="240" height="160" fill="color-mix(in oklab, var(--primitive-canvas) 42%, transparent)" />
            <rect x="24" y="84" width="120" height="22" rx="6" fill="url(#ljc-pipe)" />
            <rect x="148" y="74" width="76" height="42" rx="10" fill="url(#ljc-pipe)" />
            <circle cx="152" cy="96" r="3" fill="currentColor" />
            <path
              d="M16 116 L36 116 L52 100 L188 100 L208 116 L228 116"
              fill="none"
              stroke="var(--primitive-line-strong)"
              strokeWidth="1.5"
            />
          </svg>
          <span className={styles.daysChip}>{dayLabel}</span>
        </div>

        <div className={styles.body}>
          <span className={styles.kicker}>Recent work</span>
          <h3 id="last-job-heading" className={styles.heading}>
            {service}
          </h3>
          <p className={styles.meta}>
            <span className={styles.vehicle}>{vehicle}</span>
            <span className={styles.dot} aria-hidden="true">
              ·
            </span>
            <span className={styles.suburb}>{suburbName}</span>
          </p>
          <div className={styles.statusRow}>
            <Chip label={status} tone="green" />
          </div>
        </div>
      </article>
    </MaterialSurface>
  )
}

export default LastJobCompletedCard
