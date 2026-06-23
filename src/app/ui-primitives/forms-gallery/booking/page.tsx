import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { BookingForm } from "../../components/forms-gallery/booking-form"

import styles from "../forms-gallery.module.css"

export const metadata: Metadata = {
  title: "Booking form | Forms Gallery",
  description:
    "Pattern 02 — bay booking with month-grid date picker, slot chips, drop / wait toggle, and callback option.",
}

export default function BookingFormScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Pattern 02 / Booking"
        title="Booking form"
        description="Reserve a workshop bay — rego, month-grid date picker, slot selection, drop versus wait, and callback preference."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Forms gallery", href: "/ui-primitives/forms-gallery" },
          { label: "Booking" },
        ]}
      />
      <BookingForm />
    </main>
  )
}
