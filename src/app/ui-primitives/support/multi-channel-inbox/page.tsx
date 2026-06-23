import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { MultiChannelInbox, TicketRow } from "../../components/support"

import { INBOX_FILTERS, INBOX_TABS, TICKET_QUEUE } from "../_mock-data"
import styles from "../support.module.css"

export const metadata: Metadata = {
  title: "Multi-channel inbox | Support",
  description:
    "Primitive 12 — unified inbox with channel tabs, filter chips and a ticket-list pane.",
}

export default function MultiChannelInboxScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 12 / Tabs"
        title="Multi-channel inbox"
        description="One inbox for every channel — Email, Chat, SMS, Phone, X, Facebook. Each tab carries a live count. Filter chips below toggle aria-pressed when active. The pane underneath renders whatever ticket list the parent decides to feed in — this view uses the same TicketRow primitive."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Support", href: "/ui-primitives/support" },
          { label: "Multi-channel inbox" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive · 6 tabs · 5 filters · 6 tickets in pane</span>
        <MultiChannelInbox
          tabs={INBOX_TABS}
          initialChannel="email"
          filters={INBOX_FILTERS}
        >
          {TICKET_QUEUE.map((ticket) => (
            <TicketRow key={ticket.id} {...ticket} />
          ))}
        </MultiChannelInbox>
      </section>
    </main>
  )
}
