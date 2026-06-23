import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import styles from "../search.module.css"

import { FacetedSidebarDemo } from "./faceted-sidebar-demo"

export const metadata: Metadata = {
  title: "Faceted sidebar | UI Primitives — Search",
}

export default function FacetedSidebarPage() {
  return (
    <main className={styles.subRoute}>
      <PageHeader
        kicker="Search · 05"
        title="Faceted filter sidebar"
        description="Sticky left rail that drives the search results list — collapsible groups for category checkboxes, supplier checkboxes, a price range slider, vehicle compatibility chips, and an in-stock toggle."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Search", href: "/ui-primitives/search" },
          { label: "Faceted sidebar" },
        ]}
      />
      <section className={styles.canvas} aria-label="Faceted filter sidebar demo">
        <div className={styles.note}>
          <span>Use case</span>
          <p>
            Catalog or job-search refinement. Group headers are buttons with aria-expanded and
            aria-controls; collapsing a group hides its body without unmounting state.
          </p>
        </div>
        <FacetedSidebarDemo />
      </section>
    </main>
  )
}
