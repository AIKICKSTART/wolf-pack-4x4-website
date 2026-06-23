import { PriceTag } from "../commerce"

import styles from "./service-pricing-band.module.css"

export interface ServicePricingBandProps {
  /** Kicker, e.g. "Pricing". */
  kicker?: string
  /** Starting price in AUD. */
  fromPriceAud: number
  /** Helper line under the price, e.g. "Per vehicle, standard fitment". */
  priceHelper?: string
  /** GST chip label override. */
  gstChip?: string
  /** Booking-deposit chip label override. */
  depositChip?: string
  /** Finance chip label override. */
  financeChip?: string
}

/**
 * Service pricing band adapter. Composes the shared commerce `PriceTag`
 * primitive (rendering "$XXX AUD" with the design-system currency layout)
 * and surfaces the three Mufflermen-specific pricing chips (GST included,
 * booking deposit, finance available) alongside it.
 *
 * The chips are rendered as non-interactive list items, not the
 * interactive `Chip` primitive — they are descriptive, not selectable.
 */
export function ServicePricingBand({
  kicker = "Pricing",
  fromPriceAud,
  priceHelper = "Per vehicle, standard fitment",
  gstChip = "Includes 10% GST",
  depositChip = "$80 booking deposit",
  financeChip = "Humm finance available",
}: ServicePricingBandProps) {
  return (
    <section className={styles.band} aria-label="Service pricing band">
      <div className={styles.left}>
        <span className={styles.kicker}>{kicker}</span>
        <div className={styles.price}>
          <span className={styles.fromLabel}>From</span>
          <PriceTag amount={fromPriceAud} currency="AUD" size="lg" />
        </div>
        <span className={styles.priceHelper}>{priceHelper}</span>
      </div>
      <ul className={styles.chips} role="list" aria-label="Pricing details">
        <li className={`${styles.chip} ${styles.chipGst}`}>
          <span className={styles.chipDot} aria-hidden="true" />
          {gstChip}
        </li>
        <li className={`${styles.chip} ${styles.chipDeposit}`}>
          <span className={styles.chipDot} aria-hidden="true" />
          {depositChip}
        </li>
        <li className={`${styles.chip} ${styles.chipFinance}`}>
          <span className={styles.chipDot} aria-hidden="true" />
          {financeChip}
        </li>
      </ul>
    </section>
  )
}

export default ServicePricingBand
