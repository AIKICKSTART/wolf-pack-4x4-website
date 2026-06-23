import type { Metadata } from "next"

import { QuickGlanceRow } from "../../components/admin-hub"
import { PageHeader } from "../../components/page-header"

import { GLANCE_METRICS } from "../_mock-data"
import styles from "../admin-hub.module.css"

export const metadata: Metadata = {
  title: "Quick-glance row | Admin hub",
  description:
    "Primitive 11 — single-line metric strip across revenue, bookings, leads, NPS, uptime and Hermes chat volume. Three states — full strip, finance compact, ops compact.",
}

const FINANCE_GLANCE = GLANCE_METRICS.filter((m) =>
  ["gm-rev", "gm-book"].includes(m.id),
)

const OPS_GLANCE = GLANCE_METRICS.filter((m) =>
  ["gm-uptime", "gm-chats", "gm-nps"].includes(m.id),
)

export default function QuickGlanceRowScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 11 / Quick-glance row"
        title="Single-line metric strip"
        description="Compact metric strip — label / value / delta. Sits above the KPI grid as a single-line scan-of-state. Three states — full strip (rev/book/leads/NPS/uptime/chats), finance compact, ops compact."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Admin hub", href: "/ui-primitives/admin-hub" },
          { label: "Quick-glance row" },
        ]}
      />

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive · 3 states</span>

        <div className={styles.demoStack}>
          <div>
            <span className={styles.demoStateLabel}>State 1 · full strip</span>
            <QuickGlanceRow metrics={GLANCE_METRICS} />
          </div>

          <div>
            <span className={styles.demoStateLabel}>State 2 · finance compact</span>
            <QuickGlanceRow metrics={FINANCE_GLANCE} label="Finance" />
          </div>

          <div>
            <span className={styles.demoStateLabel}>State 3 · ops compact</span>
            <QuickGlanceRow metrics={OPS_GLANCE} label="Ops" />
          </div>
        </div>
      </section>
    </main>
  )
}
