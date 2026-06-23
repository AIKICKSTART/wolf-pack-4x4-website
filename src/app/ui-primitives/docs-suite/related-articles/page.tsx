import type { Metadata } from "next"

import { RelatedArticlesGrid } from "../../components/docs-suite"
import { PageHeader } from "../../components/page-header"
import { DOCS_RELATED } from "../docs-suite-fixtures"
import styles from "../docs-suite.module.css"

export const metadata: Metadata = {
  title: "Related articles grid | UI Primitives — Docs Suite",
}

export default function RelatedArticlesPage() {
  return (
    <main className={styles.subRoute}>
      <PageHeader
        kicker="23 / Docs Suite · 09"
        title="Related articles grid"
        description="Three-up grid of related reads. Each tile carries the surface label so the reader knows whether they are stepping into the operator manual, the API docs, or the pricing engine."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Docs Suite", href: "/ui-primitives/docs-suite" },
          { label: "Related articles grid" },
        ]}
      />
      <section
        className={[styles.canvas, styles.canvasWide].join(" ")}
        aria-label="Related articles demo"
      >
        <div className={styles.note}>
          <span>Use case</span>
          <p>
            Sits between the feedback strip and the footer nav row. Hand-picked per article by
            the docs editor — never an algorithmic best-guess list.
          </p>
        </div>
        <div className={styles.stage}>
          <RelatedArticlesGrid articles={DOCS_RELATED} />
        </div>
      </section>
    </main>
  )
}
