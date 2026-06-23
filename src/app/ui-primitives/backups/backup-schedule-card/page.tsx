import type { Metadata } from "next"

import { BackupScheduleCard } from "../../components/backups"
import { PageHeader } from "../../components/page-header"
import { SCHEDULES } from "../demo-data"

import styles from "../backups.module.css"

export const metadata: Metadata = {
  title: "Backup schedule card | Backups",
  description:
    "Primitive 01 — Schedule card with frequency chip, cron expression, next-run countdown, last-run status, retention summary and enabled toggle.",
}

export default function BackupScheduleCardScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 01 / Backup schedule card"
        title="Backup schedule card"
        description="Per-resource schedule card — frequency, cron, next-run countdown, last-run status chip, retention summary and an enabled toggle. Countdown ticks every 30 seconds."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Backups", href: "/ui-primitives/backups" },
          { label: "Backup schedule card" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Mufflermen production schedules</span>
        <div className={styles.miniGrid}>
          {SCHEDULES.map((schedule) => (
            <BackupScheduleCard key={schedule.id} schedule={schedule} />
          ))}
        </div>
      </section>
    </main>
  )
}
