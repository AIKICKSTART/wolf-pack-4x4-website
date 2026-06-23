"use client"

import { useState } from "react"

import { PageHeader } from "../../components/page-header"
import { TimeOffRequestForm } from "../../components/roster/time-off-request-form"
import type { TimeOffSubmission } from "../../components/roster/time-off-request-form"
import styles from "../roster.module.css"

export default function TimeOffRequestPage() {
  const [last, setLast] = useState<TimeOffSubmission | null>(null)

  return (
    <main className={styles.page}>
      <PageHeader
        kicker="29.04 / Roster"
        title="Time off request"
        description="Annual, Sick, Long-service, RDO, Carer's — pick leave type, choose dates, hand it to the manager."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Roster", href: "/ui-primitives/roster" },
          { label: "Time off request" },
        ]}
      />
      <section className={styles.canvas}>
        <TimeOffRequestForm onSubmit={(payload) => setLast(payload)} />
        <div className={styles.note}>
          <span>Behaviour</span>
          <p>
            Leave type chips render as a radio-group, the two dates use native
            inputs (HTML5 date pickers), and the reason text is optional.
            {last
              ? ` Last submission: ${last.leaveType}, ${last.startDate} → ${last.endDate}.`
              : ""}
          </p>
        </div>
      </section>
    </main>
  )
}
