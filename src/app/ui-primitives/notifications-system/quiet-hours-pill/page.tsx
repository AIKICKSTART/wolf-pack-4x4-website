import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"

import { QuietHoursPillDemos } from "../_interactive-demos"
import styles from "../notifications-system.module.css"

export const metadata: Metadata = {
  title: "Quiet hours pill | Notifications system",
  description:
    "Primitive 12 — current quiet-hours status pill with three states and edit affordance.",
}

export default function QuietHoursPillScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 12 / Quiet hours pill"
        title="Quiet hours pill"
        description="A small status pill that lives in the settings header so users always know whether quiet hours are currently in force, scheduled, or off."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Notifications system", href: "/ui-primitives/notifications-system" },
          { label: "Quiet hours pill" },
        ]}
      />

      <QuietHoursPillDemos />
    </main>
  )
}
