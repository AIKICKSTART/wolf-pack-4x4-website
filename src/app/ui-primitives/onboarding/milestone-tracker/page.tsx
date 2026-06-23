import type { Metadata } from "next"

import { MilestoneTracker } from "../../components/onboarding"
import { PageHeader } from "../../components/page-header"

import styles from "../onboarding.module.css"

export const metadata: Metadata = {
  title: "Milestone tracker | Onboarding",
  description:
    "Primitive 06 — horizontal tracker of 5 onboarding milestones with progress fill and an animated You-Are-Here marker.",
}

export default function MilestoneTrackerScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 06 / Milestones"
        title="Milestone tracker"
        description="A horizontal rail of activation milestones with a progress fill between them. Each milestone has a status (complete / current / upcoming), and the current milestone gets a You-Are-Here marker that gently pulses (suppressed under reduced motion)."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Onboarding", href: "/ui-primitives/onboarding" },
          { label: "Milestone tracker" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive — 5 Mufflermen activation milestones</span>
        <MilestoneTracker
          kicker="Activation"
          title="Mufflermen onboarding milestones"
          milestones={[
            {
              id: "workshop",
              label: "Workshop",
              caption: "Configured",
              status: "complete",
            },
            {
              id: "parts",
              label: "Parts",
              caption: "Imported",
              status: "complete",
            },
            {
              id: "stripe",
              label: "Stripe",
              caption: "Connecting",
              status: "current",
            },
            {
              id: "crew",
              label: "Crew",
              caption: "Invite team",
              status: "upcoming",
            },
            {
              id: "first-job",
              label: "First job",
              caption: "Book + invoice",
              status: "upcoming",
            },
          ]}
        />
      </section>
    </main>
  )
}
