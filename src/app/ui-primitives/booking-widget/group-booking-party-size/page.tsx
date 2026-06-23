import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import styles from "../booking-widget.module.css"
import { GroupBookingShowcase } from "./showcase"

export const metadata: Metadata = {
  title: "Group booking party size | UI Primitives — Booking widget",
}

export default function Page() {
  return (
    <main className={styles.page}>
      <PageHeader
        kicker="22.11 / Booking widget"
        title="Group booking party size"
        description="For car-club mornings — a stepper drives per-person price, total, and the group discount when the threshold is hit."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Booking widget", href: "/ui-primitives/booking-widget" },
          { label: "Group booking party size" },
        ]}
      />
      <section className={styles.canvas}>
        <GroupBookingShowcase />
        <div className={styles.note}>
          <span>Behaviour</span>
          <p>
            Stepper buttons disable at the min and max. The group-discount chip
            appears once the party hits the threshold and the per-person price
            strikes through to show the saving.
          </p>
        </div>
      </section>
    </main>
  )
}
