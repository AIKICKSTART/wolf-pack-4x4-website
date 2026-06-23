import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { FilterBuilderTree } from "../../components/reports"
import { FILTER_TREE } from "../demo-data"

import styles from "../reports.module.css"

export const metadata: Metadata = {
  title: "Filter builder tree | Reports",
  description:
    "Primitive 07 — nested AND/OR filter groups with add/remove conditions and SQL-like WHERE preview.",
}

export default function FilterBuilderTreeScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 07 / Filter builder tree"
        title="Filter builder tree"
        description="Compose nested AND / OR groups for the report. Each group can hold conditions and sub-groups; the bottom strip echoes the resolved WHERE expression."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Reports", href: "/ui-primitives/reports" },
          { label: "Filter builder tree" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive</span>
        <FilterBuilderTree rootGroup={FILTER_TREE} />
      </section>
    </main>
  )
}
