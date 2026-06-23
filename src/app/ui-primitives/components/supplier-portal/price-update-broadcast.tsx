import { TrendingUp } from "lucide-react"

import { PriceTag } from "../commerce/price-tag"
import { Chip } from "../primitives/chip"

import styles from "./price-update-broadcast.module.css"
import type { SupplierTone } from "./supplier-portal-types"

export interface PriceUpdateBroadcastProps {
  sku: string
  title: string
  /** Old supplier list price, ex GST, AUD. */
  oldPrice: number
  /** New supplier list price, ex GST, AUD. */
  newPrice: number
  /** Effective date label e.g. "From 01 Jul". */
  effectiveLabel: string
  /** Number of active customer quotes that will be repriced. */
  affectedQuotes: number
  /** Supplier-facing explanatory note. */
  note?: string
}

function deltaTone(oldPrice: number, newPrice: number): SupplierTone {
  if (newPrice > oldPrice) return "red"
  if (newPrice < oldPrice) return "green"
  return "teal"
}

function deltaLabel(oldPrice: number, newPrice: number): string {
  if (oldPrice <= 0) return "n/a"
  const pct = ((newPrice - oldPrice) / oldPrice) * 100
  const sign = pct > 0 ? "+" : ""
  return `${sign}${pct.toFixed(1)}%`
}

export function PriceUpdateBroadcast({
  sku,
  title,
  oldPrice,
  newPrice,
  effectiveLabel,
  affectedQuotes,
  note,
}: PriceUpdateBroadcastProps) {
  const tone = deltaTone(oldPrice, newPrice)
  const delta = deltaLabel(oldPrice, newPrice)

  return (
    <article
      className={styles.card}
      data-tone={tone}
      role="region"
      aria-label={`Price update for ${sku}`}
    >
      <header className={styles.head}>
        <span className={styles.kicker}>Price broadcast</span>
        <h3 className={styles.title}>
          {sku} · {title}
        </h3>
        <span className={styles.effective}>{effectiveLabel}</span>
      </header>

      <div className={styles.priceRow}>
        <div className={styles.priceBlock}>
          <span className={styles.priceLabel}>Was</span>
          <PriceTag amount={oldPrice} size="sm" />
        </div>
        <span className={styles.arrow} aria-hidden="true">
          →
        </span>
        <div className={styles.priceBlock}>
          <span className={styles.priceLabel}>Now</span>
          <PriceTag amount={newPrice} size="lg" />
        </div>
        <Chip
          label={delta}
          tone={tone}
          icon={<TrendingUp size={12} aria-hidden="true" />}
        />
      </div>

      <div className={styles.impactRow}>
        <div className={styles.impactCell}>
          <span className={styles.impactValue}>{affectedQuotes}</span>
          <span className={styles.impactLabel}>active quotes repriced</span>
        </div>
        {note ? <p className={styles.note}>{note}</p> : null}
      </div>
    </article>
  )
}

export default PriceUpdateBroadcast
