import type { Metadata } from "next"

import { IncidentBanner } from "../../components/deploy-console"
import { PageHeader } from "../../components/page-header"

import {
  INCIDENT_ACTIVE,
  INCIDENT_CRITICAL,
  INCIDENT_RESOLVED,
} from "../_mock-data"
import styles from "../deploy-console.module.css"

export const metadata: Metadata = {
  title: "Incident banner | Deploy console",
  description:
    "Primitive 10 — active-incident banner with severity, status and ETA.",
}

export default function IncidentBannerScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 10 / Banner"
        title="Incident banner"
        description="Persistent banner placed at the top of the deploy console while an incident is active. Severity chip + INC id, pulsing dot, status copy with ETA chip and an open-report CTA. The banner carries role=alert with aria-live for screen reader announcement."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Deploy console", href: "/ui-primitives/deploy-console" },
          { label: "Incident banner" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>State A · SEV2 active · quote-PDF OOM canary burn-in</span>
        <IncidentBanner incident={INCIDENT_ACTIVE} />
      </section>
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>State B · SEV1 critical · Stripe gateway in bypass</span>
        <IncidentBanner incident={INCIDENT_CRITICAL} />
      </section>
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>State C · SEV3 resolved · pulse paused</span>
        <IncidentBanner incident={INCIDENT_RESOLVED} paused />
      </section>
    </main>
  )
}
