import type { Metadata } from "next"
import Link from "next/link"

import { PageHeader } from "../../components/page-header"
import { StateOffline } from "../../components/states"
import styles from "../states.module.css"

export const metadata: Metadata = {
  title: "Offline | UI Primitives — System States",
}

export default function OfflineShowcase() {
  return (
    <main className={styles.subPage}>
      <PageHeader
        kicker="14.09 / System states"
        title="No signal · offline"
        description="Signal tower with a thick red strike-through. Retry attempts counter, last-online timestamp, and a cached-data note so the workshop can keep moving."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "System states", href: "/ui-primitives/states" },
          { label: "Offline" },
        ]}
      />
      <section className={styles.canvas}>
        <StateOffline
          retryCount={4}
          lastOnlineAt="2026-05-28 09:18 AEST"
          cachedDataNote="You can still browse your last opened quote, the ledger snapshot taken at 09:18, and the morning bay schedule from the local cache. Submissions will queue and flush when the mesh comes back."
          primaryAction={
            <Link href="/ui-primitives/states/offline" className={styles.btnRed}>
              Retry connection
            </Link>
          }
          secondaryAction={
            <Link href="/ui-primitives/data-display" className={styles.btnGhost}>
              Open cached ledger
            </Link>
          }
        />
        <aside className={styles.note}>
          <span>Accessibility</span>
          <p>
            Role=&quot;status&quot; with aria-live=&quot;polite&quot;. Wave pulses freeze under
            prefers-reduced-motion so users with vestibular sensitivity are not pinged repeatedly.
          </p>
        </aside>
      </section>
    </main>
  )
}
