import {
  WEEKDAY_SHORT,
  buildHourLabels,
  buildWeekDays,
  diffInDays,
  endOfWeek,
  formatLongDate,
  minutesFromMidnight,
  sameDay,
  startOfWeek,
} from "./date-utils"
import styles from "./calendar-week-view.module.css"

export type WeekEventTone = "red" | "amber" | "teal" | "green" | "neutral"

export interface WeekEvent {
  id: string
  start: Date
  end: Date
  title: string
  tone?: WeekEventTone
  sub?: string
}

interface CalendarWeekViewProps {
  /** Any day inside the week to display. */
  reference: Date
  /** Used to draw the "now" line and highlight today. */
  today: Date
  events: ReadonlyArray<WeekEvent>
  /** First visible hour, 0-23. Defaults to 6. */
  startHour?: number
  /** Last visible hour, exclusive. Defaults to 22 (10pm). */
  endHour?: number
  /** Week start day. 0 = Sunday, 1 = Monday. Defaults to Monday. */
  weekStartsOn?: 0 | 1
  className?: string
}

export function CalendarWeekView({
  reference,
  today,
  events,
  startHour = 6,
  endHour = 22,
  weekStartsOn = 1,
  className,
}: CalendarWeekViewProps) {
  const days = buildWeekDays(reference, weekStartsOn)
  const hours = buildHourLabels(startHour, endHour - 1, 24)
  const totalMinutes = (endHour - startHour) * 60

  const minuteToPercent = (minutes: number): number => {
    const offset = minutes - startHour * 60
    return Math.max(0, Math.min(100, (offset / totalMinutes) * 100))
  }

  const eventsByDay = days.map((day) =>
    events.filter((event) => sameDay(event.start, day)),
  )

  const start = startOfWeek(reference, weekStartsOn)
  const end = endOfWeek(reference, weekStartsOn)
  const showNowLine = diffInDays(start, today) >= 0 && diffInDays(today, end) >= 0

  const classes = [styles.view, className].filter(Boolean).join(" ")

  return (
    <div className={classes}>
      <header className={styles.head}>
        <span className={styles.kicker}>Week</span>
        <strong className={styles.title}>
          {formatLongDate(days[0])} → {formatLongDate(days[6])}
        </strong>
      </header>
      <div
        className={styles.grid}
        role="grid"
        aria-label={`Week view ${formatLongDate(days[0])} to ${formatLongDate(days[6])}`}
      >
        <div className={styles.hourColumn} aria-hidden="true">
          <span className={styles.cornerCell} />
          {hours.map((label) => (
            <span key={label} className={styles.hourLabel}>
              {label}
            </span>
          ))}
        </div>
        {days.map((day, dayIndex) => {
          const isToday = sameDay(day, today)
          const dayEvents = eventsByDay[dayIndex]
          return (
            <div
              key={day.toISOString()}
              className={styles.dayColumn}
              role="row"
              data-today={isToday ? "true" : undefined}
            >
              <div className={styles.dayHead}>
                <span className={styles.weekday}>{WEEKDAY_SHORT[day.getDay()]}</span>
                <strong className={styles.dayNum}>{day.getDate()}</strong>
              </div>
              <div className={styles.dayBody}>
                {hours.map((_, index) => (
                  <span key={index} className={styles.hourRule} />
                ))}
                {isToday && showNowLine && (
                  <span
                    className={styles.nowLine}
                    style={{ top: `${minuteToPercent(minutesFromMidnight(today))}%` }}
                    aria-label="Current time"
                  />
                )}
                {dayEvents.map((event) => {
                  const top = minuteToPercent(minutesFromMidnight(event.start))
                  const bottom = minuteToPercent(minutesFromMidnight(event.end))
                  return (
                    <div
                      key={event.id}
                      role="gridcell"
                      className={styles.event}
                      data-tone={event.tone ?? "neutral"}
                      style={{ top: `${top}%`, height: `${bottom - top}%` }}
                    >
                      <strong>{event.title}</strong>
                      {event.sub && <span>{event.sub}</span>}
                    </div>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default CalendarWeekView
