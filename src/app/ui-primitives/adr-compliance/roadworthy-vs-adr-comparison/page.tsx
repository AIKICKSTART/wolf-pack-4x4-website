import type { Metadata } from "next"

import { RoadworthyVsAdrComparison } from "../../components/adr-compliance"
import { PageHeader } from "../../components/page-header"

import styles from "../adr-compliance.module.css"

export const metadata: Metadata = {
  title: "Roadworthy vs ADR | ADR compliance",
  description:
    "Primitive 13 — side-by-side comparison table of NSW roadworthy inspection scope and the federal ADR programme.",
}

export default function RoadworthyVsAdrComparisonScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 13 / Comparison"
        title="Roadworthy vs ADR comparison"
        description="Wraps the ComparisonTable primitive. Shows which checks fall under the NSW roadworthy inspection (pink slip) and which fall under the federal ADR programme — important context when a customer rolls in with a pre-loved modified car."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "ADR compliance", href: "/ui-primitives/adr-compliance" },
          { label: "Roadworthy vs ADR" },
        ]}
      />

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Two-column comparison</span>
        <RoadworthyVsAdrComparison />
      </section>
    </main>
  )
}
