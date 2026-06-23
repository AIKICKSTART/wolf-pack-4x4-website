import type { Metadata } from "next"

import { MdxBlockRenderer, TableOfContentsRail } from "../../components/docs-suite"
import { PageHeader } from "../../components/page-header"
import { DOCS_BLOCKS, DOCS_TOC } from "../docs-suite-fixtures"
import styles from "../docs-suite.module.css"

export const metadata: Metadata = {
  title: "Table of contents rail | UI Primitives — Docs Suite",
}

export default function TocRailPage() {
  return (
    <main className={styles.subRoute}>
      <PageHeader
        kicker="23 / Docs Suite · 06"
        title="Table of contents rail"
        description="Auto-built TOC bound to the docs body via IntersectionObserver. Scroll-spy keeps the active section highlighted; the progress bar tracks how far through the article the reader is."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Docs Suite", href: "/ui-primitives/docs-suite" },
          { label: "Table of contents rail" },
        ]}
      />
      <section
        className={[styles.canvas, styles.canvasWide].join(" ")}
        aria-label="Table of contents rail demo"
      >
        <div className={styles.note}>
          <span>Use case</span>
          <p>
            Pins to the right of every long-form docs article. Floor staff scan the rail to
            jump straight to the bit they need rather than ctrl-F the page.
          </p>
        </div>
        <div className={styles.stage}>
          <div className={styles.fullArticle}>
            <div className={styles.fullArticleMain}>
              <MdxBlockRenderer blocks={DOCS_BLOCKS} />
            </div>
            <div className={styles.fullArticleAside}>
              <TableOfContentsRail items={DOCS_TOC} />
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
