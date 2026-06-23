"use client"

import { useState } from "react"

import styles from "./next-action-card.module.css"

export type NextActionUrgency = "low" | "soon" | "now" | "overdue"

export type SnoozeChoice = "1h" | "1d" | "1w"

interface NextActionCardProps {
  id: string
  headline: string
  rationale: string
  urgency: NextActionUrgency
  primaryActionLabel: string
  onPrimary?: () => void
  onSnooze?: (choice: SnoozeChoice) => void
  className?: string
}

const URGENCY_LABEL: Record<NextActionUrgency, string> = {
  low: "Low priority",
  soon: "Soon",
  now: "Now",
  overdue: "Overdue",
}

const SNOOZE_LABEL: Record<SnoozeChoice, string> = {
  "1h": "Snooze 1h",
  "1d": "Snooze 1d",
  "1w": "Snooze 1w",
}

export function NextActionCard({
  id,
  headline,
  rationale,
  urgency,
  primaryActionLabel,
  onPrimary,
  onSnooze,
  className,
}: NextActionCardProps) {
  const [snoozeOpen, setSnoozeOpen] = useState(false)
  const classes = [styles.card, className].filter(Boolean).join(" ")

  const handleSnooze = (choice: SnoozeChoice) => {
    setSnoozeOpen(false)
    onSnooze?.(choice)
  }

  return (
    <article
      className={classes}
      data-urgency={urgency}
      data-action-id={id}
      aria-label={`Next action: ${headline}`}
    >
      <header className={styles.head}>
        <span className={styles.kicker}>Next action</span>
        <span className={styles.urgency} data-urgency={urgency}>
          {URGENCY_LABEL[urgency]}
        </span>
      </header>

      <h4 className={styles.headline}>{headline}</h4>
      <p className={styles.rationale}>{rationale}</p>

      <footer className={styles.footer}>
        <button
          type="button"
          className={styles.primary}
          onClick={() => onPrimary?.()}
        >
          {primaryActionLabel}
        </button>
        <div className={styles.snoozeGroup}>
          <button
            type="button"
            className={styles.snoozeToggle}
            aria-haspopup="true"
            aria-expanded={snoozeOpen}
            onClick={() => setSnoozeOpen((prev) => !prev)}
          >
            Snooze
          </button>
          {snoozeOpen ? (
            <ul className={styles.snoozeList} role="menu">
              {(Object.keys(SNOOZE_LABEL) as SnoozeChoice[]).map((choice) => (
                <li key={choice}>
                  <button
                    type="button"
                    role="menuitem"
                    className={styles.snoozeItem}
                    onClick={() => handleSnooze(choice)}
                  >
                    {SNOOZE_LABEL[choice]}
                  </button>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </footer>
    </article>
  )
}

export default NextActionCard
