"use client"

import { useState } from "react"

import {
  MobileStatusBar,
  MobileViewport,
  TabIndicatorStrip,
  type TabStripEntry,
  TopAppBar,
} from "../../components/mobile-shell"
import styles from "../mobile-shell.module.css"

const TABS: ReadonlyArray<TabStripEntry> = [
  { id: "today", label: "Today", count: 6 },
  { id: "scheduled", label: "Scheduled", count: 12 },
  { id: "waiting", label: "Waiting on parts", count: 4 },
  { id: "complete", label: "Complete", count: 38 },
  { id: "archived", label: "Archived" },
]

const COPY: Record<string, string> = {
  today: "Bay 1 and bay 2 are running. 4 quick services queued.",
  scheduled: "Tomorrow has 5 bookings — Holden, two Hyundais, a Mazda BT-50, and a courtesy car return.",
  waiting: "Manifold gasket and 2 mufflers ordered Mon · ETA Wed AM with Acme Exhausts.",
  complete: "Last 30 days · 38 jobs closed, 2 redos.",
  archived: "Older than 12 months. Read-only.",
}

export function TabStripDemo() {
  const [active, setActive] = useState<string>("today")

  return (
    <div className={styles.split}>
      <MobileViewport label="Tab strip preview">
        <MobileStatusBar />
        <TopAppBar title="Jobs" />
        <TabIndicatorStrip tabs={TABS} activeId={active} onSelect={setActive} />
        <div className={styles.previewBody}>
          <p>{COPY[active]}</p>
        </div>
      </MobileViewport>
      <div className={styles.controls}>
        <div className={styles.controlsHead}>
          <h2 className={styles.controlsTitle}>Active</h2>
          <span className={styles.helpLabel}>Click a tab in the preview to slide the underline</span>
        </div>
        <div className={styles.controlsRow}>
          <span className={styles.statusPill}>{active}</span>
        </div>
      </div>
    </div>
  )
}
