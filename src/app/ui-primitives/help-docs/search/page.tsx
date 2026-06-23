import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { DocSearchBar } from "../../components/help-docs"
import styles from "../help-docs.module.css"

export const metadata: Metadata = {
  title: "Doc search | UI Primitives — Help & Docs",
}

const recent = [
  {
    label: "Magnaflow 14816 swap",
    href: "/ui-primitives/help-docs/article",
    category: "Parts",
  },
  {
    label: "End-of-shift checklist",
    href: "/ui-primitives/help-docs/article",
    category: "Workshop",
  },
  {
    label: "Quote v2 from existing quote",
    href: "/ui-primitives/help-docs/article",
    category: "Quoting",
  },
]

const popular = [
  {
    label: "Add a custom-bent pipe line item",
    href: "/ui-primitives/help-docs/article",
    category: "Quoting",
  },
  {
    label: "Resolving a Stripe dispute",
    href: "/ui-primitives/help-docs/article",
    category: "Billing",
  },
  {
    label: "Search Magnaflow catalogue by ID",
    href: "/ui-primitives/help-docs/article",
    category: "Parts",
  },
  {
    label: "Inviting a new crew member",
    href: "/ui-primitives/help-docs/article",
    category: "Account",
  },
]

const categories = [
  { id: "quoting", label: "Quoting" },
  { id: "workshop", label: "Workshop" },
  { id: "parts", label: "Parts" },
  { id: "billing", label: "Billing" },
  { id: "account", label: "Account" },
]

export default function DocSearchPage() {
  return (
    <main className={styles.subRoute}>
      <PageHeader
        kicker="22 / Help & Docs · 10"
        title="Doc search"
        description="Docs-specific search bar with keyboard hint (press / to focus), recent searches, popular suggestions, and category filters."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Help & Docs", href: "/ui-primitives/help-docs" },
          { label: "Doc search" },
        ]}
      />
      <section className={styles.canvas} aria-label="Doc search demo">
        <div className={styles.note}>
          <span>Use case</span>
          <p>
            Anchors the top of every docs page. Floor staff press / from anywhere to focus
            search; Esc collapses the suggestion panel.
          </p>
        </div>
        <div className={styles.stage}>
          <DocSearchBar recent={recent} popular={popular} categories={categories} />
        </div>
      </section>
    </main>
  )
}
