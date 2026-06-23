import type { Metadata } from "next"

import { SnapshotListRow } from "../../components/backups"
import { PageHeader } from "../../components/page-header"
import { SNAPSHOTS } from "../demo-data"

import styles from "../backups.module.css"

export const metadata: Metadata = {
  title: "Snapshot list row | Backups",
  description:
    "Primitive 02 — Semantic table row for a snapshot: id, timestamp, size, duration, status chip, restore + delete actions.",
}

export default function SnapshotListRowScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 02 / Snapshot list row"
        title="Snapshot list row"
        description="A semantic <tr> primitive — id with resource subhead, ISO timestamp, byte-formatted size, duration, status chip, and restore + delete actions. Restore is disabled unless the snapshot is in a successful state."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Backups", href: "/ui-primitives/backups" },
          { label: "Snapshot list row" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Mufflermen snapshot list</span>
        <table className={styles.snapshotTable} aria-label="Snapshots">
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
    </main>
  )
}
