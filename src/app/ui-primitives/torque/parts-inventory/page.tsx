import type { Metadata } from "next"

import { LowStockAlertBanner } from "../../components/inventory/low-stock-alert-banner"
import { PageHeader } from "../../components/page-header"

import { CommandBand, SupplierRail } from "./_components"
import { PartsCatalogue } from "./_parts-catalogue"
import { BELOW_REORDER_COUNT } from "./_demo-data"
import styles from "./parts-inventory.module.css"

export const metadata: Metadata = {
  title: "Parts & inventory | Torque",
  description:
    "The Oak Flats Muffler Men parts wall — a searchable catalogue of real exhaust parts with live stock levels, suppliers, prices, low-stock alerts and one-tap reorder. Composed entirely from UI primitives.",
}

export default function PartsInventoryPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Torque / Workshop Pro · Parts"
        title="Parts & inventory"
        description="The whole parts wall on one screen — search by SKU, part, supplier or bin, watch live stock levels against reorder points, and raise a purchase order the moment a line runs low. Light + dark, mobile-first, built only from registered primitives."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Torque" },
          { label: "Parts & inventory" },
        ]}
      />

      <CommandBand />

      <LowStockAlertBanner
        belowReorderCount={BELOW_REORDER_COUNT}
        href="#parts-catalogue-title"
        raisePoHref="#parts-supplier-title"
        body="Pacemaker bullet cat, Redback Torana tailpipe and a 5-inch flange need cover"
        suppressHours={4}
      />

      <PartsCatalogue />

      <SupplierRail />
    </main>
  )
}
