import type { Metadata } from "next"

import { ClickHeatMap } from "../../components/email-builder"
import { PageHeader } from "../../components/page-header"

import { CLICK_HEAT_SPOTS, DAILY_CLICK_CELLS, SAMPLE_SUBJECT } from "../fixtures"
import styles from "../email-builder.module.css"

export const metadata: Metadata = {
  title: "Click heat map | Email builder",
  description:
    "Primitive 14 — tone-coded hotspots overlaid on the preview canvas, plus a daily-clicks heatmap calendar.",
}

export default function ClickHeatMapScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 14 / Click heat map"
        title="Click heat map"
        description="Hotspots positioned over a stylised preview of the email body, sized + toned by click-through rate. The right-hand rail uses the existing HeatmapCalendar primitive to track click density over the campaign window, paired with a per-link chip list."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Email builder", href: "/ui-primitives/email-builder" },
          { label: "Click heat map" },
        ]}
      />

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive — Winter newsletter clicks</span>
        <ClickHeatMap
          templateLabel={SAMPLE_SUBJECT}
          spots={CLICK_HEAT_SPOTS}
          dailyCells={DAILY_CLICK_CELLS}
          calendarTone="red"
        />
      </section>
    </main>
  )
}
