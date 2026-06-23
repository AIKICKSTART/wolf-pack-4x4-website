import type { Metadata } from "next"

import { EventCard } from "../../components/landing-pages"
import { PageHeader } from "../../components/page-header"

import { EVENTS } from "../_mock-data"
import styles from "../landing-pages.module.css"

export const metadata: Metadata = {
  title: "Event card | Landing Pages",
  description: "Primitive 13 — upcoming event card with date tile, capacity bar, and RSVP CTA.",
}

export default function EventCardPage() {
  const dyno = EVENTS[0]!
  const manta = EVENTS[1]!
  const falcon = EVENTS[2]!

  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 13 / Event card"
        title="Event card"
        description="Upcoming event card. Three states: Dyno Tuesday (weekly), Manta launch (single-day), and Falcon Nationals (multi-day)."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Landing pages", href: "/ui-primitives/landing-pages" },
          { label: "Event card" },
        ]}
      />

      <span className={styles.stageCaption}>State · Weekly recurring (Dyno Tuesday)</span>
      <EventCard event={dyno} rsvpLabel="Reserve slot" />

      <span className={styles.stageCaption}>State · Single-day launch (Manta)</span>
      <EventCard event={manta} />

      <span className={styles.stageCaption}>State · Multi-day meet (Falcon Nationals)</span>
      <EventCard event={falcon} rsvpLabel="Register for the weekend" />
    </main>
  )
}
