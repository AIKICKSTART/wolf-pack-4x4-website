import { CheckCircle2 } from "lucide-react"

import { PriceTag } from "./price-tag"
import styles from "./order-summary.module.css"

export interface OrderSummaryItem {
  id: string
  title: string
  sku: string
  quantity: number
  unitPrice: number
}

export interface OrderSummaryAddress {
  name: string
  line1: string
  line2?: string
  city: string
  state: string
  postcode: string
  country?: string
}

interface OrderSummaryProps {
  orderNumber: string
  placedAt: string
  eta: string
  customerName: string
  shippingAddress: OrderSummaryAddress
  items: ReadonlyArray<OrderSummaryItem>
  subtotal: number
  freight: number
  gst: number
  discount?: number
  total: number
  currency?: string
}

function formatCurrency(value: number, currency: string): string {
  return new Intl.NumberFormat("en-AU", {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
  }).format(value)
}

export function OrderSummary({
  orderNumber,
  placedAt,
  eta,
  customerName,
  shippingAddress,
  items,
  subtotal,
  freight,
  gst,
  discount,
  total,
  currency = "AUD",
}: OrderSummaryProps) {
  return (
    <article className={styles.card} aria-labelledby="order-summary-title">
      <header className={styles.head}>
        <CheckCircle2 size={32} strokeWidth={1.6} className={styles.check} aria-hidden="true" />
        <span className={styles.kicker}>Order confirmed</span>
        <h2 id="order-summary-title" className={styles.title}>Order {orderNumber}</h2>
        <p className={styles.placed}>Placed {placedAt}</p>
      </header>

      <div className={styles.eta}>
        <span className={styles.etaLabel}>Estimated delivery</span>
        <strong className={styles.etaValue}>{eta}</strong>
      </div>

      <section className={styles.section} aria-labelledby="order-items-title">
        <h3 id="order-items-title" className={styles.sectionTitle}>Items</h3>
        <ul className={styles.items}>
          {items.map((item) => (
            <li key={item.id} className={styles.item}>
              <div className={styles.itemMain}>
                <span className={styles.itemTitle}>{item.title}</span>
                <span className={styles.itemMeta}>
                  SKU · {item.sku} · Qty {item.quantity}
                </span>
              </div>
              <span className={styles.itemPrice}>
                {formatCurrency(item.unitPrice * item.quantity, currency)}
              </span>
            </li>
          ))}
        </ul>
      </section>

      <section className={styles.section} aria-labelledby="order-totals-title">
        <h3 id="order-totals-title" className={styles.visuallyHidden}>Order totals</h3>
        <dl className={styles.totals}>
          <div>
            <dt>Subtotal</dt>
            <dd>{formatCurrency(subtotal, currency)}</dd>
          </div>
          <div>
            <dt>Freight</dt>
            <dd>{freight === 0 ? "Free" : formatCurrency(freight, currency)}</dd>
          </div>
          <div>
            <dt>GST</dt>
            <dd>{formatCurrency(gst, currency)}</dd>
          </div>
          {discount && discount > 0 ? (
            <div className={styles.totalsDiscount}>
              <dt>Discount</dt>
              <dd>−{formatCurrency(discount, currency)}</dd>
            </div>
          ) : null}
        </dl>
        <div className={styles.grandTotal}>
          <span className={styles.grandLabel}>Total paid</span>
          <PriceTag amount={total} currency={currency} size="md" />
        </div>
      </section>

      <section className={styles.section} aria-labelledby="order-ship-title">
        <h3 id="order-ship-title" className={styles.sectionTitle}>Shipping to</h3>
        <address className={styles.address}>
          <strong>{customerName}</strong>
          <span>{shippingAddress.line1}</span>
          {shippingAddress.line2 && <span>{shippingAddress.line2}</span>}
          <span>
            {shippingAddress.city} {shippingAddress.state} {shippingAddress.postcode}
          </span>
          {shippingAddress.country && <span>{shippingAddress.country}</span>}
        </address>
      </section>
    </article>
  )
}

export default OrderSummary
