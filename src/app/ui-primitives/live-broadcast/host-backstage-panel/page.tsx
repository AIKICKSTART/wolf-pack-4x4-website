import type { Metadata } from "next"

import { HostBackstagePanel } from "../../components/live-broadcast"
import { PageHeader } from "../../components/page-header"

import styles from "../live-broadcast.module.css"

export const metadata: Metadata = {
  title: "Host backstage panel | Live broadcast",
  description:
    "Primitive 06 — backstage controls for the host: start/end stream, mute, slow-mode, raised-hands queue, mod reports, new supporters.",
}

export default function HostBackstagePanelPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 06 / Host backstage panel"
        title="Host backstage panel"
        description="Daniel's deck while streaming — start/end stream, host mic mute, slow-mode toggle, and quick triage of raised hands, mod reports, and new supporters."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Live broadcast", href: "/ui-primitives/live-broadcast" },
          { label: "Host backstage panel" },
        ]}
      />

      <section className={[styles.demoSurface, styles.demoTriple].join(" ")}>
        <div className={styles.demoStack}>
          <span className={styles.demoLabel}>Offline · ready to go live</span>
          <HostBackstagePanel
            phase="offline"
            counters={{ pendingRaiseHands: 0, reportsToReview: 0, newSupporters: 4 }}
          />
        </div>
        <div className={styles.demoStack}>
          <span className={styles.demoLabel}>Live · slow mode active · queue building</span>
          <HostBackstagePanel
            phase="live"
            counters={{ pendingRaiseHands: 5, reportsToReview: 2, newSupporters: 11 }}
            slowModeInitial
          />
        </div>
        <div className={styles.demoStack}>
          <span className={styles.demoLabel}>Live · mic muted · supplier launch peak</span>
          <HostBackstagePanel
            phase="live"
            counters={{ pendingRaiseHands: 18, reportsToReview: 5, newSupporters: 42 }}
            micInitial={false}
          />
        </div>
      </section>
    </main>
  )
}
