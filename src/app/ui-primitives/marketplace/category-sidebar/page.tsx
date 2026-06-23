import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { CategorySidebar } from "../../components/marketplace/category-sidebar"
import { CATEGORY_COUNTS } from "../marketplace-fixtures"

import styles from "../marketplace.module.css"

export const metadata: Metadata = {
  title: "Category sidebar | Marketplace | UI Primitives",
  description:
    "Marketplace category navigation rail — 12 categories with live count chips and active state.",
}

export default function CategorySidebarShowcasePage() {
  return (
    <main className={styles.page}>
      <PageHeader
        kicker="22.2 / Category sidebar"
        title="Category sidebar"
        description="Left rail navigation across all twelve marketplace categories — each with a live count chip and active state styling."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Marketplace", href: "/ui-primitives/marketplace" },
          { label: "Category sidebar" },
        ]}
      />

      <section className={styles.section} aria-labelledby="category-sidebar-demo">
        <header className={styles.sectionHead}>
          <span className={styles.sectionKicker}>01 / Active state</span>
          <h2 id="category-sidebar-demo" className={styles.sectionTitle}>
            Category navigation — CRM selected
          </h2>
        </header>
        <div className={styles.sideBySide}>
          <CategorySidebar items={CATEGORY_COUNTS} activeCategory="crm" />
          <p className={styles.sectionLead}>
            The sidebar uses <code>role=&quot;navigation&quot;</code> + <code>aria-current=&quot;page&quot;</code>{" "}
            on the active row, with the count chip taking the active tone. Tabs and arrow keys work via the
            native anchor sequence — no extra keyboard plumbing required.
          </p>
        </div>
      </section>
    </main>
  )
}
