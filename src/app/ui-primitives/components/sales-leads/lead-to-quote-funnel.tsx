import { CountUp } from "../primitives/count-up"
import { FUNNEL_LABEL, type FunnelStageKey } from "./sales-leads-types"

import styles from "./lead-to-quote-funnel.module.css"

export interface LeadFunnelStage {
  key: FunnelStageKey
  count: number
  /** Optional pipeline value in AUD for this stage. */
  value?: number
}

interface LeadToQuoteFunnelProps {
  stages: ReadonlyArray<LeadFunnelStage>
  currency?: string
  className?: string
}

function formatCurrency(amount: number, currency: string): string {
  if (amount >= 1_000_000) return `${currency}${(amount / 1_000_000).toFixed(2)}m`
  if (amount >= 1000) return `${currency}${(amount / 1000).toFixed(1)}k`
  return `${currency}${amount.toFixed(0)}`
}

const STAGE_TONE: Record<FunnelStageKey, "teal" | "amber" | "red" | "green"> = {
  lead: "teal",
  mql: "teal",
  sql: "amber",
  quote: "red",
  won: "green",
}

export function LeadToQuoteFunnel({
  stages,
  currency = "$",
  className,
}: LeadToQuoteFunnelProps) {
  const classes = [styles.funnel, className].filter(Boolean).join(" ")
  const topCount = stages[0]?.count ?? 0

  return (
    <section className={classes} aria-label="Lead-to-quote conversion funnel">
      {stages.map((stage, index) => {
        const ratio =
          topCount > 0 ? Math.max(0.16, stage.count / topCount) : 0.16
        const previousCount = index > 0 ? stages[index - 1].count : stage.count
        const dropOff =
          previousCount > 0 && index > 0
            ? Math.round(((previousCount - stage.count) / previousCount) * 100)
            : 0
        const conversion =
          topCount > 0 ? Math.round((stage.count / topCount) * 100) : 0

        return (
          <div
            key={stage.key}
            className={styles.row}
            data-stage={stage.key}
            data-tone={STAGE_TONE[stage.key]}
            aria-label={`${FUNNEL_LABEL[stage.key]}: ${stage.count} entries`}
          >
            <div className={styles.barRow}>
              <span
                className={styles.bar}
                style={{ width: `${ratio * 100}%` }}
                aria-hidden="true"
              >
                <span className={styles.barLabel}>
                  {FUNNEL_LABEL[stage.key]}
                </span>
                <span className={styles.barCount}>
                  <CountUp from={0} to={stage.count} duration={900} />
                </span>
              </span>
              {stage.value !== undefined ? (
                <span className={styles.value}>
                  {formatCurrency(stage.value, currency)}
                </span>
              ) : null}
            </div>
            <div className={styles.meta}>
              <span className={styles.conversion}>
                {conversion}% of leads
              </span>
              {index > 0 ? (
                <span
                  className={styles.dropOff}
                  data-severity={
                    dropOff > 50 ? "high" : dropOff > 25 ? "med" : "low"
                  }
                >
                  −{dropOff}% drop-off
                </span>
              ) : null}
            </div>
          </div>
        )
      })}
    </section>
  )
}

export default LeadToQuoteFunnel
