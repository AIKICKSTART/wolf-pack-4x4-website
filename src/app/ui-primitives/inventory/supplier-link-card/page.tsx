import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { SupplierLinkCard } from "../../components/inventory"

import { SUPPLIER_CARDS } from "../fixtures"
import styles from "../inventory.module.css"

export const metadata: Metadata = {
  title: "Supplier link card | Inventory",
  description:
    "Primitive 04 — Supplier link card composing DashboardCard with last PO date, lead-time and on-time chips.",
}

export default function SupplierLinkCardPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 04 / Supplier"
        title="Supplier link card"
        description="Supplier identity, last PO date, lead-time chip and on-time chip — composed via the DashboardCard primitive for inventory-side supplier triage."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Inventory", href: "/ui-primitives/inventory" },
          { label: "Supplier link card" },
        ]}
      />
      <section className={styles.stageFrame}>
        <div className={styles.stageRow}>
          {SUPPLIER_CARDS.map((card) => (
            <SupplierLinkCard key={card.supplier} {...card} />
          ))}
        </div>
      </section>
    </main>
  )
}
