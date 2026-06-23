import type { Metadata } from "next"

import { WeeklyBriefingCard } from "../../components/admin-hub"
import { PageHeader } from "../../components/page-header"

import { WEEKLY_BRIEFING } from "../_mock-data"
import styles from "../admin-hub.module.css"

export const metadata: Metadata = {
  title: "Weekly briefing card | Admin hub",
  description:
    "Primitive 09 — Monday briefing card with highlights, watch-outs and action items. Three states — full briefing, light week, action-heavy backlog.",
}

const LIGHT_WEEK = {
  ...WEEKLY_BRIEFING,
  weekLabel: "Week of Mon 18 May 2026",
  items: WEEKLY_BRIEFING.items.slice(0, 3),
}

const ACTION_HEAVY = {
  ...WEEKLY_BRIEFING,
  weekLabel: "Week of Mon 11 May 2026",
  items: [
    ...WEEKLY_BRIEFING.items.filter((i) => i.kind === "action"),
    {
      id: "br-a-extra",
      kind: "action" as const,
      title: "Audit Tyro merchant cert expiry across all 3 terminals",
      detail: "Lessons-learned from INC-2026-05-28.",
      ownerInitials: "DF",
      dueLabel: "Fri 16 May",
    },
    {
      id: "br-a-extra2",
      kind: "action" as const,
      title: "Run Bay 4 wait-time root cause",
      detail: "NPS dipped — workshop manager investigating queue knock-on.",
      ownerInitials: "TH",
      dueLabel: "Thu 15 May",
    },
  ],
}

export default function WeeklyBriefingCardScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 09 / Weekly briefing card"
        title="Monday briefing card"
        description="Hermes-drafted briefing read with the first coffee — highlights, watch-outs and action items each with an owner avatar and optional due date. Three states — full briefing, light week, action-heavy backlog."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Admin hub", href: "/ui-primitives/admin-hub" },
          { label: "Weekly briefing card" },
        ]}
      />

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive · 3 states</span>

        <div className={styles.demoStack}>
          <div>
            <span className={styles.demoStateLabel}>State 1 · full briefing</span>
            <WeeklyBriefingCard briefing={WEEKLY_BRIEFING} />
          </div>

          <div>
            <span className={styles.demoStateLabel}>State 2 · light week</span>
            <WeeklyBriefingCard briefing={LIGHT_WEEK} />
          </div>

          <div>
            <span className={styles.demoStateLabel}>State 3 · action-heavy backlog</span>
            <WeeklyBriefingCard briefing={ACTION_HEAVY} />
          </div>
        </div>
      </section>
    </main>
  )
}
