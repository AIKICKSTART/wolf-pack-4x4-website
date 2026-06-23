import type { Metadata } from "next"

import { PinnedBoard } from "../../components/admin-hub"
import { PageHeader } from "../../components/page-header"

import { PINNED_WIDGETS } from "../_mock-data"
import styles from "../admin-hub.module.css"
import { DemoPinnedBoard } from "./pinned-board-demo"

export const metadata: Metadata = {
  title: "Pinned widgets board | Admin hub",
  description:
    "Primitive 06 — admin-pinned widgets canvas with drag-rearrange. Three states — populated mix, single hero KPI, empty wireframe placeholders.",
}

const SINGLE_WIDGET = PINNED_WIDGETS.slice(0, 1)

export default function PinnedBoardScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 06 / Pinned widgets board"
        title="Pinned widgets canvas"
        description="Admin-pinned widgets laid out in a flex canvas with drag-handle reorder, span-1 and span-2 cards, per-widget chevron controls. Three states — populated KPI + activity + pulse mix, single span-1 hero widget, and an empty wireframe canvas."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Admin hub", href: "/ui-primitives/admin-hub" },
          { label: "Pinned board" },
        ]}
      />

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive · 3 states</span>

        <div className={styles.demoStack}>
          <div>
            <span className={styles.demoStateLabel}>State 1 · populated mix</span>
            <DemoPinnedBoard widgets={PINNED_WIDGETS.slice(0, 3)} />
          </div>

          <div>
            <span className={styles.demoStateLabel}>State 2 · single hero widget</span>
            <DemoPinnedBoard widgets={SINGLE_WIDGET} title="One pinned widget" />
          </div>

          <div>
            <span className={styles.demoStateLabel}>State 3 · placeholder wireframes</span>
            <PinnedBoard widgets={PINNED_WIDGETS} title="Placeholder canvas" />
          </div>
        </div>
      </section>
    </main>
  )
}
