import type { Metadata } from "next"

import { NotificationCard } from "../../components/notifications"
import { PageHeader } from "../../components/page-header"

import styles from "../notifications.module.css"

export const metadata: Metadata = {
  title: "Notification card | Notifications",
  description:
    "Primitive 03 — standalone notification card with icon, title, excerpt, tone, action row, and mark-as-read CTA.",
}

export default function NotificationCardScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 03 / Card"
        title="Notification card"
        description="A single notification rendered as a self-contained article — tone-coded glyph or avatar, title plus excerpt, metadata, an action row, and a small read-state toggle in the right column."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Notifications", href: "/ui-primitives/notifications" },
          { label: "Card" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive</span>
        <div className={styles.demoStack}>
          <NotificationCard
            id="c1"
            kicker="Bookings"
            title="Booking confirmed — Bay 02 / 09:30"
            excerpt="Holden Commodore VZ for exhaust replacement. Marcus Wells assigned, customer SMS sent."
            timestamp="2 min ago"
            source="Bookings"
            tone="success"
            icon="✓"
            unread
            actions={[
              { label: "Open booking", variant: "primary" },
              { label: "Reschedule", variant: "secondary" },
            ]}
          />
          <NotificationCard
            id="c2"
            kicker="Workshop"
            title="Jordan @mentioned you on Job J-2103"
            excerpt={'"Need a hand swapping the muffler on the HiLux when you get a sec — Bay 03."'}
            timestamp="1 h ago"
            source="Workshop"
            tone="warn"
            actor={{ name: "Jordan Pham" }}
            unread
            actions={[
              { label: "Reply", variant: "primary" },
              { label: "View thread", variant: "secondary" },
            ]}
          />
          <NotificationCard
            id="c3"
            kicker="System"
            title="Compressor maintenance overdue"
            excerpt="Last service 89 days ago. Schedule before the next morning shift to avoid a noisy start."
            timestamp="3 h ago"
            source="Telemetry"
            tone="error"
            icon="!"
            actions={[{ label: "Schedule service", variant: "primary" }]}
          />
          <NotificationCard
            id="c4"
            kicker="Billing"
            title="Invoice INV-1043 paid — Tradie Fleet Co"
            excerpt="$612.50 via direct debit. No follow-up required."
            timestamp="Yesterday"
            source="Billing"
            tone="info"
            icon="$"
          />
        </div>
      </section>
    </main>
  )
}
