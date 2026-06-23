import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import styles from "./states-overview.module.css"
import { StatesOverviewScene } from "./states-overview-scene"

export const metadata: Metadata = {
  title: "App states | UI Primitives — Torque",
}

export default function StatesOverviewPage() {
  return (
    <main className={styles.page}>
      <PageHeader
        kicker="Torque / App states"
        title="App states"
        description="The full-surface screens Torque shows the Oak Flats Muffler Men crew when the app can't show the usual dashboard — empty queues, loading, server faults, offline, planned maintenance, and confirmed wins. Each one keeps the brand voice and points to the next action, in light and dark."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Torque", href: "/ui-primitives/torque" },
          { label: "App states" },
        ]}
      />
      <section className={styles.canvas} aria-label="Torque app state screens">
        <StatesOverviewScene />
      </section>
    </main>
  )
}
