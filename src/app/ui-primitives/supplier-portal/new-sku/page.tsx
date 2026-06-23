import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { NewSkuAnnouncement } from "../../components/supplier-portal"

import styles from "../supplier-portal.module.css"

export const metadata: Metadata = {
  title: "New SKU announcement | UI Primitives — Supplier Portal",
}

export default function NewSkuPage() {
  return (
    <main className={styles.page}>
      <PageHeader
        kicker="23.06 / Supplier portal"
        title="New SKU announcement"
        description="Hero card a supplier uses to introduce a brand-new part to the workshop catalog team."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Supplier portal", href: "/ui-primitives/supplier-portal" },
          { label: "New SKU announcement" },
        ]}
      />
      <section className={styles.canvas}>
        <NewSkuAnnouncement
          sku="MAN-RAM1500"
          title="Manta RAM 1500 DT cat-back"
          description="Twin 3in stainless mandrel-bent system for the RAM 1500 DT Hemi. Drop-in fitment with Magnaflow polished tips."
          suggestedRrp={2490}
          launchLabel="Launches 12 Jul"
        />
      </section>
    </main>
  )
}
