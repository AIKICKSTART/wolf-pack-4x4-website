import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { VehicleQueueRail } from "../../components/bay-display"
import { QUEUE_ROWS } from "../bay-display-mock"
import styles from "../bay-display.module.css"

export const metadata: Metadata = {
  title: "Vehicle queue rail | UI Primitives — Bay Display",
}

export default function VehicleQueueRailPage() {
  return (
    <main className={styles.page}>
      <PageHeader
        kicker="42.02 / Bay display"
        title="Vehicle queue rail"
        description="Horizontal rail of the next vehicles coming through the bays. Up-next gets a red rim and a pulse-priority chip, soon gets amber, later stays neutral."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Bay display", href: "/ui-primitives/bay-display" },
          { label: "Vehicle queue rail" },
        ]}
      />
      <section className={styles.canvas}>
        <VehicleQueueRail entries={QUEUE_ROWS} />
        <div className={styles.note}>
          <span>Behaviour</span>
          <p>
            Position drives the card border and the chip tone. Waiting minutes
            only show after a customer has walked in; pre-arrival cards show
            the booked time instead. The rail scrolls horizontally on screens
            narrower than the natural sum of cards.
          </p>
        </div>
      </section>
    </main>
  )
}
