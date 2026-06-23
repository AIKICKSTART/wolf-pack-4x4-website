import type { Metadata } from "next"

import { SlaResponseTimer } from "../../components/sales-leads"
import { PageHeader } from "../../components/page-header"

import styles from "../sales-leads.module.css"

export const metadata: Metadata = {
  title: "SLA response timer | Sales leads",
  description:
    "Primitive 13 — per-lead SLA response timer with tone-shifting fresh → due-soon → overdue → missed states.",
}

// Frozen "now" so the SLA demo is deterministic across renders.
const DEMO_NOW_ISO = "2026-05-29T11:00:00+10:00"
const DEMO_NOW_MS = Date.parse(DEMO_NOW_ISO)

export default function SlaTimerScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 13 / SLA timer"
        title="SLA response timer"
        description="Per-lead countdown to the contract SLA. Tone shifts from fresh through due-soon, overdue, and missed so the worst offender stands out."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Sales leads", href: "/ui-primitives/sales-leads" },
          { label: "SLA timer" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Four SLA states</span>
        <div className={styles.demoStack}>
          <SlaResponseTimer
            leadName="Mick Davis"
            receivedAtIso="2026-05-29T10:54:00+10:00"
            slaMinutes={30}
            nowMs={DEMO_NOW_MS}
          />
          <SlaResponseTimer
            leadName="Sarah Pope"
            receivedAtIso="2026-05-29T10:42:00+10:00"
            slaMinutes={30}
            nowMs={DEMO_NOW_MS}
          />
          <SlaResponseTimer
            leadName="Trent Williams"
            receivedAtIso="2026-05-29T10:26:00+10:00"
            slaMinutes={30}
            nowMs={DEMO_NOW_MS}
          />
          <SlaResponseTimer
            leadName="Albion Park Couriers"
            receivedAtIso="2026-05-29T10:00:00+10:00"
            slaMinutes={30}
            nowMs={DEMO_NOW_MS}
          />
        </div>
      </section>
    </main>
  )
}
