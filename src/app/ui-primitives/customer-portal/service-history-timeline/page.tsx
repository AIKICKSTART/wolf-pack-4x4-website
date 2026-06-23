import type { Metadata } from "next"

import { ServiceHistoryTimeline } from "../../components/customer-portal"
import { PageHeader } from "../../components/page-header"

import { HISTORY_HILUX } from "../_mock-data"
import styles from "../customer-portal.module.css"

export const metadata: Metadata = {
  title: "Service history timeline | Customer portal",
  description:
    "Primitive 05 — chronological service history with PDF receipt downloads — three states.",
}

export default function ServiceHistoryTimelineScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 05 / Service history timeline"
        title="Chronological service ledger"
        description="Full Hilux history (4 entries with PDF downloads), a single recent entry for a Falcon owner, and the empty-state for a fresh first-time customer."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Customer portal", href: "/ui-primitives/customer-portal" },
          { label: "Service history timeline" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive · 3 states</span>
        <div className={styles.demoStack}>
          <ServiceHistoryTimeline
            vehicleLabel="2021 Hilux N80 SR5"
            entries={HISTORY_HILUX}
          />
          <ServiceHistoryTimeline
            vehicleLabel="2008 Falcon BF XR6"
            entries={HISTORY_HILUX.slice(1, 2)}
          />
          <ServiceHistoryTimeline entries={[]} />
        </div>
      </section>
    </main>
  )
}
