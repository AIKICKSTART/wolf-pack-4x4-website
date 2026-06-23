import type { Metadata } from "next"

import { CustomerContextRail } from "../../components/unified-inbox"
import { PageHeader } from "../../components/page-header"

import { MICK_PROFILE, MICK_RECENT_JOBS } from "../_mock-data"
import styles from "../unified-inbox.module.css"

export const metadata: Metadata = {
  title: "Customer context rail | Unified inbox primitives",
  description:
    "Primitive 07 — Customer 360 right rail with contact, LTV, past job count and recent-jobs list.",
}

export default function CustomerContextRailScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 07 / Context rail"
        title="Customer context rail"
        description="Right-rail Customer 360 docked next to the thread view. Pulls the customer profile, contact handles, lifetime value (AUD), past job count and the most recent jobs — fields Tim references before quoting a return customer."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Unified inbox", href: "/ui-primitives/unified-inbox" },
          { label: "Customer context rail" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Mick Davis · returning Hilux owner</span>
        <CustomerContextRail
          customer={MICK_PROFILE}
          recentJobs={MICK_RECENT_JOBS}
          persona="Returning · Hilux community"
        />
      </section>
    </main>
  )
}
