import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import {
  CustomerProfileSidebar,
  InternalNoteComposer,
  LinkedArticlesSuggester,
  MacroPicker,
  MultiChannelInbox,
  SupportConversationThread,
  TicketRow,
} from "../../components/support"

import {
  HILUX_CONVERSATION,
  INBOX_FILTERS,
  INBOX_TABS,
  LINKED_ARTICLES,
  MACRO_LIBRARY,
  MICK_NOTES,
  MICK_PRIOR_TICKETS,
  MICK_VEHICLES,
  TEAM_MENTIONS,
  TICKET_QUEUE,
} from "../_mock-data"
import styles from "../support.module.css"

export const metadata: Metadata = {
  title: "Full helpdesk | Support",
  description:
    "Composition — full Mufflermen helpdesk assembled from the 14 support primitives.",
}

export default function FullHelpdeskScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Composition / Full helpdesk"
        title="Mufflermen helpdesk"
        description="A composed helpdesk view — multi-channel inbox tab strip up top with the ticket queue in the left pane, the active Hilux fitment conversation in the centre with the macro picker open, and Mick Davis' profile, linked KB articles and the internal note composer down the right rail."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Support", href: "/ui-primitives/support" },
          { label: "Full helpdesk" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Composition · helpdesk for ticket MM-4187</span>
        <div className={styles.helpdeskShell}>
          <MultiChannelInbox
            tabs={INBOX_TABS}
            initialChannel="email"
            filters={INBOX_FILTERS}
          >
            <div className={styles.helpdeskMain}>
              <div className={styles.helpdeskCol}>
                {TICKET_QUEUE.map((ticket) => (
                  <TicketRow key={ticket.id} {...ticket} />
                ))}
              </div>
              <div className={styles.helpdeskCol}>
                <SupportConversationThread
                  ticketId="MM-4187"
                  ticketSubject="Hilux fitment query — Manta 3in cat-back"
                  entries={HILUX_CONVERSATION}
                />
                <MacroPicker macros={MACRO_LIBRARY} />
              </div>
              <div className={styles.helpdeskCol}>
                <CustomerProfileSidebar
                  name="Mick Davis"
                  email="mick.davis@example.com.au"
                  phone="+61 412 884 902"
                  location="Oak Flats, NSW"
                  lifetimeValueCents={1_284_500}
                  vehicles={MICK_VEHICLES}
                  priorTickets={MICK_PRIOR_TICKETS}
                  notes={MICK_NOTES}
                />
                <LinkedArticlesSuggester
                  ticketSubject="Hilux fitment query — Manta 3in cat-back"
                  suggestions={LINKED_ARTICLES}
                />
                <InternalNoteComposer mentionCandidates={TEAM_MENTIONS} />
              </div>
            </div>
          </MultiChannelInbox>
        </div>
      </section>
    </main>
  )
}
