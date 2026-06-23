import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import styles from "../booking-widget.module.css"
import { RescheduleModalShowcase } from "./showcase"

export const metadata: Metadata = {
  title: "Reschedule modal | UI Primitives — Booking widget",
}

export default function Page() {
  return (
    <main className={styles.page}>
      <PageHeader
        kicker="22.12 / Booking widget"
        title="Reschedule modal"
        description="Surfaces the original booking, the new date + slot pickers, a reason chip set, and the confirm CTA. Reuses the date selector and time slot grid primitives."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Booking widget", href: "/ui-primitives/booking-widget" },
          { label: "Reschedule modal" },
        ]}
      />
      <section className={styles.canvas}>
        <RescheduleModalShowcase />
        <div className={styles.note}>
          <span>Behaviour</span>
          <p>
            Renders with role=&quot;dialog&quot; and aria-modal=&quot;true&quot;.
            The confirm CTA stays disabled until a new date and slot are picked
            so customers can&apos;t accidentally confirm a half-step.
          </p>
        </div>
      </section>
    </main>
  )
}
