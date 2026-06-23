import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import styles from "../booking-widget.module.css"
import { FullBookingFlowShowcase } from "./showcase"

export const metadata: Metadata = {
  title: "Full booking flow | UI Primitives — Booking widget",
}

export default function Page() {
  return (
    <main className={styles.page}>
      <PageHeader
        kicker="22 / Booking widget — composition"
        title="Full booking flow"
        description="The 14 booking widget primitives stitched into a single five-step booking journey, with the no-show policy as the footer."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Booking widget", href: "/ui-primitives/booking-widget" },
          { label: "Full booking flow" },
        ]}
      />
      <section className={styles.canvas}>
        <FullBookingFlowShowcase />
        <div className={styles.note}>
          <span>Composition</span>
          <p>
            Step 1 — service. Step 2 — date + time. Step 3 — duration + add-ons.
            Step 4 — customer details. Step 5 — confirmation. The no-show policy
            card pinned underneath for transparency before submit.
          </p>
        </div>
      </section>
    </main>
  )
}
