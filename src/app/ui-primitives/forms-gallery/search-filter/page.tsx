import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { SearchFilterForm } from "../../components/forms-gallery/search-filter-form"

import styles from "../forms-gallery.module.css"

export const metadata: Metadata = {
  title: "Search filter form | Forms Gallery",
  description:
    "Pattern 10 — advanced search form with keyword input, collapsible filter groups, sort dropdown, and saved filter sets.",
}

export default function SearchFilterScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Pattern 10 / Search filter"
        title="Search filter form"
        description="Keyword search with kbd hint, four collapsible filter groups (price range, categories, vehicle type, suppliers), a sort menu, and save filter set."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Forms gallery", href: "/ui-primitives/forms-gallery" },
          { label: "Search filter" },
        ]}
      />
      <SearchFilterForm />
    </main>
  )
}
