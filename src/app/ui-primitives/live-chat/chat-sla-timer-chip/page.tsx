import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { ChatSlaTimerChip } from "../../components/live-chat"

import styles from "../live-chat.module.css"

export const metadata: Metadata = {
  title: "Chat SLA timer chip | Live chat",
  description:
    "Primitive 11 — per-chat first / next / resolve SLA timer chip with tone-shifting.",
}

export default function ChatSlaTimerChipScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 11 / SLA"
        title="Chat SLA timer chip"
        description="Per-chat SLA timer chip. Composes the support SlaTimerChip primitive and adds an optional context kicker (e.g. visitor name) so the chip works in a multi-chat tab strip. Tone shifts from green to amber to red as the SLA window closes, then to breached-red once it expires."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Live chat", href: "/ui-primitives/live-chat" },
          { label: "Chat SLA timer chip" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Three SLA buckets · three kinds</span>
        <div className={styles.demoRow}>
          <ChatSlaTimerChip remainingMinutes={245} kind="first-response" context="Mick" />
          <ChatSlaTimerChip remainingMinutes={56} kind="next-response" context="Leah" />
          <ChatSlaTimerChip remainingMinutes={22} kind="next-response" context="Visitor" />
          <ChatSlaTimerChip remainingMinutes={-4} kind="resolution" context="Tom" />
        </div>
      </section>
    </main>
  )
}
