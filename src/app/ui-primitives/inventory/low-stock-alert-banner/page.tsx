import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { LowStockAlertBanner } from "../../components/inventory"

import styles from "../inventory.module.css"

export const metadata: Metadata = {
  title: "Low stock alert banner | Inventory",
  description:
    "Primitive 13 — Low stock alert banner composing StickyCtaBar with N below reorder + suppress toggle.",
}

export default function LowStockAlertBannerPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 13 / Alert"
        title="Low stock alert banner"
        description="Composes the StickyCtaBar primitive — N SKUs below reorder, primary review CTA, secondary raise-PO CTA and a suppress-for-Xh toggle."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Inventory", href: "/ui-primitives/inventory" },
          { label: "Low stock alert banner" },
        ]}
      />
      <section className={styles.stageFrame}>
        <LowStockAlertBanner
          belowReorderCount={9}
          href="/ui-primitives/inventory/full-warehouse"
          raisePoHref="/ui-primitives/inventory/supplier-link-card"
          body="Next supplier window: Manta 09:00, Pacemaker 13:00"
          suppressHours={4}
        />
      </section>
    </main>
  )
}
