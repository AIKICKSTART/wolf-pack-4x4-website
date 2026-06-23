import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import {
  IncidentCard,
  MaintenanceWindowBanner,
  RegionStatusGrid,
  ServiceStatusRow,
  StatusHistoryTable,
  SubscribeUpdatesInput,
  UptimeSparklineRow,
} from "../../components/status-page"

import {
  PARTS_CATALOGUE_DAYS,
  PAYMENT_DAYS,
  QUOTE_ENGINE_DAYS,
  REGION_ENTRIES,
  SMS_DAYS,
  SMS_INCIDENT,
  SPARKLINE_PARTS,
  SPARKLINE_PAYMENT,
  SPARKLINE_QUOTE,
  SPARKLINE_SCHEDULER,
  SPARKLINE_SMS,
  STATUS_HISTORY,
  WORKSHOP_SCHEDULER_DAYS,
} from "../_mock-data"
import styles from "../status-page.module.css"

export const metadata: Metadata = {
  title: "Full status page | Status page",
  description:
    "Composition — public-facing Mufflermen status page assembled from the 14 primitives.",
}

export default function FullStatusPageScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Composition / Public status page"
        title="Mufflermen status"
        description="A composed public-facing status page wired from the 14 primitives — maintenance banner up top, active SMS incident card, the 5 main service status rows with 90-day uptime grids, region grid in the aside, a compact uptime-sparkline list and a subscribe footer, followed by the 90-day status history table."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Status page", href: "/ui-primitives/status-page" },
          { label: "Full status page" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Composition · public-facing status page</span>
        <div className={styles.publicShell}>
          <MaintenanceWindowBanner
            title="In progress — Workshop scheduler database failover"
            phase="in-progress"
            startsAt="28 May · 19:30 AEST"
            endsAt="28 May · 20:30 AEST"
            impactSummary="Read-only mode active. Customer bookings can be viewed but not modified."
            affectedServices={["Workshop scheduler", "Parts catalogue"]}
          />

          <IncidentCard
            title={SMS_INCIDENT.title}
            severity={SMS_INCIDENT.severity}
            currentStage={SMS_INCIDENT.currentStage}
            scope={SMS_INCIDENT.scope}
            startedAt={SMS_INCIDENT.startedAt}
            updates={SMS_INCIDENT.updates}
            subscribeHref={SMS_INCIDENT.subscribeHref}
          />

          <div className={styles.publicSplit}>
            <div className={styles.demoCol}>
              <ServiceStatusRow
                name="Quote engine"
                description="Pricing, line-item totals, parts compatibility lookups."
                status="operational"
                uptimePercent={99.987}
                days={QUOTE_ENGINE_DAYS}
              />
              <ServiceStatusRow
                name="Parts catalogue"
                description="National catalogue and image CDN."
                status="operational"
                uptimePercent={99.953}
                days={PARTS_CATALOGUE_DAYS}
              />
              <ServiceStatusRow
                name="Workshop scheduler"
                description="Booking, bay allocation, tech assignment."
                status="maintenance"
                uptimePercent={99.92}
                days={WORKSHOP_SCHEDULER_DAYS}
              />
              <ServiceStatusRow
                name="Customer SMS"
                description="Confirmations, ETA updates, pickup-ready pings."
                status="degraded"
                uptimePercent={99.612}
                days={SMS_DAYS}
              />
              <ServiceStatusRow
                name="Payment gateway"
                description="Card, BPAY, Apple Pay, Google Pay, deferred billing."
                status="operational"
                uptimePercent={99.996}
                days={PAYMENT_DAYS}
              />
            </div>

            <aside className={styles.publicAside}>
              <RegionStatusGrid
                caption="Regional status"
                regions={REGION_ENTRIES}
              />
              <section className={styles.demoSurface} aria-label="Uptime overview">
                <span className={styles.demoLabel}>Uptime · last 24h</span>
                <div className={styles.demoStack}>
                  <UptimeSparklineRow
                    name="Quote engine"
                    status="operational"
                    points={SPARKLINE_QUOTE}
                    latencyP99Ms={142}
                    errorRate={0.0008}
                  />
                  <UptimeSparklineRow
                    name="Parts catalogue"
                    status="operational"
                    points={SPARKLINE_PARTS}
                    latencyP99Ms={188}
                    errorRate={0.0012}
                  />
                  <UptimeSparklineRow
                    name="Workshop scheduler"
                    status="maintenance"
                    points={SPARKLINE_SCHEDULER}
                    latencyP99Ms={96}
                    errorRate={0.0004}
                  />
                  <UptimeSparklineRow
                    name="Customer SMS"
                    status="degraded"
                    points={SPARKLINE_SMS}
                    latencyP99Ms={612}
                    errorRate={0.024}
                  />
                  <UptimeSparklineRow
                    name="Payment gateway"
                    status="operational"
                    points={SPARKLINE_PAYMENT}
                    latencyP99Ms={221}
                    errorRate={0.0007}
                  />
                </div>
              </section>
            </aside>
          </div>

          <SubscribeUpdatesInput
            initialChannel="email"
            initialFrequency="instant"
            privacyNote="Subscribe for incidents and scheduled maintenance only. We never share or market to this address."
          />

          <StatusHistoryTable rows={STATUS_HISTORY} />
        </div>
      </section>
    </main>
  )
}
