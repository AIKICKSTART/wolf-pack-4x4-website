import {
  buildHourLabels,
  formatLongDate,
  formatRange,
  sameDay,
} from "./date-utils"
import styles from "./calendar-day-view.module.css"

export type DayEventTone = "red" | "amber" | "teal" | "green" | "neutral"

export interface DayEvent {
  id: string
  start: Date
  end: Date
  title: string
  tone?: DayEventTone
  bay?: string
}

interface CalendarDayViewProps {
  date: Date
  today: Date
  events: ReadonlyArray<DayEvent>
  /** First visible hour, 0-23. Default 7. */
  startHour?: number
  /** Last visible hour exclusive. Default 19. */
  endHour?: number
  className?: string
}

interface HourRow {
  hour: number
  label: string
  events: DayEvent[]
}

function buildHourRows(
  events: ReadonlyArray<DayEvent>,
  startHour: number,
  endHour: number,
  labels: ReadonlyArray<string>,
): HourRow[] {
  return Array.from({ length: endHour - startHour }, (_, index) => {
    const hour = startHour + index
    return {
      hour,
      label: labels[index],
      events: events.filter((event) => event.start.getHours() === hour),
    }
  })
}

export function CalendarDayView({
  date,
  today,
  events,
  startHour = 7,
  endHour = 19,
  className,
}: CalendarDayViewProps) {
  const hourLabels = buildHourLabels(startHour, endHour - 1, 24)
  const rows = buildHourRows(events, startHour, endHour, hourLabels)
  const isToday = sameDay(date, today)
  const classes = [styles.view, className].filter(Boolean).join(" ")

  return (
    <div className={classes}>
      <header className={styles.head}>
        <div>
          <span className={styles.kicker}>Day · {isToday ? "Today" : "Schedule"}</span>
          <strong className={styles.title}>{formatLongDate(date)}</strong>
        </div>
        <span className={styles.count}>{events.length} events</span>
      </header>
      <ol className={styles.rows} aria-label={`Day schedule for ${formatLongDate(date)}`}>
        {rows.map((row) => (
          <li key={row.hour} className={styles.row} data-empty={row.events.length === 0}>
            <span className={styles.hour}>{row.label}</span>
            <span className={styles.halfRule} aria-hidden="true" />
            <div className={styles.stack}>
              {row.events.length === 0 ? (
                <span className={styles.empty}>— open —</span>
              ) : (
                row.events.map((event) => (
                  <article
                    key={event.id}
                    className={styles.event}
                    data-tone={event.tone ?? "neutral"}
                  >
                    <div className={styles.eventBody}>
                      <strong>{event.title}</strong>
                      {event.bay && <span className={styles.bay}>{event.bay}</span>}
                    </div>
                    <span className={styles.timeChip}>{formatRange(event.start, event.end)}</span>
                  </article>
                ))
              )}
            </div>
          </li>
        ))}
      </ol>
    </div>
  )
}

export default CalendarDayView
