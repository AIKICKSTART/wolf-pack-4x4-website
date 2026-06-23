import { Avatar } from "../primitives/avatar"

import {
  TICKET_STATUS_LABEL,
  TICKET_STATUS_TONE,
  type SupportTone,
  type TicketStatus,
} from "./support-types"
import styles from "./customer-profile-sidebar.module.css"

export interface CustomerVehicle {
  /** e.g. "2019 Toyota Hilux SR5". */
  description: string
  /** Optional rego, e.g. "BX42-OD". */
  rego?: string
}

export interface CustomerPriorTicket {
  id: string
  subject: string
  status: TicketStatus
}

export interface CustomerProfileNote {
  id: string
  author: string
  body: string
  timestamp: string
}

export interface CustomerProfileSidebarProps {
  name: string
  email: string
  phone?: string
  /** Where the customer is based, e.g. "Oak Flats, NSW". */
  location?: string
  avatarSrc?: string
  /** Lifetime spend in cents (formatted as AUD). */
  lifetimeValueCents: number
  vehicles?: ReadonlyArray<CustomerVehicle>
  priorTickets?: ReadonlyArray<CustomerPriorTicket>
  notes?: ReadonlyArray<CustomerProfileNote>
  className?: string
}

const TONE_CLASS: Record<SupportTone, string> = {
  red: styles.toneRed,
  amber: styles.toneAmber,
  teal: styles.toneTeal,
  green: styles.toneGreen,
  neutral: styles.toneNeutral,
  violet: styles.toneViolet,
}

function formatAud(cents: number): string {
  const dollars = cents / 100
  return new Intl.NumberFormat("en-AU", {
    style: "currency",
    currency: "AUD",
    maximumFractionDigits: 0,
  }).format(dollars)
}

export function CustomerProfileSidebar({
  name,
  email,
  phone,
  location,
  avatarSrc,
  lifetimeValueCents,
  vehicles = [],
  priorTickets = [],
  notes = [],
  className,
}: CustomerProfileSidebarProps) {
  const classes = [styles.sidebar, className].filter(Boolean).join(" ")

  return (
    <aside
      className={classes}
      aria-label={`Customer profile — ${name}`}
    >
      <header className={styles.head}>
        <Avatar name={name} src={avatarSrc} size="lg" tone="obsidian" />
        <div className={styles.identity}>
          <h3 className={styles.name}>{name}</h3>
          {location ? (
            <p className={styles.location}>{location}</p>
          ) : null}
        </div>
      </header>

      <dl className={styles.contact}>
        <div className={styles.contactRow}>
          <dt>Email</dt>
          <dd>
            <a href={`mailto:${email}`}>{email}</a>
          </dd>
        </div>
        {phone ? (
          <div className={styles.contactRow}>
            <dt>Phone</dt>
            <dd>
              <a href={`tel:${phone.replace(/\s+/g, "")}`}>{phone}</a>
            </dd>
          </div>
        ) : null}
      </dl>

      <section className={styles.section} aria-label="Lifetime value">
        <span className={styles.sectionKicker}>Lifetime value</span>
        <p className={styles.lifetimeValue}>{formatAud(lifetimeValueCents)}</p>
      </section>

      {vehicles.length > 0 ? (
        <section className={styles.section} aria-label="Vehicles">
          <span className={styles.sectionKicker}>Vehicles · {vehicles.length}</span>
          <ul className={styles.vehicles}>
            {vehicles.map((vehicle, idx) => (
              <li key={`${vehicle.description}-${idx}`} className={styles.vehicle}>
                <span className={styles.vehicleDesc}>{vehicle.description}</span>
                {vehicle.rego ? (
                  <span className={styles.vehicleRego}>{vehicle.rego}</span>
                ) : null}
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {priorTickets.length > 0 ? (
        <section className={styles.section} aria-label="Prior tickets">
          <span className={styles.sectionKicker}>Prior tickets · {priorTickets.length}</span>
          <ul className={styles.priorTickets}>
            {priorTickets.map((ticket) => {
              const tone = TICKET_STATUS_TONE[ticket.status]
              return (
                <li key={ticket.id} className={styles.priorTicket}>
                  <span className={styles.priorTicketId}>{ticket.id}</span>
                  <span className={styles.priorTicketSubject}>{ticket.subject}</span>
                  <span
                    className={[styles.priorTicketStatus, TONE_CLASS[tone]].join(" ")}
                  >
                    {TICKET_STATUS_LABEL[ticket.status]}
                  </span>
                </li>
              )
            })}
          </ul>
        </section>
      ) : null}

      {notes.length > 0 ? (
        <section className={styles.section} aria-label="Internal notes">
          <span className={styles.sectionKicker}>Internal notes</span>
          <ul className={styles.notes}>
            {notes.map((note) => (
              <li key={note.id} className={styles.note}>
                <p className={styles.noteBody}>{note.body}</p>
                <span className={styles.noteMeta}>
                  {note.author} · {note.timestamp}
                </span>
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </aside>
  )
}

export default CustomerProfileSidebar
