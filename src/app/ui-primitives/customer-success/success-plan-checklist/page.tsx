import type { Metadata } from "next"

import { SuccessPlanChecklist } from "../../components/customer-success"
import { PageHeader } from "../../components/page-header"
import { SAMPLE_MILESTONES } from "../fixtures"

import styles from "../customer-success.module.css"

export const metadata: Metadata = {
  title: "Success plan checklist | Customer success",
  description:
    "Primitive 08 — per-customer success plan with milestones, due dates, and todo/in-progress/done/blocked states.",
}

export default function SuccessPlanChecklistScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 08 / Success plan"
        title="Success plan checklist"
        description="A focused checklist with state-tone borders. Customers see what's done, what's underway, what's still ahead, and where they're blocked."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Customer success", href: "/ui-primitives/customer-success" },
          { label: "Success plan checklist" },
        ]}
      />

      <div className={styles.demoTwo}>
        <section className={styles.demoSurface}>
          <span className={styles.demoLabel}>Wollongong Express Fleet · plan</span>
          <SuccessPlanChecklist
            customerName="Wollongong Express Fleet"
            milestones={SAMPLE_MILESTONES}
          />
        </section>
        <section className={styles.demoSurface}>
          <span className={styles.demoLabel}>Mick Davis · plan</span>
          <SuccessPlanChecklist
            customerName="Mick Davis"
            defaultExpanded={false}
            milestones={[
              {
                id: "md1",
                label: "First Hilux fitment",
                detail: "Manta turbo-back installed Bay 2",
                dueIso: "2025-02-26",
                state: "done",
              },
              {
                id: "md2",
                label: "Dyno baseline",
                detail: "Capture stock + tuned curves",
                dueIso: "2025-08-12",
                state: "done",
              },
              {
                id: "md3",
                label: "Loyalty Brodie reach",
                detail: "120 more points to hit Brodie",
                dueIso: "2026-07-30",
                state: "in-progress",
              },
              {
                id: "md4",
                label: "Annual referral renewal",
                detail: "Send the personalised mate code",
                dueIso: "2026-08-14",
                state: "todo",
              },
            ]}
          />
        </section>
      </div>
    </main>
  )
}
