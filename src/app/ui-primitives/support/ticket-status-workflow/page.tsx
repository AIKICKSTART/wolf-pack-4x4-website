import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { TicketStatusWorkflow } from "../../components/support"

import styles from "../support.module.css"

export const metadata: Metadata = {
  title: "Ticket status workflow | Support",
  description:
    "Primitive 07 — status workflow visualiser with current state highlighted and allowed-transition chips.",
}

export default function TicketStatusWorkflowScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 07 / Workflow"
        title="Ticket status workflow"
        description="New → Open → Pending customer → On hold → Resolved → Closed. Past states sit muted, the current state glows, and the allowed-transition chips underneath surface what the agent can move the ticket to next."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Support", href: "/ui-primitives/support" },
          { label: "Status workflow" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Five live states · one workflow per row</span>
        <div className={styles.demoStack}>
          <TicketStatusWorkflow current="new" />
          <TicketStatusWorkflow current="open" />
          <TicketStatusWorkflow current="pending" />
          <TicketStatusWorkflow current="resolved" />
          <TicketStatusWorkflow current="closed" />
        </div>
      </section>
    </main>
  )
}
