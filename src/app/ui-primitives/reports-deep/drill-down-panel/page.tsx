import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { DrillDownPanel } from "../../components/reports-deep"
import { DRILL_LEVELS } from "../demo-data"

import styles from "../reports-deep.module.css"

export const metadata: Metadata = {
  title: "Drill-down panel | Reports-deep",
  description:
    "Primitive 06 — drill-down stack with a breadcrumb across dimension levels and a drill-into-next CTA.",
}

export default function DrillDownPanelPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 06 / Drill-down panel"
        title="Drill-down panel"
        description="Drill from one dimension level into the next — suburb → service → vehicle make in the Mufflermen weekly revenue example. The breadcrumb is interactive; click any level to jump back. The bar reflects each row's contribution."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Reports-deep", href: "/ui-primitives/reports-deep" },
          { label: "Drill-down panel" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive</span>
        <DrillDownPanel
          title="Weekly revenue · Week 22 FY26"
          levels={DRILL_LEVELS}
          initialIndex={1}
        />
      </section>
    </main>
  )
}
