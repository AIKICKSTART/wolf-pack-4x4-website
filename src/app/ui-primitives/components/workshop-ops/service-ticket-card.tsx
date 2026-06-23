import { Chip } from "../primitives/chip"
import { ProgressLinear } from "../primitives/progress-linear"
import { ClipboardCheckIcon } from "../icons/clipboard-check"
import { CarSideIcon } from "../icons/car-side"
import { SpannerIcon } from "../icons/spanner"
import {
  BAY_LABEL,
  type Mechanic,
  type ServiceTicket,
  TICKET_PRIORITY_LABEL,
  TICKET_PRIORITY_TONE,
  TICKET_STATUS_LABEL,
  TICKET_STATUS_TONE,
  formatAud,
  formatKm,
  opsToneToChip,
} from "./workshop-ops-types"

import styles from "./service-ticket-card.module.css"

interface ServiceTicketCardProps {
  ticket: ServiceTicket
  mechanic?: Mechanic
  className?: string
}

function maskVin(vin: string): string {
  if (vin.length <= 8) return vin
  const visible = vin.slice(-6)
  return `••• ${visible}`
}

export function ServiceTicketCard({
  ticket,
  mechanic,
  className,
}: ServiceTicketCardProps) {
  const classes = [styles.card, className].filter(Boolean).join(" ")
  const total = ticket.services.length
  const done = ticket.services.filter((service) => service.done).length
  const progress = total === 0 ? 0 : (done / total) * 100
  const bayLabel = ticket.bayId ? BAY_LABEL[ticket.bayId] : "Unassigned"
  const priorityChip = opsToneToChip(TICKET_PRIORITY_TONE[ticket.priority])
  const statusChip = opsToneToChip(TICKET_STATUS_TONE[ticket.status])

  return (
    <article
      className={classes}
      aria-label={`Service ticket ${ticket.number} for ${ticket.customerName}`}
      data-ticket={ticket.id}
    >
      <header className={styles.head}>
        <div className={styles.numberBlock}>
          <span className={styles.numberKicker}>Work order</span>
          <span className={styles.number}>{ticket.number}</span>
        </div>
        <div className={styles.headChips}>
          <Chip
            label={TICKET_PRIORITY_LABEL[ticket.priority]}
            tone={priorityChip}
            icon={
              <ClipboardCheckIcon size={12} tone="currentColor" motion="none" />
            }
          />
          <Chip label={TICKET_STATUS_LABEL[ticket.status]} tone={statusChip} />
        </div>
      </header>

      <section className={styles.vehicle} aria-label="Vehicle">
        <span className={styles.vehicleGlyph} aria-hidden="true">
          <CarSideIcon size={28} tone="currentColor" motion="none" />
        </span>
        <div className={styles.vehicleText}>
          <h3 className={styles.customer}>{ticket.customerName}</h3>
          <span className={styles.vehicleLabel}>{ticket.vehicleLabel}</span>
        </div>
        <dl className={styles.vehicleFacts}>
          <div>
            <dt>Rego</dt>
            <dd>{ticket.rego}</dd>
          </div>
          <div>
            <dt>Odo</dt>
            <dd>{formatKm(ticket.mileageKm)}</dd>
          </div>
          <div className={styles.vinFact}>
            <dt>VIN</dt>
            <dd title={ticket.vin}>{maskVin(ticket.vin)}</dd>
          </div>
        </dl>
      </section>

      <section
        className={styles.services}
        aria-label={`Service line items: ${done} of ${total} complete`}
      >
        <header className={styles.servicesHead}>
          <span className={styles.servicesLabel}>Service items</span>
          <span className={styles.servicesProgress}>
            <strong>{done}</strong>
            <span aria-hidden="true">/</span>
            <span>{total}</span>
          </span>
        </header>
        <ProgressLinear value={progress} tone="amber" />
        <ul className={styles.servicesList}>
          {ticket.services.map((service) => (
            <li
              key={service.id}
              className={[
                styles.serviceItem,
                service.done ? styles.serviceItemDone : "",
              ]
                .filter(Boolean)
                .join(" ")}
            >
              <span className={styles.serviceCheck} aria-hidden="true">
                {service.done ? "✓" : "○"}
              </span>
              <span className={styles.serviceLabel}>{service.label}</span>
              <span className={styles.serviceHours}>
                {service.hours.toFixed(1)}h
              </span>
            </li>
          ))}
        </ul>
      </section>

      <footer className={styles.foot}>
        <dl className={styles.footFacts}>
          <div>
            <dt>Bay</dt>
            <dd>
              <span
                className={styles.bayGlyph}
                aria-hidden="true"
              >
                <SpannerIcon size={12} tone="currentColor" />
              </span>
              {bayLabel}
            </dd>
          </div>
          <div>
            <dt>Tech</dt>
            <dd>{mechanic ? mechanic.name : "Unassigned"}</dd>
          </div>
          <div>
            <dt>ETA</dt>
            <dd>
              <time>{ticket.etaLabel}</time>
            </dd>
          </div>
          <div className={styles.totalCell}>
            <dt>Total inc. GST</dt>
            <dd className={styles.totalValue}>{formatAud(ticket.totalAud)}</dd>
          </div>
        </dl>
      </footer>
    </article>
  )
}

export default ServiceTicketCard
