import type { Metadata } from "next"
import { Cog, Flag, Wrench } from "lucide-react"

import { PageHeader } from "../../components/page-header"
import { EventCard } from "../../components/calendar"
import styles from "../calendar.module.css"

export const metadata: Metadata = {
  title: "Event card | UI Primitives — Calendar",
}

const TODAY = new Date(2026, 4, 28)

function at(hour: number, minute = 0): Date {
  return new Date(2026, 4, 28, hour, minute)
}

export default function CalendarEventCardPage() {
  return (
    <main className={styles.page}>
      <PageHeader
        kicker="14.11 / Calendar"
        title="Event card — workshop slot"
        description="Inline event card with compact and expanded variants. Used standalone in agendas and embedded inside week/month cells when space allows."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Calendar", href: "/ui-primitives/calendar" },
          { label: "Event card" },
        ]}
      />
      <section className={styles.canvas}>
        <div className={styles.row}>
          <EventCard
            title="Bay 1 — VE Commodore cat-back"
            start={at(8, 30)}
            end={at(10, 30)}
            tone="red"
            icon={<Wrench size={14} strokeWidth={2.4} aria-hidden="true" />}
            location="Bay 1 · workshop floor"
            description="Custom 2.5in stainless cat-back with twin mufflers. Owen leads; Levi assists."
            attendees={[
              { name: "Owen Pirelli" },
              { name: "Levi Tate" },
            ]}
          />
          <EventCard
            title="ADR inspection — Hilux N80"
            start={at(12, 0)}
            end={at(13, 0)}
            tone="amber"
            icon={<Flag size={14} strokeWidth={2.4} aria-hidden="true" />}
            location="Bay 3"
            attendees={[
              { name: "Levi Tate" },
              { name: "Daniel F." },
              { name: "ADR Inspector" },
              { name: "Mick" },
              { name: "Owner" },
            ]}
          />
          <EventCard
            title="Dyno hour — Pacemaker tune"
            start={at(14, 0)}
            end={at(16, 0)}
            tone="teal"
            icon={<Cog size={14} strokeWidth={2.4} aria-hidden="true" />}
            location="Dyno cell"
            description="Final pulls and AFR sweep for the LS3 build."
            attendees={[{ name: "Mickey Lin" }]}
          />
        </div>
        <div className={styles.row}>
          <EventCard
            title="Hand-over — VE Commodore"
            start={at(10, 30)}
            tone="green"
            variant="compact"
          />
          <EventCard
            title="Counter rush 14:00"
            start={at(14, 0)}
            tone="neutral"
            variant="compact"
          />
          <EventCard
            title="Stocktake recap"
            start={at(17, 30)}
            tone="amber"
            variant="compact"
          />
          <EventCard
            title="Pickup — Magnaflow MFG-405"
            start={at(15, 0)}
            tone="teal"
            variant="compact"
          />
        </div>
        <div className={styles.note}>
          <span>Variants</span>
          <p>
            Expanded cards show title, time chip, description, location, attendee
            count, and an avatar stack with +N overflow. Compact cards strip
            everything except the title, time chip, and tone strip — useful inside
            week/month grid cells, today on {TODAY.toDateString()}.
          </p>
        </div>
      </section>
    </main>
  )
}
