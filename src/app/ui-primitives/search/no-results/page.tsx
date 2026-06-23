import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import styles from "../search.module.css"

import { NoResultsDemo } from "./no-results-demo"

export const metadata: Metadata = {
  title: "No results state | UI Primitives — Search",
}

export default function NoResultsPage() {
  return (
    <main className={styles.subRoute}>
      <PageHeader
        kicker="Search · 13"
        title="No results state"
        description="Search-specific empty surface. Distinct from the generic state-empty-results — this one is tuned for the long-form search experience and includes suggestion chips, a request-this-search CTA, and a back-to-all-results link."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Search", href: "/ui-primitives/search" },
          { label: "No results state" },
        ]}
      />
      <section className={styles.canvas} aria-label="No results state demo">
        <div className={styles.note}>
          <span>Why a dedicated variant</span>
          <p>
            The catalogue empty-state (states · empty-results) is illustration-heavy. This one is
            layout-friendly: it sits comfortably inside a results list when zero items match and
            still offers actionable next steps without losing context.
          </p>
        </div>
        <NoResultsDemo />
      </section>
    </main>
  )
}
