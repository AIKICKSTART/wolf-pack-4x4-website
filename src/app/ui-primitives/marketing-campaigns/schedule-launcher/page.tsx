import type { Metadata } from "next"

import { ScheduleLauncher } from "../../components/marketing-campaigns"
import { PageHeader } from "../../components/page-header"

import styles from "../marketing-campaigns.module.css"

export const metadata: Metadata = {
  title: "Schedule launcher | Marketing campaigns",
  description:
    "Primitive 05 — pick send mode (now / specific / recurring / optimized) with a timezone picker.",
}

export default function ScheduleLauncherScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 05 / Schedule launcher"
        title="Schedule launcher"
        description="Choose how the campaign launches — fire immediately, target a specific time, recur on a cadence, or use the per-contact send-time optimizer. Timezone picker is mandatory when the campaign sends in the future."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Marketing campaigns", href: "/ui-primitives/marketing-campaigns" },
          { label: "Schedule launcher" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive</span>
        <ScheduleLauncher
          defaultMode="specific"
          defaultDateTime="2026-06-02T18:30"
          defaultTimezone="Australia/Sydney"
        />
      </section>
    </main>
  )
}
