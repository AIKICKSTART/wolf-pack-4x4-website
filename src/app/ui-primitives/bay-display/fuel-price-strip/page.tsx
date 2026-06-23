import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { FuelPriceStrip } from "../../components/bay-display"
import { FUEL_ROWS } from "../bay-display-mock"
import styles from "../bay-display.module.css"

export const metadata: Metadata = {
  title: "Fuel price strip | UI Primitives — Bay Display",
}

export default function FuelPriceStripPage() {
  return (
    <main className={styles.page}>
      <PageHeader
        kicker="42.06 / Bay display"
        title="Fuel price strip"
        description="Local fuel ticker for the waiting room — Albion Park Shell U91 sits at $1.96/L. Trend chip drives a left rail colour: red rising, green falling, amber steady."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Bay display", href: "/ui-primitives/bay-display" },
          { label: "Fuel price strip" },
        ]}
      />
      <section className={styles.canvas}>
        <FuelPriceStrip rows={FUEL_ROWS} asAt="as at 11:48 am" />
        <div className={styles.note}>
          <span>Behaviour</span>
          <p>
            Prices format to two decimal places. The trend left-rail makes the
            up/down direction legible from across the workshop without reading
            cents. Rows are deliberately wide so a glance lands on the price.
          </p>
        </div>
      </section>
    </main>
  )
}
