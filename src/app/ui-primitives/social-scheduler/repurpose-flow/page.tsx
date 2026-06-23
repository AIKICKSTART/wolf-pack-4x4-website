import type { Metadata } from "next"

import { RepurposeFlow } from "../../components/social-scheduler"
import { PageHeader } from "../../components/page-header"

import { REPURPOSE_STAGES } from "../_mock-data"
import styles from "../social-scheduler.module.css"

export const metadata: Metadata = {
  title: "Repurpose flow | Muffler Pulse",
  description:
    "Primitive 10 — repurpose pipeline from blog → tweet thread → reel → carousel → shorts.",
}

export default function RepurposeFlowPage() {
  const allReady = REPURPOSE_STAGES.map((stage) => ({ ...stage, state: "ready" as const }))
  const blockedAtThread = REPURPOSE_STAGES.map((stage) =>
    stage.id === "rs-thread"
      ? { ...stage, state: "blocked" as const, note: "Brand legal flagged a model claim — needs rework." }
      : stage,
  )

  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 10 / Repurpose flow"
        title="Repurpose pipeline"
        description="One build, five surfaces. The pipeline keeps Daniel, Mia and Jordan on the same page about who owns which derivative and when it ships."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Social scheduler", href: "/ui-primitives/social-scheduler" },
          { label: "Repurpose flow" },
        ]}
      />

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>State A · Mixed states (default)</span>
        <RepurposeFlow stages={REPURPOSE_STAGES} />
      </section>

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>State B · All ready — ready to schedule</span>
        <RepurposeFlow
          title="Cleared for queue"
          stages={allReady}
        />
      </section>

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>State C · Blocked mid-pipeline (legal hold)</span>
        <RepurposeFlow
          title="On hold"
          stages={blockedAtThread}
        />
      </section>
    </main>
  )
}
