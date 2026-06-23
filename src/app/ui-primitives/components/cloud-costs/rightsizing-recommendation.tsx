"use client"

import { Chip } from "../primitives/chip"
import { ProgressLinear } from "../primitives/progress-linear"
import { StatTile } from "../primitives/stat-tile"

import {
  formatAud,
  formatAudCompact,
  formatPctSigned,
  regionLabel,
  serviceTone,
  type AwsRegion,
  type AwsService,
} from "./cloud-costs-types"
import styles from "./rightsizing-recommendation.module.css"

export interface RightsizingRecommendationProps {
  /** Resource identifier. */
  id: string
  /** AWS service. */
  service: AwsService
  /** Resource name (e.g. "muffler-pulse-api-prod"). */
  resourceName: string
  /** Region the resource runs in. */
  region: AwsRegion
  /** Current SKU label e.g. "m5.2xlarge". */
  currentSku: string
  /** Suggested SKU label e.g. "m6i.large". */
  suggestedSku: string
  /** Current monthly spend in AUD. */
  currentMonthlyAud: number
  /** Suggested monthly spend in AUD. */
  suggestedMonthlyAud: number
  /** Average CPU utilisation observed (0-100). */
  avgCpuPct: number
  /** Average memory utilisation observed (0-100). */
  avgMemoryPct: number
  /** Optional apply action. */
  onApply?: () => void
  /** Optional dismiss action. */
  onDismiss?: () => void
  className?: string
}

export function RightsizingRecommendation({
  id,
  service,
  resourceName,
  region,
  currentSku,
  suggestedSku,
  currentMonthlyAud,
  suggestedMonthlyAud,
  avgCpuPct,
  avgMemoryPct,
  onApply,
  onDismiss,
  className,
}: RightsizingRecommendationProps) {
  const savingsAud = Math.max(0, currentMonthlyAud - suggestedMonthlyAud)
  const savingsPct =
    currentMonthlyAud > 0 ? (savingsAud / currentMonthlyAud) * 100 : 0
  const annualSavings = savingsAud * 12

  return (
    <article
      className={[styles.card, className].filter(Boolean).join(" ")}
      role="region"
      aria-labelledby={`rs-${id}-title`}
    >
      <header className={styles.head}>
        <div className={styles.headLeft}>
          <span className={styles.kicker}>Rightsizing recommendation</span>
          <h3 id={`rs-${id}-title`} className={styles.title}>
            {resourceName}
          </h3>
          <span className={styles.meta}>
            {regionLabel(region)}
          </span>
        </div>
        <div className={styles.headRight}>
          <Chip label={service} tone={serviceTone(service)} />
          <Chip label={`Save ${formatPctSigned(-savingsPct)}`} tone="green" />
        </div>
      </header>

      <div className={styles.skuRow}>
        <div className={`${styles.skuCell} ${styles.skuCurrent}`}>
          <span className={styles.skuKicker}>Current</span>
          <span className={styles.skuName}>{currentSku}</span>
          <span className={styles.skuSpend}>{formatAud(currentMonthlyAud)} / mo</span>
        </div>
        <span className={styles.arrow} aria-hidden="true">
          →
        </span>
        <div className={`${styles.skuCell} ${styles.skuSuggested}`}>
          <span className={styles.skuKicker}>Suggested</span>
          <span className={styles.skuName}>{suggestedSku}</span>
          <span className={styles.skuSpend}>{formatAud(suggestedMonthlyAud)} / mo</span>
        </div>
      </div>

      <div className={styles.utilGrid}>
        <div className={styles.util}>
          <div className={styles.utilHead}>
            <span className={styles.utilLabel}>CPU avg</span>
            <span className={styles.utilValue}>{avgCpuPct.toFixed(0)}%</span>
          </div>
          <ProgressLinear
            value={avgCpuPct}
            max={100}
            tone={avgCpuPct < 30 ? "amber" : avgCpuPct < 80 ? "teal" : "red"}
            variant="striped"
          />
        </div>
        <div className={styles.util}>
          <div className={styles.utilHead}>
            <span className={styles.utilLabel}>Memory avg</span>
            <span className={styles.utilValue}>{avgMemoryPct.toFixed(0)}%</span>
          </div>
          <ProgressLinear
            value={avgMemoryPct}
            max={100}
            tone={avgMemoryPct < 30 ? "amber" : avgMemoryPct < 80 ? "teal" : "red"}
            variant="striped"
          />
        </div>
      </div>

      <div className={styles.savingsRow}>
        <StatTile
          label="Monthly saving"
          value={formatAudCompact(savingsAud)}
          caption={formatAud(savingsAud)}
          tone="green"
        />
        <StatTile
          label="Annualised"
          value={formatAudCompact(annualSavings)}
          caption={formatAud(annualSavings)}
          tone="green"
        />
      </div>

      {onApply || onDismiss ? (
        <footer className={styles.actions}>
          {onApply ? (
            <button type="button" className={styles.actionPrimary} onClick={onApply}>
              Apply rightsizing
            </button>
          ) : null}
          {onDismiss ? (
            <button type="button" className={styles.actionGhost} onClick={onDismiss}>
              Dismiss
            </button>
          ) : null}
        </footer>
      ) : null}
    </article>
  )
}

export default RightsizingRecommendation
