"use client"

import { useState } from "react"

import type { LeadScoreFactor } from "./crm-types"
import styles from "./lead-score-chip.module.css"

export interface LeadScoreBreakdown {
  factor: LeadScoreFactor
  score: number
}

interface LeadScoreChipProps {
  score: number
  breakdown?: ReadonlyArray<LeadScoreBreakdown>
  className?: string
}

const FACTOR_LABEL: Record<LeadScoreFactor, string> = {
  engagement: "Engagement",
  fit: "Fit",
  intent: "Intent",
  recency: "Recency",
}

function toneOfScore(score: number): "cold" | "warm" | "hot" | "blazing" {
  if (score < 30) return "cold"
  if (score < 60) return "warm"
  if (score < 85) return "hot"
  return "blazing"
}

export function LeadScoreChip({
  score,
  breakdown,
  className,
}: LeadScoreChipProps) {
  const [open, setOpen] = useState(false)
  const safeScore = Math.max(0, Math.min(100, Math.round(score)))
  const tone = toneOfScore(safeScore)
  const classes = [styles.wrapper, className].filter(Boolean).join(" ")
  const hasBreakdown = breakdown && breakdown.length > 0

  return (
    <span className={classes}>
      <button
        type="button"
        className={styles.chip}
        data-tone={tone}
        aria-expanded={hasBreakdown ? open : undefined}
        aria-label={`Lead score: ${safeScore} out of 100`}
        onClick={() => hasBreakdown && setOpen((prev) => !prev)}
        disabled={!hasBreakdown}
      >
        <span className={styles.label}>Lead</span>
        <span className={styles.value}>{safeScore}</span>
        <span className={styles.scale}>/100</span>
      </button>

      {hasBreakdown && open ? (
        <div className={styles.popover} role="dialog" aria-label="Score breakdown">
          <span className={styles.popoverTitle}>Breakdown</span>
          <ul className={styles.factorList}>
            {breakdown.map((item) => (
              <li key={item.factor} className={styles.factorRow}>
                <span className={styles.factorLabel}>
                  {FACTOR_LABEL[item.factor]}
                </span>
                <span className={styles.factorTrack} aria-hidden="true">
                  <span
                    className={styles.factorFill}
                    style={{ width: `${Math.max(0, Math.min(100, item.score))}%` }}
                  />
                </span>
                <span className={styles.factorScore}>{item.score}</span>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </span>
  )
}

export default LeadScoreChip
