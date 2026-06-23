import type { Metadata } from "next"

import { ArticleBrowserGrid } from "../../components/docs-suite"
import { PageHeader } from "../../components/page-header"
import { DOCS_ARTICLES, DOCS_CATEGORIES } from "../docs-suite-fixtures"
import styles from "../docs-suite.module.css"

export const metadata: Metadata = {
  title: "Article browser grid | UI Primitives — Docs Suite",
}

export default function ArticleBrowserPage() {
  return (
    <main className={styles.subRoute}>
      <PageHeader
        kicker="23 / Docs Suite · 01"
        title="Article browser grid"
        description="Filterable article grid keyed by surface — Operator Manual, Trade Account API, Pricing Engine, Hermes Chat — with read-time and difficulty badges baked into each tile."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Docs Suite", href: "/ui-primitives/docs-suite" },
          { label: "Article browser grid" },
        ]}
      />
      <section
        className={[styles.canvas, styles.canvasWide].join(" ")}
        aria-label="Article browser demo"
      >
        <div className={styles.note}>
          <span>Use case</span>
          <p>
            Anchors the docs landing page. Counter staff hit the filter chip for the surface they
            are on right now and scan by read-time.
          </p>
        </div>
        <div className={styles.stage}>
          <ArticleBrowserGrid articles={DOCS_ARTICLES} categories={DOCS_CATEGORIES} />
        </div>
      </section>
    </main>
  )
}
