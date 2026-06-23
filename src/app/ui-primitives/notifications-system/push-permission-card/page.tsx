import type { Metadata } from "next"

import { PushPermissionCard } from "../../components/notifications-system"
import { PageHeader } from "../../components/page-header"

import styles from "../notifications-system.module.css"

export const metadata: Metadata = {
  title: "Push permission card | Notifications system",
  description:
    "Primitive 04 — browser push permission prompt with three states: prompt, granted, denied.",
}

export default function PushPermissionScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 04 / Push permission card"
        title="Push permission card"
        description="A soft-opt-in prompt before triggering the native browser permission dialog. Spells out the workshop benefits and keeps a friendly fallback when the customer says no."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Notifications system", href: "/ui-primitives/notifications-system" },
          { label: "Push permission card" },
        ]}
      />

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>State A — Prompt (initial)</span>
        <PushPermissionCard state="prompt" />
      </section>

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>State B — Granted (confirmation)</span>
        <PushPermissionCard state="granted" />
      </section>

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>State C — Denied (fallback copy)</span>
        <PushPermissionCard
          state="denied"
          title="Workshop alerts blocked"
          description="No worries — you'll still get quote and booking emails. Re-enable any time in your browser site settings."
        />
      </section>
    </main>
  )
}
