"use client"

import type { CSSProperties } from "react"

import { ProgressLinear } from "../primitives/progress-linear"
import { Chip } from "../primitives/chip"
import {
  CHURN_BUCKET_LABEL,
  CHURN_BUCKET_TONE,
  bucketForChurnProbability,
  type CsTone,
} from "./cs-types"
import styles from "./churn-risk-card.module.css"

export interface ChurnRiskFactor {
  /** Short label e.g. "Drop in booking frequency" */
  label: string
  /** Optional weight 0..1 — higher means stronger signal. */
  weight?: number
}

interface ChurnRiskCardProps {
  customerName: string
  /** Probability 0..100 that customer will churn within window. */
  probability: number
  /** Window description, e.g. "next 90 days". */
  window?: string
  factors: ReadonlyArray<ChurnRiskFactor>
  /** Suggested intervention copy. */
  intervention: string
  /** Intervention CTA label. */
  ctaLabel?: string
  onCtaClick?: () => void
  className?: string
}

const TONE_PROGRESS: Record<CsTone, "red" | "amber" | "teal" | "green"> = {
  neutral: "teal",
  red: "red",
  amber: "amber",
  teal: "teal",
  green: "green",
}

const TONE_CHIP: Record<CsTone, "neutral" | "red" | "amber" | "teal" | "green"> = {
  neutral: "neutral",
  red: "red",
  amber: "amber",
  teal: "teal",
  green: "green",
}

export function ChurnRiskCard({
  customerName,
  probability,
  window = "next 90 days",
  factors,
  intervention,
  ctaLabel = "Open intervention",
  onCtaClick,
  className,
}: ChurnRiskCardProps) {
  const safeProbability = Math.max(0, Math.min(100, Math.round(probability)))
  const bucket = bucketForChurnProbability(safeProbability)
  const tone = CHURN_BUCKET_TONE[bucket]
  const classes = [styles.wrapper, className].filter(Boolean).join(" ")

  return (
    <section
      className={classes}
      data-tone={tone}
      style={{ "--cs-tone": `var(--primitive-${tone === "neutral" ? "muted" : tone})` } as CSSProperties}
      role="region"
      aria-label={`Churn risk for ${customerName}: ${safeProbability}% in ${window}, ${CHURN_BUCKET_LABEL[bucket]}`}
    >
      <header className={styles.head}>
        <div>
          <span className={styles.kicker}>Churn risk · {window}</span>
          <h3 className={styles.name}>{customerName}</h3>
        </div>
        <Chip label={CHURN_BUCKET_LABEL[bucket]} tone={TONE_CHIP[tone]} />
      </header>

      <div className={styles.scoreRow}>
        <span className={styles.scoreValue}>{safeProbability}</span>
        <span className={styles.scoreUnit}>% chance of churn</span>
      </div>
      <ProgressLinear
        value={safeProbability}
        max={100}
        tone={TONE_PROGRESS[tone]}
        label={`${safeProbability}% probability churn`}
      />

      {factors.length > 0 ? (
        <div className={styles.factorsBlock}>
          <span className={styles.label}>Top risk factors</span>
          <ul className={styles.factorList} aria-label="Risk factors">
            {factors.map((factor) => (
              <li key={factor.label} className={styles.factorItem}>
                <Chip label={factor.label} tone={TONE_CHIP[tone]} />
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      <div className={styles.intervention}>
        <span className={styles.label}>Suggested intervention</span>
        <p className={styles.interventionBody}>{intervention}</p>
        <button type="button" className={styles.cta} onClick={onCtaClick}>
          {ctaLabel}
          <span aria-hidden="true">→</span>
        </button>
      </div>
    </section>
  )
}

export default ChurnRiskCard
