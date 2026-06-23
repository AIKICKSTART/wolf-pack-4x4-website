import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { OperatorStatusPill } from "../../components/live-chat"

import { OperatorStatusMenuTriggerDemo } from "../_interactive-demos"
import styles from "../live-chat.module.css"

export const metadata: Metadata = {
  title: "Operator status pill | Live chat",
  description:
    "Primitive 03 — operator availability pill with pulsing status dot and one-liner hint.",
}

export default function OperatorStatusPillScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 03 / Pill"
        title="Operator status pill"
        description="The operator availability pill. Five states — Available, Away, In wrap-up, Busy, Offline. Dot pulses when the operator is actively in a queue-eligible state. Clicking the pill opens the status menu (showcase stub only)."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Live chat", href: "/ui-primitives/live-chat" },
          { label: "Operator status pill" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>All 5 states</span>
        <div className={styles.demoRow}>
          <OperatorStatusPill status="available" operatorName="Jordan" />
          <OperatorStatusPill status="away" operatorName="Sophie" />
          <OperatorStatusPill status="in-wrap" operatorName="Bec" />
          <OperatorStatusPill status="busy" operatorName="Sam" />
          <OperatorStatusPill status="offline" operatorName="Ash" />
        </div>
      </section>
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>With menu trigger</span>
        <OperatorStatusMenuTriggerDemo />
      </section>
    </main>
  )
}
