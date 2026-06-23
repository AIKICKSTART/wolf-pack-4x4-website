import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { DuplicateHandlingRules } from "../../components/data-import"
import { DUPLICATE_RULES } from "../demo-data"

import styles from "../data-import.module.css"

export const metadata: Metadata = {
  title: "Duplicate handling rules | Data import",
  description:
    "Primitive 11 — Duplicate rules: key columns + action (skip / update / keep both / merge by rule).",
}

export default function DuplicateHandlingRulesScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 11 / Duplicate handling rules"
        title="Duplicate handling rules"
        description="Per-table rules for what happens when an incoming row collides with an existing one. Parts upsert; customers merge by email; quotes keep every revision; suppliers stay hands-off."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Data import", href: "/ui-primitives/data-import" },
          { label: "Duplicate handling rules" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Rule book</span>
        <DuplicateHandlingRules rules={DUPLICATE_RULES} />
      </section>
    </main>
  )
}
