import type { Metadata } from "next"

import { SyncStatusTile } from "../../components/pwa-shell"
import { PageHeader } from "../../components/page-header"
import {
  CREW_SYNC_ENTITIES,
  ERROR_SYNC_ENTITIES,
  QUIET_SYNC_ENTITIES,
} from "../_mock-data"
import styles from "../pwa-shell.module.css"

export const metadata: Metadata = {
  title: "Sync status tile | UI Primitives — PWA Shell",
}

export default function SyncStatusTilePage() {
  return (
    <main className={styles.subRoute}>
      <PageHeader
        kicker="PWA / Shell · 05"
        title="Sync status tile"
        description="Per-entity queue depth with last-sync timestamps and a retry CTA. Sits on the home grid so the workshop crew can see at a glance whether the bay queue is current."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "PWA Shell", href: "/ui-primitives/pwa-shell" },
          { label: "Sync status tile" },
        ]}
      />
      <section className={styles.canvas} aria-label="Sync status tile states">
        <div className={styles.note}>
          <span>Use case</span>
          <p>
            The reception runs through this tile every morning before opening the workshop. Twelve
            pending parts movements + last sync nine minutes ago means the back dock scanner is out
            of sync — retry first, then walk back to investigate.
          </p>
        </div>
        <div className={styles.states}>
          <div className={styles.stateCard}>
            <header className={styles.stateHead}>
              <span className={styles.stateKicker}>State · 01</span>
              <h2 className={styles.stateTitle}>All synced</h2>
            </header>
            <p className={styles.stateBody}>Pending count zero, last-sync just now.</p>
            <SyncStatusTile
              state="idle"
              entities={QUIET_SYNC_ENTITIES}
              lastSyncedAt="Just now"
            />
          </div>
          <div className={styles.stateCard}>
            <header className={styles.stateHead}>
              <span className={styles.stateKicker}>State · 02</span>
              <h2 className={styles.stateTitle}>Syncing · catching up</h2>
            </header>
            <p className={styles.stateBody}>Cloud icon spins, retry button disabled.</p>
            <SyncStatusTile
              state="syncing"
              entities={CREW_SYNC_ENTITIES}
              lastSyncedAt="4m ago"
              nextSyncAt="0:18"
            />
          </div>
          <div className={styles.stateCard}>
            <header className={styles.stateHead}>
              <span className={styles.stateKicker}>State · 03</span>
              <h2 className={styles.stateTitle}>Sync failed · 18 parts pending</h2>
            </header>
            <p className={styles.stateBody}>
              Big retry CTA. Pending pills go amber, last-sync stamp goes stale.
            </p>
            <SyncStatusTile
              state="error"
              entities={ERROR_SYNC_ENTITIES}
              lastSyncedAt="27m ago"
            />
          </div>
        </div>
      </section>
    </main>
  )
}
