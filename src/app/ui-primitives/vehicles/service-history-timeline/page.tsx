import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { ServiceHistoryTimeline } from "../../components/vehicles/service-history-timeline"

import { SAMPLE_SERVICE_HISTORY } from "../fixtures"
import styles from "../vehicles.module.css"

export const metadata: Metadata = {
  title: "Service history timeline | Vehicles | UI Primitives",
  description:
    "Service history vertical timeline composing the ActivityFeed primitive — service kind, summary, workshop, odometer, and AUD cost chip per event.",
}

export default function ServiceHistoryTimelineScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Scene 03"
        title="Service history timeline"
        description="Timeline of service events for the Hilux N80 — scheduled services, exhaust work, tyres, warranty, and the annual NSW eSafety inspection."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Vehicles", href: "/ui-primitives/vehicles" },
          { label: "Service history timeline" },
        ]}
      />
      <section className={styles.sceneShell}>
        <ServiceHistoryTimeline entries={SAMPLE_SERVICE_HISTORY} />
      </section>
    </main>
  )
}
