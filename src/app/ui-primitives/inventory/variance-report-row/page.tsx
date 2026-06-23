import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { VarianceReportRow } from "../../components/inventory"

import { VARIANCE_ROWS } from "../fixtures"
import styles from "../inventory.module.css"

export const metadata: Metadata = {
  title: "Variance report row | Inventory",
  description:
    "Primitive 10 — Variance report row with expected, actual, delta chip and suggested-action chip. aria-live for updates.",
}

export default function VarianceReportRowPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 10 / Variance"
        title="Variance report row"
        description="SKU + expected + actual + tone-coded delta chip + suggested-action chip. role=status with aria-live='polite' so screen readers announce changes."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Inventory", href: "/ui-primitives/inventory" },
          { label: "Variance report row" },
        ]}
      />
      <section className={styles.stageFrame}>
        <div className={styles.varianceStack}>
          {VARIANCE_ROWS.map((row) => (
            <VarianceReportRow key={row.sku} {...row} />
          ))}
        </div>
      </section>
    </main>
  )
}
