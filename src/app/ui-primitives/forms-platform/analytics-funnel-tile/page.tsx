import type { Metadata } from "next"

import { AnalyticsFunnelTile } from "../../components/forms-platform"
import { PageHeader } from "../../components/page-header"

import { FUNNEL_STAGES } from "../fixtures"
import styles from "../forms-platform.module.css"

export const metadata: Metadata = {
  title: "Analytics funnel tile | Forms platform",
  description:
    "Primitive 14 — the form funnel tile showing started, halfway, submitted, and abandoned counts.",
}

export default function AnalyticsFunnelTileScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 14 / Analytics funnel tile"
        title="Analytics funnel tile"
        description="Book-a-Service funnel — 482 starts, 321 halfway, 196 submitted, 286 abandoned over the last 28 days. 41% conversion rate from start to submit. The abandoned bar is shown in red so the workshop can spot it at a glance."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Forms platform", href: "/ui-primitives/forms-platform" },
          { label: "Analytics funnel tile" },
        ]}
      />

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>
          Live primitive — Book a Service funnel
        </span>
        <div className={styles.demoInline}>
          <AnalyticsFunnelTile
            title="Book a Service funnel"
            stages={FUNNEL_STAGES}
            periodLabel="Last 28 days · Mufflermen"
            conversionPct={41}
          />
        </div>
      </section>
    </main>
  )
}
