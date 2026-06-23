import { Users } from "lucide-react"

import { Sparkline } from "../charts/sparkline"
import { Chip } from "../primitives/chip"

import styles from "./win-back-campaign-card.module.css"

interface WinBackCampaignCardProps {
  /** Campaign name. */
  name: string
  /** Cohort short description, e.g. "Lapsed > 365 days". */
  cohortLabel: string
  /** Cohort total. */
  cohortSize: number
  /** Last 8-week recover trend. */
  recoverTrend: ReadonlyArray<number>
  /** Predicted recovers this run. */
  predictedRecovers: number
  /** Projected revenue AUD. */
  projectedRevenue: number
  /** Reactivation rate baseline. */
  baselineReactivationRate: number
  /** Incentive headline. */
  incentiveHeadline: string
  /** Incentive footnote (eligibility). */
  incentiveFootnote: string
  /** Optional description. */
  description?: string
  className?: string
}

function formatAud(value: number): string {
  return new Intl.NumberFormat("en-AU", {
    style: "currency",
    currency: "AUD",
    maximumFractionDigits: 0,
  }).format(value)
}

function formatNumber(value: number): string {
  return value.toLocaleString("en-AU")
}

export function WinBackCampaignCard({
  name,
  cohortLabel,
  cohortSize,
  recoverTrend,
  predictedRecovers,
  projectedRevenue,
  baselineReactivationRate,
  incentiveHeadline,
  incentiveFootnote,
  description,
  className,
}: WinBackCampaignCardProps) {
  const classes = [styles.card, className].filter(Boolean).join(" ")
  return (
    <article className={classes} aria-label={`Win-back campaign · ${name}`}>
      <header className={styles.head}>
        <div>
          <span className={styles.kicker}>
            <Users size={13} strokeWidth={2.4} aria-hidden="true" />
            Win-back · cohort
          </span>
          <h3 className={styles.title}>{name}</h3>
          {description ? (
            <p className={styles.subline}>{description}</p>
          ) : null}
        </div>
        <div className={styles.cohort}>
          <span className={styles.cohortLabel}>{cohortLabel}</span>
          <span className={styles.cohortValue}>{formatNumber(cohortSize)}</span>
          <Chip label="Suppress active" tone="neutral" />
        </div>
      </header>

      <div className={styles.grid}>
        <div className={styles.stat}>
          <span className={styles.statLabel}>Predicted recovers</span>
          <span className={styles.statValue}>
            {formatNumber(predictedRecovers)}
          </span>
          <Sparkline
            points={[...recoverTrend]}
            tone="teal"
            ariaLabel={`Predicted recover trend for ${name}, 8 weeks`}
            height={32}
            width={120}
          />
        </div>
        <div className={styles.stat}>
          <span className={styles.statLabel}>Projected revenue</span>
          <span className={styles.statValue}>
            {formatAud(projectedRevenue)}
          </span>
          <Chip label="+14% vs last run" tone="green" />
        </div>
        <div className={styles.stat}>
          <span className={styles.statLabel}>Baseline reactivation</span>
          <span className={styles.statValue}>
            {baselineReactivationRate.toFixed(1)}%
          </span>
          <Chip label="365d window" tone="amber" />
        </div>
      </div>

      <div className={styles.incentive}>
        <span className={styles.incentiveLabel}>Incentive</span>
        <span className={styles.incentiveBody}>{incentiveHeadline}</span>
        <span className={styles.incentiveFootnote}>{incentiveFootnote}</span>
      </div>
    </article>
  )
}

export default WinBackCampaignCard
