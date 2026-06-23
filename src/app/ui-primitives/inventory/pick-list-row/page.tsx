import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { PickListRow } from "../../components/inventory"

import { PICK_ROWS } from "../fixtures"
import styles from "../inventory.module.css"

export const metadata: Metadata = {
  title: "Pick list row | Inventory",
  description:
    "Primitive 07 — Pick list row. SKU, qty, bin location chip, pick-status chip in a semantic table row.",
}

export default function PickListRowPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 07 / Pick"
        title="Pick list row"
        description="Semantic table row — SKU, qty, BinLocationChip and a tone-coded pick-status chip. Drop into any pick-list table."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Inventory", href: "/ui-primitives/inventory" },
          { label: "Pick list row" },
        ]}
      />
      <section className={styles.stageFrame}>
        <table className={styles.pickTable} aria-label="Pick list rows showcase">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">SKU</th>
              <th scope="col">Qty</th>
              <th scope="col">Bin</th>
              <th scope="col">Status</th>
            </tr>
          </thead>
          <tbody>
            {PICK_ROWS.map((row) => (
              <PickListRow key={row.sku} {...row} />
            ))}
          </tbody>
        </table>
      </section>
    </main>
  )
}
