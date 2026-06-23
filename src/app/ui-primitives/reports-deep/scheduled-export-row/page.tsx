import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { ScheduledExportRow } from "../../components/reports-deep"
import { SCHEDULED_EXPORTS } from "../demo-data"

import styles from "../reports-deep.module.css"

export const metadata: Metadata = {
  title: "Scheduled export row | Reports-deep",
  description:
    "Primitive 02 — scheduled export row with cron expression, format chip, recipients across email/slack/teams/webhook and a paused/active switch.",
}

export default function ScheduledExportRowPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 02 / Scheduled export row"
        title="Scheduled export row"
        description="A list row for a scheduled report export — cron expression, next-run timestamp, file format chip, recipient bag across multiple channels and an active/paused switch. Mufflermen exports: weekly revenue, dyno bookings, parts margin and suburb performance."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Reports-deep", href: "/ui-primitives/reports-deep" },
          { label: "Scheduled export row" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive</span>
        <div className={styles.demoStack}>
          {SCHEDULED_EXPORTS.map((config) => (
            <ScheduledExportRow key={config.id} config={config} />
          ))}
        </div>
      </section>
    </main>
  )
}
