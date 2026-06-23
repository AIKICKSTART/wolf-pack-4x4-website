import { CalendarDays, MapPin } from "lucide-react"

import type { LandingAccent, LandingEvent } from "./landing-pages-types"
import styles from "./landing-pages.module.css"

export interface EventCardProps {
  event: LandingEvent
  /** Override the RSVP button label. */
  rsvpLabel?: string
  className?: string
}

const ACCENT_VAR: Record<LandingAccent, string> = {
  red: "color-mix(in oklab, var(--primitive-red) 18%, transparent)",
  amber: "color-mix(in oklab, var(--primitive-amber) 18%, transparent)",
  teal: "color-mix(in oklab, var(--primitive-teal) 18%, transparent)",
  green: "color-mix(in oklab, var(--primitive-green) 18%, transparent)",
}

function parseDateLabel(iso: string): { day: string; month: string } {
  const date = new Date(iso)
  if (Number.isNaN(date.getTime())) {
    return { day: "TBA", month: "" }
  }
  const day = date.getDate().toString().padStart(2, "0")
  const month = date.toLocaleString("en-AU", { month: "short" }).toUpperCase()
  return { day, month }
}

/**
 * Primitive 13 — Upcoming event card. Left-rail date tile, headline + meta
 * row (date string + location), short summary, and an RSVP button. Optional
 * capacity bar communicates "X of Y spots left" with tabular numerics.
 */
export function EventCard({ event, rsvpLabel = "RSVP", className }: EventCardProps) {
  const { day, month } = parseDateLabel(event.isoDate)
  const accent = event.tone ? event.tone : "amber"
  const cardStyle = {
    ["--event-accent" as string]: ACCENT_VAR[accent],
  } as const

  const capacityRatio = event.capacity
    ? Math.min(1, Math.max(0, event.capacity.taken / Math.max(1, event.capacity.total)))
    : null
  const capacityLabel = event.capacity
    ? `${event.capacity.total - event.capacity.taken} of ${event.capacity.total} spots left`
    : null

  const classes = [styles.eventCard, className].filter(Boolean).join(" ")

  return (
    <article className={classes} style={cardStyle} aria-label={event.title}>
      <div className={styles.eventCardDate} aria-hidden="true">
        <span className={styles.eventCardDateDay}>{day}</span>
        <span className={styles.eventCardDateMonth}>{month}</span>
      </div>

      <div className={styles.eventCardBody}>
        <h3 className={styles.eventCardTitle}>{event.title}</h3>
        <div className={styles.eventCardMeta}>
          <span>
            <CalendarDays
              size={12}
              strokeWidth={1.8}
              aria-hidden="true"
              style={{ marginRight: 6, verticalAlign: "middle" }}
            />
            <time dateTime={event.isoDate}>{event.date}</time>
          </span>
          <span>
            <MapPin
              size={12}
              strokeWidth={1.8}
              aria-hidden="true"
              style={{ marginRight: 6, verticalAlign: "middle" }}
            />
            {event.location}
          </span>
        </div>
        <p className={styles.eventCardSummary}>{event.summary}</p>
        {capacityLabel ? (
          <div>
            <span className={styles.eventCardCapacity}>{capacityLabel}</span>
            <span
              className={styles.eventCardCapacityBar}
              role="progressbar"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={Math.round((capacityRatio ?? 0) * 100)}
              aria-label="Event capacity"
            >
              <span style={{ width: `${Math.round((capacityRatio ?? 0) * 100)}%` }} />
            </span>
          </div>
        ) : null}
      </div>

      <div className={styles.eventCardFoot}>
        <a
          className={`${styles.action} ${styles.actionPrimary}`}
          href={event.rsvpHref}
          aria-label={`${rsvpLabel} for ${event.title}`}
        >
          <span>{rsvpLabel}</span>
          <span className={styles.arrow} aria-hidden="true" />
        </a>
      </div>
    </article>
  )
}

export default EventCard
