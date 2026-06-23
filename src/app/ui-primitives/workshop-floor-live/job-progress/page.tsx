import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { LiveJobProgressStrip } from "../../components/workshop-floor-live"
import type { LiveJobProgressStripProps } from "../../components/workshop-floor-live"
import styles from "../workshop-floor-live.module.css"

export const metadata: Metadata = {
  title: "Live job progress strip | UI Primitives — Workshop Floor Live",
}

const jobs: ReadonlyArray<LiveJobProgressStripProps> = [
  {
    jobNumber: "WS-2604-12",
    vehicle: "Hilux N80 GUN126R · Manta cat-back",
    percent: 64,
    checkpoints: [
      { stage: "drop-off", state: "done", at: "08:14" },
      { stage: "diagnostic", state: "done", at: "08:42" },
      { stage: "build", state: "active", at: "09:30" },
      { stage: "test", state: "pending" },
      { stage: "handover", state: "pending" },
    ],
  },
  {
    jobNumber: "WS-2604-09",
    vehicle: "Patrol Y62 · Dyno tune",
    percent: 82,
    checkpoints: [
      { stage: "drop-off", state: "done", at: "07:50" },
      { stage: "diagnostic", state: "done", at: "08:20" },
      { stage: "build", state: "done", at: "10:05" },
      { stage: "test", state: "active", at: "11:24" },
      { stage: "handover", state: "pending" },
    ],
  },
  {
    jobNumber: "WS-2604-15",
    vehicle: "VE Commodore SS · Mid-pipe diag",
    percent: 18,
    checkpoints: [
      { stage: "drop-off", state: "done", at: "11:02" },
      { stage: "diagnostic", state: "active", at: "11:14" },
      { stage: "build", state: "pending" },
      { stage: "test", state: "pending" },
      { stage: "handover", state: "pending" },
    ],
  },
]

export default function JobProgressPage() {
  return (
    <main className={styles.page}>
      <PageHeader
        kicker="23.03 / Workshop floor live"
        title="Live job progress strip"
        description="Per-job progress strip with Drop-off → Diagnostic → Build → Test → Handover checkpoints, plus an overall percentage that updates as stages tick over."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Workshop floor live", href: "/ui-primitives/workshop-floor-live" },
          { label: "Job progress" },
        ]}
      />
      <section className={styles.canvas}>
        <div className={styles.row}>
          {jobs.map((j) => (
            <LiveJobProgressStrip key={j.jobNumber} {...j} />
          ))}
        </div>
        <div className={styles.note}>
          <span>Behaviour</span>
          <p>
            Active checkpoints get an amber halo, completed stages a green dot
            with a tick, skipped stages strike through. Bar fill is teal when
            the job is in build, amber on test, signalling the changeover point
            to the next floor lead on shift.
          </p>
        </div>
      </section>
    </main>
  )
}
