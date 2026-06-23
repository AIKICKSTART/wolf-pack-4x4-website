import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import styles from "../booking-widget.module.css"
import { RecurringBookingShowcase } from "./showcase"

export const metadata: Metadata = {
  title: "Recurring booking | UI Primitives — Booking widget",
}

export default function Page() {
  return (
    <main className={styles.page}>
      <PageHeader
        kicker="22.10 / Booking widget"
        title="Recurring booking option"
        description="For fleet customers who need a quarterly inspection cycle or a regular sound check — frequency chips, occurrence stepper, and an explicit end date."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Booking widget", href: "/ui-primitives/booking-widget" },
          { label: "Recurring booking" },
        ]}
      />
      <section className={styles.canvas}>
        <RecurringBookingShowcase />
        <div className={styles.note}>
          <span>Behaviour</span>
          <p>
            Frequency uses a radiogroup. Occurrences stepper clamps 1–52 and the
            end date is a native date input so it picks up locale-aware
            keyboards on mobile.
          </p>
        </div>
      </section>
    </main>
  )
}
