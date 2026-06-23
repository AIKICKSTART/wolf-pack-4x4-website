import { Avatar } from "../primitives/avatar"
import { Chip } from "../primitives/chip"
import { Sparkline } from "../charts/sparkline"
import { CarSideIcon } from "../icons/car-side"
import {
  COMMS_CHANNEL_LABEL,
  COMMS_CHANNEL_TONE,
  type CustomerProfile,
  formatAud,
  opsToneToChip,
} from "./workshop-ops-types"

import styles from "./customer-360-card.module.css"

interface Customer360CardProps {
  customer: CustomerProfile
  /** Optional 12-point trend of monthly spend in AUD. */
  monthlySpendTrend?: ReadonlyArray<number>
  className?: string
}

const TIER_LABEL: Record<CustomerProfile["loyaltyTier"], string> = {
  "first-timer": "First-timer",
  regular: "Regular",
  champion: "Champion",
  lifer: "Lifer",
}

const TIER_TONE: Record<
  CustomerProfile["loyaltyTier"],
  "neutral" | "teal" | "amber" | "red"
> = {
  "first-timer": "neutral",
  regular: "teal",
  champion: "amber",
  lifer: "red",
}

export function Customer360Card({
  customer,
  monthlySpendTrend,
  className,
}: Customer360CardProps) {
  const classes = [styles.card, className].filter(Boolean).join(" ")
  const tierLabel = TIER_LABEL[customer.loyaltyTier]
  const tierTone = TIER_TONE[customer.loyaltyTier]

  return (
    <article
      className={classes}
      aria-label={`Customer 360 profile for ${customer.name}`}
      data-customer={customer.id}
    >
      <header className={styles.head}>
        <Avatar
          name={customer.name}
          size="lg"
          tone="red"
        />
        <div className={styles.identity}>
          <h3 className={styles.name}>{customer.name}</h3>
          <span className={styles.suburb}>{customer.suburb}</span>
        </div>
        <div className={styles.headChips}>
          <Chip label={tierLabel} tone={tierTone} />
        </div>
      </header>

      <section className={styles.stats} aria-label="Customer lifetime stats">
        <div className={styles.stat}>
          <span className={styles.statLabel}>Lifetime value</span>
          <span className={styles.statValue}>
            {formatAud(customer.lifetimeValueAud, 0)}
          </span>
          {monthlySpendTrend && monthlySpendTrend.length > 0 ? (
            <Sparkline
              points={[...monthlySpendTrend]}
              tone="amber"
              ariaLabel={`${monthlySpendTrend.length}-month spend trend`}
              width={140}
              height={32}
            />
          ) : null}
        </div>
        <div className={styles.stat}>
          <span className={styles.statLabel}>Visits</span>
          <span className={styles.statValue}>{customer.visitsCount}</span>
          <span className={styles.statHint}>
            since <time>{customer.joinedAt}</time>
          </span>
        </div>
        <div className={styles.stat}>
          <span className={styles.statLabel}>Phone</span>
          <a
            className={styles.statLink}
            href={`tel:${customer.phone.replace(/\s/g, "")}`}
          >
            {customer.phone}
          </a>
          <a
            className={styles.statHint}
            href={`mailto:${customer.email}`}
          >
            {customer.email}
          </a>
        </div>
      </section>

      <section className={styles.vehicles} aria-label="Customer vehicles">
        <header className={styles.vehiclesHead}>
          <span className={styles.sectionKicker}>Vehicles in garage</span>
          <span className={styles.sectionCount}>
            {customer.vehicles.length}
          </span>
        </header>
        <ul className={styles.vehicleList}>
          {customer.vehicles.map((vehicle) => (
            <li key={vehicle.id} className={styles.vehicleRow}>
              <span
                className={styles.vehicleGlyph}
                aria-hidden="true"
              >
                <CarSideIcon size={20} tone="amber" motion="none" />
              </span>
              <div className={styles.vehicleMeta}>
                <span className={styles.vehicleLabel}>{vehicle.label}</span>
                <span className={styles.vehicleSub}>
                  {vehicle.yearMade} · {vehicle.bodyColour}
                </span>
              </div>
              <span className={styles.regoPlate}>{vehicle.rego}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className={styles.comms} aria-label="Recent communications">
        <header className={styles.commsHead}>
          <span className={styles.sectionKicker}>Comms timeline</span>
          <span className={styles.sectionCount}>{customer.comms.length}</span>
        </header>
        <ol className={styles.commsList}>
          {customer.comms.map((entry) => (
            <li
              key={entry.id}
              className={[
                styles.commsRow,
                entry.inbound ? styles.commsRowInbound : styles.commsRowOutbound,
              ].join(" ")}
            >
              <span className={styles.commsDot} aria-hidden="true" />
              <div className={styles.commsBody}>
                <span className={styles.commsMeta}>
                  <Chip
                    label={COMMS_CHANNEL_LABEL[entry.channel]}
                    tone={opsToneToChip(COMMS_CHANNEL_TONE[entry.channel])}
                  />
                  <time className={styles.commsTime}>{entry.when}</time>
                </span>
                <span className={styles.commsSummary}>{entry.summary}</span>
              </div>
            </li>
          ))}
        </ol>
      </section>
    </article>
  )
}

export default Customer360Card
