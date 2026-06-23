import type { DealPeriod } from "./crm-types"
import styles from "./deal-value-chip.module.css"

interface DealValueChipProps {
  amount: number
  currency?: string
  period?: DealPeriod
  likelihood?: number
  className?: string
}

const PERIOD_LABEL: Record<DealPeriod, string> = {
  "one-off": "one-off",
  monthly: "/ mo",
  annual: "/ yr",
}

function formatAmount(amount: number, currency: string): string {
  if (amount >= 1_000_000) {
    return `${currency}${(amount / 1_000_000).toFixed(2)}m`
  }
  if (amount >= 1000) {
    return `${currency}${(amount / 1000).toFixed(amount >= 10_000 ? 1 : 2)}k`
  }
  return `${currency}${amount.toFixed(0)}`
}

export function DealValueChip({
  amount,
  currency = "$",
  period = "one-off",
  likelihood,
  className,
}: DealValueChipProps) {
  const classes = [styles.chip, className].filter(Boolean).join(" ")
  const formatted = formatAmount(amount, currency)
  const weighted =
    likelihood !== undefined
      ? formatAmount(amount * (likelihood / 100), currency)
      : null
  const safeLikelihood =
    likelihood !== undefined
      ? Math.max(0, Math.min(100, Math.round(likelihood)))
      : undefined

  return (
    <span
      className={classes}
      aria-label={`Deal value: ${formatted} ${PERIOD_LABEL[period]}${
        safeLikelihood !== undefined ? `, ${safeLikelihood}% likelihood` : ""
      }`}
    >
      <span className={styles.amount}>{formatted}</span>
      <span className={styles.period}>{PERIOD_LABEL[period]}</span>
      {safeLikelihood !== undefined && weighted ? (
        <span className={styles.likelihood} title={`Weighted value: ${weighted}`}>
          ×{safeLikelihood}%
        </span>
      ) : null}
    </span>
  )
}

export default DealValueChip
