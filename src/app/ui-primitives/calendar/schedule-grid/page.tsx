import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { ScheduleGrid } from "../../components/calendar"
import type { ScheduleSlot } from "../../components/calendar"
import styles from "../calendar.module.css"

export const metadata: Metadata = {
  title: "Schedule grid | UI Primitives — Calendar",
}

const slots: ReadonlyArray<ScheduleSlot> = [
  // Monday
  { weekday: 1, hour: 8, state: "available" },
  { weekday: 1, hour: 9, state: "booked", label: "VE" },
  { weekday: 1, hour: 10, state: "booked", label: "VE" },
  { weekday: 1, hour: 11, state: "available" },
  { weekday: 1, hour: 12, state: "blocked" },
  { weekday: 1, hour: 13, state: "booked", label: "Hilux" },
  { weekday: 1, hour: 14, state: "booked", label: "Hilux" },
  { weekday: 1, hour: 15, state: "booked", label: "Hilux" },
  { weekday: 1, hour: 16, state: "available" },
  { weekday: 1, hour: 17, state: "available" },
  // Tuesday
  { weekday: 2, hour: 8, state: "available" },
  { weekday: 2, hour: 9, state: "booked", label: "PX3" },
  { weekday: 2, hour: 10, state: "booked", label: "PX3" },
  { weekday: 2, hour: 11, state: "booked", label: "PX3" },
  { weekday: 2, hour: 12, state: "blocked" },
  { weekday: 2, hour: 13, state: "available" },
  { weekday: 2, hour: 14, state: "available" },
  { weekday: 2, hour: 15, state: "blocked" },
  { weekday: 2, hour: 16, state: "available" },
  { weekday: 2, hour: 17, state: "available" },
  // Wednesday
  { weekday: 3, hour: 8, state: "booked", label: "LC79" },
  { weekday: 3, hour: 9, state: "booked", label: "LC79" },
  { weekday: 3, hour: 10, state: "booked", label: "LC79" },
  { weekday: 3, hour: 11, state: "booked", label: "LC79" },
  { weekday: 3, hour: 12, state: "blocked" },
  { weekday: 3, hour: 13, state: "available" },
  { weekday: 3, hour: 14, state: "booked", label: "Dyno" },
  { weekday: 3, hour: 15, state: "booked", label: "Dyno" },
  { weekday: 3, hour: 16, state: "available" },
  { weekday: 3, hour: 17, state: "available" },
  // Thursday (today)
  { weekday: 4, hour: 8, state: "booked", label: "Hilux" },
  { weekday: 4, hour: 9, state: "booked", label: "Hilux" },
  { weekday: 4, hour: 10, state: "available" },
  { weekday: 4, hour: 11, state: "booked", label: "ADR" },
  { weekday: 4, hour: 12, state: "blocked" },
  { weekday: 4, hour: 13, state: "booked", label: "Cat-back" },
  { weekday: 4, hour: 14, state: "booked", label: "Cat-back" },
  { weekday: 4, hour: 15, state: "booked", label: "Cat-back" },
  { weekday: 4, hour: 16, state: "booked", label: "Cat-back" },
  { weekday: 4, hour: 17, state: "available" },
  // Friday
  { weekday: 5, hour: 8, state: "available" },
  { weekday: 5, hour: 9, state: "booked", label: "Y62" },
  { weekday: 5, hour: 10, state: "booked", label: "Y62" },
  { weekday: 5, hour: 11, state: "booked", label: "Y62" },
  { weekday: 5, hour: 12, state: "blocked" },
  { weekday: 5, hour: 13, state: "booked", label: "Y62" },
  { weekday: 5, hour: 14, state: "available" },
  { weekday: 5, hour: 15, state: "available" },
  { weekday: 5, hour: 16, state: "available" },
  { weekday: 5, hour: 17, state: "available" },
  // Saturday
  { weekday: 6, hour: 8, state: "available" },
  { weekday: 6, hour: 9, state: "booked", label: "MS" },
  { weekday: 6, hour: 10, state: "booked", label: "MS" },
  { weekday: 6, hour: 11, state: "available" },
  { weekday: 6, hour: 12, state: "available" },
  // Sunday closed
  { weekday: 0, hour: 8, state: "blocked" },
  { weekday: 0, hour: 9, state: "blocked" },
  { weekday: 0, hour: 10, state: "blocked" },
  { weekday: 0, hour: 11, state: "blocked" },
  { weekday: 0, hour: 12, state: "blocked" },
  { weekday: 0, hour: 13, state: "blocked" },
  { weekday: 0, hour: 14, state: "blocked" },
  { weekday: 0, hour: 15, state: "blocked" },
  { weekday: 0, hour: 16, state: "blocked" },
  { weekday: 0, hour: 17, state: "blocked" },
]

export default function CalendarScheduleGridPage() {
  return (
    <main className={styles.page}>
      <PageHeader
        kicker="14.10 / Calendar"
        title="Schedule grid — weekly availability"
        description="Generic weekly slot grid for Bay 1 occupancy. Hours form rows, weekdays form columns. Click any cell to cycle available → booked → blocked → available."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Calendar", href: "/ui-primitives/calendar" },
          { label: "Schedule grid" },
        ]}
      />
      <section className={styles.canvas}>
        <ScheduleGrid slots={slots} startHour={8} endHour={18} />
        <div className={styles.note}>
          <span>Behaviour</span>
          <p>
            Cells cycle through three states on click. Booked cells display a short
            label (job code) where provided. Sunday is blocked end-to-end to reflect
            workshop closing days. Each cell uses an aria-label that combines
            weekday, hour, and state for screen readers.
          </p>
        </div>
      </section>
    </main>
  )
}
