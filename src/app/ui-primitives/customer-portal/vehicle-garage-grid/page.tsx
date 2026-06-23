import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"

import { VehicleGarageGridDemo } from "../_interactive-demos"
import styles from "../customer-portal.module.css"

export const metadata: Metadata = {
  title: "Vehicle garage grid | Customer portal",
  description:
    "Primitive 04 — saved-vehicles grid with rego, last service, due-soon flag, roadworthy expiry — three states.",
}

export default function VehicleGarageGridScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 04 / Vehicle garage grid"
        title="Saved-vehicles grid"
        description="Mick's two-vehicle garage (Hilux + Falcon BF), the full three-vehicle garage with the Hilux pre-selected for a follow-up booking, and an empty-state for a fresh sign-up."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Customer portal", href: "/ui-primitives/customer-portal" },
          { label: "Vehicle garage grid" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive · 3 states</span>
        <VehicleGarageGridDemo />
      </section>
    </main>
  )
}
