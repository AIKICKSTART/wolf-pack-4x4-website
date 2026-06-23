import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"

import { AddressBookRowsDemo } from "../_interactive-demos"
import styles from "../customer-portal.module.css"

export const metadata: Metadata = {
  title: "Address book row | Customer portal",
  description:
    "Primitive 10 — saved address row with use chip, default flag, edit + remove buttons — three states.",
}

export default function AddressBookRowScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 10 / Address book row"
        title="Saved address row"
        description="Mick's default home address (Albion Park Rail), a delivery address (BHP site gate, no remove button), and the billing address with edit + remove available."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Customer portal", href: "/ui-primitives/customer-portal" },
          { label: "Address book row" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive · 3 states</span>
        <AddressBookRowsDemo />
      </section>
    </main>
  )
}
