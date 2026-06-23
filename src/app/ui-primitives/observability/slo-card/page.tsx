import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { SloCard } from "../../components/observability"

import {
  SLO_PDF_AVAILABILITY,
  SLO_QUOTES_LATENCY,
  SLO_SCHEDULER_AVAILABILITY,
} from "../_mock-data"
import styles from "../observability.module.css"

export const metadata: Metadata = {
  title: "SLO card | Observability cockpit",
  description:
    "Primitive 10 — compact SLO card with objective, actual, window, budget remaining radial gauge and health chip.",
}

export default function SloCardScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 10 / SLOs"
        title="SLO card"
        description="A compact SLO card — objective vs actual, the time window, the percentage of budget remaining as a tone-shifting radial gauge and a health chip (Healthy / At risk / Breached) derived from the actual + budget combination."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Observability", href: "/ui-primitives/observability" },
          { label: "SLO card" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive · 3 SLOs · 3 health states</span>
        <div className={styles.demoTriple}>
          <SloCard {...SLO_QUOTES_LATENCY} />
          <SloCard {...SLO_PDF_AVAILABILITY} />
          <SloCard {...SLO_SCHEDULER_AVAILABILITY} />
        </div>
      </section>
    </main>
  )
}
