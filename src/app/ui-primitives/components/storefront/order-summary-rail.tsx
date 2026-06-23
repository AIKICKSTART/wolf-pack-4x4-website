import { Lock, ShieldCheck } from "lucide-react"

import { PriceTag } from "../commerce/price-tag"

import type { CartTotals, StorefrontCartLine } from "./storefront-types"
import { STORE_DEFAULT_CURRENCY, STORE_LOCALE } from "./storefront-types"
import styles from "./order-summary-rail.module.css"

interface OrderSummaryRailProps {
  lines: ReadonlyArray<StorefrontCartLine>
  totals: CartTotals
  couponCode?: string
  shippingService?: string
  freightEtaLabel?: string
  showSecureNote?: boolean
  currency?: string
  locale?: string
  title?: string
}

function formatCurrency(amount: number, currency: string, locale: string): string {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
  }).format(amount)
}

export function OrderSummaryRail({
  lines,
  totals,
  couponCode,
  shippingService,
  freightEtaLabel,
  showSecureNote = true,
  currency = STORE_DEFAULT_CURRENCY,
  locale = STORE_LOCALE,
  title = "Your order",
}: OrderSummaryRailProps) {
  const itemCount = lines.reduce((sum, line) => sum + line.quantity, 0)

  return (
    <aside className={styles.rail} aria-label="Order summary">
      <header className={styles.head}>
        <span className={styles.kicker}>Summary</span>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.subhead}>
          {itemCount} {itemCount === 1 ? "item" : "items"}
        </p>
      </header>

      <ul className={styles.lines}>
        {lines.map((line) => (
          <li key={line.id} className={styles.line}>
            <div className={styles.thumb} aria-hidden="true">
              <span>{line.thumbnailGlyph ?? line.sku.slice(0, 3)}</span>
              <span className={styles.qty}>{line.quantity}</span>
            </div>
            <div className={styles.lineBody}>
              <span className={styles.brand}>{line.brand}</span>
              <h3 className={styles.lineTitle}>{line.title}</h3>
              {line.variantLabel && (
                <span className={styles.variant}>{line.variantLabel}</span>
              )}
            </div>
            <span className={styles.lineTotal}>
              {formatCurrency(line.unitPrice * line.quantity, currency, locale)}
            </span>
          </li>
        ))}
      </ul>

      <dl className={styles.totals}>
        <div>
          <dt>Subtotal</dt>
          <dd>{formatCurrency(totals.subtotal, currency, locale)}</dd>
        </div>
        <div>
          <dt>{shippingService ? `Freight · ${shippingService}` : "Freight"}</dt>
          <dd>
            {totals.freight === 0
              ? "Free"
              : formatCurrency(totals.freight, currency, locale)}
          </dd>
        </div>
        {freightEtaLabel && (
          <div className={styles.eta}>
            <dt>ETA</dt>
            <dd>{freightEtaLabel}</dd>
          </div>
        )}
        <div>
          <dt>GST inc</dt>
          <dd>{formatCurrency(totals.gst, currency, locale)}</dd>
        </div>
        {couponCode && totals.discount && totals.discount > 0 ? (
          <div className={styles.discount}>
            <dt>Coupon · {couponCode}</dt>
            <dd>−{formatCurrency(totals.discount, currency, locale)}</dd>
          </div>
        ) : null}
      </dl>

      <div className={styles.grandRow}>
        <span className={styles.grandLabel}>Total payable</span>
        <PriceTag amount={totals.total} currency={currency} locale={locale} size="lg" />
      </div>

      {showSecureNote && (
        <div className={styles.secureRow}>
          <ShieldCheck size={14} aria-hidden="true" />
          <span>Secured by Stripe · 256-bit TLS · ABN 12 345 678 901</span>
        </div>
      )}

      <div className={styles.lockBadge} aria-hidden="true">
        <Lock size={11} />
        <span>Encrypted checkout</span>
      </div>
    </aside>
  )
}

export default OrderSummaryRail
