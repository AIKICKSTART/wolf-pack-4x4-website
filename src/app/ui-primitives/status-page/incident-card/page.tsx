import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { IncidentCard } from "../../components/status-page"

import { SMS_INCIDENT } from "../_mock-data"
import styles from "../status-page.module.css"

export const metadata: Metadata = {
  title: "Incident card | Status page",
  description:
    "Primitive 03 — incident card with severity, four-stage timeline, scope and subscribe CTA.",
}

export default function IncidentCardScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 03 / Card"
        title="Incident card"
        description="The headline card the status page shows while an incident is open. Severity chip, a four-step timeline (Investigating → Identified → Monitoring → Resolved), affected-scope chips and the last update body. The timeline carries role=status with aria-live so updates announce."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Status page", href: "/ui-primitives/status-page" },
          { label: "Incident card" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive · active incident · monitoring stage</span>
        <IncidentCard
          title={SMS_INCIDENT.title}
          severity={SMS_INCIDENT.severity}
          currentStage={SMS_INCIDENT.currentStage}
          scope={SMS_INCIDENT.scope}
          startedAt={SMS_INCIDENT.startedAt}
          updates={SMS_INCIDENT.updates}
          subscribeHref={SMS_INCIDENT.subscribeHref}
        />
      </section>
    </main>
  )
}
