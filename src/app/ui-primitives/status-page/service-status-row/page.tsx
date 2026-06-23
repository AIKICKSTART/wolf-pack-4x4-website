import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { ServiceStatusRow } from "../../components/status-page"

import {
  PARTS_CATALOGUE_DAYS,
  QUOTE_ENGINE_DAYS,
  SMS_DAYS,
} from "../_mock-data"
import styles from "../status-page.module.css"

export const metadata: Metadata = {
  title: "Service status row | Status page",
  description:
    "Primitive 01 — service status row with chip and 90-day uptime grid.",
}

export default function ServiceStatusRowScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 01 / Row"
        title="Service status row"
        description="The workhorse row of every public status page — service name, optional one-line description, current status chip, and a 90-day uptime grid where each tile reflects that day's worst observed state. role=region with an aria-label naming both the service and current status."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Status page", href: "/ui-primitives/status-page" },
          { label: "Service status row" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive · three rows · varying status</span>
        <div className={styles.demoStack}>
          <ServiceStatusRow
            name="Quote engine"
            description="Pricing, line-item totals, parts compatibility lookups."
            status="operational"
            uptimePercent={99.987}
            days={QUOTE_ENGINE_DAYS}
          />
          <ServiceStatusRow
            name="Customer SMS"
            description="Booking confirmations, ETA updates, pickup-ready pings."
            status="degraded"
            uptimePercent={99.612}
            days={SMS_DAYS}
          />
          <ServiceStatusRow
            name="Parts catalogue"
            description="Mufflermen national parts catalogue and image CDN."
            status="operational"
            uptimePercent={99.953}
            days={PARTS_CATALOGUE_DAYS}
          />
        </div>
      </section>
    </main>
  )
}
