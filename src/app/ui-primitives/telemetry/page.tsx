import type { Metadata } from "next"

import { PageHeader } from "../components/page-header"
import { TelemetrySection } from "../components"
import styles from "../ui-primitives.module.css"

export const metadata: Metadata = {
  title: "Telemetry | UI Primitives",
}

export default function TelemetryPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="00 / Source of truth"
        title="Cluster readouts and signal integrity"
        description="Telemetry primitives that mirror workshop instrumentation: gauges, status bars, KPIs, and clustered readouts for system health and workflow confidence."
        dnaSectionId="telemetry"
      />
      <TelemetrySection />
    </main>
  )
}
