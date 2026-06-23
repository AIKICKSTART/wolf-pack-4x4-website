import type { Metadata } from "next"

import { ArticleMetaCard } from "../../components/docs-suite"
import { PageHeader } from "../../components/page-header"
import { DOCS_META } from "../docs-suite-fixtures"
import styles from "../docs-suite.module.css"

export const metadata: Metadata = {
  title: "Article meta card | UI Primitives — Docs Suite",
}

export default function ArticleMetaPage() {
  return (
    <main className={styles.subRoute}>
      <PageHeader
        kicker="23 / Docs Suite · 07"
        title="Article meta card"
        description="Compact card showing version, published / updated timestamps in AEST, the writer, the editor, and the rolling contributor list for the current docs page."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Docs Suite", href: "/ui-primitives/docs-suite" },
          { label: "Article meta card" },
        ]}
      />
      <section className={styles.canvas} aria-label="Article meta card demo">
        <div className={styles.note}>
          <span>Use case</span>
          <p>
            Anchored to the top-right of every docs page. Daniel writes, Mia edits — the
            contributor chips show every workshop staffer who pushed a change to the page.
          </p>
        </div>
        <div className={styles.stage}>
          <ArticleMetaCard meta={DOCS_META} />
        </div>
      </section>
    </main>
  )
}
