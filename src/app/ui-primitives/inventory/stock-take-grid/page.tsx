import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { StockTakeGrid } from "../../components/inventory"

import { STOCK_TAKE, STOCK_TAKE_INITIAL } from "../fixtures"
import styles from "../inventory.module.css"

export const metadata: Metadata = {
  title: "Stock take grid | Inventory",
  description:
    "Primitive 09 — DataTable-backed counting grid. Expected, counted input, live variance chip per row.",
}

export default function StockTakeGridPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 09 / Audit"
        title="Stock take grid"
        description="Composes the DataTable primitive — SKU column, expected qty, counted-qty input and live tone-coded variance chip per row."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Inventory", href: "/ui-primitives/inventory" },
          { label: "Stock take grid" },
        ]}
      />
      <section className={styles.stageFrame}>
        <StockTakeGrid
          sessionLabel="Oak Flats · Q2 2026 cycle count"
          lines={STOCK_TAKE}
          initialCounts={STOCK_TAKE_INITIAL}
        />
      </section>
    </main>
  )
}
