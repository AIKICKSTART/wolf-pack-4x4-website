import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { LatencyPercentileStrip } from "../../components/status-page"

import styles from "../status-page.module.css"

export const metadata: Metadata = {
  title: "Latency percentile strip | Status page",
  description:
    "Primitive 13 — side-by-side bars for p50 / p75 / p90 / p95 / p99 / p99.9 with budget chip.",
}

export default function LatencyPercentileStripScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 13 / Strip"
        title="Latency percentile strip"
        description="Six side-by-side bars for the standard latency percentiles, with current ms values below. Bars trend tone as values approach and breach the p95 budget — green inside, teal near, amber over, red far over. Use one strip per critical endpoint."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Status page", href: "/ui-primitives/status-page" },
          { label: "Latency percentile strip" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive · two endpoints · varying health</span>
        <div className={styles.demoSplit}>
          <LatencyPercentileStrip
            caption="GET /quote · last 5 min"
            budgetMs={250}
            values={[
              { percentile: "p50", ms: 32 },
              { percentile: "p75", ms: 58 },
              { percentile: "p90", ms: 112 },
              { percentile: "p95", ms: 178 },
              { percentile: "p99", ms: 274 },
              { percentile: "p99_9", ms: 412 },
            ]}
          />
          <LatencyPercentileStrip
            caption="POST /sms/send · last 5 min"
            budgetMs={300}
            values={[
              { percentile: "p50", ms: 142 },
              { percentile: "p75", ms: 268 },
              { percentile: "p90", ms: 412 },
              { percentile: "p95", ms: 612 },
              { percentile: "p99", ms: 980 },
              { percentile: "p99_9", ms: 1420 },
            ]}
          />
        </div>
      </section>
    </main>
  )
}
