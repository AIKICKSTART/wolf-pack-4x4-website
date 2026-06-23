import type { Metadata } from "next"

import { ConversationListRail } from "../../components/inbox"
import { PageHeader } from "../../components/page-header"

import { DEMO_CONVERSATIONS } from "../demo-data"
import styles from "../inbox.module.css"

export const metadata: Metadata = {
  title: "Conversation list rail | Inbox primitives",
  description:
    "Primitive 01 — left rail with search input, filter chips (all / unread / mentions / customers / team), and scrollable conversation rows.",
}

export default function ConversationListPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 01 / Conversation list"
        title="Conversation list rail"
        description="A standalone left rail showing search, filters, and a scrollable list of conversations. Filter chips and search are interactive — selection state is local."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Inbox", href: "/ui-primitives/inbox" },
          { label: "Conversation list" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive</span>
        <ConversationListRail
          conversations={DEMO_CONVERSATIONS}
          activeId="c-mick"
        />
      </section>
    </main>
  )
}
