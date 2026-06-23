import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { ReorderThresholdChip } from "../../components/inventory"

import styles from "../inventory.module.css"

export const metadata: Metadata = {
  title: "Reorder threshold chip | Inventory",
  description:
    "Primitive 03 — Reorder threshold chip with QuoteBubble tooltip explaining supplier lead time.",
}

export default function ReorderThresholdChipPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 03 / Hint"
        title="Reorder threshold chip"
        description="Tone-coded chip with a QuoteBubble tooltip that explains the supplier lead time behind the threshold. Hover or focus to reveal."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Inventory", href: "/ui-primitives/inventory" },
          { label: "Reorder threshold chip" },
        ]}
      />
      <section className={styles.stageFrame}>
        <span className={styles.stageCaption}>Default · Manta lead time</span>
        <ReorderThresholdChip
          threshold={4}
          leadTimeDays={10}
          supplier="Manta Performance"
        />
        <span className={styles.stageCaption}>Slow supplier · amber tone</span>
        <ReorderThresholdChip
          threshold={3}
          leadTimeDays={26}
          supplier="XForce Australia"
          tone="amber"
        />
        <span className={styles.stageCaption}>Critical · red tone</span>
        <ReorderThresholdChip
          threshold={2}
          leadTimeDays={32}
          supplier="Pacemaker Headers"
          tone="red"
        />
      </section>
    </main>
  )
}
