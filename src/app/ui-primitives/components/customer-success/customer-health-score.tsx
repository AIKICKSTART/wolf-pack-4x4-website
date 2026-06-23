import type { CSSProperties } from "react"

import { AccountHealthMeter } from "../crm"
import { Chip } from "../primitives/chip"
import {
  HEALTH_BUCKET_LABEL,
  HEALTH_BUCKET_TONE,
  HEALTH_FACTOR_LABEL,
  bucketForScore,
  type CsTone,
  type HealthFactorKey,
} from "./cs-types"
import styles from "./customer-health-score.module.css"

export interface HealthFactor {
  key: HealthFactorKey
  score: number
}

interface CustomerHealthScoreProps {
  customerName: string
  score: number
  factors: ReadonlyArray<HealthFactor>
  /** Optional trend versus previous period — used as small caption. */
  trendDelta?: number
  className?: string
}

const CHIP_TONE: Record<CsTone, "neutral" | "red" | "amber" | "teal" | "green"> = {
  neutral: "neutral",
  red: "red",
  amber: "amber",
  teal: "teal",
  green: "green",
}

function factorToChipTone(score: number): CsTone {
  if (score < 40) return "red"
  if (score < 70) return "amber"
  if (score < 90) return "teal"
  return "green"
}

const METER_FACTOR_LABEL: Record<HealthFactorKey, "Recency" | "Frequency" | "Monetary" | "Engagement"> = {
  engagement: "Engagement",
  adoption: "Frequency",
  sentiment: "Recency",
  support: "Monetary",
  value: "Monetary",
}

export function CustomerHealthScore({
  customerName,
  score,
  factors,
  trendDelta,
  className,
}: CustomerHealthScoreProps) {
  const safeScore = Math.max(0, Math.min(100, Math.round(score)))
  const bucket = bucketForScore(safeScore)
  const tone = HEALTH_BUCKET_TONE[bucket]
  const classes = [styles.wrapper, className].filter(Boolean).join(" ")

  // Adapt CS factors → AccountHealthMeter factor shape (no overlap in label set).
  const meterFactors = factors.slice(0, 4).map((f) => ({
    label: METER_FACTOR_LABEL[f.key],
    score: f.score,
  }))

  const trendCaption =
    typeof trendDelta === "number"
      ? trendDelta > 0
        ? `+${trendDelta} vs. last quarter`
        : trendDelta < 0
        ? `${trendDelta} vs. last quarter`
        : "Flat vs. last quarter"
      : null

  return (
    <section
      className={classes}
      role="region"
      aria-label={`Customer health score for ${customerName}: ${safeScore} out of 100, ${HEALTH_BUCKET_LABEL[bucket]}`}
      style={{ "--cs-tone": `var(--primitive-${tone === "neutral" ? "muted" : tone})` } as CSSProperties}
    >
      <header className={styles.head}>
        <span className={styles.kicker}>Health · {HEALTH_BUCKET_LABEL[bucket]}</span>
        <h3 className={styles.name}>{customerName}</h3>
        {trendCaption ? <span className={styles.trend}>{trendCaption}</span> : null}
      </header>

      <AccountHealthMeter score={safeScore} factors={meterFactors} className={styles.meter} />

      <ul className={styles.factors} aria-label="Health factor breakdown">
        {factors.map((factor) => {
          const factorTone = factorToChipTone(factor.score)
          return (
            <li key={factor.key} className={styles.factorItem}>
              <Chip
                label={`${HEALTH_FACTOR_LABEL[factor.key]} · ${factor.score}`}
                tone={CHIP_TONE[factorTone]}
              />
            </li>
          )
        })}
      </ul>
    </section>
  )
}

export default CustomerHealthScore
