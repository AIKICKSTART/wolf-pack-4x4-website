import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import styles from "../booking-widget.module.css"
import { CustomerDetailsFormShowcase } from "./showcase"

export const metadata: Metadata = {
  title: "Customer details form | UI Primitives — Booking widget",
}

export default function Page() {
  return (
    <main className={styles.page}>
      <PageHeader
        kicker="22.06 / Booking widget"
        title="Customer details form"
        description="Embedded mini-form for the final step. Sized for the widget — not the full workshop intake."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Booking widget", href: "/ui-primitives/booking-widget" },
          { label: "Customer details form" },
        ]}
      />
      <section className={styles.canvas}>
        <CustomerDetailsFormShowcase />
        <div className={styles.note}>
          <span>Behaviour</span>
          <p>
            Controlled component — the parent owns the values. autoComplete
            tokens are wired so iOS / Android pre-fills work. The notes field is
            vertical-resize only to protect the widget layout.
          </p>
        </div>
      </section>
    </main>
  )
}
