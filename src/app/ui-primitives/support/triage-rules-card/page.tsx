import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { TriageRulesCard } from "../../components/support"

import styles from "../support.module.css"

export const metadata: Metadata = {
  title: "Triage rules card | Support",
  description:
    "Primitive 13 — if-then-tag triage rule card following the existing form pattern.",
}

export default function TriageRulesCardScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 13 / Automation"
        title="Triage rules card"
        description="Each rule reads top-to-bottom: If [condition], then [route to team] + [set priority] + [tag with]. Active rules show a green Active chip, paused rules dim down. Uses the same field rhythm as the wider primitive form system."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Support", href: "/ui-primitives/support" },
          { label: "Triage rules card" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Three live triage rules</span>
        <div className={styles.demoStack}>
          <TriageRulesCard
            name="Manta warranty claims"
            condition="Subject or body contains warranty AND vendor.name = Manta"
            route="Workshop · Bay 2 (Sarah Pope)"
            setPriority="p1"
            tags={["warranty", "manta"]}
            matchCount={14}
          />
          <TriageRulesCard
            name="Pickup delays and tow truck escalations"
            condition="Subject contains tow OR pickup AND priority >= P0"
            route="Workshop manager (Bec Lawson)"
            setPriority="p0"
            tags={["pickup", "escalation"]}
            matchCount={3}
          />
          <TriageRulesCard
            name="Bay reschedule auto-route"
            condition="Subject contains reschedule AND channel in (SMS, Chat)"
            route="Workshop ops queue"
            setPriority="p2"
            tags={["bookings", "reschedule"]}
            enabled={false}
            matchCount={0}
          />
        </div>
      </section>
    </main>
  )
}
