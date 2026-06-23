import type { Metadata } from "next"

import { PublishScheduler } from "../../components/content-studio"
import { PageHeader } from "../../components/page-header"

import styles from "../content-studio.module.css"

export const metadata: Metadata = {
  title: "Publish scheduler | Content studio",
  description:
    "Primitive 07 — calendar picker with timezone and republish cadence. Three states — Thursday morning one-off, weekly cadence, fortnightly Perth slot.",
}

export default function PublishSchedulerScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 07 / Publish scheduler"
        title="Publish scheduler"
        description="Pick a date on the mini calendar, set a time, choose a timezone, and decide whether the article repeats. Three states — Thursday morning one-off, weekly recap, fortnightly Perth-tz piece."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Content studio", href: "/ui-primitives/content-studio" },
          { label: "Publish scheduler" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive · 3 states</span>
        <div className={styles.demoStack}>
          <PublishScheduler
            defaultDate={new Date(2026, 5, 4)}
            defaultTime="08:30"
            defaultTimezone="AEST"
            defaultCadence="one-off"
          />
          <PublishScheduler
            defaultDate={new Date(2026, 5, 8)}
            defaultTime="07:15"
            defaultTimezone="AEST"
            defaultCadence="weekly"
          />
          <PublishScheduler
            defaultDate={new Date(2026, 5, 18)}
            defaultTime="12:00"
            defaultTimezone="AWST"
            defaultCadence="fortnightly"
          />
        </div>
      </section>
    </main>
  )
}
