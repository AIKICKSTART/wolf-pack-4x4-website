import type { Metadata } from "next"
import { AlertTriangle, BellRing, CheckCircle2, Package, Wrench } from "lucide-react"

import { PageHeader } from "../../components/page-header"
import { NotificationInbox } from "../../components/data-display"
import type { NotificationItem } from "../../components/data-display"
import styles from "../sub-route.module.css"

export const metadata: Metadata = {
  title: "Notification inbox | UI Primitives — Data display",
}

const items: ReadonlyArray<NotificationItem> = [
  {
    id: "n-001",
    title: "PO RX-9981 received — 4 × Redback headers",
    sub: "Stock now: 12 units. Reorder threshold: 6.",
    timestamp: "Just now",
    source: "Parts core",
    tone: "success",
    icon: <Package />,
    unread: true,
  },
  {
    id: "n-002",
    title: "@danf flagged exhaust EGT outlier on bay 3",
    sub: "Threshold crossed for 38s · review tip sniffer trace.",
    timestamp: "11 min ago",
    source: "Telemetry",
    tone: "warn",
    icon: <AlertTriangle />,
    unread: true,
    mention: true,
  },
  {
    id: "n-003",
    title: "Service window completed — Holden Commodore VE",
    sub: "Job J-1148 closed. Tech: Lana P. · Invoice queued.",
    timestamp: "32 min ago",
    source: "Workshop",
    tone: "success",
    icon: <CheckCircle2 />,
    unread: false,
  },
  {
    id: "n-004",
    title: "@mufflermen mentioned: stainless lab availability",
    sub: "Stainless Lab AU confirmed Q3 capacity for custom mandrel bends.",
    timestamp: "1 h ago",
    source: "Procurement",
    tone: "info",
    icon: <BellRing />,
    unread: true,
    mention: true,
  },
  {
    id: "n-005",
    title: "Bay 2 hoist scheduled service due in 2 days",
    sub: "Last inspection: 14 Mar. Next due: 30 May.",
    timestamp: "3 h ago",
    source: "Maintenance",
    tone: "warn",
    icon: <Wrench />,
    unread: false,
  },
]

export default function NotificationInboxShowcase() {
  return (
    <main className={styles.page}>
      <PageHeader
        kicker="09.05 / Data display"
        title="Notification inbox — workshop ops"
        description="Tab-switched inbox panel filtering by Unread, All, or Mentions. Each row is role=status with polite live announcements."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Data display", href: "/ui-primitives/data-display" },
          { label: "Notification inbox" },
        ]}
      />
      <section className={styles.canvas} style={{ maxWidth: 640, margin: "0 auto" }}>
        <NotificationInbox items={items} defaultFilter="unread" />
        <div className={styles.note}>
          <span>Filters</span>
          <p>
            Tabs filter by unread, all, or mention status. Footer mark-all-read accepts a callback;
            the inbox does not own server state, only display.
          </p>
        </div>
      </section>
    </main>
  )
}
