import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { PriceUpdateBroadcast } from "../../components/supplier-portal"

import styles from "../supplier-portal.module.css"

export const metadata: Metadata = {
  title: "Price update broadcast | UI Primitives — Supplier Portal",
}

export default function PriceUpdatePage() {
  return (
    <main className={styles.page}>
      <PageHeader
        kicker="23.05 / Supplier portal"
        title="Price update broadcast"
        description="Tells the workshop a list price has changed, with the impact on live quotes."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Supplier portal", href: "/ui-primitives/supplier-portal" },
          { label: "Price update" },
        ]}
      />
      <section className={styles.canvas}>
        <PriceUpdateBroadcast
          sku="MAN-MK24-405"
          title="Manta 3in stainless cat-back"
          oldPrice={1289}
          newPrice={1349}
          effectiveLabel="Effective 1 Jul"
          affectedQuotes={11}
          note="Stainless sheet costs up 4.6% YoY. Pass-through is a flat 60 AUD per cat-back."
        />
      </section>
    </main>
  )
}
