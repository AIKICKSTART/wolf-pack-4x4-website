import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import styles from "../booking-widget.module.css"
import { TimeSlotGridShowcase } from "./showcase"

export const metadata: Metadata = {
  title: "Time slot grid | UI Primitives — Booking widget",
}

export default function Page() {
  return (
    <main className={styles.page}>
      <PageHeader
        kicker="22.03 / Booking widget"
        title="Time slot grid"
        description="AM and PM banded grid of bookable time slots. Slots are coloured by availability and the AM/PM split lines up with how customers actually plan their day."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Booking widget", href: "/ui-primitives/booking-widget" },
          { label: "Time slot grid" },
        ]}
      />
      <section className={styles.canvas}>
        <TimeSlotGridShowcase />
        <div className={styles.note}>
          <span>Behaviour</span>
          <p>
            Implements role=&quot;grid&quot; with aria-rowindex on the AM / PM
            bands. Slot buttons advertise aria-selected so screen readers track
            the choice. Closed and full slots are non-interactive.
          </p>
        </div>
      </section>
    </main>
  )
}
