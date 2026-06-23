import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { ScheduledDeliveryPreview } from "../../components/reports"
import { Sparkline } from "../../components/charts/sparkline"
import { KPI_SPARKS } from "../demo-data"

import styles from "../reports.module.css"

export const metadata: Metadata = {
  title: "Scheduled delivery preview | Reports",
  description:
    "Primitive 11 — preview surface for how the scheduled email or Slack message will appear.",
}

export default function ScheduledDeliveryPreviewScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 11 / Scheduled delivery preview"
        title="Scheduled delivery preview"
        description="A canonical preview of the message that recipients will receive — from address, subject, preheader, mini chart thumbnail, channel chip, and scheduled-for line."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Reports", href: "/ui-primitives/reports" },
          { label: "Scheduled delivery preview" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive</span>
        <ScheduledDeliveryPreview
          from="reports@mufflermen.com.au"
          to="ops@mufflermen.com.au · 4 others"
          subject="Weekly bay utilisation · 21 — 28 May"
          preheader="Oak Flats held 82% utilisation. Manta installs up 12.4% week-on-week."
          channel="email"
          scheduledFor="Mon 02 Jun · 06:00 AEST"
          thumbnail={
            <Sparkline
              points={KPI_SPARKS.revenue}
              tone="amber"
              ariaLabel="Manta revenue trend"
              width={360}
              height={120}
            />
          }
        />
      </section>
    </main>
  )
}
