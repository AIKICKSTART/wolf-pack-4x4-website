import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { UptimeSparklineRow } from "../../components/status-page"

import {
  SPARKLINE_PARTS,
  SPARKLINE_PAYMENT,
  SPARKLINE_QUOTE,
  SPARKLINE_SCHEDULER,
  SPARKLINE_SMS,
} from "../_mock-data"
import styles from "../status-page.module.css"

export const metadata: Metadata = {
  title: "Uptime sparkline row | Status page",
  description:
    "Primitive 05 — compact row with 24h sparkline, p99 latency and error rate.",
}

export default function UptimeSparklineRowScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 05 / Row"
        title="Uptime sparkline row"
        description="A compact one-line summary row for each service: tone-coded status dot, name, 24-hour healthy-fraction sparkline, current p99 latency and current error rate. Useful for the dense status overview where the full 90-day grid would be overwhelming."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Status page", href: "/ui-primitives/status-page" },
          { label: "Uptime sparkline row" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive · 5 services · 24h trailing window</span>
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
            status="operational"
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
    </main>
  )
}
