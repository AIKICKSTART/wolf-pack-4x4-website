import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import styles from "../booking-widget.module.css"
import { DurationPickerShowcase } from "./showcase"

export const metadata: Metadata = {
  title: "Duration picker | UI Primitives — Booking widget",
}

export default function Page() {
  return (
    <main className={styles.page}>
      <PageHeader
        kicker="22.04 / Booking widget"
        title="Duration picker"
        description="Five-chip duration picker with per-duration AUD pricing. Used for hourly-rate services where the customer self-selects how long they need."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Booking widget", href: "/ui-primitives/booking-widget" },
          { label: "Duration picker" },
        ]}
      />
      <section className={styles.canvas}>
        <DurationPickerShowcase />
        <div className={styles.note}>
          <span>Behaviour</span>
          <p>
            Implements role=&quot;radiogroup&quot; with aria-checked on each chip.
            Chips lift by 1px on hover and the selected chip uses the amber tone
            with a soft shadow.
          </p>
        </div>
      </section>
    </main>
  )
}
