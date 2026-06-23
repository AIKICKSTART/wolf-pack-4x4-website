import { CalendarClock } from "lucide-react"

import { CartLineItem } from "../commerce/cart-line-item"
import { DashboardCard } from "../data-display/dashboard-card"
import { Chip } from "../primitives/chip"

import styles from "./order-request-card.module.css"
import type { OrderState, SupplierTone } from "./supplier-portal-types"

export interface OrderRequestLine {
  id: string
  title: string
  sku: string
  unitPrice: number
  quantity: number
}

export interface OrderRequestCardProps {
  poNumber: string
  requestedBy: string
  requestedOn: string
  lines: ReadonlyArray<OrderRequestLine>
  deliverByLabel: string
  state: OrderState
  /** Optional GST-inclusive total override. Defaults to sum of line items * 1.1. */
  totalInclGst?: number
}

const STATE_LABEL: Record<OrderState, string> = {
  requested: "Awaiting ack",
  acknowledged: "Acknowledged",
  partial: "Partial fill",
  shipped: "Shipped",
  delivered: "Delivered",
  declined: "Declined",
}

const STATE_TONE: Record<OrderState, SupplierTone> = {
  requested: "amber",
  acknowledged: "teal",
  partial: "amber",
  shipped: "teal",
  delivered: "green",
  declined: "red",
}

function formatAud(amount: number): string {
  return new Intl.NumberFormat("en-AU", {
    style: "currency",
    currency: "AUD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount)
}

export function OrderRequestCard({
  poNumber,
  requestedBy,
  requestedOn,
  lines,
  deliverByLabel,
  state,
  totalInclGst,
}: OrderRequestCardProps) {
  const subtotal = lines.reduce((sum, line) => sum + line.unitPrice * line.quantity, 0)
  const inclGst = totalInclGst ?? subtotal * 1.1
  const gst = inclGst - subtotal

  return (
    <article
      className={styles.card}
      role="region"
      aria-label={`Order request ${poNumber}`}
    >
      <header className={styles.head}>
        <div className={styles.identity}>
          <span className={styles.kicker}>Inbound PO</span>
          <h3 className={styles.po}>{poNumber}</h3>
          <span className={styles.actor}>
            Raised by {requestedBy} · {requestedOn}
          </span>
        </div>
        <div className={styles.headChips}>
          <Chip label={STATE_LABEL[state]} tone={STATE_TONE[state]} />
          <Chip
            label={deliverByLabel}
            tone="teal"
            icon={<CalendarClock size={12} aria-hidden="true" />}
          />
        </div>
      </header>

      <ul className={styles.lines} aria-label={`${lines.length} requested items`}>
        {lines.map((line) => (
          <li key={line.id}>
            <CartLineItem
              id={line.id}
              title={line.title}
              sku={line.sku}
              unitPrice={line.unitPrice}
              quantity={line.quantity}
            />
          </li>
        ))}
      </ul>

      <div className={styles.totals}>
        <DashboardCard
          label="Subtotal ex GST"
          value={formatAud(subtotal)}
          surface="neuo"
          meta={`${lines.length} lines`}
        />
        <DashboardCard
          label="GST 10%"
          value={formatAud(gst)}
          surface="glass"
          meta="Tax inclusive AU"
        />
        <DashboardCard
          label="Total incl GST"
          value={formatAud(inclGst)}
          surface="material"
          meta={`Deliver ${deliverByLabel}`}
        />
      </div>
    </article>
  )
}

export default OrderRequestCard
