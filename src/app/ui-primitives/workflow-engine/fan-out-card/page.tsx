import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { FanOutCard } from "../../components/workflow-engine"

import { WELCOME_FAN_OUT_LANES } from "../_mock-data"
import styles from "../workflow-engine.module.css"

export const metadata: Metadata = {
  title: "Fan-out card | Workflow engine",
  description:
    "Primitive 07 — fan-out parallelization with per-lane status, runtime and join strategy.",
}

export default function FanOutCardScene() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 07 / Parallel"
        title="Fan-out card"
        description="When a workflow needs to hit multiple downstreams at once. New customer welcome fans out SMS + email + loyalty card all in parallel — bars show per-lane runtime, status pill drives the lane tone, and the join strategy chip declares whether we wait for everyone, the first to finish, or race for best score."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Workflow engine", href: "/ui-primitives/workflow-engine" },
          { label: "Fan-out card" },
        ]}
      />

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>
          New customer welcome · wait for all
        </span>
        <FanOutCard
          kicker="Customer welcome · v2"
          title="Triple-tap welcome"
          join="all"
          lanes={WELCOME_FAN_OUT_LANES}
          concurrencyCap={4}
        />
      </section>

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>
          Recall reach-out · race · first acknowledgement wins
        </span>
        <FanOutCard
          kicker="Recall hit · vehicle owner"
          title="Reach owner across channels"
          join="first"
          lanes={[
            {
              id: "lane-sms-r",
              label: "SMS · primary mobile",
              service: "Twilio · sms.send",
              status: "passed",
              runtimeMs: 980,
            },
            {
              id: "lane-call-r",
              label: "Auto-call · primary mobile",
              service: "Twilio · voice.create",
              status: "skipped",
              runtimeMs: 0,
            },
            {
              id: "lane-email-r",
              label: "Email · primary",
              service: "Mailgun · transactional",
              status: "running",
              runtimeMs: 2_240,
            },
          ]}
          concurrencyCap={3}
        />
      </section>

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>
          Quote variants · race · best-priced wins
        </span>
        <FanOutCard
          kicker="Quote estimator"
          title="3-supplier price race"
          join="race"
          lanes={[
            {
              id: "lane-burnett",
              label: "Supplier · Burnett",
              service: "REST · parts.search",
              status: "passed",
              runtimeMs: 410,
            },
            {
              id: "lane-coxall",
              label: "Supplier · Coxall Mufflers",
              service: "REST · parts.search",
              status: "passed",
              runtimeMs: 1_120,
            },
            {
              id: "lane-redback",
              label: "Supplier · Redback Extreme",
              service: "REST · parts.search",
              status: "failed",
              runtimeMs: 4_800,
            },
          ]}
        />
      </section>
    </main>
  )
}
