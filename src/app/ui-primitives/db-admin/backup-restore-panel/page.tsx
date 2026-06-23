import type { Metadata } from "next"

import { BackupRestorePanel } from "../../components/db-admin"
import { PageHeader } from "../../components/page-header"

import { BACKUPS } from "../_mock-data"
import styles from "../db-admin.module.css"

export const metadata: Metadata = {
  title: "Backup / restore panel | DB Admin",
  description:
    "Primitive 14 — backup / restore panel with scheduled backups list, manual backup CTA, and three-step restore wizard.",
}

export default function BackupRestorePanelScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 14 / Backup / restore panel"
        title="Backup / restore panel"
        description="A backup and restore surface. The list summarises scheduled and manual backups with kind chip, timestamp, size, and retention. A manual backup CTA sits in the header. The restore wizard walks through three steps (Select → Review → Confirm) and surfaces the dangerous nature of the action."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "DB Admin", href: "/ui-primitives/db-admin" },
          { label: "Backup / restore panel" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive — current backups</span>
        <BackupRestorePanel backups={BACKUPS} />
      </section>
    </main>
  )
}
