"use client"

import { Chip } from "../primitives/chip"
import { CarSideIcon } from "../icons/car-side"
import { ClipboardCheckIcon } from "../icons/clipboard-check"
import { ClockSpinningIcon } from "../icons/clock-spinning"
import {
  APPT_STATUS_LABEL,
  APPT_STATUS_TONE,
  formatHour,
  portalToneToChip,
  type PortalAppointment,
} from "./customer-portal-types"

import styles from "./appointment-card.module.css"

interface AppointmentCardProps {
  appointment: PortalAppointment
  /** Optional reschedule click handler. */
  onReschedule?: (id: string) => void
  /** Optional cancel click handler. */
  onCancel?: (id: string) => void
  className?: string
}

function formatDateLine(iso: string): { date: string; time: string } {
  // Parse "2026-06-04T09:30" or "2026-06-04 09:30" style strings without going
  // through Date so timezones can't shift the displayed day.
  const [datePart, timePart] = iso.split(/[T ]/)
  return {
    date: datePart ?? iso,
    time: timePart ? timePart.slice(0, 5) : "",
  }
}

function formatDuration(minutes: number): string {
  if (minutes < 60) return `${minutes}m`
  const hours = minutes / 60
  if (Number.isInteger(hours)) return `${hours}h`
  return `${hours.toFixed(1)}h`
}

function endTime(startIso: string, durationMinutes: number): string {
  const { time } = formatDateLine(startIso)
  if (!time) return ""
  const [hh, mm] = time.split(":").map((part) => Number.parseInt(part, 10))
  const total = (hh ?? 0) * 60 + (mm ?? 0) + durationMinutes
  return formatHour(total / 60)
}

export function AppointmentCard({
  appointment,
  onReschedule,
  onCancel,
  className,
}: AppointmentCardProps) {
  const classes = [styles.card, className].filter(Boolean).join(" ")
  const statusTone = portalToneToChip(APPT_STATUS_TONE[appointment.status])
  const statusLabel = APPT_STATUS_LABEL[appointment.status]
  const { date, time } = formatDateLine(appointment.startsAt)
  const endTimeLabel = endTime(appointment.startsAt, appointment.durationMinutes)
  const canReschedule = !appointment.rescheduleLocked && Boolean(onReschedule)
  const canCancel = !appointment.rescheduleLocked && Boolean(onCancel)

  return (
    <article
      className={classes}
      data-appointment={appointment.id}
      aria-label={`Appointment for ${appointment.serviceLabel} on ${date} at ${time}, ${appointment.vehicleLabel}, ${statusLabel}`}
    >
      <header className={styles.head}>
        <div className={styles.timeBlock} aria-hidden="true">
          <span className={styles.timeDay}>
            {date.slice(8, 10)}
          </span>
          <span className={styles.timeMonth}>
            {date.slice(5, 7)}
          </span>
        </div>
        <div className={styles.identity}>
          <span className={styles.kicker}>Upcoming appointment</span>
          <h3 className={styles.title}>{appointment.serviceLabel}</h3>
          <p className={styles.summary}>{appointment.serviceSummary}</p>
        </div>
        <Chip label={statusLabel} tone={statusTone} />
      </header>

      <section className={styles.vehicle} aria-label="Vehicle">
        <span className={styles.vehicleGlyph} aria-hidden="true">
          <CarSideIcon size={20} tone="currentColor" motion="none" />
        </span>
        <div className={styles.vehicleText}>
          <span className={styles.vehicleLabel}>{appointment.vehicleLabel}</span>
          <span className={styles.rego}>{appointment.rego}</span>
        </div>
      </section>

      <dl className={styles.facts}>
        <div>
          <dt>
            <ClockSpinningIcon size={11} tone="currentColor" motion="none" />
            <span>When</span>
          </dt>
          <dd>
            <time dateTime={appointment.startsAt}>
              {date} · {time}
              {endTimeLabel ? ` – ${endTimeLabel}` : ""}
            </time>
          </dd>
        </div>
        <div>
          <dt>Bay</dt>
          <dd>{appointment.bayLabel}</dd>
        </div>
        <div>
          <dt>Tech</dt>
          <dd>{appointment.techName}</dd>
        </div>
        <div>
          <dt>Duration</dt>
          <dd>{formatDuration(appointment.durationMinutes)}</dd>
        </div>
      </dl>

      <footer className={styles.foot}>
        {appointment.rescheduleLocked ? (
          <span className={styles.lockedNote}>
            <ClipboardCheckIcon size={12} tone="currentColor" motion="none" />
            Within 24h — call us on{" "}
            <a className={styles.tel} href="tel:+61242561188">
              02 4256 1188
            </a>{" "}
            to change.
          </span>
        ) : (
          <span className={styles.helperNote}>
            Free reschedule up to 24h before — no questions asked.
          </span>
        )}
        <div className={styles.actions}>
          {canCancel ? (
            <button
              type="button"
              className={styles.actionGhost}
              onClick={() => onCancel?.(appointment.id)}
              aria-label={`Cancel appointment for ${appointment.serviceLabel}`}
            >
              Cancel
            </button>
          ) : null}
          {canReschedule ? (
            <button
              type="button"
              className={styles.actionPrimary}
              onClick={() => onReschedule?.(appointment.id)}
              aria-label={`Reschedule appointment for ${appointment.serviceLabel}`}
            >
              Reschedule
            </button>
          ) : null}
        </div>
      </footer>
    </article>
  )
}

export default AppointmentCard
