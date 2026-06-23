"use client"

import { useState } from "react"

import { Chip } from "../primitives/chip"

import type { SpamSeverity, SpamWarning } from "./email-builder-types"
import styles from "./spam-score-check.module.css"

interface SpamScoreCheckProps {
  /** Computed score 0-10 — 0 = pristine, 10 = blacklisted. */
  score: number
  /** Subject line being analysed. */
  subject: string
  /** Body sample being analysed. */
  bodyExcerpt: string
  /** Detected warnings list. */
  warnings: ReadonlyArray<SpamWarning>
  className?: string
}

const SEVERITY_TONE: Record<SpamSeverity, "red" | "amber" | "green"> = {
  low: "green",
  medium: "amber",
  high: "red",
}

function scoreLabel(score: number): {
  text: string
  tone: "green" | "amber" | "red"
} {
  if (score <= 3) return { text: "Pristine", tone: "green" }
  if (score <= 6) return { text: "Caution", tone: "amber" }
  return { text: "High risk", tone: "red" }
}

export function SpamScoreCheck({
  score,
  subject,
  bodyExcerpt,
  warnings,
  className,
}: SpamScoreCheckProps) {
  const [ignored, setIgnored] = useState<ReadonlySet<string>>(new Set())

  const clamped = Math.max(0, Math.min(10, score))
  const summary = scoreLabel(clamped)
  const classes = [styles.card, className].filter(Boolean).join(" ")

  const toggleIgnore = (id: string) => {
    setIgnored((current) => {
      const next = new Set(current)
      if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
      }
      return next
    })
  }

  const visibleWarnings = warnings.filter((w) => !ignored.has(w.id))
  const hasHigh = visibleWarnings.some((w) => w.severity === "high")

  return (
    <section className={classes} aria-label="Spam score check">
      <header className={styles.head}>
        <span className={styles.kicker}>Spam check</span>
        <div className={styles.scoreRow}>
          <h3 className={styles.title}>Inbox deliverability</h3>
          <div className={styles.score} data-tone={summary.tone} aria-label={`Spam score ${clamped} of 10`}>
            <span className={styles.scoreValue}>{clamped.toFixed(1)}</span>
            <span className={styles.scoreSlash}>/10</span>
          </div>
        </div>
        <Chip label={summary.text} tone={summary.tone} selected />
      </header>

      <div className={styles.analysed}>
        <div className={styles.analysedRow}>
          <span className={styles.analysedLabel}>Subject</span>
          <span className={styles.analysedValue}>{subject}</span>
        </div>
        <div className={styles.analysedRow}>
          <span className={styles.analysedLabel}>Body excerpt</span>
          <span className={styles.analysedValue}>{bodyExcerpt}</span>
        </div>
      </div>

      {hasHigh ? (
        <div className={styles.alert} role="alert">
          High-severity warnings detected — fix before sending.
        </div>
      ) : null}

      <ul className={styles.warningList}>
        {warnings.map((warning) => {
          const isIgnored = ignored.has(warning.id)
          return (
            <li
              key={warning.id}
              className={[
                styles.warning,
                isIgnored ? styles.warningIgnored : "",
              ]
                .filter(Boolean)
                .join(" ")}
            >
              <Chip
                label={warning.severity}
                tone={SEVERITY_TONE[warning.severity]}
                selected
              />
              <span className={styles.warningMessage}>{warning.message}</span>
              <button
                type="button"
                className={styles.ignoreBtn}
                onClick={() => toggleIgnore(warning.id)}
              >
                {isIgnored ? "Restore" : "Ignore"}
              </button>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
