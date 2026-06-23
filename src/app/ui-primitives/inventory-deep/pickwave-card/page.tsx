import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { PickwaveCard } from "../../components/inventory-deep"

import { PICKWAVES } from "../_mock-data"
import styles from "../inventory-deep.module.css"

export const metadata: Metadata = {
  title: "Pickwave card | Inventory deep",
  description:
    "Primitive 14 — pickwave card with sequence, picker, tote and segmented progress.",
}

export default function PickwaveCardPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 14 / Pickwave"
        title="Pickwave card"
        description="Pickwave card — sequence, picker, tote and zone constraint with segmented progress driven by lines picked vs total."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Inventory deep", href: "/ui-primitives/inventory-deep" },
          { label: "Pickwave card" },
        ]}
      />

      <section className={styles.stageFrame}>
        <span className={styles.stageCaption}>In progress · Brad · TOTE-014</span>
        <PickwaveCard {...PICKWAVES[0]} />

        <span className={styles.stageCaption}>Released + verifying</span>
        <PickwaveCard {...PICKWAVES[1]} />
        <PickwaveCard {...PICKWAVES[2]} />

        <span className={styles.stageCaption}>Complete · Jase · TOTE-003</span>
        <PickwaveCard {...PICKWAVES[3]} />
      </section>
    </main>
  )
}
