import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { ActiveAlertsInbox } from "../../components/status-page"

import { ACTIVE_ALERTS } from "../_mock-data"
import styles from "../status-page.module.css"

export const metadata: Metadata = {
  title: "Active alerts inbox | Status page",
  description:
    "Primitive 14 — inbox of firing alerts with ack / resolve cycle button and assignee avatar.",
}

export default function ActiveAlertsInboxScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 14 / Inbox"
        title="Active alerts inbox"
        description="An internal-facing inbox of currently firing alerts — severity chip, title, service, age, optional assignee avatar and an ack-state cycle button (firing → acknowledged → resolved). Stateful client component."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Status page", href: "/ui-primitives/status-page" },
          { label: "Active alerts inbox" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive · 4 alerts · ack interaction</span>
        <ActiveAlertsInbox
          caption="Firing alerts · 28 May · 19:46 AEST"
          alerts={ACTIVE_ALERTS}
        />
      </section>
    </main>
  )
}
