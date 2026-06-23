import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import styles from "../booking-widget.module.css"
import { BookingDateSelectorShowcase } from "./showcase"

export const metadata: Metadata = {
  title: "Booking date selector | UI Primitives — Booking widget",
}

export default function Page() {
  return (
    <main className={styles.page}>
      <PageHeader
        kicker="22.02 / Booking widget"
        title="Booking date selector"
        description="Horizontal scroll strip of bookable dates. Each tile shows the weekday + day + month plus an availability chip. Sunday is closed."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Booking widget", href: "/ui-primitives/booking-widget" },
          { label: "Booking date selector" },
        ]}
      />
      <section className={styles.canvas}>
        <BookingDateSelectorShowcase />
        <div className={styles.note}>
          <span>Behaviour</span>
          <p>
            Tiles snap to the strip and the chevrons scroll the strip by 220px.
            Closed Sundays and full days disable the tile; few-left amber chips
            kick in when three or fewer slots remain.
          </p>
        </div>
      </section>
    </main>
  )
}
