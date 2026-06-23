import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { ErrorBudgetBurndown } from "../../components/observability"

import { QUOTE_PDF_BURNDOWN } from "../_mock-data"
import styles from "../observability.module.css"

export const metadata: Metadata = {
  title: "Error budget burndown | Observability cockpit",
  description:
    "Primitive 09 — error budget burndown with ideal vs actual lines, tone shifting, end marker and trend sparkline.",
}

export default function ErrorBudgetBurndownScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 09 / SLOs"
        title="Error budget burndown"
        description="Burndown chart for an error budget — the dashed line is the ideal linear burn across the window, the solid line is actual remaining budget. Tone shifts from green → amber → red as the budget runs out, and an end-marker dot pins the current state."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Observability", href: "/ui-primitives/observability" },
          { label: "Error budget burndown" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive · 30-day window · 14% budget remaining</span>
        <ErrorBudgetBurndown
          service="quote-pdf"
          sloLabel="Render availability ≥ 99.5%"
          points={QUOTE_PDF_BURNDOWN}
          totalBudgetMinutes={216}
          window="30 days"
        />
      </section>
    </main>
  )
}
