import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { SlowMoverCard } from "../../components/inventory-deep"

import { SLOW_MOVERS } from "../_mock-data"
import styles from "../inventory-deep.module.css"

export const metadata: Metadata = {
  title: "Slow mover card | Inventory deep",
  description:
    "Primitive 08 — slow-moving SKU card with days-since-last-sale meter and disposition actions.",
}

export default function SlowMoverCardPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 08 / Slow mover"
        title="Slow mover card"
        description="Slow-moving SKU card — striped days-since-last-sale meter, tied-up value, and quick disposition actions (discount, transfer, return, write-off)."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Inventory deep", href: "/ui-primitives/inventory-deep" },
          { label: "Slow mover card" },
        ]}
      />

      <section className={styles.stageFrame}>
        <span className={styles.stageCaption}>247 days stale · 4× Pickup full-system kits</span>
        <SlowMoverCard {...SLOW_MOVERS[0]} />

        <span className={styles.stageCaption}>198 days stale · transfer candidate</span>
        <SlowMoverCard {...SLOW_MOVERS[1]} />

        <span className={styles.stageCaption}>312 days stale · write-off recommended</span>
        <SlowMoverCard {...SLOW_MOVERS[2]} />
      </section>
    </main>
  )
}
