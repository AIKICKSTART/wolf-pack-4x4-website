import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { BayHourlyUtilisation } from "../../components/workshop-floor-live"
import type { BayHourlyRow } from "../../components/workshop-floor-live"
import styles from "../workshop-floor-live.module.css"

export const metadata: Metadata = {
  title: "Bay hourly utilisation | UI Primitives — Workshop Floor Live",
}

// 11 hours, 7am → 5pm. Values are utilisation ratios 0–1.
const rows: ReadonlyArray<BayHourlyRow> = [
  {
    bay: "bay-1",
    hours: [0.1, 0.4, 0.65, 0.78, 0.92, 0.55, 0.78, 0.86, 0.62, 0.35, 0.18],
  },
  {
    bay: "bay-2",
    hours: [0.0, 0.32, 0.6, 0.74, 0.96, 1.0, 0.92, 0.68, 0.55, 0.4, 0.22],
  },
  {
    bay: "bay-3",
    hours: [0.0, 0.18, 0.42, 0.71, 0.85, 0.94, 1.0, 1.0, 0.75, 0.38, 0.12],
  },
  {
    bay: "bay-4",
    hours: [0.06, 0.22, 0.45, 0.5, 0.62, 0.7, 0.58, 0.45, 0.32, 0.2, 0.08],
  },
]

export default function BayHourlyPage() {
  return (
    <main className={styles.page}>
      <PageHeader
        kicker="23.06 / Workshop floor live"
        title="Bay hourly utilisation"
        description="Per-bay hourly utilisation strip across the workshop day — idle through peak across a five-step colour ramp, so floor leads can spot the late-morning crunch coming."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Workshop floor live", href: "/ui-primitives/workshop-floor-live" },
          { label: "Bay hourly" },
        ]}
      />
      <section className={styles.canvas}>
        <BayHourlyUtilisation rows={rows} />
        <div className={styles.note}>
          <span>Behaviour</span>
          <p>
            Cell bands are intentionally chunky so the heatmap reads from across
            the workshop. Hover lifts brightness for fine-grained inspection. A
            legend underneath maps the bands so new hires can decode the ramp
            without context.
          </p>
        </div>
      </section>
    </main>
  )
}
