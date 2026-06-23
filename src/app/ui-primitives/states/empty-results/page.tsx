import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import styles from "../states.module.css"
import { EmptyResultsDemo } from "./empty-results-demo"

export const metadata: Metadata = {
  title: "Empty results | UI Primitives — System States",
}

export default function EmptyResultsShowcase() {
  return (
    <main className={styles.subPage}>
      <PageHeader
        kicker="14.08 / System states"
        title="Catalogue search · 0 matches"
        description="Magnifying glass over a blueprint. Echoes the failed query, surfaces a chip cloud of refined suggestions, and offers a fallback request-a-quote escape."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "System states", href: "/ui-primitives/states" },
          { label: "Empty results" },
        ]}
      />
      <section className={styles.canvas}>
        <EmptyResultsDemo />
        <aside className={styles.note}>
          <span>Accessibility</span>
          <p>
            Role=&quot;status&quot; with polite live region. Suggestion chips become real buttons
            when the parent passes an onSuggestionSelect handler — keyboard focusable with the
            usual focus-visible styling.
          </p>
        </aside>
      </section>
    </main>
  )
}
