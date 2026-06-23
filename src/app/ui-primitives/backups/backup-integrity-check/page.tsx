import type { Metadata } from "next"

import { BackupIntegrityCheck } from "../../components/backups"
import { PageHeader } from "../../components/page-header"
import { INTEGRITY_ROWS } from "../demo-data"

import styles from "../backups.module.css"

export const metadata: Metadata = {
  title: "Integrity check | Backups",
  description:
    "Primitive 13 — Integrity check surface with scan progress, per-snapshot pass/fail rows, and a remediate CTA on failures.",
}

export default function BackupIntegrityCheckScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 13 / Integrity check"
        title="Backup integrity check"
        description="Surface showing the running scan + a per-snapshot list with pass/fail tone. Failed rows expose a remediate CTA and announce themselves as alerts."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Backups", href: "/ui-primitives/backups" },
          { label: "Integrity check" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Nightly integrity scan</span>
        <BackupIntegrityCheck rows={INTEGRITY_ROWS} scanProgress={62} />
      </section>
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Scan complete · all passed</span>
        <BackupIntegrityCheck
          rows={INTEGRITY_ROWS.filter((row) => row.passed)}
          scanProgress={100}
          scanComplete
        />
      </section>
    </main>
  )
}
