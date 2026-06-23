import {
  DECISION_LABEL,
  type AbDecisionRecommendation,
} from "./ab-runtime-types"

import styles from "./decision-recommendation-card.module.css"

export interface DecisionRecommendationCardProps {
  /** Recommendation bucket. */
  recommendation: AbDecisionRecommendation
  /** Optional treatment name to interpolate (e.g. "Ship Treatment B"). */
  treatmentName?: string
  /** Optional one-line summary used as the subtitle. */
  subtitle?: string
  /** Bulleted rationale points driving the recommendation. */
  rationale: ReadonlyArray<string>
  /** Confidence 0..1 (rendered as a horizontal bar). */
  confidence: number
  /** Optional expected impact label, e.g. "+$4.2k/wk RPV". */
  expectedImpact?: string
  /** Optional decision owner string. */
  owner?: string
  className?: string
}

interface RecVisual {
  glyph: string
  cardClass: string
  glyphClass: string
}

const REC_VISUAL: Record<AbDecisionRecommendation, RecVisual> = {
  "ship-treatment": {
    glyph: "→",
    cardClass: "cardShip",
    glyphClass: "glyphShip",
  },
  iterate: {
    glyph: "↻",
    cardClass: "cardIterate",
    glyphClass: "glyphIterate",
  },
  kill: { glyph: "×", cardClass: "cardKill", glyphClass: "glyphKill" },
  "keep-running": {
    glyph: "·",
    cardClass: "cardKeep",
    glyphClass: "glyphKeep",
  },
}

function clampConfidence(value: number): number {
  if (!Number.isFinite(value)) return 0
  return Math.max(0, Math.min(1, value))
}

export function DecisionRecommendationCard({
  recommendation,
  treatmentName,
  subtitle,
  rationale,
  confidence,
  expectedImpact,
  owner,
  className,
}: DecisionRecommendationCardProps) {
  const visual = REC_VISUAL[recommendation]
  const cardClasses = [
    styles.card,
    styles[visual.cardClass as keyof typeof styles],
    className,
  ]
    .filter(Boolean)
    .join(" ")
  const glyphClasses = [
    styles.glyph,
    styles[visual.glyphClass as keyof typeof styles],
  ].join(" ")

  const headline =
    recommendation === "ship-treatment" && treatmentName
      ? `Ship ${treatmentName}`
      : DECISION_LABEL[recommendation]

  const pct = Math.round(clampConfidence(confidence) * 100)

  return (
    <section
      className={cardClasses}
      role="status"
      aria-live="polite"
      aria-label={`Decision recommendation: ${headline}, confidence ${pct} percent`}
    >
      <header className={styles.head}>
        <span>Recommendation</span>
        <span>{subtitle ?? "Auto-generated"}</span>
      </header>

      <div className={styles.headline}>
        <span className={glyphClasses} aria-hidden="true">
          {visual.glyph}
        </span>
        <div>
          <h2 className={styles.title}>{headline}</h2>
          {subtitle ? (
            <span className={styles.subtitle}>{subtitle}</span>
          ) : null}
        </div>
      </div>

      <span className={styles.rationaleHeading}>Rationale</span>
      <ul className={styles.rationaleList}>
        {rationale.map((point, index) => (
          <li key={`${index}-${point.slice(0, 20)}`}>{point}</li>
        ))}
      </ul>

      <div className={styles.metaRow}>
        <div className={styles.confidenceBar}>
          <div className={styles.confidenceLabel}>
            <span>Confidence</span>
            <span>{pct}%</span>
          </div>
          <div className={styles.confidenceTrack}>
            <div className={styles.confidenceFill} style={{ width: `${pct}%` }} />
          </div>
        </div>
        <div style={{ display: "flex", gap: "var(--primitive-space-3)" }}>
          {expectedImpact ? <span>Impact · {expectedImpact}</span> : null}
          {owner ? <span>Owner · {owner}</span> : null}
        </div>
      </div>
    </section>
  )
}

export default DecisionRecommendationCard
