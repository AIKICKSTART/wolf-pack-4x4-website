import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { BookingConfirmationCard } from "../../components/booking-widget"
import styles from "../booking-widget.module.css"
import { SAMPLE_CONFIRMATION } from "../sample-data"

export const metadata: Metadata = {
  title: "Booking confirmation card | UI Primitives — Booking widget",
}

export default function Page() {
  return (
    <main className={styles.page}>
      <PageHeader
        kicker="22.07 / Booking widget"
        title="Booking confirmation card"
        description="Final confirmation surface with reference, service, when, bay, customer, three add-to-calendar buttons, and a reference QR for the bay reception."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Booking widget", href: "/ui-primitives/booking-widget" },
          { label: "Booking confirmation card" },
        ]}
      />
      <section className={styles.canvas}>
        <BookingConfirmationCard confirmation={SAMPLE_CONFIRMATION} />
        <div className={styles.note}>
          <span>Behaviour</span>
          <p>
            Renders with role=&quot;status&quot; and aria-live=&quot;polite&quot;
            so screen readers announce the confirmation. A faux SVG QR is drawn
            client-side from the booking id; consumers pass qrUrl to swap in a
            real image.
          </p>
        </div>
      </section>
    </main>
  )
}
