import type { Metadata } from "next"
import Link from "next/link"

import { FormPatternReferences } from "../components/forms-system"
import { PageHeader } from "../components/page-header"
import styles from "./calendar.module.css"

export const metadata: Metadata = {
  title: "Calendar | UI Primitives",
}

interface PrimitiveEntry {
  index: string
  title: string
  href: string
  description: string
}

const primitives: ReadonlyArray<PrimitiveEntry> = [
  {
    index: "01",
    title: "Month view",
    href: "/ui-primitives/calendar/month",
    description:
      "Full 7×6 month grid with weekday strip, stacked event chips, overflow indicator, and a today ring tinted with the brand red.",
  },
  {
    index: "02",
    title: "Week view",
    href: "/ui-primitives/calendar/week",
    description:
      "Seven hourly columns 06:00 – 22:00 with absolute-positioned event blocks and a live now-line crossing the current hour.",
  },
  {
    index: "03",
    title: "Day view",
    href: "/ui-primitives/calendar/day",
    description:
      "Single-day timeline with hourly rows, 30-min half-row divider, inline event stack with title plus time chip, and faint guides for empty slots.",
  },
  {
    index: "04",
    title: "Agenda view",
    href: "/ui-primitives/calendar/agenda",
    description:
      "Vertical agenda list grouped by day with sticky day headers, per-day counts, and tone-tinted rows for fast triage.",
  },
  {
    index: "05",
    title: "Mini date picker",
    href: "/ui-primitives/calendar/date-picker",
    description:
      "Compact month picker with prev/next chevrons, weekday labels, and click-or-keyboard selection. Highlights today, selected, and range endpoints.",
  },
  {
    index: "06",
    title: "Date range picker",
    href: "/ui-primitives/calendar/date-range",
    description:
      "Side-by-side dual-month view bridged by a contiguous range fill, plus preset chips: Today, Yesterday, Last 7 days, This month, Last month, Custom.",
  },
  {
    index: "07",
    title: "Time picker",
    href: "/ui-primitives/calendar/time",
    description:
      "Scrollable hour and minute columns with a 12h/24h toggle. Selection moves with arrow keys; AM/PM chips appear in 12h mode.",
  },
  {
    index: "08",
    title: "Time range picker",
    href: "/ui-primitives/calendar/time-range",
    description:
      "Two time pickers side-by-side as From / To with a live duration readout and a visual invalid state when To is not greater than From.",
  },
  {
    index: "09",
    title: "Recurrence picker",
    href: "/ui-primitives/calendar/recurrence",
    description:
      "Every-N days/weeks/months with weekday-of-week chips, day-of-month entry for monthly, and end conditions: never, on date, or after N occurrences.",
  },
  {
    index: "10",
    title: "Schedule grid",
    href: "/ui-primitives/calendar/schedule-grid",
    description:
      "Generic weekly slot grid: rows are hours, columns are weekdays. Each cell cycles between available, booked, and blocked when tapped.",
  },
  {
    index: "11",
    title: "Event card",
    href: "/ui-primitives/calendar/event-card",
    description:
      "Inline event card used inside cells. Compact and expanded variants with title, time chip, attendees stack, location, and tone strip.",
  },
  {
    index: "12",
    title: "Availability grid",
    href: "/ui-primitives/calendar/availability",
    description:
      "Workshop bay availability across hours of the day. Each cell coloured by occupancy: free, busy, blocked, or in maintenance.",
  },
]

export default function CalendarIndexPage() {
  return (
    <main className={styles.page}>
      <PageHeader
        kicker="14 / Calendar"
        title="Scheduling, dates, times, bays"
        description="Composable calendar primitives covering everything the Oak Flats workshop has to schedule — month overview, daily bay timelines, range pickers for reporting windows, recurrence rules for ADR checks, and availability grids for live booking."
      />
      <FormPatternReferences
        ids={["calendar-scheduling", "booking", "roster-workshop-ops"]}
      />
      <section className={styles.section} aria-label="Calendar primitives index">
        <header className={styles.sectionHead}>
          <span className={styles.kicker}>Index · 12 primitives</span>
          <h2 className={styles.sectionTitle}>Pick a surface</h2>
          <p className={styles.subhead}>
            Each primitive renders full scale in its own sub-route with realistic
            Oak Flats domain data — bay jobs, fitment slots, ADR checks, and
            week-on-week handovers.
          </p>
        </header>
        <div className={styles.grid}>
          {primitives.map((primitive) => (
            <Link key={primitive.href} className={styles.thumb} href={primitive.href}>
              <span className={styles.thumbIndex}>{primitive.index}</span>
              <h3 className={styles.thumbTitle}>{primitive.title}</h3>
              <p className={styles.thumbCopy}>{primitive.description}</p>
              <span className={styles.thumbFoot}>
                Inspect primitive states <span aria-hidden="true">→</span>
              </span>
            </Link>
          ))}
        </div>
      </section>
    </main>
  )
}
