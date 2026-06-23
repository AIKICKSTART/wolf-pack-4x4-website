import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { DashboardPinGrid } from "../../components/reports-deep"
import { DASHBOARD_WIDGETS } from "../demo-data"

import styles from "../reports-deep.module.css"

export const metadata: Metadata = {
  title: "Dashboard pin grid | Reports-deep",
  description:
    "Primitive 04 — pinnable widget grid that re-flows pinned tiles to the top with a star toggle on each widget.",
}

export default function DashboardPinGridPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 04 / Dashboard pin grid"
        title="Dashboard pin grid"
        description="A 6-column dense grid of pinnable analytics widgets. Tap the star to pin or unpin — pinned tiles flow to the top; unpinned tiles dim slightly. Spans 1–3 columns, heights 1–2 rows."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Reports-deep", href: "/ui-primitives/reports-deep" },
          { label: "Dashboard pin grid" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive</span>
        <DashboardPinGrid widgets={DASHBOARD_WIDGETS} />
      </section>
    </main>
  )
}
