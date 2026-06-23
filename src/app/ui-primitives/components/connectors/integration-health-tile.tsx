import { Sparkline, type SparklineTone } from "../charts/sparkline"

import {
  CONNECTOR_STATUS_LABEL,
  CONNECTOR_STATUS_TONE,
  type ConnectorStatus,
} from "./connectors-types"
import type { StatusTone } from "../status-page/status-types"
import styles from "./integration-health-tile.module.css"

export interface IntegrationHealthTileProps {
  provider: string
  /** Provider-supplied monogram or short tag for the corner mark. */
  monogram: string
  status: ConnectorStatus
  /** Human last-sync delta, e.g. "2m ago". */
  lastSync: string
  /** 0..1 error rate, e.g. 0.0023 for 0.23%. */
  errorRate: number
  /** Recent error-rate samples for the sparkline. */
  errorRateSeries: ReadonlyArray<number>
  /** Optional throughput chip text, e.g. "12.4 req/s". */
  throughput?: string
  className?: string
}

const TONE_CLASS: Record<StatusTone, string> = {
  red: styles.toneRed,
  amber: styles.toneAmber,
  teal: styles.toneTeal,
  green: styles.toneGreen,
  neutral: styles.toneNeutral,
  violet: styles.toneViolet,
}

const SPARK_TONE_FOR_STATUS: Record<ConnectorStatus, SparklineTone> = {
  connected: "green",
  warning: "amber",
  error: "red",
  disconnected: "amber",
  pending: "teal",
  syncing: "teal",
}

function formatErrorRate(rate: number): string {
  if (rate === 0) return "0%"
  if (rate < 0.0001) return "<0.01%"
  if (rate < 0.01) return `${(rate * 100).toFixed(2)}%`
  return `${(rate * 100).toFixed(1)}%`
}

export function IntegrationHealthTile({
  provider,
  monogram,
  status,
  lastSync,
  errorRate,
  errorRateSeries,
  throughput,
  className,
}: IntegrationHealthTileProps) {
  const tone = CONNECTOR_STATUS_TONE[status]
  const classes = [styles.tile, TONE_CLASS[tone], className].filter(Boolean).join(" ")

  return (
    <article
      className={classes}
      role="region"
      aria-label={`${provider} integration health — ${CONNECTOR_STATUS_LABEL[status]}, ${formatErrorRate(errorRate)} error rate`}
    >
      <header className={styles.head}>
        <div className={styles.mono} aria-hidden="true">
          <span>{monogram}</span>
        </div>
        <div className={styles.identity}>
          <span className={styles.kicker}>Integration</span>
          <h3 className={styles.provider}>{provider}</h3>
        </div>
        <span className={[styles.chip, TONE_CLASS[tone]].join(" ")}>
          <span className={styles.chipDot} aria-hidden="true" />
          {CONNECTOR_STATUS_LABEL[status]}
        </span>
      </header>

      <dl className={styles.stats}>
        <div className={styles.stat}>
          <dt className={styles.statLabel}>Last sync</dt>
          <dd className={styles.statValue}>{lastSync}</dd>
        </div>
        <div className={styles.stat}>
          <dt className={styles.statLabel}>Error rate</dt>
          <dd className={[styles.statValue, styles.statValueAccent].join(" ")}>
            {formatErrorRate(errorRate)}
          </dd>
        </div>
        {throughput ? (
          <div className={styles.stat}>
            <dt className={styles.statLabel}>Throughput</dt>
            <dd className={styles.statValue}>{throughput}</dd>
          </div>
        ) : null}
      </dl>

      <div className={styles.spark}>
        <Sparkline
          points={errorRateSeries.length > 0 ? [...errorRateSeries] : [0, 0]}
          tone={SPARK_TONE_FOR_STATUS[status]}
          area
          width={220}
          height={48}
          ariaLabel={`${provider} error-rate trend over the last ${errorRateSeries.length} samples`}
        />
      </div>
    </article>
  )
}

export default IntegrationHealthTile
