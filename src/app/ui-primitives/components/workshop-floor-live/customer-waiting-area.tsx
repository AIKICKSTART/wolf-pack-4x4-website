import { Coffee, Sofa, Users } from "lucide-react"

import { Chip } from "../primitives/chip"
import { Avatar } from "../primitives/avatar"
import styles from "./customer-waiting-area.module.css"

export type WaitingOffer = "coffee" | "waiting-room" | "shuttle"

export interface WaitingCustomer {
  id: string
  name: string
  vehicle: string
  /** Minutes already waiting. */
  waitedMinutes: number
  /** Offer accepted (if any). */
  offered?: WaitingOffer
}

interface CustomerWaitingAreaProps {
  customers: ReadonlyArray<WaitingCustomer>
  /** Estimated wait window for next customer, e.g. "8–12 min". */
  estimatedWait: string
  /** Cups poured today — quick rapport metric. */
  coffeesPoured?: number
  className?: string
}

const OFFER_LABEL: Record<WaitingOffer, string> = {
  coffee: "Coffee accepted",
  "waiting-room": "In waiting room",
  shuttle: "Shuttle home",
}

const OFFER_TONE: Record<WaitingOffer, "amber" | "teal" | "green"> = {
  coffee: "amber",
  "waiting-room": "teal",
  shuttle: "green",
}

export function CustomerWaitingArea({
  customers,
  estimatedWait,
  coffeesPoured,
  className,
}: CustomerWaitingAreaProps) {
  const classes = [styles.area, className].filter(Boolean).join(" ")

  return (
    <section
      className={classes}
      aria-label="Customer waiting area"
    >
      <header className={styles.head}>
        <div className={styles.identity}>
          <span className={styles.kicker}>Waiting area · live</span>
          <h3 className={styles.title}>Front of house</h3>
        </div>
        <div className={styles.metrics}>
          <Chip
            label={`${customers.length} waiting`}
            tone="amber"
            icon={<Users size={11} strokeWidth={2.2} aria-hidden="true" />}
          />
          <Chip label={`Next: ${estimatedWait}`} tone="teal" />
          {coffeesPoured !== undefined && (
            <Chip
              label={`${coffeesPoured} cups poured`}
              tone="neutral"
              icon={<Coffee size={11} strokeWidth={2.2} aria-hidden="true" />}
            />
          )}
        </div>
      </header>

      {customers.length === 0 ? (
        <p className={styles.empty}>
          <Sofa size={16} strokeWidth={1.6} aria-hidden="true" />
          Couch is empty — everyone is on a shuttle or out the door.
        </p>
      ) : (
        <ul className={styles.list}>
          {customers.map((c) => (
            <li key={c.id} className={styles.customer}>
              <Avatar name={c.name} size="sm" tone="amber" />
              <div className={styles.body}>
                <strong>{c.name}</strong>
                <span>{c.vehicle}</span>
              </div>
              <div className={styles.tail}>
                <span className={styles.wait}>{c.waitedMinutes}m waited</span>
                {c.offered && (
                  <Chip label={OFFER_LABEL[c.offered]} tone={OFFER_TONE[c.offered]} />
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}

export default CustomerWaitingArea
