import {
  WEEKDAY_SHORT,
  buildMonthMatrix,
  formatMonthYear,
  sameDay,
  sameMonth,
} from "./date-utils"
import styles from "./calendar-month-view.module.css"

export type MonthEventTone = "red" | "amber" | "teal" | "green" | "neutral"

export interface MonthEvent {
  id: string
  date: Date
  title: string
  tone?: MonthEventTone
}

interface CalendarMonthViewProps {
  /** The month to display. Any day inside the month works. */
  reference: Date
  /** Reference date used to mark "today" in the grid. */
  today: Date
  /** Flat list of events; the component groups them by date. */
  events: ReadonlyArray<MonthEvent>
  /** Optional caption shown above the grid. Falls back to month-year. */
  caption?: string
  /** Week start day. 0 = Sunday, 1 = Monday. Defaults to Sunday. */
  weekStartsOn?: 0 | 1
  className?: string
}

const MAX_CHIPS = 3

function groupEventsByDay(events: ReadonlyArray<MonthEvent>): Map<string, MonthEvent[]> {
  const map = new Map<string, MonthEvent[]>()
  for (const event of events) {
    const key = `${event.date.getFullYear()}-${event.date.getMonth()}-${event.date.getDate()}`
    const list = map.get(key)
    if (list) {
      list.push(event)
    } else {
      map.set(key, [event])
    }
  }
  return map
}

function dayKey(date: Date): string {
  return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`
}

export function CalendarMonthView({
  reference,
  today,
  events,
  caption,
  weekStartsOn = 0,
  className,
}: CalendarMonthViewProps) {
  const cells = buildMonthMatrix(reference, weekStartsOn)
  const grouped = groupEventsByDay(events)
  const weekdayLabels = Array.from({ length: 7 }, (_, index) =>
    WEEKDAY_SHORT[(weekStartsOn + index) % 7],
  )

  const classes = [styles.view, className].filter(Boolean).join(" ")

  return (
    <div className={classes}>
      <header className={styles.head}>
        <span className={styles.kicker}>Month</span>
        <strong className={styles.title}>{caption ?? formatMonthYear(reference)}</strong>
      </header>
      <div className={styles.weekdays} aria-hidden="true">
        {weekdayLabels.map((label, index) => (
          <span key={`${label}-${index}`}>{label}</span>
        ))}
      </div>
      <div
        className={styles.grid}
        role="grid"
        aria-label={`Month view, ${formatMonthYear(reference)}`}
      >
        {Array.from({ length: 6 }, (_, rowIndex) => (
          <div key={rowIndex} className={styles.row} role="row">
            {cells.slice(rowIndex * 7, rowIndex * 7 + 7).map((cell) => {
              const inMonth = sameMonth(cell, reference)
              const isToday = sameDay(cell, today)
              const dayEvents = grouped.get(dayKey(cell)) ?? []
              const visible = dayEvents.slice(0, MAX_CHIPS)
              const overflow = dayEvents.length - visible.length
              return (
                <div
                  key={cell.toISOString()}
                  role="gridcell"
                  aria-label={cell.toDateString()}
                  aria-current={isToday ? "date" : undefined}
                  className={[
                    styles.cell,
                    inMonth ? styles.inMonth : styles.outMonth,
                    isToday && styles.today,
                  ]
                    .filter(Boolean)
                    .join(" ")}
                >
                  <span className={styles.date}>{cell.getDate()}</span>
                  {visible.length > 0 && (
                    <ul className={styles.events}>
                      {visible.map((event) => (
                        <li
                          key={event.id}
                          className={styles.event}
                          data-tone={event.tone ?? "neutral"}
                        >
                          {event.title}
                        </li>
                      ))}
                    </ul>
                  )}
                  {overflow > 0 && (
                    <span className={styles.overflow}>+{overflow} more</span>
                  )}
                </div>
              )
            })}
          </div>
        ))}
      </div>
    </div>
  )
}

export default CalendarMonthView
