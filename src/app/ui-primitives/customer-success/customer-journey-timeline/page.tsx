import type { Metadata } from "next"

import { CustomerJourneyTimeline } from "../../components/customer-success"
import { PageHeader } from "../../components/page-header"
import { SAMPLE_LIFECYCLE_HISTORY } from "../fixtures"

import styles from "../customer-success.module.css"

export const metadata: Metadata = {
  title: "Customer journey timeline | Customer success",
  description:
    "Primitive 06 — customer lifecycle: Acquisition → Onboarding → Adoption → Expansion → Renewal with current-stage marker and per-stage notes.",
}

export default function CustomerJourneyTimelineScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 06 / Journey"
        title="Customer journey timeline"
        description="Marks where each customer sits in their lifecycle. Past stages glow teal, the current stage glows green, future stages stay muted. Stage notes anchor moments in time."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Customer success", href: "/ui-primitives/customer-success" },
          { label: "Customer journey timeline" },
        ]}
      />

      <div className={styles.demoStack}>
        <section className={styles.demoSurface}>
          <span className={styles.demoLabel}>Wollongong Express Fleet · expansion</span>
          <CustomerJourneyTimeline
            customerName="Wollongong Express Fleet"
            currentStage="expansion"
            history={SAMPLE_LIFECYCLE_HISTORY}
          />
        </section>
        <section className={styles.demoSurface}>
          <span className={styles.demoLabel}>Mick Davis · adoption</span>
          <CustomerJourneyTimeline
            customerName="Mick Davis"
            currentStage="adoption"
            history={[
              { stage: "acquisition", enteredOnIso: "2025-02-10", note: "Walked in for a Hilux tune" },
              { stage: "onboarding", enteredOnIso: "2025-02-26", note: "First Manta turbo-back fitted" },
              { stage: "adoption", enteredOnIso: "2025-08-04", note: "On loyalty Platinum + online booking" },
            ]}
          />
        </section>
        <section className={styles.demoSurface}>
          <span className={styles.demoLabel}>Sarah Pope · renewal</span>
          <CustomerJourneyTimeline
            customerName="Sarah Pope"
            currentStage="renewal"
            history={[
              { stage: "acquisition", enteredOnIso: "2022-11-04" },
              { stage: "onboarding", enteredOnIso: "2022-12-12" },
              { stage: "adoption", enteredOnIso: "2023-05-18" },
              { stage: "expansion", enteredOnIso: "2024-07-22", note: "Added trade workshop subscription" },
              { stage: "renewal", enteredOnIso: "2026-05-12", note: "Up for renewal mid-July" },
            ]}
          />
        </section>
      </div>
    </main>
  )
}
