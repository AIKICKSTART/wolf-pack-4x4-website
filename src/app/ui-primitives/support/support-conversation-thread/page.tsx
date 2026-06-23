import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { SupportConversationThread } from "../../components/support"

import { HILUX_CONVERSATION } from "../_mock-data"
import styles from "../support.module.css"

export const metadata: Metadata = {
  title: "Support conversation thread | Support",
  description:
    "Primitive 03 — customer-support thread interleaving public replies and internal notes with per-entry channel indicator.",
}

export default function SupportConversationThreadScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 03 / Thread"
        title="Support conversation thread"
        description="Customer-support thread — distinct from the inbox / human-to-human message stream. Public replies sit on a soft teal bed, internal notes show a hatched amber field with a Not-visible chip. Each entry shows author, role, timestamp, channel (email / chat / SMS / phone summary) and visibility."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Support", href: "/ui-primitives/support" },
          { label: "Conversation thread" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive · Hilux fitment thread · five entries</span>
        <SupportConversationThread
          ticketId="MM-4187"
          ticketSubject="Hilux fitment query — Manta 3in cat-back"
          entries={HILUX_CONVERSATION}
        />
      </section>
    </main>
  )
}
