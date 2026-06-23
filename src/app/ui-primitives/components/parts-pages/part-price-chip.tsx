import { PriceTag, type PriceTagSize } from "../commerce/price-tag"

import type { PartPrice } from "./parts-pages-types"

import styles from "./part-price-chip.module.css"

export interface PartPriceChipProps {
  price: PartPrice
  /** Variant — "inline" for small chips, "stacked" for the detail page band. */
  variant?: "inline" | "stacked"
  /** Optional label override above the price. */
  label?: string
  className?: string
}

const SIZE_BY_VARIANT: Record<"inline" | "stacked", PriceTagSize> = {
  inline: "sm",
  stacked: "lg",
}

export function PartPriceChip({ price, variant = "inline", label, className }: PartPriceChipProps) {
  return (
    <div
      className={[
        styles.chip,
        variant === "stacked" ? styles.stacked : styles.inline,
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      aria-label={label ?? "Price"}
    >
      {label && <span className={styles.label}>{label}</span>}

      <PriceTag
        amount={(price.currentCents ?? price.rrpCents) / 100}
        compareAt={price.currentCents != null && price.currentCents < price.rrpCents ? price.rrpCents / 100 : undefined}
        currency="AUD"
        size={SIZE_BY_VARIANT[variant]}
      />

      {price.installmentHint && (
        <span className={styles.installment}>{price.installmentHint}</span>
      )}
    </div>
  )
}

export default PartPriceChip
