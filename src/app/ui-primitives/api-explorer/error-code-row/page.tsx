import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { ErrorCodeRow } from "../../components/api-explorer"
import { ERROR_CODES } from "../_mock-data"

import styles from "../api-explorer.module.css"

export const metadata: Metadata = {
  title: "Error code row | API Explorer",
  description:
    "Primitive 10 — error code reference row with retry guidance. Three states: retryable, non-retryable, auth.",
}

const [VALIDATION, RATE_LIMITED, INVALID_TOKEN] = ERROR_CODES

export default function ErrorCodeRowPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 10 / Error code row"
        title="Error code reference rows"
        description="A single row reference for an error code — HTTP status chip, machine-readable code, human title, retryable flag, and migration guidance. Compose multiple rows to build an errors index page."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "API explorer", href: "/ui-primitives/api-explorer" },
          { label: "Error code row" },
        ]}
      />

      <section className={styles.routeSection} aria-label="Validation failure">
        <span className={styles.sectionLabel}>State 01 / Non-retryable (422)</span>
        <ErrorCodeRow {...VALIDATION} />
      </section>

      <section className={styles.routeSection} aria-label="Rate limit">
        <span className={styles.sectionLabel}>State 02 / Retryable (429)</span>
        <ErrorCodeRow {...RATE_LIMITED} />
      </section>

      <section className={styles.routeSection} aria-label="Invalid token">
        <span className={styles.sectionLabel}>State 03 / Auth failure (401)</span>
        <ErrorCodeRow {...INVALID_TOKEN} />
      </section>

      <section className={styles.routeSection} aria-label="Full index">
        <span className={styles.sectionLabel}>Bonus / Full reference index</span>
        <div className={styles.stack}>
          {ERROR_CODES.map((entry) => (
            <ErrorCodeRow key={entry.code} {...entry} />
          ))}
        </div>
      </section>
    </main>
  )
}
