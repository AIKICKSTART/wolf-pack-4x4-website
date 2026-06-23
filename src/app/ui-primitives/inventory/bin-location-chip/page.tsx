import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { BinLocationChip } from "../../components/inventory"

import styles from "../inventory.module.css"

export const metadata: Metadata = {
  title: "Bin location chip | Inventory",
  description:
    "Primitive 06 — Compact aisle-bay-shelf chip with click-to-find affordance into the warehouse grid.",
}

export default function BinLocationChipPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 06 / Chip"
        title="Bin location chip"
        description="Compact tag — aisle, bay, shelf — composed via the Chip primitive. Optional onFind to surface the bin in a grid."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Inventory", href: "/ui-primitives/inventory" },
          { label: "Bin location chip" },
        ]}
      />
      <section className={styles.stageFrame}>
        <BinLocationChip aisle="A3" bay="B2" shelf="S4" />
        <BinLocationChip aisle="C2" bay="B1" shelf="S2" />
        <BinLocationChip aisle="B2" bay="B2" shelf="S1" />
        <BinLocationChip aisle="A2" bay="B2" shelf="S3" />
      </section>
    </main>
  )
}
