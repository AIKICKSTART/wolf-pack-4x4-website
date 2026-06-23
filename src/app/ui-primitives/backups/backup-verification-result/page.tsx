import type { Metadata } from "next"

import { BackupVerificationResult } from "../../components/backups"
import { PageHeader } from "../../components/page-header"
import { VERIFICATION_FAIL, VERIFICATION_PASS } from "../demo-data"

import styles from "../backups.module.css"

export const metadata: Metadata = {
  title: "Verification result | Backups",
  description:
    "Primitive 07 — Verification result card showing checksum + restore-test pass/fail, last-verified timestamp, and a manual verify-now CTA.",
}

export default function BackupVerificationResultScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 07 / Verification result"
        title="Backup verification result"
        description="Per-snapshot verification card. Pass and fail states share the same skeleton but the surface flips tone and exposes a remediation pathway when something failed. Useful for the verify pass on every recent snapshot."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Backups", href: "/ui-primitives/backups" },
          { label: "Verification result" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Quote DB · 06:00 verify pass</span>
        <BackupVerificationResult result={VERIFICATION_PASS} />
      </section>
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Workshop scheduler · 03:00 verify fail</span>
        <BackupVerificationResult result={VERIFICATION_FAIL} />
      </section>
    </main>
  )
}
