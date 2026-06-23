import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import styles from "../booking-widget.module.css"
import { CancellationFlowShowcase } from "./showcase"

export const metadata: Metadata = {
  title: "Cancellation flow | UI Primitives — Booking widget",
}

export default function Page() {
  return (
    <main className={styles.page}>
      <PageHeader
        kicker="22.13 / Booking widget"
        title="Cancellation flow"
        description="Three-step cancellation — pick a reason, review the policy with the refund-window chip, then confirm. Outside-window cancels surface a warning."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Booking widget", href: "/ui-primitives/booking-widget" },
          { label: "Cancellation flow" },
        ]}
      />
      <section className={styles.canvas}>
        <CancellationFlowShowcase />
        <div className={styles.note}>
          <span>Behaviour</span>
          <p>
            The flow keeps state in the parent so back / continue work cleanly.
            The refund window drives both the green free-cancel chip and the
            red outside-window warning paragraph.
          </p>
        </div>
      </section>
    </main>
  )
}
