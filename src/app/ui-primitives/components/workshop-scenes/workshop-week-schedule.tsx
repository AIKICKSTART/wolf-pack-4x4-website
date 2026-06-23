import type { CSSProperties } from "react"

import {
  buildHourLabels,
  formatLongDate,
  minutesFromMidnight,
} from "../calendar/date-utils"
import styles from "./workshop-week-schedule.module.css"

export type BayEventTone = "red" | "amber" | "teal" | "green"

export interface BayLaneEvent {
  id: string
  bayId: string
  start: Date
  end: Date
  /** Job number, e.g. "JOB-2026-0418". */
  jobNumber: string
  /** Vehicle rego plate text. */
  rego: string
  tone?: BayEventTone
}

export interface BayLane {
  id: string
  label: string
  technician: string
}

export interface WorkshopWeekScheduleProps {
  /** The date being shown — used for the header range. */
  reference: Date
  bays: ReadonlyArray<BayLane>
  events: ReadonlyArray<BayLaneEvent>
  /** First visible hour, default 7. */
  startHour?: number
  /** Last visible hour (exclusive), default 18. */
  endHour?: number
}

export function WorkshopWeekSchedule({
  reference,
  bays,
  events,
  startHour = 7,
  endHour = 18,
}: WorkshopWeekScheduleProps) {
  const hours = buildHourLabels(startHour, endHour - 1, 24)
  const totalMinutes = (endHour - startHour) * 60

  const minuteToPercent = (minutes: number): number => {
    const offset = minutes - startHour * 60
    return Math.max(0, Math.min(100, (offset / totalMinutes) * 100))
  }

  const eventsByBay = bays.map((bay) =>
    events.filter((event) => event.bayId === bay.id),
  )

  const gridStyle: CSSProperties = {
    "--bay-count": bays.length,
    "--hour-count": hours.length,
  } as CSSProperties

  return (
    <section
      className={styles.view}
      aria-label={`Workshop schedule for ${formatLongDate(reference)}`}
    >
      <header className={styles.head}>
        <div className={styles.identity}>
          <span className={styles.kicker}>Bay schedule</span>
          <h3 className={styles.title}>{formatLongDate(reference)}</h3>
        </div>
        <span className={styles.dateRange}>
          {hours[0]} – {hours[hours.length - 1]}
        </span>
      </header>

      <div className={styles.grid} role="grid" style={gridStyle}>
        <div className={styles.hourColumn} aria-hidden="true">
          <span className={styles.cornerCell}>Bay</span>
          {hours.map((label) => (
            <span key={label} className={styles.hourLabel}>
              {label}
            </span>
          ))}
        </div>
        {bays.map((bay, bayIndex) => (
          <div
            key={bay.id}
            className={styles.bayColumn}
            role="row"
            aria-label={`${bay.label} with ${bay.technician}`}
          >
            <div className={styles.bayHead}>
              <strong className={styles.bayHeadLabel}>{bay.label}</strong>
              <span className={styles.bayHeadTech}>{bay.technician}</span>
            </div>
            <div className={styles.bayBody}>
              {eventsByBay[bayIndex].map((event) => {
                const top = minuteToPercent(minutesFromMidnight(event.start))
                const bottom = minuteToPercent(minutesFromMidnight(event.end))
                return (
                  <div
                    key={event.id}
                    role="gridcell"
                    className={styles.event}
                    data-tone={event.tone ?? "red"}
                    style={{
                      top: `${top}%`,
                      height: `${Math.max(2, bottom - top)}%`,
                    }}
                    aria-label={`${event.jobNumber} on ${event.rego} from ${event.start.toLocaleTimeString()} to ${event.end.toLocaleTimeString()}`}
                  >
                    <strong>{event.jobNumber}</strong>
                    <span>{event.rego}</span>
                  </div>
                )
              })}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default WorkshopWeekSchedule
