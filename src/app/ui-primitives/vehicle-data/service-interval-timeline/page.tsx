import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { ServiceIntervalTimeline } from "../../components/vehicle-data/service-interval-timeline"

import { HILUX_SERVICE_INTERVALS } from "../fixtures"
import styles from "../vehicle-data.module.css"

export const metadata: Metadata = {
  title: "Service interval timeline | Vehicle data | UI Primitives",
  description:
    "Service interval timeline — OEM intervals for oil 10k, brake fluid 40k, coolant 60k, transmission 80k, DPF 100k with status chips.",
}

export default function ServiceIntervalTimelineScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Scene 06"
        title="Service interval timeline"
        description="Six manufacturer-prescribed service items on the 2021 Hilux N80 — colour-coded by status (due, soon, scheduled, complete) and laid out vertically along the kilometre line."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Vehicle data", href: "/ui-primitives/vehicle-data" },
          { label: "Service interval timeline" },
        ]}
      />
      <section className={styles.sceneShell}>
        <ServiceIntervalTimeline intervals={HILUX_SERVICE_INTERVALS} />
      </section>
    </main>
  )
}
