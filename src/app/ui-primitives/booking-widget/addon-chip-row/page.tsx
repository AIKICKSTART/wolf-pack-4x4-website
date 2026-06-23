import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import styles from "../booking-widget.module.css"
import { AddonChipRowShowcase } from "./showcase"

export const metadata: Metadata = {
  title: "Add-on chip row | UI Primitives — Booking widget",
}

export default function Page() {
  return (
    <main className={styles.page}>
      <PageHeader
        kicker="22.05 / Booking widget"
        title="Add-on chip row"
        description="Optional extras the customer toggles before submitting. Live total chip surfaces the price impact as they go."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Booking widget", href: "/ui-primitives/booking-widget" },
          { label: "Add-on chip row" },
        ]}
      />
      <section className={styles.canvas}>
        <AddonChipRowShowcase />
        <div className={styles.note}>
          <span>Behaviour</span>
          <p>
            Each chip is a label-wrapped checkbox with a visible custom box. Total
            in the header updates with each toggle. Native checkboxes carry the
            real state for keyboard and assistive tech.
          </p>
        </div>
      </section>
    </main>
  )
}
