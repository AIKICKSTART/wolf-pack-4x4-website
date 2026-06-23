import type { Metadata } from "next"

import { DeployTimeline } from "../../components/deploy-console"
import { PageHeader } from "../../components/page-header"

import { DEPLOY_HISTORY } from "../_mock-data"
import styles from "../deploy-console.module.css"

export const metadata: Metadata = {
  title: "Deploy timeline | Deploy console",
  description:
    "Primitive 12 — chronological deploy history with author + duration + canary %.",
}

const SUCCEEDED_ONLY = DEPLOY_HISTORY.filter((entry) => entry.outcome === "succeeded")
const FAILED_OR_ROLLED = DEPLOY_HISTORY.filter(
  (entry) => entry.outcome !== "succeeded",
)

export default function DeployTimelineScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 12 / Timeline"
        title="Deploy timeline"
        description="Vertical rail of deploys, most recent first. Each card carries the version, outcome chip (succeeded / failed / rolled-back / running), canary %, target (production / preview / staging) and a 4-column meta grid with author / sha / start / duration."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Deploy console", href: "/ui-primitives/deploy-console" },
          { label: "Deploy timeline" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>State A · full history · last 6 deploys</span>
        <DeployTimeline entries={DEPLOY_HISTORY} />
      </section>
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>State B · happy path · succeeded only</span>
        <DeployTimeline
          entries={SUCCEEDED_ONLY}
          caption="Successful production deploys"
          kicker="Filtered · succeeded"
        />
      </section>
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>State C · failures + rollbacks · audit view</span>
        <DeployTimeline
          entries={FAILED_OR_ROLLED}
          caption="Failures + rollbacks"
          kicker="Filtered · non-success"
        />
      </section>
    </main>
  )
}
