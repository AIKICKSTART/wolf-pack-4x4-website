import type { Metadata } from "next"

import { RestoreProgressStatus } from "../../components/backups"
import { PageHeader } from "../../components/page-header"
import { RESTORE_PROGRESS } from "../demo-data"

import styles from "../backups.module.css"

export const metadata: Metadata = {
  title: "Restore progress status | Backups",
  description:
    "Primitive 12 — Live restore progress surface — rows / total, ETA, throughput chip, and pause/resume CTA.",
}

export default function RestoreProgressStatusScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 12 / Restore progress"
        title="Restore progress status"
        description="In-progress restore card showing rows restored / total, throughput, ETA, and a pause/resume CTA. Includes both running and paused tones."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Backups", href: "/ui-primitives/backups" },
          { label: "Restore progress" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Restore running</span>
        <RestoreProgressStatus progress={RESTORE_PROGRESS} />
      </section>
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Restore paused</span>
        <RestoreProgressStatus
          progress={{
            ...RESTORE_PROGRESS,
            snapshotId: "snap-cms-media-20260528-02",
            resourceName: "CMS media",
            rowsRestored: 612_400,
            totalRows: 4_120_000,
            throughputRps: 0,
            etaSec: 7_200,
            paused: true,
          }}
        />
      </section>
    </main>
  )
}
