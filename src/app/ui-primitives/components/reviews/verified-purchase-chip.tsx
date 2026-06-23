import { ShieldCheck } from "lucide-react"

import { Chip } from "../primitives/chip"
import { QuoteBubble } from "../primitives/quote-bubble"

import styles from "./verified-purchase-chip.module.css"

export interface VerifiedPurchaseChipProps {
  /** When provided, surfaces a tooltip with the transaction date. */
  transactionDate?: string
  /** Override the chip text. */
  label?: string
  className?: string
}

export function VerifiedPurchaseChip({
  transactionDate,
  label = "Verified purchase",
  className,
}: VerifiedPurchaseChipProps) {
  const classes = [styles.wrapper, className].filter(Boolean).join(" ")
  const tooltipLabel = transactionDate ? `Verified ${transactionDate}` : undefined

  return (
    <span className={classes}>
      <Chip
        label={label}
        tone="green"
        icon={<ShieldCheck size={11} strokeWidth={2.4} aria-hidden="true" />}
      />
      {transactionDate ? (
        <span className={styles.tooltipShell} role="tooltip">
          <QuoteBubble side="bottom" tone="teal" label={tooltipLabel}>
            <span className={styles.tooltipText}>{`Confirmed job ${transactionDate}`}</span>
          </QuoteBubble>
        </span>
      ) : null}
    </span>
  )
}

export default VerifiedPurchaseChip
