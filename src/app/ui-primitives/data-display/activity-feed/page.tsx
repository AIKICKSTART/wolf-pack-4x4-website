import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { ActivityFeed } from "../../components/data-display"
import type { ActivityFeedItem } from "../../components/data-display"
import styles from "../sub-route.module.css"

export const metadata: Metadata = {
  title: "Activity feed | UI Primitives — Data display",
}

const events: ReadonlyArray<ActivityFeedItem> = [
  {
    id: "evt-001",
    title: "Quote Q-2841 approved — Magnaflow midpipe install",
    description: "Customer accepted A$1,184 quote. Bay 2 booked Thu 09:30.",
    timestamp: "2 min ago",
    tone: "success",
    actor: { name: "Lana Petrov" },
    actions: (
      <>
        <button type="button">Open quote</button>
        <button type="button">Notify bay 2</button>
      </>
    ),
  },
  {
    id: "evt-002",
    title: "EGT outlier · Bay 3 cyl 4 knocked into amber band",
    description: "Threshold breached for 38s. Tip thermocouple reporting steady; advise inspection.",
    timestamp: "11 min ago",
    tone: "warn",
    actor: { name: "Telemetry mesh" },
  },
  {
    id: "evt-003",
    title: "Stock received — Redback 3-into-1 headers (4 units)",
    description: "PO RX-9981 closed. Cycle count auto-adjusted.",
    timestamp: "42 min ago",
    tone: "info",
    actor: { name: "Daniel Cho" },
  },
  {
    id: "evt-004",
    title: "Customer no-show — Booking #B-2274",
    description: "10:00 slot vacated. Slot reopened to walk-in queue.",
    timestamp: "1 h ago",
    tone: "error",
    actor: { name: "Booking core" },
    actions: (
      <>
        <button type="button">Reschedule</button>
        <button type="button">Refund deposit</button>
      </>
    ),
  },
  {
    id: "evt-005",
    title: "Audit log archived — March 2026",
    description: "236 events, signed and pinned to evidence store.",
    timestamp: "3 h ago",
    tone: "info",
    actor: { name: "Hermes" },
  },
]

export default function ActivityFeedShowcase() {
  return (
    <main className={styles.page}>
      <PageHeader
        kicker="09.04 / Data display"
        title="Activity feed — workshop timeline"
        description="Polite aria-live region listing recent workshop events. The list animates new entries in via @formkit/auto-animate; reduced-motion users get static inserts."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Data display", href: "/ui-primitives/data-display" },
          { label: "Activity feed" },
        ]}
      />
      <section className={styles.canvas}>
        <div className={styles.feedPanel}>
          <ActivityFeed items={events} ariaLabel="Workshop activity timeline" />
        </div>
        <div className={styles.note}>
          <span>Accessibility</span>
          <p>
            The feed declares aria-live=&quot;polite&quot; with aria-relevant=&quot;additions&quot;, so
            screen-readers announce new events without interrupting current narration.
          </p>
        </div>
      </section>
    </main>
  )
}
