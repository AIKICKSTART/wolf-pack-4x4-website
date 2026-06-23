import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { CalendarDayView } from "../../components/calendar"
import type { DayEvent } from "../../components/calendar"
import styles from "../calendar.module.css"

export const metadata: Metadata = {
  title: "Day view | UI Primitives — Calendar",
}

const TODAY = new Date(2026, 4, 28)

function at(hour: number, minute = 0): Date {
  return new Date(2026, 4, 28, hour, minute)
}

const events: ReadonlyArray<DayEvent> = [
  {
    id: "d1",
    title: "Bay 1 — VE Commodore cat-back",
    start: at(8, 30),
    end: at(10, 30),
    tone: "red",
    bay: "Bay 1 · Owen + Levi",
  },
  {
    id: "d2",
    title: "Counter walk-in window",
    start: at(9, 0),
    end: at(11, 0),
    tone: "teal",
    bay: "Reception",
  },
  {
    id: "d3",
    title: "Hand-over — Hilux N80",
    start: at(10, 30),
    end: at(11, 30),
    tone: "green",
    bay: "Customer pickup",
  },
  {
    id: "d4",
    title: "ADR inspection visit",
    start: at(12, 0),
    end: at(13, 0),
    tone: "amber",
    bay: "Bay 3 · ADR 80/13",
  },
  {
    id: "d5",
    title: "Bay 1 — Hilux cat-back fitup",
    start: at(13, 0),
    end: at(17, 0),
    tone: "red",
    bay: "Bay 1 · Owen",
  },
  {
    id: "d6",
    title: "Dyno hour — Pacemaker tune",
    start: at(14, 0),
    end: at(16, 0),
    tone: "teal",
    bay: "Dyno · Mickey",
  },
  {
    id: "d7",
    title: "End-of-day floor brief",
    start: at(17, 30),
    end: at(18, 0),
    tone: "neutral",
    bay: "All hands · workshop floor",
  },
]

export default function CalendarDayShowcase() {
  return (
    <main className={styles.page}>
      <PageHeader
        kicker="14.03 / Calendar"
        title="Day view — bay floor timeline"
        description="Single-day timeline with hourly rows, a half-hour divider line, and event rows stacked inline with a time chip. Open hours display a faint guide line and an em-dash open marker."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Calendar", href: "/ui-primitives/calendar" },
          { label: "Day view" },
        ]}
      />
      <section className={styles.canvas}>
        <CalendarDayView date={TODAY} today={TODAY} events={events} startHour={7} endHour={19} />
        <div className={styles.note}>
          <span>Behaviour</span>
          <p>
            Events are grouped under the hour they start in. Long events expand
            visually by stacking — each one keeps its true start/end on its time chip
            for unambiguous scheduling. Empty hours render the open marker.
          </p>
        </div>
      </section>
    </main>
  )
}
