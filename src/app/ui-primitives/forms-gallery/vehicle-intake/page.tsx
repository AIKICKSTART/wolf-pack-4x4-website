import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { VehicleIntakeForm } from "../../components/forms-gallery/vehicle-intake-form"

import styles from "../forms-gallery.module.css"

export const metadata: Metadata = {
  title: "Vehicle intake form | Forms Gallery",
  description:
    "Pattern 03 — vehicle intake form with rego lookup, cascading vehicle selects, fuel chips, and a 4-slot photo tray.",
}

export default function VehicleIntakeScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Pattern 03 / Vehicle intake"
        title="Vehicle intake form"
        description="Run a quick rego lookup, then confirm vehicle profile, fuel type, photo tray, and notes."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Forms gallery", href: "/ui-primitives/forms-gallery" },
          { label: "Vehicle intake" },
        ]}
      />
      <VehicleIntakeForm />
    </main>
  )
}
