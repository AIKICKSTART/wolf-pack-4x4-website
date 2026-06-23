import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { TicketRow } from "../../components/support"

import { TICKET_QUEUE } from "../_mock-data"
import styles from "../support.module.css"

export const metadata: Metadata = {
  title: "Ticket row | Support",
  description:
    "Primitive 01 — helpdesk ticket row with customer avatar, status chip, priority chip and live SLA.",
}

export default function TicketRowScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 01 / Row"
        title="Ticket row"
        description="The workhorse helpdesk row — ticket id, subject, customer avatar, status chip, priority chip, assignee, last update and live SLA timer. Tone shifts with status. Used inside ticket lists and the unified inbox pane."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Support", href: "/ui-primitives/support" },
          { label: "Ticket row" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive · six rows · varied state</span>
        <div className={styles.demoStack}>
          {TICKET_QUEUE.map((ticket) => (
            <TicketRow key={ticket.id} {...ticket} />
          ))}
        </div>
      </section>
    </main>
  )
}
