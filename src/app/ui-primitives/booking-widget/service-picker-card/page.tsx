import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import styles from "../booking-widget.module.css"
import { ServicePickerShowcase } from "./showcase"

export const metadata: Metadata = {
  title: "Service picker card | UI Primitives — Booking widget",
}

export default function Page() {
  return (
    <main className={styles.page}>
      <PageHeader
        kicker="22.01 / Booking widget"
        title="Service picker card"
        description="Selectable service tile inside the embedded widget. Brand rail tints per service tone, with duration, price and bay-capacity chips along the bottom."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Booking widget", href: "/ui-primitives/booking-widget" },
          { label: "Service picker card" },
        ]}
      />
      <section className={styles.canvas}>
        <ServicePickerShowcase />
        <div className={styles.note}>
          <span>Behaviour</span>
          <p>
            The card is a radio inside a parent role=&quot;radiogroup&quot;. The
            tile responds to hover with a 1px lift; selecting pops the brand-coloured
            rail and shows a check mark. Reduced-motion users see no transform.
          </p>
        </div>
      </section>
    </main>
  )
}
