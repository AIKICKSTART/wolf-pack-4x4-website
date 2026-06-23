import styles from "./price-tag.module.css"

export type PriceTagSize = "sm" | "md" | "lg"

interface PriceTagProps {
  amount: number
  currency?: string
  compareAt?: number
  size?: PriceTagSize
  locale?: string
  className?: string
  ariaLabel?: string
}

const SIZE_CLASS: Record<PriceTagSize, string> = {
  sm: styles.sizeSm,
  md: styles.sizeMd,
  lg: styles.sizeLg,
}

function formatCurrency(value: number, currency: string, locale: string): string {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value)
}

function calculateSavingsPercent(current: number, compareAt: number): number {
  if (compareAt <= 0) {
    return 0
  }
  return Math.round(((compareAt - current) / compareAt) * 100)
}

export function PriceTag({
  amount,
  currency = "AUD",
  compareAt,
  size = "md",
  locale = "en-AU",
  className,
  ariaLabel,
}: PriceTagProps) {
  const hasDiscount = typeof compareAt === "number" && compareAt > amount
  const savingsPercent = hasDiscount ? calculateSavingsPercent(amount, compareAt) : 0
  const formattedCurrent = formatCurrency(amount, currency, locale)
  const formattedCompare = hasDiscount ? formatCurrency(compareAt, currency, locale) : null

  const classes = [styles.tag, SIZE_CLASS[size], hasDiscount && styles.discounted, className]
    .filter(Boolean)
    .join(" ")

  const label =
    ariaLabel ??
    (hasDiscount
      ? `${formattedCurrent} ${currency}, was ${formattedCompare}, save ${savingsPercent} percent`
      : `${formattedCurrent} ${currency}`)

  return (
    <span className={classes} role="text" aria-label={label}>
      <span className={styles.row} aria-hidden="true">
        <strong className={styles.current}>{formattedCurrent}</strong>
        <span className={styles.currency}>{currency}</span>
      </span>
      {hasDiscount && formattedCompare && (
        <span className={styles.savingsRow} aria-hidden="true">
          <s className={styles.compareAt}>{formattedCompare}</s>
          <span className={styles.savingsChip}>−{savingsPercent}%</span>
        </span>
      )}
    </span>
  )
}

export default PriceTag
