"use client"

import { useState } from "react"

import {
  MobileStatusBar,
  MobileViewport,
  SegmentedIos,
  type SegmentedOption,
  TopAppBar,
} from "../../components/mobile-shell"
import styles from "../mobile-shell.module.css"

const SEGMENTS: ReadonlyArray<SegmentedOption> = [
  { id: "open", label: "Open" },
  { id: "in-progress", label: "Progress" },
  { id: "complete", label: "Complete" },
]

const COPY: Record<string, string> = {
  open: "12 jobs booked but not started",
  "in-progress": "3 jobs across bays 1 and 2",
  complete: "38 closed in the last 30 days",
}

export function SegmentedDemo() {
  const [value, setValue] = useState<string>("in-progress")

  return (
    <div className={styles.split}>
      <MobileViewport label="Segmented iOS preview">
        <MobileStatusBar />
        <TopAppBar title="Jobs" />
        <div className={styles.previewBody}>
          <div style={{ padding: "0 var(--primitive-space-1)" }}>
            <SegmentedIos
              options={SEGMENTS}
              value={value}
              onChange={setValue}
              label="Job status filter"
            />
          </div>
          <p>{COPY[value]}</p>
        </div>
      </MobileViewport>
      <div className={styles.controls}>
        <div className={styles.controlsHead}>
          <h2 className={styles.controlsTitle}>Selected</h2>
          <span className={styles.helpLabel}>Radio semantics — only one option active at a time</span>
        </div>
        <div className={styles.controlsRow}>
          <span className={styles.statusPill}>{value}</span>
        </div>
      </div>
    </div>
  )
}
