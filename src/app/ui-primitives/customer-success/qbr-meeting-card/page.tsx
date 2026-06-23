import type { Metadata } from "next"

import { QbrMeetingCard } from "../../components/customer-success"
import { PageHeader } from "../../components/page-header"
import { SAMPLE_QBR_AGENDA, SAMPLE_QBR_OUTCOMES } from "../fixtures"

import styles from "../customer-success.module.css"

export const metadata: Metadata = {
  title: "QBR meeting card | Customer success",
  description:
    "Primitive 09 — Quarterly Business Review meeting card with scheduled date, agenda items, and last-QBR outcomes.",
}

export default function QbrMeetingCardScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 09 / QBR"
        title="QBR meeting card"
        description="A briefing card the CSM brings to the QBR — date stamp, owner-tagged agenda, and tone-coded outcomes from the prior session."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Customer success", href: "/ui-primitives/customer-success" },
          { label: "QBR meeting card" },
        ]}
      />

      <div className={styles.demoTwo}>
        <section className={styles.demoSurface}>
          <span className={styles.demoLabel}>Wollongong Express Fleet · upcoming QBR</span>
          <QbrMeetingCard
            customerName="Wollongong Express Fleet"
            scheduledIso="2026-06-18T10:00:00+10:00"
            location="On-site · Bay 2 walk-through"
            agenda={SAMPLE_QBR_AGENDA}
            lastOutcomes={SAMPLE_QBR_OUTCOMES}
          />
        </section>
        <section className={styles.demoSurface}>
          <span className={styles.demoLabel}>Bayside Tow Co. · re-engagement QBR</span>
          <QbrMeetingCard
            customerName="Bayside Tow Co."
            scheduledIso="2026-06-26T13:30:00+10:00"
            location="Video — Meet"
            agenda={[
              { id: "btq1", label: "Reintroduce new fleet manager", owner: "Stuart" },
              { id: "btq2", label: "FY26 truck rotation cadence", owner: "Jordan" },
              { id: "btq3", label: "Cab-chassis fitment pricing", owner: "Marcus" },
              { id: "btq4", label: "Roadside support SLA review", owner: "Rita" },
            ]}
            lastOutcomes={[
              { id: "bto1", kind: "win", text: "Towing fleet refitted with full Hurricane systems Q4 2025." },
              { id: "bto2", kind: "risk", text: "Champion left role — new contact has cold relationship." },
              { id: "bto3", kind: "ask", text: "Open the new portal access on day one." },
            ]}
          />
        </section>
      </div>
    </main>
  )
}
