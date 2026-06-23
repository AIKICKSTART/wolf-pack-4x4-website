import { BellRing, Car, Clock4 } from "lucide-react"

import { Chip } from "../primitives/chip"
import { BAY_LABEL, type BayId } from "../roster/roster-types"
import styles from "./incoming-customer-banner.module.css"

export interface IncomingCustomerBannerProps {
  customer: string
  vehicle: string
  /** ETA formatted "in 6 minutes" or "9:42 am". */
  eta: string
  /** Phone or "walk-in" tag. */
  phone?: string
  /** Pre-assigned bay if any. */
  bay?: BayId
  /** Booked service in shorthand, e.g. "Cat-back fit · 2.5h". */
  service: string
  className?: string
}

export function IncomingCustomerBanner({
  customer,
  vehicle,
  eta,
  phone,
  bay,
  service,
  className,
}: IncomingCustomerBannerProps) {
  const classes = [styles.banner, className].filter(Boolean).join(" ")

  return (
    <aside
      className={classes}
      role="status"
      aria-live="polite"
      aria-label={`Incoming customer ${customer} arriving ${eta}`}
    >
      <span className={styles.bell} aria-hidden="true">
        <BellRing size={18} strokeWidth={2.2} />
      </span>
      <div className={styles.body}>
        <span className={styles.kicker}>Incoming customer</span>
        <strong className={styles.line}>{customer} · {vehicle}</strong>
        <p className={styles.service}>
          <Car size={12} strokeWidth={2.2} aria-hidden="true" />
          {service}
        </p>
      </div>
      <div className={styles.meta}>
        <span className={styles.eta}>
          <Clock4 size={14} strokeWidth={2.2} aria-hidden="true" />
          {eta}
        </span>
        <div className={styles.chips}>
          {bay && <Chip label={BAY_LABEL[bay]} tone="teal" />}
          {phone && <Chip label={phone} tone="amber" />}
        </div>
      </div>
    </aside>
  )
}

export default IncomingCustomerBanner
