import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { StocktakeSessionCard } from "../../components/inventory-deep"

import {
  STOCKTAKE_ACTIVE,
  STOCKTAKE_REVIEW,
  STOCKTAKE_SCHEDULED,
} from "../_mock-data"
import styles from "../inventory-deep.module.css"

export const metadata: Metadata = {
  title: "Stocktake session card | Inventory deep",
  description:
    "Primitive 01 — active stocktake session card with counted-vs-total radial, auditor and scope.",
}

export default function StocktakeSessionCardPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 01 / Stocktake"
        title="Stocktake session card"
        description="Live cycle-count session — auditor, scope, counted vs total radial gauge, status pill and elapsed time."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Inventory deep", href: "/ui-primitives/inventory-deep" },
          { label: "Stocktake session card" },
        ]}
      />
      <section className={styles.stageFrame}>
        <span className={styles.stageCaption}>Active · halfway through</span>
        <StocktakeSessionCard {...STOCKTAKE_ACTIVE} />

        <span className={styles.stageCaption}>Scheduled · awaiting kickoff</span>
        <StocktakeSessionCard {...STOCKTAKE_SCHEDULED} />

        <span className={styles.stageCaption}>Closed · in review</span>
        <StocktakeSessionCard {...STOCKTAKE_REVIEW} />
      </section>
    </main>
  )
}
