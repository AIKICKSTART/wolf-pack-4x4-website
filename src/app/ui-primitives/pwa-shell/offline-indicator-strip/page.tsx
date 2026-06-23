import type { Metadata } from "next"

import { OfflineIndicatorStrip } from "../../components/pwa-shell"
import { PageHeader } from "../../components/page-header"
import styles from "../pwa-shell.module.css"

export const metadata: Metadata = {
  title: "Offline indicator strip | UI Primitives — PWA Shell",
}

export default function OfflineIndicatorStripPage() {
  return (
    <main className={styles.subRoute}>
      <PageHeader
        kicker="PWA / Shell · 02"
        title="Offline indicator strip"
        description="Persistent connectivity strip that lives under the status bar. Online stays out of the way; offline goes loud red with a retry. Aria-live so a screen reader is told the second connection drops."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "PWA Shell", href: "/ui-primitives/pwa-shell" },
          { label: "Offline indicator strip" },
        ]}
      />
      <section className={styles.canvas} aria-label="Offline indicator states">
        <div className={styles.note}>
          <span>Use case</span>
          <p>
            Underground hoist bay 2 loses cellular signal mid-job. The strip flips to offline mode
            and queues the bay update locally — the mechanic keeps working, the strip says &quot;12
            pending parts updates&quot; until Wi-Fi reconnects.
          </p>
        </div>
        <div className={styles.states}>
          <div className={styles.stateCard}>
            <header className={styles.stateHead}>
              <span className={styles.stateKicker}>State · 01</span>
              <h2 className={styles.stateTitle}>Online · idle</h2>
            </header>
            <p className={styles.stateBody}>Green hairline, last sync timestamp.</p>
            <OfflineIndicatorStrip state="online" lastSyncedAt="just now" />
          </div>
          <div className={styles.stateCard}>
            <header className={styles.stateHead}>
              <span className={styles.stateKicker}>State · 02</span>
              <h2 className={styles.stateTitle}>Syncing</h2>
            </header>
            <p className={styles.stateBody}>Shimmer band, teal dot pulses while catch-up runs.</p>
            <OfflineIndicatorStrip state="syncing" pendingChanges={6} />
          </div>
          <div className={styles.stateCard}>
            <header className={styles.stateHead}>
              <span className={styles.stateKicker}>State · 03</span>
              <h2 className={styles.stateTitle}>Offline + retry</h2>
            </header>
            <p className={styles.stateBody}>
              Loud red with retry CTA. Aria-live assertive so it isn&apos;t missed.
            </p>
            <OfflineIndicatorStrip
              state="offline"
              pendingChanges={12}
            />
          </div>
          <div className={styles.stateCard}>
            <header className={styles.stateHead}>
              <span className={styles.stateKicker}>State · 04</span>
              <h2 className={styles.stateTitle}>Patchy signal</h2>
            </header>
            <p className={styles.stateBody}>Degraded variant — amber. Used for flaky 2G.</p>
            <OfflineIndicatorStrip
              state="degraded"
              pendingChanges={3}
            />
          </div>
        </div>
      </section>
    </main>
  )
}
