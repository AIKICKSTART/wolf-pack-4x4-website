import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { PresenceActivityFeed } from "../../components/realtime-collab"
import { ACTIVITY_EVENTS } from "../mock-data"
import styles from "../realtime-collab.module.css"

export const metadata: Metadata = {
  title: "Presence activity feed | UI Primitives - Realtime collab",
}

export default function PresenceActivityFeedPage() {
  return (
    <main className={styles.page}>
      <PageHeader
        kicker="Realtime collab · 05"
        title="Presence activity feed"
        description="Live feed of who did what just now on a doc — composes data-display/ActivityFeed underneath, mapping collab event kinds to feed tones and timestamped descriptions."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Realtime collab", href: "/ui-primitives/realtime-collab" },
          { label: "Presence activity feed" },
        ]}
      />
      <section className={styles.canvas}>
        <div className={styles.demoStage}>
          <span className={styles.demoLabel}>Quote #Q-1408 · live events</span>
          <div className={styles.demoStack}>
            <PresenceActivityFeed
              events={ACTIVITY_EVENTS}
              title="Live on Quote #Q-1408"
            />
          </div>
        </div>
        <div className={styles.note}>
          <span>Behaviour</span>
          <p>
            Wraps the existing <code>data-display/ActivityFeed</code> primitive so
            additions auto-animate when the array changes. Collab event kinds map
            to feed tones — <code>joined</code>, <code>resolved</code>,
            <code>added</code> map to success; <code>renamed</code> maps to warn;
            everything else falls back to info. A live status dot pulses next to
            the title.
          </p>
        </div>
      </section>
    </main>
  )
}
