import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import styles from "../search.module.css"

import { InlineInputDemo } from "./inline-input-demo"

export const metadata: Metadata = {
  title: "Inline search input | UI Primitives — Search",
}

export default function InlineInputPage() {
  return (
    <main className={styles.subRoute}>
      <PageHeader
        kicker="Search · 02"
        title="Inline search input"
        description="In-page filter input — debounced visual pulse, live result-count chip, and a clear button. Use directly above any list, table, or grid that supports client-side filtering."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Search", href: "/ui-primitives/search" },
          { label: "Inline search input" },
        ]}
      />
      <section className={styles.canvas} aria-label="Inline search input demo">
        <div className={styles.note}>
          <span>Use case</span>
          <p>
            Tighter than the global bar — sits above a parts list, technician roster, or invoice
            table. The result count chip updates after each debounce cycle.
          </p>
        </div>
        <InlineInputDemo />
      </section>
    </main>
  )
}
