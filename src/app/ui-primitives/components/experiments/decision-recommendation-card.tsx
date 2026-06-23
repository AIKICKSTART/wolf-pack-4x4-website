import { DashboardCard } from "../data-display/dashboard-card"
import { Chip, type ChipTone } from "../primitives/chip"

import {
  DECISION_LABEL,
  DECISION_TONE,
  type DecisionRecommendation,
  type ExperimentTone,
} from "./experiments-types"

import styles from "./decision-recommendation-card.module.css"

export interface DecisionRecommendationCardProps {
  recommendation: DecisionRecommendation
  /** Variant name when shipping. */
  variantName?: string
  /** One-line reasoning. */
  reasoning: string
  /** Expected business impact, e.g. "+$4.2k/wk ARPV". */
  expectedImpact?: string
  /** Confidence 0..1. */
  confidence: number
  className?: string
}

const TONE_TO_CHIP: Record<ExperimentTone, ChipTone> = {
  neutral: "neutral",
  red: "red",
  amber: "amber",
  teal: "teal",
  green: "green",
}

function confidenceTone(c: number): ChipTone {
  if (c >= 0.9) return "green"
  if (c >= 0.7) return "teal"
  if (c >= 0.5) return "amber"
  return "red"
}

export function DecisionRecommendationCard({
  recommendation,
  variantName,
  reasoning,
  expectedImpact,
  confidence,
  className,
}: DecisionRecommendationCardProps) {
  const label =
    recommendation === "ship-variant" && variantName
      ? `Ship ${variantName}`
      : DECISION_LABEL[recommendation]

  const tone = TONE_TO_CHIP[DECISION_TONE[recommendation]]
  const classes = [styles.card, className].filter(Boolean).join(" ")

  return (
    <section
      className={classes}
      role="status"
      aria-live="polite"
      aria-label={`Decision recommendation: ${label}`}
    >
      <DashboardCard
        label="Decision recommendation"
        value={label}
        meta={reasoning}
        surface="material"
      />

      <div className={styles.chips}>
        <Chip label={label} tone={tone} selected />
        {expectedImpact ? (
          <Chip label={`Expected · ${expectedImpact}`} tone="teal" />
        ) : null}
        <Chip
          label={`Confidence ${Math.round(confidence * 100)}%`}
          tone={confidenceTone(confidence)}
        />
      </div>
    </section>
  )
}

export default DecisionRecommendationCard
