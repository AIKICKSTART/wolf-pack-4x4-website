import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { ObsoleteStockCard } from "../../components/inventory-deep"

import { OBSOLETE_CARDS } from "../_mock-data"
import styles from "../inventory-deep.module.css"

export const metadata: Metadata = {
  title: "Obsolete stock card | Inventory deep",
  description:
    "Primitive 11 — obsolete-stock card with quantity, book value and disposal options.",
}

export default function ObsoleteStockCardPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 11 / Obsolete"
        title="Obsolete stock card"
        description="Obsolete-stock disposition card — quantity, book value, last-sale date and a row of disposal CTAs (scrap, auction, donate, return to supplier)."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Inventory deep", href: "/ui-primitives/inventory-deep" },
          { label: "Obsolete stock card" },
        ]}
      />

      <section className={styles.stageFrame}>
        <span className={styles.stageCaption}>Discontinued · auction candidate</span>
        <ObsoleteStockCard {...OBSOLETE_CARDS[0]} />

        <span className={styles.stageCaption}>Superseded · return-to-supplier</span>
        <ObsoleteStockCard {...OBSOLETE_CARDS[1]} />

        <span className={styles.stageCaption}>Donation candidate · community comp car</span>
        <ObsoleteStockCard
          sku="MAN-MUF-OLD-12"
          title="Manta legacy 12in muffler (round body)"
          reason="Replaced by oval body in 2023. Functional but visually dated. Donation to apprentice comp build approved."
          qty={3}
          bookValue={420}
          lastSale="22 Feb 2025"
          defaultDisposition="donate"
          dispositions={["donate", "scrap"]}
        />
      </section>
    </main>
  )
}
