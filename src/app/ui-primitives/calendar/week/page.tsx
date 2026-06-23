import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { CalendarWeekView } from "../../components/calendar"
import type { WeekEvent } from "../../components/calendar"
import styles from "../calendar.module.css"

export const metadata: Metadata = {
  title: "Week view | UI Primitives — Calendar",
}

const TODAY = new Date(2026, 4, 28, 10, 38)

function at(day: number, hour: number, minute = 0): Date {
  return new Date(2026, 4, day, hour, minute)
}

const events: ReadonlyArray<WeekEvent> = [
  {
    id: "w1",
    title: "Bay 1 — VE Commodore cat-back",
    start: at(25, 8, 30),
    end: at(25, 12, 0),
    tone: "red",
    sub: "Owen + Levi · Magnaflow MFG-405",
  },
  {
    id: "w2",
    title: "ADR inspection — Hilux N80",
    start: at(25, 13, 30),
    end: at(25, 15, 0),
    tone: "amber",
    sub: "Bay 3 · ADR 80/13",
  },
  {
    id: "w3",
    title: "Counter walk-ins",
    start: at(26, 9, 0),
    end: at(26, 11, 0),
    tone: "teal",
    sub: "Reception · open",
  },
  {
    id: "w4",
    title: "Bay 2 — Ranger PX3 manifold",
    start: at(26, 11, 0),
    end: at(26, 16, 30),
    tone: "red",
    sub: "Owen · headers + downpipe",
  },
  {
    id: "w5",
    title: "Dyno hour — Pacemaker tune",
    start: at(27, 14, 0),
    end: at(27, 16, 0),
    tone: "teal",
    sub: "Mickey on rollers",
  },
  {
    id: "w6",
    title: "Bay 3 — LandCruiser 79 headers",
    start: at(27, 8, 0),
    end: at(27, 12, 30),
    tone: "red",
    sub: "Levi · 5-into-1 stainless",
  },
  {
    id: "w7",
    title: "Hand-over — Hilux N80",
    start: at(28, 10, 30),
    end: at(28, 11, 30),
    tone: "green",
    sub: "Customer pickup",
  },
  {
    id: "w8",
    title: "Bay 1 — Hilux cat-back fitup",
    start: at(28, 13, 0),
    end: at(28, 17, 0),
    tone: "red",
    sub: "Owen · finish weld",
  },
  {
    id: "w9",
    title: "ADR inspection visit",
    start: at(28, 12, 0),
    end: at(28, 13, 0),
    tone: "amber",
    sub: "ADR 80/13 walkthrough",
  },
  {
    id: "w10",
    title: "Stocktake — XForce SKUs",
    start: at(29, 7, 30),
    end: at(29, 10, 0),
    tone: "neutral",
    sub: "Counter team",
  },
  {
    id: "w11",
    title: "Bay 2 — Patrol Y62 fitment",
    start: at(29, 10, 30),
    end: at(29, 15, 30),
    tone: "red",
    sub: "Levi · twin 3in",
  },
]

export default function CalendarWeekShowcase() {
  return (
    <main className={styles.page}>
      <PageHeader
        kicker="14.02 / Calendar"
        title="Week view — bay timeline"
        description="Seven-day timeline columns with absolute-positioned event blocks. The red now-line tracks the current hour so floor leads always know where the day is at."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Calendar", href: "/ui-primitives/calendar" },
          { label: "Week view" },
        ]}
      />
      <section className={styles.canvas}>
        <CalendarWeekView reference={TODAY} today={TODAY} events={events} startHour={6} endHour={19} />
        <div className={styles.note}>
          <span>Behaviour</span>
          <p>
            Each event positions itself by percentage of the visible day. The now-line
            renders inside the today column with a glowing red dot anchor. Mixed
            tones surface job type at a glance: red = workshop bays, amber = ADR,
            teal = counter or dyno, green = handover, neutral = admin.
          </p>
        </div>
      </section>
    </main>
  )
}
