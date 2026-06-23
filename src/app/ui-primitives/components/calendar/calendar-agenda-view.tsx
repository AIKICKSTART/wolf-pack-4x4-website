import { formatLongDate, formatRange, sameDay, startOfDay } from "./date-utils"
import styles from "./calendar-agenda-view.module.css"

export type AgendaEventTone = "red" | "amber" | "teal" | "green" | "neutral"

export interface AgendaEvent {
  id: string
  start: Date
  end: Date
  title: string
  tone?: AgendaEventTone
  bay?: string
  technician?: string
}

interface CalendarAgendaViewProps {
  /** Events, in any order. The view groups them by day, sorted ascending. */
  events: ReadonlyArray<AgendaEvent>
  today: Date
  className?: string
}

interface AgendaGroup {
  date: Date
  events: AgendaEvent[]
}

function groupEvents(events: ReadonlyArray<AgendaEvent>): AgendaGroup[] {
  const map = new Map<string, AgendaGroup>()
  for (const event of events) {
    const day = startOfDay(event.start)
    const key = day.toISOString()
    const existing = map.get(key)
    if (existing) {
      existing.events.push(event)
    } else {
      map.set(key, { date: day, events: [event] })
    }
  }
  const groups = Array.from(map.values())
  groups.sort((a, b) => a.date.getTime() - b.date.getTime())
  for (const group of groups) {
    group.events.sort((a, b) => a.start.getTime() - b.start.getTime())
  }
  return groups
}

export function CalendarAgendaView({ events, today, className }: CalendarAgendaViewProps) {
  const groups = groupEvents(events)
  const classes = [styles.view, className].filter(Boolean).join(" ")

  return (
    <div className={classes}>
      <header className={styles.head}>
        <span className={styles.kicker}>Agenda</span>
        <strong className={styles.title}>Upcoming schedule</strong>
        <span className={styles.summary}>
          {events.length} events · {groups.length} days
        </span>
      </header>
      <div className={styles.scroller}>
        {groups.map((group) => {
          const isToday = sameDay(group.date, today)
          return (
            <section key={group.date.toISOString()} className={styles.group}>
              <header className={styles.groupHead} data-today={isToday ? "true" : undefined}>
                <strong>{formatLongDate(group.date)}</strong>
                <span>{group.events.length} events</span>
              </header>
              <ul className={styles.list}>
                {group.events.map((event) => (
                  <li
                    key={event.id}
                    className={styles.item}
                    data-tone={event.tone ?? "neutral"}
                  >
                    <span className={styles.time}>{formatRange(event.start, event.end)}</span>
                    <div className={styles.body}>
                      <strong>{event.title}</strong>
                      <span>
                        {event.bay ? event.bay : ""}
                        {event.bay && event.technician ? " · " : ""}
                        {event.technician ? `with ${event.technician}` : ""}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          )
        })}
      </div>
    </div>
  )
}

export default CalendarAgendaView
