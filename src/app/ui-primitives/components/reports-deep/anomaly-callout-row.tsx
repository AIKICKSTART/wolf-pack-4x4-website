"use client"

import type { AnomalyEvent, AnomalySeverity } from "./reports-deep-types"
import styles from "./anomaly-callout-row.module.css"

interface AnomalyCalloutRowProps {
  readonly event: AnomalyEvent
  readonly onInvestigate?: (id: string) => void
  readonly className?: string
}

const SEVERITY_LABEL: Record<AnomalySeverity, string> = {
  minor: "Minor",
  moderate: "Moderate",
  severe: "Severe",
  critical: "Critical",
}

const SEVERITY_CLASS: Record<AnomalySeverity, string> = {
  minor: styles.sevMinor,
  moderate: styles.sevModerate,
  severe: styles.sevSevere,
  critical: styles.sevCritical,
}

const SEVERITY_GLYPH: Record<AnomalySeverity, string> = {
  minor: "·",
  moderate: "▲",
  severe: "▲▲",
  critical: "■",
}

export function AnomalyCalloutRow({ event, onInvestigate, className }: AnomalyCalloutRowProps) {
  const deviationDisplay = `${event.deviationPct > 0 ? "+" : ""}${event.deviationPct.toFixed(1)}%`
  const tone = event.deviationPct < 0 ? "negative" : "positive"
  const classes = [styles.row, SEVERITY_CLASS[event.severity], className]
    .filter(Boolean)
    .join(" ")

  return (
    <article
      className={classes}
      aria-label={`Anomaly: ${event.metric} ${deviationDisplay}`}
      data-severity={event.severity}
    >
      <div className={styles.severityBadge}>
        <span className={styles.severityGlyph} aria-hidden="true">
          {SEVERITY_GLYPH[event.severity]}
        </span>
        <span className={styles.severityLabel}>{SEVERITY_LABEL[event.severity]}</span>
      </div>

      <div className={styles.identity}>
        <span className={styles.metricLabel}>{event.metric}</span>
        <div className={styles.observation}>
          <span className={styles.observedValue}>{event.observedValue}</span>
          <span className={styles.expected}>
            expected <strong>{event.expectedValue}</strong>
          </span>
          <span className={`${styles.deviation} ${tone === "negative" ? styles.devNegative : styles.devPositive}`}>
            {deviationDisplay}
          </span>
        </div>
        <p className={styles.reason}>{event.reason}</p>
      </div>

      <div className={styles.timestamp}>
        <span className={styles.timeKicker}>Detected</span>
        <span className={styles.timeValue}>{event.detectedAt}</span>
      </div>

      <button
        type="button"
        className={styles.investigate}
        onClick={() => onInvestigate?.(event.id)}
        aria-label={`Investigate anomaly on ${event.metric}`}
      >
        Investigate →
      </button>
    </article>
  )
}

export default AnomalyCalloutRow
