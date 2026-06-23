import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { WarehouseLocationGrid } from "../../components/inventory"

import { AISLES } from "../fixtures"
import styles from "../inventory.module.css"

export const metadata: Metadata = {
  title: "Warehouse location grid | Inventory",
  description:
    "Primitive 05 — Aisle × bay grid with density tone-coding. role=region for screen readers, grid cells with aria-label.",
}

export default function WarehouseLocationGridPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 05 / Map"
        title="Warehouse location grid"
        description="Aisle × bay grid with SKU density colour bands. region semantics, gridcells expose density + SKU count to AT."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Inventory", href: "/ui-primitives/inventory" },
          { label: "Warehouse location grid" },
        ]}
      />
      <section className={styles.stageFrame}>
        <WarehouseLocationGrid
          warehouseName="Oak Flats (HQ)"
          aisles={AISLES}
          activeBin="A3-B2"
        />
      </section>
    </main>
  )
}
