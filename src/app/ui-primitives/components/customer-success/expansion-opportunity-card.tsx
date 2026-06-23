"use client"

import { Chip } from "../primitives/chip"
import {
  NEXT_BEST_ACTION_LABEL,
  formatAud,
  type NextBestAction,
} from "./cs-types"
import styles from "./expansion-opportunity-card.module.css"

export type ConfidenceLevel = "high" | "medium" | "low"

interface ExpansionOpportunityCardProps {
  customerName: string
  /** Predicted next-best-action key. */
  action: NextBestAction
  /** Expected uplift in AUD across the forecast window. */
  upliftAud: number
  /** Forecast window, e.g. "next 6 months". */
  window?: string
  /** Confidence on the recommendation. */
  confidence: ConfidenceLevel
  /** Optional rationale text. */
  rationale?: string
  /** Primary CTA label. */
  ctaLabel?: string
  onCtaClick?: () => void
  className?: string
}

const CONFIDENCE_TONE: Record<
  ConfidenceLevel,
  "neutral" | "red" | "amber" | "teal" | "green"
> = {
  high: "green",
  medium: "amber",
  low: "neutral",
}

const CONFIDENCE_LABEL: Record<ConfidenceLevel, string> = {
  high: "High confidence",
  medium: "Medium confidence",
  low: "Low confidence",
}

const ACTION_GLYPH: Record<NextBestAction, string> = {
  "upgrade-package": "▲",
  "fleet-expansion": "⛟",
  "service-bundle": "◈",
  "extended-warranty": "✓",
  "tyre-program": "◯",
  "dyno-bundle": "▰",
}

export function ExpansionOpportunityCard({
  customerName,
  action,
  upliftAud,
  window = "next 6 months",
  confidence,
  rationale,
  ctaLabel = "Open playbook",
  onCtaClick,
  className,
}: ExpansionOpportunityCardProps) {
  const classes = [styles.wrapper, className].filter(Boolean).join(" ")
  return (
    <section
      className={classes}
      role="region"
      aria-label={`Expansion opportunity for ${customerName}: ${NEXT_BEST_ACTION_LABEL[action]}, expected uplift ${formatAud(upliftAud)}`}
    >
      <header className={styles.head}>
        <div className={styles.glyph} aria-hidden="true">
          {ACTION_GLYPH[action]}
        </div>
        <div className={styles.headText}>
          <span className={styles.kicker}>Expansion · {window}</span>
          <h3 className={styles.name}>{customerName}</h3>
        </div>
        <Chip label={CONFIDENCE_LABEL[confidence]} tone={CONFIDENCE_TONE[confidence]} />
      </header>

      <div className={styles.actionBlock}>
        <span className={styles.label}>Next best action</span>
        <p className={styles.actionTitle}>{NEXT_BEST_ACTION_LABEL[action]}</p>
      </div>

      <div className={styles.upliftBlock}>
        <span className={styles.label}>Expected uplift</span>
        <p className={styles.upliftValue}>
          <span className={styles.upliftSign}>+</span>
          {formatAud(upliftAud)}
        </p>
      </div>

      {rationale ? <p className={styles.rationale}>{rationale}</p> : null}

      <button type="button" className={styles.cta} onClick={onCtaClick}>
        {ctaLabel}
        <span aria-hidden="true">→</span>
      </button>
    </section>
  )
}

export default ExpansionOpportunityCard
