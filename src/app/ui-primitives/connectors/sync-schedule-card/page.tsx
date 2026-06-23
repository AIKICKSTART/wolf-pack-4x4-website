import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { SyncScheduleCard } from "../../components/connectors"

import {
  SCHEDULE_LINKEDIN_PAUSED,
  SCHEDULE_SUPPLIER,
  SCHEDULE_XERO,
} from "../_mock-data"
import styles from "../connectors.module.css"

export const metadata: Metadata = {
  title: "Sync schedule card | Connectors",
  description:
    "Primitive 11 — cron / interval config with next-run preview and outcomes strip.",
}

export default function SyncScheduleCardScene() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 11 / Card"
        title="Sync schedule card"
        description="Cron expression with timezone, cadence chip, last-run + next-run pair and a 12-cell recent-outcomes strip (success / fail / skipped / pending). Three live schedules — hourly supplier sync, daily Xero reconciliation and a paused weekly LinkedIn pulse."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Connectors", href: "/ui-primitives/connectors" },
          { label: "Sync schedule card" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive · three cadences · hourly / daily / paused</span>
        <div className={styles.demoTriple}>
          <SyncScheduleCard {...SCHEDULE_SUPPLIER} />
          <SyncScheduleCard {...SCHEDULE_XERO} />
          <SyncScheduleCard {...SCHEDULE_LINKEDIN_PAUSED} />
        </div>
      </section>
    </main>
  )
}
