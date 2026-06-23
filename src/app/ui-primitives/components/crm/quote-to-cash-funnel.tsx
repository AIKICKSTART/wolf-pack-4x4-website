import styles from "./quote-to-cash-funnel.module.css"

export type FunnelStageKey =
  | "lead"
  | "qualified"
  | "quoted"
  | "approved"
  | "invoiced"
  | "paid"

export interface FunnelStage {
  key: FunnelStageKey
  label: string
  count: number
  value: number
}

interface QuoteToCashFunnelProps {
  stages: ReadonlyArray<FunnelStage>
  currency?: string
  className?: string
}

function formatValue(amount: number, currency: string): string {
  if (amount >= 1_000_000) {
    return `${currency}${(amount / 1_000_000).toFixed(2)}m`
  }
  if (amount >= 1000) {
    return `${currency}${(amount / 1000).toFixed(1)}k`
  }
  return `${currency}${amount.toFixed(0)}`
}

export function QuoteToCashFunnel({
  stages,
  currency = "$",
  className,
}: QuoteToCashFunnelProps) {
  const classes = [styles.funnel, className].filter(Boolean).join(" ")

  const topCount = stages[0]?.count ?? 0

  return (
    <div className={classes} aria-label="Quote-to-cash funnel">
      {stages.map((stage, index) => {
        const widthRatio =
          topCount > 0 ? Math.max(0.15, stage.count / topCount) : 0.15
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
            aria-label={`${stage.label}: ${stage.count} entries, ${formatValue(
              stage.value,
              currency,
            )} total`}
          >
            <div className={styles.barRow}>
              <span
                className={styles.bar}
                style={{ width: `${widthRatio * 100}%` }}
                aria-hidden="true"
              >
                <span className={styles.barLabel}>{stage.label}</span>
                <span className={styles.barCount}>{stage.count}</span>
              </span>
              <span className={styles.value}>{formatValue(stage.value, currency)}</span>
            </div>
            <div className={styles.meta}>
              <span className={styles.conversion}>{conversion}% of leads</span>
              {index > 0 ? (
                <span
                  className={styles.dropOff}
                  data-severity={dropOff > 50 ? "high" : dropOff > 25 ? "med" : "low"}
                >
                  −{dropOff}% drop-off
                </span>
              ) : null}
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default QuoteToCashFunnel
