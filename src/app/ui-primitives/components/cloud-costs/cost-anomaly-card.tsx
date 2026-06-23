"use client"

import { Chip } from "../primitives/chip"
import { Sparkline } from "../charts/sparkline"
import { Reveal } from "../motion/reveal"

import {
  formatAud,
  formatAudCompact,
  formatPctSigned,
  regionLabel,
  serviceTone,
  severityTone,
  type AwsRegion,
  type AwsService,
  type CostSeverity,
} from "./cloud-costs-types"
import styles from "./cost-anomaly-card.module.css"

export interface CostAnomalyCardProps {
  /** Anomaly identifier (for telemetry / aria). */
  id: string
  /** AWS service that spiked. */
  service: AwsService
  /** AWS region where the spike was detected. */
  region: AwsRegion
  /** Detection timestamp (ISO). */
  detectedAtISO: string
  /** Baseline daily spend in AUD. */
  baselineDailyAud: number
  /** Actual daily spend on the spike day in AUD. */
  spikeDailyAud: number
  /** Trailing daily spend values for the sparkline (last point = spike). */
  trend: ReadonlyArray<number>
  /** Severity tier. */
  severity: CostSeverity
  /** Recommended action sentence. */
  recommendation: string
  /** Optional explore CTA. */
  onInvestigate?: () => void
  /** Optional acknowledge CTA. */
  onAcknowledge?: () => void
  className?: string
}

function formatTime(iso: string): string {
  const d = new Date(iso)
  return new Intl.DateTimeFormat("en-AU", {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(d)
}

export function CostAnomalyCard({
  id,
  service,
  region,
  detectedAtISO,
  baselineDailyAud,
  spikeDailyAud,
  trend,
  severity,
  recommendation,
  onInvestigate,
  onAcknowledge,
  className,
}: CostAnomalyCardProps) {
  const deltaPct =
    baselineDailyAud > 0
      ? ((spikeDailyAud - baselineDailyAud) / baselineDailyAud) * 100
      : 0
  const sevTone = severityTone(severity)
  const sevLabel = severity === "critical" ? "Critical" : severity === "warning" ? "Warning" : "Info"
  const sparkTone = sevTone === "neutral" ? "amber" : sevTone

  return (
    <Reveal
      as="article"
      className={[styles.card, styles[`tone-${sevTone}`], className].filter(Boolean).join(" ")}
    >
      <div
        className={styles.inner}
        role="alert"
        aria-labelledby={`anomaly-${id}-title`}
      >
        <header className={styles.head}>
          <div className={styles.headLeft}>
            <span className={styles.kicker}>Anomaly detected</span>
            <h3 id={`anomaly-${id}-title`} className={styles.title}>
              {service} spend spike
            </h3>
            <span className={styles.meta}>
              {regionLabel(region)} · {formatTime(detectedAtISO)}
            </span>
          </div>
          <div className={styles.headRight}>
            <Chip label={sevLabel} tone={sevTone} />
            <Chip label={service} tone={serviceTone(service)} />
          </div>
        </header>

        <div className={styles.metrics}>
          <div className={styles.metric}>
            <span className={styles.metricLabel}>Baseline / day</span>
            <span className={styles.metricValue}>{formatAud(baselineDailyAud)}</span>
          </div>
          <div className={styles.metric}>
            <span className={styles.metricLabel}>Spike / day</span>
            <span className={styles.metricValueStrong}>{formatAud(spikeDailyAud)}</span>
          </div>
          <div className={styles.metric}>
            <span className={styles.metricLabel}>Delta</span>
            <span className={styles.metricDelta}>
              {formatPctSigned(deltaPct)} · {formatAudCompact(spikeDailyAud - baselineDailyAud)}
            </span>
          </div>
        </div>

        <div className={styles.spark}>
          <Sparkline
            points={[...trend]}
            tone={sparkTone}
            ariaLabel={`Trend for ${service}`}
            area
          />
        </div>

        <p className={styles.recommendation}>{recommendation}</p>

        {onInvestigate || onAcknowledge ? (
          <footer className={styles.actions}>
            {onInvestigate ? (
              <button type="button" className={styles.actionPrimary} onClick={onInvestigate}>
                Investigate
              </button>
            ) : null}
            {onAcknowledge ? (
              <button type="button" className={styles.actionGhost} onClick={onAcknowledge}>
                Acknowledge
              </button>
            ) : null}
          </footer>
        ) : null}
      </div>
    </Reveal>
  )
}

export default CostAnomalyCard
