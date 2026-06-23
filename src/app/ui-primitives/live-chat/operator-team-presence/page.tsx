import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { OperatorTeamPresence } from "../../components/live-chat"

import { TEAM_PRESENCE } from "../_mock-data"
import styles from "../live-chat.module.css"

export const metadata: Metadata = {
  title: "Operator team presence | Live chat",
  description:
    "Primitive 13 — Slack-like presence panel with status dots and per-operator chat load chips.",
}

export default function OperatorTeamPresenceScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 13 / Presence"
        title="Operator team presence"
        description="A Slack-like presence panel for the live-chat team. Each row shows the operator's avatar with a status dot, name + role + status label and a current-chat-load chip. The chip turns amber at 75% capacity and red at full capacity so a glance tells you who can take the next pickup."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Live chat", href: "/ui-primitives/live-chat" },
          { label: "Operator team presence" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>
          Live primitive · 5 operators · mixed availability
        </span>
        <OperatorTeamPresence operators={TEAM_PRESENCE} />
      </section>
    </main>
  )
}
