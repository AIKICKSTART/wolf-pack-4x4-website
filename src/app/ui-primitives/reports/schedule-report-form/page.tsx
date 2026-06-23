import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { ScheduleReportForm } from "../../components/reports"

import styles from "../reports.module.css"

export const metadata: Metadata = {
  title: "Schedule report form | Reports",
  description:
    "Primitive 03 — frequency segments, recipients tag input, format picker, attach-data toggle.",
}

export default function ScheduleReportFormScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 03 / Schedule report form"
        title="Schedule report form"
        description="Pick frequency, list recipient inboxes, choose a delivery format, and decide whether to attach the raw data file alongside the rendered report."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Reports", href: "/ui-primitives/reports" },
          { label: "Schedule report form" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive</span>
        <ScheduleReportForm
          initialFrequency="weekly"
          initialFormat="pdf"
          initialRecipients={[
            "ops@mufflermen.com.au",
            "manta@mufflermen.com.au",
          ]}
        />
      </section>
    </main>
  )
}
