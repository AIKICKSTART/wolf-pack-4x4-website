import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { CalendarMonthView } from "../../components/calendar"
import type { MonthEvent } from "../../components/calendar"
import styles from "../calendar.module.css"

export const metadata: Metadata = {
  title: "Month view | UI Primitives — Calendar",
}

const TODAY = new Date(2026, 4, 28)

const events: ReadonlyArray<MonthEvent> = [
  { id: "m1", date: new Date(2026, 4, 1), title: "Bay 1 — VE Commodore cat-back", tone: "red" },
  { id: "m2", date: new Date(2026, 4, 4), title: "ADR check — Hilux N80", tone: "amber" },
  { id: "m3", date: new Date(2026, 4, 4), title: "Walk-in muffler quote", tone: "teal" },
  { id: "m4", date: new Date(2026, 4, 7), title: "Stocktake — XForce SKUs", tone: "neutral" },
  { id: "m5", date: new Date(2026, 4, 11), title: "Bay 2 — Ranger PX3 manifold", tone: "red" },
  { id: "m6", date: new Date(2026, 4, 11), title: "Pickup — Magnaflow MFG-405", tone: "green" },
  { id: "m7", date: new Date(2026, 4, 13), title: "Bay 3 — LandCruiser headers", tone: "red" },
  { id: "m8", date: new Date(2026, 4, 14), title: "Dyno hour — Pacemaker tune", tone: "teal" },
  { id: "m9", date: new Date(2026, 4, 14), title: "Counter sales close", tone: "amber" },
  { id: "m10", date: new Date(2026, 4, 18), title: "Insurance assessment", tone: "amber" },
  { id: "m11", date: new Date(2026, 4, 20), title: "Bay 1 — Mustang GT cat-back", tone: "red" },
  { id: "m12", date: new Date(2026, 4, 21), title: "Hand-over — Hilux N80", tone: "green" },
  { id: "m13", date: new Date(2026, 4, 25), title: "Bay 2 — Patrol Y62 fitment", tone: "red" },
  { id: "m14", date: new Date(2026, 4, 25), title: "ADR inspection visit", tone: "amber" },
  { id: "m15", date: new Date(2026, 4, 25), title: "WHS audit recap", tone: "teal" },
  { id: "m16", date: new Date(2026, 4, 25), title: "Counter rush 14:00", tone: "neutral" },
  { id: "m17", date: new Date(2026, 4, 26), title: "Bay 3 — Pacemaker LS3", tone: "red" },
  { id: "m18", date: new Date(2026, 4, 28), title: "Bay 1 — Hilux cat-back fitup", tone: "red" },
  { id: "m19", date: new Date(2026, 4, 28), title: "ADR final inspection", tone: "amber" },
  { id: "m20", date: new Date(2026, 4, 28), title: "Hand-over — VE Commodore", tone: "green" },
  { id: "m21", date: new Date(2026, 4, 29), title: "Genie Exhaust stock-in", tone: "teal" },
]

export default function CalendarMonthShowcase() {
  return (
    <main className={styles.page}>
      <PageHeader
        kicker="14.01 / Calendar"
        title="Month view — workshop overview"
        description="Full 7×6 month grid showing the May 2026 workshop calendar. Each cell stacks up to three event chips with an overflow indicator, and today is ringed in red."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Calendar", href: "/ui-primitives/calendar" },
          { label: "Month view" },
        ]}
      />
      <section className={styles.canvas}>
        <CalendarMonthView
          reference={TODAY}
          today={TODAY}
          events={events}
          caption="May 2026 · Oak Flats Mufflermen"
        />
        <div className={styles.note}>
          <span>Behaviour</span>
          <p>
            Cells outside the active month dim to 36% opacity. Today is marked with
            aria-current and a brand-red ring. Event chips truncate with ellipsis;
            anything beyond three events collapses into a +N more amber counter.
          </p>
        </div>
      </section>
    </main>
  )
}
