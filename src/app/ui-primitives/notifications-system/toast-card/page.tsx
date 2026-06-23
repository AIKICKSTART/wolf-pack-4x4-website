import type { Metadata } from "next"

import { ToastCard } from "../../components/notifications-system"
import { PageHeader } from "../../components/page-header"

import { ToastCardActionDemos } from "../_interactive-demos"
import styles from "../notifications-system.module.css"

export const metadata: Metadata = {
  title: "Toast card | Notifications system",
  description:
    "Primitive 02 — single toast card with four tones, optional action, optional countdown timer.",
}

export default function ToastCardScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 02 / Toast card"
        title="Toast card"
        description="The atomic unit of the toast stack. Renders title, optional description, optional meta line, an optional action, and an optional countdown timer that auto-dismisses unless prefers-reduced-motion is set."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Notifications system", href: "/ui-primitives/notifications-system" },
          { label: "Toast card" },
        ]}
      />

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>State A — Four tones (no countdown)</span>
        <div className={styles.demoStack}>
          <ToastCard
            tone="info"
            title="Hermes detected a recall hit"
            description="Recall 24-AB17 matches 3 vehicles on file."
            actionLabel="Review"
            durationMs={0}
          />
          <ToastCard
            tone="success"
            title="Bay 3 — JC-7782 complete"
            description="Hermes closed the job 2 minutes ago."
            actionLabel="Send pickup SMS"
            durationMs={0}
          />
          <ToastCard
            tone="warning"
            title="Roadworthy expiring · AGY-118"
            description="Pink slip lapses 07 Jun. Wed slot available."
            actionLabel="Book"
            durationMs={0}
          />
          <ToastCard
            tone="danger"
            title="Payment failed · INV-9931"
            description="Visa ending 4422 declined for the FPV deposit."
            actionLabel="Retry capture"
            durationMs={0}
          />
        </div>
      </section>

      <ToastCardActionDemos />
    </main>
  )
}
