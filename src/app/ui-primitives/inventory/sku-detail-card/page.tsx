import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { SkuDetailCard } from "../../components/inventory"

import { SKU_DETAIL } from "../fixtures"
import styles from "../inventory.module.css"

export const metadata: Metadata = {
  title: "SKU detail card | Inventory",
  description:
    "Primitive 01 — SKU detail card composing DashboardCard with stock-on-hand, average cost, reorder point, and lead-time chip.",
}

export default function SkuDetailCardPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 01 / SKU detail"
        title="SKU detail card"
        description="Supplier, thumbnail, stock-on-hand, average cost, reorder point and lead-time chip — composed via the DashboardCard primitive."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Inventory", href: "/ui-primitives/inventory" },
          { label: "SKU detail card" },
        ]}
      />
      <section className={styles.stageFrame}>
        <span className={styles.stageCaption}>Healthy stock state · Hilux cat-back</span>
        <SkuDetailCard {...SKU_DETAIL} />
        <span className={styles.stageCaption}>Critical state · WRX extractors</span>
        <SkuDetailCard
          sku="OF-EXT-088"
          title="Pacemaker extractors WRX VA"
          supplier="Pacemaker Headers"
          stockOnHand={1}
          averageCost={1095}
          reorderPoint={3}
          leadTimeDays={18}
          health="critical"
          thumbPlaceholder="EX8"
        />
      </section>
    </main>
  )
}
