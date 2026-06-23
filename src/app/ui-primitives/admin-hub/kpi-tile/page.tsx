import type { Metadata } from "next"

import { KpiTile } from "../../components/admin-hub"
import { PageHeader } from "../../components/page-header"

import { KPI_REVENUE, KPI_BOOKINGS, KPI_NPS, KPI_UPTIME } from "../_mock-data"
import styles from "../admin-hub.module.css"

export const metadata: Metadata = {
  title: "KPI tile | Admin hub",
  description:
    "Primitive 01 — big-number KPI tile with delta arrow, sparkline trend and period chip. Three states — surging green, flat plateau, declining NPS.",
}

const FLAT_KPI = {
  ...KPI_UPTIME,
  delta: "0.00",
  deltaDirection: "flat" as const,
  caption: "Holding steady at SLA target",
}

export default function KpiTileScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 01 / KPI tile"
        title="Big-number KPI tile"
        description="Headline number with delta arrow, sparkline trend, and period chip. Three states — up-trending revenue, flat uptime at SLA target, and a declining NPS signal."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Admin hub", href: "/ui-primitives/admin-hub" },
          { label: "KPI tile" },
        ]}
      />

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive · 3 states</span>
        <div className={styles.demoTriple}>
          <div>
            <span className={styles.demoStateLabel}>State 1 · trending up</span>
            <KpiTile kpi={KPI_REVENUE} />
          </div>
          <div>
            <span className={styles.demoStateLabel}>State 2 · flat at SLA</span>
            <KpiTile kpi={FLAT_KPI} />
          </div>
          <div>
            <span className={styles.demoStateLabel}>State 3 · declining</span>
            <KpiTile kpi={KPI_NPS} />
          </div>
        </div>

        <div className={styles.demoTriple}>
          <KpiTile kpi={KPI_BOOKINGS} />
        </div>
      </section>
    </main>
  )
}
