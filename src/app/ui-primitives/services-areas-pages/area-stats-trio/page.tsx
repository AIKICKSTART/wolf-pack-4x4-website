import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { AreaStatsTrio } from "../../components/services-areas-pages"
import { DEMO_AREA_STATS } from "../demo-data"
import styles from "../services-areas-pages.module.css"

export const metadata: Metadata = {
  title: "Area stats trio | Services & areas | UI Primitives",
  description:
    "Trio of area stats — workshops count, suburbs covered, average response time.",
}

export default function AreaStatsTrioScene() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 11"
        title="Area stats trio"
        description="Trio of stat tiles surfaced beneath the area-hub hero. Composes the data-display MetricBlock primitive — workshops count, suburbs covered, and average response time, each with a helper line rendered as a flat-delta footer."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Services & areas", href: "/ui-primitives/services-areas-pages" },
          { label: "Area stats trio" },
        ]}
      />
      <AreaStatsTrio stats={DEMO_AREA_STATS} />
    </main>
  )
}
