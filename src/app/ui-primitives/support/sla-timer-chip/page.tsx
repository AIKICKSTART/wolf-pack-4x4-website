import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { SlaTimerChip } from "../../components/support"

import styles from "../support.module.css"

export const metadata: Metadata = {
  title: "SLA timer chip | Support",
  description:
    "Primitive 06 — live SLA chip with tone shifting from safe to breached.",
}

export default function SlaTimerChipScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 06 / Live chip"
        title="SLA timer chip"
        description="Live SLA timer — green when more than 4 hours remain, amber inside the 1-4 hour window, red under one hour and critical-red once breached. role=status + aria-live so screen readers pick up the bucket without spamming on every tick."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Support", href: "/ui-primitives/support" },
          { label: "SLA timer chip" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>All four buckets · auto-detected from remaining minutes</span>
        <div className={styles.demoRow}>
          <SlaTimerChip remainingMinutes={6 * 60} label="First response" />
          <SlaTimerChip remainingMinutes={120} label="First response" />
          <SlaTimerChip remainingMinutes={18} label="Resolution" />
          <SlaTimerChip remainingMinutes={-42} label="Resolution" />
        </div>
        <span className={styles.demoLabel}>Days remaining · long horizon</span>
        <div className={styles.demoRow}>
          <SlaTimerChip remainingMinutes={2 * 24 * 60 + 4 * 60} label="Resolution" />
          <SlaTimerChip remainingMinutes={5 * 24 * 60} label="Warranty close" />
        </div>
      </section>
    </main>
  )
}
