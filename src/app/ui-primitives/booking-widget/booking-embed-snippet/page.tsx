import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { BookingEmbedSnippet } from "../../components/booking-widget"
import styles from "../booking-widget.module.css"

export const metadata: Metadata = {
  title: "Booking embed snippet | UI Primitives — Booking widget",
}

export default function Page() {
  return (
    <main className={styles.page}>
      <PageHeader
        kicker="22.08 / Booking widget"
        title="Booking embed snippet"
        description="Tabbed code generator for the embed flavour — iframe, popup or inline — that a partner site drops into their HTML."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Booking widget", href: "/ui-primitives/booking-widget" },
          { label: "Booking embed snippet" },
        ]}
      />
      <section className={styles.canvas}>
        <BookingEmbedSnippet bookingUrl="https://oakflats.mufflermen.com.au/book" />
        <div className={styles.note}>
          <span>Behaviour</span>
          <p>
            Toggling the customize-styling switch flips the snippet to include
            data-theme and data-accent attributes so partners can override the
            brand red with their own.
          </p>
        </div>
      </section>
    </main>
  )
}
