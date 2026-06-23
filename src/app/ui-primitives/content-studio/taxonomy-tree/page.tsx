import type { Metadata } from "next"

import { TaxonomyTree } from "../../components/content-studio"
import { PageHeader } from "../../components/page-header"

import { TAXONOMY } from "../_mock-data"
import styles from "../content-studio.module.css"

export const metadata: Metadata = {
  title: "Taxonomy tree | Content studio",
  description:
    "Primitive 06 — category and tag tree with article counts. Three states — expanded with drag target, selected branch, collapsed.",
}

const COLLAPSED = TAXONOMY.map((node) => ({ ...node, dropTarget: false }))

export default function TaxonomyTreeScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 06 / Taxonomy tree"
        title="Taxonomy tree"
        description="Five primary categories with nested tag rails and per-leaf article counts. Three states — expanded with a drag target highlighted, expanded with a selected branch, collapsed everything."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Content studio", href: "/ui-primitives/content-studio" },
          { label: "Taxonomy tree" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive · 3 states</span>
        <div className={styles.demoTriple}>
          <TaxonomyTree
            nodes={TAXONOMY}
            defaultExpanded={["cat-workshop", "cat-suburb"]}
          />
          <TaxonomyTree
            nodes={COLLAPSED}
            defaultExpanded={["cat-parts"]}
            selectedId="tag-pacemaker"
          />
          <TaxonomyTree
            nodes={COLLAPSED}
            defaultExpanded={[]}
          />
        </div>
      </section>
    </main>
  )
}
