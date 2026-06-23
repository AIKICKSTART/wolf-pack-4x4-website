import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { IncidentTimeline } from "../../components/observability"

import { INCIDENT_TIMELINE } from "../_mock-data"
import styles from "../observability.module.css"

export const metadata: Metadata = {
  title: "Incident timeline | Observability cockpit",
  description:
    "Primitive 14 — operational incident timeline with detect / page / ack / mitigate / comm / resolve events.",
}

export default function IncidentTimelineScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 14 / Incident response"
        title="Incident timeline"
        description="An operational incident timeline — each entry carries a timestamp, an event kind (detect · page · ack · mitigate · comm · resolve · note), a headline, optional body, the actor that produced the entry and optional severity + impact chips. Drives the post-incident review."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Observability", href: "/ui-primitives/observability" },
          { label: "Incident timeline" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive · 6 events · 28 May 19:42 → 20:08 AEST</span>
        <IncidentTimeline {...INCIDENT_TIMELINE} />
      </section>
    </main>
  )
}
