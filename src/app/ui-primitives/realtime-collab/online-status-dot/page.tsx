import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { OnlineStatusDot } from "../../components/realtime-collab"
import styles from "../realtime-collab.module.css"

export const metadata: Metadata = {
  title: "Online status dot | UI Primitives - Realtime collab",
}

export default function OnlineStatusDotPage() {
  return (
    <main className={styles.page}>
      <PageHeader
        kicker="Realtime collab · 07"
        title="Online status dot"
        description="Tiny presence dot - green online with pulse, amber idle, red busy, grey offline. Four pixel sizes plus an optional inline label."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Realtime collab", href: "/ui-primitives/realtime-collab" },
          { label: "Online status dot" },
        ]}
      />
      <section className={styles.canvas}>
        <div className={styles.demoStage}>
          <span className={styles.demoLabel}>Four states · medium</span>
          <div className={styles.demoRowJustified}>
            <OnlineStatusDot status="online" size="md" label="Marcus" />
            <OnlineStatusDot status="idle" size="md" label="Jordan" />
            <OnlineStatusDot status="busy" size="md" label="Daniel" />
            <OnlineStatusDot status="offline" size="md" label="Priya" />
          </div>
        </div>
        <div className={styles.demoStage}>
          <span className={styles.demoLabel}>Size variants · online</span>
          <div className={styles.demoRowJustified}>
            <OnlineStatusDot status="online" size="xs" />
            <OnlineStatusDot status="online" size="sm" />
            <OnlineStatusDot status="online" size="md" />
            <OnlineStatusDot status="online" size="lg" />
          </div>
        </div>
        <div className={styles.demoStage}>
          <span className={styles.demoLabel}>No label · screen-reader announces status</span>
          <div className={styles.demoRowJustified}>
            <OnlineStatusDot status="online" size="lg" />
            <OnlineStatusDot status="idle" size="lg" />
            <OnlineStatusDot status="busy" size="lg" />
            <OnlineStatusDot status="offline" size="lg" />
          </div>
        </div>
        <div className={styles.note}>
          <span>Behaviour</span>
          <p>
            Pulse halo is conditional — defaults to <code>true</code> for online,
            opt-in for idle / busy via the <code>pulse</code> prop, and disabled
            for offline. Reduced-motion suppresses the halo entirely. When a label
            is provided the dot becomes a labelled row; without one, it stays a
            single role=&quot;img&quot; element with the status as its label.
          </p>
        </div>
      </section>
    </main>
  )
}
