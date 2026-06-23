import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { StockLevelMeter } from "../../components/inventory"

import styles from "../inventory.module.css"

export const metadata: Metadata = {
  title: "Stock level meter | Inventory",
  description:
    "Primitive 02 — Stock level meter composing ProgressLinear with tone bands for below-reorder, near-reorder, healthy and overstocked.",
}

export default function StockLevelMeterPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 02 / Meter"
        title="Stock level meter"
        description="Tone-shifting capacity fill that reads as critical, low, healthy or overstocked. Role=meter with aria-valuenow for AT support."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Inventory", href: "/ui-primitives/inventory" },
          { label: "Stock level meter" },
        ]}
      />
      <section className={styles.stageFrame}>
        <StockLevelMeter
          kicker="OF-MFR-001"
          label="Manta 3in cat-back"
          current={6}
          capacity={24}
          reorderPoint={4}
        />
        <StockLevelMeter
          kicker="OF-EXT-088"
          label="Pacemaker extractors WRX"
          current={1}
          capacity={12}
          reorderPoint={3}
        />
        <StockLevelMeter
          kicker="OF-PIPE-022"
          label="3in mandrel bend 90°"
          current={38}
          capacity={48}
          reorderPoint={12}
        />
        <StockLevelMeter
          kicker="OF-CLAMP-012"
          label="T-bolt clamp 3in (pack 4)"
          current={66}
          capacity={64}
          reorderPoint={20}
        />
      </section>
    </main>
  )
}
