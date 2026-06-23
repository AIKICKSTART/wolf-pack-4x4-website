import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { AvailabilityGrid } from "../../components/calendar"
import type { BayRow } from "../../components/calendar"
import styles from "../calendar.module.css"

export const metadata: Metadata = {
  title: "Availability grid | UI Primitives — Calendar",
}

const bays: ReadonlyArray<BayRow> = [
  {
    id: "B1",
    label: "Bay 1 · weld",
    hours: [
      "free",
      "busy",
      "busy",
      "busy",
      "blocked",
      "busy",
      "busy",
      "busy",
      "busy",
      "free",
      "free",
    ],
  },
  {
    id: "B2",
    label: "Bay 2 · fitup",
    hours: [
      "free",
      "busy",
      "busy",
      "busy",
      "blocked",
      "free",
      "busy",
      "busy",
      "busy",
      "free",
      "free",
    ],
  },
  {
    id: "B3",
    label: "Bay 3 · ADR",
    hours: [
      "busy",
      "busy",
      "busy",
      "busy",
      "blocked",
      "busy",
      "free",
      "free",
      "free",
      "free",
      "free",
    ],
  },
  {
    id: "DYN",
    label: "Dyno cell",
    hours: [
      "maintenance",
      "maintenance",
      "maintenance",
      "free",
      "blocked",
      "free",
      "busy",
      "busy",
      "free",
      "free",
      "free",
    ],
  },
  {
    id: "ALG",
    label: "Alignment rack",
    hours: [
      "free",
      "free",
      "busy",
      "free",
      "blocked",
      "busy",
      "free",
      "free",
      "busy",
      "free",
      "free",
    ],
  },
  {
    id: "STR",
    label: "Counter store",
    hours: [
      "busy",
      "busy",
      "busy",
      "busy",
      "blocked",
      "busy",
      "busy",
      "busy",
      "busy",
      "busy",
      "free",
    ],
  },
]

export default function CalendarAvailabilityPage() {
  return (
    <main className={styles.page}>
      <PageHeader
        kicker="14.12 / Calendar"
        title="Availability grid — workshop bays"
        description="Workshop bay availability across the trading day. Rows are bays; columns are hours from 07:00 to 17:00. Each cell shows occupancy: free, busy, blocked, or in maintenance."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Calendar", href: "/ui-primitives/calendar" },
          { label: "Availability grid" },
        ]}
      />
      <section className={styles.canvas}>
        <AvailabilityGrid bays={bays} startHour={7} endHour={18} />
        <div className={styles.note}>
          <span>Behaviour</span>
          <p>
            Maintenance cells use a teal diagonal hatch so they are distinguishable
            from blocked cells (solid amber). The grid is read-only — for an
            interactive scheduling surface, prefer the schedule-grid primitive
            instead.
          </p>
        </div>
      </section>
    </main>
  )
}
