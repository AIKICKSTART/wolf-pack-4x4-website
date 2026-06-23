import type { Metadata } from "next"

import { BreadcrumbDocTrail } from "../../components/docs-suite"
import { PageHeader } from "../../components/page-header"
import { DOCS_BREADCRUMB, DOCS_PAGE_TREE } from "../docs-suite-fixtures"
import styles from "../docs-suite.module.css"

export const metadata: Metadata = {
  title: "Breadcrumb doc trail | UI Primitives — Docs Suite",
}

export default function BreadcrumbDocTrailPage() {
  return (
    <main className={styles.subRoute}>
      <PageHeader
        kicker="23 / Docs Suite · 13"
        title="Breadcrumb doc trail"
        description="Hierarchical breadcrumb with a page-tree dropdown on the last crumb so the reader can hop between sibling pages without backing out to the parent index."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Docs Suite", href: "/ui-primitives/docs-suite" },
          { label: "Breadcrumb doc trail" },
        ]}
      />
      <section className={styles.canvas} aria-label="Breadcrumb doc trail demo">
        <div className={styles.note}>
          <span>Use case</span>
          <p>
            Anchored above the article title. Open the Tree button on the last crumb to jump
            between sibling pages without reloading the parent index.
          </p>
        </div>
        <div className={styles.stage}>
          <BreadcrumbDocTrail items={DOCS_BREADCRUMB} pageTree={DOCS_PAGE_TREE} />
        </div>
      </section>
    </main>
  )
}
