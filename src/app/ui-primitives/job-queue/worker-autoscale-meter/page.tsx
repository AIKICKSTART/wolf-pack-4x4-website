import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { WorkerAutoscaleMeter } from "../../components/job-queue"

import styles from "../job-queue.module.css"

export const metadata: Metadata = {
  title: "Worker autoscale meter | Job Queue",
  description:
    "Primitive 13 — autoscale meter showing current pod count, target pod count, and scale-in/scale-out cooldowns.",
}

export default function WorkerAutoscaleMeterPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 13 / Autoscale"
        title="Worker autoscale meter"
        description="Radial meter for the worker autoscaler — current pod count against ceiling, the target the autoscaler is converging on, and the active scale-out + scale-in cooldown windows."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Job queue", href: "/ui-primitives/job-queue" },
          { label: "Worker autoscale meter" },
        ]}
      />
      <WorkerAutoscaleMeter
        current={4}
        target={6}
        ceiling={12}
        scaleOutCooldown="30s"
        scaleInCooldown="5m"
      />
    </main>
  )
}
