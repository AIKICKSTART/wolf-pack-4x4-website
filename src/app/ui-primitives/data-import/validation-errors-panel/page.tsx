import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { ValidationErrorsPanel } from "../../components/data-import"
import { VALIDATION_ERROR_CLASSES } from "../demo-data"

import styles from "../data-import.module.css"

export const metadata: Metadata = {
  title: "Validation errors panel | Data import",
  description:
    "Primitive 05 — Errors panel with error-class chips, row counts and row-jump CTAs. Blocker classes raise role=alert.",
}

export default function ValidationErrorsPanelScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 05 / Validation errors panel"
        title="Validation errors panel"
        description="Validation results group by error class — missing required, invalid format, duplicates, out-of-range and foreign-key misses. Blockers raise an aria-live alert; informational classes stay quiet."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Data import", href: "/ui-primitives/data-import" },
          { label: "Validation errors panel" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Parts CSV validation</span>
        <ValidationErrorsPanel
          errorClasses={VALIDATION_ERROR_CLASSES}
          totalRows={721}
        />
      </section>
    </main>
  )
}
