import { AvailabilityGrid } from "../calendar/availability-grid"
import type { BayRow } from "../calendar/availability-grid"
import { CalendarWeekView } from "../calendar/calendar-week-view"
import type { WeekEvent, WeekEventTone } from "../calendar/calendar-week-view"
import styles from "./roster-calendar-overlay.module.css"

export interface TechnicianTint {
  id: string
  name: string
  tone: WeekEventTone
}

export interface CoverageMark {
  /** Weekday label, e.g. "Mon". */
  label: string
  /** Total scheduled hours of cover. */
  coverHours: number
  /** Required hours to be considered covered. */
  requiredHours: number
}

interface RosterCalendarOverlayProps {
  /** Any reference date inside the week. */
  reference: Date
  today: Date
  /** Calendar events — should be tinted by technician (use tone). */
  events: ReadonlyArray<WeekEvent>
  /** Technicians overlaying on the calendar. */
  technicians: ReadonlyArray<TechnicianTint>
  /** Per-day coverage strip rendered above the grid. */
  coverage: ReadonlyArray<CoverageMark>
  /** Per-bay availability rows shown alongside the week. */
  bays: ReadonlyArray<BayRow>
  className?: string
}

function coverageState(cover: number, required: number): "ok" | "warn" | "gap" {
  if (cover <= 0 || cover < required * 0.6) {
    return "gap"
  }
  if (cover < required) {
    return "warn"
  }
  return "ok"
}

export function RosterCalendarOverlay({
  reference,
  today,
  events,
  technicians,
  coverage,
  bays,
  className,
}: RosterCalendarOverlayProps) {
  const classes = [styles.overlay, className].filter(Boolean).join(" ")

  return (
    <div className={classes}>
      <header className={styles.head}>
        <div>
          <span className={styles.kicker}>Roster overlay</span>
          <strong className={styles.title}>Week roster · all technicians</strong>
        </div>
        <ul className={styles.legend} aria-label="Technician colour key">
          {technicians.map((tech) => (
            <li key={tech.id} data-tone={tech.tone}>
              <span aria-hidden="true" />
              {tech.name}
            </li>
          ))}
        </ul>
      </header>

      <section
        className={styles.coverage}
        aria-label="Coverage by weekday"
      >
        {coverage.map((mark) => {
          const ratio = mark.requiredHours > 0
            ? Math.min(1, mark.coverHours / mark.requiredHours)
            : 0
          const state = coverageState(mark.coverHours, mark.requiredHours)
          return (
            <div key={mark.label} className={styles.coverItem} data-state={state}>
              <span className={styles.coverLabel}>{mark.label}</span>
              <span className={styles.coverBar} aria-hidden="true">
                <span style={{ width: `${ratio * 100}%` }} />
              </span>
              <span className={styles.coverValue}>
                {mark.coverHours}/{mark.requiredHours}h
              </span>
            </div>
          )
        })}
      </section>

      <CalendarWeekView
        reference={reference}
        today={today}
        events={events}
        weekStartsOn={1}
        startHour={7}
        endHour={18}
      />

      <AvailabilityGrid bays={bays} startHour={7} endHour={18} />
    </div>
  )
}

export default RosterCalendarOverlay
