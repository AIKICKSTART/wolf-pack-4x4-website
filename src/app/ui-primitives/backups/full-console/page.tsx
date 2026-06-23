import type { Metadata } from "next"

import {
  BackupDestinationCard,
  BackupScheduleCard,
  BackupSizeChart,
  BackupVerificationResult,
  PointInTimeRecoverySlider,
  RetentionPolicyEditor,
  SnapshotListRow,
} from "../../components/backups"
import { PageHeader } from "../../components/page-header"
import {
  DESTINATIONS,
  PITR_WINDOW,
  RETENTION_RULES,
  SCHEDULES,
  SIZE_SAMPLES,
  SNAPSHOTS,
  VERIFICATION_PASS,
} from "../demo-data"

import styles from "../backups.module.css"

export const metadata: Metadata = {
  title: "Full backup console | Backups",
  description:
    "Composition — schedule card on top, snapshot list, retention editor in aside, backup size chart, verification result, point-in-time recovery slider, and a destination grid below.",
}

export default function BackupsFullConsolePage() {
  const primarySchedule = SCHEDULES[0]
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Composition / Full backup console"
        title="Full backup console"
        description="A representative composition for an operations console — primary resource schedule on top, snapshot list mid-page, retention rules in the aside, size trend below, verification + PITR slider, then the destination grid at the foot."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Backups", href: "/ui-primitives/backups" },
          { label: "Full console" },
        ]}
      />

      {primarySchedule ? (
        <section className={styles.demoSurface}>
          <span className={styles.demoLabel}>Primary schedule</span>
          <BackupScheduleCard schedule={primarySchedule} />
        </section>
      ) : null}

      <div className={styles.compositionLayout}>
        <div className={styles.compositionMain}>
          <section className={styles.demoSurface}>
            <span className={styles.demoLabel}>Recent snapshots</span>
            <table className={styles.snapshotTable} aria-label="Recent snapshots">
              <thead>
                <tr>
                  <th>ID / Resource</th>
                  <th>Created</th>
                  <th>Size</th>
                  <th>Duration</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {SNAPSHOTS.map((snap) => (
                  <SnapshotListRow key={snap.id} snapshot={snap} />
                ))}
              </tbody>
            </table>
          </section>

          <section className={styles.demoSurface}>
            <span className={styles.demoLabel}>Size trend</span>
            <BackupSizeChart
              samples={SIZE_SAMPLES}
              retentionHorizonIndex={7}
              growthProjectionBytes={22_500_000_000}
              title="Quote DB backup size"
            />
          </section>

          <section className={styles.demoSurface}>
            <span className={styles.demoLabel}>Latest verification</span>
            <BackupVerificationResult result={VERIFICATION_PASS} />
          </section>

          <section className={styles.demoSurface}>
            <span className={styles.demoLabel}>Point-in-time recovery</span>
            <PointInTimeRecoverySlider window={PITR_WINDOW} />
          </section>
        </div>

        <aside className={styles.compositionAside} aria-label="Retention policy">
          <RetentionPolicyEditor rules={RETENTION_RULES} />
        </aside>
      </div>

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Destinations</span>
        <div className={styles.miniGrid}>
          {DESTINATIONS.map((destination) => (
            <BackupDestinationCard key={destination.id} destination={destination} />
          ))}
        </div>
      </section>
    </main>
  )
}
