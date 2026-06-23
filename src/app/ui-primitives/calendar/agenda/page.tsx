import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { CalendarAgendaView } from "../../components/calendar"
import type { AgendaEvent } from "../../components/calendar"
import styles from "../calendar.module.css"

export const metadata: Metadata = {
  title: "Agenda view | UI Primitives — Calendar",
}

const TODAY = new Date(2026, 4, 28)

function at(day: number, hour: number, minute = 0): Date {
  return new Date(2026, 4, day, hour, minute)
}

const events: ReadonlyArray<AgendaEvent> = [
  {
    id: "a1",
    start: at(28, 8, 30),
    end: at(28, 10, 30),
    title: "Bay 1 — VE Commodore cat-back",
    tone: "red",
    bay: "Bay 1",
    technician: "Owen Pirelli",
  },
  {
    id: "a2",
    start: at(28, 10, 30),
    end: at(28, 11, 30),
    title: "Hand-over — Hilux N80",
    tone: "green",
    bay: "Reception",
    technician: "Mick (counter)",
  },
  {
    id: "a3",
    start: at(28, 12, 0),
    end: at(28, 13, 0),
    title: "ADR inspection visit — ADR 80/13",
    tone: "amber",
    bay: "Bay 3",
    technician: "Levi Tate",
  },
  {
    id: "a4",
    start: at(28, 13, 0),
    end: at(28, 17, 0),
    title: "Bay 1 — Hilux cat-back fitup",
    tone: "red",
    bay: "Bay 1",
    technician: "Owen Pirelli",
  },
  {
    id: "a5",
    start: at(28, 14, 0),
    end: at(28, 16, 0),
    title: "Dyno hour — Pacemaker LS3",
    tone: "teal",
    bay: "Dyno",
    technician: "Mickey Lin",
  },
  {
    id: "a6",
    start: at(29, 7, 30),
    end: at(29, 10, 0),
    title: "Stocktake — XForce SKUs",
    tone: "neutral",
    bay: "Storeroom",
    technician: "Counter team",
  },
  {
    id: "a7",
    start: at(29, 10, 30),
    end: at(29, 15, 30),
    title: "Bay 2 — Patrol Y62 twin 3in fitment",
    tone: "red",
    bay: "Bay 2",
    technician: "Levi Tate",
  },
  {
    id: "a8",
    start: at(29, 13, 0),
    end: at(29, 14, 0),
    title: "Pickup — Magnaflow MFG-405 (Aileen)",
    tone: "green",
    bay: "Reception",
    technician: "Mick (counter)",
  },
  {
    id: "a9",
    start: at(30, 9, 0),
    end: at(30, 12, 0),
    title: "Bay 3 — LandCruiser 79 headers",
    tone: "red",
    bay: "Bay 3",
    technician: "Owen + Levi",
  },
  {
    id: "a10",
    start: at(30, 13, 30),
    end: at(30, 14, 30),
    title: "WHS audit recap with Beachhead",
    tone: "teal",
    bay: "Office",
    technician: "Daniel F.",
  },
  {
    id: "a11",
    start: at(31, 8, 0),
    end: at(31, 12, 30),
    title: "Bay 1 — Mustang GT cat-back",
    tone: "red",
    bay: "Bay 1",
    technician: "Owen Pirelli",
  },
]

export default function CalendarAgendaShowcase() {
  return (
    <main className={styles.page}>
      <PageHeader
        kicker="14.04 / Calendar"
        title="Agenda view — multi-day list"
        description="Vertical agenda grouped by date with sticky day headers, per-day event count, and tone-tinted rows so the floor can scan the next four days at a glance."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Calendar", href: "/ui-primitives/calendar" },
          { label: "Agenda view" },
        ]}
      />
      <section className={styles.canvas}>
        <CalendarAgendaView events={events} today={TODAY} />
        <div className={styles.note}>
          <span>Behaviour</span>
          <p>
            Day headers stick to the top of the scroll container as users move
            through the list. Today gets a red wash; other days remain neutral.
            Inside each day, events are pre-sorted by start time.
          </p>
        </div>
      </section>
    </main>
  )
}
