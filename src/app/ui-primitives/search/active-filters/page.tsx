import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import styles from "../search.module.css"

import { ActiveFiltersDemo } from "./active-filters-demo"

export const metadata: Metadata = {
  title: "Active filter chip bar | UI Primitives — Search",
}

export default function ActiveFiltersPage() {
  return (
    <main className={styles.subRoute}>
      <PageHeader
        kicker="Search · 06"
        title="Active filter chip bar"
        description="Horizontal summary of every filter currently applied — each chip is dismissable; the Clear all pill blasts the whole set. Pairs above the search results list."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Search", href: "/ui-primitives/search" },
          { label: "Active filter chip bar" },
        ]}
      />
      <section className={styles.canvas} aria-label="Active filter chip bar demo">
        <div className={styles.note}>
          <span>Pairs with</span>
          <p>
            The faceted-filter-sidebar. As filters are toggled in the sidebar, they materialise as
            chips here; removing a chip removes the filter from the sidebar state too.
          </p>
        </div>
        <ActiveFiltersDemo />
      </section>
    </main>
  )
}
