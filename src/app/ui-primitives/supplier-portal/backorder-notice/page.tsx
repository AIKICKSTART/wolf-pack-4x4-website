import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { BackorderNoticeCard } from "../../components/supplier-portal"

import styles from "../supplier-portal.module.css"

export const metadata: Metadata = {
  title: "Backorder notice | UI Primitives — Supplier Portal",
}

export default function BackorderNoticePage() {
  return (
    <main className={styles.page}>
      <PageHeader
        kicker="23.04 / Supplier portal"
        title="Backorder notice card"
        description="Tells the workshop a SKU is delayed and offers a sane alternative."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Supplier portal", href: "/ui-primitives/supplier-portal" },
          { label: "Backorder notice" },
        ]}
      />
      <section className={styles.canvas}>
        <BackorderNoticeCard
          sku="MAN-PX3"
          title="Manta Ranger PX3 mid-muffler"
          reason="freight-delay"
          expectedRestockLabel="ETA 14 Jun · Air freight"
          affectedCustomerCount={6}
          alternative={{
            sku: "RB-PX3-MID",
            title: "Redback Ranger PX3 alt mid-muffler",
            unitsAvailable: 12,
          }}
        />
      </section>
    </main>
  )
}
