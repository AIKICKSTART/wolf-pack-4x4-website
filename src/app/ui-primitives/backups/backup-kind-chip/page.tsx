import type { Metadata } from "next"

import { BackupKindChip } from "../../components/backups"
import { PageHeader } from "../../components/page-header"

import styles from "../backups.module.css"

export const metadata: Metadata = {
  title: "Backup kind chip | Backups",
  description:
    "Primitive 11 — Backup-kind chip with tone variants for Full / Differential / Incremental / Log-only.",
}

export default function BackupKindChipScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 11 / Kind chip"
        title="Backup kind chip"
        description="Pill chip with a single-letter glyph followed by the full kind label. Tones split red (full), amber (differential), teal (incremental) and muted (log only). Two sizes are available."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Backups", href: "/ui-primitives/backups" },
          { label: "Kind chip" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Medium</span>
        <div className={styles.demoInline}>
          <BackupKindChip kind="full" />
          <BackupKindChip kind="differential" />
          <BackupKindChip kind="incremental" />
          <BackupKindChip kind="log_only" />
        </div>
      </section>
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Small</span>
        <div className={styles.demoInline}>
          <BackupKindChip kind="full" size="sm" />
          <BackupKindChip kind="differential" size="sm" />
          <BackupKindChip kind="incremental" size="sm" />
          <BackupKindChip kind="log_only" size="sm" />
        </div>
      </section>
    </main>
  )
}
