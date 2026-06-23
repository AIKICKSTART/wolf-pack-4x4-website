import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import styles from "../booking-widget.module.css"
import { TimeZoneSelectorShowcase } from "./showcase"

export const metadata: Metadata = {
  title: "Time zone selector | UI Primitives — Booking widget",
}

export default function Page() {
  return (
    <main className={styles.page}>
      <PageHeader
        kicker="22.09 / Booking widget"
        title="Time zone selector"
        description="Searchable list of supported time zones for interstate and overseas customers, with the workshop's local zone surfaced as a chip."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Booking widget", href: "/ui-primitives/booking-widget" },
          { label: "Time zone selector" },
        ]}
      />
      <section className={styles.canvas}>
        <TimeZoneSelectorShowcase />
        <div className={styles.note}>
          <span>Behaviour</span>
          <p>
            Filter matches against city, country, and IANA id substrings. The
            current zone chip stays pinned in the header so customers can confirm
            their selection without scrolling back.
          </p>
        </div>
      </section>
    </main>
  )
}
