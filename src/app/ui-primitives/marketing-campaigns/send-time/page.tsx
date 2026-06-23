import type { Metadata } from "next"

import { SendTimeOptimizer } from "../../components/marketing-campaigns"
import { PageHeader } from "../../components/page-header"

import { DEMO_HEATMAP_CELLS, DEMO_SEND_RECOMMENDATION } from "../demo-data"
import styles from "../marketing-campaigns.module.css"

export const metadata: Metadata = {
  title: "Send time optimizer | Marketing campaigns",
  description:
    "Primitive 09 — historical opens heatmap with recommended send window and override picker.",
}

export default function SendTimeScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 09 / Send time optimizer"
        title="Send time optimizer"
        description="A 12-week heatmap of historical open rates by hour-of-week. The recommended window is highlighted as a chip, with an override row for picking a specific hour manually."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Marketing campaigns", href: "/ui-primitives/marketing-campaigns" },
          { label: "Send time" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive</span>
        <SendTimeOptimizer
          cells={DEMO_HEATMAP_CELLS}
          recommended={DEMO_SEND_RECOMMENDATION}
          defaultOverride="18:00"
        />
      </section>
    </main>
  )
}
