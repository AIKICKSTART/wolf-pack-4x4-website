import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { MultiWarehouseSwitcher } from "../../components/inventory"

import { WAREHOUSE_OPTIONS } from "../fixtures"
import styles from "../inventory.module.css"

export const metadata: Metadata = {
  title: "Multi-warehouse switcher | Inventory",
  description:
    "Primitive 12 — Dropdown of Oak Flats, Albion Park, Sydney warehouses with a total-SKUs chip.",
}

export default function MultiWarehouseSwitcherPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 12 / Nav"
        title="Multi-warehouse switcher"
        description="Dropdown switcher between Oak Flats (HQ), Albion Park and Sydney with a live total-SKUs chip composed via the Chip primitive."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Inventory", href: "/ui-primitives/inventory" },
          { label: "Multi-warehouse switcher" },
        ]}
      />
      <section className={styles.stageFrame}>
        <MultiWarehouseSwitcher options={WAREHOUSE_OPTIONS} />
        <span className={styles.stageCaption}>Default to Albion Park</span>
        <MultiWarehouseSwitcher
          options={WAREHOUSE_OPTIONS}
          defaultWarehouseId="albion-park"
        />
      </section>
    </main>
  )
}
